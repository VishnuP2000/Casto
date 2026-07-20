'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import SectionHeading from '../SectionHeading';
import { stats } from '@/lib/data';

function AnimatedNumber({ target, suffix = '' }: { target: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-50px' });
  const [display, setDisplay] = useState('0');

  useEffect(() => {
    if (!inView) return;
    const raw = target.replace(/[^0-9.]/g, '');
    const hasComma = target.includes(',');
    const end = parseFloat(raw);
    const duration = 1800;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * end);

      if (hasComma) {
        setDisplay(current.toLocaleString('en-IN'));
      } else {
        setDisplay(String(current));
      }

      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
  }, [inView, target]);

  return (
    <span ref={ref}>
      {display}{suffix}
    </span>
  );
}

export default function Statistics() {
  return (
    <section className="py-24 relative">
      {/* BG */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#4f8ef7]/4 via-[#9b7ef8]/4 to-[#ec4899]/4 pointer-events-none" />
      <div className="absolute inset-0 bg-[#050508]/80 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Platform Growth"
          title="Trusted by thousands"
          gradientTitle="across India"
          subtitle="Join a growing community of artists and production teams redefining the casting industry."
        />

        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center text-center gap-2 p-6 rounded-2xl bg-[#0d0d14] border border-white/8"
            >
              <div className="text-4xl sm:text-5xl font-extrabold gradient-text">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="text-base font-semibold text-white">{stat.label}</div>
              <div className="text-xs text-[#475569]">{stat.description}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
