'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { MapPin, BadgeCheck, Star, Clapperboard, Users2 } from 'lucide-react';
import { Artist } from '@/lib/types';
import Badge from './Badge';

interface FeaturedArtistCardProps {
  artist: Artist;
  index?: number;
}

function formatCount(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return String(n);
}

export default function FeaturedArtistCard({ artist, index = 0 }: FeaturedArtistCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -5 }}
      className="group relative flex flex-col bg-[#0d0d14] border border-white/8 rounded-2xl overflow-hidden hover:border-[rgba(79,142,247,0.3)] hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 cursor-pointer"
    >
      {/* Cover / Photo */}
      <div className="relative h-40 bg-gradient-to-br from-[#0f1729] to-[#1a0f2e] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#4f8ef7]/10 to-[#9b7ef8]/10" />
        <Image
          src={artist.profilePhoto}
          alt={artist.name}
          fill
          sizes="300px"
          className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-transparent to-transparent" />

        {artist.verified && (
          <div className="absolute top-3 right-3">
            <Badge variant="verified" size="sm">
              <BadgeCheck size={11} /> Verified
            </Badge>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col p-4 gap-3">
        <div>
          <div className="flex items-center gap-1.5">
            <h3 className="font-semibold text-white text-base">{artist.name}</h3>
          </div>
          <p className="text-xs text-[#4f8ef7] mt-0.5">{artist.category}</p>
          <div className="flex items-center gap-1 text-xs text-[#64748b] mt-1">
            <MapPin size={11} />
            <span>{artist.location}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { icon: Star, label: 'Rating', value: artist.rating.toFixed(1), color: 'text-amber-400' },
            { icon: Clapperboard, label: 'Projects', value: String(artist.projectsCount), color: 'text-[#4f8ef7]' },
            { icon: Users2, label: 'Followers', value: formatCount(artist.followersCount), color: 'text-[#9b7ef8]' },
          ].map(({ icon: Icon, label, value, color }) => (
            <div key={label} className="flex flex-col items-center gap-0.5 p-2 rounded-xl bg-white/4 border border-white/6">
              <Icon size={13} className={color} />
              <span className="text-xs font-semibold text-white">{value}</span>
              <span className="text-[9px] text-[#475569]">{label}</span>
            </div>
          ))}
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {artist.skills.slice(0, 3).map((skill) => (
            <Badge key={skill} variant="ghost" size="sm">{skill}</Badge>
          ))}
          {artist.skills.length > 3 && (
            <Badge variant="ghost" size="sm">+{artist.skills.length - 3}</Badge>
          )}
        </div>

        {/* Languages */}
        <div className="flex gap-1 text-[10px] text-[#475569]">
          {artist.languages.slice(0, 3).join(' · ')}
          {artist.languages.length > 3 && ` +${artist.languages.length - 3}`}
        </div>

        {/* View Profile */}
        <button className="w-full h-8 text-xs font-medium rounded-xl border border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20 hover:bg-white/6 transition-all mt-auto">
          View Profile
        </button>
      </div>
    </motion.div>
  );
}
