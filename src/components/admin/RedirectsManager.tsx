import React, { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2, ArrowRight, Pencil, X, CheckCircle2 } from 'lucide-react';
import { adminApi, type Redirect } from '../../lib/adminApi';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1';

type Draft = { id?: number; source_path: string; target: string; code: number };
const empty: Draft = { source_path: '', target: '', code: 301 };

export function RedirectsManager() {
  const [rows, setRows] = useState<Redirect[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [draft, setDraft] = useState<Draft | null>(null);
  const [saving, setSaving] = useState(false);

  const load = () => {
    setError(null);
    adminApi.listRedirects().then((r) => setRows(r.redirects)).catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setSaving(true);
    setError(null);
    try {
      if (draft.id) await adminApi.updateRedirect(draft.id, draft);
      else await adminApi.createRedirect(draft);
      setMsg('Redirection enregistrée.');
      setDraft(null);
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  const remove = async (r: Redirect) => {
    if (!confirm(`Supprimer la redirection ${r.source_path} → ${r.target} ?`)) return;
    try {
      await adminApi.deleteRedirect(r.id);
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-1">Redirections</h1>
          <p className="text-gray-500 text-sm">Rediriger une ancienne URL vers une nouvelle (301 = permanent, bon pour le SEO).</p>
        </div>
        {!draft && <button onClick={() => { setMsg(null); setDraft({ ...empty }); }} className="inline-flex items-center gap-2 bg-brand-dark text-white px-4 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-cyan hover:text-brand-dark transition"><Plus size={16} /> Ajouter</button>}
      </div>

      {msg && <p className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-bold my-4"><CheckCircle2 size={16} /> {msg}</p>}
      {error && <p className="text-red-600 text-sm font-medium my-4">{error}</p>}

      {draft && (
        <form onSubmit={save} className="bg-white rounded-2xl border border-gray-200 p-5 my-5">
          <div className="flex items-center justify-between mb-3">
            <p className="font-bold text-brand-dark text-sm">{draft.id ? 'Modifier' : 'Nouvelle redirection'}</p>
            <button type="button" onClick={() => setDraft(null)} className="text-gray-400 hover:text-gray-600"><X size={18} /></button>
          </div>
          <div className="grid sm:grid-cols-[1fr_auto_1fr] gap-3 items-end">
            <div>
              <label className={LABEL}>Ancienne URL (source)</label>
              <input className={INPUT} value={draft.source_path} placeholder="/ancienne-page" onChange={(e) => setDraft({ ...draft, source_path: e.target.value })} required />
            </div>
            <ArrowRight size={18} className="text-gray-400 mb-2.5 hidden sm:block" />
            <div>
              <label className={LABEL}>Vers (cible)</label>
              <input className={INPUT} value={draft.target} placeholder="/nouvelle-page ou https://…" onChange={(e) => setDraft({ ...draft, target: e.target.value })} required />
            </div>
          </div>
          <div className="flex items-center justify-between mt-4">
            <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
              Type :
              <select className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm" value={draft.code} onChange={(e) => setDraft({ ...draft, code: Number(e.target.value) })}>
                <option value={301}>301 (permanent)</option>
                <option value={302}>302 (temporaire)</option>
              </select>
            </label>
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
              {saving ? <Loader2 size={16} className="animate-spin" /> : null} Enregistrer
            </button>
          </div>
        </form>
      )}

      {!rows && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}
      {rows && rows.length === 0 && !draft && (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center text-gray-500 mt-5">Aucune redirection. Ajoute-en une quand tu changes une URL.</div>
      )}
      {rows && rows.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100 mt-5">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 transition">
              <span className="text-[10px] font-bold px-2 py-1 rounded bg-gray-100 text-gray-500 flex-shrink-0">{r.code}</span>
              <div className="flex-1 min-w-0 flex items-center gap-2 text-sm">
                <code className="text-brand-dark truncate">{r.source_path}</code>
                <ArrowRight size={14} className="text-gray-400 flex-shrink-0" />
                <code className="text-brand-cyan truncate">{r.target}</code>
              </div>
              <button onClick={() => { setMsg(null); setDraft({ id: r.id, source_path: r.source_path, target: r.target, code: r.code }); }} className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Modifier"><Pencil size={16} /></button>
              <button onClick={() => remove(r)} className="p-2 text-gray-400 hover:text-red-500 transition" title="Supprimer"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
