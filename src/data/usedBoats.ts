/**
 * Inventaire des bateaux d'occasion (carrousel page modèle + page /bateaux-occasion).
 * Vider ce tableau quand il n'y a pas de stock → la page affiche un message
 * « aucune occasion » + invitation à une recherche sur mesure.
 */

export interface UsedBoat {
  /** slug du modèle neuf correspondant (rattachement au carrousel de la fiche) */
  modelSlug: string;
  title: string;
  year: string;
  capacity?: string;
  power?: string;
  /** Prix affiché, ex. "395 000 €" ou "Prix sur demande" */
  price: string;
  image: string;
  /** true si vendu (badge SOLD) */
  sold?: boolean;
  /** lien détail (défaut : /bateaux-occasion) */
  detailUrl?: string;
}

export const usedBoats: UsedBoat[] = [
  {
    modelSlug: 'g25-paragon',
    title: 'Super Air Nautique G25 Paragon',
    year: '2021',
    capacity: '19 personnes',
    power: 'PCM ZZ8 — 630 ch',
    price: '395 000 €',
    image: '/images/nautique/g25-paragon-2.jpg',
    sold: false,
  },
];

/** Occasions rattachées à un modèle donné. */
export function usedBoatsForModel(modelSlug: string): UsedBoat[] {
  return usedBoats.filter((b) => b.modelSlug === modelSlug);
}
