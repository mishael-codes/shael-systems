import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type FormEvent,
} from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Mail, Send } from "lucide-react";
import { Card } from "./ui/card";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
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
        "expired-callback"?: () => void;
      },
    ) => number;
    execute: (widgetId: number) => void;
  }

  interface Window {
    hcaptcha?: HCaptcha;
    __hcaptchaWidgetId?: number;
    __hcaptchaResolve?: ((token: string) => void) | undefined;
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
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<contactData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  });

  const captchaRef = useRef<HTMLDivElement | null>(null);
  const captchaRenderedRef = useRef(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const [captchaToken, setCaptchaToken] = useState("");
  const [captchaReady, setCaptchaReady] = useState(false);
  const [captchaError, setCaptchaError] = useState("");
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
    console.log("[hCaptcha] bootstrap start", {
      hasSiteKey: Boolean(siteKey),
      hasWindowHcaptcha: Boolean(window.hcaptcha),
    });

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

    // Render helper that only renders when the hCaptcha API is ready.
    const renderWidget = () => {
      if (
        siteKey &&
        window.hcaptcha &&
        captchaRef.current &&
        !captchaRenderedRef.current &&
        typeof window.__hcaptchaWidgetId !== "number"
      ) {
        console.log("[hCaptcha] rendering widget");
        captchaRenderedRef.current = true;
        try {
          const widgetId = window.hcaptcha.render(captchaRef.current, {
            sitekey: siteKey!,
            size: "normal",
            callback: (token: string) => {
              console.log("[hCaptcha] challenge solved", {
                tokenLength: token.length,
              });
              setCaptchaError("");
              setCaptchaToken(token);
              if (inputsRef.current.token) {
                inputsRef.current.token.value = token;
              }
              if (window.__hcaptchaResolve) {
                window.__hcaptchaResolve(token);
                window.__hcaptchaResolve = undefined;
              }
            },
            "error-callback": () => {
              console.warn("[hCaptcha] challenge error callback fired");
              setCaptchaToken("");
              setCaptchaError(
                "The captcha could not be loaded. Please try again.",
              );
              if (inputsRef.current.token) {
                inputsRef.current.token.value = "";
              }
              if (window.__hcaptchaResolve) {
                window.__hcaptchaResolve("");
                window.__hcaptchaResolve = undefined;
              }
            },
            "expired-callback": () => {
              console.warn("[hCaptcha] challenge expired");
              setCaptchaToken("");
              setCaptchaError("The captcha expired. Please complete it again.");
              if (inputsRef.current.token) {
                inputsRef.current.token.value = "";
              }
            },
          });
          window.__hcaptchaWidgetId = widgetId;
          setCaptchaReady(true);
          console.log("[hCaptcha] widget rendered", { widgetId });
        } catch (error) {
          console.error("[hCaptcha] render failed", error);
        }
        return true;
      }
      if (!siteKey) {
        console.warn("[hCaptcha] VITE_HCAPTCHA_SITE_KEY is missing");
      } else if (!window.hcaptcha) {
        console.log("[hCaptcha] API not ready yet");
      }
      return false;
    };

    // Use explicit render and a load listener to ensure we don't try to render
    // before the hCaptcha script has fully initialized.
    if (window.hcaptcha) {
      console.log("[hCaptcha] API already available, rendering now");
      renderWidget();
    } else {
      const existing = document.querySelector(
        'script[src^="https://js.hcaptcha.com/1/api.js"]',
      );

      const handleLoad = () => {
        console.log("[hCaptcha] script load event fired");
        renderWidget();
      };

      const handleError = () => {
        console.error("[hCaptcha] script failed to load");
      };

      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://js.hcaptcha.com/1/api.js?render=explicit";
        script.async = true;
        script.defer = true;
        script.addEventListener("load", handleLoad, { once: true });
        script.addEventListener("error", handleError, { once: true });
        console.log("[hCaptcha] injecting script", script.src);
        document.head.appendChild(script);
      } else {
        console.log("[hCaptcha] script tag already present");
        existing.addEventListener("load", handleLoad, { once: true });
        existing.addEventListener("error", handleError, { once: true });
        if (window.hcaptcha) {
          console.log("[hCaptcha] existing script already initialized");
          renderWidget();
        }
      }
    }
    return () => {
      // cleanup created hidden form to avoid leaking DOM nodes
      if (formRef.current && formRef.current.parentNode) {
        formRef.current.parentNode.removeChild(formRef.current);
        formRef.current = null;
      }
    };
  }, []);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void handleSubmit(async (data: contactData) => {
      try {
        if (!captchaToken) {
          setCaptchaError(
            "Please complete the hCaptcha challenge before sending.",
          );
          return;
        }

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
        if (token) token.value = captchaToken;

        formRef.current.submit();
      } catch (err) {
        console.error(err);
        alert(
          "There was an error sending your message. Please try again later.",
        );
      }
    })(event);
  };

  const handleWhatsApp = useCallback(() => {
    window.open(
      "https://wa.me/+2348084602067?text=Hi, I'm interested in your web services",
      "_blank",
    );
  }, []);

  const [nameValue, emailValue, messageValue] = useWatch({
    control,
    name: ["name", "email", "message"],
  });
  const canSubmit =
    isValid &&
    (nameValue ?? "").trim().length > 0 &&
    (emailValue ?? "").trim().length > 0 &&
    (messageValue ?? "").trim().length > 0 &&
    captchaReady &&
    Boolean(captchaToken) &&
    !isSubmitting;

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

            <form onSubmit={submitHandler} noValidate className="space-y-4">
              <div>
                <Input
                  type="text"
                  placeholder="Your Name"
                  {...register("name")}
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
                  className="w-full min-h-32"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.message?.message}
                  </p>
                )}
              </div>

              <div>
                <div ref={captchaRef} className="min-h-[82px]" />
                {captchaError && (
                  <p className="mt-2 text-sm text-red-600">{captchaError}</p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
                disabled={!canSubmit}
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
