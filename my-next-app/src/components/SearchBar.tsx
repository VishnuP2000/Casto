'use client';

import React, { useRef, useEffect } from 'react';
import { Search, X, Command } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  autoFocus?: boolean;
  onClear?: () => void;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = 'Search...',
  className = '',
  autoFocus = false,
  onClear,
}: SearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (autoFocus) inputRef.current?.focus();
  }, [autoFocus]);

  return (
    <div className={['relative group', className].join(' ')}>
      {/* Search Icon */}
      <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center text-[#475569] group-focus-within:text-[#4f8ef7] transition-colors">
        <Search size={18} />
      </div>

      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          'w-full h-12 pl-11 pr-24 text-sm rounded-xl',
          'bg-white/6 border border-white/10',
          'text-white placeholder:text-[#475569]',
          'focus:outline-none focus:border-[#4f8ef7]/50 focus:bg-white/8',
          'transition-all duration-200',
        ].join(' ')}
      />

      {/* Right side: clear + hint */}
      <div className="absolute inset-y-0 right-3 flex items-center gap-2">
        <AnimatePresence>
          {value && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.15 }}
              onClick={() => { onChange(''); onClear?.(); }}
              className="p-1 rounded-md text-[#475569] hover:text-white hover:bg-white/10 transition-all"
              aria-label="Clear search"
            >
              <X size={14} />
            </motion.button>
          )}
        </AnimatePresence>

        <div className="hidden sm:flex items-center gap-1 text-[10px] text-[#334155] font-medium px-2 py-1 rounded-md bg-white/4 border border-white/6">
          <Command size={10} />
          <span>K</span>
        </div>
      </div>

      {/* Focus glow */}
      <div className="absolute inset-0 rounded-xl ring-0 ring-[#4f8ef7]/0 group-focus-within:ring-1 group-focus-within:ring-[#4f8ef7]/30 transition-all duration-200 pointer-events-none" />
    </div>
  );
}
