import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const LoadingScreen = ({ onLoadingComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);

  const statuses = [
    "INITIALIZING CORE ASSETS...",
    "COMPILING UI MODULES...",
    "CALIBRATING TYPOGRAPHY...",
    "READY TO LAUNCH."
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 400);
          return 100;
        }
        // Smooth random increment
        const next = prev + Math.floor(Math.random() * 8) + 3;
        return next > 100 ? 100 : next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  useEffect(() => {
    if (progress < 30) setStatusIndex(0);
    else if (progress < 65) setStatusIndex(1);
    else if (progress < 90) setStatusIndex(2);
    else setStatusIndex(3);
  }, [progress]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        y: '-100%',
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
      }}
      className="fixed inset-0 z-50 flex flex-col justify-between p-8 md:p-14 bg-[#0B0B0E] text-white select-none pointer-events-auto"
    >
      {/* Top bar */}
      <div className="flex justify-between items-center text-xs font-mono uppercase tracking-widest text-zinc-400">
        <span className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-brand-purple animate-ping"></span>
          Neil Masion
        </span>
        <span>Portfolio 2026</span>
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

        {/* Progress Bar Container */}
        <div className="w-64 md:w-80 h-1 bg-zinc-800 rounded-none overflow-hidden mt-8 relative">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-purple to-brand-purple-light"
            style={{ width: `${progress}%` }}
            transition={{ ease: "easeOut" }}
          />
        </div>
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
