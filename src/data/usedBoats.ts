/**
 * Inventaire des bateaux d'occasion.
 * Sert : le carrousel « occasions » des fiches modèle, la page /bateaux/occasion
 * et les fiches détail /bateaux/occasion/[slug].
 *
 * Vider ce tableau quand il n'y a pas de stock → les pages affichent un message
 * « aucune occasion » + invitation à une recherche sur mesure (jamais de 404).
 */

export interface UsedBoat {
  /** Slug unique de la fiche détail : /bateaux/occasion/[slug] */
  slug: string;
  /** slug du modèle neuf correspondant (rattachement au carrousel de la fiche) */
  modelSlug: string;
  /** marque (fil d'Ariane + lien « voir le modèle neuf »), ex. 'nautique' */
  brandId: string;
  title: string;
  year: string;
  capacity?: string;
  power?: string;
  /** Heures moteur, ex. "180 h" */
  hours?: string;
  /** Longueur, ex. "7,70 m" */
  length?: string;
  /** Localisation du bateau, ex. "Lac d'Annecy" */
  location?: string;
  /** Prix affiché, ex. "395 000 €" ou "Prix sur demande" */
  price: string;
  /** Prix numérique (schema Product/Vehicle). Absent si « sur demande ». */
  priceValue?: number;
  /** Image principale (carte + og:image) */
  image: string;
  /** Galerie de la fiche détail (défaut : [image]) */
  gallery?: string[];
  /** Paragraphe de présentation (fiche détail) */
  description?: string;
  /** Points forts / arguments (fiche détail) */
  highlights?: string[];
  /** true si vendu (badge « Vendu » + noindex de la fiche) */
  sold?: boolean;
}

export const usedBoats: UsedBoat[] = [
  {
    slug: 'super-air-nautique-g25-paragon-2021',
    modelSlug: 'g25-paragon',
    brandId: 'nautique',
    title: 'Super Air Nautique G25 Paragon',
    year: '2021',
    capacity: '19 personnes',
    power: 'PCM ZZ8, 630 ch',
    hours: '180 h',
    length: '7,70 m',
    location: "Lac d'Annecy",
    price: '395 000 €',
    priceValue: 395000,
    image: '/images/nautique/g25-paragon-2.jpg',
    gallery: ['/images/nautique/g25-paragon-2.jpg', '/images/nautique/g25-paragon-1.jpg'],
    description:
      "Le fleuron de la gamme Nautique, le Super Air Nautique G25 Paragon, dans une version 2021 suivie et entretenue par nos ateliers. Vague de wakesurf et de wakeboard de référence, finitions artisanales et confort haut de gamme pour de grandes sorties en famille ou entre amis sur le lac d'Annecy.",
    highlights: [
      'Entretien suivi par Motor Boat 74, carnet à jour',
      'Coque et sellerie en excellent état',
      'Tour de wakeboard motorisée et système de vague intégré',
      'Reprise de votre ancien bateau possible',
    ],
    sold: false,
  },
];

/** Toutes les occasions visibles (catalogue /bateaux/occasion). */
export function allUsedBoats(): UsedBoat[] {
  return usedBoats;
}

/** Occasions rattachées à un modèle donné (carrousel fiche modèle). */
export function usedBoatsForModel(modelSlug: string): UsedBoat[] {
  return usedBoats.filter((b) => b.modelSlug === modelSlug);
}

/** Récupère une occasion par son slug (fiche détail). */
export function getUsedBoatBySlug(slug?: string): UsedBoat | undefined {
  return slug ? usedBoats.find((b) => b.slug === slug) : undefined;
}
