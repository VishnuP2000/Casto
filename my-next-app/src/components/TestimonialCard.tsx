'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';
import { Testimonial } from '@/lib/types';
import Badge from './Badge';

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({ testimonial, index = 0 }: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-20px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col gap-4 p-6 rounded-2xl bg-[#0d0d14] border border-white/8 hover:border-white/14 transition-all"
    >
      {/* Quote Icon */}
      <Quote
        size={32}
        className="text-[#4f8ef7]/20 absolute top-5 right-5"
        fill="currentColor"
      />

      {/* Star Rating */}
      <div className="flex gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={14}
            className={i < testimonial.rating ? 'text-amber-400' : 'text-[#1e293b]'}
            fill={i < testimonial.rating ? 'currentColor' : 'none'}
          />
        ))}
      </div>

      {/* Quote */}
      <p className="text-sm text-[#94a3b8] leading-relaxed flex-1">
        &ldquo;{testimonial.quote}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-2 border-t border-white/6">
        <div className="relative w-10 h-10 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-white/10">
          <Image
            src={testimonial.avatar}
            alt={testimonial.name}
            fill
            sizes="40px"
            className="object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate">{testimonial.name}</p>
          <p className="text-xs text-[#475569] truncate">
            {testimonial.role} · {testimonial.company}
          </p>
        </div>
        <Badge
          variant={testimonial.userType === 'Artist' ? 'purple' : 'blue'}
          size="sm"
        >
          {testimonial.userType}
        </Badge>
      </div>
    </motion.div>
  );
}
