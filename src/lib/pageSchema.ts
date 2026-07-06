/**
 * Schéma du contenu éditorial des pages « statiques ».
 * Source unique des valeurs par défaut : les composants lisent leurs textes via
 * `usePageContent(page)(key)` (repli automatique sur le `default` défini ici), et
 * l'admin génère son formulaire à partir de ce même schéma.
 */
export type FieldType = 'text' | 'textarea' | 'image' | 'url';

export interface PageField {
  key: string;
  label: string;
  type: FieldType;
  default: string;
}
export interface PageSection {
  title: string;
  fields: PageField[];
}
export interface PageDef {
  key: string;
  label: string;
  /** Chemin public (pour le bouton « voir la page »). */
  path: string;
  sections: PageSection[];
}

/** Fabrique une page service avec sa bannière éditable (image, titre, sous-titre). */
function serviceHero(key: string, label: string, path: string, image: string, title: string, subtitle: string): PageDef {
  return {
    key,
    label,
    path,
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: image },
          { key: 'hero.title', label: 'Titre (vide = titre stylé par défaut)', type: 'text', default: title },
          { key: 'hero.subtitle', label: 'Sous-titre (vide = version stylée par défaut)', type: 'textarea', default: subtitle },
        ],
      },
    ],
  };
}

export const PAGES: PageDef[] = [
  {
    key: 'accueil',
    label: 'Accueil',
    path: '/',
    sections: [
      {
        title: 'Bannière (hero)',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: '/images/2026-g23-perf-18.jpg' },
          { key: 'hero.eyebrow', label: 'Sur-titre', type: 'text', default: 'Expert Nautique Haute-Savoie' },
          { key: 'hero.title1', label: 'Titre — ligne 1', type: 'text', default: 'Concessionnaire nautique' },
          { key: 'hero.title2', label: 'Titre — ligne 2 (cyan)', type: 'text', default: 'haute-savoie' },
          { key: 'hero.subtitle', label: 'Sous-titre', type: 'textarea', default: "Vente, entretien et hivernage de bateaux d'exception sur le lac d'Annecy et en Haute-Savoie." },
          { key: 'hero.cta1.label', label: 'Bouton 1 — texte', type: 'text', default: 'Découvrir nos services' },
          { key: 'hero.cta1.url', label: 'Bouton 1 — lien', type: 'url', default: '/services' },
          { key: 'hero.cta2.label', label: 'Bouton 2 — texte', type: 'text', default: 'Bateaux en vente' },
          { key: 'hero.cta2.url', label: 'Bouton 2 — lien', type: 'url', default: '/bateaux-occasion' },
          { key: 'hero.badgeLeft', label: 'Badge gauche', type: 'text', default: 'Concessionnaire' },
          { key: 'hero.badgeRight', label: 'Badge droite', type: 'text', default: 'Importateur Exclusif' },
        ],
      },
      {
        title: 'Présentation',
        fields: [
          { key: 'intro.title1', label: 'Titre — ligne 1', type: 'text', default: 'Votre partenaire nautique' },
          { key: 'intro.title2', label: 'Titre — ligne 2 (cyan)', type: 'text', default: "sur le Lac d'Annecy" },
          { key: 'intro.p1', label: 'Paragraphe 1', type: 'textarea', default: 'Bienvenue chez Motor Boat 74, votre spécialiste nautique sur le Lac d’Annecy.' },
          { key: 'intro.p2', label: 'Paragraphe 2', type: 'textarea', default: 'Nous vous proposons un service complet pour votre bateau : hivernage et stockage sécurisés, entretien régulier, réparations toutes marques, ainsi que la vente de bateaux neufs et d’occasion. Passionnés de nautisme, nous mettons notre savoir-faire au service des propriétaires qui souhaitent profiter de leur bateau en toute sérénité, avec une prise en charge professionnelle et personnalisée tout au long de l’année.' },
          { key: 'intro.p3', label: 'Paragraphe 3', type: 'textarea', default: 'Faites confiance à Motor Boat 74 pour prendre soin de votre bateau et pour vous fournir des services de qualité tout au long de l’année.' },
          { key: 'intro.image', label: 'Image', type: 'image', default: '/images/img-20230924-wa0017-1-11zon-11zon-e1727707593371-11zon.webp' },
        ],
      },
      {
        title: 'Section « Nos services »',
        fields: [
          { key: 'services.eyebrow', label: 'Sur-titre', type: 'text', default: 'Un service à 360°' },
          { key: 'services.title', label: 'Titre', type: 'text', default: 'Nos services' },
        ],
      },
    ],
  },
  serviceHero('hivernage', 'Service — Hivernage & stockage', '/hivernage-stockage-bateau', '/images/2026-g23-perf-18.jpg',
    'Hivernage et stockage de bateau à Annecy · Hangar sécurisé 3 000 m²',
    "Concessionnaire Nautique en Haute-Savoie, MotorBoat 74 hiverne, stocke et remet à l'eau votre bateau sur le Lac d'Annecy, le Léman et toute la région."),
  serviceHero('entretien', 'Service — Entretien & réparation', '/entretien-reparation', '/images/services/entretien.webp',
    'Entretien et réparation de bateaux à Annecy',
    'De la révision moteur aux travaux de carrosserie, MotorBoat 74 garantit performance, sécurité et longévité à votre bateau. Interventions rapides et soignées, en atelier ou sur place.'),
  serviceHero('depannage', 'Service — Dépannage', '/depannage', '/images/services/depannage.webp',
    "Dépannage de bateau sur le Lac d'Annecy · 7j/7 en saison",
    "Une panne sur l'eau ? Chaque minute compte. En Haute-Savoie, MotorBoat 74 intervient rapidement avec un bateau-atelier équipé pour vous remettre en sécurité et reprendre la navigation."),
  serviceHero('transport', 'Service — Transport', '/transport', '/images/services/transport.webp',
    'Transport de bateau en France et en Europe',
    'Achat, vente ou simple déplacement ? MotorBoat 74 assure le convoyage sécurisé de votre bateau, avec véhicules et remorques adaptés, partout en France et en Europe.'),
  serviceHero('sellerie', 'Service — Sellerie', '/sellerie', '/images/services/sellerie.webp',
    'Sellerie de bateau sur mesure · confection & rénovation',
    "Rénover l'intérieur de votre bateau ou remplacer une sellerie usée ? De la conception à la pose, MotorBoat 74 et ses artisans partenaires redonnent confort, style et protection à votre bateau."),
  serviceHero('remorques', 'Service — Remorques', '/remorques', '/images/services/remorques.webp',
    'Remorques de bateau sur mesure',
    'Trouvez la remorque parfaite pour transporter votre bateau en toute sécurité. MotorBoat 74 sélectionne, règle et prépare une remorque homologuée CE, parfaitement adaptée à votre embarcation.'),
];

/** Valeurs par défaut aplaties : { pageKey: { fieldKey: default } }. */
export const PAGE_DEFAULTS: Record<string, Record<string, string>> = Object.fromEntries(
  PAGES.map((p) => [p.key, Object.fromEntries(p.sections.flatMap((s) => s.fields).map((f) => [f.key, f.default]))]),
);
