// @ts-nocheck
"use client";

import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
}: PaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  const handlePrev = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <nav
      className={`flex items-center justify-center gap-2 sm:gap-3 mt-10 sm:mt-14 ${className}`}
      aria-label="Blog Page Navigation"
    >
      {/* Previous Button */}
      <motion.button
        whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
        whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
        onClick={handlePrev}
        disabled={currentPage === 1}
        aria-label="Previous Page"
        className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-200 shadow-xs ${
          currentPage === 1
            ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200/60 opacity-60"
            : "bg-white text-[#2C1810] hover:bg-[#F37021] hover:text-white border border-neutral-200/80 cursor-pointer"
        }`}
      >
        <ChevronLeft className="w-5 h-5" strokeWidth={2.2} />
      </motion.button>

      <div className="flex items-center gap-2 sm:gap-2.5">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <motion.button
              key={page}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onPageChange(page)}
              aria-label={`Go to page ${page}`}
              aria-current={isActive ? "page" : undefined}
              className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full text-sm sm:text-base font-extrabold transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[#F37021] text-white shadow-md shadow-[#F37021]/30 ring-2 ring-[#F37021]/20"
                  : "bg-white text-[#2C1810] hover:bg-orange-50 hover:text-[#F37021] border border-neutral-200/80"
              }`}
            >
              {page}
            </motion.button>
          );
        })}
      </div>

      <motion.button
        whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
        whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
        onClick={handleNext}
        disabled={currentPage === totalPages}
        aria-label="Next Page"
        className={`flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-full transition-all duration-200 shadow-xs ${
          currentPage === totalPages
            ? "bg-neutral-100 text-neutral-400 cursor-not-allowed border border-neutral-200/60 opacity-60"
            : "bg-white text-[#2C1810] hover:bg-[#F37021] hover:text-white border border-neutral-200/80 cursor-pointer"
        }`}
      >
        <ChevronRight className="w-5 h-5" strokeWidth={2.2} />
      </motion.button>
    </nav>
  );
}
