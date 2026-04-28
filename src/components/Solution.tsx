import { CheckCircle2, Zap, Smartphone, Target } from "lucide-react";
import { Card } from "./ui/card";

const solutions = [
  {
    icon: Target,
    title: "Conversion-Focused Design",
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
    description: "Flawless experience across all devices—desktop, tablet, and mobile—for maximum reach.",
  },
  {
    icon: CheckCircle2,
    title: "Lead Capture Systems",
    description: "Integrated contact forms, WhatsApp chat, and analytics to capture and track every opportunity.",
  },
];

export function Solution() {
  return (
    <section className="py-20 px-6 bg-linear-to-b from-white to-blue-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            We Build Websites That Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our proven approach focuses on what matters most: results for your business
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {solutions.map((solution, index) => {
            const Icon = solution.icon;
            return (
              <Card
                key={index}
                className="p-8 text-center hover:shadow-xl transition-all hover:-translate-y-1"
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
      </div>
    </section>
  );
}
