import React, { useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  Download, 
  Play, 
  Terminal, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  Activity, 
  Globe2, 
  Cpu, 
  Lock,
  Maximize2,
  Sparkles,
  Check,
  Wifi,
  Sliders
} from 'lucide-react';
import TypewriterText from './TypewriterText';
import { PROPROXY_CONFIG } from '../config';

export default function HeroSection({ onDownloadClick, onGuideClick }) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [activeBadge, setActiveBadge] = useState(0);

  const heroBadges = [
    { id: 'all', label: 'All Features', icon: Check },
    { id: 'ssid', label: 'Auto SSID Detection', icon: Wifi },
    { id: 'registry', label: 'WinINet Registry Sync', icon: ShieldCheck },
    { id: 'tray', label: 'System Tray Daemon', icon: Sliders },
    { id: 'portable', label: '100% Free & Portable', icon: Sparkles },
  ];

  // 3D Tilt Physics for real app screenshot
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-350, 350], [6, -6]), { stiffness: 140, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [-350, 350], [-6, 6]), { stiffness: 140, damping: 22 });

  function handleMouseMove(e) {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  // Phrases that type out live ("likhte hue aaye")
  const heroPhrases = [
    "Experience liftoff with the next-gen proxy platform",
    "Your Connection. Your Control. Total Autonomy.",
    "Smart Proxy Optimizer (0-KB Speed & Security Engine)",
    "Campus & Enterprise automated proxy failover",
  ];

  return (
    <section id="hero" className="relative min-h-[95vh] pt-32 pb-24 md:pt-38 md:pb-36 flex flex-col justify-center items-center overflow-hidden">
      
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col items-center text-center">
        
        {/* ProProxy Logo & Brand Name */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 mb-8"
        >
          <img src="/logo.png" alt="ProProxy Logo" className="w-9 h-9 rounded-xl object-contain shadow-xs" />
          <span className="font-display font-medium text-2xl sm:text-3xl tracking-tight text-neutral-900">
            ProProxy
          </span>
        </motion.div>

        {/* The Animated Typewriter Headline ("likhte hue aaye") */}
        <div className="min-h-[140px] sm:min-h-[175px] lg:min-h-[210px] flex items-center justify-center max-w-4xl mx-auto mb-8">
          <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl font-normal tracking-tight leading-[1.12] text-neutral-900 select-none">
            <TypewriterText phrases={heroPhrases} typingSpeed={55} pauseDuration={3000} />
          </h1>
        </div>

        {/* Clean Center Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center gap-4 mb-16"
        >
          <button
            onClick={onDownloadClick}
            className="px-9 py-3.5 rounded-full text-base font-normal text-white bg-neutral-900 hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md cursor-pointer flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download</span>
          </button>

          <button
            onClick={onGuideClick}
            className="px-6 py-3.5 rounded-full text-sm font-medium text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-all cursor-pointer flex items-center gap-2"
          >
            <Play className="w-3.5 h-3.5 text-neutral-700 fill-neutral-700" />
            <span>Watch Guide</span>
          </button>
        </motion.div>

        {/* Audience Hook: Live Benefit Pills (matching reference design) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-2 sm:gap-2.5 mb-16"
        >
          {heroBadges.map((badge, idx) => {
            const Icon = badge.icon;
            const isActive = activeBadge === idx;
            return (
              <button
                key={badge.id}
                onClick={() => setActiveBadge(idx)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-sans text-xs sm:text-[13px] font-medium transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-neutral-950 text-white border border-neutral-950 shadow-xs'
                    : 'bg-white text-neutral-700 hover:text-neutral-950 border border-neutral-200/90 hover:border-neutral-300 hover:bg-neutral-50/90 shadow-[0_1px_2px_rgba(0,0,0,0.03)]'
                }`}
              >
                {isActive ? (
                  <Check className="w-3.5 h-3.5 text-white stroke-[2.5]" />
                ) : (
                  <Icon className="w-3.5 h-3.5 text-neutral-500" />
                )}
                <span>{badge.label}</span>
              </button>
            );
          })}
        </motion.div>

        {/* Actual ProProxy Application UI with 3D Tilt & Floating Shimmer Animation */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full max-w-5xl relative cursor-default text-left group"
        >
          {/* Ambient Glow Frame */}
          <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-r from-blue-500/15 via-indigo-500/10 to-purple-500/15 blur-2xl opacity-70 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

          {/* Window Chrome Container */}
          <div className="relative rounded-2xl bg-neutral-950 border border-neutral-800/90 shadow-[0_25px_80px_-15px_rgba(0,0,0,0.18),0_10px_30px_-10px_rgba(0,0,0,0.12)] overflow-hidden ring-1 ring-black/5">
            
            {/* Window Header */}
            <div className="flex items-center justify-between px-5 py-3.5 bg-neutral-900/90 border-b border-neutral-800/80 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="text-xs font-mono text-neutral-400 ml-3 flex items-center gap-2">
                  <span>ProProxy v2.0.0 — Smart Proxy Optimizer</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping inline-block" />
                </span>
              </div>
              <div className="flex items-center gap-3 text-xs font-mono">
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> SERVICE ACTIVE
                </span>
                <span className="text-neutral-600">|</span>
                <span className="text-cyan-400 font-semibold">0-KB ENGINE</span>
              </div>
            </div>

            {/* Actual Application Screenshot Image */}
            <div className="relative overflow-hidden bg-neutral-950">
              <img
                src="/proproxy-real-app.png"
                alt="ProProxy v2.0.0 Real Application Interface"
                className="w-full h-auto object-cover select-none transition-transform duration-500 group-hover:scale-[1.01]"
              />

              {/* Subtle Scanning Beam Animation running across the interface */}
              <motion.div
                initial={{ top: '-10%' }}
                animate={{ top: '110%' }}
                transition={{ repeat: Infinity, duration: 4.5, ease: 'linear' }}
                className="absolute left-0 right-0 h-28 bg-gradient-to-b from-transparent via-cyan-400/10 to-transparent pointer-events-none opacity-60"
              />
            </div>

            {/* Bottom Status Bar */}
            <div className="px-5 py-3 bg-neutral-900/95 border-t border-neutral-800 flex flex-wrap items-center justify-between text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5 text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-node-pulse" />
                  Active Node: MNNIT Main (172.31.100.27:3128)
                </span>
                <span className="hidden sm:inline text-neutral-600">•</span>
                <span className="hidden sm:inline text-neutral-300">Campus Secure (97% Security Tier)</span>
              </div>
              <div className="text-cyan-400 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5" />
                <span>Zero Latency Overhead</span>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </section>
  );
}
