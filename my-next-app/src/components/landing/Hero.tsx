'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Play, ArrowRight, Star, BadgeCheck, Clapperboard, MapPin, Users } from 'lucide-react';
import Button from '../Button';

// Floating illustration cards
const floatingCards = [
  {
    id: 'card1',
    title: 'Lead Actress Wanted',
    subtitle: 'Netflix Original Series',
    tag: 'Web Series',
    salary: '₹2.5L/episode',
    delay: 0,
    x: 60,
    y: 10,
    rotate: 3,
  },
  {
    id: 'card2',
    title: 'Aanya Sharma',
    subtitle: 'Film Actress · Mumbai',
    tag: 'Featured',
    rating: 4.9,
    delay: 0.2,
    x: -20,
    y: 200,
    rotate: -4,
  },
  {
    id: 'card3',
    title: 'Male Lead – Vikram',
    subtitle: 'Dharma Productions',
    tag: 'Movie',
    salary: '₹30L',
    delay: 0.4,
    x: 120,
    y: 320,
    rotate: 2,
  },
];

const heroStats = [
  { label: 'Active Castings', value: '8,500+' },
  { label: 'Verified Artists', value: '50K+' },
  { label: 'Production Houses', value: '1,200+' },
];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left - rect.width / 2) / rect.width);
    mouseY.set((e.clientY - rect.top - rect.height / 2) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex items-center overflow-hidden hero-bg"
    >
      {/* Animated background orbs */}
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.08, 0.14, 0.08] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#4f8ef7] blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 40, 0], opacity: [0.06, 0.12, 0.06] }}
        transition={{ duration: 16, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full bg-[#9b7ef8] blur-[120px] pointer-events-none"
      />
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, 50, 0], opacity: [0.04, 0.09, 0.04] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
        className="absolute bottom-1/4 right-1/3 w-[400px] h-[400px] rounded-full bg-[#ec4899] blur-[120px] pointer-events-none"
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center w-full">
        {/* Left: Text Content */}
        <div className="flex flex-col gap-6">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full border border-[#4f8ef7]/30 bg-[#4f8ef7]/10 text-xs font-medium text-[#4f8ef7]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] animate-pulse" />
            India&apos;s Premier Casting Platform
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.05]"
          >
            Find Your{' '}
            <span className="gradient-text block sm:inline">
              Next Acting
            </span>
            {' '}Opportunity
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-lg text-[#64748b] max-w-lg leading-relaxed"
          >
            Connect actors, directors, casting agencies, and production houses in one modern platform. Apply for auditions, build portfolios, and get discovered.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-wrap gap-3"
          >
            <Link href="/casting">
              <Button
                size="lg"
                variant="primary"
                rightIcon={<ArrowRight size={18} />}
              >
                Explore Casting Calls
              </Button>
            </Link>
            <Link href="/signup">
              <Button size="lg" variant="secondary">
                Join as Artist
              </Button>
            </Link>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex gap-6 pt-2 border-t border-white/6 mt-2"
          >
            {heroStats.map((s) => (
              <div key={s.label} className="flex flex-col gap-0.5">
                <span className="text-xl font-bold text-white">{s.value}</span>
                <span className="text-xs text-[#475569]">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: Floating Illustration */}
        <motion.div
          style={{
            x: useTransform(springX, [-0.5, 0.5], [-15, 15]),
            y: useTransform(springY, [-0.5, 0.5], [-10, 10]),
          }}
          className="relative h-[480px] hidden lg:block"
        >
          {/* Central camera icon */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-3xl bg-gradient-to-br from-[#4f8ef7]/20 to-[#9b7ef8]/20 border border-white/10 backdrop-blur-sm flex items-center justify-center shadow-2xl shadow-blue-500/20"
          >
            <Clapperboard size={48} className="text-[#4f8ef7]" />
          </motion.div>

          {/* Floating Cards */}
          {floatingCards.map((card) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 + card.delay }}
              style={{
                position: 'absolute',
                top: card.y,
                left: card.x,
                rotate: card.rotate,
              }}
              className="float"
              {...({ style: { animationDelay: `${card.delay}s` } } as object)}
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4 + card.delay,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: card.delay,
                }}
                className="w-56 p-3 rounded-2xl bg-[#0d0d14]/90 border border-white/12 backdrop-blur-xl shadow-2xl shadow-black/50"
              >
                <div className="flex items-start gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-[#4f8ef7] to-[#7c5af0] flex items-center justify-center flex-shrink-0">
                    <Clapperboard size={15} className="text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{card.title}</p>
                    <p className="text-[10px] text-[#475569] truncate mt-0.5">{card.subtitle}</p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#4f8ef7]/15 text-[#4f8ef7] border border-[#4f8ef7]/20">
                        {card.tag}
                      </span>
                      {card.salary && (
                        <span className="text-[9px] text-[#64748b]">{card.salary}</span>
                      )}
                      {card.rating && (
                        <span className="flex items-center gap-0.5 text-[9px] text-amber-400">
                          <Star size={8} fill="currentColor" /> {card.rating}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}

          {/* Live indicator */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="absolute bottom-12 right-4 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0d0d14]/90 border border-emerald-500/20 backdrop-blur-xl"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-xs text-emerald-400 font-medium">Live Auditions</span>
            <span className="text-xs text-[#475569]">348 online</span>
          </motion.div>

          {/* Success notification */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="absolute top-8 right-8 flex items-center gap-2 px-3 py-2 rounded-xl bg-[#0d0d14]/90 border border-[#4f8ef7]/20 backdrop-blur-xl"
          >
            <BadgeCheck size={14} className="text-[#4f8ef7]" />
            <span className="text-xs text-white font-medium">Profile Verified</span>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5"
        >
          <div className="w-1 h-2 rounded-full bg-[#4f8ef7]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
