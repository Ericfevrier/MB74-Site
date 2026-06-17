import React, { useState } from 'react';
import { Phone, MapPin, Mail, Send, CheckCircle2 } from 'lucide-react';
import { SITE } from '../../data/site';
import { GoogleMapCustom } from '../GoogleMapCustom';

interface ServiceContactBlockProps {
  /** Sujet pré-rempli envoyé au backend (ex. nom du service). */
  subject?: string;
  /** Titre personnalisé. Par défaut : "Contactez-nous". */
  title?: string;
  /** Affiche la carte Google Maps sous les coordonnées. */
  showMap?: boolean;
  /** Conteneur pleine largeur (1400px) pour s'aligner sur les pages larges (ex. page modèle). */
  wide?: boolean;
  /** Masque l'en-tête (eyebrow + titre + sous-titre) — utile quand la page a déjà son propre hero. */
  hideHeader?: boolean;
}

const labelCls = 'block text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-1.5';
const inputCls =
  'w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-sm text-brand-dark placeholder:text-gray-400 focus:bg-white focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/20 outline-none transition';

export function ServiceContactBlock({ subject, title, showMap, wide, hideHeader }: ServiceContactBlockProps) {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState({ nom: '', prenom: '', email: '', tel: '', message: '' });

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, sujet: subject }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || 'Échec de l’envoi.');
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue.');
    } finally {
      setLoading(false);
    }
  };

  const infoRows = [
    { icon: Phone, label: 'Téléphone', value: SITE.phoneDisplay, href: SITE.phoneHref },
    { icon: Mail, label: 'Email', value: SITE.email, href: SITE.emailHref },
    {
      icon: MapPin,
      label: 'Showroom',
      value: `${SITE.addressStreet}, ${SITE.addressPostal} ${SITE.addressLocality}`,
    },
  ];

  return (
    <section id="contact" className="bg-brand-light py-20 scroll-mt-[120px]">
      <div className={`${wide ? 'max-w-[1400px]' : 'max-w-5xl'} mx-auto px-4 lg:px-8`}>
        {/* En-tête */}
        {!hideHeader && (
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-1 bg-brand-cyan rounded-full" />
              <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">Contact</span>
              <span className="w-8 h-1 bg-brand-cyan rounded-full" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark">
              {title ? title : <>Contactez-<span className="text-brand-cyan">nous</span></>}
            </h2>
            <p className="text-gray-500 mt-4 max-w-xl mx-auto">
              Une question, un projet ou une demande de devis ? Notre équipe vous répond sous 24&nbsp;h.
            </p>
          </div>
        )}

        <div className="grid lg:grid-cols-5 gap-8 items-start">
          {/* Coordonnées */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-bold uppercase tracking-tight text-brand-dark mb-4">Informations de contact</h3>
            <div className="bg-white border border-gray-200/80 rounded-3xl p-7 shadow-xl shadow-gray-400/10 ring-1 ring-black/[0.03]">
              <ul className="divide-y divide-gray-100">
                {infoRows.map((r) => {
                  const Inner = (
                    <span className="flex items-center gap-4 py-9 first:pt-2 last:pb-2 group">
                      <span className="w-10 h-10 rounded-full bg-brand-cyan/10 text-brand-cyan flex items-center justify-center flex-shrink-0 transition group-hover:bg-brand-cyan group-hover:text-brand-dark">
                        <r.icon size={17} />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400">{r.label}</span>
                        <span className="block font-semibold text-brand-dark text-sm leading-snug">{r.value}</span>
                      </span>
                    </span>
                  );
                  return (
                    <li key={r.label}>
                      {r.href ? (
                        <a href={r.href} className="block hover:text-brand-cyan">{Inner}</a>
                      ) : (
                        Inner
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>

            {showMap && (
              <div className={`mt-6 ${wide ? 'h-72' : 'h-60'} rounded-3xl overflow-hidden border border-gray-200/80 shadow-xl shadow-gray-400/10 ring-1 ring-black/[0.03]`}>
                <GoogleMapCustom light />
              </div>
            )}
          </div>

          {/* Formulaire */}
          <div className="lg:col-span-3">
            <h3 className="text-lg font-bold uppercase tracking-tight text-brand-dark mb-4">Demande d'informations</h3>
            <div className="bg-white border border-gray-200/80 rounded-3xl p-6 lg:p-8 shadow-xl shadow-gray-400/10 ring-1 ring-black/[0.03]">
            {done ? (
              <div className="flex flex-col items-center text-center gap-3 py-12">
                <CheckCircle2 size={48} className="text-brand-cyan" />
                <p className="font-bold text-lg text-brand-dark">Message envoyé</p>
                <p className="text-gray-500 text-sm">Merci, notre équipe vous recontacte au plus vite.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cb-nom" className={labelCls}>Nom *</label>
                    <input id="cb-nom" name="nom" required value={data.nom} onChange={onChange} className={inputCls} placeholder="Dupont" />
                  </div>
                  <div>
                    <label htmlFor="cb-prenom" className={labelCls}>Prénom</label>
                    <input id="cb-prenom" name="prenom" value={data.prenom} onChange={onChange} className={inputCls} placeholder="Jean" />
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="cb-email" className={labelCls}>Email *</label>
                    <input id="cb-email" name="email" type="email" required value={data.email} onChange={onChange} className={inputCls} placeholder="jean@email.com" />
                  </div>
                  <div>
                    <label htmlFor="cb-tel" className={labelCls}>Téléphone</label>
                    <input id="cb-tel" name="tel" value={data.tel} onChange={onChange} className={inputCls} placeholder="06 12 34 56 78" />
                  </div>
                </div>
                <div>
                  <label htmlFor="cb-message" className={labelCls}>Message *</label>
                  <textarea id="cb-message" name="message" required value={data.message} onChange={onChange} rows={4} className={`${inputCls} resize-none`} placeholder="Votre demande…" />
                </div>

                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-brand-dark hover:text-white transition disabled:opacity-60"
                >
                  {loading ? 'Envoi…' : 'Envoyer'}
                  {!loading && <Send size={15} />}
                </button>
                <p className="text-[11px] text-gray-400 text-center">
                  Vos données ne sont utilisées que pour répondre à votre demande.
                </p>
              </form>
            )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
