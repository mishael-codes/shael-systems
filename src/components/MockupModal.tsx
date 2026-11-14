import {
  useEffect,
  useState,
  type ChangeEvent,
  type FocusEvent,
  type FormEvent,
} from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Link } from "react-router-dom";

type MockupModalProps = {
  open: boolean;
  onClose: () => void;
};

type FormValues = {
  name: string;
  email: string;
  business: string;
  phone: string;
  businessType: string;
  industry: string;
  goals: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const initialFormValues: FormValues = {
  name: "",
  email: "",
  business: "",
  phone: "",
  businessType: "",
  industry: "",
  goals: "",
};

function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.business.trim()) {
    errors.business = "Please enter your business name.";
  }
  if (!values.businessType.trim()) {
    errors.businessType = "Please tell us what type of site you need.";
  }
  if (!values.industry.trim()) {
    errors.industry = "Please enter your industry.";
  }
  if (values.goals.trim().length < 10) {
    errors.goals = "Please share at least 10 characters about your goals.";
  }

  return errors;
}

export function MockupModal({ open, onClose }: MockupModalProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );
  const [values, setValues] = useState(initialFormValues);
  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const errors = validateForm(values);
  const canSubmit = Object.keys(errors).length === 0 && status !== "sending";

  const handleChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setStatus("idle");
    setErrorMessage("");
  };

  const handleBlur = (
    event: FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name } = event.target;
    setTouched((current) => ({ ...current, [name]: true }));
  };

  const showError = (field: keyof FormValues) =>
    (touched[field] || hasSubmitted) && errors[field];

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setHasSubmitted(true);
    setTouched({
      name: true,
      email: true,
      business: true,
      businessType: true,
      industry: true,
      goals: true,
    });

    const validationErrors = validateForm(values);
    if (Object.keys(validationErrors).length > 0) {
      setStatus("idle");
      return;
    }

    setStatus("sending");
    setErrorMessage("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch("/api/send-quote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          email: formData.get("email"),
          business: formData.get("business"),
          businessType: formData.get("businessType"),
          industry: formData.get("industry"),
          phone: formData.get("phone"),
          goals: formData.get("goals"),
          website: formData.get("website"),
          source: "free mockup request",
        }),
        signal: controller.signal,
      });

      if (!response.ok) {
        const body = (await response.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(body?.error || "Mockup request failed");
      }

      form.reset();
      setValues(initialFormValues);
      setTouched({});
      setHasSubmitted(false);
      setStatus("success");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setErrorMessage(
          "The request took too long. Please check your connection and try again.",
        );
        setStatus("error");
        return;
      }
      setErrorMessage(
        error instanceof Error && error.message !== "Mockup request failed"
          ? error.message
          : "Something went wrong while sending your request. Please try again.",
      );
      setStatus("error");
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[60] overflow-y-auto bg-slate-950/60 px-4 py-6 sm:py-10"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mockup-modal-title"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="relative mx-auto max-w-2xl rounded-2xl bg-white p-6 shadow-2xl sm:p-8">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close mockup request form"
          className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="pr-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Get a free mockup site
          </p>
          <h2 id="mockup-modal-title" className="mt-3 text-3xl font-semibold text-slate-950">
            Tell us about your business
          </h2>
          <p className="mt-3 leading-7 text-slate-600">
            Share a few details and we&apos;ll use them to shape a useful first
            direction for your website.
          </p>
        </div>

        <form onSubmit={handleSubmit} noValidate className="mt-7 space-y-4">
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="mockup-website">Leave this field empty</label>
            <input id="mockup-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Input
                name="name"
                placeholder="Your name"
                aria-label="Your name"
                value={values.name}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(showError("name"))}
                aria-describedby={showError("name") ? "mockup-name-error" : undefined}
              />
              {showError("name") && <p id="mockup-name-error" className="mt-1 text-sm text-red-600">{errors.name}</p>}
            </div>
            <div>
              <Input
                name="email"
                type="email"
                placeholder="Your email"
                aria-label="Your email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(showError("email"))}
                aria-describedby={showError("email") ? "mockup-email-error" : undefined}
              />
              {showError("email") && <p id="mockup-email-error" className="mt-1 text-sm text-red-600">{errors.email}</p>}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Input
                name="business"
                placeholder="Business name"
                aria-label="Business name"
                value={values.business}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(showError("business"))}
                aria-describedby={showError("business") ? "mockup-business-error" : undefined}
              />
              {showError("business") && <p id="mockup-business-error" className="mt-1 text-sm text-red-600">{errors.business}</p>}
            </div>
            <Input
              name="phone"
              type="tel"
              placeholder="Phone or WhatsApp number"
              aria-label="Phone or WhatsApp number"
              value={values.phone}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Input
                name="businessType"
                placeholder="Type of site (e.g. booking)"
                aria-label="Type of site"
                value={values.businessType}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(showError("businessType"))}
                aria-describedby={showError("businessType") ? "mockup-business-type-error" : undefined}
              />
              {showError("businessType") && <p id="mockup-business-type-error" className="mt-1 text-sm text-red-600">{errors.businessType}</p>}
            </div>
            <div>
              <Input
                name="industry"
                placeholder="Industry (e.g. beauty)"
                aria-label="Industry"
                value={values.industry}
                onChange={handleChange}
                onBlur={handleBlur}
                aria-invalid={Boolean(showError("industry"))}
                aria-describedby={showError("industry") ? "mockup-industry-error" : undefined}
              />
              {showError("industry") && <p id="mockup-industry-error" className="mt-1 text-sm text-red-600">{errors.industry}</p>}
            </div>
          </div>
          <Textarea
            name="goals"
            placeholder="What should your website help you achieve?"
            aria-label="What should your website help you achieve?"
            className="min-h-28"
            value={values.goals}
            onChange={handleChange}
            onBlur={handleBlur}
            aria-invalid={Boolean(showError("goals"))}
            aria-describedby={showError("goals") ? "mockup-goals-error" : undefined}
          />
          {showError("goals") && <p id="mockup-goals-error" className="text-sm text-red-600">{errors.goals}</p>}
          {status === "success" && (
            <p className="text-sm text-emerald-700" role="status">
              Thanks. We&apos;ll review your details and get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600" role="alert">
              {errorMessage ||
                "Something went wrong. Please try again or message us on WhatsApp."}
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            disabled={!canSubmit}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed"
          >
            {status === "sending" ? "Sending..." : "Request my free mockup"}
          </Button>
          <p className="text-center text-xs leading-relaxed text-slate-500">
            By clicking &quot;Request my free mockup&quot;, you agree to our{" "}
            <Link className="text-blue-600 hover:underline" to="/privacy-policy">
              Privacy Policy
            </Link>{" "}
            and{" "}
            <Link className="text-blue-600 hover:underline" to="/terms-of-service">
              Terms of Service
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
}
