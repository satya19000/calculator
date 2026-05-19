import { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send } from 'lucide-react';
import type { Message } from '@/types';

const SYSTEM = `You are CalcVerse AI, an expert math and calculator assistant. Help with any calculation — finance, health, science, crypto, or general math. Show step-by-step working. Format numbers clearly. Be concise and friendly.`;

export function AIFab() {
  const [open, setOpen] = useState(false);
  return (
    <>
      {open && <AIPanel onClose={() => setOpen(false)} />}
      {!open && (
        <button onClick={() => setOpen(true)} aria-label="Open AI Assistant"
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-r from-blue-500 to-violet-600 flex items-center justify-center text-white shadow-2xl animate-float hover:scale-110 transition-transform">
          <div className="absolute w-14 h-14 rounded-full border-2 border-blue-400 animate-pulse-ring opacity-50" />
          <Sparkles size={22} />
        </button>
      )}
    </>
  );
}

export function AIPanel({ onClose }: { onClose: () => void }) {
  const [msgs, setMsgs] = useState<Message[]>([
    { role: 'assistant', content: '👋 Hi! I\'m CalcVerse AI. Ask me any calculation — EMI, BMI, compound interest, crypto P&L, unit conversions, or any math question!' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [msgs]);

  const send = async (text?: string) => {
    const q = text || input.trim();
    if (!q || loading) return;
    setInput('');
    const updated: Message[] = [...msgs, { role: 'user', content: q }];
    setMsgs(updated);
    setLoading(true);

    try {
      const apiKey = import.meta.env.VITE_ANTHROPIC_API_KEY;
      if (!apiKey) {
        setMsgs([...updated, { role: 'assistant', content: '⚠️ API key not configured. Add VITE_ANTHROPIC_API_KEY to your .env.local file to enable AI. Meanwhile, try our built-in calculators!' }]);
        setLoading(false);
        return;
      }
      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-api-key': apiKey, 'anthropic-version': '2023-06-01', 'anthropic-dangerous-direct-browser-access': 'true' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 1024,
          system: SYSTEM,
          messages: updated.map(m => ({ role: m.role, content: m.content }))
        })
      });
      const data = await res.json();
      const reply = data.content?.[0]?.text || 'Sorry, I couldn\'t process that. Please try again.';
      setMsgs([...updated, { role: 'assistant', content: reply }]);
    } catch {
      setMsgs([...updated, { role: 'assistant', content: 'Connection error. Please check your internet connection and try again.' }]);
    }
    setLoading(false);
  };

  const SUGGESTIONS = ['What is 18% GST on ₹5000?', 'EMI for ₹10L at 8.5% 20yr', 'Convert 100 USD to INR', 'BMI for 70kg 175cm'];

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 pointer-events-none">
      <div className="w-full max-w-sm h-[520px] bg-white dark:bg-[#0c0f1e] border border-slate-200 dark:border-slate-700 rounded-3xl flex flex-col overflow-hidden shadow-2xl animate-fade-up pointer-events-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-violet-600 px-5 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 flex items-center justify-center">
              <Sparkles size={17} className="text-white" />
            </div>
            <div>
              <div className="font-bold text-white text-sm">CalcVerse AI</div>
              <div className="text-white/70 text-xs">Powered by Claude</div>
            </div>
          </div>
          <button onClick={onClose} className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <X size={14} />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
          {msgs.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[88%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap break-words ${m.role === 'user' ? 'bg-blue-500 text-white rounded-br-sm' : 'bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-bl-sm'}`}>
                {m.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-800 px-4 py-3 rounded-2xl rounded-bl-sm flex gap-1">
                {[0, 0.2, 0.4].map(d => (
                  <div key={d} className="w-1.5 h-1.5 rounded-full bg-blue-500" style={{ animation: `blink 1.2s ${d}s infinite` }} />
                ))}
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        {/* Suggestions */}
        {msgs.length <= 1 && (
          <div className="px-4 pb-2 flex gap-1.5 flex-wrap">
            {SUGGESTIONS.map(s => (
              <button key={s} onClick={() => send(s)} className="text-[10px] px-2.5 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-400 hover:border-blue-400 hover:text-blue-500 transition-colors whitespace-nowrap">
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex gap-3">
          <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && !e.shiftKey && send()}
            placeholder="Ask any calculation…"
            className="flex-1 input-field text-sm" />
          <button onClick={() => send()} disabled={loading}
            className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 active:scale-95 transition-all disabled:opacity-50 shrink-0">
            <Send size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
