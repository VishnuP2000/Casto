'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { companies } from '@/lib/data';

export default function TrustedCompanies() {
  // Duplicate for seamless loop
  const items = [...companies, ...companies];

  return (
    <section className="py-16 border-y border-white/6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 mb-8">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-xs font-semibold uppercase tracking-widest text-[#334155]"
        >
          Trusted by India&apos;s leading production houses
        </motion.p>
      </div>

      {/* Marquee */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[#050508] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[#050508] to-transparent z-10 pointer-events-none" />

        <div className="marquee-track">
          {items.map((company, i) => (
            <div
              key={`${company.id}-${i}`}
              className="flex items-center gap-3 mx-10 flex-shrink-0"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f8ef7]/20 to-[#9b7ef8]/20 border border-white/8 flex items-center justify-center">
                <span className="text-[#4f8ef7] font-bold text-xs">
                  {company.logo.charAt(0)}
                </span>
              </div>
              <span className="text-[#334155] font-medium text-sm whitespace-nowrap hover:text-[#64748b] transition-colors">
                {company.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
