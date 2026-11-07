import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROPROXY_CONFIG } from '../config';
import { Download, Menu, X, ChevronRight, Terminal } from 'lucide-react';

export default function Navbar({ onDownloadClick }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 backdrop-blur-xl border-b border-neutral-200/80 shadow-sm py-3'
          : 'bg-transparent py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Name */}
        <a href="#hero" className="flex items-center gap-2.5 group focus:outline-none">
          <img src="/logo.png" alt="ProProxy Logo" className="w-7 h-7 rounded-lg object-contain transition-transform group-hover:scale-105" />
          <span className="font-display font-medium text-lg tracking-tight text-neutral-900 group-hover:text-black">
            ProProxy
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-neutral-100/60 p-1 rounded-full border border-neutral-200/60 backdrop-blur-md">
          {PROPROXY_CONFIG.navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-4 py-1.5 text-xs font-medium text-neutral-600 hover:text-neutral-950 hover:bg-white rounded-full transition-all duration-200 shadow-2xs hover:shadow-xs"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Action Group */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={PROPROXY_CONFIG.community.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-neutral-700 hover:text-neutral-950 bg-neutral-100/80 hover:bg-neutral-200/80 border border-neutral-200/80 rounded-full transition-all hover:scale-105 active:scale-95"
          >
            <Terminal className="w-3.5 h-3.5 text-neutral-600" />
            <span>GitHub</span>
          </a>

          {/* Download pill button matching reference */}
          <button
            onClick={onDownloadClick}
            className="px-5 py-2 rounded-full text-xs font-medium text-white bg-neutral-900 hover:bg-black hover:scale-105 active:scale-95 transition-all shadow-sm hover:shadow-md cursor-pointer flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download</span>
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-neutral-700 hover:text-neutral-900 focus:outline-none"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 border-b border-neutral-200 px-6 py-6 overflow-hidden backdrop-blur-xl"
          >
            <div className="flex flex-col gap-3">
              {PROPROXY_CONFIG.navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center justify-between text-sm font-medium text-neutral-700 hover:text-neutral-900 py-2 border-b border-neutral-100"
                >
                  <span>{link.label}</span>
                  <ChevronRight className="w-4 h-4 text-neutral-400" />
                </a>
              ))}
              <div className="pt-4 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onDownloadClick();
                  }}
                  className="w-full py-2.5 rounded-full font-medium text-xs text-white bg-neutral-900"
                >
                  Download ProProxy
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
