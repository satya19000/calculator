import { Link } from 'react-router-dom';
import { Calculator } from 'lucide-react';

const LINKS = {
  'Calculators': [['Finance','/calculators?cat=finance'],['Health','/calculators?cat=health'],['Science','/calculators?cat=science'],['Crypto','/calculators?cat=crypto'],['Utility','/calculators?cat=utility']],
  'Features': [['AI Assistant','/ai'],['Currency Converter','/calculators/currency'],['Unit Converter','/calculators/unit'],['API Access','/api']],
  'Company': [['About','/about'],['Blog','/blog'],['Privacy','/privacy'],['Terms','/terms'],['Contact','/contact']],
};

export function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#0c0f1e] mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-10">
          <div>
            <Link to="/" className="flex items-center gap-2 font-black text-lg mb-4">
              <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-violet-600 flex items-center justify-center">
                <Calculator size={13} className="text-white"/>
              </div>
              Calc<span className="text-blue-500 dark:text-blue-400">Verse</span>
            </Link>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed max-w-[220px]">
              The world's most complete AI-powered calculator ecosystem. Free forever.
            </p>
            <div className="flex gap-2 mt-4 flex-wrap">
              {['Finance','Health','AI','20 Languages'].map(t => (
                <span key={t} className="text-[10px] px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 font-semibold">{t}</span>
              ))}
            </div>
          </div>
          {Object.entries(LINKS).map(([section, items]) => (
            <div key={section}>
              <h4 className="text-xs font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {items.map(([label, href]) => (
                  <li key={label}>
                    <Link to={href} className="text-sm text-slate-500 dark:text-slate-400 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">{label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="border-t border-slate-200 dark:border-slate-800 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-slate-400">© {new Date().getFullYear()} CalcVerse. All rights reserved.</p>
          <p className="text-xs text-slate-400">Built with ❤️ for 7.5 billion people worldwide</p>
        </div>
      </div>
    </footer>
  );
}
