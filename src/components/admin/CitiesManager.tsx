import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Loader2, ArrowLeft, Save, X } from 'lucide-react';
import { adminApi, type AdminCity } from '../../lib/adminApi';
import { hivernageCities, HIVERNAGE_CITY_ORDER, type HivernagePort, type LocalFact } from '../../data/hivernageCities';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5';

type Draft = Partial<AdminCity>;

function Field({ label, children, full }: { label: string; children: React.ReactNode; full?: boolean }) {
  return (
    <div className={full ? 'sm:col-span-2' : ''}>
      <label className={LABEL}>{label}</label>
      {children}
    </div>
  );
}

function CityForm({ initial, onCancel, onSaved }: { initial: Draft; onCancel: () => void; onSaved: () => void }) {
  const [d, setD] = useState<Draft>({ ports: [], ...initial });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const set = (k: keyof Draft, v: any) => setD((p) => ({ ...p, [k]: v }));

  const ports = d.ports || [];
  const setPort = (i: number, k: keyof HivernagePort, v: string) =>
    set('ports', ports.map((p, j) => (j === i ? { ...p, [k]: v } : p)));
  const addPort = () => set('ports', [...ports, { title: '', desc: '' }]);
  const delPort = (i: number) => set('ports', ports.filter((_, j) => j !== i));

  const le = d.localExpertise || { intro: '', facts: [] };
  const setLe = (patch: Partial<typeof le>) => set('localExpertise', { ...le, ...patch });
  const facts = le.facts || [];
  const setFact = (i: number, k: keyof LocalFact, v: string) =>
    setLe({ facts: facts.map((f, j) => (j === i ? { ...f, [k]: v } : f)) });
  const addFact = () => setLe({ facts: [...facts, { title: '', text: '' }] });
  const delFact = (i: number) => setLe({ facts: facts.filter((_, j) => j !== i) });

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      if (d.id) await adminApi.updateCity(d.id, d);
      else await adminApi.createCity(d);
      onSaved();
    } catch (err: any) {
      setError(err.message || "Échec de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={save} className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between gap-4">
        <button type="button" onClick={onCancel} className="flex items-center gap-1.5 text-sm font-bold text-gray-500 hover:text-brand-dark transition">
          <ArrowLeft size={16} /> Retour
        </button>
        <h2 className="font-bold uppercase tracking-tight text-brand-dark">{d.id ? 'Modifier la ville' : 'Nouvelle ville'}</h2>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8">
        <h3 className="font-bold uppercase tracking-tight text-brand-dark mb-5 text-sm">Général</h3>
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label="Ville *"><input className={INPUT} value={d.city || ''} onChange={(e) => set('city', e.target.value)} required /></Field>
          <Field label="Slug (URL) *"><input className={INPUT} value={d.slug || ''} onChange={(e) => set('slug', e.target.value)} placeholder="annecy" required /></Field>
          <Field label="Titre H1"><input className={INPUT} value={d.h1 || ''} onChange={(e) => set('h1', e.target.value)} /></Field>
          <Field label="Lac / plan d'eau"><input className={INPUT} value={d.lake || ''} onChange={(e) => set('lake', e.target.value)} placeholder="lac d'Annecy" /></Field>
          <Field label="Image (URL)" full><input className={INPUT} value={d.hero || ''} onChange={(e) => set('hero', e.target.value)} placeholder="/images/hivernage/annecy.jpg" /></Field>
          <Field label="Intro" full><textarea className={`${INPUT} h-24 resize-y`} value={d.intro || ''} onChange={(e) => set('intro', e.target.value)} /></Field>
          <Field label="Intro des zones / ports" full><textarea className={`${INPUT} h-24 resize-y`} value={d.zonesIntro || ''} onChange={(e) => set('zonesIntro', e.target.value)} /></Field>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8">
        <h3 className="font-bold uppercase tracking-tight text-brand-dark mb-5 text-sm">SEO</h3>
        <div className="grid gap-5">
          <Field label="Titre SEO (balise title)"><input className={INPUT} value={d.metaTitle || ''} onChange={(e) => set('metaTitle', e.target.value)} /></Field>
          <Field label="Description SEO"><textarea className={`${INPUT} h-20 resize-y`} value={d.metaDescription || ''} onChange={(e) => set('metaDescription', e.target.value)} /></Field>
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-bold uppercase tracking-tight text-brand-dark text-sm">Ports & zones ({ports.length})</h3>
          <button type="button" onClick={addPort} className="flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:underline"><Plus size={14} /> Ajouter un port</button>
        </div>
        <div className="space-y-4">
          {ports.map((p, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl p-4 relative">
              <button type="button" onClick={() => delPort(i)} className="absolute top-3 right-3 text-gray-400 hover:text-red-600" title="Supprimer"><X size={16} /></button>
              <input className={`${INPUT} mb-2`} value={p.title} onChange={(e) => setPort(i, 'title', e.target.value)} placeholder="Nom du port" />
              <textarea className={`${INPUT} h-20 resize-y`} value={p.desc} onChange={(e) => setPort(i, 'desc', e.target.value)} placeholder="Description" />
            </div>
          ))}
          {ports.length === 0 && <p className="text-sm text-gray-400">Aucun port. Clique sur « Ajouter un port ».</p>}
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8">
        <h3 className="font-bold uppercase tracking-tight text-brand-dark mb-5 text-sm">Expertise locale (optionnel)</h3>
        <Field label="Intro expertise"><textarea className={`${INPUT} h-20 resize-y`} value={le.intro || ''} onChange={(e) => setLe({ intro: e.target.value })} /></Field>
        <div className="flex items-center justify-between mt-5 mb-3">
          <span className={LABEL}>Faits ({facts.length})</span>
          <button type="button" onClick={addFact} className="flex items-center gap-1.5 text-xs font-bold text-brand-cyan hover:underline"><Plus size={14} /> Ajouter un fait</button>
        </div>
        <div className="space-y-4">
          {facts.map((f, i) => (
            <div key={i} className="border border-gray-200 rounded-2xl p-4 relative">
              <button type="button" onClick={() => delFact(i)} className="absolute top-3 right-3 text-gray-400 hover:text-red-600"><X size={16} /></button>
              <input className={`${INPUT} mb-2`} value={f.title} onChange={(e) => setFact(i, 'title', e.target.value)} placeholder="Titre du fait" />
              <textarea className={`${INPUT} h-20 resize-y`} value={f.text} onChange={(e) => setFact(i, 'text', e.target.value)} placeholder="Texte" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-6">
        <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
          Statut :
          <select className="border border-gray-300 rounded-lg px-2 py-1.5 text-sm" value={d.status || 'published'} onChange={(e) => set('status', e.target.value)}>
            <option value="published">Publié</option>
            <option value="draft">Brouillon</option>
          </select>
        </label>
        <label className="flex items-center gap-2 text-sm font-medium text-brand-dark">
          Ordre :
          <input type="number" className="w-20 border border-gray-300 rounded-lg px-2 py-1.5 text-sm" value={d.sortOrder ?? 0} onChange={(e) => set('sortOrder', Number(e.target.value))} />
        </label>
      </div>

      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}

      <div className="flex justify-end gap-3">
        <button type="button" onClick={onCancel} className="px-5 py-3 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-100 transition">Annuler</button>
        <button type="submit" disabled={saving} className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
          {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Enregistrer
        </button>
      </div>
    </form>
  );
}

export function CitiesManager() {
  const [cities, setCities] = useState<AdminCity[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [editing, setEditing] = useState<Draft | null>(null);
  const [importing, setImporting] = useState(false);

  const load = () => {
    setError(null);
    adminApi
      .listCities()
      .then((r) => setCities(r.cities))
      .catch((e) => setError(e.message));
  };
  useEffect(load, []);

  const importDefaults = async () => {
    if (!confirm('Importer les villes par défaut dans la base ? (les slugs déjà présents sont ignorés)')) return;
    setImporting(true);
    let n = 0;
    for (let i = 0; i < HIVERNAGE_CITY_ORDER.length; i++) {
      const c = hivernageCities[HIVERNAGE_CITY_ORDER[i]];
      if (!c) continue;
      try {
        await adminApi.createCity({ ...c, sortOrder: i } as any);
        n++;
      } catch {
        /* slug déjà présent (409) ou autre — on continue */
      }
    }
    setImporting(false);
    alert(`${n} ville(s) importée(s).`);
    load();
  };

  const remove = async (c: AdminCity) => {
    if (!confirm(`Supprimer la page ville « ${c.city} » ?`)) return;
    try {
      await adminApi.deleteCity(c.id);
      load();
    } catch (e: any) {
      alert(e.message);
    }
  };

  if (editing) {
    return <CityForm initial={editing} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />;
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-2">
        <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark">
          Villes d'hivernage {cities ? <span className="text-gray-400 font-normal">({cities.length})</span> : null}
        </h1>
        <div className="flex items-center gap-2">
          <button onClick={importDefaults} disabled={importing} className="flex items-center gap-2 border border-gray-300 text-brand-dark px-4 py-2.5 rounded-xl text-sm font-bold hover:border-brand-cyan disabled:opacity-50 transition">
            {importing ? <Loader2 size={15} className="animate-spin" /> : null} Importer les villes par défaut
          </button>
          <button onClick={() => setEditing({ status: 'published', ports: [], sortOrder: cities?.length ?? 0 })} className="flex items-center gap-2 bg-brand-cyan text-brand-dark px-5 py-2.5 rounded-xl text-sm font-bold uppercase tracking-wide hover:brightness-110 transition">
            <Plus size={16} /> Ajouter
          </button>
        </div>
      </div>
      <p className="text-gray-500 mb-6 text-sm">Tant que la base est vide, le site affiche les villes par défaut.</p>

      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
      {!cities && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {cities && cities.length === 0 && (
        <div className="bg-white border-2 border-dashed border-gray-300 rounded-2xl p-12 text-center text-gray-500">
          Aucune ville en base. Ajoute-en une (ou recopie une ville existante) pour la gérer ici.
        </div>
      )}

      {cities && cities.length > 0 && (
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden divide-y divide-gray-100">
          {cities.map((c) => (
            <div key={c.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 transition">
              <div className="w-20 h-14 rounded-lg bg-gray-100 overflow-hidden flex-shrink-0">
                {c.hero ? <img src={c.hero} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" /> : null}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-brand-dark truncate">{c.city}</p>
                <p className="text-xs text-gray-500 truncate">{c.lake} · {(c.ports || []).length} ports · /services/hivernage-bateaux/{c.slug}</p>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                {c.status === 'draft' && <span className="text-[10px] font-bold uppercase bg-amber-100 text-amber-700 px-2 py-1 rounded">Brouillon</span>}
                <button onClick={() => setEditing(c)} className="p-2 text-gray-500 hover:text-brand-cyan transition" title="Modifier"><Pencil size={16} /></button>
                <button onClick={() => remove(c)} className="p-2 text-gray-500 hover:text-red-600 transition" title="Supprimer"><Trash2 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
