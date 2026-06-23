import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Users, Gauge, Clock, Calendar } from 'lucide-react';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { soldUsedBoats } from '../data/usedBoats';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';

const HERO = 'https://www.mastercraft.com/media/0zadabm5/mb-1-3.jpg';

export function BateauxVenduPage() {
  const boats = soldUsedBoats();
  const canonical = `${SITE.url}/bateaux/vendu/`;

  // Aucun vendu → on renvoie vers le stock disponible plutôt que d'afficher une page vide.
  if (boats.length === 0) {
    return <Navigate to="/bateaux/occasion" replace />;
  }

  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Bateaux', item: `${SITE.url}/bateaux/` },
      { '@type': 'ListItem', position: 3, name: 'Bateaux vendus', item: canonical },
    ],
  };

  return (
    <div className="bg-brand-light">
      <Helmet>
        <title>Bateaux vendus | Motor Boat 74</title>
        <meta name="description" content="Les bateaux récemment vendus par Motor Boat 74, près du lac d’Annecy. Un modèle similaire vous intéresse ? Nous lançons une recherche sur mesure." />
        {/* Archive « preuve sociale » : accessible mais hors index (évite la dilution et la cannibalisation). */}
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href={canonical} />
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="Bateaux vendus" className="w-full h-full object-cover opacity-25" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/85 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          <Breadcrumb className="mb-6 inline-flex" items={[{ label: 'Accueil', to: '/' }, { label: 'Bateaux', to: '/bateaux' }, { label: 'Vendus' }]} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6">Bateaux vendus</h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Un aperçu des bateaux récemment vendus par Motor Boat 74. Un modèle similaire vous intéresse ?
            Nous lançons une <strong>recherche sur mesure</strong> et vous alertons dès qu’un bateau correspondant arrive.
          </p>
          <Link to="/bateaux/occasion" className="inline-flex items-center gap-2 mt-8 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition">
            Voir les occasions disponibles <ArrowRight size={16} />
          </Link>
        </div>
      </header>

      {/* Liste des vendus */}
      <section className="bg-brand-light py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
            {boats.map((b) => (
              <article key={b.slug} className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg shadow-brand-dark/5 flex flex-col">
                <Link to={`/bateaux/occasion/${b.slug}`} className="block aspect-[4/3] overflow-hidden bg-ink-900 relative">
                  <img src={b.image} alt={`${b.title} ${b.year} (vendu)`} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
                  <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">Vendu</span>
                  <span className="absolute top-3 right-3 bg-brand-dark/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">{b.year}</span>
                </Link>
                <div className="p-6 flex-1 flex flex-col">
                  <h2 className="text-lg font-bold text-brand-dark uppercase tracking-tight mb-3 leading-tight">{b.title}</h2>
                  <ul className="text-gray-500 text-xs space-y-1.5 mb-5">
                    {b.year && <li className="flex items-center gap-2"><Calendar size={13} className="text-brand-cyan" /> Millésime {b.year}</li>}
                    {b.capacity && <li className="flex items-center gap-2"><Users size={13} className="text-brand-cyan" /> {b.capacity}</li>}
                    {b.power && <li className="flex items-center gap-2"><Gauge size={13} className="text-brand-cyan" /> {b.power}</li>}
                    {b.hours && <li className="flex items-center gap-2"><Clock size={13} className="text-brand-cyan" /> {b.hours}</li>}
                  </ul>
                  <Link to={`/bateaux/occasion/${b.slug}`} className="mt-auto inline-flex items-center justify-center gap-2 border border-gray-200 text-brand-dark font-bold uppercase tracking-widest text-[11px] py-3 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
                    Voir le détail <ArrowRight size={13} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <ServiceContactBlock subject="Recherche bateau d’occasion" title="Vous cherchez un modèle similaire ?" showMap />
    </div>
  );
}
