import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Check, ArrowRight, Phone, Home } from 'lucide-react';
import { getService, ServiceSection } from '../data/services';
import { SITE } from '../data/site';
import { ComplementaryServices } from '../components/services/ComplementaryServices';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';

function isTel(href: string) {
  return href.startsWith('tel:') || href.startsWith('mailto:');
}

function HeroCtaButton({ cta }: { cta: { label: string; href: string; primary?: boolean } }) {
  const base =
    'inline-flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl transition-all duration-300';
  const cls = cta.primary
    ? `${base} bg-brand-cyan text-brand-dark hover:bg-white shadow-xl shadow-brand-cyan/20`
    : `${base} border-2 border-white/30 text-white hover:border-brand-cyan hover:text-brand-cyan`;
  const icon = cta.href.startsWith('tel:') ? <Phone size={16} /> : <ArrowRight size={16} />;
  return isTel(cta.href) ? (
    <a href={cta.href} className={cls}>
      {cta.label}
      {icon}
    </a>
  ) : (
    <a href={cta.href} className={cls}>
      {cta.label}
      {icon}
    </a>
  );
}

function SectionBlock({ section }: { section: ServiceSection }) {
  return (
    <section className="py-20 odd:bg-brand-light even:bg-white">
      <div className="max-w-6xl mx-auto px-4 lg:px-8">
        <div className="max-w-3xl mb-12">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mb-5">
            {section.heading}
          </h2>
          {section.intro && <p className="text-gray-600 leading-relaxed text-lg">{section.intro}</p>}
        </div>

        {section.layout === 'cards' && (
          <div
            className={`grid gap-6 ${
              section.items.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'
            }`}
          >
            {section.items.map((card, i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-3xl p-8 shadow-lg shadow-brand-dark/5"
              >
                <h3 className="font-bold text-xl text-brand-dark mb-4">{card.title}</h3>
                {card.desc && <p className="text-gray-600 leading-relaxed">{card.desc}</p>}
                {card.bullets && (
                  <ul className="space-y-3 mt-2">
                    {card.bullets.map((b, j) => (
                      <li key={j} className="flex items-start gap-3 text-gray-700">
                        <Check size={18} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        )}

        {section.layout === 'why' && (
          <div className="grid md:grid-cols-3 gap-6">
            {section.items.map((card, i) => (
              <div
                key={i}
                className="bg-brand-dark text-white rounded-3xl p-8 shadow-xl shadow-brand-dark/10"
              >
                <div className="w-10 h-1 bg-brand-cyan rounded-full mb-5" />
                <h3 className="font-bold text-xl mb-3">{card.title}</h3>
                <p className="text-gray-300 leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        )}

        {section.layout === 'steps' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
            {section.items.map((card, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-3xl p-6 shadow-lg shadow-brand-dark/5">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-brand-cyan text-brand-dark font-bold mb-4">
                  {i + 1}
                </span>
                <h3 className="font-bold text-base text-brand-dark mb-2 leading-tight">{card.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{card.desc}</p>
              </div>
            ))}
          </div>
        )}

        {section.layout === 'list' && (
          <div className="bg-white border border-gray-200 rounded-3xl p-8 lg:p-10 shadow-lg shadow-brand-dark/5">
            <ul className="grid sm:grid-cols-2 gap-x-10 gap-y-4">
              {section.items.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-gray-700">
                  <Check size={18} className="text-brand-cyan flex-shrink-0 mt-0.5" />
                  <span>{b.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {section.cta && (
          <div className="mt-10">
            <a
              href={section.cta.href}
              className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-ink-850 transition"
            >
              {section.cta.label}
              <ArrowRight size={16} />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

export function ServicePage() {
  const { slug } = useParams<{ slug: string }>();
  const service = slug ? getService(slug) : undefined;
  const [activeFaq, setActiveFaq] = useState<number | null>(0);

  if (!service) return <Navigate to="/services" replace />;

  const canonical = `${SITE.url}/services/${service.slug}/`;

  const schemaService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.h1,
    serviceType: service.nav,
    description: service.metaDescription,
    areaServed: ['Annecy', 'Haute-Savoie', 'Lac d’Annecy'],
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

  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  };

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services/` },
      { '@type': 'ListItem', position: 3, name: service.nav, item: canonical },
    ],
  };

  return (
    <div className="bg-white">
      <Helmet>
        <title>{service.metaTitle}</title>
        <meta name="description" content={service.metaDescription} />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={service.metaTitle} />
        <meta property="og:description" content={service.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE.url}${service.heroImage}`} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="geo.region" content="FR-74" />
        <meta name="geo.placename" content="Annecy, Haute-Savoie" />
        <script type="application/ld+json">{JSON.stringify(schemaService)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={service.heroImage}
            alt={service.h1}
            className="w-full h-full object-cover opacity-40"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/85 to-brand-dark/40" />
        </div>
        <div className="relative max-w-6xl mx-auto px-4 lg:px-8 py-20 lg:py-28">
          {/* Fil d'ariane */}
          <nav aria-label="Fil d’ariane" className="flex items-center gap-2 text-[12px] text-gray-300 mb-6">
            <Link to="/" className="hover:text-brand-cyan flex items-center gap-1">
              <Home size={13} /> Accueil
            </Link>
            <span className="opacity-40">/</span>
            <Link to="/services" className="hover:text-brand-cyan">
              Services
            </Link>
            <span className="opacity-40">/</span>
            <span className="text-white font-semibold">{service.nav}</span>
          </nav>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-tight max-w-3xl mb-6">
            {service.h1}
          </h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mb-8">{service.heroIntro}</p>
          <div className="flex flex-wrap gap-4">
            {service.heroCtas.map((cta, i) => (
              <HeroCtaButton key={i} cta={cta} />
            ))}
          </div>
        </div>
      </header>

      {/* Sections de contenu */}
      {service.sections.map((s, i) => (
        <SectionBlock key={i} section={s} />
      ))}

      {/* FAQ */}
      <section className="bg-brand-light py-24">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark text-center mb-14">
            On répond à vos <span className="text-brand-cyan">questions</span>
          </h2>
          <div className="space-y-4">
            {service.faqs.map((faq, idx) => (
              <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg shadow-brand-dark/5">
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full text-left p-6 flex items-center justify-between gap-4 font-bold text-base md:text-lg text-brand-dark hover:bg-gray-50 transition-colors"
                  aria-expanded={activeFaq === idx}
                >
                  {faq.question}
                  <ChevronDown
                    className={`flex-shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-brand-cyan' : ''}`}
                  />
                </button>
                <AnimatePresence>
                  {activeFaq === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="px-6 pb-6 text-gray-600 leading-relaxed"
                    >
                      {faq.answer}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ComplementaryServices currentSlug={service.slug} />
      <ServiceContactBlock subject={service.nav} />
    </div>
  );
}
