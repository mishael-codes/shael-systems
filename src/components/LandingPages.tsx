import { useState, type FormEvent } from "react";
import {
  ArrowRight,
  Check,
  LayoutTemplate,
  Mail,
  MessageCircle,
  MousePointerClick,
  Send,
  ShoppingBag,
  Users,
} from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

const outcomes = [
  {
    icon: MousePointerClick,
    title: "Generate better leads",
    description:
      "Turn curious visitors into qualified enquiries with a focused message, clear proof, and a next step that feels easy.",
    points: [
      "A sharper value proposition",
      "Strategic enquiry and booking paths",
      "Trust signals placed where they matter",
    ],
  },
  {
    icon: ShoppingBag,
    title: "Drive more sales",
    description:
      "Give your offer the space it deserves, remove buying friction, and guide customers toward taking action.",
    points: [
      "Offer-led page structure",
      "Objection-handling copy",
      "Calls to action built around intent",
    ],
  },
  {
    icon: Users,
    title: "Grow your audience",
    description:
      "Create a home base for your brand that gives people a reason to follow, subscribe, return, and share.",
    points: [
      "A memorable brand experience",
      "Email and social growth paths",
      "Content that is easy to discover",
    ],
  },
];

const benefits = [
  "You own a credible home for your business",
  "Customers can understand your offer without a back-and-forth",
  "Your marketing has somewhere focused to send people",
  "You can measure interest instead of guessing",
];

type QuoteFormProps = {
  compact?: boolean;
};

function QuoteForm({ compact = false }: QuoteFormProps) {
  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");

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
          goals: formData.get("goals"),
          website: formData.get("website"),
          source: "landing page",
        }),
        signal: controller.signal,
      });

      if (!response.ok) throw new Error("Quote request failed");
      form.reset();
      setStatus("success");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        setStatus("error");
      } else {
        setStatus("error");
      }
    } finally {
      window.clearTimeout(timeoutId);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={`space-y-4 ${compact ? "" : "rounded-2xl border border-blue-100 bg-white p-6 shadow-[0_20px_60px_rgba(37,99,235,0.12)] sm:p-8"}`}
    >
      <div
        className="absolute -left-[10000px] h-px w-px overflow-hidden"
        aria-hidden="true"
      >
        <label
          htmlFor={compact ? "landing-website-footer" : "landing-website-hero"}
        >
          Leave this field empty
        </label>
        <input
          id={compact ? "landing-website-footer" : "landing-website-hero"}
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Input
          name="name"
          type="text"
          placeholder="Your name"
          aria-label="Your name"
          required
        />
        <Input
          name="email"
          type="email"
          placeholder="Your email"
          aria-label="Your email"
          required
        />
      </div>
      <Input
        name="business"
        type="text"
        placeholder="Business or brand name"
        aria-label="Business or brand name"
        required
      />
      <Textarea
        name="goals"
        placeholder="What should your landing page help you achieve?"
        aria-label="What should your landing page help you achieve?"
        className="min-h-28"
        required
      />
      {status === "success" && (
        <p className="text-sm text-emerald-700" role="status">
          Thanks. We&apos;ll be in touch soon.
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
        className="w-full cursor-pointer bg-blue-600 hover:bg-blue-700 disabled:cursor-not-allowed"
      >
        <Send className="mr-2 h-5 w-5" />
        {status === "sending" ? "Sending..." : "Get my landing page quote"}
      </Button>
      <p className="text-center text-xs leading-relaxed text-slate-500">
        Tell us the goal. We&apos;ll reply with a thoughtful recommendation and
        clear next steps.
      </p>
    </form>
  );
}

export function LandingPages() {
  return (
    <div className="overflow-hidden bg-white">
      <section className="relative border-b border-blue-100 bg-[#f4f8ff] px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
        <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.05fr_.95fr] lg:gap-20">
          <div className="reveal is-visible">
            <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Landing pages with a job to do
            </p>
            <h1 className="max-w-3xl text-4xl font-semibold leading-[0.98] text-slate-950 sm:text-6xl lg:text-7xl">
              Give your next campaign somewhere worth landing.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-600">
              We make tailored landing pages for small businesses that need more
              than a pretty screen: pages built to generate leads, drive sales,
              or grow an audience.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="h-14 cursor-pointer rounded-lg bg-blue-600 px-7 text-base hover:bg-blue-700"
              >
                <a href="#landing-quote">
                  Get a tailored quote <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="h-14 cursor-pointer rounded-lg border-blue-200 px-7 text-base text-blue-700 hover:bg-blue-50"
              >
                <a href="#why-website">Why a website matters</a>
              </Button>
            </div>
            <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-blue-200 py-5 text-left">
              <div>
                <p className="text-2xl font-semibold text-slate-950">1</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                  Clear goal
                </p>
              </div>
              <div className="border-l border-blue-200 pl-4">
                <p className="text-2xl font-semibold text-slate-950">1</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                  Focused page
                </p>
              </div>
              <div className="border-l border-blue-200 pl-4">
                <p className="text-2xl font-semibold text-slate-950">More</p>
                <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                  Useful action
                </p>
              </div>
            </div>
          </div>

          <div className="reveal reveal-delay-2 is-visible">
            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_24px_70px_rgba(37,99,235,0.16)] sm:p-6">
              <div className="mb-5 flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <LayoutTemplate className="h-5 w-5 text-blue-600" />
                  <span className="text-sm font-semibold text-slate-950">
                    Your next best first impression
                  </span>
                </div>
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                  Built around you
                </span>
              </div>
              <div className="rounded-xl bg-slate-950 p-6 text-white sm:p-8">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                  The page should answer
                </p>
                <p className="mt-5 text-3xl font-semibold leading-tight sm:text-4xl">
                  Why you. Why now. What next?
                </p>
                <div className="mt-8 space-y-3 text-sm text-slate-300">
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-300" /> Who is this for?
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-300" /> What changes for
                    them?
                  </div>
                  <div className="flex items-center gap-3">
                    <Check className="h-4 w-4 text-blue-300" /> How do they take
                    the next step?
                  </div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="rounded-lg bg-blue-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-blue-600">
                    Message
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    Easy to understand
                  </p>
                </div>
                <div className="rounded-lg bg-emerald-50 p-4">
                  <p className="text-xs uppercase tracking-wide text-emerald-700">
                    Action
                  </p>
                  <p className="mt-2 text-sm font-semibold text-slate-900">
                    Easy to take
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="why-website" className="scroll-mt-24 px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              The small business advantage
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              A website is not just an online brochure.
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-xl leading-9 text-slate-700">
              It is the place your business can explain itself clearly, earn
              trust before the first conversation, and turn attention from
              search, social, referrals, and ads into something you can build
              on.
            </p>
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {benefits.map((benefit) => (
                <div
                  key={benefit}
                  className="flex gap-3 border-t border-slate-200 pt-4 text-slate-700"
                >
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
                  <span>{benefit}</span>
                </div>
              ))}
            </div>
            <Button
              asChild
              variant="outline"
              className="mt-10 cursor-pointer border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <a href="#landing-quote">
                Build your business home <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-slate-950 px-6 py-20 text-white sm:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-300">
              One page. One clear outcome.
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">
              Designed around what growth means for you.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-300">
              A tailor-made landing page puts the right story, proof, and action
              in the right order for your audience.
            </p>
          </div>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {outcomes.map((outcome) => {
              const Icon = outcome.icon;
              return (
                <article
                  key={outcome.title}
                  className="border border-slate-700 bg-slate-900 p-7"
                >
                  <Icon className="h-8 w-8 text-blue-300" />
                  <h3 className="mt-8 text-2xl font-semibold">
                    {outcome.title}
                  </h3>
                  <p className="mt-4 leading-7 text-slate-300">
                    {outcome.description}
                  </p>
                  <ul className="mt-7 space-y-3 border-t border-slate-700 pt-5 text-sm text-slate-200">
                    {outcome.points.map((point) => (
                      <li key={point} className="flex gap-2">
                        <Check className="h-4 w-4 shrink-0 text-blue-300" />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
          <Button
            asChild
            size="lg"
            className="mt-10 cursor-pointer bg-blue-500 hover:bg-blue-400"
          >
            <a href="#landing-quote">
              Tell us your outcome <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_.8fr] lg:gap-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              The build, without the fog
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Your business stays at the center of every decision.
            </h2>
            <div className="mt-10 space-y-6">
              {[
                [
                  "01",
                  "Start with the goal",
                  "We clarify who you need to reach and the action you want them to take.",
                ],
                [
                  "02",
                  "Shape the message",
                  "We turn your offer into a clear story with proof that makes sense to your audience.",
                ],
                [
                  "03",
                  "Launch with momentum",
                  "You get a fast, responsive page ready for your next campaign, referral, or conversation.",
                ],
              ].map(([number, title, description]) => (
                <div
                  key={number}
                  className="flex gap-5 border-t border-slate-200 pt-5"
                >
                  <span className="text-sm font-semibold text-blue-600">
                    {number}
                  </span>
                  <div>
                    <h3 className="font-semibold text-slate-950">{title}</h3>
                    <p className="mt-1 leading-7 text-slate-600">
                      {description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-blue-50 p-7 sm:p-10">
            <Mail className="h-8 w-8 text-blue-600" />
            <h3 className="mt-8 text-2xl font-semibold text-slate-950">
              Have a page in mind?
            </h3>
            <p className="mt-4 leading-7 text-slate-600">
              Share the rough version. We&apos;ll help you find the clearest,
              strongest version of it.
            </p>
            <Button
              asChild
              className="mt-8 cursor-pointer bg-blue-600 hover:bg-blue-700"
            >
              <a href="#landing-quote">
                Start the conversation <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section
        id="landing-quote"
        className="scroll-mt-24 bg-[#f4f8ff] px-6 py-20 sm:py-28"
      >
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[.85fr_1.15fr] lg:gap-24">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              Let&apos;s make it useful
            </p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight text-slate-950 sm:text-5xl">
              Tell us what you want the page to do.
            </h2>
            <p className="mt-6 text-lg leading-8 text-slate-600">
              A few details are enough to begin. We&apos;ll come back with a
              tailored direction, honest scope, and a clear quote.
            </p>
            <div className="mt-8 flex items-center gap-3 text-sm text-slate-600">
              <MessageCircle className="h-5 w-5 text-blue-600" /> Prefer a quick
              chat?{" "}
              <a
                className="font-semibold text-blue-700 hover:underline"
                href="https://wa.me/+2348067575432?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20landing%20page."
                target="_blank"
                rel="noreferrer"
              >
                Message us on WhatsApp
              </a>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section className="bg-white px-6 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-8 border-t border-slate-200 pt-12 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
              One more thing
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-slate-950">
              Your next customer is already looking for a reason to choose you.
            </h2>
          </div>
          <Button
            asChild
            size="lg"
            className="cursor-pointer bg-blue-600 hover:bg-blue-700"
          >
            <a href="#landing-quote">
              Get a quote <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>
    </div>
  );
}
