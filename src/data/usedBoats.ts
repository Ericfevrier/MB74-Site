/**
 * Inventaire des bateaux d'occasion.
 * Sert : le carrousel « occasions » des fiches modèle, la page /bateaux/occasion
 * et les fiches détail /bateaux/occasion/[slug].
 *
 * Données reproduites depuis motorboat74.com/bateaux/occasion (inventaire réel).
 * Images hotlinkées depuis le site actuel (wp-content). Vider ce tableau quand il
 * n'y a pas de stock → les pages affichent un message « aucune occasion ».
 *
 * SOURCE : si le CMS a généré du contenu au build (GENERATED_USED_BOATS non vide),
 * il prime ; sinon on utilise le tableau statique ci-dessous (repli, zéro régression).
 */
import { GENERATED_USED_BOATS } from './generated/used-boats';

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
/** Image originale pleine résolution (haute netteté), ex. F('2025/09/photo.jpg'). */
const F = (s: string) => `https://motorboat74.com/wp-content/uploads/${s}`;

const STATIC_USED_BOATS: UsedBoat[] = [
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
    sold: true,
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
  {
    slug: 'super-air-nautique-s21-2023',
    modelSlug: 'super-air-nautique-s21',
    brandId: 'nautique',
    title: 'Super Air Nautique S21',
    year: '2023',
    capacity: '14 personnes',
    power: 'PCM ZR4 6.0L, 400 ch',
    hours: '769 h',
    length: '6,55 m',
    location: "Lac d'Annecy",
    price: '133 000 €',
    priceValue: 133000,
    image: F('2025/09/Super-Air-Nautique-S21.1-1-scaled.jpg'),
    gallery: [
      F('2025/09/Super-Air-Nautique-S21.1-1-scaled.jpg'),
      F('2025/09/Super-Air-Nautique-S21.2-1-scaled.jpg'),
      F('2025/09/Super-Air-Nautique-S21.3-1-scaled.jpg'),
      F('2025/09/Super-Air-Nautique-S21.4-1-scaled.jpg'),
    ],
    description:
      "Super Air Nautique S21 de 2023, compact et performant. Moteur PCM ZR4 6.0L de 400 ch, 769 heures, réservoir 246 L.",
    highlights: [
      'Tower speakers et éclairage sous-marin',
      'Système audio Bluetooth',
      'Surf Watch et GPS',
    ],
    sold: true,
  },
  {
    slug: 'malibu-23-lsv-2021',
    modelSlug: 'malibu-23-lsv',
    brandId: 'malibu',
    title: 'Malibu 23 LSV',
    year: '2021',
    capacity: '15 personnes',
    power: 'Essence, 410 ch',
    hours: '1 450 h',
    location: "Lac d'Annecy",
    price: '125 000 €',
    priceValue: 125000,
    image: F('2025/09/MALIBU-23-LSV.1.webp'),
    gallery: [
      F('2025/09/MALIBU-23-LSV.1.webp'),
      F('2025/09/MALIBU-23-LSV.2.webp'),
      F('2025/09/MALIBU-23-LSV.3.webp'),
      F('2025/09/MALIBU-23-LSV.9.webp'),
    ],
    description:
      "Malibu 23 LSV de 2021, wakeboat polyvalent et familial. Moteur essence de 410 ch, 1 450 heures.",
    highlights: [
      'Surf Gate et Power Wedge, ballasts intégrés',
      'Bimini avec rangement surf',
      'Tower speakers avec amplificateur',
      'Éclairage sous-marin et de pont, chauffage',
    ],
    sold: true,
  },
  {
    slug: 'mastercraft-prostar-190-2021',
    modelSlug: 'prostar',
    brandId: 'mastercraft',
    title: 'MasterCraft ProStar 190',
    year: '2021',
    capacity: '7 personnes',
    power: 'Ilmor 6.2L, 460 ch',
    hours: '250 h',
    length: '7,00 m',
    location: "Lac d'Annecy",
    price: '89 500 €',
    priceValue: 89500,
    image: F('2025/09/MASTERCRAFT_PROSTAR-190_2021.1.webp'),
    gallery: [
      F('2025/09/MASTERCRAFT_PROSTAR-190_2021.1.webp'),
      F('2025/09/MASTERCRAFT_PROSTAR-190_2021.2.webp'),
      F('2025/09/MASTERCRAFT_PROSTAR-190_2021.3.webp'),
    ],
    description:
      "MasterCraft ProStar 190 de 2021, ski-boat de référence. Moteur Ilmor 6.2L de 460 ch, seulement 250 heures.",
    highlights: [
      'Plateforme teck et racks à ski',
      'Tower avec housse incluse',
      'Bimini et chauffage',
    ],
    sold: true,
  },
  {
    slug: 'mastercraft-x-35-2009',
    modelSlug: 'mastercraft-x-35',
    brandId: 'mastercraft',
    title: 'MasterCraft X-35',
    year: '2009',
    capacity: '10 personnes',
    power: 'Essence, 400 ch',
    hours: '350 h',
    length: '7,14 m',
    location: "Lac d'Annecy",
    price: '62 000 €',
    priceValue: 62000,
    image: F('2025/08/imgi_8_4-scaled_5_11zon.jpg'),
    gallery: [
      F('2025/08/imgi_8_4-scaled_5_11zon.jpg'),
      F('2025/08/imgi_3_IMG_1972-scaled_1_11zon.jpg'),
      F('2025/08/imgi_4_IMG_1975_3_11zon-scaled_2_11zon.jpg'),
      F('2025/08/imgi_5_IMG_1977_1_11zon-scaled_4_11zon.jpg'),
    ],
    description:
      "MasterCraft X-35 de 2009 en excellent état. Moteur essence de 400 ch, 350 heures. Bateau spacieux et bien équipé.",
    sold: true,
  },
  {
    slug: 'mastercraft-x-25-2014',
    modelSlug: 'mastercraft-x-25',
    brandId: 'mastercraft',
    title: 'MasterCraft X-25',
    year: '2014',
    capacity: '16 personnes',
    power: 'Ilmor 6.0L, 400 ch',
    hours: '180 h',
    length: '6,58 m',
    location: "Lac d'Annecy",
    price: '62 500 €',
    priceValue: 62500,
    image: F('2025/08/imgi_7_2-scaled_9_11zon.jpg'),
    gallery: [
      F('2025/08/imgi_7_2-scaled_9_11zon.jpg'),
      F('2025/08/imgi_8_IMG-20241114-WA0016_4_11zon.jpg'),
      F('2025/08/imgi_5_IMG-20241114-WA0015_3_11zon.jpg'),
      F('2025/08/imgi_4_IMG-20241114-WA0011_2_11zon.jpg'),
    ],
    description:
      "MasterCraft X-25 de 2014 en bon état, grande capacité (16 personnes). Moteur Ilmor 6.0L de 400 ch, 180 heures seulement.",
    sold: true,
  },
  {
    slug: 'mastercraft-x35-2011',
    modelSlug: 'mastercraft-x35',
    brandId: 'mastercraft',
    title: 'MasterCraft X35',
    year: '2011',
    capacity: '10 personnes',
    power: 'Ilmor 6.2L, 430 ch',
    hours: '690 h',
    length: '6,55 m',
    location: "Lac d'Annecy",
    price: '49 898 €',
    priceValue: 49898,
    image: F('2025/08/imgi_6_IMG_1970_2_11zon-scaled_3_11zon.jpg'),
    gallery: [
      F('2025/08/imgi_6_IMG_1970_2_11zon-scaled_3_11zon.jpg'),
      F('2025/08/imgi_5_IMG_1977_1_11zon-scaled_4_11zon.jpg'),
      F('2025/08/imgi_4_IMG_1975_3_11zon-scaled_2_11zon.jpg'),
    ],
    description:
      "MasterCraft X35 de 2011. Moteur Ilmor 6.2L de 430 ch, 690 heures.",
    sold: true,
  },
  {
    slug: 'mastercraft-prostar-2016',
    modelSlug: 'prostar',
    brandId: 'mastercraft',
    title: 'MasterCraft ProStar',
    year: '2016',
    capacity: '7 personnes',
    power: 'Ilmor 6.2L',
    hours: '262 h',
    length: '6,10 m',
    location: "Lac d'Annecy",
    price: '59 500 €',
    priceValue: 59500,
    image: F('2025/08/imgi_7_IMG-20250604-WA0002_1_11zon-scaled_11zon.jpg'),
    gallery: [
      F('2025/08/imgi_7_IMG-20250604-WA0002_1_11zon-scaled_11zon.jpg'),
      F('2025/08/imgi_3_IMG-20250604-WA0003-scaled_11zon.jpg'),
      F('2025/08/imgi_4_IMG-20250604-WA0006_11zon.jpg'),
      F('2025/08/imgi_5_IMG-20250604-WA0004_11zon.jpg'),
    ],
    description:
      "MasterCraft ProStar de 2016, ski-boat compact et précis. Moteur Ilmor 6.2L, 262 heures.",
    sold: true,
  },
];

/**
 * Source effective : contenu CMS généré au build s'il existe, sinon le statique.
 */
export const usedBoats: UsedBoat[] = GENERATED_USED_BOATS.length
  ? (GENERATED_USED_BOATS as unknown as UsedBoat[])
  : STATIC_USED_BOATS;

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
