import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Users, Gauge, Clock, Phone, ShieldCheck, Wallet, Wrench } from 'lucide-react';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { availableUsedBoats, soldUsedBoats } from '../data/usedBoats';
import { ShowroomSection } from '../components/ShowroomSection';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';

const HERO = 'https://www.mastercraft.com/media/0zadabm5/mb-1-3.jpg';

export function BateauxOccasionPage() {
  const canonical = `${SITE.url}/bateaux/occasion/`;
  const boats = availableUsedBoats();
  const soldCount = soldUsedBoats().length;

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: 'Bateaux d’occasion',
      url: canonical,
      hasPart: {
        '@type': 'ItemList',
        numberOfItems: boats.length,
        itemListElement: boats.map((b, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          url: `${SITE.url}/bateaux/occasion/${b.slug}/`,
          name: `${b.title} ${b.year}`,
        })),
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Bateaux', item: `${SITE.url}/bateaux/` },
        { '@type': 'ListItem', position: 3, name: 'Bateaux d’occasion', item: canonical },
      ],
    },
  ];

  return (
    <div className="bg-brand-light">
      <Helmet>
        <title>Bateaux d’occasion Nautique & MasterCraft près d’Annecy | Motor Boat 74</title>
        <meta
          name="description"
          content="Wakeboats et bateaux de ski nautique d’occasion révisés et garantis, près du lac d’Annecy. Nautique, MasterCraft : prix, année, heures moteur. Reprise et financement chez Motor Boat 74."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bateaux d’occasion Nautique & MasterCraft | Motor Boat 74" />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={HERO} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="Wakeboat d’occasion sur le lac" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          <Breadcrumb className="mb-6 inline-flex" items={[{ label: 'Accueil', to: '/' }, { label: 'Bateaux', to: '/bateaux' }, { label: 'Occasion' }]} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6">Bateaux d’occasion</h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Des wakeboats et bateaux de ski nautique <strong>révisés et garantis</strong>, suivis par nos ateliers.
            Accédez à un modèle haut de gamme à budget maîtrisé, près du lac d’Annecy.
          </p>
        </div>
      </header>

      {/* Inventaire */}
      <section className="bg-brand-light py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {boats.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {boats.map((b) => (
                <article key={b.slug} className="group bg-white border border-gray-200 rounded-3xl overflow-hidden shadow-lg shadow-brand-dark/5 hover:border-brand-cyan hover:-translate-y-1.5 transition-all flex flex-col">
                  <Link to={`/bateaux/occasion/${b.slug}`} className="block aspect-[4/3] overflow-hidden bg-ink-900 relative">
                    <img src={b.image} alt={`${b.title} ${b.year} d’occasion`} loading="lazy" referrerPolicy="no-referrer" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {b.sold && <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">Vendu</span>}
                    <span className="absolute top-3 right-3 bg-brand-dark/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">{b.year}</span>
                  </Link>
                  <div className="p-6 flex-1 flex flex-col">
                    <h2 className="text-lg font-bold text-brand-dark uppercase tracking-tight mb-3 leading-tight">{b.title}</h2>
                    <ul className="text-gray-500 text-xs space-y-1.5 mb-4">
                      {b.capacity && <li className="flex items-center gap-2"><Users size={13} className="text-brand-cyan" /> {b.capacity}</li>}
                      {b.power && <li className="flex items-center gap-2"><Gauge size={13} className="text-brand-cyan" /> {b.power}</li>}
                      {b.hours && <li className="flex items-center gap-2"><Clock size={13} className="text-brand-cyan" /> {b.hours}</li>}
                    </ul>
                    <p className={`font-bold text-xl mb-5 ${b.sold ? 'text-gray-400 line-through' : 'text-brand-cyan'}`}>{b.price}</p>
                    <div className="mt-auto flex gap-2">
                      <a href={SITE.phoneHref} className="flex-1 inline-flex items-center justify-center gap-1.5 bg-brand-cyan text-brand-dark font-bold uppercase text-[11px] tracking-widest py-3 rounded-xl hover:bg-brand-dark hover:text-white transition">
                        <Phone size={14} /> Appeler
                      </a>
                      <Link to={`/bateaux/occasion/${b.slug}`} className="flex-1 inline-flex items-center justify-center gap-1.5 border border-gray-200 text-brand-dark font-bold uppercase text-[11px] tracking-widest py-3 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
                        Détail <ArrowRight size={13} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-[2rem] p-10 md:p-16 text-center max-w-3xl mx-auto">
              <p className="text-brand-dark text-xl font-bold mb-3">Aucun bateau d’occasion disponible actuellement</p>
              <p className="text-gray-500 leading-relaxed mb-8">
                Notre stock évolue régulièrement. Confiez-nous vos critères : nous vous alertons dès qu’un bateau correspondant arrive,
                et nous pouvons lancer une <strong>recherche sur mesure</strong>.
              </p>
              <a href="#contact" className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-brand-cyan hover:text-brand-dark transition">
                Demander une recherche <ArrowRight size={16} />
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Réassurance */}
      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">Acheter d’occasion en confiance</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mt-2">Des bateaux préparés par nos ateliers</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { Icon: Wrench, t: 'Révisés avant la vente', d: 'Contrôle mécanique, coque et sellerie par nos techniciens avant la mise en vente.' },
              { Icon: ShieldCheck, t: 'Historique transparent', d: 'Millésime, heures moteur et entretien communiqués sans détour.' },
              { Icon: Wallet, t: 'Reprise & financement', d: 'Nous reprenons votre bateau actuel et proposons un financement adapté.' },
            ].map(({ Icon, t, d }, i) => (
              <div key={i} className="bg-brand-light border border-gray-200 rounded-3xl p-7">
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

      {/* Déjà vendus (preuve sociale) */}
      {soldCount > 0 && (
        <section className="bg-brand-dark py-14">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">Nos bateaux déjà vendus</h2>
              <p className="text-gray-400 max-w-2xl">
                Découvrez les bateaux récemment vendus par Motor Boat 74. Un modèle similaire vous intéresse ? Nous lançons une recherche pour vous.
              </p>
            </div>
            <Link to="/bateaux/vendu" className="flex-shrink-0 inline-flex items-center gap-2 border border-white/20 text-white font-bold uppercase tracking-widest text-xs px-7 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
              Voir les bateaux vendus <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      )}

      <ShowroomSection />
      <ServiceContactBlock subject="Bateau d’occasion" title="Une occasion en vue ?" showMap />
    </div>
  );
}
