'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Film, Home } from 'lucide-react';

// ─── Minimal Auth Navbar ───────────────────────────────────────────────────────
function AuthNavbar() {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 h-14">
      <Link href="/" className="flex items-center gap-2 group">
        <motion.div
          whileHover={{ rotate: 15, scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400 }}
          className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#4f8ef7] to-[#7c5af0] flex items-center justify-center shadow-md shadow-blue-500/30"
        >
          <Film size={14} className="text-white" />
        </motion.div>
        <span className="text-sm font-bold text-white tracking-tight">Casto</span>
      </Link>
      <Link
        href="/"
        className="flex items-center gap-1.5 text-xs text-[#64748b] hover:text-white transition-colors group"
      >
        <Home size={13} className="group-hover:text-[#4f8ef7] transition-colors" />
        Back to Home
      </Link>
    </div>
  );
}

// ─── Animated Background ───────────────────────────────────────────────────────
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-[#050508]" />

      {/* Animated orbs */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -40, 0], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-[-10%] left-[-5%] w-[700px] h-[700px] rounded-full bg-[#4f8ef7] blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, -50, 0], y: [0, 60, 0], opacity: [0.06, 0.14, 0.06] }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full bg-[#9b7ef8] blur-[120px]"
      />
      <motion.div
        animate={{ x: [0, 40, 0], y: [0, -30, 0], opacity: [0.04, 0.10, 0.04] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 6 }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#ec4899] blur-[140px]"
      />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />
    </div>
  );
}

// ─── Left Panel (cinematic illustration side) ──────────────────────────────────
interface LeftPanelProps {
  headline: string;
  subtext: string;
}

function LeftPanel({ headline, subtext }: LeftPanelProps) {
  const floaters = [
    { label: 'Lead Role', sub: 'Netflix Original', delay: 0, x: '10%', y: '20%' },
    { label: 'Profile Verified ✓', sub: 'Aanya Sharma', delay: 0.3, x: '55%', y: '35%' },
    { label: '348 Live Auditions', sub: 'Apply now →', delay: 0.6, x: '20%', y: '62%' },
    { label: '₹30L / Project', sub: 'Dharma Productions', delay: 0.9, x: '52%', y: '72%' },
  ];

  return (
    <div className="relative hidden lg:flex flex-col items-start justify-center h-full px-14 xl:px-20 overflow-hidden">
      {/* Spotlight */}
      <div className="absolute top-0 left-1/4 w-[300px] h-[600px] bg-gradient-to-b from-[#4f8ef7]/10 to-transparent rotate-12 blur-2xl pointer-events-none" />

      {/* Big clapperboard icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="absolute top-[12%] right-[8%] w-32 h-32 rounded-3xl bg-gradient-to-br from-[#4f8ef7]/20 to-[#9b7ef8]/20 border border-white/8 backdrop-blur-sm flex items-center justify-center"
      >
        <Film size={56} className="text-[#4f8ef7]" />
      </motion.div>

      {/* Floating info cards */}
      {floaters.map((f, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4 + f.delay }}
        >
          <motion.div
            animate={{ y: [0, i % 2 === 0 ? -10 : 10, 0] }}
            transition={{ duration: 4 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
            className="absolute"
            style={{ left: f.x, top: f.y }}
          >
            <div className="px-3 py-2 rounded-xl bg-[#0d0d14]/90 border border-white/10 backdrop-blur-xl shadow-xl min-w-[140px]">
              <p className="text-xs font-semibold text-white">{f.label}</p>
              <p className="text-[10px] text-[#64748b] mt-0.5">{f.sub}</p>
            </div>
          </motion.div>
        </motion.div>
      ))}

      {/* Headline */}
      <div className="relative z-10 max-w-sm mt-auto mb-16">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#4f8ef7] mb-3">
            India&apos;s Premier Casting Platform
          </p>
          <h2 className="text-3xl xl:text-4xl font-extrabold text-white leading-tight mb-3">
            {headline}
          </h2>
          <p className="text-sm text-[#64748b] leading-relaxed">{subtext}</p>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex gap-6 mt-8 border-t border-white/6 pt-6"
        >
          {[
            { v: '50K+', l: 'Artists' },
            { v: '8.5K+', l: 'Castings' },
            { v: '1.2K+', l: 'Studios' },
          ].map((s) => (
            <div key={s.l}>
              <div className="text-xl font-bold gradient-text">{s.v}</div>
              <div className="text-xs text-[#475569]">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Main AuthLayout ───────────────────────────────────────────────────────────
interface AuthLayoutProps {
  children: React.ReactNode;
  leftHeadline: string;
  leftSubtext: string;
}

export default function AuthLayout({ children, leftHeadline, leftSubtext }: AuthLayoutProps) {
  return (
    <div className="relative min-h-screen bg-[#050508] text-white overflow-hidden">
      <AnimatedBackground />
      <AuthNavbar />

      <div className="relative z-10 min-h-screen grid lg:grid-cols-2">
        <LeftPanel headline={leftHeadline} subtext={leftSubtext} />

        {/* Right: Auth Card */}
        <div className="flex items-center justify-center px-6 py-20 lg:py-8">
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="w-full max-w-md"
          >
            {children}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
