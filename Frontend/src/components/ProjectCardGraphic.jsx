import React from 'react';

export const ProjectGraphic = ({ type }) => {
  if (type === 'graphic-portal') {
    // Card 02: Modern olive green with neon lime crescent / portal
    return (
      <div className="w-full h-full min-h-[160px] sm:min-h-[220px] bg-[#1E2914] rounded-none flex items-center justify-center p-4 sm:p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(#84cc16_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          <svg viewBox="0 0 100 100" className="w-full h-full filter drop-shadow-[0_0_20px_rgba(163,230,53,0.45)]">
            <circle cx="50" cy="50" r="38" fill="#A3E635" />
            <circle cx="68" cy="46" r="30" fill="#1E2914" />
          </svg>
        </div>
      </div>
    );
  }

  if (type === 'graphic-circles') {
    // Card 04: Bold vibrant orange with concentric geometric black & white portal
    return (
      <div className="w-full h-full min-h-[160px] sm:min-h-[220px] bg-[#E75626] rounded-none flex items-center justify-center p-4 sm:p-6 relative overflow-hidden group">
        <div className="relative w-24 h-24 sm:w-32 sm:h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          {/* Outer Black Circle */}
          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-none bg-[#18181B] flex items-center justify-center shadow-xl">
            {/* White Ring */}
            <div className="w-16 h-16 sm:w-22 sm:h-22 rounded-none border-[6px] sm:border-[8px] border-white flex items-center justify-center bg-[#E75626]">
              {/* Inner core */}
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-none bg-[#18181B]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
