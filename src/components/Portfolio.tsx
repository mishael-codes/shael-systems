import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink, ArrowRight } from "lucide-react";
import { Card } from "./ui/card";
import { Link } from "react-router-dom";

const projects = [
  {
    id: "gift-pastries",
    title: "Gift Pastries",
    description:
      "Designed and developed a visually-driven e-commerce landing page for a boutique bakery. The site features a categorized product gallery and a specialized ordering system that translates complex custom cake requirements into structured WhatsApp inquiries",
    image: "images/gift-pastries.webp",
    link: "https://gift-pastries.netlify.app",
    tags: ["Landing Page", "Client Inquiry Portal"],
  },
  {
    id: "jemmy-glam",
    title: "Jemmy Glam",
    description:
      "Developed a high-conversion landing page for a beauty service provider, featuring a custom-built lead capture system that bridges the gap between web inquiries and direct client communication via WhatsApp",
    image: "images/jemmy-glam.webp",
    link: "https://jemmy-glam.vercel.app",
    tags: ["Client Inquiry Portal", "Responsive Design"],
  },
  {
    id: "cuttr",
    title: "Cuttr",
    description:
      "Created a user-friendly dashboard for a link shortening service, allowing users to easily manage and track their shortened URLs with real-time analytics and a clean, intuitive interface",
    image: "images/cuttr.webp",
    link: "https://cuttr.vercel.app",
    tags: ["Authentication", "CRUD", "Basic Analytics"],
  },
];

export function Portfolio() {
  return (
    <section className="py-20 px-6 bg-gray-50">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Our Recent Work
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real results for real businesses. See how we've helped others
            succeed.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Card
              key={project.id}
              className="overflow-hidden hover:shadow-xl transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="relative overflow-hidden">
                  <ImageWithFallback
                    src={project.image}
                    alt={project.title}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <Link
                    to={`/case-study/${project.id}`}
                    className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <span className="text-white font-semibold flex items-center gap-2 bg-blue-600 px-5 py-2.5 rounded-lg shadow-md hover:bg-blue-700 transition-colors">
                      Read Case Study
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                </div>

                <div className="p-6">
                  <Link
                    to={`/case-study/${project.id}`}
                    className="block group-hover:text-blue-600 transition-colors"
                  >
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {project.title}
                    </h3>
                  </Link>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-4 border-t border-gray-100 flex items-center justify-between">
                <Link
                  to={`/case-study/${project.id}`}
                  className="inline-flex items-center gap-1.5 text-blue-600 hover:text-blue-700 font-semibold text-sm group/btn"
                >
                  Read Case Study
                  <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </Link>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-gray-500 hover:text-gray-900 text-sm font-medium transition-colors"
                >
                  View Live
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
