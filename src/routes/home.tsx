import { Hero } from '../components/Hero';
import { IntroSection } from '../components/IntroSection';
import { ServicesSection } from '../components/ServicesSection';
import { BrandsSection } from '../components/BrandsSection';
import { PartnersLocationSection } from '../components/PartnersLocationSection';

export function meta() {
  return [
    { title: "Motorboat 74 | Vente et entretien de bateaux sur le Lac d'Annecy" },
    { name: 'description', content: "Découvrez une sélection exclusive de bateaux (Nautique, MasterCraft, etc.) au bord du Lac d'Annecy. Hivernage, entretien et réparation." },
    { tagName: 'link', rel: 'canonical', href: 'https://motorboat74.com/' },
    { property: 'og:type', content: 'website' },
    { property: 'og:title', content: 'Motor Boat 74 | Vente et entretien de bateaux' },
    { property: 'og:description', content: "Vente, hivernage et entretien de bateaux à moteur sur le Lac d'Annecy et en Haute-Savoie." },
  ];
}

export default function Home() {
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
