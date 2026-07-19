'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SlidersHorizontal, ArrowUpDown, SearchX, Loader2 } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SearchBar from '@/components/SearchBar';
import FilterPanel from '@/components/FilterPanel';
import CastingCard from '@/components/CastingCard';
import Pagination from '@/components/Pagination';
import { castingOpportunities } from '@/lib/data';
import { FilterState, CastingOpportunity } from '@/lib/types';

const CARDS_PER_PAGE = 6;

const emptyFilters: FilterState = {
  search: '',
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

// ─── Skeleton Card ─────────────────────────────────────────────────────────────

function SkeletonCard() {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden bg-[#0d0d14] border border-white/6">
      <div className="h-44 skeleton" />
      <div className="p-4 flex flex-col gap-3">
        <div className="h-4 w-3/4 rounded-lg skeleton" />
        <div className="h-3 w-1/2 rounded-lg skeleton" />
        <div className="grid grid-cols-2 gap-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-3 rounded skeleton" />
          ))}
        </div>
        <div className="flex gap-1.5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="h-5 w-14 rounded-full skeleton" />
          ))}
        </div>
        <div className="flex gap-2 mt-2">
          <div className="flex-1 h-9 rounded-xl skeleton" />
          <div className="flex-1 h-9 rounded-xl skeleton" />
        </div>
      </div>
    </div>
  );
}

// ─── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-24 gap-5 text-center"
    >
      <div className="w-20 h-20 rounded-3xl bg-white/4 border border-white/8 flex items-center justify-center">
        <SearchX size={36} className="text-[#334155]" />
      </div>
      <div>
        <h3 className="text-lg font-semibold text-white mb-1">No Casting Opportunities Found</h3>
        <p className="text-sm text-[#475569] max-w-sm">
          No results match your current filters. Try adjusting or clearing your search criteria.
        </p>
      </div>
      <button
        onClick={onReset}
        className="px-5 py-2.5 text-sm font-medium rounded-xl border border-white/10 text-[#94a3b8] hover:text-white hover:border-white/20 hover:bg-white/6 transition-all"
      >
        Clear All Filters
      </button>
    </motion.div>
  );
}

// ─── Sort Dropdown ─────────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'oldest', label: 'Oldest' },
  { value: 'highest-salary', label: 'Highest Salary' },
  { value: 'deadline', label: 'Application Deadline' },
] as const;

// ─── Main Page ─────────────────────────────────────────────────────────────────

export default function CastingPage() {
  const [filters, setFilters] = useState<FilterState>(emptyFilters);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading] = useState(false);

  // Filter + Sort logic
  const filteredCastings = useMemo<CastingOpportunity[]>(() => {
    let results = [...castingOpportunities];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      results = results.filter(
        (c) =>
          c.movieName.toLowerCase().includes(q) ||
          c.roleName.toLowerCase().includes(q) ||
          c.productionHouse.toLowerCase().includes(q) ||
          c.tags.some((t) => t.toLowerCase().includes(q))
      );
    }
    if (filters.category) results = results.filter((c) => c.category === filters.category);
    if (filters.gender) results = results.filter((c) => c.genderRequired === filters.gender || c.genderRequired === 'Any');
    if (filters.language) results = results.filter((c) => c.languages.includes(filters.language));
    if (filters.location) results = results.filter((c) => c.shootingLocation.toLowerCase().includes(filters.location.toLowerCase()));
    if (filters.experience) results = results.filter((c) => c.experience === filters.experience || c.experience === 'Any');
    if (filters.auditionMode) results = results.filter((c) => c.auditionMode === filters.auditionMode || c.auditionMode === 'Both');
    if (filters.ageMin !== '') results = results.filter((c) => c.ageRange.max >= Number(filters.ageMin));
    if (filters.ageMax !== '') results = results.filter((c) => c.ageRange.min <= Number(filters.ageMax));
    if (filters.salaryMin !== '') results = results.filter((c) => c.salary.max >= Number(filters.salaryMin));
    if (filters.salaryMax !== '') results = results.filter((c) => c.salary.min <= Number(filters.salaryMax));

    switch (filters.sortBy) {
      case 'oldest':
        results.sort((a, b) => new Date(a.postedDate).getTime() - new Date(b.postedDate).getTime());
        break;
      case 'highest-salary':
        results.sort((a, b) => b.salary.max - a.salary.max);
        break;
      case 'deadline':
        results.sort((a, b) => new Date(a.applicationDeadline).getTime() - new Date(b.applicationDeadline).getTime());
        break;
      default: // latest
        results.sort((a, b) => new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime());
    }

    return results;
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filteredCastings.length / CARDS_PER_PAGE));
  const paginated = filteredCastings.slice(
    (currentPage - 1) * CARDS_PER_PAGE,
    currentPage * CARDS_PER_PAGE
  );

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handleSearch = (value: string) => {
    setFilters((f) => ({ ...f, search: value }));
    setCurrentPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFilters((f) => ({ ...f, sortBy: e.target.value as FilterState['sortBy'] }));
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">
      <Navbar />

      {/* Hero Banner */}
      <section className="relative pt-28 pb-14 overflow-hidden">
        {/* BG */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(79,142,247,0.18)_0%,transparent_70%)]" />
          <div className="absolute top-0 right-1/4 w-[400px] h-[400px] bg-[#9b7ef8]/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6 flex flex-col items-center text-center gap-5">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#4f8ef7]/30 bg-[#4f8ef7]/10 text-xs font-medium text-[#4f8ef7]"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#4f8ef7] animate-pulse" />
            {filteredCastings.length} Active Casting Calls
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight"
          >
            Discover{' '}
            <span className="gradient-text">Casting Opportunities</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-base sm:text-lg text-[#64748b] max-w-xl"
          >
            Browse auditions from top production houses and apply instantly. Your next role is one click away.
          </motion.p>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="w-full max-w-2xl mt-2"
          >
            <SearchBar
              value={filters.search}
              onChange={handleSearch}
              placeholder="Search movie, role, production house..."
            />
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
        {/* Toolbar */}
        <div className="flex items-center justify-between gap-4 mb-6 py-4 border-b border-white/6">
          <p className="text-sm text-[#475569]">
            <span className="text-white font-semibold">{filteredCastings.length}</span> opportunities found
          </p>

          <div className="flex items-center gap-3">
            {/* Sort */}
            <div className="relative">
              <ArrowUpDown size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#475569] pointer-events-none" />
              <select
                value={filters.sortBy}
                onChange={handleSortChange}
                className="h-9 pl-8 pr-3 text-xs bg-white/6 border border-white/10 rounded-xl text-[#94a3b8] hover:text-white focus:outline-none focus:border-[#4f8ef7]/50 transition-all appearance-none cursor-pointer"
              >
                {SORT_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value} className="bg-[#0d0d14]">
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Layout: Sidebar + Grid */}
        <div className="flex gap-8 items-start">
          {/* Filter Panel (desktop sidebar / mobile slide-over) */}
          <FilterPanel
            filters={filters}
            onChange={handleFilterChange}
            resultCount={filteredCastings.length}
          />

          {/* Cards Grid */}
          <div className="flex-1 min-w-0">
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
                {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
              </div>
            ) : filteredCastings.length === 0 ? (
              <EmptyState onReset={() => setFilters(emptyFilters)} />
            ) : (
              <>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={`page-${currentPage}-${filters.category}-${filters.search}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5"
                  >
                    {paginated.map((casting, i) => (
                      <CastingCard key={casting.id} casting={casting} index={i} />
                    ))}
                  </motion.div>
                </AnimatePresence>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="mt-10">
                    <Pagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={(page) => {
                        setCurrentPage(page);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }}
                    />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
