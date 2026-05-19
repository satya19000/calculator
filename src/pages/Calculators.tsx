import { useState, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import { CALCULATORS, CATEGORIES } from '@/lib/calculators';
import { Badge } from '@/components/ui';
import { cn } from '@/lib/utils';

export default function Calculators() {
  const [params] = useSearchParams();
  const initQ = params.get('q') || '';
  const initCat = params.get('cat') || 'all';
  const [search, setSearch] = useState(initQ);
  const [cat, setCat] = useState(initCat);

  const filtered = useMemo(() =>
    CALCULATORS.filter(c => {
      const mc = cat === 'all' || c.category === cat;
      const ms = !search || c.name.toLowerCase().includes(search.toLowerCase()) || c.description.toLowerCase().includes(search.toLowerCase());
      return mc && ms;
    }), [cat, search]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight mb-2">All Calculators</h1>
        <p className="text-slate-500 dark:text-slate-400">500+ free calculators — search, filter, and bookmark your favorites.</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search calculators…"
            className="input-field pl-9 pr-9" />
          {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"><X size={14}/></button>}
        </div>
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button key={c.id} onClick={() => setCat(c.id)}
              className={cn('px-3 py-2 rounded-xl text-xs font-semibold border transition-all', cat === c.id ? 'bg-blue-500 text-white border-transparent' : 'btn-secondary')}>
              {c.label} <span className="opacity-60">({c.count})</span>
            </button>
          ))}
        </div>
      </div>

      <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">{filtered.length} calculator{filtered.length !== 1 ? 's' : ''}{search ? ` for "${search}"` : ''}</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filtered.map(c => (
          <Link key={c.id} to={`/calculators/${c.id}`} className="card-hover p-5 block group">
            <div className="flex items-start justify-between mb-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center text-lg" style={{background:`${c.accent}15`,border:`1px solid ${c.accent}25`}}>
                {c.id==='emi'?'💰':c.id==='bmi'?'❤️':c.id==='sip'?'📈':c.id==='compound'?'⚡':c.id==='gst'?'🧾':c.id==='currency'?'💱':c.id==='percentage'?'%':c.id==='age'?'🎂':c.id==='tip'?'🍽️':c.id==='gpa'?'🎓':c.id==='crypto'?'₿':c.id==='discount'?'🏷️':c.id==='calorie'?'🔥':c.id==='bodyfat'?'💪':c.id==='unit'?'📐':'🧮'}
              </div>
              {c.badge && <Badge variant={c.badge==='New'?'new':'success'}>{c.badge}</Badge>}
            </div>
            <h3 className="font-bold text-sm mb-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{c.name}</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed line-clamp-2">{c.description}</p>
            <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize" style={{background:`${c.accent}12`,color:c.accent}}>{c.category}</span>
          </Link>
        ))}
        {filtered.length === 0 && (
          <div className="col-span-full text-center py-16 text-slate-500 dark:text-slate-400">
            <div className="text-4xl mb-3">🔍</div>
            <p className="font-semibold mb-1">No calculators found</p>
            <p className="text-sm">Try a different search term or category</p>
          </div>
        )}
      </div>
    </div>
  );
}
