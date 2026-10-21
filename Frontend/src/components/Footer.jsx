import React from 'react';
import { ArrowUp, ArrowUpRight, Copy, Check, Shield } from 'lucide-react';
import { TechIcon } from './TechIcons';
import { personalInfo } from '../data/portfolioData';

export const Footer = ({ onOpenContact, onShowToast, onOpenPrivacy, onOpenTerms, onOpenAdmin }) => {
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
    <footer id="contact" className="w-full bg-[#08080A] text-white scroll-mt-16 pt-16 pb-12 border-t border-zinc-800/80 relative overflow-hidden">
      
      {/* Background glow behind text */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-purple/15 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Top Label */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-purple-light mb-3">
          <span>// READY TO START A PROJECT?</span>
          <span className="w-8 h-[1px] bg-brand-purple/40"></span>
        </div>

        {/* Big Anton Callout Headline */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-12 border-b border-zinc-800">
          <div>
            <h2 className="font-anton text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.9] text-transparent bg-clip-text bg-gradient-to-r from-white via-zinc-200 to-purple-300 drop-shadow-sm">
              NEED A WEBSITE, GRAPHICS, OR VIDEO EDIT?
            </h2>
            <p className="font-sans text-sm sm:text-base text-zinc-400 max-w-xl mt-4 leading-relaxed font-normal">
              Got an idea you want to bring to life? From initial concepts to polished deliverables, let's collaborate to make your next project truly stand out.
            </p>
          </div>

          {/* Action Button & Email Pill */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <button
              onClick={onOpenContact}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider whitespace-nowrap shrink-0 transition-all duration-200 shadow-sm rounded-none hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={copyEmail}
              className="inline-flex items-center justify-center gap-1.5 px-5 py-2.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-700/80 text-zinc-200 font-mono text-xs uppercase tracking-wider whitespace-nowrap shrink-0 transition-colors rounded-none"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-400" />}
              <span>{copied ? 'COPIED TO CLIPBOARD' : 'COPY EMAIL'}</span>
            </button>
          </div>
        </div>

        {/* Middle Quick Links & Socials */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 text-xs font-mono">
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
            <span className="text-zinc-500 uppercase tracking-widest block mb-3">SOCIAL CONNECTIONS</span>
            <div className="flex items-center gap-3">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="GitHub Profile"
              >
                <TechIcon name="github" className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <TechIcon name="linkedin" className="w-4 h-4" />
              </a>
              <a
                href={personalInfo.x || personalInfo.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-none bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white hover:border-zinc-700 transition-colors"
                aria-label="X (Twitter) Profile"
              >
                <TechIcon name="x" className="w-4 h-4" />
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

        {/* Bottom Credits & Legal Links */}
        <div className="pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <span className="font-anton text-base text-zinc-300">NM.</span>
            <span>&copy; 2026 NEIL MASION. ALL RIGHTS RESERVED.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={onOpenPrivacy}
              className="text-zinc-400 hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              PRIVACY POLICY
            </button>
            <span className="text-zinc-700">•</span>
            <button
              onClick={onOpenTerms}
              className="text-zinc-400 hover:text-white transition-colors underline-offset-2 hover:underline"
            >
              TERMS OF SERVICE
            </button>
            <span className="text-zinc-700">•</span>
            <button
              onClick={onOpenAdmin}
              className="text-zinc-500 hover:text-brand-purple-glow transition-colors underline-offset-2 hover:underline flex items-center gap-1"
              title="Admin Portal & Analytics"
            >
              <Shield className="w-3 h-3 text-brand-purple" />
              <span>ADMIN</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
