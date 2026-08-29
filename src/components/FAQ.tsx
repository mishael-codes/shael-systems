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
    answer: "Most websites are built and launched within 2-4 weeks. The exact timeline depends on your package and how quickly you provide content and feedback. The Starter package is usually fastest, while Growth and Pro plans may take a bit longer due to additional features. We'll give you a clear timeline before we start.",
  },
  {
    question: "Do you offer revisions?",
    answer: "Yes! Revisions are included in all packages during the building phase. We work closely with you to make sure your website is exactly what you want. After launch, monthly updates and changes are handled through your monthly support plan.",
  },
  {
    question: "What kind of support do you provide?",
    answer: "Every package includes monthly support that covers hosting, updates, security, and technical help. The Starter plan includes basic support, Growth adds monthly content updates, and Pro includes priority support with faster response times. We handle the tech so you can focus on your business.",
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
    return "We offer three packages: Starter at ₦500,000 (plus ₦60,000/month), Growth at ₦1,200,000 (plus ₦180,000/month), and Pro at ₦2,500,000 (plus ₦350,000/month). Each includes the one-time build fee plus monthly hosting, updates, and support. There are no hidden fees—we're transparent about pricing from the start.";
  }

  return "We offer three packages: Starter at $800 (plus $100/month), Growth at $1,800 (plus $300/month), and Pro at $3,500 (plus $600/month). Each includes the one-time build fee plus monthly hosting, updates, and support. There are no hidden fees—we're transparent about pricing from the start.";
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
