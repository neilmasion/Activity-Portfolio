import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export const Toast = ({ message, type = 'success', isVisible, onClose }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.9 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-5 py-3.5 rounded-none shadow-2xl backdrop-blur-xl border border-white/20 text-white text-sm font-medium tracking-wide bg-[#111116]/90 border-brand-purple/40"
        >
          {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />}
          {type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />}
          {type === 'info' && <Info className="w-4 h-4 text-brand-purple-light shrink-0" />}
          
          <span className="font-mono text-xs">{message}</span>
          
          <button
            onClick={onClose}
            className="ml-2 text-white/50 hover:text-white transition-colors"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
