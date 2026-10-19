import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

export const Hero = ({ onOpenContact }) => {
  const heroRef = useRef(null);

  // Scroll driven transforms for "slightly zoom on scroll"
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  // Developer image zooms subtly from 1.0 to 1.08 as user scrolls down
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -12]);

  return (
    <section 
      ref={heroRef}
      className="relative w-full bg-[#FFFFFF] pt-4 pb-10 md:pt-6 md:pb-14 border-b border-zinc-200"
    >
      {/* Subtle background ambient dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e4e9_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none" />

      {/* Main Container with generous left/right margins */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Stage Container: Independent positioning for Big Text, Centered Cutout, Left Flank, Right Flank */}
        <div className="relative min-h-[460px] sm:min-h-[500px] md:min-h-[530px] w-full">
          
          {/* 1. Centered Giant Typography Across the Stage */}
          <motion.div 
            style={{ y: textY }}
            className="w-full flex flex-col items-center justify-start pt-6 sm:pt-8 md:pt-10 select-none pointer-events-none text-center"
          >
            {/* FRONT END */}
            <h1 className="font-anton text-5xl sm:text-6xl md:text-7xl lg:text-[7.2rem] xl:text-[11.5rem] leading-[0.84] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#C4B5FD] via-[#A78BFA] to-[#703BF7] uppercase drop-shadow-sm text-center">
              FRONT END
            </h1>
            {/* DEVELOPER. */}
            <div className="font-anton text-5xl sm:text-6xl md:text-7xl lg:text-[7.2rem] xl:text-[8rem] leading-[0.84] tracking-tight text-[#111111] uppercase -mt-2 sm:-mt-3 text-center">
              DEVELOPER.
            </div>
          </motion.div>

          {/* 2. Central Grounded Cutout of Neil Masion centered precisely on screen and over big text */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex justify-center items-end">
            <motion.div
              style={{ scale: imageScale, y: imageY }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-[350px] sm:h-[390px] md:h-[430px] lg:h-[460px] w-auto flex justify-center items-end"
            >
              <img
                src="/assets/hero-developer.png?v=5"
                alt="Neil Masion - Front End Developer"
                className="h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)] select-none"
                loading="eager"
              />
            </motion.div>
          </div>

          {/* 3. Left Content: Moved above to chest/flank height, frontdev text unaffected */}
          <div className="md:absolute md:left-0 md:bottom-24 lg:bottom-28 z-30 max-w-[210px] sm:max-w-[230px] pt-4 md:pt-0 text-left">
            <h2 className="font-sans font-bold text-sm sm:text-base text-zinc-950 leading-snug tracking-tight mb-1.5 uppercase">
              Good code starts from <br />
              scratch to the core with <br />
              <span className="text-brand-purple font-black">IMPACT.</span>
            </h2>

            <p className="text-[11px] sm:text-xs text-zinc-600 font-sans leading-relaxed mb-3">
              {personalInfo.bioDescription}
            </p>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-all shadow-sm rounded-none hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>START A PROJECT</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 4. Right Content: Moved above to chest/flank height, frontdev text unaffected */}
          <div className="hidden md:flex flex-col items-start absolute right-0 md:bottom-24 lg:bottom-28 z-30 max-w-[200px] sm:max-w-[220px] text-left">
            {/* Reenie Beanie font */}
            <div className="font-handwriting text-3xl lg:text-4xl text-brand-purple leading-none mb-0.5">
              Hey, I'm
            </div>

            <div className="font-anton text-2xl lg:text-3xl text-zinc-950 tracking-wide uppercase mb-1">
              Neil Masion<span className="text-brand-purple">.</span>
            </div>

            <p className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider leading-relaxed mb-3">
              Front-end developer &amp; UI engineer based in Cebu, PH.
            </p>

            <div className="flex items-center gap-2">
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none bg-zinc-100 hover:bg-zinc-200 text-zinc-800 font-mono text-[11px] uppercase transition-colors"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-zinc-200 hover:border-zinc-300 text-zinc-600 font-mono text-[11px] uppercase transition-colors"
              >
                <span>WORKS</span>
                <ArrowDownRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Mobile-only view for right intro info */}
        <div className="md:hidden mt-6 pt-6 border-t border-zinc-200/80 flex flex-col items-start">
          <div className="font-handwriting text-3xl text-brand-purple leading-none">
            Hey, I'm
          </div>
          <div className="font-anton text-2xl text-zinc-950 tracking-wide uppercase mb-1">
            Neil Masion<span className="text-brand-purple">.</span>
          </div>
          <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider mb-3">
            Front-end developer &amp; UI engineer based in Cebu, PH.
          </p>
        </div>

        {/* Bottom Core Philosophy Bar - borderless with added top margin */}
        <div className="mt-14 sm:mt-16 md:mt-20 bg-[#F8F8FA] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-purple font-semibold shrink-0">
            <span className="px-2.5 py-1 bg-purple-100/70 text-brand-purple font-bold">
              CORE PHILOSOPHY
            </span>
          </div>

          <p className="font-sans font-medium text-sm sm:text-base md:text-lg text-zinc-800 leading-snug tracking-tight max-w-3xl">
            "{personalInfo.corePhilosophy}"
          </p>
        </div>

      </div>
    </section>
  );
};
