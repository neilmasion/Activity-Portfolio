import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, CheckCircle2, AlertCircle, Loader2, ShieldCheck } from 'lucide-react';
import { stripHarmfulTags, isValidEmail } from '../utils/sanitize';

export const ContactModal = ({ isOpen, onClose, onShowToast }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Web Design / Landing Page',
    budget: 'Standard Commission (₱1,500 - ₱5,000)',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // Performance: Dynamically import canvas-confetti on demand
  const triggerConfetti = async () => {
    try {
      const confettiModule = await import('canvas-confetti');
      const confetti = confettiModule.default || confettiModule;
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // Graceful fallback if confetti fails to load
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    // Security: Input sanitization & client-side validation
    const cleanName = stripHarmfulTags(formData.name.trim()).slice(0, 100);
    const cleanEmail = formData.email.trim().slice(0, 120);
    const cleanMessage = stripHarmfulTags(formData.message.trim()).slice(0, 3000);

    if (!cleanName || cleanName.length < 2) {
      setErrorMsg('Please enter a valid name (at least 2 characters).');
      return;
    }

    if (!isValidEmail(cleanEmail)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    if (!cleanMessage || cleanMessage.length < 10) {
      setErrorMsg('Please provide a descriptive message (at least 10 characters).');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      name: cleanName,
      email: cleanEmail,
      projectType: formData.projectType,
      budget: formData.budget,
      message: cleanMessage
    };

    try {
      const apiUrl = import.meta.env.VITE_API_URL || '/api';
      const response = await fetch(`${apiUrl}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest' // Security: CSRF protection header
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setSubmitted(true);
        triggerConfetti();
        if (onShowToast) {
          onShowToast('Message transmitted securely! Neil will respond soon.');
        }
      } else {
        setErrorMsg(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err) {
      console.error('Contact submission error:', err);
      setErrorMsg('Unable to connect to backend server. Please verify the server is running on port 5000.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetAndClose = () => {
    setSubmitted(false);
    setFormData({
      name: '',
      email: '',
      projectType: 'Web Design / Landing Page',
      budget: 'Standard Commission (₱1,500 - ₱5,000)',
      message: ''
    });
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={resetAndClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative w-full max-w-[460px] bg-[#111116] border border-zinc-800 rounded-none overflow-hidden shadow-2xl z-10 text-white my-6"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800 bg-[#16161F]">
            <div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono uppercase tracking-wider text-brand-purple-light">
                <Sparkles className="w-3 h-3" />
                <span>START A PROJECT</span>
              </div>
              <h3 className="font-anton text-xl uppercase tracking-wide text-white mt-0.5">
                LET&apos;S CREATE SOMETHING GREAT
              </h3>
            </div>
            <button
              onClick={resetAndClose}
              className="p-1.5 rounded-none bg-zinc-800/80 hover:bg-zinc-800 text-zinc-400 hover:text-white transition-colors"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="p-5 sm:p-6">
            {submitted ? (
              <div className="text-center py-6 space-y-3">
                <div className="w-12 h-12 rounded-none bg-purple-500/20 text-brand-purple-light flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <h4 className="font-anton text-xl uppercase text-white">
                  MESSAGE DISPATCHED!
                </h4>
                <p className="font-sans text-xs text-zinc-400 max-w-xs mx-auto leading-relaxed">
                  Thank you for reaching out, {formData.name || 'friend'}. I&apos;ve received your inquiry and will review the details right away.
                </p>
                <div className="pt-2">
                  <button
                    onClick={resetAndClose}
                    className="px-5 py-2 rounded-none bg-brand-purple text-white font-mono text-xs uppercase tracking-wider hover:bg-brand-purple-dark transition-colors"
                  >
                    CLOSE WINDOW
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                {errorMsg && (
                  <div className="p-2.5 rounded-none bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={100}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Rivera"
                    className="w-full px-3.5 py-2.5 rounded-none bg-zinc-900 border border-zinc-800 focus:border-brand-purple focus:outline-none text-xs text-white font-sans transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    maxLength={120}
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@company.com"
                    className="w-full px-3.5 py-2.5 rounded-none bg-zinc-900 border border-zinc-800 focus:border-brand-purple focus:outline-none text-xs text-white font-sans transition-colors"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                      Commission / Project Type
                    </label>
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-none bg-zinc-900 border border-zinc-800 focus:border-brand-purple focus:outline-none text-xs font-mono text-zinc-300 transition-colors"
                    >
                      <option value="Web Design / Landing Page">Web Design / Landing Page</option>
                      <option value="Graphic Design">Graphic Design (Posters, Flyers, Pubmats)</option>
                      <option value="Video Editing">Video Editing (Recaps, Highlights)</option>
                      <option value="UI/UX & Portfolio Design">UI/UX &amp; Portfolio Design</option>
                      <option value="Full Website Development">Full Website Development</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                      Budget / Rate Tier
                    </label>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-3 py-2.5 rounded-none bg-zinc-900 border border-zinc-800 focus:border-brand-purple focus:outline-none text-xs font-mono text-zinc-300 transition-colors"
                    >
                      <option value="Student / Org Friendly (₱500 - ₱1,500)">Student / Org Friendly (₱500 - ₱1,500)</option>
                      <option value="Standard Commission (₱1,500 - ₱5,000)">Standard Commission (₱1,500 - ₱5,000)</option>
                      <option value="Major Build / Capstone (₱5,000+)">Major Build / Capstone (₱5,000+)</option>
                      <option value="Open for Discussion / Flexible">Open for Discussion / Flexible</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono uppercase tracking-wider text-zinc-400 mb-1">
                    Commission Details / Message *
                  </label>
                  <textarea
                    required
                    maxLength={3000}
                    name="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project — what you need (website, graphics, or video), your timeline, and any specific ideas or references you have in mind..."
                    className="w-full px-3.5 py-2.5 rounded-none bg-zinc-900 border border-zinc-800 focus:border-brand-purple focus:outline-none text-xs text-white font-sans transition-colors resize-none"
                  ></textarea>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-500">
                  <ShieldCheck className="w-3.5 h-3.5 text-brand-purple-light" />
                  <span>Protected by rate limiting &amp; HTTPS encryption. No data sold.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-none bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-all shadow-lg shadow-brand-purple/20 disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      <span>TRANSMITTING...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>SUBMIT PROPOSAL</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ContactModal;
