import { Check } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const packages = [
  {
    name: "Starter",
    description: "Perfect for small businesses getting online",
    price: "₦150,000",
    features: [
      "Simple website (1-3 pages)",
      "Mobile responsive design",
      "Contact form integration",
      "Basic SEO optimization",
      "1 month support",
    ],
  },
  {
    name: "Growth",
    description: "For businesses ready to scale",
    price: "₦500,000",
    popular: true,
    features: [
      "Conversion-focused landing page",
      "Lead capture integration",
      "Analytics setup",
      "WhatsApp chat integration",
      "Sales Funnel Design",
      "Speed optimization",
      "3 months support",
    ],
  },
  {
    name: "Premium",
    description: "Complete digital transformation",
    price: "₦750,000+",
    features: [
      "Custom web app features",
      "User Authentication",
      "Database Integration",
      "Booking or dashboard system",
      "Full business automation",
      "Advanced analytics & tracking",
      "Payment integration",
      "6 months priority support",
    ],
  },
];

export function Services() {
  const handleChoosePlan = (planName: string) => {
    const message = `Hi! I'm interested in the ${planName} package.`;
    window.open(`https://wa.me/2348167177172?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. All packages include modern design and clean code.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`p-8 relative ${pkg.popular
                  ? "border-2 border-blue-600 shadow-xl scale-105"
                  : "border border-gray-200"
                }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                <p className="text-gray-600 mb-4">{pkg.description}</p>
                <div className="text-4xl font-bold text-gray-900">{pkg.price}</div>
              </div>

              <ul className="space-y-4 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
                    <span className="text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${pkg.popular
                    ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-gray-900 hover:bg-gray-800"
                  }`}
                size="lg"
                onClick={() => handleChoosePlan(pkg.name)}
              >
                Choose Plan
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
