import React, { useEffect, useState } from 'react';
import { Loader2, Save, CheckCircle2 } from 'lucide-react';
import { adminApi } from '../../lib/adminApi';
import { SETTINGS_DEFAULTS } from '../../lib/settings';

const INPUT =
  'w-full bg-white border border-gray-300 rounded-xl px-3.5 py-2.5 text-sm text-brand-dark focus:outline-none focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 transition';
const LABEL = 'block text-[11px] font-bold uppercase tracking-widest text-gray-500 mb-1.5';

const FIELDS: { key: string; label: string; placeholder?: string; textarea?: boolean; group: string }[] = [
  { key: 'phone', label: 'Téléphone', placeholder: SETTINGS_DEFAULTS.phoneDisplay, group: 'Coordonnées' },
  { key: 'email', label: 'E-mail', placeholder: SETTINGS_DEFAULTS.email, group: 'Coordonnées' },
  { key: 'address_street', label: 'Adresse (rue)', placeholder: SETTINGS_DEFAULTS.addressStreet, group: 'Coordonnées' },
  { key: 'address_postal', label: 'Code postal', placeholder: SETTINGS_DEFAULTS.addressPostal, group: 'Coordonnées' },
  { key: 'address_locality', label: 'Ville', placeholder: SETTINGS_DEFAULTS.addressLocality, group: 'Coordonnées' },
  { key: 'address_region', label: 'Région', placeholder: SETTINGS_DEFAULTS.addressRegion, group: 'Coordonnées' },
  { key: 'hours', label: 'Horaires (texte libre)', placeholder: 'Lun–Ven 9h–18h, Sam sur RDV', textarea: true, group: 'Coordonnées' },
  { key: 'instagram', label: 'Instagram (URL)', placeholder: SETTINGS_DEFAULTS.instagram, group: 'Réseaux sociaux' },
  { key: 'facebook', label: 'Facebook (URL)', placeholder: SETTINGS_DEFAULTS.facebook, group: 'Réseaux sociaux' },
  { key: 'youtube', label: 'YouTube (URL)', placeholder: SETTINGS_DEFAULTS.youtube, group: 'Réseaux sociaux' },
  { key: 'linkedin', label: 'LinkedIn (URL)', placeholder: SETTINGS_DEFAULTS.linkedin, group: 'Réseaux sociaux' },
];

const GROUPS = ['Coordonnées', 'Réseaux sociaux'];

export function SettingsManager() {
  const [values, setValues] = useState<Record<string, string> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    adminApi
      .getSettings()
      .then((r) => setValues(r.settings || {}))
      .catch((e) => setError(e.message));
  }, []);

  const set = (k: string, v: string) => {
    setSaved(false);
    setValues((p) => ({ ...(p || {}), [k]: v }));
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!values) return;
    setError(null);
    setSaving(true);
    try {
      const r = await adminApi.saveSettings(values);
      setValues(r.settings || values);
      setSaved(true);
    } catch (err: any) {
      setError(err.message || "Échec de l'enregistrement.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div>
      <h1 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-1">Réglages du site</h1>
      <p className="text-gray-500 mb-6">
        Coordonnées et réseaux affichés sur le site (footer, contact). Modifs visibles immédiatement.
        <br />
        <span className="text-xs">Laisse un champ vide pour conserver la valeur par défaut (indiquée en gris).</span>
      </p>

      {error && <p className="text-red-600 text-sm font-medium mb-4">{error}</p>}
      {!values && !error && <div className="flex justify-center py-16 text-gray-400"><Loader2 className="animate-spin" /></div>}

      {values && (
        <form onSubmit={save} className="max-w-3xl space-y-6">
          {GROUPS.map((group) => (
            <div key={group} className="bg-white rounded-3xl border border-gray-200 shadow-sm p-6 lg:p-8">
              <h2 className="font-bold uppercase tracking-tight text-brand-dark mb-5">{group}</h2>
              <div className="grid sm:grid-cols-2 gap-5">
                {FIELDS.filter((f) => f.group === group).map((f) => (
                  <div key={f.key} className={f.textarea ? 'sm:col-span-2' : ''}>
                    <label className={LABEL}>{f.label}</label>
                    {f.textarea ? (
                      <textarea className={`${INPUT} h-20 resize-y`} value={values[f.key] || ''} placeholder={f.placeholder} onChange={(e) => set(f.key, e.target.value)} />
                    ) : (
                      <input className={INPUT} value={values[f.key] || ''} placeholder={f.placeholder} onChange={(e) => set(f.key, e.target.value)} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}

          <div className="flex items-center gap-4">
            <button type="submit" disabled={saving} className="flex items-center gap-2 bg-brand-dark text-white px-6 py-3 rounded-xl text-sm font-bold uppercase tracking-wide hover:bg-brand-cyan hover:text-brand-dark disabled:opacity-50 transition">
              {saving ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />} Enregistrer
            </button>
            {saved && <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-bold"><CheckCircle2 size={16} /> Enregistré</span>}
          </div>
        </form>
      )}
    </div>
  );
}
