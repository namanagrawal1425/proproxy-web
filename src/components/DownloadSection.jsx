import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Download, 
  Monitor, 
  Apple, 
  Terminal, 
  Check, 
  Copy, 
  ShieldCheck, 
  FileText,
  ExternalLink
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { PROPROXY_CONFIG } from '../config';

export default function DownloadSection() {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const { downloads, brand } = PROPROXY_CONFIG;

  const handleDownloadTrigger = (platformKey, url, fileName) => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#4285F4', '#34A853', '#FBBC05', '#EA4335'],
      });
    } catch (e) {
      // Confetti fallback
    }

    const link = document.createElement('a');
    link.href = url;
    if (fileName) {
      link.download = fileName;
    }
    if (url.startsWith('http')) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const copyCliCommand = () => {
    navigator.clipboard.writeText(downloads.cli.command);
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2500);
  };

  return (
    <section id="download" className="relative py-28 md:py-36 bg-white border-t border-neutral-200/60 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-xs font-mono text-blue-900 mb-5 shadow-2xs hover:scale-105 transition-transform cursor-default">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <Download className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold">OFFICIAL DISTRIBUTION</span>
          </div>
          <h2 className="font-display text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-neutral-950 mb-5 leading-[1.12]">
            Ready for Lift-Off? <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Get ProProxy Today.
            </span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Download the signed standalone Windows executable. 100% free, private, and zero administrative setup.
          </p>
        </motion.div>

        {/* Primary Platform Download Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Windows Package (Active & Prominent) */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25, ease: 'easeOut' } }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-3xl bg-white border-2 border-neutral-900 flex flex-col justify-between group shadow-xl hover:shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] relative overflow-hidden transition-all duration-300"
          >
            <div className="absolute top-0 right-0 bg-neutral-900 text-white text-[10px] font-mono font-medium px-3.5 py-1 rounded-bl-xl tracking-wider uppercase">
              Recommended
            </div>

            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-neutral-100 group-hover:bg-neutral-950 border border-neutral-200 flex items-center justify-center transition-all duration-300 shadow-2xs group-hover:scale-105">
                  <Monitor className="w-7 h-7 text-neutral-900 group-hover:text-white transition-colors" />
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold text-neutral-900 mb-1 group-hover:text-black">
                {downloads.windows.platform}
              </h3>
              <p className="text-xs text-neutral-600 mb-5">
                {downloads.windows.subtext}
              </p>

              <div className="space-y-2 text-xs font-mono text-neutral-700 mb-8 bg-neutral-50 p-4 rounded-2xl border border-neutral-200/80">
                <div className="flex justify-between">
                  <span className="text-neutral-400">File:</span>
                  <span className="text-neutral-900 font-semibold">{downloads.windows.fileName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Size:</span>
                  <span className="text-blue-600 font-semibold">{downloads.windows.fileSize}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Format:</span>
                  <span className="text-emerald-600 font-semibold">Standalone Portable .exe</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownloadTrigger('windows', downloads.windows.url, downloads.windows.fileName)}
              className="w-full py-3.5 rounded-full font-medium text-sm text-white bg-neutral-900 hover:bg-black hover:scale-102 active:scale-98 transition-all shadow-md hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <Download className="w-4 h-4 animate-bounce" />
              <span>Download for Windows</span>
            </button>
          </motion.div>

          {/* macOS Package - Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-3xl bg-white/70 border border-neutral-200 flex flex-col justify-between group shadow-xs opacity-75 hover:opacity-100 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                  <Apple className="w-7 h-7 text-neutral-600" />
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Coming Soon
                </span>
              </div>

              <h3 className="font-display text-2xl font-medium text-neutral-900 mb-1">
                macOS
              </h3>
              <p className="text-xs text-neutral-600 mb-5">
                Apple Silicon (M1/M2/M3/M4) & Intel 64-bit
              </p>

              <div className="space-y-2 text-xs font-mono text-neutral-500 mb-8 bg-neutral-50/60 p-4 rounded-2xl border border-neutral-200/60">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Status:</span>
                  <span className="text-amber-600 font-medium">Under Active Development</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Target:</span>
                  <span className="text-neutral-700">Universal DMG</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Release:</span>
                  <span className="text-neutral-500">Upcoming Update</span>
                </div>
              </div>
            </div>

            <button
              disabled
              className="w-full py-3.5 rounded-full font-medium text-xs text-neutral-400 bg-neutral-100 border border-neutral-200 cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>macOS Build Coming Soon</span>
            </button>
          </motion.div>

          {/* Linux Package - Coming Soon */}
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="p-8 rounded-3xl bg-white/70 border border-neutral-200 flex flex-col justify-between group shadow-xs opacity-75 hover:opacity-100 transition-all duration-300"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-14 h-14 rounded-2xl bg-neutral-100 border border-neutral-200 flex items-center justify-center">
                  <Terminal className="w-7 h-7 text-neutral-600" />
                </div>
                <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 font-medium tracking-wide flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                  Coming Soon
                </span>
              </div>

              <h3 className="font-display text-2xl font-bold text-neutral-900 mb-1">
                Linux
              </h3>
              <p className="text-xs text-neutral-600 mb-5">
                AppImage / Tarball / Deb
              </p>

              <div className="space-y-2 text-xs font-mono text-neutral-500 mb-8 bg-neutral-50/60 p-4 rounded-2xl border border-neutral-200/60">
                <div className="flex justify-between">
                  <span className="text-neutral-400">Status:</span>
                  <span className="text-amber-600 font-medium">Under Active Development</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Target:</span>
                  <span className="text-neutral-700">AppImage & CLI</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Release:</span>
                  <span className="text-neutral-500">Upcoming Update</span>
                </div>
              </div>
            </div>

            <button
              disabled
              className="w-full py-3.5 rounded-full font-medium text-xs text-neutral-400 bg-neutral-100 border border-neutral-200 cursor-not-allowed flex items-center justify-center gap-2"
            >
              <span>Linux Build Coming Soon</span>
            </button>
          </motion.div>

        </div>

        {/* Headless CLI & One-Liner Install */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          whileHover={{ y: -4 }}
          transition={{ duration: 0.6 }}
          className="p-7 sm:p-8 rounded-3xl bg-white border border-neutral-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.07)] hover:border-neutral-300 transition-all mb-12"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-blue-600 mb-2 font-medium">
                <Terminal className="w-4 h-4" />
                <span>Headless CI/CD & Automated Scripts</span>
              </div>
              <h4 className="font-display text-xl font-medium text-neutral-900">
                ProProxy CLI Daemon
              </h4>
              <p className="text-xs sm:text-sm text-neutral-600 mt-1 max-w-xl">
                Run ProProxy headless on your workstation or automated scripts via native commands.
              </p>
            </div>

            <div className="flex items-center gap-2 bg-neutral-100 p-2 rounded-2xl border border-neutral-200 w-full md:w-auto">
              <code className="text-xs font-mono text-neutral-800 px-3 select-all overflow-x-auto">
                {downloads.cli.command}
              </code>
              <button
                onClick={copyCliCommand}
                className="px-3.5 py-2 rounded-xl bg-white hover:bg-neutral-50 text-xs font-mono text-neutral-900 border border-neutral-200 flex items-center gap-1.5 transition-colors cursor-pointer shrink-0 font-medium shadow-2xs"
              >
                {copiedCmd ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </motion.div>

        {/* Guidance cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-neutral-600 font-mono">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-md transition-all"
          >
            <div className="text-neutral-900 font-bold mb-1 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" /> Authenticity Verification
            </div>
            Direct standalone binary. Clean, isolated, and runs without background bloat.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ delay: 0.08 }}
            className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-md transition-all"
          >
            <div className="text-neutral-900 font-bold mb-1 flex items-center gap-1.5">
              <FileText className="w-4 h-4 text-blue-600" /> Configurable Source
            </div>
            All download URLs & specifications are managed in <code className="text-blue-700 bg-neutral-100 px-1 py-0.5 rounded">src/config.js</code>.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ y: -4 }}
            transition={{ delay: 0.16 }}
            className="p-5 rounded-2xl bg-white border border-neutral-200/90 shadow-2xs hover:shadow-md transition-all"
          >
            <div className="text-neutral-900 font-bold mb-1 flex items-center gap-1.5">
              <ExternalLink className="w-4 h-4 text-indigo-600" /> GitHub Repository
            </div>
            <a href={PROPROXY_CONFIG.community.github} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-medium">
              View official GitHub source code &rarr;
            </a>
          </motion.div>
        </div>

      </div>
    </section>
  );
}
