import React, { useState } from 'react';
import { Link } from 'react-router';
import { MapPin, Phone, Mail, ChevronRight } from 'lucide-react';
import { GoogleMapCustom } from './GoogleMapCustom';
import { usePageContent } from '../lib/pageContent';
import { SITE } from '../data/site';

type Partner = { name: string; logo?: string; role?: string; url?: string };

/** Élément d'un partenaire : logo (ou nom) + statut discret dessous (ex. « Concessionnaire »). */
function PartnerItem({ p }: { p: Partner }) {
  // Hauteur commune (harmonisée) + largeur naturelle → logos serrés, sans marge inutile.
  // Angles arrondis (visibles pour les logos ayant un fond).
  const logo = p.logo
    ? <img src={p.logo} alt={p.name} loading="lazy" className="max-h-24 sm:max-h-36 lg:max-h-40 w-auto max-w-full object-contain rounded-2xl" />
    : <span className="text-2xl sm:text-4xl font-bold italic tracking-tighter whitespace-nowrap text-brand-dark">{p.name}</span>;
  const inner = (
    <span className="flex flex-col items-center gap-2">
      {logo}
      {p.role && (
        <span className="text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.18em] text-brand-cyan text-center leading-tight">
          {p.role}
        </span>
      )}
    </span>
  );
  // Logos en couleurs réelles (pas de niveau de gris), léger zoom au survol.
  const cls = 'flex items-center justify-center transition-transform duration-300 hover:scale-105';
  if (p.url) {
    return /^https?:\/\//i.test(p.url)
      ? <a href={p.url} target="_blank" rel="noreferrer" className={cls}>{inner}</a>
      : <Link to={p.url} className={cls}>{inner}</Link>;
  }
  return <div className={cls}>{inner}</div>;
}

export function PartnersLocationSection() {
  const t = usePageContent('accueil');
  const partners = t.list<Partner>('partners.logos').filter((p) => p && p.name);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setIsSending(true);
    const data = new FormData(e.currentTarget);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nom: data.get('nom'),
          email: data.get('email'),
          message: data.get('message'),
        }),
      });
      if (!res.ok) throw new Error('send_failed');
      setIsSubmitted(true);
    } catch {
      setError("L'envoi a échoué. Réessayez ou appelez-nous au 04 57 57 27 27.");
    } finally {
      setIsSending(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="py-20 md:py-32 bg-transparent overflow-hidden">
      {/* Partners Section */}
      <div className="text-center text-brand-dark mb-24 md:mb-48">
        <div className="flex flex-col items-center mb-16 md:mb-24 px-4">
          <div className="flex items-center space-x-3 text-brand-cyan mb-4">
              <div className="w-8 h-1 bg-brand-cyan rounded-full"></div>
              <span className="uppercase tracking-widest font-bold text-[15px]">{t('partners.eyebrow')}</span>
          </div>
          <h2 className="text-[32px] md:text-[50px] font-bold tracking-tight">
            {t('partners.title')}
          </h2>
        </div>

        {partners.length > 0 && (
          /* Bandeau défilant lent, en boucle ; la piste est dupliquée pour un défilement continu. */
          <div className="mb-marquee relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
            <div className="mb-marquee-track">
              {[0, 1].map((copy) => (
                <div key={copy} className="flex items-center shrink-0" aria-hidden={copy === 1}>
                  {partners.map((p, i) => (
                    /* Créneau de largeur fixe : ~5 logos visibles à la fois (20vw sur desktop). */
                    <div key={`${copy}-${i}`} className="shrink-0 flex items-center justify-center w-[50vw] sm:w-[33vw] lg:w-[20vw] px-1.5 sm:px-2.5">
                      <PartnerItem p={p} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Location & Contact Section */}
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="bg-brand-dark rounded-[2rem] sm:rounded-[3.5rem] p-6 sm:p-12 lg:p-24 shadow-3xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-brand-cyan/5 rounded-full blur-[120px] -mr-96 -mt-96 group-hover:bg-brand-cyan/10 transition-colors duration-1000"></div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 relative z-10 text-white">
            {/* Contact Info & Form */}
            <div className="space-y-10 md:space-y-16">
               <div className="space-y-6">
                  <div className="flex items-center space-x-3 text-brand-cyan mb-4">
                    <div className="w-8 h-1 bg-brand-cyan rounded-full"></div>
                    <span className="uppercase tracking-widest font-bold text-[15px]">Contact</span>
                  </div>
                  <h3 className="text-[32px] md:text-[50px] font-bold uppercase tracking-tight leading-none">
                    NOUS <span className="text-brand-cyan">CONTACTER</span>
                  </h3>
                  <p className="text-gray-400 text-base max-w-md leading-relaxed">Une question, une demande de devis ou un projet nautique ? Notre équipe est à votre écoute.</p>
               </div>

               {isSubmitted ? (
                 <div className="bg-white/5 border border-brand-cyan/30 p-10 rounded-3xl text-center space-y-4 animate-in fade-in zoom-in duration-500">
                    <div className="w-16 h-16 bg-brand-cyan rounded-full flex items-center justify-center text-brand-dark mx-auto mb-4">
                      <ChevronRight className="rotate-[-90deg]" size={32} />
                    </div>
                    <h4 className="text-2xl font-bold uppercase tracking-tight">Merci !</h4>
                    <p className="text-gray-400">Votre message a bien été envoyé. Nous vous recontacterons très prochainement.</p>
                    <button 
                      onClick={() => setIsSubmitted(false)}
                      className="text-brand-cyan text-sm font-bold uppercase tracking-widest pt-4 hover:underline"
                    >
                      Envoyer un autre message
                    </button>
                 </div>
               ) : (
                 <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                         <label htmlFor="nom-complet" className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Nom Complet</label>
                         <input
                           id="nom-complet"
                           name="nom"
                           required
                           type="text"
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-cyan transition-colors"
                           placeholder="Jean Dupont"
                         />
                      </div>
                      <div className="space-y-2">
                         <label htmlFor="email-address" className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Email</label>
                         <input
                           id="email-address"
                           name="email"
                           required
                           type="email"
                           className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-cyan transition-colors"
                           placeholder="jean@email.com"
                         />
                      </div>
                    </div>
                    <div className="space-y-2">
                       <label htmlFor="contact-message" className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Message</label>
                       <textarea
                          id="contact-message"
                          name="message"
                          required
                          rows={4}
                          className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-brand-cyan transition-colors resize-none"
                          placeholder="Parlez-nous de votre projet..."
                       ></textarea>
                    </div>
                    
                    {/* File Upload / Add Image */}
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold uppercase tracking-widest text-white/40 ml-2">Ajouter une image (Optionnel)</label>
                       <div className="relative group/upload">
                          <input 
                            type="file" 
                            id="image-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleFileChange}
                          />
                          <label 
                            htmlFor="image-upload"
                            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-2xl hover:border-brand-cyan hover:bg-brand-cyan/5 transition-all cursor-pointer group-hover/upload:scale-[0.995]"
                          >
                             <div className="flex flex-col items-center gap-2 text-white/40 group-hover/upload:text-brand-cyan">
                                {fileName ? (
                                  <>
                                    <span className="text-brand-cyan font-bold text-sm">✓ {fileName}</span>
                                    <span className="text-[10px] uppercase tracking-tighter">Cliquez pour changer d'image</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-sm font-medium">Cliquez pour choisir une photo</span>
                                    <span className="text-[10px] uppercase tracking-tighter">JPG, PNG ou WEBP</span>
                                  </>
                                )}
                             </div>
                          </label>
                       </div>
                    </div>

                    {error && (
                      <p className="text-red-400 text-sm font-medium text-center" role="alert">{error}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full bg-brand-cyan text-brand-dark font-bold py-5 rounded-2xl uppercase tracking-widest hover:bg-white transition-all duration-300 shadow-xl shadow-brand-cyan/20 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      {isSending ? 'Envoi en cours…' : 'Envoyer le Message'}
                    </button>
                 </form>
               )}

               <div className="pt-8 border-t border-white/5 grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-cyan">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Appelez-nous</h4>
                      <a href="tel:+33457572727" className="font-bold hover:text-brand-cyan transition-colors">04 57 57 27 27</a>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-brand-cyan">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="text-[10px] font-bold uppercase tracking-widest text-white/40">Email direct</h4>
                      <a href="mailto:contact@motorboat74.com" className="font-bold hover:text-brand-cyan transition-colors">contact@motorboat74.com</a>
                    </div>
                  </div>
               </div>
            </div>

            {/* Map Placeholder */}
            <div className="relative flex flex-col gap-12">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3 text-brand-cyan mb-4">
                    <div className="w-8 h-1 bg-brand-cyan rounded-full"></div>
                    <span className="uppercase tracking-widest font-bold text-[15px]">Localisation</span>
                  </div>
                  <h3 className="text-[32px] md:text-[50px] font-bold uppercase tracking-tight leading-none">
                    NOUS <span className="text-brand-cyan">TROUVER</span>
                  </h3>
                </div>

                <div className="relative flex-1 min-h-[420px] sm:min-h-[500px]">
                  <div className="absolute -inset-8 bg-brand-cyan/10 rounded-[4rem] blur-3xl group-hover:bg-brand-cyan/20 transition-colors duration-1000"></div>
                  <div className="h-full w-full bg-ink-900 rounded-[2rem] sm:rounded-[3rem] overflow-hidden relative shadow-3xl border-4 sm:border-8 border-white/5 transition-all duration-700 hover:scale-[1.01]">
                    <GoogleMapCustom />

                    <div className="absolute bottom-4 left-4 right-4 sm:bottom-8 sm:left-8 sm:right-8 bg-brand-dark/90 backdrop-blur-2xl p-5 sm:p-8 rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 flex items-center justify-between gap-3 shadow-2xl z-20">
                      <div>
                         <p className="text-[10px] font-bold uppercase tracking-widest text-brand-cyan mb-1 leading-none">Chantier Nautique</p>
                         <p className="text-lg font-bold text-white uppercase tracking-tight">Motor Boat 74</p>
                      </div>
                      <a 
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${SITE.addressStreet} ${SITE.addressPostal} ${SITE.addressLocality}`)}`}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="bg-brand-cyan text-brand-dark font-bold px-6 py-3 rounded-xl hover:scale-110 transition-transform uppercase text-[10px] tracking-widest"
                      >
                         Itinéraire
                      </a>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
