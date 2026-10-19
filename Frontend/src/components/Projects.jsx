import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Sparkles } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { TechIcon } from './TechIcons';
import { ProjectGraphic } from './ProjectCardGraphic';
import { ProjectModal } from './ProjectModal';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  const filters = [
    { label: 'ALL PROJECTS', value: 'all' },
    { label: 'WEB APPS', value: 'web' },
    { label: 'CREATIVE & APP', value: 'app' },
    { label: 'INTERACTIVE', value: 'interactive' },
  ];

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="projects" className="w-full bg-[#0B0B0E] text-white py-16 md:py-24 border-b border-zinc-800 relative overflow-hidden">
      
      {/* Ambient background light */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-purple-light mb-2">
              <span>// 01. SELECTED WORKS</span>
              <span className="w-8 h-[1px] bg-brand-purple/40"></span>
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-[0.92]">
              WORK THAT DOES <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-[#C4B5FD]">
                ITS CODE.
              </span>
            </h2>
          </div>

          <p className="max-w-md font-sans text-sm sm:text-base text-zinc-400 leading-relaxed font-normal">
            A curated collection of web applications and digital experiences crafted with precision, performance, and attention to detail.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`relative px-5 py-2 rounded-full font-mono text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/30 font-semibold'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* 2x2 Project Cards Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group relative bg-[#131318] rounded-2xl border border-zinc-800/90 p-5 sm:p-7 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-purple/10 cursor-pointer"
                onClick={() => setSelectedProject(project)}
              >
                {/* Top Row: Number & Category */}
                <div className="flex items-start justify-between mb-4">
                  <span className="font-anton text-4xl sm:text-5xl text-red-500/90 tracking-wide">
                    {project.id}
                  </span>
                  <div className="text-right">
                    <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-zinc-400 block">
                      {project.tech.slice(0, 2).join(' / ')}
                    </span>
                  </div>
                </div>

                {/* Card Main Inner Container - Styled to match design colors */}
                <div 
                  className="rounded-xl overflow-hidden p-5 sm:p-6 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-transform duration-300 group-hover:-translate-y-1"
                  style={{ backgroundColor: project.cardBg, color: project.textColor }}
                >
                  {/* Headline */}
                  <div className="max-w-[240px]">
                    <div className="font-mono text-[10px] uppercase tracking-wider opacity-70 mb-2">
                      FEATURED PROJECT
                    </div>
                    <h3 className="font-anton text-2xl sm:text-3xl leading-snug tracking-wide uppercase">
                      "{project.title}"
                    </h3>
                  </div>

                  {/* Thumbnail / Graphic */}
                  <div className="w-full sm:w-44 h-36 rounded-lg overflow-hidden shrink-0 shadow-lg relative">
                    {project.image.startsWith('http') ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <ProjectGraphic type={project.image} />
                    )}
                  </div>
                </div>

                {/* Bottom Row: Subtitle / Link */}
                <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs sm:text-sm text-zinc-300 group-hover:text-white font-medium uppercase tracking-wider transition-colors">
                      {project.subtitle}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-mono text-zinc-400 group-hover:text-brand-purple-light transition-colors hidden sm:inline">
                      VIEW PROJECT
                    </span>
                    <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:bg-brand-purple group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Footer repo note */}
        <div className="mt-12 text-center">
          <a
            href="https://github.com/neilmasion"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-zinc-500 hover:text-brand-purple-light transition-colors py-2"
          >
            <TechIcon name="github" className="w-4 h-4" />
            <span>WANT TO SEE MORE REPOSITORIES? CHECK GITHUB.COM/NEILMASION</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>

      {/* Project Details Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
};
