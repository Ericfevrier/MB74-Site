import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Check, Shield, Wrench, LifeBuoy, Truck, Sofa, Caravan, Warehouse, Clock, MapPin } from 'lucide-react';
import { SITE } from '../data/site';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';

interface HubCard {
  title: string;
  desc: string;
  bullets: string[];
  path: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
}

const cards: HubCard[] = [
  {
    title: 'Hivernage / Stockage',
    desc: 'Hivernage bateau sécurisé dans nos hangars de 3000 m² avec alarme sécurisée. Préparation complète moteur et coque incluse.',
    bullets: ['Stockage intérieur ventilé', 'Protection humidité & gel', 'Nettoyage avant remise à l’eau'],
    path: '/hivernage-stockage-bateau',
    icon: Shield,
  },
  {
    title: 'Entretien / Réparation',
    desc: 'Entretien moteur bateau toutes marques, réparations mécaniques, électriques et électroniques avec techniciens certifiés.',
    bullets: ['Révision moteur inboard / hors-bord', 'Diagnostic électronique', 'Réparations fibre et gelcoat'],
    path: '/services/entretien-reparation',
    icon: Wrench,
  },
  {
    title: 'Dépannage',
    desc: 'Dépannage bateau 7j/7 sur le Lac d’Annecy. Intervention sur panne moteur, batterie ou carburant, avec remorquage.',
    bullets: ['Dépannage sur zone, Lac d’Annecy', 'Assistance moteur inboard / hors-bord', 'Remorquage jusqu’au port'],
    path: '/services/depannage',
    icon: LifeBuoy,
  },
  {
    title: 'Transport en Europe',
    desc: 'Transport bateau sécurisé avec remorque adaptée, par des professionnels expérimentés. Prise en charge sur site et livraison partout en Europe.',
    bullets: ['Tous modèles et tailles', 'Arrimage et calage professionnel', 'Assurance incluse'],
    path: '/services/transport-de-bateau',
    icon: Truck,
  },
  {
    title: 'Sellerie',
    desc: 'Sellerie bateau sur-mesure : tauds, coussins, biminis. Réparations ou créations avec tissus techniques marins.',
    bullets: ['Tissus anti-UV / étanches', 'Confection personnalisée', 'Pose à quai ou atelier'],
    path: '/services/sellerie-de-bateau',
    icon: Sofa,
  },
  {
    title: 'Vente de remorques',
    desc: 'Remorques bateau simples ou doubles essieux, freinées, prêtes à l’emploi. Fournisseurs sélectionnés pour la qualité.',
    bullets: ['Adaptées wake, pêche, ski', 'Homologation CE', 'Réglage et mise à l’eau'],
    path: '/services/remorques-de-bateau',
    icon: Caravan,
  },
];

const stats = [
  { icon: Warehouse, value: 'Hangar sécurisé', label: '1300 m² avec alarme' },
  { icon: Clock, value: 'Dépannage 7j/7', label: 'sur le Lac d’Annecy' },
  { icon: MapPin, value: 'Transport', label: 'en France et en Europe' },
];

export function ServicesHubPage() {
  const canonical = `${SITE.url}/services/`;

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: canonical },
    ],
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>Nos Services Nautiques | Motor Boat 74</title>
        <meta
          name="description"
          content="Découvrez les services de MotorBoat74 à Annecy : vente de bateaux Nautique, hivernage sécurisé, entretien, dépannage, transport et sellerie en Haute-Savoie."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Nos Services Nautiques | Motor Boat 74" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE.url}/images/services/services-hub.jpg`} />
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="/images/services/services-hub.jpg"
            alt="Services nautiques Motor Boat 74"
            className="w-full h-full object-cover opacity-30"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6">Nos services</h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto mb-12">
            Découvrez notre gamme complète de services nautiques professionnels. De la vente à l’entretien, en passant
            par l’hivernage, MotorBoat74 vous accompagne dans tous vos projets nautiques.
          </p>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl mx-auto">
            {stats.map((s, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                <s.icon size={24} className="text-brand-cyan mx-auto mb-3" />
                <p className="font-bold text-white leading-tight">{s.value}</p>
                <p className="text-gray-400 text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Cartes services */}
      <section className="bg-brand-light py-24">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {cards.map((c) => (
              <div
                key={c.path}
                className="bg-white border border-gray-200 rounded-[2rem] p-8 shadow-lg shadow-brand-dark/5 flex flex-col"
              >
                <span className="w-14 h-14 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-6">
                  <c.icon size={26} />
                </span>
                <h2 className="font-bold text-xl uppercase tracking-tight text-brand-dark mb-3">{c.title}</h2>
                <p className="text-gray-600 leading-relaxed mb-6">{c.desc}</p>
                <ul className="space-y-3 mb-8">
                  {c.bullets.map((b, j) => (
                    <li key={j} className="flex items-start gap-3 text-gray-700 text-sm">
                      <Check size={16} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to={c.path}
                  className="mt-auto inline-flex items-center gap-2 text-brand-cyan font-bold text-xs uppercase tracking-widest group"
                >
                  En savoir plus
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ServiceContactBlock subject="Services" />
    </div>
  );
}
