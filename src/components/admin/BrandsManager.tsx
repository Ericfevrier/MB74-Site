import React, { useEffect, useState } from 'react';
import { Loader2, Save, ArrowLeft, Pencil, CheckCircle2 } from 'lucide-react';
import { adminApi, type BrandEditorial } from '../../lib/adminApi';
import { STATIC_BRANDS_DATA } from '../../data/brands';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5';

const BRAND_IDS = Object.keys(STATIC_BRANDS_DATA);

function emptyEditorial(brandId: string): BrandEditorial {
  return { brand_id: brandId, name: '', full_name: '', role: '', logo: '', hero_image: '', tagline: '', description: '', hero_wordmark: false };
}

function BrandForm({ brandId, initial, onCancel, onSaved }: { brandId: string; initial: BrandEditorial; onCancel: () => void; onSaved: () => void }) {
  const [d, setD] = useState<BrandEditorial>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof BrandEditorial, v: any) => setD((p) => ({ ...p, [k]: v }));
  const def = STATIC_BRANDS_DATA[brandId];

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      await adminApi.saveBrand(brandId, d);
      onSaved();
    } catch (err: any) {
      setError(err.message || "Échec de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center justify-between gap-4 mb-6">
        <button type="button" onClick={onCancel} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-brand-dark transition">
          <ArrowLeft size={16} /> Retour
        </button>
        <h2 className="font-bold uppercase tracking-tight text-brand-dark">Marque : {def?.name || brandId}</h2>
      </div>
      <p className="text-xs text-gray-400 mb-5">Champ vide = valeur par défaut (indiquée en gris). Les modèles restent gérés séparément.</p>

      <div className="grid sm:grid-cols-2 gap-5">
        <div><label className={LABEL}>Nom</label><input className={INPUT} value={d.name} placeholder={def?.name} onChange={(e) => set('name', e.target.value)} /></div>
        <div><label className={LABEL}>Nom complet</label><input className={INPUT} value={d.full_name} placeholder={def?.fullName} onChange={(e) => set('full_name', e.target.value)} /></div>
        <div><label className={LABEL}>Statut (rôle)</label><input className={INPUT} value={d.role} placeholder={def?.role || 'Concessionnaire officiel'} onChange={(e) => set('role', e.target.value)} /></div>
        <div><label className={LABEL}>Slogan</label><input className={INPUT} value={d.tagline} placeholder={def?.tagline} onChange={(e) => set('tagline', e.target.value)} /></div>
        <div><label className={LABEL}>Logo (URL)</label><input className={INPUT} value={d.logo} placeholder={def?.logo} onChange={(e) => set('logo', e.target.value)} /></div>
        <div><label className={LABEL}>Image hero (URL)</label><input className={INPUT} value={d.hero_image} placeholder={def?.heroImage} onChange={(e) => set('hero_image', e.target.value)} /></div>
      </div>
      <div className="mt-5">
        <label className={LABEL}>Description</label>
        <textarea className={`${INPUT} h-40 resize-y`} value={d.description} placeholder={def?.description} onChange={(e) => set('description', e.target.value)} />
      </div>
      <label className="flex items-center gap-2 text-sm font-medium text-brand-dark mt-5">
        <input type="checkbox" className="w-4 h-4 accent-brand-cyan" checked={!!d.hero_wordmark} onChange={(e) => set('hero_wordmark', e.target.checked)} />
        Afficher le nom en grand à côté du logo (hero « wordmark »)
      </label>

      {error && <p className="text-red-600 text-sm font-medium mt-5">{error}</p>}
      <div className="flex justify-end gap-3 mt-7">
        <button type="button" onClick={onCancel} className="px-5 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition">Annuler</button>
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Enregistrer
        </button>
      </div>
    </form>
  );
}

export function BrandsManager() {
  const [rows, setRows] = useState<BrandEditorial[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<string | null>(null);
  const [savedMsg, setSavedMsg] = useState(false);

  const load = () => {
    setError(null);
    adminApi.listBrands().then((r) => setRows(r.brands)).catch((e) => setError(e.message));
  };
  useEffect(load, []);

  if (editing) {
    const existing = rows?.find((r) => r.brand_id === editing);
    return (
      <BrandForm
        brandId={editing}
        initial={existing || emptyEditorial(editing)}
        onCancel={() => setEditing(null)}
        onSaved={() => { setEditing(null); setSavedMsg(true); load(); }}
      />
    );
  }

  return (
    <div>
      <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-1">Marques</h1>
      <p className="text-gray-500 mb-6 text-sm">Textes et visuels éditoriaux des pages marque. Les fiches modèles se gèrent séparément.</p>

      {savedMsg && <p className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-bold mb-4"><CheckCircle2 size={16} /> Enregistré</p>}
      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
      {!rows && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {rows && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {BRAND_IDS.map((id) => {
            const def = STATIC_BRANDS_DATA[id];
            const row = rows.find((r) => r.brand_id === id);
            return (
              <div key={id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
                <div className="w-16 h-12 rounded-lg bg-brand-dark flex items-center justify-center overflow-hidden flex-shrink-0 p-2">
                  <img src={row?.logo || def?.logo} alt="" className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-brand-dark truncate">{row?.name || def?.name}</p>
                  <p className="text-xs text-gray-500 truncate">{row?.tagline || def?.tagline}</p>
                </div>
                {row && <span className="text-[10px] font-bold uppercase bg-sky-100 text-sky-700 px-2 py-1 rounded">Personnalisé</span>}
                <button onClick={() => { setSavedMsg(false); setEditing(id); }} className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Modifier"><Pencil size={16} /></button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
