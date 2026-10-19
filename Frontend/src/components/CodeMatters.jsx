import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, CheckCircle2, ShieldCheck, Cpu, Code2, Gauge } from 'lucide-react';

export const CodeMatters = () => {
  const [activeTab, setActiveTab] = useState('code');

  const snippetCode = `// Architecture: Clean, Reactive & Scalable
import { motion } from 'framer-motion';
import { useScrollPhysics } from '@/hooks';

export const FluidComponent = ({ children }) => {
  const { springY, opacity } = useScrollPhysics();

  return (
    <motion.section 
      style={{ y: springY, opacity }}
      className="render-optimized gpu-accelerated"
    >
      {children}
    </motion.section>
  );
};`;

  const snippetMetrics = `{
  "lighthouse": {
    "performance": 100,
    "accessibility": 100,
    "bestPractices": 100,
    "seo": 100
  },
  "metrics": {
    "firstContentfulPaint": "0.38s",
    "cumulativeLayoutShift": "0.000",
    "totalBlockingTime": "0ms"
  }
}`;

  return (
    <section id="engineering" className="w-full bg-[#FAFAFC] py-16 md:py-24 border-b border-zinc-200">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 lg:px-14">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Interactive Terminal Box */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="rounded-2xl overflow-hidden bg-[#0D0D12] border border-zinc-800 shadow-2xl shadow-purple-950/20">
              
              {/* Window Titlebar */}
              <div className="px-5 py-3.5 bg-[#14141C] border-b border-zinc-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
                </div>

                {/* Tab Switcher */}
                <div className="flex items-center gap-1 bg-[#09090D] p-1 rounded-lg border border-zinc-800/80 text-[11px] font-mono">
                  <button
                    onClick={() => setActiveTab('code')}
                    className={`px-3 py-1 rounded transition-colors ${
                      activeTab === 'code' ? 'bg-zinc-800 text-white font-medium' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Engine.tsx
                  </button>
                  <button
                    onClick={() => setActiveTab('metrics')}
                    className={`px-3 py-1 rounded transition-colors ${
                      activeTab === 'metrics' ? 'bg-zinc-800 text-brand-purple-light font-medium' : 'text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    Vitals.json
                  </button>
                </div>
              </div>

              {/* Code Content */}
              <div className="p-6 font-mono text-xs sm:text-[13px] leading-relaxed overflow-x-auto text-zinc-300">
                {activeTab === 'code' ? (
                  <pre className="text-zinc-300 font-mono">
                    <code>
                      <span className="text-zinc-500">// Architecture: Clean, Reactive &amp; Scalable</span>{'\n'}
                      <span className="text-purple-400">import</span> {'{'} motion {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-400">'framer-motion'</span>;{'\n'}
                      <span className="text-purple-400">import</span> {'{'} useScrollPhysics {'}'} <span className="text-purple-400">from</span> <span className="text-emerald-400">'@/hooks'</span>;{'\n\n'}
                      <span className="text-blue-400">export const</span> <span className="text-amber-300">FluidComponent</span> = ({'{'} children {'}'}) =&gt; {'{'}{'\n'}
                      {'  '}<span className="text-blue-400">const</span> {'{'} springY, opacity {'}'} = <span className="text-amber-300">useScrollPhysics</span>();{'\n\n'}
                      {'  '}<span className="text-purple-400">return</span> ({'\n'}
                      {'    '}&lt;<span className="text-red-400">motion.section</span>{'\n'}
                      {'      '}style={'{'}{'{'} y: springY, opacity {'}'}{'}'}{'\n'}
                      {'      '}className=<span className="text-emerald-400">"render-optimized gpu-accelerated"</span>{'\n'}
                      {'    '}&gt;{'\n'}
                      {'      '}{'{'}children{'}'}{'\n'}
                      {'    '}&lt;/<span className="text-red-400">motion.section</span>&gt;{'\n'}
                      {'  '});{'\n'}
                      {'}'};
                    </code>
                  </pre>
                ) : (
                  <pre className="text-emerald-400 font-mono">
                    <code>{snippetMetrics}</code>
                  </pre>
                )}
              </div>

              {/* Bottom Terminal Badge */}
              <div className="px-6 py-3.5 bg-[#111118] border-t border-zinc-800/80 flex items-center justify-between text-xs font-mono text-zinc-400">
                <span className="flex items-center gap-2 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Type-checked: 0 Errors
                </span>
                <span className="text-zinc-500">React 19 / TypeScript 5.5</span>
              </div>
            </div>
          </div>

          {/* Right Column: Copy & Principles */}
          <div className="lg:col-span-6 order-1 lg:order-2">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-brand-purple mb-2">
              <span>// 03. ENGINEERING STANDARDS</span>
              <span className="w-8 h-[1px] bg-brand-purple/40"></span>
            </div>

            <h2 className="font-anton text-4xl sm:text-5xl md:text-6xl tracking-tight uppercase leading-[0.92] text-zinc-950 mb-4">
              CODE MATTERS. <br />
              <span className="text-brand-purple">UI DOES TOO.</span>
            </h2>

            <p className="font-sans text-sm sm:text-base text-zinc-600 leading-relaxed font-normal mb-8">
              A visually stunning interface is nothing if it lags, crashes, or fails on mobile. Equally, the cleanest code is wasted if the user experience is clunky and unintuitive. I bridge both worlds seamlessly.
            </p>

            {/* Feature points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-sm flex items-start gap-3">
                <Gauge className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-zinc-900 mb-1">
                    Zero Layout Shift (CLS)
                  </h4>
                  <p className="text-xs text-zinc-500 leading-normal">
                    Rock solid layout stability so content never jumps while loading.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-white border border-zinc-200/90 shadow-sm flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-brand-purple shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-mono text-xs uppercase font-bold text-zinc-900 mb-1">
                    WCAG AAA Accessibility
                  </h4>
                  <p className="text-xs text-zinc-500 leading-normal">
                    High-contrast typography, screen reader compliance, keyboard navigation.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
