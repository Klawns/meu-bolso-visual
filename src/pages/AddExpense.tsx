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
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 bg-background border-b-2 border-border z-40">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold uppercase tracking-tight">
            Nova Despesa
          </h1>
          <p className="text-sm text-muted-foreground">
            Registre uma nova despesa
          </p>
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto">
        <ExpenseForm onSubmit={handleSubmit} />
      </main>
    </div>
  );
}
