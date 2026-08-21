"use client";

import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "How much does a website cost?",
    answer: "",
  },
  {
    question: "How long does it take to build a website?",
    answer: "A simple website typically takes 1-2 weeks, while more complex projects can take 4-8 weeks. The timeline depends on the package you choose and how quickly you provide feedback and content. We'll give you a clear timeline during our discovery call.",
  },
  {
    question: "Do you offer revisions?",
    answer: "Yes! All packages include revisions during the design and development phase. We want you to be completely happy with your website. The number of revisions varies by package, and we'll discuss this upfront.",
  },
  {
    question: "What kind of support do you provide?",
    answer: "All packages include post-launch support ranging from 1 to 6 months depending on your plan. This includes bug fixes, minor updates, and technical assistance. We also offer ongoing maintenance plans if you need continued support.",
  },
  {
    question: "Will my website be mobile-friendly?",
    answer: "Absolutely! Every website we build is fully responsive and optimized for mobile devices, tablets, and desktops. We follow mobile-first design principles to ensure a perfect experience on all screen sizes.",
  },
  {
    question: "Can you help with content and copywriting?",
    answer: "Yes! We can help refine your content and suggest improvements for better conversions. For more extensive copywriting needs, we can recommend professional copywriters or include it as an add-on service.",
  },
];

function isNigeria(latitude: number, longitude: number) {
  return latitude >= 4.2 && latitude <= 13.9 && longitude >= 2.6 && longitude <= 14.7;
}

function getPricingAnswer(isNigeriaVisitor: boolean) {
  if (isNigeriaVisitor) {
    return "Our prices start from ₦300,000 for booking and appointment sites, ₦550,000 for ecommerce websites, and ₦1,000,000 for custom web development. The exact quote depends on your needs, features, and complexity, with no hidden fees.";
  }

  return "Our prices start from $999.99 for booking and appointment sites, $2,499.99 for ecommerce websites, and $4,999.99 for custom web development. Prices are shown in USD by default. The exact quote depends on your needs, features, and complexity, with no hidden fees.";
}

export function FAQ() {
  const [isNigeriaVisitor, setIsNigeriaVisitor] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) return;

    navigator.geolocation.getCurrentPosition(
      ({ coords }) => setIsNigeriaVisitor(isNigeria(coords.latitude, coords.longitude)),
      () => undefined,
      { enableHighAccuracy: false, timeout: 8000, maximumAge: 3600000 },
    );
  }, []);

  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="mx-auto max-w-3xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Got questions? We've got answers.
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-lg px-6 border border-gray-200"
            >
              <AccordionTrigger className="text-left hover:no-underline py-6">
                <span className="font-semibold text-gray-900">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 pb-6 leading-relaxed">
                {faq.question === "How much does a website cost?"
                  ? getPricingAnswer(isNigeriaVisitor)
                  : faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
