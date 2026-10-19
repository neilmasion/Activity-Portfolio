import React from 'react';

export const ProjectGraphic = ({ type }) => {
  if (type === 'graphic-portal') {
    // Card 02: Modern olive green with neon lime crescent / portal
    return (
      <div className="w-full h-full min-h-[180px] sm:min-h-[220px] bg-[#1E2914] rounded-xl flex items-center justify-center p-6 relative overflow-hidden group">
        <div className="absolute inset-0 bg-[radial-gradient(#84cc16_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
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
      <div className="w-full h-full min-h-[180px] sm:min-h-[220px] bg-[#E75626] rounded-xl flex items-center justify-center p-6 relative overflow-hidden group">
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 flex items-center justify-center transition-transform duration-500 group-hover:scale-110">
          {/* Outer Black Circle */}
          <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-[#18181B] flex items-center justify-center shadow-xl">
            {/* White Ring */}
            <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full border-[8px] border-white flex items-center justify-center bg-[#E75626]">
              {/* Inner core */}
              <div className="w-6 h-6 rounded-full bg-[#18181B]" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};
