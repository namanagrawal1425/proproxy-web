import React, { useEffect, useRef } from 'react';

/**
 * AntigravityParticles (Cursor Spotlight Mode)
 * - Particles ONLY appear within a designated radius around the mouse cursor
 * - Zero particles on the rest of the screen (100% clean canvas elsewhere)
 * - Features the exact diagonal dash geometry & chromatic gradient (Blue -> Violet -> Rose)
 * - Smooth radial falloff (fade out at radius perimeter)
 * - Interactive repulsion & buoyant liftoff around cursor
 */
export default function AntigravityParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // The radius around the mouse where particles exist
    const CURSOR_RADIUS = 210;

    // Mouse Tracking State
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      isHovering: false,
    };

    // Color Palette matching reference photo (Blues -> Violets -> Roses)
    const PALETTE = [
      '#2563EB', // Sapphire Blue
      '#3B82F6', // Electric Blue
      '#4F46E5', // Indigo
      '#7C3AED', // Deep Violet
      '#8B5CF6', // Purple
      '#A855F7', // Magenta Purple
      '#E11D48', // Ruby Rose
      '#F43F5E', // Coral Rose
    ];

    const getColorForOffset = (relY) => {
      // relY ranges from -CURSOR_RADIUS (top of circle) to +CURSOR_RADIUS (bottom)
      const ratio = (relY + CURSOR_RADIUS) / (CURSOR_RADIUS * 2);
      if (ratio < 0.38) {
        return PALETTE[Math.floor(Math.random() * 3)]; // Blues
      } else if (ratio < 0.72) {
        return PALETTE[3 + Math.floor(Math.random() * 3)]; // Violets
      } else {
        return PALETTE[6 + Math.floor(Math.random() * 2)]; // Roses
      }
    };

    // Number of particles localized around the mouse cursor
    const LOCAL_PARTICLE_COUNT = 36;
    const particles = [];

    class LocalParticle {
      constructor() {
        this.respawn(true);
      }

      respawn(randomDist = false) {
        // Spawn within cursor circle
        const angle = Math.random() * Math.PI * 2;
        const dist = randomDist
          ? Math.random() * CURSOR_RADIUS * 0.95
          : CURSOR_RADIUS * (0.3 + Math.random() * 0.65);

        this.x = mouse.x + Math.cos(angle) * dist;
        this.y = mouse.y + Math.sin(angle) * dist;

        const relY = this.y - mouse.y;
        this.color = getColorForOffset(relY);

        // Gentle buoyant drift
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = -(0.4 + Math.random() * 0.8);

        // Diagonal capsule dash geometry (~-45° tilt)
        const isDot = Math.random() < 0.25;
        if (isDot) {
          this.length = 2.5 + Math.random() * 1.5;
          this.thickness = 2;
        } else {
          this.length = 5 + Math.random() * 5.5;
          this.thickness = 1.8 + Math.random() * 0.8;
        }

        this.targetAngle = -0.75 + (Math.random() - 0.5) * 0.35;
        this.angle = this.targetAngle;
        this.baseAlpha = 0.65 + Math.random() * 0.35;
      }

      update() {
        if (!mouse.isHovering) return;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        // If particle leaves the cursor radius, respawn it inside the active aura
        if (dist > CURSOR_RADIUS + 10) {
          this.respawn(false);
          return;
        }

        // Inner core repulsion: keep the exact mouse point clear
        if (dist < 45 && dist > 1) {
          const push = (1 - dist / 45) * 2.5;
          const pushAngle = Math.atan2(dy, dx);
          this.vx += Math.cos(pushAngle) * push;
          this.vy += Math.sin(pushAngle) * push;
        }

        // Slight drag along mouse stroke
        this.vx += mouse.vx * 0.04;
        this.vy += mouse.vy * 0.04;

        // Friction & drift
        this.vx *= 0.93;
        this.vy *= 0.94;
        this.vy -= 0.08; // upward antigravity lift

        this.x += this.vx;
        this.y += this.vy;

        this.angle += (this.targetAngle - this.angle) * 0.05;
      }

      draw() {
        if (!mouse.isHovering) return;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.hypot(dx, dy);

        if (dist > CURSOR_RADIUS) return;

        // Smooth radial edge falloff (alpha fades to 0 at perimeter)
        const edgeFade = Math.sin((1 - dist / CURSOR_RADIUS) * (Math.PI / 2));
        const finalAlpha = Math.max(0, Math.min(1, this.baseAlpha * edgeFade));

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        const r = this.thickness / 2;
        const l = this.length;
        ctx.roundRect(-l / 2, -r, l, this.thickness, r);

        ctx.fillStyle = this.color;
        ctx.globalAlpha = finalAlpha;
        ctx.fill();

        ctx.restore();
      }
    }

    // Initialize local particle pool
    for (let i = 0; i < LOCAL_PARTICLE_COUNT; i++) {
      particles.push(new LocalParticle());
    }

    // Mouse Listeners
    const handleMouseMove = (e) => {
      mouse.vx = e.clientX - mouse.prevX;
      mouse.vy = e.clientY - mouse.prevY;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.prevX = e.clientX;
      mouse.prevY = e.clientY;
      mouse.isHovering = true;
    };

    const handleMouseLeave = () => {
      mouse.isHovering = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    // 60fps render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      if (mouse.isHovering) {
        for (let i = 0; i < particles.length; i++) {
          particles[i].update();
          particles[i].draw();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}
