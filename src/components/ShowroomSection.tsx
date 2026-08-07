import React from 'react';
import { MapPin, ArrowRight, Phone } from 'lucide-react';
import { SITE } from '../data/site';

export function ShowroomSection() {
  return (
    <section className="py-24 bg-brand-dark text-white">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">
            VISITEZ NOTRE <span className="text-brand-cyan">SHOWROOM</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 font-medium leading-relaxed">
            Venez explorer nos modèles conçus pour le ski nautique, le wakeboard et le wakesurf. 
            Notre équipe passionnée se fera un plaisir de vous offrir des conseils personnalisés pour vous 
            aider à trouver le bateau parfait pour vos aventures sur l'eau.
          </p>
          <p className="max-w-3xl mx-auto text-gray-400 font-medium leading-relaxed mt-4">
            Profitez de cette occasion pour poser vos questions, tester nos équipements et discuter 
            de vos besoins avec des experts. Nous avons hâte de vous accueillir !
          </p>
        </div>

        {/*
          Cette section portait une carte, doublonnée avec celle du bloc de
          contact plus bas sur la même page : deux iframes Google pour la même
          adresse. On garde ici la photo, agrandie, et on remplace la carte par
          l'adresse et les deux actions utiles — s'y rendre, ou appeler.
        */}
        <div className="grid lg:grid-cols-5 gap-12 items-center">
          <div className="lg:col-span-3 h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img
               src="/images/img-20230924-wa0017-1-11zon-11zon-e1727707593371-11zon.webp"
               alt={`Showroom ${SITE.name} à ${SITE.addressLocality}`}
               className="w-full h-full object-cover"
               loading="lazy"
               referrerPolicy="no-referrer"
            />
          </div>

          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-start gap-4">
              <span className="w-11 h-11 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center flex-shrink-0">
                <MapPin size={19} />
              </span>
              <span>
                <span className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Notre showroom</span>
                <span className="block font-bold text-white leading-snug">{SITE.addressStreet}</span>
                <span className="block text-gray-400 text-sm">{SITE.addressPostal} {SITE.addressLocality}</span>
                <span className="block text-gray-500 text-sm mt-1">Sur la rive ouest du lac d’Annecy, à 8 minutes du centre.</span>
              </span>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                  `${SITE.addressStreet} ${SITE.addressPostal} ${SITE.addressLocality}`,
                )}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-[11px] px-7 py-4 rounded-xl hover:bg-white transition"
              >
                Itinéraire <ArrowRight size={15} />
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-bold uppercase tracking-widest text-[11px] px-7 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition"
              >
                <Phone size={15} /> {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
