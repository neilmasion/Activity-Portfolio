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
      style={{ contain: 'strict' }}
      aria-hidden="true"
    >
      {/* Aurora Ambient Container - Pure hardware-accelerated radial gradients, ZERO heavy blur calculation */}
      <div className="absolute inset-0 opacity-80" style={{ transform: 'translateZ(0)' }}>
        
        {/* Blob 1: Central Brand Purple Orb */}
        <div
          className="absolute top-[5%] left-[20%] sm:left-[28%] w-[380px] sm:w-[500px] h-[340px] sm:h-[440px] rounded-full animate-aurora-1"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(112, 59, 247, 0.32) 0%, rgba(139, 92, 246, 0.15) 40%, rgba(112, 59, 247, 0.04) 60%, transparent 75%)',
            transform: 'translateZ(0)',
          }}
        />

        {/* Blob 2: Electric Violet / Indigo Accent */}
        <div
          className="absolute top-[14%] right-[6%] sm:right-[15%] w-[320px] sm:w-[440px] h-[300px] sm:h-[400px] rounded-full animate-aurora-2"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.25) 0%, rgba(124, 58, 237, 0.12) 42%, transparent 72%)',
            transform: 'translateZ(0)',
          }}
        />

        {/* Blob 3: Soft Orchid / Indigo Ambient Highlight */}
        <div
          className="absolute bottom-[8%] left-[6%] sm:left-[12%] w-[300px] sm:w-[400px] h-[280px] sm:h-[360px] rounded-full animate-aurora-3"
          style={{
            background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.20) 0%, rgba(139, 92, 246, 0.08) 45%, transparent 70%)',
            transform: 'translateZ(0)',
          }}
        />
      </div>
    </div>
  );
};

export default AuroraBlob;
