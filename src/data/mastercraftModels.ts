import { NautiqueModel, Motorization, ModelFAQ } from './nautiqueModels';

/**
 * Catalogue MasterCraft 2026 — données reproduites depuis mastercraft.com
 * (fiches modèles : longueur, bau, tirant d'eau, capacité, ballast, carburant,
 * poids sec, motorisations Ilmor, équipements et points forts de chaque modèle).
 * Images d'ambiance hotlinkées depuis le CDN MasterCraft (www.mastercraft.com/media/...) :
 * vague/action, extérieur, intérieur et équipement, une par point fort.
 */

type Series = 'xstar' | 'x' | 'xt' | 'nxt' | 'prostar';

const ENGINE: Record<string, Motorization> = {
  sc630: { name: 'Ilmor 6.2L Supercharged', fuel: 'Essence', power: '630 ch', torque: '665 lb-ft', ratio: '' },
  gdi440: { name: 'Ilmor 6.2L GDI', fuel: 'Essence', power: '440 ch', torque: '479 lb-ft', ratio: '' },
  ho380: { name: 'Ilmor 5.3L GDI HO', fuel: 'Essence', power: '380 ch', torque: '407 lb-ft', ratio: '' },
  mpi373: { name: 'Ilmor 6.0L MPI', fuel: 'Essence', power: '373 ch', torque: '407 lb-ft', ratio: '' },
};

const USAGE: Record<Series, string> = {
  xstar: 'Le {short} est le fleuron wakesurf et wakeboard de MasterCraft, taillé pour les riders exigeants comme pour les sorties haut de gamme en famille.',
  x: 'Le {short} est un wakeboat polyvalent et précis, parfait pour le wakesurf, le wakeboard et les journées en groupe.',
  xt: 'Le {short} est un surf-boat polyvalent, idéal pour le wakesurf, le wakeboard et les loisirs nautiques en famille.',
  nxt: 'Le {short} est le wakeboat d’accès de MasterCraft : du wakesurf et du wakeboard de qualité, simples à prendre en main.',
  prostar: 'Le ProStar est un bateau de ski nautique de compétition, conçu pour la précision du slalom et les figures, du débutant au champion.',
};

const M = (s: string) => `https://www.mastercraft.com/media/${s}`;

interface HL { title: string; text: string; img: string; }

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
  intro: string;
  tagline: string;
  /** Équipements inclus (liste 2 colonnes). */
  features: string[];
  /** 4 points forts uniques, chacun avec son image d'ambiance. */
  hl: HL[];
  /** Galerie (1re image = photo d'action servant de héro) : action, extérieur, intérieur, équipement. */
  gallery: string[];
}

const INPUTS: MCInput[] = [
  {
    slug: 'xstar-23', short: 'XStar 23', series: 'xstar',
    length: '23\' 7" / 7,19 m', beam: '102" / 2,59 m', draft: '31,5" / 0,80 m',
    seats: '16 personnes', ballast: '3 775 lbs / 1 712 kg', fuel: '86 gal / 325 L', weight: '7 600 lbs / 3 447 kg',
    engines: [ENGINE.sc630, ENGINE.gdi440, ENGINE.ho380, ENGINE.mpi373],
    intro: 'Référence du wakesurf depuis près de 30 ans, le XStar 23 réunit la proue pickle-fork iconique, des vagues de classe mondiale et des finitions premium. Une évolution 2026 plus raffinée, toujours animée par le moteur le plus puissant du marché.',
    tagline: 'Wakeboat haut de gamme de 7,19 m pour 16 personnes, animé par le moteur le plus puissant du marché (Ilmor 630 ch) : une vague de wakesurf de classe mondiale, réglable au rider près. Conseil, essai et reprise chez Motor Boat 74, au bord du lac d’Annecy.',
    features: [
      'Tour Z100 motorisée et repliable, 7 coloris thermolaqués',
      'Système de vague SurfStar et ballast de série de 3 775 lbs',
      'Stern thruster (propulseur de poupe) pour une maniabilité totale',
      'Système de visibilité 4 caméras et double écran tactile au poste de pilotage',
      'Proue pickle-fork signature, recharge sans fil et MasterCraft MyDrive',
    ],
    hl: [
      { title: 'Une vague de wakesurf de classe mondiale', text: 'Le système SurfStar et un ballast de série de 3 775 lbs (1 712 kg) génèrent une vague longue, creuse et propre, réglable bâbord ou tribord en une touche. Profils de foil et presets mémorisés adaptent la pousse au gabarit de chaque rider, le tout animé par l’Ilmor 6.2L suralimenté de 630 ch, moteur de towboat le plus puissant du marché.', img: M('kvdnbx1v/mb-wake.jpg') },
      { title: '16 places et proue pickle-fork signature', text: 'Sur 7,19 m, le XStar 23 accueille 16 personnes. Sa proue pickle-fork ouvre un carré avant profond aux assises enveloppantes et accoudoirs ergonomiques, avec de vastes rangements sous coussins pour planches et matériel.', img: M('1ffnh1pj/experience.webp') },
      { title: 'Poste connecté et vision 4 caméras', text: 'Double écran tactile, MasterCraft MyDrive pour piloter vague, vitesse et ballast, recharge sans fil et système de visibilité à 4 caméras facilitent la conduite comme les manœuvres en eau fréquentée, à l’image du lac d’Annecy.', img: M('dfjp4uqp/mb-helm.jpg') },
      { title: 'Tour Z100 motorisée et stern thruster', text: 'La tour Z100 électrique se replie d’un bouton (7 coloris thermolaqués) et porte un audio premium multizone. Le stern thruster rend l’accostage et les demi-tours d’une simplicité totale, jusqu’à pivoter sur place.', img: M('gqtfobxb/mb-tower.jpg') },
    ],
    gallery: [M('kvdnbx1v/mb-wake.jpg'), M('1ffnh1pj/experience.webp'), M('dfjp4uqp/mb-helm.jpg'), M('gqtfobxb/mb-tower.jpg'), M('l0hoybog/audio.webp')],
  },
  {
    slug: 'xstar-25', short: 'XStar 25', series: 'xstar',
    length: '25\' 7" / 7,80 m', beam: '102" / 2,59 m', draft: '32" / 0,81 m',
    seats: '18 personnes', ballast: '3 975 lbs / 1 803 kg', fuel: '86 gal / 325 L', weight: '8 400 lbs / 3 810 kg',
    engines: [ENGINE.sc630, ENGINE.gdi440, ENGINE.ho380, ENGINE.mpi373],
    intro: 'La version XL du fleuron : le XStar 25 offre plus de place (18 personnes), une coque affinée, un ballast optimisé et un stern thruster pour une maniabilité totale. La même performance qui a remporté des titres mondiaux, en plus spacieux.',
    tagline: 'Le wakeboat XL de la gamme : 7,80 m, 18 places et stern thruster pour une maniabilité totale, avec des vagues de compétition signées SurfStar. À découvrir et essayer chez Motor Boat 74, près du lac d’Annecy.',
    features: [
      'Tour Z100 motorisée avec racks de surf XL, 7 coloris',
      'Ballast haute capacité (jusqu’à 4 050 lbs) pour des vagues pro',
      'Stern thruster et système de visibilité 4 caméras',
      'Audio premium : 10 HP intérieurs, 6 caissons, 8 HP de tour, 7 zones',
      'Cockpit XL 18 places avec glacière et tiroir de rangement intégrés',
    ],
    hl: [
      { title: 'Vague de compétition, 3 975 lbs de ballast', text: 'Plus long de 60 cm que le 23, le XStar 25 conserve la vague de classe mondiale SurfStar avec 3 975 lbs (1 803 kg) de ballast et le moteur Ilmor 6.2L suralimenté de 630 ch. Une vague longue et puissante, ajustable au rider près par presets et profils de foil.', img: M('q10fv4v3/mb-surf.jpg') },
      { title: '18 places : le wakeboat XL', text: 'Avec 7,80 m et 18 personnes à bord, c’est le plus spacieux des XStar : cockpit ouvert, glacière et tiroir de rangement intégrés, pensé pour les grandes sorties en famille ou entre amis.', img: M('1ffnh1pj/experience.webp') },
      { title: 'Technologie et stern thruster', text: 'Double écran, MyDrive, recharge sans fil et vision 4 caméras équipent le poste. Le stern thruster offre une maniabilité totale malgré la taille, précieux à quai et dans les zones de mouillage.', img: M('r2yhcx52/mb-helm.jpg') },
      { title: 'Tour Z100 et audio 7 zones', text: 'Tour Z100 motorisée avec racks de surf XL (7 coloris) et système audio premium à 7 zones (10 HP intérieurs, 6 caissons, 8 HP de tour) pour une ambiance enveloppante à l’arrêt comme en surf.', img: M('jnkmgh1i/mb-tower.jpg') },
    ],
    gallery: [M('q10fv4v3/mb-surf.jpg'), M('1ffnh1pj/experience.webp'), M('r2yhcx52/mb-helm.jpg'), M('jnkmgh1i/mb-tower.jpg'), M('l0hoybog/audio.webp')],
  },
  {
    slug: 'x24', short: 'X24', series: 'x',
    length: '24\' 3" / 7,39 m', beam: '102" / 2,59 m', draft: '32" / 0,81 m',
    seats: '17 personnes', ballast: '4 050 lbs / 1 837 kg', fuel: '86 gal / 326 L', weight: '7 200 lbs / 3 266 kg',
    engines: [ENGINE.gdi440, ENGINE.sc630],
    intro: 'Le plus grand de la série X, entièrement redessiné pour 2026 : espace maximal, ballast renforcé pour des vagues puissantes et de doubles compartiments arrière. Precision With Presence à son sommet.',
    tagline: 'Le plus grand des X (7,39 m, 17 places) : 4 050 lbs de ballast et une coque 2026 repensée pour la vague la plus puissante de la série. Conseil, essai et reprise chez Motor Boat 74, au bord du lac d’Annecy.',
    features: [
      'Coque entièrement repensée pour 2026',
      'Système SurfStar pour une vague plus grande et plus propre',
      'Doubles compartiments arrière (jusqu’à 10 planches)',
      'Tour Z9 motorisée de série',
      'Audio MasterCraft SoundStage signé Meridian, multizone',
    ],
    hl: [
      { title: 'Coque repensée et 4 050 lbs de ballast', text: 'Entièrement redessiné pour 2026, le X24 est le plus grand de la série X (7,39 m) : avec 4 050 lbs (1 837 kg) de ballast et SurfStar, il sort la vague la plus grande et la plus propre de la gamme X, animé par l’Ilmor 6.2L GDI de 440 ch (option 630 ch suralimenté).', img: M('1ffnh1pj/experience.webp') },
      { title: '17 places et doubles compartiments', text: 'Espace maximal et 17 personnes à bord ; les doubles compartiments arrière avalent jusqu’à 10 planches en housses matelassées, pour partir équipé sans encombrer le cockpit.', img: M('bpwhydey/mb-comfort.jpg') },
      { title: 'Le X Helm et vision 4 caméras', text: 'Double écran numérique, MasterCraft MyDrive et système 4 caméras (option) réunissent toutes les fonctions du bateau et de la vague sous la main, pour une conduite intuitive et sûre.', img: M('yjihkkze/mb-the-x-helm_.webp') },
      { title: 'Tour Z9 et audio Meridian', text: 'Tour Z9 motorisée de série (repliable d’un bouton) et système audio SoundStage signé Meridian : un son plus puissant, plus net et réparti par zones.', img: M('1ldn00uo/mb-z9-tower.webp') },
    ],
    gallery: [M('1ffnh1pj/experience.webp'), M('bpwhydey/mb-comfort.jpg'), M('yjihkkze/mb-the-x-helm_.webp'), M('1ldn00uo/mb-z9-tower.webp'), M('gujfi152/mb-dual-rear-compartments_.webp'), M('hdwpbrqc/mb-sound-that-stands-out_.webp')],
  },
  {
    slug: 'x23', short: 'X23', series: 'x',
    length: '22\' 11" / 6,99 m', beam: '102" / 2,59 m', draft: '31,7" / 0,80 m',
    seats: '16 personnes', ballast: '3 800 lbs / 1 724 kg', fuel: '76 gal / 288 L', weight: '7 100 lbs / 3 221 kg',
    engines: [ENGINE.gdi440, ENGINE.sc630],
    intro: 'Le X au volume intérieur accru : assises plus profondes et plus enveloppantes, rangements généreux et la précision de comportement de la série X. Le juste équilibre entre espace et agilité.',
    tagline: 'Wakeboat polyvalent de 6,99 m pour 16 personnes : le X au volume intérieur accru, aussi précis derrière le bateau que confortable à bord. Essai sur le lac d’Annecy chez Motor Boat 74.',
    features: [
      'Tour Z9 motorisée, 7 coloris',
      'Tableau arrière iconique avec banquettes surdimensionnées et rangement planches intégré',
      'Double écran numérique et MasterCraft MyDrive',
      'Recharge sans fil et démarrage sans clé',
      'Système 4 caméras en option',
    ],
    hl: [
      { title: 'Performance derrière le bateau', text: 'Surface de course redessinée, système SurfStar et 3 800 lbs (1 724 kg) de ballast : le X23 façonne des vagues et des sillages personnalisables, propulsé par l’Ilmor 6.2L GDI de 440 ch (option 630 ch suralimenté).', img: M('1ffnh1pj/experience.webp') },
      { title: 'Volume intérieur accru, 16 places', text: 'Sur 6,99 m, le X23 mise sur des assises plus profondes et enveloppantes et un tableau arrière iconique aux banquettes surdimensionnées avec rangement planches intégré : 16 places et un confort de référence.', img: M('aqwmjqvv/mb-comfort-3.webp') },
      { title: 'Le X Helm numérique', text: 'Double écran, MyDrive, recharge sans fil et démarrage sans clé centralisent la conduite ; le système 4 caméras en option sécurise manœuvres et accostage.', img: M('nbfpn1ex/mb-the-x-helm.webp') },
      { title: 'Tour Z9 et compartiments planches', text: 'Tour Z9 motorisée (7 coloris) et doubles compartiments arrière transportent le matériel à l’abri, complétés par l’audio SoundStage accordé sur mesure.', img: M('zb4j3f4j/m-bz9-tower.webp') },
    ],
    gallery: [M('1ffnh1pj/experience.webp'), M('aqwmjqvv/mb-comfort-3.webp'), M('nbfpn1ex/mb-the-x-helm.webp'), M('zb4j3f4j/m-bz9-tower.webp'), M('o1wad2ji/mb-dual-rear-compartments.webp'), M('hd3pjopr/mb-sound-that-stands-out.webp')],
  },
  {
    slug: 'x22', short: 'X22', series: 'x',
    length: '22\' 3" / 6,78 m', beam: '102" / 2,59 m', draft: '32" / 0,81 m',
    seats: '15 personnes', ballast: '3 800 lbs / 1 724 kg', fuel: '76 gal / 288 L', weight: '6 950 lbs / 3 152 kg',
    engines: [ENGINE.gdi440, ENGINE.sc630],
    intro: 'Précision et présence dans un format compact et réactif. Coque profilée à carreaux sculptés, le X22 est idéal pour les riders qui cherchent un comportement vif et des vagues franches via SurfStar.',
    tagline: 'Le X compact et réactif (6,78 m, 15 places) : vague franche via SurfStar et comportement vif, idéal pour rider avec précision. À essayer chez Motor Boat 74, concessionnaire près du lac d’Annecy.',
    features: [
      'Tour Z9 motorisée repliable',
      'Surface de course redessinée associée au système SurfStar',
      'Doubles compartiments arrière (jusqu’à 4 planches en housses matelassées)',
      'Audio SoundStage et écrans X Dash',
      'Système 4 caméras en option',
    ],
    hl: [
      { title: 'Vague franche dans un format compact', text: 'Coque profilée et SurfStar associés à 3 800 lbs (1 724 kg) de ballast : sur 6,78 m seulement, le X22 délivre une vague de wakesurf franche et un wake de wakeboard tendu, taillés pour un rider qui cherche de la précision. Moteur Ilmor 6.2L GDI de 440 ch (option 630 ch).', img: M('0zrehkiw/mb-built-for-better-waves.jpg') },
      { title: 'Confort sans compromis, 15 places', text: 'Gunwales repoussés, assises profondes et finition de sellerie soignée : le cockpit offre l’espace de la série X dans un bateau agile, avec doubles compartiments arrière pour 4 planches en housses matelassées.', img: M('is0nzfwn/mb-comfort-without-compromise.jpg') },
      { title: 'Le X Helm et vision avancée', text: 'Écrans X Dash, MasterCraft MyDrive et système 4 caméras (option) réunissent toutes les commandes du bateau et de la vague sous la main, pour une conduite intuitive et sûre.', img: M('2f0kc232/mb-the-x-helm.jpg') },
      { title: 'Tour Z9 et audio SoundStage', text: 'La tour Z9 électrique se replie d’un bouton et le système audio SoundStage signé Meridian, accordé sur mesure, place chaque passager dans la meilleure zone d’écoute.', img: M('jbvhkcbv/mb-z9-tower.jpg') },
    ],
    gallery: [M('0zrehkiw/mb-built-for-better-waves.jpg'), M('is0nzfwn/mb-comfort-without-compromise.jpg'), M('2f0kc232/mb-the-x-helm.jpg'), M('jbvhkcbv/mb-z9-tower.jpg'), M('zfajv4lg/mb-dual-rear-compartments.jpg'), M('qrlatp2m/mb-sound-that-stands-out.jpg')],
  },
  {
    slug: 'xt24', short: 'XT24', series: 'xt',
    length: '24\' / 7,32 m', beam: '102" / 2,59 m', draft: '30" / 0,76 m',
    seats: '17 personnes', ballast: '3 700 lbs / 1 678 kg', fuel: '92 gal / 348 L', weight: '5 694 lbs / 2 583 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    intro: 'Le fleuron de la série XT : capacité et façonnage de vague maximaux, équipements premium et toute la polyvalence XT. Le surf-boat familial le plus spacieux de la gamme.',
    tagline: 'Le surf-boat familial le plus spacieux de la série XT : 7,32 m, 17 places et 109 ft³ de rangement pour de longues journées sur l’eau. Conseil et essai chez Motor Boat 74, au bord du lac d’Annecy.',
    features: [
      'Le plus grand de la série XT (17 places, 109 ft³ de rangement)',
      'Poste de pilotage redessiné, écran tactile 12 pouces et entrée sans clé (2026)',
      'Système de vague SurfStar',
      'Audio SoundStage multizone de série',
      '7 coloris thermolaqués et nombreux packs d’options',
    ],
    hl: [
      { title: 'Vagues et capacité maximales', text: 'Fleuron de la série XT (7,32 m), le XT24 pousse le façonnage de vague au maximum avec SurfStar et 3 700 lbs (1 678 kg) de ballast, animé par l’Ilmor 5.3L GDI HO de 380 ch (option 6.2L GDI 440 ch).', img: M('qioj30vg/mb-wakes.jpg') },
      { title: '17 places et 109 ft³ de rangement', text: 'Le plus spacieux des XT : 17 personnes, banquettes généreuses et 109 ft³ (3,1 m³) de rangement pour les grandes sorties familiales sur une journée entière.', img: M('5zjmq3q1/mb-comfort-1.jpg') },
      { title: 'Poste redessiné, entrée sans clé (2026)', text: 'Pour 2026, poste de pilotage redessiné, écran tactile 12 pouces et entrée sans clé : la conduite la plus moderne de la série XT, intuitive dès la première sortie.', img: M('rtmdo3ck/mb-dash.jpg') },
      { title: '7 coloris de tour et audio multizone', text: 'Tour disponible en 7 coloris thermolaqués et système SoundStage multizone de série, avec de nombreux packs d’options pour personnaliser sièges, technologie et performance.', img: M('pcybxiky/mb-towers-1.jpg') },
    ],
    gallery: [M('qioj30vg/mb-wakes.jpg'), M('5zjmq3q1/mb-comfort-1.jpg'), M('rtmdo3ck/mb-dash.jpg'), M('pcybxiky/mb-towers-1.jpg'), M('fd3htkrw/mb-audio-1.jpg')],
  },
  {
    slug: 'xt23', short: 'XT23', series: 'xt',
    length: '23\' 4" / 7,11 m', beam: '102" / 2,59 m', draft: '30" / 0,76 m',
    seats: '16 personnes', ballast: '3 450 lbs / 1 565 kg', fuel: '79 gal / 299 L', weight: '5 250 lbs / 2 381 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    intro: 'Plateforme étendue et équipements premium pour les passionnés : le XT23 combine espace, confort et vagues de classe mondiale dans un format polyvalent.',
    tagline: 'Surf-boat polyvalent de 7,11 m pour 16 personnes : plateforme premium et vagues de classe mondiale, à l’aise du débutant au rider confirmé. Essai sur le lac d’Annecy chez Motor Boat 74.',
    features: [
      'Système SurfStar pour des vagues personnalisables',
      'Audio MasterCraft SoundStage',
      'Écran tactile 12 pouces avec MyDrive',
      '16 places et 108 ft³ de rangement',
      'Design moderne au comportement orienté vague',
    ],
    hl: [
      { title: 'Vague de classe mondiale', text: 'Le XT23 (7,11 m) associe SurfStar et 3 450 lbs (1 565 kg) de ballast pour une vague propre, adaptée du débutant au rider confirmé, avec l’Ilmor 5.3L GDI HO de 380 ch (option 6.2L GDI 440 ch).', img: M('1ffnh1pj/experience.webp') },
      { title: '16 places et 108 ft³ de rangement', text: 'Plateforme étendue, finitions premium et 108 ft³ de rangement : le XT23 reçoit 16 personnes dans un format spacieux et confortable pour la journée.', img: M('pyycicbo/mb-comfort.jpg') },
      { title: 'Dash 12 pouces et MyDrive', text: 'Écran tactile 12 pouces avec MasterCraft MyDrive pour un contrôle simple et immédiat des fonctions du bateau et des réglages de vague.', img: M('0z2pza3o/mb-dash_.jpg') },
      { title: 'Audio SoundStage et tours', text: 'Système MasterCraft SoundStage immersif et tours personnalisables : la signature sonore et esthétique de la série XT.', img: M('xoxnz225/mb-towers.jpg') },
    ],
    gallery: [M('1ffnh1pj/experience.webp'), M('pyycicbo/mb-comfort.jpg'), M('0z2pza3o/mb-dash_.jpg'), M('xoxnz225/mb-towers.jpg'), M('fi0fl2su/mb-audio.jpg')],
  },
  {
    slug: 'xt22', short: 'XT22', series: 'xt',
    length: '22\' 4" / 6,81 m', beam: '102" / 2,59 m', draft: '29" / 0,74 m',
    seats: '16 personnes', ballast: '3 500 lbs / 1 588 kg', fuel: '79 gal / 299 L', weight: '5 485 lbs / 2 488 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    intro: 'Le XT22 équilibre performance et capacité familiale : un surf-boat polyvalent, facile à vivre, avec le système SurfStar et le moteur Ilmor 5.3L GDI HO de 380 ch.',
    tagline: 'Le XT équilibré (6,81 m, 16 places) : SurfStar, passage de tableau et confort familial pour tout faire sur l’eau. À découvrir et essayer chez Motor Boat 74, près du lac d’Annecy.',
    features: [
      'Système SurfStar à ballast personnalisable',
      'Audio SoundStage de série',
      '16 places avec banquette arrière et passage de tableau',
      'Tours personnalisables (coloris thermolaqués) et racks à serrage',
      'Écran tactile 12 pouces',
    ],
    hl: [
      { title: 'Vague réglable, 3 500 lbs de ballast', text: 'SurfStar et un ballast de 3 500 lbs (1 588 kg) offrent une vague propre et facile à tenir ; le XT22 (6,81 m) reçoit l’Ilmor 5.3L GDI HO de 380 ch, avec l’option 6.2L GDI 440 ch.', img: M('x41jg5iy/mb-wakes-waves.jpg') },
      { title: '16 places et passage de tableau', text: 'Banquette arrière en lounge et passage de tableau (walkthrough) facilitent l’embarquement ; 16 personnes trouvent leur place pour la journée.', img: M('u4cl5vqm/mb-comfort-1.jpg') },
      { title: 'Écran tactile 12 pouces', text: 'Dash moderne à écran tactile 12 pouces et MyDrive : réglages de vague et fonctions du bateau accessibles d’un geste.', img: M('ik4oe1d1/mb-dash.jpg') },
      { title: 'Tours et racks personnalisables', text: 'Tours personnalisables (coloris thermolaqués) avec racks à serrage et système SoundStage de série, pour un bateau à votre image.', img: M('yyqibvkd/mb-towers-1.jpg') },
    ],
    gallery: [M('x41jg5iy/mb-wakes-waves.jpg'), M('u4cl5vqm/mb-comfort-1.jpg'), M('ik4oe1d1/mb-dash.jpg'), M('yyqibvkd/mb-towers-1.jpg'), M('l5ufpk2d/mb-audio-1.jpg')],
  },
  {
    slug: 'xt22t', short: 'XT22T', series: 'xt',
    length: '21\' 10" / 6,65 m', beam: '102" / 2,59 m', draft: '30" / 0,76 m',
    seats: '14 personnes', ballast: '3 020 lbs / 1 370 kg', fuel: '79 gal / 299 L', weight: '5 275 lbs / 2 393 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    intro: 'La variante à proue pickle-fork de la série XT : une esthétique moderne et distinctive, plus d’espace à la proue et toute la polyvalence du XT.',
    tagline: 'Le XT à proue pickle-fork (6,65 m, 14 places) : style moderne, carré avant spacieux et vagues nettes signées SurfStar. Essai et conseil chez Motor Boat 74, au bord du lac d’Annecy.',
    features: [
      'Proue pickle-fork au style moderne',
      'Système SurfStar pour des vagues nettes et constantes',
      'Audio SoundStage accordé sur mesure',
      'Écran tactile 12 pouces et siège de pilotage à élévation hydraulique',
      'Stern thruster et DockStar disponibles',
    ],
    hl: [
      { title: 'Vague SurfStar et proue pickle-fork', text: 'Le XT22T mêle proue pickle-fork moderne et SurfStar avec 3 020 lbs (1 370 kg) de ballast pour des vagues nettes et constantes, sur 6,65 m. Moteur Ilmor 5.3L GDI HO de 380 ch (option 440 ch).', img: M('imgfhca3/mb-wakes-waves.jpg') },
      { title: '14 places et proue ouverte', text: 'La proue pickle-fork libère un carré avant spacieux ; 14 personnes profitent d’un cockpit polyvalent, pensé pour le surf comme pour la détente en famille.', img: M('uozjp1qt/mb-comfort-1.jpg') },
      { title: 'Dash 12 pouces et siège hydraulique', text: 'Écran tactile 12 pouces, commandes regroupées et siège de pilotage à élévation hydraulique ; stern thruster et DockStar disponibles pour des manœuvres faciles à quai.', img: M('mfwftufz/mb-dash.jpg') },
      { title: 'Tours personnalisables et audio', text: 'Tours en coloris thermolaqués et système SoundStage accordé sur mesure pour personnaliser le bateau et l’ambiance sonore.', img: M('ebippwjw/mb-towers-1.jpg') },
    ],
    gallery: [M('imgfhca3/mb-wakes-waves.jpg'), M('uozjp1qt/mb-comfort-1.jpg'), M('mfwftufz/mb-dash.jpg'), M('ebippwjw/mb-towers-1.jpg'), M('fbajucqv/mbaudio.jpg')],
  },
  {
    slug: 'xt20', short: 'XT20', series: 'xt',
    length: '20\' / 6,10 m', beam: '100" / 2,54 m', draft: '30" / 0,76 m',
    seats: '12 personnes', ballast: '2 950 lbs / 1 338 kg', fuel: '45 gal / 170 L', weight: '5 100 lbs / 2 313 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    intro: 'Le surf-boat compact et polyvalent de la série XT : maniable et accessible, parfait pour débuter ou naviguer sur des plans d’eau plus petits, sans renoncer aux vagues SurfStar.',
    tagline: 'Le surf-boat compact et accessible (6,10 m, 12 places) : maniable, facile à tracter, idéal pour débuter sans renoncer aux vagues SurfStar. À essayer chez Motor Boat 74, près du lac d’Annecy.',
    features: [
      'Format compact, facile à tracter et à stocker',
      'Système de vague SurfStar',
      'Écran tactile 12 pouces, MyDrive, recharge sans fil et démarrage sans clé',
      'Audio MasterCraft SoundStage de série',
      '93 ft³ de rangement, banquette arrière avec dossiers',
    ],
    hl: [
      { title: 'Petit format, grandes vagues', text: 'Le plus compact des XT (6,10 m) reste un vrai surf-boat : SurfStar et 2 950 lbs (1 338 kg) de ballast pour une vague propre, avec l’Ilmor 5.3L GDI HO de 380 ch (option 6.2L GDI 440 ch). Facile à tracter et à stocker au garage.', img: M('1ffnh1pj/experience.webp') },
      { title: '12 places et 93 ft³ de rangement', text: 'Maniable et accessible, le XT20 embarque 12 personnes, une banquette arrière à dossiers et 93 ft³ (2,6 m³) de rangement : idéal pour débuter ou naviguer sur des plans d’eau plus petits.', img: M('vrjhuwgg/mb-comfort-1.jpg') },
      { title: 'Écran tactile 12 pouces et MyDrive', text: 'Dash épuré, écran tactile 12 pouces, recharge sans fil et démarrage sans clé rendent la prise en main immédiate, même pour un primo-accédant.', img: M('zx5ii0ge/mb-dash.jpg') },
      { title: 'Tour repliable et audio SoundStage', text: 'Tour personnalisable et système MasterCraft SoundStage de série pour la musique à bord, avec options sièges chauffants et marche de bain escamotable.', img: M('xd1dkz0f/mb-tower.jpg') },
    ],
    gallery: [M('1ffnh1pj/experience.webp'), M('vrjhuwgg/mb-comfort-1.jpg'), M('zx5ii0ge/mb-dash.jpg'), M('xd1dkz0f/mb-tower.jpg'), M('0pgdx1da/mb-audio-1.jpg')],
  },
  {
    slug: 'nxt24', short: 'NXT24', series: 'nxt',
    length: '24\' / 7,32 m', beam: '102" / 2,59 m', draft: '29" / 0,74 m',
    seats: '16 personnes', ballast: '3 300 lbs / 1 497 kg', fuel: '65 gal / 246 L', weight: '5 000 lbs / 2 268 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    intro: 'Le fleuron de la série NXT : capacité maximale et performances premium, avec l’option du moteur 6.2L GDI. Toute la technologie MasterCraft dans une série accessible.',
    tagline: 'Le plus grand des NXT (7,32 m, 16 places, 103 ft³ de rangement) : tout le savoir-faire MasterCraft dans une série accessible, avec l’option moteur 6.2L. Conseil, essai et reprise chez Motor Boat 74, près du lac d’Annecy.',
    features: [
      'Le plus grand de la série NXT (16 places, 103 ft³ de rangement)',
      'Sellerie plissée premium, tours thermolaquées, éclairage RGB, entrée sans clé',
      'Système de vague SurfStar de série',
      'Audio MasterCraft SoundStage à son directionnel',
      'Recharge sans fil au poste de pilotage',
    ],
    hl: [
      { title: 'Le plus grand NXT, vague de série', text: 'Fleuron de la série NXT (7,32 m), le NXT24 associe SurfStar et 3 300 lbs (1 497 kg) de ballast pour une vague de qualité dès la sortie, avec l’Ilmor 5.3L GDI HO de 380 ch (option 6.2L GDI 440 ch).', img: M('jwlowzkc/mb-wave.webp') },
      { title: '16 places et 103 ft³ de rangement', text: 'Le plus spacieux des NXT : 16 personnes, sellerie plissée premium et 103 ft³ (2,9 m³) de rangement pour les grandes journées sur l’eau.', img: M('x05ft24z/mb-comfort-1.webp') },
      { title: 'Dash NXT et entrée sans clé', text: 'Interface NXT, recharge sans fil au poste et entrée sans clé : confort d’usage moderne et prise en main immédiate, idéal pour un premier wakeboat haut de gamme.', img: M('vwolw0hj/mb-dash.webp') },
      { title: 'Tours thermolaquées, RGB et audio', text: 'Tours thermolaquées, éclairage RGB et système SoundStage à son directionnel, accordé pour chaque place à bord, pour le style et l’ambiance de série.', img: M('qnejsuj4/mb-tower-1.webp') },
    ],
    gallery: [M('jwlowzkc/mb-wave.webp'), M('x05ft24z/mb-comfort-1.webp'), M('vwolw0hj/mb-dash.webp'), M('qnejsuj4/mb-tower-1.webp'), M('rlppuhyt/mb-audio.png'), M('2s2b1mmc/mb-tower-2.webp')],
  },
  {
    slug: 'nxt23', short: 'NXT23', series: 'nxt',
    length: '23\' / 7,01 m', beam: '100" / 2,54 m', draft: '29" / 0,74 m',
    seats: '16 personnes', ballast: '3 130 lbs / 1 420 kg', fuel: '65 gal / 246 L', weight: '5 030 lbs / 2 282 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    intro: 'Capacité étendue et ballast accru pour des vagues franches à tous les niveaux. Le NXT23 peut recevoir le moteur 6.2L GDI de 440 ch pour plus de punch.',
    tagline: 'Wakeboat accessible de 7,01 m pour 16 personnes, avec l’option moteur 6.2L pour plus de punch : des vagues franches à tous les niveaux. Essai sur le lac d’Annecy chez Motor Boat 74.',
    features: [
      'Système SurfStar de série',
      'Éclairage RGB, entrée sans clé et recharge sans fil (poste et cockpit)',
      'Audio MasterCraft SoundStage à son directionnel',
      'Sellerie premium et 99 ft³ de rangement',
      'Dash NXT avec écran 7 pouces',
    ],
    hl: [
      { title: 'Vagues franches, option 6.2L', text: 'Capacité étendue et ballast de 3 130 lbs (1 420 kg) : le NXT23 (7,01 m) sort des vagues franches à tous les niveaux, avec l’Ilmor 5.3L GDI HO de 380 ch, et l’option 6.2L GDI 440 ch pour plus de punch.', img: M('ky5egq4q/mb-wake-and-waves.webp') },
      { title: '16 places et 99 ft³ de rangement', text: 'Seize personnes à bord, sellerie premium et 99 ft³ de rangement pour limiter le désordre et partir équipé sur une journée complète.', img: M('zeepckhv/mb-comfort-1.webp') },
      { title: 'Dash NXT 7 pouces et recharge sans fil', text: 'Interface NXT à écran 7 pouces, recharge sans fil au poste et au cockpit et entrée sans clé : la technologie utile, simplement.', img: M('cqrfnet2/mb-dash.webp') },
      { title: 'Tour et audio à son directionnel', text: 'Tour thermolaquée et système SoundStage à son directionnel, accordé pour chaque place à bord, avec éclairage RGB de série.', img: M('ae5fcqjx/mb-tower-1.webp') },
    ],
    gallery: [M('ky5egq4q/mb-wake-and-waves.webp'), M('zeepckhv/mb-comfort-1.webp'), M('cqrfnet2/mb-dash.webp'), M('ae5fcqjx/mb-tower-1.webp'), M('wj3fvw4e/mb-audio-1.webp')],
  },
  {
    slug: 'nxt22', short: 'NXT22', series: 'nxt',
    length: '22\' / 6,71 m', beam: '98" / 2,49 m', draft: '28" / 0,71 m',
    seats: '14 personnes', ballast: '3 000 lbs / 1 361 kg', fuel: '49 gal / 186 L', weight: '4 760 lbs / 2 159 kg',
    engines: [ENGINE.ho380],
    intro: 'Le NXT22 équilibre performance et confort avec un ballast renforcé : un wakeboat accessible et polyvalent, parfait pour la famille et les premières sessions de surf.',
    tagline: 'Le NXT équilibré (6,71 m, 14 places) : ballast renforcé pour des vagues constantes et un rangement record, simple à vivre. À essayer chez Motor Boat 74, concessionnaire près du lac d’Annecy.',
    features: [
      'Système SurfStar et ballast généreux pour des vagues constantes',
      'Rangement planches parmi les plus vastes de sa catégorie',
      'Éclairage RGB, entrée sans clé et audio SoundStage de série',
      'Sellerie plissée et tours thermolaquées',
    ],
    hl: [
      { title: 'Vagues constantes, 3 000 lbs de ballast', text: 'SurfStar et un ballast généreux de 3 000 lbs (1 361 kg) assurent des vagues propres et régulières sans réglage compliqué ; le NXT22 (6,71 m) reçoit l’Ilmor 5.3L GDI HO de 380 ch.', img: M('dszf242b/mb-wakes-and-waves.jpg') },
      { title: '14 places et rangement record', text: 'Quatorze personnes, sellerie plissée et l’un des plus grands volumes de rangement planches de la catégorie : le NXT22 est aussi simple à vivre qu’à charger.', img: M('ah0pfuma/mb-comfort.webp') },
      { title: 'Éclairage RGB et audio SoundStage', text: 'Éclairage RGB, entrée sans clé et système SoundStage de série apportent confort moderne et ambiance à bord, de jour comme en soirée.', img: M('5gpf3q3f/mb-audio.webp') },
      { title: 'Tours thermolaquées et finitions', text: 'Vinyles montés en gamme et tours thermolaquées soignent le style : un wakeboat accessible mais bien équipé, facile à posséder.', img: M('rzedldul/mb-tower.webp') },
    ],
    gallery: [M('dszf242b/mb-wakes-and-waves.jpg'), M('ah0pfuma/mb-comfort.webp'), M('5gpf3q3f/mb-audio.webp'), M('rzedldul/mb-tower.webp')],
  },
  {
    slug: 'nxt20', short: 'NXT20', series: 'nxt',
    length: '20\' / 6,10 m', beam: '96" / 2,44 m', draft: '27" / 0,69 m',
    seats: '11 personnes', ballast: '1 770 lbs / 803 kg', fuel: '47 gal / 178 L', weight: '3 965 lbs / 1 799 kg',
    engines: [ENGINE.ho380],
    intro: 'L’entrée dans l’univers MasterCraft dans un format 20 pieds maniable : le NXT20 rend le wakesurf et le wakeboard accessibles, avec la qualité de construction de la marque.',
    tagline: 'L’accès à l’univers MasterCraft en 20 pieds (6,10 m, 11 places) : maniable, facile à tracter et à stocker, pour découvrir le wakesurf. Conseil et essai chez Motor Boat 74, au bord du lac d’Annecy.',
    features: [
      'Profil compact, facile à tracter, stocker et manœuvrer',
      'Système de vague SurfStar',
      'Démarrage sans clé, dash NXT et audio SoundStage',
      'Rangement planches généreux, racks à serrage de série',
      'Recharge sans fil au poste et au cockpit (option)',
    ],
    hl: [
      { title: 'L’accès à MasterCraft, vraies vagues', text: 'Format 20 pieds maniable, le NXT20 rend le wakesurf accessible : SurfStar, 1 770 lbs (803 kg) de ballast et le moteur Ilmor 5.3L GDI HO de 380 ch pour des vagues franches, faciles à tracter et à stocker.', img: M('gy0n5oav/mb-wake.webp') },
      { title: '11 places, l’essentiel bien fait', text: 'Onze personnes à bord, sellerie soignée et rangement planches généreux avec racks à serrage de série : tout le nécessaire, sans superflu.', img: M('phvc5fb5/mb-comfort.webp') },
      { title: 'Dash NXT et démarrage sans clé', text: 'Interface NXT claire, démarrage sans clé et recharge sans fil (option) : une prise en main immédiate pour les familles et les nouveaux propriétaires.', img: M('a1uiwopj/mb-dash_.webp') },
      { title: 'Tour repliable et audio SoundStage', text: 'Tour thermolaquée et système SoundStage de série pour la musique à bord, dans un bateau MasterCraft pensé pour durer.', img: M('0fobaicu/mb-tower.webp') },
    ],
    gallery: [M('gy0n5oav/mb-wake.webp'), M('phvc5fb5/mb-comfort.webp'), M('a1uiwopj/mb-dash_.webp'), M('0fobaicu/mb-tower.webp'), M('l0hoybog/audio.webp')],
  },
  {
    slug: 'prostar', short: 'ProStar', series: 'prostar',
    length: '20\' / 6,10 m', beam: '96" / 2,43 m', draft: '22" / 0,56 m',
    seats: '7 personnes', fuel: '30 gal / 113 L', weight: '3 300 lbs / 1 497 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440, ENGINE.mpi373, ENGINE.sc630],
    intro: 'La référence absolue du ski nautique : le ProStar produit le sillage le plus plat du marché et un suivi laser-précis grâce à ses quatre ailettes. Pensé pour les skieurs d’aujourd’hui et de demain.',
    tagline: 'La référence du ski nautique de compétition : 6,10 m, le sillage le plus plat du marché et un suivi laser grâce à ses quatre ailettes. À découvrir et essayer chez Motor Boat 74, près du lac d’Annecy.',
    features: [
      'Sillage le plus propre et constant du marché, éclaboussures minimales',
      'Système quatre ailettes propriétaire pour un suivi laser-précis',
      'Écran tactile 10 pouces avec logiciel trois disciplines',
      'Capot moteur redessiné pour le flux d’air et la réduction du bruit',
      'Assises modulables, siège de juge réversible et sellerie CoolFeel en option',
    ],
    hl: [
      { title: 'Le sillage le plus plat du marché', text: 'Pensé pour le slalom, le ProStar (6,10 m) trace le sillage le plus plat et le plus propre du marché, avec un minimum d’éclaboussures : un plan d’eau dégagé pour enrouler les bouées à grande vitesse.', img: M('szgbgc4i/wake_desktop.jpg') },
      { title: 'Suivi laser grâce aux quatre ailettes', text: 'Quatre ailettes et des rails de coque propriétaires assurent un suivi d’une précision chirurgicale, sans dérive, pour des trajectoires nettes et répétables passage après passage.', img: M('3vvlwuyb/four-fins-resized.jpg') },
      { title: 'Motorisations Ilmor du 373 au 630 ch', text: 'Le ProStar se configure du bloc Ilmor 6.0L MPI (373 ch) à l’Ilmor 6.2L suralimenté (630 ch), selon le niveau et la discipline ; écran tactile 10 pouces à logiciel trois disciplines pour calibrer chaque passage.', img: M('utimf5tj/tracking_desktop.jpg') },
      { title: 'Confort premium pour 7 personnes', text: 'Construction artisanale, assises modulables, siège de juge réversible et sellerie CoolFeel en option : un bateau de ski exigeant qui reste confortable pour 7 personnes.', img: M('c5hjo5in/comfort_desktop.jpg') },
    ],
    gallery: [M('szgbgc4i/wake_desktop.jpg'), M('3vvlwuyb/four-fins-resized.jpg'), M('utimf5tj/tracking_desktop.jpg'), M('c5hjo5in/comfort_desktop.jpg'), M('1ffnh1pj/experience.webp'), M('l0hoybog/audio.webp')],
  },
];

const SERIES_NAME: Record<Series, string> = {
  xstar: 'Série XStar', x: 'Série X', xt: 'Série XT', nxt: 'Série NXT', prostar: 'ProStar',
};

const SERIES_TYPE: Record<Series, string> = {
  xstar: 'wakeboat haut de gamme', x: 'wakeboat', xt: 'surf-boat', nxt: 'wakeboat', prostar: 'bateau de ski nautique',
};

/** Longueur métrique seule (ex. « 7,39 m ») extraite de « 24' 3" / 7,39 m ». */
const metric = (length: string) => length.split('/').pop()!.trim();

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
    metaDescription: `MasterCraft ${i.short} 2026 : ${SERIES_TYPE[i.series]} de ${metric(i.length)} pour ${i.seats}, moteur ${primary.name} (${primary.power}). Prix, fiche technique et essai sur le lac d’Annecy chez Motor Boat 74.`,
    intro: [i.intro],
    tagline: i.tagline,
    hero: i.gallery[0],
    gallery: i.gallery,
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
    highlights: i.hl.map((h) => ({ title: h.title, text: h.text })),
    highlightImages: i.hl.map((h) => h.img),
    features: i.features,
    motorizations: i.engines,
    faqs: buildFaqs(i.short, i.series),
  };
}

export const MASTERCRAFT_ORDER: string[] = INPUTS.map((i) => i.slug);

export const mastercraftModels: Record<string, NautiqueModel> = Object.fromEntries(
  INPUTS.map((i) => [i.slug, build(i)]),
);
