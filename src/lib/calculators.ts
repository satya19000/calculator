import type { Calculator } from '@/types';

export const CALCULATORS: Calculator[] = [
  { id:'standard',   name:'Standard Calculator',   description:'Basic & scientific calculator with history', category:'basic',    icon:'Calculator',  accent:'#5b7fff', badge:'' },
  { id:'emi',        name:'EMI Calculator',         description:'Loan EMI with full amortization schedule',   category:'finance',  icon:'DollarSign',  accent:'#06d6a0', badge:'Popular' },
  { id:'sip',        name:'SIP Calculator',         description:'Systematic investment plan returns',         category:'finance',  icon:'TrendingUp',  accent:'#8b5cf6', badge:'' },
  { id:'compound',   name:'Compound Interest',      description:'Compound growth with visual bar chart',      category:'finance',  icon:'Zap',         accent:'#eab308', badge:'' },
  { id:'gst',        name:'GST Calculator',         description:'GST with CGST/SGST breakdown',               category:'finance',  icon:'Percent',     accent:'#06d6a0', badge:'' },
  { id:'bmi',        name:'BMI Calculator',         description:'Body Mass Index with health ranges',         category:'health',   icon:'Heart',       accent:'#ec4899', badge:'Trending' },
  { id:'calorie',    name:'Calorie Calculator',     description:'BMR, TDEE & daily macro targets',            category:'health',   icon:'Activity',    accent:'#f97316', badge:'' },
  { id:'currency',   name:'Currency Converter',     description:'40 currencies with indicative rates',        category:'utility',  icon:'Globe',       accent:'#06d6a0', badge:'New' },
  { id:'percentage', name:'Percentage Calculator',  description:'Three percentage modes in one tool',         category:'basic',    icon:'Percent',     accent:'#5b7fff', badge:'' },
  { id:'age',        name:'Age Calculator',         description:'Exact age & birthday countdown',             category:'basic',    icon:'Clock',       accent:'#8b5cf6', badge:'' },
  { id:'tip',        name:'Tip Calculator',         description:'Bill split & tip for any group size',        category:'basic',    icon:'DollarSign',  accent:'#eab308', badge:'' },
  { id:'gpa',        name:'GPA Calculator',         description:'Weighted GPA across all courses',            category:'education',icon:'Star',        accent:'#eab308', badge:'' },
  { id:'crypto',     name:'Crypto P&L',             description:'Cryptocurrency profit & loss calculator',    category:'crypto',   icon:'TrendingUp',  accent:'#06d6a0', badge:'' },
  { id:'discount',   name:'Discount Calculator',    description:'Sale price, savings & reverse discount',     category:'basic',    icon:'Tag',         accent:'#f97316', badge:'' },
  { id:'bodyfat',    name:'Body Fat Calculator',    description:'US Navy method body fat percentage',         category:'fitness',  icon:'Activity',    accent:'#ec4899', badge:'' },
  { id:'unit',       name:'Unit Converter',         description:'Convert 200+ units across 7 categories',     category:'utility',  icon:'ArrowLeftRight', accent:'#8b5cf6', badge:'' },
];

export const CATEGORIES = [
  { id:'all',       label:'All',       count: CALCULATORS.length },
  { id:'basic',     label:'Basic',     count: CALCULATORS.filter(c=>c.category==='basic').length },
  { id:'finance',   label:'Finance',   count: CALCULATORS.filter(c=>c.category==='finance').length },
  { id:'health',    label:'Health',    count: CALCULATORS.filter(c=>c.category==='health').length },
  { id:'fitness',   label:'Fitness',   count: CALCULATORS.filter(c=>c.category==='fitness').length },
  { id:'education', label:'Education', count: CALCULATORS.filter(c=>c.category==='education').length },
  { id:'crypto',    label:'Crypto',    count: CALCULATORS.filter(c=>c.category==='crypto').length },
  { id:'utility',   label:'Utility',   count: CALCULATORS.filter(c=>c.category==='utility').length },
];
