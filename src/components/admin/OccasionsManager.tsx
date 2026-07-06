import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, Save, Download, Eye, EyeOff, Tag, CheckCircle2, Image as ImageIcon, ImagePlus, X, Copy } from 'lucide-react';
import { adminApi, type AdminBoat } from '../../lib/adminApi';
import { allUsedBoats } from '../../data/usedBoats';
import { MediaPicker } from './MediaPicker';
import { SeoFields } from './SeoFields';
import type { Seo } from '../../lib/seo';
import { SearchInput, StatusFilter, FilterSelect, matchQuery, useDragReorder } from './AdminToolbar';
import { GripVertical } from 'lucide-react';
import { ScheduleFields, ScheduleBadge } from './Schedule';
import { VersionHistory } from './VersionHistory';
import { History, ExternalLink } from 'lucide-react';

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
  const [picker, setPicker] = useState<null | 'image' | 'gallery'>(null);
  const set = (k: keyof Draft, v: any) => setD((p) => ({ ...p, [k]: v }));

  const gallery = d.gallery || [];
  const setGallery = (g: string[]) => set('gallery', g);

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    const payload: Partial<AdminBoat> = {
      ...d,
      priceValue: d.priceValue === undefined || (d.priceValue as any) === '' ? undefined : Number(d.priceValue),
      gallery,
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

      {/* Image principale */}
      <div className="mt-5">
        <label className={LABEL}>Image principale</label>
        <div className="flex items-start gap-3">
          <div className="w-28 h-20 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0 flex items-center justify-center">
            {d.image ? <img src={d.image} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <ImageIcon size={20} className="text-gray-300" />}
          </div>
          <div className="flex-1 flex gap-2">
            <input className={INPUT} value={d.image || ''} onChange={(e) => set('image', e.target.value)} placeholder="URL, ou « Médias » →" />
            <button type="button" onClick={() => setPicker('image')} className="flex-shrink-0 inline-flex items-center gap-1.5 bg-brand-dark text-white px-3.5 rounded-xl text-sm font-bold hover:bg-brand-cyan hover:text-brand-dark transition">
              <ImagePlus size={16} /> Médias
            </button>
          </div>
        </div>
      </div>

      {/* Galerie visuelle */}
      <div className="mt-5">
        <div className="flex items-center justify-between mb-1.5">
          <label className={LABEL}>Galerie <span className="text-gray-400">({gallery.length})</span></label>
          <button type="button" onClick={() => setPicker('gallery')} className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-dark transition">
            <ImagePlus size={14} /> Ajouter des photos
          </button>
        </div>
        {gallery.length > 0 ? (
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
            {gallery.map((url, i) => (
              <div key={i} className="relative group rounded-lg overflow-hidden border border-gray-200 aspect-square">
                <img src={url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                <button type="button" onClick={() => setGallery(gallery.filter((_, k) => k !== i))} title="Retirer" className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition">
                  <X size={13} />
                </button>
                {i === 0 && <span className="absolute bottom-1 left-1 text-[9px] font-bold uppercase bg-brand-cyan text-brand-dark px-1.5 py-0.5 rounded">1re</span>}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-400 bg-gray-50 border border-dashed border-gray-200 rounded-lg p-4 text-center">Aucune photo. Clique sur « Ajouter des photos ».</p>
        )}
      </div>

      <div className="grid sm:grid-cols-2 gap-5 mt-5">
        <Field label="Points forts (un par ligne)">
          <textarea className={`${INPUT} h-28 resize-y`} value={d.highlightsText || ''} onChange={(e) => set('highlightsText', e.target.value)} />
        </Field>
        <Field label="Description">
          <textarea className={`${INPUT} h-28 resize-y`} value={d.description || ''} onChange={(e) => set('description', e.target.value)} />
        </Field>
      </div>

      <MediaPicker
        open={picker !== null}
        multiple={picker === 'gallery'}
        title={picker === 'image' ? "Image principale de l'occasion" : 'Photos de la galerie'}
        onClose={() => setPicker(null)}
        onSelect={(urls) => {
          if (picker === 'image') set('image', urls[0]);
          else setGallery([...gallery, ...urls.filter((u) => !gallery.includes(u))]);
        }}
      />

      <div className="mt-5">
        <SeoFields
          seo={(d.seo as Seo) || {}}
          onChange={(v) => set('seo', v)}
          path="/bateaux/occasion"
          slug={d.slug}
          fallbackTitle={d.title ? `${d.title} ${d.year || ''} d'occasion | Motor Boat 74` : undefined}
          fallbackDescription={d.description}
          fallbackImage={d.image}
        />
      </div>

      <div className="mt-5">
        <ScheduleFields publishAt={d.publishAt} unpublishAt={d.unpublishAt} onChange={(p) => setD((prev) => ({ ...prev, ...p }))} />
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
  const [msg, setMsg] = useState<string | null>(null);
  const [busy, setBusy] = useState<number | 'import' | null>(null);
  const [q, setQ] = useState('');
  const [statusF, setStatusF] = useState('all');
  const [soldF, setSoldF] = useState('all');
  const [history, setHistory] = useState<AdminBoat | null>(null);

  const load = () => {
    setError(null);
    adminApi
      .listBoats()
      .then((r) => setBoats(r.boats))
      .catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const filtered = (boats || []).filter((b) => {
    if (statusF !== 'all' && b.status !== statusF) return false;
    if (soldF === 'sold' && !b.sold) return false;
    if (soldF === 'available' && b.sold) return false;
    if (q && !matchQuery(`${b.title} ${b.slug} ${b.brandId} ${b.year} ${b.price}`, q)) return false;
    return true;
  });
  const dragEnabled = q === '' && statusF === 'all' && soldF === 'all';
  const dragProps = useDragReorder(boats, setBoats, adminApi.reorderBoats, dragEnabled);

  const remove = async (b: AdminBoat) => {
    if (!confirm(`Supprimer définitivement « ${b.title} » ?`)) return;
    try {
      await adminApi.deleteBoat(b.id);
      load();
    } catch (e: any) {
      alert(e.message);
    }
  };

  const duplicate = async (b: AdminBoat) => {
    setBusy(b.id);
    setError(null);
    try {
      const { id, galleryText, highlightsText, ...rest } = { ...b } as any;
      const copy = { ...rest, slug: `${b.slug}-copie-${Date.now().toString(36).slice(-4)}`, title: `${b.title} (copie)`, status: 'draft', sold: false };
      await adminApi.createBoat(copy);
      setMsg('Occasion dupliquée (en brouillon).');
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  };

  // Enregistre une modif partielle en renvoyant la fiche complète (updateBoat remplace tout).
  const patch = async (b: AdminBoat, changes: Partial<AdminBoat>) => {
    setBusy(b.id);
    setError(null);
    try {
      const { galleryText, highlightsText, ...rest } = { ...b, ...changes } as any;
      await adminApi.updateBoat(b.id, rest);
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  };

  const importDefaults = async () => {
    if (!confirm('Importer les occasions actuelles du site dans la base ? Les fiches déjà présentes ne seront pas écrasées.')) return;
    setBusy('import');
    setError(null);
    try {
      const payload = allUsedBoats().map((b) => ({ ...b, status: 'published' as const }));
      const r = await adminApi.importBoats(payload);
      setMsg(`${r.imported} occasion(s) importée(s).`);
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  };

  if (editing) {
    return (
      <BoatForm
        initial={editing}
        onCancel={() => setEditing(null)}
        onSaved={() => {
          setEditing(null);
          setMsg('Occasion enregistrée.');
          load();
        }}
      />
    );
  }

  const importBtn = (
    <button onClick={importDefaults} disabled={busy === 'import'} className="inline-flex items-center gap-2 bg-white border border-gray-300 text-brand-dark px-4 py-2.5 rounded-xl text-sm font-bold hover:border-brand-cyan disabled:opacity-50 transition">
      {busy === 'import' ? <Loader2 size={16} className="animate-spin" /> : <Download size={16} />} Importer les occasions actuelles
    </button>
  );

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
        <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark">
          Bateaux d'occasion {boats ? <span className="text-gray-400 font-normal">({boats.length})</span> : null}
        </h1>
        <div className="flex gap-2">
          {importBtn}
          <button onClick={() => { setMsg(null); setEditing(emptyDraft()); }} className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark transition">
            <Plus size={16} /> Ajouter
          </button>
        </div>
      </div>
      <p className="text-gray-500 text-sm mb-5">Ajoute, modifie, masque (brouillon) ou marque comme vendu chaque bateau. Les fiches publiées et disponibles apparaissent sur le site.</p>

      {boats && boats.length > 0 && (
        <div className="flex flex-wrap items-center gap-2 mb-5">
          <SearchInput value={q} onChange={setQ} placeholder="Rechercher un bateau…" />
          <StatusFilter value={statusF} onChange={setStatusF} />
          <FilterSelect value={soldF} onChange={setSoldF} options={[{ value: 'all', label: 'Vendus + dispo' }, { value: 'available', label: 'Disponibles' }, { value: 'sold', label: 'Vendus' }]} />
          <span className="text-xs text-gray-400 ml-auto">{filtered.length} / {boats.length}</span>
        </div>
      )}

      {msg && <p className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-bold mb-4"><CheckCircle2 size={16} /> {msg}</p>}
      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
      {!boats && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {boats && boats.length === 0 && (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center">
          <p className="text-gray-500 mb-4">Aucun bateau en base. Importe les occasions actuelles du site, ou crée une fiche.</p>
          <div className="flex justify-center gap-2">{importBtn}</div>
        </div>
      )}

      {boats && boats.length > 0 && filtered.length === 0 && (
        <p className="text-gray-400 text-sm bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center">Aucun bateau ne correspond à la recherche.</p>
      )}

      {dragEnabled && filtered.length > 1 && <p className="text-xs text-gray-400 mb-2 flex items-center gap-1.5"><GripVertical size={13} /> Glisse les lignes pour changer l'ordre d'affichage.</p>}

      {filtered.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {filtered.map((b, i) => (
            <div key={b.id} {...dragProps(i)} className={`flex items-center gap-4 p-4 hover:bg-gray-50 transition ${dragEnabled ? 'cursor-move' : ''}`}>
              {dragEnabled && <GripVertical size={16} className="text-gray-300 flex-shrink-0" />}
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
              <div className="flex items-center gap-1.5 flex-shrink-0">
                {b.status === 'draft'
                  ? <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-2 py-1 rounded">Brouillon</span>
                  : <span className="text-[10px] font-bold uppercase bg-sky-100 text-sky-700 px-2 py-1 rounded">Publié</span>}
                <ScheduleBadge item={b} />
                {b.sold
                  ? <span className="text-[10px] font-bold uppercase bg-red-100 text-red-600 px-2 py-1 rounded">Vendu</span>
                  : <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Dispo</span>}

                <span className="w-px h-6 bg-gray-200 mx-1" />

                {busy === b.id ? (
                  <span className="p-2 text-gray-400"><Loader2 size={16} className="animate-spin" /></span>
                ) : (
                  <>
                    <button onClick={() => patch(b, { status: b.status === 'published' ? 'draft' : 'published' })}
                      className="p-2 text-gray-500 hover:text-brand-cyan transition"
                      title={b.status === 'published' ? 'Masquer (mettre en brouillon)' : 'Publier'}>
                      {b.status === 'published' ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button onClick={() => patch(b, { sold: !b.sold })}
                      className={`p-2 transition ${b.sold ? 'text-emerald-600 hover:text-emerald-700' : 'text-gray-500 hover:text-red-600'}`}
                      title={b.sold ? 'Remettre disponible' : 'Marquer comme vendu'}>
                      <Tag size={16} />
                    </button>
                  </>
                )}
                <button onClick={() => window.open(`/bateaux/occasion/${b.slug}?preview=1`, '_blank')} className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Aperçu">
                  <ExternalLink size={16} />
                </button>
                <button onClick={() => { setMsg(null); setEditing({ ...b, galleryText: toText(b.gallery), highlightsText: toText(b.highlights) }); }} className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Modifier">
                  <Pencil size={16} />
                </button>
                <button onClick={() => duplicate(b)} className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Dupliquer">
                  <Copy size={16} />
                </button>
                <button onClick={() => setHistory(b)} className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Historique">
                  <History size={16} />
                </button>
                <button onClick={() => remove(b)} className="p-2 text-gray-500 hover:text-red-600 transition" title="Supprimer">
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <VersionHistory open={!!history} type="used-boats" id={history?.id || 0} title={history?.title} onClose={() => setHistory(null)} onRestored={load} />
    </div>
  );
}
