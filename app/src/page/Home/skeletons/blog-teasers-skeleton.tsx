type BlogSkeletonProps = {
  count?: number;
  className?: string;
};

export default function BlogSkeleton({
  count = 6,
  className = "",
}: BlogSkeletonProps) {
  return (
    <section className={`py-8 sm:py-16 lg:py-24 ${className}`} aria-hidden>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* header skeleton */}
        <div className="mb-12 space-y-4 text-center sm:mb-16 lg:mb-24">
          <div className="mx-auto h-4 w-28 rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
          <div className="mx-auto h-10 w-3/4 rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
          <div className="mx-auto h-5 w-1/2 rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: count }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl bg-transparent shadow-none overflow-hidden"
            >
              <div className="h-60 w-full rounded-t-xl bg-slate-200/70 dark:bg-slate-700/40 object-cover animate-pulse" />

              <div className="p-4">
                <div className="h-5 w-3/4 rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse mb-3" />
                <div className="h-4 w-full max-w-[90%] rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse mb-2" />
                <div className="h-4 w-2/3 rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse mb-4" />

                <div className="flex justify-end">
                  <div className="h-10 w-28 rounded-md bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
