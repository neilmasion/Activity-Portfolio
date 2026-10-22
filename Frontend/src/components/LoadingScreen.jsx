import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ onEnter }) => {
  const [progress, setProgress] = useState(0);
  const [done, setDone]         = useState(false);

  const statuses = [
    'INITIALIZING CORE ASSETS...',
    'COMPILING UI MODULES...',
    'CALIBRATING TYPOGRAPHY...',
    'READY TO LAUNCH.',
  ];
  const statusIndex = progress < 30 ? 0 : progress < 65 ? 1 : progress < 90 ? 2 : 3;

  // Progress bar fills up, then stops and waits for the user
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setDone(true);
          return 100;
        }
        const next = prev + Math.floor(Math.random() * 14) + 8;
        return next > 100 ? 100 : next;
      });
    }, 18);
    return () => clearInterval(timer);
  }, []);

  // Enter key shortcut once done
  useEffect(() => {
    if (!done) return;
    const handleKey = (e) => {
      if (e.key === 'Enter') onEnter();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [done, onEnter]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
      }}
      className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-14 bg-[#0B0B0E] text-white select-none pointer-events-auto"
    >
      {/* Top bar */}
      <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-purple animate-ping" />
          Neil Masion
        </span>
        {/* Skip only shown before done */}
        {!done && (
          <button
            onClick={onEnter}
            className="hover:text-white transition-colors underline-offset-2 hover:underline tracking-widest text-[11px]"
            aria-label="Skip intro animation"
          >
            SKIP [ESC] &rarr;
          </button>
        )}
      </div>

      {/* Center Stage */}
      <div className="flex flex-col items-center justify-center text-center my-auto">
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative mb-6"
        >
          <span className="font-anton text-8xl md:text-9xl tracking-tight text-white">
            NM<span className="text-brand-purple">.</span>
          </span>
          <div className="absolute -inset-4 bg-brand-purple/20 blur-2xl -z-10 rounded-full" />
        </motion.div>

        <div className="text-zinc-400 font-mono text-xs md:text-sm tracking-wider uppercase h-6">
          <motion.span
            key={statusIndex}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
          >
            {statuses[statusIndex]}
          </motion.span>
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-80 h-1 bg-zinc-800 rounded-none overflow-hidden mt-8 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-purple to-brand-purple-light"
            style={{ width: `${progress}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>

        {/* ENTER SITE button — slides up once progress hits 100% */}
        <AnimatePresence>
          {done && (
            <motion.button
              key="enter-btn"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.45, ease: [0.34, 1.56, 0.64, 1] }}
              onClick={onEnter}
              className="mt-10 group relative flex items-center gap-3 px-8 py-3 font-mono text-sm uppercase tracking-widest text-white overflow-hidden"
              style={{
                background: 'transparent',
                border: '1px solid rgba(112,59,247,0.7)',
                outline: 'none',
                cursor: 'pointer',
              }}
              aria-label="Enter site and start music"
            >
              {/* Hover fill */}
              <span
                className="absolute inset-0 bg-brand-purple opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden
              />
              {/* Music note icon */}
              <svg
                className="relative z-10 w-4 h-4 text-brand-purple group-hover:text-white transition-colors duration-300"
                viewBox="0 0 24 24" fill="currentColor"
              >
                <path d="M9 3v10.55A4 4 0 1 0 11 17V7h6V3z" />
              </svg>
              <span className="relative z-10 group-hover:text-white transition-colors duration-300">
                ENTER SITE
              </span>
              <span className="relative z-10 text-brand-purple group-hover:text-white transition-colors duration-300">
                [ENTER]
              </span>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Counter */}
      <div className="flex justify-between items-end border-t border-zinc-800/80 pt-6">
        <div className="font-mono text-xs text-zinc-500 uppercase">
          Frontend Developer &amp; UI Engineer
        </div>
        <div className="font-anton text-4xl md:text-5xl text-zinc-200 tracking-wider">
          {progress}<span className="text-brand-purple text-2xl">%</span>
        </div>
      </div>
    </motion.div>
  );
};
