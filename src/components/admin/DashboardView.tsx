import React, { useEffect, useState } from 'react';
import { Ship, Tag, CheckCircle2, Inbox, Loader2, ArrowRight } from 'lucide-react';
import { adminApi } from '../../lib/adminApi';
import type { SectionId } from './AdminApp';

interface Stats {
  total: number;
  available: number;
  sold: number;
  messages: number;
}

export function DashboardView({ onGo, unread }: { onGo: (id: SectionId) => void; unread: number }) {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    Promise.all([
      adminApi.listBoats().catch(() => ({ boats: [] as any[] })),
      adminApi.listMessages().catch(() => ({ messages: [] as any[] })),
    ]).then(([b, m]) =>
      setStats({
        total: b.boats.length,
        available: b.boats.filter((x: any) => !x.sold).length,
        sold: b.boats.filter((x: any) => x.sold).length,
        messages: m.messages.length,
      }),
    );
  }, []);

  const cards = [
    { label: 'Occasions en ligne', value: stats?.available, icon: <Tag size={20} />, go: 'occasions' as const },
    { label: 'Bateaux vendus', value: stats?.sold, icon: <CheckCircle2 size={20} />, go: 'occasions' as const },
    { label: 'Total occasions', value: stats?.total, icon: <Ship size={20} />, go: 'occasions' as const },
    { label: 'Messages non lus', value: unread, icon: <Inbox size={20} />, go: 'messages' as const, highlight: unread > 0 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold uppercase tracking-tight text-brand-dark mb-1">Tableau de bord</h1>
      <p className="text-gray-500 mb-8">Aperçu rapide de ton site Motor Boat 74.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <button
            key={c.label}
            onClick={() => onGo(c.go)}
            className={`text-left bg-white rounded-2xl border p-5 hover:-translate-y-0.5 hover:shadow-md transition ${
              c.highlight ? 'border-brand-cyan ring-2 ring-brand-cyan/20' : 'border-gray-200'
            }`}
          >
            <span className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-4">{c.icon}</span>
            <div className="text-3xl font-bold text-brand-dark tabular-nums">
              {stats || c.label === 'Messages non lus' ? (c.value ?? 0) : <Loader2 size={20} className="animate-spin text-gray-300" />}
            </div>
            <div className="text-xs font-bold uppercase tracking-widest text-gray-500 mt-1">{c.label}</div>
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <button onClick={() => onGo('occasions')} className="flex items-center justify-between gap-4 bg-brand-dark text-white rounded-2xl p-6 hover:bg-brand-cyan hover:text-brand-dark transition group">
          <div>
            <p className="font-bold uppercase tracking-tight">Gérer les occasions</p>
            <p className="text-sm opacity-70">Ajouter, modifier ou retirer un bateau</p>
          </div>
          <ArrowRight className="group-hover:translate-x-1 transition" />
        </button>
        <button onClick={() => onGo('messages')} className="flex items-center justify-between gap-4 bg-white border border-gray-200 text-brand-dark rounded-2xl p-6 hover:border-brand-cyan transition group">
          <div>
            <p className="font-bold uppercase tracking-tight">Voir les messages</p>
            <p className="text-sm text-gray-500">{unread > 0 ? `${unread} non lu${unread > 1 ? 's' : ''}` : 'Boîte de réception'}</p>
          </div>
          <ArrowRight className="text-brand-cyan group-hover:translate-x-1 transition" />
        </button>
      </div>
    </div>
  );
}
