import React, { useEffect, useState } from 'react';
import { Loader2, X, History, RotateCcw } from 'lucide-react';
import { adminApi, type VersionEntry } from '../../lib/adminApi';

function fmt(iso: string) {
  return new Date(iso).toLocaleString('fr-FR', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
}

/**
 * Modale d'historique d'un contenu : liste les versions (snapshots avant modif)
 * et permet de restaurer une version antérieure. La restauration reste réversible
 * (l'état courant est lui-même archivé avant d'être écrasé).
 */
export function VersionHistory({ open, type, id, title, onClose, onRestored }: {
  open: boolean;
  type: string;
  id: number;
  title?: string;
  onClose: () => void;
  onRestored: () => void;
}) {
  const [rows, setRows] = useState<VersionEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<number | null>(null);

  useEffect(() => {
    if (!open) return;
    setRows(null);
    setError(null);
    adminApi.listVersions(type, id).then((r) => setRows(r.versions)).catch((e) => setError(e.message));
  }, [open, type, id]);

  if (!open) return null;

  const restore = async (v: VersionEntry) => {
    if (!confirm(`Restaurer la version du ${fmt(v.created_at)} ? L'état actuel sera archivé (réversible).`)) return;
    setBusy(v.id);
    setError(null);
    try {
      await adminApi.restoreVersion(v.id);
      onRestored();
      onClose();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg max-h-[80vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100">
          <History size={19} className="text-brand-cyan" />
          <div className="flex-1 min-w-0">
            <h2 className="font-bold uppercase tracking-tight text-brand-dark text-sm truncate">Historique</h2>
            {title && <p className="text-xs text-gray-500 truncate">{title}</p>}
          </div>
          <button onClick={onClose} className="p-2 text-gray-400 hover:text-brand-dark transition"><X size={20} /></button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {error && <p className="text-red-600 text-sm font-medium mb-3">{error}</p>}
          {!rows && !error && <div className="flex justify-center py-12 text-gray-400"><Loader2 className="animate-spin" /></div>}
          {rows && rows.length === 0 && (
            <p className="text-gray-400 text-sm text-center py-10">Aucune version antérieure.<br />Une sauvegarde est créée à chaque modification.</p>
          )}
          {rows && rows.length > 0 && (
            <div className="divide-y divide-gray-100">
              {rows.map((v, i) => (
                <div key={v.id} className="flex items-center gap-3 py-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark">{fmt(v.created_at)} {i === 0 && <span className="text-[10px] font-bold uppercase bg-gray-100 text-gray-500 px-1.5 py-0.5 rounded ml-1">la plus récente</span>}</p>
                    <p className="text-xs text-gray-400">par {v.username || 'inconnu'}</p>
                  </div>
                  <button onClick={() => restore(v)} disabled={busy === v.id} className="inline-flex items-center gap-1.5 text-xs font-bold text-brand-dark hover:text-brand-cyan disabled:opacity-50 transition">
                    {busy === v.id ? <Loader2 size={14} className="animate-spin" /> : <RotateCcw size={14} />} Restaurer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
