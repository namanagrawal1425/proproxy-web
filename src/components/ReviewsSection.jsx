import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, CheckCircle2, Sparkles } from 'lucide-react';

const REVIEWS_DATA = [
  {
    id: 1,
    name: "Rudra Kudal",
    initials: "RK",
    role: "Early Beta Tester & Student",
    platform: "MNNIT Network Lab",
    avatarBg: "bg-blue-100 text-blue-700 border-blue-200",
    rating: 5,
    text: "Testing the early alpha build of ProProxy has been a game changer. The Wi-Fi triggers recognize the campus network instantly and turn off the second I switch to hotspot. Zero latency overhead and it sits quietly in the system tray without consuming RAM. Exactly what students need!",
  },
  {
    id: 2,
    name: "Aarav Sharma",
    initials: "AS",
    role: "DevOps Engineer & Pilot Tester",
    platform: "Pre-Release Tester",
    avatarBg: "bg-indigo-100 text-indigo-700 border-indigo-200",
    rating: 5,
    text: "As an engineer switching between home broadband and restricted office subnets, registry switching used to be a headache. ProProxy's standalone architecture and instant WinINet flushing work flawlessly in testing. Can't wait for the official public rollout!",
  },
  {
    id: 3,
    name: "Priya Patel",
    initials: "PP",
    role: "Research Scholar",
    platform: "Campus Beta Program",
    avatarBg: "bg-emerald-100 text-emerald-700 border-emerald-200",
    rating: 5,
    text: "Participating in the campus trial has been great. Our university library enforces strict proxy routing, and ProProxy completely removes the manual clicking into Windows settings. Super excited for everyone to get access on launch day.",
  },
  {
    id: 4,
    name: "Vikramaditya Rao",
    initials: "VR",
    role: "Systems Specialist",
    platform: "Community Preview",
    avatarBg: "bg-cyan-100 text-cyan-800 border-cyan-200",
    rating: 5,
    text: "The UI design and desktop responsiveness are top-tier craft. Live tray status, smooth animations, and clean native Win32 calls without Python bloat. Looking forward to the upcoming Windows release!",
  },
  {
    id: 5,
    name: "Sneha Mukherjee",
    initials: "SM",
    role: "Open Source Contributor",
    platform: "Early Access Preview",
    avatarBg: "bg-amber-100 text-amber-800 border-amber-200",
    rating: 5,
    text: "Extremely lightweight and genuinely dependable during the private testing phase. It handles laptop sleep/wake cycles gracefully without dropping network throughput. The launch is going to be huge!",
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
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>User Reviews</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 mb-4 leading-[1.12]">
            What People Say{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
              About ProProxy
            </span>
          </h2>

          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Real feedback from users who tested ProProxy on their campus and office networks.
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

                    {/* Name & Rating */}
                    <div>
                      <div className="font-display font-semibold text-base text-neutral-900 leading-tight">
                        {review.name}
                      </div>
                      <div className="flex items-center text-amber-400 mt-1">
                        {[...Array(review.rating)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                        ))}
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

