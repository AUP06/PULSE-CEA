/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ArrowUpRight, Cpu } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'why-contribute', label: 'Why Contribute' },
    { id: 'submit-idea', label: 'Submit Idea' },
    { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Contact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (id: string) => {
    setIsOpen(false);
    onNavigate(id);
  };

  return (
    <>
      <motion.nav
        id="main-nav"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 px-4 md:px-8 py-4 ${
          scrolled ? 'top-2' : 'top-0'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        <div
          className={`max-w-7xl mx-auto rounded-full transition-all duration-500 ${
            scrolled
              ? 'bg-white/5 backdrop-blur-2xl border border-white/10 shadow-[0_15px_30px_rgba(0,0,0,0.5)] px-6 py-3'
              : 'bg-transparent border-b border-transparent px-4 py-4'
          } flex items-center justify-between`}
        >
          {/* Logo Brand */}
          <button
            id="nav-logo"
            onClick={() => handleLinkClick('home')}
            className="flex items-center gap-2 text-left cursor-pointer group focus:outline-none"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white/5 border border-white/10 group-hover:border-brand-orange/50 transition-all duration-300">
              {/* Micro wave logo representation */}
              <div className="flex items-end gap-[2px] h-4">
                <div className="w-[3px] h-2 bg-brand-orange rounded-full group-hover:h-3 transition-all duration-300" />
                <div className="w-[3px] h-4 bg-brand-amber rounded-full group-hover:h-2 transition-all duration-300" />
                <div className="w-[3px] h-3 bg-brand-blue rounded-full group-hover:h-4 transition-all duration-300" />
              </div>
            </div>
            <div>
              <span className="font-black text-lg tracking-tight text-white block">
                PULSE <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber">CEA</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block -mt-1 font-semibold">
                ORIENTATION HUB
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  id={`nav-link-${link.id}`}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 focus:outline-none cursor-pointer ${
                    isActive ? 'text-white' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-nav-pill"
                      className="absolute inset-0 bg-white/10 border border-white/10 rounded-full z-[-1] backdrop-blur-xl"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  {link.label}
                </button>
              );
            })}
          </div>

          {/* Call to action "Submit" on Desktop */}
          <div className="hidden lg:block">
            <button
              id="cta-nav-submit"
              onClick={() => handleLinkClick('submit-idea')}
              className="flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-brand-orange to-brand-amber text-sm font-bold text-black hover:scale-105 transition-all duration-300 cursor-pointer shadow-lg shadow-brand-orange/20"
            >
              <span>Submit Idea</span>
              <ArrowUpRight className="w-4 h-4 text-black" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="lg:hidden">
            <button
              id="mobile-nav-toggle"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors focus:outline-none cursor-pointer text-white"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-drawer"
            className="fixed inset-0 z-30 lg:hidden bg-black/95 backdrop-blur-2xl flex flex-col justify-center px-8"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Background design accents */}
            <div className="absolute top-1/4 right-0 w-[300px] h-[300px] rounded-full bg-brand-orange/10 blur-[100px] pointer-events-none" />
            <div className="absolute bottom-1/4 left-0 w-[300px] h-[300px] rounded-full bg-brand-blue/10 blur-[100px] pointer-events-none" />

            <div className="flex flex-col gap-6 text-left max-w-sm mt-12">
              <div className="flex items-center gap-1 text-xs font-mono uppercase tracking-[0.2em] text-brand-orange">
                <Cpu className="w-4 h-4" />
                <span>PULSE CEA Orientation</span>
              </div>
              
              <div className="h-[2px] w-12 bg-gradient-to-r from-brand-orange to-brand-amber rounded-full" />

              <div className="flex flex-col gap-4">
                {navLinks.map((link, index) => {
                  const isActive = activeSection === link.id;
                  return (
                    <motion.button
                      key={link.id}
                      id={`mobile-link-${link.id}`}
                      onClick={() => handleLinkClick(link.id)}
                      className={`text-2xl font-bold text-left focus:outline-none cursor-pointer ${
                        isActive
                          ? 'text-transparent bg-clip-text bg-gradient-to-r from-brand-orange to-brand-amber'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 + 0.1 }}
                    >
                      {link.label}
                    </motion.button>
                  );
                })}
              </div>

              <motion.div
                className="mt-6 pt-6 border-t border-white/5"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <button
                  id="mobile-drawer-submit"
                  onClick={() => handleLinkClick('submit-idea')}
                  className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-gradient-to-r from-brand-orange to-brand-amber text-base font-bold text-black shadow-xl shadow-brand-orange/10"
                >
                  <span>Submit Your Idea</span>
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
