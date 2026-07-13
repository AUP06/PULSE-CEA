/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Cpu, Users, Calendar, Award } from 'lucide-react';

export default function About() {
  const highlights = [
    {
      icon: Cpu,
      title: 'PULSE CEA Forum',
      description: 'The official forum of ECE Department, open to all CEA students to submit their ideas.'
    },
    {
      icon: Users,
      title: 'Multidisciplinary Reach',
      description: 'Welcoming all departments including CS, Mechanical, Civil, Electrical, and ECE into a unified engineering culture.'
    },
    {
      icon: Calendar,
      title: 'Freshman Orientation 2026',
      description: 'Designing high-energy icebreakers, live stage shows, tech demos, and team-building adventures.'
    },
    {
      icon: Award,
      title: 'Core Organizing Team',
      description: 'Outstanding contributors get directly inducted into the core planning executive board with official certification.'
    }
  ];

  return (
    <section
      id="about"
      className="relative py-24 px-6 bg-[#030303] border-t border-white/5 overflow-hidden"
    >
      {/* Decorative gradient accents */}
      <div className="absolute top-[20%] left-[-10%] w-[300px] h-[300px] rounded-full bg-brand-orange/5 blur-[100px]" />
      <div className="absolute bottom-[20%] right-[-10%] w-[350px] h-[350px] rounded-full bg-brand-blue/5 blur-[120px]" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Dynamic narrative copy */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            <motion.div
              className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-orange text-xs font-mono font-bold uppercase tracking-widest mb-6"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Cpu className="w-3.5 h-3.5" />
              <span>THE FORUM INVITATION</span>
            </motion.div>

            <motion.h2
              className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-white mb-6 leading-tight uppercase"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Unite all disciplines. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/40 text-glow-orange">
                Design the first day.
              </span>
            </motion.h2>

            <motion.p
              className="text-base sm:text-lg text-white/60 font-light leading-relaxed mb-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <strong>PULSE CEA</strong> is inviting creative orientation proposals from all senior CEA students (S2, S4, S6, and S8 batches across all branches) to help shape an extraordinary welcoming experience for our incoming first-year engineers.
            </motion.p>

            <motion.p
              className="text-base text-white/50 font-light leading-relaxed mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Since the orientation program welcomes students across all engineering branches (Computer Science, Mechanical, Civil, Electrical, etc.), our design scope spans the universe of <strong>teamwork, design innovation, theatrical spectacles, campus exploration, and leadership.</strong> Showcase your batch's legacy, inspire future peers, and earn your spot in the official Organizing Team!
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <a
                id="about-cta-submit"
                href="#submit-idea"
                className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-black font-bold text-xs uppercase tracking-widest hover:scale-105 transition-all duration-300"
              >
                Draft Submission
              </a>
              <a
                id="about-cta-why"
                href="#why-contribute"
                className="px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-white/80 font-bold text-xs uppercase tracking-widest hover:bg-white/10 transition-colors duration-300"
              >
                Why Contribute?
              </a>
            </motion.div>
          </div>

          {/* Right Column - Highlighted Grid of attributes */}
          <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {highlights.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <motion.div
                  key={index}
                  id={`about-highlight-${index}`}
                  className="glass-panel p-6 rounded-2xl flex gap-4 text-left border-white/10 hover:border-brand-orange/30 transition-all duration-300"
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand-orange/10 border border-brand-orange/20 flex items-center justify-center text-brand-orange">
                    <IconComponent className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-base mb-1">{item.title}</h3>
                    <p className="text-white/40 text-xs leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
