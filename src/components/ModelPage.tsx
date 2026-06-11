import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight, Phone, Home, Ruler, Users, Gauge, Check } from 'lucide-react';
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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [brandId, modelId]);

  // Marques sans fiche → message ; mauvais slug nautique → redirige vers la marque.
  if (!model) {
    if (brandId && brandId.toLowerCase() !== 'nautique') {
      return (
        <div className="min-h-[60vh] flex items-center justify-center bg-brand-light">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brand-dark uppercase tracking-tight mb-4">Modèle en cours de création</h2>
            <Link to="/" className="text-brand-cyan hover:underline font-bold uppercase text-sm">Retour à l'accueil</Link>
          </div>
        </div>
      );
    }
    return <Navigate to="/marque/nautique" replace />;
  }

  const canonical = `${SITE.url}/nautique/${model.slug}/`;
  const heroAbs = `${SITE.url}${model.hero}`;
  const others = MODEL_ORDER.filter((s) => s !== model.slug).map((s) => nautiqueModels[s]);

  const schemaProduct = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${model.name} ${model.year}`,
    brand: { '@type': 'Brand', name: 'Nautique' },
    category: 'Wakeboat / Bateau de sport nautique',
    image: heroAbs,
    description: model.metaDescription,
    offers: {
      '@type': 'Offer',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'EUR',
      seller: { '@type': 'AutoDealer', '@id': `${SITE.url}/#business`, name: SITE.name },
      url: canonical,
    },
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
      { '@type': 'ListItem', position: 2, name: 'Nautique', item: `${SITE.url}/marque/nautique` },
      { '@type': 'ListItem', position: 3, name: model.short, item: canonical },
    ],
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>{model.metaTitle}</title>
        <meta name="description" content={model.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={model.metaTitle} />
        <meta property="og:description" content={model.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={heroAbs} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="geo.region" content="FR-74" />
        <meta name="geo.placename" content="Annecy, Haute-Savoie" />
        <script type="application/ld+json">{JSON.stringify(schemaProduct)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={model.hero} alt={`${model.name} ${model.year}`} className="w-full h-full object-cover opacity-45" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/80 to-brand-dark/30" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
          <nav aria-label="Fil d’ariane" className="flex items-center gap-2 text-[12px] text-gray-300 mb-6">
            <Link to="/" className="hover:text-brand-cyan flex items-center gap-1"><Home size={13} /> Accueil</Link>
            <span className="opacity-40">/</span>
            <Link to="/marque/nautique" className="hover:text-brand-cyan">Nautique</Link>
            <span className="opacity-40">/</span>
            <span className="text-white font-semibold">{model.short}</span>
          </nav>
          <span className="inline-block text-brand-cyan font-bold uppercase tracking-widest text-xs mb-4">{model.gamme}</span>
          <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight leading-tight mb-6">
            {model.name} <span className="text-brand-cyan">{model.year}</span>
          </h1>
          {model.intro[0] && <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mb-8">{model.intro[0]}</p>}
          <div className="flex flex-wrap gap-4">
            <a href="#contact" className="inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition shadow-xl shadow-brand-cyan/20">
              Demander le prix <ArrowRight size={16} />
            </a>
            <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 border-2 border-white/30 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
              <Phone size={16} /> Réserver un essai
            </a>
          </div>
        </div>
      </header>

      {/* Specs */}
      <section className="bg-brand-light py-20">
        <div className="max-w-6xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mb-12">Spécifications techniques</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {model.specs.map((g, i) => {
              const Icon = GROUP_ICON[g.group] ?? Gauge;
              return (
                <div key={i} className="bg-white border border-gray-200 rounded-3xl p-7 shadow-lg shadow-brand-dark/5">
                  <div className="flex items-center gap-3 mb-5">
                    <span className="w-10 h-10 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center"><Icon size={20} /></span>
                    <h3 className="font-bold text-lg uppercase tracking-tight text-brand-dark">{g.group}</h3>
                  </div>
                  <dl className="space-y-3">
                    {g.items.map((it, j) => (
                      <div key={j} className="flex justify-between gap-4 border-b border-gray-100 pb-2 last:border-0">
                        <dt className="text-gray-500 text-sm">{it.label}</dt>
                        <dd className="text-brand-dark font-semibold text-sm text-right">{it.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Présentation (intro restante) */}
      {model.intro.length > 1 && (
        <section className="bg-white py-20">
          <div className="max-w-3xl mx-auto px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mb-8">
              {model.short} : <span className="text-brand-cyan">présentation</span>
            </h2>
            <div className="space-y-5 text-gray-600 text-lg leading-relaxed">
              {model.intro.slice(1).map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
        </section>
      )}

      {/* Galerie */}
      {model.gallery.length > 1 && (
        <section className="bg-brand-light py-20">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mb-12">Galerie</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {model.gallery.map((src, i) => (
                <div key={i} className={`overflow-hidden rounded-3xl shadow-lg shadow-brand-dark/5 ${i === 0 ? 'sm:col-span-2 lg:col-span-2 lg:row-span-2' : ''}`}>
                  <img src={src} alt={`${model.name} — photo ${i + 1}`} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover aspect-[4/3] hover:scale-105 transition-transform duration-700" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Points forts */}
      {model.highlights.length > 0 && (
        <section className="bg-brand-dark text-white py-20">
          <div className="max-w-6xl mx-auto px-4 lg:px-8">
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-12">Les points forts du {model.short}</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {model.highlights.map((h, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-3xl p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <Check size={20} className="text-brand-cyan" />
                    <h3 className="font-bold text-lg uppercase tracking-tight text-brand-cyan">{h.title}</h3>
                  </div>
                  <p className="text-gray-300 leading-relaxed">{h.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-brand-light py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark text-center mb-14">
            On répond à vos <span className="text-brand-cyan">questions</span>
          </h2>
          <div className="space-y-4">
            {model.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg shadow-brand-dark/5">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-base md:text-lg text-brand-dark hover:bg-gray-50 transition-colors"
                  aria-expanded={activeFaq === idx}
                >
                  {faq.q}
                  <ChevronDown className={`flex-shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-brand-cyan' : ''}`} />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="px-6 pb-6 text-gray-600 leading-relaxed">
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Autres modèles */}
      <section className="bg-white py-24 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark text-center mb-12">Découvrez les autres modèles</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {others.map((o) => (
              <Link key={o.slug} to={`/nautique/${o.slug}`} className="group bg-brand-light border border-gray-200 rounded-3xl overflow-hidden shadow-lg shadow-brand-dark/5 hover:border-brand-cyan hover:-translate-y-1 transition-all">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={o.hero} alt={o.name} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5">
                  <span className="text-[10px] uppercase tracking-widest font-bold text-brand-cyan">{o.gamme}</span>
                  <h3 className="font-bold text-brand-dark uppercase tracking-tight mt-1">{o.short}</h3>
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-gray-500 mt-3 group-hover:text-brand-cyan transition">Fiche technique <ArrowRight size={13} className="group-hover:translate-x-1 transition" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <ServiceContactBlock subject={`${model.name} ${model.year}`} />
    </div>
  );
}
