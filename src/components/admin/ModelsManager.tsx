import React, { useEffect, useMemo, useState } from 'react';
import {
  Loader2, Save, ArrowLeft, Pencil, Trash2, Plus, CheckCircle2, ChevronDown,
  GripVertical, Download, X, Copy,
} from 'lucide-react';
import { adminApi, type AdminModel } from '../../lib/adminApi';
import { BRAND_MODELS } from '../../data/boatBrands';
import { SeoFields } from './SeoFields';
import type { Seo } from '../../lib/seo';
import { SearchInput, StatusFilter, matchQuery } from './AdminToolbar';
import type {
  NautiqueModel, SpecGroup, Highlight, Motorization, Edition, OptionGroup, Milestone, ModelFAQ,
} from '../../data/nautiqueModels';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1';
const BTN_ADD =
  'inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-dark transition mt-2';
const BTN_DEL = 'p-1.5 text-gray-400 hover:text-red-500 transition flex-shrink-0';

const BRAND_OPTIONS = Object.values(BRAND_MODELS).map((b) => ({ id: b.id, name: b.name }));

/** Fiches statiques aplaties (pour l'import par défaut), éventuellement filtrées sur une marque. */
function staticModelsFlat(brandFilter?: string): Partial<AdminModel>[] {
  const out: Partial<AdminModel>[] = [];
  for (const b of Object.values(BRAND_MODELS)) {
    if (brandFilter && b.id !== brandFilter) continue;
    const order = b.order.length ? b.order : Object.keys(b.models);
    order.forEach((slug, i) => {
      const m = b.models[slug];
      if (m) out.push({ ...(m as NautiqueModel), brand: b.id, status: 'published', sortOrder: i });
    });
  }
  return out;
}

function emptyModel(brand: string): Partial<AdminModel> {
  return {
    brand,
    slug: '',
    name: '',
    short: '',
    gamme: '',
    year: String(new Date().getFullYear()),
    metaTitle: '',
    metaDescription: '',
    intro: [],
    hero: '',
    gallery: [],
    specs: [],
    highlights: [],
    faqs: [],
    status: 'published',
    sortOrder: 0,
  };
}

/* ------------------------------ Section repliable ----------------------------- */
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

/* --------------------------- Éditeur de liste de chaînes ---------------------- */
function StringList({ items, onChange, placeholder, textarea }: { items: string[]; onChange: (v: string[]) => void; placeholder?: string; textarea?: boolean }) {
  const upd = (i: number, v: string) => onChange(items.map((x, k) => (k === i ? v : x)));
  const del = (i: number) => onChange(items.filter((_, k) => k !== i));
  return (
    <div className="space-y-2">
      {items.map((it, i) => (
        <div key={i} className="flex items-start gap-2">
          <span className="text-gray-300 mt-2.5"><GripVertical size={14} /></span>
          {textarea ? (
            <textarea className={`${INPUT} h-20 resize-y`} value={it} placeholder={placeholder} onChange={(e) => upd(i, e.target.value)} />
          ) : (
            <input className={INPUT} value={it} placeholder={placeholder} onChange={(e) => upd(i, e.target.value)} />
          )}
          <button type="button" onClick={() => del(i)} className={BTN_DEL}><Trash2 size={16} /></button>
        </div>
      ))}
      <button type="button" onClick={() => onChange([...items, ''])} className={BTN_ADD}><Plus size={14} /> Ajouter</button>
    </div>
  );
}

/* ------------------------------- Le formulaire -------------------------------- */
function ModelForm({ initial, isNew, onCancel, onSaved }: { initial: Partial<AdminModel>; isNew: boolean; onCancel: () => void; onSaved: () => void }) {
  const [d, setD] = useState<Partial<AdminModel>>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const set = (k: keyof AdminModel, v: any) => setD((p) => ({ ...p, [k]: v }));
  const arr = <T,>(k: keyof AdminModel): T[] => ((d[k] as unknown as T[]) || []);
  const setArr = <T,>(k: keyof AdminModel, v: T[]) => set(k, v as any);
  const updIn = <T,>(k: keyof AdminModel, i: number, v: T) => setArr<T>(k, arr<T>(k).map((x, j) => (j === i ? v : x)));
  const addIn = <T,>(k: keyof AdminModel, empty: T) => setArr<T>(k, [...arr<T>(k), empty]);
  const delIn = <T,>(k: keyof AdminModel, i: number) => setArr<T>(k, arr<T>(k).filter((_, j) => j !== i));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!d.slug || !d.slug.trim()) return setError('Le slug est requis.');
    if (!d.brand) return setError('La marque est requise.');
    setSaving(true);
    try {
      if (isNew) await adminApi.createModel(d);
      else await adminApi.updateModel(d.id as number, d);
      onSaved();
    } catch (err: any) {
      setError(err.message || "Échec de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  const highlights = arr<Highlight>('highlights');
  const highlightImages = (d.highlightImages as string[]) || [];
  const setHlImg = (i: number, v: string) => {
    const next = [...highlightImages];
    while (next.length <= i) next.push('');
    next[i] = v;
    set('highlightImages', next);
  };

  return (
    <form onSubmit={save} className="max-w-4xl space-y-4">
      <div className="flex items-center justify-between gap-4 sticky top-0 lg:top-0 z-10 bg-brand-light/95 backdrop-blur py-3 -mt-3">
        <button type="button" onClick={onCancel} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-brand-dark transition">
          <ArrowLeft size={16} /> Retour
        </button>
        <h2 className="font-bold uppercase tracking-tight text-brand-dark truncate">{d.name || d.slug || 'Nouveau modèle'}</h2>
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Enregistrer
        </button>
      </div>
      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

      {/* Général */}
      <Section title="Général" defaultOpen>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>Marque</label>
            <select className={INPUT} value={d.brand} onChange={(e) => set('brand', e.target.value)} disabled={!isNew}>
              {BRAND_OPTIONS.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div>
            <label className={LABEL}>Slug (URL)</label>
            <input className={INPUT} value={d.slug || ''} placeholder="super-air-nautique-s23" onChange={(e) => set('slug', e.target.value)} disabled={!isNew} />
          </div>
          <div><label className={LABEL}>Nom</label><input className={INPUT} value={d.name || ''} onChange={(e) => set('name', e.target.value)} /></div>
          <div><label className={LABEL}>Nom complet (H1)</label><input className={INPUT} value={d.fullName || ''} placeholder="(défaut : le nom)" onChange={(e) => set('fullName', e.target.value)} /></div>
          <div><label className={LABEL}>Nom court</label><input className={INPUT} value={d.short || ''} placeholder="S23" onChange={(e) => set('short', e.target.value)} /></div>
          <div><label className={LABEL}>Gamme</label><input className={INPUT} value={d.gamme || ''} placeholder="Série S" onChange={(e) => set('gamme', e.target.value)} /></div>
          <div><label className={LABEL}>Année</label><input className={INPUT} value={d.year || ''} onChange={(e) => set('year', e.target.value)} /></div>
          <div><label className={LABEL}>Vidéo YouTube (ID)</label><input className={INPUT} value={d.videoId || ''} placeholder="0bvzRjcWs8A" onChange={(e) => set('videoId', e.target.value)} /></div>
          <div>
            <label className={LABEL}>Statut</label>
            <select className={INPUT} value={d.status} onChange={(e) => set('status', e.target.value)}>
              <option value="published">Publié</option>
              <option value="draft">Brouillon</option>
            </select>
          </div>
          <div><label className={LABEL}>Ordre d'affichage</label><input type="number" className={INPUT} value={d.sortOrder ?? 0} onChange={(e) => set('sortOrder', Number(e.target.value))} /></div>
        </div>
        <div className="mt-4">
          <label className={LABEL}>Accroche (tagline hero)</label>
          <textarea className={`${INPUT} h-20 resize-y`} value={d.tagline || ''} onChange={(e) => set('tagline', e.target.value)} />
        </div>
      </Section>

      {/* SEO */}
      <SeoFields
        seo={{ ...((d.seo as Seo) || {}), title: (d.seo as Seo)?.title ?? d.metaTitle, description: (d.seo as Seo)?.description ?? d.metaDescription }}
        onChange={(v) => setD((p) => ({ ...p, seo: v, metaTitle: v.title || '', metaDescription: v.description || '' }))}
        path={`/${d.brand || 'nautique'}`}
        slug={d.slug}
        fallbackTitle={d.name ? `${d.name} ${d.year || ''} | Motor Boat 74` : undefined}
        fallbackDescription={d.tagline}
        fallbackImage={d.hero}
      />

      {/* Médias */}
      <Section title="Médias (photos)" count={(d.gallery || []).length}>
        <div className="mb-4"><label className={LABEL}>Image hero (principale)</label><input className={INPUT} value={d.hero || ''} placeholder="/images/nautique/…-1.jpg" onChange={(e) => set('hero', e.target.value)} /></div>
        <label className={LABEL}>Galerie (URLs)</label>
        <StringList items={(d.gallery as string[]) || []} onChange={(v) => set('gallery', v)} placeholder="/images/nautique/…-2.jpg" />
      </Section>

      {/* Introduction */}
      <Section title="Introduction (paragraphes)" count={(d.intro || []).length}>
        <StringList items={(d.intro as string[]) || []} onChange={(v) => set('intro', v)} placeholder="Paragraphe d'introduction…" textarea />
      </Section>

      {/* Points forts */}
      <Section title="Points forts" count={highlights.length}>
        <div className="space-y-4">
          {highlights.map((h, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input className={INPUT} value={h.title} placeholder="Titre (ex. PERFORMANCES)" onChange={(e) => updIn<Highlight>('highlights', i, { ...h, title: e.target.value })} />
                <button type="button" onClick={() => delIn<Highlight>('highlights', i)} className={BTN_DEL}><Trash2 size={16} /></button>
              </div>
              <textarea className={`${INPUT} h-24 resize-y`} value={h.text} placeholder="Description" onChange={(e) => updIn<Highlight>('highlights', i, { ...h, text: e.target.value })} />
              <input className={INPUT} value={highlightImages[i] || ''} placeholder="Image (URL, optionnel — sinon galerie)" onChange={(e) => setHlImg(i, e.target.value)} />
            </div>
          ))}
          <button type="button" onClick={() => addIn<Highlight>('highlights', { title: '', text: '' })} className={BTN_ADD}><Plus size={14} /> Ajouter un point fort</button>
        </div>
      </Section>

      {/* Spécifications */}
      <Section title="Spécifications techniques" count={arr<SpecGroup>('specs').length}>
        <div className="space-y-4">
          {arr<SpecGroup>('specs').map((g, gi) => (
            <div key={gi} className="border border-gray-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-3">
                <input className={`${INPUT} font-bold`} value={g.group} placeholder="Groupe (ex. Dimensions)" onChange={(e) => updIn<SpecGroup>('specs', gi, { ...g, group: e.target.value })} />
                <button type="button" onClick={() => delIn<SpecGroup>('specs', gi)} className={BTN_DEL}><Trash2 size={16} /></button>
              </div>
              <div className="space-y-2 pl-2">
                {g.items.map((it, ii) => (
                  <div key={ii} className="flex items-center gap-2">
                    <input className={INPUT} value={it.label} placeholder="Libellé" onChange={(e) => {
                      const items = g.items.map((x, k) => (k === ii ? { ...x, label: e.target.value } : x));
                      updIn<SpecGroup>('specs', gi, { ...g, items });
                    }} />
                    <input className={INPUT} value={it.value} placeholder="Valeur" onChange={(e) => {
                      const items = g.items.map((x, k) => (k === ii ? { ...x, value: e.target.value } : x));
                      updIn<SpecGroup>('specs', gi, { ...g, items });
                    }} />
                    <button type="button" onClick={() => updIn<SpecGroup>('specs', gi, { ...g, items: g.items.filter((_, k) => k !== ii) })} className={BTN_DEL}><Trash2 size={16} /></button>
                  </div>
                ))}
                <button type="button" onClick={() => updIn<SpecGroup>('specs', gi, { ...g, items: [...g.items, { label: '', value: '' }] })} className={BTN_ADD}><Plus size={14} /> Ligne</button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addIn<SpecGroup>('specs', { group: '', items: [] })} className={BTN_ADD}><Plus size={14} /> Ajouter un groupe</button>
        </div>
      </Section>

      {/* Motorisations */}
      <Section title="Motorisations" count={(d.motorizations || []).length}>
        <div className="space-y-3">
          {arr<Motorization>('motorizations').map((m, i) => (
            <div key={i} className="grid grid-cols-2 sm:grid-cols-5 gap-2 items-center border border-gray-200 rounded-xl p-3">
              <input className={INPUT} value={m.name} placeholder="Nom" onChange={(e) => updIn<Motorization>('motorizations', i, { ...m, name: e.target.value })} />
              <input className={INPUT} value={m.fuel} placeholder="Carburant" onChange={(e) => updIn<Motorization>('motorizations', i, { ...m, fuel: e.target.value })} />
              <input className={INPUT} value={m.power} placeholder="Puissance" onChange={(e) => updIn<Motorization>('motorizations', i, { ...m, power: e.target.value })} />
              <input className={INPUT} value={m.torque} placeholder="Couple" onChange={(e) => updIn<Motorization>('motorizations', i, { ...m, torque: e.target.value })} />
              <div className="flex items-center gap-2">
                <input className={INPUT} value={m.ratio} placeholder="Rapport" onChange={(e) => updIn<Motorization>('motorizations', i, { ...m, ratio: e.target.value })} />
                <button type="button" onClick={() => delIn<Motorization>('motorizations', i)} className={BTN_DEL}><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addIn<Motorization>('motorizations', { name: '', fuel: '', power: '', torque: '', ratio: '' })} className={BTN_ADD}><Plus size={14} /> Ajouter une motorisation</button>
        </div>
      </Section>

      {/* Éditions */}
      <Section title="Éditions spéciales" count={(d.editions || []).length}>
        <div className="space-y-3">
          {arr<Edition>('editions').map((ed, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input className={INPUT} value={ed.name} placeholder="Nom de l'édition" onChange={(e) => updIn<Edition>('editions', i, { ...ed, name: e.target.value })} />
                <button type="button" onClick={() => delIn<Edition>('editions', i)} className={BTN_DEL}><Trash2 size={16} /></button>
              </div>
              <textarea className={`${INPUT} h-16 resize-y`} value={ed.desc} placeholder="Description" onChange={(e) => updIn<Edition>('editions', i, { ...ed, desc: e.target.value })} />
            </div>
          ))}
          <button type="button" onClick={() => addIn<Edition>('editions', { name: '', desc: '' })} className={BTN_ADD}><Plus size={14} /> Ajouter une édition</button>
        </div>
      </Section>

      {/* Équipements inclus */}
      <Section title="Équipements de série" count={(d.features || []).length}>
        <StringList items={(d.features as string[]) || []} onChange={(v) => set('features', v)} placeholder="Écran tactile LINC Panoray…" />
      </Section>

      {/* Options */}
      <Section title="Options (par catégorie)" count={(d.options || []).length}>
        <div className="space-y-4">
          {arr<OptionGroup>('options').map((g, gi) => (
            <div key={gi} className="border border-gray-200 rounded-xl p-3">
              <div className="flex items-center gap-2 mb-3">
                <input className={`${INPUT} font-bold`} value={g.title} placeholder="Catégorie (ex. Tour & racks)" onChange={(e) => updIn<OptionGroup>('options', gi, { ...g, title: e.target.value })} />
                <button type="button" onClick={() => delIn<OptionGroup>('options', gi)} className={BTN_DEL}><Trash2 size={16} /></button>
              </div>
              <div className="pl-2">
                <StringList items={g.items} onChange={(items) => updIn<OptionGroup>('options', gi, { ...g, items })} placeholder="Option…" />
              </div>
            </div>
          ))}
          <button type="button" onClick={() => addIn<OptionGroup>('options', { title: '', items: [] })} className={BTN_ADD}><Plus size={14} /> Ajouter une catégorie</button>
        </div>
      </Section>

      {/* Millésimes */}
      <Section title="Évolution par millésime" count={(d.milestones || []).length}>
        <div className="space-y-3">
          {arr<Milestone>('milestones').map((m, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input className={`${INPUT} max-w-[120px]`} value={m.year} placeholder="Année" onChange={(e) => updIn<Milestone>('milestones', i, { ...m, year: e.target.value })} />
                <input className={INPUT} value={m.edition || ''} placeholder="Édition" onChange={(e) => updIn<Milestone>('milestones', i, { ...m, edition: e.target.value })} />
                <button type="button" onClick={() => delIn<Milestone>('milestones', i)} className={BTN_DEL}><Trash2 size={16} /></button>
              </div>
              <input className={INPUT} value={m.motorization || ''} placeholder="Motorisation" onChange={(e) => updIn<Milestone>('milestones', i, { ...m, motorization: e.target.value })} />
              <input className={INPUT} value={m.changes || ''} placeholder="Changements (résumé court)" onChange={(e) => updIn<Milestone>('milestones', i, { ...m, changes: e.target.value })} />
              <textarea className={`${INPUT} h-16 resize-y`} value={m.detail || ''} placeholder="Détail « Ce qui change en … »" onChange={(e) => updIn<Milestone>('milestones', i, { ...m, detail: e.target.value })} />
              <input className={INPUT} value={m.manualUrl || ''} placeholder="Lien manuel propriétaire (source)" onChange={(e) => updIn<Milestone>('milestones', i, { ...m, manualUrl: e.target.value })} />
            </div>
          ))}
          <button type="button" onClick={() => addIn<Milestone>('milestones', { year: '' })} className={BTN_ADD}><Plus size={14} /> Ajouter un millésime</button>
        </div>
      </Section>

      {/* FAQ */}
      <Section title="FAQ" count={(d.faqs || []).length}>
        <div className="space-y-3">
          {arr<ModelFAQ>('faqs').map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input className={INPUT} value={f.q} placeholder="Question" onChange={(e) => updIn<ModelFAQ>('faqs', i, { ...f, q: e.target.value })} />
                <button type="button" onClick={() => delIn<ModelFAQ>('faqs', i)} className={BTN_DEL}><Trash2 size={16} /></button>
              </div>
              <textarea className={`${INPUT} h-24 resize-y`} value={f.a} placeholder="Réponse (markdown autorisé)" onChange={(e) => updIn<ModelFAQ>('faqs', i, { ...f, a: e.target.value })} />
            </div>
          ))}
          <button type="button" onClick={() => addIn<ModelFAQ>('faqs', { q: '', a: '' })} className={BTN_ADD}><Plus size={14} /> Ajouter une question</button>
        </div>
      </Section>

      <div className="flex justify-end gap-3 pt-2 pb-8">
        <button type="button" onClick={onCancel} className="px-5 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition">Annuler</button>
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Enregistrer
        </button>
      </div>
    </form>
  );
}

/* --------------------------------- Manager ------------------------------------ */
export function ModelsManager({ brand: brandProp }: { brand?: string } = {}) {
  const [rows, setRows] = useState<AdminModel[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<AdminModel | 'new' | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [q, setQ] = useState('');
  const [statusF, setStatusF] = useState('all');

  const load = () => {
    setError(null);
    adminApi
      .listModels()
      .then((r) => setRows(brandProp ? r.models.filter((m) => m.brand === brandProp) : r.models))
      .catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const filtered = (rows || []).filter((m) => {
    if (statusF !== 'all' && m.status !== statusF) return false;
    if (q && !matchQuery(`${m.name} ${m.slug} ${m.gamme} ${m.year} ${m.brand}`, q)) return false;
    return true;
  });

  const byBrand = useMemo(() => {
    const map: Record<string, AdminModel[]> = {};
    for (const m of filtered) (map[m.brand] = map[m.brand] || []).push(m);
    return map;
  }, [filtered]);

  const duplicate = async (m: AdminModel) => {
    try {
      const { id, ...rest } = m as any;
      await adminApi.createModel({ ...rest, slug: `${m.slug}-copie-${Date.now().toString(36).slice(-4)}`, name: `${m.name} (copie)`, status: 'draft' });
      setMsg('Modèle dupliqué (en brouillon).');
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  const importDefaults = async () => {
    if (!confirm('Importer les fiches modèles actuelles du site dans la base ? Les modèles déjà présents ne seront pas écrasés.')) return;
    setImporting(true);
    setError(null);
    try {
      const r = await adminApi.importModels(staticModelsFlat(brandProp));
      setMsg(`${r.imported} modèle(s) importé(s).`);
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setImporting(false);
    }
  };

  const remove = async (m: AdminModel) => {
    if (!confirm(`Supprimer « ${m.name || m.slug} » ? La fiche statique du code reprendra le relais si elle existe.`)) return;
    try {
      await adminApi.deleteModel(m.id);
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  if (editing) {
    const isNew = editing === 'new';
    return (
      <ModelForm
        isNew={isNew}
        initial={isNew ? emptyModel(brandProp || BRAND_OPTIONS[0]?.id || 'nautique') : (editing as AdminModel)}
        onCancel={() => setEditing(null)}
        onSaved={() => { setEditing(null); setMsg('Modèle enregistré.'); load(); }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-6">
        <div>
          {!brandProp && <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-1">Modèles</h1>}
          <p className="text-gray-500 text-sm">Fiches techniques complètes (specs, galerie, motorisations, options, FAQ…).</p>
        </div>
        <div className="flex gap-2">
          <button onClick={importDefaults} disabled={importing} className="inline-flex items-center gap-2 bg-white border border-gray-300 text-brand-dark px-4 py-2.5 rounded-xl text-sm font-bold hover:border-brand-cyan disabled:opacity-50 transition">
            {importing ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} Importer les modèles actuels
          </button>
          <button onClick={() => { setMsg(null); setEditing('new'); }} className="inline-flex items-center gap-2 bg-brand-dark text-white px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark transition">
            <Plus size={16} /> Nouveau
          </button>
        </div>
      </div>

      {rows && rows.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <SearchInput value={q} onChange={setQ} placeholder="Rechercher un modèle…" />
          <StatusFilter value={statusF} onChange={setStatusF} />
          <span className="text-xs text-gray-400 ml-auto">{filtered.length} / {rows.length}</span>
        </div>
      )}

      {msg && <p className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-bold mb-4"><CheckCircle2 size={16} /> {msg} <button onClick={() => setMsg(null)} className="text-gray-400 hover:text-gray-600"><X size={14} /></button></p>}
      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
      {!rows && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {rows && rows.length > 0 && filtered.length === 0 && (
        <p className="text-gray-400 text-sm bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center">Aucun modèle ne correspond.</p>
      )}

      {rows && rows.length === 0 && (
        <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-10 text-center">
          <p className="text-gray-500 mb-4">Aucun modèle en base. Les pages affichent les fiches statiques du code.</p>
          <button onClick={importDefaults} disabled={importing} className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark px-5 py-2.5 rounded-xl text-sm font-bold hover:brightness-110 disabled:opacity-50 transition">
            {importing ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} Importer les modèles actuels
          </button>
        </div>
      )}

      {filtered.length > 0 && (
        <div className="space-y-6">
          {Object.entries(byBrand).map(([brand, list]) => (
            <div key={brand}>
              <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-2">{BRAND_MODELS[brand]?.name || brand}</p>
              <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
                {list.map((m) => (
                  <div key={m.id} className="flex items-center gap-4 p-3 hover:bg-gray-50 transition">
                    <div className="w-20 h-14 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                      {m.hero && <img src={m.hero} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-bold text-brand-dark truncate">{m.name || m.slug}</p>
                      <p className="text-xs text-gray-500 truncate">{m.gamme} · {m.year} · /{m.slug}</p>
                    </div>
                    {m.status === 'draft' && <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-2 py-1 rounded">Brouillon</span>}
                    <button onClick={() => { setMsg(null); setEditing(m); }} className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Modifier"><Pencil size={16} /></button>
                    <button onClick={() => duplicate(m)} className="p-2 text-gray-400 hover:text-brand-cyan transition" title="Dupliquer"><Copy size={16} /></button>
                    <button onClick={() => remove(m)} className="p-2 text-gray-400 hover:text-red-500 transition" title="Supprimer"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
