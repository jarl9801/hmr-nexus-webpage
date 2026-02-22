import { useState, useRef, useCallback } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Navbar } from './sections/Navbar';
import { Hero } from './sections/Hero';
import { Values } from './sections/Values';
import { Services } from './sections/Services';
import { Products } from './sections/Products';
import { Stats } from './sections/Stats';
import { Portfolio } from './sections/Portfolio';
import { Contact } from './sections/Contact';
import { Footer } from './sections/Footer';
import { WhatsAppButton } from './components/WhatsAppButton';
import { ChatWidget } from './components/ChatWidget';
import { TrustBanner } from './components/TrustBanner';
import { TeamSection } from './components/TeamSection';
import { DualMap } from './components/DualMap';
import './i18n';

function App() {
  const [preselectedProjectType, setPreselectedProjectType] = useState<string>('');
  const contactRef = useRef<HTMLDivElement>(null);

  // Framer Motion scroll progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  const scrollToContact = useCallback((projectType?: string) => {
    if (projectType) {
      setPreselectedProjectType(projectType);
    }
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToServices = useCallback(() => {
    const servicesSection = document.getElementById('services');
    if (servicesSection) {
      servicesSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  const scrollToProducts = useCallback(() => {
    const productsSection = document.getElementById('products');
    if (productsSection) {
      productsSection.scrollIntoView({ behavior: 'smooth' });
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#050a14] text-white font-sans overflow-x-hidden">
      {/* Custom Cursor */}

      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 z-50 bg-gradient-to-r from-[#0066ff] to-[#a855f7] origin-left"
        style={{ scaleX }}
      />

      {/* Navbar */}
      <Navbar onScrollToContact={() => scrollToContact()} />

      {/* Main Content */}
      <main>
        <Hero
          onScrollToServices={scrollToServices}
          onScrollToProducts={scrollToProducts}
        />

        <TrustBanner />
        <Values />
        <Services />
        <Products onRequestDemo={() => scrollToContact('saas')} />
        <Stats />
        <DualMap />
        <TeamSection />
        <Portfolio />
        <div ref={contactRef}>
          <Contact preselectedType={preselectedProjectType} />
        </div>
      </main>

      <Footer />
      <WhatsAppButton />
      <ChatWidget />
    </div>
  );
}

export default App;
