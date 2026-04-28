import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Star } from "lucide-react";
import { Card } from "./ui/card";

const testimonials = [
  {
    name: "Sarah Mitchell",
    role: "Owner, Artisan Bakery",
    image:
      "https://images.unsplash.com/photo-1610387694365-19fafcc86d86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFuJTIwcG9ydHJhaXR8ZW58MXx8fHwxNzc2Mzk5OTc3fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    text: "Shael Systems built us a beautiful website that doubled our online orders in just 2 months. The team was professional and delivered exactly what we needed.",
  },
  {
    name: "Jemimah Fagbemi",
    role: "CEO, Jemmy-Glam",
    image:
      "/public/images/Jemimah-Fagbemi.jpeg",
    text: "Shael Systems provided a professional platform for my business, allowing clients to view my service menu and schedule appointments with much greater efficiency.",
  },
  {
    name: "Emma Rodriguez",
    role: "CEO, FitLife Studio",
    image:
      "https://images.unsplash.com/photo-1553484771-6e117b648d45?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbnRyZXByZW5ldXIlMjBzdGFydHVwJTIwZm91bmRlcnxlbnwxfHx8fDE3NzY0MDExMjF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    text: "Our new website is fast, mobile-friendly, and actually brings in customers. The booking system they integrated has transformed how we manage our business.",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Growing Businesses
          </h2>
          <p className="text-lg text-gray-600">
            See what our clients say about working with us
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-8 hover:shadow-lg transition-shadow">
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-4">
                <ImageWithFallback
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
