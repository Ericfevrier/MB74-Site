import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Clock } from 'lucide-react';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';
import { GoogleMapCustom } from '../components/GoogleMapCustom';

export function ContactPage() {
  const canonical = `${SITE.url}/contact/`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact, Motor Boat 74',
    url: canonical,
    mainEntity: {
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

  return (
    <div className="bg-white">
      <Helmet>
        <title>Contactez-nous | Motor Boat 74</title>
        <meta
          name="description"
          content="MotorBoat74 vous accompagne pour l’achat, la vente, l’entretien ou l’hivernage de votre bateau. Contactez-nous facilement dès aujourd’hui à Annecy / Val de Chaise."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Contactez-nous | Motor Boat 74" />
        <meta property="og:url" content={canonical} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/2026-p23-ext-09-11zon.jpg" alt="Motor Boat 74" className="w-full h-full object-cover opacity-35" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: 'Contact' }]} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6">Nous contacter</h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Vous pouvez nous joindre via notre formulaire de contact ci-dessous ou par téléphone au{' '}
            <a href={SITE.phoneHref} className="text-brand-cyan font-bold hover:underline">{SITE.phoneDisplay}</a>. Notre équipe
            reste à votre disposition pour vous renseigner ou vous établir un devis.
          </p>
        </div>
      </header>

      {/* Coordonnées + formulaire (réutilise le bloc partagé) */}
      <ServiceContactBlock subject="Contact" hideHeader />

      {/* Carte + horaires */}
      <section className="bg-white pb-24">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid lg:grid-cols-3 gap-8 items-stretch">
          <div className="lg:col-span-2 min-h-[420px] rounded-[2rem] overflow-hidden shadow-xl shadow-brand-dark/5 border border-gray-200">
            <GoogleMapCustom />
          </div>
          <div className="bg-brand-dark text-white rounded-[2rem] p-8 flex flex-col justify-center">
            <span className="w-12 h-12 rounded-2xl bg-brand-cyan/15 text-brand-cyan flex items-center justify-center mb-6"><Clock size={22} /></span>
            <h2 className="text-xl font-bold uppercase tracking-tight mb-4">Showroom</h2>
            <p className="text-gray-300 leading-relaxed mb-2">{SITE.addressStreet}<br />{SITE.addressPostal} {SITE.addressLocality}</p>
            <p className="text-gray-400 text-sm mb-6">À 20 minutes d’Annecy, au cœur de la Haute-Savoie.</p>
            <a href={SITE.phoneHref} className="text-brand-cyan font-bold text-lg hover:underline">{SITE.phoneDisplay}</a>
            <a href={SITE.emailHref} className="text-gray-300 hover:text-brand-cyan transition">{SITE.email}</a>
          </div>
        </div>
      </section>
    </div>
  );
}
