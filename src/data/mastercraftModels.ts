import { NautiqueModel, Highlight, Motorization, ModelFAQ } from './nautiqueModels';

/**
 * Catalogue MasterCraft 2026 — données reproduites depuis mastercraft.com.
 * Images hotlinkées depuis le CDN MasterCraft (mastercraft.com/media/...).
 */

type Series = 'xstar' | 'x' | 'xt' | 'nxt' | 'prostar';

const ENGINE: Record<string, Motorization> = {
  sc630: { name: 'Ilmor 6.2L Supercharged', fuel: 'Essence', power: '630 ch', torque: '665 lb-ft', ratio: '—' },
  gdi440: { name: 'Ilmor 6.2L GDI', fuel: 'Essence', power: '440 ch', torque: '—', ratio: '—' },
  ho380: { name: 'Ilmor 5.3L GDI HO', fuel: 'Essence', power: '380 ch', torque: '—', ratio: '—' },
  mpi373: { name: 'Ilmor 6.0L MPI', fuel: 'Essence', power: '373 ch', torque: '—', ratio: '—' },
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
    { title: 'Moteur Ilmor 6.2L', text: 'Le bloc Ilmor 6.2L GDI de 440 ch de série, fiable et performant.' },
  ],
  nxt: [
    { title: 'SurfStar', text: 'Trois presets de vague Rapid Surf par côté et profils de foil d’usine, pour surfer dès le premier jour.' },
    { title: 'FasterFill', text: 'Le système de remplissage de ballast rapide NXT pour passer plus vite à l’action.' },
    { title: 'Confort repensé', text: 'Sellerie plissée, passage de tableau arrière (transom walkover) de série et éclairage RGB.' },
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
  beam?: string;
  seats: string;
  ballast?: string;
  fuel?: string;
  weight?: string;
  engines: Motorization[];
  images: string[];
  intro: string;
  tagline: string;
}

const M = (s: string) => `https://www.mastercraft.com/media/${s}`;

const INPUTS: MCInput[] = [
  {
    slug: 'xstar-23', short: 'XStar 23', series: 'xstar', length: '23\' 7" / 7,19 m', seats: '16 personnes', ballast: '3 775 lbs / 1 712 kg',
    engines: [ENGINE.sc630],
    images: [M('toqfdw11/xstar23_26_front_hero-2-1.webp')],
    intro: 'Référence du wakesurf depuis près de 30 ans, le XStar 23 réunit la proue pickle-fork iconique, des vagues de classe mondiale et des finitions premium. Une évolution 2026 plus raffinée, toujours animée par le moteur le plus puissant du marché.',
    tagline: 'Le fleuron wakesurf de MasterCraft : vagues de classe mondiale et luxe absolu, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'xstar-25', short: 'XStar 25', series: 'xstar', length: '25\' 7" / 7,80 m', seats: '18 personnes', ballast: '3 975 lbs / 1 803 kg',
    engines: [ENGINE.sc630],
    images: [M('245lnyme/xstar25_26_front_hero.webp'), M('toaj4ntn/xstar25_26_profile_hero.webp')],
    intro: 'La version XL du fleuron : le XStar 25 offre plus de place (18 personnes), une coque affinée, un ballast optimisé et un stern thruster pour une maniabilité totale. La même performance qui a remporté des titres mondiaux, en plus spacieux.',
    tagline: 'Le wakeboat haut de gamme XL : 18 places, stern thruster et vagues de compétition, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'x24', short: 'X24', series: 'x', length: '24\' 3" / 7,39 m', seats: '17 personnes', ballast: '4 050 lbs / 1 837 kg',
    engines: [ENGINE.gdi440, ENGINE.sc630],
    images: [M('uszo0uud/x24_26_quarter_dab_hero-3.webp'), M('nf3bfcfw/x24_26_profile.webp'), M('wyhbvprg/x24_26_top.webp')],
    intro: 'Le plus grand de la série X, entièrement redessiné pour 2026 : espace maximal, ballast renforcé pour des vagues puissantes et de doubles compartiments arrière. Precision With Presence à son sommet.',
    tagline: 'Le X le plus grand et le mieux doté : espace, ballast renforcé et vagues puissantes, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'x23', short: 'X23', series: 'x', length: '22\' 11" / 6,99 m', seats: '16 personnes', ballast: '3 800 lbs / 1 724 kg',
    engines: [ENGINE.gdi440, ENGINE.sc630],
    images: [M('l42bw2pd/x23-quarter.webp')],
    intro: 'Le X au volume intérieur accru : assises plus profondes et plus enveloppantes, rangements généreux et la précision de comportement de la série X. Le juste équilibre entre espace et agilité.',
    tagline: 'Le X équilibré : volume intérieur, confort et précision de la série X, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'x22', short: 'X22', series: 'x', length: '22\' 3" / 6,78 m', seats: '15 personnes', ballast: '3 800 lbs / 1 724 kg',
    engines: [ENGINE.gdi440, ENGINE.sc630],
    images: [M('ewaltwrw/my26_x22_hero_front.webp'), M('jlmj55nd/my26_x22_hero_profile.webp'), M('xphguh4f/my26_x22_hero_top.webp')],
    intro: 'Précision et présence dans un format compact et réactif. Coque profilée à carreaux sculptés, le X22 est idéal pour les riders qui cherchent un comportement vif et des vagues franches via SurfStar.',
    tagline: 'Le X compact et réactif : maniabilité et vagues franches, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'xt24', short: 'XT24', series: 'xt', length: '24\' / 7,32 m', seats: '17 personnes', ballast: '3 700 lbs / 1 678 kg',
    engines: [ENGINE.gdi440],
    images: [M('aani2yuw/xt24_26_quarter.webp'), M('exukm11d/xt24_26_profile.webp')],
    intro: 'Le fleuron de la série XT : capacité et façonnage de vague maximaux, équipements premium et toute la polyvalence XT. Le surf-boat familial le plus spacieux de la gamme.',
    tagline: 'Le XT le plus grand : capacité et vagues maximales pour toute la famille, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'xt23', short: 'XT23', series: 'xt', length: '23\' 4" / 7,11 m', seats: '16 personnes', ballast: '3 450 lbs / 1 565 kg',
    engines: [ENGINE.gdi440],
    images: [M('f0cpevkn/xt23_26_quarter.webp'), M('itxb2a0s/xt23_26_profile-1.webp')],
    intro: 'Plateforme étendue et équipements premium pour les passionnés : le XT23 combine espace, confort et vagues de classe mondiale dans un format polyvalent.',
    tagline: 'Le XT spacieux et premium : confort et vagues de classe mondiale, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'xt22', short: 'XT22', series: 'xt', length: '22\' 4" / 6,81 m', seats: '16 personnes', ballast: '3 500 lbs / 1 588 kg',
    engines: [ENGINE.gdi440],
    images: [M('cbkh4kis/xt22_26_quarter.webp'), M('l3titwoh/xt22_26_profile.webp')],
    intro: 'Le XT22 équilibre performance et capacité familiale : un surf-boat polyvalent, facile à vivre, avec le système SurfStar et le moteur Ilmor 6.2L de 440 ch.',
    tagline: 'Le XT équilibré : performance et capacité familiale, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'xt22t', short: 'XT22T', series: 'xt', length: '21\' 10" / 6,65 m', seats: '14 personnes', ballast: '3 020 lbs / 1 370 kg',
    engines: [ENGINE.gdi440],
    images: [M('ge4hbsqm/xt22t_26_quarter.webp'), M('wnranrwc/xt22t_26_profile.webp')],
    intro: 'La variante à proue pickle-fork de la série XT : une esthétique moderne et distinctive, plus d’espace à la proue et toute la polyvalence du XT.',
    tagline: 'Le XT à proue pickle-fork : style moderne et proue spacieuse, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'xt20', short: 'XT20', series: 'xt', length: '20\' / 6,10 m', seats: '12 personnes', ballast: '2 950 lbs / 1 338 kg',
    engines: [ENGINE.gdi440],
    images: [M('4zcjksyz/xt20_26_quarter.webp'), M('3r1kskuc/xt20_26_profile.webp')],
    intro: 'Le surf-boat compact et polyvalent de la série XT : maniable et accessible, parfait pour débuter ou naviguer sur des plans d’eau plus petits, sans renoncer aux vagues SurfStar.',
    tagline: 'Le XT compact et maniable : idéal pour débuter, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'nxt24', short: 'NXT24', series: 'nxt', length: '24\' / 7,32 m', seats: '16 personnes', ballast: '3 300 lbs / 1 497 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    images: [M('ljhdresw/nxt24_26_hero_quarter.webp'), M('oujliii4/nxt24_26_hero_profile.webp')],
    intro: 'Le fleuron de la série NXT : capacité maximale et performances premium, avec l’option du moteur 6.2L GDI. Toute la technologie MasterCraft dans une série accessible.',
    tagline: 'Le NXT le plus grand : capacité maximale et option 6.2L, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'nxt23', short: 'NXT23', series: 'nxt', length: '23\' / 7,01 m', seats: '16 personnes', ballast: '3 130 lbs / 1 420 kg',
    engines: [ENGINE.ho380, ENGINE.gdi440],
    images: [M('zxlbs5w4/nxt23_26_hero_quarter.webp'), M('yq4pmvna/nxt23_26_hero_profile.webp')],
    intro: 'Capacité étendue et ballast accru pour des vagues franches à tous les niveaux. Le NXT23 peut recevoir le moteur 6.2L GDI de 440 ch pour plus de punch.',
    tagline: 'Le NXT polyvalent : capacité étendue et option 6.2L, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'nxt22', short: 'NXT22', series: 'nxt', length: '22\' / 6,71 m', seats: '14 personnes', ballast: '3 000 lbs / 1 361 kg',
    engines: [ENGINE.ho380],
    images: [M('jfwlf3oq/nxt22_26_hero_quarter.webp'), M('13gnrfhz/nxt22_26_hero_profile.webp')],
    intro: 'Le NXT22 équilibre performance et confort avec un ballast renforcé : un wakeboat accessible et polyvalent, parfait pour la famille et les premières sessions de surf.',
    tagline: 'Le NXT équilibré : ballast renforcé et polyvalence, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'nxt20', short: 'NXT20', series: 'nxt', length: '20\' / 6,10 m', seats: '11 personnes', ballast: '1 770 lbs / 803 kg',
    engines: [ENGINE.ho380],
    images: [M('gcuhlmtq/nxt20_26_hero_quarter.webp'), M('fsvbnexi/nxt20_26_hero_profile-1.webp')],
    intro: 'L’entrée dans l’univers MasterCraft dans un format 20 pieds maniable : le NXT20 rend le wakesurf et le wakeboard accessibles, avec la qualité de construction de la marque.',
    tagline: 'Le NXT compact : l’accès à MasterCraft en 20 pieds, à essayer sur le lac d’Annecy.',
  },
  {
    slug: 'prostar', short: 'ProStar', series: 'prostar', length: '20\' / 6,10 m', beam: '96" / 2,43 m', seats: '7 personnes', weight: '3 300 lbs / 1 497 kg', fuel: '30 gal / 113 L',
    engines: [ENGINE.ho380, ENGINE.gdi440, ENGINE.mpi373, ENGINE.sc630],
    images: [M('4ihpe2xu/my25-prostar-quarter.webp'), M('xm5dh5kz/my25-prostar-profile-2.webp'), M('gkybn5q3/ps-rear.webp'), M('1qflh1tv/my25-prostar-top.webp')],
    intro: 'La référence absolue du ski nautique : le ProStar produit le sillage le plus plat du marché et un suivi laser-précis grâce à ses quatre ailettes. Pensé pour les skieurs d’aujourd’hui et de demain.',
    tagline: 'Le bateau de ski nautique de référence : sillage le plus plat du marché, à essayer sur le lac d’Annecy.',
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
          ...(i.beam ? [{ label: 'Largeur (bau)', value: i.beam }] : []),
        ],
      },
      {
        group: 'Capacité',
        items: [
          { label: 'Capacité maximale', value: i.seats },
          ...(i.ballast ? [{ label: 'Ballast max', value: i.ballast }] : []),
          ...(i.weight ? [{ label: 'Poids sec', value: i.weight }] : []),
          ...(i.fuel ? [{ label: 'Capacité de carburant', value: i.fuel }] : []),
        ],
      },
      {
        group: 'Performance',
        items: [
          { label: 'Moteur standard', value: primary.name },
          { label: 'Puissance', value: primary.power },
          ...(i.engines.length > 1 ? [{ label: 'Autres motorisations', value: i.engines.slice(1).map((e) => `${e.name} (${e.power})`).join(', ') }] : []),
        ],
      },
    ],
    highlights: HIGHLIGHTS[i.series],
    motorizations: i.engines,
    faqs: buildFaqs(i.short, i.series),
  };
}

export const MASTERCRAFT_ORDER: string[] = INPUTS.map((i) => i.slug);

export const mastercraftModels: Record<string, NautiqueModel> = Object.fromEntries(
  INPUTS.map((i) => [i.slug, build(i)]),
);
