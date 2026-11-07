import React from 'react';
import { motion } from 'framer-motion';
import { 
  Wifi, 
  ToggleRight, 
  SlidersHorizontal, 
  Bell, 
  Power, 
  PackageCheck,
  ArrowUpRight,
  Sparkles
} from 'lucide-react';

const USER_FEATURES = [
  {
    icon: Wifi,
    title: 'Auto Wi-Fi Network Detection',
    benefit: 'Zero manual toggling needed',
    description: 'Continuously monitors your connected Wi-Fi in the background. Connect to campus, lab, or office Wi-Fi, and your proxy turns ON instantly. Switch to hotspot or home Wi-Fi, and it switches OFF automatically.',
    badge: 'Automation',
    accent: 'blue',
  },
  {
    icon: SlidersHorizontal,
    title: '1-Click Monitored Network Rules',
    benefit: 'Manage multiple trusted hotspots',
    description: 'Click "Add Current Wi-Fi" to save the active network with a single tap. Add custom SSIDs for your library, hostel, or workspace with complete rule management.',
    badge: 'Smart Rules',
    accent: 'indigo',
  },
  {
    icon: ToggleRight,
    title: 'Instant Manual Overrides & IP Setup',
    benefit: 'Full control whenever you need it',
    description: 'Need to force proxy settings on or off? Use dedicated one-click manual overrides anytime. Easily configure custom proxy host IPs and ports with instantaneous registry flushing.',
    badge: 'Control',
    accent: 'emerald',
  },
  {
    icon: Bell,
    title: 'System Tray Daemon with Live Status Dot',
    benefit: 'Runs silently without cluttering screen',
    description: 'Minimizes cleanly to the Windows notification tray. Glance at the live tray dot to check state (🟢 Active / 🔴 Inactive), or right-click to restore and toggle on the fly.',
    badge: 'System Tray',
    accent: 'amber',
  },
  {
    icon: Power,
    title: 'Silent Boot with Windows',
    benefit: 'Starts automatically in background',
    description: 'Turn on "Start with Windows" and ProProxy launches directly into the system tray when you log in—so your connection rules are active without having to open the app manually.',
    badge: 'Auto Start',
    accent: 'rose',
  },
  {
    icon: PackageCheck,
    title: '100% Standalone Portable .exe',
    benefit: 'No setup, no Python, runs instantly',
    description: 'A single, zero-dependency Windows executable. Download ProProxy.exe, double click, and start using it immediately on any Windows 10 or 11 PC without administrative setup.',
    badge: 'Portable',
    accent: 'purple',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="relative py-28 md:py-36 bg-white border-t border-neutral-200/60 overflow-hidden">
      
      {/* Subtle background ambient warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-gradient-to-tr from-blue-50/50 via-indigo-50/30 to-purple-50/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200 text-xs font-sans font-semibold text-neutral-800 mb-5 shadow-2xs hover:scale-105 transition-transform cursor-default">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Built for Daily Simplicity</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 mb-5 leading-[1.15]">
            Everything You Need. <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 bg-clip-text text-transparent">
              Nothing You Don't.
            </span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Automatic proxy switching for your daily Wi-Fi networks, seamless system tray daemon, and one-click portability.
          </p>
        </motion.div>

        {/* Feature Grid with Crisp White Cards & Soft Shadows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {USER_FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -8, scale: 1.015, transition: { duration: 0.25, ease: 'easeOut' } }}
                transition={{ duration: 0.6, delay: idx * 0.08, ease: [0.16, 1, 0.3, 1] }}
                className="group relative p-8 rounded-3xl bg-white border border-neutral-200/90 hover:border-neutral-400/90 transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_22px_50px_-10px_rgba(0,0,0,0.1)] flex flex-col justify-between cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-13 h-13 rounded-2xl bg-neutral-100 group-hover:bg-neutral-950 border border-neutral-200/80 flex items-center justify-center transition-all duration-300 group-hover:shadow-md group-hover:scale-105">
                      <Icon className="w-6 h-6 text-neutral-800 group-hover:text-white transition-all duration-300 group-hover:rotate-6" />
                    </div>
                    <span className="text-[11px] font-sans px-3 py-1 rounded-full bg-neutral-100 group-hover:bg-neutral-200/80 text-neutral-700 border border-neutral-200 font-medium transition-colors">
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="font-display text-xl font-bold text-neutral-900 mb-2 group-hover:text-black transition-colors flex items-center justify-between">
                    <span>{item.title}</span>
                    <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 text-blue-600 transition-all -translate-x-2 group-hover:translate-x-0" />
                  </h3>

                  <div className="text-xs font-sans text-blue-600 font-semibold mb-3">
                    {item.benefit}
                  </div>

                  <p className="text-sm text-neutral-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-sans text-neutral-500">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Windows Native
                  </span>
                  <span className="text-[11px] text-neutral-400 group-hover:text-neutral-700 transition-colors">
                    ProProxy v2.0
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
