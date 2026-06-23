import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown, ArrowRight, Phone, Ruler, Users, Gauge, Check, X,
  ChevronLeft, ChevronRight, Play, Sparkles, Fuel, Settings2,
} from 'lucide-react';
import { Breadcrumb } from './Breadcrumb';
import { getBrandModels } from '../data/boatBrands';
import { usedBoatsForModel } from '../data/usedBoats';
import { SITE } from '../data/site';
import { ServiceContactBlock } from './services/ServiceContactBlock';

const GROUP_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Dimensions: Ruler,
  Capacité: Users,
  Performance: Gauge,
};

export function ModelPage() {
  const { brandId, modelId } = useParams<{ brandId: string; modelId: string }>();
  const brand = getBrandModels(brandId);
  const model = brand && modelId ? brand.models[modelId] : undefined;
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [openOpt, setOpenOpt] = useState<number | null>(0);
  const [activeAnchor, setActiveAnchor] = useState<string>('');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [brandId, modelId]);

  const closeLb = useCallback(() => setLightbox(null), []);
  const stepLb = useCallback(
    (d: number) => setLightbox((i) => (i === null || !model ? i : (i + d + model.gallery.length) % model.gallery.length)),
    [model],
  );
  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLb();
      if (e.key === 'ArrowRight') stepLb(1);
      if (e.key === 'ArrowLeft') stepLb(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, closeLb, stepLb]);

  // Scrollspy : met en avant l'onglet de la section visible
  useEffect(() => {
    if (!model) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('section[id]')).filter((el) => el.id);
    if (els.length === 0) return;
    const order = els.map((el) => el.id);
    const visible = new Map<string, boolean>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) visible.set((e.target as HTMLElement).id, e.isIntersecting);
        const current = order.find((id) => visible.get(id));
        if (current) setActiveAnchor(current);
      },
      { rootMargin: '-180px 0px -65% 0px', threshold: 0 },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [model, modelId]);

  if (!model || !brand) {
    return <Navigate to={brand ? `/marque/${brand.id}` : '/'} replace />;
  }

  const brandName = brand.name;
  const brandPath = `/marque/${brand.id}`;
  const fullName = model.fullName || model.name;
  const studio = brand.studioImages;
  const isParagon = brand.id === 'nautique' && (model.slug.includes('paragon') || model.gamme.toLowerCase().includes('paragon'));
  // H1 : "Nautique G25 Paragon" pour les Paragon Nautique, nom complet sinon.
  const heroTitle = isParagon ? `Nautique ${model.short}` : model.name;
  const canonical = `${SITE.url}/${brand.id}/${model.slug}/`;
  const heroAbs = model.hero.startsWith('http') ? model.hero : `${SITE.url}${model.hero}`;
  const others = brand.order.filter((s) => s !== model.slug).map((s) => brand.models[s]);
  const hasEquip = Boolean(model.editions || model.motorizations || model.features || model.options);
  const occasions = brand.id === 'nautique' ? usedBoatsForModel(model.slug) : [];
  const milestones = (model.milestones ?? []).slice().sort((a, b) => Number(b.year) - Number(a.year));

  const anchors = [
    model.gallery.length > 1 && { id: 'galerie', label: 'Galerie' },
    model.highlights.length > 0 && { id: 'points-forts', label: 'Points forts' },
    { id: 'video', label: 'Vidéo' },
    model.specs.length > 0 && { id: 'specs', label: 'Specs' },
    milestones.length > 0 && { id: 'millesimes', label: 'Millésimes' },
    hasEquip && { id: 'equipements', label: 'Équipements' },
    { id: 'occasions', label: 'Occasions' },
    model.faqs.length > 0 && { id: 'faq', label: 'FAQ' },
    { id: 'contact', label: 'Prix & Contact' },
  ].filter(Boolean) as { id: string; label: string }[];

  /* ----------------------------- JSON-LD ----------------------------- */
  const business = {
    '@type': 'AutoDealer',
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
  };
  const schemaProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${fullName} ${model.year}`,
    brand: { '@type': 'Brand', name: brandName },
    category: 'Wakeboat / Bateau de sport nautique',
    image: [heroAbs],
    description: model.metaDescription,
    releaseDate: model.year,
    ...(milestones.length
      ? { additionalProperty: { '@type': 'PropertyValue', name: 'Millésimes documentés', value: milestones.map((m) => m.year).join(', ') } }
      : {}),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      url: canonical,
      seller: business,
    },
  };
  const schemaVehicle = {
    '@context': 'https://schema.org',
    '@type': 'Vehicle',
    name: `${fullName} ${model.year}`,
    brand: { '@type': 'Brand', name: brandName },
    vehicleConfiguration: model.gamme,
    ...(model.motorizations && model.motorizations.length
      ? {
          vehicleEngine: model.motorizations.map((m) => ({
            '@type': 'EngineSpecification',
            name: m.name,
            fuelType: m.fuel,
            enginePower: m.power,
          })),
        }
      : {}),
  };
  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: model.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') },
    })),
  };
  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Marques', item: `${SITE.url}${brandPath}` },
      { '@type': 'ListItem', position: 3, name: brandName, item: `${SITE.url}${brandPath}` },
      { '@type': 'ListItem', position: 4, name: model.short, item: canonical },
    ],
  };
  const schemaVideo = model.videoId
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: `${fullName}, vidéo`,
        description: `Présentation vidéo du ${fullName}.`,
        thumbnailUrl: [`https://i.ytimg.com/vi/${model.videoId}/hqdefault.jpg`],
        uploadDate: `${model.year}-01-01`,
        contentUrl: `https://www.youtube.com/watch?v=${model.videoId}`,
        embedUrl: `https://www.youtube.com/embed/${model.videoId}`,
      }
    : null;

  const sectionPad = 'scroll-mt-[180px]';

  return (
    <div className="bg-brand-dark text-gray-200">
      <Helmet>
        <title>{model.metaTitle}</title>
        <meta name="description" content={model.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="product" />
        <meta property="og:title" content={model.metaTitle} />
        <meta property="og:description" content={model.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={heroAbs} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="geo.region" content="FR-74" />
        <meta name="geo.placename" content="Lac d'Annecy, Haute-Savoie" />
        <script type="application/ld+json">{JSON.stringify(schemaProduct)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaVehicle)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
        {schemaVideo && <script type="application/ld+json">{JSON.stringify(schemaVideo)}</script>}
      </Helmet>

      {/* ===================== HERO ===================== */}
      {/* Hero : texte à gauche, bateau à droite (vue rotative) */}
      <header className="relative overflow-hidden bg-brand-dark">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-brand-cyan/10 rounded-full blur-[150px] -mr-40 -mt-40 pointer-events-none" />

        {/* Badge concessionnaire officiel (concessionnaire agréé uniquement) */}
        {brand.officialBadge && (
          <div className="absolute top-8 right-4 md:right-8 hidden lg:flex z-20">
            <div className="bg-white/10 backdrop-blur-md px-5 py-3 rounded-2xl border border-white/20 flex items-center gap-3 shadow-2xl">
              <span className="text-white text-[13px] font-bold tracking-[0.12em] uppercase whitespace-nowrap">Concessionnaire officiel</span>
              <div className="flex items-center border-l border-white/20 pl-3">
                <img
                  src="/images/design-sans-titre-10-11zon-e1753865977660-photoroom.png"
                  alt={`${brandName} concessionnaire officiel`}
                  className="h-9 object-contain"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        )}

        <div className="relative z-10 max-w-[1400px] mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 lg:py-10 lg:min-h-[68vh] grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="order-2 lg:order-1">
            <Breadcrumb
              className="mb-8"
              items={[
                { label: 'Accueil', to: '/' },
                { label: 'Marques', to: brandPath },
                { label: brandName, to: brandPath },
                { label: model.short },
              ]}
            />
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-1 bg-brand-cyan rounded-full" />
              <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">{model.gamme} · Millésime {model.year}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-[1.05] text-white mb-6">{heroTitle}</h1>
            <p className="text-gray-300 text-lg leading-relaxed max-w-xl mb-9">{model.tagline || model.intro[0]}</p>
            <div className="flex flex-col sm:flex-row flex-wrap gap-4">
              <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition shadow-xl shadow-brand-cyan/20 hover:-translate-y-0.5">
                Demander le prix <ArrowRight size={16} />
              </a>
              <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 border-2 border-white/40 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
                <Phone size={16} /> Réserver un essai
              </a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 text-white font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-xl hover:text-brand-cyan transition">
                <Settings2 size={16} /> Concevez votre {brandName}
              </a>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <RotatableBoat images={model.gallery} alt={`${fullName} ${model.year}`} studio={brand.studioImages} />
          </div>
        </div>
      </header>

      {/* ===================== MENU D'ANCRAGE STICKY ===================== */}
      <nav aria-label="Sommaire de la page" className="sticky top-[120px] z-40 bg-brand-dark/70 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1400px] mx-auto px-2 lg:px-8">
          <ul className="flex justify-start md:justify-center gap-1 overflow-x-auto hide-scrollbar py-2.5 text-[13px] font-bold uppercase tracking-[0.15em]">
            {anchors.map((a) => (
              <li key={a.id} className="flex-shrink-0">
                <a
                  href={`#${a.id}`}
                  aria-current={activeAnchor === a.id ? 'true' : undefined}
                  className={`block px-4 py-2 rounded-full transition-colors ${
                    activeAnchor === a.id
                      ? 'text-brand-cyan bg-brand-cyan/10'
                      : 'text-gray-400 hover:text-brand-cyan hover:bg-white/[0.07]'
                  }`}
                >
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ===================== PRÉSENTATION (texte gauche / image droite) ===================== */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <SectionEyebrow label="Le bateau" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-8 leading-tight">
              {model.name}, <span className="text-brand-cyan">l’expérience {brandName}</span>
            </h2>
            <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
              {model.intro.map((p, i) => <p key={i}>{p}</p>)}
              <p>
                Le {model.short} fait partie de la{' '}
                <Link to={brandPath} className="text-brand-cyan font-semibold hover:underline">gamme {brandName}</Link>, que nous présentons dans notre showroom au bord du lac d’Annecy.
              </p>
            </div>
          </div>
          <PresentationSlider images={model.gallery.length ? model.gallery : [model.hero]} alt={`${fullName}, design et finitions`} studio={studio} />
        </div>
      </section>

      {/* ===================== GALERIE ===================== */}
      {model.gallery.length > 1 && (
        <section id="galerie" className={`py-20 bg-ink-950 ${sectionPad}`}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <SectionEyebrow label="En images" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-10">Galerie</h2>
            {(() => {
              const MAX = 5;
              const visible = model.gallery.slice(0, MAX);
              const extra = model.gallery.length - visible.length;
              const mosaic = model.gallery.length >= MAX;
              return (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {visible.map((src, i) => {
                    const isFirst = i === 0 && mosaic;
                    const isLast = i === visible.length - 1;
                    const showMore = isLast && extra > 0;
                    return (
                      <button
                        key={i}
                        onClick={() => setLightbox(i)}
                        className={`group relative overflow-hidden rounded-3xl border border-white/10 ${studio ? 'bg-gradient-to-b from-white to-gray-100' : ''} ${isFirst ? 'row-span-2' : ''}`}
                        aria-label={showMore ? `Voir les ${extra} photos supplémentaires du ${fullName}` : `Agrandir la photo ${i + 1} du ${fullName}`}
                      >
                        <img
                          src={src}
                          alt={`${fullName}, photo ${i + 1}`}
                          loading="lazy"
                          referrerPolicy="no-referrer"
                          className={`w-full group-hover:scale-105 transition-transform duration-700 ${studio ? 'object-contain p-3' : 'object-cover'} ${isFirst ? 'h-full' : 'aspect-[4/3]'}`}
                        />
                        <span className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors" />
                        {showMore && (
                          <span className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 bg-brand-dark/70 backdrop-blur-[2px] text-white group-hover:bg-brand-dark/60 transition-colors">
                            <span className="text-4xl font-bold leading-none">+{extra}</span>
                            <span className="text-[11px] font-bold uppercase tracking-widest text-gray-200">photos</span>
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              );
            })()}
          </div>
        </section>
      )}

      {/* ===================== POINTS FORTS (alternés) ===================== */}
      {model.highlights.length > 0 && (
        <section id="points-forts" className={`py-20 bg-brand-dark ${sectionPad}`}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <SectionEyebrow label="Conçu pour rider" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-14">Les points forts du {model.name}</h2>
            <div className="space-y-14">
              {model.highlights.map((h, i) => {
                const hImg = model.highlightImages?.[i];
                const img = hImg || model.gallery[(i + 1) % model.gallery.length];
                const lifestyle = hImg ? true : !studio;
                const reverse = i % 2 === 1;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-80px' }}
                    transition={{ duration: 0.5 }}
                    className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center"
                  >
                    <div className={`overflow-hidden rounded-[2rem] border border-white/10 ${!lifestyle ? 'bg-gradient-to-b from-white to-gray-100' : ''} ${reverse ? 'lg:order-2' : ''}`}>
                      <img src={img} alt={`${fullName}, ${h.title.toLowerCase()}`} loading="lazy" referrerPolicy="no-referrer" className={`w-full h-full aspect-[16/10] ${lifestyle ? 'object-cover' : 'object-contain p-4'}`} />
                    </div>
                    <div className={reverse ? 'lg:order-1' : ''}>
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-brand-cyan/30 font-bold text-2xl">0{i + 1}</span>
                        <h3 className="font-bold text-2xl uppercase tracking-tight text-brand-cyan">{h.title}</h3>
                      </div>
                      <p className="text-gray-300 leading-relaxed text-lg">{h.text}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===================== VIDÉO + relance ===================== */}
      <section id="video" className={`py-20 bg-ink-950 ${sectionPad}`}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <SectionEyebrow label="En mouvement" />
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-10">Le {model.name} en vidéo</h2>
          {model.videoId ? (
            <div className="relative w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl aspect-video bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${model.videoId}`}
                title={`${fullName}, vidéo`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          ) : (
            <div className="rounded-[2rem] border border-white/10 bg-white/5 p-10 md:p-14 text-center">
              <div className="w-16 h-16 rounded-full bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mx-auto mb-5">
                <Play size={28} />
              </div>
              <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
                Envie de voir le {model.short} en vrai plutôt qu’en vidéo ? Réservez un essai sur le Lac d’Annecy ou le Léman.
              </p>
              <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition">
                <Phone size={16} /> Réserver un essai
              </a>
            </div>
          )}
        </div>
      </section>

      {/* ===================== SPÉCIFICATIONS ===================== */}
      {model.specs.length > 0 && (
        <section id="specs" className={`py-20 bg-brand-dark ${sectionPad}`}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <SectionEyebrow label="Fiche technique" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-12">Spécifications techniques</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {model.specs.map((g, i) => {
                const Icon = GROUP_ICON[g.group] ?? Gauge;
                return (
                  <div key={i} className="bg-ink-900 border border-white/10 rounded-3xl p-7">
                    <div className="flex items-center gap-3 mb-5">
                      <span className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center"><Icon size={20} /></span>
                      <h3 className="font-bold text-lg uppercase tracking-tight text-white">{g.group}</h3>
                    </div>
                    <dl className="space-y-3">
                      {g.items.map((it, j) => (
                        <div key={j} className="flex justify-between gap-4 border-b border-white/5 pb-2 last:border-0">
                          <dt className="text-gray-400 text-sm">{it.label}</dt>
                          <dd className="text-white font-semibold text-sm text-right">{it.value}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ===================== HISTORIQUE DES MILLÉSIMES (conditionnel) ===================== */}
      {milestones.length > 0 && (
        <section id="millesimes" className={`py-20 bg-ink-950 ${sectionPad}`}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <SectionEyebrow label="Historique" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-5 leading-tight">
              {model.name} : <span className="text-brand-cyan">évolution par millésime</span>
            </h2>
            <p className="text-gray-300 text-lg leading-relaxed max-w-3xl mb-10">
              Le {model.short} a évolué depuis son lancement. Voici ce qui change d’une année à l’autre, utile pour situer et comparer un {model.short} d’occasion avant l’achat.
            </p>

            <div className="overflow-x-auto rounded-3xl border border-white/10 mb-4">
              <table className="w-full text-left text-sm">
                <thead className="bg-ink-900 text-brand-cyan uppercase tracking-widest text-[11px]">
                  <tr>
                    <th className="py-4 px-6">Année</th>
                    <th className="py-4 px-6">Motorisation(s)</th>
                    <th className="py-4 px-6">Évolutions / nouveautés</th>
                    <th className="py-4 px-6">Édition spéciale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {milestones.map((m, i) => (
                    <tr key={i} className="text-gray-300 align-top">
                      <td className="py-4 px-6 font-bold text-white whitespace-nowrap">{model.short} {m.year}</td>
                      <td className="py-4 px-6">{m.motorization || 'Non communiqué'}</td>
                      <td className="py-4 px-6">{m.changes || 'Non communiqué'}</td>
                      <td className="py-4 px-6">{m.edition || '·'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {milestones.some((m) => m.manualUrl) && (
              <p className="text-gray-500 text-sm mb-12">
                Sources : manuels propriétaires officiels {brandName} ·{' '}
                {milestones.filter((m) => m.manualUrl).map((m, i, arr) => (
                  <React.Fragment key={m.year}>
                    <a href={m.manualUrl} target="_blank" rel="noopener noreferrer" className="text-brand-cyan hover:underline">manuel {m.year} (PDF)</a>
                    {i < arr.length - 1 ? ', ' : '.'}
                  </React.Fragment>
                ))}
              </p>
            )}

            {milestones.some((m) => m.detail) && (
              <div className="space-y-8 max-w-3xl mb-12">
                {milestones.filter((m) => m.detail).map((m, i) => (
                  <div key={i}>
                    <h3 className="font-bold text-lg uppercase tracking-tight text-white mb-2">Ce qui change en {m.year}</h3>
                    <p className="text-gray-300 leading-relaxed">{m.detail}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Lien vers le transactionnel */}
            <div className="bg-ink-900 border border-brand-cyan/20 rounded-[2rem] p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <p className="text-gray-200 text-lg max-w-xl">
                Vous cherchez un <span className="text-white font-semibold">{model.short} d’occasion</span> ? Découvrez les modèles disponibles, tous millésimes confondus.
              </p>
              <a href="#occasions" className="flex-shrink-0 inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition">
                Voir les occasions <ArrowRight size={16} />
              </a>
            </div>
          </div>
        </section>
      )}

      {/* ===================== ÉQUIPEMENTS & OPTIONS ===================== */}
      {hasEquip && (
        <section id="equipements" className={`py-20 bg-ink-950 ${sectionPad}`}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <SectionEyebrow label="À bord" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-12">Équipements et options</h2>

            {model.editions && (
              <div className="grid md:grid-cols-2 gap-6 mb-12">
                {model.editions.map((e, i) => (
                  <div key={i} className="bg-ink-900 border border-white/10 rounded-3xl p-7">
                    <div className="flex items-center gap-3 mb-3">
                      <Sparkles size={20} className="text-brand-cyan" />
                      <h3 className="font-bold text-lg uppercase tracking-tight text-white">{e.name}</h3>
                    </div>
                    <p className="text-gray-400 leading-relaxed text-sm">{e.desc}</p>
                  </div>
                ))}
              </div>
            )}

            {model.motorizations && (
              <div className="mb-12">
                <h3 className="font-bold text-xl uppercase tracking-tight text-white mb-5 flex items-center gap-2"><Fuel size={18} className="text-brand-cyan" /> Moteurs disponibles</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {model.motorizations.map((m, i) => (
                    <div key={i} className="bg-ink-900 border border-white/10 rounded-3xl p-6">
                      <h4 className="font-bold text-lg uppercase tracking-tight text-white mb-4">{m.name}</h4>
                      <dl className="space-y-2.5">
                        {([['Carburant', m.fuel], ['Puissance', m.power], ['Couple', m.torque], ['Réduction', m.ratio]] as const).map(([label, value]) =>
                          value ? (
                            <div key={label} className="flex justify-between gap-4 border-b border-white/5 pb-2 last:border-0">
                              <dt className="text-gray-400 text-sm">{label}</dt>
                              <dd className="text-white font-semibold text-sm text-right">{value}</dd>
                            </div>
                          ) : null,
                        )}
                      </dl>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {model.features && (
              <div className="mb-12">
                <h3 className="font-bold text-xl uppercase tracking-tight text-white mb-5">Équipements inclus</h3>
                <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-3">
                  {model.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-300">
                      <Check size={18} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {model.options && (
              <div>
                <h3 className="font-bold text-xl uppercase tracking-tight text-white mb-5">Options</h3>
                <div className="space-y-3">
                  {model.options.map((o, i) => (
                    <div key={i} className="bg-ink-900 border border-white/10 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setOpenOpt(openOpt === i ? null : i)}
                        className="w-full text-left p-5 flex items-center justify-between gap-4 font-bold uppercase tracking-tight text-white hover:bg-white/5 transition-colors"
                        aria-expanded={openOpt === i}
                      >
                        {o.title}
                        <ChevronDown className={`flex-shrink-0 transition-transform duration-300 ${openOpt === i ? 'rotate-180 text-brand-cyan' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {openOpt === i && (
                          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-5 pb-5">
                            <ul className="space-y-2">
                              {o.items.map((it, j) => (
                                <li key={j} className="flex items-start gap-3 text-gray-300 text-sm">
                                  <Check size={16} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                                  <span>{it}</span>
                                </li>
                              ))}
                            </ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ===================== OCCASIONS ===================== */}
      <section id="occasions" className={`py-20 bg-brand-dark ${sectionPad}`}>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
            <div>
              <SectionEyebrow label="Alternative" />
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white">{model.name} d’occasion</h2>
            </div>
            <Link to="/bateaux/occasion" className="inline-flex items-center gap-1.5 text-brand-cyan font-bold uppercase tracking-widest text-xs hover:underline">
              Toutes nos occasions {brandName} <ArrowRight size={14} />
            </Link>
          </div>

          {occasions.length > 0 ? (
            <div className="flex gap-6 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-2 -mx-4 px-4">
              {occasions.map((b, i) => (
                <article key={i} className="flex-shrink-0 w-[300px] md:w-[340px] snap-start bg-ink-900 border border-white/10 rounded-3xl overflow-hidden">
                  <div className="relative aspect-[4/3] overflow-hidden">
                    <img src={b.image} alt={`${b.title} ${b.year} d'occasion`} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover" />
                    {b.sold && (
                      <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">Vendu</span>
                    )}
                    <span className="absolute top-3 right-3 bg-brand-dark/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">{b.year}</span>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-white uppercase tracking-tight leading-tight mb-3">{b.title}</h3>
                    <ul className="text-gray-400 text-xs space-y-1.5 mb-4">
                      {b.capacity && <li className="flex items-center gap-2"><Users size={13} className="text-brand-cyan" /> {b.capacity}</li>}
                      {b.power && <li className="flex items-center gap-2"><Gauge size={13} className="text-brand-cyan" /> {b.power}</li>}
                    </ul>
                    <p className={`font-bold text-xl mb-5 ${b.sold ? 'text-gray-500 line-through' : 'text-brand-cyan'}`}>{b.price}</p>
                    <div className="flex gap-2">
                      <a href={SITE.phoneHref} className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-cyan text-brand-dark font-bold uppercase text-[11px] tracking-widest py-3 rounded-xl hover:bg-white transition">
                        <Phone size={14} /> Appeler
                      </a>
                      <Link to={`/bateaux/occasion/${b.slug}`} className="flex-1 inline-flex items-center justify-center gap-1.5 border border-white/20 text-white font-bold uppercase text-[11px] tracking-widest py-3 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
                        Détail
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-ink-900 border border-white/10 rounded-[2rem] p-8 md:p-12 text-center">
              <p className="text-gray-300 text-lg leading-relaxed mb-2 max-w-2xl mx-auto">
                Aucun {model.short} d’occasion n’est disponible actuellement.
              </p>
              <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
                Contactez-nous pour une <span className="text-white font-semibold">recherche sur mesure</span> : nous vous alertons dès qu’un modèle correspondant à vos critères arrive.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition">
                  Lancer une recherche sur mesure <ArrowRight size={16} />
                </a>
                <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
                  <Phone size={16} /> {SITE.phoneDisplay}
                </a>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      {model.faqs.length > 0 && (
        <section id="faq" className={`py-24 bg-ink-950 ${sectionPad}`}>
          <div className="max-w-4xl mx-auto px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white text-center mb-14">
              On répond à vos <span className="text-brand-cyan">questions</span>
            </h2>
            <div className="space-y-4">
              {model.faqs.map((faq, idx) => (
                <div key={idx} className="bg-ink-900 rounded-2xl overflow-hidden border border-white/10">
                  <h3 className="m-0">
                    <button
                      onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                      className="w-full text-left p-6 flex items-center justify-between gap-4 font-medium text-base md:text-lg text-white hover:bg-white/5 transition-colors"
                      aria-expanded={activeFaq === idx}
                    >
                      {faq.q}
                      <ChevronDown className={`flex-shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-brand-cyan' : ''}`} />
                    </button>
                  </h3>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-gray-400 leading-relaxed">
                        {renderAnswer(faq.a)}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== PRIX & CONTACT ===================== */}
      <ServiceContactBlock subject={`${fullName} ${model.year}`} showMap wide />

      {/* ===================== AUTRES MODÈLES (maillage latéral) ===================== */}
      <section className="bg-ink-950 py-24 border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white text-center mb-12">Découvrez les autres modèles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {others.map((o) => (
              <Link key={o.slug} to={`/${brand.id}/${o.slug}`} className="group bg-ink-900 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-cyan hover:-translate-y-1 transition-all">
                <div className={`aspect-[4/3] overflow-hidden ${studio ? 'bg-gradient-to-b from-white to-gray-100' : ''}`}>
                  <img src={o.hero} alt={`${o.fullName || o.name} ${o.year}`} loading="lazy" referrerPolicy="no-referrer" className={`w-full h-full group-hover:scale-105 transition-transform duration-500 ${studio ? 'object-contain p-2' : 'object-cover'}`} />
                </div>
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-cyan">{o.gamme}</span>
                  <h3 className="font-bold text-white uppercase tracking-tight mt-1">{o.fullName || o.name}</h3>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-400 mt-3 group-hover:text-brand-cyan transition">Fiche technique <ArrowRight size={13} className="group-hover:translate-x-1 transition" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CTA STICKY PERMANENT ===================== */}
      {/* Mobile : barre basse */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-ink-950/95 backdrop-blur-md border-t border-white/10 p-3 flex gap-3">
        <a href={SITE.phoneHref} className="flex-shrink-0 inline-flex items-center justify-center w-12 h-12 rounded-xl border border-white/20 text-white">
          <Phone size={18} />
        </a>
        <a href="#contact" className="flex-1 inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-xs rounded-xl">
          Demander le prix <ArrowRight size={15} />
        </a>
      </div>

      {/* ===================== LIGHTBOX ===================== */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] bg-black/95 flex items-center justify-center p-4"
            onClick={closeLb}
          >
            <button onClick={closeLb} aria-label="Fermer" className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"><X size={22} /></button>
            <button onClick={(e) => { e.stopPropagation(); stepLb(-1); }} aria-label="Précédente" className="absolute left-3 md:left-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"><ChevronLeft size={24} /></button>
            <button onClick={(e) => { e.stopPropagation(); stepLb(1); }} aria-label="Suivante" className="absolute right-3 md:right-6 w-11 h-11 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-white/20"><ChevronRight size={24} /></button>
            <img
              src={model.gallery[lightbox]}
              alt={`${fullName}, photo ${lightbox + 1}`}
              referrerPolicy="no-referrer"
              onClick={(e) => e.stopPropagation()}
              className="max-w-full max-h-[85vh] rounded-2xl object-contain"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function PresentationSlider({ images, alt, studio }: { images: string[]; alt: string; studio?: boolean }) {
  const slides = images.filter(Boolean);
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (slides.length <= 1 || paused) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % slides.length), 4500);
    return () => clearInterval(t);
  }, [slides.length, paused]);

  if (slides.length === 0) return null;

  return (
    <div
      className="relative"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="absolute -inset-4 bg-brand-cyan/10 rounded-[3rem] blur-2xl" />
      <div className={`relative overflow-hidden rounded-[2.5rem] border border-white/10 shadow-2xl aspect-[4/3] ${studio ? 'bg-gradient-to-b from-white to-gray-100' : ''}`}>
        {slides.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt}, vue ${i + 1}`}
            loading={i === 0 ? 'eager' : 'lazy'}
            referrerPolicy="no-referrer"
            aria-hidden={i !== idx}
            className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${studio ? 'object-contain p-6' : 'object-cover'} ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
        {!studio && <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-brand-dark/30 to-transparent" />}

        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setIdx(i)}
                aria-label={`Afficher l’image ${i + 1}`}
                aria-current={i === idx}
                className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'w-7 bg-brand-cyan' : 'w-2 bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Vue du bateau dans le hero : glisser horizontalement pour faire défiler les angles.
// studio = image produit affichée en entier sur fond clair ; sinon photo scénique qui remplit le cadre.
function RotatableBoat({ images, alt, studio }: { images: string[]; alt: string; studio?: boolean }) {
  const frames = images.filter(Boolean);
  const [idx, setIdx] = useState(0);
  const drag = React.useRef<{ x: number; idx: number } | null>(null);
  const multi = frames.length > 1;

  const start = (x: number) => { drag.current = { x, idx }; };
  const move = (x: number) => {
    if (!drag.current || !multi) return;
    const step = Math.round((x - drag.current.x) / 45);
    let n = (drag.current.idx + step) % frames.length;
    if (n < 0) n += frames.length;
    setIdx(n);
  };
  const end = () => { drag.current = null; };

  if (frames.length === 0) return null;

  return (
    <div className="relative">
      <div className="absolute -inset-4 bg-brand-cyan/10 rounded-[3rem] blur-2xl pointer-events-none" />
      <div
        className={`relative rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden aspect-[4/3] ${studio ? 'bg-gradient-to-b from-white to-gray-100' : 'bg-ink-900'} ${multi ? 'cursor-grab active:cursor-grabbing select-none touch-pan-y' : ''}`}
        onMouseDown={multi ? (e) => start(e.clientX) : undefined}
        onMouseMove={multi ? (e) => move(e.clientX) : undefined}
        onMouseUp={multi ? end : undefined}
        onMouseLeave={multi ? end : undefined}
        onTouchStart={multi ? (e) => start(e.touches[0].clientX) : undefined}
        onTouchMove={multi ? (e) => move(e.touches[0].clientX) : undefined}
        onTouchEnd={multi ? end : undefined}
      >
        {frames.map((src, i) => (
          <img
            key={i}
            src={src}
            alt={`${alt} — vue ${i + 1}`}
            draggable={false}
            referrerPolicy="no-referrer"
            loading={i === 0 ? 'eager' : 'lazy'}
            className={`absolute inset-0 w-full h-full transition-opacity duration-150 ${studio ? 'object-contain p-6' : 'object-cover'} ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          />
        ))}
      </div>
    </div>
  );
}

// Convertit les liens markdown [texte](/url) d'une réponse FAQ en vrais liens (internes via <Link>).
function renderAnswer(text: string): React.ReactNode {
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let last = 0;
  let key = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const [, label, href] = m;
    parts.push(
      href.startsWith('/') ? (
        <Link key={key++} to={href} className="text-brand-cyan font-semibold hover:underline">{label}</Link>
      ) : (
        <a key={key++} href={href} className="text-brand-cyan font-semibold hover:underline">{label}</a>
      ),
    );
    last = m.index + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return parts;
}

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-8 h-1 bg-brand-cyan rounded-full" />
      <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">{label}</span>
    </div>
  );
}
