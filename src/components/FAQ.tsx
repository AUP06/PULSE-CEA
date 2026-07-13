/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HelpCircle, ChevronDown, ChevronUp, Cpu } from 'lucide-react';
import { FAQ_ITEMS } from '../constants';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>('faq-1'); // Open first faq by default
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'General' | 'Submissions' | 'Team' | 'Technical'>('All');

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  const filteredFaqs = FAQ_ITEMS.filter((faq) => {
    return selectedCategory === 'All' || faq.category === selectedCategory;
  });

  return (
    <section
      id="faq"
      className="relative py-24 px-6 bg-[#030303] border-t border-white/5 overflow-hidden"
    >
      {/* Dynamic ambient lights */}
      <div className="absolute top-[20%] right-[-10%] w-[300px] h-[300px] rounded-full bg-brand-orange/5 blur-[90px] pointer-events-none" />
      <div className="absolute bottom-[20%] left-[-10%] w-[350px] h-[350px] rounded-full bg-brand-blue/5 blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="max-w-2xl mx-auto text-center mb-16 flex flex-col items-center">
          <motion.div
            className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-brand-orange text-xs font-mono font-bold uppercase tracking-widest mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span>INFORMATIONAL FAQS</span>
          </motion.div>
          
          <motion.h2
            className="text-3xl sm:text-5xl font-extrabold tracking-tighter text-white mb-6 uppercase"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.p
            className="text-white/50 font-light text-base sm:text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Have queries about how the Orientation Idea Hub functions or the organizing structure? Look here.
          </motion.p>
        </div>

        {/* Category filtering pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
          {(['All', 'General', 'Submissions', 'Team', 'Technical'] as const).map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`faq-filter-${cat}`}
                onClick={() => {
                  setSelectedCategory(cat);
                  setOpenId(null); // Close active to avoid jumping
                }}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-brand-orange to-brand-amber text-black border-transparent shadow-lg shadow-brand-orange/20'
                    : 'bg-white/5 border-white/10 text-white/60 hover:text-white hover:bg-white/10'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          <AnimatePresence mode="popLayout">
            {filteredFaqs.map((faq, index) => {
              const isOpen = openId === faq.id;
              return (
                <motion.div
                  key={faq.id}
                  id={`faq-accordion-${faq.id}`}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-white/5 border-brand-orange/30 shadow-lg shadow-brand-orange/5'
                      : 'bg-white/5 border-white/10 hover:border-white/20'
                  }`}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  layout
                >
                  <button
                    id={`faq-btn-${faq.id}`}
                    onClick={() => handleToggle(faq.id)}
                    className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none cursor-pointer"
                  >
                    <div className="flex items-center gap-3.5 pr-4">
                      <HelpCircle className={`w-5 h-5 flex-shrink-0 transition-colors ${isOpen ? 'text-brand-orange' : 'text-white/40'}`} />
                      <span className="font-bold text-white text-sm sm:text-base tracking-tight">
                        {faq.question}
                      </span>
                    </div>
                    <div>
                      {isOpen ? (
                        <ChevronUp className="w-5 h-5 text-brand-orange" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-white/40" />
                      )}
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${faq.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="border-t border-white/5 bg-black/20"
                      >
                        <div className="px-6 py-5 text-white/60 text-xs sm:text-sm font-light leading-relaxed space-y-2">
                          <p>{faq.answer}</p>
                          <div className="flex items-center gap-1.5 pt-3">
                            <span className="text-[10px] font-mono text-brand-orange uppercase tracking-widest bg-white/5 px-2 py-0.5 rounded-md font-bold">
                              {faq.category} Section
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
