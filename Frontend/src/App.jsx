import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { LoadingScreen } from './components/LoadingScreen';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Capabilities } from './components/Capabilities';
import { ProcessBanner } from './components/ProcessBanner';
import { About } from './components/About';
import { PillarsBanner } from './components/PillarsBanner';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { ContactModal } from './components/ContactModal';
import { Toast } from './components/Toast';

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  return (
    <div className="min-h-screen bg-[#0B0B0E] text-zinc-900 font-sans selection:bg-brand-purple selection:text-white relative">
      
      {/* Loading Screen Preloader */}
      <AnimatePresence>
        {isLoading && (
          <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>

      {/* Main Page Layout */}
      {!isLoading && (
        <div className="relative">
          {/* Sticky Navigation */}
          <Navbar onOpenContact={() => setIsContactOpen(true)} />

          {/* Hero Section with Cutout & Scroll Zoom */}
          <main>
            <Hero onOpenContact={() => setIsContactOpen(true)} />

            {/* Featured Projects with Filters */}
            <Projects />

            {/* What I Do Best / Capabilities */}
            <Capabilities />

            {/* Section 03: Design Process Banner - No Magic Just Design */}
            <ProcessBanner />

            {/* About & Skills Group with "Show More" + Disappearing Fade */}
            <About />

            {/* Three Pillars */}
            <PillarsBanner />

            {/* Good Questions / FAQ */}
            <FAQ />
          </main>

          {/* Footer & High Impact Call to Action */}
          <Footer
            onOpenContact={() => setIsContactOpen(true)}
            onShowToast={showToast}
          />

          {/* Interactive Contact Modal */}
          <ContactModal
            isOpen={isContactOpen}
            onClose={() => setIsContactOpen(false)}
            onShowToast={showToast}
          />

          {/* Toast Notification Container */}
          <Toast
            isVisible={toast.visible}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
          />
        </div>
      )}
    </div>
  );
}

export default App;
