import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Wifi, 
  CheckCircle2, 
  XCircle, 
  ArrowRight, 
  Sliders, 
  ShieldCheck, 
  Sparkles, 
  Laptop, 
  RefreshCw,
  Zap,
  Globe2
} from 'lucide-react';

const SIMULATION_NETWORKS = [
  {
    id: 'campus',
    name: 'MNNIT-Campus-5G',
    type: 'Monitored Campus Wi-Fi',
    isProxyRequired: true,
    proxyIp: '172.31.100.27:3128',
    icon: '🎓',
    tag: 'Monitored Rule Active',
  },
  {
    id: 'hostel',
    name: 'Hostel-SVBH-WiFi',
    type: 'Campus Hostel Wi-Fi',
    isProxyRequired: true,
    proxyIp: '172.31.100.28:3128',
    icon: '🏢',
    tag: 'Monitored Rule Active',
  },
  {
    id: 'hotspot',
    name: 'Pixel_Hotspot_5G',
    type: 'Mobile Data Hotspot',
    isProxyRequired: false,
    proxyIp: 'Direct Connection',
    icon: '📱',
    tag: 'Unmonitored Network',
  },
  {
    id: 'home',
    name: 'Airtel_Home_Fiber',
    type: 'Home Fiber Broadband',
    isProxyRequired: false,
    proxyIp: 'Direct Connection',
    icon: '🏠',
    tag: 'Unmonitored Network',
  },
];

export default function NetworkSimulator() {
  const [activeNetwork, setActiveNetwork] = useState(SIMULATION_NETWORKS[0]);
  const [manualOverride, setManualOverride] = useState(null); // null = auto, true = forced ON, false = forced OFF
  const [isSwitching, setIsSwitching] = useState(false);

  const isProxyActive = manualOverride !== null ? manualOverride : activeNetwork.isProxyRequired;

  const handleNetworkSelect = (network) => {
    if (network.id === activeNetwork.id) return;
    setIsSwitching(true);
    setManualOverride(null); // Reset manual override on network change
    setTimeout(() => {
      setActiveNetwork(network);
      setIsSwitching(false);
    }, 350);
  };

  const toggleManualOverride = (state) => {
    setManualOverride(state);
  };

  return (
    <section className="relative py-28 md:py-36 bg-white border-t border-neutral-200/60 overflow-hidden">
      
      {/* Subtle colorful ambient backdrop */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[500px] bg-gradient-to-tr from-blue-50/70 via-indigo-50/40 to-emerald-50/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50/80 border border-blue-200/80 text-xs font-sans font-semibold text-blue-900 mb-5 shadow-2xs hover:scale-105 transition-transform cursor-default">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Interactive Live Simulation</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 mb-5 leading-[1.15]">
            See ProProxy <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">In Action.</span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Tap different Wi-Fi networks below to test how ProProxy auto-detects your connection and configures Windows in real-time.
          </p>
        </motion.div>

        {/* Interactive Playground Container */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-5xl mx-auto rounded-3xl bg-white border border-neutral-200/90 p-6 sm:p-10 shadow-[0_16px_50px_rgba(0,0,0,0.06)] hover:shadow-[0_24px_60px_rgba(0,0,0,0.09)] transition-all duration-300 relative overflow-hidden"
        >
          
          {/* Top Instruction Bar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 mb-8 border-b border-neutral-200/80 gap-4">
            <div>
              <span className="text-xs font-sans text-blue-600 font-semibold flex items-center gap-1.5 mb-1">
                <Laptop className="w-4 h-4" /> Step 1: Select a Test Wi-Fi Network
              </span>
              <h3 className="font-display text-xl font-medium text-neutral-900">
                Simulate your daily Wi-Fi environments
              </h3>
            </div>

            {/* Quick manual override buttons */}
            <div className="flex items-center gap-2 text-xs font-sans font-medium">
              <span className="text-neutral-400 hidden sm:inline">Manual Test:</span>
              <button
                onClick={() => toggleManualOverride(true)}
                className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  manualOverride === true
                    ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                Force ON
              </button>
              <button
                onClick={() => toggleManualOverride(false)}
                className={`px-3 py-1.5 rounded-full border transition-all cursor-pointer ${
                  manualOverride === false
                    ? 'bg-rose-600 text-white border-rose-600 shadow-xs'
                    : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                }`}
              >
                Force OFF
              </button>
              {manualOverride !== null && (
                <button
                  onClick={() => setManualOverride(null)}
                  className="px-2.5 py-1.5 rounded-full text-neutral-400 hover:text-neutral-800 text-[11px] underline cursor-pointer"
                >
                  Reset Auto
                </button>
              )}
            </div>
          </div>

          {/* Network Selection Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 mb-10">
            {SIMULATION_NETWORKS.map((net) => {
              const isSelected = activeNetwork.id === net.id;
              return (
                <button
                  key={net.id}
                  onClick={() => handleNetworkSelect(net)}
                  className={`p-4 rounded-2xl border text-left transition-all duration-200 cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-[1.02]'
                      : 'bg-neutral-50/70 hover:bg-neutral-100/80 text-neutral-800 border-neutral-200/80'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl">{net.icon}</span>
                    <span
                      className={`text-[11px] font-sans px-2.5 py-0.5 rounded-full font-medium ${
                        isSelected
                          ? 'bg-neutral-800 text-neutral-200'
                          : 'bg-white text-neutral-600 border border-neutral-200'
                      }`}
                    >
                      {net.isProxyRequired ? 'Auto Proxy' : 'Direct'}
                    </span>
                  </div>

                  <div>
                    <div className="font-display font-medium text-sm truncate mb-0.5">
                      {net.name}
                    </div>
                    <div
                      className={`text-[11px] ${
                        isSelected ? 'text-neutral-400' : 'text-neutral-500'
                      }`}
                    >
                      {net.type}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Real-time Reaction Dashboard */}
          <div className="rounded-2xl bg-neutral-950 p-6 sm:p-8 text-white relative overflow-hidden border border-neutral-800 shadow-inner">
            
            {/* Ambient scan line when switching */}
            {isSwitching && (
              <motion.div
                initial={{ left: '-100%' }}
                animate={{ left: '100%' }}
                transition={{ duration: 0.45, ease: 'easeInOut' }}
                className="absolute inset-y-0 w-32 bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent pointer-events-none"
              />
            )}

            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-6 border-b border-neutral-800">
              
              {/* Connected SSID */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-neutral-900 border border-neutral-800 flex items-center justify-center text-cyan-400">
                  <Wifi className="w-6 h-6 animate-pulse" />
                </div>
                <div>
                  <div className="text-xs font-sans text-neutral-400 font-medium flex items-center gap-2">
                    <span>Active Connection</span>
                    {isSwitching ? (
                      <span className="text-amber-400 flex items-center gap-1">
                        <RefreshCw className="w-3 h-3 animate-spin" /> Detecting...
                      </span>
                    ) : (
                      <span className="text-emerald-400">● Live</span>
                    )}
                  </div>
                  <div className="text-xl sm:text-2xl font-display font-medium text-white flex items-center gap-2.5">
                    <span>{activeNetwork.name}</span>
                    <span className="text-sm">{activeNetwork.icon}</span>
                  </div>
                </div>
              </div>

              {/* Status Outcome Indicator */}
              <div className="flex items-center gap-3">
                <div
                  className={`px-4 py-2.5 rounded-2xl border flex items-center gap-3 transition-colors ${
                    isProxyActive
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                      : 'bg-neutral-800/80 border-neutral-700 text-neutral-300'
                  }`}
                >
                  <div className="relative">
                    <span
                      className={`w-3.5 h-3.5 rounded-full inline-block ${
                        isProxyActive ? 'bg-emerald-400 animate-pulse' : 'bg-neutral-500'
                      }`}
                    />
                    {isProxyActive && (
                      <span className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-75" />
                    )}
                  </div>
                  <div>
                    <div className="text-[11px] font-sans text-neutral-400 font-medium">
                      Windows Proxy Status
                    </div>
                    <div className="text-sm font-semibold tracking-normal font-sans">
                      {isProxyActive ? 'PROXY ENABLED (ON)' : 'PROXY DISABLED (OFF)'}
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Diagnostic Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 text-xs font-sans">
              <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
                <span className="text-neutral-500 block mb-1">Trigger Reason</span>
                <span className="text-neutral-200">
                  {manualOverride !== null
                    ? `Manual Override (${manualOverride ? 'Forced ON' : 'Forced OFF'})`
                    : activeNetwork.isProxyRequired
                    ? 'Matched Saved Monitored SSID'
                    : 'Unmonitored Network (Auto-Safe)'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
                <span className="text-neutral-500 block mb-1">Configured Gateway</span>
                <span className="text-cyan-400 font-semibold">
                  {isProxyActive ? activeNetwork.proxyIp : '0.0.0.0 (Bypassed)'}
                </span>
              </div>

              <div className="p-3.5 rounded-xl bg-neutral-900/80 border border-neutral-800/80">
                <span className="text-neutral-500 block mb-1">Instant Windows Connect</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" /> Instant HKCU Flushed (0ms)
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Footnote */}
          <div className="mt-6 flex flex-col sm:flex-row items-center justify-between text-xs font-sans text-neutral-500 gap-2">
            <span>
              💡 ProProxy runs this exact loop in the background at zero CPU cost using native Windows netsh APIs.
            </span>
            <span className="text-neutral-800 font-medium">
              Zero manual toggling required.
            </span>
          </div>

        </motion.div>

      </div>
    </section>
  );
}
