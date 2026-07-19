'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { faqs } from '@/lib/data';

export default function FAQ() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-24 relative">
      <div className="max-w-3xl mx-auto px-6">
        <SectionHeading
          label="FAQ"
          title="Frequently asked"
          gradientTitle="questions"
          subtitle="Everything you need to know about Casto."
        />

        <div className="mt-14 flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const isOpen = openId === faq.id;
            return (
              <motion.div
                key={faq.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-20px' }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={[
                  'rounded-2xl border overflow-hidden transition-colors duration-200',
                  isOpen
                    ? 'border-[rgba(79,142,247,0.3)] bg-[#0d0d14]'
                    : 'border-white/8 bg-[#0d0d14] hover:border-white/14',
                ].join(' ')}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span
                    className={[
                      'text-sm font-medium transition-colors',
                      isOpen ? 'text-white' : 'text-[#94a3b8]',
                    ].join(' ')}
                  >
                    {faq.question}
                  </span>
                  <div
                    className={[
                      'w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 transition-all',
                      isOpen
                        ? 'bg-[#4f8ef7]/20 text-[#4f8ef7]'
                        : 'bg-white/6 text-[#64748b]',
                    ].join(' ')}
                  >
                    {isOpen ? <Minus size={12} /> : <Plus size={12} />}
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-5 text-sm text-[#64748b] leading-relaxed border-t border-white/6 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
