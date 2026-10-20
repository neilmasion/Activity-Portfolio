import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Layers, ChevronLeft, ChevronRight } from 'lucide-react';
import { TechIcon } from './TechIcons';
import { ProjectGraphic } from './ProjectCardGraphic';

export const ProjectModal = ({ project, onClose }) => {
  if (!project) return null;

  const images = project.images && project.images.length > 0 ? project.images : [project.image];
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  useEffect(() => {
    setActiveImgIndex(0);
  }, [project]);

  const nextImg = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev + 1) % images.length);
  };

  const prevImg = (e) => {
    e.stopPropagation();
    setActiveImgIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentImg = images[activeImgIndex] || project.image;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Window: 2-Column Split on Desktop, Compact Stack on Mobile */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-sm sm:max-w-md md:max-w-3xl bg-[#141419] border border-zinc-800 rounded-none overflow-hidden shadow-2xl z-10 my-auto text-white flex flex-col md:grid md:grid-cols-12 max-h-[92vh] md:max-h-none"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 z-30 p-1.5 rounded-none bg-black/80 hover:bg-black border border-zinc-700/80 text-zinc-300 hover:text-white transition-colors backdrop-blur-sm"
            aria-label="Close modal"
          >
            <X className="w-4 h-4" />
          </button>

          {/* Media preview (Supports Multiple Images with Carousel) */}
          <div className="md:col-span-5 bg-[#0A0A0D] border-b md:border-b-0 md:border-r border-zinc-800 relative flex items-center justify-center h-44 xs:h-48 sm:h-56 md:h-auto md:min-h-[380px] overflow-hidden group shrink-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeImgIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="w-full h-full flex items-center justify-center"
              >
                {currentImg.startsWith('http') ? (
                  <img
                    src={currentImg}
                    alt={`${project.title} - Slide ${activeImgIndex + 1}`}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center p-4 sm:p-6">
                    <ProjectGraphic type={currentImg} />
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Subtle edge vignette on desktop */}
            <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-[#141419]/50 pointer-events-none" />

            {/* Carousel navigation controls if multiple images exist */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImg}
                  className="absolute left-2 sm:left-2.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-7 sm:h-7 rounded-none bg-black/70 hover:bg-black/90 border border-zinc-700/80 text-white flex items-center justify-center transition-all opacity-85 hover:opacity-100"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                <button
                  onClick={nextImg}
                  className="absolute right-2 sm:right-2.5 top-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-7 sm:h-7 rounded-none bg-black/70 hover:bg-black/90 border border-zinc-700/80 text-white flex items-center justify-center transition-all opacity-85 hover:opacity-100"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </button>

                {/* Indicator dots & counter badge */}
                <div className="absolute bottom-2 sm:bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-2 py-0.5 sm:px-2.5 sm:py-1 bg-black/80 backdrop-blur-sm border border-zinc-700/60 font-mono text-[9px] sm:text-[10px] text-zinc-300">
                  <div className="flex items-center gap-1">
                    {images.map((_, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveImgIndex(i);
                        }}
                        className={`h-1.5 transition-all ${
                          activeImgIndex === i ? 'bg-brand-purple w-2.5 sm:w-3' : 'bg-zinc-500 w-1.5 hover:bg-zinc-300'
                        }`}
                        aria-label={`Go to image ${i + 1}`}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-zinc-400 pl-1">
                    0{activeImgIndex + 1}/0{images.length}
                  </span>
                </div>
              </>
            )}
          </div>

          {/* Right Side / Bottom on Mobile: Details & Info */}
          <div className="md:col-span-7 p-4 sm:p-6 flex flex-col justify-between space-y-3 sm:space-y-4 overflow-y-auto">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-anton text-base sm:text-lg text-red-500">{project.id}</span>
                <span className="text-[10px] font-mono uppercase text-zinc-400 tracking-wider">
                  // {project.subtitle}
                </span>
              </div>
              <h3 className="font-anton text-lg sm:text-2xl text-white tracking-wide pr-6 sm:pr-8">
                {project.title}
              </h3>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-brand-purple-light mb-1">
                PROJECT OVERVIEW
              </h4>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
                {project.description}
              </p>
            </div>

            {/* Tech Stack */}
            <div>
              <h4 className="text-[9px] sm:text-[10px] font-mono uppercase tracking-wider text-zinc-400 mb-1 sm:mb-1.5 flex items-center gap-1.5">
                <Layers className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand-purple" />
                STACK &amp; TECHNOLOGIES
              </h4>
              <div className="flex flex-wrap gap-1 sm:gap-1.5">
                {project.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-none bg-zinc-900 border border-zinc-800 font-mono text-[10px] sm:text-[11px] text-zinc-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 sm:gap-2.5 pt-3 sm:pt-4 border-t border-zinc-800/80">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-none bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all shadow-sm"
              >
                <span>OPEN DEMO</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 py-2 sm:py-2.5 px-3 sm:px-3.5 rounded-none bg-zinc-900 hover:bg-zinc-800 text-zinc-300 font-mono text-[11px] sm:text-xs uppercase tracking-wider transition-all border border-zinc-800"
              >
                <TechIcon name="github" className="w-3.5 h-3.5" />
                <span>CODE</span>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
