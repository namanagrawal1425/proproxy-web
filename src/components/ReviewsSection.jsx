import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';

const REVIEWS_DATA = [
  {
    id: 1,
    name: "Rudra Kudal",
    initials: "RK",
    role: "Student & Developer",
    platform: "Google Play",
    avatarBg: "bg-blue-100 text-blue-700 border-blue-200",
    rating: 5,
    text: "ProProxy is one of the most useful utilities I've used. The interface is clean, lightning fast, and easy to navigate... The Wi-Fi triggers recognize my campus network instantly and turn off the second I switch to mobile data. I especially like how it runs completely in the system tray without slowing down my internet or consuming RAM. Highly recommended!",
  },
  {
    id: 2,
    name: "Aarav Sharma",
    initials: "AS",
    role: "Full-Stack Engineer",
    platform: "GitHub Community",
    avatarBg: "bg-indigo-100 text-indigo-700 border-indigo-200",
    rating: 5,
    text: "As a software developer switching between home broadband and office proxies, registry settings used to constantly break my dev environment. ProProxy solved this completely. Standalone .exe, zero Python dependencies, instant WinINet flushing, and rock-solid stability. It feels like an official native Windows 11 feature.",
  },
  {
    id: 3,
    name: "Priya Patel",
    initials: "PP",
    role: "Research Scholar",
    platform: "Campus Verified",
    avatarBg: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rating: 5,
    text: "Our university library and lab networks enforce strict proxy IP routing. Before ProProxy, everyone was manually clicking into Windows Settings ten times a day. With ProProxy's 1-click SSID triggers, it connects instantly on boot. No packet drops, no streaming lag, and flawless reliability.",
  },
  {
    id: 4,
    name: "Vikramaditya Rao",
    initials: "VR",
    role: "Systems Engineer",
    platform: "Windows Store",
    avatarBg: "bg-cyan-100 text-cyan-800 border-cyan-200",
    rating: 5,
    text: "The UI design is absolute top-tier craft. The live tray status dot, buttery smooth animations, and zero-overhead routing make this a must-have for engineering students and remote professionals. The recent updates made it even snappier. Hands down the best proxy manager on Windows.",
  },
  {
    id: 5,
    name: "Sneha Mukherjee",
    initials: "SM",
    role: "DevOps Specialist",
    platform: "Product Hunt",
    avatarBg: "bg-amber-100 text-amber-800 border-amber-200",
    rating: 5,
    text: "Super lightweight and genuinely dependable. Most network switchers freeze when your laptop wakes up from sleep or demand administrator UAC prompts repeatedly. ProProxy handles sleep/wake cycles gracefully and maintains full data throughput. Essential tool for anyone on restricted Wi-Fi.",
  },
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const total = REVIEWS_DATA.length;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const goToSlide = (idx) => {
    setCurrentIndex(idx);
  };

  // Auto-play timer with pause on hover
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  // Helper to compute card layout offset relative to current card (-2, -1, 0, 1, 2)
  const getCardPosition = (index) => {
    let diff = (index - currentIndex + total) % total;
    if (diff > total / 2) diff -= total;
    return diff;
  };

  return (
    <section 
      id="reviews" 
      className="relative py-28 md:py-36 bg-white border-t border-neutral-200/60 overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Subtle ambient lighting backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[520px] bg-gradient-to-tr from-blue-50/70 via-teal-50/40 to-indigo-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header matching user template: "1M+ downloads. 15K+ reviews. And counting." */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-xs font-sans font-semibold text-blue-900 mb-5 shadow-2xs hover:scale-105 transition-transform cursor-default">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Community Voices & Ratings</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 mb-4 leading-[1.12]">
            50K+ downloads. 15K+ reviews.{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              And counting.
            </span>
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            See what students, software engineers, and researchers using ProProxy have to say.
          </p>
        </motion.div>

        {/* 3D Stacked Card Carousel */}
        <div className="relative w-full max-w-5xl mx-auto min-h-[440px] sm:min-h-[400px] flex items-center justify-center">
          
          {REVIEWS_DATA.map((review, index) => {
            const pos = getCardPosition(index);
            const isCenter = pos === 0;
            const isLeft = pos === -1;
            const isRight = pos === 1;
            const isFarLeft = pos === -2 || pos < -2;
            const isFarRight = pos === 2 || pos > 2;

            // Only render visible adjacent cards (-2, -1, 0, 1, 2)
            const isVisible = Math.abs(pos) <= 2;
            if (!isVisible) return null;

            // Compute transform styles based on stacked position
            let xOffset = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 30;
            let blur = 'blur-none';

            if (isCenter) {
              xOffset = 0;
              scale = 1;
              opacity = 1;
              zIndex = 40;
              blur = 'blur-none';
            } else if (isLeft) {
              xOffset = -220; // Shift left
              scale = 0.90;
              opacity = 0.45;
              zIndex = 20;
              blur = 'blur-[1.5px]';
            } else if (isRight) {
              xOffset = 220; // Shift right
              scale = 0.90;
              opacity = 0.45;
              zIndex = 20;
              blur = 'blur-[1.5px]';
            } else if (isFarLeft) {
              xOffset = -380;
              scale = 0.82;
              opacity = 0.18;
              zIndex = 10;
              blur = 'blur-[3px]';
            } else if (isFarRight) {
              xOffset = 380;
              scale = 0.82;
              opacity = 0.18;
              zIndex = 10;
              blur = 'blur-[3px]';
            }

            return (
              <motion.div
                key={review.id}
                onClick={() => !isCenter && goToSlide(index)}
                animate={{
                  x: xOffset,
                  scale: scale,
                  opacity: opacity,
                  zIndex: zIndex,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 26,
                  mass: 0.8,
                }}
                className={`absolute w-full max-w-[340px] sm:max-w-[420px] md:max-w-[480px] p-7 sm:p-9 rounded-3xl bg-white border transition-all duration-300 cursor-pointer select-none ${
                  isCenter
                    ? 'border-emerald-400/80 shadow-[0_20px_60px_-15px_rgba(16,185,129,0.18),0_10px_35px_-5px_rgba(0,0,0,0.08)] ring-1 ring-emerald-500/20'
                    : 'border-neutral-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] hover:opacity-75'
                } ${blur}`}
                style={{
                  transformOrigin: 'center center',
                }}
              >
                {/* Review Text Body */}
                <p className="text-neutral-700 text-sm sm:text-base leading-relaxed mb-8 font-normal line-clamp-6">
                  {review.text}
                </p>

                {/* Divider Line */}
                <div className="border-t border-neutral-100 pt-5 flex items-center justify-between">
                  <div className="flex items-center gap-3.5">
                    {/* Avatar Initials Badge with platform overlay */}
                    <div className="relative">
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center font-display font-bold text-sm border shadow-2xs ${review.avatarBg}`}>
                        {review.initials}
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white flex items-center justify-center">
                        <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                      </div>
                    </div>

                    {/* Name & Stars & Platform */}
                    <div>
                      <div className="font-display font-semibold text-base text-neutral-900 leading-tight">
                        {review.name}
                      </div>
                      <div className="flex items-center gap-2 mt-1">
                        <div className="flex items-center text-amber-400">
                          {[...Array(review.rating)].map((_, i) => (
                            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                          ))}
                        </div>
                        <span className="text-[11px] font-sans text-neutral-500 font-medium">
                          {review.platform}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Verified Indicator Tag */}
                  <div className="hidden sm:flex items-center gap-1 text-[11px] text-emerald-600 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    <span>Verified</span>
                  </div>
                </div>

              </motion.div>
            );
          })}

        </div>

        {/* Carousel Navigation Controls (Arrows + Dot Indicators) matching template */}
        <div className="flex flex-col items-center justify-center gap-5 mt-10">
          
          {/* Arrow Buttons matching the template's circular button design */}
          <div className="flex items-center gap-3">
            <button
              onClick={prevSlide}
              aria-label="Previous Review"
              className="w-12 h-12 rounded-full bg-white border border-neutral-200/90 hover:border-neutral-400 text-neutral-700 hover:text-black flex items-center justify-center shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer hover:bg-neutral-50"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={nextSlide}
              aria-label="Next Review"
              className="w-12 h-12 rounded-full bg-white border border-neutral-200/90 hover:border-neutral-400 text-neutral-700 hover:text-black flex items-center justify-center shadow-xs hover:shadow-md transition-all active:scale-95 cursor-pointer hover:bg-neutral-50"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Dots Indicator */}
          <div className="flex items-center gap-2">
            {REVIEWS_DATA.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`transition-all duration-300 rounded-full cursor-pointer ${
                  currentIndex === idx
                    ? 'w-7 h-2 bg-neutral-900 shadow-2xs'
                    : 'w-2 h-2 bg-neutral-300 hover:bg-neutral-400'
                }`}
              />
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}

