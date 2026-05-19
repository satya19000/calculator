export type Theme = 'dark' | 'light';
export type CalcCategory = 'basic' | 'finance' | 'health' | 'fitness' | 'education' | 'crypto' | 'utility';

export interface Calculator {
  id: string; name: string; description: string;
  category: CalcCategory; icon: string;
  accent: string; badge?: string; uses?: string;
}
export interface Message { role: 'user' | 'assistant'; content: string; }
