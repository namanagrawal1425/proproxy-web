import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, ChevronDown } from 'lucide-react';

const FAQ_ITEMS = [
  {
    q: 'What is ProProxy and how does the automatic Wi-Fi trigger work?',
    a: 'ProProxy is a smart Windows proxy manager designed for users on campus, office, or restricted networks. It continuously checks your connected Wi-Fi in the background via native system calls. When you connect to a saved network (like campus Wi-Fi), it switches the Windows proxy ON. When you switch to a mobile hotspot or home network, it turns OFF automatically.',
  },
  {
    q: 'Do I need to install Python or run any command line scripts?',
    a: 'No! ProProxy is distributed as a 100% standalone portable executable (ProProxy.exe). There are no dependencies, no Python runtimes, and no administrator installer wizards needed. Just double click to launch.',
  },
  {
    q: 'How do I add my campus, hostel, or library Wi-Fi network?',
    a: 'Simply connect to the Wi-Fi network on your Windows PC and click the "Add Current Wi-Fi" button inside ProProxy. You can also type any custom SSID manually ahead of time.',
  },
  {
    q: 'Does it run in the background when I close the window?',
    a: 'Yes. Closing the window minimizes ProProxy quietly to the Windows system notification tray. You can check the live status dot (🟢 Active / 🔴 Inactive) anytime or right-click to restore.',
  },
  {
    q: 'Can I launch it silently on Windows boot?',
    a: 'Yes. Simply check the "Start with Windows" option in settings. ProProxy registers itself to launch directly into the system tray upon user login so you never have to remember to open it.',
  },
  {
    q: 'Can I override the proxy manually when needed?',
    a: 'Absolutely. ProProxy includes dedicated "Manual Proxy ON" and "Manual Proxy OFF" buttons for instant overriding without changing your saved network rules.',
  },
];

export default function FAQSection() {
  const [openIdx, setOpenIdx] = useState(0);

  const toggleAccordion = (idx) => {
    setOpenIdx(openIdx === idx ? -1 : idx);
  };

  return (
    <section id="faq" className="relative py-28 md:py-36 bg-white border-t border-neutral-200/60 overflow-hidden">
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header with Motion Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-neutral-100/90 border border-neutral-200 text-xs font-mono text-neutral-800 mb-5 shadow-2xs hover:scale-105 transition-transform cursor-default">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
            <span className="font-semibold">COMMON QUESTIONS & ANSWERS</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 mb-5 leading-[1.15]">
            Frequently Asked <br className="hidden sm:inline" />
            <span className="bg-gradient-to-r from-neutral-900 via-neutral-700 to-neutral-500 bg-clip-text text-transparent">
              Questions.
            </span>
          </h2>
          <p className="text-neutral-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            Everything you need to know about setting up, Wi-Fi automation, and system integration.
          </p>
        </motion.div>

        {/* Accessible Accordion List in Crisp White Cards */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item, idx) => {
            const isOpen = openIdx === idx;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                whileHover={{ y: -3, transition: { duration: 0.2 } }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                className="rounded-2xl bg-white border border-neutral-200/90 hover:border-neutral-400/90 transition-all overflow-hidden shadow-2xs hover:shadow-md cursor-pointer"
              >
                <button
                  onClick={() => toggleAccordion(idx)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-base sm:text-lg text-neutral-900 pr-4">
                    {item.q}
                  </span>
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ${isOpen ? 'rotate-180 bg-neutral-950 text-white shadow-xs' : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="px-6 pb-6 text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 pt-3"
                    >
                      {item.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
