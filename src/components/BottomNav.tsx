import { NavLink } from '@/components/NavLink';
import { Home, PlusCircle, List, Settings } from 'lucide-react';

export function BottomNav() {
  const navItems = [
    { to: '/', icon: Home, label: 'Início' },
    { to: '/expenses', icon: List, label: 'Despesas' },
    { to: '/add', icon: PlusCircle, label: 'Adicionar' },
    { to: '/settings', icon: Settings, label: 'Config' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/80 backdrop-blur-lg border-t border-border/50 z-50">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className="flex flex-col items-center justify-center gap-1 px-4 py-2 text-muted-foreground transition-all rounded-xl"
            activeClassName="text-primary bg-primary/5"
          >
            <Icon className="w-5 h-5" />
            <span className="text-[10px] font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
