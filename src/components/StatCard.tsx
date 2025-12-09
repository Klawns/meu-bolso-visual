import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  variant?: 'default' | 'positive' | 'negative';
  className?: string;
}

export function StatCard({ title, value, icon: Icon, variant = 'default', className }: StatCardProps) {
  return (
    <div
      className={cn(
        'border-2 border-border p-4 shadow-sm bg-card',
        variant === 'positive' && 'border-l-4 border-l-[hsl(var(--chart-2))]',
        variant === 'negative' && 'border-l-4 border-l-destructive',
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="space-y-1">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {title}
          </p>
          <p className="text-2xl font-bold font-mono">{value}</p>
        </div>
        <div className="p-2 bg-secondary">
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </div>
  );
}
