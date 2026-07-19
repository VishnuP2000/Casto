'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { UserPlus, Search, Video, CheckCircle } from 'lucide-react';
import SectionHeading from '../SectionHeading';

const steps = [
  {
    icon: UserPlus,
    step: '01',
    title: 'Create Your Profile',
    description:
      'Sign up and build a stunning portfolio with photos, videos, skills, and experience. Artists get a professional profile page instantly.',
    color: '#4f8ef7',
    forArtist: true,
  },
  {
    icon: Search,
    step: '02',
    title: 'Discover Opportunities',
    description:
      'Browse hundreds of casting calls filtered by category, language, location, and pay. Recruiters post new opportunities daily.',
    color: '#9b7ef8',
    forArtist: true,
  },
  {
    icon: Video,
    step: '03',
    title: 'Submit Your Audition',
    description:
      'Apply with one click and submit video auditions directly through the platform. Track your application status in real time.',
    color: '#ec4899',
    forArtist: true,
  },
  {
    icon: CheckCircle,
    step: '04',
    title: 'Get Cast & Succeed',
    description:
      'Receive notifications when shortlisted. Communicate with directors, sign agreements, and start your next production journey.',
    color: '#10b981',
    forArtist: true,
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative " style={{marginLeft:'11rem', paddingTop:'3rem'}}>
      {/* Section BG */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#4f8ef7]/3 to-transparent pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <SectionHeading
          label="How It Works"
          title="From audition to"
          gradientTitle="the big screen"
          subtitle="A streamlined journey from profile creation to getting cast — built for modern artists and production teams."
        />

        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, i) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.step}>
                <motion.div
                  initial={{ opacity: 0, y: 32 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-30px' }}
                  transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="relative flex flex-col items-start gap-4"
                >
                  {/* Step Number + Icon */}
                  <div className="relative">
                    <div
                      className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg"
                      style={{ background: `${step.color}22`, border: `1px solid ${step.color}40` }}
                    >
                      <Icon size={24} style={{ color: step.color }} />
                    </div>
                    <div
                      className="absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold"
                      style={{ background: step.color, color: '#050508' }}
                    >
                      {step.step}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-base font-semibold text-white mb-2">{step.title}</h3>
                    <p className="text-sm text-[#64748b] leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>

                {/* Connector (not after last) */}
                {i < steps.length - 1 && (
                  <div className="hidden lg:flex items-start pt-7">
                    <motion.div
                      initial={{ scaleX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: i * 0.1 + 0.3 }}
                      className="absolute h-px w-8 bg-gradient-to-r from-white/10 to-white/5 mt-7"
                      style={{ left: '100%', top: 0, transformOrigin: 'left' }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </section>
  );
}
