/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Cpu, Sparkles } from 'lucide-react';

interface SplashProps {
  onComplete: () => void;
}

export default function Splash({ onComplete }: SplashProps) {
  const [progress, setProgress] = useState(0);
  const [captionIndex, setCaptionIndex] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  const captions = [
    'Preparing an unforgettable orientation experience...',
    'Connecting senior visionary mentors across ECE...',
    'Designing collaborative engineering stages...',
    'Igniting creativity, teamwork, and leadership...',
    'Launching the PULSE CEA Orientation Hub...'
  ];

  // Progress simulation
  useEffect(() => {
    const duration = 2800; // 2.8 seconds total loading
    const intervalTime = 40;
    const steps = duration / intervalTime;
    const increment = 100 / steps;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Wait a brief moment before triggering exit
          setTimeout(() => {
            setIsExiting(true);
          }, 300);
          return 100;
        }
        return Math.min(prev + increment, 100);
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, []);

  // Caption cycling
  useEffect(() => {
    const captionTimer = setInterval(() => {
      setCaptionIndex((prev) => (prev + 1) % captions.length);
    }, 600);

    return () => clearInterval(captionTimer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isExiting && (
        <motion.div
          id="splash-screen"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#09090b] overflow-hidden"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated gradient mesh background */}
          <div className="absolute inset-0 opacity-40">
            <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-gradient-to-tr from-brand-orange/30 to-transparent blur-[120px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-brand-blue/20 to-transparent blur-[150px] animate-pulse delay-75" />
          </div>

          {/* Floating particle systems */}
          <div className="absolute inset-0 z-0">
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-30"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -100, 0],
                  opacity: [0.1, 0.7, 0.1],
                  scale: [1, 1.5, 1],
                }}
                transition={{
                  duration: 5 + Math.random() * 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: Math.random() * 5,
                }}
              />
            ))}
          </div>

          {/* Centered Logo Container */}
          <div className="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
            
            {/* Pulsing ring and Logo wrapper */}
            <div className="relative flex items-center justify-center w-36 h-36 mb-8">
              {/* Spinning outer orange-amber ring */}
              <motion.div
                className="absolute inset-0 rounded-full border border-dashed border-brand-orange/40"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              />
              
              {/* Outer pulsing neon orange shadow ring */}
              <motion.div
                className="absolute inset-2 rounded-full border-2 border-brand-orange/30 shadow-[0_0_35px_rgba(249,115,22,0.3)]"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />

              {/* PULSE CEA Geometric Logo Placeholder */}
              <motion.div
                className="relative z-10 flex items-center justify-center w-24 h-24 rounded-full bg-black border border-white/10 backdrop-blur-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {/* Visual pulse waveforms representing electronics and engineering */}
                <div className="flex items-end justify-center gap-[4px] h-10 w-16">
                  <motion.div className="w-1 bg-brand-orange rounded-full" animate={{ height: [8, 28, 8] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.1 }} />
                  <motion.div className="w-1 bg-brand-amber rounded-full" animate={{ height: [12, 38, 12] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.2 }} />
                  <motion.div className="w-1 bg-brand-blue rounded-full" animate={{ height: [16, 20, 16] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.3 }} />
                  <motion.div className="w-1 bg-brand-orange rounded-full" animate={{ height: [24, 40, 24] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.4 }} />
                  <motion.div className="w-1 bg-brand-blue rounded-full" animate={{ height: [10, 24, 10] }} transition={{ duration: 0.8, repeat: Infinity, delay: 0.5 }} />
                </div>
                
                <div className="absolute bottom-2 text-[10px] font-mono tracking-widest text-white/50 font-bold uppercase">
                  PULSE
                </div>
              </motion.div>
            </div>

            {/* PULSE CEA Orientation Branding */}
            <motion.h1
              className="text-3xl font-extrabold tracking-tight text-white mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              PULSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber">CEA</span>
            </motion.h1>

            <motion.div
              className="flex items-center gap-1 text-[11px] font-mono uppercase tracking-[0.3em] text-zinc-400 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.8 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Cpu className="w-3.5 h-3.5 text-brand-orange animate-pulse" />
              <span>Orientation Idea Hub</span>
              <Sparkles className="w-3.5 h-3.5 text-brand-amber" />
            </motion.div>

            {/* Smooth Progress Ticker */}
            <div className="w-64 h-[4px] rounded-full bg-white/5 overflow-hidden mb-4">
              <motion.div
                className="h-full bg-gradient-to-r from-brand-orange to-brand-amber"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut' }}
              />
            </div>

            {/* Ticker percentage indicator */}
            <div className="text-xs font-mono text-zinc-500 mb-2">
              {Math.round(progress)}% CONNECTED
            </div>

            {/* Caption Cycling with soft transitions */}
            <div className="h-6 overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.p
                  key={captionIndex}
                  className="text-xs text-zinc-400 font-medium italic"
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -15, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {captions[captionIndex]}
                </motion.p>
              </AnimatePresence>
            </div>

          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
