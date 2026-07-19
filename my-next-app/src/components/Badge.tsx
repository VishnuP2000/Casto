'use client';

import React from 'react';

type BadgeVariant =
  | 'default'
  | 'blue'
  | 'purple'
  | 'green'
  | 'yellow'
  | 'red'
  | 'pink'
  | 'ghost'
  | 'verified';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
  size?: 'sm' | 'md';
}

const variantStyles: Record<BadgeVariant, string> = {
  default:  'bg-white/8 text-[#94a3b8] border border-white/10',
  blue:     'bg-blue-500/15 text-blue-300 border border-blue-500/25',
  purple:   'bg-purple-500/15 text-purple-300 border border-purple-500/25',
  green:    'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25',
  yellow:   'bg-amber-500/15 text-amber-300 border border-amber-500/25',
  red:      'bg-rose-500/15 text-rose-300 border border-rose-500/25',
  pink:     'bg-pink-500/15 text-pink-300 border border-pink-500/25',
  ghost:    'bg-transparent text-[#64748b] border border-white/6',
  verified: 'bg-gradient-to-r from-blue-600/20 to-indigo-600/20 text-blue-300 border border-blue-500/30',
};

const sizeStyles = {
  sm: 'text-[10px] px-2 py-0.5',
  md: 'text-xs px-2.5 py-1',
};

export default function Badge({
  children,
  variant = 'default',
  size = 'md',
  className = '',
}: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center gap-1 rounded-full font-medium',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
    >
      {children}
    </span>
  );
}
