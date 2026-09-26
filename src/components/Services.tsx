"use client";

import { MessageCircle, Send } from "lucide-react";
import { Button } from "./ui/button";

export function Services() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-600 mb-4">
          Have a project in mind?
        </p>
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Need a project? Get a quote.
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Every business is different. Tell us what you want to build, and we’ll
          recommend the right approach, scope the work clearly, and send you a
          tailored quote.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 cursor-pointer px-8">
            <a href="#contact">
              <Send className="mr-2 h-5 w-5" />
              Get a Quote
            </a>
          </Button>
          <Button asChild size="lg" variant="outline" className="cursor-pointer px-8">
            <a
              href="https://wa.me/+2348067575432?text=Hi%2C%20I%27d%20like%20to%20get%20a%20quote%20for%20my%20project."
              target="_blank"
              rel="noreferrer"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Chat on WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
