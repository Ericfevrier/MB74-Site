import React, { useState } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { Helmet } from 'react-helmet-async';
import {
  ArrowRight, Phone, Calendar, Users, Gauge, Clock, Ruler, MapPin, Check, ChevronDown,
  ShieldCheck, Wallet, Wrench, Waves,
} from 'lucide-react';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { getUsedBoatBySlug, allUsedBoats, availableUsedBoats } from '../data/usedBoats';
import { getBrandModels } from '../data/boatBrands';
import { UsedBoatCard } from '../components/UsedBoatCard';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';

const firstInt = (s?: string): number | undefined => {
  const m = s?.match(/\d[\d\s]*/);
  return m ? parseInt(m[0].replace(/\s/g, ''), 10) : undefined;
};

export function OccasionDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const boat = getUsedBoatBySlug(slug);
  const [activeImg, setActiveImg] = useState(0);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  if (!boat) {
    return <Navigate to="/bateaux/occasion" replace />;
  }

  const brand = getBrandModels(boat.brandId);
  const brandName = brand?.name || (boat.brandId === 'heyday' ? 'Heyday' : boat.brandId === 'malibu' ? 'Malibu' : undefined);
  const model = brand?.models[boat.modelSlug];
  const modelPath = model ? `/${boat.brandId}/${model.slug}` : undefined;
  const gallery = boat.gallery && boat.gallery.length ? boat.gallery : [boat.image];
  const canonical = `${SITE.url}/bateaux/occasion/${boat.slug}/`;
  const heroAbs = boat.image.startsWith('http') ? boat.image : `${SITE.url}${boat.image}`;

  // Bateaux similaires (même marque), repli sur les autres disponibles.
  let related = allUsedBoats().filter((b) => b.slug !== boat.slug && b.brandId === boat.brandId);
  if (related.length === 0) related = availableUsedBoats().filter((b) => b.slug !== boat.slug);
  related = related.slice(0, 3);

  const keySpecs = [
    boat.year && { Icon: Calendar, label: 'Millésime', value: boat.year },
    boat.hours && { Icon: Clock, label: 'Heures moteur', value: boat.hours },
    boat.length && { Icon: Ruler, label: 'Longueur', value: boat.length },
    boat.capacity && { Icon: Users, label: 'Capacité', value: boat.capacity },
    boat.power && { Icon: Gauge, label: 'Motorisation', value: boat.power },
    boat.location && { Icon: MapPin, label: 'Localisation', value: boat.location },
  ].filter(Boolean) as { Icon: typeof Calendar; label: string; value: string }[];

  const specRows = [
    brandName && { label: 'Marque', value: brandName },
    { label: 'Modèle', value: model?.fullName || model?.name || boat.title },
    boat.year && { label: 'Millésime', value: boat.year },
    boat.power && { label: 'Motorisation', value: boat.power },
    boat.hours && { label: 'Heures moteur', value: boat.hours },
    boat.length && { label: 'Longueur', value: boat.length },
    boat.capacity && { label: 'Capacité', value: boat.capacity },
    boat.location && { label: 'Localisation', value: boat.location },
    { label: 'État', value: boat.sold ? 'Vendu' : 'Occasion révisée' },
  ].filter(Boolean) as { label: string; value: string }[];

  const seating = firstInt(boat.capacity);
  const hoursNum = firstInt(boat.hours);

  const faqs = [
    boat.sold
      ? {
          q: `Le ${boat.title} ${boat.year} est-il encore disponible ?`,
          a: `Ce ${boat.title} a été vendu. Motor Boat 74 peut rechercher pour vous un modèle équivalent : contactez-nous pour lancer une recherche sur mesure, nous vous alertons dès qu’un bateau correspondant arrive.`,
        }
      : {
          q: `Le ${boat.title} ${boat.year} est-il disponible ?`,
          a: `Oui, ce ${boat.title} ${boat.year} est actuellement disponible chez Motor Boat 74, près du lac d’Annecy. Contactez-nous au ${SITE.phoneDisplay} pour vérifier la disponibilité, organiser une visite ou un essai.`,
        },
    {
      q: 'Puis-je essayer ce bateau avant l’achat ?',
      a: 'Oui. Nous organisons des essais sur l’eau sur le lac d’Annecy pour vous permettre de prendre en main le bateau et de valider votre choix avant l’achat.',
    },
    {
      q: 'Reprenez-vous mon bateau actuel ?',
      a: 'Oui, Motor Boat 74 propose la reprise de votre bateau. Nous l’estimons et déduisons sa valeur du prix, pour simplifier votre changement.',
    },
    {
      q: 'Le financement est-il possible ?',
      a: 'Oui, nous proposons des solutions de financement sur mesure pour les bateaux d’occasion comme neufs. Parlons-en pour adapter les mensualités à votre projet.',
    },
    {
      q: 'Ce bateau d’occasion est-il révisé et garanti ?',
      a: 'Chaque bateau d’occasion est contrôlé et préparé par nos ateliers avant la vente (mécanique, coque, sellerie). Nous assurons ensuite son entretien, son hivernage et son SAV.',
    },
  ];

  const additionalProperty = [
    boat.hours && { '@type': 'PropertyValue', name: 'Heures moteur', value: boat.hours },
    boat.length && { '@type': 'PropertyValue', name: 'Longueur', value: boat.length },
    boat.location && { '@type': 'PropertyValue', name: 'Localisation', value: boat.location },
  ].filter(Boolean);

  const nextYear = new Date();
  nextYear.setFullYear(nextYear.getFullYear() + 1);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': ['Product', 'Vehicle'],
      name: `${boat.title} ${boat.year} d’occasion`,
      image: gallery.map((g) => (g.startsWith('http') ? g : `${SITE.url}${g}`)),
      description: boat.description || `${boat.title} ${boat.year} d’occasion, révisé par Motor Boat 74, près du lac d’Annecy.`,
      ...(brandName ? { brand: { '@type': 'Brand', name: brandName } } : {}),
      ...(model ? { model: model.fullName || model.name } : {}),
      vehicleModelDate: boat.year,
      productionDate: boat.year,
      itemCondition: 'https://schema.org/UsedCondition',
      ...(boat.power ? { vehicleEngine: { '@type': 'EngineSpecification', name: boat.power } } : {}),
      ...(seating ? { vehicleSeatingCapacity: seating } : {}),
      ...(hoursNum
        ? { mileageFromOdometer: { '@type': 'QuantitativeValue', value: hoursNum, unitText: 'heures' } }
        : {}),
      ...(additionalProperty.length ? { additionalProperty } : {}),
      offers: {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        ...(boat.priceValue ? { price: boat.priceValue, priceValidUntil: nextYear.toISOString().slice(0, 10) } : {}),
        availability: boat.sold ? 'https://schema.org/SoldOut' : 'https://schema.org/InStock',
        itemCondition: 'https://schema.org/UsedCondition',
        url: canonical,
        seller: { '@type': 'AutoDealer', name: SITE.name, telephone: SITE.phoneDisplay },
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
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
    },
  ];

  return (
    <div className="bg-brand-light">
      <Helmet>
        <title>{`${boat.title} ${boat.year} d’occasion${boat.price && !boat.sold ? ` - ${boat.price}` : ''} | Motor Boat 74`}</title>
        <meta
          name="description"
          content={`${boat.title} ${boat.year} d’occasion${brandName ? ` (${brandName})` : ''} chez Motor Boat 74, près du lac d’Annecy. ${boat.power ? boat.power + '. ' : ''}${boat.hours ? boat.hours + ' moteur. ' : ''}Révisé, essai sur l’eau, reprise et financement.`}
        />
        <link rel="canonical" href={canonical} />
        {boat.sold && <meta name="robots" content="noindex, follow" />}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`${boat.title} ${boat.year} d’occasion | Motor Boat 74`} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={heroAbs} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* ===================== HERO ===================== */}
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
                <span
                  className={`absolute top-4 left-4 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-full ${
                    boat.sold ? 'bg-red-500 text-white' : 'bg-brand-cyan text-brand-dark'
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${boat.sold ? 'bg-white' : 'bg-brand-dark'}`} />
                  {boat.sold ? 'Vendu' : 'Disponible'}
                </span>
              </div>
              {gallery.length > 1 && (
                <div className="flex flex-wrap gap-3 mt-4">
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

              <dl className="grid sm:grid-cols-2 gap-4 mb-9">
                {keySpecs.map((s) => (
                  <div key={s.label} className="flex items-center gap-3 bg-ink-900 border border-white/10 rounded-2xl px-5 py-4">
                    <s.Icon size={18} className="text-brand-cyan flex-shrink-0" />
                    <div className="min-w-0">
                      <dt className="text-gray-400 text-[11px] uppercase tracking-widest">{s.label}</dt>
                      <dd className="font-semibold text-white text-sm">{s.value}</dd>
                    </div>
                  </div>
                ))}
              </dl>

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
                    Voir les occasions disponibles <ArrowRight size={14} />
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ===================== DÉTAILS ===================== */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-10 lg:gap-14 items-start">
          {/* Colonne principale */}
          <div className="lg:col-span-2 space-y-12">
            {boat.description && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand-dark mb-5">Présentation</h2>
                <p className="text-gray-600 text-lg leading-relaxed">{boat.description}</p>
              </div>
            )}

            {boat.highlights && boat.highlights.length > 0 && (
              <div>
                <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand-dark mb-6">Points forts &amp; équipements</h2>
                <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-4">
                  {boat.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-700">
                      <span className="w-6 h-6 rounded-full bg-brand-cyan/10 text-brand-cyan flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check size={14} />
                      </span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div>
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand-dark mb-6">Caractéristiques techniques</h2>
              <dl className="bg-white border border-gray-200 rounded-3xl overflow-hidden divide-y divide-gray-100">
                {specRows.map((r) => (
                  <div key={r.label} className="flex items-center justify-between gap-4 px-6 py-4">
                    <dt className="text-gray-500 text-sm uppercase tracking-wide">{r.label}</dt>
                    <dd className="font-semibold text-brand-dark text-sm text-right">{r.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Aside sticky */}
          <aside className="lg:sticky lg:top-28 space-y-6">
            <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-lg shadow-brand-dark/5">
              <p className="text-[11px] uppercase tracking-widest text-gray-400 mb-1">{boat.sold ? 'Vendu' : 'Prix'}</p>
              <p className={`text-3xl font-bold mb-5 ${boat.sold ? 'text-gray-400 line-through' : 'text-brand-dark'}`}>{boat.price}</p>
              {!boat.sold ? (
                <div className="space-y-3">
                  <a href={SITE.phoneHref} className="w-full inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl hover:bg-brand-dark hover:text-white transition">
                    <Phone size={15} /> {SITE.phoneDisplay}
                  </a>
                  <a href="#contact" className="w-full inline-flex items-center justify-center gap-2 border border-gray-200 text-brand-dark font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
                    Demander des infos <ArrowRight size={14} />
                  </a>
                </div>
              ) : (
                <Link to="/bateaux/occasion" className="w-full inline-flex items-center justify-center gap-2 bg-brand-dark text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl hover:bg-brand-cyan hover:text-brand-dark transition">
                  Voir les disponibles <ArrowRight size={14} />
                </Link>
              )}
            </div>

            {/* Engagements */}
            <div className="bg-white border border-gray-200 rounded-3xl p-7 shadow-lg shadow-brand-dark/5">
              <h2 className="text-sm font-bold uppercase tracking-tight text-brand-dark mb-4">Nos engagements</h2>
              <ul className="space-y-4">
                {[
                  { Icon: Wrench, t: 'Révisé avant la vente' },
                  { Icon: ShieldCheck, t: 'Historique transparent' },
                  { Icon: Wallet, t: 'Reprise & financement' },
                  { Icon: Waves, t: 'Essai sur le lac d’Annecy' },
                ].map(({ Icon, t }, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700 text-sm">
                    <span className="w-9 h-9 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center flex-shrink-0">
                      <Icon size={17} />
                    </span>
                    {t}
                  </li>
                ))}
              </ul>
            </div>

            {modelPath && model && (
              <div className="bg-brand-dark text-white rounded-3xl p-7">
                <h2 className="text-sm font-bold uppercase tracking-tight mb-2">Découvrir le modèle neuf</h2>
                <p className="text-gray-300 text-sm leading-relaxed mb-5">
                  Caractéristiques, équipements et points forts du {model.fullName || model.name} neuf.
                </p>
                <Link to={modelPath} className="inline-flex items-center gap-2 text-brand-cyan font-bold uppercase tracking-widest text-xs hover:underline">
                  Voir le {model.short} neuf <ArrowRight size={14} />
                </Link>
              </div>
            )}
          </aside>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section className="bg-white py-16 lg:py-20 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand-dark mb-8 text-center">Questions fréquentes</h2>
          <div className="space-y-3">
            {faqs.map((f, i) => (
              <div key={i} className="bg-brand-light border border-gray-200 rounded-2xl overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  aria-expanded={openFaq === i}
                  className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left font-bold text-brand-dark uppercase tracking-tight text-sm"
                >
                  <h3 className="font-bold">{f.q}</h3>
                  <ChevronDown size={18} className={`text-brand-cyan flex-shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === i && <p className="px-6 pb-5 text-gray-600 leading-relaxed text-sm">{f.a}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== SIMILAIRES ===================== */}
      {related.length > 0 && (
        <section className="bg-brand-light py-16 lg:py-20">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-10">
              <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand-dark">Bateaux similaires</h2>
              <Link to="/bateaux/occasion" className="inline-flex items-center gap-1.5 text-brand-cyan font-bold uppercase tracking-widest text-xs hover:underline whitespace-nowrap">
                Toutes les occasions <ArrowRight size={14} />
              </Link>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {related.map((b) => (
                <UsedBoatCard key={b.slug} boat={b} variant={b.sold ? 'sold' : 'available'} />
              ))}
            </div>
          </div>
        </section>
      )}

      <ServiceContactBlock subject={`Occasion ${boat.title} ${boat.year}`} title="Intéressé par ce bateau ?" showMap />
    </div>
  );
}
