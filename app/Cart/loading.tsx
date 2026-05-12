export default function Loading() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#f5f5f7] px-4 pt-8 pb-40 sm:px-6">
      {/* soft background */}
      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-20 -left-20 h-[300px] w-[300px] rounded-full bg-pink-200/30 blur-[120px]" />
        <div className="absolute -right-20 -bottom-20 h-[300px] w-[300px] rounded-full bg-blue-200/30 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl animate-pulse">
        {/* HEADER SKELETON */}
        <div className="mb-8 space-y-2">
          <div className="h-3 w-32 rounded bg-neutral-200" />
          <div className="h-8 w-64 rounded bg-neutral-200" />
        </div>

        {/* ITEMS */}
        <div className="space-y-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-3xl border border-white/60 bg-white/60 p-4 backdrop-blur-md sm:p-5"
            >
              {/* image */}
              <div className="h-24 w-24 rounded-2xl bg-neutral-200 sm:h-28 sm:w-28" />

              {/* content */}
              <div className="flex flex-1 flex-col justify-between">
                <div className="space-y-2">
                  <div className="h-4 w-40 rounded bg-neutral-200" />
                  <div className="h-3 w-24 rounded bg-neutral-200" />
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="h-9 w-28 rounded-full bg-neutral-200" />
                  <div className="h-5 w-16 rounded bg-neutral-200" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CHECKOUT SKELETON */}
        <div className="mt-10 rounded-3xl border border-white/60 bg-white/60 p-5 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <div className="h-3 w-16 rounded bg-neutral-200" />
              <div className="h-6 w-24 rounded bg-neutral-200" />
            </div>

            <div className="h-11 w-32 rounded-full bg-neutral-200" />
          </div>
        </div>
      </div>
    </div>
  );
}
