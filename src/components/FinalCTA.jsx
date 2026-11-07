import React from 'react';
import { motion } from 'framer-motion';
import { Download, Play, ShieldCheck, Zap } from 'lucide-react';

export default function FinalCTA({ onDownloadClick, onGuideClick }) {
  return (
    <section className="relative py-32 md:py-44 bg-white border-t border-neutral-200/60 overflow-hidden text-center">
      
      {/* Subtle colorful liftoff ambient glow behind */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-gradient-to-tr from-blue-100/40 via-purple-100/30 to-amber-100/30 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10"
      >
        
        {/* Visual Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-xs font-mono text-blue-900 mb-8 shadow-2xs hover:scale-105 transition-transform cursor-default">
          <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
          <Zap className="w-3.5 h-3.5 text-blue-600" />
          <span className="font-semibold">COMPLETE NETWORK FREEDOM</span>
        </div>

        {/* Closing Main Headline */}
        <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 mb-6 leading-[1.12]">
          Ready to Automate <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
            Your Network Proxy?
          </span>
        </h2>

        <p className="text-base sm:text-xl text-neutral-600 max-w-2xl mx-auto mb-12 leading-relaxed">
          Say goodbye to manual proxy toggling. Get the standalone ProProxy executable for Windows today.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto mb-12">
          <button
            onClick={onDownloadClick}
            className="w-full sm:w-auto px-9 py-4 rounded-full font-medium text-base text-white bg-neutral-900 hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-md hover:shadow-2xl flex items-center justify-center gap-3 cursor-pointer group"
          >
            <Download className="w-4 h-4 animate-bounce" />
            <span>Download ProProxy</span>
          </button>

          <button
            onClick={onGuideClick}
            className="w-full sm:w-auto px-7 py-4 rounded-full font-medium text-sm text-neutral-800 bg-white hover:bg-neutral-50 hover:scale-105 border border-neutral-300 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs"
          >
            <Play className="w-3.5 h-3.5 text-neutral-800 fill-neutral-800" />
            <span>Watch Video Guide</span>
          </button>
        </div>

        {/* Verification badges */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs font-mono text-neutral-500">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> 100% Standalone .exe
          </span>
          <span>•</span>
          <span>Zero Telemetry Bloat</span>
          <span>•</span>
          <span>Native Windows WinINet</span>
        </div>

      </motion.div>
    </section>
  );
}
