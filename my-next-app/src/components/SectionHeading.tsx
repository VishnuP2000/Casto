'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface SectionHeadingProps {
  label?: string;
  title: string;
  gradientTitle?: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export default function SectionHeading({
  label,
  title,
  gradientTitle,
  subtitle,
  centered = true,
  className = '',
}: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className={[
        'flex flex-col gap-4',
        centered ? 'items-center text-center' : 'items-start text-left',
        className,
      ].join(' ')}
    >
      {label && (
        <span className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-[#4f8ef7]">
          <span className="h-px w-6 bg-[#4f8ef7]" />
          {label}
          <span className="h-px w-6 bg-[#4f8ef7]" />
        </span>
      )}

      <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl leading-tight">
        {title}{' '}
        {gradientTitle && (
          <span className="gradient-text">{gradientTitle}</span>
        )}
      </h2>

      {subtitle && (
        <p className="max-w-2xl text-base sm:text-lg text-[#64748b] leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
