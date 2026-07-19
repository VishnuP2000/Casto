'use client';

import React from 'react';
import { motion } from 'framer-motion';
import {
  User, Search, Shield, Video, BarChart2, MessageCircle,
} from 'lucide-react';
import SectionHeading from '../SectionHeading';
import { features } from '@/lib/data';

const iconMap: Record<string, React.ElementType> = {
  User, Search, Shield, Video, BarChart: BarChart2, MessageCircle,
};

const gradientMap: Record<string, string> = {
  'from-blue-500 to-indigo-600': 'linear-gradient(135deg, #3b82f6, #4f46e5)',
  'from-violet-500 to-purple-600': 'linear-gradient(135deg, #8b5cf6, #9333ea)',
  'from-emerald-500 to-teal-600': 'linear-gradient(135deg, #10b981, #0d9488)',
  'from-rose-500 to-pink-600': 'linear-gradient(135deg, #f43f5e, #db2777)',
  'from-amber-500 to-orange-600': 'linear-gradient(135deg, #f59e0b, #ea580c)',
  'from-cyan-500 to-blue-600': 'linear-gradient(135deg, #06b6d4, #2563eb)',
};

export default function Features() {
  return (
    <section className="py-24 relative" style={{marginLeft:'8rem'}}>
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-[#4f8ef7]/4 rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-7xl px-6 ml-44">
        <SectionHeading
          label="Platform Features"
          title="Everything you need to"
          gradientTitle="succeed in casting"
          subtitle="Powerful tools for artists and production teams, built for the modern entertainment industry."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-16">
          {features.map((feature, i) => {
            const Icon = iconMap[feature.icon] ?? User;
            const gradient = gradientMap[feature.gradient] ?? gradientMap['from-blue-500 to-indigo-600'];

            return (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -4 }}
                className="group relative p-6 rounded-2xl bg-[#0d0d14] border border-white/8 hover:border-white/14 transition-all duration-300"
              >
                {/* Icon */}
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center mb-5 shadow-lg"
                  style={{ background: gradient }}
                >
                  <Icon size={20} className="text-white" />
                </div>

                {/* Hover glow */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: `radial-gradient(circle at top left, ${gradient.split(',')[0].replace('linear-gradient(135deg, ', '')}18 0%, transparent 60%)`,
                  }}
                />

                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-[#64748b] leading-relaxed">{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
