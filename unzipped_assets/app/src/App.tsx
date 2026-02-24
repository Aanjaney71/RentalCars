import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navigation from './components/Navigation';
import FloatingButtons from './components/FloatingButtons';
import Hero from './sections/Hero';
import Fleet from './sections/Fleet';
import Booking from './sections/Booking';
import WhyChooseMe from './sections/WhyChooseMe';
import HowItWorks from './sections/HowItWorks';
import Testimonials from './sections/Testimonials';
import Pricing from './sections/Pricing';
import FAQ from './sections/FAQ';
import Footer from './sections/Footer';
import { siteConfig } from './config';
import './App.css';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Update document metadata
    if (siteConfig.siteTitle) {
      document.title = siteConfig.siteTitle;
    }
    if (siteConfig.siteDescription) {
      const meta = document.querySelector('meta[name="description"]');
      if (meta) meta.setAttribute('content', siteConfig.siteDescription);
    }
    if (siteConfig.language) {
      document.documentElement.lang = siteConfig.language;
    }

    // Initialize ScrollTrigger refresh on load
    ScrollTrigger.refresh();

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0A0A0F]">
      {/* Navigation */}
      <Navigation />

      {/* Main Content */}
      <main className="relative w-full overflow-x-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Fleet Section */}
        <Fleet />

        {/* Booking Section */}
        <Booking />

        {/* Why Choose Us Section */}
        <WhyChooseMe />

        {/* How It Works Section */}
        <HowItWorks />

        {/* Testimonials Section */}
        <Testimonials />

        {/* Pricing Section */}
        <Pricing />

        {/* FAQ Section */}
        <FAQ />

        {/* Footer */}
        <Footer />
      </main>

      {/* Floating Buttons (WhatsApp + Scroll to Top) */}
      <FloatingButtons />
    </div>
  );
}

export default App;
