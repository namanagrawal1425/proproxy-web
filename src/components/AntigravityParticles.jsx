import React, { useEffect, useRef } from 'react';

/**
 * AntigravityParticles
 * Recreates the exact Google Antigravity liftoff particle field:
 * - Parabolic / upward-bursting trajectory
 * - Multi-colored oriented pill/dash particles (Blue, Red, Yellow, Green, Purple, Cyan)
 * - Clear central zone for typography readability
 * - Interactive mouse repulsion & turbulence
 * - Continuous 60fps infinite animation loop that never halts
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

    // Multi-color palette matching Google Antigravity liftoff branding
    const PALETTE = [
      '#4285F4', // Google Blue
      '#EA4335', // Google Red
      '#FBBC05', // Google Yellow
      '#34A853', // Google Green
      '#8B5CF6', // Vivid Violet
      '#06B6D4', // Electric Cyan
      '#EC4899', // Pink Accent
    ];

    const mouse = {
      x: width / 2,
      y: height / 2,
      radius: 120,
      active: false,
    };

    // Responsive particle count
    const particleCount = Math.min(Math.max(Math.floor((width * height) / 4500), 160), 320);
    const particles = [];

    class Particle {
      constructor() {
        this.init(true);
      }

      init(randomY = false) {
        // Particles form a parabolic / V-shaped dispersion expanding outwards and upwards
        this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        
        // Horizontal position distributed around center
        const spreadFactor = (Math.random() - 0.5) * 2;
        this.x = width / 2 + spreadFactor * (width * 0.45);
        
        if (randomY) {
          this.y = Math.random() * height;
        } else {
          // Spawn near bottom or middle-lower zone
          this.y = height + Math.random() * 40;
        }

        // Velocity vector: upward drift with outward spread
        const outward = (this.x - width / 2) / (width / 2);
        this.vx = outward * (0.8 + Math.random() * 1.4) + (Math.random() - 0.5) * 0.5;
        this.vy = -(1.2 + Math.random() * 2.2);

        // Particle dimensions: Dash / Pill style
        this.length = 6 + Math.random() * 8;
        this.thickness = 2.2 + Math.random() * 1.6;
        this.opacity = 0.4 + Math.random() * 0.55;
        this.baseOpacity = this.opacity;

        // Angle aligned with velocity
        this.angle = Math.atan2(this.vy, this.vx);
        this.spin = (Math.random() - 0.5) * 0.02;
      }

      update() {
        // Continuous upward liftoff drift
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.spin;

        // Gentle central repulsion to keep main text readable
        const centerX = width / 2;
        const centerY = height * 0.38;
        const distFromCenter = Math.hypot(this.x - centerX, (this.y - centerY) * 1.4);
        if (distFromCenter < 240) {
          const pushAngle = Math.atan2(this.y - centerY, this.x - centerX);
          this.x += Math.cos(pushAngle) * 1.5;
          this.y += Math.sin(pushAngle) * 1.2;
        }

        // Interactive mouse disturbance
        if (mouse.active) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius) {
            const force = (1 - dist / mouse.radius) * 4;
            const angle = Math.atan2(dy, dx);
            this.x += Math.cos(angle) * force;
            this.y += Math.sin(angle) * force;
          }
        }

        // Recycle particle once it exits viewport
        if (this.y < -30 || this.x < -40 || this.x > width + 40) {
          this.init(false);
        }
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        // Draw capsule / rounded dash
        const r = this.thickness / 2;
        const l = this.length;
        ctx.roundRect(-l / 2, -r, l, this.thickness, r);

        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 4;
        ctx.fill();

        ctx.restore();
      }
    }

    // Populate initial particle swarm
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleMouseLeave = () => {
      mouse.active = false;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Continuous 60fps infinite animation loop (Never stops!)
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
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
