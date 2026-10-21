import React, { useState, useMemo, useCallback, Suspense, lazy } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { projects } from '../data/portfolioData';
import { ProjectGraphic } from './ProjectCardGraphic';
import { ProjectSkeleton } from './ProjectSkeleton';

// Performance: Code split ProjectModal with React.lazy
const ProjectModal = lazy(() => import('./ProjectModal').then(module => ({ default: module.ProjectModal })));

// Performance: Memoized individual project card to prevent unnecessary re-renders
const ProjectCard = React.memo(({ project, onSelect }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-[#131318] rounded-none border border-zinc-800/90 p-5 sm:p-7 flex flex-col justify-between hover:border-zinc-700 transition-all duration-300 hover:shadow-2xl hover:shadow-brand-purple/10 cursor-pointer"
      onClick={() => onSelect(project)}
      tabIndex={0}
      role="button"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect(project);
        }
      }}
      aria-label={`View details for project ${project.title}`}
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

      {/* Card Main Inner Container */}
      <div 
        className="rounded-none overflow-hidden p-5 sm:p-6 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-transform duration-300 group-hover:-translate-y-1"
        style={{ backgroundColor: project.cardBg, color: project.textColor }}
      >
        {/* Headline */}
        <div className="max-w-[240px]">
          <div className="font-mono text-[10px] uppercase tracking-wider opacity-70 mb-2">
            FEATURED PROJECT
          </div>
          <h3 className="font-anton text-2xl sm:text-3xl leading-snug tracking-wide uppercase">
            &ldquo;{project.title}&rdquo;
          </h3>
        </div>

        {/* Thumbnail / Graphic */}
        <div className="w-full sm:w-44 h-36 rounded-none overflow-hidden shrink-0 shadow-lg relative bg-black/10">
          {project.image.startsWith('http') || project.image.startsWith('/') ? (
            <picture>
              <source srcSet={project.image} type="image/webp" />
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                decoding="async"
                width="176"
                height="144"
                className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
            </picture>
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
          <div className="w-7 h-7 rounded-none bg-zinc-800 flex items-center justify-center text-zinc-300 group-hover:bg-brand-purple group-hover:text-white transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
            <ArrowUpRight className="w-3.5 h-3.5" />
          </div>
        </div>
      </div>
    </motion.div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const ITEMS_PER_PAGE = 4;

  const filters = useMemo(() => [
    { label: 'ALL PROJECTS', value: 'all' },
    { label: 'UI/UX & FIGMA', value: 'ui-ux' },
    { label: 'GRAPHIC DESIGN & PUBMATS', value: 'graphics' },
    { label: 'MOBILE & APPS', value: 'app' },
  ], []);

  // Performance: Memoized filtered projects list
  const filteredProjects = useMemo(() => {
    if (activeFilter === 'all') return projects;
    return projects.filter(p => p.category === activeFilter || p.categories?.includes(activeFilter));
  }, [activeFilter]);

  // Performance: Pagination calculation
  const totalPages = Math.max(1, Math.ceil(filteredProjects.length / ITEMS_PER_PAGE));
  const safeCurrentPage = Math.min(currentPage, totalPages);

  const displayedProjects = useMemo(() => {
    const start = (safeCurrentPage - 1) * ITEMS_PER_PAGE;
    return filteredProjects.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredProjects, safeCurrentPage]);

  const handleFilterChange = useCallback((newFilter) => {
    setIsTransitioning(true);
    setActiveFilter(newFilter);
    setCurrentPage(1);
    setTimeout(() => setIsTransitioning(false), 200);
  }, []);

  const handlePageChange = useCallback((newPage) => {
    setIsTransitioning(true);
    setCurrentPage(newPage);
    setTimeout(() => setIsTransitioning(false), 200);
  }, []);

  return (
    <section id="projects" className="w-full bg-[#0B0B0E] text-white scroll-mt-16 py-14 md:py-24 border-b border-zinc-800 relative overflow-hidden">
      
      {/* Ambient background light */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-brand-purple/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-purple-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-purple-light mb-2">
              <span>// 01. SELECTED PROJECTS</span>
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
                onClick={() => handleFilterChange(filter.value)}
                className={`relative px-5 py-2 rounded-none font-mono text-xs uppercase tracking-wider transition-all duration-300 whitespace-nowrap ${
                  isActive
                    ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/30 font-semibold'
                    : 'bg-zinc-900/80 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-zinc-800'
                }`}
                aria-pressed={isActive}
              >
                {filter.label}
              </button>
            );
          })}
        </div>

        {/* Project Cards Grid with Loading Skeletons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 min-h-[300px]">
          {isTransitioning ? (
            <>
              <ProjectSkeleton />
              <ProjectSkeleton />
            </>
          ) : filteredProjects.length === 0 ? (
            <div className="col-span-full py-14 text-center border border-dashed border-zinc-800 p-8">
              <p className="font-mono text-xs uppercase tracking-widest text-zinc-400 mb-3">
                No projects currently listed under this filter.
              </p>
              <button
                onClick={() => handleFilterChange('all')}
                className="font-mono text-xs text-brand-purple-light hover:underline uppercase tracking-wider"
              >
                View All Projects →
              </button>
            </div>
          ) : (
            <AnimatePresence mode="popLayout">
              {displayedProjects.map((project) => (
                <ProjectCard
                  key={project.id}
                  project={project}
                  onSelect={setSelectedProject}
                />
              ))}
            </AnimatePresence>
          )}
        </div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-6 border-t border-zinc-800/80">
            <div className="font-mono text-xs text-zinc-400 uppercase tracking-wider">
              Showing Page <span className="text-white font-bold">{safeCurrentPage}</span> of{' '}
              <span className="text-white font-bold">{totalPages}</span> ({filteredProjects.length} total projects)
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(safeCurrentPage - 1)}
                disabled={safeCurrentPage <= 1}
                className="px-4 py-2 border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
                aria-label="Previous Page"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>Prev</span>
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isCurrent = pageNum === safeCurrentPage;
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 font-mono text-xs flex items-center justify-center transition-colors ${
                      isCurrent
                        ? 'bg-brand-purple text-white font-bold'
                        : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800'
                    }`}
                    aria-label={`Go to page ${pageNum}`}
                    aria-current={isCurrent ? 'page' : undefined}
                  >
                    {pageNum}
                  </button>
                );
              })}

              <button
                onClick={() => handlePageChange(safeCurrentPage + 1)}
                disabled={safeCurrentPage >= totalPages}
                className="px-4 py-2 border border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800 disabled:opacity-40 disabled:cursor-not-allowed text-xs font-mono uppercase tracking-wider transition-colors flex items-center gap-1.5"
                aria-label="Next Page"
              >
                <span>Next</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Code-split Suspense boundary for modal */}
      <Suspense fallback={null}>
        {selectedProject && (
          <ProjectModal
            key={selectedProject.id}
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </Suspense>
    </section>
  );
};

export default Projects;
