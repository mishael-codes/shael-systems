import { Search, Palette, Code, Rocket } from "lucide-react";

const steps = [
  {
    icon: Search,
    number: "01",
    title: "Discovery",
    description: "We get to know you, your business, and what you want to achieve.",
  },
  {
    icon: Palette,
    number: "02",
    title: "Design",
    description: "We craft a beautiful, conversion-focused layout tailored to your brand.",
  },
  {
    icon: Code,
    number: "03",
    title: "Development",
    description: "We code it clean, fast, and optimized for speed and performance.",
  },
  {
    icon: Rocket,
    number: "04",
    title: "Launch",
    description: "You're live! We hand over the keys and stay close for any questions or tweaks.",
  },
];

export function Process() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Simple Process
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From concept to launch, we make building your website easy and stress-free
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div key={index} className="relative">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-12 left-[60%] w-[80%] h-0.5 bg-linear-to-r from-blue-600 to-blue-300"></div>
                )}

                <div className="relative bg-white p-6 rounded-xl text-center">
                  {/* Number */}
                  <div className="text-6xl font-bold text-blue-100 mb-4">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 text-white mb-4 -mt-12">
                    <Icon className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
