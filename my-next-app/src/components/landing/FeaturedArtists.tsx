'use client';

import React from 'react';
import SectionHeading from '../SectionHeading';
import FeaturedArtistCard from '../FeaturedArtistCard';
import { featuredArtists } from '@/lib/data';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function FeaturedArtists() {
  return (
    <section className="py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-14">
          <SectionHeading
            label="Featured Artists"
            title="Discover top"
            gradientTitle="talent"
            subtitle="Hand-picked verified artists ready for their next role."
            centered={false}
          />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="#"
              className="inline-flex items-center gap-2 text-sm text-[#4f8ef7] hover:text-white transition-colors group"
            >
              View all artists
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {featuredArtists.map((artist, i) => (
            <FeaturedArtistCard key={artist.id} artist={artist} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
