import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ExternalLink } from "lucide-react";
import { Card } from "./ui/card";

const projects = [
  {
    title: "Gift Pastries",
    description:
      "Designed and developed a visually-driven e-commerce landing page for a boutique bakery. The site features a categorized product gallery and a specialized ordering system that translates complex custom cake requirements into structured WhatsApp inquiries",
    image: "images/gift-pastries.png",
    link: "https://gift-pastries.netlify.app",
    tags: ["Landing Page", "Client Inquiry Portal"],
  },
  {
    title: "Jemmy Glam",
    description:
      "Developed a high-conversion landing page for a beauty service provider, featuring a custom-built lead capture system that bridges the gap between web inquiries and direct client communication via WhatsApp",
    image: "images/jemmy-glam.png",
    link: "https://jemmy-glam.vercel.app",
    tags: ["Client Inquiry Portal", "Responsive Design"],
  },
  {
    title: "Cuttr",
    description:
      "Created a user-friendly dashboard for a link shortening service, allowing users to easily manage and track their shortened URLs with real-time analytics and a clean, intuitive interface",
    image:
      "images/cuttr.png",
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
          {projects.map((project, index) => (
            <Card
              key={index}
              className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <ImageWithFallback
                  src={project.image}
                  alt={project.title}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center pb-4">
                  <div className="text-white flex items-center gap-2">
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold"
                    >
                      View Site
                    </a>
                    <ExternalLink className="w-4 h-4" />
                  </div>
                </div>
              </div>

              <div className="p-6">
               <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-black decoration-none"
                    > <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {project.title}
                </h3></a>
                <p className="text-gray-600 mb-4">{project.description}</p>

                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
