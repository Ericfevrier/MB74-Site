import { Hero } from '../components/Hero';
import { IntroSection } from '../components/IntroSection';
import { ServicesSection } from '../components/ServicesSection';
import { BrandsSection } from '../components/BrandsSection';
import { PartnersLocationSection } from '../components/PartnersLocationSection';
import { useSeo } from '../lib/pageContent';
import { SITE } from '../data/site';
import { businessNode } from '../lib/schema';

export function meta() {
  return [
    // 54 signes au lieu de 65 : l'ancien titre était coupé dans les résultats.
    // La description porte les deux statuts commerciaux, dont l'exclusivité
    // MasterCraft en France, qui n'apparaissait nulle part en page d'accueil.
    { title: `${SITE.name} | Bateaux et services nautiques à Annecy` },
    { name: 'description', content: "Concessionnaire Nautique et importateur exclusif MasterCraft. Vente, hivernage, entretien et dépannage de bateaux sur le lac d'Annecy." },
    { tagName: 'link', rel: 'canonical', href: `${SITE.url}/` },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: `${SITE.name} | Vente et entretien de bateaux` },
    { property: 'og:description', content: "Vente, hivernage et entretien de bateaux à moteur sur le Lac d'Annecy et en Haute-Savoie." },

    // L'accueil ne portait AUCUNE donnée structurée : l'entité racine de
    // l'entreprise n'était donc jamais déclarée, alors que toutes les autres
    // pages s'y réfèrent par `@id`. C'est ici qu'elle doit vivre.
    {
      'script:ld+json': {
        '@context': 'https://schema.org',
        '@graph': [
          {
            ...businessNode,
            description:
              "Concessionnaire officiel Nautique et MasterCraft au bord du Lac d'Annecy : vente de bateaux neufs et d'occasion, hivernage, entretien, réparation, dépannage, transport et sellerie.",
            areaServed: [
              { '@type': 'Place', name: "Lac d'Annecy" },
              { '@type': 'Place', name: 'Lac du Bourget' },
              { '@type': 'Place', name: 'Lac Léman' },
              { '@type': 'AdministrativeArea', name: 'Haute-Savoie' },
              { '@type': 'AdministrativeArea', name: 'Savoie' },
            ],
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE.url}/#website`,
            url: SITE.url,
            name: SITE.name,
            inLanguage: 'fr-FR',
            publisher: { '@id': `${SITE.url}/#business` },
          },
        ],
      },
    },
  ];
}

export default function Home() {
  useSeo('accueil');
  return (
    <>
      <Hero />
      <IntroSection />
      <ServicesSection />
      <BrandsSection />
      <PartnersLocationSection />
    </>
  );
}
