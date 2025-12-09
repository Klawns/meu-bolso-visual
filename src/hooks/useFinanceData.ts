import { useState, useEffect } from 'react';
import { Expense, MonthlyData } from '@/types/finance';
import { format, parseISO, startOfMonth, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const STORAGE_KEY = 'finance_expenses';
const INCOME_KEY = 'finance_income';

export function useFinanceData() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);

  useEffect(() => {
    const savedExpenses = localStorage.getItem(STORAGE_KEY);
    const savedIncome = localStorage.getItem(INCOME_KEY);
    
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
    if (savedIncome) {
      setMonthlyIncome(JSON.parse(savedIncome));
    }
  }, []);

  const saveExpenses = (newExpenses: Expense[]) => {
    setExpenses(newExpenses);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newExpenses));
  };

  const saveIncome = (income: number) => {
    setMonthlyIncome(income);
    localStorage.setItem(INCOME_KEY, JSON.stringify(income));
  };

  const addExpense = (expense: Omit<Expense, 'id' | 'createdAt'>) => {
    const newExpense: Expense = {
      ...expense,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
    };
    saveExpenses([...expenses, newExpense]);
  };

  const deleteExpense = (id: string) => {
    saveExpenses(expenses.filter(e => e.id !== id));
  };

  const updateExpense = (id: string, updates: Partial<Expense>) => {
    saveExpenses(expenses.map(e => e.id === id ? { ...e, ...updates } : e));
  };

  const getTotalExpenses = () => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  };

  const getCurrentMonthExpenses = () => {
    const currentMonth = format(new Date(), 'yyyy-MM');
    return expenses
      .filter(e => e.date.startsWith(currentMonth))
      .reduce((sum, e) => sum + e.amount, 0);
  };

  const getFixedExpenses = () => {
    return expenses.filter(e => e.isFixed).reduce((sum, e) => sum + e.amount, 0);
  };

  const getVariableExpenses = () => {
    return expenses.filter(e => !e.isFixed).reduce((sum, e) => sum + e.amount, 0);
  };

  const getMonthlyChartData = (): MonthlyData[] => {
    const data: MonthlyData[] = [];
    
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const monthKey = format(date, 'yyyy-MM');
      const monthLabel = format(date, 'MMM', { locale: ptBR });
      
      const monthExpenses = expenses
        .filter(e => e.date.startsWith(monthKey))
        .reduce((sum, e) => sum + e.amount, 0);
      
      data.push({
        month: monthLabel.charAt(0).toUpperCase() + monthLabel.slice(1),
        income: monthlyIncome,
        expenses: monthExpenses,
        balance: monthlyIncome - monthExpenses,
      });
    }
    
    return data;
  };

  const getCategoryData = () => {
    const categoryTotals: Record<string, number> = {};
    
    expenses.forEach(e => {
      categoryTotals[e.category] = (categoryTotals[e.category] || 0) + e.amount;
    });
    
    return Object.entries(categoryTotals).map(([category, amount]) => ({
      category,
      amount,
    }));
  };

  return {
    expenses,
    monthlyIncome,
    setMonthlyIncome: saveIncome,
    addExpense,
    deleteExpense,
    updateExpense,
    getTotalExpenses,
    getCurrentMonthExpenses,
    getFixedExpenses,
    getVariableExpenses,
    getMonthlyChartData,
    getCategoryData,
  };
}
