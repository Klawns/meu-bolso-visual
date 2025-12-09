import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFinanceData } from '@/hooks/useFinanceData';
import { toast } from 'sonner';

export default function Settings() {
  const { monthlyIncome, setMonthlyIncome } = useFinanceData();
  const [incomeInput, setIncomeInput] = useState(monthlyIncome.toString());

  useEffect(() => {
    setIncomeInput(monthlyIncome.toString());
  }, [monthlyIncome]);

  const handleSaveIncome = () => {
    const value = parseFloat(incomeInput);
    if (isNaN(value) || value < 0) {
      toast.error('Digite um valor válido');
      return;
    }
    setMonthlyIncome(value);
    toast.success('Renda mensal atualizada!');
  };

  const handleClearData = () => {
    if (confirm('Tem certeza que deseja apagar todos os dados?')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="min-h-screen pb-20">
      <header className="sticky top-0 bg-background border-b-2 border-border z-40">
        <div className="px-4 py-4">
          <h1 className="text-xl font-bold uppercase tracking-tight">
            Configurações
          </h1>
          <p className="text-sm text-muted-foreground">
            Personalize o app
          </p>
        </div>
      </header>

      <main className="px-4 py-6 max-w-md mx-auto space-y-8">
        <section className="border-2 border-border p-4 space-y-4">
          <h2 className="font-semibold uppercase text-sm">Renda Mensal</h2>
          <p className="text-sm text-muted-foreground">
            Defina sua renda mensal para calcular o saldo disponível.
          </p>
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="income">Valor (R$)</Label>
              <Input
                id="income"
                type="number"
                step="0.01"
                min="0"
                value={incomeInput}
                onChange={(e) => setIncomeInput(e.target.value)}
                className="border-2 font-mono text-lg"
                placeholder="0,00"
              />
            </div>
            <Button onClick={handleSaveIncome} className="w-full">
              Salvar
            </Button>
          </div>
        </section>

        <section className="border-2 border-destructive p-4 space-y-4">
          <h2 className="font-semibold uppercase text-sm text-destructive">
            Zona de Perigo
          </h2>
          <p className="text-sm text-muted-foreground">
            Apagar todos os dados salvos no app. Esta ação não pode ser desfeita.
          </p>
          <Button
            variant="destructive"
            onClick={handleClearData}
            className="w-full"
          >
            Apagar Todos os Dados
          </Button>
        </section>
      </main>
    </div>
  );
}
