import { useEffect } from "react";
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
import { Footer } from "./components/Footer";
import { CaseStudy } from "./components/CaseStudy";

function ScrollToHashElement() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.substring(1));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } else if (pathname === "/") {
      // Only scroll to top on home page load if there is no hash
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [hash, pathname]);

  return null;
}

function Home() {
  return (
    <>
      <Hero />
      <Testimonials />
      <Problem />
      <Solution />
      <div id="services">
        <Services />
      </div>
      <div id="portfolio">
        <Portfolio />
      </div>
      <div id="process">
        <Process />
      </div>
      <FAQ />
      <ContactCTA />
    </>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <Header />
      <ScrollToHashElement />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/case-study/:id" element={<CaseStudy />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
