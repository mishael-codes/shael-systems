import { XCircle } from "lucide-react";

const problems = [
  {
    title: "Low Conversions",
    description: "Visitors leave without taking action or contacting you",
  },
  {
    title: "Poor Mobile Experience",
    description: "Your site looks broken or hard to use on phones and tablets",
  },
  {
    title: "Slow Loading Speed",
    description: "Pages take forever to load, frustrating potential customers",
  },
  {
    title: "Confusing Layout",
    description: "Visitors can't find what they need or understand your offer",
  },
];

export function Problem() {
  return (
    <section className="py-20 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Most Business Websites Don't Bring Results
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Are you struggling with any of these common issues?
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {problems.map((problem, index) => (
            <div
              key={index}
              className="p-6 rounded-xl border border-red-200 bg-red-50/50 hover:border-red-300 transition-colors"
            >
              <XCircle className="w-10 h-10 text-red-500 mb-4" />
              <h3 className="font-semibold text-gray-900 mb-2">{problem.title}</h3>
              <p className="text-sm text-gray-600">{problem.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
