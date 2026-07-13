/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Lightbulb, Compass, Users, Award, Heart, HelpCircle } from 'lucide-react';
import { WHY_CONTRIBUTE_CARDS } from '../constants';

// Local icon map for maximum performance and bundler reliability
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Sparkles,
  Lightbulb,
  Compass,
  Users,
  Award,
  Heart
};

export default function WhyContribute() {
  return (
    <section
      id="why-contribute"
      className="relative py-24 px-6 bg-[#030303] border-t border-white/5 overflow-hidden"
    >
      {/* Decorative ambient lighting */}
      <div className="absolute top-[10%] right-[-5%] w-[400px] h-[400px] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[10%] left-[-5%] w-[400px] h-[400px] rounded-full bg-brand-blue/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto text-center">
        
        {/* Header content */}
        <div className="max-w-2xl mx-auto mb-16 flex flex-col items-center">
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-orange text-[11px] font-mono uppercase tracking-[0.25em] mb-4 font-bold"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span>THE CONTRIBUTION VALUE</span>
          </motion.div>
          
          <motion.h2
            className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-white mb-6 uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Why Should You Contribute?
          </motion.h2>
          
          <motion.p
            className="text-white/50 font-light text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            We're looking for fresh and creative ideas to make our Orientation Program session engaging, fun, and memorable. Your suggestion could become part of the official session, and if selected, you may also get the opportunity to help organize and conduct the activity with PULSE CEA.
          </motion.p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {WHY_CONTRIBUTE_CARDS.map((card, index) => {
            const IconComponent = iconMap[card.iconName] || HelpCircle;
            return (
              <motion.div
                key={card.id}
                id={`why-card-${card.id}`}
                className="glass-panel p-8 rounded-[24px] border border-white/10 flex flex-col items-start text-left transition-all duration-300 relative group overflow-hidden hover:border-brand-orange/30 hover:bg-white/8"
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
              >
                {/* Visual grid light leak inside card */}
                <div className="absolute -inset-px bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none rounded-3xl" />

                <div className="w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange mb-6 group-hover:bg-brand-orange/20 transition-all duration-300">
                  <IconComponent className="w-6 h-6 text-brand-orange group-hover:scale-110 transition-transform duration-300" />
                </div>

                <h3 className="text-xl font-bold text-white mb-3 tracking-tight group-hover:text-brand-orange transition-colors">
                  {card.title}
                </h3>

                <p className="text-white/40 text-sm leading-relaxed font-light">
                  {card.description}
                </p>

                {/* Micro chevron arrow as design polish */}
                <div className="mt-6 flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-zinc-500 group-hover:text-brand-orange transition-colors uppercase">
                  <span>Explore Concept</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
