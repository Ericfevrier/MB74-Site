import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ChevronRight, Ruler, Users, Gauge, Settings, Anchor, MapPin, PhoneCall, Handshake, Waves, Award } from 'lucide-react';
import { brandsData } from '../data/brands';
import { GoogleMapCustom } from './GoogleMapCustom';

export function ModelPage() {
  const { brandId, modelId } = useParams<{ brandId: string; modelId: string }>();

  // Placeholder data simulating a dynamic fetch for the G25 Paragon
  const isG25Paragon = brandId === 'nautique' && modelId === 'g25-paragon';
  const brand = brandId ? brandsData[brandId.toLowerCase()] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [brandId, modelId]);

  if (!isG25Paragon || !brand) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-brand-light">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-brand-dark uppercase tracking-tight mb-4">Modèle en cours de création</h2>
          <Link to="/" className="text-brand-cyan hover:underline font-bold uppercase text-sm">
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const modelData = {
    marque: "Nautique",
    gamme: "Paragon Series",
    gammeSlug: "paragon",
    modele: "Super Air Nautique G25 Paragon",
    modeleCourt: "G25 Paragon",
    slug: "g25-paragon",
    annee: "2026",
    prixDepart: "495 000 €",
    prixDepartNum: "495000",
    usage: "wakesurf, wakeboard",
    moteur: "PCM ZZ8 630 ch",
    longueur: "7,77 m (25,5 pieds)",
    capacite: "16 personnes",
    ville: "Annecy",
    departement: "Haute-Savoie (74)",
    planDeau: "lac d'Annecy",
    note: "4.9",
    nbAvis: "12",
    heroImage: "/images/2026-p23-ext-09-11zon.jpg",
    gallery: [
      "/images/2026-g23-perf-18.jpg",
      "/images/2026-p25-ext-16.jpg"
    ]
  };

  const schemaProduct = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": `${modelData.modele} ${modelData.annee}`,
    "brand": { "@type": "Brand", "name": modelData.marque },
    "category": "Wakeboat / Bateau de sport nautique",
    "image": modelData.heroImage,
    "description": `${modelData.modele} ${modelData.annee} : ${modelData.usage}, moteur ${modelData.moteur}, ${modelData.longueur}, jusqu'à ${modelData.capacite}.`,
    "offers": {
      "@type": "Offer",
      "priceCurrency": "EUR",
      "price": modelData.prixDepartNum,
      "availability": "https://schema.org/InStock",
      "url": `https://motorboat74.com/nautique/${modelData.slug}/`,
      "seller": { "@type": "Organization", "name": "MotorBoat74" }
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": modelData.note,
      "reviewCount": modelData.nbAvis
    }
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": `Quel est le prix du ${modelData.modeleCourt} ?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Le ${modelData.modeleCourt} est disponible à partir de ${modelData.prixDepart} chez MotorBoat74. Contactez-nous pour un devis personnalisé.` }
      },
      {
        "@type": "Question",
        "name": `Peut-on essayer le ${modelData.modeleCourt} à ${modelData.ville} ?`,
        "acceptedAnswer": { "@type": "Answer", "text": `Oui, MotorBoat74 organise des essais du ${modelData.modeleCourt} sur le ${modelData.planDeau}. Réservez votre créneau en ligne.` }
      },
      {
        "@type": "Question",
        "name": `Quelle est la valeur de reprise d'un ${modelData.modeleCourt} ?`,
        "acceptedAnswer": { "@type": "Answer", "text": `La valeur dépend de l'année, des heures moteur et des options. Nous proposons une estimation gratuite rapide.` }
      }
    ]
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://motorboat74.com/" },
      { "@type": "ListItem", "position": 2, "name": "Nautique", "item": "https://motorboat74.com/nautique/" },
      { "@type": "ListItem", "position": 3, "name": modelData.gamme, "item": `https://motorboat74.com/nautique/${modelData.gammeSlug}/` },
      { "@type": "ListItem", "position": 4, "name": modelData.modeleCourt }
    ]
  };

  return (
    <div className="bg-brand-light text-brand-dark">
      <Helmet>
        <title>{`${modelData.modeleCourt} ${modelData.annee} — Prix, Fiche Technique & Essai | MotorBoat74`}</title>
        <meta name="description" content={`Découvrez le ${modelData.modele} ${modelData.annee} : fiche technique, prix, essai sur le ${modelData.planDeau}. Concessionnaire officiel ${modelData.marque} à ${modelData.ville}. Devis & reprise.`} />
        <link rel="canonical" href={`https://motorboat74.com/nautique/${modelData.slug}/`} />
        <script type="application/ld+json">{JSON.stringify(schemaProduct)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      {/* 3. Hero Section */}
      <section className="relative h-[85vh] flex items-end pb-24 justify-center overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img 
            src={modelData.heroImage} 
            alt={`${modelData.modele} ${modelData.annee} — wakeboat MotorBoat74 ${modelData.ville}`}
            className="w-full h-full object-cover scale-105 opacity-70"
            referrerPolicy="no-referrer"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-ink-950/60 to-transparent"></div>
        </div>
        
        <div className="container mx-auto px-6 max-w-7xl relative z-10">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 text-brand-cyan text-xs font-bold uppercase tracking-widest mb-6">
              <Link to="/" className="hover:text-white transition-colors">Accueil</Link>
              <ChevronRight size={12} />
              <Link to={`/marque/${brand.id}`} className="hover:text-white transition-colors">Nautique</Link>
              <ChevronRight size={12} />
              <span className="text-white">{modelData.gamme}</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white uppercase tracking-tighter mb-6 leading-none">
              {modelData.modele} <span className="text-brand-cyan">{modelData.annee}</span>
            </h1>
            
            <p className="text-lg md:text-xl text-gray-300 font-medium mb-10 leading-relaxed max-w-3xl">
              Le {modelData.modeleCourt} est le {modelData.gamme} le plus abouti de {modelData.marque} pour le {modelData.usage}. 
              Moteur {modelData.moteur}, {modelData.longueur}, jusqu'à {modelData.capacite}. 
              Découvrez sa fiche technique, son prix, et réservez un essai sur le {modelData.planDeau}.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#prix" className="bg-brand-cyan text-brand-dark px-8 py-4 rounded-xl font-bold hover:bg-white transition-all uppercase tracking-wider text-sm text-center flex items-center justify-center gap-2">
                Demander le prix
              </a>
              <a href="#essai" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/20 transition-all uppercase tracking-wider text-sm text-center flex items-center justify-center gap-2">
                Réserver un essai
              </a>
              <a href="#reprise" className="border-2 border-brand-cyan text-brand-cyan px-8 py-4 rounded-xl font-bold hover:bg-brand-cyan hover:text-brand-dark transition-all uppercase tracking-wider text-sm text-center flex items-center justify-center gap-2">
                Faire reprendre mon bateau
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 4. En bref - Featured Snippet Block */}
      <section className="py-16 bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-2xl font-bold uppercase tracking-tight text-brand-dark mb-6">En bref</h2>
              <div className="bg-brand-mist rounded-2xl p-6 border border-gray-100">
                <table className="w-full text-sm">
                  <tbody>
                    <tr className="border-b border-gray-200"><td className="py-3 font-medium text-gray-500">Type</td><td className="py-3 font-bold text-right">Wakeboat {modelData.gamme}</td></tr>
                    <tr className="border-b border-gray-200"><td className="py-3 font-medium text-gray-500">Usage</td><td className="py-3 font-bold text-right capitalize">{modelData.usage}</td></tr>
                    <tr className="border-b border-gray-200"><td className="py-3 font-medium text-gray-500">Longueur</td><td className="py-3 font-bold text-right">{modelData.longueur}</td></tr>
                    <tr className="border-b border-gray-200"><td className="py-3 font-medium text-gray-500">Moteur</td><td className="py-3 font-bold text-right">{modelData.moteur}</td></tr>
                    <tr className="border-b border-gray-200"><td className="py-3 font-medium text-gray-500">Capacité</td><td className="py-3 font-bold text-right">{modelData.capacite}</td></tr>
                    <tr className="border-b border-gray-200"><td className="py-3 font-medium text-gray-500">Prix</td><td className="py-3 font-bold text-right text-brand-cyan">à partir de {modelData.prixDepart}</td></tr>
                    <tr><td className="py-3 font-medium text-gray-500">Disponibilité</td><td className="py-3 font-bold text-right">Neuf & occasion chez MotorBoat74</td></tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <p className="text-xl font-medium text-brand-dark leading-relaxed border-l-4 border-brand-cyan pl-6">
                Le {modelData.modeleCourt} redéfinit le summum du bateau de {modelData.usage}. 
                Avec ses dimensions imposantes de {modelData.longueur} et sa capacité de {modelData.capacite}, il offre les vagues les plus profilées du marché grâce à sa coque révolutionnaire et son moteur {modelData.moteur}.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Présentation du modèle */}
      <section className="py-24 bg-brand-light">
        <div className="container mx-auto px-6 max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">
            {modelData.modele} :<br/><span className="text-brand-cyan">Présentation et points forts</span>
          </h2>
          <div className="text-lg text-gray-600 space-y-6 text-left">
            <p>
              Le <strong>{modelData.modeleCourt}</strong> s’adresse aux passionnés qui refusent tout compromis. Pilier de la <Link to="/marque/nautique" className="text-brand-cyan underline font-bold">gamme {modelData.gamme}</Link>, ce bateau représente le summum du savoir-faire Nautique. Pensé pour le {modelData.usage} de haut niveau, il allie une ingéniosité sans précédent à un design d'un raffinement rare.
            </p>
            <p>
              À bord, chaque détail a été pensé pour exalter l'expérience de vos {modelData.capacite}. De ses finitions luxueuses à son poste de pilotage ultra-moderne, le bateau impose son caractère. Sa conception de coque plongeante offre un sillage parfait, modulaire d’une simple pression sur les doubles écrans LINC Panoray. 
            </p>
            <p>
              Que vous cherchiez l'expérience de glisse ultime ou le summum du confort pour des sorties sur le {modelData.planDeau}, le {modelData.modeleCourt} surpasse toutes les attentes. Il s'impose comme une référence incontournable face à des modèles proches comme le <Link to="/nautique/g23-paragon" className="text-brand-cyan font-bold hover:underline">G23 Paragon</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* 6. Fiche technique */}
      <section className="py-24 bg-ink-950 text-white">
        <div className="container mx-auto px-6 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold uppercase tracking-tight mb-4">Fiche technique du <span className="text-brand-cyan">{modelData.modeleCourt} {modelData.annee}</span></h2>
            <p className="text-gray-400">Dimensions, poids, capacités et motorisation.</p>
          </div>
          
          <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
            <table className="w-full text-left">
              <tbody className="divide-y divide-white/10">
                <tr className="hover:bg-white/5 transition-colors">
                  <th className="py-5 px-6 font-medium text-gray-400 w-1/2">Longueur</th>
                  <td className="py-5 px-6 font-bold">{modelData.longueur}</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <th className="py-5 px-6 font-medium text-gray-400">Largeur (bau)</th>
                  <td className="py-5 px-6 font-bold">2,59 m (102")</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <th className="py-5 px-6 font-medium text-gray-400">Poids à sec</th>
                  <td className="py-5 px-6 font-bold">3 357 kg (7 400 lbs)</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <th className="py-5 px-6 font-medium text-gray-400">Moteur (standard)</th>
                  <td className="py-5 px-6 font-bold">{modelData.moteur}</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <th className="py-5 px-6 font-medium text-gray-400">Motorisations en option</th>
                  <td className="py-5 px-6 font-bold">PCM ZZ8 600 HP (Coastal) / Yanmar 8LV Diesel</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <th className="py-5 px-6 font-medium text-gray-400">Capacité ballast</th>
                  <td className="py-5 px-6 font-bold">1 542 kg supplémentaires (intégré au plancher)</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <th className="py-5 px-6 font-medium text-gray-400">Réservoir carburant</th>
                  <td className="py-5 px-6 font-bold">333 L (88 gal)</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <th className="py-5 px-6 font-medium text-gray-400">Capacité personnes</th>
                  <td className="py-5 px-6 font-bold">{modelData.capacite}</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <th className="py-5 px-6 font-medium text-gray-400">Système de vagues</th>
                  <td className="py-5 px-6 font-bold text-brand-cyan">Nautique Surf System (NSS) avec WAVEPLATE®</td>
                </tr>
                <tr className="hover:bg-white/5 transition-colors">
                  <th className="py-5 px-6 font-medium text-gray-400">Année / Millésime</th>
                  <td className="py-5 px-6 font-bold">{modelData.annee}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 7. Vagues et performance */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-bold uppercase tracking-tight text-brand-dark mb-6">Vagues et performance du <span className="text-brand-cyan">{modelData.modeleCourt}</span></h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <p>
                  Performances inouïes pour le {modelData.usage}. La coque spécifiquement dessinée pour le {modelData.modeleCourt} déplace l'eau avec une efficacité chirurgicale. 
                </p>
                <p>
                  Couplé au système <strong>Nautique Surf System (NSS)</strong> et au NCRS (Nautique Configurable Running Surface), la forme et le volume de votre vague de wakesurf sont ajustables au doigt et à l'œil. Que vous soyez un rider débutant cherchant une transition douce, ou un professionnel ayant besoin d'une lèvre puissante pour les tricks aériens, le bateau s'adapte instantanément.
                </p>
                <div className="flex items-start gap-4 mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <Waves className="text-brand-cyan w-8 h-8 flex-shrink-0" />
                  <p className="font-medium text-brand-dark text-base">« La vague la plus consistante et puissante, avec une face longue qui permet d'exploiter chaque centimètre de sa planche. »</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
               <img src={modelData.gallery[0]} alt={`Vague wakesurf ${modelData.modeleCourt}`} className="rounded-[2rem] shadow-2xl w-full object-cover aspect-[4/3]" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. Confort, aménagement & technologies */}
      <section className="py-24 bg-brand-mist">
        <div className="container mx-auto px-6 max-w-7xl text-center mb-16">
          <h2 className="text-4xl font-bold uppercase tracking-tight mb-4">Aménagement, confort et <span className="text-brand-cyan">équipements</span></h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">Un condensé d'innovation nautique pensé pour les journées prolongées sur l'eau.</p>
        </div>
        
        <div className="container mx-auto px-6 max-w-5xl space-y-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 text-left">
            <h3 className="text-2xl font-bold uppercase mb-4 text-brand-dark border-b-2 border-brand-cyan inline-block pb-2">Espace arrière et accès à l'eau</h3>
            <p className="text-gray-600 mt-4 leading-relaxed">Les sièges convertibles arrière ("Transom Loungers") sont devenus une signature. Inclinables et spacieux, ils constituent le point de vue idéal pour observer l'action lorsque le bateau est à l'arrêt. La plateforme de bain prolongée en seadek garantit une mise à l'eau sécurisée et confortable.</p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 text-left">
            <h3 className="text-2xl font-bold uppercase mb-4 text-brand-dark border-b-2 border-brand-cyan inline-block pb-2">Poste de pilotage & Écrans</h3>
            <p className="text-gray-600 mt-4 leading-relaxed">Au cœur du navire se trouve un tableau de bord asymétrique surmonté des doubles écrans tactiles LINC Panoray. L'ergonomie est poussée à son paroxysme avec le "Helm Command" déporté : vous contrôlez la vitesse, le balast, l'audio et configurer le profil du rider sans quitter l'horizon des yeux.</p>
          </div>
          
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-sm border border-gray-100 text-left">
            <h3 className="text-2xl font-bold uppercase mb-4 text-brand-dark border-b-2 border-brand-cyan inline-block pb-2">Audio et éditions spéciales</h3>
            <p className="text-gray-600 mt-4 leading-relaxed">Équipé en usine avec le système premium JL Audio M6 Series (avec technologie Wavefront), l'expérience sonore rivalise avec les concerts. Le {modelData.modeleCourt} est disponible dans plusieurs déclinaisons luxueuses, incluant des cuirs texturés et des arches de tower motorisées (Telescoping Flight Control Tower).</p>
          </div>
        </div>
      </section>

      {/* 9. Prix & financement */}
      <section id="prix" className="py-24 bg-brand-dark text-white relative overflow-hidden">
        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">Prix du <span className="text-brand-cyan">{modelData.modeleCourt} {modelData.annee}</span></h2>
          
          <div className="bg-ink-900 p-10 rounded-[2rem] border border-white/10 mb-12 flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div>
              <h3 className="text-2xl font-bold mb-2">{modelData.modeleCourt} Neuf</h3>
              <p className="text-gray-400 mb-4">Configuration standard moteur {modelData.moteur}.</p>
              <p className="text-4xl font-bold text-brand-cyan">À partir de {modelData.prixDepart}</p>
            </div>
            <div className="hidden md:block w-px h-24 bg-white/10"></div>
            <div>
              <h3 className="text-2xl font-bold mb-2">{modelData.modeleCourt} d'occasion</h3>
              <p className="text-gray-400 mb-4">Modèles révisés avec garantie MotorBoat74.</p>
              <Link to="/occasions" className="bg-white text-brand-dark px-6 py-3 rounded-xl font-bold uppercase tracking-wider text-sm inline-block hover:bg-gray-200 transition-colors">
                Voir l'inventaire occasion
              </Link>
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12 text-left">
             <div className="bg-white/5 p-8 rounded-2xl">
               <h4 className="text-xl font-bold uppercase tracking-wider mb-4 border-b border-white/20 pb-4">Ce qui fait varier le prix</h4>
               <ul className="space-y-3 text-gray-300">
                 <li className="flex gap-2 items-center"><ChevronRight size={16} className="text-brand-cyan"/> Option moteur (Coastal / Diesel Yanmar)</li>
                 <li className="flex gap-2 items-center"><ChevronRight size={16} className="text-brand-cyan"/> Gelcoat personnalisés métalliques</li>
                 <li className="flex gap-2 items-center"><ChevronRight size={16} className="text-brand-cyan"/> Kit audio additionnel (haut-parleurs tour suppl.)</li>
                 <li className="flex gap-2 items-center"><ChevronRight size={16} className="text-brand-cyan"/> Stores, bâches intégrées et remorque tractée</li>
               </ul>
             </div>
             <div className="bg-white/5 p-8 rounded-2xl">
               <h4 className="text-xl font-bold uppercase tracking-wider mb-4 border-b border-white/20 pb-4">Solutions de financement</h4>
               <p className="text-gray-300 mb-6 leading-relaxed">
                 MotorBoat74 propose des solutions de LOA nautique avantageuses avec nos partenaires financiers. Profitez de frais d'acquisition lissés et de conditions de garantie préservées.
               </p>
               <button className="text-brand-cyan font-bold uppercase tracking-widest text-sm hover:underline">
                 Calculer ma mensualité
               </button>
             </div>
          </div>

          <div className="bg-brand-cyan p-8 rounded-2xl text-brand-dark text-center shadow-[0_0_50px_rgba(30,227,219,0.15)] mt-12">
            <h3 className="text-2xl font-bold uppercase tracking-tighter mb-4">Recevoir le prix exact / devis personnalisé</h3>
            <p className="mb-6 font-medium max-w-2xl mx-auto">Configurez votre bateau idéal avec notre équipe. Nous vous envoyons un devis détaillé sous 24h, intégrant vos options préférées.</p>
            <button className="bg-brand-dark text-white px-10 py-4 rounded-xl font-bold hover:bg-ink-850 transition-colors uppercase tracking-widest shadow-xl">
              Demander un devis
            </button>
          </div>
        </div>
      </section>

      {/* 10. Acheter / Essayer */}
      <section id="essai" className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-bold uppercase tracking-tight text-brand-dark mb-6">
                Acheter ou essayer le {modelData.modeleCourt} à <span className="text-brand-cyan">{modelData.ville}</span>
              </h2>
              <div className="space-y-6 text-gray-600 text-lg">
                <p>
                  En tant que <strong>concessionnaire officiel {modelData.marque} exclusif</strong> en {modelData.departement}, MotorBoat74 vous garantit une expertise certifiée par l'usine. 
                </p>
                <div className="border-l-4 border-brand-cyan pl-6 my-8">
                  <p className="font-medium text-brand-dark">
                    Venez découvrir le {modelData.modeleCourt} dans notre showroom ou réservez un essai privatif en conditions réelles sur le {modelData.planDeau}. 
                  </p>
                </div>
                <p>
                  De la configuration initiale au choix de l'armement, jusqu'à la livraison et la mise en main sur votre plan d'eau, notre équipe de passionnés vous accompagne intégralement.
                </p>
                <button className="mt-6 bg-brand-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-cyan hover:text-brand-dark transition-all uppercase tracking-wider text-sm flex items-center gap-2">
                  <Anchor size={18} /> Réserver mon essai sur le lac
                </button>
              </div>
            </div>
            <div className="w-full lg:w-1/2 relative">
               <img src="/images/2026-p25-ext-16.jpg" alt={`Essai ${modelData.modeleCourt} lac d'annecy`} className="rounded-[2rem] shadow-xl w-full object-cover aspect-[4/3]" referrerPolicy="no-referrer" />
               <div className="absolute -bottom-8 -left-8 bg-brand-cyan text-brand-dark p-8 rounded-3xl shadow-xl hidden md:block">
                 <div className="flex items-center gap-4">
                   <Award size={48} />
                   <div>
                     <p className="font-bold text-xl uppercase leading-none mb-1">Concessionnaire</p>
                     <p className="font-black text-2xl uppercase tracking-widest">{modelData.marque}</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11. Vendre ou faire reprendre */}
      <section id="reprise" className="py-24 bg-brand-mist">
        <div className="container mx-auto px-6 max-w-5xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-brand-dark mb-6">
            Vendre ou faire reprendre votre <span className="text-brand-cyan">{modelData.modeleCourt}</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Vous êtes propriétaire d'un {modelData.modeleCourt} et souhaitez le revendre ou profiter d'une reprise pour un modèle plus récent ? 
            <br/><br/>
            Le {modelData.modeleCourt} bénéficie d'une <strong>valeur résiduelle et d'une cote excellentes</strong> sur le marché de l'occasion. Nous cherchons constamment ce modèle pour notre clientèle. Obtenez une estimation gratuite et rapide basée sur l'année, vos heures moteur et vos options.
          </p>
          
          <div className="bg-white p-10 rounded-[2rem] shadow-lg border border-gray-100 mx-auto max-w-4xl flex flex-col md:flex-row items-center justify-between gap-8 text-left">
            <div className="flex-1">
              <h3 className="text-xl font-bold uppercase mb-2">Estimation Rapide</h3>
              <p className="text-gray-500">Renseignez votre année série, nous vous faisons une offre de rachat comptant ou de dépôt-vente.</p>
            </div>
            <button className="bg-brand-dark text-white px-8 py-4 rounded-xl font-bold hover:bg-brand-cyan hover:text-brand-dark transition-all uppercase tracking-wider text-sm flex items-center justify-center gap-2 whitespace-nowrap w-full md:w-auto">
              <Handshake size={18} /> Estimer mon bateau
            </button>
          </div>
        </div>
      </section>

      {/* 12. Comparatif */}
      <section className="py-24 bg-white border-t border-gray-100">
        <div className="container mx-auto px-6 max-w-5xl">
          <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark mb-10 text-center">
            {modelData.modeleCourt} ou G23 Paragon : Lequel choisir ?
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px] text-left">
              <thead>
                <tr className="bg-ink-950 text-white">
                  <th className="py-4 px-6 rounded-tl-xl font-bold uppercase">Caractéristique</th>
                  <th className="py-4 px-6 text-brand-cyan font-bold uppercase">{modelData.modeleCourt}</th>
                  <th className="py-4 px-6 font-bold uppercase rounded-tr-xl">G23 Paragon</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-500">Longueur</td>
                  <td className="py-4 px-6 font-bold text-brand-dark">{modelData.longueur}</td>
                  <td className="py-4 px-6 font-medium text-gray-700">7,01 m (23 pieds)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-500">Capacité Passagers</td>
                  <td className="py-4 px-6 font-bold text-brand-dark">{modelData.capacite}</td>
                  <td className="py-4 px-6 font-medium text-gray-700">16 personnes (volume réduit)</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-500">Volume Balast</td>
                  <td className="py-4 px-6 font-bold text-brand-dark">1 542 kg</td>
                  <td className="py-4 px-6 font-medium text-gray-700">1 000 kg</td>
                </tr>
                <tr className="hover:bg-gray-50 bg-brand-cyan/5">
                  <td className="py-4 px-6 rounded-bl-xl font-medium text-gray-500">Profil idéal</td>
                  <td className="py-4 px-6 font-bold text-brand-dark">Grand plan d'eau, groupes d'amis, l'expérience superlative sans limite de place.</td>
                  <td className="py-4 px-6 rounded-br-xl font-medium text-gray-700">Taille de garage standard, maniabilité accrue, vagues d'élite.</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <Link to="/nautique/g23-paragon" className="text-brand-cyan font-bold uppercase tracking-widest text-sm hover:underline">Voir la fiche du G23 Paragon</Link>
          </div>
        </div>
      </section>

      {/* 13. Photos, Vidéos & Avis */}
      <section className="py-24 bg-brand-mist">
        <div className="container mx-auto px-6 max-w-7xl">
          <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark mb-10 text-center">
            Photos et vidéos du {modelData.modeleCourt}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 mb-20">
            {modelData.gallery.map((img, idx) => (
              <div key={idx} className="rounded-3xl overflow-hidden aspect-video shadow-md">
                <img src={img} alt={`${modelData.modeleCourt} galerie ${idx}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" referrerPolicy="no-referrer" />
              </div>
            ))}
          </div>

          <h2 className="text-3xl font-bold uppercase tracking-tight text-brand-dark mb-10 text-center">
            Avis sur le {modelData.modeleCourt}
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex text-brand-cyan mb-4">
                {"★★★★★".split('').map((star, i) => <span key={i} className="text-xl">{star}</span>)}
              </div>
              <p className="text-gray-600 mb-4 italic">"Une finition halluciante. La vague de wakesurf du 25 pieds a une longueur phénoménale. L'écran de pilotage et l'intégration audio sont grandioses."</p>
              <p className="font-bold text-sm uppercase text-brand-dark">— Propriétaire G25, Annecy</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <div className="flex text-brand-cyan mb-4">
                {"★★★★★".split('').map((star, i) => <span key={i} className="text-xl">{star}</span>)}
              </div>
              <p className="text-gray-600 mb-4 italic">"Le passage dans le clapot du lac d'Annecy est royal. Même avec 12 invités à bord, on ne manque jamais de place ni de puissance."</p>
              <p className="font-bold text-sm uppercase text-brand-dark">— Client MotorBoat74</p>
            </div>
          </div>
        </div>
      </section>

      {/* 14. FAQ Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6 max-w-4xl">
          <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight text-brand-dark mb-10 text-center">
            Questions fréquentes sur le <span className="text-brand-cyan">{modelData.modeleCourt}</span>
          </h2>
          
          <div className="space-y-4">
            <details className="group bg-brand-light rounded-2xl border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg">
                Quel est le prix du {modelData.modeleCourt} ?
                <ChevronRight className="transition-transform group-open:rotate-90 text-brand-cyan" size={24} />
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                Le {modelData.modeleCourt} est disponible à partir de {modelData.prixDepart} chez MotorBoat74. Ce prix varie selon les options (motoriation côtière, packs audio, couleurs de gelcoat). Contactez-nous pour un devis personnalisé clair.
              </div>
            </details>
            <details className="group bg-brand-light rounded-2xl border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg">
                Peut-on essayer le {modelData.modeleCourt} à {modelData.ville} ?
                <ChevronRight className="transition-transform group-open:rotate-90 text-brand-cyan" size={24} />
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                Oui, absolument. En tant que concessionnaire {modelData.marque}, MotorBoat74 organise des essais complets de la gamme Paragon sur le {modelData.planDeau}. Il suffit de réserver votre créneau avec notre équipe.
              </div>
            </details>
            <details className="group bg-brand-light rounded-2xl border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg">
                Le {modelData.modeleCourt} est-il disponible en occasion ?
                <ChevronRight className="transition-transform group-open:rotate-90 text-brand-cyan" size={24} />
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                L'inventaire d'occasion évolue rapidement. Nous rentrons ponctuellement des {modelData.gamme} récents entièrement révisés. Contactez-nous pour être inscrit sur notre liste de recherche privée.
              </div>
            </details>
            <details className="group bg-brand-light rounded-2xl border border-gray-100 [&_summary::-webkit-details-marker]:hidden">
              <summary className="flex items-center justify-between p-6 cursor-pointer font-bold text-lg">
                Quel moteur équipe le {modelData.modeleCourt} ?
                <ChevronRight className="transition-transform group-open:rotate-90 text-brand-cyan" size={24} />
              </summary>
              <div className="px-6 pb-6 text-gray-600">
                De base, il est équipé de l'impressionnant moteur PCM ZZ8 développant 630 chevaux, pensé spécifiquement pour absorber la charge de lest lourde du Paragon Series avec une poussée phénoménale.
              </div>
            </details>
          </div>
        </div>
      </section>

      {/* 15. Bloc Concessionnaire + CTA final */}
      <section className="bg-brand-dark py-24 text-white">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-16">
            <div className="w-full lg:w-1/2">
              <h2 className="text-4xl font-bold uppercase tracking-tight mb-8">
                MotorBoat74, concessionnaire officiel {modelData.marque} à {modelData.ville}
              </h2>
              <div className="bg-ink-950 p-8 rounded-2xl mb-8">
                <div className="flex items-start gap-4 mb-4">
                  <MapPin className="text-brand-cyan flex-shrink-0 mt-1" size={24} />
                  <div>
                    <h3 className="font-bold text-xl uppercase tracking-wider mb-2">MotorBoat74</h3>
                    <p className="text-gray-400">161 Allée des Edelweiss<br/>74210 Lathuile<br/>France ({modelData.departement})</p>
                    <p className="text-gray-400 mt-2">Intervient sur le {modelData.planDeau}, le Léman, et le lac du Bourget.</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-8 pt-8 border-t border-white/10">
                  <PhoneCall className="text-brand-cyan" size={24} />
                  <a href="tel:+33450512030" className="text-2xl font-bold hover:text-brand-cyan transition-colors">+33 4 50 51 20 30</a>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <a href="#prix" className="bg-brand-cyan text-brand-dark px-8 py-4 rounded-xl font-bold hover:bg-white transition-all uppercase tracking-wider text-sm text-center flex-1">
                  Obtenir un devis
                </a>
                <a href="#essai" className="border border-white/20 text-white px-8 py-4 rounded-xl font-bold hover:bg-white/10 transition-all uppercase tracking-wider text-sm text-center flex-1">
                  Réserver l'essai
                </a>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2 min-h-[400px]">
              {/* Using GoogleMapCustom for correct representation */}
              <GoogleMapCustom address="Motorboat 74, Lathuile" />
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

