import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Hero } from '../components/Hero';
import { IntroSection } from '../components/IntroSection';
import { ServicesSection } from '../components/ServicesSection';
import { BrandsSection } from '../components/BrandsSection';
import { PartnersLocationSection } from '../components/PartnersLocationSection';

export function HomePage() {
  return (
    <>
      <Helmet>
        <title>Motorboat 74 | Vente et entretien de bateaux sur le Lac d'Annecy</title>
        <meta name="description" content="Découvrez une sélection exclusive de bateaux (Nautique, Mastercraft, etc.) au bord du Lac d'Annecy. Hivernage, entretien et réparation." />
        <link rel="canonical" href="https://motorboat74.com" />
        <meta property="og:title" content="Motorboat 74 | Vente et entretien de bateaux" />
        <meta property="og:description" content="Découvrez une sélection exclusive de bateaux au bord du Lac d'Annecy." />
        <meta property="og:type" content="website" />
      </Helmet>
      <Hero />
      <IntroSection />
      <ServicesSection />
      <BrandsSection />
      <PartnersLocationSection />
    </>
  );
}
