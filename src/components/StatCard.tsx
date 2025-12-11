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
        'rounded-2xl p-6 bg-card border border-border/50 shadow-sm transition-all hover:shadow-md',
        className
      )}
    >
      <div className="flex items-center justify-between mb-4">
        <div className={cn(
          'p-3 rounded-xl',
          variant === 'positive' && 'bg-[hsl(var(--success))]/10',
          variant === 'negative' && 'bg-destructive/10',
          variant === 'default' && 'bg-primary/10'
        )}>
          <Icon className={cn(
            'w-5 h-5',
            variant === 'positive' && 'text-[hsl(var(--success))]',
            variant === 'negative' && 'text-destructive',
            variant === 'default' && 'text-primary'
          )} />
        </div>
        {trend && (
          <span className={cn(
            'text-sm font-medium px-3 py-1 rounded-full',
            variant === 'positive' && 'bg-[hsl(var(--success))]/10 text-[hsl(var(--success))]',
            variant === 'negative' && 'bg-destructive/10 text-destructive'
          )}>
            {trend}
          </span>
        )}
      </div>
      <p className="text-sm font-medium text-muted-foreground mb-2">
        {title}
      </p>
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
