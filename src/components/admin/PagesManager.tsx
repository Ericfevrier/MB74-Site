import React, { useEffect, useState } from 'react';
import {
  Loader2, Save, ArrowLeft, ChevronRight, ExternalLink, ImagePlus, RotateCcw, CheckCircle2,
  Plus, Trash2, ChevronUp, ChevronDown,
} from 'lucide-react';
import { adminApi } from '../../lib/adminApi';
import { PAGES, type PageDef, type PageField, type ListItemField } from '../../lib/pageSchema';
import { MediaPicker } from './MediaPicker';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1';

const clone = (v: any) => JSON.parse(JSON.stringify(v ?? []));
const allFields = (page: PageDef) => page.sections.flatMap((s) => s.fields);

type Picker = ((url: string) => void) | null;

/* -------- Sous-champ d'un élément de liste ------- */
function SubInput({ field, value, onChange, onPick }: { field: ListItemField; value: string; onChange: (v: string) => void; onPick: () => void }) {
  if (field.type === 'textarea') return <textarea className={`${INPUT} h-20 resize-y`} value={value || ''} placeholder={field.label} onChange={(e) => onChange(e.target.value)} />;
  if (field.type === 'image') {
    return (
      <div className="flex items-center gap-2">
        <div className="w-12 h-9 rounded overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">{value && <img src={value} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />}</div>
        <input className={INPUT} value={value || ''} placeholder={field.label} onChange={(e) => onChange(e.target.value)} />
        <button type="button" onClick={onPick} className="flex-shrink-0 inline-flex items-center bg-brand-dark text-white px-2.5 py-2 rounded-lg hover:bg-brand-cyan hover:text-brand-dark transition"><ImagePlus size={14} /></button>
      </div>
    );
  }
  return <input className={INPUT} value={value || ''} placeholder={field.label} onChange={(e) => onChange(e.target.value)} />;
}

/* ---------------- Champ liste répétable ---------------- */
function ListField({ field, items, onChange, onReset, pick }: { field: PageField; items: any[]; onChange: (v: any[]) => void; onReset: () => void; pick: (cb: (url: string) => void) => void }) {
  const subs = field.itemFields || [];
  const setItem = (i: number, key: string, val: string) => onChange(items.map((it, k) => (k === i ? { ...it, [key]: val } : it)));
  const add = () => onChange([...items, Object.fromEntries(subs.map((s) => [s.key, '']))]);
  const del = (i: number) => onChange(items.filter((_, k) => k !== i));
  const move = (i: number, dir: number) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const n = [...items];
    [n[i], n[j]] = [n[j], n[i]];
    onChange(n);
  };
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <label className={`${LABEL} mb-0`}>{field.label} <span className="text-gray-400">({items.length})</span></label>
        <button type="button" onClick={onReset} title="Revenir au contenu par défaut" className="text-[10px] font-bold text-gray-400 hover:text-brand-cyan inline-flex items-center gap-1"><RotateCcw size={11} /> défaut</button>
      </div>
      <div className="space-y-2">
        {items.map((it, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-gray-400">{field.itemLabel || 'Élément'} {i + 1}</span>
              <div className="flex items-center gap-0.5">
                <button type="button" onClick={() => move(i, -1)} disabled={i === 0} className="p-1 text-gray-400 hover:text-brand-dark disabled:opacity-30"><ChevronUp size={14} /></button>
                <button type="button" onClick={() => move(i, 1)} disabled={i === items.length - 1} className="p-1 text-gray-400 hover:text-brand-dark disabled:opacity-30"><ChevronDown size={14} /></button>
                <button type="button" onClick={() => del(i)} className="p-1 text-gray-400 hover:text-red-500"><Trash2 size={14} /></button>
              </div>
            </div>
            <div className="space-y-2">
              {subs.map((sf) => (
                <SubInput key={sf.key} field={sf} value={it[sf.key]} onChange={(v) => setItem(i, sf.key, v)} onPick={() => pick((u) => setItem(i, sf.key, u))} />
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" onClick={add} className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-dark transition mt-2"><Plus size={14} /> Ajouter</button>
    </div>
  );
}

/* ---------------- Champ scalaire ---------------- */
function Field({ field, value, onChange, onPick }: { field: PageField; value: string; onChange: (v: string) => void; onPick: () => void }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <label className={`${LABEL} mb-0`}>{field.label}</label>
        {value !== '' && <button type="button" onClick={() => onChange('')} title="Revenir au texte par défaut" className="text-[10px] font-bold text-gray-400 hover:text-brand-cyan inline-flex items-center gap-1"><RotateCcw size={11} /> défaut</button>}
      </div>
      {field.type === 'textarea' ? (
        <textarea className={`${INPUT} h-24 resize-y`} value={value} placeholder={field.default} onChange={(e) => onChange(e.target.value)} />
      ) : field.type === 'image' ? (
        <div className="flex items-start gap-3">
          <div className="w-20 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
            {(value || field.default) && <img src={value || field.default} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
          </div>
          <div className="flex-1 flex gap-2">
            <input className={INPUT} value={value} placeholder={field.default} onChange={(e) => onChange(e.target.value)} />
            <button type="button" onClick={onPick} className="flex-shrink-0 inline-flex items-center bg-brand-dark text-white px-3 rounded-lg hover:bg-brand-cyan hover:text-brand-dark transition"><ImagePlus size={15} /></button>
          </div>
        </div>
      ) : (
        <input className={INPUT} value={value} placeholder={field.default} onChange={(e) => onChange(e.target.value)} />
      )}
    </div>
  );
}

function PageEditor({ page, onBack }: { page: PageDef; onBack: () => void }) {
  const [values, setValues] = useState<Record<string, any> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [picker, setPicker] = useState<Picker>(null);

  useEffect(() => {
    adminApi.getPageContent(page.key).then((r) => {
      const raw = r.fields || {};
      const v: Record<string, any> = {};
      for (const f of allFields(page)) {
        if (f.type === 'list') {
          const ov = raw[f.key];
          if (ov) { try { v[f.key] = JSON.parse(ov); } catch { v[f.key] = clone(f.defaultList); } }
          else v[f.key] = clone(f.defaultList);
        } else {
          v[f.key] = raw[f.key] || '';
        }
      }
      setValues(v);
    }).catch((e) => setError(e.message));
  }, [page.key]);

  const set = (k: string, v: any) => setValues((p) => ({ ...(p || {}), [k]: v }));

  const save = async () => {
    if (!values) return;
    setSaving(true);
    setError(null);
    try {
      const out: Record<string, string> = {};
      for (const f of allFields(page)) {
        if (f.type === 'list') {
          const arr = values[f.key] || [];
          out[f.key] = JSON.stringify(arr) === JSON.stringify(f.defaultList || []) ? '' : JSON.stringify(arr);
        } else {
          out[f.key] = values[f.key] || '';
        }
      }
      await adminApi.savePageContent(page.key, out);
      setOk(true);
      setTimeout(() => setOk(false), 2000);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-3xl space-y-4">
      <div className="flex items-center justify-between gap-4 sticky top-0 z-10 bg-brand-light/95 backdrop-blur py-3 -mt-3">
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-brand-dark transition"><ArrowLeft size={16} /> Pages</button>
        <h2 className="font-bold uppercase tracking-tight text-brand-dark truncate">{page.label}</h2>
        <div className="flex items-center gap-2">
          <a href={page.path} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Voir la page"><ExternalLink size={16} /></a>
          <button onClick={save} disabled={saving || !values} className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Enregistrer
          </button>
        </div>
      </div>
      {ok && <p className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-bold"><CheckCircle2 size={16} /> Enregistré</p>}
      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
      <p className="text-xs text-gray-400">Laisse un champ vide (ou clique « défaut ») pour garder le contenu d'origine du site.</p>

      {!values && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {values && page.sections.map((sec) => (
        <div key={sec.title} className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="font-bold text-sm text-brand-dark mb-4">{sec.title}</p>
          <div className="space-y-4">
            {sec.fields.map((f) => (
              f.type === 'list'
                ? <ListField key={f.key} field={f} items={values[f.key] || []} onChange={(v) => set(f.key, v)} onReset={() => set(f.key, clone(f.defaultList))} pick={(cb) => setPicker(() => cb)} />
                : <Field key={f.key} field={f} value={values[f.key] || ''} onChange={(v) => set(f.key, v)} onPick={() => setPicker(() => (u: string) => set(f.key, u))} />
            ))}
          </div>
        </div>
      ))}

      <MediaPicker open={picker !== null} onClose={() => setPicker(null)} onSelect={(urls) => { if (picker && urls[0]) picker(urls[0]); }} />
    </div>
  );
}

export function PagesManager() {
  const [page, setPage] = useState<PageDef | null>(null);
  if (page) return <PageEditor page={page} onBack={() => setPage(null)} />;
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-1">Pages</h1>
      <p className="text-gray-500 text-sm mb-6">Modifie textes, images, boutons et listes des pages éditoriales du site (occasions, blog, marques… se gèrent dans leurs sections dédiées).</p>
      <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
        {PAGES.map((p) => (
          <button key={p.key} onClick={() => setPage(p)} className="w-full flex items-center gap-3 p-4 hover:bg-gray-50 transition text-left">
            <div className="flex-1 min-w-0">
              <p className="font-bold text-brand-dark">{p.label}</p>
              <p className="text-xs text-gray-500">{p.path} · {p.sections.reduce((n, s) => n + s.fields.length, 0)} champs</p>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </button>
        ))}
      </div>
    </div>
  );
}
