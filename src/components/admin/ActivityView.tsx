import React, { useEffect, useState } from 'react';
import { Loader2, RefreshCw, Plus, Pencil, Trash2, Move } from 'lucide-react';
import { adminApi, type ActivityEntry } from '../../lib/adminApi';

const ENTITY_LABEL: Record<string, string> = {
  'used-boats': 'Occasion', blog: 'Article', models: 'Modèle', brands: 'Marque',
  cities: 'Ville', team: 'Équipe', media: 'Média', settings: 'Réglages', users: 'Utilisateur', messages: 'Message',
};

function actionMeta(action: string, path: string) {
  if (/reorder/.test(path)) return { Icon: Move, color: 'text-violet-600 bg-violet-100', verb: 'Réordonné' };
  if (action === 'POST') return { Icon: Plus, color: 'text-emerald-600 bg-emerald-100', verb: 'Créé' };
  if (action === 'PUT' || action === 'PATCH') return { Icon: Pencil, color: 'text-sky-600 bg-sky-100', verb: 'Modifié' };
  if (action === 'DELETE') return { Icon: Trash2, color: 'text-red-600 bg-red-100', verb: 'Supprimé' };
  return { Icon: Pencil, color: 'text-gray-500 bg-gray-100', verb: action };
}

function timeAgo(iso: string) {
  const d = new Date(iso).getTime();
  const s = Math.floor((Date.now() - d) / 1000);
  if (s < 60) return "à l'instant";
  if (s < 3600) return `il y a ${Math.floor(s / 60)} min`;
  if (s < 86400) return `il y a ${Math.floor(s / 3600)} h`;
  return new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
}

export function ActivityView() {
  const [rows, setRows] = useState<ActivityEntry[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = () => {
    setError(null);
    adminApi.listActivity().then((r) => setRows(r.activity)).catch((e) => setError(e.message));
  };
  useEffect(load, []);

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-1">
        <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark">Journal d'activité</h1>
        <button onClick={load} className="inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-dark transition"><RefreshCw size={15} /> Actualiser</button>
      </div>
      <p className="text-gray-500 text-sm mb-6">Les 200 dernières actions effectuées dans le back-office (création, modification, suppression…).</p>

      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
      {!rows && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}
      {rows && rows.length === 0 && <p className="text-gray-400 text-sm bg-white border border-dashed border-gray-300 rounded-2xl p-8 text-center">Aucune activité enregistrée pour l'instant.</p>}

      {rows && rows.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {rows.map((r) => {
            const { Icon, color, verb } = actionMeta(r.action, r.detail || '');
            return (
              <div key={r.id} className="flex items-center gap-3 p-3.5">
                <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${color}`}><Icon size={15} /></span>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-brand-dark truncate">
                    <span className="font-bold">{verb}</span> {ENTITY_LABEL[r.entity] || r.entity}{r.entity_id ? ` #${r.entity_id}` : ''}
                  </p>
                  <p className="text-xs text-gray-400 truncate">par {r.username}</p>
                </div>
                <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(r.created_at)}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
