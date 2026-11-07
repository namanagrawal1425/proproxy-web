import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, ExternalLink, Video, Clock, UserCheck } from 'lucide-react';
import { PROPROXY_CONFIG } from '../config';

export default function TutorialSection() {
  const [isPlaying, setIsPlaying] = useState(false);
  const { tutorial } = PROPROXY_CONFIG;

  return (
    <section id="tutorial" className="relative py-28 md:py-36 bg-white border-t border-neutral-200/60 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200 text-xs font-sans font-semibold text-neutral-800 mb-5 shadow-2xs hover:scale-105 transition-transform cursor-default">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <Video className="w-3.5 h-3.5 text-blue-600" />
            <span>Official Video Walkthrough</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 mb-5 leading-[1.15]">
            Up and Running in <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              Under 4 Minutes.
            </span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Watch the comprehensive guide to auto Wi-Fi network rules, WinINet registry flushing, and system tray operations.
          </p>
        </motion.div>

        {/* Video Player Card */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mx-auto rounded-3xl bg-white border border-neutral-200/90 p-3 sm:p-5 shadow-[0_12px_45px_rgba(0,0,0,0.06)] hover:shadow-[0_20px_55px_rgba(0,0,0,0.1)] transition-all duration-300 mb-14"
        >
          <div className="relative aspect-video rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-200 group">
            
            {isPlaying ? (
              <iframe
                className="w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${tutorial.youtubeVideoId}?autoplay=1&rel=0`}
                title="ProProxy Walkthrough Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              <div className="relative w-full h-full flex flex-col items-center justify-center p-6 text-center">
                {/* Backdrop illustration */}
                <div className="absolute inset-0 bg-gradient-to-tr from-neutral-950 via-neutral-900 to-indigo-950/70 opacity-95" />
                <div className="absolute inset-0 bg-grid-pattern opacity-30" />

                {/* Video Info Overlay */}
                <div className="relative z-10 flex flex-col items-center">
                  <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setIsPlaying(true)}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-white text-neutral-900 p-0.5 shadow-2xl cursor-pointer flex items-center justify-center group mb-6 hover:bg-neutral-100 transition-colors"
                    aria-label="Play ProProxy Tutorial Video"
                  >
                    <Play className="w-8 h-8 sm:w-10 sm:h-10 text-neutral-900 fill-neutral-900 ml-1 transition-transform group-hover:scale-110" />
                  </motion.button>

                  <h3 className="font-display text-xl sm:text-2xl font-medium text-white mb-2 max-w-xl">
                    Master ProProxy in 4 Minutes: Nodes, Wi-Fi Automation & Rules
                  </h3>
                  
                  <div className="flex flex-wrap items-center justify-center gap-4 text-xs font-sans text-neutral-300 font-medium">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-blue-400" /> Duration: {tutorial.duration}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <UserCheck className="w-3.5 h-3.5 text-indigo-400" /> By: {tutorial.author}
                    </span>
                  </div>
                </div>

                {/* Direct Link to YouTube */}
                <div className="absolute bottom-4 right-4 z-10">
                  <a
                    href={tutorial.youtubeWatchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-sans font-medium text-neutral-300 bg-neutral-900/90 border border-neutral-700 hover:border-white hover:text-white transition-all backdrop-blur-md"
                  >
                    <span>Watch on YouTube</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            )}

          </div>

          <div className="mt-4 px-3 py-2 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-neutral-500 gap-2">
            <span className="text-neutral-600">
              💡 Configurable YouTube Link: edit <code className="text-neutral-800 bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200">src/config.js</code> to link your official walkthrough.
            </span>
            <a
              href={tutorial.youtubeWatchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-neutral-900 hover:underline font-medium flex items-center gap-1"
            >
              Open External Stream <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </motion.div>

        {/* 4-Step Written Walkthrough for Users who prefer reading */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {tutorial.steps.map((st, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="p-6 rounded-2xl bg-white border border-neutral-200/90 shadow-[0_4px_16px_rgba(0,0,0,0.03)] hover:shadow-[0_16px_35px_rgba(0,0,0,0.08)] hover:border-neutral-400/90 transition-all cursor-default group"
            >
              <div className="text-2xl font-display font-bold text-neutral-300 group-hover:text-blue-600 transition-colors mb-2">
                {st.step}
              </div>
              <h4 className="font-display font-bold text-neutral-900 text-base mb-1.5 group-hover:text-black">
                {st.title}
              </h4>
              <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                {st.desc}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
