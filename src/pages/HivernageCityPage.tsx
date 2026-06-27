import React from 'react';
import { useParams, Navigate, Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Phone, ArrowRight, ShipWheel, Warehouse, Wrench, Anchor, MapPin, ShieldCheck, CheckCircle2, Sofa, Truck, Caravan, LifeBuoy } from 'lucide-react';
import { getHivernageCity, type HivernageCity } from '../data/hivernageCities';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';
import { ZonesMap } from '../components/ZonesMap';
import { getZones } from '../data/hivernageZones';

const SOLUTIONS = [
  { icon: ShipWheel, title: "Sortie de l'eau et essai avant stockage", desc: 'Notre équipe se déplace pour réaliser la sortie de votre bateau dans les meilleures conditions.' },
  { icon: Warehouse, title: 'Stockage intérieur sécurisé et surveillé', desc: 'Protection maximale dans nos installations fermées de 3000 m².' },
  { icon: Wrench, title: 'Entretien annuel complet', desc: 'Maintenance complète pour préserver votre bateau et le préparer pour la saison prochaine.' },
  { icon: Anchor, title: "Remise en route et mise à l'eau", desc: 'Votre bateau est contrôlé et prêt à naviguer sur le lieu de votre choix.' },
];

export function HivernageCityPage({ city: cityProp }: { city?: HivernageCity | null } = {}) {
  const { slug } = useParams<{ slug: string }>();
  const city = cityProp !== undefined ? cityProp : slug ? getHivernageCity(slug) : undefined;
  if (!city) return <Navigate to="/hivernage-stockage-bateau" replace />;

  const canonical = `${SITE.url}/services/hivernage-bateaux/${city.slug}/`;
  const reasons = [
    { icon: MapPin, title: 'Expertise locale', desc: `Connaissance du ${city.lake} et de ses environs.` },
    { icon: ShieldCheck, title: 'Sécurité maximale', desc: 'Nos locaux sont sous vidéosurveillance toute l’année.' },
    { icon: CheckCircle2, title: 'Service complet', desc: "De la sortie de l'eau à la remise à l'eau." },
  ];

  // Préposition correcte selon la ville (d'Annecy, de Genève, du Lac de Serre-Ponçon…).
  const dePlace = city.city.startsWith('Lac')
    ? `du ${city.city}`
    : /^[AEÉÈIOUaeiouéè]/.test(city.city)
      ? `d’${city.city}`
      : `de ${city.city}`;
  const isAnnecy = city.slug === 'annecy';
  const isFar = city.slug === 'lac-de-serre-poncon';

  // Maillage interne : autres services contextualisés à la zone.
  // Dépannage uniquement pour Annecy (spécifique au lac) ; Serre-Ponçon (trop éloigné) → transport seul.
  const SERVICES_LOCAUX = [
    { key: 'entretien', icon: Wrench, name: 'Entretien & réparation', to: '/entretien-reparation', desc: `Révision moteur, mécanique et réparations toutes marques pour les bateaux ${dePlace}.` },
    { key: 'sellerie', icon: Sofa, name: 'Sellerie marine', to: '/sellerie', desc: 'Réfection, réparation et personnalisation de sellerie nautique sur mesure.' },
    { key: 'transport', icon: Truck, name: 'Transport de bateau', to: '/transport', desc: `Transport sécurisé de votre bateau ${dePlace} vers notre atelier ou votre lieu de mise à l’eau.` },
    { key: 'remorques', icon: Caravan, name: 'Remorques', to: '/remorques', desc: `Vente et conseil de remorques adaptées à votre bateau, autour ${dePlace}.` },
    { key: 'depannage', icon: LifeBuoy, name: 'Dépannage sur le lac', to: '/depannage', desc: 'Intervention rapide 7j/7 et remorquage en cas de panne sur le lac d’Annecy.', annecyOnly: true },
  ];
  const otherServices = isFar
    ? SERVICES_LOCAUX.filter((s) => s.key === 'transport')
    : SERVICES_LOCAUX.filter((s) => !s.annecyOnly || isAnnecy);

  const zones = getZones(city.slug);

  const schemaService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Hivernage et stockage de bateaux, ${city.city}`,
    serviceType: 'Hivernage et stockage de bateau',
    description: city.metaDescription,
    areaServed: { '@type': 'Place', name: city.city },
    provider: {
      '@type': 'LocalBusiness',
      '@id': `${SITE.url}/#business`,
      name: SITE.name,
      telephone: SITE.phoneHref.replace('tel:', ''),
      email: SITE.email,
      url: SITE.url,
      address: {
        '@type': 'PostalAddress',
        streetAddress: SITE.addressStreet,
        postalCode: SITE.addressPostal,
        addressLocality: SITE.addressLocality,
        addressRegion: SITE.addressRegion,
        addressCountry: SITE.addressCountry,
      },
    },
  };
  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Hivernage / Stockage', item: `${SITE.url}/hivernage-stockage-bateau` },
      { '@type': 'ListItem', position: 3, name: city.city, item: canonical },
    ],
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>{city.metaTitle}</title>
        <meta name="description" content={city.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={city.metaTitle} />
        <meta property="og:description" content={city.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE.url}${city.hero}`} />
        <meta name="geo.region" content="FR-74" />
        <meta name="geo.placename" content={`${city.city}, Haute-Savoie`} />
        <script type="application/ld+json">{JSON.stringify(schemaService)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={city.hero} alt={`Hivernage de bateau à ${city.city}`} className="w-full h-full object-cover opacity-40" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/40" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-28">
          <Breadcrumb
            items={[
              { label: 'Accueil', to: '/' },
              { label: 'Hivernage & Stockage', to: '/hivernage-stockage-bateau' },
              { label: city.city },
            ]}
          />
          <span className="inline-block text-brand-cyan font-bold uppercase tracking-widest text-xs mb-4">Service local à {city.city}</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-tight max-w-3xl mb-6">{city.h1}</h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mb-8">{city.intro}</p>
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition shadow-xl shadow-brand-cyan/20">Demander un devis <ArrowRight size={16} /></a>
            <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition"><Phone size={16} /> Appeler maintenant</a>
          </div>
        </div>
      </header>

      {/* Solutions */}
      <section className="bg-brand-light py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mb-5">Des solutions d’hivernage adaptées à votre bateau</h2>
            <p className="text-gray-600 text-lg leading-relaxed">
              Nos équipes prennent en charge l’ensemble des opérations nécessaires à la préservation de votre bateau : mise hors de l’eau, nettoyage de coque, hivernage moteur, contrôle de batterie et inspection générale. Nous préparons également la remise à l’eau pour que vous puissiez reprendre la navigation dès les beaux jours.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SOLUTIONS.map((s, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-3xl p-7 shadow-lg shadow-brand-dark/5">
                <span className="w-12 h-12 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-5"><s.icon size={22} /></span>
                <h3 className="font-bold text-brand-dark mb-2 leading-tight">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pourquoi */}
      <section className="bg-brand-dark text-white py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-12">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-5">Pourquoi nous faire confiance ?</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Basée en Haute-Savoie, notre équipe connaît parfaitement les spécificités du {city.lake} et les conditions locales. Nous garantissons une manutention soignée et un service personnalisé pour chaque embarcation. Grâce à nos installations modernes et notre expertise technique, votre bateau reste entre de bonnes mains tout l’hiver.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-7">
                <span className="w-12 h-12 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-5"><r.icon size={22} /></span>
                <h3 className="font-bold text-lg text-brand-cyan mb-2">{r.title}</h3>
                <p className="text-gray-300 leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Expertise hyper-locale */}
      {city.localExpertise && (
        <section className="bg-brand-light py-20 border-t border-gray-200">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mb-12">
              <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs block mb-3">Notre connaissance du terrain</span>
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mb-5">
                Hivernage à {city.city} : ce que nous savons du plan d’eau
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">{city.localExpertise.intro}</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-6">
              {city.localExpertise.facts.map((f, i) => (
                <div key={i} className="bg-white border border-gray-200 border-l-4 border-l-brand-cyan rounded-3xl p-7 shadow-lg shadow-brand-dark/5">
                  <h3 className="font-bold text-brand-dark mb-2 leading-tight uppercase tracking-tight text-sm">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Zones d'intervention / ports */}
      {city.ports.length > 0 && (
        <section className="bg-brand-light py-20">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mb-12">
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mb-5">
                Nos zones d’intervention autour {city.city.startsWith('Lac') ? `du ${city.city}` : /^[AEÉÈIOUaeiouéè]/.test(city.city) ? `d’${city.city}` : `de ${city.city}`}
              </h2>
              <p className="text-gray-600 text-lg leading-relaxed">{city.zonesIntro}</p>
            </div>
            {/* Carte des zones d'intervention : 1 pin cyan par zone, nom au survol, auto-zoom */}
            {zones.length > 0 && (
              <>
                <div className="h-[380px] sm:h-[460px] rounded-[2rem] overflow-hidden border border-gray-200 ring-1 ring-black/5 shadow-xl shadow-brand-dark/5 bg-[#e8eef2]">
                  <ZonesMap zones={zones} ariaLabel={`Carte des zones d'intervention autour ${dePlace}`} />
                </div>
                <p className="mb-10 mt-2 text-right text-[10px] text-gray-400">Fond de carte © OpenStreetMap, © CARTO</p>
              </>
            )}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {city.ports.map((p, i) => (
                <div key={i} className="bg-white border border-gray-200 rounded-3xl p-7 shadow-lg shadow-brand-dark/5">
                  <div className="flex items-center gap-3 mb-3">
                    <Anchor size={18} className="text-brand-cyan flex-shrink-0" />
                    <h3 className="font-bold text-brand-dark leading-tight">{p.title}</h3>
                  </div>
                  <p className="text-gray-500 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nos autres services dans la zone (maillage interne local) */}
      <section className="bg-brand-dark text-white py-20 border-t border-white/5">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="max-w-3xl mb-12">
            <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs block mb-3">Une prise en charge complète</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-5">Nos autres services autour {dePlace}</h2>
            <p className="text-gray-300 text-lg leading-relaxed">
              Au-delà de l’hivernage, Motor Boat 74 accompagne les propriétaires {dePlace} sur tout le cycle de vie de leur bateau, de l’entretien à la revente.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {otherServices.map((s) => (
              <Link
                key={s.key}
                to={s.to}
                className="group bg-white/5 border border-white/10 rounded-3xl p-7 hover:bg-white/[0.08] hover:border-brand-cyan/40 transition-all"
              >
                <span className="w-12 h-12 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-5 group-hover:bg-brand-cyan group-hover:text-brand-dark transition-colors">
                  <s.icon size={22} />
                </span>
                <h3 className="font-bold text-lg mb-2 group-hover:text-brand-cyan transition-colors">{s.name}</h3>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{s.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-brand-cyan font-bold uppercase tracking-widest text-xs">
                  En savoir plus <ArrowRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ServiceContactBlock subject={`Hivernage ${city.city}`} />
    </div>
  );
}
