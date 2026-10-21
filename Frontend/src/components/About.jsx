import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { skillsCategories } from '../data/portfolioData';
import { TechIcon } from './TechIcons';
import aboutNeilImg from '../assets/about-neil.webp';

export const About = () => {
  const [isStoryExpanded, setIsStoryExpanded] = useState(false);
  const [showSkills, setShowSkills] = useState(false);

  // Total count of all skills
  const totalSkillsCount = skillsCategories.reduce((acc, cat) => acc + cat.skills.length, 0);

  return (
    <section id="skills" className="w-full bg-[#FFFFFF] text-zinc-900 scroll-mt-16 pt-14 pb-20 md:pt-20 md:pb-24 border-b border-zinc-200 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">
        
        {/* Top Half: Cutout Photo & Narrative Bio */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center mb-10 lg:mb-14">
          
          {/* Left Column: Neil's Cutout Image positioned as in reference */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-start items-center">
            <div className="relative w-full max-w-[260px] xs:max-w-[290px] sm:max-w-[450px] lg:max-w-none">
              <img
                src={aboutNeilImg}
                alt="Neil Masion - Front-End Developer"
                className="w-full h-auto object-contain select-none pointer-events-none"
                loading="eager"
              />
              {/* Bottom fade to blend seamlessly into white background */}
              <div className="absolute bottom-0 inset-x-0 h-20 sm:h-28 bg-gradient-to-t from-white via-white/80 to-transparent pointer-events-none" />
            </div>
          </div>

          {/* Right Column: Bio Narrative */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Tag / Category */}
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-brand-purple mb-3">
              <span className="w-2 h-2 bg-[#FF3E3E] inline-block shrink-0"></span>
              <span className="font-semibold">04 / THE PERSON BEHIND THE CODE</span>
            </div>

            {/* Main Heading */}
            <h2 className="font-anton text-2xl sm:text-3xl md:text-4xl lg:text-[40px] tracking-tight uppercase leading-[0.95] mb-5">
              <span className="text-zinc-950">I DON’T JUST MAKE THINGS LOOK GOOD.</span>{' '}
              <br />
              <span className="text-brand-purple">I MAKE EVERY DETAIL COUNT.</span>
            </h2>

            {/* Story Container with Cliffhanger Fade */}
            <div className="relative mb-3">
              <motion.div
                initial={false}
                animate={{
                  height: isStoryExpanded ? 'auto' : '155px',
                }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden space-y-4 text-sm sm:text-base text-zinc-600 font-sans leading-relaxed max-w-xl"
              >
                <p>
                  I discovered my interest in design and development while studying Information Technology. Over time, I explored different creative fields, including web design, graphic design, and video editing, each becoming part of my journey in its own way.
                </p>
                <p>
                  I started accepting web design commissions, which gave me experience working on designs for others. As a former IT Council Media Officer and currently an AWS SBG Multimedia Graphics member, I also had opportunities to create graphics and visuals for school activities and events. Video editing started as a hobby because I enjoyed seeing how clips could come together to tell a story. Today, I spend more of my free time learning about development and improving my skills.
                </p>
                <p>
                  Technology continues to change, and I'm learning to keep up with it. I started by writing code manually, and now I also explore AI tools to help with my workflow and learning process. I believe it's important to understand the fundamentals while remaining open to new ways of working.
                </p>
                <p>
                  My current goal is to become a full-stack developer. I'm continuing to improve my front-end skills while learning more about back-end development. Alongside that journey, I plan to continue offering web design, graphic design, and video editing services.
                </p>
                <p>
                  I still have a lot to learn, and I'm taking it one step at a time. For now, I want to keep improving, gain more experience, and use what I know to help people and businesses with their creative and technical needs.
                </p>
              </motion.div>

              {/* Cliffhanger Fade: Half-transparent overlay so users know there's more */}
              {!isStoryExpanded && (
                <div className="absolute bottom-0 inset-x-0 h-24 bg-gradient-to-t from-white via-white/85 to-transparent pointer-events-none" />
              )}
            </div>

            {/* Cliffhanger Toggle Button */}
            <div className="mb-6">
              <button
                onClick={() => setIsStoryExpanded(!isStoryExpanded)}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-none border border-zinc-200 bg-white hover:bg-zinc-900 hover:text-white text-zinc-900 font-mono text-xs uppercase tracking-wider transition-all duration-300 shadow-sm"
              >
                <span>{isStoryExpanded ? 'SHOW LESS' : 'READ FULL STORY'}</span>
                {isStoryExpanded ? (
                  <ChevronUp className="w-3.5 h-3.5" />
                ) : (
                  <ChevronDown className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Accent Punchline Callout */}
            <div>
              <span className="font-anton text-xl sm:text-2xl tracking-wide uppercase text-brand-purple block leading-tight">
                WHEN I TAKE ON A PROJECT, I DON’T JUST DELIVER IT — I MAKE SURE IT STANDS OUT.
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Half: Skills Group (Hidden by default, reveals on user interest) */}
        <div className="pt-6 border-t border-zinc-100">
          <button
            onClick={() => setShowSkills(!showSkills)}
            className="group w-full flex items-center justify-between p-4 sm:p-5 rounded-none bg-[#F8F8FB] hover:bg-white border border-zinc-200 hover:border-brand-purple/40 hover:shadow-sm transition-all duration-300 text-left"
          >
            <div className="flex flex-wrap items-center gap-3">
              <span className="w-2 h-2 bg-[#FF3E3E] inline-block shrink-0"></span>
              <span className="text-xs font-mono uppercase tracking-wider text-brand-purple font-semibold">
                SKILL GROUPS
              </span>
              <span className="font-anton text-lg sm:text-xl uppercase tracking-wide text-zinc-950 group-hover:text-brand-purple transition-colors">
                {showSkills ? 'HIDE TECHNICAL SKILLS & STACK' : 'EXPLORE TECHNICAL SKILLS & STACK'}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs text-zinc-500 shrink-0">
              <span>{totalSkillsCount} Tools</span>
              {showSkills ? (
                <ChevronUp className="w-4 h-4 text-brand-purple transition-transform group-hover:-translate-y-0.5" />
              ) : (
                <ChevronDown className="w-4 h-4 text-brand-purple transition-transform group-hover:translate-y-0.5" />
              )}
            </div>
          </button>

          <AnimatePresence>
            {showSkills && (
              <motion.div
                initial="hidden"
                animate="visible"
                exit="exit"
                variants={{
                  hidden: { opacity: 0, height: 0 },
                  visible: {
                    opacity: 1,
                    height: 'auto',
                    transition: {
                      duration: 0.5,
                      ease: [0.16, 1, 0.3, 1],
                      staggerChildren: 0.06,
                      delayChildren: 0.05
                    }
                  },
                  exit: {
                    opacity: 0,
                    height: 0,
                    transition: {
                      duration: 0.3,
                      ease: [0.16, 1, 0.3, 1]
                    }
                  }
                }}
                className="overflow-hidden mt-6 space-y-8"
              >
                {skillsCategories.map((categoryGroup, catIndex) => (
                  <motion.div
                    key={catIndex}
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="space-y-3"
                  >
                    <div className="font-mono text-xs font-bold uppercase tracking-wider text-brand-purple flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-brand-purple"></span>
                      <span>{categoryGroup.category}</span>
                    </div>

                    {/* Skills Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                      {categoryGroup.skills.map((skill, sIdx) => (
                        <motion.div
                          key={sIdx}
                          variants={{
                            hidden: { opacity: 0, y: 14 },
                            visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] } }
                          }}
                          whileHover={{ y: -2, transition: { duration: 0.15 } }}
                          className="group flex items-center gap-3.5 p-3.5 sm:p-4 rounded-none bg-white hover:bg-[#F8F8FB] border border-zinc-200 hover:border-brand-purple/60 hover:shadow-md transition-all duration-200 cursor-default"
                        >
                          <div className="shrink-0 flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                            <TechIcon name={skill.icon} className="w-5 h-5 sm:w-6 sm:h-6" />
                          </div>
                          <div className="overflow-hidden">
                            <span className="font-mono text-xs font-semibold text-zinc-900 block truncate group-hover:text-brand-purple transition-colors">
                              {skill.name}
                            </span>
                            <span className="text-[10px] font-mono text-zinc-600 block uppercase">
                              {skill.level}
                            </span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
