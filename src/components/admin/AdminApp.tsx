import React, { useEffect, useState } from 'react';
import { Lock, LogOut, Ship, Inbox, Loader2, LayoutDashboard, Menu, X, ExternalLink, FileText, Settings, Users, MapPin } from 'lucide-react';
import { adminApi } from '../../lib/adminApi';
import { OccasionsManager } from './OccasionsManager';
import { MessagesInbox } from './MessagesInbox';
import { DashboardView } from './DashboardView';
import { BlogManager } from './BlogManager';
import { TeamManager } from './TeamManager';
import { CitiesManager } from './CitiesManager';
import { SettingsManager } from './SettingsManager';

type Auth = { state: 'loading' } | { state: 'out' } | { state: 'in'; username: string };

const INPUT =
  'w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';

/* ------------------------------------------------------------------ */
/*  Écran de connexion                                                */
/* ------------------------------------------------------------------ */
function LoginScreen({ onIn }: { onIn: (u: string) => void }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const r = await adminApi.login(username, password);
      onIn(r.username);
    } catch (err: any) {
      setError(err.message || 'Connexion impossible.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-brand-dark px-4">
      <form onSubmit={submit} className="w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8">
        <div className="flex items-center gap-3 mb-8">
          <span className="w-11 h-11 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center">
            <Lock size={20} />
          </span>
          <div>
            <h1 className="font-bold uppercase tracking-tight text-brand-dark leading-tight">Administration</h1>
            <p className="text-xs text-gray-500">Motor Boat 74</p>
          </div>
        </div>
        <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Identifiant</label>
        <input className={`${INPUT} mb-4`} value={username} onChange={(e) => setUsername(e.target.value)} autoFocus autoComplete="username" />
        <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Mot de passe</label>
        <input type="password" className={`${INPUT} mb-6`} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        {error && <p className="text-red-600 text-sm font-medium mb-4 text-center">{error}</p>}
        <button type="submit" disabled={loading} className="w-full bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm py-3.5 rounded-xl hover:brightness-110 disabled:opacity-50 transition flex items-center justify-center gap-2">
          {loading ? <Loader2 size={16} className="animate-spin" /> : null} Se connecter
        </button>
      </form>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sections du back-office (registre extensible)                     */
/* ------------------------------------------------------------------ */
export type SectionId = 'dashboard' | 'occasions' | 'blog' | 'team' | 'cities' | 'messages' | 'settings';

interface SectionDef {
  id: SectionId;
  label: string;
  icon: React.ReactNode;
}

const SECTIONS: SectionDef[] = [
  { id: 'dashboard', label: 'Tableau de bord', icon: <LayoutDashboard size={18} /> },
  { id: 'occasions', label: 'Occasions', icon: <Ship size={18} /> },
  { id: 'blog', label: 'Blog', icon: <FileText size={18} /> },
  { id: 'team', label: 'Équipe', icon: <Users size={18} /> },
  { id: 'cities', label: 'Villes hivernage', icon: <MapPin size={18} /> },
  { id: 'messages', label: 'Messages', icon: <Inbox size={18} /> },
  { id: 'settings', label: 'Réglages', icon: <Settings size={18} /> },
];

/* ------------------------------------------------------------------ */
/*  Application admin                                                 */
/* ------------------------------------------------------------------ */
export function AdminApp() {
  const [auth, setAuth] = useState<Auth>({ state: 'loading' });
  const [section, setSection] = useState<SectionId>('dashboard');
  const [navOpen, setNavOpen] = useState(false);
  const [unread, setUnread] = useState(0);

  useEffect(() => {
    adminApi
      .me()
      .then((r) => setAuth(r.ok && r.username ? { state: 'in', username: r.username } : { state: 'out' }))
      .catch(() => setAuth({ state: 'out' }));
  }, []);

  // Compteur de messages non lus pour le badge de la sidebar.
  const refreshUnread = React.useCallback(() => {
    adminApi
      .listMessages()
      .then((r) => setUnread(r.messages.filter((m) => !m.is_read).length))
      .catch(() => {});
  }, []);
  useEffect(() => {
    if (auth.state === 'in') refreshUnread();
  }, [auth.state, refreshUnread]);

  if (auth.state === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark text-white">
        <Loader2 className="animate-spin" />
      </div>
    );
  }
  if (auth.state === 'out') return <LoginScreen onIn={(u) => setAuth({ state: 'in', username: u })} />;

  const logout = async () => {
    await adminApi.logout().catch(() => {});
    setAuth({ state: 'out' });
  };

  const go = (id: SectionId) => {
    setSection(id);
    setNavOpen(false);
  };

  const NavItem = ({ s }: { s: SectionDef }) => (
    <button
      onClick={() => go(s.id)}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-bold transition ${
        section === s.id ? 'bg-brand-cyan text-brand-dark' : 'text-gray-300 hover:text-white hover:bg-white/10'
      }`}
    >
      {s.icon}
      <span className="flex-1 text-left">{s.label}</span>
      {s.id === 'messages' && unread > 0 && (
        <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${section === s.id ? 'bg-brand-dark text-white' : 'bg-brand-cyan text-brand-dark'}`}>
          {unread}
        </span>
      )}
    </button>
  );

  const Sidebar = (
    <aside className="w-64 flex-shrink-0 bg-brand-dark text-white flex flex-col h-full">
      <div className="flex items-center gap-3 px-5 h-16 border-b border-white/10">
        <span className="w-9 h-9 rounded-xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center">
          <Ship size={18} />
        </span>
        <div className="leading-tight">
          <p className="font-bold uppercase tracking-tight text-sm">MB74 Admin</p>
          <p className="text-[10px] text-gray-400">Motor Boat 74</p>
        </div>
        <button className="ml-auto lg:hidden text-gray-400 hover:text-white" onClick={() => setNavOpen(false)} aria-label="Fermer le menu">
          <X size={20} />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {SECTIONS.map((s) => (
          <NavItem key={s.id} s={s} />
        ))}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <a href="/" target="_blank" rel="noreferrer" className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/10 transition">
          <ExternalLink size={16} /> Voir le site
        </a>
        <div className="flex items-center justify-between px-4 py-2">
          <span className="text-xs text-gray-400 truncate">{auth.username}</span>
          <button onClick={logout} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-300 hover:text-brand-cyan transition">
            <LogOut size={15} /> Quitter
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="min-h-screen bg-brand-light flex">
      {/* Sidebar desktop */}
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30">{Sidebar}</div>

      {/* Sidebar mobile (drawer) */}
      {navOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setNavOpen(false)} />
          <div className="relative z-50">{Sidebar}</div>
        </div>
      )}

      {/* Contenu */}
      <div className="flex-1 lg:ml-64 min-w-0">
        {/* Barre supérieure mobile */}
        <div className="lg:hidden sticky top-0 z-20 bg-brand-dark text-white flex items-center gap-3 px-4 h-14">
          <button onClick={() => setNavOpen(true)} aria-label="Ouvrir le menu"><Menu size={22} /></button>
          <span className="font-bold uppercase tracking-tight text-sm">MB74 Admin</span>
        </div>

        <main className="p-4 sm:p-6 lg:p-8 max-w-[1400px]">
          {section === 'dashboard' && <DashboardView onGo={go} unread={unread} />}
          {section === 'occasions' && <OccasionsManager />}
          {section === 'blog' && <BlogManager />}
          {section === 'team' && <TeamManager />}
          {section === 'cities' && <CitiesManager />}
          {section === 'messages' && <MessagesInbox onChange={refreshUnread} />}
          {section === 'settings' && <SettingsManager />}
        </main>
      </div>
    </div>
  );
}
