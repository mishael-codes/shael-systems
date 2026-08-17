import { ArrowUpRight, MessageCircle } from "lucide-react";
import { Button } from "./ui/button";

export function Hero() {
  const handleWhatsApp = () => window.open("https://wa.me/+2348067575432?text=Hi, I'm interested in your web services", "_blank");
  const handleGetStarted = () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });

  return (
    <section className="relative overflow-hidden border-b border-blue-100 bg-white px-6 pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_.98fr] lg:gap-20">
        <div className="reveal is-visible text-center lg:text-left">
          <p className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-blue-600">Digital experiences for ambitious businesses</p>
          <h1 className="max-w-3xl text-5xl font-semibold leading-[0.98] text-slate-950 sm:text-7xl lg:text-[5.7rem]">Build the digital product your business is ready for.</h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-8 text-slate-600 lg:mx-0">Shael Systems creates clear, credible digital experiences for the way your business works, from ecommerce stores and booking sites to SaaS dashboards and custom platforms.</p>
          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
            <Button size="lg" className="h-14 rounded-lg bg-blue-600 px-7 text-base hover:bg-blue-700" onClick={handleGetStarted}>Start a project <ArrowUpRight data-icon="inline-end" /></Button>
            <Button size="lg" variant="outline" className="h-14 rounded-lg border-blue-200 px-7 text-base text-blue-700 hover:bg-blue-50" onClick={handleWhatsApp}><MessageCircle data-icon="inline-start" /> Talk with us</Button>
          </div>
          <div className="mt-12 grid grid-cols-3 border-y border-slate-200 py-5 text-left">
            <div><p className="text-2xl font-semibold text-slate-950">40+</p><p className="mt-1 text-xs uppercase tracking-wide text-slate-500">Projects shipped</p></div>
            <div className="border-l border-slate-200 pl-4"><p className="text-2xl font-semibold text-slate-950">3x</p><p className="mt-1 text-xs uppercase tracking-wide text-slate-500">More clarity</p></div>
            <div className="border-l border-slate-200 pl-4"><p className="text-2xl font-semibold text-slate-950">4.9</p><p className="mt-1 text-xs uppercase tracking-wide text-slate-500">Client rating</p></div>
          </div>
        </div>
        <div className="reveal reveal-delay-2 is-visible relative">
          <div className="overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 shadow-[0_24px_70px_rgba(37,99,235,0.16)]"><video src="/videos/min-store-demo.webm" autoPlay loop muted playsInline preload="metadata" className="aspect-[4/3] w-full object-cover" /></div>
          <div className="absolute -bottom-5 -left-5 hidden rounded-xl border border-blue-100 bg-white px-5 py-4 shadow-xl sm:block"><p className="text-xs font-semibold uppercase tracking-wider text-blue-600">Built to convert</p><p className="mt-1 text-sm text-slate-700">Strategy, design and development</p></div>
        </div>
      </div>
    </section>
  );
}
