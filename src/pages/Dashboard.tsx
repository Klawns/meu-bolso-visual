import { useFinanceData } from '@/hooks/useFinanceData';
import { StatCard } from '@/components/StatCard';
import { BalanceChart } from '@/components/BalanceChart';
import { ExpenseBarChart } from '@/components/ExpenseBarChart';
import { Wallet, TrendingDown, Pin, CircleDollarSign } from 'lucide-react';

export default function Dashboard() {
  const {
    monthlyIncome,
    getCurrentMonthExpenses,
    getFixedExpenses,
    getVariableExpenses,
    getMonthlyChartData,
  } = useFinanceData();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const currentExpenses = getCurrentMonthExpenses();
  const balance = monthlyIncome - currentExpenses;
  const chartData = getMonthlyChartData();

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 bg-background border-b-2 border-border z-40">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold uppercase tracking-tight">
            Controle Financeiro
          </h1>
          <p className="text-sm text-muted-foreground">
            Acompanhe suas finanças
          </p>
        </div>
      </header>

      <main className="px-4 py-6 space-y-6 max-w-md mx-auto">
        <div className="grid grid-cols-2 gap-3">
          <StatCard
            title="Saldo Atual"
            value={formatCurrency(balance)}
            icon={Wallet}
            variant={balance >= 0 ? 'positive' : 'negative'}
          />
          <StatCard
            title="Gastos do Mês"
            value={formatCurrency(currentExpenses)}
            icon={TrendingDown}
            variant="negative"
          />
          <StatCard
            title="Despesas Fixas"
            value={formatCurrency(getFixedExpenses())}
            icon={Pin}
          />
          <StatCard
            title="Renda Mensal"
            value={formatCurrency(monthlyIncome)}
            icon={CircleDollarSign}
            variant="positive"
          />
        </div>

        <BalanceChart data={chartData} />
        
        <ExpenseBarChart data={chartData} />
      </main>
    </div>
  );
}
