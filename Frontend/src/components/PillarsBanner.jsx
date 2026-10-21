import React from 'react';

export const PillarsBanner = () => {
  const pillars = [
    { title: "DESIGN WITH INTENTION.", desc: "Every layout, color, and element is chosen to serve a clear purpose — not just to look good." },
    { title: "BUILD TO STAND OUT.", desc: "I treat every project like it's my own, making sure the final result is something worth showing off." },
    { title: "ALWAYS KEEP LEARNING.", desc: "From writing code manually to exploring AI tools, I stay open to new ways of working and growing." },
  ];

  return (
    <section className="w-full bg-[#0B0B0E] text-white py-10 md:py-14 border-y border-zinc-800">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex flex-col justify-start">
              <div className="flex items-center gap-3 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-brand-purple shrink-0 animate-pulse"></span>
                <h3 className="font-anton text-2xl sm:text-3xl tracking-wide uppercase text-white">
                  {pillar.title}
                </h3>
              </div>
              <p className="font-sans text-xs sm:text-sm text-zinc-400 pl-5 leading-relaxed">
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
