'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, SlidersHorizontal, ChevronDown } from 'lucide-react';
import { FilterState, CastingCategory, Gender, AuditionMode, ExperienceLevel } from '@/lib/types';
import Button from './Button';

interface FilterPanelProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  resultCount?: number;
}

const CATEGORIES: CastingCategory[] = [
  'Movie', 'Web Series', 'Short Film', 'Advertisement', 'Music Video', 'TV Show', 'Theatre',
];
const GENDERS: Gender[] = ['Male', 'Female', 'Any', 'Non-binary'];
const EXPERIENCE: ExperienceLevel[] = ['Fresher', '1-2 Years', '3-5 Years', '5+ Years', 'Any'];
const AUDITION_MODES: AuditionMode[] = ['Online', 'Offline', 'Both'];
const LANGUAGES = ['Hindi', 'English', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Punjabi', 'Marathi', 'Bengali'];
const CITIES = ['Mumbai', 'Delhi', 'Bengaluru', 'Chennai', 'Hyderabad', 'Kolkata', 'Pune', 'Ahmedabad', 'Jaipur'];

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(true);
  return (
    <div className="border-b border-white/6 pb-4">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex items-center justify-between w-full py-2 text-sm font-semibold text-white hover:text-[#4f8ef7] transition-colors"
      >
        {title}
        <ChevronDown
          size={16}
          className={['text-[#475569] transition-transform duration-200', open ? 'rotate-180' : ''].join(' ')}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="pt-2">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ChipGroup({
  options,
  selected,
  onSelect,
  multi = false,
}: {
  options: string[];
  selected: string | string[];
  onSelect: (val: string) => void;
  multi?: boolean;
}) {
  const isSelected = (v: string) =>
    Array.isArray(selected) ? selected.includes(v) : selected === v;

  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onSelect(opt)}
          className={[
            'text-xs px-2.5 py-1 rounded-lg border transition-all',
            isSelected(opt)
              ? 'bg-[#4f8ef7]/15 border-[#4f8ef7]/40 text-[#4f8ef7]'
              : 'bg-white/4 border-white/8 text-[#64748b] hover:text-white hover:border-white/20',
          ].join(' ')}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

function FilterContent({
  filters,
  onChange,
}: {
  filters: FilterState;
  onChange: (f: FilterState) => void;
}) {
  const set = <K extends keyof FilterState>(key: K, val: FilterState[K]) =>
    onChange({ ...filters, [key]: val });

  const toggle = (key: keyof FilterState, val: string) =>
    set(key, filters[key] === val ? '' as FilterState[typeof key] : val as FilterState[typeof key]);

  return (
    <div className="flex flex-col gap-4">
      <FilterGroup title="Category">
        <ChipGroup
          options={CATEGORIES}
          selected={filters.category}
          onSelect={(v) => toggle('category', v)}
        />
      </FilterGroup>

      <FilterGroup title="Gender">
        <ChipGroup
          options={GENDERS}
          selected={filters.gender}
          onSelect={(v) => toggle('gender', v)}
        />
      </FilterGroup>

      <FilterGroup title="Audition Mode">
        <ChipGroup
          options={AUDITION_MODES}
          selected={filters.auditionMode}
          onSelect={(v) => toggle('auditionMode', v)}
        />
      </FilterGroup>

      <FilterGroup title="Experience">
        <ChipGroup
          options={EXPERIENCE}
          selected={filters.experience}
          onSelect={(v) => toggle('experience', v)}
        />
      </FilterGroup>

      <FilterGroup title="Language">
        <ChipGroup
          options={LANGUAGES}
          selected={filters.language}
          onSelect={(v) => toggle('language', v)}
        />
      </FilterGroup>

      <FilterGroup title="City">
        <ChipGroup
          options={CITIES}
          selected={filters.location}
          onSelect={(v) => toggle('location', v)}
        />
      </FilterGroup>

      <FilterGroup title="Age Range">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.ageMin}
            onChange={(e) => set('ageMin', e.target.value ? Number(e.target.value) : '')}
            className="w-full h-8 px-2 text-xs bg-white/6 border border-white/10 rounded-lg text-white placeholder:text-[#334155] focus:outline-none focus:border-[#4f8ef7]/50 transition-colors"
          />
          <span className="text-[#334155] text-xs">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.ageMax}
            onChange={(e) => set('ageMax', e.target.value ? Number(e.target.value) : '')}
            className="w-full h-8 px-2 text-xs bg-white/6 border border-white/10 rounded-lg text-white placeholder:text-[#334155] focus:outline-none focus:border-[#4f8ef7]/50 transition-colors"
          />
        </div>
      </FilterGroup>

      <FilterGroup title="Salary Range (₹)">
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.salaryMin}
            onChange={(e) => set('salaryMin', e.target.value ? Number(e.target.value) : '')}
            className="w-full h-8 px-2 text-xs bg-white/6 border border-white/10 rounded-lg text-white placeholder:text-[#334155] focus:outline-none focus:border-[#4f8ef7]/50 transition-colors"
          />
          <span className="text-[#334155] text-xs">–</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.salaryMax}
            onChange={(e) => set('salaryMax', e.target.value ? Number(e.target.value) : '')}
            className="w-full h-8 px-2 text-xs bg-white/6 border border-white/10 rounded-lg text-white placeholder:text-[#334155] focus:outline-none focus:border-[#4f8ef7]/50 transition-colors"
          />
        </div>
      </FilterGroup>
    </div>
  );
}

export default function FilterPanel({ filters, onChange, resultCount }: FilterPanelProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const emptyFilters: FilterState = {
    search: filters.search,
    gender: '',
    ageMin: '',
    ageMax: '',
    language: '',
    category: '',
    location: '',
    experience: '',
    salaryMin: '',
    salaryMax: '',
    auditionMode: '',
    sortBy: 'latest',
  };

  const hasActiveFilters = [
    filters.gender, filters.category, filters.language,
    filters.location, filters.experience, filters.auditionMode,
    filters.ageMin, filters.ageMax, filters.salaryMin, filters.salaryMax,
  ].some(Boolean);

  return (
    <>
      {/* Mobile Filter Toggle */}
      <div className="lg:hidden mb-4">
        <button
          onClick={() => setMobileOpen(true)}
          className="flex items-center gap-2 px-4 h-10 text-sm font-medium rounded-xl bg-white/6 border border-white/10 text-white hover:bg-white/10 transition-all"
        >
          <SlidersHorizontal size={16} />
          Filters
          {hasActiveFilters && (
            <span className="w-5 h-5 rounded-full bg-[#4f8ef7] text-white text-[10px] flex items-center justify-center">
              !
            </span>
          )}
        </button>
      </div>

      {/* Mobile Slide-Over */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 z-50 w-80 bg-[#0a0a0f] border-r border-white/8 overflow-y-auto lg:hidden"
            >
              <div className="flex items-center justify-between p-4 border-b border-white/8">
                <h3 className="font-semibold text-white">Filters</h3>
                <div className="flex items-center gap-2">
                  {hasActiveFilters && (
                    <button
                      onClick={() => onChange(emptyFilters)}
                      className="text-xs text-[#4f8ef7] hover:text-white"
                    >
                      Clear All
                    </button>
                  )}
                  <button
                    onClick={() => setMobileOpen(false)}
                    className="p-1 text-[#64748b] hover:text-white rounded-lg hover:bg-white/8"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="p-4">
                <FilterContent filters={filters} onChange={onChange} />
              </div>
              <div className="p-4 border-t border-white/8 sticky bottom-0 bg-[#0a0a0f]">
                <Button
                  variant="primary"
                  size="md"
                  className="w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Show {resultCount ?? 0} Results
                </Button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Desktop Sidebar */}
      <div className="hidden lg:flex flex-col w-60 flex-shrink-0">
        <div className="sticky top-24 flex flex-col gap-1">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-sm font-semibold text-white">Filters</h3>
            {hasActiveFilters && (
              <button
                onClick={() => onChange(emptyFilters)}
                className="text-xs text-[#4f8ef7] hover:text-white transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
          <FilterContent filters={filters} onChange={onChange} />
        </div>
      </div>
    </>
  );
}
