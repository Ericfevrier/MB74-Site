import React, { useEffect, useState } from 'react';
import {
  Loader2, Save, ArrowLeft, Plus, Trash2, ChevronUp, ChevronDown, ExternalLink, Pencil,
  ImagePlus, X, CheckCircle2, GripVertical,
} from 'lucide-react';
import { adminApi } from '../../lib/adminApi';
import { BLOCK_ORDER, BLOCK_META, newBlock, type Block, type BlockType } from '../../lib/blocks';
import type { Seo } from '../../lib/seo';
import { MediaPicker } from './MediaPicker';
import { MarkdownEditor } from './MarkdownEditor';
import { SeoFields } from './SeoFields';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1';
const slugify = (s: string) => s.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

type PageState = { id?: number; slug: string; title: string; status: string; seo: Seo; blocks: Block[] };

/* ------------------------- Éditeurs de blocs ------------------------- */
function ImagePick({ label, value, onChange, onPick }: { label: string; value: string; onChange: (v: string) => void; onPick: () => void }) {
  return (
    <div>
      <label className={LABEL}>{label}</label>
      <div className="flex items-start gap-3">
        <div className="w-16 h-12 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0">
          {value && <img src={value} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />}
        </div>
        <div className="flex-1 flex gap-2">
          <input className={INPUT} value={value} placeholder="URL de l'image" onChange={(e) => onChange(e.target.value)} />
          <button type="button" onClick={onPick} className="flex-shrink-0 inline-flex items-center bg-brand-dark text-white px-3 rounded-lg hover:bg-brand-cyan hover:text-brand-dark transition"><ImagePlus size={15} /></button>
        </div>
      </div>
    </div>
  );
}

function BlockFields({ block, set, pick, pickMulti }: { block: Block; set: (data: any) => void; pick: (cb: (url: string) => void) => void; pickMulti: (cb: (urls: string[]) => void) => void }) {
  const d = block.data || {};
  const upd = (patch: any) => set({ ...d, ...patch });
  const btnAdd = 'inline-flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:text-brand-dark transition mt-2';

  switch (block.type) {
    case 'heading':
      return (
        <div className="space-y-3">
          <input className={`${INPUT} text-base font-bold`} value={d.text} onChange={(e) => upd({ text: e.target.value })} placeholder="Titre" />
          <div className="flex gap-3">
            <select className={INPUT} value={d.level} onChange={(e) => upd({ level: e.target.value })}><option value="h2">Grand (H2)</option><option value="h3">Moyen (H3)</option></select>
            <select className={INPUT} value={d.align} onChange={(e) => upd({ align: e.target.value })}><option value="left">Aligné à gauche</option><option value="center">Centré</option></select>
          </div>
        </div>
      );
    case 'richtext':
      return <MarkdownEditor value={d.markdown || ''} onChange={(v) => upd({ markdown: v })} />;
    case 'image':
      return (
        <div className="space-y-3">
          <ImagePick label="Image" value={d.url || ''} onChange={(v) => upd({ url: v })} onPick={() => pick((u) => upd({ url: u }))} />
          <input className={INPUT} value={d.alt || ''} onChange={(e) => upd({ alt: e.target.value })} placeholder="Texte alternatif (SEO/accessibilité)" />
          <input className={INPUT} value={d.caption || ''} onChange={(e) => upd({ caption: e.target.value })} placeholder="Légende (optionnel)" />
          <label className="flex items-center gap-2 text-sm text-brand-dark"><input type="checkbox" className="accent-brand-cyan" checked={!!d.rounded} onChange={(e) => upd({ rounded: e.target.checked })} /> Coins arrondis</label>
        </div>
      );
    case 'imageText':
      return (
        <div className="space-y-3">
          <ImagePick label="Image" value={d.image || ''} onChange={(v) => upd({ image: v })} onPick={() => pick((u) => upd({ image: u }))} />
          <select className={INPUT} value={d.position} onChange={(e) => upd({ position: e.target.value })}><option value="left">Image à gauche</option><option value="right">Image à droite</option></select>
          <input className={INPUT} value={d.title || ''} onChange={(e) => upd({ title: e.target.value })} placeholder="Titre" />
          <textarea className={`${INPUT} h-28 resize-y`} value={d.text || ''} onChange={(e) => upd({ text: e.target.value })} placeholder="Texte (markdown autorisé)" />
          <div className="grid grid-cols-2 gap-3">
            <input className={INPUT} value={d.buttonLabel || ''} onChange={(e) => upd({ buttonLabel: e.target.value })} placeholder="Bouton (texte, optionnel)" />
            <input className={INPUT} value={d.buttonUrl || ''} onChange={(e) => upd({ buttonUrl: e.target.value })} placeholder="Bouton (lien)" />
          </div>
        </div>
      );
    case 'cta':
      return (
        <div className="space-y-3">
          <input className={INPUT} value={d.title || ''} onChange={(e) => upd({ title: e.target.value })} placeholder="Titre" />
          <textarea className={`${INPUT} h-16 resize-y`} value={d.text || ''} onChange={(e) => upd({ text: e.target.value })} placeholder="Texte" />
          <div className="grid grid-cols-2 gap-3">
            <input className={INPUT} value={d.buttonLabel || ''} onChange={(e) => upd({ buttonLabel: e.target.value })} placeholder="Bouton (texte)" />
            <input className={INPUT} value={d.buttonUrl || ''} onChange={(e) => upd({ buttonUrl: e.target.value })} placeholder="Bouton (lien)" />
          </div>
          <select className={INPUT} value={d.style} onChange={(e) => upd({ style: e.target.value })}><option value="cyan">Fond cyan</option><option value="dark">Fond sombre</option></select>
        </div>
      );
    case 'cards': {
      const items = d.items || [];
      const setItems = (v: any[]) => upd({ items: v });
      return (
        <div className="space-y-3">
          <input className={INPUT} value={d.title || ''} onChange={(e) => upd({ title: e.target.value })} placeholder="Titre de la section (optionnel)" />
          {items.map((c: any, i: number) => (
            <div key={i} className="border border-gray-200 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input className={INPUT} value={c.title} onChange={(e) => setItems(items.map((x: any, k: number) => (k === i ? { ...x, title: e.target.value } : x)))} placeholder="Titre de la carte" />
                <button type="button" onClick={() => setItems(items.filter((_: any, k: number) => k !== i))} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={15} /></button>
              </div>
              <textarea className={`${INPUT} h-16 resize-y`} value={c.text} onChange={(e) => setItems(items.map((x: any, k: number) => (k === i ? { ...x, text: e.target.value } : x)))} placeholder="Description" />
              <input className={INPUT} value={c.url || ''} onChange={(e) => setItems(items.map((x: any, k: number) => (k === i ? { ...x, url: e.target.value } : x)))} placeholder="Lien (optionnel)" />
            </div>
          ))}
          <button type="button" onClick={() => setItems([...items, { title: '', text: '', url: '' }])} className={btnAdd}><Plus size={14} /> Ajouter une carte</button>
        </div>
      );
    }
    case 'faq': {
      const items = d.items || [];
      const setItems = (v: any[]) => upd({ items: v });
      return (
        <div className="space-y-3">
          <input className={INPUT} value={d.title || ''} onChange={(e) => upd({ title: e.target.value })} placeholder="Titre (optionnel)" />
          {items.map((f: any, i: number) => (
            <div key={i} className="border border-gray-200 rounded-xl p-3 space-y-2">
              <div className="flex items-center gap-2">
                <input className={INPUT} value={f.q} onChange={(e) => setItems(items.map((x: any, k: number) => (k === i ? { ...x, q: e.target.value } : x)))} placeholder="Question" />
                <button type="button" onClick={() => setItems(items.filter((_: any, k: number) => k !== i))} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={15} /></button>
              </div>
              <textarea className={`${INPUT} h-20 resize-y`} value={f.a} onChange={(e) => setItems(items.map((x: any, k: number) => (k === i ? { ...x, a: e.target.value } : x)))} placeholder="Réponse (markdown autorisé)" />
            </div>
          ))}
          <button type="button" onClick={() => setItems([...items, { q: '', a: '' }])} className={btnAdd}><Plus size={14} /> Ajouter une question</button>
        </div>
      );
    }
    case 'gallery': {
      const images = d.images || [];
      return (
        <div className="space-y-3">
          {images.length > 0 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((im: any, i: number) => (
                <div key={i} className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200">
                  <img src={typeof im === 'string' ? im : im.url} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  <button type="button" onClick={() => upd({ images: images.filter((_: any, k: number) => k !== i) })} className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 hover:bg-red-500 transition"><X size={13} /></button>
                </div>
              ))}
            </div>
          )}
          <button type="button" onClick={() => pickMulti((urls) => upd({ images: [...images, ...urls.map((u) => ({ url: u, alt: '' }))] }))} className={btnAdd}><ImagePlus size={14} /> Ajouter des images</button>
        </div>
      );
    }
    default:
      return null;
  }
}

function PageEditor({ id, onBack, onSaved }: { id: number | 'new'; onBack: () => void; onSaved: () => void }) {
  const [p, setP] = useState<PageState | null>(id === 'new' ? { slug: '', title: '', status: 'published', seo: {}, blocks: [] } : null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [open, setOpen] = useState<Record<string, boolean>>({});
  const [picker, setPicker] = useState<{ multi: boolean; cb: (v: any) => void } | null>(null);

  useEffect(() => {
    if (id === 'new') return;
    adminApi.getCustomPage(id as number).then((r) => setP({ id: r.page.id, slug: r.page.slug, title: r.page.title, status: r.page.status || 'published', seo: r.page.seo || {}, blocks: r.page.blocks || [] })).catch((e) => setError(e.message));
  }, [id]);

  if (!p) return <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>;

  const setBlocks = (b: Block[]) => setP({ ...p, blocks: b });
  const addBlock = (t: BlockType) => { const b = newBlock(t); setBlocks([...p.blocks, b]); setOpen((o) => ({ ...o, [b.id]: true })); };
  const move = (i: number, dir: number) => {
    const j = i + dir;
    if (j < 0 || j >= p.blocks.length) return;
    const next = [...p.blocks];
    [next[i], next[j]] = [next[j], next[i]];
    setBlocks(next);
  };
  const pick = (cb: (url: string) => void) => setPicker({ multi: false, cb });
  const pickMulti = (cb: (urls: string[]) => void) => setPicker({ multi: true, cb });

  const save = async () => {
    setError(null);
    if (!p.title.trim() || !p.slug.trim()) { setError('Titre et URL requis.'); return; }
    setSaving(true);
    try {
      const payload = { ...p, sortOrder: 0 };
      if (p.id) await adminApi.updateCustomPage(p.id, payload);
      else { const r = await adminApi.createCustomPage(payload); setP({ ...p, id: r.id }); }
      setOk(true);
      onSaved();
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
        <button onClick={onBack} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-brand-dark transition"><ArrowLeft size={16} /> Pages libres</button>
        <div className="flex items-center gap-2">
          {p.id && <a href={`/${p.slug}?preview=1`} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Aperçu"><ExternalLink size={16} /></a>}
          <button onClick={save} disabled={saving} className="flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
            {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Enregistrer
          </button>
        </div>
      </div>
      {ok && <p className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-bold"><CheckCircle2 size={16} /> Enregistré</p>}
      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

      {/* Réglages page */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className={LABEL}>Titre de la page</label>
            <input className={INPUT} value={p.title} onChange={(e) => setP({ ...p, title: e.target.value, slug: p.id ? p.slug : slugify(e.target.value) })} placeholder="Ex. Offre d'été" />
          </div>
          <div>
            <label className={LABEL}>URL</label>
            <div className="flex items-center gap-1 text-sm"><span className="text-gray-400">/</span><input className={INPUT} value={p.slug} onChange={(e) => setP({ ...p, slug: slugify(e.target.value) })} placeholder="offre-ete" /></div>
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">Statut :
          <select className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm" value={p.status} onChange={(e) => setP({ ...p, status: e.target.value })}><option value="published">Publié</option><option value="draft">Brouillon</option></select>
        </label>
      </div>

      {/* Blocs */}
      <div className="space-y-3">
        {p.blocks.map((b, i) => (
          <div key={b.id} className="bg-white rounded-2xl border border-gray-200 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 border-b border-gray-100">
              <GripVertical size={15} className="text-gray-300" />
              <span className="font-bold text-sm text-brand-dark">{BLOCK_META[b.type].label}</span>
              <div className="ml-auto flex items-center gap-1">
                <button onClick={() => move(i, -1)} disabled={i === 0} className="p-1.5 text-gray-400 hover:text-brand-dark disabled:opacity-30"><ChevronUp size={15} /></button>
                <button onClick={() => move(i, 1)} disabled={i === p.blocks.length - 1} className="p-1.5 text-gray-400 hover:text-brand-dark disabled:opacity-30"><ChevronDown size={15} /></button>
                <button onClick={() => setOpen((o) => ({ ...o, [b.id]: !o[b.id] }))} className="p-1.5 text-gray-400 hover:text-brand-cyan"><Pencil size={15} /></button>
                <button onClick={() => { if (confirm('Supprimer ce bloc ?')) setBlocks(p.blocks.filter((x) => x.id !== b.id)); }} className="p-1.5 text-gray-400 hover:text-red-500"><Trash2 size={15} /></button>
              </div>
            </div>
            {open[b.id] && (
              <div className="p-4">
                <BlockFields block={b} pick={pick} pickMulti={pickMulti} set={(data) => setBlocks(p.blocks.map((x) => (x.id === b.id ? { ...x, data } : x)))} />
              </div>
            )}
          </div>
        ))}
        {p.blocks.length === 0 && <p className="text-gray-400 text-sm bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center">Aucun bloc. Ajoute ta première section ci-dessous.</p>}
      </div>

      {/* Palette */}
      <div className="bg-white rounded-2xl border border-gray-200 p-4">
        <p className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-3">Ajouter un bloc</p>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {BLOCK_ORDER.map((t) => (
            <button key={t} onClick={() => addBlock(t)} className="text-left border border-gray-200 rounded-xl p-3 hover:border-brand-cyan hover:bg-brand-cyan/5 transition">
              <p className="font-bold text-sm text-brand-dark flex items-center gap-1.5"><Plus size={13} className="text-brand-cyan" /> {BLOCK_META[t].label}</p>
              <p className="text-[11px] text-gray-400 mt-0.5 leading-tight">{BLOCK_META[t].desc}</p>
            </button>
          ))}
        </div>
      </div>

      {/* SEO */}
      <SeoFields seo={p.seo} onChange={(v) => setP({ ...p, seo: v })} path="" slug={p.slug} fallbackTitle={p.title ? `${p.title} | Motor Boat 74` : undefined} />

      <MediaPicker open={picker !== null} multiple={picker?.multi} onClose={() => setPicker(null)} onSelect={(urls) => { if (!picker) return; picker.multi ? picker.cb(urls) : picker.cb(urls[0]); }} />
    </div>
  );
}

export function PageBuilder() {
  const [rows, setRows] = useState<{ id: number; slug: string; title: string; status: string }[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<number | 'new' | null>(null);

  const load = () => { setError(null); adminApi.listCustomPages().then((r) => setRows(r.pages)).catch((e) => setError(e.message)); };
  useEffect(load, []);

  const remove = async (id: number, title: string) => {
    if (!confirm(`Supprimer la page « ${title} » ?`)) return;
    try { await adminApi.deleteCustomPage(id); load(); } catch (e: any) { setError(e.message); }
  };

  if (editing !== null) return <PageEditor id={editing} onBack={() => { setEditing(null); load(); }} onSaved={load} />;

  return (
    <div className="max-w-3xl">
      <div className="flex items-start justify-between gap-4 mb-1">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-1">Pages libres</h1>
          <p className="text-gray-500 text-sm">Crée et compose des pages entières en blocs (titres, textes, images, cartes, CTA, FAQ…), à ta propre URL.</p>
        </div>
        <button onClick={() => setEditing('new')} className="inline-flex items-center gap-2 bg-brand-dark text-white px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark transition flex-shrink-0"><Plus size={16} /> Nouvelle page</button>
      </div>

      {error && <p className="text-red-600 text-sm font-medium my-4">{error}</p>}
      {!rows && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}
      {rows && rows.length === 0 && <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-10 text-center text-gray-500 mt-5">Aucune page libre. Clique « Nouvelle page » pour composer ta première page.</div>}
      {rows && rows.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100 mt-5">
          {rows.map((r) => (
            <div key={r.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 transition">
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brand-dark truncate">{r.title}</p>
                <p className="text-xs text-gray-500 truncate">/{r.slug}</p>
              </div>
              {r.status === 'draft' && <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-2 py-1 rounded">Brouillon</span>}
              <a href={`/${r.slug}?preview=1`} target="_blank" rel="noreferrer" className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Aperçu"><ExternalLink size={16} /></a>
              <button onClick={() => setEditing(r.id)} className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Modifier"><Pencil size={16} /></button>
              <button onClick={() => remove(r.id, r.title)} className="p-2 text-gray-400 hover:text-red-500 transition" title="Supprimer"><Trash2 size={16} /></button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
