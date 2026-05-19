import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Sparkles, ArrowRight, Zap, TrendingUp, Heart, Globe, Users, Star } from 'lucide-react';
import { CALCULATORS } from '@/lib/calculators';
import { Badge } from '@/components/ui';
import { ThemeBadge } from '@/components/ui/ThemeToggle';

const TRENDING = CALCULATORS.filter(c => c.badge).slice(0, 6);
const STATS = [
  { icon: Zap, val: '500+', label: 'Calculators', color: 'text-blue-500 dark:text-blue-400' },
  { icon: Users, val: '12M+', label: 'Monthly Users', color: 'text-emerald-500 dark:text-emerald-400' },
  { icon: Globe, val: '20', label: 'Languages', color: 'text-violet-500 dark:text-violet-400' },
  { icon: Star, val: '40', label: 'Currencies', color: 'text-yellow-500 dark:text-yellow-400' },
];
const CAT_COLORS: Record<string,string> = { finance:'text-emerald-500',health:'text-pink-500',basic:'text-blue-500',fitness:'text-orange-500',education:'text-yellow-500',science:'text-violet-500',crypto:'text-emerald-500',utility:'text-cyan-500' };

export default function Home() {
  const [q, setQ] = useState('');
  const navigate = useNavigate();
  const handleSearch = (e: React.FormEvent) => { e.preventDefault(); if(q.trim()) navigate(`/calculators?q=${encodeURIComponent(q)}`); };

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden pt-16 pb-12 px-4 text-center">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full bg-blue-500/6 dark:bg-blue-500/8 blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-72 h-72 rounded-full bg-violet-500/5 dark:bg-violet-500/6 blur-3xl pointer-events-none" />
        <div className="max-w-4xl mx-auto relative">
          <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/25 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-wider">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              AI-POWERED · 500+ CALCULATORS · FREE FOREVER
            </div>
            <ThemeBadge />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight mb-5 leading-[1.04]">
            The World's Smartest<br />
            <span className="gradient-text">Calculator Platform</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
            Finance, health, science, crypto & more — with AI explanations, step-by-step solutions, and beautiful visualizations in 20 languages.
          </p>
          <form onSubmit={handleSearch} className="relative max-w-xl mx-auto mb-8">
            <div className="flex items-center gap-3 bg-white dark:bg-[#0c0f1e] border border-slate-200 dark:border-slate-700 rounded-2xl px-5 py-3.5 shadow-xl focus-within:border-blue-400 dark:focus-within:border-blue-500 transition-all">
              <Search size={18} className="text-slate-400 shrink-0" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search EMI, BMI, GST, Compound Interest…"
                className="flex-1 bg-transparent text-sm sm:text-base outline-none text-slate-900 dark:text-slate-100 placeholder:text-slate-400" />
              <button type="submit" className="btn-primary py-2 text-sm shrink-0">Search</button>
            </div>
            <div className="flex flex-wrap gap-2 justify-center mt-3">
              {['EMI Calculator','BMI Calculator','Currency Converter','GST Calculator','SIP Calculator'].map(p => (
                <Link key={p} to={`/calculators/${p.toLowerCase().replace(/ /g,'-').replace('calculator','').trim().replace(/\s+/g,'-')}`}
                  className="text-xs px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 transition-all hover:border-blue-400">
                  {p}
                </Link>
              ))}
            </div>
          </form>
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-14">
            <Link to="/calculators" className="btn-gradient text-base px-8 py-3"><ArrowRight size={18}/> Explore All Calculators</Link>
            <Link to="/ai" className="btn-secondary text-base px-8 py-3"><Sparkles size={18}/> Try AI Assistant</Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto">
            {STATS.map(({ icon: Icon, val, label, color }) => (
              <div key={label} className="card p-4 text-center hover:shadow-lg transition-all">
                <Icon size={18} className={`${color} mx-auto mb-2`} />
                <div className={`text-2xl font-black ${color}`}>{val}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending */}
      <section className="py-14 px-4 max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-7">
          <div><h2 className="text-3xl font-black tracking-tight mb-1">🔥 Most Popular</h2><p className="text-slate-500 dark:text-slate-400 text-sm">Used by millions every day</p></div>
          <Link to="/calculators" className="text-blue-500 dark:text-blue-400 text-sm font-semibold hover:underline">View all →</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {TRENDING.map(c => (
            <Link key={c.id} to={`/calculators/${c.id}`} className="card-hover p-5 block group">
              <div className="flex items-start justify-between mb-3">
                <div className="w-11 h-11 rounded-xl flex items-center justify-center text-xl" style={{background:`${c.accent}15`,border:`1px solid ${c.accent}25`}}>
                  {c.id==='emi'?'💰':c.id==='bmi'?'❤️':c.id==='sip'?'📈':c.id==='currency'?'💱':c.id==='gst'?'🧾':'🧮'}
                </div>
                {c.badge && <Badge variant={c.badge==='New'?'new':c.badge==='Popular'?'success':'default'}>{c.badge}</Badge>}
              </div>
              <h3 className="font-bold text-base mb-1 group-hover:text-blue-500 dark:group-hover:text-blue-400 transition-colors">{c.name}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">{c.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] px-2 py-0.5 rounded-full font-semibold capitalize" style={{background:`${c.accent}12`,color:c.accent}}>{c.category}</span>
                <span className="text-xs text-slate-400 dark:text-slate-500">{c.uses || '1M+ uses'}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="py-14 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-10">
          <h2 className="text-4xl font-black tracking-tight mb-3">Why CalcVerse?</h2>
          <p className="text-slate-500 dark:text-slate-400 max-w-xl mx-auto">Built for students, professionals, traders, doctors, and everyday people worldwide.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { emoji:'🤖', title:'AI-Powered', desc:'Ask Claude AI any math question in plain English and get step-by-step answers.' },
            { emoji:'⚡', title:'Instant Results', desc:'Real-time calculations with beautiful charts and visual breakdowns.' },
            { emoji:'🌍', title:'20 Languages', desc:'Full UI and AI responses available in 20 global languages.' },
            { emoji:'💱', title:'40 Currencies', desc:'Live indicative exchange rates for 40 major world currencies.' },
            { emoji:'📱', title:'PWA Support', desc:'Install as a mobile app and use offline. Works on all devices.' },
            { emoji:'🌗', title:'Dark & Light Mode', desc:'Beautiful dark and light themes with instant switching and smooth transitions.' },
            { emoji:'📄', title:'Copy & Share', desc:'Copy results instantly. Share your calculations with a single link.' },
            { emoji:'🔒', title:'Privacy First', desc:'No data collection. All calculations happen on your device.' },
          ].map(({ emoji, title, desc }) => (
            <div key={title} className="card p-5 hover:shadow-lg transition-all">
              <div className="text-2xl mb-3">{emoji}</div>
              <h3 className="font-bold text-sm mb-1.5">{title}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="max-w-3xl mx-auto text-center bg-gradient-to-br from-blue-500/8 to-violet-500/8 dark:from-blue-500/10 dark:to-violet-500/10 border border-blue-200 dark:border-blue-500/20 rounded-3xl p-10 sm:p-14">
          <div className="text-5xl mb-4">🚀</div>
          <h2 className="text-4xl font-black tracking-tight mb-4">Ready to Calculate Smarter?</h2>
          <p className="text-slate-600 dark:text-slate-400 text-lg mb-8 max-w-xl mx-auto">Join millions of students, professionals, and everyday people using CalcVerse every day.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/calculators" className="btn-gradient text-base px-8 py-3"><ArrowRight size={18}/> Start Free — No Signup</Link>
            <Link to="/ai" className="btn-secondary text-base px-8 py-3"><Sparkles size={18}/> Try AI Assistant</Link>
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-5">No credit card · No signup · 100% free forever</p>
        </div>
      </section>
    </div>
  );
}
