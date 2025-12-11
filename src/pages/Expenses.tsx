import { useFinanceData } from '@/hooks/useFinanceData';
import { ExpenseList } from '@/components/ExpenseList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Expenses() {
  const { expenses, deleteExpense } = useFinanceData();

  const fixedExpenses = expenses.filter((e) => e.isFixed);
  const variableExpenses = expenses.filter((e) => !e.isFixed);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const totalAll = expenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <main className="px-6 py-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-1">Despesas</h2>
        <p className="text-base text-muted-foreground">Total: {formatCurrency(totalAll)}</p>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3 mb-6 h-12 p-1">
          <TabsTrigger value="all" className="text-sm">
            Todas ({expenses.length})
          </TabsTrigger>
          <TabsTrigger value="fixed" className="text-sm">
            Fixas ({fixedExpenses.length})
          </TabsTrigger>
          <TabsTrigger value="variable" className="text-sm">
            Variáveis ({variableExpenses.length})
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="all">
          <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        </TabsContent>
        
        <TabsContent value="fixed">
          <ExpenseList expenses={fixedExpenses} onDelete={deleteExpense} />
        </TabsContent>
        
        <TabsContent value="variable">
          <ExpenseList expenses={variableExpenses} onDelete={deleteExpense} />
        </TabsContent>
      </Tabs>
    </main>
  );
}
