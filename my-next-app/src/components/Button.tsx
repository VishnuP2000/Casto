'use client';

import React from 'react';
import { motion } from 'framer-motion';

type Variant =
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'success'
  | 'warning'
  | 'danger'
  | 'info'
  | 'outline'
  | 'ghost'
  | 'glass'
  | 'gradient'
  | 'dark'
  | 'light'
  | 'link';;
type Size = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  asChild?: boolean;
  href?: string;
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-[#4f8ef7] to-[#7c5af0] text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-[#5f9df8] hover:to-[#8b6af5]',

  secondary:
    'bg-white/10 text-white border border-white/10 hover:bg-white/15 hover:border-white/20',

  accent:
    'bg-violet-600 text-white hover:bg-violet-700 shadow-lg shadow-violet-500/25',

  success:
    'bg-emerald-600 text-white hover:bg-emerald-700 shadow-lg shadow-emerald-500/25',

  warning:
    'bg-amber-500 text-black hover:bg-amber-600 shadow-lg shadow-amber-500/25',

  info:
    'bg-cyan-600 text-white hover:bg-cyan-700 shadow-lg shadow-cyan-500/25',

  ghost:
    'text-[#94a3b8] hover:text-white hover:bg-white/8',

  outline:
    'border border-[rgba(79,142,247,0.4)] text-[#4f8ef7] hover:bg-[rgba(79,142,247,0.1)] hover:border-[#4f8ef7]',

  glass:
    'bg-white/5 backdrop-blur-md border border-white/10 text-white hover:bg-white/10 hover:border-white/20',

  gradient:
    'bg-gradient-to-r from-pink-500 via-violet-500 to-blue-500 text-white hover:opacity-90 shadow-lg',

  dark:
    'bg-[#0d0d14] text-white border border-white/10 hover:bg-[#171721]',

  light:
    'bg-white text-black hover:bg-gray-100',

  link:
    'bg-transparent text-[#4f8ef7] hover:text-[#6aa4ff] underline-offset-4 hover:underline',

  danger:
    'bg-rose-600/80 text-white border border-rose-500/30 hover:bg-rose-600',
};

const sizeStyles: Record<Size, string> = {
  sm: 'h-8 px-4 text-xs gap-1.5 rounded-lg',
  md: 'h-10 px-5 text-sm gap-2 rounded-xl',
  lg: 'h-12 px-7 text-base gap-2.5 rounded-xl',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  leftIcon,
  rightIcon,
  isLoading,
  children,
  className = '',
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className={[
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-200 cursor-pointer select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className,
      ].join(' ')}
      {...(props as React.ComponentProps<typeof motion.button>)}
    >
      {isLoading ? (
        <svg
          className="h-4 w-4 animate-spin"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
        >
          <circle className="opacity-25" cx="12" cy="12" r="10" strokeDasharray="64" />
          <path className="opacity-75" d="M4 12a8 8 0 018-8" strokeLinecap="round" />
        </svg>
      ) : (
        <>
          {leftIcon && <span className="flex-shrink-0">{leftIcon}</span>}
          {children}
          {rightIcon && <span className="flex-shrink-0">{rightIcon}</span>}
        </>
      )}
    </motion.button>
  );
}
