/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Lightbulb, Compass, Rocket, GraduationCap } from 'lucide-react';

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Spotlight follow effect
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center bg-[#09090b] px-6 py-24 overflow-hidden"
    >
      {/* Premium Spotlight Follow Background Effect */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300 opacity-80"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(249, 115, 22, 0.08) 0%, rgba(37, 99, 235, 0.04) 50%, transparent 100%)`,
        }}
      />

      {/* Persistent gradient meshes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-brand-orange/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] bg-brand-blue/5 rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent rotate-12" />
      </div>

      {/* Floating Abstract Engineering Symbols (Campus Life, Teamwork, Design) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        
        {/* Concept element: Rocket / Innovation */}
        <motion.div
          className="absolute top-[20%] left-[10%] opacity-20 md:opacity-30 bg-white/5 p-4 rounded-2xl border border-white/10 text-brand-cyan"
          animate={{
            y: [0, -15, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Rocket className="w-10 h-10" />
        </motion.div>

        {/* Concept element: Compass / Orientation Direction */}
        <motion.div
          className="absolute bottom-[20%] left-[15%] opacity-20 md:opacity-30 bg-white/5 p-4 rounded-2xl border border-white/10 text-brand-purple"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Compass className="w-12 h-12" />
        </motion.div>

        {/* Concept element: Idea Bulb */}
        <motion.div
          className="absolute top-[25%] right-[12%] opacity-20 md:opacity-30 bg-white/5 p-4 rounded-2xl border border-white/10 text-yellow-400"
          animate={{
            y: [0, -25, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        >
          <Lightbulb className="w-11 h-11 animate-pulse" />
        </motion.div>

        {/* Concept element: Graduation Cap / Freshmen Batch */}
        <motion.div
          className="absolute bottom-[25%] right-[15%] opacity-20 md:opacity-30 bg-white/5 p-4 rounded-2xl border border-white/10 text-pink-400"
          animate={{
            y: [0, 15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        >
          <GraduationCap className="w-10 h-10" />
        </motion.div>

        {/* Atmospheric grid lines representation */}
        <div 
          className="absolute inset-0 opacity-[0.02]" 
          style={{
            backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />
      </div>

      {/* Cinematic Hero Content */}
      <div className="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto px-4 mt-12">
        
        {/* Animated Badge */}
        <motion.div
          className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="flex h-2 w-2 rounded-full bg-brand-orange animate-pulse" />
          <span className="text-xs font-mono font-bold uppercase tracking-widest text-white/75">
            Idea Submission Live • Open to all CEA Students
          </span>
        </motion.div>

        {/* Main Event Headline */}
        <motion.h1
          className="text-5xl sm:text-7xl md:text-8xl font-extrabold tracking-tighter text-white leading-[0.95] mb-6 uppercase"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        >
          PULSE CEA <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 text-glow-orange">
            Orientation Hub
          </span>
        </motion.h1>

        {/* Elegant Subtitle */}
        <motion.p
          className="text-base sm:text-lg md:text-xl text-white/55 font-light max-w-2xl leading-relaxed mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          Help us design an unforgettable engineering initiation. We're looking for creative, bold, and interactive activities to welcome the next generation of innovators.
        </motion.p>

        {/* Core Call to Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <button
            id="hero-submit-cta"
            onClick={onCtaClick}
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-sm font-bold text-black uppercase tracking-widest shadow-lg shadow-brand-orange/20 active:scale-95 transition-all duration-300 cursor-pointer"
          >
            Submit Your Idea
          </button>
          
          <a
            id="hero-explore-cta"
            href="#about"
            className="w-full sm:w-auto px-8 py-4 rounded-xl bg-white/5 border border-white/10 text-sm font-bold text-white/80 uppercase tracking-widest hover:bg-white/10 hover:text-white transition-all duration-300 backdrop-blur-xl text-center"
          >
            Explore Forum
          </a>
        </motion.div>

        {/* Scrolling Indicator Animation */}
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          transition={{ delay: 0.6, duration: 1 }}
          onClick={() => {
            document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
          }}
        >
          <span className="text-[10px] font-mono tracking-[0.3em] uppercase text-zinc-500 font-bold">
            Scroll to discover
          </span>
          <motion.div
            className="flex items-center justify-center w-8 h-8 rounded-full border border-white/10 text-zinc-400 hover:text-white"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
