import React from 'react';
import { MapPin, ArrowRight, Phone } from 'lucide-react';
import { GoogleMapCustom } from './GoogleMapCustom';
import { SITE } from '../data/site';

export function ShowroomSection() {
  return (
    <section className="py-14 sm:py-24 bg-brand-dark text-white">
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
          La carte appartient à CETTE section : « Visitez notre showroom » est le
          seul endroit de la page où situer le lieu répond à la question qu'on se
          pose. Elle avait été déplacée sous le formulaire de contact, donc après
          l'appel à l'action — au mauvais moment de la lecture.

          Les pages qui affichent cette section ne passent plus `showMap` au bloc
          de contact : la carte n'apparaît qu'une fois par page.
        */}
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="h-[300px] lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl">
            <img
               src="/images/img-20230924-wa0017-1-11zon-11zon-e1727707593371-11zon.webp"
               alt={`Showroom ${SITE.name} à ${SITE.addressLocality}`}
               className="w-full h-full object-cover"
               loading="lazy"
               referrerPolicy="no-referrer"
            />
          </div>
          <div className="h-[300px] lg:h-[420px] rounded-3xl overflow-hidden shadow-2xl">
            <GoogleMapCustom />
          </div>
        </div>

        {/* Adresse et actions, sous les deux panneaux : une seule ligne de lecture. */}
        <div className="mt-8 bg-white/[0.04] border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
          <span className="flex items-start gap-4 flex-1 min-w-0">
            <span className="w-11 h-11 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center flex-shrink-0">
              <MapPin size={19} />
            </span>
            <span className="min-w-0">
              <span className="block text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-1">Notre showroom</span>
              <span className="block font-bold text-white leading-snug">
                {SITE.addressStreet}, {SITE.addressPostal} {SITE.addressLocality}
              </span>
              <span className="block text-gray-400 text-sm mt-1">Sur la rive ouest du lac d’Annecy, à 8 minutes du centre.</span>
            </span>
          </span>

          <span className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
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
          </span>
        </div>
      </div>
    </section>
  );
}
