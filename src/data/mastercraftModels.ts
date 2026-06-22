import { NautiqueModel, Highlight, Motorization, ModelFAQ } from './nautiqueModels';

/**
 * Catalogue MasterCraft 2026 — données reproduites depuis mastercraft.com
 * (fiches modèles : longueur, bau, tirant d'eau, capacité, ballast, carburant,
 * poids sec, motorisations Ilmor et équipements distinctifs de chaque modèle).
 * Images hotlinkées depuis le CDN MasterCraft (www.mastercraft.com/media/...).
 */

type Series = 'xstar' | 'x' | 'xt' | 'nxt' | 'prostar';

const ENGINE: Record<string, Motorization> = {
  sc630: { name: 'Ilmor 6.2L Supercharged', fuel: 'Essence', power: '630 ch', torque: '665 lb-ft', ratio: '' },
  gdi440: { name: 'Ilmor 6.2L GDI', fuel: 'Essence', power: '440 ch', torque: '479 lb-ft', ratio: '' },
  ho380: { name: 'Ilmor 5.3L GDI HO', fuel: 'Essence', power: '380 ch', torque: '407 lb-ft', ratio: '' },
  mpi373: { name: 'Ilmor 6.0L MPI', fuel: 'Essence', power: '373 ch', torque: '407 lb-ft', ratio: '' },
};

const HIGHLIGHTS: Record<Series, Highlight[]> = {
  xstar: [
    { title: 'SurfStar', text: 'Le système de vague SurfStar génère des vagues et sillages de classe mondiale, ajustables au rider près grâce aux presets et profils de foil.' },
    { title: 'Le moteur le plus puissant du marché', text: 'L’Ilmor 6.2L suralimenté de 630 ch, moteur de towboat le plus puissant de l’industrie, est de série sur les XStar.' },
    { title: 'Luxe et technologie', text: 'Sellerie premium, écrans tactiles panoramiques, audio SoundStage haute fidélité et tour repliable motorisée Z100.' },
    { title: 'Stern thruster', text: 'Le propulseur intégré offre une maniabilité totale à basse vitesse, jusqu’à la rotation sur place à 360°.' },
  ],
  x: [
    { title: 'SurfStar', text: 'Des vagues et sillages calibrés au rider près, avec presets de surf et profils de foil réglables.' },
    { title: 'Precision With Presence', text: 'Coque sculptée et lignes affirmées pour un comportement précis et une présence forte sur l’eau.' },
    { title: 'Ballast haute capacité', text: 'Un ballast généreux pour des vagues de wakesurf puissantes et un wake de wakeboard franc.' },
    { title: 'Audio SoundStage', text: 'Le nouveau système audio SoundStage signé Meridian, accordé sur mesure pour une immersion totale.' },
  ],
  xt: [
    { title: 'SurfStar', text: 'Vagues de surf de classe mondiale via SurfStar, avec profils de foil et presets personnalisables.' },
    { title: 'Polyvalence', text: 'Un bateau pensé pour tout faire : wakesurf, wakeboard et sorties en famille, du plus compact au plus spacieux.' },
    { title: 'Personnalisation', text: 'Nouvelles options de gelcoat, de vinyle et de couleur de tour pour un bateau à votre image.' },
    { title: 'Moteur Ilmor', text: 'Le bloc Ilmor 5.3L GDI HO de 380 ch de série, avec l’option 6.2L GDI de 440 ch.' },
  ],
  nxt: [
    { title: 'SurfStar', text: 'Presets de vague et profils de foil d’usine, pour surfer dès le premier jour sans réglage compliqué.' },
    { title: 'Rangement planches', text: 'Parmi les volumes de rangement planches les plus généreux de la catégorie, avec racks à serrage de série.' },
    { title: 'Confort moderne', text: 'Sellerie plissée, éclairage RGB, entrée sans clé et audio SoundStage de série.' },
    { title: 'L’accès à MasterCraft', text: 'Toute la qualité et la technologie MasterCraft dans une série plus accessible.' },
  ],
  prostar: [
    { title: 'Le sillage le plus plat', text: 'La coque du ProStar produit le sillage le plus plat du marché avec un minimum d’éclaboussures, idéal pour le slalom.' },
    { title: 'Suivi laser-précis', text: 'Quatre ailettes et des rails de coque propriétaires offrent un suivi d’une précision chirurgicale.' },
    { title: 'Confort premium', text: 'Construction artisanale, mousses triple densité et sièges modulables pour un confort haut de gamme.' },
    { title: 'Héritage du ski', text: 'Encore et toujours le leader : le ProStar détient des records du monde et reste la référence du ski nautique.' },
  ],
};

const USAGE: Record<Series, string> = {
  xstar: 'Le {short} est le fleuron wakesurf et wakeboard de MasterCraft, taillé pour les riders exigeants comme pour les sorties haut de gamme en famille.',
  x: 'Le {short} est un wakeboat polyvalent et précis, parfait pour le wakesurf, le wakeboard et les journées en groupe.',
  xt: 'Le {short} est un surf-boat polyvalent, idéal pour le wakesurf, le wakeboard et les loisirs nautiques en famille.',
  nxt: 'Le {short} est le wakeboat d’accès de MasterCraft : du wakesurf et du wakeboard de qualité, simples à prendre en main.',
  prostar: 'Le ProStar est un bateau de ski nautique de compétition, conçu pour la précision du slalom et les figures, du débutant au champion.',
};

interface MCInput {
  slug: string;
  short: string;
  series: Series;
  length: string;
  beam: string;
  draft: string;
  seats: string;
  ballast?: string;
  fuel: string;
  weight: string;
  engines: Motorization[];
  images: string[];
  intro: string;
  tagline: string;
  features: string[];
}

const M = (s: string) => `https://www.mastercraft.com/media/${s}`;

const INPUTS: MCInput[] = [
  {
    slug: 'xstar-23', short: 'XStar 23', series: 'xstar',
    length: '23\' 7" / 7,19 m', beam: '102" / 2,59 m', draft: '31,5" / 0,80 m',
    seats: '16 personnes', ballast: '3 775 lbs / 1 712 kg', fuel: '86 gal / 325 L', weight: '7 600 lbs / 3 447 kg',
    engines: [ENGINE.sc630, ENGINE.gdi440, ENGINE.ho380, ENGINE.mpi373],
    images: [M('toqfdw11/xstar23_26_front_hero-2-1.webp')],
    intro: 'Référence du wakesurf depuis près de 30 ans, le XStar 23 réunit la proue pickle-fork iconique, des vagues de classe mondiale et des finitions premium. Une évolution 2026 plus raffinée, toujours animée par le moteur le plus puissant du marché.',
    tagline: 'Le fleuron wakesurf de MasterCraft : vagues de classe mondiale et luxe absolu, à essayer sur le lac d’Annecy.',
    features: [
      'Tour Z100 motorisée et repliable, 7 coloris thermolaqués',
      'Système de vague SurfStar et ballast de série de 3 775 lbs',
      'Stern thruster (propulseur de poupe) pour une maniabilité totale',
      'Système de visibilité 4 caméras et double écran tactile au poste de pilotage',
      'Proue pickle-fork signature, recharge sans fil et MasterCraft MyDrive',
    ],
  },
  {
    slug: 'xstar-25', short: 'XStar 25', series: 'xstar',
    length: '25\' 7" / 7,80 m', beam: '102" / 2,59 m', draft: '32" / 0,81 m',
    seats: '18 personnes', ballast: '3 975 lbs / 1 803 kg', fuel: '86 gal / 325 L', weight: '8 400 lbs / 3 810 kg',
    engines: [ENGINE.sc630, ENGINE.gdi440, ENGINE.ho380, ENGINE.mpi373],
    images: [M('245lnyme/xstar25_26_front_hero.webp'), M('toaj4ntn/xstar25_26_profile_hero.webp')],
    intro: 'La version XL du fleuron : le XStar 25 offre plus de place (18 personnes), une coque affinée, un ballast optimisé et un stern thruster pour une maniabilité totale. La même performance qui a remporté des titres mondiaux, en plus spacieux.',
    tagline: 'Le wakeboat haut de gamme XL : 18 places, stern thruster et vagues de compétition, à essayer sur le lac d’Annecy.',
    features: [
      'Tour Z100 motorisée avec racks de surf XL, 7 coloris',
      'Ballast haute capacité (jusqu’à 4 050 lbs) pour des vagues pro',
      'Stern thruster et système de visibilité 4 caméras',
      'Audio premium : 10 HP intérieurs, 6 caissons, 8 HP de tour, 7 zones',
      'Cockpit XL 18 places avec glacière et tiroir de rangement intégrés',
    ],
  },
  {
    slug: 'x24', short: 'X24', series: 'x',
    length: '24\' 3" / 7,39 m', beam: '102" / 2,59 m', draft: '32" / 0,81 m',
    seats: '17 personnes', ballast: '4 050 lbs / 1 837 kg', fuel: '86 gal / 326 L', weight: '7 200 lbs / 3 266 kg',
    engines: [ENGINE.gdi440, ENGINE.sc630],
    images: [M('uszo0uud/x24_26_quarter_dab_hero-3.webp'), M('nf3bfcfw/x24_26_profile.webp'), M('wyhbvprg/x24_26_top.webp')],
    intro: 'Le plus grand de la série X, entièrement redessiné pour 2026 : espace maximal, ballast renforcé pour des vagues puissantes et de doubles compartiments arrière. Precision With Presence à son sommet.',
    tagline: 'Le X le plus grand et le mieux doté : espace, ballast renforcé et vagues puissantes, à essayer sur le lac d’Annecy.',
    features: [
      'Coque entièrement repensée pour 2026',
      'Système SurfStar pour une vague plus grande et plus propre',
      'Doubles compartiments arrière (jusqu’à 10 planches)',
      'Tour Z9 motorisée de série',
      'Audio MasterCraft SoundStage signé Meridian, multizone',
    ],
  },
  {
    slug: 'x23', short: 'X23', series: 'x',
    length: '22\' 11" / 6,99 m', beam: '102" / 2,59 m', draft: '31,7" / 0,80 m',
    seats: '16 personnes', ballast: '3 800 lbs / 1 724 kg', fuel: '76 gal / 288 L', weight: '7 100 lbs / 3 221 kg',
    engines: [ENGINE.gdi440, ENGINE.sc630],
    images: [M('l42bw2pd/x23-quarter.webp')],
    intro: 'Le X au volume intérieur accru : assises plus profondes et plus enveloppantes, rangements généreux et la précision de comportement de la série X. Le juste équilibre entre espace et agilité.',
    tagline: 'Le X équilibré : volume intérieur, confort et précision de la série X, à essayer sur le lac d’Annecy.',
    features: [
      'Tour Z9 motorisée, 7 coloris',
      'Tableau arrière iconique avec banquettes surdimensionnées et rangement planches intégré',
      'Double écran numérique et MasterCraft MyDrive',
      'Recharge sans fil et démarrage sans clé',
      'Système 4 caméras en option',
    ],
  },
  {
    slug: 'x22', short: 'X22', series: 'x',
    length: '22\' 3" / 6,78 m', beam: '102" / 2,59 m', draft: '32" / 0,81 m',
    seats: '15 personnes', ballast: '3 800 lbs / 1 724 kg', fuel: '76 gal / 288 L', weight: '6 950 lbs / 3 152 kg',
    engines: [ENGINE.gdi440, ENGINE.sc630],
    images: [M('ewaltwrw/my26_x22_hero_front.webp'), M('jlmj55nd/my26_x22_hero_profile.webp'), M('xphguh4f/my26_x22_hero_top.webp')],
    intro: 'Précision et présence dans un format compact et réactif. Coque profilée à carreaux sculptés, le X22 est idéal pour les riders qui cherchent un comportement vif et des vagues franches via SurfStar.',
    tagline: 'Le X compact et réactif : maniabilité et vagues franches, à essayer sur le lac d’Annecy.',
    features: [
      'Tour Z9 motorisée repliable',
      'Surface de course redessinée associée au système SurfStar',
      'Doubles compartiments arrière (jusqu’à 4 planches en housses matelassées)',
      'Audio SoundStage et écrans X Dash',
      'Système 4 caméras en option',
    ],
  },
  {
    slug: 'xt24', short: 'XT24', series: 'xt',
    length: '24\' / 7,32 m', beam: '102" / 2,59 m', draft: '30" / 0,76 m',
    seats: '17 personnes', ballast: '3 700 lbs / 1 678 kg', fuel: '92 gal / 348 L', weight: '5 694 lbs / 2 583 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    images: [M('aani2yuw/xt24_26_quarter.webp'), M('exukm11d/xt24_26_profile.webp')],
    intro: 'Le fleuron de la série XT : capacité et façonnage de vague maximaux, équipements premium et toute la polyvalence XT. Le surf-boat familial le plus spacieux de la gamme.',
    tagline: 'Le XT le plus grand : capacité et vagues maximales pour toute la famille, à essayer sur le lac d’Annecy.',
    features: [
      'Le plus grand de la série XT (17 places, 109 ft³ de rangement)',
      'Poste de pilotage redessiné, écran tactile 12 pouces et entrée sans clé (2026)',
      'Système de vague SurfStar',
      'Audio SoundStage multizone de série',
      '7 coloris thermolaqués et nombreux packs d’options',
    ],
  },
  {
    slug: 'xt23', short: 'XT23', series: 'xt',
    length: '23\' 4" / 7,11 m', beam: '102" / 2,59 m', draft: '30" / 0,76 m',
    seats: '16 personnes', ballast: '3 450 lbs / 1 565 kg', fuel: '79 gal / 299 L', weight: '5 250 lbs / 2 381 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    images: [M('f0cpevkn/xt23_26_quarter.webp'), M('itxb2a0s/xt23_26_profile-1.webp')],
    intro: 'Plateforme étendue et équipements premium pour les passionnés : le XT23 combine espace, confort et vagues de classe mondiale dans un format polyvalent.',
    tagline: 'Le XT spacieux et premium : confort et vagues de classe mondiale, à essayer sur le lac d’Annecy.',
    features: [
      'Système SurfStar pour des vagues personnalisables',
      'Audio MasterCraft SoundStage',
      'Écran tactile 12 pouces avec MyDrive',
      '16 places et 108 ft³ de rangement',
      'Design moderne au comportement orienté vague',
    ],
  },
  {
    slug: 'xt22', short: 'XT22', series: 'xt',
    length: '22\' 4" / 6,81 m', beam: '102" / 2,59 m', draft: '29" / 0,74 m',
    seats: '16 personnes', ballast: '3 500 lbs / 1 588 kg', fuel: '79 gal / 299 L', weight: '5 485 lbs / 2 488 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    images: [M('cbkh4kis/xt22_26_quarter.webp'), M('l3titwoh/xt22_26_profile.webp')],
    intro: 'Le XT22 équilibre performance et capacité familiale : un surf-boat polyvalent, facile à vivre, avec le système SurfStar et le moteur Ilmor 5.3L GDI HO de 380 ch.',
    tagline: 'Le XT équilibré : performance et capacité familiale, à essayer sur le lac d’Annecy.',
    features: [
      'Système SurfStar à ballast personnalisable',
      'Audio SoundStage de série',
      '16 places avec banquette arrière et passage de tableau',
      'Tours personnalisables (coloris thermolaqués) et racks à serrage',
      'Écran tactile 12 pouces',
    ],
  },
  {
    slug: 'xt22t', short: 'XT22T', series: 'xt',
    length: '21\' 10" / 6,65 m', beam: '102" / 2,59 m', draft: '30" / 0,76 m',
    seats: '14 personnes', ballast: '3 020 lbs / 1 370 kg', fuel: '79 gal / 299 L', weight: '5 275 lbs / 2 393 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    images: [M('ge4hbsqm/xt22t_26_quarter.webp'), M('wnranrwc/xt22t_26_profile.webp')],
    intro: 'La variante à proue pickle-fork de la série XT : une esthétique moderne et distinctive, plus d’espace à la proue et toute la polyvalence du XT.',
    tagline: 'Le XT à proue pickle-fork : style moderne et proue spacieuse, à essayer sur le lac d’Annecy.',
    features: [
      'Proue pickle-fork au style moderne',
      'Système SurfStar pour des vagues nettes et constantes',
      'Audio SoundStage accordé sur mesure',
      'Écran tactile 12 pouces et siège de pilotage à élévation hydraulique',
      'Stern thruster et DockStar disponibles',
    ],
  },
  {
    slug: 'xt20', short: 'XT20', series: 'xt',
    length: '20\' / 6,10 m', beam: '100" / 2,54 m', draft: '30" / 0,76 m',
    seats: '12 personnes', ballast: '2 950 lbs / 1 338 kg', fuel: '45 gal / 170 L', weight: '5 100 lbs / 2 313 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    images: [M('4zcjksyz/xt20_26_quarter.webp'), M('3r1kskuc/xt20_26_profile.webp')],
    intro: 'Le surf-boat compact et polyvalent de la série XT : maniable et accessible, parfait pour débuter ou naviguer sur des plans d’eau plus petits, sans renoncer aux vagues SurfStar.',
    tagline: 'Le XT compact et maniable : idéal pour débuter, à essayer sur le lac d’Annecy.',
    features: [
      'Format compact, facile à tracter et à stocker',
      'Système de vague SurfStar',
      'Écran tactile 12 pouces, MyDrive, recharge sans fil et démarrage sans clé',
      'Audio MasterCraft SoundStage de série',
      '93 ft³ de rangement, banquette arrière avec dossiers',
    ],
  },
  {
    slug: 'nxt24', short: 'NXT24', series: 'nxt',
    length: '24\' / 7,32 m', beam: '102" / 2,59 m', draft: '29" / 0,74 m',
    seats: '16 personnes', ballast: '3 300 lbs / 1 497 kg', fuel: '65 gal / 246 L', weight: '5 000 lbs / 2 268 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    images: [M('ljhdresw/nxt24_26_hero_quarter.webp'), M('oujliii4/nxt24_26_hero_profile.webp')],
    intro: 'Le fleuron de la série NXT : capacité maximale et performances premium, avec l’option du moteur 6.2L GDI. Toute la technologie MasterCraft dans une série accessible.',
    tagline: 'Le NXT le plus grand : capacité maximale et option 6.2L, à essayer sur le lac d’Annecy.',
    features: [
      'Le plus grand de la série NXT (16 places, 103 ft³ de rangement)',
      'Sellerie plissée premium, tours thermolaquées, éclairage RGB, entrée sans clé',
      'Système de vague SurfStar de série',
      'Audio MasterCraft SoundStage à son directionnel',
      'Recharge sans fil au poste de pilotage',
    ],
  },
  {
    slug: 'nxt23', short: 'NXT23', series: 'nxt',
    length: '23\' / 7,01 m', beam: '100" / 2,54 m', draft: '29" / 0,74 m',
    seats: '16 personnes', ballast: '3 130 lbs / 1 420 kg', fuel: '65 gal / 246 L', weight: '5 030 lbs / 2 282 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    images: [M('zxlbs5w4/nxt23_26_hero_quarter.webp'), M('yq4pmvna/nxt23_26_hero_profile.webp')],
    intro: 'Capacité étendue et ballast accru pour des vagues franches à tous les niveaux. Le NXT23 peut recevoir le moteur 6.2L GDI de 440 ch pour plus de punch.',
    tagline: 'Le NXT polyvalent : capacité étendue et option 6.2L, à essayer sur le lac d’Annecy.',
    features: [
      'Système SurfStar de série',
      'Éclairage RGB, entrée sans clé et recharge sans fil (poste et cockpit)',
      'Audio MasterCraft SoundStage à son directionnel',
      'Sellerie premium et 99 ft³ de rangement',
      'Dash NXT avec écran 7 pouces',
    ],
  },
  {
    slug: 'nxt22', short: 'NXT22', series: 'nxt',
    length: '22\' / 6,71 m', beam: '98" / 2,49 m', draft: '28" / 0,71 m',
    seats: '14 personnes', ballast: '3 000 lbs / 1 361 kg', fuel: '49 gal / 186 L', weight: '4 760 lbs / 2 159 kg',
    engines: [ENGINE.ho380],
    images: [M('jfwlf3oq/nxt22_26_hero_quarter.webp'), M('13gnrfhz/nxt22_26_hero_profile.webp')],
    intro: 'Le NXT22 équilibre performance et confort avec un ballast renforcé : un wakeboat accessible et polyvalent, parfait pour la famille et les premières sessions de surf.',
    tagline: 'Le NXT équilibré : ballast renforcé et polyvalence, à essayer sur le lac d’Annecy.',
    features: [
      'Système SurfStar et ballast généreux pour des vagues constantes',
      'Rangement planches parmi les plus vastes de sa catégorie',
      'Éclairage RGB, entrée sans clé et audio SoundStage de série',
      'Sellerie plissée et tours thermolaquées',
    ],
  },
  {
    slug: 'nxt20', short: 'NXT20', series: 'nxt',
    length: '20\' / 6,10 m', beam: '96" / 2,44 m', draft: '27" / 0,69 m',
    seats: '11 personnes', ballast: '1 770 lbs / 803 kg', fuel: '47 gal / 178 L', weight: '3 965 lbs / 1 799 kg',
    engines: [ENGINE.ho380],
    images: [M('gcuhlmtq/nxt20_26_hero_quarter.webp'), M('fsvbnexi/nxt20_26_hero_profile-1.webp')],
    intro: 'L’entrée dans l’univers MasterCraft dans un format 20 pieds maniable : le NXT20 rend le wakesurf et le wakeboard accessibles, avec la qualité de construction de la marque.',
    tagline: 'Le NXT compact : l’accès à MasterCraft en 20 pieds, à essayer sur le lac d’Annecy.',
    features: [
      'Profil compact, facile à tracter, stocker et manœuvrer',
      'Système de vague SurfStar',
      'Démarrage sans clé, dash NXT et audio SoundStage',
      'Rangement planches généreux, racks à serrage de série',
      'Recharge sans fil au poste et au cockpit (option)',
    ],
  },
  {
    slug: 'prostar', short: 'ProStar', series: 'prostar',
    length: '20\' / 6,10 m', beam: '96" / 2,43 m', draft: '22" / 0,56 m',
    seats: '7 personnes', fuel: '30 gal / 113 L', weight: '3 300 lbs / 1 497 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440, ENGINE.mpi373, ENGINE.sc630],
    images: [M('4ihpe2xu/my25-prostar-quarter.webp'), M('xm5dh5kz/my25-prostar-profile-2.webp'), M('gkybn5q3/ps-rear.webp'), M('1qflh1tv/my25-prostar-top.webp')],
    intro: 'La référence absolue du ski nautique : le ProStar produit le sillage le plus plat du marché et un suivi laser-précis grâce à ses quatre ailettes. Pensé pour les skieurs d’aujourd’hui et de demain.',
    tagline: 'Le bateau de ski nautique de référence : sillage le plus plat du marché, à essayer sur le lac d’Annecy.',
    features: [
      'Sillage le plus propre et constant du marché, éclaboussures minimales',
      'Système quatre ailettes propriétaire pour un suivi laser-précis',
      'Écran tactile 10 pouces avec logiciel trois disciplines',
      'Capot moteur redessiné pour le flux d’air et la réduction du bruit',
      'Assises modulables, siège de juge réversible et sellerie CoolFeel en option',
    ],
  },
];

const SERIES_NAME: Record<Series, string> = {
  xstar: 'Série XStar', x: 'Série X', xt: 'Série XT', nxt: 'Série NXT', prostar: 'ProStar',
};

function buildFaqs(short: string, series: Series): ModelFAQ[] {
  return [
    {
      q: `Où acheter un MasterCraft ${short} en Haute-Savoie ?`,
      a: `Chez Motor Boat 74, près du lac d’Annecy : conseil personnalisé, essai sur l’eau, financement, reprise, entretien et hivernage de votre ${short}.`,
    },
    {
      q: `Quel est le prix du MasterCraft ${short} ?`,
      a: `Le tarif d’un ${short} dépend de la motorisation Ilmor et des options choisies. Motor Boat 74 vous établit un devis personnalisé et gratuit, sans engagement.`,
    },
    {
      q: `Pour quel usage le ${short} est-il fait ?`,
      a: USAGE[series].replace('{short}', short),
    },
    {
      q: `Peut-on essayer le ${short} sur le lac d’Annecy ?`,
      a: `Oui. Motor Boat 74 organise des essais sur l’eau pour vous aider à choisir le ${short} et le régler selon votre pratique.`,
    },
  ];
}

function build(i: MCInput): NautiqueModel {
  const primary = i.engines[0];
  return {
    slug: i.slug,
    name: `MasterCraft ${i.short}`,
    short: i.short,
    fullName: `MasterCraft ${i.short}`,
    gamme: SERIES_NAME[i.series],
    year: '2026',
    metaTitle: `MasterCraft ${i.short} 2026 - Fiche technique et prix | Motor Boat 74`,
    metaDescription: `Découvrez le MasterCraft ${i.short} 2026 chez Motor Boat 74, près du lac d’Annecy. ${i.tagline}`,
    intro: [i.intro],
    tagline: i.tagline,
    hero: i.images[0],
    gallery: i.images,
    specs: [
      {
        group: 'Dimensions',
        items: [
          { label: 'Longueur totale', value: i.length },
          { label: 'Largeur (bau)', value: i.beam },
          { label: 'Tirant d’eau', value: i.draft },
        ],
      },
      {
        group: 'Capacité',
        items: [
          { label: 'Capacité maximale', value: i.seats },
          ...(i.ballast ? [{ label: 'Ballast max', value: i.ballast }] : []),
          { label: 'Poids sec', value: i.weight },
          { label: 'Capacité de carburant', value: i.fuel },
        ],
      },
      {
        group: 'Performance',
        items: [
          { label: 'Moteur standard', value: primary.name },
          { label: 'Puissance', value: primary.power },
          { label: 'Couple', value: primary.torque },
          ...(i.engines.length > 1 ? [{ label: 'Autres motorisations', value: i.engines.slice(1).map((e) => `${e.name} (${e.power})`).join(', ') }] : []),
        ],
      },
    ],
    highlights: HIGHLIGHTS[i.series],
    features: i.features,
    motorizations: i.engines,
    faqs: buildFaqs(i.short, i.series),
  };
}

export const MASTERCRAFT_ORDER: string[] = INPUTS.map((i) => i.slug);

export const mastercraftModels: Record<string, NautiqueModel> = Object.fromEntries(
  INPUTS.map((i) => [i.slug, build(i)]),
);
