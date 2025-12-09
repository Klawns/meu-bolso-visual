import { useFinanceData } from '@/hooks/useFinanceData';
import { ExpenseList } from '@/components/ExpenseList';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function Expenses() {
  const { expenses, deleteExpense } = useFinanceData();

  const fixedExpenses = expenses.filter((e) => e.isFixed);
  const variableExpenses = expenses.filter((e) => !e.isFixed);

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 bg-background border-b-2 border-border z-40">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold uppercase tracking-tight">
            Despesas
          </h1>
          <p className="text-sm text-muted-foreground">
            Gerencie suas despesas
          </p>
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto">
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="fixed">Fixas</TabsTrigger>
            <TabsTrigger value="variable">Variáveis</TabsTrigger>
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
