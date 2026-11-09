import React, { useEffect, useRef } from 'react';

/**
 * Lightweight, GPU-friendly subtle particle network canvas.
 * Optimized for peak 60-120fps scrolling and ultra-low battery/GPU usage.
 * Features:
 * - Reduced particle count for instant distance checks
 * - Auto-pauses during page scroll for stutter-free scrolling
 * - Pauses when tab is hidden
 * - Hardware composited with isolated rendering layer
 */
export const ParticleNetwork = ({
  maxDistance = 90,
  color = '168, 85, 247', // brand purple in RGB
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId;
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Lean particle count for ultra-smooth performance
    const getParticleCount = () => {
      const w = window.innerWidth;
      if (w < 640) return 12; // Mobile
      if (w < 1024) return 18; // Tablet
      return 24; // Desktop: 24 particles is whisper-subtle and 75% faster
    };

    let particles = [];
    const mouse = { x: null, y: null, radius: 95 };

    const createParticles = () => {
      const count = getParticleCount();
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          radius: Math.random() * 0.8 + 1.0,
          baseAlpha: Math.random() * 0.15 + 0.20,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;

      // Keep canvas dimensions 1:1 without expensive high-DPR multiplication
      canvas.width = width;
      canvas.height = height;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      createParticles();
    };

    handleResize();

    // Mouse tracking (passive, minimal work)
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    let isRunning = true;
    let isScrolling = false;
    let scrollTimeout;

    // PAUSE ANIMATION DURING SCROLL for 100% stutter-free scrolling
    const handleScroll = () => {
      isScrolling = true;
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        isScrolling = false;
      }, 120);
    };

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
      } else {
        isRunning = true;
        render();
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation render loop
    let lastTime = 0;
    const render = (time = 0) => {
      if (!isRunning) return;

      // When actively scrolling, skip heavy canvas rendering to guarantee 60-120fps scroll
      if (isScrolling) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const delta = (time - lastTime) / 1000 || 0.016;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const count = particles.length;

      // Update positions
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        p.x += p.vx * (delta * 60);
        p.y += p.vy * (delta * 60);

        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;

        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Mouse connection
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            const mouseAlpha = (1 - dist / mouse.radius) * 0.14;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${color}, ${mouseAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Draw dot
        const twinkle = Math.sin(time * 0.0015 + p.phase) * 0.05;
        const currentAlpha = Math.max(0.12, Math.min(0.40, p.baseAlpha + twinkle));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${currentAlpha.toFixed(3)})`;
        ctx.fill();
      }

      // Draw connecting lines
      ctx.lineWidth = 0.6;
      for (let i = 0; i < count; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            const lineAlpha = (1 - dist / maxDistance) * 0.09;

            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${color}, ${lineAlpha.toFixed(3)})`;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      isRunning = false;
      cancelAnimationFrame(animationFrameId);
      clearTimeout(scrollTimeout);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [maxDistance, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[12] select-none opacity-80"
      style={{
        transform: 'translateZ(0)',
        willChange: 'transform',
        contain: 'strict',
      }}
      aria-hidden="true"
    />
  );
};

export default ParticleNetwork;
