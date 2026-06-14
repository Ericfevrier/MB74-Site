import React, { useEffect, useState, useCallback } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown, ArrowRight, Phone, Home, Ruler, Users, Gauge, Check, X,
  ChevronLeft, ChevronRight, Play, Sparkles, Fuel, Settings2, Anchor, ShieldCheck,
} from 'lucide-react';
import { getModel, MODEL_ORDER, nautiqueModels } from '../data/nautiqueModels';
import { SITE } from '../data/site';
import { ServiceContactBlock } from './services/ServiceContactBlock';

const GROUP_ICON: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  Dimensions: Ruler,
  Capacité: Users,
  Performance: Gauge,
};

export function ModelPage() {
  const { brandId, modelId } = useParams<{ brandId: string; modelId: string }>();
  const model = modelId ? getModel(modelId) : undefined;
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [openOpt, setOpenOpt] = useState<number | null>(0);

  useEffect(() => {
    window.scrollTo(0, 0);
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

  if (!model) {
    if (brandId && brandId.toLowerCase() !== 'nautique') {
      return (
        <div className="min-h-[60vh] flex items-center justify-center bg-brand-dark">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-white uppercase tracking-tight mb-4">Modèle en cours de création</h2>
            <Link to="/" className="text-brand-cyan hover:underline font-bold uppercase text-sm">Retour à l'accueil</Link>
          </div>
        </div>
      );
    }
    return <Navigate to="/marque/nautique" replace />;
  }

  const fullName = model.fullName || model.name;
  const canonical = `${SITE.url}/nautique/${model.slug}/`;
  const heroAbs = `${SITE.url}${model.hero}`;
  const others = MODEL_ORDER.filter((s) => s !== model.slug).map((s) => nautiqueModels[s]).slice(0, 4);
  const hasEquip = Boolean(model.editions || model.motorizations || model.features || model.options);

  const anchors = [
    model.gallery.length > 1 && { id: 'galerie', label: 'Galerie' },
    model.highlights.length > 0 && { id: 'points-forts', label: 'Points forts' },
    { id: 'video', label: 'Vidéo' },
    model.specs.length > 0 && { id: 'specs', label: 'Specs' },
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
    brand: { '@type': 'Brand', name: 'Nautique' },
    category: 'Wakeboat / Bateau de sport nautique',
    image: [heroAbs],
    description: model.metaDescription,
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
    brand: { '@type': 'Brand', name: 'Nautique' },
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
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Marques', item: `${SITE.url}/marque/nautique` },
      { '@type': 'ListItem', position: 3, name: 'Nautique', item: `${SITE.url}/marque/nautique` },
      { '@type': 'ListItem', position: 4, name: model.short, item: canonical },
    ],
  };
  const schemaVideo = model.videoId
    ? {
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: `${fullName} — vidéo`,
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
      <header className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={model.hero} alt={`${fullName} ${model.year} en navigation sur le lac d'Annecy`} className="w-full h-full object-cover opacity-50" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/40" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/30" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 pt-16 lg:pt-24 pb-12 lg:pb-16">
          <nav aria-label="Fil d’ariane" className="flex flex-wrap items-center gap-2 text-[12px] text-gray-300 mb-6">
            <Link to="/" className="hover:text-brand-cyan flex items-center gap-1"><Home size={13} /> Accueil</Link>
            <span className="opacity-40">/</span>
            <Link to="/marque/nautique" className="hover:text-brand-cyan">Marques</Link>
            <span className="opacity-40">/</span>
            <Link to="/marque/nautique" className="hover:text-brand-cyan">Nautique</Link>
            <span className="opacity-40">/</span>
            <span className="text-white font-semibold">{model.short}</span>
          </nav>
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-1 bg-brand-cyan rounded-full" />
            <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">{model.gamme} · Millésime {model.year}</span>
          </div>
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight leading-[1.05] text-white mb-6 max-w-4xl">
            {fullName}
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mb-9">{model.tagline || model.intro[0]}</p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition shadow-xl shadow-brand-cyan/20 hover:-translate-y-0.5">
              Demander le prix <ArrowRight size={16} />
            </a>
            <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
              <Phone size={16} /> Réserver un essai
            </a>
            <a href="#contact" className="inline-flex items-center justify-center gap-2 text-gray-300 font-bold uppercase tracking-widest text-sm px-6 py-4 rounded-xl hover:text-brand-cyan transition">
              <Settings2 size={16} /> Concevez votre Nautique
            </a>
          </div>
        </div>

        {/* Barre de confiance */}
        <div className="relative border-t border-white/10 bg-brand-dark/80 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4 lg:px-8 py-5 grid grid-cols-2 md:grid-cols-4 gap-y-4 text-center md:text-left">
            {[
              { Icon: ShieldCheck, t: 'Concessionnaire officiel Nautique' },
              { Icon: Anchor, t: "Showroom Lac d'Annecy" },
              { Icon: Play, t: 'Essai sur l’eau' },
              { Icon: Check, t: 'Reprise & financement' },
            ].map(({ Icon, t }, i) => (
              <div key={i} className="flex items-center justify-center md:justify-start gap-2.5 text-xs font-semibold text-gray-300">
                <Icon size={16} className="text-brand-cyan flex-shrink-0" />
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ===================== MENU D'ANCRAGE STICKY ===================== */}
      <nav aria-label="Sommaire de la page" className="sticky top-[120px] z-40 bg-ink-950/95 backdrop-blur-md border-y border-white/10">
        <div className="max-w-6xl mx-auto px-2 lg:px-8">
          <ul className="flex gap-1 overflow-x-auto hide-scrollbar py-2 text-[12px] font-bold uppercase tracking-widest">
            {anchors.map((a) => (
              <li key={a.id} className="flex-shrink-0">
                <a href={`#${a.id}`} className="block px-4 py-2 rounded-lg text-gray-400 hover:text-brand-cyan hover:bg-white/5 transition-colors">
                  {a.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {/* ===================== PRÉSENTATION ===================== */}
      <section className="py-20 bg-brand-dark">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <SectionEyebrow label="Le bateau" />
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-8 leading-tight">
            {model.short} — <span className="text-brand-cyan">l’expérience Nautique</span>
          </h2>
          <div className="space-y-5 text-gray-300 text-lg leading-relaxed">
            {model.intro.map((p, i) => <p key={i}>{p}</p>)}
            <p>
              Le {model.short} s’inscrit dans la{' '}
              <Link to="/marque/nautique" className="text-brand-cyan font-semibold hover:underline">gamme Super Air Nautique</Link>, que nous présentons dans notre showroom au bord du Lac d’Annecy.
            </p>
          </div>
        </div>
      </section>

      {/* ===================== GALERIE ===================== */}
      {model.gallery.length > 1 && (
        <section id="galerie" className={`py-20 bg-ink-950 ${sectionPad}`}>
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <SectionEyebrow label="En images" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-10">Galerie</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {model.gallery.map((src, i) => (
                <button
                  key={i}
                  onClick={() => setLightbox(i)}
                  className={`group relative overflow-hidden rounded-3xl border border-white/10 ${i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}
                  aria-label={`Agrandir la photo ${i + 1} du ${fullName}`}
                >
                  <img src={src} alt={`${fullName} — photo ${i + 1}`} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover aspect-[4/3] group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute inset-0 bg-brand-dark/0 group-hover:bg-brand-dark/20 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ===================== POINTS FORTS (alternés) ===================== */}
      {model.highlights.length > 0 && (
        <section id="points-forts" className={`py-20 bg-brand-dark ${sectionPad}`}>
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <SectionEyebrow label="Conçu pour rider" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-14">Les points forts du {model.short}</h2>
            <div className="space-y-14">
              {model.highlights.map((h, i) => {
                const img = model.gallery[(i + 1) % model.gallery.length];
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
                    <div className={`overflow-hidden rounded-[2rem] border border-white/10 ${reverse ? 'lg:order-2' : ''}`}>
                      <img src={img} alt={`${fullName} — ${h.title.toLowerCase()}`} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover aspect-[16/10]" />
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
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <SectionEyebrow label="En mouvement" />
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-10">Le {model.short} en action</h2>
          {model.videoId ? (
            <div className="relative w-full rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl aspect-video bg-black">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube-nocookie.com/embed/${model.videoId}`}
                title={`${fullName} — vidéo`}
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
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
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

      {/* ===================== ÉQUIPEMENTS & OPTIONS ===================== */}
      {hasEquip && (
        <section id="equipements" className={`py-20 bg-ink-950 ${sectionPad}`}>
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <SectionEyebrow label="À bord" />
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-12">Équipements & options</h2>

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
                <h3 className="font-bold text-xl uppercase tracking-tight text-white mb-5 flex items-center gap-2"><Fuel size={18} className="text-brand-cyan" /> Motorisations</h3>
                <div className="overflow-x-auto rounded-3xl border border-white/10">
                  <table className="w-full text-left text-sm">
                    <thead className="bg-ink-900 text-brand-cyan uppercase tracking-widest text-[11px]">
                      <tr>
                        <th className="py-4 px-6">Moteur</th>
                        <th className="py-4 px-6">Carburant</th>
                        <th className="py-4 px-6">Puissance</th>
                        <th className="py-4 px-6">Couple</th>
                        <th className="py-4 px-6">Réduction</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {model.motorizations.map((m, i) => (
                        <tr key={i} className="text-gray-300">
                          <td className="py-4 px-6 font-bold text-white">{m.name}</td>
                          <td className="py-4 px-6">{m.fuel}</td>
                          <td className="py-4 px-6">{m.power}</td>
                          <td className="py-4 px-6">{m.torque}</td>
                          <td className="py-4 px-6">{m.ratio}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
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
        <div className="max-w-5xl mx-auto px-4 lg:px-8">
          <SectionEyebrow label="Alternative" />
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white mb-6">{model.short} d’occasion</h2>
          <div className="bg-ink-900 border border-white/10 rounded-[2rem] p-8 md:p-12">
            <p className="text-gray-300 text-lg leading-relaxed mb-8 max-w-2xl">
              Vous cherchez un {model.short} d’occasion ? Nos arrivages Nautique certifiés et révisés évoluent régulièrement. Contactez-nous pour connaître les disponibilités du moment, avec prix et reprise possible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/bateaux-occasion" className="inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition">
                Voir nos Nautique d’occasion <ArrowRight size={16} />
              </Link>
              <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 border-2 border-white/20 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
                <Phone size={16} /> {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      {model.faqs.length > 0 && (
        <section id="faq" className={`py-24 bg-ink-950 ${sectionPad}`}>
          <div className="max-w-4xl mx-auto px-6">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white text-center mb-14">
              On répond à vos <span className="text-brand-cyan">questions</span>
            </h2>
            <div className="space-y-4">
              {model.faqs.map((faq, idx) => (
                <div key={idx} className="bg-ink-900 rounded-2xl overflow-hidden border border-white/10">
                  <button
                    onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                    className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-base md:text-lg text-white hover:bg-white/5 transition-colors"
                    aria-expanded={activeFaq === idx}
                  >
                    {faq.q}
                    <ChevronDown className={`flex-shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-brand-cyan' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === idx && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-gray-400 leading-relaxed">
                        {faq.a}
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
      <ServiceContactBlock subject={`${fullName} ${model.year}`} title="Recevez votre prix personnalisé" showMap />

      {/* ===================== AUTRES MODÈLES (maillage latéral) ===================== */}
      <section className="bg-ink-950 py-24 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-white text-center mb-12">Découvrez les autres modèles</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {others.map((o) => (
              <Link key={o.slug} to={`/nautique/${o.slug}`} className="group bg-ink-900 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-cyan hover:-translate-y-1 transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={o.hero} alt={`${o.fullName || o.name} ${o.year}`} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-cyan">{o.gamme}</span>
                  <h3 className="font-bold text-white uppercase tracking-tight mt-1">{o.short}</h3>
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
      {/* Desktop : bouton flottant */}
      <a href="#contact" className="hidden lg:inline-flex fixed bottom-6 right-6 z-50 items-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-7 py-4 rounded-2xl shadow-2xl shadow-brand-cyan/30 hover:bg-white hover:-translate-y-0.5 transition">
        Demander le prix <ArrowRight size={16} />
      </a>

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
              alt={`${fullName} — photo ${lightbox + 1}`}
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

function SectionEyebrow({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <span className="w-8 h-1 bg-brand-cyan rounded-full" />
      <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">{label}</span>
    </div>
  );
}
