import { cn } from "@/lib/utils";

export type HeroSectionSkeletonProps = {
  className?: string;
};

export default function HeroSectionSkeleton({
  className,
}: HeroSectionSkeletonProps) {
  return (
    <section
      aria-hidden
      className={cn(
        "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12",
        "flex flex-col items-start gap-8",
        className,
      )}
    >
      <div className="w-full flex flex-col-reverse gap-8 lg:flex-row lg:items-center">
        {/* text column */}
        <div className="flex-1">
          <div className="h-10 w-3/4 rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse mb-4" />
          <div className="h-6 w-1/2 rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse mb-6" />
          <div className="space-y-3">
            <div className="h-4 w-full max-w-xl rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
            <div className="h-4 w-full max-w-lg rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
            <div className="h-4 w-3/4 max-w-md rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
          </div>

          <div className="mt-6 flex items-center gap-3">
            <div className="h-10 w-28 rounded-md bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
            <div className="h-10 w-20 rounded-md bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
          </div>
        </div>

        {/* media / hero graphic */}
        <div className="flex-1">
          <div className="aspect-video w-full rounded-lg bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
        </div>
      </div>
    </section>
  );
}
