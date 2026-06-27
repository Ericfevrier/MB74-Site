import { GENERATED_BRANDS } from './generated/brands';

export interface BoatModel {
  name: string;
  image: string;
  description: string;
}

export interface ComparisonSpec {
  label: string;
  values: string[];
}

export interface ComparisonCategory {
  title: string;
  /** Résumé court des différences clés, pour une lecture rapide du tableau. */
  summary?: string;
  models: string[];
  specs: ComparisonSpec[];
}

export interface BrandData {
  id: string;
  name: string;
  fullName: string;
  logo: string;
  /** Statut commercial affiché (ex. "Concessionnaire officiel", "Importateur officiel"). Défaut : "Concessionnaire officiel". */
  role?: string;
  /** Hero "emblème + wordmark" : affiche le logo (sur pastille blanche) + le nom de la marque en grand à côté.
   *  (Pour les logos qui ne contiennent pas déjà le nom, ex. MasterCraft.) */
  heroWordmark?: boolean;
  heroImage: string;
  description: string;
  tagline: string;
  models: BoatModel[];
  comparisons?: ComparisonCategory[];
  /** Visuels « la marque » : bateaux sous différents angles, affichés en diaporama dans la 2e section (sinon heroImage). */
  introImages?: string[];
}

export const STATIC_BRANDS_DATA: Record<string, BrandData> = {
  nautique: {
    id: "nautique",
    name: "Nautique",
    fullName: "Nautique",
    logo: "/images/nautique-web-logo-white.png",
    role: "Concessionnaire officiel",
    heroImage: "/images/2026-p23-ext-09-11zon.jpg",
    tagline: "L'excellence sur l'eau depuis 1925",
    description: "MotorBoat74 vous propose une sélection haut de gamme de bateaux Nautique, spécialement conçus pour le ski nautique, le wakeboard et le wakesurf. Ces bateaux se démarquent par une construction robuste, des matériaux premium et une finition irréprochable.\n\nChaque modèle est pensé pour offrir des sensations de glisse exceptionnelles, une navigation fluide et une ergonomie parfaite à bord. Que vous soyez rider expérimenté ou que vous souhaitiez profiter de moments en famille sur l’eau, la gamme Nautique répond à toutes les envies.\n\nEn tant que concessionnaire officiel, nous vous accompagnons à chaque étape : conseil, choix du modèle, options, financement… avec un seul objectif : trouver le bateau parfaitement adapté à vos besoins et votre style de navigation.",
    models: [
      {
        name: "G25 Paragon",
        image: "/images/nautique/g25-paragon-1.jpg",
        description: "L'apogée du luxe et de la performance, avec des finitions artisanales et une technologie sans compromis."
      },
      {
        name: "G23 Paragon",
        image: "/images/nautique/g23-paragon-1.jpg",
        description: "L'excellence Nautique concentrée dans le modèle le plus primé de l'industrie."
      },
      {
        name: "Super Air Nautique G25",
        image: "/images/nautique/super-air-nautique-g25-1.jpg",
        description: "Une plateforme spacieuse offrant une performance de vague légendaire pour tout le groupe."
      },
      {
        name: "Super Air Nautique G23",
        image: "/images/nautique/g23-paragon-2.jpg",
        description: "La référence mondiale absolue pour le wakeboard et le wakesurf."
      },
      {
        name: "Super Air Nautique G21",
        image: "/images/nautique/super-air-nautique-g25-2.jpg",
        description: "La performance de la série G dans un format polyvalent."
      },
      {
        name: "Super Air Nautique S25",
        image: "/images/nautique/super-air-nautique-s25-1.jpg",
        description: "La nouvelle référence en matière de design moderne et de polyvalence en grand format."
      },
      {
        name: "Super Air Nautique S23",
        image: "/images/nautique/super-air-nautique-s23-1.jpg",
        description: "Un mélange parfait entre tradition et modernité pour une expérience de glisse totale."
      },
      {
        name: "Super Air Nautique S21",
        image: "/images/nautique/super-air-nautique-s21-1.jpg",
        description: "Performance et style dans un format compact et agile."
      },
      {
        name: "Super Air Nautique GS24",
        image: "/images/nautique/super-air-nautique-gs24-1.jpg",
        description: "La polyvalence multi-sports ultime pour les familles passionnées."
      },
      {
        name: "Super Air Nautique GS22",
        image: "/images/nautique/super-air-nautique-gs22-1.jpg",
        description: "Le summum de la polyvalence pour le ski, le wake et le surf."
      },
      {
        name: "Super Air Nautique GS20",
        image: "/images/nautique/super-air-nautique-gs20-1.jpg",
        description: "Toute la performance Nautique dans un format manœuvrable et polyvalent."
      },
      {
        name: "Ski Nautique",
        image: "/images/nautique/ski-nautique-1.jpg",
        description: "Le bateau de ski de compétition le plus performant jamais construit."
      }
    ],
    comparisons: [
      {
        title: "Nautique Paragon",
        summary: "Les deux Paragon partagent la même motorisation (PCM ZZ8S 630 ch essence ou Yanmar 8LV 370 ch diesel) et la même largeur. Le G25 Paragon est plus grand (25 vs 23 pieds), accueille jusqu'à 19 personnes (contre 16) et offre la plus grande autonomie (333 L). Le G23 Paragon, plus compact, est plus maniable et affiche le ballast maximal le plus élevé. En clair : le G25 pour les grands groupes, le G23 pour l'agilité.",
        models: ["G23 Paragon", "G25 Paragon"],
        specs: [
          { label: "Longueur total", values: ["23' 3\" / 7.09 m", "25' 3\" / 7.7 m"] },
          { label: "Longueur (avec plateforme)", values: ["25' 5\" / 7.75 m", "27' 5\" / 8.61 m"] },
          { label: "Largeur (bau)", values: ["102\" / 2.59 m", "102\" / 2.59 m"] },
          { label: "Tirant d'eau", values: ["34\" / .86 m", "34.5\" / .88 m"] },
          { label: "Poids sec approximatif", values: ["7,750 lbs. / 3,515 kg", "8,400 lbs. / 3,810 kg"] },
          { label: "Capacité de carburant", values: ["65.6 gal / 248.2 L", "88 gal / 333.1 L"] },
          { label: "Capacité maximale", values: ["16 people / 2,500 lbs. / 1,134 kg", "19 people / 2,800 lbs. / 1,270 kg"] },
          { label: "Ballast max (avec supplément)", values: ["3,700 lbs. / 1,678 kg", "3,400 lbs. / 1,542 kg"] },
          { label: "Puissance", values: ["ZZ8S – 630 HP / 8LV 370 – 370 HP", "ZZ8S – 630 HP / 8LV 370 – 370 HP"] },
          { label: "Couple", values: ["665 Ft-Lb / 595 Ft-Lb (diesel)", "665 Ft-Lb / 595 Ft-Lb (diesel)"] },
          { label: "Rapport de réduction de vitesse", values: ["1.7:1", "1.7:1"] }
        ]
      },
      {
        title: "Nautique G",
        summary: "Même plateforme Série G et capacité de ballast identique pour les deux. Le G25 (25 pieds) embarque 19 personnes et 333 L de carburant pour les sorties en grand groupe ; le G23 (23 pieds), plus léger et maniable, plafonne à 16 personnes et 248 L. La largeur de coque est la même : le choix se joue donc sur la taille et la capacité d'accueil.",
        models: ["G23", "G25"],
        specs: [
          { label: "Longueur total", values: ["23' / 7.01 m", "25' / 7.62 m"] },
          { label: "Longueur (avec plateforme)", values: ["25' 2\" / 7.67 m", "27' 2\" / 8.28 m"] },
          { label: "Largeur (bau)", values: ["102\" / 2.59 m", "102\" / 2.59 m"] },
          { label: "Tirant d'eau", values: ["31\" / .79 m", "32\" / .81 m"] },
          { label: "Poids sec approximatif", values: ["6,400 lbs. / 2,903 kg", "7,100 lbs. / 3,221 kg"] },
          { label: "Capacité de carburant", values: ["65.6 gal / 248.3 L", "88 gal / 333.1 L"] },
          { label: "Capacité maximale", values: ["16 people / 2,250 lbs. / 1,021 kg", "19 people / 2,800 lbs. / 1,270 kg"] },
          { label: "Ballast max (avec supplément)", values: ["3,650 lbs. / 1,656 kg", "3,650 lbs. / 1,656 kg"] }
        ]
      },
      {
        title: "Nautique S",
        summary: "La série S (proue traditionnelle) s'échelonne du S21, le plus court (21 pieds) et le plus léger (≈2 360 kg) donc le plus agile, jusqu'au S25 (25 pieds, ≈2 790 kg) le plus spacieux. Plus le modèle grandit, plus le poids et la capacité augmentent ; le S25 gagne aussi en largeur (102 vs 100 pouces). Format compact ou maximum de place à bord : à vous de choisir.",
        models: ["S21", "S23", "S25"],
        specs: [
          { label: "Longueur total", values: ["21' / 6.40 m", "23' / 7.01 m", "25' / 7.62 m"] },
          { label: "Largeur", values: ["100\" / 2.54 m", "100\" / 2.54 m", "102\" / 2.59 m"] },
          { label: "Poids sec", values: ["5,200 lbs / 2359 kg", "5,500 lbs / 2495 kg", "6,150 lbs / 2789 kg"] }
        ]
      },
      {
        title: "Nautique GS",
        summary: "La série GS multisport repose sur une coque hybride Ski Nautique / Série G, idéale pour passer du ski au wakesurf. Elle va du GS20 (20 pieds, compact et polyvalent) au GS24 (24 pieds, le plus spacieux, qui gagne en largeur : 102 vs 100 pouces). Le choix se fait surtout sur la taille et le nombre de passagers.",
        models: ["GS20", "GS22", "GS24"],
        specs: [
          { label: "Longueur total", values: ["20' / 6.10 m", "22' / 6.71 m", "24' / 7.32 m"] },
          { label: "Largeur", values: ["100\" / 2.54 m", "100\" / 2.54 m", "102\" / 2.59 m"] }
        ]
      },
      {
        title: "Ski Nautique",
        summary: "Bateau de slalom dédié : une coque légère de 20 pieds, étroite (95 pouces) et entièrement redessinée, pensée pour un sillage minimal et une précision maximale en ski nautique de compétition. C'est le plus spécialisé de la gamme, à l'opposé des wakeboats polyvalents.",
        models: ["Ski Nautique"],
        specs: [
          { label: "Longueur total", values: ["20' / 6.10 m"] },
          { label: "Largeur", values: ["95\" / 2.41 m"] }
        ]
      }
    ]
  },
  mastercraft: {
    id: "mastercraft",
    name: "Mastercraft",
    fullName: "MasterCraft Boats",
    logo: "/images/mcft-70e1d427.png",
    role: "Importateur officiel",
    heroWordmark: true,
    heroImage: "https://www.mastercraft.com/media/iujfrvnt/dt-background-image-1.webp",
    tagline: "Une exigence sans compromis",
    introImages: [
      "https://www.mastercraft.com/media/cwehmhdl/mb-2-3.webp",
      "https://www.mastercraft.com/media/0zadabm5/mb-1-3.jpg",
      "https://www.mastercraft.com/media/oneinmeq/mb-gal-1.webp",
      "https://www.mastercraft.com/media/kinb2meu/mb-2-3.jpg",
      "https://www.mastercraft.com/media/escgkxei/mb-1-1.webp",
      "https://www.mastercraft.com/media/0zrehkiw/mb-built-for-better-waves.jpg",
    ],
    description: "MasterCraft conçoit et fabrique aux États-Unis des wakeboats et bateaux de ski nautique de référence depuis 1968, plébiscités par les riders professionnels et les familles exigeantes. Chaque modèle est animé par un moteur Ilmor (jusqu'au 6.2L suralimenté de 630 ch, le plus puissant des towboats) et un système de vague SurfStar pour des vagues et sillages calibrés au rider près.\n\nDe la série NXT, accessible et polyvalente, aux séries XT et X, jusqu'au fleuron XStar et au ski-boat ProStar, la gamme MasterCraft couvre tous les usages : wakesurf, wakeboard, ski nautique et sorties en famille. Construction premium, finitions soignées et technologies de pointe (SoundStage, stern thruster, écrans tactiles) font la signature de la marque.\n\nMotor Boat 74 vous accompagne dans le choix du modèle MasterCraft idéal, avec essai sur le lac d'Annecy, financement, reprise, entretien et hivernage.",
    models: [
      { name: "XStar 23", image: "https://www.mastercraft.com/media/0zadabm5/mb-1-3.jpg", description: "Le fleuron luxe de MasterCraft : proue pickle-fork iconique, vagues de classe mondiale (SurfStar) et finitions premium. Jusqu'à 16 personnes." },
      { name: "XStar 25", image: "https://www.mastercraft.com/media/fm3nab5i/mb-1-4.jpg", description: "La version XL du fleuron : 18 places, coque affinée et stern thruster pour une maniabilité totale (rotation 360°)." },
      { name: "X24", image: "https://www.mastercraft.com/media/cwehmhdl/mb-2-3.webp", description: "Le plus grand des X : espace maximal, ballast renforcé (4 050 lbs) pour des vagues puissantes. Jusqu'à 17 personnes." },
      { name: "X23", image: "https://www.mastercraft.com/media/oneinmeq/mb-gal-1.webp", description: "Le X au volume intérieur accru : assises plus profondes et rangements généreux. Jusqu'à 16 personnes." },
      { name: "X22", image: "https://www.mastercraft.com/media/0zrehkiw/mb-built-for-better-waves.jpg", description: "Précision et présence dans un format compact et réactif, idéal wakesurf et wakeboard. Jusqu'à 15 personnes." },
      { name: "XT24", image: "https://www.mastercraft.com/media/kinb2meu/mb-2-3.jpg", description: "Le XT le plus grand : capacité et façonnage de vague maximaux. Jusqu'à 17 personnes." },
      { name: "XT23", image: "https://www.mastercraft.com/media/m20l1ob4/mb-driving.jpg", description: "Plateforme étendue et équipements premium pour passionnés. Jusqu'à 16 personnes." },
      { name: "XT22", image: "https://www.mastercraft.com/media/0p4bxnoq/mb-3-3.jpg", description: "Le XT qui équilibre performance et capacité familiale. Jusqu'à 16 personnes." },
      { name: "XT22T", image: "https://www.mastercraft.com/media/1wehzsnp/mb-3-3.jpg", description: "La variante à proue pickle-fork du XT : esthétique moderne et distinctive. Jusqu'à 14 personnes." },
      { name: "XT20", image: "https://www.mastercraft.com/media/1d2asqo0/mb-1-3.jpg", description: "Le surf-boat compact et polyvalent, parfait pour débuter. Jusqu'à 12 personnes." },
      { name: "NXT24", image: "https://www.mastercraft.com/media/escgkxei/mb-1-1.webp", description: "Le fleuron NXT : capacité maximale et performances premium, option moteur 6.2L. Jusqu'à 16 personnes." },
      { name: "NXT23", image: "https://www.mastercraft.com/media/2kul0ct5/mb-1-1.webp", description: "Capacité étendue et ballast accru, option moteur 6.2L GDI. Jusqu'à 16 personnes." },
      { name: "NXT22", image: "https://www.mastercraft.com/media/vtzbitju/mb-1.webp", description: "Le NXT polyvalent, plus de ballast pour de meilleures vagues. Jusqu'à 14 personnes." },
      { name: "NXT20", image: "https://www.mastercraft.com/media/4bykamyl/mb-1.webp", description: "L'accès à l'univers MasterCraft dans un format 20 pieds maniable. Jusqu'à 11 personnes." },
      { name: "ProStar", image: "https://www.mastercraft.com/media/szgbgc4i/wake_desktop.jpg", description: "La référence absolue du ski nautique : le sillage le plus plat du marché et un suivi laser-précis. 7 personnes." },
    ],
    comparisons: [
      {
        title: "MasterCraft XStar",
        summary: "Le sommet de la gamme : les deux XStar partagent le moteur le plus puissant du marché (Ilmor 6.2L suralimenté, 630 ch) et le système SurfStar. Le XStar 25, plus grand, accueille 18 personnes (contre 16) avec un ballast supérieur ; le XStar 23, plus compact, reste la référence agile. À choisir selon la place souhaitée à bord.",
        models: ["XStar 23", "XStar 25"],
        specs: [
          { label: "Longueur totale", values: ["23' 7\" / 7,19 m", "25' 7\" / 7,80 m"] },
          { label: "Capacité maximale", values: ["16 personnes", "18 personnes"] },
          { label: "Ballast max", values: ["3 775 lbs / 1 712 kg", "3 975 lbs / 1 803 kg"] },
          { label: "Moteur standard", values: ["Ilmor 6.2L Supercharged, 630 ch", "Ilmor 6.2L Supercharged, 630 ch"] },
        ],
      },
      {
        title: "MasterCraft X",
        summary: "La série X (« Precision With Presence ») s'échelonne du X22, compact et réactif, au X24, le plus grand et le mieux doté en ballast (4 050 lbs) pour des vagues puissantes. Toutes acceptent le moteur Ilmor 6.2L : 440 ch de série, 630 ch suralimenté en option.",
        models: ["X22", "X23", "X24"],
        specs: [
          { label: "Longueur totale", values: ["22' 3\" / 6,78 m", "22' 11\" / 6,99 m", "24' 3\" / 7,39 m"] },
          { label: "Capacité maximale", values: ["15 personnes", "16 personnes", "17 personnes"] },
          { label: "Ballast max", values: ["3 800 lbs / 1 724 kg", "3 800 lbs / 1 724 kg", "4 050 lbs / 1 837 kg"] },
          { label: "Moteur standard", values: ["Ilmor 6.2L GDI, 440 ch", "Ilmor 6.2L GDI, 440 ch", "Ilmor 6.2L GDI, 440 ch"] },
          { label: "Moteur en option", values: ["6.2L Supercharged, 630 ch", "6.2L Supercharged, 630 ch", "6.2L Supercharged, 630 ch"] },
        ],
      },
      {
        title: "MasterCraft XT",
        summary: "La série XT (versatilité) va du XT20 compact au XT24, le plus spacieux. Le XT22T se distingue par sa proue pickle-fork. Toutes partagent le moteur Ilmor 6.2L GDI 440 ch : le choix se fait surtout sur la taille et la capacité d'accueil.",
        models: ["XT20", "XT22T", "XT22", "XT23", "XT24"],
        specs: [
          { label: "Longueur totale", values: ["20' / 6,10 m", "21' 10\" / 6,65 m", "22' 4\" / 6,81 m", "23' 4\" / 7,11 m", "24' / 7,32 m"] },
          { label: "Capacité maximale", values: ["12 pers.", "14 pers.", "16 pers.", "16 pers.", "17 pers."] },
          { label: "Ballast max", values: ["2 950 lbs / 1 338 kg", "3 020 lbs / 1 370 kg", "3 500 lbs / 1 588 kg", "3 450 lbs / 1 565 kg", "3 700 lbs / 1 678 kg"] },
          { label: "Moteur standard", values: ["Ilmor 6.2L GDI, 440 ch", "Ilmor 6.2L GDI, 440 ch", "Ilmor 6.2L GDI, 440 ch", "Ilmor 6.2L GDI, 440 ch", "Ilmor 6.2L GDI, 440 ch"] },
        ],
      },
      {
        title: "MasterCraft NXT",
        summary: "La série NXT (l'accès à MasterCraft) démarre au NXT20 (380 ch, ballast léger) et monte jusqu'au NXT24. Les NXT23 et NXT24 peuvent recevoir le moteur 6.2L GDI 440 ch pour plus de punch. Capacité et ballast croissent avec la taille.",
        models: ["NXT20", "NXT22", "NXT23", "NXT24"],
        specs: [
          { label: "Longueur totale", values: ["20' / 6,10 m", "22' / 6,71 m", "23' / 7,01 m", "24' / 7,32 m"] },
          { label: "Capacité maximale", values: ["11 pers.", "14 pers.", "16 pers.", "16 pers."] },
          { label: "Ballast max", values: ["1 770 lbs / 803 kg", "3 000 lbs / 1 361 kg", "3 130 lbs / 1 420 kg", "3 300 lbs / 1 497 kg"] },
          { label: "Moteur standard", values: ["Ilmor 5.3L GDI HO, 380 ch", "Ilmor 5.3L GDI HO, 380 ch", "Ilmor 5.3L GDI HO, 380 ch", "Ilmor 5.3L GDI HO, 380 ch"] },
          { label: "Moteur en option", values: ["—", "—", "6.2L GDI, 440 ch", "6.2L GDI, 440 ch"] },
        ],
      },
      {
        title: "MasterCraft ProStar",
        summary: "Le ProStar est un bateau de ski nautique pur : coque de 20 pieds au sillage le plus plat du marché et suivi laser-précis grâce à ses quatre ailettes. À l'opposé des wakeboats, il privilégie la précision du ski de compétition, avec un large choix de moteurs Ilmor.",
        models: ["ProStar"],
        specs: [
          { label: "Longueur totale", values: ["20' / 6,10 m"] },
          { label: "Largeur (bau)", values: ["96\" / 2,43 m"] },
          { label: "Capacité maximale", values: ["7 personnes"] },
          { label: "Poids sec", values: ["3 300 lbs / 1 497 kg"] },
          { label: "Capacité de carburant", values: ["30 gal / 113 L"] },
          { label: "Moteurs disponibles", values: ["Ilmor 5.3L 380 ch à 6.2L Supercharged 630 ch"] },
        ],
      },
    ],
  },
  tige: {
    id: "tige",
    name: "Tigé",
    fullName: "Tigé Boats",
    logo: "/images/tigeboats-logo-black-orange-logo.jpg",
    heroImage: "/images/stock-1524661135-423995f22d0b-1200.jpg",
    tagline: "Always leading, never following",
    description: "Tigé est reconnu pour sa polyvalence et son innovation constante dans la création de vagues parfaites.",
    models: []
  },
  centurion: {
    id: "centurion",
    name: "Centurion",
    fullName: "Centurion Boats",
    logo: "/images/centurion-boats-logo-png-seeklogo-387911.png",
    heroImage: "/images/stock-1502680390469-be75c86b636f-1200.jpg",
    tagline: "The World's Best Waves and Wakes",
    description: "Centurion Boats est le leader mondial de la technologie de wakesurf, offrant les vagues les plus longues et les plus puissantes du marché.",
    models: []
  },
  supra: {
    id: "supra",
    name: "Supra",
    fullName: "Supra Boats",
    logo: "/images/311-3118902-supra-logo-png-transparent-supra-boats-logo-png.png",
    heroImage: "/images/placeholder-boat.jpg",
    tagline: "Performance Beyond Belief",
    description: "Supra allie luxe raffiné et puissance brute pour des sessions mémorables.",
    models: []
  },
  moomba: {
    id: "moomba",
    name: "Moomba",
    fullName: "Moomba Boats",
    logo: "/images/moomba-roo-logo-bf-vrq-x3v.jpg",
    heroImage: "/images/placeholder-boat.jpg",
    tagline: "No Worries. Just Fun.",
    description: "Moomba offre le meilleur rapport qualité-prix du marché sans compromis sur le plaisir.",
    models: []
  },
  axis: {
    id: "axis",
    name: "Axis",
    fullName: "Axis Wake Research",
    logo: "/images/header-logo.png",
    heroImage: "/images/placeholder-boat.jpg",
    tagline: "Pure Performance",
    description: "Axis se concentre sur l'essentiel : une performance de vague exceptionnelle simplifiée.",
    models: []
  }
};

/** Fusion : le CMS surcharge les champs éditoriaux ; le code garde le structurel (modèles, comparatifs, introImages…). */
export function mergeBrands(base: Record<string, BrandData>, editorial: unknown[]): Record<string, BrandData> {
  if (!editorial || !editorial.length) return base;
  const ne = (v: unknown) => v !== undefined && v !== null && v !== '';
  const out: Record<string, BrandData> = { ...base };
  for (const e of editorial as any[]) {
    const b = out[e.brand_id];
    if (!b) continue;
    out[e.brand_id] = {
      ...b,
      ...(ne(e.name) ? { name: e.name } : {}),
      ...(ne(e.full_name) ? { fullName: e.full_name } : {}),
      ...(ne(e.role) ? { role: e.role } : {}),
      ...(ne(e.logo) ? { logo: e.logo } : {}),
      ...(ne(e.hero_image) ? { heroImage: e.hero_image } : {}),
      ...(ne(e.tagline) ? { tagline: e.tagline } : {}),
      ...(ne(e.description) ? { description: e.description } : {}),
      heroWordmark: !!e.hero_wordmark,
    };
  }
  return out;
}

export const brandsData: Record<string, BrandData> = mergeBrands(STATIC_BRANDS_DATA, GENERATED_BRANDS);
