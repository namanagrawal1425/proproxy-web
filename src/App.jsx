import React from 'react';
import AntigravityParticles from './components/AntigravityParticles';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import NetworkSimulator from './components/NetworkSimulator';
import TutorialSection from './components/TutorialSection';
import HowItWorksSection from './components/HowItWorksSection';
import DownloadSection from './components/DownloadSection';
import ReviewsSection from './components/ReviewsSection';
import FAQSection from './components/FAQSection';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

export default function App() {
  const scrollToDownload = () => {
    const el = document.getElementById('download');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTutorial = () => {
    const el = document.getElementById('tutorial');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-white text-neutral-900 flex flex-col selection:bg-neutral-900 selection:text-white font-sans overflow-x-hidden">
      
      {/* Interactive Google Antigravity Mouse-Hover Reactive Particle Field */}
      <AntigravityParticles />

      {/* Clean Adaptive Navigation */}
      <Navbar onDownloadClick={scrollToDownload} />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        <HeroSection onDownloadClick={scrollToDownload} onGuideClick={scrollToTutorial} />
        <FeaturesSection />
        <NetworkSimulator />
        <TutorialSection />
        <HowItWorksSection />
        <DownloadSection />
        <ReviewsSection />
        <FAQSection />
        <FinalCTA onDownloadClick={scrollToDownload} onGuideClick={scrollToTutorial} />
      </main>

      {/* Footer */}
      <Footer onDownloadClick={scrollToDownload} />
    </div>
  );
}
