import React, { useEffect, useState } from 'react';
import {
  Lock, LogOut, Ship, Inbox, Loader2, LayoutDashboard, Menu, X, ExternalLink,
  FileText, Settings, Users, MapPin, PanelLeftClose, PanelLeft, Anchor, Image as ImageIcon,
  ScrollText, ShieldCheck, Milestone, FileStack, ArrowLeft, Mail, KeyRound, CheckCircle2,
} from 'lucide-react';
import { adminApi } from '../../lib/adminApi';
import { OccasionsManager } from './OccasionsManager';
import { MessagesInbox } from './MessagesInbox';
import { DashboardView } from './DashboardView';
import { BlogManager } from './BlogManager';
import { TeamManager } from './TeamManager';
import { CitiesManager } from './CitiesManager';
import { BrandsManager } from './BrandsManager';
import { MediaManager } from './MediaManager';
import { SettingsManager } from './SettingsManager';
import { UsersManager } from './UsersManager';
import { ActivityView } from './ActivityView';
import { RedirectsManager } from './RedirectsManager';
import { MenusManager } from './MenusManager';
import { PagesManager } from './PagesManager';

type Auth = { state: 'loading' } | { state: 'out' } | { state: 'in'; username: string; role: string };
export type SectionId = 'dashboard' | 'occasions' | 'brands' | 'blog' | 'team' | 'cities' | 'media' | 'messages' | 'settings' | 'activity' | 'users' | 'redirects' | 'menus' | 'pages';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';

type NavItem = { id: SectionId; label: string; Icon: React.ComponentType<{ size?: number }>; superOnly?: boolean };
type NavEntry = { kind: 'item'; item: NavItem } | { kind: 'group'; label: string; items: NavItem[] };

const NAV: NavEntry[] = [
  { kind: 'item', item: { id: 'dashboard', label: 'Tableau de bord', Icon: LayoutDashboard } },
  { kind: 'item', item: { id: 'messages', label: 'Messages', Icon: Inbox } },
  {
    kind: 'group',
    label: 'Contenu',
    items: [
      { id: 'pages', label: 'Pages', Icon: FileStack },
      { id: 'occasions', label: 'Occasions', Icon: Ship },
      { id: 'brands', label: 'Marques & modèles', Icon: Anchor },
      { id: 'blog', label: 'Blog', Icon: FileText },
      { id: 'cities', label: 'Villes hivernage', Icon: MapPin },
      { id: 'team', label: 'Équipe', Icon: Users },
      { id: 'media', label: 'Médias', Icon: ImageIcon },
    ],
  },
  {
    kind: 'group',
    label: 'Structure & SEO',
    items: [
      { id: 'menus', label: 'Menus', Icon: Menu },
      { id: 'redirects', label: 'Redirections', Icon: Milestone },
      { id: 'settings', label: 'Réglages du site', Icon: Settings },
    ],
  },
  {
    kind: 'group',
    label: 'Administration',
    items: [
      { id: 'activity', label: "Journal d'activité", Icon: ScrollText },
      { id: 'users', label: 'Utilisateurs', Icon: ShieldCheck, superOnly: true },
    ],
  },
];

const AUTH_CARD = 'w-full max-w-sm bg-white rounded-3xl shadow-2xl p-8';
const AUTH_WRAP = 'min-h-dvh flex items-center justify-center bg-[#0e0e10] px-4';
const AUTH_BTN =
  'w-full bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm py-3.5 rounded-xl hover:brightness-110 disabled:opacity-50 transition flex items-center justify-center gap-2';

function AuthHeader({ icon, title, subtitle }: { icon: React.ReactNode; title: string; subtitle: string }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <span className="w-11 h-11 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center">{icon}</span>
      <div>
        <h1 className="font-bold uppercase tracking-tight text-brand-dark leading-tight">{title}</h1>
        <p className="text-xs text-gray-500">{subtitle}</p>
      </div>
    </div>
  );
}

function LoginScreen({ onIn }: { onIn: (u: string, role: string) => void }) {
  const [mode, setMode] = useState<'login' | 'forgot'>('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sent, setSent] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const r = await adminApi.login(username, password);
      onIn(r.username, r.role || 'admin');
    } catch (err: any) {
      setError(err.message || 'Connexion impossible.');
    } finally {
      setLoading(false);
    }
  };

  const submitForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const r = await adminApi.forgotPassword(email.trim());
      setSent(r.message || 'Si un compte existe pour cette adresse, un e-mail vient d’être envoyé.');
    } catch (err: any) {
      setError(err.message || 'Envoi impossible. Réessayez plus tard.');
    } finally {
      setLoading(false);
    }
  };

  if (mode === 'forgot') {
    return (
      <div className={AUTH_WRAP}>
        <form onSubmit={submitForgot} className={AUTH_CARD}>
          <AuthHeader icon={<KeyRound size={20} />} title="Mot de passe oublié" subtitle="Motor Boat 74" />
          {sent ? (
            <div className="text-center">
              <CheckCircle2 size={40} className="text-green-500 mx-auto mb-4" />
              <p className="text-gray-600 text-sm leading-relaxed mb-6">{sent}</p>
              <button type="button" onClick={() => { setMode('login'); setSent(null); }} className={AUTH_BTN}>
                Retour à la connexion
              </button>
            </div>
          ) : (
            <>
              <p className="text-gray-500 text-sm leading-relaxed mb-5">
                Saisissez l’adresse e-mail <strong>@motorboat74.com</strong> de votre compte. Vous recevrez un lien pour choisir un nouveau mot de passe.
              </p>
              <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Adresse e-mail</label>
              <input type="email" className={`${INPUT} mb-6`} value={email} onChange={(e) => setEmail(e.target.value)} autoFocus autoComplete="email" placeholder="prenom@motorboat74.com" />
              {error && <p className="text-red-600 text-sm font-medium mb-4 text-center">{error}</p>}
              <button type="submit" disabled={loading} className={AUTH_BTN}>
                {loading ? <Loader2 size={16} className="animate-spin" /> : <Mail size={16} />} Envoyer le lien
              </button>
              <button type="button" onClick={() => { setMode('login'); setError(null); }} className="w-full mt-3 text-gray-500 hover:text-brand-dark text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-1.5 transition">
                <ArrowLeft size={13} /> Retour
              </button>
            </>
          )}
        </form>
      </div>
    );
  }

  return (
    <div className={AUTH_WRAP}>
      <form onSubmit={submit} className={AUTH_CARD}>
        <AuthHeader icon={<Lock size={20} />} title="Administration" subtitle="Motor Boat 74" />
        <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Identifiant</label>
        <input className={`${INPUT} mb-4`} value={username} onChange={(e) => setUsername(e.target.value)} autoFocus autoComplete="username" />
        <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Mot de passe</label>
        <input type="password" className={`${INPUT} mb-6`} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
        {error && <p className="text-red-600 text-sm font-medium mb-4 text-center">{error}</p>}
        <button type="submit" disabled={loading} className={AUTH_BTN}>
          {loading ? <Loader2 size={16} className="animate-spin" /> : null} Se connecter
        </button>
        <button type="button" onClick={() => { setMode('forgot'); setError(null); }} className="w-full mt-4 text-gray-500 hover:text-brand-dark text-xs font-semibold uppercase tracking-widest transition">
          Mot de passe oublié ?
        </button>
      </form>
    </div>
  );
}

function ResetScreen({ token, onDone }: { token: string; onDone: () => void }) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) { setError('Le mot de passe doit contenir au moins 8 caractères.'); return; }
    if (password !== confirm) { setError('Les deux mots de passe ne correspondent pas.'); return; }
    setLoading(true);
    try {
      await adminApi.resetPassword(token, password);
      setDone(true);
    } catch (err: any) {
      setError(err.message || 'Réinitialisation impossible.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={AUTH_WRAP}>
      <form onSubmit={submit} className={AUTH_CARD}>
        <AuthHeader icon={<KeyRound size={20} />} title="Nouveau mot de passe" subtitle="Motor Boat 74" />
        {done ? (
          <div className="text-center">
            <CheckCircle2 size={40} className="text-green-500 mx-auto mb-4" />
            <p className="text-gray-600 text-sm leading-relaxed mb-6">Votre mot de passe a été mis à jour. Vous pouvez maintenant vous connecter.</p>
            <button type="button" onClick={onDone} className={AUTH_BTN}>Aller à la connexion</button>
          </div>
        ) : (
          <>
            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Nouveau mot de passe</label>
            <input type="password" className={`${INPUT} mb-4`} value={password} onChange={(e) => setPassword(e.target.value)} autoFocus autoComplete="new-password" />
            <label className="block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-2">Confirmer</label>
            <input type="password" className={`${INPUT} mb-6`} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="new-password" />
            {error && <p className="text-red-600 text-sm font-medium mb-4 text-center">{error}</p>}
            <button type="submit" disabled={loading} className={AUTH_BTN}>
              {loading ? <Loader2 size={16} className="animate-spin" /> : null} Enregistrer
            </button>
          </>
        )}
      </form>
    </div>
  );
}

export function AdminApp() {
  const [auth, setAuth] = useState<Auth>({ state: 'loading' });
  const [section, setSection] = useState<SectionId>('dashboard');
  const [navOpen, setNavOpen] = useState(false); // drawer mobile
  const [collapsed, setCollapsed] = useState(false); // repli desktop
  const [unread, setUnread] = useState(0);
  const [resetToken, setResetToken] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const t = new URLSearchParams(window.location.search).get('reset');
      if (t) setResetToken(t);
    }
    adminApi
      .me()
      .then((r) => setAuth(r.ok && r.username ? { state: 'in', username: r.username, role: r.role || 'admin' } : { state: 'out' }))
      .catch(() => setAuth({ state: 'out' }));
  }, []);

  // Lien « mot de passe oublié » ouvert (?reset=…) → écran dédié, avant toute auth.
  if (resetToken) {
    return (
      <ResetScreen
        token={resetToken}
        onDone={() => {
          if (typeof window !== 'undefined') window.history.replaceState({}, '', '/admin');
          setResetToken(null);
          setAuth({ state: 'out' });
        }}
      />
    );
  }

  const refreshUnread = React.useCallback(() => {
    adminApi.listMessages().then((r) => setUnread(r.messages.filter((m) => !m.is_read).length)).catch(() => {});
  }, []);
  useEffect(() => {
    if (auth.state === 'in') refreshUnread();
  }, [auth.state, refreshUnread]);

  if (auth.state === 'loading') {
    return <div className="min-h-dvh flex items-center justify-center bg-[#0e0e10] text-white"><Loader2 className="animate-spin" /></div>;
  }
  if (auth.state === 'out') return <LoginScreen onIn={(u, role) => setAuth({ state: 'in', username: u, role })} />;

  const logout = async () => {
    await adminApi.logout().catch(() => {});
    setAuth({ state: 'out' });
  };
  const go = (id: SectionId) => {
    setSection(id);
    setNavOpen(false);
  };

  const label = (id: SectionId) => NAV.flatMap((e) => (e.kind === 'group' ? e.items : [e.item])).find((i) => i.id === id)?.label;

  const Item = ({ it }: { it: NavItem }) => {
    const active = section === it.id;
    return (
      <button
        onClick={() => go(it.id)}
        title={collapsed ? it.label : undefined}
        className={`w-full flex items-center gap-3 rounded-xl text-sm font-semibold transition ${collapsed ? 'justify-center px-0 py-3' : 'px-3 py-2.5'} ${
          active ? 'bg-white/10 text-white ring-1 ring-white/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
        }`}
      >
        <it.Icon size={18} />
        {!collapsed && <span className="flex-1 text-left truncate">{it.label}</span>}
        {!collapsed && it.id === 'messages' && unread > 0 && (
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-brand-cyan text-brand-dark">{unread}</span>
        )}
        {collapsed && it.id === 'messages' && unread > 0 && <span className="w-2 h-2 rounded-full bg-brand-cyan" />}
      </button>
    );
  };

  const Sidebar = (
    <aside className={`${collapsed ? 'w-20' : 'w-64'} flex-shrink-0 bg-[#0e0e10] text-white flex flex-col h-full transition-all`}>
      <div className="flex items-center gap-2.5 px-4 h-16 border-b border-white/10">
        <span className="w-9 h-9 rounded-xl bg-brand-cyan text-brand-dark flex items-center justify-center font-extrabold flex-shrink-0">MB</span>
        {!collapsed && (
          <div className="leading-tight flex-1 min-w-0">
            <p className="font-bold uppercase tracking-tight text-sm truncate">Motor Boat 74</p>
            <p className="text-[10px] text-gray-500 tracking-widest">CMS</p>
          </div>
        )}
        <button className="hidden lg:block text-gray-500 hover:text-white" onClick={() => setCollapsed((c) => !c)} aria-label="Replier le menu">
          {collapsed ? <PanelLeft size={18} /> : <PanelLeftClose size={18} />}
        </button>
        <button className="lg:hidden text-gray-400 hover:text-white ml-auto" onClick={() => setNavOpen(false)} aria-label="Fermer"><X size={20} /></button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {NAV.map((e, i) =>
          e.kind === 'item' ? (
            <Item key={i} it={e.item} />
          ) : (
            <div key={i} className="pt-4">
              {!collapsed && <p className="px-3 pb-2 text-[10px] font-bold uppercase tracking-widest text-gray-600">{e.label}</p>}
              {collapsed && <div className="mx-3 mb-2 border-t border-white/10" />}
              <div className="space-y-1">{e.items.filter((it) => !it.superOnly || auth.role === 'super-admin').map((it) => <Item key={it.id} it={it} />)}</div>
            </div>
          ),
        )}
      </nav>

      <div className="p-3 border-t border-white/10 space-y-1">
        <a href="/" target="_blank" rel="noreferrer" title="Voir le site" className={`flex items-center gap-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition ${collapsed ? 'justify-center py-2.5' : 'px-3 py-2.5'}`}>
          <ExternalLink size={16} /> {!collapsed && 'Voir le site'}
        </a>
        <button onClick={logout} title="Déconnexion" className={`w-full flex items-center gap-3 rounded-xl text-sm font-bold text-red-400 hover:bg-red-500/10 transition ${collapsed ? 'justify-center py-2.5' : 'px-3 py-2.5'}`}>
          <LogOut size={16} /> {!collapsed && 'Déconnexion'}
        </button>
        {!collapsed && <p className="text-center text-[10px] text-gray-600 pt-1 truncate">Connecté : {auth.username}</p>}
      </div>
    </aside>
  );

  return (
    <div className="min-h-dvh bg-brand-light flex">
      <div className="hidden lg:block fixed inset-y-0 left-0 z-30">{Sidebar}</div>

      {navOpen && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="fixed inset-0 bg-black/50" onClick={() => setNavOpen(false)} />
          <div className="relative z-50 w-64">{Sidebar}</div>
        </div>
      )}

      <div className={`flex-1 min-w-0 transition-all ${collapsed ? 'lg:ml-20' : 'lg:ml-64'}`}>
        <div className="lg:hidden sticky top-0 z-20 bg-[#0e0e10] text-white flex items-center gap-3 px-4 h-14">
          <button onClick={() => setNavOpen(true)} aria-label="Menu"><Menu size={22} /></button>
          <span className="font-bold uppercase tracking-tight text-sm">{label(section)}</span>
        </div>

        <main className="p-4 sm:p-6 lg:p-10 max-w-[1500px]">
          {section === 'dashboard' && <DashboardView onGo={go} unread={unread} username={auth.username} />}
          {section === 'occasions' && <OccasionsManager />}
          {section === 'brands' && <BrandsManager />}
          {section === 'blog' && <BlogManager />}
          {section === 'team' && <TeamManager />}
          {section === 'cities' && <CitiesManager />}
          {section === 'media' && <MediaManager />}
          {section === 'activity' && <ActivityView />}
          {section === 'pages' && <PagesManager />}
          {section === 'menus' && <MenusManager />}
          {section === 'redirects' && <RedirectsManager />}
          {section === 'users' && auth.role === 'super-admin' && <UsersManager />}
          {section === 'messages' && <MessagesInbox onChange={refreshUnread} />}
          {section === 'settings' && <SettingsManager />}
        </main>
      </div>
    </div>
  );
}
