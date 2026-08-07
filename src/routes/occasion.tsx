import { Link } from 'react-router';
import { ArrowRight, ShieldCheck, Wallet, Wrench } from 'lucide-react';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { UsedBoatCard } from '../components/UsedBoatCard';
import { ShowroomSection } from '../components/ShowroomSection';
import { RepriseSection } from '../components/RepriseSection';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';
import { availableUsedBoats, soldUsedBoats } from '../data/usedBoats';
import { useLiveUsedBoats } from '../lib/publicApi';
import { pageMeta } from '../lib/meta';
import { breadcrumbSchema } from '../lib/schema';

const HERO = '/images/imported/0zadabm5-mb-1-3.webp';

export function meta() {
  const canonical = `${SITE.url}/bateaux/occasion`;
  const boats = availableUsedBoats();
  const abs = (p: string) => (p.startsWith('http') ? p : `${SITE.url}${p}`);

  // Le catalogue listait ses bateaux — millésime, heures moteur, prix — sans
  // aucune donnée structurée, alors que chaque fiche détail en porte trois.
  // L'`ItemList` de Product/Offer est ce qui rend un prix éligible aux résultats
  // enrichis ; sans lui, ces prix n'existent que comme du texte parmi d'autres.
  const schemaCatalog = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Bateaux d’occasion',
    url: canonical,
    description: 'Wakeboats et bateaux de ski nautique d’occasion, toutes marques, révisés et garantis par nos ateliers.',
    provider: { '@id': `${SITE.url}/#business` },
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: boats.length,
      itemListElement: boats.map((b, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Product',
          name: b.title,
          url: `${SITE.url}/bateaux/occasion/${b.slug}`,
          image: abs(b.image),
          category: 'Wakeboat / Bateau de sport nautique d’occasion',
          ...(b.description ? { description: b.description } : {}),
          ...(b.year ? { productionDate: b.year } : {}),
          itemCondition: 'https://schema.org/UsedCondition',
          offers: {
            '@type': 'Offer',
            priceCurrency: 'EUR',
            // Sans prix numérique (« Prix sur demande »), on n'invente pas de
            // valeur : l'offre reste valide, seul le montant est omis.
            ...(b.priceValue ? { price: b.priceValue } : {}),
            availability: 'https://schema.org/InStock',
            itemCondition: 'https://schema.org/UsedCondition',
            url: `${SITE.url}/bateaux/occasion/${b.slug}`,
            seller: { '@id': `${SITE.url}/#business` },
          },
        },
      })),
    },
  };

  return pageMeta({
    // Mot-clé principal : « bateau d'occasion ». Secondaires : toutes marques,
    // Nautique, MasterCraft, reprise. Territoire national, pas d'ancrage local.
    //
    // Le titre annonçait « Nautique & MasterCraft » : c'est la gamme du NEUF,
    // pas celle de l'occasion. L'inventaire a compté du Malibu, du Heyday et du
    // Correct Craft — restreindre le titre aux deux marques distribuées fermait
    // la porte à tout acheteur cherchant une autre marque d'occasion.
    title: 'Bateaux d’occasion toutes marques | Motor Boat 74',
    description:
      'Wakeboats et bateaux de ski nautique d’occasion révisés et garantis par nos ateliers : Nautique, MasterCraft, Malibu. Reprise toutes marques.',
    canonical,
    image: abs(HERO),
    ogTitle: 'Bateaux d’occasion toutes marques | Motor Boat 74',
    geo: { region: 'FR-74', placename: "Lac d'Annecy, Haute-Savoie" },
    jsonLd: [
      schemaCatalog,
      // Pas de redéclaration du LocalBusiness ici : il est décrit une seule fois
      // (accueil) et référencé partout ailleurs par `@id`, comme fixé au lot 3.
      breadcrumbSchema([
        { name: 'Accueil', url: `${SITE.url}/` },
        { name: 'Bateaux', url: `${SITE.url}/bateaux` },
        { name: 'Occasion', url: canonical },
      ]),
    ],
  });
}

// Pas de clientLoader : voir marque.tsx — il empêchait le prerender et vidait le HTML.
// availableUsedBoats() et soldUsedBoats() sont synchrones et sans base : les appeler
// directement rend le catalogue dans le HTML statique, indexable sans JavaScript.
export default function Occasion() {
  const live = useLiveUsedBoats();
  // On n'utilise le live que si la base renvoie des bateaux (sinon on garde le statique).
  const all = live.boats && live.boats.length ? live.boats : null;
  const boats = all ? all.filter((b) => !b.sold) : availableUsedBoats();
  const soldCount = all ? all.filter((b) => b.sold).length : soldUsedBoats().length;

  return (
    <div className="bg-brand-light">
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="Wakeboat d’occasion sur le lac" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          <Breadcrumb className="mb-6 inline-flex" items={[{ label: 'Accueil', to: '/' }, { label: 'Bateaux', to: '/bateaux' }, { label: 'Occasion' }]} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6">Bateaux d’occasion toutes marques</h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Des wakeboats et bateaux de ski nautique <strong>révisés et garantis</strong>, suivis par nos ateliers.
            Accédez à un modèle haut de gamme à budget maîtrisé, près du lac d’Annecy.
          </p>
        </div>
      </header>

      <section className="bg-brand-light py-12 sm:py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {/* Deux colonnes dès le mobile : cohérent avec le catalogue des neufs,
              et un acheteur compare mieux quand il voit plusieurs bateaux à la fois. */}
          {boats.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-7">
              {boats.map((b) => (
                <UsedBoatCard key={b.slug} boat={b} variant="available" />
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-[2rem] p-10 md:p-16 text-center max-w-3xl mx-auto">
              <p className="text-brand-dark text-xl font-bold mb-3">Aucun bateau d’occasion disponible actuellement</p>
              <p className="text-gray-500 leading-relaxed mb-8">Confiez-nous vos critères : nous vous alertons dès qu’un bateau correspondant arrive.</p>
              <a href="#contact" className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-brand-cyan hover:text-brand-dark transition">Demander une recherche <ArrowRight size={16} /></a>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-12 sm:py-20 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">Acheter d’occasion en confiance</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mt-2">Des bateaux préparés par nos ateliers</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { Icon: Wrench, t: 'Révisés avant la vente', d: 'Contrôle mécanique, coque et sellerie par nos techniciens avant la mise en vente.' },
              { Icon: ShieldCheck, t: 'Historique transparent', d: 'Millésime, heures moteur et entretien communiqués sans détour.' },
              { Icon: Wallet, t: 'Reprise toutes marques', d: 'Nous reprenons votre bateau actuel, quelle que soit sa marque, et proposons un financement adapté.' },
            ].map(({ Icon, t, d }, i) => (
              <div key={i} className="bg-brand-light border border-gray-200 rounded-3xl p-7">
                <span className="w-12 h-12 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-5"><Icon size={22} /></span>
                <h3 className="font-bold uppercase tracking-tight text-brand-dark text-sm mb-2">{t}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {soldCount > 0 && (
        <section className="bg-brand-dark py-14">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">Nos bateaux déjà vendus</h2>
              <p className="text-gray-400 max-w-2xl">Un modèle similaire vous intéresse ? Nous lançons une recherche pour vous.</p>
            </div>
            <Link to="/bateaux/vendu" className="flex-shrink-0 inline-flex items-center gap-2 border border-white/20 text-white font-bold uppercase tracking-widest text-xs px-7 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
              Voir les bateaux vendus <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      )}

      <RepriseSection />
      <ShowroomSection />
      <ServiceContactBlock subject="Bateau d’occasion" title="Une occasion en vue ?" />
    </div>
  );
}
