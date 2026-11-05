import { useEffect, useState, type FormEvent } from "react";
import { X } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

type MockupModalProps = {
  open: boolean;
  onClose: () => void;
};

export function MockupModal({ open, onClose }: MockupModalProps) {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">(
    "idle",
  );

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
    setStatus("sending");
    const form = event.currentTarget;
    const formData = new FormData(form);

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
      });

      if (!response.ok) throw new Error("Mockup request failed");
      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
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

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <div className="absolute -left-[10000px] h-px w-px overflow-hidden" aria-hidden="true">
            <label htmlFor="mockup-website">Leave this field empty</label>
            <input id="mockup-website" name="website" tabIndex={-1} autoComplete="off" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="name" placeholder="Your name" aria-label="Your name" required />
            <Input name="email" type="email" placeholder="Your email" aria-label="Your email" required />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="business" placeholder="Business name" aria-label="Business name" required />
            <Input name="phone" type="tel" placeholder="Phone or WhatsApp number" aria-label="Phone or WhatsApp number" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="businessType" placeholder="Type of site (e.g. booking)" aria-label="Type of site" required />
            <Input name="industry" placeholder="Industry (e.g. beauty)" aria-label="Industry" required />
          </div>
          <Textarea
            name="goals"
            placeholder="What should your website help you achieve?"
            aria-label="What should your website help you achieve?"
            className="min-h-28"
            required
          />
          {status === "success" && (
            <p className="text-sm text-emerald-700" role="status">
              Thanks. We&apos;ll review your details and get back to you soon.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm text-red-600" role="alert">
              Something went wrong. Please try again or message us on WhatsApp.
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            disabled={status === "sending"}
            className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700"
          >
            {status === "sending" ? "Sending..." : "Request my free mockup"}
          </Button>
        </form>
      </div>
    </div>
  );
}
