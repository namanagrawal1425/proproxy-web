import React, { useEffect, useRef } from 'react';

/**
 * AntigravityParticles
 * Pixel-accurate recreation of the premium Google Antigravity background:
 * - Chromatic vertical spectrum: Electric Sapphire Blues at top -> Violets/Indigos in mid -> Ruby Roses/Magentas at bottom
 * - Sparse, ultra-clean density with breathing room
 * - Aerodynamic diagonal capsule dash geometry (~-45° tilt) with micro-specks for depth
 * - Excludes central typography zone (particles frame the sides & edges)
 * - Fluid mouse-hover repulsion physics with spring recovery
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

    // Mouse Tracking State
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 160,
      isHovering: false,
    };

    // Sophisticated Color Interpolation based on vertical screen Y
    // Matches the exact gradient seen in the reference photo:
    // Top (Blue) -> Mid (Violet/Purple) -> Bottom (Rose/Magenta)
    const getColorForY = (y) => {
      const t = Math.max(0, Math.min(1, y / height));
      if (t < 0.40) {
        // Upper third: Royal Sapphire & Electric Blues
        const blues = ['#2563EB', '#3B82F6', '#1D4ED8', '#4F46E5', '#38BDF8'];
        return blues[Math.floor(Math.random() * blues.length)];
      } else if (t < 0.72) {
        // Middle third: Elegant Violets, Indigos & Magentas
        const purples = ['#7C3AED', '#8B5CF6', '#9333EA', '#A855F7', '#C084FC'];
        return purples[Math.floor(Math.random() * purples.length)];
      } else {
        // Lower third: Deep Rose, Crimson & Coral Magentas
        const roses = ['#E11D48', '#BE123C', '#F43F5E', '#FB7185', '#E11D48'];
        return roses[Math.floor(Math.random() * roses.length)];
      }
    };

    // Sparse, premium particle count (60-95 particles total)
    const COUNT = Math.min(Math.max(Math.floor((width * height) / 14000), 55), 90);
    const particles = [];

    class Particle {
      constructor(randomY = true) {
        this.init(randomY);
      }

      init(randomY = false) {
        // Bias distribution toward left & right flanks (framing the page, leaving text clear)
        const isLeft = Math.random() < 0.5;
        if (isLeft) {
          this.x = Math.random() * (width * 0.38);
        } else {
          this.x = width - Math.random() * (width * 0.38);
        }

        this.y = randomY ? Math.random() * height : height + 15 + Math.random() * 30;

        // Color dynamically tied to vertical level
        this.color = getColorForY(this.y);

        // Slow, serene upward drift
        this.baseVx = 0.08 + Math.random() * 0.18;
        this.baseVy = -(0.25 + Math.random() * 0.45);

        this.vx = this.baseVx;
        this.vy = this.baseVy;

        // Size: precise slim capsules & micro specks
        const isDot = Math.random() < 0.22;
        if (isDot) {
          this.length = 2.5 + Math.random() * 1.5;
          this.thickness = 2;
        } else {
          this.length = 5 + Math.random() * 5.5;
          this.thickness = 1.8 + Math.random() * 0.8;
        }

        // Aerodynamic diagonal angle matching the reference (~-45° upward-forward tilt)
        this.targetAngle = -0.75 + (Math.random() - 0.5) * 0.35;
        this.angle = this.targetAngle;
        this.angularVelocity = 0;

        // Opacity
        this.opacity = 0.55 + Math.random() * 0.4;
      }

      update() {
        // Dynamic color transition as particle moves vertically
        this.color = getColorForY(this.y);

        // --- MOUSE HOVER REPULSION PHYSICS ---
        if (mouse.isHovering) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 1) {
            const normal = 1 - dist / mouse.radius;
            // Smooth quadratic repulsion kick
            const force = Math.pow(normal, 1.8) * 4.5;
            const angleFromMouse = Math.atan2(dy, dx);

            this.vx += Math.cos(angleFromMouse) * force;
            this.vy += Math.sin(angleFromMouse) * force;

            // Tilt particle dynamically away from mouse impact
            this.angle += (angleFromMouse - this.angle) * 0.12;
          }
        }

        // Central text exclusion: gently nudge away from middle reading column
        const centerX = width / 2;
        const centerY = height * 0.40;
        const dxCenter = this.x - centerX;
        const dyCenter = (this.y - centerY) * 1.4;
        const distCenter = Math.hypot(dxCenter, dyCenter);
        if (distCenter < 240) {
          const push = (1 - distCenter / 240) * 0.4;
          this.vx += (dxCenter > 0 ? push : -push);
        }

        // Spring friction: smoothly return to base calm velocity
        this.vx = this.vx * 0.94 + this.baseVx * 0.06;
        this.vy = this.vy * 0.94 + this.baseVy * 0.06;

        this.x += this.vx;
        this.y += this.vy;

        // Return angle back to aerodynamic diagonal orientation
        this.angle += (this.targetAngle - this.angle) * 0.05;

        // Wrap around viewport edges
        if (this.y < -25) {
          this.init(false);
        }
        if (this.x < -25) this.x = width + 15;
        if (this.x > width + 25) this.x = -15;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        const r = this.thickness / 2;
        const l = this.length;
        ctx.roundRect(-l / 2, -r, l, this.thickness, r);

        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.opacity;
        ctx.fill();

        ctx.restore();
      }
    }

    // Populate initial particle layout
    for (let i = 0; i < COUNT; i++) {
      particles.push(new Particle(true));
    }

    // Event Listeners
    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
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

      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
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
