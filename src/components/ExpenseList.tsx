import { Expense, categoryLabels } from '@/types/finance';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Trash2, Pin } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ExpenseListProps {
  expenses: Expense[];
  onDelete: (id: string) => void;
}

export function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const sortedExpenses = [...expenses].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (expenses.length === 0) {
    return (
      <div className="text-center py-12 rounded-xl border border-dashed border-border bg-card/50">
        <p className="text-muted-foreground">Nenhuma despesa registrada</p>
        <p className="text-sm text-muted-foreground mt-1">
          Adicione sua primeira despesa
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {sortedExpenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center gap-3 p-4 rounded-xl bg-card border border-border/50 shadow-sm"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium truncate text-sm">{expense.description}</p>
              {expense.isFixed && (
                <Pin className="w-3 h-3 text-primary flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-secondary-foreground">
                {categoryLabels[expense.category]}
              </span>
              <span className="text-xs text-muted-foreground">
                {format(parseISO(expense.date), "dd MMM", { locale: ptBR })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-destructive">
              -{formatCurrency(expense.amount)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(expense.id)}
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
