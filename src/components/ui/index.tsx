import { useState, ReactNode } from 'react';
import { Check, Copy, ArrowLeft } from 'lucide-react';
import { cn, copyText } from '@/lib/utils';

export function SliderField({ label, value, onChange, min, max, step=1, format }: { label:string; value:number; onChange:(v:number)=>void; min:number; max:number; step?:number; format?:(v:number)=>string }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-slate-600 dark:text-slate-400">{label}</label>
        <span className="mono text-xs font-semibold text-blue-500 dark:text-blue-400">{format?format(value):value}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))} className="w-full"/>
    </div>
  );
}

export function InputField({ label, value, onChange, type='number', suffix, min, max, step, placeholder }: { label?:string; value:number|string; onChange:(v:number|string)=>void; type?:string; suffix?:string; min?:number; max?:number; step?:number; placeholder?:string }) {
  return (
    <div className="mb-4">
      {label&&<label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-1.5">{label}</label>}
      <div className="relative">
        <input type={type} value={value} min={min} max={max} step={step} placeholder={placeholder}
          onChange={e=>onChange(type==='number'?Number(e.target.value):e.target.value)}
          className={cn('input-field',suffix&&'pr-10')}/>
        {suffix&&<span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">{suffix}</span>}
      </div>
    </div>
  );
}

export function ResultRow({ label, value, highlight, color }: { label:string; value:string; highlight?:boolean; color?:string }) {
  return (
    <div className="result-row">
      <span className="text-sm text-slate-500 dark:text-slate-400">{label}</span>
      <span className={cn('mono font-semibold transition-colors', highlight?'text-base':'text-sm', color||'text-slate-900 dark:text-slate-100')}>{value}</span>
    </div>
  );
}

export function CopyButton({ text, className }: { text:string; className?:string }) {
  const [copied,setCopied]=useState(false);
  const handle=()=>{ copyText(text); setCopied(true); setTimeout(()=>setCopied(false),2000); };
  return <button onClick={handle} className={cn('btn-ghost text-xs',className)}>{copied?<Check size={12} className="text-emerald-500"/>:<Copy size={12}/>}{copied?'Copied!':'Copy'}</button>;
}

export function Badge({ children, variant='default' }: { children:ReactNode; variant?:'default'|'success'|'warning'|'new' }) {
  const s={default:'bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20',success:'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',warning:'bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 border-yellow-500/20',new:'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'};
  return <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold border',s[variant])}>{children}</span>;
}

export function DonutChart({ pct, color, label, sub }: { pct:number; color:string; label:string; sub?:string }) {
  const r=42,c=2*Math.PI*r;
  return (
    <svg width={110} height={110} viewBox="0 0 100 100" className="mx-auto">
      <circle cx="50" cy="50" r={r} fill="none" stroke="currentColor" strokeWidth="10" className="text-slate-200 dark:text-slate-700"/>
      <circle cx="50" cy="50" r={r} fill="none" stroke={color} strokeWidth="10" strokeDasharray={`${pct/100*c} ${c}`} strokeDashoffset={c*0.25} strokeLinecap="round" style={{transition:'stroke-dasharray .6s ease'}}/>
      <text x="50" y="46" textAnchor="middle" style={{fontSize:'13px',fontWeight:'800',fill:'currentColor',fontFamily:'Fira Code,monospace'}}>{label}</text>
      {sub&&<text x="50" y="60" textAnchor="middle" style={{fontSize:'7px',fill:'#9ca3af'}}>{sub}</text>}
    </svg>
  );
}

export function MiniBarChart({ data, color, height=80 }: { data:{v:number;l?:string}[]; color:string; height?:number }) {
  const max=Math.max(...data.map(d=>d.v),1);
  return (
    <div className="flex items-end gap-0.5 mt-2" style={{height}}>
      {data.map((d,i)=>(
        <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5">
          <div className="w-full rounded-t-sm min-h-[3px] transition-all duration-500" style={{height:`${(d.v/max)*(height-16)}px`,background:`${color}bb`}}/>
          {d.l&&<span className="text-[7px] text-slate-400">{d.l}</span>}
        </div>
      ))}
    </div>
  );
}

export function BackButton({ onClick }: { onClick:()=>void }) {
  return <button onClick={onClick} className="flex items-center gap-2 text-blue-500 dark:text-blue-400 text-sm font-semibold mb-6 hover:underline"><ArrowLeft size={14}/> Back to Calculators</button>;
}

export function CalcHeader({ title, desc }: { title:string; desc:string }) {
  return <div className="mb-7"><h1 className="text-2xl font-black tracking-tight mb-2 text-slate-900 dark:text-slate-100">{title}</h1><p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">{desc}</p></div>;
}

export function InfoBox({ children, color='#5b7fff' }: { children:ReactNode; color?:string }) {
  return <div className="mt-3 p-3 rounded-xl text-xs text-slate-600 dark:text-slate-400 leading-relaxed mono" style={{background:`${color}0d`,border:`1px solid ${color}30`}}>{children}</div>;
}
