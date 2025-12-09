export type ExpenseCategory = 
  | 'alimentacao'
  | 'transporte'
  | 'moradia'
  | 'saude'
  | 'lazer'
  | 'educacao'
  | 'outros';

export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: ExpenseCategory;
  isFixed: boolean;
  date: string;
  createdAt: string;
}

export interface MonthlyData {
  month: string;
  income: number;
  expenses: number;
  balance: number;
}

export const categoryLabels: Record<ExpenseCategory, string> = {
  alimentacao: 'Alimentação',
  transporte: 'Transporte',
  moradia: 'Moradia',
  saude: 'Saúde',
  lazer: 'Lazer',
  educacao: 'Educação',
  outros: 'Outros',
};

export const categoryColors: Record<ExpenseCategory, string> = {
  alimentacao: 'hsl(var(--chart-1))',
  transporte: 'hsl(var(--chart-2))',
  moradia: 'hsl(var(--chart-3))',
  saude: 'hsl(var(--chart-4))',
  lazer: 'hsl(var(--chart-5))',
  educacao: 'hsl(12 76% 61%)',
  outros: 'hsl(0 0% 45%)',
};
