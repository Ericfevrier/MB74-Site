import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Sparkles, Tag, ShieldCheck, Waves, Wallet, ChevronRight } from 'lucide-react';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { brandsData } from '../data/brands';
import { BRAND_MODELS } from '../data/boatBrands';
import { availableUsedBoats } from '../data/usedBoats';
import { ShowroomSection } from '../components/ShowroomSection';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';

const HERO = 'https://www.mastercraft.com/media/iujfrvnt/dt-background-image-1.webp';

const BRAND_IDS = ['nautique', 'mastercraft'] as const;

const faqs = [
  {
    q: 'Vaut-il mieux acheter un bateau neuf ou d’occasion ?',
    a: "Le neuf offre la configuration exacte que vous souhaitez (motorisation, options, garantie constructeur) et la dernière technologie de vague. L’occasion permet d’accéder à un modèle haut de gamme à un budget maîtrisé, surtout sur un bateau récent et bien entretenu. Chez Motor Boat 74, nous vous conseillons selon votre usage et votre budget, et chaque occasion est révisée avant la vente.",
  },
  {
    q: 'Où essayer un bateau près d’Annecy ?',
    a: "Nous organisons des essais sur l’eau sur le lac d’Annecy, depuis notre showroom en Haute-Savoie. C’est le meilleur moyen de comparer les modèles et de régler la vague selon votre pratique (wakesurf, wakeboard, ski nautique).",
  },
  {
    q: 'Proposez-vous la reprise et le financement ?',
    a: "Oui. Nous reprenons votre bateau actuel et proposons des solutions de financement sur mesure, que vous achetiez neuf ou d’occasion. Nous assurons aussi l’entretien et l’hivernage de votre bateau après l’achat.",
  },
  {
    q: 'Quelles marques de bateaux proposez-vous ?',
    a: 'Motor Boat 74 est concessionnaire officiel Nautique et distribue MasterCraft : deux références mondiales du wakeboat, du wakesurf et du ski nautique.',
  },
];

export function BateauxHubPage() {
  const canonical = `${SITE.url}/bateaux/`;
  const usedCount = availableUsedBoats().length;
  const newCount = BRAND_IDS.reduce((n, id) => n + (BRAND_MODELS[id]?.order.length || 0), 0);

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Bateaux neufs et d’occasion',
      url: canonical,
      isPartOf: { '@type': 'WebSite', name: SITE.name, url: `${SITE.url}/` },
      about: 'Vente de wakeboats et bateaux de ski nautique neufs et d’occasion près du lac d’Annecy.',
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Bateaux', item: canonical },
      ],
    },
  ];

  return (
    <div className="bg-brand-light">
      <Helmet>
        <title>Bateaux neufs et d’occasion près d’Annecy | Motor Boat 74</title>
        <meta
          name="description"
          content="Bateaux neufs et d’occasion près du lac d’Annecy : wakeboats et bateaux de ski Nautique et MasterCraft. Essai sur l’eau, reprise, financement et entretien chez Motor Boat 74."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bateaux neufs et d’occasion près d’Annecy | Motor Boat 74" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={HERO} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="Wakeboat sur le lac" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          <Breadcrumb className="mb-6 inline-flex" items={[{ label: 'Accueil', to: '/' }, { label: 'Bateaux' }]} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6">Nos bateaux</h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Wakeboats et bateaux de ski nautique <strong>Nautique</strong> et <strong>MasterCraft</strong>, neufs et d’occasion,
            près du lac d’Annecy. Conseil personnalisé, essai sur l’eau, reprise et financement.
          </p>
        </div>
      </header>

      {/* Neuf / Occasion */}
      <section className="bg-brand-light py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 grid md:grid-cols-2 gap-7">
          {[
            { to: '/bateaux/neufs', icon: Sparkles, t: 'Bateaux neufs', n: `${newCount} modèles`, d: 'La dernière génération de wakeboats Nautique et MasterCraft, configurables selon votre usage et vos options.' },
            { to: '/bateaux/occasion', icon: Tag, t: 'Bateaux d’occasion', n: usedCount > 0 ? `${usedCount} en stock` : 'Recherche sur mesure', d: 'Des bateaux révisés et garantis, suivis par nos ateliers. Un modèle haut de gamme à budget maîtrisé.' },
          ].map((c) => (
            <Link
              key={c.to}
              to={c.to}
              className="group relative bg-white border border-gray-200 rounded-[2rem] p-9 shadow-lg shadow-brand-dark/5 hover:border-brand-cyan hover:-translate-y-1 transition-all flex flex-col"
            >
              <span className="w-14 h-14 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-6">
                <c.icon size={26} />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-widest text-brand-cyan mb-2">{c.n}</span>
              <h2 className="font-bold text-2xl uppercase tracking-tight text-brand-dark mb-3">{c.t}</h2>
              <p className="text-gray-600 leading-relaxed mb-8 flex-1">{c.d}</p>
              <span className="inline-flex items-center gap-2 text-brand-dark font-bold text-xs uppercase tracking-widest group-hover:text-brand-cyan transition-colors">
                Découvrir <ArrowRight size={15} className="group-hover:translate-x-1 transition" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Marques */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">Nos marques</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mt-2">Deux références mondiales</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-7">
            {BRAND_IDS.map((id) => {
              const b = brandsData[id];
              if (!b) return null;
              return (
                <Link key={id} to={`/marque/${id}`} className="group relative rounded-[2rem] overflow-hidden border border-gray-200 shadow-lg shadow-brand-dark/5 hover:-translate-y-1 transition-all">
                  <div className="aspect-[16/10] overflow-hidden bg-ink-900">
                    <img src={b.heroImage} alt={`Gamme ${b.name}`} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/20 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-7 text-white">
                    <h3 className="text-2xl font-bold uppercase tracking-tight mb-1">{b.name}</h3>
                    <p className="text-gray-200 text-sm mb-3">{BRAND_MODELS[id]?.order.length || 0} modèles au catalogue</p>
                    <span className="inline-flex items-center gap-1.5 text-brand-cyan font-bold text-xs uppercase tracking-widest">
                      Voir la gamme <ChevronRight size={14} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pourquoi MB74 */}
      <section className="bg-brand-light py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">Acheter chez Motor Boat 74</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mt-2">Un accompagnement de A à Z</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { Icon: ShieldCheck, t: 'Concessionnaire officiel', d: 'Revendeur agréé Nautique et MasterCraft en Haute-Savoie.' },
              { Icon: Waves, t: 'Essai sur l’eau', d: 'Testez le modèle sur le lac d’Annecy avant de décider.' },
              { Icon: Wallet, t: 'Reprise & financement', d: 'Des solutions sur mesure, neuf comme occasion.' },
              { Icon: Tag, t: 'Occasions révisées', d: 'Chaque bateau d’occasion est contrôlé et préparé par nos ateliers.' },
            ].map(({ Icon, t, d }, i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-3xl p-7">
                <span className="w-12 h-12 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-5">
                  <Icon size={22} />
                </span>
                <h3 className="font-bold uppercase tracking-tight text-brand-dark text-sm mb-2">{t}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-3xl mx-auto px-4 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mb-10 text-center">Questions fréquentes</h2>
          <div className="space-y-4">
            {faqs.map((f, i) => (
              <details key={i} className="group bg-brand-light border border-gray-200 rounded-2xl px-6 py-5">
                <summary className="flex items-center justify-between gap-4 cursor-pointer font-bold text-brand-dark uppercase tracking-tight text-sm list-none">
                  <h3 className="font-bold">{f.q}</h3>
                  <ChevronRight size={18} className="text-brand-cyan flex-shrink-0 group-open:rotate-90 transition-transform" />
                </summary>
                <p className="text-gray-600 leading-relaxed mt-4 text-sm">{f.a}</p>
              </details>
            ))}
          </div>
        </div>
        <Helmet>
          <script type="application/ld+json">
            {JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: faqs.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
            })}
          </script>
        </Helmet>
      </section>

      <ShowroomSection />
      <ServiceContactBlock subject="Bateaux" title="Un projet d’achat ?" showMap />
    </div>
  );
}
