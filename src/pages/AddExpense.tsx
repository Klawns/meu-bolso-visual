import { useNavigate } from 'react-router-dom';
import { ExpenseForm } from '@/components/ExpenseForm';
import { useFinanceData } from '@/hooks/useFinanceData';
import { toast } from 'sonner';

export default function AddExpense() {
  const navigate = useNavigate();
  const { addExpense } = useFinanceData();

  const handleSubmit = (expense: Parameters<typeof addExpense>[0]) => {
    addExpense(expense);
    toast.success('Despesa adicionada com sucesso!');
    navigate('/expenses');
  };

  return (
    <div className="min-h-screen pb-20 bg-background">
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-40 border-b border-border/50">
        <div className="px-5 py-4 max-w-md mx-auto">
          <h1 className="text-lg font-semibold text-foreground">
            Nova Despesa
          </h1>
          <p className="text-sm text-muted-foreground">
            Registre um novo gasto
          </p>
        </div>
      </header>

      <main className="px-5 py-5 max-w-md mx-auto">
        <ExpenseForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
