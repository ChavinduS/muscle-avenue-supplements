import React, { useEffect, useRef } from 'react';
import { useStore } from '../context/StoreContext';

export default function BackgroundAnimation() {
  const { theme } = useStore();
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Mouse tracking for subtle interactive energy attraction
    let mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const isDark = theme === 'dark';

    // Particle count: slightly more density for richer visual rhythm
    const particleCount = Math.min(60, Math.max(30, Math.floor(width / 26)));
    const particles = [];

    // Color palettes tuned for high visibility and contrast
    const lightColors = [
      'rgba(234, 88, 12, ',   // Deep Energizing Orange
      'rgba(220, 38, 38, ',   // Athletic Crimson Red
      'rgba(217, 119, 6, ',   // Warm Gold
      'rgba(71, 85, 105, '    // Slate 600
    ];

    const darkColors = [
      'rgba(249, 115, 22, ',  // Neon Brand Orange
      'rgba(245, 158, 11, ',  // Neon Amber Gold
      'rgba(239, 68, 68, ',   // Neon Crimson
      'rgba(148, 163, 184, '  // Cool Slate
    ];

    const activeColors = isDark ? darkColors : lightColors;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.4 + (isDark ? 1.0 : 1.6), // Slightly larger for light mode visibility
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5 - 0.08, // Subtle upward drift (like gym thermogenic energy)
        color: activeColors[i % activeColors.length],
        // Higher base alpha in light mode so it never washes out
        baseAlpha: isDark ? (Math.random() * 0.45 + 0.2) : (Math.random() * 0.45 + 0.45),
        pulseSpeed: Math.random() * 0.025 + 0.015,
        angle: Math.random() * Math.PI * 2,
        isRing: i % 5 === 0 // 20% of particles are high-tech stroked rings
      });
    }

    // Floating Geometric Fitness Hexagons (Athletic Gym Aesthetic)
    const shapes = [];
    const shapeCount = Math.min(8, Math.max(4, Math.floor(width / 250)));
    for (let s = 0; s < shapeCount; s++) {
      shapes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 26 + 18,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.008,
        vy: -0.2 - Math.random() * 0.25, // Slow continuous upward float
        vx: (Math.random() - 0.5) * 0.2,
        alpha: isDark ? 0.18 : 0.24,
        color: s % 2 === 0 
          ? (isDark ? 'rgba(249, 115, 22, ' : 'rgba(234, 88, 12, ') 
          : (isDark ? 'rgba(239, 68, 68, ' : 'rgba(220, 38, 38, ')
      });
    }

    // Helper: draw hexagon
    const drawHexagon = (ctx, x, y, size, rotation) => {
      ctx.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = rotation + (i * Math.PI) / 3;
        const hx = x + size * Math.cos(angle);
        const hy = y + size * Math.sin(angle);
        if (i === 0) ctx.moveTo(hx, hy);
        else ctx.lineTo(hx, hy);
      }
      ctx.closePath();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // 1. Render Floating Geometric Fitness Hexagons
      shapes.forEach(shape => {
        shape.y += shape.vy;
        shape.x += shape.vx;
        shape.rotation += shape.rotationSpeed;

        // Wrap edges smoothly
        if (shape.y < -50) shape.y = height + 50;
        if (shape.x < -50) shape.x = width + 50;
        if (shape.x > width + 50) shape.x = -50;

        ctx.save();
        drawHexagon(ctx, shape.x, shape.y, shape.size, shape.rotation);
        ctx.strokeStyle = `${shape.color}${shape.alpha})`;
        ctx.lineWidth = isDark ? 1.0 : 1.5;
        ctx.stroke();
        ctx.restore();
      });

      // 2. Connect close particles with visible energy lines
      const maxDist = 140;
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDist) {
            // In light mode, line alpha is boosted (0.24 max) for rich visibility
            const lineFactor = (1 - dist / maxDist);
            const lineAlpha = lineFactor * (isDark ? 0.16 : 0.26);
            
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = isDark
              ? `rgba(249, 115, 22, ${lineAlpha})`
              : `rgba(234, 88, 12, ${lineAlpha})`;
            ctx.lineWidth = isDark ? 0.8 : 1.1;
            ctx.stroke();
          }
        }

        // Connect to mouse cursor when nearby
        if (mouse.active) {
          const mdx = particles[i].x - mouse.x;
          const mdy = particles[i].y - mouse.y;
          const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
          if (mdist < 160) {
            const mAlpha = (1 - mdist / 160) * (isDark ? 0.35 : 0.45);
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.strokeStyle = isDark
              ? `rgba(249, 115, 22, ${mAlpha})`
              : `rgba(220, 38, 38, ${mAlpha})`;
            ctx.lineWidth = isDark ? 1.0 : 1.4;
            ctx.stroke();
          }
        }
      }

      // 3. Render & update energy particles
      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.pulseSpeed;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        const currentAlpha = Math.min(1, Math.max(0.15, p.baseAlpha + Math.sin(p.angle) * 0.18));

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);

        if (p.isRing) {
          // Stroked energy halo ring
          ctx.strokeStyle = `${p.color}${currentAlpha})`;
          ctx.lineWidth = isDark ? 1.2 : 1.6;
          ctx.stroke();
        } else {
          // Filled energy spark
          ctx.fillStyle = `${p.color}${currentAlpha})`;
          ctx.shadowBlur = isDark ? 10 : 6;
          ctx.shadowColor = `${p.color}${isDark ? '0.7)' : '0.45)'}`;
          ctx.fill();
          ctx.shadowBlur = 0; // reset
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  const isDark = theme === 'dark';

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Background Animated Floating Radial Glow Orbs - Enhanced for Light Mode Visibility */}
      <div 
        className={`absolute -top-32 -left-32 w-[650px] h-[650px] rounded-full blur-[110px] transition-all duration-1000 animate-float-slow ${
          isDark 
            ? 'bg-gradient-to-br from-orange-600/35 via-red-600/25 to-transparent opacity-40' 
            : 'bg-gradient-to-br from-orange-400/45 via-amber-300/35 to-transparent opacity-80'
        }`} 
      />

      <div 
        className={`absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full blur-[120px] transition-all duration-1000 animate-float-reverse ${
          isDark 
            ? 'bg-gradient-to-bl from-amber-600/30 via-orange-500/20 to-transparent opacity-35' 
            : 'bg-gradient-to-bl from-red-400/40 via-orange-300/30 to-transparent opacity-75'
        }`} 
      />

      <div 
        className={`absolute -bottom-32 left-1/4 w-[700px] h-[700px] rounded-full blur-[130px] transition-all duration-1000 animate-float-slow ${
          isDark 
            ? 'bg-gradient-to-tr from-emerald-600/20 via-orange-600/15 to-transparent opacity-30' 
            : 'bg-gradient-to-tr from-amber-400/40 via-orange-400/30 to-transparent opacity-70'
        }`} 
      />

      {/* Structured Gym Geometric Pattern Overlay */}
      <div 
        className={`absolute inset-0 transition-opacity duration-700 ${
          isDark ? 'gym-grid-pattern opacity-40' : 'gym-grid-pattern-light opacity-75'
        }`} 
      />

      {/* Interactive Dynamic Canvas (Particles, Synapse Lines, Floating Hexagons & Cursor Glow) */}
      <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />
    </div>
  );
}
