import { Check } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const packages = [
  {
    name: "Booking & Lead Gen Sites",
    // description: "For businesses ready to scale",
    price: "₦250,000",
    features: [
      "Online booking and calendar integration",
      "WhatsApp and email automation",
      "High-converting sales page",
      "Contact & lead capture forms",
      "Google Maps & location embed",
      "Mobile-responsive design",
      "Basic SEO setup",
      "3 months support",
    ],
  },
  {
    name: "E-Commerce Sites",
    // description: "Perfect for small businesses getting online",
    price: "₦500,000",
    features: [
      "Full product catalogue & categories",
      "Secure checkout & payment integration",
      "Inventory & stock management",
      "Order tracking & notifications",
      "Discount codes & promotions",
      "Customer accounts & wishlists",
      "Mobile-responsive storefront",
      "3 months priority support",
    ],
  },
  {
    name: "Custom Web Applications",
    // description: "Complete digital transformation",
    price: "₦800,000",
    features: [
      "Admin portal",
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
    window.open(
      `https://wa.me/2348167177172?text=${encodeURIComponent(message)}`,
      "_blank",
    );
  };

  return (
    <section className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. All packages include modern
            design and clean code.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`p-8 relative border border-gray-200`}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {pkg.name}
                </h3>
                {/* <p className="text-gray-600 mb-4">{pkg.description}</p> */}
                <div className="text-4xl font-bold text-gray-900">
                  {pkg.price}
                </div>
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
                className={`w-full bg-gray-900 hover:bg-gray-800 cursor-pointer`}
                size="lg"
                onClick={() => handleChoosePlan(pkg.name)}
              >
                Get {pkg.name.split(' ')[0]} Quote
              </Button>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
