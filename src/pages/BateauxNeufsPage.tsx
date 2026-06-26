import React from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { ArrowRight } from 'lucide-react';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { BRAND_MODELS } from '../data/boatBrands';
import { NautiqueModel } from '../data/nautiqueModels';
import { brandsData } from '../data/brands';
import { ShowroomSection } from '../components/ShowroomSection';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';

const HERO = 'https://www.mastercraft.com/media/cwehmhdl/mb-2-3.webp';
const BRAND_IDS = ['nautique', 'mastercraft'] as const;

export function BateauxNeufsPage() {
  const canonical = `${SITE.url}/bateaux/neufs/`;

  const brands = BRAND_IDS.map((id) => {
    const bm = BRAND_MODELS[id];
    const meta = brandsData[id];
    if (!bm || !meta) return null;
    const models = bm.order.map((slug) => bm.models[slug]).filter(Boolean);
    return { id, name: bm.name, models };
  }).filter(Boolean) as { id: string; name: string; models: NautiqueModel[] }[];

  const allModels = brands.flatMap((b) => b.models.map((m) => ({ b, m })));

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Bateaux neufs',
      url: canonical,
      hasPart: {
        '@type': 'ItemList',
        numberOfItems: allModels.length,
        itemListElement: allModels.map(({ b, m }, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE.url}/${b.id}/${m.slug}/`,
          name: m.fullName || m.name,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Bateaux', item: `${SITE.url}/bateaux/` },
        { '@type': 'ListItem', position: 3, name: 'Bateaux neufs', item: canonical },
      ],
    },
  ];

  return (
    <div className="bg-brand-light">
      <Helmet>
        <title>Bateaux neufs Nautique & MasterCraft près d’Annecy | Motor Boat 74</title>
        <meta
          name="description"
          content="Découvrez nos bateaux neufs Nautique et MasterCraft : wakeboats et bateaux de ski nautique dernière génération. Configuration, essai sur le lac d’Annecy et devis chez Motor Boat 74."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bateaux neufs Nautique & MasterCraft | Motor Boat 74" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={HERO} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="Wakeboat neuf sur le lac" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          <Breadcrumb className="mb-6 inline-flex" items={[{ label: 'Accueil', to: '/' }, { label: 'Bateaux', to: '/bateaux' }, { label: 'Neufs' }]} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6">Bateaux neufs</h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            La dernière génération de wakeboats et de bateaux de ski nautique <strong>Nautique</strong> et <strong>MasterCraft</strong>.
            Configurez votre bateau, essayez-le sur le lac d’Annecy et profitez de notre accompagnement complet.
          </p>
          {/* Ancres marques */}
          <nav aria-label="Marques" className="flex flex-wrap items-center justify-center gap-3 mt-9">
            {brands.map((b) => (
              <a key={b.id} href={`#${b.id}`} className="px-5 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-bold uppercase tracking-widest hover:bg-brand-cyan hover:text-brand-dark transition">
                {b.name}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* Gammes par marque */}
      {brands.map((b, bi) => (
        <section key={b.id} id={b.id} className={`py-20 scroll-mt-24 ${bi % 2 === 0 ? 'bg-brand-light' : 'bg-white border-y border-gray-100'}`}>
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
            <div className="flex items-end justify-between gap-4 mb-12">
              <div>
                <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">La gamme</span>
                <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mt-1">{b.name}</h2>
              </div>
              <Link to={`/marque/${b.id}`} className="hidden sm:inline-flex items-center gap-1.5 text-brand-cyan font-bold uppercase tracking-widest text-xs hover:underline whitespace-nowrap">
                Tout sur {b.name} <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {b.models.map((m) => (
                <article key={m.slug} className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg shadow-brand-dark/5 hover:border-brand-cyan hover:-translate-y-1.5 transition-all flex flex-col">
                  <Link to={`/${b.id}/${m.slug}`} className="block aspect-[4/3] overflow-hidden bg-ink-900 relative">
                    <img src={m.hero} alt={`${m.fullName || m.name} neuf`} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/60 via-transparent to-transparent" />
                  </Link>
                  <div className="p-6 flex-1 flex flex-col">
                    {m.gamme && <span className="text-[10px] uppercase tracking-widest font-bold text-brand-cyan mb-1.5">{m.gamme}</span>}
                    <h3 className="text-lg font-bold text-brand-dark uppercase tracking-tight mb-2 leading-tight">{m.fullName || m.name}</h3>
                    {m.tagline && <p className="text-gray-500 text-sm mb-6 leading-relaxed line-clamp-3 flex-1">{m.tagline}</p>}
                    <Link
                      to={`/${b.id}/${m.slug}`}
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-brand-light border border-gray-200 text-brand-dark font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl group-hover:bg-brand-cyan group-hover:border-brand-cyan transition-all min-h-[44px]"
                    >
                      Découvrir le modèle <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ))}

      <ShowroomSection />
      <ServiceContactBlock subject="Bateau neuf" title="Configurez votre bateau neuf" showMap />
    </div>
  );
}
