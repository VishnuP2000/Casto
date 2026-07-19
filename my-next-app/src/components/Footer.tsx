'use client';

import React from 'react';
import Link from 'next/link';
import { Film, Mail, Link2, ExternalLink, Globe, Rss } from 'lucide-react';

const footerLinks = {
  Platform: [
    { label: 'Casting Calls', href: '/casting' },
    { label: 'Artist Profiles', href: '#' },
    { label: 'Production Houses', href: '#' },
    { label: 'Pricing', href: '#' },
  ],
  Company: [
    { label: 'About Us', href: '#' },
    { label: 'Blog', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
  ],
  Resources: [
    { label: 'Help Center', href: '#' },
    { label: 'Community', href: '#' },
    { label: 'API Docs', href: '#' },
    { label: 'Status', href: '#' },
  ],
  Legal: [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ],
};

const socials = [
  { icon: Globe, href: '#', label: 'Website' },
  { icon: Link2, href: '#', label: 'GitHub' },
  { icon: Rss, href: '#', label: 'Blog' },
  { icon: ExternalLink, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="relative border-t border-white/6 bg-[#050508] overflow-hidden">
      {/* Subtle glow */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#4f8ef7]/30 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#4f8ef7]/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 pt-16 pb-10">
        {/* Top Row */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#4f8ef7] to-[#7c5af0] flex items-center justify-center">
                <Film size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold text-white">Casto</span>
            </Link>
            <p className="text-sm text-[#475569] leading-relaxed mb-6 max-w-xs">
              The premier platform connecting actors, directors, and production houses across India.
            </p>
            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 min-w-0 px-3 py-2 text-xs bg-white/6 border border-white/10 rounded-lg text-white placeholder:text-[#475569] focus:outline-none focus:border-[#4f8ef7]/50 transition-colors"
              />
              <button className="px-3 py-2 text-xs bg-gradient-to-r from-[#4f8ef7] to-[#7c5af0] text-white rounded-lg hover:opacity-90 transition-opacity flex-shrink-0">
                <Mail size={14} />
              </button>
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#475569] mb-4">
                {group}
              </p>
              <ul className="flex flex-col gap-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#64748b] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-white/6 pt-8">
          <p className="text-xs text-[#334155]">
            © {new Date().getFullYear()} Casto Technologies Pvt. Ltd. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {socials.map(({ icon: Icon, href, label }) => (
              <Link
                key={label}
                href={href}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-white/6 hover:bg-white/12 flex items-center justify-center text-[#64748b] hover:text-white transition-all"
              >
                <Icon size={15} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
