// Skeleton loading placeholders
export const SkeletonCard = () => (
  <div className="animate-pulse rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
    <div className="flex items-center gap-4">
      <div className="h-16 w-16 rounded-full bg-slate-200 dark:bg-slate-700" />
      <div className="flex-1 space-y-3">
        <div className="h-4 w-1/3 rounded bg-slate-200 dark:bg-slate-700" />
        <div className="h-3 w-1/2 rounded bg-slate-200 dark:bg-slate-700" />
      </div>
    </div>
    <div className="mt-6 space-y-3">
      <div className="h-3 w-full rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-3 w-5/6 rounded bg-slate-200 dark:bg-slate-700" />
      <div className="h-3 w-2/3 rounded bg-slate-200 dark:bg-slate-700" />
    </div>
  </div>
);

export const SkeletonLine = ({ className = '' }) => (
  <div
    className={`animate-pulse rounded bg-slate-200 dark:bg-slate-700 ${className}`}
  />
);
