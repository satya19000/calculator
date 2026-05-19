import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Calculator, Sparkles, Menu, X, User } from 'lucide-react';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { cn } from '@/lib/utils';

const NAV = [
  { to:'/calculators', label:'All Calculators' },
  { to:'/calculators?cat=finance', label:'Finance' },
  { to:'/calculators?cat=health', label:'Health' },
  { to:'/calculators?cat=crypto', label:'Crypto' },
];

export function Navbar() {
  const [open, setOpen] = useState(false);
  const loc = useLocation();

  return (
    <header className="sticky top-0 z-50 glass border-b border-slate-200 dark:border-slate-800">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center shadow-md">
            <Calculator size={15} className="text-white" />
          </div>
          <span className="font-black text-lg tracking-tight">
            Calc<span className="text-blue-500 dark:text-blue-400">Verse</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {NAV.map(n => (
            <Link key={n.to} to={n.to}
              className={cn('px-3 py-2 rounded-lg text-sm font-medium transition-all',
                loc.pathname === n.to.split('?')[0] && !n.to.includes('?')
                  ? 'text-blue-500 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/10'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
              )}>
              {n.label}
            </Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Link to="/ai" className="hidden sm:flex btn-gradient text-xs px-4 py-2">
            <Sparkles size={13} /> AI Assistant
          </Link>
          <button className="hidden sm:flex btn-secondary text-xs px-4 py-2">
            <User size={13} /> Sign In
          </button>
          <button onClick={() => setOpen(!open)} className="md:hidden btn-ghost p-2">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c0f1e] px-4 py-3 space-y-1 animate-fade-up">
          {NAV.map(n => (
            <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
              className="block px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
              {n.label}
            </Link>
          ))}
          <div className="flex gap-2 pt-2">
            <Link to="/ai" onClick={() => setOpen(false)} className="btn-gradient flex-1 justify-center text-xs py-2">
              <Sparkles size={13} /> AI Assistant
            </Link>
            <button className="btn-secondary flex-1 text-xs py-2">
              <User size={13} /> Sign In
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
