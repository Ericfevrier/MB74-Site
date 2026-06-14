import React, { useState } from 'react';
import { Phone, MapPin, Mail, Send, CheckCircle2 } from 'lucide-react';
import { SITE } from '../../data/site';
import { GoogleMapCustom } from '../GoogleMapCustom';

interface ServiceContactBlockProps {
  /** Sujet pré-rempli envoyé au backend (ex. nom du service). */
  subject?: string;
  /** Titre personnalisé (ex. "Recevez votre prix personnalisé"). */
  title?: string;
  /** Affiche la carte Google Maps sous les coordonnées. */
  showMap?: boolean;
}

const FIELD =
  'w-full bg-white border border-gray-300 rounded-xl px-4 py-3 text-brand-dark placeholder:text-gray-400 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/30 outline-none transition';

export function ServiceContactBlock({ subject, title, showMap }: ServiceContactBlockProps) {
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

  return (
    <section id="contact" className="bg-brand-light py-24 scroll-mt-[120px]">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight text-brand-dark text-center mb-16">
          {title ? title : <>Contactez-<span className="text-brand-cyan">nous</span></>}
        </h2>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Coordonnées */}
          <div className="space-y-6">
            <h3 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-2">
              Informations de contact
            </h3>
            <ul className="space-y-4">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-lg shadow-brand-dark/5 hover:border-brand-cyan transition group"
                >
                  <span className="w-12 h-12 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center group-hover:bg-brand-cyan group-hover:text-brand-dark transition">
                    <Phone size={20} />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-widest font-bold text-gray-400">Téléphone</span>
                    <span className="block font-bold text-lg text-brand-dark">{SITE.phoneDisplay}</span>
                  </span>
                </a>
              </li>
              <li>
                <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-lg shadow-brand-dark/5">
                  <span className="w-12 h-12 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center">
                    <MapPin size={20} />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-widest font-bold text-gray-400">Showroom</span>
                    <span className="block font-bold text-brand-dark leading-tight">
                      {SITE.addressStreet},<br />
                      {SITE.addressPostal} {SITE.addressLocality}
                    </span>
                  </span>
                </div>
              </li>
              <li>
                <a
                  href={SITE.emailHref}
                  className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5 shadow-lg shadow-brand-dark/5 hover:border-brand-cyan transition group"
                >
                  <span className="w-12 h-12 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center group-hover:bg-brand-cyan group-hover:text-brand-dark transition">
                    <Mail size={20} />
                  </span>
                  <span>
                    <span className="block text-[11px] uppercase tracking-widest font-bold text-gray-400">Mail</span>
                    <span className="block font-bold text-lg text-brand-dark">{SITE.email}</span>
                  </span>
                </a>
              </li>
            </ul>

            {showMap && (
              <div className="mt-6 h-64 rounded-2xl overflow-hidden border border-gray-200 shadow-lg shadow-brand-dark/5">
                <GoogleMapCustom />
              </div>
            )}
          </div>

          {/* Formulaire */}
          <div className="bg-white border border-gray-200 rounded-[2rem] p-8 lg:p-10 shadow-xl shadow-brand-dark/5">
            <h3 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-6">Demande d’informations</h3>
            {done ? (
              <div className="flex flex-col items-center text-center gap-4 py-10">
                <CheckCircle2 size={56} className="text-brand-cyan" />
                <p className="font-bold text-lg text-brand-dark">Merci, votre message a bien été envoyé.</p>
                <p className="text-gray-500">Notre équipe vous recontacte au plus vite.</p>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input name="nom" required value={data.nom} onChange={onChange} placeholder="Nom *" className={FIELD} />
                  <input name="prenom" value={data.prenom} onChange={onChange} placeholder="Prénom" className={FIELD} />
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    name="email"
                    type="email"
                    required
                    value={data.email}
                    onChange={onChange}
                    placeholder="Email *"
                    className={FIELD}
                  />
                  <input name="tel" value={data.tel} onChange={onChange} placeholder="Téléphone" className={FIELD} />
                </div>
                <textarea
                  name="message"
                  required
                  value={data.message}
                  onChange={onChange}
                  placeholder="Votre message *"
                  rows={5}
                  className={FIELD}
                />
                {error && <p className="text-red-500 text-sm font-medium">{error}</p>}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm py-4 rounded-xl hover:bg-brand-dark hover:text-white transition disabled:opacity-60"
                >
                  {loading ? 'Envoi…' : 'Envoyer'}
                  {!loading && <Send size={16} />}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
