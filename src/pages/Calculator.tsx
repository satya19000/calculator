import { useParams, useNavigate, Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';
import { CALCULATORS } from '@/lib/calculators';
import { EMICalc, BMICalc, SIPCalc, CompoundCalc, GSTCalc, PercentageCalc, AgeCalc, TipCalc, GPACalc, CryptoCalc, DiscountCalc, CurrencyCalc, StandardCalc, CalorieCalc } from '@/components/calculators';

const COMP_MAP: Record<string, React.ComponentType<{ onBack: () => void }>> = {
  emi: EMICalc, bmi: BMICalc, sip: SIPCalc,
  'compound': CompoundCalc, 'compound-interest': CompoundCalc,
  gst: GSTCalc, percentage: PercentageCalc, age: AgeCalc, tip: TipCalc,
  gpa: GPACalc, crypto: CryptoCalc, discount: DiscountCalc,
  currency: CurrencyCalc, 'currency-converter': CurrencyCalc,
  standard: StandardCalc, calorie: CalorieCalc,
};

export default function Calculator() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const calc = CALCULATORS.find(c => c.id === id);
  const Comp = id ? COMP_MAP[id] : undefined;

  const related = calc ? CALCULATORS.filter(c => c.category === calc.category && c.id !== id).slice(0, 4) : [];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
      <nav className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500 mb-6">
        <Link to="/" className="hover:text-blue-500 transition-colors">Home</Link>
        <span>/</span>
        <Link to="/calculators" className="hover:text-blue-500 transition-colors">Calculators</Link>
        <span>/</span>
        <span className="text-slate-700 dark:text-slate-300">{calc?.name || id}</span>
      </nav>

      <div className="card p-6 sm:p-8 shadow-xl mb-8">
        {Comp ? (
          <Comp onBack={() => navigate('/calculators')} />
        ) : (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🔧</div>
            <h2 className="text-xl font-bold mb-3">Calculator Coming Soon</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">This calculator is being built. Try our AI assistant for instant calculations!</p>
            <button onClick={() => {}} className="btn-gradient"><Sparkles size={15}/> Ask AI Assistant</button>
          </div>
        )}
      </div>

      {related.length > 0 && (
        <div>
          <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Related Calculators</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {related.map(c => (
              <Link key={c.id} to={`/calculators/${c.id}`} className="card-hover p-4 block text-center group">
                <div className="text-xl mb-2">{c.id==='emi'?'💰':c.id==='bmi'?'❤️':c.id==='sip'?'📈':c.id==='currency'?'💱':'🧮'}</div>
                <div className="text-xs font-semibold group-hover:text-blue-500 transition-colors">{c.name}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
