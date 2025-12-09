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
      <div className="text-center py-12 border-2 border-dashed border-border">
        <p className="text-muted-foreground">Nenhuma despesa registrada</p>
        <p className="text-sm text-muted-foreground mt-1">
          Adicione sua primeira despesa
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {sortedExpenses.map((expense) => (
        <div
          key={expense.id}
          className="flex items-center justify-between p-4 border-2 border-border bg-card shadow-2xs"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-semibold truncate">{expense.description}</p>
              {expense.isFixed && (
                <Pin className="w-3 h-3 text-muted-foreground flex-shrink-0" />
              )}
            </div>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-xs px-2 py-0.5 bg-secondary text-secondary-foreground">
                {categoryLabels[expense.category]}
              </span>
              <span className="text-xs text-muted-foreground">
                {format(parseISO(expense.date), "dd 'de' MMM", { locale: ptBR })}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-4">
            <span className="font-mono font-bold text-destructive">
              -{formatCurrency(expense.amount)}
            </span>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(expense.id)}
              className="h-8 w-8"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}
