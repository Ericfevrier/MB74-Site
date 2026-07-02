import React, { useEffect, useState } from 'react';
import { Tag, FileText, Mail, Users, Plus, Pencil, Settings, ExternalLink, ArrowUpRight, Loader2, RefreshCw } from 'lucide-react';
import { adminApi, type AdminBoat, type AdminArticle, type ContactMessage } from '../../lib/adminApi';
import type { SectionId } from './AdminApp';

interface Data {
  boats: AdminBoat[];
  articles: AdminArticle[];
  messages: ContactMessage[];
}

function timeAgo(iso?: string) {
  if (!iso) return '';
  const d = new Date(iso.replace(' ', 'T')).getTime();
  if (isNaN(d)) return '';
  const s = Math.floor((Date.now() - d) / 1000);
  if (s < 60) return "à l'instant";
  const m = Math.floor(s / 60);
  if (m < 60) return `il y a ${m} min`;
  const h = Math.floor(m / 60);
  if (h < 24) return `il y a ${h} h`;
  const j = Math.floor(h / 24);
  if (j < 7) return `il y a ${j} j`;
  return `il y a ${Math.floor(j / 7)} sem.`;
}

export function DashboardView({ onGo, unread, username }: { onGo: (id: SectionId) => void; unread: number; username: string }) {
  const [data, setData] = useState<Data | null>(null);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    Promise.all([
      adminApi.listBoats().catch(() => ({ boats: [] as AdminBoat[] })),
      adminApi.listArticles().catch(() => ({ articles: [] as AdminArticle[] })),
      adminApi.listMessages().catch(() => ({ messages: [] as ContactMessage[] })),
    ]).then(([b, a, m]) => {
      setData({ boats: b.boats, articles: a.articles, messages: m.messages });
      setLoading(false);
    });
  };
  useEffect(load, []);

  const available = data ? data.boats.filter((b) => !b.sold).length : undefined;
  const articlesCount = data ? data.articles.length : undefined;
  const messagesCount = data ? data.messages.length : undefined;

  const stat = (v?: number) =>
    v === undefined ? <Loader2 size={20} className="animate-spin text-gray-300" /> : <span>{v}</span>;

  const cards = [
    { label: 'Occasions en ligne', value: available, icon: <Tag size={20} />, tint: 'bg-sky-50 text-sky-600', go: 'occasions' as const },
    { label: 'Articles de blog', value: articlesCount, icon: <FileText size={20} />, tint: 'bg-violet-50 text-violet-600', go: 'blog' as const },
    { label: 'Messages reçus', value: messagesCount, icon: <Mail size={20} />, tint: 'bg-emerald-50 text-emerald-600', go: 'messages' as const, sub: unread > 0 ? `${unread} non lu${unread > 1 ? 's' : ''}` : 'à jour' },
    { label: 'Visiteurs ce mois', value: undefined, icon: <Users size={20} />, tint: 'bg-amber-50 text-amber-600', dash: true, sub: 'via Google Analytics' },
  ];

  const actions = [
    { label: 'Nouvelle occasion', icon: <Plus size={18} />, onClick: () => onGo('occasions') },
    { label: 'Nouvel article', icon: <Pencil size={18} />, onClick: () => onGo('blog') },
    { label: 'Réglages', icon: <Settings size={18} />, onClick: () => onGo('settings') },
    { label: 'Voir le site', icon: <ExternalLink size={18} />, href: '/' as const },
  ];

  // Activité récente : articles publiés + messages, triés par date.
  const activity = data
    ? [
        ...data.articles.map((a) => ({ kind: 'article' as const, title: a.title, date: a.date, when: a.date })),
        ...data.messages.map((m) => ({ kind: 'message' as const, title: m.nom || '(sans nom)', date: m.created_at, when: m.created_at })),
      ]
        .filter((x) => x.when)
        .sort((a, b) => (b.when! > a.when! ? 1 : -1))
        .slice(0, 6)
    : [];

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-brand-dark">Bonjour <span className="align-middle">👋</span></h1>
          <p className="text-gray-500 mt-1">Voici un aperçu de votre site aujourd'hui.</p>
        </div>
        <button onClick={load} className="flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-brand-dark transition">
          <RefreshCw size={15} className={loading ? 'animate-spin' : ''} /> Actualiser
        </button>
      </div>

      {/* Cartes stats */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => (
          <button
            key={c.label}
            onClick={() => c.go && onGo(c.go)}
            className="text-left bg-white rounded-2xl border border-gray-200 p-5 hover:-translate-y-0.5 hover:shadow-md transition disabled:cursor-default"
            disabled={!c.go}
          >
            <span className={`w-11 h-11 rounded-xl flex items-center justify-center mb-4 ${c.tint}`}>{c.icon}</span>
            <div className="text-3xl font-bold text-brand-dark tabular-nums min-h-[2.25rem] flex items-center">
              {c.dash ? '—' : stat(c.value)}
            </div>
            <div className="text-[11px] font-bold uppercase tracking-widest text-gray-500 mt-1">{c.label}</div>
            {c.sub && <div className="text-xs text-gray-400 mt-1">{c.sub}</div>}
          </button>
        ))}
      </div>

      {/* Actions rapides */}
      <p className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-3">Actions rapides</p>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {actions.map((a) =>
          a.href ? (
            <a key={a.label} href={a.href} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-2xl p-5 hover:border-brand-cyan transition group">
              <span className="flex items-center gap-3 font-bold text-brand-dark text-sm">
                <span className="w-9 h-9 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-brand-cyan group-hover:text-brand-dark transition">{a.icon}</span>
                {a.label}
              </span>
              <ArrowUpRight size={16} className="text-gray-400 group-hover:text-brand-cyan transition" />
            </a>
          ) : (
            <button key={a.label} onClick={a.onClick} className="flex items-center justify-between gap-3 bg-white border border-gray-200 rounded-2xl p-5 hover:border-brand-cyan transition group text-left">
              <span className="flex items-center gap-3 font-bold text-brand-dark text-sm">
                <span className="w-9 h-9 rounded-xl bg-gray-100 text-gray-500 flex items-center justify-center group-hover:bg-brand-cyan group-hover:text-brand-dark transition">{a.icon}</span>
                {a.label}
              </span>
              <ArrowUpRight size={16} className="text-gray-400 group-hover:text-brand-cyan transition" />
            </button>
          ),
        )}
      </div>

      {/* Activité + derniers messages */}
      <div className="grid lg:grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-bold uppercase tracking-tight text-brand-dark mb-4 text-sm">Activité récente</h2>
          {!data ? (
            <div className="py-8 flex justify-center text-gray-300"><Loader2 className="animate-spin" /></div>
          ) : activity.length === 0 ? (
            <p className="text-sm text-gray-400 py-4">Rien pour l'instant.</p>
          ) : (
            <ul className="space-y-3">
              {activity.map((x, i) => (
                <li key={i} className="flex items-center gap-3">
                  <span className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${x.kind === 'article' ? 'bg-violet-50 text-violet-600' : 'bg-emerald-50 text-emerald-600'}`}>
                    {x.kind === 'article' ? <FileText size={16} /> : <Mail size={16} />}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark truncate">{x.title}</p>
                    <p className="text-xs text-gray-400">{x.kind === 'article' ? 'Article' : 'Message'}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(x.when)}</span>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold uppercase tracking-tight text-brand-dark text-sm">Derniers messages</h2>
            {unread > 0 && <span className="text-[10px] font-bold uppercase bg-brand-cyan text-brand-dark px-2 py-1 rounded-full">{unread} nouveau{unread > 1 ? 'x' : ''}</span>}
          </div>
          {!data ? (
            <div className="py-8 flex justify-center text-gray-300"><Loader2 className="animate-spin" /></div>
          ) : data.messages.length === 0 ? (
            <p className="text-sm text-gray-400 py-4">Aucun message.</p>
          ) : (
            <ul className="space-y-3">
              {data.messages.slice(0, 5).map((m) => (
                <li key={m.id} className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                    {(m.nom || '?').charAt(0).toUpperCase()}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-brand-dark truncate">
                      {m.nom || '(sans nom)'} {!m.is_read && <span className="ml-1 text-[9px] font-bold uppercase bg-brand-cyan/15 text-brand-cyan px-1.5 py-0.5 rounded">Nouveau</span>}
                    </p>
                    <p className="text-xs text-gray-400 truncate">{m.subject || 'Sans sujet'}</p>
                  </div>
                  <span className="text-xs text-gray-400 flex-shrink-0">{timeAgo(m.created_at)}</span>
                </li>
              ))}
            </ul>
          )}
          <button onClick={() => onGo('messages')} className="mt-4 text-xs font-bold text-brand-cyan hover:underline inline-flex items-center gap-1">
            Voir tous les messages <ArrowUpRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}
