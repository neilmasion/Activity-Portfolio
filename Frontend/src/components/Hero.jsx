import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { AuroraBlob } from './AuroraBlob';

export const Hero = ({ onOpenContact }) => {
  const heroRef = useRef(null);
  const [isTextHovered, setIsTextHovered] = useState(false);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const renderTypography = (isOverlay = false) => (
    <>
      <h1 className="font-anton text-[54px] xs:text-[62px] sm:text-6xl md:text-7xl lg:text-[7.2rem] xl:text-[11.5rem] leading-[0.98] sm:leading-[0.84] tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-[#703BF7] to-[#FFFFFF] uppercase drop-shadow-sm text-center">
        YOUR FUTURE
      </h1>
      <div className={`font-anton text-[54px] xs:text-[62px] sm:text-6xl md:text-7xl lg:text-[7.2rem] xl:text-[8rem] leading-[0.98] sm:leading-[0.84] tracking-tight text-[#111111] uppercase mt-0.5 sm:-mt-3 text-center ${isOverlay ? 'drop-shadow-[0_8px_25px_rgba(0,0,0,0.35)]' : ''}`}>
        DESIGNER.
      </div>
    </>
  );

  return (
    <section 
      ref={heroRef}
      className="relative w-full bg-[#FFFFFF] pt-4 pb-10 md:pt-6 md:pb-14 border-b border-zinc-200 overflow-hidden"
    >
      {/* Subtle background ambient dot grid */}
      <div className="absolute inset-0 bg-[radial-gradient(#e2e4e9_1px,transparent_1px)] [background-size:20px_20px] opacity-70 pointer-events-none" />

      {/* Aurora Blob background animation sitting behind Hero */}
      <AuroraBlob />

      {/* Main Container with generous left/right margins */}
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Stage Container: Independent positioning for Big Text, Centered Cutout, Left Flank, Right Flank */}
        <div className="relative min-h-[360px] xs:min-h-[380px] sm:min-h-[460px] md:min-h-[530px] w-full">
          
          {/* 1. Centered Giant Typography (Base Layer - Behind Cutout on mobile, behind on desktop too) */}
          <motion.div 
            style={{ y: textY }}
            className="w-full flex flex-col items-center justify-start pt-16 xs:pt-20 sm:pt-8 md:pt-10 select-none text-center relative z-10"
          >
            <div 
              className="inline-flex flex-col items-center cursor-pointer pointer-events-auto"
              onMouseEnter={() => setIsTextHovered(true)}
              onMouseLeave={() => setIsTextHovered(false)}
              onClick={() => setIsTextHovered((prev) => !prev)}
            >
              {renderTypography(false)}
            </div>
          </motion.div>

          {/* 2. Central Grounded Cutout of Neil Masion — IN FRONT of text on mobile, behind on desktop */}
          <div 
            className="absolute bottom-0 left-1/2 -translate-x-1/2 z-20 sm:z-20 pointer-events-none flex justify-center items-end"
          >
            <motion.div
              style={{ scale: imageScale, y: imageY }}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="h-[340px] sm:h-[380px] md:h-[430px] lg:h-[460px] w-auto flex justify-center items-end pointer-events-none"
            >
              <picture className="h-full w-auto flex justify-center items-end">
                <source media="(max-width: 639px)" srcSet="/assets/hero-developer-mobile.webp" type="image/webp" />
                <source media="(max-width: 639px)" srcSet="/assets/hero-developer-mobile.png?v=1" />
                <source srcSet="/assets/hero-developer.webp" type="image/webp" />
                <img
                  src="/assets/hero-developer.png?v=7"
                  alt="Neil Masion - 4th-Year BSIT Student & Web Designer"
                  className="h-full w-auto object-contain drop-shadow-[0_15px_25px_rgba(0,0,0,0.18)] select-none pointer-events-none"
                  loading="eager"
                  fetchPriority="high"
                  width="460"
                  height="460"
                  decoding="async"
                />
              </picture>
            </motion.div>
          </div>

          {/* 3. Centered Giant Typography Front Overlay (Desktop hover only — hidden on mobile since image is in front) */}
          <motion.div 
            style={{ y: textY, zIndex: 25 }}
            className="hidden sm:flex w-full flex-col items-center justify-start sm:pt-8 md:pt-10 select-none text-center absolute top-0 left-0 right-0 z-[25] pointer-events-none"
          >
            <div 
              className="inline-flex flex-col items-center cursor-pointer pointer-events-auto"
              onMouseEnter={() => setIsTextHovered(true)}
              onMouseLeave={() => setIsTextHovered(false)}
              onClick={() => setIsTextHovered((prev) => !prev)}
            >
              <motion.div
                aria-hidden="true"
                initial={false}
                animate={{ 
                  opacity: isTextHovered ? 1 : 0 
                }}
                transition={{ 
                  duration: 0.45, 
                  ease: [0.16, 1, 0.3, 1] 
                }}
                className="inline-flex flex-col items-center"
              >
                {renderTypography(true)}
              </motion.div>
            </div>
          </motion.div>

          {/* 4. Left Content: Commission & Services Spotlight (Desktop only, mobile rendered cleanly below stage) */}
          <div className="hidden md:block md:absolute md:left-0 md:bottom-24 lg:bottom-28 z-30 max-w-[215px] sm:max-w-[235px] text-left">              
            <h2 className="font-sans font-bold text-sm sm:text-base text-zinc-950 leading-snug tracking-tight mb-1.5 uppercase">
              Open for 
              <span className="text-brand-purple font-black"> SERVICES.</span>
            </h2>

            <p className="text-[11px] sm:text-xs text-zinc-600 font-sans leading-relaxed mb-3">
              Taking commissions for responsive website designs, pubmats, and highlight videos. Fast turnaround &amp; student-friendly rates.
            </p>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-all shadow-sm rounded-none hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>LET'S TALK</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* 5. Right Content: Persona & Location */}
          <div className="hidden md:flex flex-col items-start absolute right-0 md:bottom-24 lg:bottom-28 z-30 max-w-[200px] sm:max-w-[220px] text-left">
            {/* Reenie Beanie font */}
            <div className="font-handwriting text-3xl lg:text-4xl text-brand-purple leading-none mb-0.5">
              Hey, I'm
            </div>

            <div className="font-anton text-2xl lg:text-3xl text-zinc-950 tracking-wide uppercase mb-1">
              Neil Masion<span className="text-brand-purple">.</span>
            </div>

            <p className="font-mono text-[11px] text-zinc-500 uppercase tracking-wider leading-relaxed mb-3">
              4th-Year BSIT College Student from Cebu Eastern College, Inc.
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
                href="#capabilities"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-none border border-zinc-200 hover:border-zinc-300 text-zinc-600 font-mono text-[11px] uppercase transition-colors"
              >
                <span>SERVICES</span>
                <ArrowDownRight className="w-3 h-3" />
              </a>
            </div>
          </div>

        </div>

        {/* Mobile-only view: Clean, non-overlapping presentation */}
        <div className="md:hidden -mt-4 pt-2 border-t border-zinc-200/80 space-y-4">
          <div className="flex flex-col items-start">
            <div className="font-handwriting text-3xl text-brand-purple leading-none mb-0.5">
              Hey, I'm
            </div>
            <div className="font-anton text-3xl text-zinc-950 tracking-wide uppercase mb-1">
              Neil Masion<span className="text-brand-purple">.</span>
            </div>
            <p className="font-mono text-xs text-zinc-500 uppercase tracking-wider">
              4th-Year BSIT College Student from Cebu Eastern College, Inc.
            </p>
          </div>

          <div className="bg-[#FAF9FE] border border-purple-100 p-4 space-y-2.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span>
              <h2 className="font-sans font-bold text-xs uppercase tracking-wider text-zinc-950">
                Open for <span className="text-brand-purple font-black">SERVICES</span>
              </h2>
            </div>

            <p className="text-xs text-zinc-600 font-sans leading-relaxed">
              Taking commissions for responsive website designs, pubmats, and highlight videos. Fast turnaround &amp; student-friendly rates.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1">
              <button
                onClick={onOpenContact}
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-all shadow-sm rounded-none"
              >
                <span>LET'S TALK</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>

              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-zinc-200 text-zinc-800 font-mono text-xs uppercase tracking-wider rounded-none"
              >
                <span>GITHUB</span>
                <ArrowUpRight className="w-3 h-3" />
              </a>

              <a
                href="#capabilities"
                className="inline-flex items-center gap-1.5 px-3 py-2 bg-white border border-zinc-200 text-zinc-600 font-mono text-xs uppercase tracking-wider rounded-none"
              >
                <span>SERVICES</span>
                <ArrowDownRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Commission Services Strip - borderless with added top margin */}
        <div className="mt-14 sm:mt-16 md:mt-20 bg-[#F8F8FA] p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-purple font-semibold shrink-0">
            <span className="px-2.5 py-1 bg-purple-100/70 text-brand-purple font-bold">
              Core Philosophy
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
