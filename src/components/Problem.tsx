import { XCircle } from "lucide-react";

const problems = [
  {
    title: "Low Conversions",
    description: "Visitors leave without taking action or contacting you",
  },
  {
    title: "Poor Mobile Experience",
    description: "Your customer experience breaks down across phones, tablets, and desktops",
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
    <section className="section-shell py-24 px-6 bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-start gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="max-w-xl lg:sticky lg:top-28">
            <p className="mb-5 font-mono text-xs uppercase tracking-[0.24em] text-red-500">
              Friction worth fixing
            </p>
            <h2 className="text-3xl font-bold leading-tight tracking-tight text-gray-900 sm:text-4xl">
              Digital products should move your business forward
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-gray-600">
              Are you struggling with any of these common issues?
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {problems.map((problem, index) => (
              <div
                key={index}
                className="group rounded-xl border border-red-200 bg-red-50/50 p-6 transition-all hover:-translate-y-1 hover:border-red-300 hover:bg-red-50"
              >
                <div className="mb-10 flex items-start justify-between">
                  <span className="font-mono text-xs text-red-400">0{index + 1}</span>
                  <XCircle className="h-8 w-8 text-red-500 transition-transform group-hover:rotate-12" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-gray-900">{problem.title}</h3>
                <p className="text-sm leading-relaxed text-gray-600">{problem.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
