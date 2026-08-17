import { CheckCircle2, Zap, Smartphone, Target } from "lucide-react";
import { Card } from "./ui/card";
//import { ImageWithFallback } from "./figma/ImageWithFallback";

const solutions = [
  {
    icon: Target,
    title: "Conversion Focused Design",
    description: "Every element is strategically placed to guide visitors toward taking action and becoming customers.",
  },
  {
    icon: Zap,
    title: "Fast Performance",
    description: "Lightning-fast loading times keep visitors engaged and improve your search engine rankings.",
  },
  {
    icon: Smartphone,
    title: "Mobile Optimization",
    description: "Flawless experience across all devices including desktop, tablet, and mobile for maximum reach.",
  },
  {
    icon: CheckCircle2,
    title: "Lead Capture Systems",
    description: "Integrated contact forms, WhatsApp chat, and analytics to capture and track every opportunity.",
  },
];

export function Solution() {
  return (
    <section className="section-shell py-24 px-6 bg-linear-to-b from-white to-blue-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            We build digital products with a job to do
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our approach balances strategy, craft, and the practical details that make a product useful every day
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 mb-5">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Card
                key={index}
                className="p-8 flex flex-col items-center justify-center text-center hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-6">
                  <Icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {solution.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {solution.description}
                </p>
              </Card>
            );
          })}
        </div>
        {/* <ImageWithFallback
          src="/images/results.png"
          alt="results.png"
          className="w-full h-auto object-contain"
        /> */}
      </div>
    </section>
  );
}
