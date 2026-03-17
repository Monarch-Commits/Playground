'use client';

import { Skeleton } from '@/components/ui/skeleton';

export default function ShopSkeleton() {
  return (
    <>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="max-w-7xl rounded-3xl border border-gray-100 p-4 shadow-sm"
        >
          {/* Image */}
          <Skeleton className="aspect-square w-full rounded-2xl bg-gray-200/60" />

          <div className="mt-4 space-y-3">
            {/* Title */}
            <Skeleton className="h-5 w-3/4 rounded-md" />

            {/* Rating stars */}
            <div className="flex gap-1">
              {Array.from({ length: 5 }).map((_, j) => (
                <Skeleton key={j} className="h-3 w-3 rounded-full" />
              ))}
            </div>

            {/* Multi-line Description */}
            <Skeleton className="space-y-2">
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-5/6 rounded-md" />
            </Skeleton>

            {/* Price & Action */}
            <div className="flex flex-col gap-3 pt-2">
              <Skeleton className="h-6 w-1/3 rounded-md" />
              <Skeleton className="h-10 w-full rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </>
  );
}
