import { cn } from "@/lib/utils";

export type HeaderSkeletonProps = {
  className?: string;
  items?: number;
};

export default function HeaderSkeleton({
  className,
  items = 4,
}: HeaderSkeletonProps) {
  return (
    <header
      className={cn("bg-background sticky top-0 z-50 h-16 border-b", className)}
      aria-hidden
    >
      <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
        </div>

        <nav className="flex-1 ml-6 max-md:hidden">
          <ul className="flex gap-3">
            {Array.from({ length: items }).map((_, i) => (
              <li key={i}>
                <div className="h-4 w-20 rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
              </li>
            ))}
          </ul>
        </nav>

        {/* actions */}
        <div className="flex gap-4 items-center">
          <div className="h-9 w-20 rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
          <div className="md:hidden h-9 w-9 rounded bg-slate-200/70 dark:bg-slate-700/40 animate-pulse" />
        </div>
      </div>
    </header>
  );
}
