import React from 'react';

/**
 * Reusable Loading Skeleton for Project Cards
 * Eliminates layout shift (CLS) and provides instant visual feedback
 */
export const ProjectSkeleton = () => {
  return (
    <div className="bg-[#131318] rounded-none border border-zinc-800/90 p-5 sm:p-7 flex flex-col justify-between animate-pulse">
      {/* Top Row */}
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-10 bg-zinc-800 rounded-none" />
        <div className="w-24 h-4 bg-zinc-800 rounded-none" />
      </div>

      {/* Main Box */}
      <div className="bg-zinc-900/60 p-5 sm:p-6 mb-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-3 w-full sm:w-1/2">
          <div className="w-20 h-3 bg-zinc-800 rounded-none" />
          <div className="w-40 h-7 bg-zinc-800 rounded-none" />
        </div>
        <div className="w-full sm:w-44 h-36 bg-zinc-800/80 rounded-none shrink-0" />
      </div>

      {/* Bottom Row */}
      <div className="flex items-center justify-between pt-2 border-t border-zinc-800/80">
        <div className="w-32 h-4 bg-zinc-800 rounded-none" />
        <div className="w-7 h-7 bg-zinc-800 rounded-none" />
      </div>
    </div>
  );
};

export default ProjectSkeleton;
