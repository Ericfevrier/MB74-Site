import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Loader2, X, Search, UploadCloud, Check, ImagePlus, FileText } from 'lucide-react';
import { adminApi, type MediaFile } from '../../lib/adminApi';
import { fmtSize, toWebp, isImageFile, fileToDataUrl } from '../../lib/media';

type Source = 'all' | 'uploads' | 'site';
type Item = MediaFile & { source: 'uploads' | 'site' };

/**
 * Sélecteur de médias réutilisable (modale).
 * - `multiple` : sélection multiple (galerie) ou unique (image principale).
 * - `onSelect(urls)` : renvoie les URL choisies puis ferme.
 * - Recherche dynamique, filtres (mes médias / site), upload+conversion WebP intégré.
 */
export function MediaPicker({
  open,
  multiple = false,
  title,
  onClose,
  onSelect,
}: {
  open: boolean;
  multiple?: boolean;
  title?: string;
  onClose: () => void;
  onSelect: (urls: string[]) => void;
}) {
  const [items, setItems] = useState<Item[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [q, setQ] = useState('');
  const [source, setSource] = useState<Source>('all');
  const [sel, setSel] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const load = () => {
    setError(null);
    adminApi
      .listMedia()
      .then((r) =>
        setItems([
          ...r.uploads.map((f) => ({ ...f, source: 'uploads' as const })),
          ...r.site.map((f) => ({ ...f, source: 'site' as const })),
        ]),
      )
      .catch((e) => setError(e.message));
  };

  useEffect(() => {
    if (open) {
      setSel([]);
      setQ('');
      setSource('all');
      load();
    }
  }, [open]);

  // Fermeture à la touche Échap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const filtered = useMemo(() => {
    if (!items) return [];
    const needle = q.trim().toLowerCase();
    return items.filter(
      (f) => (source === 'all' || f.source === source) && (!needle || f.name.toLowerCase().includes(needle)),
    );
  }, [items, q, source]);

  const toggle = (url: string) => {
    if (multiple) setSel((s) => (s.includes(url) ? s.filter((u) => u !== url) : [...s, url]));
    else setSel([url]);
  };

  const confirm = (urls?: string[]) => {
    const out = urls ?? sel;
    if (!out.length) return;
    onSelect(out);
    onClose();
  };

  const handleFiles = async (files: FileList | File[]) => {
    const list = Array.from(files).filter((f) => f.type.startsWith('image/') || f.type === 'application/pdf' || f.type.startsWith('video/'));
    if (!list.length) return;
    setBusy(true);
    setError(null);
    const newUrls: string[] = [];
    for (const file of list) {
      try {
        const dataUrl = isImageFile(file) ? await toWebp(file) : await fileToDataUrl(file);
        const r = await adminApi.uploadMedia(file.name, dataUrl);
        newUrls.push(r.url);
      } catch (e: any) {
        setError(`« ${file.name} » : ${e.message || 'échec'}`);
      }
    }
    setBusy(false);
    load();
    // Présélectionne les nouveaux imports.
    setSel((s) => (multiple ? [...s, ...newUrls] : newUrls.slice(-1)));
    if (inputRef.current) inputRef.current.value = '';
  };

  if (!open) return null;

  const chip = (id: Source, label: string) => (
    <button
      onClick={() => setSource(id)}
      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition ${source === id ? 'bg-brand-dark text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
    >
      {label}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-5xl max-h-[88dvh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* En-tête */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <ImagePlus size={20} className="text-brand-cyan" />
          <h2 className="font-bold uppercase tracking-tight text-brand-dark">{title || (multiple ? 'Choisir des photos' : 'Choisir une photo')}</h2>
          <button onClick={onClose} className="ml-auto p-2 text-gray-400 hover:text-brand-dark transition"><X size={20} /></button>
        </div>

        {/* Barre outils : recherche + filtres + importer */}
        <div className="flex flex-wrap items-center gap-3 px-5 py-3 border-b border-gray-100">
          <div className="relative flex-1 min-w-[200px]">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              autoFocus
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Rechercher une image…"
              className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-3 py-2.5 text-sm focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition"
            />
          </div>
          <div className="flex gap-1.5">{chip('all', 'Tout')}{chip('uploads', 'Mes médias')}{chip('site', 'Site')}</div>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={busy}
            className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark px-4 py-2.5 rounded-xl text-sm font-bold hover:brightness-110 disabled:opacity-50 transition"
          >
            {busy ? <Loader2 size={16} className="animate-spin" /> : <UploadCloud size={16} />} Importer
          </button>
          <input ref={inputRef} type="file" accept="image/*,application/pdf,video/mp4,video/webm" multiple hidden onChange={(e) => e.target.files && handleFiles(e.target.files)} />
        </div>

        {/* Grille */}
        <div
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFiles(e.dataTransfer.files); }}
          className={`flex-1 overflow-y-auto p-5 ${dragOver ? 'bg-brand-cyan/5' : ''}`}
        >
          {error && <p className="text-red-600 text-sm font-medium mb-3">{error}</p>}
          {!items && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}
          {items && filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400 text-sm">
              {q ? 'Aucune image ne correspond.' : 'Aucune image. Clique sur « Importer » pour en ajouter.'}
            </div>
          )}
          {filtered.length > 0 && (
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {filtered.map((f) => {
                const active = sel.includes(f.url);
                return (
                  <button
                    key={`${f.source}:${f.name}`}
                    onClick={() => toggle(f.url)}
                    onDoubleClick={() => confirm([f.url])}
                    className={`group relative rounded-xl overflow-hidden border-2 transition text-left ${active ? 'border-brand-cyan ring-2 ring-brand-cyan/30' : 'border-transparent hover:border-gray-300'}`}
                    title={f.name}
                  >
                    <div className="aspect-square bg-gray-100 overflow-hidden flex items-center justify-center">
                      {f.type === 'pdf' ? <div className="flex flex-col items-center text-red-500 gap-1"><FileText size={22} /><span className="text-[9px] font-bold">PDF</span></div>
                        : f.type === 'video' ? <video src={f.url} className="w-full h-full object-cover" muted />
                        : <img src={f.url} alt={f.alt || f.name} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover" />}
                    </div>
                    {active && (
                      <span className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-brand-cyan text-brand-dark flex items-center justify-center shadow">
                        <Check size={13} strokeWidth={3} />
                      </span>
                    )}
                    <span className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 to-transparent px-2 py-1.5">
                      <span className="block text-[10px] text-white/90 truncate">{f.name}</span>
                      <span className="block text-[9px] text-white/60">{fmtSize(f.size)}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Pied : confirmation */}
        <div className="flex items-center justify-between gap-4 px-5 py-3.5 border-t border-gray-100 bg-gray-50">
          <p className="text-xs text-gray-500">
            {multiple ? `${sel.length} sélectionnée(s)` : 'Astuce : double-clic = sélection directe'}
          </p>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-200 transition">Annuler</button>
            <button
              onClick={() => confirm()}
              disabled={!sel.length}
              className="inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-40 transition"
            >
              {multiple ? `Ajouter la sélection${sel.length ? ` (${sel.length})` : ''}` : 'Choisir'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
