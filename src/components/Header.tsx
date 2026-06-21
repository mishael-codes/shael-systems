import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    if (location.pathname === "/") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 text-2xl font-bold text-gray-900 hover:opacity-90 transition-opacity"
          ><img src="/images/S.webp" alt="Logo" className="w-12 h-12 rounded-lg" />
            <span className="text-blue-600">Shael</span> Systems
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("services");
              }}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("portfolio");
              }}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#process"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("process");
              }}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Process
            </a>
            <Button
              onClick={() => handleNavClick("contact")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6 text-gray-900" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900" />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pt-4 border-t border-gray-200 space-y-4">
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("services");
              }}
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              Services
            </a>
            <a
              href="#portfolio"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("portfolio");
              }}
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              Portfolio
            </a>
            <a
              href="#process"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick("process");
              }}
              className="block text-gray-700 hover:text-blue-600 transition-colors"
            >
              Process
            </a>
            <Button
              onClick={() => handleNavClick("contact")}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              Get Started
            </Button>
          </nav>
        )}
      </div>
    </header>
  );
}
