import React from 'react';
import { ArrowUp, ArrowUpRight, Copy, Mail, Check } from 'lucide-react';
import { TechIcon } from './TechIcons';
import { personalInfo } from '../data/portfolioData';

export const Footer = ({ onOpenContact, onShowToast }) => {
  const [copied, setCopied] = React.useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    if (onShowToast) {
      onShowToast('Email copied to clipboard: ' + personalInfo.email);
    }
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="w-full bg-[#08080A] text-white pt-16 pb-12 border-t border-zinc-800/80 relative overflow-hidden">
      
      {/* Background glow behind text */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-purple/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Top Label */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-purple-light mb-3">
          <span>// READY TO CREATE SOMETHING EXCEPTIONAL?</span>
          <span className="w-8 h-[1px] bg-brand-purple/40"></span>
        </div>

        {/* Big Anton Callout Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-12 border-b border-zinc-800">
          <div>
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-purple-300 drop-shadow-sm">
              GOT A GOOD BUILD?
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-xl mt-4 leading-relaxed font-normal">
              Let's turn your ideas into a high-performance, polished digital experience. Currently open for select freelance contracts and full-time front-end engineering roles.
            </p>
          </div>

          {/* Action Button & Email Pill */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-all duration-200 shadow-xl shadow-brand-purple/30 rounded-none hover:-translate-y-1 active:translate-y-0"
            >
              <span>Let's talk</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-2 px-6 py-4 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 font-mono text-xs uppercase tracking-wider transition-colors rounded-none"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
            </button>
          </div>
        </div>

        {/* Middle Quick Links & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16 text-xs font-mono">
          <div>
            <span className="text-zinc-500 uppercase tracking-widest block mb-3">DIRECT INQUIRIES</span>
            <a 
              href={`mailto:${personalInfo.email}`} 
              className="text-zinc-200 hover:text-brand-purple-light transition-colors text-sm font-semibold"
            >
              {personalInfo.email}
            </a>
          </div>

          <div>
            <span className="text-zinc-500 uppercase tracking-widest block mb-3">CURRENT LOCATION</span>
            <span className="text-zinc-300 block">{personalInfo.location}</span>
            <span className="text-zinc-500 text-[11px] block">{personalInfo.coordinates}</span>
          </div>

          <div>
            <span className="text-zinc-500 uppercase tracking-widest block mb-3">SOCIAL CONNECTIONS</span>
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="GitHub Profile"
              >
                <TechIcon name="github" className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <TechIcon name="linkedin" className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.twitter}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="Twitter Profile"
              >
                <TechIcon name="twitter" className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700 font-mono text-xs uppercase tracking-wider transition-all rounded-none"
            >
              <span>BACK TO TOP</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-anton text-base text-zinc-300">NM.</span>
            <span>&copy; {new Date().getFullYear()} NEIL MASION. ALL RIGHTS RESERVED.</span>
          </div>

          <div>
            DESIGNED &amp; DEVELOPED WITH REACT, TAILWIND &amp; FRAMER MOTION
          </div>
        </div>

      </div>
    </footer>
  );
};
