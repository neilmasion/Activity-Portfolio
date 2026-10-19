import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, CheckCircle2, Layers, Cpu } from 'lucide-react';
import { TechIcon } from './TechIcons';
import { ProjectGraphic } from './ProjectCardGraphic';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-3xl bg-[#141419] border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl z-10 my-8 text-white"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-zinc-800 bg-[#181820]">
            <div className="flex items-center gap-3">
              <span className="font-anton text-2xl text-red-500">{project.id}</span>
              <div>
                <span className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                  {project.subtitle}
                </span>
                <h3 className="font-anton text-xl sm:text-2xl text-white tracking-wide">
                  {project.title}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Media preview */}
          <div className="p-6 bg-[#0E0E12]">
            {project.image.startsWith('http') ? (
              <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-zinc-800">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-full h-64 sm:h-80 rounded-2xl overflow-hidden border border-zinc-800 flex items-center justify-center">
                <ProjectGraphic type={project.image} />
              </div>
            )}
          </div>

          {/* Details body */}
          <div className="p-6 sm:p-8 space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-brand-purple-light mb-2">
                PROJECT OVERVIEW
              </h4>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Performance Metrics */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3 flex items-center gap-2">
                <Cpu className="w-4 h-4 text-brand-purple" />
                KEY PERFORMANCE METRICS
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.metrics.map((metric, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-300 flex items-center gap-2"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{metric}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2 flex items-center gap-2">
                <Layers className="w-4 h-4 text-brand-purple" />
                STACK &amp; TECHNOLOGIES
              </h4>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-lg bg-zinc-800/80 border border-zinc-700/60 font-mono text-xs text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4 pt-4 border-t border-zinc-800">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-all"
              >
                <span>OPEN LIVE DEMO</span>
                <ExternalLink className="w-4 h-4" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-mono text-xs uppercase tracking-wider transition-all border border-zinc-700"
              >
                <TechIcon name="github" className="w-4 h-4" />
                <span>SOURCE CODE</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
