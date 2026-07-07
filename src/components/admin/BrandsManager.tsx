import React, { useEffect, useState } from 'react';
import {
  Loader2, Save, ArrowLeft, Pencil, Trash2, Plus, CheckCircle2, ChevronDown, X,
  Download, ImagePlus, Image as ImageIcon, Ship,
} from 'lucide-react';
import { adminApi, type AdminBrand } from '../../lib/adminApi';
import { STATIC_BRANDS_DATA } from '../../data/brands';
import type { BrandData, BoatModel, ComparisonCategory } from '../../data/brands';
import { MediaPicker } from './MediaPicker';
import { ModelsManager } from './ModelsManager';
import { SeoFields } from './SeoFields';
import type { Seo } from '../../lib/seo';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1';
const BTN_ADD = 'inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-dark transition mt-2';
const BTN_DEL = 'p-1.5 text-gray-400 hover:text-red-500 transition flex-shrink-0';

/* Marques du site à proposer à l'import (seulement celles réellement en ligne). */
const SITE_BRAND_IDS = ['nautique', 'mastercraft'];

/* -------------------------- Section repliable -------------------------- */
function Section({ title, count, defaultOpen = false, children }: { title: string; count?: number; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition">
        <span className="font-bold text-sm text-brand-dark flex items-center gap-2">
          {title}
          {count != null && <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-gray-100 text-gray-500">{count}</span>}
        </span>
        <ChevronDown size={18} className={`text-gray-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && <div className="px-5 pb-5 pt-1 border-t border-gray-100">{children}</div>}
    </div>
  );
}

type PickerCfg = { multiple: boolean; onPick: (urls: string[]) => void } | null;

/* --------------- Champ image unique (aperçu + bouton Médias) ----------- */
function ImageField({ label, value, onChange, onPick }: { label: string; value?: string; onChange: (v: string) => void; onPick: () => void }) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      <div className="flex items-start gap-3">
        <div className="w-20 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0 flex items-center justify-center">
          {value ? <img src={value} alt="" className="w-full h-full object-contain" referrerPolicy="no-referrer" loading="lazy" /> : <ImageIcon size={18} className="text-gray-300" />}
        </div>
        <div className="flex-1 flex gap-2">
          <input className={INPUT} value={value || ''} onChange={(e) => onChange(e.target.value)} placeholder="URL, ou « Médias » →" />
          <button type="button" onClick={onPick} className="flex-shrink-0 inline-flex items-center gap-1.5 bg-brand-dark text-white px-3 rounded-lg text-sm font-bold hover:bg-brand-cyan hover:text-brand-dark transition"><ImagePlus size={15} /></button>
        </div>
      </div>
    </div>
  );
}

/* --------------------------- L'éditeur marque -------------------------- */
function BrandEditor({ brand, onBack, onSaved }: { brand: AdminBrand; onBack: () => void; onSaved: () => void }) {
  const [d, setD] = useState<AdminBrand>(brand);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [picker, setPicker] = useState<PickerCfg>(null);

  const set = (k: keyof BrandData, v: any) => setD((p) => ({ ...p, [k]: v }));
  const openPicker = (multiple: boolean, onPick: (urls: string[]) => void) => setPicker({ multiple, onPick });

  const models = d.models || [];
  const setModels = (m: BoatModel[]) => set('models', m);
  const intro = d.introImages || [];
  const comparisons = d.comparisons || [];
  const setComparisons = (c: ComparisonCategory[]) => set('comparisons', c);

  const save = async () => {
    setError(null);
    setSaving(true);
    try {
      await adminApi.saveBrand(d.brand_id, d);
      setOk(true);
      onSaved();
      setTimeout(() => setOk(false), 2000);
    } catch (e: any) {
      setError(e.message || 'Échec.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-4">
      <div className="flex items-center justify-between gap-4 sticky top-0 z-10 bg-brand-light/95 backdrop-blur py-3 -mt-3">
        <button type="button" onClick={onBack} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-brand-dark transition"><ArrowLeft size={16} /> Marques</button>
        <h2 className="font-bold uppercase tracking-tight text-brand-dark truncate">{d.name || d.brand_id}</h2>
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Enregistrer
        </button>
      </div>
      {ok && <p className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-bold"><CheckCircle2 size={16} /> Enregistré</p>}
      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

      {/* Identité */}
      <Section title="Identité" defaultOpen>
        <div className="grid sm:grid-cols-2 gap-4">
          <div><label className={LABEL}>Nom</label><input className={INPUT} value={d.name || ''} onChange={(e) => set('name', e.target.value)} /></div>
          <div><label className={LABEL}>Nom complet</label><input className={INPUT} value={d.fullName || ''} onChange={(e) => set('fullName', e.target.value)} /></div>
          <div><label className={LABEL}>Statut / rôle</label><input className={INPUT} value={d.role || ''} placeholder="Concessionnaire officiel" onChange={(e) => set('role', e.target.value)} /></div>
          <ImageField label="Logo" value={d.logo} onChange={(v) => set('logo', v)} onPick={() => openPicker(false, (u) => set('logo', u[0]))} />
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-brand-dark mt-4">
          <input type="checkbox" className="w-4 h-4 accent-brand-cyan" checked={!!d.heroWordmark} onChange={(e) => set('heroWordmark', e.target.checked)} />
          Afficher le nom en grand à côté du logo dans le hero (logo sans texte)
        </label>
      </Section>

      {/* Hero */}
      <Section title="Hero (haut de page)">
        <div className="space-y-4">
          <ImageField label="Image hero" value={d.heroImage} onChange={(v) => set('heroImage', v)} onPick={() => openPicker(false, (u) => set('heroImage', u[0]))} />
          <div><label className={LABEL}>Accroche (tagline)</label><input className={INPUT} value={d.tagline || ''} onChange={(e) => set('tagline', e.target.value)} /></div>
        </div>
      </Section>

      {/* Présentation */}
      <Section title="Présentation">
        <label className={LABEL}>Description (paragraphes séparés par une ligne vide)</label>
        <textarea className={`${INPUT} h-52 resize-y`} value={d.description || ''} onChange={(e) => set('description', e.target.value)} />
        <div className="mt-5">
          <div className="flex items-center justify-between mb-1.5">
            <label className={LABEL}>Images « la marque » <span className="text-gray-400">({intro.length})</span> — diaporama d'angles</label>
            <button type="button" onClick={() => openPicker(true, (urls) => set('introImages', [...intro, ...urls.filter((u) => !intro.includes(u))]))} className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-dark transition"><ImagePlus size={14} /> Ajouter</button>
          </div>
          {intro.length > 0 ? (
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
              {intro.map((url, i) => (
                <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                  <img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" />
                  <button type="button" onClick={() => set('introImages', intro.filter((_, k) => k !== i))} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition"><X size={13} /></button>
                </div>
              ))}
            </div>
          ) : <p className="text-xs text-gray-400">Aucune image — le hero sera utilisé par défaut.</p>}
        </div>
      </Section>

      {/* Gamme (cartes modèles vitrine) */}
      <Section title="La Gamme (cartes vitrine)" count={models.length}>
        <p className="text-xs text-gray-400 mb-3">Cartes affichées sur la page marque. Les fiches techniques détaillées se gèrent plus bas dans « Modèles ».</p>
        <div className="space-y-3">
          {models.map((m, i) => (
            <div key={i} className="flex items-start gap-3 border border-gray-200 rounded-xl p-3">
              <button type="button" onClick={() => openPicker(false, (u) => setModels(models.map((x, k) => (k === i ? { ...x, image: u[0] } : x))))} className="w-20 h-14 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0 flex items-center justify-center" title="Changer l'image">
                {m.image ? <img src={m.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" loading="lazy" /> : <ImagePlus size={16} className="text-gray-300" />}
              </button>
              <div className="flex-1 space-y-2">
                <input className={INPUT} value={m.name} placeholder="Nom du modèle" onChange={(e) => setModels(models.map((x, k) => (k === i ? { ...x, name: e.target.value } : x)))} />
                <textarea className={`${INPUT} h-16 resize-y`} value={m.description} placeholder="Description courte" onChange={(e) => setModels(models.map((x, k) => (k === i ? { ...x, description: e.target.value } : x)))} />
              </div>
              <button type="button" onClick={() => setModels(models.filter((_, k) => k !== i))} className={BTN_DEL}><Trash2 size={16} /></button>
            </div>
          ))}
          <button type="button" onClick={() => setModels([...models, { name: '', image: '', description: '' }])} className={BTN_ADD}><Plus size={14} /> Ajouter une carte</button>
        </div>
      </Section>

      {/* Comparatifs */}
      <Section title="Comparatifs" count={comparisons.length}>
        <div className="space-y-5">
          {comparisons.map((cat, ci) => {
            const upd = (patch: Partial<ComparisonCategory>) => setComparisons(comparisons.map((x, k) => (k === ci ? { ...x, ...patch } : x)));
            const cols = cat.models || [];
            const addCol = () => upd({ models: [...cols, ''], specs: (cat.specs || []).map((s) => ({ ...s, values: [...s.values, ''] })) });
            const delCol = (idx: number) => upd({ models: cols.filter((_, k) => k !== idx), specs: (cat.specs || []).map((s) => ({ ...s, values: s.values.filter((_, k) => k !== idx) })) });
            return (
              <div key={ci} className="border border-gray-200 rounded-2xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <input className={`${INPUT} font-bold`} value={cat.title} placeholder="Titre du comparatif" onChange={(e) => upd({ title: e.target.value })} />
                  <button type="button" onClick={() => setComparisons(comparisons.filter((_, k) => k !== ci))} className={BTN_DEL}><Trash2 size={16} /></button>
                </div>
                <textarea className={`${INPUT} h-16 resize-y mb-3`} value={cat.summary || ''} placeholder="Résumé (lecture rapide)" onChange={(e) => upd({ summary: e.target.value })} />

                <label className={LABEL}>Colonnes (modèles comparés)</label>
                <div className="flex flex-wrap gap-2 mb-3">
                  {cols.map((c, idx) => (
                    <div key={idx} className="flex items-center gap-1 bg-gray-50 border border-gray-200 rounded-lg pl-2">
                      <input className="bg-transparent text-sm py-1.5 w-28 focus:outline-none" value={c} placeholder="Modèle" onChange={(e) => upd({ models: cols.map((x, k) => (k === idx ? e.target.value : x)) })} />
                      <button type="button" onClick={() => delCol(idx)} className="p-1 text-gray-400 hover:text-red-500"><X size={13} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={addCol} className="inline-flex items-center gap-1 text-xs font-bold text-brand-cyan hover:text-brand-dark px-2"><Plus size={13} /> Colonne</button>
                </div>

                <label className={LABEL}>Lignes de specs</label>
                <div className="space-y-2">
                  {(cat.specs || []).map((sp, si) => (
                    <div key={si} className="flex items-center gap-2">
                      <input className={`${INPUT} max-w-[220px]`} value={sp.label} placeholder="Libellé (ex. Longueur)" onChange={(e) => upd({ specs: cat.specs.map((x, k) => (k === si ? { ...x, label: e.target.value } : x)) })} />
                      {cols.map((_, vi) => (
                        <input key={vi} className={INPUT} value={sp.values[vi] || ''} placeholder="—" onChange={(e) => upd({ specs: cat.specs.map((x, k) => (k === si ? { ...x, values: cols.map((__, j) => (j === vi ? e.target.value : x.values[j] || '')) } : x)) })} />
                      ))}
                      <button type="button" onClick={() => upd({ specs: cat.specs.filter((_, k) => k !== si) })} className={BTN_DEL}><Trash2 size={16} /></button>
                    </div>
                  ))}
                  <button type="button" onClick={() => upd({ specs: [...(cat.specs || []), { label: '', values: cols.map(() => '') }] })} className={BTN_ADD}><Plus size={14} /> Ligne</button>
                </div>
              </div>
            );
          })}
          <button type="button" onClick={() => setComparisons([...comparisons, { title: '', summary: '', models: [], specs: [] }])} className={BTN_ADD}><Plus size={14} /> Ajouter un comparatif</button>
        </div>
      </Section>

      {/* SEO */}
      <SeoFields
        seo={(d.seo as Seo) || {}}
        onChange={(v) => set('seo', v)}
        path="/marque"
        slug={d.brand_id}
        fallbackTitle={d.fullName ? `${d.fullName} | ${d.role || 'Concessionnaire officiel'} | Motor Boat 74` : undefined}
        fallbackDescription={d.description}
        fallbackImage={d.heroImage}
      />

      <div className="flex justify-end pt-1">
        <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Enregistrer la page marque
        </button>
      </div>

      {/* Modèles imbriqués (fiches techniques détaillées de cette marque) */}
      <div className="border-t-2 border-dashed border-gray-200 pt-6 mt-8">
        <h3 className="text-lg font-bold uppercase tracking-tight text-brand-dark mb-1 flex items-center gap-2"><Ship size={18} /> Modèles {d.name}</h3>
        <p className="text-gray-500 text-sm mb-5">Fiches techniques détaillées de cette marque (galerie, specs, motorisations, options, FAQ…).</p>
        <ModelsManager brand={d.brand_id} />
      </div>

      <MediaPicker
        open={picker !== null}
        multiple={picker?.multiple}
        onClose={() => setPicker(null)}
        onSelect={(urls) => picker?.onPick(urls)}
      />
    </div>
  );
}

/* ------------------------------ Le hub marques ------------------------- */
function AddBrandForm({ onCancel, onCreated }: { onCancel: () => void; onCreated: () => void }) {
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const slug = (id || name).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

  const create = async () => {
    if (!slug) return setError('Renseigne au moins le nom.');
    setSaving(true);
    setError(null);
    try {
      await adminApi.createBrand({ brand_id: slug, name: name || slug, fullName: name || slug, models: [] } as any);
      onCreated();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200 p-5 max-w-lg mb-6">
      <h3 className="font-bold text-brand-dark mb-3">Nouvelle marque</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <div><label className={LABEL}>Nom</label><input className={INPUT} value={name} onChange={(e) => setName(e.target.value)} autoFocus placeholder="Tigé" /></div>
        <div><label className={LABEL}>Identifiant (URL)</label><input className={INPUT} value={id} onChange={(e) => setId(e.target.value)} placeholder={slug || 'tige'} /></div>
      </div>
      <p className="text-xs text-gray-400 mt-2">Adresse : /marque/<strong>{slug || '…'}</strong></p>
      {error && <p className="text-red-600 text-sm font-medium mt-3">{error}</p>}
      <div className="flex justify-end gap-2 mt-4">
        <button onClick={onCancel} className="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition">Annuler</button>
        <button onClick={create} disabled={saving} className="inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Créer
        </button>
      </div>
    </div>
  );
}

export function BrandsManager() {
  const [rows, setRows] = useState<AdminBrand[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminBrand | null>(null);
  const [adding, setAdding] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);

  const load = () => {
    setError(null);
    adminApi.listBrands().then((r) => setRows(r.brands)).catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const importDefaults = async () => {
    if (!confirm('Importer les marques du site (Nautique, MasterCraft) dans la base ? Les marques déjà présentes ne sont pas écrasées.')) return;
    setImporting(true);
    setError(null);
    try {
      const existing = new Set((rows || []).map((b) => b.brand_id));
      let n = 0;
      for (const id of SITE_BRAND_IDS) {
        if (existing.has(id)) continue;
        const data = STATIC_BRANDS_DATA[id];
        if (!data) continue;
        await adminApi.createBrand({ ...(data as BrandData), brand_id: id });
        n++;
      }
      setMsg(`${n} marque(s) importée(s).`);
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setImporting(false);
    }
  };

  const remove = async (b: AdminBrand) => {
    if (!confirm(`Supprimer la marque « ${b.name || b.brand_id} » ? (ses réglages en base seront perdus ; la page /marque/${b.brand_id} disparaît si elle n'existe pas en statique)`)) return;
    try {
      await adminApi.deleteBrand(b.brand_id);
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (editing) {
    return <BrandEditor brand={editing} onBack={() => { setEditing(null); load(); }} onSaved={() => setMsg('Page marque enregistrée.')} />;
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-1">Marques</h1>
          <p className="text-gray-500 text-sm">Gère les marques du site et, dans chacune, ses modèles. Clique une marque pour tout éditer.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={importDefaults} disabled={importing} className="inline-flex items-center gap-2 bg-white border border-gray-300 text-brand-dark px-4 py-2.5 rounded-xl text-sm font-bold hover:border-brand-cyan disabled:opacity-50 transition">
            {importing ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} Importer les marques du site
          </button>
          <button onClick={() => { setMsg(null); setAdding(true); }} className="inline-flex items-center gap-2 bg-brand-dark text-white px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark transition"><Plus size={16} /> Nouvelle</button>
        </div>
      </div>

      {adding && <AddBrandForm onCancel={() => setAdding(false)} onCreated={() => { setAdding(false); setMsg('Marque créée.'); load(); }} />}
      {msg && <p className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-bold mb-4"><CheckCircle2 size={16} /> {msg}</p>}
      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
      {!rows && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {rows && rows.length === 0 && !adding && (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center">
          <p className="text-gray-500 mb-4">Aucune marque en base. Importe celles du site pour démarrer.</p>
          <button onClick={importDefaults} disabled={importing} className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark px-5 py-2.5 rounded-xl text-sm font-bold hover:brightness-110 disabled:opacity-50 transition">
            {importing ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} Importer les marques du site
          </button>
        </div>
      )}

      {rows && rows.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {rows.map((b) => (
            <div key={b.brand_id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
              <div className="w-16 h-12 rounded-lg bg-brand-dark flex items-center justify-center overflow-hidden flex-shrink-0 p-2">
                {b.logo ? <img src={b.logo} alt="" className="max-h-full max-w-full object-contain" referrerPolicy="no-referrer" loading="lazy" /> : <ImageIcon size={18} className="text-white/30" />}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brand-dark truncate">{b.name || b.brand_id}</p>
                <p className="text-xs text-gray-500 truncate">{(b.models || []).length} modèle(s) vitrine · /marque/{b.brand_id}</p>
              </div>
              <button onClick={() => { setMsg(null); setEditing(b); }} className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-dark hover:text-brand-cyan transition px-2" title="Gérer"><Pencil size={15} /> Gérer</button>
              <button onClick={() => remove(b)} className="p-2 text-gray-400 hover:text-red-500 transition" title="Supprimer"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
