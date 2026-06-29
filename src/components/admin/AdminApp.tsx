import React, { useEffect, useState } from 'react';
import { Lock, LogOut, Ship, Inbox, Loader2 } from 'lucide-react';
import { adminApi } from '../../lib/adminApi';
import { OccasionsManager } from './OccasionsManager';
import { MessagesInbox } from './MessagesInbox';

type Auth = { state: 'loading' } | { state: 'out' } | { state: 'in'; username: string };

const INPUT =
  'w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';

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

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm py-3.5 rounded-xl hover:brightness-110 disabled:opacity-50 transition flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 size={16} className="animate-spin" /> : null} Se connecter
        </button>
      </form>
    </div>
  );
}

export function AdminApp() {
  const [auth, setAuth] = useState<Auth>({ state: 'loading' });
  const [tab, setTab] = useState<'occasions' | 'messages'>('occasions');

  useEffect(() => {
    adminApi
      .me()
      .then((r) => setAuth(r.ok && r.username ? { state: 'in', username: r.username } : { state: 'out' }))
      .catch(() => setAuth({ state: 'out' }));
  }, []);

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

  const TabBtn = ({ id, icon, label }: { id: 'occasions' | 'messages'; icon: React.ReactNode; label: string }) => (
    <button
      onClick={() => setTab(id)}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide transition ${
        tab === id ? 'bg-brand-cyan text-brand-dark' : 'text-gray-300 hover:text-white hover:bg-white/10'
      }`}
    >
      {icon} {label}
    </button>
  );

  return (
    <div className="min-h-screen bg-brand-light">
      <header className="bg-brand-dark text-white sticky top-0 z-30">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <span className="font-bold uppercase tracking-tight">MB74 · Admin</span>
            <nav className="hidden sm:flex items-center gap-1">
              <TabBtn id="occasions" icon={<Ship size={16} />} label="Occasions" />
              <TabBtn id="messages" icon={<Inbox size={16} />} label="Messages" />
            </nav>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400 hidden sm:inline">{auth.username}</span>
            <button onClick={logout} className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wide text-gray-300 hover:text-brand-cyan transition">
              <LogOut size={15} /> Quitter
            </button>
          </div>
        </div>
        {/* onglets mobiles */}
        <nav className="sm:hidden flex items-center gap-1 px-4 pb-3">
          <TabBtn id="occasions" icon={<Ship size={16} />} label="Occasions" />
          <TabBtn id="messages" icon={<Inbox size={16} />} label="Messages" />
        </nav>
      </header>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-8">
        {tab === 'occasions' ? <OccasionsManager /> : <MessagesInbox />}
      </div>
    </div>
  );
}
