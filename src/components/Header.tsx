import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const handleNavClick = (id: string) => { setIsMenuOpen(false); if (location.pathname === "/") document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); else navigate(`/#${id}`); };
  return (
    <header className="sticky top-0 z-50 border-b border-blue-100 bg-white/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3 text-xl font-semibold tracking-tight text-slate-950"><img src="/images/S.webp" alt="Shael Systems logo" className="size-10 rounded-lg" /><span><span className="text-blue-600">Shael</span> Systems</span></Link>
        <nav className="hidden items-center gap-8 md:flex"><a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick("services"); }} className="text-sm text-slate-600 transition-colors hover:text-blue-600">Services</a><a href="#portfolio" onClick={(e) => { e.preventDefault(); handleNavClick("portfolio"); }} className="text-sm text-slate-600 transition-colors hover:text-blue-600">Selected work</a><a href="#process" onClick={(e) => { e.preventDefault(); handleNavClick("process"); }} className="text-sm text-slate-600 transition-colors hover:text-blue-600">Process</a><Button onClick={() => handleNavClick("contact")} className="rounded-lg bg-blue-600 hover:bg-blue-700">Start a project <ArrowUpRight data-icon="inline-end" /></Button></nav>
        <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">{isMenuOpen ? <X className="size-6 text-slate-950" /> : <Menu className="size-6 text-slate-950" />}</button>
      </div>
      {isMenuOpen && <nav className="flex flex-col gap-4 border-t border-blue-100 px-6 py-5 md:hidden"><a href="#services" onClick={(e) => { e.preventDefault(); handleNavClick("services"); }} className="text-slate-700">Services</a><a href="#portfolio" onClick={(e) => { e.preventDefault(); handleNavClick("portfolio"); }} className="text-slate-700">Selected work</a><a href="#process" onClick={(e) => { e.preventDefault(); handleNavClick("process"); }} className="text-slate-700">Process</a><Button onClick={() => handleNavClick("contact")} className="rounded-lg bg-blue-600 hover:bg-blue-700">Start a project</Button></nav>}
    </header>
  );
}
