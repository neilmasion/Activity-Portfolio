import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShieldCheck, Lock, EyeOff, FileText } from 'lucide-react';

export const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.2 }}
          className="relative w-full max-w-2xl bg-[#141419] border border-zinc-800 p-6 sm:p-8 rounded-none shadow-2xl z-10 text-white my-auto max-h-[85vh] overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2.5">
              <ShieldCheck className="w-5 h-5 text-brand-purple-light" />
              <h2 className="font-anton text-2xl tracking-wide uppercase">Privacy Policy</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Privacy Policy"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-5 text-sm text-zinc-300 font-sans mt-5 leading-relaxed">
            <p className="text-xs font-mono text-zinc-500 uppercase">
              Last Updated: October 2026 • Compliance: Data Privacy Act of 2012 (RA 10173) &amp; GDPR Guidelines
            </p>

            <section>
              <h3 className="font-mono text-xs text-white uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-brand-purple-light" /> 1. Information Collected
              </h3>
              <p>
                When you submit a project inquiry or contact form on this portfolio, we collect only the details you voluntarily provide: your name, email address, chosen project category, budget preference, and project message. We do not collect payment card information, biometric data, or government identifiers.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-xs text-white uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
                <EyeOff className="w-3.5 h-3.5 text-brand-purple-light" /> 2. No Exposure or Selling of User Data
              </h3>
              <p>
                Your personal details are strictly confidential. We never sell, lease, trade, or publicly expose your contact information or project inquiries to third-party advertisers, data brokers, or search engines.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-xs text-white uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-brand-purple-light" /> 3. Data Retention &amp; Security Controls
              </h3>
              <p>
                Transmitted messages are stored securely using encrypted channels (HTTPS/TLS) with rate limiting, server-side sanitization, and access restricted to the portfolio administrator. Inquiries are retained only as long as necessary to fulfill project communication or commission agreements.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-xs text-white uppercase tracking-wider font-semibold mb-1">
                4. Your Rights (Access, Rectification &amp; Erasure)
              </h3>
              <p>
                Under applicable privacy laws, you have the right to request a copy of any personal data you submitted, or request the immediate deletion of your inquiry record. To request removal, contact <span className="text-brand-purple-light font-mono">neilmasion2@gmail.com</span>.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              Close Policy
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default PrivacyPolicyModal;
