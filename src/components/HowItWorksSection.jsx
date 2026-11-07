import React from 'react';
import { motion } from 'framer-motion';
import { Download, Sliders, Play, CheckCircle, Wifi } from 'lucide-react';

const WORKFLOW_STEPS = [
  {
    number: '01',
    title: 'Download & Launch',
    subtitle: 'Zero installation required',
    description: 'Download the standalone ProProxy.exe binary. Double click and it runs instantly with zero dependencies or complex setups.',
    icon: Download,
    detail: 'Single Portable .exe',
  },
  {
    number: '02',
    title: 'Add Monitored Wi-Fi',
    subtitle: '1-Click automatic capture',
    description: 'Connect to your campus or office Wi-Fi and tap "Add Current Wi-Fi". Add custom SSIDs for lab, library, or hostel networks.',
    icon: Wifi,
    detail: 'SSID-based triggers',
  },
  {
    number: '03',
    title: 'Configure Proxy Server',
    subtitle: 'Host IP & Port settings',
    description: 'Enter your proxy address and port once (e.g. 172.31.100.27:3128). ProProxy saves it instantly.',
    icon: Sliders,
    detail: 'Instant system integration',
  },
  {
    number: '04',
    title: 'Hands-Free Automation',
    subtitle: 'Background daemon & tray',
    description: 'Minimize to the Windows system tray. The proxy turns ON automatically on monitored networks and OFF on home/hotspot connections.',
    icon: Play,
    detail: 'Live status tray indicator',
  },
];

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="relative py-28 md:py-36 bg-white border-t border-neutral-200/60 overflow-hidden">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50/80 border border-emerald-200/80 text-xs font-sans font-semibold text-emerald-900 mb-5 shadow-2xs hover:scale-105 transition-transform cursor-default">
            <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>Smooth 4-Step Onboarding</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 mb-5 leading-[1.15]">
            From Download to Lift-Off <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 bg-clip-text text-transparent">
              in 90 Seconds.
            </span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            We stripped away cumbersome configurations. Getting started with ProProxy is as simple as launching the app and adding your Wi-Fi network.
          </p>
        </motion.div>

        {/* 4 Connected Visual Workflow Steps in White Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {WORKFLOW_STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.25, ease: 'easeOut' } }}
                transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="relative p-7 rounded-3xl bg-white border border-neutral-200/90 hover:border-neutral-400/90 transition-all duration-300 flex flex-col justify-between group shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_45px_-10px_rgba(0,0,0,0.09)] cursor-default"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-display font-extrabold text-3xl text-neutral-300 group-hover:text-blue-600 transition-colors">
                      {step.number}
                    </span>
                    <div className="w-13 h-13 rounded-2xl bg-neutral-100 border border-neutral-200/80 flex items-center justify-center group-hover:scale-105 group-hover:bg-neutral-950 transition-all duration-300 shadow-2xs">
                      <Icon className="w-5 h-5 text-neutral-800 group-hover:text-white transition-colors group-hover:rotate-6" />
                    </div>
                  </div>

                  <h3 className="font-display font-bold text-xl text-neutral-900 mb-1 group-hover:text-black">
                    {step.title}
                  </h3>
                  <div className="text-xs font-sans text-blue-600 font-semibold mb-3">
                    {step.subtitle}
                  </div>
                  <p className="text-xs text-neutral-600 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>

                <div className="mt-8 pt-4 border-t border-neutral-100 text-[11px] font-sans text-neutral-500 group-hover:text-neutral-900 transition-colors flex items-center justify-between">
                  <span className="font-medium">{step.detail}</span>
                  <span className="w-2 h-2 rounded-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
