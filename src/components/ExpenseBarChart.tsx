import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { MonthlyData } from '@/types/finance';

interface ExpenseBarChartProps {
  data: MonthlyData[];
}

export function ExpenseBarChart({ data }: ExpenseBarChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      notation: 'compact',
    }).format(value);
  };

  return (
    <div className="border-2 border-border p-4 bg-card shadow-sm">
      <h3 className="text-sm font-semibold uppercase mb-4">Receitas vs Despesas</h3>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <YAxis 
              tickFormatter={formatCurrency}
              tick={{ fontSize: 10 }}
              stroke="hsl(var(--muted-foreground))"
            />
            <Tooltip
              formatter={(value: number, name: string) => [
                formatCurrency(value),
                name === 'income' ? 'Receita' : 'Despesas',
              ]}
              contentStyle={{
                border: '2px solid hsl(var(--border))',
                background: 'hsl(var(--background))',
                boxShadow: 'var(--shadow-sm)',
              }}
            />
            <Legend 
              formatter={(value) => value === 'income' ? 'Receita' : 'Despesas'}
            />
            <Bar dataKey="income" fill="hsl(var(--chart-2))" />
            <Bar dataKey="expenses" fill="hsl(var(--chart-1))" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
