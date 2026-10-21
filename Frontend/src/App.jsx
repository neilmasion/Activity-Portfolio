import React, { useState, useEffect, Suspense, lazy } from 'react';
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
import { Toast } from './components/Toast';
import { CookieConsent } from './components/CookieConsent';
import { Analytics } from '@vercel/analytics/react';
import { trackVisit } from './utils/visitorTracker';

// Performance: Code-split admin portal & modals to keep initial bundle ultra-lean
const AdminPortal = lazy(() => import('./components/admin/AdminPortal'));
const ContactModal = lazy(() => import('./components/ContactModal').then(m => ({ default: m.ContactModal })));
const PrivacyPolicyModal = lazy(() => import('./components/PrivacyPolicyModal').then(m => ({ default: m.PrivacyPolicyModal })));
const TermsModal = lazy(() => import('./components/TermsModal').then(m => ({ default: m.TermsModal })));

export function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname || '/';
    }
    return '/';
  });

  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' });

  // Handle route switching & browser history popstate
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname || '/');
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigateTo = (path) => {
    if (window.location.pathname !== path) {
      window.history.pushState({}, '', path);
    }
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdminRoute = currentPath === '/admin' || currentPath.startsWith('/admin') || (typeof window !== 'undefined' && window.location.hash === '#admin');

  // Track page visit anonymously when visiting public portfolio pages
  useEffect(() => {
    if (!isAdminRoute) {
      trackVisit(currentPath);
    }
  }, [currentPath, isAdminRoute]);

  const showToast = (message, type = 'success') => {
    setToast({ visible: true, message, type });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3500);
  };

  // If visiting /admin, directly render the Admin Portal
  if (isAdminRoute) {
    return (
      <div className="min-h-screen bg-[#0B0B0E] text-zinc-100 font-sans selection:bg-brand-purple selection:text-white">
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center bg-[#0B0B0E] text-zinc-400 font-mono text-xs">
              Loading Admin Portal...
            </div>
          }
        >
          <AdminPortal onBackToPortfolio={() => navigateTo('/')} />
        </Suspense>
      </div>
    );
  }

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

            {/* Featured Projects with Filters & Pagination */}
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
            onOpenPrivacy={() => setIsPrivacyOpen(true)}
            onOpenTerms={() => setIsTermsOpen(true)}
            onOpenAdmin={() => navigateTo('/admin')}
          />

          {/* Cookie Consent Banner */}
          <CookieConsent onOpenPrivacy={() => setIsPrivacyOpen(true)} />

          {/* Code-split Modals with Suspense */}
          <Suspense fallback={null}>
            {isContactOpen && (
              <ContactModal
                isOpen={isContactOpen}
                onClose={() => setIsContactOpen(false)}
                onShowToast={showToast}
              />
            )}

            {isPrivacyOpen && (
              <PrivacyPolicyModal
                isOpen={isPrivacyOpen}
                onClose={() => setIsPrivacyOpen(false)}
              />
            )}

            {isTermsOpen && (
              <TermsModal
                isOpen={isTermsOpen}
                onClose={() => setIsTermsOpen(false)}
              />
            )}
          </Suspense>

          {/* Toast Notification Container */}
          <Toast
            isVisible={toast.visible}
            message={toast.message}
            type={toast.type}
            onClose={() => setToast((prev) => ({ ...prev, visible: false }))}
          />

          {/* Vercel Web Analytics */}
          <Analytics />
        </div>
      )}
    </div>
  );
}

export default App;
