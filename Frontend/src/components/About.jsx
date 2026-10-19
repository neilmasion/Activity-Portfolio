import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, Sparkles, Terminal, Code } from 'lucide-react';
import { skillsCategories, personalInfo } from '../data/portfolioData';
import { TechIcon } from './TechIcons';

export const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  // Total count of all skills
  const totalSkillsCount = skillsCategories.reduce((acc, cat) => acc + cat.skills.length, 0);
  const collapsedVisibleCount = skillsCategories[0].skills.length;
  const hiddenCount = totalSkillsCount - collapsedVisibleCount;

  return (
    <section id="skills" className="w-full bg-[#FFFFFF] text-zinc-900 py-16 md:py-24 border-b border-zinc-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Top Half: Split About Narrative & Desk Setup */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center mb-16 md:mb-20">
          
          {/* Left Column: Desk / Notebook Setup Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-2xl overflow-hidden shadow-xl border border-zinc-200 group">
              <img
                src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1000&q=80"
                alt="Neil Masion Coding Workspace"
                className="w-full h-[320px] sm:h-[380px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />

              {/* Floating workspace tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 text-xs font-mono text-zinc-800 flex items-center justify-between">
                <span className="flex items-center gap-2 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-brand-purple animate-pulse"></span>
                  DESK SETUP &amp; DAILY LOG
                </span>
                <span className="text-zinc-500">CEBU, PH</span>
              </div>
            </div>
          </div>

          {/* Right Column: Bio Narrative */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-purple mb-2">
              <span>// 04. BACKGROUND &amp; PHILOSOPHY</span>
              <span className="w-8 h-[1px] bg-brand-purple/40"></span>
            </div>

            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-[0.92] text-zinc-950 mb-4">
              FRONT-END MIND, <br />
              <span className="text-brand-purple">BUILDER'S INSTINCT.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-zinc-600 font-sans leading-relaxed mb-8">
              <p>
                I build web applications that leave a lasting impression. With a keen eye for aesthetics and a relentless focus on clean execution, I turn complex requirements into effortless digital experiences.
              </p>
              <p>
                Every line of code I write is written with purpose: to create digital products that are fast, intuitive, and visually memorable. No fluff, no unnecessary bloat—just pure craft.
              </p>
            </div>

            {/* Signature Block */}
            <div className="pt-4 border-t border-zinc-200 flex items-center justify-between">
              <div>
                <span className="font-anton text-xl tracking-wider text-zinc-900 uppercase block">
                  NEIL MASION
                </span>
                <span className="font-mono text-xs text-brand-purple font-medium uppercase tracking-widest">
                  FRONT-END DEV &amp; UI SPECIALIST
                </span>
              </div>
              <div className="w-12 h-1 bg-brand-purple rounded-full" />
            </div>
          </div>

        </div>

        {/* Bottom Half: Skills Group with "Show More" & Disappearing Fade Effect */}
        <div className="mt-8 pt-12 border-t border-zinc-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-purple mb-1">
                <Code className="w-4 h-4" />
                <span>TECHNICAL TOOLKIT</span>
              </div>
              <h3 className="font-anton text-3xl sm:text-4xl uppercase tracking-wide text-zinc-950">
                PROVEN TECH STACK &amp; CAPABILITIES
              </h3>
            </div>

            <div className="text-xs font-mono text-zinc-500">
              Showing {isExpanded ? totalSkillsCount : collapsedVisibleCount} of {totalSkillsCount} Tools
            </div>
          </div>

          {/* Collapsible Container with Disappearing Gradient */}
          <div className="relative">
            <motion.div
              initial={false}
              animate={{
                height: isExpanded ? 'auto' : '220px',
              }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden space-y-8"
            >
              {skillsCategories.map((categoryGroup, catIndex) => (
                <div key={catIndex} className="space-y-3">
                  <div className="font-mono text-xs font-bold uppercase tracking-wider text-zinc-500 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
                    <span>{categoryGroup.category}</span>
                  </div>

                  {/* Skills Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {categoryGroup.skills.map((skill, sIdx) => (
                      <div
                        key={sIdx}
                        className="group flex items-center gap-3 p-3.5 rounded-xl bg-[#F8F8FB] hover:bg-white border border-zinc-200/90 hover:border-brand-purple/40 hover:shadow-md transition-all duration-200 cursor-default"
                      >
                        <div className="w-8 h-8 rounded-lg bg-white border border-zinc-200 flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                          <TechIcon name={skill.icon} className="w-4 h-4" />
                        </div>
                        <div className="overflow-hidden">
                          <span className="font-mono text-xs font-semibold text-zinc-900 block truncate group-hover:text-brand-purple transition-colors">
                            {skill.name}
                          </span>
                          <span className="text-[10px] font-mono text-zinc-600 block uppercase">
                            {skill.level}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Slightly Disappearing Gradient Mask Overlay (active when collapsed) */}
            {!isExpanded && (
              <div 
                className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none transition-opacity duration-300"
              />
            )}
          </div>

          {/* Show More / Show Less Toggle Button */}
          <div className="mt-6 flex justify-center relative z-10">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-zinc-900 hover:bg-brand-purple text-white font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-md hover:shadow-brand-purple/30 hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>{isExpanded ? 'SHOW LESS' : `SHOW MORE SKILLS (${hiddenCount} MORE)`}</span>
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 transition-transform duration-300" />
              ) : (
                <ChevronDown className="w-4 h-4 transition-transform duration-300" />
              )}
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
