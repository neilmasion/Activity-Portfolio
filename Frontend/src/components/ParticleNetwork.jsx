import React, { useEffect, useRef } from 'react';

/**
 * Global subtle particle network canvas.
 * Zero-dependency, pure HTML5 canvas + 2D context.
 * Features:
 * - Fluid slow-drifting constellation particles
 * - Soft purple/violet lines connecting nearby nodes
 * - Gentle mouse reactivity (draws faint tether when near cursor)
 * - Retina/HiDPI display scaling
 * - Pauses rendering when tab is hidden to preserve battery
 */
export const ParticleNetwork = ({
  maxDistance = 100,
  color = '168, 85, 247', // brand purple in RGB
}) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Determine particle count based on screen width (desktop vs mobile)
    const getParticleCount = () => {
      const w = window.innerWidth;
      if (w < 640) return 20; // Mobile: 20 particles
      if (w < 1024) return 32; // Tablet: 32 particles
      return 45; // Desktop: 45 particles (whisper-subtle)
    };

    let particles = [];
    const mouse = { x: null, y: null, radius: 110 };

    const createParticles = () => {
      const count = getParticleCount();
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.35, // slow drifting velocity
          vy: (Math.random() - 0.5) * 0.35,
          radius: Math.random() * 0.9 + 1.1, // tiny dots: 1.1px - 2.0px
          baseAlpha: Math.random() * 0.18 + 0.22, // 0.22 - 0.40 alpha
          phase: Math.random() * Math.PI * 2, // phase for subtle twinkle
        });
      }
    };

    // Retina display support
    const handleResize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      createParticles();
    };

    handleResize();

    // Mouse tracking
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    let isRunning = true;

    // Visibility change handling to save power
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
      } else {
        isRunning = true;
        render();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Animation render loop
    let lastTime = 0;
    const render = (time = 0) => {
      if (!isRunning) return;

      const delta = (time - lastTime) / 1000 || 0.016;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      const count = particles.length;

      // Update positions
      for (let i = 0; i < count; i++) {
        const p = particles[i];

        p.x += p.vx * (delta * 60);
        p.y += p.vy * (delta * 60);

        // Wrap around viewport edges smoothly
        if (p.x < -10) p.x = width + 10;
        else if (p.x > width + 10) p.x = -10;

        if (p.y < -10) p.y = height + 10;
        else if (p.y > height + 10) p.y = -10;

        // Subtle mouse push/interactivity
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - p.x;
          const dy = mouse.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouse.radius && dist > 0) {
            // Very faint connection to mouse cursor
            const mouseAlpha = (1 - dist / mouse.radius) * 0.16;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = `rgba(${color}, ${mouseAlpha.toFixed(3)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }

        // Draw particle dot
        const twinkle = Math.sin(time * 0.0015 + p.phase) * 0.06;
        const currentAlpha = Math.max(0.12, Math.min(0.45, p.baseAlpha + twinkle));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${currentAlpha.toFixed(3)})`;
        ctx.fill();
      }

      // Draw connecting lines between close particles
      ctx.lineWidth = 0.65;
      for (let i = 0; i < count; i++) {
        const p1 = particles[i];
        for (let j = i + 1; j < count; j++) {
          const p2 = particles[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            // Ultra-faint line opacity (max ~0.10 so it never distracts)
            const lineAlpha = (1 - dist / maxDistance) * 0.10;

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
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [maxDistance, color]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-[12] select-none opacity-85"
      aria-hidden="true"
    />
  );
};

export default ParticleNetwork;
