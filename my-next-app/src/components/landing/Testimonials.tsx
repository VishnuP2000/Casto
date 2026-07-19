'use client';

import React from 'react';
import SectionHeading from '../SectionHeading';
import TestimonialCard from '../TestimonialCard';
import { testimonials } from '@/lib/data';

export default function Testimonials() {
  return (
    <section className="py-24 relative">
      {/* BG */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[500px] h-[300px] bg-[#9b7ef8]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[300px] bg-[#4f8ef7]/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          label="Success Stories"
          title="What our community"
          gradientTitle="says about Casto"
          subtitle="Real stories from artists and production teams who found success on our platform."
        />

        <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
