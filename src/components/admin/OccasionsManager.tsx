import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, Save } from 'lucide-react';
import { adminApi, type AdminBoat } from '../../lib/adminApi';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5';

type Draft = Partial<AdminBoat> & { galleryText?: string; highlightsText?: string };

const toText = (a?: string[]) => (a && a.length ? a.join('\n') : '');
const toArr = (t?: string) =>
  (t || '')
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

function emptyDraft(): Draft {
  return { brandId: 'nautique', year: '', price: '', sold: false, status: 'published', galleryText: '', highlightsText: '' };
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      {children}
    </div>
  );
}

function BoatForm({ initial, onCancel, onSaved }: { initial: Draft; onCancel: () => void; onSaved: () => void }) {
  const [d, setD] = useState<Draft>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof Draft, v: any) => setD((p) => ({ ...p, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload: Partial<AdminBoat> = {
      ...d,
      priceValue: d.priceValue === undefined || (d.priceValue as any) === '' ? undefined : Number(d.priceValue),
      gallery: toArr(d.galleryText),
      highlights: toArr(d.highlightsText),
    };
    delete (payload as any).galleryText;
    delete (payload as any).highlightsText;
    try {
      if (d.id) await adminApi.updateBoat(d.id, payload);
      else await adminApi.createBoat(payload);
      onSaved();
    } catch (err: any) {
      setError(err.message || "Échec de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8">
      <div className="flex items-center justify-between gap-4 mb-6">
        <button type="button" onClick={onCancel} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-brand-dark transition">
          <ArrowLeft size={16} /> Retour
        </button>
        <h2 className="font-bold uppercase tracking-tight text-brand-dark">{d.id ? 'Modifier le bateau' : 'Nouveau bateau'}</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Titre *"><input className={INPUT} value={d.title || ''} onChange={(e) => set('title', e.target.value)} required /></Field>
        <Field label="Slug (URL) *"><input className={INPUT} value={d.slug || ''} onChange={(e) => set('slug', e.target.value)} placeholder="super-air-nautique-g23-2023" required /></Field>
        <Field label="Marque"><input className={INPUT} value={d.brandId || ''} onChange={(e) => set('brandId', e.target.value)} placeholder="nautique, mastercraft…" /></Field>
        <Field label="Slug du modèle"><input className={INPUT} value={d.modelSlug || ''} onChange={(e) => set('modelSlug', e.target.value)} placeholder="super-air-nautique-g23" /></Field>
        <Field label="Année"><input className={INPUT} value={d.year || ''} onChange={(e) => set('year', e.target.value)} /></Field>
        <Field label="Prix (affiché)"><input className={INPUT} value={d.price || ''} onChange={(e) => set('price', e.target.value)} placeholder="129 000 €" /></Field>
        <Field label="Prix (valeur num., pour le tri/SEO)"><input className={INPUT} type="number" value={d.priceValue ?? ''} onChange={(e) => set('priceValue', e.target.value)} placeholder="129000" /></Field>
        <Field label="Heures moteur"><input className={INPUT} value={d.hours || ''} onChange={(e) => set('hours', e.target.value)} /></Field>
        <Field label="Motorisation"><input className={INPUT} value={d.power || ''} onChange={(e) => set('power', e.target.value)} /></Field>
        <Field label="Capacité"><input className={INPUT} value={d.capacity || ''} onChange={(e) => set('capacity', e.target.value)} /></Field>
        <Field label="Longueur"><input className={INPUT} value={d.length || ''} onChange={(e) => set('length', e.target.value)} /></Field>
        <Field label="Localisation"><input className={INPUT} value={d.location || ''} onChange={(e) => set('location', e.target.value)} /></Field>
      </div>

      <div className="mt-5">
        <Field label="Image principale (URL)"><input className={INPUT} value={d.image || ''} onChange={(e) => set('image', e.target.value)} placeholder="https://…" /></Field>
      </div>
      <div className="grid sm:grid-cols-2 gap-5 mt-5">
        <Field label="Galerie (une URL par ligne)">
          <textarea className={`${INPUT} h-28 resize-y font-mono text-xs`} value={d.galleryText || ''} onChange={(e) => set('galleryText', e.target.value)} />
        </Field>
        <Field label="Points forts (un par ligne)">
          <textarea className={`${INPUT} h-28 resize-y`} value={d.highlightsText || ''} onChange={(e) => set('highlightsText', e.target.value)} />
        </Field>
      </div>
      <div className="mt-5">
        <Field label="Description">
          <textarea className={`${INPUT} h-28 resize-y`} value={d.description || ''} onChange={(e) => set('description', e.target.value)} />
        </Field>
      </div>

      <div className="flex flex-wrap items-center gap-6 mt-6">
        <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
          <input type="checkbox" className="w-4 h-4 accent-brand-cyan" checked={!!d.sold} onChange={(e) => set('sold', e.target.checked)} /> Vendu
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
          Statut :
          <select className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm" value={d.status || 'published'} onChange={(e) => set('status', e.target.value)}>
            <option value="published">Publié</option>
            <option value="draft">Brouillon</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
          Ordre :
          <input type="number" className="w-20 border border-gray-300 rounded-lg px-2 py-1.5 text-sm" value={d.sortOrder ?? 0} onChange={(e) => set('sortOrder', Number(e.target.value))} />
        </label>
      </div>

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

export function OccasionsManager() {
  const [boats, setBoats] = useState<AdminBoat[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Draft | null>(null);

  const load = () => {
    setError(null);
    adminApi
      .listBoats()
      .then((r) => setBoats(r.boats))
      .catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const remove = async (b: AdminBoat) => {
    if (!confirm(`Supprimer définitivement « ${b.title} » ?`)) return;
    try {
      await adminApi.deleteBoat(b.id);
      load();
    } catch (e: any) {
      alert(e.message);
    }
  };

  if (editing) {
    return (
      <BoatForm
        initial={editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          load();
        }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark">
          Bateaux d'occasion {boats ? <span className="text-gray-400 font-normal">({boats.length})</span> : null}
        </h1>
        <button onClick={() => setEditing(emptyDraft())} className="flex items-center gap-2 bg-brand-cyan text-brand-dark px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:brightness-110 transition">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
      {!boats && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {boats && boats.length === 0 && (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-500">
          Aucun bateau pour l'instant. Clique sur « Ajouter » pour créer la première fiche.
        </div>
      )}

      {boats && boats.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {boats.map((b) => (
            <div key={b.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
              <div className="w-20 h-14 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                {b.image ? <img src={b.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : null}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brand-dark truncate">
                  {b.title} <span className="text-gray-400 font-normal">{b.year}</span>
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {b.price || '—'} · /{b.slug}
                </p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {b.status === 'draft' && <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-2 py-1 rounded">Brouillon</span>}
                {b.sold ? <span className="text-[10px] font-bold uppercase bg-red-100 text-red-600 px-2 py-1 rounded">Vendu</span> : <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Dispo</span>}
                <button onClick={() => setEditing({ ...b, galleryText: toText(b.gallery), highlightsText: toText(b.highlights) })} className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Modifier">
                  <Pencil size={16} />
                </button>
                <button onClick={() => remove(b)} className="p-2 text-gray-500 hover:text-red-600 transition" title="Supprimer">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
