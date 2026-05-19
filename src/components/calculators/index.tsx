import { useState, useMemo } from 'react';
import { BackButton, CalcHeader, SliderField, InputField, ResultRow, CopyButton, DonutChart, MiniBarChart, InfoBox, Badge } from '@/components/ui';
import { calcEMI, calcBMI, bmiInfo, fmtINR, fmt } from '@/lib/utils';
import { cn } from '@/lib/utils';

const TwoCol = ({ left, right }: { left: React.ReactNode; right: React.ReactNode }) => (
  <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-start">{left && <div>{left}</div>}{right && <div>{right}</div>}</div>
);

/* ── EMI ─────────────────────────────────────────────── */
export function EMICalc({ onBack }: { onBack: () => void }) {
  const [P, setP] = useState(500000);
  const [R, setR] = useState(8.5);
  const [N, setN] = useState(60);
  const emi = useMemo(() => calcEMI(P, R, N), [P, R, N]);
  const total = emi * N, interest = total - P;
  const pPct = Math.round((P / total) * 100);
  const schedule = useMemo(() => Array.from({ length: Math.min(N, 12) }, (_, i) => {
    const r = R / 100 / 12;
    const bal = Math.max(0, P * Math.pow(1 + r, i + 1) - emi * ((Math.pow(1 + r, i + 1) - 1) / r));
    return { m: i + 1, emi: Math.round(emi), int: Math.round(emi - (P - (P - bal)) * r), bal: Math.round(bal) };
  }), [P, R, N, emi]);

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack} />
      <CalcHeader title="EMI Calculator" desc="Equated Monthly Installment calculator with full amortization schedule and principal vs interest breakdown." />
      <TwoCol
        left={<>
          <SliderField label="Loan Amount" value={P} onChange={setP} min={10000} max={10000000} step={10000} format={v => `₹${(v / 100000).toFixed(1)}L`} />
          <SliderField label="Interest Rate (% p.a.)" value={R} onChange={setR} min={1} max={30} step={0.1} format={v => `${v}%`} />
          <SliderField label="Tenure (months)" value={N} onChange={setN} min={6} max={360} step={6} format={v => `${v} mo`} />
          <InfoBox color="#06d6a0">EMI = P × r × (1+r)ⁿ / ((1+r)ⁿ − 1)<br/>P={fmtINR(P)} · r={(R/100/12).toFixed(4)} · n={N}</InfoBox>
        </>}
        right={<>
          <div className="mb-5"><DonutChart pct={pPct} color="#06d6a0" label={fmtINR(Math.round(emi/1000))+'k'} sub="EMI/mo" /></div>
          <ResultRow label="Monthly EMI" value={fmtINR(Math.round(emi))} highlight color="text-emerald-500 dark:text-emerald-400" />
          <ResultRow label="Total Interest" value={fmtINR(Math.round(interest))} color="text-orange-500 dark:text-orange-400" />
          <ResultRow label="Total Payment" value={fmtINR(Math.round(total))} color="text-blue-500 dark:text-blue-400" />
          <ResultRow label="Interest %" value={`${(interest / P * 100).toFixed(1)}%`} />
          <div className="mt-4"><CopyButton text={`EMI: ${fmtINR(Math.round(emi))}\nTotal: ${fmtINR(Math.round(total))}\nInterest: ${fmtINR(Math.round(interest))}`} /></div>
          <div className="mt-5 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
            <table className="w-full text-[11px]">
              <thead className="bg-slate-50 dark:bg-slate-800/60"><tr>{['Mo','EMI','Interest','Balance'].map(h=><th key={h} className="px-3 py-2 text-right font-semibold text-slate-500 dark:text-slate-400">{h}</th>)}</tr></thead>
              <tbody>{schedule.map(r=><tr key={r.m} className="border-t border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/30">{[r.m,fmtINR(r.emi),fmtINR(r.int),fmtINR(r.bal)].map((v,i)=><td key={i} className={cn('px-3 py-2 text-right mono',i===3?'text-blue-500 dark:text-blue-400':'text-slate-600 dark:text-slate-400')}>{v}</td>)}</tr>)}</tbody>
            </table>
          </div>
        </>}
      />
    </div>
  );
}

/* ── BMI ─────────────────────────────────────────────── */
export function BMICalc({ onBack }: { onBack: () => void }) {
  const [w, setW] = useState(70);
  const [h, setH] = useState(170);
  const [unit, setUnit] = useState<'metric'|'imperial'>('metric');
  const bmi = useMemo(() => calcBMI(w, h, unit), [w, h, unit]);
  const { label, color, pct } = useMemo(() => bmiInfo(bmi), [bmi]);
  const ideal = { min: +(18.5 * Math.pow(h / 100, 2)).toFixed(1), max: +(24.9 * Math.pow(h / 100, 2)).toFixed(1) };

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack} />
      <CalcHeader title="BMI Calculator" desc="Body Mass Index — assess weight relative to height. Includes animated scale indicator and ideal weight range." />
      <div className="flex gap-2 mb-6">
        {(['metric','imperial'] as const).map(u => (
          <button key={u} onClick={() => setUnit(u)} className={cn('px-4 py-2 rounded-xl text-sm font-semibold border transition-all capitalize', u===unit?'bg-blue-500 dark:bg-blue-500 text-white border-transparent':'btn-secondary')}>{u}</button>
        ))}
      </div>
      <TwoCol
        left={<>
          <SliderField label={unit==='metric'?'Weight (kg)':'Weight (lbs)'} value={w} onChange={setW} min={30} max={unit==='metric'?200:440} format={v=>`${v}${unit==='metric'?' kg':' lbs'}`}/>
          <SliderField label={unit==='metric'?'Height (cm)':'Height (in)'} value={h} onChange={setH} min={unit==='metric'?100:40} max={unit==='metric'?250:96} format={v=>`${v}${unit==='metric'?' cm':' in'}`}/>
          <div className="card p-4">
            <div className="text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-3">BMI Categories</div>
            {[['< 18.5','Underweight','text-blue-400'],['18.5–24.9','Normal','text-emerald-400'],['25–29.9','Overweight','text-yellow-400'],['30+','Obese','text-red-400']].map(([r,l,c])=>(
              <div key={l} className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0 text-xs">
                <span className={cn('mono font-semibold',c)}>{r}</span>
                <span className="text-slate-500 dark:text-slate-400">{l}</span>
              </div>
            ))}
          </div>
        </>}
        right={<>
          <div className="text-center mb-6">
            <div className="text-7xl font-black leading-none mb-1 transition-colors duration-300" style={{color}}>{bmi.toFixed(1)}</div>
            <div className="text-lg font-bold transition-colors duration-300" style={{color}}>{label}</div>
          </div>
          <div className="mb-5">
            <div className="h-2.5 rounded-full overflow-hidden mb-1.5" style={{background:'linear-gradient(to right,#60a5fa,#06d6a0,#eab308,#ef4444)'}}>
              <div className="relative h-full">
                <div className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-white border-2 shadow-md transition-all duration-500" style={{left:`${Math.min(pct,97)}%`,borderColor:color}}/>
              </div>
            </div>
            <div className="flex justify-between text-[9px] text-slate-400">
              {['10','18.5','25','30','45'].map(v=><span key={v}>{v}</span>)}
            </div>
          </div>
          <ResultRow label="BMI Score" value={bmi.toFixed(2)} highlight color={cn(bmi<18.5?'text-blue-400':bmi<25?'text-emerald-400':bmi<30?'text-yellow-400':'text-red-400')}/>
          <ResultRow label="Category" value={label}/>
          {unit==='metric'&&<ResultRow label="Ideal Weight" value={`${ideal.min}–${ideal.max} kg`} color="text-emerald-500 dark:text-emerald-400"/>}
          <div className="mt-4 p-3 rounded-xl text-xs leading-relaxed" style={{background:`${color}12`,border:`1px solid ${color}25`}}>
            {bmi<18.5?'Consider gaining weight through nutrient-rich foods and strength training.':bmi<25?'Great! You\'re in the healthy BMI range. Keep it up!':bmi<30?'Small changes — more activity and portion awareness — can help.':'Please consult a healthcare provider for a personalized plan.'}
          </div>
        </>}
      />
    </div>
  );
}

/* ── SIP ─────────────────────────────────────────────── */
export function SIPCalc({ onBack }: { onBack: () => void }) {
  const [m, setM] = useState(5000);
  const [r, setR] = useState(12);
  const [y, setY] = useState(10);
  const n = y * 12, rate = r / 100 / 12;
  const mat = useMemo(() => m * (Math.pow(1 + rate, n) - 1) / rate * (1 + rate), [m, rate, n]);
  const inv = m * n, gain = mat - inv;
  const chart = useMemo(() => Array.from({ length: y + 1 }, (_, i) => ({
    v: Math.round(m * (Math.pow(1 + rate, i * 12) - 1) / rate * (1 + rate)),
    l: i === 0 ? 'Now' : i === y ? `${y}y` : ''
  })), [m, rate, y]);

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack} />
      <CalcHeader title="SIP Calculator" desc="Systematic Investment Plan — visualize your wealth accumulation through regular monthly investments." />
      <TwoCol
        left={<>
          <SliderField label="Monthly Investment" value={m} onChange={setM} min={500} max={100000} step={500} format={v=>`₹${(v/1000).toFixed(0)}k`}/>
          <SliderField label="Expected Return (% p.a.)" value={r} onChange={setR} min={4} max={30} step={0.5} format={v=>`${v}%`}/>
          <SliderField label="Investment Period (years)" value={y} onChange={setY} min={1} max={40} format={v=>`${v} yr`}/>
          <div className="card p-4"><MiniBarChart data={chart} color="#8b5cf6" height={80}/></div>
        </>}
        right={<>
          <div className="mb-4"><DonutChart pct={Math.round(inv/mat*100)} color="#8b5cf6" label={`₹${(mat/100000).toFixed(1)}L`} sub="Maturity"/></div>
          <ResultRow label="Total Invested" value={fmtINR(inv)} color="text-blue-500 dark:text-blue-400"/>
          <ResultRow label="Est. Gains" value={fmtINR(Math.round(gain))} color="text-emerald-500 dark:text-emerald-400"/>
          <ResultRow label="Maturity Value" value={fmtINR(Math.round(mat))} highlight color="text-violet-500 dark:text-violet-400"/>
          <ResultRow label="Wealth Ratio" value={`${(mat/inv).toFixed(2)}x`}/>
          <div className="mt-4"><CopyButton text={`Monthly: ${fmtINR(m)}\nMaturity: ${fmtINR(Math.round(mat))}\nGains: ${fmtINR(Math.round(gain))}`}/></div>
        </>}
      />
    </div>
  );
}

/* ── Compound Interest ───────────────────────────────── */
export function CompoundCalc({ onBack }: { onBack: () => void }) {
  const [P, setP] = useState(100000);
  const [R, setR] = useState(10);
  const [T, setT] = useState(10);
  const [freq, setFreq] = useState(12);
  const A = useMemo(() => P * Math.pow(1 + R / 100 / freq, freq * T), [P, R, T, freq]);
  const gain = A - P;
  const chart = useMemo(() => Array.from({ length: T + 1 }, (_, i) => ({
    v: Math.round(P * Math.pow(1 + R / 100 / freq, freq * i)),
    l: i === 0 ? '0' : i === T ? `${T}y` : ''
  })), [P, R, T, freq]);

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack}/>
      <CalcHeader title="Compound Interest" desc="Visualize the power of compounding — the 8th wonder of the world according to Einstein."/>
      <TwoCol
        left={<>
          <SliderField label="Principal (₹)" value={P} onChange={setP} min={1000} max={10000000} step={1000} format={v=>`₹${(v/100000).toFixed(1)}L`}/>
          <SliderField label="Annual Rate (%)" value={R} onChange={setR} min={1} max={30} step={0.5} format={v=>`${v}%`}/>
          <SliderField label="Time (years)" value={T} onChange={setT} min={1} max={40} format={v=>`${v} yr`}/>
          <div className="flex gap-2 flex-wrap mb-4">
            {[[1,'Annual'],[4,'Quarterly'],[12,'Monthly'],[365,'Daily']].map(([f,l])=>(
              <button key={f} onClick={()=>setFreq(Number(f))} className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',freq===Number(f)?'bg-yellow-500 text-white border-transparent':'btn-secondary')}>{String(l)}</button>
            ))}
          </div>
          <div className="card p-4"><MiniBarChart data={chart} color="#eab308" height={80}/></div>
        </>}
        right={<>
          <ResultRow label="Principal" value={fmtINR(P)} color="text-blue-500 dark:text-blue-400"/>
          <ResultRow label="Interest Earned" value={fmtINR(Math.round(gain))} color="text-emerald-500 dark:text-emerald-400"/>
          <ResultRow label="Final Amount" value={fmtINR(Math.round(A))} highlight color="text-yellow-500 dark:text-yellow-400"/>
          <ResultRow label="Total Return" value={`${(gain/P*100).toFixed(1)}%`}/>
          <InfoBox color="#eab308">A = P × (1 + r/n)^(n×t)<br/>= {fmtINR(P)} × (1+{R/100/freq})^{freq}×{T}</InfoBox>
          <div className="mt-4"><CopyButton text={`Principal: ${fmtINR(P)}\nFinal: ${fmtINR(Math.round(A))}\nGain: ${fmtINR(Math.round(gain))} (+${(gain/P*100).toFixed(1)}%)`}/></div>
        </>}
      />
    </div>
  );
}

/* ── GST ─────────────────────────────────────────────── */
export function GSTCalc({ onBack }: { onBack: () => void }) {
  const [amt, setAmt] = useState(10000);
  const [rate, setRate] = useState(18);
  const [mode, setMode] = useState<'exclusive'|'inclusive'>('exclusive');
  const gst = mode==='exclusive' ? amt*rate/100 : amt-amt*100/(100+rate);
  const base = mode==='exclusive' ? amt : amt-gst;
  const total = mode==='exclusive' ? amt+gst : amt;

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack}/>
      <CalcHeader title="GST Calculator" desc="Goods & Services Tax calculator with CGST/SGST/IGST breakdown for exclusive and inclusive modes."/>
      <TwoCol
        left={<>
          <InputField label="Amount (₹)" value={amt} onChange={v=>setAmt(Number(v))}/>
          <div className="mb-5">
            <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-2">GST Rate</label>
            <div className="flex gap-2 flex-wrap">
              {[0,5,12,18,28].map(r=>(
                <button key={r} onClick={()=>setRate(r)} className={cn('px-4 py-2 rounded-xl text-sm font-bold border transition-all',r===rate?'bg-emerald-500 text-white border-transparent':'btn-secondary')}>{r}%</button>
              ))}
            </div>
          </div>
          <div className="flex gap-2 mb-4">
            {(['exclusive','inclusive'] as const).map(m=>(
              <button key={m} onClick={()=>setMode(m)} className={cn('flex-1 py-2 rounded-xl text-sm font-semibold border transition-all capitalize',m===mode?'bg-blue-500 text-white border-transparent':'btn-secondary')}>{m}</button>
            ))}
          </div>
        </>}
        right={<>
          <ResultRow label="Base Amount" value={fmtINR(Math.round(base))}/>
          <ResultRow label={`GST (${rate}%)`} value={fmtINR(Math.round(gst))} color="text-orange-500 dark:text-orange-400"/>
          <ResultRow label="CGST (50%)" value={fmtINR(Math.round(gst/2))}/>
          <ResultRow label="SGST (50%)" value={fmtINR(Math.round(gst/2))}/>
          <ResultRow label="Total Amount" value={fmtINR(Math.round(total))} highlight color="text-emerald-500 dark:text-emerald-400"/>
          <div className="mt-4"><CopyButton text={`Base: ${fmtINR(Math.round(base))}\nGST (${rate}%): ${fmtINR(Math.round(gst))}\nTotal: ${fmtINR(Math.round(total))}`}/></div>
        </>}
      />
    </div>
  );
}

/* ── Percentage ─────────────────────────────────────── */
export function PercentageCalc({ onBack }: { onBack: () => void }) {
  const [mode, setMode] = useState(0);
  const [a, setA] = useState(25);
  const [b, setB] = useState(200);
  const r0 = (a/100)*b, r1 = (a/b)*100, r2 = b+(b*a/100), r3 = b-(b*a/100);
  const modes = [['% of a Number','Find X% of Y'],['What % is X of Y','X out of Y as %'],['% Change','Increase/Decrease by %']];

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack}/>
      <CalcHeader title="Percentage Calculator" desc="Three modes — find a percentage, calculate what % one number is of another, or find % change."/>
      <div className="flex gap-2 flex-wrap mb-6">
        {modes.map(([l],i)=>(
          <button key={i} onClick={()=>setMode(i)} className={cn('px-4 py-2 rounded-xl text-sm font-semibold border transition-all',i===mode?'bg-blue-500 text-white border-transparent':'btn-secondary')}>{l}</button>
        ))}
      </div>
      <TwoCol
        left={<>
          <InputField label={mode===0?'Percentage (%)':mode===1?'Number X':'Percentage (%)'} value={a} onChange={v=>setA(Number(v))} suffix={mode===0||mode===2?'%':''}/>
          <InputField label={mode===0?'Of Number':mode===1?'Total Y (100%)':'Base Value'} value={b} onChange={v=>setB(Number(v))}/>
        </>}
        right={
          <div className="card p-6 text-center">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-3">{modes[mode][1]}</div>
            {mode===0&&<><div className="mono text-5xl font-black text-blue-500 dark:text-blue-400 mb-1">{fmt(r0,2)}</div><div className="text-sm text-slate-500">{a}% of {b}</div></>}
            {mode===1&&<><div className="mono text-5xl font-black text-violet-500 dark:text-violet-400 mb-1">{r1.toFixed(2)}%</div><div className="text-sm text-slate-500">{a} out of {b}</div></>}
            {mode===2&&<>
              <div className="flex gap-4 justify-center">
                <div><div className="mono text-3xl font-black text-emerald-500 mb-1">{fmt(r2,2)}</div><div className="text-xs text-slate-500">+{a}% increase</div></div>
                <div className="w-px bg-slate-200 dark:bg-slate-700"/>
                <div><div className="mono text-3xl font-black text-orange-500 mb-1">{fmt(r3,2)}</div><div className="text-xs text-slate-500">-{a}% decrease</div></div>
              </div>
            </>}
          </div>
        }
      />
    </div>
  );
}

/* ── Age Calculator ─────────────────────────────────── */
export function AgeCalc({ onBack }: { onBack: () => void }) {
  const [dob, setDob] = useState('1995-06-15');
  const now = new Date(), birth = new Date(dob);
  const yrs = now.getFullYear()-birth.getFullYear()-(now<new Date(now.getFullYear(),birth.getMonth(),birth.getDate())?1:0);
  const days = Math.floor((now.getTime()-birth.getTime())/86400000);
  const next = new Date(now.getFullYear()+(now>=new Date(now.getFullYear(),birth.getMonth(),birth.getDate())?1:0),birth.getMonth(),birth.getDate());
  const dNext = Math.ceil((next.getTime()-now.getTime())/86400000);

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack}/>
      <CalcHeader title="Age Calculator" desc="Find your exact age in years, months, days, hours and get a birthday countdown."/>
      <TwoCol
        left={<InputField label="Date of Birth" value={dob} onChange={v=>setDob(String(v))} type="date"/>}
        right={<>
          <div className="text-center card p-6 mb-4">
            <div className="mono text-6xl font-black text-violet-500 dark:text-violet-400 leading-none mb-1">{yrs}</div>
            <div className="text-slate-500 dark:text-slate-400 text-sm">years old</div>
          </div>
          <ResultRow label="Total Days Lived" value={days.toLocaleString('en-IN')} color="text-blue-500 dark:text-blue-400"/>
          <ResultRow label="Total Weeks" value={Math.floor(days/7).toLocaleString('en-IN')} color="text-violet-500 dark:text-violet-400"/>
          <ResultRow label="Total Hours" value={(days*24).toLocaleString('en-IN')} color="text-yellow-500 dark:text-yellow-400"/>
          <ResultRow label="Next Birthday" value={`${dNext} days`} highlight color="text-pink-500 dark:text-pink-400"/>
          <div className="mt-3 p-3 rounded-xl bg-pink-500/8 dark:bg-pink-500/10 border border-pink-500/20 text-xs text-center text-slate-600 dark:text-slate-400">
            🎂 {next.toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'})}
          </div>
        </>}
      />
    </div>
  );
}

/* ── Tip Calculator ─────────────────────────────────── */
export function TipCalc({ onBack }: { onBack: () => void }) {
  const [bill, setBill] = useState(1200);
  const [tip, setTip] = useState(15);
  const [people, setPeople] = useState(4);
  const tipAmt = bill*tip/100, total = bill+tipAmt, perPerson = total/people;

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack}/>
      <CalcHeader title="Tip Calculator" desc="Calculate tips and split bills perfectly for any group size."/>
      <TwoCol
        left={<>
          <InputField label="Bill Amount (₹)" value={bill} onChange={v=>setBill(Number(v))}/>
          <div className="mb-4">
            <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-2">Tip %</label>
            <div className="flex gap-2 flex-wrap mb-2">
              {[10,15,18,20,25].map(t=>(
                <button key={t} onClick={()=>setTip(t)} className={cn('px-4 py-2 rounded-xl text-sm font-semibold border transition-all',t===tip?'bg-yellow-500 text-white border-transparent':'btn-secondary')}>{t}%</button>
              ))}
            </div>
            <SliderField label={`Custom Tip`} value={tip} onChange={setTip} min={0} max={50} format={v=>`${v}%`}/>
          </div>
          <InputField label="Number of People" value={people} onChange={v=>setPeople(Math.max(1,Number(v)))} min={1} max={50}/>
        </>}
        right={<>
          <div className="card p-6 text-center mb-4">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Per Person</div>
            <div className="mono text-5xl font-black text-yellow-500 dark:text-yellow-400 leading-none">{fmtINR(Math.round(perPerson))}</div>
          </div>
          <ResultRow label="Bill Amount" value={fmtINR(bill)}/>
          <ResultRow label={`Tip (${tip}%)`} value={fmtINR(Math.round(tipAmt))} color="text-emerald-500 dark:text-emerald-400"/>
          <ResultRow label="Total Bill" value={fmtINR(Math.round(total))} highlight color="text-yellow-500 dark:text-yellow-400"/>
          <ResultRow label="Per Person" value={fmtINR(Math.round(perPerson))} color="text-blue-500 dark:text-blue-400"/>
        </>}
      />
    </div>
  );
}

/* ── GPA ─────────────────────────────────────────────── */
export function GPACalc({ onBack }: { onBack: () => void }) {
  const grades: Record<string,number> = {'A+':4,'A':4,'A-':3.7,'B+':3.3,'B':3,'B-':2.7,'C+':2.3,'C':2,'C-':1.7,'D':1,'F':0};
  const [courses, setCourses] = useState([
    {name:'Mathematics',grade:'A',credits:4},{name:'Physics',grade:'B+',credits:3},
    {name:'Chemistry',grade:'A-',credits:3},{name:'English',grade:'B',credits:2},
  ]);
  const totalCredits = courses.reduce((s,c)=>s+c.credits,0);
  const gpa = (courses.reduce((s,c)=>s+(grades[c.grade]||0)*c.credits,0)/Math.max(totalCredits,1)).toFixed(2);
  const gpaNum = Number(gpa);

  const update = (i:number,k:string,v:string|number) => setCourses(p=>p.map((c,j)=>j===i?{...c,[k]:v}:c));
  const add = () => setCourses(p=>[...p,{name:'New Course',grade:'A',credits:3}]);
  const remove = (i:number) => setCourses(p=>p.filter((_,j)=>j!==i));

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack}/>
      <CalcHeader title="GPA Calculator" desc="Calculate weighted Grade Point Average across all your courses with dynamic course management."/>
      <TwoCol
        left={<>
          {courses.map((c,i)=>(
            <div key={i} className="grid grid-cols-[1fr_72px_56px_28px] gap-2 mb-2 items-end">
              {i===0&&<><div className="section-label">Course</div><div className="section-label">Grade</div><div className="section-label">Credits</div><div/></>}
              <input value={c.name} onChange={e=>update(i,'name',e.target.value)} className="input-field text-xs py-2"/>
              <select value={c.grade} onChange={e=>update(i,'grade',e.target.value)} className="input-field text-xs py-2 px-2">
                {Object.keys(grades).map(g=><option key={g}>{g}</option>)}
              </select>
              <input type="number" value={c.credits} min={1} max={6} onChange={e=>update(i,'credits',Number(e.target.value))} className="input-field text-xs py-2 px-2 text-center"/>
              <button onClick={()=>remove(i)} className="text-slate-400 hover:text-red-400 transition-colors text-xs flex items-center justify-center">×</button>
            </div>
          ))}
          <button onClick={add} className="btn-secondary w-full text-xs mt-2">+ Add Course</button>
        </>}
        right={<>
          <div className="card p-6 text-center mb-4">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Cumulative GPA</div>
            <div className={cn('mono text-6xl font-black leading-none mb-1',gpaNum>=3.7?'text-emerald-500 dark:text-emerald-400':gpaNum>=3?'text-yellow-500 dark:text-yellow-400':gpaNum>=2?'text-orange-500 dark:text-orange-400':'text-red-500 dark:text-red-400')}>{gpa}</div>
            <div className="text-sm font-semibold text-slate-500">{gpaNum>=3.7?'Summa Cum Laude':gpaNum>=3.5?'Magna Cum Laude':gpaNum>=3?'Cum Laude':gpaNum>=2?'Good Standing':'Needs Improvement'}</div>
          </div>
          <ResultRow label="Total Credits" value={String(totalCredits)}/>
          <ResultRow label="Grade Points" value={courses.reduce((s,c)=>s+(grades[c.grade]||0)*c.credits,0).toFixed(1)}/>
          <div className="grid grid-cols-4 gap-2 mt-4">
            {[['A','4.0','emerald'],['B','3.0','yellow'],['C','2.0','orange'],['F','0.0','red']].map(([g,p,c])=>(
              <div key={g} className={`card p-2 text-center`}><div className="font-bold text-sm">{g}</div><div className="mono text-xs text-slate-500">{p}</div></div>
            ))}
          </div>
        </>}
      />
    </div>
  );
}

/* ── Crypto P&L ─────────────────────────────────────── */
export function CryptoCalc({ onBack }: { onBack: () => void }) {
  const [buyP, setBuyP] = useState(40000);
  const [sellP, setSellP] = useState(65000);
  const [qty, setQty] = useState(0.5);
  const [inv, setInv] = useState(20000);
  const pnl = (sellP-buyP)*qty, pct = (sellP-buyP)/buyP*100;
  const coinsFromInv = inv/buyP, valueFromInv = coinsFromInv*sellP, gainFromInv = valueFromInv-inv;

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack}/>
      <CalcHeader title="Crypto P&L Calculator" desc="Calculate profit and loss on any cryptocurrency trade. Also includes investment mode."/>
      <TwoCol
        left={<>
          <InputField label="Buy Price ($)" value={buyP} onChange={v=>setBuyP(Number(v))}/>
          <InputField label="Sell Price ($)" value={sellP} onChange={v=>setSellP(Number(v))}/>
          <InputField label="Quantity (coins)" value={qty} onChange={v=>setQty(Number(v))} step={0.0001}/>
          <div className="mt-2 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="section-label mb-2">Investment Mode</div>
            <InputField label="Invest Amount ($)" value={inv} onChange={v=>setInv(Number(v))}/>
          </div>
        </>}
        right={<>
          <div className="card p-6 text-center mb-4">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Net Profit / Loss</div>
            <div className={cn('mono text-5xl font-black leading-none mb-1',pnl>=0?'text-emerald-500 dark:text-emerald-400':'text-red-500 dark:text-red-400')}>{pnl>=0?'+':''}${Math.abs(pnl).toLocaleString(undefined,{maximumFractionDigits:2})}</div>
            <div className={cn('text-lg font-bold',pnl>=0?'text-emerald-500 dark:text-emerald-400':'text-red-500 dark:text-red-400')}>{pct>=0?'+':''}{pct.toFixed(2)}%</div>
          </div>
          <ResultRow label="Cost Basis" value={`$${(buyP*qty).toLocaleString()}`}/>
          <ResultRow label="Sale Value" value={`$${(sellP*qty).toLocaleString()}`}/>
          <ResultRow label="Net P&L" value={`${pnl>=0?'+':''}$${Math.abs(pnl).toFixed(2)}`} highlight color={pnl>=0?'text-emerald-500':'text-red-500'}/>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="section-label mb-2">If you invested ${inv.toLocaleString()}</div>
            <ResultRow label="Coins Bought" value={coinsFromInv.toFixed(6)}/>
            <ResultRow label="Current Value" value={`$${Math.round(valueFromInv).toLocaleString()}`} color="text-emerald-500 dark:text-emerald-400"/>
            <ResultRow label="Net Gain" value={`${gainFromInv>=0?'+':''}$${Math.round(gainFromInv).toLocaleString()}`} highlight color={gainFromInv>=0?'text-emerald-500':'text-red-500'}/>
          </div>
        </>}
      />
    </div>
  );
}

/* ── Discount ─────────────────────────────────────────── */
export function DiscountCalc({ onBack }: { onBack: () => void }) {
  const [orig, setOrig] = useState(2000);
  const [disc, setDisc] = useState(30);
  const [fin2, setFin2] = useState(1400);
  const save = orig*disc/100, final = orig-save;
  const revDisc = ((orig-fin2)/orig*100).toFixed(2);

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack}/>
      <CalcHeader title="Discount Calculator" desc="Calculate sale price, savings amount, or reverse-calculate the discount percentage."/>
      <TwoCol
        left={<>
          <InputField label="Original Price (₹)" value={orig} onChange={v=>setOrig(Number(v))}/>
          <SliderField label="Discount %" value={disc} onChange={setDisc} min={0} max={90} format={v=>`${v}%`}/>
          <div className="flex gap-2 flex-wrap mb-4">
            {[10,20,30,40,50,70].map(p=><button key={p} onClick={()=>setDisc(p)} className={cn('px-3 py-1.5 rounded-xl text-xs font-bold border transition-all',p===disc?'bg-orange-500 text-white border-transparent':'btn-secondary')}>{p}%</button>)}
          </div>
          <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-800">
            <div className="section-label mb-2">Reverse: Find Discount %</div>
            <InputField label="Final Price (₹)" value={fin2} onChange={v=>setFin2(Number(v))}/>
            <div className="flex justify-between py-2 text-sm"><span className="text-slate-500">Discount %</span><span className="mono font-bold text-orange-500">{revDisc}%</span></div>
          </div>
        </>}
        right={<>
          <div className="card p-6 text-center mb-4">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">You Pay</div>
            <div className="mono text-5xl font-black text-emerald-500 dark:text-emerald-400 leading-none mb-1">{fmtINR(Math.round(final))}</div>
            <div className="text-sm font-semibold text-orange-500">Save {fmtINR(Math.round(save))} ({disc}% off)</div>
          </div>
          <ResultRow label="Original Price" value={fmtINR(orig)}/>
          <ResultRow label="Discount Amount" value={fmtINR(Math.round(save))} color="text-orange-500 dark:text-orange-400"/>
          <ResultRow label="Final Price" value={fmtINR(Math.round(final))} highlight color="text-emerald-500 dark:text-emerald-400"/>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[10,25,50].map(p=><div key={p} onClick={()=>setDisc(p)} className="card p-2 text-center cursor-pointer hover:border-orange-400 transition-colors"><div className="text-sm font-bold text-orange-500">{p}%</div><div className="mono text-[10px] text-slate-500">{fmtINR(Math.round(orig*(1-p/100)))}</div></div>)}
          </div>
        </>}
      />
    </div>
  );
}

/* ── Currency ─────────────────────────────────────────── */
const CURRENCIES: Record<string,{name:string;sym:string;flag:string;rate:number}> = {
  USD:{name:'US Dollar',sym:'$',flag:'🇺🇸',rate:1},EUR:{name:'Euro',sym:'€',flag:'🇪🇺',rate:0.92},
  GBP:{name:'Pound',sym:'£',flag:'🇬🇧',rate:0.79},INR:{name:'Rupee',sym:'₹',flag:'🇮🇳',rate:83.12},
  JPY:{name:'Yen',sym:'¥',flag:'🇯🇵',rate:149.5},CNY:{name:'Yuan',sym:'¥',flag:'🇨🇳',rate:7.24},
  AUD:{name:'AUD',sym:'A$',flag:'🇦🇺',rate:1.53},CAD:{name:'CAD',sym:'C$',flag:'🇨🇦',rate:1.36},
  CHF:{name:'Franc',sym:'Fr',flag:'🇨🇭',rate:0.9},KRW:{name:'Won',sym:'₩',flag:'🇰🇷',rate:1325},
  SGD:{name:'SGD',sym:'S$',flag:'🇸🇬',rate:1.35},AED:{name:'Dirham',sym:'د.إ',flag:'🇦🇪',rate:3.67},
  SAR:{name:'Riyal',sym:'SR',flag:'🇸🇦',rate:3.75},BRL:{name:'Real',sym:'R$',flag:'🇧🇷',rate:4.97},
  MXN:{name:'Peso',sym:'$',flag:'🇲🇽',rate:17.15},THB:{name:'Baht',sym:'฿',flag:'🇹🇭',rate:35.08},
  IDR:{name:'Rupiah',sym:'Rp',flag:'🇮🇩',rate:15650},MYR:{name:'Ringgit',sym:'RM',flag:'🇲🇾',rate:4.72},
  PHP:{name:'Peso',sym:'₱',flag:'🇵🇭',rate:56.42},NZD:{name:'NZD',sym:'NZ$',flag:'🇳🇿',rate:1.63},
};
const conv = (a:number,f:string,t:string)=>(a/CURRENCIES[f].rate)*CURRENCIES[t].rate;

export function CurrencyCalc({ onBack }: { onBack: () => void }) {
  const [amount, setAmount] = useState(100);
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('INR');
  const result = conv(amount, from, to), rate = conv(1, from, to);

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack}/>
      <CalcHeader title="Currency Converter" desc="Convert between 20 major currencies with indicative rates. Live rates require API key."/>
      <TwoCol
        left={<>
          <div className="mb-4">
            <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-1.5">Amount</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 font-bold text-emerald-500">{CURRENCIES[from].sym}</span>
              <input type="number" value={amount} onChange={e=>setAmount(Number(e.target.value))} className="input-field pl-8 mono text-lg font-semibold"/>
            </div>
          </div>
          {[['From',from,setFrom],['To',to,setTo]].map(([lbl,val,set])=>(
            <div key={String(lbl)} className="mb-4">
              <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-1.5">{String(lbl)}</label>
              <select value={String(val)} onChange={e=>(set as (v:string)=>void)(e.target.value)} className="input-field">
                {Object.entries(CURRENCIES).map(([k,v])=><option key={k} value={k}>{v.flag} {k} — {v.name}</option>)}
              </select>
            </div>
          ))}
          <button onClick={()=>{const t=from;setFrom(to);setTo(t);}} className="btn-secondary w-full text-sm">⇅ Swap Currencies</button>
          <div className="flex gap-2 flex-wrap mt-3">
            {[100,500,1000,5000,10000].map(a=>(
              <button key={a} onClick={()=>setAmount(a)} className={cn('px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all',amount===a?'bg-blue-500 text-white border-transparent':'btn-secondary')}>{CURRENCIES[from].sym}{a.toLocaleString()}</button>
            ))}
          </div>
        </>}
        right={<>
          <div className="rounded-2xl p-5 text-center mb-4" style={{background:'linear-gradient(135deg,rgba(6,214,160,.1),rgba(91,127,255,.1))',border:'1px solid rgba(6,214,160,.25)'}}>
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">{amount.toLocaleString()} {from} =</div>
            <div className="mono text-3xl font-black text-emerald-500 dark:text-emerald-400 mb-1">{CURRENCIES[to].sym}{result.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',')}</div>
            <div className="text-sm text-slate-500 dark:text-slate-400">{CURRENCIES[to].name}</div>
          </div>
          <ResultRow label={`1 ${from} =`} value={`${CURRENCIES[to].sym}${rate.toFixed(4)}`} color="text-blue-500 dark:text-blue-400"/>
          <ResultRow label={`1 ${to} =`} value={`${CURRENCIES[from].sym}${(1/rate).toFixed(4)}`} color="text-blue-500 dark:text-blue-400"/>
          <div className="mt-4 grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
            {Object.entries(CURRENCIES).filter(([k])=>k!==from).map(([k,v])=>(
              <div key={k} onClick={()=>setTo(k)} className={cn('flex items-center gap-2 p-2.5 rounded-xl cursor-pointer border transition-all',to===k?'border-blue-500 bg-blue-500/10':'card hover:border-blue-400/50')}>
                <span className="text-base">{v.flag}</span>
                <div><div className="text-xs font-bold">{k}</div><div className="mono text-[10px] text-emerald-500">{v.sym}{conv(1,from,k).toFixed(2)}</div></div>
              </div>
            ))}
          </div>
        </>}
      />
    </div>
  );
}

/* ── Standard Calculator ─────────────────────────────── */
export function StandardCalc({ onBack }: { onBack: () => void }) {
  const [disp, setDisp] = useState('0');
  const [expr, setExpr] = useState('');
  const [hist, setHist] = useState<{e:string;r:string}[]>([]);
  const [sci, setSci] = useState(false);

  const press = (v: string) => {
    setDisp(prev => {
      if(v==='C'){setExpr('');return '0';}
      if(v==='⌫') return prev.length>1?prev.slice(0,-1):'0';
      if(v==='='){
        try{
          const e=prev.replace(/×/g,'*').replace(/÷/g,'/').replace(/π/g,String(Math.PI));
          // eslint-disable-next-line no-new-func
          const r=Function('"use strict";return('+e+')')() as number;
          const res=parseFloat(r.toFixed(10)).toString();
          setHist(h=>[{e:prev,r:res},...h.slice(0,7)]);
          setExpr(prev+' =');
          return res;
        }catch{return 'Error';}
      }
      if(v==='%') return String(parseFloat(prev)/100);
      if(v==='+/-') return prev.startsWith('-')?prev.slice(1):'-'+prev;
      if(v==='x²') return String(parseFloat(prev)**2);
      if(v==='√') return parseFloat(Math.sqrt(parseFloat(prev)).toFixed(8)).toString();
      if(v==='sin') return Math.sin(parseFloat(prev)*Math.PI/180).toFixed(6);
      if(v==='cos') return Math.cos(parseFloat(prev)*Math.PI/180).toFixed(6);
      if(v==='tan') return Math.tan(parseFloat(prev)*Math.PI/180).toFixed(6);
      if(v==='log') return Math.log10(parseFloat(prev)).toFixed(6);
      if(v==='ln')  return Math.log(parseFloat(prev)).toFixed(6);
      if(v==='1/x') return String(1/parseFloat(prev));
      if(prev==='0'&&v!=='.'&&!'+-×÷'.includes(v)) return v;
      return prev+v;
    });
  };

  const rows=[['C','+/-','%','÷'],['7','8','9','×'],['4','5','6','−'],['1','2','3','+'],['0','.','⌫','=']];

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack}/>
      <div className="flex justify-center">
        <div className="card overflow-hidden w-full max-w-xs shadow-2xl">
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-200 dark:border-slate-800">
            <span className="text-sm font-bold text-slate-600 dark:text-slate-400">Calculator</span>
            <button onClick={()=>setSci(!sci)} className={cn('px-3 py-1 rounded-lg text-xs font-semibold border transition-all',sci?'bg-blue-500 text-white border-transparent':'btn-secondary')}>
              {sci?'Basic':'Scientific'}
            </button>
          </div>
          <div className="px-4 py-3 text-right min-h-[80px] flex flex-col justify-end">
            <div className="mono text-xs text-slate-400 min-h-4 mb-1">{expr}</div>
            <div className={cn('mono font-semibold break-all leading-tight transition-colors',disp.length>10?'text-2xl':'text-4xl',disp==='Error'?'text-red-400':'text-slate-900 dark:text-slate-100')}>{disp}</div>
          </div>
          {sci&&<div className="grid grid-cols-5 gap-1 px-3 pb-2">
            {['sin','cos','tan','log','ln','1/x','x²','√','π','e'].map(b=>(
              <button key={b} onClick={()=>press(b)} className="py-2 rounded-lg text-[11px] font-semibold bg-blue-500/10 text-blue-500 dark:text-blue-400 border border-blue-500/20 hover:bg-blue-500/20 transition-colors">{b}</button>
            ))}
          </div>}
          <div className="grid grid-cols-4 gap-1.5 p-3">
            {rows.flat().map((b,i)=>{
              const isOp=['÷','×','−','+'].includes(b);
              const isEq=b==='=';
              const isSpec=['C','+/-','%'].includes(b);
              return <button key={i} onClick={()=>press(b)}
                style={{gridColumn:b==='0'?'span 2':'span 1'}}
                className={cn('py-4 rounded-xl font-bold text-lg transition-all active:scale-90',
                  isEq?'bg-blue-500 text-white shadow-lg hover:bg-blue-600':
                  isOp?'bg-blue-500/12 text-blue-500 dark:text-blue-400 border border-blue-500/20':
                  isSpec?'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300':
                  'bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                )}>{b}</button>;
            })}
          </div>
          {hist.length>0&&<div className="border-t border-slate-200 dark:border-slate-800 px-4 py-3">
            <div className="section-label mb-2">History</div>
            {hist.slice(0,3).map((h,i)=><div key={i} className="flex justify-between text-xs py-0.5"><span className="mono text-slate-400">{h.e}</span><span className="mono text-blue-500">= {h.r}</span></div>)}
          </div>}
        </div>
      </div>
    </div>
  );
}

/* ── Calorie Calculator ──────────────────────────────── */
export function CalorieCalc({ onBack }: { onBack: () => void }) {
  const [age, setAge] = useState(28);
  const [wt, setWt] = useState(70);
  const [ht, setHt] = useState(170);
  const [gender, setGender] = useState<'male'|'female'>('male');
  const [act, setAct] = useState(1.55);
  const bmr = gender==='male' ? 10*wt+6.25*ht-5*age+5 : 10*wt+6.25*ht-5*age-161;
  const tdee = Math.round(bmr*act);
  const acts=[[1.2,'Sedentary'],[1.375,'Light (1-3/wk)'],[1.55,'Moderate (3-5/wk)'],[1.725,'Active (6-7/wk)'],[1.9,'Very Active']];

  return (
    <div className="animate-fade-up">
      <BackButton onClick={onBack}/>
      <CalcHeader title="Calorie Calculator" desc="Calculate your BMR (Base Metabolic Rate) and TDEE (Total Daily Energy Expenditure) using Mifflin-St Jeor equation."/>
      <TwoCol
        left={<>
          <div className="flex gap-2 mb-5">
            {(['male','female'] as const).map(g=>(
              <button key={g} onClick={()=>setGender(g)} className={cn('flex-1 py-2.5 rounded-xl text-sm font-semibold border transition-all capitalize',g===gender?'bg-pink-500 text-white border-transparent':'btn-secondary')}>{g}</button>
            ))}
          </div>
          <SliderField label="Age (years)" value={age} onChange={setAge} min={10} max={90} format={v=>`${v} yr`}/>
          <SliderField label="Weight (kg)" value={wt} onChange={setWt} min={30} max={200} format={v=>`${v} kg`}/>
          <SliderField label="Height (cm)" value={ht} onChange={setHt} min={100} max={250} format={v=>`${v} cm`}/>
          <div>
            <label className="block text-[10px] font-bold tracking-widest uppercase text-slate-400 dark:text-slate-500 mb-2">Activity Level</label>
            {acts.map(([v,l])=>(
              <button key={Number(v)} onClick={()=>setAct(Number(v))} className={cn('w-full text-left px-3 py-2 rounded-xl text-xs font-medium mb-1.5 border transition-all',act===Number(v)?'bg-orange-500 text-white border-transparent':'btn-ghost border-slate-200 dark:border-slate-700')}>
                {String(l)}
              </button>
            ))}
          </div>
        </>}
        right={<>
          <div className="card p-6 text-center mb-4">
            <div className="text-xs text-slate-500 dark:text-slate-400 mb-1">Daily Calories (TDEE)</div>
            <div className="mono text-6xl font-black text-orange-500 dark:text-orange-400 leading-none">{tdee}</div>
            <div className="text-sm text-slate-400 mt-1">kcal / day</div>
          </div>
          <ResultRow label="BMR (Base Rate)" value={`${Math.round(bmr)} kcal`} color="text-blue-500 dark:text-blue-400"/>
          <ResultRow label="Maintenance (TDEE)" value={`${tdee} kcal`} highlight color="text-orange-500 dark:text-orange-400"/>
          <ResultRow label="For Weight Loss (−500)" value={`${tdee-500} kcal`} color="text-emerald-500 dark:text-emerald-400"/>
          <ResultRow label="For Weight Gain (+300)" value={`${tdee+300} kcal`} color="text-violet-500 dark:text-violet-400"/>
          <div className="mt-4 card p-4">
            <div className="section-label mb-2">Estimated Macros</div>
            {[['Protein',Math.round(wt*2),'g',`${Math.round(wt*2*4)} kcal`,'text-pink-500'],['Carbs',Math.round(tdee*.45/4),'g',`${Math.round(tdee*.45)} kcal`,'text-yellow-500'],['Fats',Math.round(tdee*.3/9),'g',`${Math.round(tdee*.3)} kcal`,'text-blue-500']].map(([n,v,u,k,c])=>(
              <div key={String(n)} className="flex justify-between py-1.5 border-b border-slate-100 dark:border-slate-800 last:border-0 text-xs">
                <span className="text-slate-500">{String(n)}</span>
                <span className={cn('mono font-semibold',String(c))}>{String(v)}{String(u)} <span className="text-slate-400">({String(k)})</span></span>
              </div>
            ))}
          </div>
        </>}
      />
    </div>
  );
}
