import { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";

export function NotFound() {
  useEffect(() => {
    const prev = document.title;
    document.title = "404 — Page Not Found | Shael Systems";
    return () => { document.title = prev; };
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-20">
      <div className="text-center max-w-lg">
        {/* Icon */}
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-50 border border-blue-100 mb-8">
          <Compass className="w-10 h-10 text-blue-600" strokeWidth={1.5} />
        </div>

        {/* Heading */}
        <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 mb-3">
          404 — Page not found
        </p>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-900 leading-tight mb-4">
          Looks like you're lost.
        </h1>
        <p className="text-lg text-slate-500 leading-relaxed mb-10">
          The page you're looking for doesn't exist, was moved, or the URL might
          have a typo. Let's get you back on track.
        </p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Homepage
          </Link>
          <Link
            to="/#portfolio"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white hover:bg-slate-100 text-slate-800 font-semibold rounded-lg border border-slate-200 shadow-sm transition-all"
          >
            View Our Work
          </Link>
        </div>
      </div>
    </main>
  );
}
