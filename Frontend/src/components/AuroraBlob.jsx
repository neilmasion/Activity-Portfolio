import React from 'react';

/**
 * Slow-moving purple Aurora Blob for the Hero section.
 * Pure CSS animations with GPU-accelerated transforms (translate + scale + rotate).
 * Calibrated with soft gaussian blur and gentle opacity so it enhances
 * the hero typography and developer cutout without overpowering the text.
 */
export const AuroraBlob = () => {
  return (
    <div
      className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0"
      aria-hidden="true"
    >
      {/* Aurora Ambient Container */}
      <div className="absolute inset-0 filter blur-[85px] sm:blur-[115px] opacity-75 transition-opacity duration-1000">
        
        {/* Blob 1: Central Brand Purple Orb (drifting smoothly behind typography) */}
        <div
          className="absolute top-[8%] left-[22%] sm:left-[30%] w-[380px] sm:w-[520px] h-[340px] sm:h-[460px] rounded-full animate-aurora-1"
          style={{
            background: 'radial-gradient(circle, rgba(112, 59, 247, 0.28) 0%, rgba(139, 92, 246, 0.16) 45%, transparent 70%)',
          }}
        />

        {/* Blob 2: Electric Violet / Indigo Accent (drifting top-right) */}
        <div
          className="absolute top-[16%] right-[8%] sm:right-[16%] w-[320px] sm:w-[460px] h-[300px] sm:h-[420px] rounded-full animate-aurora-2"
          style={{
            background: 'radial-gradient(circle, rgba(168, 85, 247, 0.22) 0%, rgba(124, 58, 237, 0.12) 50%, transparent 70%)',
          }}
        />

        {/* Blob 3: Soft Orchid / Indigo Ambient Highlight (drifting bottom-left) */}
        <div
          className="absolute bottom-[10%] left-[8%] sm:left-[14%] w-[300px] sm:w-[420px] h-[280px] sm:h-[380px] rounded-full animate-aurora-3"
          style={{
            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.18) 0%, rgba(139, 92, 246, 0.10) 50%, transparent 70%)',
          }}
        />
      </div>
    </div>
  );
};

export default AuroraBlob;
