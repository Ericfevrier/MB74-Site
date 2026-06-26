import React from 'react';
import { Link, Navigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { soldUsedBoats } from '../data/usedBoats';
import { UsedBoatCard } from '../components/UsedBoatCard';
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
              <UsedBoatCard key={b.slug} boat={b} variant="sold" />
            ))}
          </div>
        </div>
      </section>

      <ServiceContactBlock subject="Recherche bateau d’occasion" title="Vous cherchez un modèle similaire ?" showMap />
    </div>
  );
}
