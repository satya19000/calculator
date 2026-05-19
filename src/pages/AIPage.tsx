import { AIPanel } from '@/components/ai/AIPanel';
export default function AIPage() {
  return (
    <div className="max-w-lg mx-auto px-4 py-16 text-center">
      <div className="text-5xl mb-4">✨</div>
      <h1 className="text-4xl font-black tracking-tight mb-4">CalcVerse AI</h1>
      <p className="text-slate-500 dark:text-slate-400 text-lg mb-8">Powered by Claude. Ask any calculation, get step-by-step explanations.</p>
      <div className="card p-5 text-left text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
        The full AI chat is available via the floating <span className="text-blue-500 font-semibold">✨ button</span> on every page. It answers in your language and handles any type of mathematical question.
      </div>
      <AIPanel onClose={() => {}} />
    </div>
  );
}
