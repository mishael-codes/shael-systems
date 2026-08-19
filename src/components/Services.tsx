import { Check } from "lucide-react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";

const packages = [
  {
    name: "Booking and Appointment Sites",
    price: "$999.99",
    features: [
      "Clients can book appointments without calling you",
      "Customers can quickly find your business details and contact information",
      "Your site feels professional and easy to use on every device",
      "A smooth experience for visitors on phones, tablets, and desktops",
      "Three months of support after launch",
    ],
  },
  {
    name: "E-Commerce Websites",
    price: "$2,499.99",
    features: [
      "Display your products in a clean, easy to browse store",
      "Accept payments securely from customers anywhere in the world",
      "Keep track of stock and orders without manual hassle",
      "Customers receive updates on their purchases with ease",
      "Create a shopping experience that feels simple and professional",
      "A store that works smoothly on any device",
      "Three months of priority support after launch",
    ],
    popular: true,
  },
  {
    name: "Custom Web Development",
    // description: "Complete digital transformation",
    price: "$4,999.99",
    features: [
      "A private dashboard to manage your business operations",
      "Secure access for only the right people",
      "Keep your business data organised in one place",
      "Automate repetitive tasks and save valuable time",
      "Track your performance with clear insights and analytics",
      "Accept payments directly through your platform",
      "Six months of priority support after launch",
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
            Web solutions for businesses of every kind
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Transparent pricing with no hidden fees. Every package includes modern
            design, clean code, and a user friendly experience.
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
                {pkg.name === "Custom Web Development" ? "Book Discovery Call" : "Get A Quote"}
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
