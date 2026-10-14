'use client';

import React from 'react';

type CommonPaginationProps = {
  page: number;
  count: number;
  onChange: (page: number) => void;
  className?: string;
};

const CommonPagination: React.FC<CommonPaginationProps> = ({
  page,
  count,
  onChange,
  className = '',
}) => {
  if (count <= 1) return null;

  const pages = Array.from({ length: count }, (_, i) => i + 1);

  return (
    <nav className={`flex items-center justify-center gap-[15px] ${className}`}>
      {/* Previous */}
      <button
        disabled={page === 1}
        onClick={() => onChange(page - 1)}
        className="text-[#4D4949] disabled:opacity-40"
      >
        Prev
      </button>

      {/* Pages */}
      {pages.map((p) => {
        const isActive = p === page;

        return (
          <button
            key={p}
            onClick={() => onChange(p)}
            className={`flex h-[40px] w-[40px] items-center justify-center rounded-full text-[16px] font-semibold transition-all ${
              isActive
                ? 'bg-[#b3002d] text-white shadow-[0px_1px_18px_#ffacb7]'
                : 'bg-[#FFE8EB] text-[#b3002d] hover:bg-[#b3002d] hover:text-white'
            } `}
            aria-current={isActive ? 'page' : undefined}
          >
            {p}
          </button>
        );
      })}

      {/* Next */}
      <button
        disabled={page === count}
        onClick={() => onChange(page + 1)}
        className="text-[#4D4949] disabled:opacity-40"
      >
        Next
      </button>
    </nav>
  );
};

export default CommonPagination;
