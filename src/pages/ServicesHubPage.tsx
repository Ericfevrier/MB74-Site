import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Check, Shield, Wrench, LifeBuoy, Truck, Sofa, Caravan, Warehouse, Clock, MapPin } from 'lucide-react';
import { SITE } from '../data/site';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';
import { pageMeta } from '../lib/meta';
import { breadcrumbSchema } from '../lib/schema';
import { usePageContent, useSeo } from '../lib/pageContent';

// Le lien et l'icône de chaque carte restent fixes (structure de navigation).
const CARD_META = [
  { path: '/hivernage-stockage-bateau', icon: Shield },
  { path: '/services/entretien-reparation', icon: Wrench },
  { path: '/services/depannage', icon: LifeBuoy },
  { path: '/services/transport-de-bateau', icon: Truck },
  { path: '/services/sellerie-de-bateau', icon: Sofa },
  { path: '/services/remorques-de-bateau', icon: Caravan },
];

const STAT_ICONS = [Warehouse, Clock, MapPin];

export function servicesHubMeta() {
  const canonical = `${SITE.url}/services/`;
  return pageMeta({
    title: 'Nos Services Nautiques | Motor Boat 74',
    description:
      'Découvrez les services de MotorBoat74 à Annecy : vente de bateaux Nautique, hivernage sécurisé, entretien, dépannage, transport et sellerie en Haute-Savoie.',
    canonical,
    image: `${SITE.url}/images/services/services-hub.webp`,
    jsonLd: [
      breadcrumbSchema([
        { name: 'Accueil', url: `${SITE.url}/` },
        { name: 'Services', url: canonical },
      ]),
    ],
  });
}

export function ServicesHubPage() {
  const t = usePageContent('services-hub');
  useSeo('services-hub');
  const stats = t.list<{ value: string; label: string }>('hero.stats');
  const cards = t.list<{ title: string; desc: string; bullets: string }>('cards');
  return (
    <div className="bg-white">

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={t('hero.image')}
            alt="Services nautiques Motor Boat 74"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6">{t('hero.title')}</h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            {t('hero.subtitle')}
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {stats.map((s, i) => {
              const Icon = STAT_ICONS[i] || Warehouse;
              return (
                <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                  <Icon size={24} className="text-brand-cyan mx-auto mb-3" />
                  <p className="font-bold text-white leading-tight">{s.value}</p>
                  <p className="text-gray-400 text-sm">{s.label}</p>
                </div>
              );
            })}
          </div>
        </div>
      </header>

      {/* Cartes services */}
      <section className="bg-brand-light py-24">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {cards.map((c, i) => {
              const meta = CARD_META[i] || CARD_META[0];
              const Icon = meta.icon;
              const bullets = String(c.bullets || '').split('|').filter(Boolean);
              return (
                <div
                  key={meta.path}
                  className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-lg shadow-brand-dark/5 flex flex-col"
                >
                  <span className="w-14 h-14 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-6">
                    <Icon size={26} />
                  </span>
                  <h2 className="font-bold text-xl uppercase tracking-tight text-brand-dark mb-3">{c.title}</h2>
                  <p className="text-gray-600 leading-relaxed mb-6">{c.desc}</p>
                  <ul className="space-y-3 mb-8">
                    {bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-700 text-sm">
                        <Check size={16} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                  <Link
                    to={meta.path}
                    className="mt-auto inline-flex items-center gap-2 text-brand-cyan font-bold text-xs uppercase tracking-widest group"
                  >
                    En savoir plus
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <ServiceContactBlock subject="Services" />
    </div>
  );
}
