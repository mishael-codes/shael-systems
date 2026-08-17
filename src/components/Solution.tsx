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
    <section className="section-shell bg-blue-950 px-6 py-24 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <div className="order-2 grid gap-4 sm:grid-cols-2 lg:order-1">
            {solutions.map((solution, index) => {
              const Icon = solution.icon;
              return (
                <Card
                  key={index}
                  className="group flex min-h-64 flex-col justify-between border-blue-900 bg-blue-900/60 p-6 text-white transition-all hover:-translate-y-1 hover:border-blue-700 hover:bg-blue-900"
                >
                  <div className="flex items-start justify-between">
                    <span className="font-mono text-xs text-blue-300">0{index + 1}</span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-600 text-white transition-transform group-hover:rotate-6">
                      <Icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="mb-3 text-lg font-semibold text-white">{solution.title}</h3>
                    <p className="text-sm leading-relaxed text-blue-100">{solution.description}</p>
                  </div>
                </Card>
              );
            })}
          </div>

          <div className="order-1 max-w-xl lg:order-2 lg:sticky lg:top-28">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-blue-300">
              Built with intention
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-white sm:text-4xl">
              We build digital products with a job to do
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-blue-100">
              Our approach balances strategy, craft, and the practical details that make a product useful every day
            </p>
          </div>
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
