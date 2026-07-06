import React, { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2, Pencil, X, GripVertical, Check } from 'lucide-react';
import { adminApi, type MenuItem } from '../../lib/adminApi';
import { useDragReorder } from './AdminToolbar';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';

const LOCATIONS = [
  { id: 'footer-services', label: 'Pied de page — colonne « Nos services »' },
  { id: 'footer-bateaux', label: 'Pied de page — colonne « Nos bateaux »' },
];

function LocationSection({ location, label, items, onChanged }: { location: string; label: string; items: MenuItem[]; onChanged: () => void }) {
  const [local, setLocal] = useState(items);
  const [draft, setDraft] = useState<{ id?: number; label: string; url: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => setLocal(items), [items]);

  const drag = useDragReorder(local, setLocal, adminApi.reorderMenus, true);

  const save = async () => {
    if (!draft) return;
    if (!draft.label.trim() || !draft.url.trim()) { setError('Libellé et lien requis.'); return; }
    setError(null);
    try {
      if (draft.id) await adminApi.updateMenu(draft.id, { location, label: draft.label, url: draft.url });
      else await adminApi.createMenu({ location, label: draft.label, url: draft.url });
      setDraft(null);
      onChanged();
    } catch (e: any) { setError(e.message); }
  };
  const remove = async (m: MenuItem) => {
    if (!confirm(`Supprimer « ${m.label} » ?`)) return;
    try { await adminApi.deleteMenu(m.id); onChanged(); } catch (e: any) { setError(e.message); }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 mb-5">
      <div className="flex items-center justify-between mb-3">
        <p className="font-bold text-brand-dark text-sm">{label}</p>
        {!draft && <button onClick={() => setDraft({ label: '', url: '' })} className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-dark transition"><Plus size={14} /> Ajouter un lien</button>}
      </div>
      {error && <p className="text-red-600 text-sm font-medium mb-3">{error}</p>}

      <div className="divide-y divide-gray-100">
        {local.map((m, i) => (
          <div key={m.id} {...drag(i)} className="flex items-center gap-2 py-2.5 cursor-move">
            <GripVertical size={15} className="text-gray-300 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-brand-dark truncate">{m.label}</p>
              <p className="text-xs text-gray-400 truncate">{m.url}</p>
            </div>
            <button onClick={() => setDraft({ id: m.id, label: m.label, url: m.url })} className="p-1.5 text-gray-400 hover:text-brand-cyan transition"><Pencil size={15} /></button>
            <button onClick={() => remove(m)} className="p-1.5 text-gray-400 hover:text-red-500 transition"><Trash2 size={15} /></button>
          </div>
        ))}
        {local.length === 0 && !draft && <p className="text-xs text-gray-400 py-3">Aucun lien — les liens par défaut du site s'affichent.</p>}
      </div>

      {draft && (
        <div className="mt-3 pt-3 border-t border-gray-100 grid sm:grid-cols-[1fr_1fr_auto] gap-2 items-center">
          <input className={INPUT} placeholder="Libellé" value={draft.label} onChange={(e) => setDraft({ ...draft, label: e.target.value })} autoFocus />
          <input className={INPUT} placeholder="/page ou https://…" value={draft.url} onChange={(e) => setDraft({ ...draft, url: e.target.value })} />
          <div className="flex gap-1">
            <button onClick={save} className="p-2 bg-brand-dark text-white rounded-lg hover:bg-brand-cyan hover:text-brand-dark transition"><Check size={16} /></button>
            <button onClick={() => { setDraft(null); setError(null); }} className="p-2 text-gray-400 hover:text-gray-600"><X size={16} /></button>
          </div>
        </div>
      )}
    </div>
  );
}

export function MenusManager() {
  const [items, setItems] = useState<MenuItem[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setError(null);
    adminApi.listMenus().then((r) => setItems(r.items)).catch((e) => setError(e.message));
  };
  useEffect(load, []);

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-1">Menus</h1>
      <p className="text-gray-500 text-sm mb-6">Gère les colonnes de liens du pied de page (glisser-déposer pour l'ordre, liens internes ou externes). Tant qu'une colonne est vide, les liens par défaut du site s'affichent.</p>

      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
      {!items && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {items && LOCATIONS.map((loc) => (
        <LocationSection key={loc.id} location={loc.id} label={loc.label} items={items.filter((i) => i.location === loc.id)} onChanged={load} />
      ))}
    </div>
  );
}
