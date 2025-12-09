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
  const totalFixed = fixedExpenses.reduce((sum, e) => sum + e.amount, 0);
  const totalVariable = variableExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen pb-20 bg-background">
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-40 border-b border-border/50">
        <div className="px-5 py-4 max-w-md mx-auto">
          <h1 className="text-lg font-semibold text-foreground">
            Despesas
          </h1>
          <p className="text-sm text-muted-foreground">
            Total: {formatCurrency(totalAll)}
          </p>
        </div>
      </header>

      <main className="px-5 py-5 max-w-md mx-auto">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-5 h-10 p-1">
            <TabsTrigger value="all" className="text-xs">
              Todas ({expenses.length})
            </TabsTrigger>
            <TabsTrigger value="fixed" className="text-xs">
              Fixas ({fixedExpenses.length})
            </TabsTrigger>
            <TabsTrigger value="variable" className="text-xs">
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
    </div>
  );
}
