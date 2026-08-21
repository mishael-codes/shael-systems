import { useCallback, useState, type FormEvent } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { MessageCircle, Mail, Send } from "lucide-react";
import { Card } from "./ui/card";
import { z } from "zod";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const contactFormSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Please enter a valid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  website: z.string().max(0).optional(),
});

const SUBMISSION_COOLDOWN_MS = 60 * 1000;
const SUBMISSION_KEY = "shael-contact-last-submission";

type ContactData = z.infer<typeof contactFormSchema>;

export function ContactCTA() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting, isValid },
  } = useForm<ContactData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange",
  });

  const [submissionError, setSubmissionError] = useState("");

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    void handleSubmit(async (data: ContactData) => {
      setSubmissionError("");

      if (data.website) return;

      const lastSubmission = Number(window.localStorage.getItem(SUBMISSION_KEY));
      if (lastSubmission && Date.now() - lastSubmission < SUBMISSION_COOLDOWN_MS) {
        setSubmissionError("Please wait a moment before sending another message.");
        return;
      }

      try {
        const form = document.createElement("form");
        form.method = "POST";
        form.action = "https://formsubmit.co/hello@shaelsystems.com";
        form.style.display = "none";

        const addInput = (name: string, value: string) => {
          const input = document.createElement("input");
          input.type = "hidden";
          input.name = name;
          input.value = value;
          form.appendChild(input);
        };

        addInput("name", data.name);
        addInput("email", data.email);
        addInput("message", data.message);
        addInput("_subject", `Website contact: ${data.name}`);
        addInput("_template", "table");
        addInput("_next", "/thank-you");
        document.body.appendChild(form);
        window.localStorage.setItem(SUBMISSION_KEY, String(Date.now()));
        form.submit();
      } catch (error) {
        console.error("[v0] Contact form submission failed", error);
        setSubmissionError("There was an error sending your message. Please try again later.");
      }
    })(event);
  };

  const handleWhatsApp = useCallback(() => {
    window.open(
      "https://wa.me/+2348067575432?text=Hi, I'm interested in your web services",
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
    !isSubmitting;

  return (
    <section
      id="contact"
      className="section-shell py-24 px-6 bg-linear-to-b from-blue-600 to-blue-800 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to Grow Your Business Online?
          </h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            Let's create a digital experience that makes your next move easier. Get in touch today
            for a free consultation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 max-w-5xl mx-auto">
          <Card className="p-8 bg-white text-gray-900">
            <div className="flex items-center gap-2 mb-6">
              <Mail className="w-6 h-6 text-blue-600" />
              <h3 className="text-2xl font-semibold">Send us a message</h3>
            </div>

            <form onSubmit={submitHandler} noValidate className="space-y-4">
              <div>
                <Input type="text" placeholder="Your Name" {...register("name")} className="w-full" />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
              </div>
              <div>
                <Input type="email" placeholder="Your Email" {...register("email")} className="w-full" />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>
              <div>
                <Textarea placeholder="Tell us about your project..." {...register("message")} className="w-full min-h-32" />
                {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
              </div>
              <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
                <label htmlFor="website">Leave this field empty</label>
                <input id="website" type="text" tabIndex={-1} autoComplete="off" {...register("website")} />
              </div>
              {submissionError && <p className="text-sm text-red-600" role="alert">{submissionError}</p>}
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700" size="lg" disabled={!canSubmit}>
                <Send className="mr-2 h-5 w-5" />
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </Card>

          <div className="flex flex-col justify-center space-y-6">
            <div>
              <h3 className="text-2xl font-semibold mb-4">Or chat with us instantly</h3>
              <p className="text-blue-100 mb-6 leading-relaxed">
                Prefer a quick conversation? Message us on WhatsApp and get answers to your questions right away.
              </p>
              <Button onClick={handleWhatsApp} size="lg" className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto px-8">
                <MessageCircle className="mr-2 h-5 w-5" />
                Chat on WhatsApp
              </Button>
            </div>
            <div className="border-t border-blue-500 pt-6">
              <p className="text-blue-100 text-sm"><strong className="text-white">Response time:</strong> Usually within 24 hours</p>
              <p className="text-blue-100 text-sm mt-2"><strong className="text-white">Free consultation:</strong> No obligations, just honest advice</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
