/**
 * Inventaire des bateaux d'occasion.
 * Sert : le carrousel « occasions » des fiches modèle, la page /bateaux/occasion
 * et les fiches détail /bateaux/occasion/[slug].
 *
 * Données reproduites depuis motorboat74.com/bateaux/occasion (inventaire réel).
 * Images hotlinkées depuis le site actuel (wp-content). Vider ce tableau quand il
 * n'y a pas de stock → les pages affichent un message « aucune occasion ».
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

const T = (s: string) => `https://motorboat74.com/wp-content/uploads/elementor/thumbs/${s}`;

export const usedBoats: UsedBoat[] = [
  // ---------- Disponibles ----------
  {
    slug: 'heyday-wt-surf-2020',
    modelSlug: 'heyday-wt-surf',
    brandId: 'heyday',
    title: 'Heyday WT Surf',
    year: '2020',
    capacity: '17 personnes',
    power: 'MerCruiser 6.2L, 375 ch',
    hours: '315 h',
    length: '7,16 m',
    location: "Lac d'Annecy",
    price: '55 000 €',
    priceValue: 55000,
    image: T('2-scaled-ri16uvsjqr5yygxcrvvba4r8acvadps8ifhklnwygg.png'),
    description:
      "Heyday WT Surf de 2020 en état proche du neuf, toujours utilisé en eau douce. Un wakeboat accessible et bien équipé pour le wakesurf et le wakeboard en famille.",
    highlights: [
      'Toujours navigué en eau douce, état proche du neuf',
      'Tableau de bord digital 9 pouces et pack LED',
      'Revêtement de sol Sea Deck Luxe et rack wake/surf',
      'Bimini et système audio deluxe avec accès USB',
    ],
    sold: false,
  },
  {
    slug: 'super-air-nautique-220-2008',
    modelSlug: 'super-air-nautique-220',
    brandId: 'nautique',
    title: 'Super Air Nautique 220',
    year: '2008',
    capacity: '12 personnes',
    power: 'V8 PCM Excalibur, 330 ch',
    hours: '1 600 h',
    length: '6,71 m',
    location: "Lac d'Annecy",
    price: '49 500 €',
    priceValue: 49500,
    image: T('IMG_0640-rotated-rdx108w7ag4n3ypiqrucdd6gaga9pt3xqf7qenv04w.jpeg'),
    gallery: [
      T('IMG_0640-rotated-rdx108w7ag4n3ypiqrucdd6gaga9pt3xqf7qenv04w.jpeg'),
      T('IMG_0619-rotated-rdx10nxmbsp89q3oaycdh9dtsm854yrn4hni338pdc.jpeg'),
      T('IMG_0650-rotated-rdx1062opy0s54tm78mgnvw2iao62psqq199ytz6nk.jpeg'),
    ],
    description:
      "Correct Craft Super Air Nautique 220 de 2008, utilisé exclusivement en eau douce et entretenu régulièrement par un professionnel. Une valeur sûre pour le wakeboard et le wakesurf.",
    highlights: [
      'Toujours navigué en eau douce, entretien suivi par un pro',
      'Ballasts intégrés pour le wakeboard et le wakesurf',
      'Régulateur d’allure et sondeur',
      'Bimini, audio Bluetooth et rangements spacieux',
    ],
    sold: false,
  },
  {
    slug: 'super-air-nautique-g23-2019',
    modelSlug: 'super-air-nautique-g23',
    brandId: 'nautique',
    title: 'Super Air Nautique G23',
    year: '2019',
    power: 'PCM 6.2L, 450 ch',
    hours: '1 200 h',
    location: "Lac d'Annecy",
    price: '148 000 €',
    priceValue: 148000,
    image: T('f0928e8462c191b1e8a177ca4be6e9937bf64ddb-rcnpqr6iidcvcgrgdctvrjf4pqrdvaz5q828icqesw.jpg'),
    gallery: [
      T('f0928e8462c191b1e8a177ca4be6e9937bf64ddb-rcnpqr6iidcvcgrgdctvrjf4pqrdvaz5q828icqesw.jpg'),
      T('f55f32d2b5a911853c3c2c6f9e419f79897a33c4-rcnpqq8objbl0ustiuf971no4cw0nlvfe3er12rsz4.jpg'),
    ],
    description:
      "Correct Craft Super Air Nautique G23 de 2019, animé par un moteur PCM 6.2L de 450 ch. La référence mondiale du wakesurf et du wakeboard, dans une version suivie et révisée par nos ateliers.",
    highlights: [
      'Moteur PCM 6.2L de 450 ch',
      'Vague de wakesurf et de wakeboard de référence',
      'Révisé par les ateliers Motor Boat 74',
      'Reprise de votre ancien bateau possible',
    ],
    sold: false,
  },

  // ---------- Vendus ----------
  {
    slug: 'super-air-nautique-g23-2023',
    modelSlug: 'super-air-nautique-g23',
    brandId: 'nautique',
    title: 'Super Air Nautique G23',
    year: '2023',
    capacity: '16 personnes',
    power: 'ZZ6 Coastal 6.2L, 450 ch',
    hours: '70 h',
    length: '7,01 m',
    location: "Lac d'Annecy",
    price: '220 000 €',
    priceValue: 220000,
    image: T('IMG_6076-scaled-rc8k4946na94cylbs9yw3r88u45gtqltgv75uyv7g0.jpg'),
    gallery: [
      T('IMG_6076-scaled-rc8k4946na94cylbs9yw3r88u45gtqltgv75uyv7g0.jpg'),
      T('IMG_6072-scaled-rc8k4n7rhssf740uhy2an5o5qw7z175siszg24aauo.jpg'),
    ],
    description:
      "Correct Craft Super Air Nautique G23 de 2023, quasi neuf avec seulement 70 heures moteur. Moteur ZZ6 Coastal 6.2L de 450 ch.",
    sold: true,
  },
  {
    slug: 'super-air-nautique-g21-2024',
    modelSlug: 'super-air-nautique-g21',
    brandId: 'nautique',
    title: 'Super Air Nautique G21',
    year: '2024',
    capacity: '13 personnes',
    power: 'ZZ6 GM 6.2L, 450 ch',
    hours: '640 h',
    length: '6,55 m',
    location: "Lac d'Annecy",
    price: '185 000 €',
    priceValue: 185000,
    image: T('1-scaled-ri16sm0wfmwj64hcg42kylr1oqoax4ys7ichzxuoxc.png'),
    description:
      "Correct Craft Super Air Nautique G21 de 2024, moteur ZZ6 GM 6.2L de 450 ch (640 heures). Format compact et polyvalent de la série G.",
    sold: true,
  },
  {
    slug: 'super-air-nautique-g21-2014',
    modelSlug: 'super-air-nautique-g21',
    brandId: 'nautique',
    title: 'Super Air Nautique G21',
    year: '2014',
    capacity: '13 personnes',
    power: 'PCM 5.7L, 415 ch',
    length: '6,55 m',
    location: "Lac d'Annecy",
    price: '89 900 €',
    priceValue: 89900,
    image: T('Copie-de-BATEAU-VENDU-format-paysage-1-ri19hx9dz6474t4p7od4ljpznt1at2adx5r5m7ker4.png'),
    description:
      "Correct Craft Super Air Nautique G21 de 2014, moteur PCM 5.7L de 415 ch. Le wakeboat polyvalent de la série G dans un format compact.",
    sold: true,
  },
  {
    slug: 'super-air-nautique-210-2021',
    modelSlug: 'super-air-nautique-210',
    brandId: 'nautique',
    title: 'Super Air Nautique 210',
    year: '2021',
    capacity: '10 personnes',
    power: 'ZR4 Coastal 6.0L, 400 ch',
    length: '6,40 m',
    location: "Lac d'Annecy",
    price: '89 000 €',
    priceValue: 89000,
    image: T('SUPER-AIR-NAUTIQUE-210-_-2021.2-rbihmoc2h2cfac10trwrgxg40mymff7fds9m9n2ueo.webp'),
    gallery: [
      T('SUPER-AIR-NAUTIQUE-210-_-2021.2-rbihmoc2h2cfac10trwrgxg40mymff7fds9m9n2ueo.webp'),
      T('SUPER-AIR-NAUTIQUE-210-_-2021.3-rbihmq7quqezxjyaisq0lwz17epcutew21kl870228.webp'),
      T('SUPER-AIR-NAUTIQUE-210-_-2021.4-rbihms3f8ehkkrvk7tj9qwhye6g3a7mcqavk6qx9ps.webp'),
    ],
    description:
      "Correct Craft Super Air Nautique 210 de 2021, en état proche du neuf. Moteur ZR4 Coastal Edition 6.0L de 400 ch.",
    sold: true,
  },
];

/** Toutes les occasions (disponibles + vendues). */
export function allUsedBoats(): UsedBoat[] {
  return usedBoats;
}

/** Occasions disponibles à la vente (catalogue indexable /bateaux/occasion). */
export function availableUsedBoats(): UsedBoat[] {
  return usedBoats.filter((b) => !b.sold);
}

/** Bateaux vendus (archive « preuve sociale » /bateaux/vendu, en noindex). */
export function soldUsedBoats(): UsedBoat[] {
  return usedBoats.filter((b) => b.sold);
}

/** Occasions rattachées à un modèle donné (carrousel fiche modèle). */
export function usedBoatsForModel(modelSlug: string): UsedBoat[] {
  return usedBoats.filter((b) => b.modelSlug === modelSlug);
}

/** Récupère une occasion par son slug (fiche détail). */
export function getUsedBoatBySlug(slug?: string): UsedBoat | undefined {
  return slug ? usedBoats.find((b) => b.slug === slug) : undefined;
}
