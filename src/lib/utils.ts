import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...i: ClassValue[]) => twMerge(clsx(i));

export const fmt = (n: number, d = 2) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: d }).format(n);

export const fmtINR = (n: number) => `₹${fmt(Math.round(n))}`;
export const fmtUSD = (n: number, sym = '$') => `${sym}${fmt(n)}`;

export function calcEMI(P: number, rPct: number, n: number): number {
  const r = rPct / 100 / 12;
  if (r === 0) return P / n;
  return (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export function calcBMI(w: number, h: number, unit: 'metric' | 'imperial'): number {
  return unit === 'metric' ? w / Math.pow(h / 100, 2) : (w * 703) / Math.pow(h, 2);
}

export function bmiInfo(bmi: number) {
  if (bmi < 18.5) return { label: 'Underweight', color: '#60a5fa', pct: (bmi - 10) / 35 * 100 };
  if (bmi < 25)   return { label: 'Normal', color: '#06d6a0', pct: (bmi - 10) / 35 * 100 };
  if (bmi < 30)   return { label: 'Overweight', color: '#eab308', pct: (bmi - 10) / 35 * 100 };
  return { label: 'Obese', color: '#ef4444', pct: Math.min((bmi - 10) / 35 * 100, 98) };
}

export function copyText(text: string) {
  navigator.clipboard.writeText(text).catch(() => {});
}
