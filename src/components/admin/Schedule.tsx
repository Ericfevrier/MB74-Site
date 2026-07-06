import React from 'react';
import { CalendarClock } from 'lucide-react';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1';

type Sched = { status?: string; publishAt?: string; unpublishAt?: string };

/** État de planification d'un contenu (au-delà du simple brouillon/publié). */
export function scheduleState(x: Sched): 'scheduled' | 'expired' | null {
  const now = Date.now();
  if (x.publishAt && new Date(x.publishAt).getTime() > now) return 'scheduled';
  if (x.unpublishAt && new Date(x.unpublishAt).getTime() <= now) return 'expired';
  return null;
}

export function ScheduleBadge({ item }: { item: Sched }) {
  const s = scheduleState(item);
  if (s === 'scheduled') return <span className="text-[10px] font-bold uppercase bg-violet-100 text-violet-700 px-2 py-1 rounded">Planifié</span>;
  if (s === 'expired') return <span className="text-[10px] font-bold uppercase bg-gray-200 text-gray-500 px-2 py-1 rounded">Expiré</span>;
  return null;
}

/** Deux champs date/heure : mise en ligne différée + retrait automatique. */
export function ScheduleFields({
  publishAt,
  unpublishAt,
  onChange,
}: {
  publishAt?: string;
  unpublishAt?: string;
  onChange: (patch: { publishAt?: string; unpublishAt?: string }) => void;
}) {
  return (
    <div className="border border-gray-200 rounded-2xl bg-white p-5">
      <p className="font-bold text-sm text-brand-dark flex items-center gap-2 mb-1"><CalendarClock size={15} className="text-brand-cyan" /> Planification</p>
      <p className="text-xs text-gray-400 mb-4">Laisse vide pour publier immédiatement (selon le statut). La mise en ligne/retrait est automatique aux dates choisies.</p>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label className={LABEL}>Mettre en ligne le</label>
          <input type="datetime-local" className={INPUT} value={publishAt || ''} onChange={(e) => onChange({ publishAt: e.target.value || undefined })} />
        </div>
        <div>
          <label className={LABEL}>Retirer automatiquement le</label>
          <input type="datetime-local" className={INPUT} value={unpublishAt || ''} onChange={(e) => onChange({ unpublishAt: e.target.value || undefined })} />
        </div>
      </div>
    </div>
  );
}
