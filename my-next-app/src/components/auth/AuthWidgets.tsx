'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Film, CheckCircle2, Eye, EyeOff, LucideIcon } from 'lucide-react';

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}

export function SocialButton({ icon, label, onClick, disabled }: SocialButtonProps) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.09)' }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className="flex-1 flex items-center justify-center gap-2.5 h-11 px-4 rounded-xl bg-white/5 border border-white/10 text-sm text-[#94a3b8] hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center">{icon}</span>
      <span className="font-extrabold">{label}</span>
    </motion.button>
  );
}

// ─── Divider ──────────────────────────────────────────────────────────────────

export function Divider({ label = 'OR' }: { label?: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <span className="text-xs font-medium text-[#334155] px-2">{label}</span>
      <div className="flex-1 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />
    </div>
  );
}

// ─── AuthButton ───────────────────────────────────────────────────────────────

interface AuthButtonProps {
  children: React.ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
  type?: 'submit' | 'button';
  onClick?: () => void;
}

function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
      <circle className="opacity-25" cx="12" cy="12" r="10" strokeDasharray="64" />
      <path className="opacity-75" d="M4 12a8 8 0 018-8" strokeLinecap="round" />
    </svg>
  );
}

export function AuthButton({ children, isLoading, disabled, type = 'submit', onClick }: AuthButtonProps) {
  return (
    <motion.button
      type={type}
      whileHover={!disabled && !isLoading ? { scale: 1.01 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled || isLoading}
      className="relative w-full h-12 rounded-xl text-sm font-semibold text-white overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
      style={{
        background: 'linear-gradient(135deg, #4f8ef7 0%, #7c5af0 100%)',
        boxShadow: '0 4px 24px rgba(79,142,247,0.25)',
      }}
    >
      {/* Shine overlay */}
      <motion.div
        animate={{ x: ['-100%', '200%'] }}
        transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 3 }}
        className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
      />
      <span className="relative flex items-center justify-center gap-2">
        {isLoading && <Spinner />}
        {children}
      </span>
    </motion.button>
  );
}


export function AuthLogo() {
  return (
    <div className="flex items-center gap-2.5 mb-6">
      <motion.div
        initial={{ rotate: -10, scale: 0.8 }}
        animate={{ rotate: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#4f8ef7] to-[#7c5af0] flex items-center justify-center shadow-lg shadow-blue-500/30"
      >
        <Film size={18} className="text-white" />
      </motion.div>
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
        className="text-xl font-extrabold tracking-tight text-white"
      >
        Casto
      </motion.span>
    </div>
  );
}

// ─── Password Strength Meter ───────────────────────────────────────────────────

interface PasswordStrengthProps {
  password: string;
}

const checks = [
  { label: 'At least 8 characters', test: (p: string) => p.length >= 8 },
  { label: 'One uppercase letter', test: (p: string) => /[A-Z]/.test(p) },
  { label: 'One lowercase letter', test: (p: string) => /[a-z]/.test(p) },
  { label: 'One number', test: (p: string) => /[0-9]/.test(p) },
  { label: 'One special character', test: (p: string) => /[^A-Za-z0-9]/.test(p) },
];

export function PasswordStrength({ password }: PasswordStrengthProps) {
  const score = checks.filter((c) => c.test(password)).length;
  const strengthLabel = ['', 'Very Weak', 'Weak', 'Fair', 'Strong', 'Very Strong'][score];
  const strengthColor = [
    '',
    'bg-rose-500',
    'bg-orange-500',
    'bg-amber-500',
    'bg-emerald-500',
    'bg-emerald-400',
  ][score];

  if (!password) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-2"
    >
      {/* Strength bar */}
      <div className="flex items-center gap-2">
        <div className="flex-1 flex gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
              key={i}
              animate={{ opacity: i < score ? 1 : 0.2 }}
              transition={{ duration: 0.2 }}
              className={['flex-1 h-1 rounded-full transition-colors', i < score ? strengthColor : 'bg-white/10'].join(' ')}
            />
          ))}
        </div>
        <span className={['text-[10px] font-medium w-16 text-right', score >= 4 ? 'text-emerald-400' : score >= 3 ? 'text-amber-400' : 'text-rose-400'].join(' ')}>
          {strengthLabel}
        </span>
      </div>

      {/* Checklist */}
      <div className="grid grid-cols-1 gap-1">
        {checks.map((c) => {
          const ok = c.test(password);
          return (
            <motion.div
              key={c.label}
              animate={{ opacity: 1 }}
              className="flex items-center gap-1.5"
            >
              <motion.div
                animate={{
                  scale: ok ? [1, 1.3, 1] : 1,
                  color: ok ? '#34d399' : '#475569',
                }}
                transition={{ duration: 0.25 }}
              >
                {ok ? (
                  <CheckCircle2 size={11} className="text-emerald-400" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full border border-[#334155]" />
                )}
              </motion.div>
              <span className={['text-[10px]', ok ? 'text-[#94a3b8]' : 'text-[#334155]'].join(' ')}>
                {c.label}
              </span>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}
