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
  models: string[];
  specs: ComparisonSpec[];
}

export interface BrandData {
  id: string;
  name: string;
  fullName: string;
  logo: string;
  heroImage: string;
  description: string;
  tagline: string;
  models: BoatModel[];
  comparisons?: ComparisonCategory[];
}

export const brandsData: Record<string, BrandData> = {
  nautique: {
    id: "nautique",
    name: "Nautique",
    fullName: "Nautique",
    logo: "/images/nautique-web-logo-white.png",
    heroImage: "/images/2026-p23-ext-09-11zon.jpg",
    tagline: "L'excellence sur l'eau depuis 1925",
    description: "MotorBoat74 vous propose une sélection haut de gamme de bateaux Nautique, spécialement conçus pour le ski nautique, le wakeboard et le wakesurf. Ces bateaux se démarquent par une construction robuste, des matériaux premium et une finition irréprochable.\n\nChaque modèle est pensé pour offrir des sensations de glisse exceptionnelles, une navigation fluide et une ergonomie parfaite à bord. Que vous soyez rider expérimenté ou que vous souhaitiez profiter de moments en famille sur l’eau, la gamme Nautique répond à toutes les envies.\n\nEn tant que concessionnaire officiel, nous vous accompagnons à chaque étape : conseil, choix du modèle, options, financement… avec un seul objectif : trouver le bateau parfaitement adapté à vos besoins et votre style de navigation.",
    models: [
      {
        name: "G25 Paragon",
        image: "/images/2026-p23-ext-09-11zon.jpg",
        description: "L'apogée du luxe et de la performance, avec des finitions artisanales et une technologie sans compromis."
      },
      {
        name: "G23 Paragon",
        image: "/images/2026-p25-ext-16.jpg",
        description: "L'excellence Nautique concentrée dans le modèle le plus primé de l'industrie."
      },
      {
        name: "Super Air Nautique G25",
        image: "/images/2026-p23-ext-09-11zon.jpg",
        description: "Une plateforme spacieuse offrant une performance de vague légendaire pour tout le groupe."
      },
      {
        name: "Super Air Nautique G23",
        image: "/images/2026-p25-ext-16.jpg",
        description: "La référence mondiale absolue pour le wakeboard et le wakesurf."
      },
      {
        name: "Super Air Nautique G21",
        image: "/images/2026-p23-ext-09-11zon.jpg",
        description: "La performance de la série G dans un format polyvalent."
      },
      {
        name: "Super Air Nautique S25",
        image: "/images/2026-p23-ext-09-11zon.jpg",
        description: "La nouvelle référence en matière de design moderne et de polyvalence en grand format."
      },
      {
        name: "Super Air Nautique S23",
        image: "/images/placeholder-boat.jpg",
        description: "Un mélange parfait entre tradition et modernité pour une expérience de glisse totale."
      },
      {
        name: "Super Air Nautique S21",
        image: "/images/26723-16656744.webp",
        description: "Performance et style dans un format compact et agile."
      },
      {
        name: "Super Air Nautique GS24",
        image: "/images/2026-p23-ext-09-11zon.jpg",
        description: "La polyvalence multi-sports ultime pour les familles passionnées."
      },
      {
        name: "Super Air Nautique GS22",
        image: "/images/26723-16656744.webp",
        description: "Le summum de la polyvalence pour le ski, le wake et le surf."
      },
      {
        name: "Super Air Nautique GS20",
        image: "/images/26723-16656744.webp",
        description: "Toute la performance Nautique dans un format manœuvrable et polyvalent."
      },
      {
        name: "Ski Nautique",
        image: "/images/26723-16656744.webp",
        description: "Le bateau de ski de compétition le plus performant jamais construit."
      }
    ],
    comparisons: [
      {
        title: "Nautique Paragon",
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
        models: ["S21", "S23", "S25"],
        specs: [
          { label: "Longueur total", values: ["21' / 6.40 m", "23' / 7.01 m", "25' / 7.62 m"] },
          { label: "Largeur", values: ["100\" / 2.54 m", "100\" / 2.54 m", "102\" / 2.59 m"] },
          { label: "Poids sec", values: ["5,200 lbs / 2359 kg", "5,500 lbs / 2495 kg", "6,150 lbs / 2789 kg"] }
        ]
      },
      {
        title: "Nautique GS",
        models: ["GS20", "GS22", "GS24"],
        specs: [
          { label: "Longueur total", values: ["20' / 6.10 m", "22' / 6.71 m", "24' / 7.32 m"] },
          { label: "Largeur", values: ["100\" / 2.54 m", "100\" / 2.54 m", "102\" / 2.59 m"] }
        ]
      },
      {
        title: "Ski Nautique",
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
    heroImage: "/images/placeholder-boat.jpg",
    tagline: "Held to a Higher Standard",
    description: "MasterCraft perpétue une tradition de qualité et de savoir-faire unique, offrant une expérience de glisse inégalée pour tous les niveaux.",
    models: [
      {
        name: "XStar S",
        image: "/images/placeholder-boat.jpg",
        description: "Le fleuron de MasterCraft pour le wakeboard de haut niveau."
      }
    ]
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
