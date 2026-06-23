import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Phone, Calendar, Users, Gauge, Clock, Ruler, MapPin, Check } from 'lucide-react';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { getUsedBoatBySlug } from '../data/usedBoats';
import { getBrandModels } from '../data/boatBrands';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';

export function OccasionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const boat = getUsedBoatBySlug(slug);
  const [activeImg, setActiveImg] = useState(0);

  if (!boat) {
    return <Navigate to="/bateaux/occasion" replace />;
  }

  const brand = getBrandModels(boat.brandId);
  const brandName = brand?.name;
  const model = brand?.models[boat.modelSlug];
  const modelPath = model ? `/${boat.brandId}/${model.slug}` : undefined;
  const gallery = boat.gallery && boat.gallery.length ? boat.gallery : [boat.image];
  const canonical = `${SITE.url}/bateaux/occasion/${boat.slug}/`;
  const heroAbs = boat.image.startsWith('http') ? boat.image : `${SITE.url}${boat.image}`;

  const specs = [
    boat.year && { Icon: Calendar, label: 'Millésime', value: boat.year },
    boat.hours && { Icon: Clock, label: 'Heures moteur', value: boat.hours },
    boat.length && { Icon: Ruler, label: 'Longueur', value: boat.length },
    boat.capacity && { Icon: Users, label: 'Capacité', value: boat.capacity },
    boat.power && { Icon: Gauge, label: 'Motorisation', value: boat.power },
    boat.location && { Icon: MapPin, label: 'Localisation', value: boat.location },
  ].filter(Boolean) as { Icon: typeof Calendar; label: string; value: string }[];

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': ['Product', 'Vehicle'],
      name: `${boat.title} ${boat.year} d’occasion`,
      image: heroAbs,
      description: boat.description,
      brand: brandName ? { '@type': 'Brand', name: brandName } : undefined,
      vehicleModelDate: boat.year,
      itemCondition: 'https://schema.org/UsedCondition',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        ...(boat.priceValue ? { price: boat.priceValue } : {}),
        availability: boat.sold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
        url: canonical,
        seller: { '@type': 'Organization', name: SITE.name },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Bateaux', item: `${SITE.url}/bateaux/` },
        { '@type': 'ListItem', position: 3, name: 'Bateaux d’occasion', item: `${SITE.url}/bateaux/occasion/` },
        { '@type': 'ListItem', position: 4, name: `${boat.title} ${boat.year}`, item: canonical },
      ],
    },
  ];

  return (
    <div className="bg-brand-light">
      <Helmet>
        <title>{`${boat.title} ${boat.year} d’occasion${boat.price && !boat.sold ? ` - ${boat.price}` : ''} | Motor Boat 74`}</title>
        <meta
          name="description"
          content={`${boat.title} ${boat.year} d’occasion chez Motor Boat 74, près du lac d’Annecy. ${boat.capacity ? boat.capacity + '. ' : ''}${boat.power ? boat.power + '. ' : ''}Révisé et garanti, reprise et financement possibles.`}
        />
        <link rel="canonical" href={canonical} />
        {boat.sold && <meta name="robots" content="noindex, follow" />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${boat.title} ${boat.year} d’occasion | Motor Boat 74`} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={heroAbs} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Contenu */}
      <div className="bg-brand-dark text-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-10 pb-16 lg:pt-12 lg:pb-20">
          <Breadcrumb
            className="mb-8"
            items={[
              { label: 'Accueil', to: '/' },
              { label: 'Bateaux', to: '/bateaux' },
              { label: 'Occasion', to: '/bateaux/occasion' },
              { label: `${boat.title} ${boat.year}` },
            ]}
          />

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14 items-start">
            {/* Galerie */}
            <div>
              <div className="relative aspect-[4/3] rounded-[2rem] overflow-hidden border border-white/10 bg-ink-900 shadow-2xl">
                <img src={gallery[activeImg]} alt={`${boat.title} ${boat.year} d’occasion`} className="w-full h-full object-cover" referrerPolicy="no-referrer" fetchPriority="high" />
                {boat.sold && <span className="absolute top-4 left-4 bg-red-500 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full">Vendu</span>}
              </div>
              {gallery.length > 1 && (
                <div className="flex gap-3 mt-4">
                  {gallery.map((src, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveImg(i)}
                      aria-label={`Photo ${i + 1}`}
                      className={`relative w-24 aspect-[4/3] rounded-xl overflow-hidden border transition ${i === activeImg ? 'border-brand-cyan' : 'border-white/10 opacity-70 hover:opacity-100'}`}
                    >
                      <img src={src} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Infos */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <span className="w-8 h-1 bg-brand-cyan rounded-full" />
                <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">
                  {brandName ? `${brandName} d’occasion` : 'Bateau d’occasion'} · Millésime {boat.year}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-[1.05] mb-5">{boat.title}</h1>
              <p className={`text-3xl font-bold mb-8 ${boat.sold ? 'text-gray-500 line-through' : 'text-brand-cyan'}`}>{boat.price}</p>

              {boat.description && <p className="text-gray-300 text-lg leading-relaxed mb-8">{boat.description}</p>}

              {/* Specs */}
              <dl className="grid sm:grid-cols-2 gap-4 mb-9">
                {specs.map((s) => (
                  <div key={s.label} className="flex items-center gap-3 bg-ink-900 border border-white/10 rounded-2xl px-5 py-4">
                    <s.Icon size={18} className="text-brand-cyan flex-shrink-0" />
                    <div className="min-w-0">
                      <dt className="text-gray-400 text-[11px] uppercase tracking-widest">{s.label}</dt>
                      <dd className="font-semibold text-white text-sm">{s.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

              {/* CTA */}
              {!boat.sold ? (
                <div className="flex flex-col sm:flex-row gap-4">
                  <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition shadow-xl shadow-brand-cyan/20">
                    <Phone size={16} /> {SITE.phoneDisplay}
                  </a>
                  <a href="#contact" className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
                    Demander des infos <ArrowRight size={16} />
                  </a>
                </div>
              ) : (
                <div className="bg-ink-900 border border-white/10 rounded-2xl p-6">
                  <p className="text-gray-300 mb-4">Ce bateau est vendu. Nous pouvons rechercher un modèle équivalent pour vous.</p>
                  <Link to="/bateaux/occasion" className="inline-flex items-center gap-2 text-brand-cyan font-bold uppercase tracking-widest text-xs hover:underline">
                    Voir les autres occasions <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Points forts + lien modèle neuf */}
      {(boat.highlights?.length || modelPath) && (
        <section className="bg-brand-light py-16">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-8">
            {boat.highlights && boat.highlights.length > 0 && (
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-dark mb-6">Points forts de ce bateau</h2>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {boat.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <Check size={18} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {modelPath && model && (
              <aside className="bg-white border border-gray-200 rounded-3xl p-7 shadow-lg shadow-brand-dark/5">
                <h2 className="text-lg font-bold uppercase tracking-tight text-brand-dark mb-2">Découvrir le modèle neuf</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">
                  Consultez la fiche complète du {model.fullName || model.name} : caractéristiques, équipements et points forts.
                </p>
                <Link to={modelPath} className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold uppercase tracking-widest text-xs px-6 py-3.5 rounded-xl hover:bg-brand-cyan hover:text-brand-dark transition">
                  Voir le {model.short} neuf <ArrowRight size={14} />
                </Link>
              </aside>
            )}
          </div>
        </section>
      )}

      <ServiceContactBlock subject={`Occasion ${boat.title} ${boat.year}`} title="Intéressé par ce bateau ?" showMap />
    </div>
  );
}
