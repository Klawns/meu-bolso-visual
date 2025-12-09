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
    <div className="min-h-screen pb-20 bg-background">
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-40 border-b border-border/50">
        <div className="px-5 py-4 max-w-md mx-auto">
          <h1 className="text-lg font-semibold text-foreground">
            Controle Financeiro
          </h1>
          <p className="text-sm text-muted-foreground">
            Visão geral do mês
          </p>
        </div>
      </header>

      <main className="px-5 py-6 max-w-6xl mx-auto">
        {/* Top row: Balance card + Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {/* Main balance card */}
          <div className="rounded-2xl p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg md:col-span-2 lg:col-span-1">
            <p className="text-sm opacity-90 mb-1">Saldo disponível</p>
            <p className="text-2xl font-bold tracking-tight mb-3">
              {formatCurrency(balance)}
            </p>
            <div className="flex gap-4 text-sm">
              <div>
                <p className="opacity-75 text-xs">Receita</p>
                <p className="font-semibold text-sm">{formatCurrency(monthlyIncome)}</p>
              </div>
              <div>
                <p className="opacity-75 text-xs">Despesas</p>
                <p className="font-semibold text-sm">{formatCurrency(currentExpenses)}</p>
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
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <BalanceChart data={chartData} />
          <ExpenseBarChart data={chartData} />
        </div>
      </main>
    </div>
  );
}
