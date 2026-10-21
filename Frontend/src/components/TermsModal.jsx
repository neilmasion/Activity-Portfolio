import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Scale, Clock, Award, ShieldAlert } from 'lucide-react';

export const TermsModal = ({ isOpen, onClose }) => {
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
              <Scale className="w-5 h-5 text-brand-purple-light" />
              <h2 className="font-anton text-2xl tracking-wide uppercase">Terms of Service</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close Terms of Service"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Content */}
          <div className="space-y-5 text-sm text-zinc-300 font-sans mt-5 leading-relaxed">
            <p className="text-xs font-mono text-zinc-500 uppercase">
              Last Updated: October 2026 • Scope: Creative Commissions, Web Design &amp; Digital Collateral
            </p>

            <section>
              <h3 className="font-mono text-xs text-white uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-brand-purple-light" /> 1. Project Inquiries &amp; Quotations
              </h3>
              <p>
                Inquiries made via the portfolio contact form do not constitute a binding contract until project specifications, milestones, deliverables, and compensation are mutually agreed upon in writing.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-xs text-white uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-brand-purple-light" /> 2. Intellectual Property Rights
              </h3>
              <p>
                Upon receipt of full agreed commission payment, the client receives non-exclusive or exclusive rights to the commissioned digital assets as outlined in the individual contract. The designer reserves the right to showcase the finalized work in portfolio showcases and case studies.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-xs text-white uppercase tracking-wider font-semibold mb-1 flex items-center gap-1.5">
                <ShieldAlert className="w-3.5 h-3.5 text-brand-purple-light" /> 3. Revisions and Delivery Timelines
              </h3>
              <p>
                Standard commissions include up to two rounds of minor revisions within the project scope. Additional revision rounds or changes that alter the foundational architecture are subject to supplemental fees.
              </p>
            </section>

            <section>
              <h3 className="font-mono text-xs text-white uppercase tracking-wider font-semibold mb-1">
                4. Acceptable Conduct &amp; Liability Cap
              </h3>
              <p>
                This website is provided on an &quot;as is&quot; and &quot;as available&quot; basis. Any abusive transmissions, malicious script injections, or scraping attacks will result in immediate IP blacklisting and potential legal recourse.
              </p>
            </section>
          </div>

          <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-colors"
            >
              Accept Terms
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default TermsModal;
