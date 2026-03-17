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
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`, { scroll: true });
  };

  return (
    <div className="mt-12 flex items-center justify-center gap-4">
      <button
        disabled={!hasPrevPage}
        onClick={() => handlePageChange(currentPage - 1)}
        className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
      >
        <MdSkipPrevious />
      </button>

      <span className="text-sm font-medium">
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={!hasNextPage}
        onClick={() => handlePageChange(currentPage + 1)}
        className="rounded-lg border px-4 py-2 hover:bg-gray-50 disabled:opacity-50"
      >
        <MdSkipNext />
      </button>
    </div>
  );
}
