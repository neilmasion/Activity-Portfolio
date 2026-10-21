import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X } from 'lucide-react';

export const CookieConsent = ({ onOpenPrivacy }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    try {
      const consent = localStorage.getItem('nm_cookie_consent');
      if (!consent) {
        // Show banner shortly after page mount
        const timer = setTimeout(() => setIsVisible(true), 1200);
        return () => clearTimeout(timer);
      }
    } catch {
      // LocalStorage access restricted (incognito/sandboxed)
    }
  }, []);

  const handleAccept = () => {
    try {
      localStorage.setItem('nm_cookie_consent', 'accepted');
    } catch {}
    setIsVisible(false);
  };

  const handleDecline = () => {
    try {
      localStorage.setItem('nm_cookie_consent', 'declined');
    } catch {}
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-40 bg-[#141419]/95 backdrop-blur-md border border-zinc-700 p-5 rounded-none shadow-2xl text-white"
          role="region"
          aria-label="Cookie consent banner"
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-brand-purple/20 border border-brand-purple/40 text-brand-purple-light shrink-0">
              <Cookie className="w-5 h-5" />
            </div>

            <div className="flex-1 text-xs">
              <h4 className="font-mono uppercase font-semibold text-zinc-100 tracking-wider mb-1 flex items-center gap-1.5">
                Privacy &amp; Cookie Preferences
              </h4>
              <p className="text-zinc-400 font-sans leading-relaxed mb-3">
                We use privacy-friendly local storage to remember your theme preferences and form state. No invasive cross-site advertising cookies are used.{' '}
                <button
                  type="button"
                  onClick={onOpenPrivacy}
                  className="text-brand-purple-light underline hover:text-white"
                >
                  Read Privacy Policy
                </button>
              </p>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleAccept}
                  className="px-3.5 py-1.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-[11px] uppercase tracking-wider transition-colors"
                >
                  Accept
                </button>
                <button
                  onClick={handleDecline}
                  className="px-3.5 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-mono text-[11px] uppercase tracking-wider transition-colors"
                >
                  Decline
                </button>
              </div>
            </div>

            <button
              onClick={handleDecline}
              className="text-zinc-500 hover:text-zinc-300 p-1"
              aria-label="Dismiss cookie notice"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
