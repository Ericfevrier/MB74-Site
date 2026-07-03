import React, { useState } from 'react';
import { ChevronDown, Search, ImagePlus, Globe } from 'lucide-react';
import type { Seo } from '../../lib/seo';
import { MediaPicker } from './MediaPicker';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1';

const SITE = 'https://motorboat74.com';

/** Compteur de caractères coloré selon la plage recommandée. */
function Counter({ n, min, max }: { n: number; min: number; max: number }) {
  const color = n === 0 ? 'text-gray-400' : n < min ? 'text-amber-500' : n <= max ? 'text-emerald-600' : 'text-red-500';
  return <span className={`text-[11px] font-bold ${color}`}>{n} / {max}</span>;
}

/**
 * Bloc SEO réutilisable : aperçu Google, titre/description (compteurs), slug,
 * Open Graph, canonical, noindex. Piloté par un objet `Seo` + onChange.
 */
export function SeoFields({
  seo,
  onChange,
  path,
  slug,
  onSlugChange,
  fallbackTitle,
  fallbackDescription,
  fallbackImage,
  defaultOpen = false,
}: {
  seo: Seo;
  onChange: (seo: Seo) => void;
  /** Chemin d'URL affiché dans l'aperçu (ex. "/blog"). Le slug est ajouté si fourni. */
  path: string;
  slug?: string;
  onSlugChange?: (slug: string) => void;
  fallbackTitle?: string;
  fallbackDescription?: string;
  fallbackImage?: string;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const [advanced, setAdvanced] = useState(false);
  const [picker, setPicker] = useState(false);
  const set = (k: keyof Seo, v: any) => onChange({ ...seo, [k]: v });

  const title = seo.title || fallbackTitle || '';
  const desc = seo.description || fallbackDescription || '';
  const url = `${SITE}${path}${slug ? `/${slug}` : ''}`.replace(/\/+$/, '') || SITE;

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white">
      <button type="button" onClick={() => setOpen((o) => !o)} className="w-full flex items-center justify-between px-5 py-3.5 hover:bg-gray-50 transition">
        <span className="font-bold text-sm text-brand-dark flex items-center gap-2"><Search size={15} className="text-brand-cyan" /> SEO & partage</span>
        <ChevronDown size={18} className={`text-gray-400 transition ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div className="px-5 pb-5 pt-1 border-t border-gray-100 space-y-4">
          {/* Aperçu Google */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
            <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-2">Aperçu Google</p>
            <p className="text-[#202124] text-sm truncate flex items-center gap-1"><Globe size={12} className="text-gray-400" /> Motor Boat 74</p>
            <p className="text-[#4d5156] text-xs truncate">{url}</p>
            <p className="text-[#1a0dab] text-lg leading-tight truncate">{title || 'Titre de la page'}</p>
            <p className="text-[#4d5156] text-sm line-clamp-2">{desc || 'La description apparaîtra ici. Renseignez-la pour contrôler ce que voit l’internaute dans les résultats de recherche.'}</p>
          </div>

          {/* Slug */}
          {onSlugChange && (
            <div>
              <label className={LABEL}>Slug (URL)</label>
              <div className="flex items-center gap-1 text-sm">
                <span className="text-gray-400 whitespace-nowrap">{path}/</span>
                <input className={INPUT} value={slug || ''} onChange={(e) => onSlugChange(e.target.value.toLowerCase().replace(/[^a-z0-9-]+/g, '-').replace(/^-+|-+$/g, ''))} />
              </div>
            </div>
          )}

          {/* Titre */}
          <div>
            <div className="flex items-center justify-between"><label className={LABEL}>Titre SEO</label><Counter n={title.length} min={30} max={60} /></div>
            <input className={INPUT} value={seo.title || ''} placeholder={fallbackTitle || 'Titre affiché dans Google'} onChange={(e) => set('title', e.target.value)} />
          </div>

          {/* Description */}
          <div>
            <div className="flex items-center justify-between"><label className={LABEL}>Meta description</label><Counter n={desc.length} min={70} max={155} /></div>
            <textarea className={`${INPUT} h-20 resize-y`} value={seo.description || ''} placeholder={fallbackDescription || 'Résumé incitatif affiché sous le titre dans Google'} onChange={(e) => set('description', e.target.value)} />
          </div>

          {/* noindex */}
          <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
            <input type="checkbox" className="w-4 h-4 accent-red-500" checked={!!seo.noindex} onChange={(e) => set('noindex', e.target.checked)} />
            Exclure cette page de Google (noindex) — la retire aussi du sitemap
          </label>

          {/* Avancé : OG + canonical + nofollow */}
          <button type="button" onClick={() => setAdvanced((a) => !a)} className="text-xs font-bold text-brand-cyan hover:text-brand-dark transition flex items-center gap-1">
            <ChevronDown size={13} className={`transition ${advanced ? 'rotate-180' : ''}`} /> Options avancées (réseaux sociaux, canonical)
          </button>
          {advanced && (
            <div className="space-y-4 pl-1 border-l-2 border-gray-100">
              <div className="pl-3 space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-24 h-16 rounded-lg overflow-hidden border border-gray-200 bg-gray-50 flex-shrink-0 flex items-center justify-center">
                    {(seo.ogImage || fallbackImage) ? <img src={seo.ogImage || fallbackImage} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : <ImagePlus size={16} className="text-gray-300" />}
                  </div>
                  <div className="flex-1">
                    <label className={LABEL}>Image de partage (Open Graph)</label>
                    <div className="flex gap-2">
                      <input className={INPUT} value={seo.ogImage || ''} placeholder="Défaut : image principale" onChange={(e) => set('ogImage', e.target.value)} />
                      <button type="button" onClick={() => setPicker(true)} className="flex-shrink-0 inline-flex items-center bg-brand-dark text-white px-3 rounded-lg hover:bg-brand-cyan hover:text-brand-dark transition"><ImagePlus size={15} /></button>
                    </div>
                  </div>
                </div>
                <div><label className={LABEL}>Titre de partage (OG)</label><input className={INPUT} value={seo.ogTitle || ''} placeholder="Défaut : titre SEO" onChange={(e) => set('ogTitle', e.target.value)} /></div>
                <div><label className={LABEL}>Description de partage (OG)</label><textarea className={`${INPUT} h-16 resize-y`} value={seo.ogDescription || ''} placeholder="Défaut : meta description" onChange={(e) => set('ogDescription', e.target.value)} /></div>
                <div><label className={LABEL}>URL canonique</label><input className={INPUT} value={seo.canonical || ''} placeholder={url} onChange={(e) => set('canonical', e.target.value)} /></div>
                <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
                  <input type="checkbox" className="w-4 h-4 accent-brand-cyan" checked={!!seo.nofollow} onChange={(e) => set('nofollow', e.target.checked)} />
                  Ne pas suivre les liens de cette page (nofollow)
                </label>
              </div>
            </div>
          )}

          <MediaPicker open={picker} onClose={() => setPicker(false)} onSelect={(urls) => set('ogImage', urls[0])} />
        </div>
      )}
    </div>
  );
}
