import { useParams, Link } from "react-router-dom";
import { useEffect } from "react";
import { caseStudies } from "../data/caseStudies";
import {
  ArrowLeft,
  Calendar,
  Briefcase,
  User,
  ExternalLink,
  CheckCircle2,
  Target,
  Lightbulb,
  ArrowRight
} from "lucide-react";

export function CaseStudy() {
  const { id } = useParams<{ id: string }>();
  const project = caseStudies.find((c) => c.id === id);

  // Scroll to top when route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6 py-12">
        <div className="text-center max-w-md">
          <h2 className="text-3xl font-extrabold text-gray-900 mb-4">Case Study Not Found</h2>
          <p className="text-gray-600 mb-8">
            The case study you are looking for does not exist or has been moved.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Homepage
          </Link>
        </div>
      </div>
    );
  }

  // Get other case studies for the bottom section
  const otherProjects = caseStudies.filter((c) => c.id !== id);

  return (
    <article className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Hero Header Section */}
      <div className="relative bg-slate-900 text-white overflow-hidden py-24 sm:py-32">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(37,99,235,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-linear-to-b from-slate-900/40 via-slate-900/80 to-slate-950" />
        
        <div className="relative mx-auto max-w-7xl px-6">
          {/* Back Navigation */}
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors group text-sm font-medium"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Portfolio
          </Link>

          {/* Title & Tagline */}
          <div className="max-w-3xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 text-blue-300 text-xs font-semibold rounded-full uppercase tracking-wider"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
              {project.title}
            </h1>
            <p className="text-xl sm:text-2xl text-slate-300 leading-relaxed font-light">
              {project.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="mx-auto max-w-7xl px-6 mt-12">
        <div className="grid gap-12 lg:grid-cols-3 items-start">
          
          {/* Left/Middle: Case Study Body */}
          <div className="lg:col-span-2 space-y-12">
            {/* Overview / Introduction */}
            <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 mb-4">Executive Summary</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                {project.description}
              </p>
            </section>

            {/* Challenge & Solution Grid */}
            <div className="grid gap-8 sm:grid-cols-2">
              {/* Challenge Card */}
              <section className="bg-white p-8 rounded-2xl border-l-4 border-red-500 border-t border-r border-b border-slate-100 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-red-50 text-red-600 rounded-lg">
                    <Target className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">The Challenge</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {project.challenge}
                </p>
              </section>

              {/* Solution Card */}
              <section className="bg-white p-8 rounded-2xl border-l-4 border-blue-500 border-t border-r border-b border-slate-100 shadow-xs">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                    <Lightbulb className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900">Our Solution</h3>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  {project.solution}
                </p>
              </section>
            </div>

            {/* Key Features */}
            <section className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Key Implementations & Features</h2>
              <ul className="space-y-4">
                {project.features.map((feature, i) => {
                  const [title, desc] = feature.split(":");
                  return (
                    <li key={i} className="flex items-start gap-4">
                      <div className="p-1 bg-green-50 text-green-600 rounded-full mt-1 shrink-0">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                      <div>
                        <strong className="text-slate-900 font-semibold">{title}</strong>
                        {desc && <span className="text-slate-600">{desc}</span>}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>

            {/* Results / Business Impact */}
            <section className="bg-linear-to-br from-slate-900 to-slate-950 text-white p-8 sm:p-10 rounded-2xl shadow-xl">
              <h2 className="text-2xl font-bold mb-6">The Results & Impact</h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {project.results.map((result, i) => (
                  <div key={i} className="bg-white/5 border border-white/10 p-6 rounded-xl">
                    <p className="text-slate-300 text-sm font-medium leading-relaxed">
                      {result}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Right: Sidebar Metadata */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs space-y-6">
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">
                Project Information
              </h3>
              
              <div className="space-y-4">
                {/* Client */}
                <div className="flex items-start gap-3">
                  <User className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Client</h4>
                    <p className="text-slate-800 font-medium">{project.client}</p>
                  </div>
                </div>

                {/* Role */}
                <div className="flex items-start gap-3">
                  <Briefcase className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Our Role</h4>
                    <p className="text-slate-800 font-medium">{project.role}</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="flex items-start gap-3">
                  <Calendar className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400">Timeline</h4>
                    <p className="text-slate-800 font-medium">{project.timeline}</p>
                  </div>
                </div>
              </div>

              {/* Technologies */}
              <div className="border-t border-slate-100 pt-6">
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Technologies Used</h4>
                <div className="flex flex-wrap gap-2">
                  {project.techStack.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-slate-100 text-slate-800 text-sm font-medium rounded-md"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <div className="border-t border-slate-100 pt-6">
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm hover:shadow-md transition-all text-center"
                >
                  Visit Live Site
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Other Case Studies Recommendations */}
        {otherProjects.length > 0 && (
          <section className="mt-20 pt-16 border-t border-slate-200">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Explore Other Case Studies
            </h2>
            <div className="grid gap-8 sm:grid-cols-2">
              {otherProjects.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-xs hover:shadow-md transition-shadow flex flex-col justify-between"
                >
                  <div>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {item.tags.slice(0, 2).map((tag, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 bg-blue-50 text-blue-700 text-xs font-medium rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                    <p className="text-slate-600 text-sm line-clamp-2 mb-4">{item.description}</p>
                  </div>
                  <Link
                    to={`/case-study/${item.id}`}
                    className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm group"
                  >
                    Read Case Study
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
