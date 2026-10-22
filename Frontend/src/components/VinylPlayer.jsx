import React, { useState } from 'react';

/**
 * VinylPlayer
 * ─────────────────────────────────────────────────
 * Pill button: [tiny spinning vinyl] [▌▌▌ PLAYING / ⏸ PAUSED]
 * Audio is managed by App.jsx and passed in as props.
 */
export function VinylPlayer({ isPlaying, onToggle }) {
  const [isHovered, setIsHovered] = useState(false);
  const grooves = [42, 35, 28, 21];

  return (
    <>
      <style>{`
        @keyframes vp-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes vp-bar1 { 0%,100% { height:5px } 50% { height:13px } }
        @keyframes vp-bar2 { 0%,100% { height:9px } 50% { height:4px  } }
        @keyframes vp-bar3 { 0%,100% { height:4px } 50% { height:11px } }
      `}</style>

      <button
        id="vinyl-player-btn"
        onClick={onToggle}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-label={isPlaying ? 'Pause background music' : 'Play background music'}
        title={isPlaying ? 'Click to pause' : 'Click to play'}
        style={{
          position: 'fixed',
          bottom: '28px',
          right: '28px',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 18px 6px 6px',
          minWidth: '130px',
          background: isHovered ? 'rgba(20,18,32,0.97)' : 'rgba(14,12,22,0.92)',
          backdropFilter: 'blur(14px)',
          WebkitBackdropFilter: 'blur(14px)',
          border: `1px solid ${isPlaying ? 'rgba(112,59,247,0.55)' : 'rgba(255,255,255,0.1)'}`,
          borderRadius: '999px',
          cursor: 'pointer',
          userSelect: 'none',
          outline: 'none',
          boxShadow: isPlaying
            ? '0 0 18px 4px rgba(112,59,247,0.35), 0 4px 20px rgba(0,0,0,0.5)'
            : '0 4px 20px rgba(0,0,0,0.45)',
          transform: isHovered ? 'translateY(-2px) scale(1.03)' : 'translateY(0) scale(1)',
          transition: 'transform 0.2s ease, box-shadow 0.3s ease, border-color 0.3s ease, background 0.2s ease',
          WebkitTapHighlightColor: 'transparent',
        }}
      >
        {/* ── Tiny spinning vinyl ───────────────────────── */}
        <svg
          viewBox="0 0 100 100"
          width="30"
          height="30"
          style={{
            display: 'block',
            flexShrink: 0,
            animation: isPlaying ? 'vp-spin 3s linear infinite' : 'none',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.7))',
          }}
        >
          <defs>
            <radialGradient id="vp-disc" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1c1828" />
              <stop offset="100%" stopColor="#0d0b14" />
            </radialGradient>
            <radialGradient id="vp-lbl" cx="38%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#5b21b6" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#vp-disc)" />
          {grooves.map((r) => (
            <circle key={r} cx="50" cy="50" r={r}
              fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" />
          ))}
          <circle cx="50" cy="50" r="18" fill="url(#vp-lbl)" />
          <circle cx="50" cy="50" r="4"  fill="#0B0B0E" />
          <path d="M 18 30 A 38 38 0 0 1 62 14"
            fill="none" stroke="rgba(255,255,255,0.07)"
            strokeWidth="7" strokeLinecap="round" />
        </svg>

        {/* ── Status label ─────────────────────────────── */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          {isPlaying ? (
            <>
              {/* Animated equaliser bars */}
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '14px' }}>
                {[
                  'vp-bar1 0.7s ease-in-out infinite',
                  'vp-bar2 0.7s ease-in-out infinite 0.15s',
                  'vp-bar3 0.7s ease-in-out infinite 0.3s',
                ].map((anim, i) => (
                  <span key={i} style={{
                    display: 'inline-block',
                    width: '2.5px',
                    height: '8px',
                    borderRadius: '2px',
                    background: '#a78bfa',
                    animation: anim,
                  }} />
                ))}
              </div>
              <span style={{ fontSize: '9px', fontFamily: 'monospace',
                color: '#a78bfa', letterSpacing: '0.06em' }}>
                PLAYING
              </span>
            </>
          ) : (
            <>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="#6b7280">
                <rect x="1" y="1" width="3" height="8" rx="1" />
                <rect x="6" y="1" width="3" height="8" rx="1" />
              </svg>
              <span style={{ fontSize: '9px', fontFamily: 'monospace',
                color: '#6b7280', letterSpacing: '0.06em' }}>
                PAUSED
              </span>
            </>
          )}
        </div>
      </button>
    </>
  );
}

export default VinylPlayer;
