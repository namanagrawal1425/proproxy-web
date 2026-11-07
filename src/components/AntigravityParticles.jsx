import React, { useEffect, useRef } from 'react';

/**
 * AntigravityParticles (360° Omnidirectional Circular Aura)
 * - Large generous radius (~360px) centered around the mouse cursor
 * - Particles emanate, radiate, and travel in ALL 360° directions outwards
 * - Capsules/dashes orient dynamically along their radial trajectory
 * - Circular halo formation with clean inner cursor core & smooth perimeter fade
 * - Zero particles outside the circle (rest of the page stays 100% clean)
 * - Chromatic spectrum: Blues on top, Violets on flanks, Roses below
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

    // Large circular radius around the cursor
    const OUTER_RADIUS = 360;
    const INNER_RADIUS = 35; // Keeps the exact pointer cursor clean

    // Mouse Tracking with smooth interpolated center
    const mouse = {
      x: -1000,
      y: -1000,
      prevX: -1000,
      prevY: -1000,
      vx: 0,
      vy: 0,
      isHovering: false,
    };

    // Chromatic Palette (Blues -> Violets -> Roses)
    const PALETTE = [
      '#2563EB', // Sapphire Blue
      '#3B82F6', // Electric Blue
      '#4F46E5', // Indigo
      '#7C3AED', // Deep Violet
      '#8B5CF6', // Vivid Purple
      '#A855F7', // Magenta Purple
      '#E11D48', // Ruby Rose
      '#F43F5E', // Coral Rose
    ];

    const getColorByAngle = (theta) => {
      // Normalize angle theta [-PI, PI] to vertical positioning:
      // -PI/2 (top) -> Blue, 0 / PI (sides) -> Violet, +PI/2 (bottom) -> Rose
      const sinVal = Math.sin(theta); // -1 (top) to +1 (bottom)
      if (sinVal < -0.2) {
        return PALETTE[Math.floor(Math.random() * 3)]; // Blues
      } else if (sinVal < 0.35) {
        return PALETTE[3 + Math.floor(Math.random() * 3)]; // Violets
      } else {
        return PALETTE[6 + Math.floor(Math.random() * 2)]; // Roses
      }
    };

    // 72 particles distributed evenly in a 360-degree circular formation
    const PARTICLE_COUNT = 72;
    const particles = [];

    class RadialParticle {
      constructor() {
        this.reset(true);
      }

      reset(randomDist = false) {
        // Emit in a random 360-degree direction
        this.theta = Math.random() * Math.PI * 2;
        
        // Distance from cursor center
        this.dist = randomDist
          ? INNER_RADIUS + Math.random() * (OUTER_RADIUS - INNER_RADIUS)
          : INNER_RADIUS + Math.random() * 45;

        this.x = mouse.x + Math.cos(this.theta) * this.dist;
        this.y = mouse.y + Math.sin(this.theta) * this.dist;

        this.color = getColorByAngle(this.theta);

        // Radial outward velocity in all 360 degrees
        this.radialSpeed = 0.6 + Math.random() * 1.4;
        this.swirlSpeed = (Math.random() - 0.5) * 0.008; // subtle organic swirl

        // Dimensions: crisp elongated dashes & micro-specks
        const isDot = Math.random() < 0.22;
        if (isDot) {
          this.length = 2.5 + Math.random() * 1.5;
          this.thickness = 2;
        } else {
          this.length = 5.5 + Math.random() * 6;
          this.thickness = 1.8 + Math.random() * 0.8;
        }

        this.baseAlpha = 0.65 + Math.random() * 0.35;
        this.angle = this.theta; // align along radial trajectory
      }

      update() {
        if (!mouse.isHovering) return;

        // Move outward along radial angle
        this.dist += this.radialSpeed;
        this.theta += this.swirlSpeed;

        // Follow mouse center smoothly
        const targetX = mouse.x + Math.cos(this.theta) * this.dist;
        const targetY = mouse.y + Math.sin(this.theta) * this.dist;

        // Add slight drag from mouse movement
        this.x = targetX + mouse.vx * 0.06;
        this.y = targetY + mouse.vy * 0.06;

        // Align particle dash direction with its outward trajectory
        this.angle = this.theta;

        // If it expands past outer boundary, recycle back near center
        if (this.dist >= OUTER_RADIUS) {
          this.reset(false);
        }
      }

      draw() {
        if (!mouse.isHovering) return;

        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const currentDist = Math.hypot(dx, dy);

        if (currentDist > OUTER_RADIUS || currentDist < INNER_RADIUS - 5) return;

        // Smooth radial edge falloff (fades to 0 at perimeter)
        const edgeFade = Math.sin(
          ((currentDist - INNER_RADIUS) / (OUTER_RADIUS - INNER_RADIUS)) * Math.PI
        );
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

    // Populate particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(new RadialParticle());
    }

    // Event Listeners
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
        // Friction on mouse velocity
        mouse.vx *= 0.85;
        mouse.vy *= 0.85;

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
