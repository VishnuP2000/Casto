'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import Button from '../Button';

export default function CTA() {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Gradient BG */}
      <div className="absolute inset-0 animated-gradient opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-[#050508]/70 pointer-events-none" />

      {/* Glow orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.12, 0.22, 0.12] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-[#4f8ef7] blur-[140px] pointer-events-none"
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center gap-6"
        >
          {/* Label */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#9b7ef8]/30 bg-[#9b7ef8]/10 text-xs font-medium text-[#9b7ef8]">
            <Sparkles size={12} />
            Start for Free — No Credit Card Required
          </div>

          {/* Headline */}
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
            Ready to land your{' '}
            <span className="gradient-text">dream role?</span>
          </h2>

          <p className="text-lg text-[#64748b] max-w-xl leading-relaxed">
            Join 50,000+ artists and 1,200+ production houses already using Casto. Your next big break is waiting.
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 mt-2">
            <Link href="/signup">
              <Button
                size="lg"
                variant="primary"
                rightIcon={<ArrowRight size={18} />}
              >
                Join as Artist — Free
              </Button>
            </Link>
            <Link href="#" >
              <Button size="lg" variant="secondary">
                Post a Casting Call
              </Button>
            </Link>
          </div>

          {/* Social Proof */}
          <div className="flex items-center gap-2 text-sm text-[#475569]">
            <div className="flex -space-x-2">
              {['#4f8ef7', '#9b7ef8', '#ec4899', '#10b981'].map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-full border-2 border-[#050508]"
                  style={{ background: `${color}44`, borderColor: '#050508', outline: `1px solid ${color}40` }}
                />
              ))}
            </div>
            <span>Join 50,000+ artists already on Casto</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
