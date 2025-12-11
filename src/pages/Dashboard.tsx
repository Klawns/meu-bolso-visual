import { useFinanceData } from '@/hooks/useFinanceData';
import { StatCard } from '@/components/StatCard';
import { BalanceChart } from '@/components/BalanceChart';
import { ExpenseBarChart } from '@/components/ExpenseBarChart';
import { Wallet, TrendingDown, Pin } from 'lucide-react';

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
    <main className="px-6 py-8 max-w-6xl mx-auto">
      {/* Top row: Balance card + Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
        {/* Main balance card */}
        <div className="rounded-2xl p-8 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg md:col-span-2 lg:col-span-1">
          <p className="text-base opacity-90 mb-2">Saldo disponível</p>
          <p className="text-3xl font-bold tracking-tight mb-4">
            {formatCurrency(balance)}
          </p>
          <div className="flex gap-6 text-sm">
            <div>
              <p className="opacity-75 text-sm">Receita</p>
              <p className="font-semibold text-base">{formatCurrency(monthlyIncome)}</p>
            </div>
            <div>
              <p className="opacity-75 text-sm">Despesas</p>
              <p className="font-semibold text-base">{formatCurrency(currentExpenses)}</p>
            </div>
          </div>
        </div>

        {/* Stats cards */}
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
          title="Variáveis"
          value={formatCurrency(getVariableExpenses())}
          icon={Wallet}
        />
      </div>

      {/* Charts row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        <BalanceChart data={chartData} />
        <ExpenseBarChart data={chartData} />
      </div>
    </main>
  );
}
