'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import {
  MapPin, Clock, Users, Wallet, Calendar, Bookmark, Share2, BadgeCheck,
  CheckCircle2, Video, Mic2, ChevronRight,
} from 'lucide-react';
import Badge from './Badge';
import { CastingOpportunity } from '@/lib/types';

interface CastingCardProps {
  casting: CastingOpportunity;
  index?: number;
}

function formatSalary(min: number, max: number, currency: string) {
  const fmt = (n: number) =>
    n >= 100000
      ? `${(n / 100000).toFixed(n % 100000 === 0 ? 0 : 1)}L`
      : n >= 1000
      ? `${(n / 1000).toFixed(0)}K`
      : String(n);
  return `₹${fmt(min)} – ₹${fmt(max)}`;
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', {
    day: 'numeric', month: 'short', year: 'numeric',
  });
}

const categoryColor: Record<string, string> = {
  Movie: 'blue',
  'Web Series': 'purple',
  Advertisement: 'yellow',
  'Music Video': 'pink',
  'Short Film': 'green',
  'TV Show': 'blue',
  Theatre: 'yellow',
};

export default function CastingCard({ casting, index = 0 }: CastingCardProps) {
  const [bookmarked, setBookmarked] = useState(casting.isBookmarked ?? false);
  const [shared, setShared] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
    }
    setShared(true);
    setTimeout(() => setShared(false), 2000);
  };

  const daysLeft = Math.max(
    0,
    Math.ceil((new Date(casting.applicationDeadline).getTime() - Date.now()) / 86400000)
  );

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ duration: 0.5, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -4 }}
      className="group relative flex flex-col bg-[#0d0d14] border border-white/8 rounded-2xl overflow-hidden hover:border-[rgba(79,142,247,0.3)] hover:shadow-xl hover:shadow-black/50 transition-all duration-300"
    >
      {/* Poster */}
      <div className="relative h-44 overflow-hidden">
        <Image
          src={casting.posterUrl}
          alt={casting.movieName}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          unoptimized
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d14] via-[#0d0d14]/40 to-transparent" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={(categoryColor[casting.category] as 'blue' | 'purple' | 'green' | 'yellow' | 'pink') ?? 'default'} size="sm">
            {casting.category}
          </Badge>
          {casting.verified && (
            <Badge variant="verified" size="sm">
              <BadgeCheck size={11} /> Verified
            </Badge>
          )}
        </div>

        {/* Top Right Actions */}
        <div className="absolute top-3 right-3 flex gap-1.5">
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={handleShare}
            className="w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-black/70 transition-all"
            aria-label="Share"
          >
            {shared ? <CheckCircle2 size={13} className="text-green-400" /> : <Share2 size={13} />}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.88 }}
            onClick={() => setBookmarked((v) => !v)}
            className={[
              'w-7 h-7 rounded-lg bg-black/50 backdrop-blur-sm border border-white/10 flex items-center justify-center transition-all',
              bookmarked ? 'text-[#4f8ef7]' : 'text-white/60 hover:text-white hover:bg-black/70',
            ].join(' ')}
            aria-label="Bookmark"
          >
            <Bookmark size={13} fill={bookmarked ? 'currentColor' : 'none'} />
          </motion.button>
        </div>

        {/* Audition Mode */}
        <div className="absolute bottom-3 left-3">
          <span className={[
            'inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border',
            casting.auditionMode === 'Online'
              ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              : casting.auditionMode === 'Offline'
              ? 'bg-orange-500/20 text-orange-300 border-orange-500/30'
              : 'bg-blue-500/20 text-blue-300 border-blue-500/30',
          ].join(' ')}>
            {casting.auditionMode === 'Online' ? <Video size={10} /> : <Mic2 size={10} />}
            {casting.auditionMode}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <div>
          <h3 className="font-semibold text-white text-base leading-tight group-hover:text-[#4f8ef7] transition-colors">
            {casting.roleName}
          </h3>
          <p className="text-sm text-[#64748b] mt-0.5">{casting.movieName}</p>
          <p className="text-xs text-[#475569] mt-0.5">{casting.productionHouse}</p>
        </div>

        {/* Meta Grid */}
        <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 text-xs text-[#64748b]">
          <div className="flex items-center gap-1.5">
            <MapPin size={11} className="text-[#475569] flex-shrink-0" />
            <span className="truncate">{casting.shootingLocation}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Users size={11} className="text-[#475569] flex-shrink-0" />
            <span>{casting.vacancies} {casting.vacancies === 1 ? 'vacancy' : 'vacancies'}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Wallet size={11} className="text-[#475569] flex-shrink-0" />
            <span className="text-[#94a3b8] font-medium">
              {formatSalary(casting.salary.min, casting.salary.max, casting.salary.currency)}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <Calendar size={11} className="text-[#475569] flex-shrink-0" />
            <span className={daysLeft <= 5 ? 'text-rose-400' : ''}>
              {daysLeft > 0 ? `${daysLeft}d left` : 'Closed'}
            </span>
          </div>
        </div>

        {/* Requirements */}
        <div className="flex flex-wrap gap-1.5">
          <Badge variant="ghost" size="sm">{casting.genderRequired}</Badge>
          <Badge variant="ghost" size="sm">{casting.ageRange.min}–{casting.ageRange.max} yrs</Badge>
          <Badge variant="ghost" size="sm">{casting.experience}</Badge>
          {casting.languages.slice(0, 2).map((lang) => (
            <Badge key={lang} variant="ghost" size="sm">{lang}</Badge>
          ))}
          {casting.languages.length > 2 && (
            <Badge variant="ghost" size="sm">+{casting.languages.length - 2}</Badge>
          )}
        </div>

        {/* Description */}
        <p className="text-xs text-[#475569] leading-relaxed line-clamp-2">
          {casting.shortDescription}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1">
          {casting.tags.slice(0, 3).map((tag) => (
            <span key={tag} className="text-[10px] text-[#4f8ef7]/70 bg-[#4f8ef7]/8 px-2 py-0.5 rounded-full border border-[#4f8ef7]/15">
              #{tag}
            </span>
          ))}
        </div>

        {/* Posted */}
        <div className="flex items-center justify-between text-[10px] text-[#334155] border-t border-white/6 pt-2 mt-auto">
          <div className="flex items-center gap-1">
            <Clock size={10} />
            Posted {formatDate(casting.postedDate)}
          </div>
          <span>Deadline: {formatDate(casting.applicationDeadline)}</span>
        </div>

        {/* CTA Buttons */}
        <div className="flex gap-2 pt-1">
          <button className="flex-1 h-9 text-xs font-medium rounded-xl border border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20 hover:bg-white/6 transition-all">
            View Details
          </button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="flex-1 h-9 text-xs font-medium rounded-xl bg-gradient-to-r from-[#4f8ef7] to-[#7c5af0] text-white flex items-center justify-center gap-1 shadow-md shadow-blue-500/20 hover:shadow-blue-500/35 transition-all"
          >
            Apply Now <ChevronRight size={13} />
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}
