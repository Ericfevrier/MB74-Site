import React, { useEffect, useRef, useState } from 'react';
import { Loader2, UploadCloud, Trash2, Copy, Check, Image as ImageIcon, ChevronDown, RefreshCw, FileText, Film, Tag, Save } from 'lucide-react';
import { adminApi, type MediaFile } from '../../lib/adminApi';
import { fmtSize, toWebp, isImageFile, fileToDataUrl } from '../../lib/media';

function MediaPreview({ f }: { f: MediaFile }) {
  if (f.type === 'pdf') return <div className="w-full h-full flex flex-col items-center justify-center text-red-500 gap-1"><FileText size={26} /><span className="text-[9px] font-bold uppercase">PDF</span></div>;
  if (f.type === 'video') return <video src={f.url} className="w-full h-full object-cover" muted />;
  return <img src={f.url} alt={f.alt || f.name} loading="lazy" className="w-full h-full object-cover" referrerPolicy="no-referrer" />;
}

function CopyBtn({ url }: { url: string }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      const t = document.createElement('textarea');
      t.value = url;
      document.body.appendChild(t);
      t.select();
      document.execCommand('copy');
      t.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 1500);
  };
  return (
    <button onClick={copy} title="Copier l'URL" className="p-1.5 rounded-lg bg-white/90 text-gray-600 hover:text-brand-cyan shadow-sm transition">
      {done ? <Check size={15} className="text-emerald-600" /> : <Copy size={15} />}
    </button>
  );
}

function Thumb({ f, onDelete, onSavedMeta }: { f: MediaFile; onDelete?: () => void; onSavedMeta?: () => void }) {
  const [editing, setEditing] = useState(false);
  const [alt, setAlt] = useState(f.alt || '');
  const [caption, setCaption] = useState(f.caption || '');
  const [saving, setSaving] = useState(false);
  const editable = !!onDelete; // uploads uniquement (pas les images du site)

  const saveMeta = async () => {
    setSaving(true);
    try {
      await adminApi.setMediaMeta(f.name, alt, caption);
      setEditing(false);
      onSavedMeta?.();
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="group relative rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
      <div className="aspect-[4/3] overflow-hidden bg-gray-100"><MediaPreview f={f} /></div>
      <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition">
        <CopyBtn url={f.url} />
        {editable && (
          <button onClick={() => setEditing((e) => !e)} title="Texte alternatif / légende" className="p-1.5 rounded-lg bg-white/90 text-gray-600 hover:text-brand-cyan shadow-sm transition"><Tag size={15} /></button>
        )}
        {onDelete && (
          <button onClick={onDelete} title="Supprimer" className="p-1.5 rounded-lg bg-white/90 text-gray-600 hover:text-red-600 shadow-sm transition"><Trash2 size={15} /></button>
        )}
      </div>
      {f.type && f.type !== 'image' && <span className="absolute top-2 left-2 text-[9px] font-bold uppercase bg-brand-dark/80 text-white px-1.5 py-0.5 rounded">{f.type}</span>}
      <div className="px-2.5 py-2 bg-white">
        <p className="text-[11px] font-medium text-brand-dark truncate" title={f.name}>{f.name}</p>
        <p className="text-[10px] text-gray-400">{fmtSize(f.size)}{f.alt ? ' · alt ✓' : ''}</p>
      </div>
      {editing && (
        <div className="p-2.5 border-t border-gray-100 bg-white space-y-2">
          <input value={alt} onChange={(e) => setAlt(e.target.value)} placeholder="Texte alternatif (SEO / accessibilité)" className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-brand-cyan" />
          <input value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Légende (optionnelle)" className="w-full border border-gray-300 rounded-lg px-2 py-1.5 text-xs focus:outline-none focus:border-brand-cyan" />
          <button onClick={saveMeta} disabled={saving} className="w-full inline-flex items-center justify-center gap-1.5 bg-brand-dark text-white text-xs font-bold py-1.5 rounded-lg hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
            {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />} Enregistrer
          </button>
        </div>
      )}
    </div>
  );
}

export function MediaManager() {
  const [uploads, setUploads] = useState<MediaFile[] | null>(null);
  const [site, setSite] = useState<MediaFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [progress, setProgress] = useState<{ done: number; total: number; saved: number } | null>(null);
  const [quality, setQuality] = useState(0.82);
  const [maxW, setMaxW] = useState(2200);
  const [siteOpen, setSiteOpen] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setError(null);
    adminApi
      .listMedia()
      .then((r) => { setUploads(r.uploads); setSite(r.site); })
      .catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const handleFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/') || f.type === 'application/pdf' || f.type.startsWith('video/'));
    if (!list.length) return;
    setBusy(true);
    setError(null);
    setProgress({ done: 0, total: list.length, saved: 0 });
    let saved = 0;
    for (let i = 0; i < list.length; i++) {
      const file = list[i];
      try {
        // Images → conversion WebP allégée ; PDF/vidéo → upload brut.
        const dataUrl = isImageFile(file) ? await toWebp(file, quality, maxW) : await fileToDataUrl(file);
        const approxBytes = Math.round((dataUrl.length - dataUrl.indexOf(',') - 1) * 0.75);
        await adminApi.uploadMedia(file.name, dataUrl);
        if (isImageFile(file)) saved += Math.max(0, file.size - approxBytes);
      } catch (e: any) {
        setError(`« ${file.name} » : ${e.message || 'upload impossible'}`);
      }
      setProgress({ done: i + 1, total: list.length, saved });
    }
    setBusy(false);
    setTimeout(() => setProgress(null), 2500);
    load();
    if (inputRef.current) inputRef.current.value = '';
  };

  const del = async (f: MediaFile) => {
    if (!confirm(`Supprimer « ${f.name} » ? (les pages qui l'utilisent afficheront une image cassée)`)) return;
    try {
      await adminApi.deleteMedia(f.name);
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div>
      <div className="flex items-start justify-between gap-4 flex-wrap mb-1">
        <div>
          <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-1">Médias</h1>
          <p className="text-gray-500 text-sm">Importe tes photos : elles sont converties en <strong>WebP léger</strong> (qualité conservée), puis tu copies l'URL à coller dans une fiche.</p>
        </div>
        <button onClick={load} className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-dark transition"><RefreshCw size={15} /> Actualiser</button>
      </div>

      {/* Réglages conversion */}
      <div className="flex flex-wrap items-center gap-6 bg-white border border-gray-200 rounded-2xl px-5 py-3.5 mt-5 mb-4">
        <label className="flex items-center gap-3 text-sm font-medium text-brand-dark">
          Qualité <span className="text-brand-cyan font-bold w-9">{Math.round(quality * 100)}%</span>
          <input type="range" min={0.5} max={0.95} step={0.01} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="accent-brand-cyan w-40" />
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
          Largeur max
          <input type="number" value={maxW} min={400} step={100} onChange={(e) => setMaxW(Number(e.target.value))} className="w-24 border border-gray-300 rounded-lg px-2 py-1.5 text-sm" /> px
        </label>
        <span className="text-xs text-gray-400">Recommandé : 82 % · 2200 px pour un hero, 1200 px pour une vignette.</span>
      </div>

      {/* Zone d'upload */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
        onClick={() => !busy && inputRef.current?.click()}
        className={`cursor-pointer border-2 border-dashed rounded-2xl p-10 text-center transition ${dragOver ? 'border-brand-cyan bg-brand-cyan/5' : 'border-gray-300 hover:border-brand-cyan bg-white'}`}
      >
        <input ref={inputRef} type="file" accept="image/*,application/pdf,video/mp4,video/webm" multiple hidden onChange={(e) => e.target.files && handleFiles(e.target.files)} />
        {busy ? (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <Loader2 className="animate-spin" />
            {progress && <p className="text-sm font-medium">Conversion… {progress.done}/{progress.total}</p>}
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-gray-500">
            <UploadCloud size={32} className="text-brand-cyan" />
            <p className="text-sm font-bold text-brand-dark">Glisse tes images ici, ou clique pour choisir</p>
            <p className="text-xs text-gray-400">Images (converties en WebP) · PDF · vidéos mp4/webm — max 30 Mo</p>
          </div>
        )}
      </div>

      {progress && !busy && progress.saved > 0 && (
        <p className="text-emerald-600 text-sm font-bold mt-3">✓ {progress.total} image(s) importée(s) — {fmtSize(progress.saved)} économisés.</p>
      )}
      {error && <p className="text-red-600 text-sm font-medium mt-3">{error}</p>}

      {/* Bibliothèque uploads */}
      <div className="mt-8">
        <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">
          Mes médias {uploads ? <span className="text-gray-400">({uploads.length})</span> : null}
        </h2>
        {!uploads && !error && <div className="flex justify-center py-10 text-gray-400"><Loader2 className="animate-spin" /></div>}
        {uploads && uploads.length === 0 && (
          <p className="text-gray-400 text-sm bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center">Aucun média importé pour l'instant.</p>
        )}
        {uploads && uploads.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {uploads.map((f) => <Thumb key={f.name} f={f} onDelete={() => del(f)} onSavedMeta={load} />)}
          </div>
        )}
      </div>

      {/* Images du site (lecture seule) */}
      {site.length > 0 && (
        <div className="mt-8">
          <button onClick={() => setSiteOpen((o) => !o)} className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-dark transition mb-3">
            <ImageIcon size={16} /> Images du site <span className="text-gray-400">({site.length})</span>
            <ChevronDown size={16} className={`transition ${siteOpen ? 'rotate-180' : ''}`} />
          </button>
          {siteOpen && (
            <>
              <p className="text-xs text-gray-400 mb-3">Visuels déjà intégrés au site (lecture seule). Copie l'URL pour les réutiliser.</p>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {site.map((f) => <Thumb key={f.name} f={f} />)}
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
