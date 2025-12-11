import { NavLink } from '@/components/NavLink';
import { Home, PlusCircle, List, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function Header() {
  const { isDark, toggleTheme } = useTheme();

  const navItems = [
    { to: '/', icon: Home, label: 'Início' },
    { to: '/expenses', icon: List, label: 'Despesas' },
    { to: '/add', icon: PlusCircle, label: 'Adicionar' },
    { to: '/settings', icon: Settings, label: 'Config' },
  ];

  return (
    <header className="sticky top-0 bg-background/80 backdrop-blur-lg z-40 border-b border-border/50">
      <div className="px-6 py-5 max-w-6xl mx-auto flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold text-foreground">
            Controle Financeiro
          </h1>
          <p className="text-sm text-muted-foreground">
            Visão geral do mês
          </p>
        </div>
        
        <nav className="flex items-center gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              className="flex items-center gap-2 px-4 py-2.5 text-muted-foreground transition-all rounded-xl hover:bg-accent"
              activeClassName="text-primary bg-primary/10"
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium hidden sm:inline">{label}</span>
            </NavLink>
          ))}
          
          <button
            onClick={toggleTheme}
            className="ml-2 p-2.5 rounded-xl text-muted-foreground hover:bg-accent transition-all"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </nav>
      </div>
    </header>
  );
}
