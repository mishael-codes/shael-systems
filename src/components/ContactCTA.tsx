import { useCallback, useEffect, useRef, type SubmitEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Mail, Send } from "lucide-react";
import { Card } from "./ui/card";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

declare global {
  interface ImportMetaEnv {
    readonly VITE_HCAPTCHA_SITE_KEY?: string;
  }
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }

  interface HCaptcha {
    render: (
      el: HTMLElement,
      opts: {
        sitekey: string;
        size?: "invisible" | "compact" | "normal";
        callback?: (token: string) => void;
        "error-callback"?: () => void;
      },
    ) => number;
    execute: (widgetId: number) => void;
  }

  interface Window {
    hcaptcha?: HCaptcha;
    __hcaptchaWidgetId?: number;
    __hcaptchaResolve?: ((token: string) => void) | undefined;
    __hcaptchaOnLoad?: () => void;
  }
}

const contactFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type contactData = z.infer<typeof contactFormSchema>;
export function ContactCTA() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<contactData>({ resolver: zodResolver(contactFormSchema) });

  const captchaRef = useRef<HTMLDivElement | null>(null);
  const captchaRenderedRef = useRef(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const inputsRef = useRef<{
    name?: HTMLInputElement;
    email?: HTMLInputElement;
    message?: HTMLInputElement;
    subject?: HTMLInputElement;
    template?: HTMLInputElement;
    token?: HTMLInputElement;
    next?: HTMLInputElement;
  }>({});

  useEffect(() => {
    const siteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY;

    // Create a single hidden form and inputs to reuse on every submit — avoids DOM churn
    if (!formRef.current) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = "https://formsubmit.co/hello@shaelsystems.com";
      form.style.display = "none";

      const mkInput = (name: string) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        form.appendChild(input);
        return input;
      };

      inputsRef.current.name = mkInput("name");
      inputsRef.current.email = mkInput("email");
      inputsRef.current.message = mkInput("message");
      inputsRef.current.subject = mkInput("_subject");
      inputsRef.current.template = mkInput("_template");
      inputsRef.current.token = mkInput("h-captcha-response");
      inputsRef.current.next = mkInput("_next");

      document.body.appendChild(form);
      formRef.current = form;
    }

    // Render helper that only renders when the hcaptcha API is ready.
    const renderWidget = () => {
      if (
        siteKey &&
        window.hcaptcha &&
        captchaRef.current &&
        !captchaRenderedRef.current &&
        typeof window.__hcaptchaWidgetId !== "number"
      ) {
        captchaRenderedRef.current = true;
        const widgetId = window.hcaptcha.render(captchaRef.current, {
          sitekey: siteKey!,
          size: "invisible",
          callback: (token: string) => {
            if (window.__hcaptchaResolve) {
              window.__hcaptchaResolve(token);
              window.__hcaptchaResolve = undefined;
            }
          },
          "error-callback": () => {
            if (window.__hcaptchaResolve) {
              window.__hcaptchaResolve("");
              window.__hcaptchaResolve = undefined;
            }
          },
        });
        window.__hcaptchaWidgetId = widgetId;
        return true;
      }
      return false;
    };

    // Use explicit render and onload callback to ensure we don't try to render
    // before the hcaptcha script has fully initialized.
    if (window.hcaptcha) {
      renderWidget();
    } else {
      const existing = document.querySelector(
        'script[src^="https://hcaptcha.com/1/api.js"]',
      );
      // Prepare a global onload callback name that hcaptcha will call when ready.
      window.__hcaptchaOnLoad = () => renderWidget();
      const onloadParam = "__hcaptchaOnLoad";
      if (!existing) {
        const script = document.createElement("script");
        script.src = `https://hcaptcha.com/1/api.js?render=explicit&onload=${onloadParam}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }
    return () => {
      // cleanup created hidden form to avoid leaking DOM nodes
      if (formRef.current && formRef.current.parentNode) {
        formRef.current.parentNode.removeChild(formRef.current);
        formRef.current = null;
      }
      // remove global onload callback to avoid leaking globals
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        if ((window as any).__hcaptchaOnLoad)
          delete (window as any).__hcaptchaOnLoad;
      } catch (error) {
        console.error("Failed to remove hCaptcha onload callback", error);
      }
    };
  }, []);

  const submitHandler = (e: SubmitEvent<HTMLFormElement>) => {
    // Build the actual submit callback at event-time so refs aren't accessed during render
    handleSubmit(async (data: contactData) => {
      try {
        if (!formRef.current || !inputsRef.current)
          throw new Error("Form not ready");

        const { name, email, message, subject, template, token, next } =
          inputsRef.current;
        if (!name || !email || !message || !subject || !template || !next)
          throw new Error("Form inputs missing");

        name.value = data.name;
        email.value = data.email;
        message.value = data.message;
        subject.value = `Website contact: ${data.name}`;
        template.value = "table";
        next.value = "/thank-you";
        if (token) token.value = ""; // clear previous token

        const siteKey = import.meta.env.VITE_HCAPTCHA_SITE_KEY;
        if (
          siteKey &&
          window.hcaptcha &&
          typeof window.__hcaptchaWidgetId === "number"
        ) {
          const widgetId = window.__hcaptchaWidgetId as number;
          const t: string = await new Promise((resolve) => {
            window.__hcaptchaResolve = (tok: string) => resolve(tok);
            try {
              window.hcaptcha!.execute(widgetId);
            } catch (err) {
              console.log("hCaptcha execution error:", err);
              // resolution with empty token on error
              resolve("");
            }
          });
          if (t && token) token.value = t;
        }

        formRef.current.submit();
      } catch (err) {
        console.error(err);
        alert(
          "There was an error sending your message. Please try again later.",
        );
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    })(e as unknown as any);
  };

  const handleWhatsApp = useCallback(() => {
    window.open(
      "https://wa.me/+2348084602067?text=Hi, I'm interested in your web services",
      "_blank",
    );
  }, []);

  return (
    <section
      id="contact"
      className="py-20 px-6 bg-linear-to-b from-blue-600 to-blue-800 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Grow Your Business Online?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Let's build a website that brings you customers. Get in touch today
            for a free consultation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          {/* Contact Form */}
          <Card className="p-8 bg-white text-gray-900">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-semibold">Send us a message</h3>
            </div>

            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  {...register("name")}
                  required
                  className="w-full"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.name?.message}
                  </p>
                )}
              </div>

              <div>
                <Input
                  type="email"
                  placeholder="Your Email"
                  {...register("email")}
                  required
                  className="w-full"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.email?.message}
                  </p>
                )}
              </div>

              <div>
                <Textarea
                  placeholder="Tell us about your project..."
                  {...register("message")}
                  required
                  className="w-full min-h-32"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message?.message}
                  </p>
                )}
                <div ref={captchaRef} />
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                disabled={isSubmitting}
              >
                <Send className="mr-2 h-5 w-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          {/* WhatsApp CTA */}
          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">
                Or chat with us instantly
              </h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Prefer a quick conversation? Message us on WhatsApp and get
                answers to your questions right away.
              </p>

              <Button
                onClick={handleWhatsApp}
                size="lg"
                className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto px-8"
              >
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </div>

            <div className="border-t border-blue-500 pt-6">
              <p className="text-blue-100 text-sm">
                <strong className="text-white">Response time:</strong> Usually
                within 24 hours
              </p>
              <p className="text-blue-100 text-sm mt-2">
                <strong className="text-white">Free consultation:</strong> No
                obligations, just honest advice
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
