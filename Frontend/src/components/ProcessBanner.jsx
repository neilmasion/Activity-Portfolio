import React from 'react';
import { motion } from 'framer-motion';
import { processSteps } from '../data/portfolioData';

export const ProcessBanner = () => {
  return (
    <section id="process" className="w-full bg-gradient-to-r from-[#6D28D9] via-[#7C3AED] to-[#703BF7] text-white py-14 md:py-20 relative overflow-hidden">
      
      {/* Subtle graphic background pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:20px_20px] pointer-events-none" />
      
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Headline */}
        <div className="mb-10 md:mb-12">
          <span className="font-mono text-xs uppercase tracking-widest text-purple-200 block mb-2">
            // OUR END-TO-END WORKFLOW
          </span>
          <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-[0.9] text-white drop-shadow-md">
            NO MAGIC. JUST CODE.
          </h2>
        </div>

        {/* 4 Process Columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {processSteps.map((step, idx) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 sm:p-7 flex flex-col justify-between hover:bg-white/15 transition-all duration-300 group"
            >
              <div>
                <span className="font-mono text-xs font-bold text-purple-200 tracking-wider block mb-4 group-hover:text-white transition-colors">
                  0{idx + 1}
                </span>

                <h3 className="font-anton text-2xl sm:text-3xl tracking-wide uppercase text-white mb-3">
                  {step.title}
                </h3>

                <p className="font-sans text-xs sm:text-sm text-purple-100/90 leading-relaxed font-normal">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between text-[11px] font-mono text-purple-200">
                <span>STEP {step.step} / 04</span>
                <span className="w-2 h-2 rounded-full bg-white opacity-40 group-hover:opacity-100 transition-opacity"></span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
