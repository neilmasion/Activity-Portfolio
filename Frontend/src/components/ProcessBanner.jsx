import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { processSteps } from '../data/portfolioData';

export const ProcessBanner = () => {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  const guarantees = [
    { label: 'Fast Turnaround', value: '3–7 Days Delivery' },
    { label: 'Tooling Stack', value: 'Figma, Canva & Adobe' },
    { label: 'Communication', value: 'Discord & Email Sync' },
    { label: 'Final Output', value: '100% Hand-off Ready' },
  ];

  return (
    <section id="process" className="w-full bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#703BF7] text-white scroll-mt-16 py-14 md:py-24 relative overflow-hidden">
      
      {/* Background Soft Lighting (Zero dots) */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,rgba(255,255,255,0.15),transparent)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Section Header: Page 3 / How I Work */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-purple-200 mb-3">
            <span>// 03. HOW I WORK</span>
            <span className="w-8 h-[1px] bg-white/40"></span>
          </div>

          <h2 className="font-anton text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.88] text-white drop-shadow-md">
            NO MAGIC. <br />
            <span className="text-zinc-950 px-3.5 sm:px-5 py-1 bg-white inline-block mt-2 shadow-2xl tracking-tight transform -rotate-1">
              JUST DESIGN.
            </span>
          </h2>
        </div>

        {/* 4 Process Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 mb-10 sm:mb-14">
          {processSteps.map((step, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className={`relative rounded-none p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 border backdrop-blur-md overflow-hidden group ${
                  isHovered
                    ? 'bg-white/20 border-white/50 shadow-2xl -translate-y-1.5'
                    : 'bg-white/10 border-white/20 hover:bg-white/15 hover:border-white/35'
                }`}
              >
                {/* Large Background Watermark Number */}
                <span className="font-anton text-7xl sm:text-8xl text-white/10 group-hover:text-white/20 transition-colors duration-300 absolute -top-4 -right-2 pointer-events-none select-none">
                  {step.step}
                </span>

                <div className="relative z-10">
                  {/* Top Header: Number */}
                  <div className="flex items-center justify-between gap-2 mb-5">
                    <span className="font-mono text-xs font-bold text-white tracking-widest px-2.5 py-1 bg-white/20 border border-white/30">
                      {step.step}
                    </span>
                  </div>

                  {/* Step Title */}
                  <h3 className="font-anton text-2xl sm:text-3xl tracking-wide uppercase text-white mb-3">
                    {step.title}
                  </h3>

                  {/* Step Description */}
                  <p className="font-sans text-xs sm:text-[13px] text-purple-100/90 leading-relaxed font-normal mb-6">
                    {step.description}
                  </p>
                </div>

                {/* Bottom Card Footer: Deliverable Spec & Step Counter */}
                <div className="relative z-10 pt-4 border-t border-white/20">
                  <div className="flex items-center justify-between text-[11px] font-mono text-purple-200 mb-2">
                    <span className="text-white/90 font-medium">
                      {step.deliverable}
                    </span>
                    <span className="font-bold text-white">
                      0{idx + 1}/04
                    </span>
                  </div>

                  {/* Progress bar inside card */}
                  <div className="w-full h-1 bg-white/15 overflow-hidden">
                    <div 
                      className={`h-full bg-white transition-all duration-500 ${
                        isHovered ? 'w-full' : 'w-1/3'
                      }`}
                    />
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

        {/* Bottom Highlights (Text only, box removed) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {guarantees.map((item, idx) => (
            <div key={idx} className="font-mono">
              <span className="text-purple-200/80 block text-[10px] uppercase tracking-wider mb-1">
                // {item.label}
              </span>
              <span className="text-white font-bold text-xs sm:text-sm block">
                {item.value}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
