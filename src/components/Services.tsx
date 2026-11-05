"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Code2,
  LayoutTemplate,
  Send,
  ShoppingCart,
} from "lucide-react";
import { Button } from "./ui/button";

const packages = [
  {
    icon: LayoutTemplate,
    name: "Landing Pages",
    price: "Starting from $350",
    description:
      "Give your campaign, service, or offer a focused page designed to turn attention into action.",
    features: [
      "Conversion-focused page structure",
      "Responsive design for every screen",
      "Lead, booking, or WhatsApp CTA",
      "Basic SEO and launch support",
    ],
  },
  {
    icon: CalendarDays,
    name: "Booking & Appointment Sites",
    price: "Starting from $1,200",
    description:
      "Make it easy for customers to discover your services and book without the back-and-forth.",
    features: [
      "Service and availability presentation",
      "Booking or appointment enquiry flow",
      "WhatsApp and email notifications",
      "Three months of post-launch support",
    ],
  },
  {
    icon: ShoppingCart,
    name: "E-Commerce Websites",
    price: "Starting from $5,000",
    description:
      "Give your products a credible storefront that turns browsing into completed orders.",
    features: [
      "Product catalogue and shopping experience",
      "Payment processing setup",
      "Inventory and order management",
      "Order notifications and support",
    ],
    featured: true,
  },
  {
    icon: Code2,
    name: "Custom Web Development",
    price: "Starting from $8,000",
    description:
      "Build the dashboard, portal, or web application your business actually needs.",
    features: [
      "Bespoke workflows and user roles",
      "Secure access control",
      "Analytics and payment integrations",
      "Scalable technical foundation",
    ],
  },
];

export function Services() {
  const [visibleCards, setVisibleCards] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches
      ? 3
      : 1,
  );
  const [activeIndex, setActiveIndex] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(min-width: 768px)").matches
      ? 3
      : 1,
  );
  const [isTransitioning, setIsTransitioning] = useState(true);
  const pointerStart = useRef<number | null>(null);

  useEffect(() => {
    const updateVisibleCards = () => {
      const nextVisibleCards = window.matchMedia("(min-width: 768px)").matches
        ? 3
        : 1;
      setVisibleCards(nextVisibleCards);
      setActiveIndex(nextVisibleCards);
    };
    window.addEventListener("resize", updateVisibleCards);
    return () => window.removeEventListener("resize", updateVisibleCards);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(
      () => setActiveIndex((index) => index + 1),
      5000,
    );
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (
      activeIndex !== packages.length + visibleCards &&
      activeIndex !== 0
    )
      return;
    const timer = window.setTimeout(() => {
      setIsTransitioning(false);
      setActiveIndex(
        activeIndex === 0 ? packages.length : visibleCards,
      );
      window.requestAnimationFrame(() =>
        window.requestAnimationFrame(() => setIsTransitioning(true)),
      );
    }, 500);
    return () => window.clearTimeout(timer);
  }, [activeIndex, visibleCards]);

  const carouselPackages = [
    ...packages.slice(-visibleCards),
    ...packages,
    ...packages.slice(0, visibleCards),
  ];

  const moveCarousel = (direction: number) => {
    setIsTransitioning(true);
    setActiveIndex((index) => index + direction);
  };

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    pointerStart.current = event.clientX;
  };

  const handlePointerUp = (event: PointerEvent<HTMLDivElement>) => {
    if (pointerStart.current === null) return;
    const distance = event.clientX - pointerStart.current;
    pointerStart.current = null;
    if (Math.abs(distance) < 40) return;
    moveCarousel(distance > 0 ? -1 : 1);
  };

  return (
    <section className="bg-white px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">
            Websites that fit the job
          </p>
          <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-5xl">
            A clear starting point for your next build.
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the direction that best matches your business. Every project
            is tailored to your goals, content, and customers.
          </p>
        </div>

        <div className="relative mt-12">
          <div
            className="overflow-hidden touch-pan-y"
            onPointerDown={handlePointerDown}
            onPointerUp={handlePointerUp}
            onPointerCancel={() => {
              pointerStart.current = null;
            }}
          >
            <div
              className={`flex ${isTransitioning ? "transition-transform duration-500 ease-out" : ""}`}
              style={{
                transform: `translateX(-${(activeIndex * 100) / carouselPackages.length}%)`,
                width: `${(carouselPackages.length / visibleCards) * 100}%`,
              }}
            >
              {carouselPackages.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <article
                key={`${plan.name}-${index}`}
                className={`relative flex min-w-0 flex-col border p-7 sm:p-8 ${
                  plan.featured
                    ? "border-blue-600 bg-blue-50 pt-12 shadow-[0_20px_50px_rgba(37,99,235,0.14)] sm:pt-12"
                    : "border-slate-200 bg-white"
                }`}
                style={{ flex: `0 0 ${100 / carouselPackages.length}%` }}
              >
                {plan.featured && (
                  <span className="absolute left-7 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white">
                    Popular choice
                  </span>
                )}
                <Icon className="h-8 w-8 text-blue-600" />
                <h3 className="mt-7 text-2xl font-semibold leading-tight text-slate-950">
                  {plan.name}
                </h3>
                <p className="mt-4 min-h-14 leading-7 text-slate-600">
                  {plan.description}
                </p>
                <div className="mt-7 border-y border-slate-200 py-5">
                  <p className="text-3xl font-semibold tracking-tight text-slate-950">
                    {plan.price}
                  </p>
                </div>
                <ul className="mt-6 flex-1 space-y-3 text-sm text-slate-700">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex gap-3">
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  asChild
                  className={`mt-8 w-full cursor-pointer ${
                    plan.featured
                      ? "bg-blue-600 hover:bg-blue-700"
                      : "border-blue-200 text-blue-700 hover:bg-blue-50"
                  }`}
                  variant={plan.featured ? "default" : "outline"}
                >
                  <a href="#contact">
                    Discuss this project <ArrowRight className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              </article>
            );
              })}
            </div>
          </div>
          <div className="mt-6 hidden items-center justify-center gap-3 md:flex">
            <Button
              variant="outline"
              size="icon"
              onClick={() => moveCarousel(-1)}
              aria-label="Previous packages"
              className="cursor-pointer rounded-full border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => moveCarousel(1)}
              aria-label="Next packages"
              className="cursor-pointer rounded-full border-blue-200 text-blue-700 hover:bg-blue-50"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-5 border-t border-slate-200 pt-8 text-center sm:flex-row sm:text-left">
          <div>
            <p className="font-semibold text-slate-950">Need something more specific?</p>
            <p className="mt-1 text-sm text-slate-600">
              Tell us what you need and we&apos;ll scope a custom solution.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="cursor-pointer bg-blue-600 px-7 hover:bg-blue-700"
          >
            <a href="#contact">
              <Send className="mr-2 h-5 w-5" />
              Get a custom quote
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
