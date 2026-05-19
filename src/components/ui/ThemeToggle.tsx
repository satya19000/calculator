import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { cn } from '@/lib/utils';

export function ThemeToggle({ size = 'md' }: { size?: 'sm' | 'md' }) {
  const { theme, toggleTheme, isDark } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      aria-label="Toggle theme"
      className={cn(
        'flex items-center gap-2 rounded-full border font-semibold transition-all duration-300',
        'border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500',
        'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700',
        'text-slate-600 dark:text-slate-300',
        size === 'sm' ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'
      )}
    >
      <span className={cn(
        'flex items-center justify-center rounded-full transition-all duration-300',
        size === 'sm' ? 'w-4 h-4' : 'w-5 h-5',
        isDark ? 'bg-slate-700 text-slate-300' : 'bg-amber-100 text-amber-500'
      )}>
        {isDark ? <Moon size={size === 'sm' ? 10 : 12} /> : <Sun size={size === 'sm' ? 10 : 12} />}
      </span>
      <span className="hidden sm:inline">{isDark ? 'Dark' : 'Light'}</span>
      {/* Toggle pill */}
      <span className={cn(
        'relative inline-flex items-center rounded-full border transition-all duration-300',
        'w-8 h-4 border-slate-300 dark:border-slate-600',
        isDark ? 'bg-slate-700' : 'bg-blue-500'
      )}>
        <span className={cn(
          'absolute w-3 h-3 rounded-full transition-all duration-300 shadow-sm',
          isDark ? 'left-0.5 bg-slate-400' : 'left-[calc(100%-14px)] bg-white'
        )} />
      </span>
    </button>
  );
}

export function ThemeBadge() {
  const { isDark } = useTheme();
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold border tracking-wider transition-all duration-300',
      isDark
        ? 'bg-slate-800 text-slate-400 border-slate-700'
        : 'bg-amber-50 text-amber-600 border-amber-200'
    )}>
      {isDark ? '🌙' : '☀️'} {isDark ? 'DARK MODE' : 'LIGHT MODE'}
    </span>
  );
}
