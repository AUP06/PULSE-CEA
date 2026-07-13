/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Splash from './components/Splash';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyContribute from './components/WhyContribute';
import LiveStatistics from './components/LiveStatistics';
import SubmissionForm from './components/SubmissionForm';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import SuccessModal from './components/SuccessModal';
import { IdeaSubmission } from './types';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [activeSection, setActiveSection] = useState('home');
  
  // Tracking local additions in current session to dynamically increment stats counters
  const [localSubmissionsCount, setLocalSubmissionsCount] = useState(0);
  const [localVolunteersCount, setLocalVolunteersCount] = useState(0);
  
  // Success states for modal & confetti
  const [showSuccess, setShowSuccess] = useState(false);
  const [latestSubmission, setLatestSubmission] = useState<IdeaSubmission | null>(null);

  // Initialize count by scanning existing localStorage entries
  useEffect(() => {
    try {
      const local = JSON.parse(localStorage.getItem('pulse_ideas') || '[]');
      if (local.length > 0) {
        setLocalSubmissionsCount(local.length);
        const volunteers = local.filter((item: any) => item.willHelpConduct === 'Yes').length;
        setLocalVolunteersCount(volunteers);
      }
    } catch (e) {
      console.warn('LocalStorage is empty or disabled:', e);
    }
  }, []);

  // Intersection Observer Scroll Spy to track active navigation elements
  useEffect(() => {
    if (showSplash) return;

    const sections = ['home', 'about', 'why-contribute', 'submit-idea', 'faq', 'contact'];
    const observers = sections.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id);
          }
        },
        {
          rootMargin: '-30% 0px -50% 0px', // Custom viewport bounds for active tab changes
        }
      );

      observer.observe(el);
      return { el, observer };
    });

    return () => {
      observers.forEach((o) => {
        if (o) o.observer.unobserve(o.el);
      });
    };
  }, [showSplash]);

  // Navlink scroll trigger
  const handleNavigate = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  // Submission callback - increments statistics and launches the beautiful confetti modal
  const handleSubmissionSuccess = (newSubmission: IdeaSubmission) => {
    setLatestSubmission(newSubmission);
    setLocalSubmissionsCount((prev) => prev + 1);
    if (newSubmission.willHelpConduct === 'Yes') {
      setLocalVolunteersCount((prev) => prev + 1);
    }
    setShowSuccess(true);
  };

  return (
    <div className="min-h-screen bg-[#09090b] text-white selection:bg-brand-cyan/30">
      
      {/* Loading Splash stage */}
      <Splash onComplete={() => setShowSplash(false)} />

      {/* Main page bundle */}
      {!showSplash && (
        <motion.div
          id="main-applet-content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Glass floating navigation bar */}
          <Navbar activeSection={activeSection} onNavigate={handleNavigate} />

          {/* Core Interactive Page Layout Sections */}
          <main>
            {/* Cinematic landing hero */}
            <Hero onCtaClick={() => handleNavigate('submit-idea')} />

            {/* PULSE Forum overview narrative */}
            <About />

            {/* Grid showcasing contribution benefits */}
            <WhyContribute />

            {/* Dynamic statistics counter dashboard */}
            <LiveStatistics
              localSubmissionsCount={localSubmissionsCount}
              localVolunteersCount={localVolunteersCount}
            />

            {/* Secure Google Form integrated submission drawer */}
            <SubmissionForm
              onSuccess={handleSubmissionSuccess}
            />

            {/* Accordion FAQ database */}
            <FAQ />
          </main>

          {/* Premium contact and copyright sign-off */}
          <Contact />

          {/* Success card modal featuring full-screen physics-confetti engine */}
          <SuccessModal
            isOpen={showSuccess}
            submission={latestSubmission}
            onClose={() => setShowSuccess(false)}
          />

        </motion.div>
      )}

    </div>
  );
}
