import React, { useEffect, useState } from 'react';
import { Loader2, Plus, Trash2, ShieldCheck, User, CheckCircle2 } from 'lucide-react';
import { adminApi, type AdminUser } from '../../lib/adminApi';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1';

export function UsersManager() {
  const [users, setUsers] = useState<AdminUser[] | null>(null);
  const [superAdmin, setSuperAdmin] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('admin');

  const load = () => {
    setError(null);
    adminApi.listUsers().then((r) => { setUsers(r.users); setSuperAdmin(r.superAdmin); }).catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setCreating(true);
    try {
      await adminApi.createUser(username.trim(), password, role);
      setMsg(`Utilisateur « ${username.trim()} » créé.`);
      setUsername(''); setPassword(''); setRole('admin');
      load();
    } catch (e: any) {
      setError(e.message);
    } finally {
      setCreating(false);
    }
  };

  const remove = async (u: AdminUser) => {
    if (!confirm(`Supprimer l'accès de « ${u.username} » ?`)) return;
    try {
      await adminApi.deleteUser(u.id);
      load();
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <div className="max-w-3xl">
      <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-1">Utilisateurs</h1>
      <p className="text-gray-500 text-sm mb-6">Gère les accès au back-office. Le <strong>super-admin</strong> gère tout (dont les utilisateurs) ; l'<strong>admin</strong> gère le contenu.</p>

      {msg && <p className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-bold mb-4"><CheckCircle2 size={16} /> {msg}</p>}
      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}

      {/* Création */}
      <form onSubmit={create} className="bg-white rounded-2xl border border-gray-200 p-5 mb-6">
        <p className="font-bold text-brand-dark mb-3 text-sm">Ajouter un accès</p>
        <div className="grid sm:grid-cols-3 gap-3">
          <div><label className={LABEL}>Identifiant (e-mail @motorboat74.com)</label><input type="email" className={INPUT} value={username} onChange={(e) => setUsername(e.target.value)} autoComplete="off" placeholder="prenom@motorboat74.com" required /></div>
          <div><label className={LABEL}>Mot de passe</label><input type="password" className={INPUT} value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="new-password" required /></div>
          <div>
            <label className={LABEL}>Rôle</label>
            <select className={INPUT} value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="admin">Admin (contenu)</option>
              <option value="super-admin">Super-admin (tout)</option>
            </select>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button type="submit" disabled={creating} className="inline-flex items-center gap-2 bg-brand-dark text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
            {creating ? <Loader2 size={16} className="animate-spin" /> : <Plus size={16} />} Créer
          </button>
        </div>
      </form>

      {!users && !error && <div className="flex justify-center py-10 text-gray-400"><Loader2 className="animate-spin" /></div>}
      {users && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {superAdmin && (
            <div className="flex items-center gap-3 p-4 bg-amber-50/40">
              <span className="w-9 h-9 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center"><ShieldCheck size={17} /></span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brand-dark truncate">{superAdmin}</p>
                <p className="text-xs text-gray-500">Super-admin principal (variables d'environnement)</p>
              </div>
              <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-2 py-1 rounded">Protégé</span>
            </div>
          )}
          {users.map((u) => (
            <div key={u.id} className="flex items-center gap-3 p-4 hover:bg-gray-50 transition">
              <span className={`w-9 h-9 rounded-full flex items-center justify-center ${u.role === 'super-admin' ? 'bg-amber-100 text-amber-700' : 'bg-gray-100 text-gray-500'}`}>
                {u.role === 'super-admin' ? <ShieldCheck size={17} /> : <User size={17} />}
              </span>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brand-dark truncate">{u.username}</p>
                <p className="text-xs text-gray-500">{u.role === 'super-admin' ? 'Super-admin' : 'Admin'}</p>
              </div>
              <button onClick={() => remove(u)} className="p-2 text-gray-400 hover:text-red-500 transition" title="Supprimer"><Trash2 size={16} /></button>
            </div>
          ))}
          {users.length === 0 && <p className="p-6 text-center text-gray-400 text-sm">Aucun accès additionnel. Le super-admin principal suffit.</p>}
        </div>
      )}
    </div>
  );
}
