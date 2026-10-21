import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ArrowUpRight } from 'lucide-react';

export const Navbar = ({ onOpenContact }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#capabilities' },
    { name: 'About', href: '#skills' },
    { name: 'Stack', href: '#skills' },
    { name: 'FAQ', href: '#faq' },
  ];

  return (
    <header className={`sticky top-0 z-40 ${mobileMenuOpen ? 'bg-white' : 'bg-white/95 backdrop-blur-md'} border-b border-zinc-200/80 transition-all duration-200 relative`}>
      {/* Main Navbar Bar - Logo on left, Navlinks and Button grouped on the right */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 py-4 flex items-center justify-between">
        {/* Left: Brand Logo */}
        <a href="#" className="flex items-center gap-1 group focus:outline-none" aria-label="Neil Masion Homepage">
          <span className="font-anton text-2xl tracking-tight text-zinc-950 group-hover:text-brand-purple transition-colors">
            NM<span className="text-brand-purple">.</span>
          </span>
        </a>

        {/* Right: Navlinks right beside button */}
        <div className="hidden md:flex items-center gap-8">
          <nav className="flex items-center gap-7">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono uppercase tracking-wider text-zinc-600 hover:text-zinc-950 font-medium transition-colors relative py-1 group"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-brand-purple transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* "Commission" Button without border radius */}
          <button
            onClick={onOpenContact}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 shadow-sm rounded-none hover:-translate-y-0.5 active:translate-y-0"
          >
            <span>Let's talk</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Mobile menu toggle */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 bg-transparent border-none text-zinc-900 hover:text-brand-purple focus:outline-none transition-colors"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer (solid opaque white overlay so hero section is fully hidden behind) */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="md:hidden absolute top-full left-0 right-0 z-50 border-b border-zinc-200 bg-white shadow-2xl px-6 py-5 space-y-3.5"
            style={{ backgroundColor: '#ffffff' }}
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block font-mono text-xs uppercase tracking-wider text-zinc-700 hover:text-brand-purple py-1.5 transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenContact();
                }}
                className="w-full flex items-center justify-center gap-1.5 py-3 bg-brand-purple text-white font-mono text-xs uppercase tracking-wider rounded-none shadow-sm"
              >
                <span>Let's talk</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
