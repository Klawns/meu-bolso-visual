import { Skeleton } from '@/components/ui/skeleton';

export function BalanceCardSkeleton() {
  return (
    <div className="rounded-2xl p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg md:col-span-2 lg:col-span-1">
      <Skeleton className="h-4 w-24 mb-2 bg-primary-foreground/20" />
      <Skeleton className="h-9 w-40 mb-4 bg-primary-foreground/20" />
      <div className="flex gap-6 text-sm">
        <div>
          <Skeleton className="h-3 w-12 mb-1 bg-primary-foreground/20" />
          <Skeleton className="h-5 w-24 bg-primary-foreground/20" />
        </div>
        <div>
          <Skeleton className="h-3 w-14 mb-1 bg-primary-foreground/20" />
          <Skeleton className="h-5 w-24 bg-primary-foreground/20" />
        </div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="rounded-2xl p-6 bg-card border border-border/50 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-11 w-11 rounded-xl" />
      </div>
      <Skeleton className="h-4 w-24 mb-2" />
      <Skeleton className="h-8 w-32" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-2xl p-6 bg-card border border-border/50 shadow-sm">
      <Skeleton className="h-5 w-32 mb-6" />
      <div className="h-64 flex items-end gap-2 justify-around px-4">
        {[...Array(6)].map((_, i) => (
          <Skeleton
            key={i}
            className="w-8 rounded-t"
            style={{ height: `${Math.random() * 60 + 40}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function ExpenseListSkeleton() {
  return (
    <div className="space-y-3">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="flex items-center justify-between p-4 rounded-xl bg-card border border-border/50"
        >
          <div className="flex-1">
            <Skeleton className="h-5 w-40 mb-2" />
            <Skeleton className="h-3 w-24" />
          </div>
          <Skeleton className="h-6 w-24" />
        </div>
      ))}
    </div>
  );
}
