import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="mx-auto max-w-7xl px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="text-2xl font-bold text-gray-900">
            <span className="text-blue-600">Shael</span> Systems
          </div>

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
