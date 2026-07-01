import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, Save } from 'lucide-react';
import { adminApi, type AdminMember } from '../../lib/adminApi';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5';

type Draft = Partial<AdminMember>;

function MemberForm({ initial, onCancel, onSaved }: { initial: Draft; onCancel: () => void; onSaved: () => void }) {
  const [d, setD] = useState<Draft>(initial);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof Draft, v: any) => setD((p) => ({ ...p, [k]: v }));

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      if (d.id) await adminApi.updateMember(d.id, d);
      else await adminApi.createMember(d);
      onSaved();
    } catch (err: any) {
      setError(err.message || "Échec de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8 max-w-3xl">
      <div className="flex items-center justify-between gap-4 mb-6">
        <button type="button" onClick={onCancel} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-brand-dark transition">
          <ArrowLeft size={16} /> Retour
        </button>
        <h2 className="font-bold uppercase tracking-tight text-brand-dark">{d.id ? 'Modifier le membre' : 'Nouveau membre'}</h2>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label className={LABEL}>Nom *</label>
          <input className={INPUT} value={d.name || ''} onChange={(e) => set('name', e.target.value)} required />
        </div>
        <div>
          <label className={LABEL}>Rôle</label>
          <input className={INPUT} value={d.role || ''} onChange={(e) => set('role', e.target.value)} placeholder="Responsable mécanique" />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL}>Photo (URL)</label>
          <input className={INPUT} value={d.image || ''} onChange={(e) => set('image', e.target.value)} placeholder="https://…" />
        </div>
        <div>
          <label className={LABEL}>Cadrage photo</label>
          <input className={INPUT} value={d.position || ''} onChange={(e) => set('position', e.target.value)} placeholder="center · 50% 30% · 72% 35%" />
        </div>
        <div>
          <label className={LABEL}>Ordre d'affichage</label>
          <input className={INPUT} type="number" value={d.sortOrder ?? 0} onChange={(e) => set('sortOrder', Number(e.target.value))} />
        </div>
        <div className="sm:col-span-2">
          <label className={LABEL}>Biographie</label>
          <textarea className={`${INPUT} h-32 resize-y`} value={d.bio || ''} onChange={(e) => set('bio', e.target.value)} />
        </div>
      </div>

      <label className="flex items-center gap-2 text-sm font-medium text-brand-dark mt-6">
        Statut :
        <select className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm" value={d.status || 'published'} onChange={(e) => set('status', e.target.value)}>
          <option value="published">Publié</option>
          <option value="draft">Masqué</option>
        </select>
      </label>

      {error && <p className="text-red-600 text-sm font-medium mt-5">{error}</p>}

      <div className="flex justify-end gap-3 mt-7">
        <button type="button" onClick={onCancel} className="px-5 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition">Annuler</button>
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Enregistrer
        </button>
      </div>
    </form>
  );
}

export function TeamManager() {
  const [members, setMembers] = useState<AdminMember[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Draft | null>(null);

  const load = () => {
    setError(null);
    adminApi
      .listTeam()
      .then((r) => setMembers(r.members))
      .catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const remove = async (m: AdminMember) => {
    if (!confirm(`Supprimer « ${m.name} » de l'équipe ?`)) return;
    try {
      await adminApi.deleteMember(m.id);
      load();
    } catch (e: any) {
      alert(e.message);
    }
  };

  if (editing) {
    return <MemberForm initial={editing} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark">
          Équipe {members ? <span className="text-gray-400 font-normal">({members.length})</span> : null}
        </h1>
        <button onClick={() => setEditing({ status: 'published', sortOrder: (members?.length ?? 0) })} className="flex items-center gap-2 bg-brand-cyan text-brand-dark px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:brightness-110 transition">
          <Plus size={16} /> Ajouter
        </button>
      </div>

      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
      {!members && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {members && members.length === 0 && (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-500">
          Aucun membre en base. Tant que c'est vide, la page « La Team » affiche l'équipe par défaut.
        </div>
      )}

      {members && members.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {members.map((m) => (
            <div key={m.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
              <div className="w-14 h-14 rounded-full bg-gray-100 overflow-hidden flex-shrink-0">
                {m.image ? <img src={m.image} alt="" className="w-full h-full object-cover" style={{ objectPosition: m.position || 'center' }} referrerPolicy="no-referrer" /> : null}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brand-dark truncate">{m.name}</p>
                <p className="text-xs text-gray-500 truncate">{m.role}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {m.status === 'draft' && <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-2 py-1 rounded">Masqué</span>}
                <button onClick={() => setEditing(m)} className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Modifier"><Pencil size={16} /></button>
                <button onClick={() => remove(m)} className="p-2 text-gray-500 hover:text-red-600 transition" title="Supprimer"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
