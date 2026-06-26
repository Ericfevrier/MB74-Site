import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Phone, Calendar, Clock, Gauge, Users, Ruler } from 'lucide-react';
import { SITE } from '../data/site';
import { UsedBoat } from '../data/usedBoats';
import { getBrandModels } from '../data/boatBrands';

const BRAND_LABEL: Record<string, string> = { heyday: 'Heyday', malibu: 'Malibu' };

function brandName(brandId: string): string {
  return getBrandModels(brandId)?.name || BRAND_LABEL[brandId] || brandId;
}

/**
 * Carte bateau d'occasion (pages /bateaux/occasion et /bateaux/vendu).
 * Thème clair, design premium unifié. `variant` adapte les badges/CTA.
 */
export function UsedBoatCard({ boat, variant }: { boat: UsedBoat; variant: 'available' | 'sold' }) {
  const sold = variant === 'sold';
  const detailUrl = `/bateaux/occasion/${boat.slug}`;

  const specs = [
    boat.hours && { Icon: Clock, label: 'Heures', value: boat.hours },
    boat.power && { Icon: Gauge, label: 'Moteur', value: boat.power },
    boat.length && { Icon: Ruler, label: 'Longueur', value: boat.length },
    boat.capacity && { Icon: Users, label: 'Capacité', value: boat.capacity },
  ].filter(Boolean).slice(0, 4) as { Icon: typeof Clock; label: string; value: string }[];

  return (
    <article className="group relative bg-white rounded-[1.75rem] overflow-hidden border border-gray-200/70 shadow-[0_12px_40px_-18px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.02] hover:shadow-[0_26px_55px_-20px_rgba(15,23,42,0.45)] hover:-translate-y-1.5 transition-all duration-300 flex flex-col">
      {/* Visuel */}
      <Link to={detailUrl} className="block relative aspect-[16/11] overflow-hidden bg-ink-900">
        <img
          src={boat.image}
          alt={`${boat.title} ${boat.year}${sold ? ' (vendu)' : ' d’occasion'}`}
          loading="lazy"
          referrerPolicy="no-referrer"
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${sold ? 'opacity-95' : ''}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-950/75 via-ink-950/5 to-transparent" />

        {/* Badge statut */}
        <span
          className={`absolute top-4 left-4 inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full backdrop-blur-sm ${
            sold ? 'bg-red-500/95 text-white' : 'bg-brand-cyan text-brand-dark'
          }`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${sold ? 'bg-white' : 'bg-brand-dark'}`} />
          {sold ? 'Vendu' : 'Disponible'}
        </span>

        {/* Marque + millésime */}
        <span className="absolute top-4 right-4 bg-white/15 backdrop-blur-md border border-white/20 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
          {brandName(boat.brandId)} · {boat.year}
        </span>

        {/* Prix en surimpression */}
        <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
          <h3 className="text-white font-bold uppercase tracking-tight leading-tight text-lg drop-shadow-sm">{boat.title}</h3>
          <span
            className={`flex-shrink-0 font-bold text-sm px-3.5 py-2 rounded-xl backdrop-blur-md ${
              sold ? 'bg-white/15 text-gray-200 line-through' : 'bg-white text-brand-dark shadow-lg'
            }`}
          >
            {boat.price}
          </span>
        </div>
      </Link>

      {/* Corps */}
      <div className="p-5 flex-1 flex flex-col">
        {/* Specs */}
        <dl className="grid grid-cols-2 gap-2.5 mb-5">
          {specs.map((s) => (
            <div key={s.label} className="flex items-center gap-2.5 bg-brand-light rounded-xl px-3 py-2.5 min-w-0">
              <s.Icon size={15} className="text-brand-cyan flex-shrink-0" />
              <div className="min-w-0">
                <dt className="text-[9px] uppercase tracking-widest text-gray-400 leading-none mb-0.5">{s.label}</dt>
                <dd className="text-[12px] font-semibold text-brand-dark leading-tight truncate">{s.value}</dd>
              </div>
            </div>
          ))}
        </dl>

        {/* Actions */}
        {sold ? (
          <Link
            to={detailUrl}
            className="mt-auto inline-flex items-center justify-center gap-2 border border-gray-200 text-brand-dark font-bold uppercase text-[11px] tracking-widest py-3 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition"
          >
            Voir le détail <ArrowRight size={14} />
          </Link>
        ) : (
          <div className="mt-auto flex gap-2.5">
            <a
              href={SITE.phoneHref}
              className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-cyan text-brand-dark font-bold uppercase text-[11px] tracking-widest py-3 rounded-xl hover:bg-brand-dark hover:text-white transition"
            >
              <Phone size={14} /> Appeler
            </a>
            <Link
              to={detailUrl}
              className="flex-1 inline-flex items-center justify-center gap-1.5 border border-gray-200 text-brand-dark font-bold uppercase text-[11px] tracking-widest py-3 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition"
            >
              Détail <ArrowRight size={13} />
            </Link>
          </div>
        )}
      </div>
    </article>
  );
}
