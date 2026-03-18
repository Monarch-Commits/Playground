'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';

export default function PaginationControls({
  currentPage,
  totalPages,
  hasNextPage,
  hasPrevPage,
}: {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handlePageChange = (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());

    router.push(`?${params.toString()}`, { scroll: true });
  };

  return (
    <div className="mt-12 flex flex-col items-center gap-4">
      {/* PREV / NEXT */}
      <div className="flex items-center gap-4">
        <button
          disabled={!hasPrevPage}
          onClick={() => handlePageChange(currentPage - 1)}
          className="flex items-center gap-1 rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
        >
          <MdSkipPrevious /> Prev
        </button>

        <span className="text-sm font-medium">
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={!hasNextPage}
          onClick={() => handlePageChange(currentPage + 1)}
          className="flex items-center gap-1 rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
        >
          Next <MdSkipNext />
        </button>
      </div>

      {/* PAGE NUMBERS */}
      <div className="flex flex-wrap justify-center gap-2">
        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;

          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`rounded px-3 py-1 ${
                currentPage === page
                  ? 'bg-black text-white'
                  : 'border hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          );
        })}
      </div>
    </div>
  );
}
