'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const getVisiblePages = () => {
    if (totalPages <= 7) return pages;
    if (currentPage <= 4) return [...pages.slice(0, 5), -1, totalPages];
    if (currentPage >= totalPages - 3) return [1, -1, ...pages.slice(totalPages - 5)];
    return [1, -1, currentPage - 1, currentPage, currentPage + 1, -1, totalPages];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className="flex items-center justify-center gap-1.5">
      {/* Previous */}
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="flex items-center gap-1.5 px-3 h-9 text-sm text-[#64748b] hover:text-white bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <ChevronLeft size={16} />
        <span className="hidden sm:inline">Prev</span>
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page, idx) =>
        page === -1 ? (
          <span key={`ellipsis-${idx}`} className="px-2 text-[#334155] text-sm select-none">
            …
          </span>
        ) : (
          <motion.button
            key={page}
            onClick={() => onPageChange(page)}
            whileTap={{ scale: 0.92 }}
            className={[
              'w-9 h-9 rounded-lg text-sm font-medium transition-all',
              currentPage === page
                ? 'bg-gradient-to-r from-[#4f8ef7] to-[#7c5af0] text-white shadow-md shadow-blue-500/25'
                : 'text-[#64748b] hover:text-white bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/15',
            ].join(' ')}
          >
            {page}
          </motion.button>
        )
      )}

      {/* Next */}
      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="flex items-center gap-1.5 px-3 h-9 text-sm text-[#64748b] hover:text-white bg-white/4 hover:bg-white/8 border border-white/8 hover:border-white/15 rounded-lg disabled:opacity-30 disabled:cursor-not-allowed transition-all"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
