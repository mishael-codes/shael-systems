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

export default function App() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main>
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
      </main>
      <Footer />
    </div>
  );
}
