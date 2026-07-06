import React, { useEffect, useState } from 'react';
import { Loader2, Save, ArrowLeft, ChevronRight, ExternalLink, ImagePlus, RotateCcw, CheckCircle2 } from 'lucide-react';
import { adminApi } from '../../lib/adminApi';
import { PAGES, type PageDef, type PageField } from '../../lib/pageSchema';
import { MediaPicker } from './MediaPicker';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1';

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
  const [values, setValues] = useState<Record<string, string> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [picker, setPicker] = useState<string | null>(null);

  useEffect(() => {
    adminApi.getPageContent(page.key).then((r) => setValues(r.fields || {})).catch((e) => setError(e.message));
  }, [page.key]);

  const set = (k: string, v: string) => setValues((p) => ({ ...(p || {}), [k]: v }));

  const save = async () => {
    if (!values) return;
    setSaving(true);
    setError(null);
    try {
      await adminApi.savePageContent(page.key, values);
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
        <h2 className="font-bold uppercase tracking-tight text-brand-dark">{page.label}</h2>
        <div className="flex items-center gap-2">
          <a href={page.path} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Voir la page"><ExternalLink size={16} /></a>
          <button onClick={save} disabled={saving || !values} className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Enregistrer
          </button>
        </div>
      </div>
      {ok && <p className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-bold"><CheckCircle2 size={16} /> Enregistré</p>}
      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
      <p className="text-xs text-gray-400">Laisse un champ vide pour garder le texte par défaut du site.</p>

      {!values && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {values && page.sections.map((sec) => (
        <div key={sec.title} className="bg-white rounded-2xl border border-gray-200 p-5">
          <p className="font-bold text-sm text-brand-dark mb-4">{sec.title}</p>
          <div className="space-y-4">
            {sec.fields.map((f) => (
              <Field key={f.key} field={f} value={values[f.key] || ''} onChange={(v) => set(f.key, v)} onPick={() => setPicker(f.key)} />
            ))}
          </div>
        </div>
      ))}

      <MediaPicker open={picker !== null} onClose={() => setPicker(null)} onSelect={(urls) => picker && urls[0] && set(picker, urls[0])} />
    </div>
  );
}

export function PagesManager() {
  const [page, setPage] = useState<PageDef | null>(null);
  if (page) return <PageEditor page={page} onBack={() => setPage(null)} />;
  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-1">Pages</h1>
      <p className="text-gray-500 text-sm mb-6">Modifie les textes, images et boutons des pages éditoriales du site (le reste — occasions, blog, marques… — se gère dans leurs sections dédiées).</p>
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
