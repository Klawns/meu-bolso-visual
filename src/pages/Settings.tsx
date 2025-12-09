import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFinanceData } from '@/hooks/useFinanceData';
import { toast } from 'sonner';
import { CircleDollarSign, Trash2 } from 'lucide-react';

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
    <div className="min-h-screen pb-20 bg-background">
      <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-40 border-b border-border/50">
        <div className="px-5 py-4 max-w-md mx-auto">
          <h1 className="text-lg font-semibold text-foreground">
            Configurações
          </h1>
          <p className="text-sm text-muted-foreground">
            Personalize o app
          </p>
        </div>
      </header>

      <main className="px-5 py-5 max-w-md mx-auto space-y-5">
        <section className="rounded-xl border border-border/50 bg-card p-5 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-primary/10">
              <CircleDollarSign className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h2 className="font-medium">Renda Mensal</h2>
              <p className="text-xs text-muted-foreground">
                Defina sua receita mensal
              </p>
            </div>
          </div>
          <div className="flex gap-3">
            <Input
              type="number"
              step="0.01"
              min="0"
              value={incomeInput}
              onChange={(e) => setIncomeInput(e.target.value)}
              className="flex-1 h-11"
              placeholder="0,00"
            />
            <Button onClick={handleSaveIncome} className="h-11 px-6">
              Salvar
            </Button>
          </div>
        </section>

        <section className="rounded-xl border border-destructive/30 bg-destructive/5 p-5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-destructive/10">
              <Trash2 className="w-5 h-5 text-destructive" />
            </div>
            <div>
              <h2 className="font-medium text-destructive">Apagar Dados</h2>
              <p className="text-xs text-muted-foreground">
                Esta ação não pode ser desfeita
              </p>
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={handleClearData}
            className="w-full h-11"
          >
            Apagar Todos os Dados
          </Button>
        </section>
      </main>
    </div>
  );
}
