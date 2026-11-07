import React, { useEffect, useRef } from 'react';

/**
 * AntigravityParticles
 * Exact recreation of Google Antigravity (antigravity.google) particle field:
 * - Multi-colored oriented pill/dash capsules (Google Blue, Red, Yellow, Green, Purple, Orange)
 * - Calms to near-stillness when idle (no spammy confetti)
 * - ACTIVATES ON MOUSE HOVER & CURSOR MOVEMENT:
 *   - Strong dynamic repulsion & momentum transfer on mouse pass
 *   - Spawns elegant liftoff particle trail following cursor movement
 *   - Fluid spring-like physics with friction damping and angle rotation
 *   - Central hero readability exclusion
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

    // Exact Google Antigravity Brand Palette
    const PALETTE = [
      '#4285F4', // Blue
      '#EA4335', // Red
      '#FBBC05', // Yellow
      '#34A853', // Green
      '#9333EA', // Purple
      '#F97316', // Orange
    ];

    // Mouse Tracking with Velocity & Activity State
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      speed: 0,
      radius: 170,
      isHovering: false,
      lastMoveTime: 0,
    };

    // Ambient floating particles count
    const BASE_PARTICLE_COUNT = Math.min(Math.max(Math.floor((width * height) / 8000), 75), 140);
    const particles = [];
    const trailParticles = [];

    class Particle {
      constructor(isAmbient = true) {
        this.isAmbient = isAmbient;
        this.init(true);
      }

      init(randomInit = false) {
        this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        
        if (randomInit) {
          this.x = Math.random() * width;
          this.y = Math.random() * height;
        } else {
          // Respawn from edges
          if (Math.random() > 0.5) {
            this.x = Math.random() * width;
            this.y = height + 15;
          } else {
            this.x = Math.random() > 0.5 ? -15 : width + 15;
            this.y = Math.random() * height;
          }
        }

        // Ambient idle velocity: very slow, gentle drift (calm background)
        this.baseVx = (Math.random() - 0.5) * 0.25;
        this.baseVy = -0.15 - Math.random() * 0.25;
        
        // Active dynamic impulse velocities (imparted by mouse hover)
        this.vx = this.baseVx;
        this.vy = this.baseVy;

        // Pill / Capsule dimensions matching antigravity.google
        this.length = 6 + Math.random() * 7;
        this.thickness = 2.2 + Math.random() * 1.2;
        this.opacity = 0.35 + Math.random() * 0.45;
        this.baseOpacity = this.opacity;

        // Orientation
        this.angle = Math.atan2(this.vy, this.vx);
        this.rotSpeed = (Math.random() - 0.5) * 0.015;
        this.friction = 0.94;
      }

      update() {
        // --- 1. MOUSE HOVER INTERACTION (The core physics) ---
        if (mouse.isHovering) {
          const dx = this.x - mouse.x;
          const dy = this.y - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < mouse.radius && dist > 1) {
            const normalDist = 1 - dist / mouse.radius;
            // Strong kinetic kick combining proximity + mouse stroke speed
            const kickForce = normalDist * (3.8 + Math.min(mouse.speed * 0.22, 6));
            const angleFromMouse = Math.atan2(dy, dx);

            // Push particle outward away from cursor
            this.vx += Math.cos(angleFromMouse) * kickForce;
            this.vy += Math.sin(angleFromMouse) * kickForce;

            // Also add directional drag along mouse movement vector
            this.vx += mouse.vx * 0.12 * normalDist;
            this.vy += mouse.vy * 0.12 * normalDist;

            // Align rotation with velocity
            this.angle = Math.atan2(this.vy, this.vx);
            this.rotSpeed = (Math.random() - 0.5) * 0.15;
          }
        }

        // --- 2. Gentle Central Text Area Protection (Keep content legible) ---
        const cx = width / 2;
        const cy = height * 0.38;
        const distFromCenter = Math.hypot(this.x - cx, (this.y - cy) * 1.5);
        if (distFromCenter < 200) {
          const repulseAngle = Math.atan2(this.y - cy, this.x - cx);
          this.vx += Math.cos(repulseAngle) * 0.3;
          this.vy += Math.sin(repulseAngle) * 0.3;
        }

        // --- 3. Friction Damping back to calm ambient drift ---
        this.vx = this.vx * this.friction + this.baseVx * (1 - this.friction);
        this.vy = this.vy * this.friction + this.baseVy * (1 - this.friction);

        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.rotSpeed;
        this.rotSpeed *= 0.98;

        // --- 4. Boundary Wrap ---
        if (this.y < -30) {
          this.y = height + 20;
          this.x = Math.random() * width;
        } else if (this.y > height + 30) {
          this.y = -20;
        }
        if (this.x < -30) this.x = width + 20;
        else if (this.x > width + 30) this.x = -20;
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

    // Dynamic Trail Particles spawned strictly when mouse moves
    class TrailParticle {
      constructor(x, y, vx, vy) {
        this.x = x + (Math.random() - 0.5) * 16;
        this.y = y + (Math.random() - 0.5) * 16;
        this.color = PALETTE[Math.floor(Math.random() * PALETTE.length)];
        
        // Spawn with kinetic velocity bursting outward and floating up
        const spread = (Math.random() - 0.5) * 2.5;
        this.vx = vx * 0.25 + spread;
        this.vy = vy * 0.25 - (1.2 + Math.random() * 2.2);

        this.length = 5 + Math.random() * 6;
        this.thickness = 2 + Math.random() * 1.2;
        this.angle = Math.atan2(this.vy, this.vx);
        this.rotSpeed = (Math.random() - 0.5) * 0.12;

        this.life = 1.0;
        this.decay = 0.016 + Math.random() * 0.018; // Fades out in ~1-1.5s
      }

      update() {
        this.vx *= 0.95;
        this.vy *= 0.96;
        this.x += this.vx;
        this.y += this.vy;
        this.angle += this.rotSpeed;
        this.life -= this.decay;
      }

      draw() {
        if (this.life <= 0) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.beginPath();
        const r = this.thickness / 2;
        const l = this.length;
        ctx.roundRect(-l / 2, -r, l, this.thickness, r);

        ctx.fillStyle = this.color;
        ctx.globalAlpha = Math.max(0, this.life * 0.85);
        ctx.fill();

        ctx.restore();
      }
    }

    // Initialize calm ambient particles
    for (let i = 0; i < BASE_PARTICLE_COUNT; i++) {
      particles.push(new Particle(true));
    }

    // Mouse Event Listeners
    let lastSpawn = 0;
    const handleMouseMove = (e) => {
      const now = performance.now();
      const dx = e.clientX - mouse.prevX;
      const dy = e.clientY - mouse.prevY;
      const speed = Math.hypot(dx, dy);

      mouse.vx = dx;
      mouse.vy = dy;
      mouse.speed = speed;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.prevX = e.clientX;
      mouse.prevY = e.clientY;
      mouse.isHovering = true;
      mouse.lastMoveTime = now;

      // Spawn liftoff trail particles only when cursor moves with noticeable velocity
      if (speed > 2.5 && now - lastSpawn > 28 && trailParticles.length < 60) {
        lastSpawn = now;
        const spawnCount = speed > 15 ? 2 : 1;
        for (let s = 0; s < spawnCount; s++) {
          trailParticles.push(new TrailParticle(mouse.x, mouse.y, dx, dy));
        }
      }
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

    // Main 60fps render loop
    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Check if mouse has stopped moving for > 120ms
      if (performance.now() - mouse.lastMoveTime > 120) {
        mouse.speed *= 0.85;
        mouse.vx *= 0.85;
        mouse.vy *= 0.85;
      }

      // Update & draw ambient particles
      for (let i = 0; i < particles.length; i++) {
        particles[i].update();
        particles[i].draw();
      }

      // Update & draw dynamic mouse trail particles
      for (let i = trailParticles.length - 1; i >= 0; i--) {
        const p = trailParticles[i];
        p.update();
        p.draw();
        if (p.life <= 0) {
          trailParticles.splice(i, 1);
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
