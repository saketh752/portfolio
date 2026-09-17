import React, { useEffect, useRef } from 'react';

interface RadialSpoke {
  angle: number;
  length: number;
  tensionX: number;
  tensionY: number;
  vx: number;
  vy: number;
}

export const WebFilamentCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animationFrameId: number;
    let dpr = window.devicePixelRatio || 1;
    let width = 0;
    let height = 0;

    // Center focal point for the organic web (subtly off-center for dynamic diagonal composition)
    let hubX = 0;
    let hubY = 0;

    const setupDimensions = () => {
      if (!canvas.parentElement) return;
      const rect = canvas.parentElement.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = window.devicePixelRatio || 1;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);

      // Hub positioned slightly above-right of center for dramatic diagonal web lines
      hubX = width * 0.54;
      hubY = height * 0.38;
    };

    setupDimensions();

    const mouse = {
      x: -2000,
      y: -2000,
      targetX: -2000,
      targetY: -2000,
      radius: Math.min(220, Math.max(140, width * 0.22)),
    };

    // 12 structural spokes radiating outwards
    const spokeCount = 12;
    const spokes: RadialSpoke[] = [];
    for (let i = 0; i < spokeCount; i++) {
      const angle = (i * 2 * Math.PI) / spokeCount + 0.15;
      const maxLen = Math.hypot(width, height) * 0.85;
      spokes.push({
        angle,
        length: maxLen,
        tensionX: 0,
        tensionY: 0,
        vx: 0,
        vy: 0,
      });
    }

    // Concentric spiral rings count
    const ringLevels = [0.12, 0.22, 0.34, 0.48, 0.64, 0.82];

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = canvas.getBoundingClientRect();
        mouse.targetX = e.touches[0].clientX - rect.left;
        mouse.targetY = e.touches[0].clientY - rect.top;
      }
    };

    const handleTouchEnd = () => {
      mouse.targetX = -2000;
      mouse.targetY = -2000;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);
    canvas.addEventListener('touchmove', handleTouchMove, { passive: true });
    canvas.addEventListener('touchend', handleTouchEnd);

    const handleResize = () => {
      setupDimensions();
    };

    window.addEventListener('resize', handleResize);

    // Static render for reduced-motion users
    if (prefersReducedMotion) {
      ctx.clearRect(0, 0, width, height);
      // Draw static spider-web geometry
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 0.8;
      spokes.forEach((spoke) => {
        ctx.beginPath();
        ctx.moveTo(hubX, hubY);
        ctx.lineTo(hubX + Math.cos(spoke.angle) * spoke.length, hubY + Math.sin(spoke.angle) * spoke.length);
        ctx.stroke();
      });
      ringLevels.forEach((pct) => {
        ctx.beginPath();
        for (let i = 0; i <= spokeCount; i++) {
          const s = spokes[i % spokeCount];
          const dist = s.length * pct * 0.6;
          const x = hubX + Math.cos(s.angle) * dist;
          const y = hubY + Math.sin(s.angle) * dist;
          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      });

      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseleave', handleMouseLeave);
        canvas.removeEventListener('touchmove', handleTouchMove);
        canvas.removeEventListener('touchend', handleTouchEnd);
        window.removeEventListener('resize', handleResize);
      };
    }

    let time = 0;
    const springK = 0.04;
    const damping = 0.86;

    const render = () => {
      time += 0.016;

      mouse.x += (mouse.targetX - mouse.x) * 0.15;
      mouse.y += (mouse.targetY - mouse.y) * 0.15;

      ctx.clearRect(0, 0, width, height);

      // Physics update for spoke tension
      for (let i = 0; i < spokes.length; i++) {
        const s = spokes[i];

        // Ambient organic breathing
        const ambient = Math.sin(time + i * 0.8) * 1.2;

        // Mouse displacement force along spoke
        const midDist = s.length * 0.35;
        const testX = hubX + Math.cos(s.angle) * midDist + s.tensionX;
        const testY = hubY + Math.sin(s.angle) * midDist + s.tensionY;
        const dx = mouse.x - testX;
        const dy = mouse.y - testY;
        const dist = Math.hypot(dx, dy);

        if (dist < mouse.radius && dist > 0) {
          const force = (1 - dist / mouse.radius) * 8;
          s.vx += (dx / dist) * force;
          s.vy += (dy / dist) * force;
        }

        // Restoring spring tension
        s.vx += (-s.tensionX + ambient) * springK;
        s.vy += (-s.tensionY + ambient) * springK;
        s.vx *= damping;
        s.vy *= damping;

        s.tensionX += s.vx;
        s.tensionY += s.vy;
      }

      // 1. Draw Radiating Spokes
      for (let i = 0; i < spokes.length; i++) {
        const s = spokes[i];
        const endX = hubX + Math.cos(s.angle) * s.length;
        const endY = hubY + Math.sin(s.angle) * s.length;

        // Control point for tensile curved spoke
        const ctrlX = hubX + Math.cos(s.angle) * (s.length * 0.4) + s.tensionX;
        const ctrlY = hubY + Math.sin(s.angle) * (s.length * 0.4) + s.tensionY;

        // Distance from mouse to control point for crimson glow
        const mouseDist = Math.hypot(mouse.x - ctrlX, mouse.y - ctrlY);

        ctx.beginPath();
        ctx.moveTo(hubX, hubY);
        ctx.quadraticCurveTo(ctrlX, ctrlY, endX, endY);

        if (mouseDist < 140) {
          const alpha = (1 - mouseDist / 140) * 0.45 + 0.05;
          ctx.strokeStyle = `rgba(217, 4, 41, ${alpha})`;
          ctx.lineWidth = 1.2;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.035)';
          ctx.lineWidth = 0.75;
        }
        ctx.stroke();
      }

      // 2. Draw Concentric Spiral Web Rings with organic sag curves
      for (let r = 0; r < ringLevels.length; r++) {
        const pct = ringLevels[r];
        const ringDist = Math.min(width, height) * 0.55 * pct;

        ctx.beginPath();
        for (let i = 0; i <= spokes.length; i++) {
          const idx = i % spokes.length;
          const s = spokes[idx];

          const tFactor = (1 - pct * 0.5);
          const px = hubX + Math.cos(s.angle) * ringDist + s.tensionX * tFactor;
          const py = hubY + Math.sin(s.angle) * ringDist + s.tensionY * tFactor;

          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            // Sagged curved web segment bridging between spokes
            const prevS = spokes[(i - 1) % spokes.length];
            const prevX = hubX + Math.cos(prevS.angle) * ringDist + prevS.tensionX * tFactor;
            const prevY = hubY + Math.sin(prevS.angle) * ringDist + prevS.tensionY * tFactor;

            // Inward catenary sag point
            const midAngle = (s.angle + prevS.angle) / 2;
            const sagDist = ringDist * 0.94; // slight inward tension curve
            const sagX = hubX + Math.cos(midAngle) * sagDist + ((s.tensionX + prevS.tensionX) / 2) * tFactor;
            const sagY = hubY + Math.sin(midAngle) * sagDist + ((s.tensionY + prevS.tensionY) / 2) * tFactor;

            ctx.quadraticCurveTo(sagX, sagY, px, py);
          }
        }

        // Highlight ring if mouse is near
        const ringMouseDist = Math.abs(Math.hypot(mouse.x - hubX, mouse.y - hubY) - ringDist);
        if (ringMouseDist < 80) {
          const alpha = (1 - ringMouseDist / 80) * 0.35 + 0.04;
          ctx.strokeStyle = `rgba(217, 4, 41, ${alpha})`;
          ctx.lineWidth = 1.1;
        } else {
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
          ctx.lineWidth = 0.65;
        }
        ctx.stroke();
      }

      // 3. Central Web Hub Core
      ctx.beginPath();
      ctx.arc(hubX, hubY, 3, 0, Math.PI * 2);
      ctx.fillStyle = '#D90429';
      ctx.shadowColor = 'rgba(217, 4, 41, 0.6)';
      ctx.shadowBlur = 8;
      ctx.fill();
      ctx.shadowBlur = 0;

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      canvas.removeEventListener('touchmove', handleTouchMove);
      canvas.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      aria-hidden="true"
    />
  );
};
