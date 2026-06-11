import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Wrench, LifeBuoy, Truck, Sofa, Caravan, Anchor } from 'lucide-react';
import { services, hivernageCross } from '../../data/services';

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  shield: Shield,
  wrench: Wrench,
  lifebuoy: LifeBuoy,
  truck: Truck,
  sofa: Sofa,
  caravan: Caravan,
  anchor: Anchor,
};

interface Props {
  /** slug du service courant (exclu de la liste) */
  currentSlug?: string;
}

export function ComplementaryServices({ currentSlug }: Props) {
  // Tous les services (hivernage inclus) sauf le courant.
  const all = [
    { ...hivernageCross, path: hivernageCross.path },
    ...services.map((s) => ({
      nav: s.nav,
      crossTitle: s.crossTitle,
      crossDesc: s.crossDesc,
      icon: s.icon,
      path: `/services/${s.slug}`,
      slug: s.slug,
    })),
  ].filter((s) => s.slug !== currentSlug);

  return (
    <section className="bg-white py-24 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="text-center mb-14 max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mb-4">
            Nos services complémentaires
          </h2>
          <p className="text-gray-500">
            Pour répondre à tous vos besoins autour de votre bateau, découvrez nos autres services à Annecy et en
            Haute-Savoie.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {all.map((s) => {
            const Icon = ICONS[s.icon] ?? Anchor;
            return (
              <Link
                key={s.path}
                to={s.path}
                className="group bg-brand-light border border-gray-200 rounded-3xl p-7 shadow-lg shadow-brand-dark/5 hover:border-brand-cyan hover:-translate-y-1 transition-all"
              >
                <span className="w-12 h-12 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-5 group-hover:bg-brand-cyan group-hover:text-brand-dark transition">
                  <Icon size={22} />
                </span>
                <h3 className="font-bold text-lg uppercase tracking-tight text-brand-dark mb-2">{s.crossTitle}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-5">{s.crossDesc}</p>
                <span className="inline-flex items-center gap-1.5 text-brand-cyan font-bold text-xs uppercase tracking-widest">
                  En savoir plus <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </span>
              </Link>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold uppercase tracking-widest text-sm px-10 py-4 rounded-xl hover:bg-ink-850 transition"
          >
            Découvrir tous nos services
          </Link>
        </div>
      </div>
    </section>
  );
}
