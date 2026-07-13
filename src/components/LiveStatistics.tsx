/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lightbulb, Users, HandMetal, FileCheck } from 'lucide-react';
import { DEFAULT_STATS } from '../constants';
import { AppStatistic } from '../types';

interface LiveStatisticsProps {
  localSubmissionsCount: number;
  localVolunteersCount: number;
}

// Map stats icons
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Lightbulb,
  Users,
  HandMetal,
  FileCheck
};

export default function LiveStatistics({
  localSubmissionsCount,
  localVolunteersCount
}: LiveStatisticsProps) {
  const [stats, setStats] = useState<AppStatistic[]>(DEFAULT_STATS);
  const [animatedValues, setAnimatedValues] = useState<Record<string, number>>({});

  // Compute final values by merging base static statistics with current session's local submissions
  useEffect(() => {
    setStats((prevStats) =>
      prevStats.map((s) => {
        if (s.id === 'total-submitted') {
          return { ...s, value: DEFAULT_STATS[0].value + localSubmissionsCount };
        }
        if (s.id === 'contributors' && localSubmissionsCount > 0) {
          // Assume unique contributor count increases slightly with local submissions
          return { ...s, value: DEFAULT_STATS[1].value + Math.max(1, Math.round(localSubmissionsCount * 0.8)) };
        }
        if (s.id === 'volunteers') {
          return { ...s, value: DEFAULT_STATS[2].value + localVolunteersCount };
        }
        return s;
      })
    );
  }, [localSubmissionsCount, localVolunteersCount]);

  // Handle native count-up animation
  useEffect(() => {
    const animationDuration = 1200; // 1.2s animation
    const steps = 30;
    const intervalTime = animationDuration / steps;

    const timer = setInterval(() => {
      setAnimatedValues((prev) => {
        const next = { ...prev };
        let finished = true;

        stats.forEach((s) => {
          const target = s.value;
          const current = prev[s.id] || 0;
          if (current < target) {
            const diff = target - current;
            const increment = Math.ceil(diff / 5); // Decelerating count up
            next[s.id] = Math.min(current + increment, target);
            finished = false;
          } else {
            next[s.id] = target;
          }
        });

        if (finished) {
          clearInterval(timer);
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [stats]);

  return (
    <section
      id="live-statistics"
      className="relative py-24 px-6 bg-[#030303] border-t border-white/5 overflow-hidden"
    >
      {/* Decorative ambient lighting */}
      <div className="absolute top-[20%] left-[-10%] w-[350px] h-[350px] bg-brand-orange/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[130px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 flex flex-col items-center">
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-orange text-xs font-mono font-bold uppercase tracking-widest mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span>REAL-TIME METRICS</span>
          </motion.div>
          
          <motion.h2
            className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-white mb-6 uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Orientation Impact Dashboard
          </motion.h2>
          
          <motion.p
            className="text-white/50 font-light text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our orientation strategy grows with each contribution. Watch our collective metrics expand live.
          </motion.p>
        </div>

        {/* Counters Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => {
            const IconComponent = iconMap[stat.iconName] || Lightbulb;
            const displayValue = animatedValues[stat.id] || 0;

            return (
              <motion.div
                key={stat.id}
                id={`stat-counter-${stat.id}`}
                className="glass-panel p-8 rounded-[24px] border border-white/10 flex flex-col items-center text-center relative overflow-hidden group hover:border-brand-orange/30 hover:bg-white/8 transition-all duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                {/* Accent neon line at top */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-brand-orange/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="w-14 h-14 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange/20 transition-all duration-300">
                  <IconComponent className="w-7 h-7" />
                </div>

                <div className="text-5xl sm:text-6xl font-black tracking-tight text-white mb-2 font-mono flex items-center justify-center">
                  <span>{stat.prefix}</span>
                  <span>{displayValue}</span>
                  <span className="text-brand-orange">{stat.suffix}</span>
                </div>

                <h3 className="font-bold text-white/80 text-sm tracking-wider uppercase mb-2">
                  {stat.label}
                </h3>

                <p className="text-white/40 text-xs font-light max-w-[200px]">
                  {stat.description}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
