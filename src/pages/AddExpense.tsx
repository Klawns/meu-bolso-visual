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
    <main className="px-6 py-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-1">Nova Despesa</h2>
        <p className="text-base text-muted-foreground">Registre um novo gasto</p>
      </div>

      <div className="max-w-lg">
        <ExpenseForm onSubmit={handleSubmit} />
      </div>
    </main>
  );
}
