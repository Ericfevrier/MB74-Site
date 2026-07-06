import React, { useRef } from 'react';
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

/**
 * Glisser-déposer natif pour réordonner une liste. Renvoie une fonction qui produit
 * les props DnD d'une ligne selon son index. Désactivé si `enabled` est faux
 * (ex. quand une recherche/filtre est active → l'ordre affiché ≠ ordre réel).
 * Persiste le nouvel ordre via `persist(ids)`.
 */
export function useDragReorder<T extends { id: number }>(
  items: T[] | null | undefined,
  setItems: (v: T[]) => void,
  persist: (ids: number[]) => Promise<unknown>,
  enabled: boolean,
) {
  const from = useRef<number | null>(null);
  return (index: number): React.HTMLAttributes<HTMLElement> => {
    if (!enabled) return {};
    return {
      draggable: true,
      onDragStart: (e) => { from.current = index; (e.dataTransfer as DataTransfer).effectAllowed = 'move'; },
      onDragOver: (e) => e.preventDefault(),
      onDrop: (e) => {
        e.preventDefault();
        const f = from.current;
        from.current = null;
        if (f == null || f === index || !items) return;
        const next = [...items];
        const [moved] = next.splice(f, 1);
        next.splice(index, 0, moved);
        setItems(next);
        persist(next.map((x) => x.id)).catch(() => {});
      },
    };
  };
}

const STATUS_OPTIONS = [
  { value: 'all', label: 'Tous les statuts' },
  { value: 'published', label: 'Publiés' },
  { value: 'draft', label: 'Brouillons' },
];
export function StatusFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return <FilterSelect value={value} onChange={onChange} options={STATUS_OPTIONS} />;
}
