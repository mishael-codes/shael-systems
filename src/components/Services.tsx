import { Check } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const packages = [
  {
    name: "Booking & Lead Gen Sites",
    price: "₦250,000",
    features: [
      "Clients can book appointments without calling you",
      "Automatic follow-up messages via WhatsApp & email",
      "A website designed to turn visitors into paying clients",
      "Capture leads even while you're offline",
      "Customers can find and locate your business easily",
      "Looks great on phones, tablets, and desktops",
      "Shows up when people search for your service on Google",
      "3 months of support after launch",
    ],
  },
  {
    name: "E-Commerce Sites",
    price: "₦500,000",
    features: [
      "Showcase all your products in a clean, shoppable store",
      "Accept payments securely from anywhere in the world",
      "Know exactly what's in stock without manual counting",
      "Customers get instant updates on their orders",
      "Run sales and promos that actually drive purchases",
      "Shoppers can save favourites and come back to buy",
      "A store that works perfectly on any device",
      "3 months of priority support after launch",
    ],
    popular: true,
  },
  {
    name: "Custom Web Applications",
    // description: "Complete digital transformation",
    price: "₦800,000",
    features: [
      "A private dashboard to manage your entire business",
      "Secure login so only the right people have access",
      "All your business data stored and organised in one place",
      "Booking or reporting system built around how you work",
      "Repetitive tasks handled automatically, saving you hours",
      "See exactly how your business is performing, in real time",
      "Get paid directly through your platform",
      "6 months of priority support after launch",
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
    <section className="section-shell py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            The right digital system for the next stage of your business
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From focused marketing sites to full business platforms, we shape the scope around what your team and customers actually need.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {packages.map((pkg, index) => (
            <Card
              key={index}
              className={`p-8 relative border ${pkg.popular ? "border-blue-600 shadow-lg" : "border-gray-200"}`}
            >
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {pkg.name}
                </h3>
                <div className="text-4xl font-bold text-gray-900">
                  <span className="text-xs">Starting from</span> <br />{pkg.price}
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
                className={`w-full cursor-pointer ${pkg.popular ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-900 hover:bg-gray-800"}`}
                size="lg"
                onClick={() => handleChoosePlan(pkg.name)}
              >
                {pkg.name === "Custom Web Applications" ? "Book Discovery Call" : "Get A Quote"}
              </Button>
            </Card>
          ))}
        </div>

        {/* Custom quote CTA */}
        <div className="mt-16 text-center bg-gray-50 border border-gray-200 rounded-2xl px-8 py-12">
          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Need something different?
          </h3>
          <p className="text-gray-600 max-w-xl mx-auto mb-8">
            Every business is unique. If your project doesn't fit one of the
            categories above, we'll create a custom solution tailored to your
            goals.
          </p>
          <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 cursor-pointer px-8"
            onClick={() => {
              const message = `Hi! I'd like to request a custom quote for my project.`;
              window.open(
                `https://wa.me/2348167177172?text=${encodeURIComponent(message)}`,
                "_blank",
              );
            }}
          >
            Request a Custom Quote
          </Button>
        </div>
      </div>
    </section>
  );
}
