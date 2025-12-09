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

      <main className="px-5 py-6 space-y-5 max-w-md mx-auto">
        {/* Main balance card */}
        <div className="rounded-2xl p-6 bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg">
          <p className="text-sm opacity-90 mb-1">Saldo disponível</p>
          <p className="text-3xl font-bold tracking-tight mb-4">
            {formatCurrency(balance)}
          </p>
          <div className="flex gap-6 text-sm">
            <div>
              <p className="opacity-75 text-xs">Receita</p>
              <p className="font-semibold">{formatCurrency(monthlyIncome)}</p>
            </div>
            <div>
              <p className="opacity-75 text-xs">Despesas</p>
              <p className="font-semibold">{formatCurrency(currentExpenses)}</p>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 overflow-x-auto pb-1 -mx-5 px-5">
          <StatCard
            title="Gastos do Mês"
            value={formatCurrency(currentExpenses)}
            icon={TrendingDown}
            variant="negative"
            className="min-w-[140px] flex-1"
          />
          <StatCard
            title="Despesas Fixas"
            value={formatCurrency(getFixedExpenses())}
            icon={Pin}
            className="min-w-[140px] flex-1"
          />
          <StatCard
            title="Variáveis"
            value={formatCurrency(getVariableExpenses())}
            icon={Wallet}
            className="min-w-[140px] flex-1"
          />
        </div>

        {/* Charts */}
        <BalanceChart data={chartData} />
        <ExpenseBarChart data={chartData} />
      </main>
    </div>
  );
}
