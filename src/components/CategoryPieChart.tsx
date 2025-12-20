import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { categoryLabels, categoryColors, ExpenseCategory } from '@/types/finance';

interface CategoryData {
  category: string;
  amount: number;
}

interface CategoryPieChartProps {
  data: CategoryData[];
}

export function CategoryPieChart({ data }: CategoryPieChartProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  const chartData = data.map(item => ({
    name: categoryLabels[item.category as ExpenseCategory] || item.category,
    value: item.amount,
    color: categoryColors[item.category as ExpenseCategory] || 'hsl(var(--muted-foreground))',
  }));

  if (chartData.length === 0) {
    return (
      <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
        <h3 className="text-lg font-semibold text-card-foreground mb-4">Gastos por Categoria</h3>
        <div className="h-[280px] flex items-center justify-center text-muted-foreground">
          Nenhuma despesa registrada
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm border border-border">
      <h3 className="text-lg font-semibold text-card-foreground mb-4">Gastos por Categoria</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
              labelLine={false}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              formatter={(value: number) => formatCurrency(value)}
              contentStyle={{
                backgroundColor: 'hsl(var(--card))',
                border: '1px solid hsl(var(--border))',
                borderRadius: '8px',
                color: 'hsl(var(--card-foreground))',
              }}
            />
            <Legend
              formatter={(value) => (
                <span className="text-sm text-muted-foreground">{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
