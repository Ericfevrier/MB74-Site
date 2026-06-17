import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, LifeBuoy, Truck, Sofa, Caravan, Shield, Anchor, ArrowRight } from 'lucide-react';
import { services, hivernageCross } from '../data/services';

const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  wrench: Wrench,
  lifebuoy: LifeBuoy,
  truck: Truck,
  sofa: Sofa,
  caravan: Caravan,
  shield: Shield,
};

// Pages dédiées (riches) → leur URL propre ; sinon /services/<slug>.
const DEDICATED: Record<string, string> = {
  depannage: '/depannage',
  'sellerie-de-bateau': '/sellerie',
  'hivernage-stockage-bateau': '/hivernage-stockage-bateau',
};
const resolvePath = (slug: string) => DEDICATED[slug] ?? `/services/${slug}`;

const ALL = [
  ...services.map((s) => ({ slug: s.slug, title: s.crossTitle, desc: s.crossDesc, icon: s.icon })),
  { slug: hivernageCross.slug, title: hivernageCross.crossTitle, desc: hivernageCross.crossDesc, icon: hivernageCross.icon },
];

/** Section « Nos autres services » — cartes visibles, partagée par toutes les pages services. */
export function OtherServices({ currentSlug }: { currentSlug?: string }) {
  const items = ALL.filter((s) => s.slug !== currentSlug);

  return (
    <section className="bg-ink-950 py-20 border-t border-white/5">
      <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
        <div className="text-center mb-12">
          <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-3">Nos services</span>
          <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight">
            Découvrez aussi nos autres services
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {items.map((s) => {
            const Icon = ICONS[s.icon] ?? Anchor;
            return (
              <Link
                key={s.slug}
                to={resolvePath(s.slug)}
                className="group bg-ink-900 border border-white/10 rounded-3xl p-6 hover:border-brand-cyan hover:-translate-y-1 transition-all flex items-start gap-4"
              >
                <span className="w-12 h-12 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center shrink-0 group-hover:bg-brand-cyan group-hover:text-brand-dark transition-colors">
                  <Icon size={22} />
                </span>
                <div className="min-w-0">
                  <h3 className="font-bold text-white uppercase tracking-tight text-sm mb-1">{s.title}</h3>
                  <p className="text-gray-400 text-xs leading-snug mb-3">{s.desc}</p>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-gray-500 group-hover:text-brand-cyan transition-colors">
                    Découvrir <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
