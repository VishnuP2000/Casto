'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Film, ChevronDown } from 'lucide-react';
import Button from './Button';
import { useRouter } from 'next/navigation';

const navLinks = [
  { label: 'Find Talent', href: '#' },
  { label: 'Casting Calls', href: '/casting' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Pricing', href: '#' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const router=useRouter()

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={[
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[rgba(5,5,8,0.85)] backdrop-blur-xl border-b border-white/6 shadow-xl shadow-black/30'
            : 'bg-transparent',
        ].join(' ')}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f8ef7] to-[#7c5af0] flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:shadow-blue-500/50 transition-all">
              <Film size={16} className="text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              Casto
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm text-[#94a3b8] hover:text-white rounded-lg hover:bg-white/6 transition-all duration-150"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/signin"
              className="text-sm text-[#94a3b8] hover:text-white transition-colors px-3 py-2"
            >
              Sign In
            </Link>
            <Button onClick={()=>router.push('/casting')} size="sm" variant="primary">
              
              Get Started
            </Button>
            <Button onClick={()=>router.push('/profile')}  size="sm" variant="gradient">
              
              profile
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-[#94a3b8] hover:text-white"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 bg-[rgba(5,5,8,0.97)] backdrop-blur-xl border-b border-white/8 px-6 py-4 md:hidden"
          >
            <nav className="flex flex-col gap-1 mb-4">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-4 py-3 text-sm text-[#94a3b8] hover:text-white rounded-xl hover:bg-white/6 transition-all"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="flex flex-col gap-2 border-t border-white/8 pt-4">
              <Link
                href="/signin"
                className="text-center py-2.5 text-sm text-[#94a3b8] hover:text-white"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
              <Button variant="primary" size="md" className="w-full justify-center">
                Get Started Free
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
