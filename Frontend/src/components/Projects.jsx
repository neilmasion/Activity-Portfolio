import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ExternalLink, ArrowUpRight, Layers, X, Maximize2, Video } from 'lucide-react';
import { projects, personalInfo } from '../data/portfolioData';
import { TechIcon } from './TechIcons';
import { ProjectGraphic } from './ProjectCardGraphic';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const [zoomedImage, setZoomedImage] = useState(null);

  const filters = useMemo(() => [
    { label: 'ALL WORK', value: 'all' },
    { label: 'WEB DESIGN & DEV', value: 'web' },
    { label: 'GRAPHIC DESIGN', value: 'graphics' },
    { label: 'VIDEO EDITING', value: 'video' },
  ], []);

  // Filter projects based on selected filter
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(
      (p) =>
        p.category === activeFilter ||
        p.categories?.includes(activeFilter) ||
        (activeFilter === 'web' && (p.category === 'app' || p.categories?.includes('app') || p.categories?.includes('ui-ux')))
    );
  }, [activeFilter]);

  // Ensure activeIndex stays in valid range when filter changes
  useEffect(() => {
    setActiveIndex(0);
    setActiveSlideIndex(0);
  }, [activeFilter]);

  const activeProject = filteredProjects[activeIndex] || filteredProjects[0];

  // Reset active screenshot slide when switching active project
  useEffect(() => {
    setActiveSlideIndex(0);
  }, [activeIndex]);

  const total = filteredProjects.length;

  const handlePrev = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const handleNext = useCallback(() => {
    if (total === 0) return;
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  // Keyboard navigation support (Left/Right arrows + Escape for zoom modal)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && zoomedImage) {
        setZoomedImage(null);
        return;
      }
      if (zoomedImage && zoomedImage.images && zoomedImage.images.length > 1) {
        if (e.key === 'ArrowLeft') {
          const nextIdx = (zoomedImage.index - 1 + zoomedImage.images.length) % zoomedImage.images.length;
          setZoomedImage((prev) => ({
            ...prev,
            index: nextIdx,
            src: zoomedImage.images[nextIdx],
          }));
          setActiveSlideIndex(nextIdx);
        } else if (e.key === 'ArrowRight') {
          const nextIdx = (zoomedImage.index + 1) % zoomedImage.images.length;
          setZoomedImage((prev) => ({
            ...prev,
            index: nextIdx,
            src: zoomedImage.images[nextIdx],
          }));
          setActiveSlideIndex(nextIdx);
        }
        return;
      }
      if (!zoomedImage) {
        if (e.key === 'ArrowLeft') handlePrev();
        if (e.key === 'ArrowRight') handleNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, zoomedImage]);

  // Compact 3D Coverflow positioning
  const getCardTransform = (index) => {
    if (total === 0) return {};
    let diff = index - activeIndex;

    // Handle wrapping around for shortest path
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    if (diff === 0) {
      return {
        x: '0%',
        scale: 1,
        rotateY: 0,
        zIndex: 30,
        opacity: 1,
        filter: 'brightness(100%)',
        pointerEvents: 'auto',
      };
    }
    if (diff === 1) {
      return {
        x: '54%',
        scale: 0.82,
        rotateY: -10,
        zIndex: 20,
        opacity: 0.6,
        filter: 'brightness(70%)',
        pointerEvents: 'auto',
      };
    }
    if (diff === -1) {
      return {
        x: '-54%',
        scale: 0.82,
        rotateY: 10,
        zIndex: 20,
        opacity: 0.6,
        filter: 'brightness(70%)',
        pointerEvents: 'auto',
      };
    }
    if (diff === 2) {
      return {
        x: '94%',
        scale: 0.65,
        rotateY: -18,
        zIndex: 10,
        opacity: 0.25,
        filter: 'brightness(50%)',
        pointerEvents: 'auto',
      };
    }
    if (diff === -2) {
      return {
        x: '-94%',
        scale: 0.65,
        rotateY: 18,
        zIndex: 10,
        opacity: 0.25,
        filter: 'brightness(50%)',
        pointerEvents: 'auto',
      };
    }
    return {
      x: diff > 0 ? '140%' : '-140%',
      scale: 0.5,
      rotateY: diff > 0 ? -24 : 24,
      zIndex: 0,
      opacity: 0,
      filter: 'brightness(30%)',
      pointerEvents: 'none',
    };
  };

  return (
    <section
      id="projects"
      className="w-full bg-[#0B0B0E] text-white scroll-mt-16 py-8 sm:py-10 md:py-12 border-b border-zinc-800 relative overflow-hidden select-none"
    >
      {/* Background ambient lighting (GPU-optimized radial gradients) */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[280px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(112, 59, 247, 0.16) 0%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />
      <div
        className="absolute top-1/3 left-0 w-64 h-64 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(112, 59, 247, 0.12) 0%, transparent 70%)',
          transform: 'translateZ(0)',
        }}
      />

      <div className="max-w-6xl mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-purple-light mb-2">
              <span>// 01. SELECTED WORKS</span>
              <span className="w-8 h-[1px] bg-brand-purple/40"></span>
            </div>
            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-[0.92]">
              WORK <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-purple-light to-[#C4B5FD]">GALLERY</span>
            </h2>
            <p className="max-w-md font-sans text-sm sm:text-base text-zinc-400 mt-2 leading-relaxed font-normal">
              A curated collection of web apps, digital systems, and technical design work I&apos;ve built.
            </p>
          </div>

          {/* Top Right: External GitHub Link */}
          <div className="flex items-center gap-2">
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all rounded-none"
            >
              <span>View All Repos</span>
              <ExternalLink className="w-3.5 h-3.5 text-brand-purple-light" />
            </a>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 no-scrollbar">
          {filters.map((filter) => {
            const isActive = activeFilter === filter.value;
            return (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={`relative px-4 py-2 rounded-none font-mono text-xs uppercase tracking-wider transition-all duration-200 whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-brand-purple text-white shadow-md shadow-brand-purple/30 font-semibold'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
                aria-pressed={isActive}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* ── 3D Coverflow Carousel Stage ───────────────────────── */}
        <div className="relative w-full py-2 sm:py-4 overflow-hidden">
          {filteredProjects.length === 0 ? (
            <div className="py-12 px-4 text-center max-w-md mx-auto space-y-3">
              <div className="w-12 h-12 mx-auto bg-zinc-900 border border-zinc-800 flex items-center justify-center text-brand-purple-light shadow-inner">
                <Video className="w-5 h-5 text-brand-purple-light" />
              </div>
              <h3 className="font-anton text-2xl uppercase tracking-wide text-white">
                Video Edits Coming Soon
              </h3>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 leading-relaxed">
                Highlight reels, event recaps, and short-form edits are currently being curated. Accepting new video editing commissions!
              </p>
              <div className="pt-2">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-all rounded-none font-semibold shadow-md shadow-brand-purple/20"
                >
                  <span>Inquire for Video Edit</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ) : (
            <>
              {/* Left Arrow Button */}
              <button
                onClick={handlePrev}
                className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-9 sm:h-9 bg-black/85 hover:bg-brand-purple border border-zinc-700/80 text-white flex items-center justify-center transition-all shadow-xl backdrop-blur-md rounded-none cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Previous project"
              >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* Right Arrow Button */}
              <button
                onClick={handleNext}
                className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-40 w-8 h-8 sm:w-9 sm:h-9 bg-black/85 hover:bg-brand-purple border border-zinc-700/80 text-white flex items-center justify-center transition-all shadow-xl backdrop-blur-md rounded-none cursor-pointer hover:scale-105 active:scale-95"
                aria-label="Next project"
              >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
              </button>

              {/* 3D Perspective Card Stage */}
              <div
                className="relative h-[155px] xs:h-[180px] sm:h-[210px] md:h-[235px] w-full flex items-center justify-center"
                style={{ perspective: 1000 }}
              >
                {filteredProjects.map((project, idx) => {
                  const transform = getCardTransform(idx);
                  const isCenter = idx === activeIndex;

                  const projectImages = project.images && project.images.length > 0 ? project.images : [project.image];
                  const displayImage = isCenter ? (projectImages[activeSlideIndex] || project.image) : project.image;

                  return (
                    <motion.div
                      key={project.id}
                      animate={transform}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 28,
                        mass: 0.85,
                      }}
                      drag={isCenter ? 'x' : false}
                      dragConstraints={{ left: 0, right: 0 }}
                      dragElastic={0.2}
                      onDragEnd={(_, info) => {
                        if (info.offset.x < -40) handleNext();
                        else if (info.offset.x > 40) handlePrev();
                      }}
                      onClick={() => {
                        if (!isCenter) {
                          setActiveIndex(idx);
                        } else if (displayImage && (displayImage.startsWith('http') || displayImage.startsWith('/'))) {
                          // Click on center card zooms in like a modal lightbox!
                          setZoomedImage({
                            src: displayImage,
                            title: project.title,
                            subtitle: project.subtitle,
                            id: project.id,
                            images: projectImages,
                            index: activeSlideIndex,
                          });
                        }
                      }}
                      className={`group absolute h-[140px] xs:h-[165px] sm:h-[195px] md:h-[215px] w-auto max-w-[88vw] sm:max-w-[480px] md:max-w-[510px] rounded-none overflow-hidden transition-shadow duration-300 ${
                        isCenter
                          ? 'border-2 border-brand-purple shadow-2xl shadow-brand-purple/20 ring-1 ring-white/15 cursor-zoom-in'
                          : 'border border-zinc-800 hover:border-zinc-700 shadow-lg cursor-pointer'
                      }`}
                      style={{
                        aspectRatio: project.aspect || '16/10',
                        backgroundColor: project.cardBg || '#141419',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Card Visual / Screenshot (Full view, no cropping) */}
                      {displayImage && (displayImage.startsWith('http') || displayImage.startsWith('/')) ? (
                        <img
                          src={displayImage}
                          alt={project.title}
                          loading={isCenter ? 'eager' : 'lazy'}
                          decoding="async"
                          className="w-full h-full object-contain select-none block"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ProjectGraphic type={project.image} />
                        </div>
                      )}

                      {/* Hover Zoom Hint badge for center card */}
                      {isCenter && (
                        <div className="absolute top-1.5 right-1.5 z-20 flex items-center gap-1 px-1.5 py-0.5 bg-black/80 backdrop-blur-md text-white font-mono text-[8px] uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity border border-white/20 pointer-events-none shadow-xl">
                          <Maximize2 className="w-2.5 h-2.5 text-brand-purple-light" />
                          <span className="hidden xs:inline">Zoom</span>
                        </div>
                      )}

                      {!isCenter && (
                        <div className="absolute inset-0 bg-black/45 hover:bg-black/25 transition-colors z-20 pointer-events-none" />
                      )}
                    </motion.div>
                  );
                })}
              </div>

              {/* Multi-Screenshot Slide Strip for Active Project */}
              {activeProject?.images && activeProject.images.length > 1 && (
                <div className="flex items-center justify-center gap-1.5 mt-2 z-30 relative">
                  <span className="font-mono text-[9px] uppercase text-zinc-500 mr-1 hidden xs:inline">
                    Views:
                  </span>
                  {activeProject.images.map((imgSrc, slideIdx) => (
                    <button
                      key={slideIdx}
                      onClick={() => setActiveSlideIndex(slideIdx)}
                      className={`w-7 h-4.5 sm:w-8 sm:h-5 border overflow-hidden rounded-none transition-all cursor-pointer ${
                        activeSlideIndex === slideIdx
                          ? 'border-brand-purple ring-1 ring-brand-purple scale-105'
                          : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
                      }`}
                      aria-label={`View screenshot ${slideIdx + 1}`}
                    >
                      <img
                        src={imgSrc}
                        alt={`Preview slide ${slideIdx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Carousel Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 mt-2 z-30 relative">
                {filteredProjects.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1 transition-all duration-300 rounded-none cursor-pointer ${
                      activeIndex === i
                        ? 'w-5 bg-brand-purple'
                        : 'w-1.5 bg-zinc-700 hover:bg-zinc-500'
                    }`}
                    aria-label={`Go to project ${i + 1}`}
                  />
                ))}
                <span className="font-mono text-[10px] text-zinc-400 pl-1.5">
                  {String(activeIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
                </span>
              </div>
            </>
          )}
        </div>

        {/* ── Active Project Info (Clean, Centered, Minimalist) ── */}
        <AnimatePresence mode="wait">
          {activeProject && (
            <motion.div
              key={activeProject.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.22, ease: 'easeOut' }}
              className="mt-6 sm:mt-7 max-w-2xl mx-auto text-center px-4 space-y-2.5"
            >
              {/* Project ID & Subtitle */}
              <div className="flex items-center justify-center gap-2 font-mono text-[11px] uppercase tracking-wider text-brand-purple-light">
                <span className="font-anton text-sm text-red-500">{activeProject.id}</span>
                <span>// {activeProject.subtitle}</span>
              </div>

              {/* Title */}
              <h3 className="font-anton text-xl sm:text-2xl md:text-3xl uppercase tracking-wide leading-tight text-white">
                {activeProject.title}
              </h3>

              {/* Simple & Clear Description */}
              <p className="font-sans text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl mx-auto">
                {activeProject.description}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1.5">
                {activeProject.figmaUrl ? (
                  <a
                    href={activeProject.figmaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-all shadow-md shadow-brand-purple/25 rounded-none font-semibold cursor-pointer group"
                  >
                    <span>View in Figma</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : activeProject.canvaUrl ? (
                  <a
                    href={activeProject.canvaUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-all shadow-md shadow-brand-purple/25 rounded-none font-semibold cursor-pointer group"
                  >
                    <span>View in Canva</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : activeProject.liveUrl ? (
                  <a
                    href={activeProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-brand-purple hover:bg-brand-purple-dark text-white font-mono text-xs uppercase tracking-wider transition-all shadow-md shadow-brand-purple/25 rounded-none font-semibold cursor-pointer group"
                  >
                    <span>View Project</span>
                    <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </a>
                ) : null}

                {activeProject.githubUrl && (
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white font-mono text-xs uppercase tracking-wider transition-all rounded-none cursor-pointer"
                  >
                    <TechIcon name="github" className="w-3.5 h-3.5" />
                    <span>Source Code</span>
                    <ExternalLink className="w-3 h-3 text-zinc-400" />
                  </a>
                )}
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                {activeProject.tech.map((t, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 bg-zinc-900/90 border border-zinc-800/80 font-mono text-[10px] text-zinc-400"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>

      {/* ── Image Zoom Lightbox Modal ───────────────────────────────── */}
      <AnimatePresence>
        {zoomedImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 select-none">
            {/* Dark blurred backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setZoomedImage(null)}
              className="fixed inset-0 bg-black/95 cursor-zoom-out"
            />

            {/* Lightbox Modal Window */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              transition={{ type: 'spring', damping: 26, stiffness: 300 }}
              className="relative z-10 max-w-5xl max-h-[92vh] w-full flex flex-col items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Top Bar with Project Info & Close Button */}
              <div className="w-full flex items-center justify-between pb-3 px-1 text-white border-b border-zinc-800/80 mb-3">
                <div className="flex items-center gap-2">
                  <span className="font-anton text-lg text-red-500">
                    {zoomedImage.id}
                  </span>
                  <span className="font-mono text-xs uppercase tracking-wider text-zinc-200 font-medium truncate max-w-xs sm:max-w-md">
                    {zoomedImage.title}
                  </span>
                  {zoomedImage.images && zoomedImage.images.length > 1 && (
                    <span className="font-mono text-[11px] text-zinc-400 pl-1 shrink-0">
                      ({zoomedImage.index + 1} / {zoomedImage.images.length})
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <span className="hidden sm:inline font-mono text-[10px] text-zinc-500 uppercase tracking-wider">
                    ESC to close
                  </span>
                  <button
                    onClick={() => setZoomedImage(null)}
                    className="p-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer rounded-none"
                    aria-label="Close zoomed view"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Main Zoomed Image Container */}
              <div className="relative w-full flex items-center justify-center max-h-[74vh] overflow-hidden">
                {/* Left Arrow (if multiple screenshots exist) */}
                {zoomedImage.images && zoomedImage.images.length > 1 && (
                  <button
                    onClick={() => {
                      const nextIdx = (zoomedImage.index - 1 + zoomedImage.images.length) % zoomedImage.images.length;
                      setZoomedImage((prev) => ({
                        ...prev,
                        index: nextIdx,
                        src: zoomedImage.images[nextIdx],
                      }));
                      setActiveSlideIndex(nextIdx);
                    }}
                    className="absolute left-2 sm:left-4 z-20 w-10 h-10 bg-black/85 hover:bg-brand-purple border border-zinc-700 text-white flex items-center justify-center transition-all cursor-pointer rounded-none shadow-2xl hover:scale-105 active:scale-95"
                    aria-label="Previous slide"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                )}

                {/* The Zoomed Image */}
                <motion.img
                  key={zoomedImage.src}
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2 }}
                  src={zoomedImage.src}
                  alt={zoomedImage.title}
                  className="max-h-[74vh] max-w-full w-auto h-auto object-contain rounded-none border border-zinc-800/90 shadow-2xl bg-[#0A0A0E]"
                />

                {/* Right Arrow (if multiple screenshots exist) */}
                {zoomedImage.images && zoomedImage.images.length > 1 && (
                  <button
                    onClick={() => {
                      const nextIdx = (zoomedImage.index + 1) % zoomedImage.images.length;
                      setZoomedImage((prev) => ({
                        ...prev,
                        index: nextIdx,
                        src: zoomedImage.images[nextIdx],
                      }));
                      setActiveSlideIndex(nextIdx);
                    }}
                    className="absolute right-2 sm:right-4 z-20 w-10 h-10 bg-black/85 hover:bg-brand-purple border border-zinc-700 text-white flex items-center justify-center transition-all cursor-pointer rounded-none shadow-2xl hover:scale-105 active:scale-95"
                    aria-label="Next slide"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                )}
              </div>

              {/* Bottom Multi-Slide Thumbnail Navigation Strip inside Zoom Modal */}
              {zoomedImage.images && zoomedImage.images.length > 1 && (
                <div className="flex items-center justify-center gap-2 mt-3 pt-3 border-t border-zinc-800/60 w-full overflow-x-auto no-scrollbar">
                  {zoomedImage.images.map((imgSrc, sIdx) => (
                    <button
                      key={sIdx}
                      onClick={() => {
                        setZoomedImage((prev) => ({ ...prev, index: sIdx, src: imgSrc }));
                        setActiveSlideIndex(sIdx);
                      }}
                      className={`h-9 w-13 sm:h-11 sm:w-16 border overflow-hidden rounded-none transition-all cursor-pointer shrink-0 ${
                        zoomedImage.index === sIdx
                          ? 'border-brand-purple ring-2 ring-brand-purple/70 scale-105'
                          : 'border-zinc-800 opacity-60 hover:opacity-100 hover:border-zinc-600'
                      }`}
                      aria-label={`Jump to slide ${sIdx + 1}`}
                    >
                      <img
                        src={imgSrc}
                        alt={`Slide ${sIdx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
