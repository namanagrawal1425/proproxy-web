import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, ShieldCheck, Code2, MessageCircle } from 'lucide-react';
import { PROPROXY_CONFIG } from '../config';

export default function Footer({ onDownloadClick }) {
  const currentYear = new Date().getFullYear();
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const letters = ["P", "r", "o", "P", "r", "o", "x", "y"];

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <footer className="bg-white border-t border-neutral-200 text-neutral-600 text-xs font-sans pt-16 pb-12 overflow-hidden">
      {/* Top Grid & Navigation inside bounded container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Grid */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 pb-16 border-b border-neutral-200/80">
          
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <img src="/logo.png" alt="ProProxy Logo" className="w-7 h-7 rounded-lg object-contain" />
              <span className="font-display font-medium text-lg text-neutral-900 tracking-tight">
                ProProxy
              </span>
              <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-neutral-100 text-neutral-700 border border-neutral-200 font-medium">
                {PROPROXY_CONFIG.brand.releaseVersion}
              </span>
            </div>

            <p className="text-neutral-500 text-xs leading-relaxed max-w-sm">
              Smart proxy optimizer and automated network switcher for Windows. Fast, silent, and battery-friendly.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={PROPROXY_CONFIG.community.github}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-black transition-colors"
                aria-label="GitHub Repository"
              >
                <Code2 className="w-4 h-4 text-neutral-800" />
              </a>
              <a
                href={PROPROXY_CONFIG.community.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-neutral-100 hover:bg-neutral-200 border border-neutral-200 flex items-center justify-center text-neutral-700 hover:text-black transition-colors"
                aria-label="Discord Community"
              >
                <MessageCircle className="w-4 h-4 text-neutral-800" />
              </a>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div>
            <div className="text-neutral-900 font-medium mb-4 font-display text-sm tracking-wide">
              Product
            </div>
            <ul className="space-y-2.5">
              <li><a href="#hero" className="hover:text-black transition-colors">Overview</a></li>
              <li><a href="#features" className="hover:text-black transition-colors">Core Features</a></li>
              <li><a href="#how-it-works" className="hover:text-black transition-colors">How It Works</a></li>
              <li><button onClick={onDownloadClick} className="hover:text-black transition-colors cursor-pointer text-left">Downloads</button></li>
            </ul>
          </div>

          {/* Links Column 2: Resources & Guides */}
          <div>
            <div className="text-neutral-900 font-medium mb-4 font-display text-sm tracking-wide">
              Resources
            </div>
            <ul className="space-y-2.5">
              <li><a href="#tutorial" className="hover:text-black transition-colors">Video Tutorial</a></li>
              <li><a href={PROPROXY_CONFIG.tutorial.youtubeWatchUrl} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors flex items-center gap-1">Watch on YouTube <ExternalLink className="w-2.5 h-2.5" /></a></li>
              <li><a href={PROPROXY_CONFIG.community.github} target="_blank" rel="noopener noreferrer" className="hover:text-black transition-colors">GitHub Repository</a></li>
              <li><a href="#faq" className="hover:text-black transition-colors">FAQ & Help</a></li>
            </ul>
          </div>

          {/* Links Column 3: Platform Packages */}
          <div>
            <div className="text-neutral-900 font-medium mb-4 font-display text-sm tracking-wide">
              Platforms
            </div>
            <ul className="space-y-2.5">
              <li><a href="#download" onClick={onDownloadClick} className="hover:text-black transition-colors">Windows x64 (.exe)</a></li>
              <li className="text-neutral-400">macOS (Coming Soon)</li>
              <li className="text-neutral-400">Linux (Coming Soon)</li>
            </ul>
          </div>

        </div>
      </div>

      {/* Full-bleed Giant Creative Interactive Brand Typography Wordmark (Edge to Edge, No Box Border) */}
      <div 
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative w-full pt-16 sm:pt-24 pb-12 sm:pb-16 overflow-hidden flex flex-col items-center justify-center select-none group cursor-pointer"
      >
        {/* Dynamic Reactive Cursor Backlight Glow (Unbounded Screen Wide) */}
        <div 
          className="absolute w-[600px] h-[300px] rounded-full bg-gradient-to-r from-blue-400/25 via-indigo-500/20 to-emerald-400/20 blur-3xl pointer-events-none transition-opacity duration-500"
          style={{
            left: mousePos.x - 300,
            top: mousePos.y - 150,
            opacity: isHovered ? 1 : 0.3,
          }}
        />

        {/* Top Tech Status Ribbon */}
        <div className="flex items-center gap-3 text-[11px] font-sans font-semibold tracking-widest uppercase text-neutral-400 group-hover:text-blue-600 transition-colors mb-3">
          <span className="w-12 h-[1px] bg-neutral-200 group-hover:bg-blue-300 transition-colors" />
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Autonomous Proxy Platform
          </span>
          <span className="w-12 h-[1px] bg-neutral-200 group-hover:bg-blue-300 transition-colors" />
        </div>

        {/* Giant Full-Width Edge-to-Edge Typography Wordmark */}
        <div className="flex items-center justify-center tracking-[-0.04em] font-display font-bold text-[18vw] leading-[0.82] w-screen px-2 text-center relative z-10">
          {letters.map((char, index) => {
            const isSecondWord = index >= 3;
            return (
              <motion.span
                key={index}
                whileHover={{ 
                  y: -22, 
                  scale: 1.12, 
                  rotate: (index % 2 === 0 ? -4 : 4),
                  transition: { type: "spring", stiffness: 350, damping: 14 }
                }}
                className={`inline-block transition-all duration-300 ${
                  isSecondWord 
                    ? 'bg-gradient-to-b from-neutral-950 via-neutral-800 to-neutral-600 group-hover:from-blue-600 group-hover:via-indigo-600 group-hover:to-violet-600 bg-clip-text text-transparent drop-shadow-sm'
                    : 'text-neutral-950 group-hover:text-neutral-900'
                }`}
              >
                {char}
              </motion.span>
            );
          })}
        </div>

        {/* Bottom Telemetry Ribbon */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-xs font-sans text-neutral-400 mt-4 group-hover:text-neutral-600 transition-colors px-4">
          <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-neutral-100 group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 border border-neutral-200/80 transition-all font-medium">
            v2.4 Core Engine
          </span>
          <span>•</span>
          <span className="text-[11px] font-medium tracking-wide">Zero Overhead Architecture</span>
          <span>•</span>
          <span className="text-[11px] font-medium tracking-wide">Instant WinINet Sync</span>
        </div>
      </div>

      {/* Bottom Bar matching Google footer bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-8 border-t border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500 font-sans">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="ProProxy Logo" className="w-6 h-6 rounded-md object-contain" />
            <span className="font-display font-medium text-sm text-neutral-900">ProProxy</span>
            <span className="text-neutral-300">•</span>
            <span>&copy; {currentYear} {PROPROXY_CONFIG.brand.name}. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-neutral-500">
            <a href="#hero" className="hover:text-neutral-900 transition-colors">About ProProxy</a>
            <a href={PROPROXY_CONFIG.community.github} target="_blank" rel="noopener noreferrer" className="hover:text-neutral-900 transition-colors">GitHub</a>
            <a href="#reviews" className="hover:text-neutral-900 transition-colors">Reviews</a>
            <a href="#faq" className="hover:text-neutral-900 transition-colors">Privacy & Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
