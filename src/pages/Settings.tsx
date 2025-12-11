import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
    <main className="px-6 py-8 max-w-6xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-foreground mb-1">Configurações</h2>
        <p className="text-base text-muted-foreground">Personalize o app</p>
      </div>

      <div className="max-w-lg space-y-6">
        <section className="rounded-2xl border border-border/50 bg-card p-6 shadow-sm">
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 rounded-xl bg-primary/10">
              <CircleDollarSign className="w-6 h-6 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-medium">Renda Mensal</h3>
              <p className="text-sm text-muted-foreground">
                Defina sua receita mensal
              </p>
            </div>
          </div>
          <div className="flex gap-4">
            <Input
              type="number"
              step="0.01"
              min="0"
              value={incomeInput}
              onChange={(e) => setIncomeInput(e.target.value)}
              className="flex-1 h-12 text-base"
              placeholder="0,00"
            />
            <Button onClick={handleSaveIncome} className="h-12 px-8 text-base">
              Salvar
            </Button>
          </div>
        </section>

        <section className="rounded-2xl border border-destructive/30 bg-destructive/5 p-6">
          <div className="flex items-center gap-4 mb-5">
            <div className="p-3 rounded-xl bg-destructive/10">
              <Trash2 className="w-6 h-6 text-destructive" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-destructive">Apagar Dados</h3>
              <p className="text-sm text-muted-foreground">
                Esta ação não pode ser desfeita
              </p>
            </div>
          </div>
          <Button
            variant="destructive"
            onClick={handleClearData}
            className="w-full h-12 text-base"
          >
            Apagar Todos os Dados
          </Button>
        </section>
      </div>
    </main>
  );
}
