import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { faqs } from '../data/portfolioData';

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (idx) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="w-full bg-[#FFFFFF] text-zinc-900 py-16 md:py-24 border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column */}
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-purple mb-2">
              <span>// 05. GOT QUERIES?</span>
              <span className="w-8 h-[1px] bg-brand-purple/40"></span>
            </div>

            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-[0.92] text-zinc-950 mb-4">
              GOOD <br />
              <span className="text-zinc-900">QUESTIONS.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed font-normal max-w-md mb-8">
              Everything you need to know about partnering with me, from project kickoff to technical deployment.
            </p>

            <div className="p-6 rounded-2xl bg-purple-50/70 border border-purple-200/60">
              <span className="font-mono text-xs uppercase font-bold text-brand-purple block mb-2">
                Have a unique challenge?
              </span>
              <p className="text-xs text-zinc-600 leading-relaxed mb-4">
                Don't hesitate to reach out directly. I respond within 24 hours.
              </p>
              <a
                href="#contact"
                className="font-mono text-xs uppercase text-brand-purple font-semibold hover:underline"
              >
                ASK A SPECIFIC QUESTION &rarr;
              </a>
            </div>
          </div>

          {/* Right Column: Accordion list */}
          <div className="lg:col-span-7 space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'border-brand-purple/40 bg-[#FAF9FE] shadow-sm'
                      : 'border-zinc-200/90 bg-white hover:border-zinc-300'
                  }`}
                >
                  <button
                    onClick={() => toggle(idx)}
                    className="w-full flex items-center justify-between p-6 sm:p-7 text-left focus:outline-none"
                  >
                    <span className="font-anton text-xl sm:text-2xl text-zinc-900 tracking-wide uppercase pr-4">
                      {faq.question}
                    </span>

                    <div className={`w-8 h-8 rounded-full shrink-0 flex items-center justify-center transition-transform duration-200 ${
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
                        <div className="px-6 sm:px-7 pb-6 sm:pb-7 pt-1 border-t border-purple-100/60">
                          <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed">
                            {faq.answer}
                          </p>
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
