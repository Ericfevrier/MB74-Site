import React from 'react';
import { Search, X } from 'lucide-react';

/** Retire accents + casse pour une recherche tolérante. */
export function normalize(s: string): string {
  return (s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}
/** true si tous les mots de `q` sont présents dans `haystack`. */
export function matchQuery(haystack: string, q: string): boolean {
  const n = normalize(haystack);
  return normalize(q).split(/\s+/).filter(Boolean).every((w) => n.includes(w));
}

export function SearchInput({ value, onChange, placeholder }: { value: string; onChange: (v: string) => void; placeholder?: string }) {
  return (
    <div className="relative flex-1 min-w-[180px] max-w-sm">
      <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || 'Rechercher…'}
        className="w-full bg-white border border-gray-300 rounded-xl pl-9 pr-8 py-2.5 text-sm focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition"
      />
      {value && (
        <button onClick={() => onChange('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"><X size={15} /></button>
      )}
    </div>
  );
}

export function FilterSelect({ value, onChange, options }: { value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <select value={value} onChange={(e) => onChange(e.target.value)} className="bg-white border border-gray-300 rounded-xl px-3 py-2.5 text-sm font-medium text-brand-dark focus:outline-none focus:border-brand-cyan transition">
      {options.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  );
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'published', label: 'Publiés' },
  { value: 'draft', label: 'Brouillons' },
];
export function StatusFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <FilterSelect value={value} onChange={onChange} options={STATUS_OPTIONS} />;
}
