import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, Zap, Layers, Sparkles } from 'lucide-react';
import { capabilities } from '../data/portfolioData';

export const Capabilities = () => {
  const [openId, setOpenId] = useState(capabilities[0].id);

  const toggleAccordion = (id) => {
    setOpenId(openId === id ? null : id);
  };

  const getIcon = (id) => {
    if (id === 'web-design') return <Layers className="w-4 h-4 text-brand-purple" />;
    if (id === 'graphic-pubmats') return <Sparkles className="w-4 h-4 text-brand-purple" />;
    return <Zap className="w-4 h-4 text-brand-purple" />;
  };

  return (
    <section id="capabilities" className="w-full bg-[#FFFFFF] text-zinc-900 scroll-mt-16 py-14 md:py-24 border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading and Subtext */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-purple mb-2">
              <span>// 02. COMMISSIONS &amp; SERVICES</span>
              <span className="w-8 h-[1px] bg-brand-purple/40"></span>
            </div>
            
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-[0.92] text-zinc-950 mb-4">
              COMMISSION WORK. <br />
              <span className="text-brand-purple">MADE TO DELIVER.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed font-normal max-w-md mb-8">
              Your ideas deserve a creative touch. Here are the services I offer — from web design to graphics and video editing.
            </p>

            <div className="p-5 rounded-none bg-[#F6F6F9] border border-zinc-200/80 flex items-center gap-4">
              <div className="w-10 h-10 rounded-none bg-purple-100 flex items-center justify-center text-brand-purple shrink-0">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xs font-mono">
                <span className="font-semibold text-zinc-900 block">Commission Perks</span>
                <span className="text-zinc-500">Affordable rates for students, Fast revisions, and direct Discord/Email communication.</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Accordion List */}
          <div className="lg:col-span-7 space-y-4">
            {capabilities.map((item, idx) => {
              const isOpen = openId === item.id;
              return (
                <div
                  key={item.id}
                  className={`rounded-none border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-brand-purple/50 bg-[#FAF9FE] shadow-lg shadow-purple-500/5'
                      : 'border-zinc-200/90 bg-white hover:border-zinc-300'
                  }`}
                >
                  <button
                    onClick={() => toggleAccordion(item.id)}
                    className="w-full flex items-center justify-between p-6 sm:p-7 text-left focus:outline-none"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-mono text-xs text-brand-purple font-semibold">
                        0{idx + 1}.
                      </span>
                      <h3 className="font-anton text-2xl sm:text-3xl text-zinc-900 tracking-wide uppercase">
                        {item.title}
                      </h3>
                    </div>

                    <div className={`w-8 h-8 rounded-none flex items-center justify-center transition-transform duration-200 ${
                      isOpen ? 'bg-brand-purple text-white rotate-180' : 'bg-zinc-100 text-zinc-700'
                    }`}>
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 border-t border-purple-100/80">
                          <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed mb-5">
                            {item.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-2">
                            {item.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-none bg-white border border-purple-200/70 font-mono text-xs text-brand-purple font-medium"
                              >
                                {getIcon(item.id)}
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
};
