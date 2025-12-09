import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  variant?: 'default' | 'positive' | 'negative';
  className?: string;
}

export function StatCard({ title, value, icon: Icon, trend, variant = 'default', className }: StatCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl p-4 bg-card border border-border/50 shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      <div className="flex items-center justify-between mb-3">
        <div className={cn(
          'p-2 rounded-lg',
          variant === 'positive' && 'bg-[hsl(var(--success))]/10',
          variant === 'negative' && 'bg-destructive/10',
          variant === 'default' && 'bg-primary/10'
        )}>
          <Icon className={cn(
            'w-4 h-4',
            variant === 'positive' && 'text-[hsl(var(--success))]',
            variant === 'negative' && 'text-destructive',
            variant === 'default' && 'text-primary'
          )} />
        </div>
        {trend && (
          <span className={cn(
            'text-xs font-medium px-2 py-0.5 rounded-full',
            variant === 'positive' && 'bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]',
            variant === 'negative' && 'bg-destructive/10 text-destructive'
          )}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-xs font-medium text-muted-foreground mb-1">
        {title}
      </p>
      <p className="text-xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
