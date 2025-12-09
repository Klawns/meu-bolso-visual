import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ExpenseCategory, categoryLabels } from '@/types/finance';
import { format } from 'date-fns';

interface ExpenseFormProps {
  onSubmit: (expense: {
    description: string;
    amount: number;
    category: ExpenseCategory;
    isFixed: boolean;
    date: string;
  }) => void;
}

export function ExpenseForm({ onSubmit }: ExpenseFormProps) {
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState<ExpenseCategory>('outros');
  const [isFixed, setIsFixed] = useState(false);
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!description.trim() || !amount || parseFloat(amount) <= 0) {
      return;
    }

    onSubmit({
      description: description.trim(),
      amount: parseFloat(amount),
      category,
      isFixed,
      date,
    });

    setDescription('');
    setAmount('');
    setCategory('outros');
    setIsFixed(false);
    setDate(format(new Date(), 'yyyy-MM-dd'));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="description" className="text-sm font-medium">
          Descrição
        </Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Ex: Supermercado"
          className="h-11"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="amount" className="text-sm font-medium">
          Valor (R$)
        </Label>
        <Input
          id="amount"
          type="number"
          step="0.01"
          min="0"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="0,00"
          className="h-11 text-lg font-medium"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="category" className="text-sm font-medium">
            Categoria
          </Label>
          <Select value={category} onValueChange={(v) => setCategory(v as ExpenseCategory)}>
            <SelectTrigger className="h-11">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <SelectItem key={key} value={key}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="date" className="text-sm font-medium">
            Data
          </Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="h-11"
          />
        </div>
      </div>

      <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
        <div>
          <Label htmlFor="isFixed" className="text-sm font-medium">
            Despesa Fixa
          </Label>
          <p className="text-xs text-muted-foreground">
            Repete mensalmente
          </p>
        </div>
        <Switch
          id="isFixed"
          checked={isFixed}
          onCheckedChange={setIsFixed}
        />
      </div>

      <Button type="submit" className="w-full h-12 text-base font-medium">
        Adicionar Despesa
      </Button>
    </form>
  );
}
