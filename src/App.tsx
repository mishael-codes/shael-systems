import { useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Testimonials } from "./components/Testimonials";
import { Problem } from "./components/Problem";
import { Solution } from "./components/Solution";
import { Services } from "./components/Services";
import { Portfolio } from "./components/Portfolio";
import { Process } from "./components/Process";
import { FAQ } from "./components/FAQ";
import { ContactCTA } from "./components/ContactCTA";
import { LandingPages } from "./components/LandingPages";
import { Footer } from "./components/Footer";
import { CaseStudy } from "./components/CaseStudy";
import { NotFound } from "./components/NotFound";
import { MockupModal } from "./components/MockupModal";
import { PrivacyPolicy, TermsOfService } from "./components/LegalPages";

function ScrollToHashElement() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element)
        setTimeout(() => element.scrollIntoView({ behavior: "smooth" }), 100);
    } else if (pathname === "/") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash, pathname]);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal");
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }),
      { threshold: 0.12 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}

function Home({ onMockupClick }: { onMockupClick: () => void }) {
  return (
    <>
      <Hero onMockupClick={onMockupClick} />
      <div className="reveal">
        <Testimonials />
      </div>
      <div className="reveal reveal-delay-1">
        <Problem />
      </div>
      <div className="reveal">
        <Solution />
      </div>
      <div id="services" className="reveal">
        <Services />
      </div>
      <div id="portfolio" className="reveal reveal-delay-1">
        <Portfolio />
      </div>
      <div id="process" className="reveal">
        <Process />
      </div>
      <div className="reveal">
        <FAQ />
      </div>
      <div className="reveal">
        <ContactCTA />
      </div>
    </>
  );
}

export default function App() {
  const [isMockupModalOpen, setIsMockupModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header onMockupClick={() => setIsMockupModalOpen(true)} />
      <ScrollToHashElement />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Home onMockupClick={() => setIsMockupModalOpen(true)} />
            }
          />
          <Route path="/landing-pages" element={<LandingPages />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MockupModal
        open={isMockupModalOpen}
        onClose={() => setIsMockupModalOpen(false)}
      />
    </div>
  );
}
