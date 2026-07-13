/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { motion } from 'motion/react';
import { Mail, Phone, Instagram, Linkedin, Youtube, Github, Cpu } from 'lucide-react';
import { DEFAULT_PULSE_CONFIG } from '../constants';

export default function Contact() {
  const config = DEFAULT_PULSE_CONFIG;

  return (
    <footer
      id="contact"
      className="relative pt-24 pb-12 px-6 bg-[#030303] border-t border-white/5 overflow-hidden text-left"
    >
      {/* Subtle atmospheric glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] rounded-full bg-brand-orange/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          
          {/* Column 1: Brand details (4 cols) */}
          <div className="md:col-span-5 space-y-6">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10">
                {/* Wave representation */}
                <div className="flex items-end gap-[2px] h-4">
                  <div className="w-[3px] h-2 bg-brand-orange rounded-full" />
                  <div className="w-[3px] h-4 bg-brand-amber rounded-full" />
                  <div className="w-[3px] h-3 bg-brand-blue rounded-full" />
                </div>
              </div>
              <div>
                <span className="font-extrabold text-lg tracking-tight text-white block uppercase">
                  PULSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber font-black">CEA</span>
                </span>
                <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase block -mt-1 font-semibold">
                  ORIENTATION HUB
                </span>
              </div>
            </div>

            <p className="text-white/50 text-xs sm:text-sm font-light leading-relaxed max-w-sm">
              The official student forum of the Department of Electronics and Communication Engineering, College of Engineering Adoor (CEA). Fostering creativity, innovation, and leadership since inception.
            </p>

            <div className="text-[11px] font-mono text-white/30 uppercase tracking-wider font-bold">
              Official Forum of the Department of ECE
            </div>
          </div>

          {/* Column 2: Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Forum Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm font-light">
              {['Home', 'About', 'Why Contribute', 'Categories', 'Submit Idea', 'FAQ'].map((link) => {
                const sectionId = link.toLowerCase().replace(' ', '-');
                return (
                  <li key={link}>
                    <a
                      href={`#${sectionId}`}
                      className="text-white/50 hover:text-brand-orange transition-all duration-300"
                    >
                      {link}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Column 3: Contact & Social Handles (4 cols) */}
          <div className="md:col-span-4 space-y-6">
            <h4 className="text-white font-bold text-sm tracking-wider uppercase">
              Get in Touch
            </h4>
            
            <div className="space-y-3.5">
              <a
                href={`mailto:${config.contactEmail}`}
                className="flex items-center gap-3 text-xs sm:text-sm text-white/50 hover:text-white transition-all duration-300"
              >
                <Mail className="w-4 h-4 text-brand-orange" />
                <span className="font-mono">{config.contactEmail}</span>
              </a>
              <a
                href={`tel:${config.contactPhone.replace(/\s+/g, '')}`}
                className="flex items-center gap-3 text-xs sm:text-sm text-white/50 hover:text-white transition-all duration-300"
              >
                <Phone className="w-4 h-4 text-brand-amber" />
                <span className="font-mono">{config.contactPhone}</span>
              </a>
            </div>

            {/* Social handles */}
            <div className="space-y-3">
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest block font-bold">
                Follow PULSE ECE
              </span>
              <div className="flex items-center gap-3.5">
                {config.socials.instagram && (
                  <a
                    href={config.socials.instagram}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="Instagram Handle"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-brand-orange/50 hover:text-brand-orange flex items-center justify-center text-white/50 transition-all duration-300"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {config.socials.linkedin && (
                  <a
                    href={config.socials.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn Handle"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-brand-orange/50 hover:text-brand-orange flex items-center justify-center text-white/50 transition-all duration-300"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {config.socials.youtube && (
                  <a
                    href={config.socials.youtube}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="YouTube Channel"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-brand-orange/50 hover:text-brand-orange flex items-center justify-center text-white/50 transition-all duration-300"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
                {config.socials.github && (
                  <a
                    href={config.socials.github}
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub Repository"
                    className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 hover:border-brand-orange/50 hover:text-brand-orange flex items-center justify-center text-white/50 transition-all duration-300"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>

        {/* Sponsor/College logo layouts area (Empty placeholder styled elegantly) */}
        <div className="pt-8 pb-4 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-white/30 uppercase font-semibold">
              COLLEGE OF ENGINEERING ADOOR
            </span>
          </div>
          {/* Sponsors grid representation */}
          <div className="flex items-center gap-6 opacity-30">
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase select-none">
              CEA ECE LABS
            </span>
            <span className="text-xs font-mono font-bold tracking-widest text-white uppercase select-none">
              IHRD INSTITUTION
            </span>
          </div>
        </div>

        {/* Closing copyright credits statement */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/30 font-semibold uppercase tracking-wider">
          <div>
            © {new Date().getFullYear()} PULSE CEA. All Rights Reserved.
          </div>
          <div className="flex items-center gap-1">
            <span>Designed with ❤️ by</span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber font-extrabold tracking-widest">
              PULSE CEA
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
