/**
 * Schéma du contenu éditorial des pages « statiques ».
 * Source unique des valeurs par défaut : les composants lisent leurs textes via
 * `usePageContent(page)(key)` (repli automatique sur le `default` défini ici), et
 * l'admin génère son formulaire à partir de ce même schéma.
 */
export type FieldType = 'text' | 'textarea' | 'image' | 'url' | 'list';

export interface ListItemField {
  key: string;
  label: string;
  type: 'text' | 'textarea' | 'image' | 'url';
}

export interface PageField {
  key: string;
  label: string;
  type: FieldType;
  /** Valeur par défaut pour les champs scalaires. */
  default?: string;
  /** Pour type 'list' : définition des sous-champs d'un élément + valeurs par défaut. */
  itemFields?: ListItemField[];
  itemLabel?: string;
  defaultList?: any[];
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

/** Page avec bannière simple : titre + sous-titre (sans image de fond dédiée). */
function titleHero(key: string, label: string, path: string, title: string, subtitle: string): PageDef {
  return {
    key,
    label,
    path,
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.title', label: 'Titre', type: 'text', default: title },
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
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: '/images/2026-g23-perf-18.webp' },
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
  {
    key: 'services-hub',
    label: 'Services — Page d’accueil',
    path: '/services',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: '/images/services/services-hub.webp' },
          { key: 'hero.title', label: 'Titre', type: 'text', default: 'Nos services' },
          { key: 'hero.subtitle', label: 'Sous-titre', type: 'textarea', default: 'Découvrez notre gamme complète de services nautiques professionnels. De la vente à l’entretien, en passant par l’hivernage, MotorBoat74 vous accompagne dans tous vos projets nautiques.' },
          {
            key: 'hero.stats', label: 'Chiffres clés (bannière)', type: 'list', itemLabel: 'Chiffre',
            itemFields: [{ key: 'value', label: 'Titre', type: 'text' }, { key: 'label', label: 'Sous-texte', type: 'text' }],
            defaultList: [
              { value: 'Hangar sécurisé', label: '1300 m² avec alarme' },
              { value: 'Dépannage 7j/7', label: 'sur le Lac d’Annecy' },
              { value: 'Transport', label: 'en France et en Europe' },
            ],
          },
        ],
      },
      {
        title: 'Cartes services',
        fields: [
          {
            key: 'cards', label: 'Services (le lien et l’icône de chaque carte restent fixes)', type: 'list', itemLabel: 'Service',
            itemFields: [
              { key: 'title', label: 'Titre', type: 'text' },
              { key: 'desc', label: 'Description', type: 'textarea' },
              { key: 'bullets', label: 'Points clés (séparés par | )', type: 'text' },
            ],
            defaultList: [
              { title: 'Hivernage / Stockage', desc: 'Hivernage bateau sécurisé dans nos hangars de 3000 m² avec alarme sécurisée. Préparation complète moteur et coque incluse.', bullets: 'Stockage intérieur ventilé|Protection humidité & gel|Nettoyage avant remise à l’eau' },
              { title: 'Entretien / Réparation', desc: 'Entretien moteur bateau toutes marques, réparations mécaniques, électriques et électroniques avec techniciens certifiés.', bullets: 'Révision moteur inboard / hors-bord|Diagnostic électronique|Réparations fibre et gelcoat' },
              { title: 'Dépannage', desc: 'Dépannage bateau 7j/7 sur le Lac d’Annecy. Intervention sur panne moteur, batterie ou carburant, avec remorquage.', bullets: 'Dépannage sur zone, Lac d’Annecy|Assistance moteur inboard / hors-bord|Remorquage jusqu’au port' },
              { title: 'Transport en Europe', desc: 'Transport bateau sécurisé avec remorque adaptée, par des professionnels expérimentés. Prise en charge sur site et livraison partout en Europe.', bullets: 'Tous modèles et tailles|Arrimage et calage professionnel|Assurance incluse' },
              { title: 'Sellerie', desc: 'Sellerie bateau sur-mesure : tauds, coussins, biminis. Réparations ou créations avec tissus techniques marins.', bullets: 'Tissus anti-UV / étanches|Confection personnalisée|Pose à quai ou atelier' },
              { title: 'Vente de remorques', desc: 'Remorques bateau simples ou doubles essieux, freinées, prêtes à l’emploi. Fournisseurs sélectionnés pour la qualité.', bullets: 'Adaptées wake, pêche, ski|Homologation CE|Réglage et mise à l’eau' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'hivernage',
    label: 'Service — Hivernage & stockage',
    path: '/hivernage-stockage-bateau',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: '/images/2026-g23-perf-18.webp' },
          { key: 'hero.title', label: 'Titre (vide = titre stylé par défaut)', type: 'text', default: 'Hivernage et stockage de bateau à Annecy · Hangar sécurisé 3 000 m²' },
          { key: 'hero.subtitle', label: 'Sous-titre (vide = version stylée)', type: 'textarea', default: "Concessionnaire Nautique en Haute-Savoie, MotorBoat 74 hiverne, stocke et remet à l'eau votre bateau sur le Lac d'Annecy, le Léman et toute la région." },
          {
            key: 'hero.usps', label: 'Points forts (bannière)', type: 'list', itemLabel: 'Point fort',
            itemFields: [{ key: 'title', label: 'Titre', type: 'text' }, { key: 'desc', label: 'Description', type: 'textarea' }],
            defaultList: [
              { title: 'Hangar 3 000 m²', desc: 'Bâtiment industriel sécurisé & surveillé par alarme 24h/7j.' },
              { title: 'Moteur Certifié', desc: 'Hivernage moteur de pointe par un concessionnaire officiel.' },
              { title: 'Prêt au Printemps', desc: 'Notre package inclut la mise à l’eau garantie à date planifiée.' },
            ],
          },
        ],
      },
      {
        title: 'Section « En bref »',
        fields: [
          { key: 'bref.eyebrow', label: 'Sur-titre', type: 'text', default: 'En bref, Hivernage bateau Annecy' },
          { key: 'bref.lead', label: 'Phrase d’accroche (vide = version stylée)', type: 'textarea', default: "MotorBoat 74 est le spécialiste de l'hivernage et du stockage de bateau en Haute-Savoie, basé à Saint-Ferréol à 20 minutes d'Annecy." },
          { key: 'bref.desc', label: 'Description', type: 'textarea', default: "L'hivernage consiste à mettre le bateau hors d'eau, purger et protéger le moteur contre le gel, puis le remiser au sec jusqu'au printemps. Notre formule complète couvre la mise hors d'eau, l'hivernage moteur certifié, le stockage en hangar isolé de 3 000 m² et la remise à l'eau, partout sur le Lac d'Annecy, le Lac du Bourget et le Léman." },
          {
            key: 'bref.facts', label: 'Faits clés', type: 'list', itemLabel: 'Fait',
            itemFields: [{ key: 'k', label: 'Intitulé', type: 'text' }, { key: 'v', label: 'Valeur', type: 'text' }],
            defaultList: [
              { k: 'Localisation', v: "Saint-Ferréol (74210), 20 min d'Annecy" },
              { k: 'Hangar', v: '3 000 m² isolé, hors-gel, sous alarme 24/7' },
              { k: 'Transport', v: 'Récupération à votre port incluse' },
              { k: 'Devis', v: 'Réponse sous 24 h, gratuit' },
              { k: 'Zones', v: "Lac d'Annecy, Bourget, Léman" },
              { k: 'Marques', v: 'Toutes marques · concession. Nautique' },
            ],
          },
        ],
      },
      {
        title: 'Section « Pourquoi hiverner »',
        fields: [
          { key: 'why.title', label: 'Titre (vide = version stylée)', type: 'text', default: "Pourquoi l'hivernage de votre bateau est indispensable en Haute-Savoie" },
          { key: 'why.intro', label: 'Introduction', type: 'textarea', default: "Le climat alpin de notre belle Haute-Savoie est d'une grande rigueur. Durant l’hiver, les températures chutent durablement sous 0 °C. L’humidité nocturne et le gel provoquent des contraintes thermiques extrêmes sur les coques et la mécanique. Sans une purge rigoureuse, les réparations d’un bloc moteur fissuré coûtent 5 à 10 fois plus cher qu'un hivernage professionnel préventif." },
          {
            key: 'why.cards', label: 'Risques', type: 'list', itemLabel: 'Risque',
            itemFields: [{ key: 'title', label: 'Titre', type: 'text' }, { key: 'text', label: 'Description', type: 'textarea' }, { key: 'resolution', label: 'Résolution', type: 'text' }],
            defaultList: [
              { title: 'Gel du bloc moteur', text: "L’eau résiduelle piégée dans les échangeurs ou le carter gèle et augmente de volume, provoquant la fissure définitive du métal du moteur in-board.", resolution: "Purge et injection d'antigel" },
              { title: 'Humidité & moisissures', text: 'Le confinement prolongé favorise la condensation, altérant les cuirs de sellerie, les plastiques et générant des taches de moisissure.', resolution: 'Hangar ventilé anti-condensation' },
              { title: 'Rayons UV et intempéries', text: "Le soleil alpin hivernal et la neige altèrent le gelcoat de la coque, ternissent les teintes et craquellent les joints d'étanchéité.", resolution: 'Abri 100% couvert' },
              { title: 'Décharge de batterie', text: 'Par grand froid, une batterie non maintenue subit une décharge profonde irréversible, rendant le démarrage inopérant au printemps.', resolution: 'Dépose & cycles de charge' },
            ],
          },
        ],
      },
      {
        title: 'FAQ',
        fields: [
          {
            key: 'faq.items', label: 'Questions / réponses', type: 'list', itemLabel: 'Question',
            itemFields: [{ key: 'q', label: 'Question', type: 'text' }, { key: 'a', label: 'Réponse', type: 'textarea' }],
            defaultList: [
              { q: "Quand faut-il effectuer l'hivernage de son bateau ?", a: "L’hivernage doit idéalement débuter dès la fin de la saison estivale, entre septembre et novembre, avant les premières vagues de froid alpins. Attendre décembre augmente de 75 % le risque d'infiltration d'eau gelée dans la coque ou dans le bloc moteur, provoquant des fissures irréparables." },
              { q: "Quel est le prix moyen d'un hivernage de bateau à Annecy ?", a: "Le tarif dépend de la taille de votre bateau, de son équipement (ex : ballasts de wakeboard), de sa motorisation (hors-bord ou in-board) et de la formule retenue (hivernage complet ou stockage seul). Nous vous adressons un devis personnalisé et gratuit sous 24 h, sans engagement." },
              { q: "Quels types de bateaux pouvez-vous hiverner ?", a: "Notre hangar de 3 000 m² à Saint-Ferréol accueille tout type d’unité : bateaux de wakesurf et wakeboard (Nautique, MasterCraft, Tigé, Malibu), bateaux de ski, day-cruisers, hors-bords légers, et semi-rigides de plaisance." },
              { q: "Comment préparez-vous le moteur pour l'hiver / gel ?", a: "Notre protocole d'hivernage mécanique certifié comprend : la vidange d’huile moteur complète avec remplacement des filtres, la stabilisation du carburant, l’injection d'antigel marine dans tous les collecteurs, et la déconnexion avec charge cyclique des batteries." },
              { q: "Vaut-il mieux stocker son bateau en intérieur ou en extérieur ?", a: "En Haute-Savoie, les rigueurs de l’hiver rendent le stockage intérieur isolé indispensable. Un stockage extérieur expose le bateau aux écarts de température extrêmes, à la condensation et aux surcharges de neige." },
              { q: "Comment se déroule la remise à l'eau au printemps ?", a: "Comprise dans notre formule tout-inclus : nettoyage de sortie de stockage, contrôle des batteries, redémarrage moteur en bac d'essai, resserrage des vannes, et livraison prête à naviguer au port convenu." },
              { q: "Quelle est la durée minimale d'un contrat de stockage ?", a: "Nos contrats hivernaux couvrent généralement 6 à 7 mois (d'octobre à avril). Nous proposons aussi des contrats à l'année ou sur-mesure." },
              { q: "Mon bateau est-il assuré de façon sécurisée chez vous ?", a: "Notre centre dispose d'un contrat d'assurance multirisque professionnelle 'stockage et garde'. Vous devez maintenir votre propre assurance tous risques en cours de validité." },
              { q: "Puis-je accéder à mon bateau pendant l'hivernage ?", a: "Les accès du hangar sont hautement contrôlés 7j/7. Vous pouvez planifier une visite ou retirer des effets personnels sur rendez-vous fixé 48h à l'avance." },
              { q: "Prenez-vous en charge toutes les marques de bateaux ?", a: "Absolument. MotorBoat 74 est expert toutes marques : Nautique, Malibu, MasterCraft, Regal, Sea Ray, Tigé, Chaparral, Jeanneau, Beneteau, Moomba…" },
              { q: "Quelle est la différence entre un hivernage actif et passif ?", a: "L'hivernage passif (le nôtre, sous hangar) est un arrêt total idéal pour les hivers rudes : vidanges, mise au sec, préservation. L'hivernage actif (moteur qui tourne à quai) est risqué face aux hivers glacials de Haute-Savoie." },
              { q: "Gérez-vous la récupération de mon bateau au port ?", a: "Oui. Nous nous déplaçons à votre place de port (Annecy, Sevrier, Saint-Jorioz, Talloires, Veyrier, Thonon, Évian) avec remorques adaptées ou camion de grutage." },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'entretien',
    label: 'Service — Entretien & réparation',
    path: '/entretien-reparation',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: '/images/services/entretien.webp' },
          { key: 'hero.title', label: 'Titre (vide = version stylée)', type: 'text', default: 'Entretien et réparation de bateaux à Annecy' },
          { key: 'hero.subtitle', label: 'Sous-titre (vide = version stylée)', type: 'textarea', default: 'De la révision moteur aux travaux de carrosserie, MotorBoat 74 garantit performance, sécurité et longévité à votre bateau. Interventions rapides et soignées, en atelier ou sur place.' },
        ],
      },
      {
        title: 'Section « En bref »',
        fields: [
          { key: 'bref.lead', label: 'Accroche (vide = version stylée)', type: 'textarea', default: "MotorBoat 74 assure l'entretien et la réparation de bateaux à Annecy et en Haute-Savoie." },
          { key: 'bref.desc', label: 'Description', type: 'textarea', default: "Révision moteur (hors-bord et in-board, toutes marques), réparation, travaux de carrosserie, peinture, gel-coat et pose d'accastillage : notre atelier prend en charge votre bateau de A à Z, sur place ou en atelier, pour une navigation sûre et performante." },
          {
            key: 'bref.facts', label: 'Faits clés', type: 'list', itemLabel: 'Fait',
            itemFields: [{ key: 'k', label: 'Intitulé', type: 'text' }, { key: 'v', label: 'Valeur', type: 'text' }],
            defaultList: [
              { k: 'Mécanique', v: 'Révision moteur & réparation' },
              { k: 'Carrosserie', v: 'Gel-coat, peinture, structure' },
              { k: 'Accastillage', v: 'Pose & personnalisation' },
              { k: 'Moteurs', v: 'Hors-bord & in-board, toutes marques' },
              { k: 'Bateaux', v: 'Plaisance, ski, wakeboard, voiliers' },
              { k: 'Zone', v: 'Annecy & Haute-Savoie' },
            ],
          },
        ],
      },
      {
        title: 'Section « Pourquoi un entretien régulier »',
        fields: [
          { key: 'why.eyebrow', label: 'Sur-titre', type: 'text', default: 'Préserver votre bateau' },
          { key: 'why.title', label: 'Titre (vide = version stylée)', type: 'text', default: 'Pourquoi un entretien régulier est essentiel' },
          { key: 'why.intro', label: 'Introduction', type: 'textarea', default: "Un bateau entretenu, c'est une navigation sereine et un investissement protégé. Un suivi régulier évite les pannes coûteuses et préserve la valeur de votre embarcation, saison après saison." },
          {
            key: 'why.cards', label: 'Avantages', type: 'list', itemLabel: 'Avantage',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }],
            defaultList: [
              { t: 'Sécurité à bord', d: 'Moteur, circuits et équipements contrôlés pour naviguer en toute confiance sur le lac.' },
              { t: 'Performance optimale', d: 'Un entretien suivi garantit puissance, fiabilité et consommation maîtrisée.' },
              { t: 'Longévité du bateau', d: 'Prévenir l’usure prolonge la durée de vie de votre moteur et de votre coque.' },
              { t: 'Valeur de revente', d: 'Un carnet d’entretien à jour rassure les acheteurs et valorise votre bateau.' },
            ],
          },
        ],
      },
      {
        title: 'Section « Nos prestations »',
        fields: [
          { key: 'services.eyebrow', label: 'Sur-titre', type: 'text', default: 'Mécanique & carrosserie' },
          { key: 'services.title', label: 'Titre', type: 'text', default: "Nos prestations d'entretien et de réparation" },
          {
            key: 'services.items', label: 'Prestations', type: 'list', itemLabel: 'Prestation',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'items', label: 'Sous-éléments (séparés par | )', type: 'text' }],
            defaultList: [
              { t: 'Révision moteur & entretien', items: 'Vidange et huile|Contrôle des systèmes|Diagnostic électronique' },
              { t: 'Réparation', items: 'Remplacement de pièces|Réparation rapide|Préparation à la saison' },
              { t: 'Carrosserie & peinture', items: 'Reprise de gel-coat|Peinture & finitions|Réparations structurelles' },
              { t: 'Accastillage & personnalisation', items: 'Pose d’accessoires|Améliorations esthétiques|Optimisations fonctionnelles' },
            ],
          },
        ],
      },
      {
        title: 'Section « Déroulement »',
        fields: [
          { key: 'process.eyebrow', label: 'Sur-titre', type: 'text', default: 'Simple et transparent' },
          { key: 'process.title', label: 'Titre', type: 'text', default: 'Comment se déroule votre entretien' },
          {
            key: 'process.steps', label: 'Étapes', type: 'list', itemLabel: 'Étape',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }],
            defaultList: [
              { t: 'Prise de contact', d: 'Vous nous décrivez votre bateau et votre besoin, par téléphone ou via le formulaire.' },
              { t: 'Diagnostic', d: 'Nos techniciens inspectent le moteur, la coque et les équipements.' },
              { t: 'Devis gratuit', d: 'Vous recevez un devis clair et détaillé, sans engagement.' },
              { t: 'Intervention', d: 'Travaux réalisés en atelier ou sur place, avec des pièces de qualité.' },
              { t: 'Restitution', d: 'Contrôle final et bateau prêt à naviguer, en toute sérénité.' },
            ],
          },
        ],
      },
      {
        title: 'Section « Zone d\'intervention »',
        fields: [
          { key: 'zones.eyebrow', label: 'Sur-titre', type: 'text', default: "Zone d'intervention" },
          { key: 'zones.title', label: 'Titre', type: 'text', default: "En atelier près d'Annecy ou sur place" },
          { key: 'zones.intro', label: 'Introduction', type: 'textarea', default: "Notre atelier est situé à Saint-Ferréol, à 20 minutes d'Annecy. Nous intervenons aussi directement sur votre bateau, autour du lac d'Annecy, du Léman, du lac du Bourget et dans toute la Haute-Savoie." },
          {
            key: 'zones.items', label: 'Zones (badges)', type: 'list', itemLabel: 'Zone',
            itemFields: [{ key: 'name', label: 'Nom', type: 'text' }],
            defaultList: [{ name: 'Atelier, Saint-Ferréol' }, { name: 'Annecy & lac d’Annecy' }, { name: 'Lac du Bourget' }, { name: 'Léman' }, { name: 'Haute-Savoie' }],
          },
        ],
      },
      {
        title: 'FAQ',
        fields: [
          {
            key: 'faq.items', label: 'Questions / réponses', type: 'list', itemLabel: 'Question',
            itemFields: [{ key: 'q', label: 'Question', type: 'text' }, { key: 'a', label: 'Réponse', type: 'textarea' }],
            defaultList: [
              { q: 'Quels services proposez-vous pour l’entretien des bateaux ?', a: 'Vidange moteur, contrôle des circuits d’eau et de carburant, révision des équipements électriques, nettoyage intérieur/extérieur, polissage de la coque et maintenance des accessoires.' },
              { q: 'Comment savoir si mon moteur a besoin d’une révision ?', a: 'Signes d’alerte : bruit anormal, perte de puissance, fumée excessive, surconsommation de carburant. Nous réalisons un diagnostic complet pour identifier tout problème.' },
              { q: 'Réparez-vous les coques et carènes endommagées ?', a: 'Oui. Nous réparons fissures, rayures, éclats de gel-coat et tout dommage sur la coque pour garantir l’étanchéité et la sécurité.' },
              { q: 'Proposez-vous un entretien hivernal complet ?', a: 'Oui : vidange, protection moteur, nettoyage et stockage sécurisé. Nous avons un service d’hivernage et de stockage dédié.' },
              { q: 'Combien coûte une révision ou une réparation ?', a: 'Le coût dépend de la prestation, de la taille du bateau et des pièces nécessaires. Nous établissons un devis gratuit et personnalisé.' },
              { q: 'Sur quels types de bateaux intervenez-vous ?', a: 'Sur tous types de bateaux de plaisance, ski nautique, wakeboard, voiliers et hors-bords, avec ou sans remorque.' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'depannage',
    label: 'Service — Dépannage',
    path: '/depannage',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: '/images/services/depannage.webp' },
          { key: 'hero.title', label: 'Titre (vide = version stylée)', type: 'text', default: "Dépannage de bateau sur le Lac d'Annecy · 7j/7 en saison" },
          { key: 'hero.subtitle', label: 'Sous-titre (vide = version stylée)', type: 'textarea', default: "Une panne sur l'eau ? Chaque minute compte. En Haute-Savoie, MotorBoat 74 intervient rapidement avec un bateau-atelier équipé pour vous remettre en sécurité et reprendre la navigation." },
          {
            key: 'hero.usps', label: 'Points forts (bannière)', type: 'list', itemLabel: 'Point fort',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'text' }],
            defaultList: [{ t: '7j/7', d: 'Équipe mobilisée en haute saison (8h–20h).' }, { t: "Lac d'Annecy", d: 'Expertise locale du plan d’eau et de ses ports.' }],
          },
        ],
      },
      {
        title: 'Section « En bref »',
        fields: [
          { key: 'bref.lead', label: 'Accroche (vide = version stylée)', type: 'textarea', default: "MotorBoat 74 assure le dépannage de bateau sur le lac d'Annecy, 7j/7 en saison, avec un bateau-atelier équipé." },
          { key: 'bref.desc', label: 'Description', type: 'textarea', default: "En cas de panne moteur, électrique ou d'immobilisation sur l'eau, nous intervenons généralement sous 30 à 60 minutes pour réparer directement à flot. Si nécessaire, nous sécurisons et remorquons votre bateau jusqu'à notre atelier ou au port le plus proche." },
          {
            key: 'bref.facts', label: 'Faits clés', type: 'list', itemLabel: 'Fait',
            itemFields: [{ key: 'k', label: 'Intitulé', type: 'text' }, { key: 'v', label: 'Valeur', type: 'text' }],
            defaultList: [
              { k: 'Délai', v: '30 à 60 min sur le lac d’Annecy' }, { k: 'Disponibilité', v: '7j/7 en haute saison (8h–20h)' },
              { k: 'Sur l’eau', v: 'Réparation à flot (bateau-atelier)' }, { k: 'Si besoin', v: 'Remorquage atelier / port' },
              { k: 'Marques', v: 'Toutes marques de bateaux' }, { k: 'Zone', v: 'Lac d’Annecy et communes riveraines' },
            ],
          },
        ],
      },
      {
        title: 'Section « Pannes fréquentes »',
        fields: [
          { key: 'why.eyebrow', label: 'Sur-titre', type: 'text', default: 'Pannes fréquentes' },
          { key: 'why.title', label: 'Titre (vide = version stylée)', type: 'text', default: 'Les pannes que nous traitons en urgence sur le lac' },
          { key: 'why.intro', label: 'Introduction', type: 'textarea', default: "Une immobilisation sur l'eau est toujours stressante, parfois dangereuse. Notre rôle : vous remettre en sécurité au plus vite, puis réparer, sur place quand c'est possible, à l'atelier pour les pannes lourdes." },
          {
            key: 'why.cards', label: 'Pannes', type: 'list', itemLabel: 'Panne',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }, { key: 'fix', label: 'Résolution', type: 'text' }],
            defaultList: [
              { t: 'Panne moteur', d: 'Refus de démarrage, surchauffe, perte de puissance hors-bord ou in-board.', fix: 'Diagnostic & réparation à flot' },
              { t: 'Panne électrique', d: 'Batterie déchargée, alternateur HS, coupure d’allumage ou d’électronique.', fix: 'Contrôle batterie / alternateur' },
              { t: 'Hélice & propulsion', d: 'Hélice endommagée, transmission bloquée, prise dans un obstacle.', fix: 'Dégagement & remise en état' },
              { t: 'Bateau immobilisé', d: 'Échouement, dérive ou impossibilité de rejoindre le port par vos moyens.', fix: 'Sécurisation & remorquage' },
            ],
          },
        ],
      },
      {
        title: 'Section « Déroulement »',
        fields: [
          { key: 'process.eyebrow', label: 'Sur-titre', type: 'text', default: 'Comment ça marche' },
          { key: 'process.title', label: 'Titre', type: 'text', default: 'Comment se déroule un dépannage' },
          {
            key: 'process.steps', label: 'Étapes', type: 'list', itemLabel: 'Étape',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }],
            defaultList: [
              { t: 'Votre appel d’urgence', d: 'Vous nous appelez ou remplissez le formulaire. On identifie immédiatement le type de panne et votre position sur le lac.' },
              { t: 'Localisation & départ', d: 'Notre technicien localise votre embarcation et part vers vous avec le bateau-atelier équipé.' },
              { t: 'Intervention sur l’eau', d: 'Diagnostic et réparation directement à flot quand c’est possible : moteur, batterie, circuit électrique, hélice.' },
              { t: 'Remorquage si besoin', d: 'Pour une panne majeure, nous sécurisons et remorquons votre bateau jusqu’à notre atelier ou au port le plus proche.' },
              { t: 'Remise en route', d: 'Contrôle final, vérification de sécurité et reprise de la navigation, ou prise en charge atelier pour les réparations lourdes.' },
            ],
          },
        ],
      },
      {
        title: 'Section « Nos services de dépannage »',
        fields: [
          { key: 'services.eyebrow', label: 'Sur-titre', type: 'text', default: 'Intervention sur l’eau' },
          { key: 'services.title', label: 'Titre', type: 'text', default: 'Nos services de dépannage' },
          {
            key: 'services.items', label: 'Services', type: 'list', itemLabel: 'Service',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'items', label: 'Sous-éléments (séparés par | )', type: 'text' }],
            defaultList: [
              { t: 'Mécanique', items: 'Moteurs hors-bord & in-board|Propulsion & transmission|Diagnostic électronique' },
              { t: 'Électrique', items: 'Batteries & alternateurs|Diagnostic des circuits|Remplacement de composants' },
              { t: 'Remorquage', items: 'Vers l’atelier ou un port|Aide mise à l’eau / sortie|Sécurisation panne majeure' },
            ],
          },
        ],
      },
      {
        title: 'Section « Zone d\'intervention »',
        fields: [
          { key: 'zones.eyebrow', label: 'Sur-titre', type: 'text', default: "Zone d'intervention" },
          { key: 'zones.title', label: 'Titre', type: 'text', default: "Nous intervenons sur tout le lac d'Annecy" },
          { key: 'zones.intro', label: 'Introduction (vide = version stylée)', type: 'textarea', default: "Notre bateau-atelier dépanne les bateaux sur l'ensemble du lac d'Annecy : d'Annecy à Doussard, en passant par Annecy-le-Vieux, Veyrier-du-Lac, Menthon-Saint-Bernard, Talloires-Montmin, Duingt, Saint-Jorioz et Sevrier. Sur le Léman ou le lac du Bourget, contactez-nous." },
          {
            key: 'zones.items', label: 'Communes', type: 'list', itemLabel: 'Commune',
            itemFields: [{ key: 'name', label: 'Nom', type: 'text' }, { key: 'desc', label: 'Description', type: 'textarea' }],
            defaultList: [
              { name: 'Annecy', desc: 'Au cœur de la ville, port de l’Évêché, Marquisats et canal du Vassé : nous rejoignons votre bateau en quelques minutes.' },
              { name: 'Annecy-le-Vieux', desc: 'Plage et port d’Albigny : prise en charge rapide sur toute la rive nord-est du lac.' },
              { name: 'Veyrier-du-Lac', desc: 'Port de Veyrier et rive est, au pied du Mont Veyrier : un secteur que nous connaissons parfaitement.' },
              { name: 'Menthon-Saint-Bernard', desc: 'Petit port sous le château de Menthon, à l’accès délicat : nous y intervenons en sécurité.' },
              { name: 'Talloires-Montmin', desc: 'Baie de Talloires et ses roselières, peu profonde par endroits : nous adaptons l’approche.' },
              { name: 'Duingt', desc: 'Défilé de Duingt, passage étroit entre grand et petit lac : un secteur que nous maîtrisons.' },
              { name: 'Saint-Jorioz', desc: 'Grande plage et roselières de la rive ouest : dépannage et assistance sur tout le secteur.' },
              { name: 'Sevrier', desc: 'Port de Sevrier, rive ouest : à quelques minutes de notre base, un délai parmi les plus courts.' },
              { name: 'Doussard', desc: 'Bout du lac et réserve naturelle : zone sud peu profonde où nous intervenons avec précaution.' },
            ],
          },
        ],
      },
      {
        title: 'FAQ',
        fields: [
          {
            key: 'faq.items', label: 'Questions / réponses', type: 'list', itemLabel: 'Question',
            itemFields: [{ key: 'q', label: 'Question', type: 'text' }, { key: 'a', label: 'Réponse', type: 'textarea' }],
            defaultList: [
              { q: 'Combien de temps faut-il pour qu’un technicien arrive sur le lac d’Annecy ?', a: 'Notre équipe intervient généralement sous 30 à 60 minutes selon votre localisation et la période. En haute saison, nous sommes mobilisés 7j/7 pour réduire le délai.' },
              { q: 'Quels types de bateaux pouvez-vous dépanner ?', a: 'Tous types d’embarcations : moteurs hors-bord et in-board, runabouts, wakeboats, pneumatiques et semi-rigides. Nos techniciens interviennent sur la plupart des marques.' },
              { q: 'Proposez-vous le remorquage ?', a: 'Oui. Lorsque la panne ne peut pas être résolue à flot, nous sécurisons votre bateau et le remorquons jusqu’à notre atelier ou au port le plus proche.' },
              { q: 'Quels sont vos horaires d’intervention ?', a: 'Nous intervenons 7j/7 en période estivale, de 8h00 à 20h00. En cas d’urgence hors de ces horaires, contactez-nous : nous faisons notre maximum.' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'transport',
    label: 'Service — Transport',
    path: '/transport',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: '/images/services/transport.webp' },
          { key: 'hero.title', label: 'Titre (vide = version stylée)', type: 'text', default: 'Transport de bateau en France et en Europe' },
          { key: 'hero.subtitle', label: 'Sous-titre (vide = version stylée)', type: 'textarea', default: 'Achat, vente ou simple déplacement ? MotorBoat 74 assure le convoyage sécurisé de votre bateau, avec véhicules et remorques adaptés, partout en France et en Europe.' },
          {
            key: 'hero.usps', label: 'Points forts (bannière)', type: 'list', itemLabel: 'Point fort',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'text' }],
            defaultList: [{ t: 'France & Europe', d: 'Convoyage partout en France et en Europe.' }, { t: 'Assurance pro', d: 'Bateau couvert du chargement à la livraison.' }],
          },
        ],
      },
      {
        title: 'Section « En bref »',
        fields: [
          { key: 'bref.lead', label: 'Accroche (vide = version stylée)', type: 'textarea', default: 'MotorBoat 74 assure le transport de bateau partout en France et en Europe.' },
          { key: 'bref.desc', label: 'Description', type: 'textarea', default: "Service clé en main pour un achat, une vente, une mise à l'eau ou un transfert entre ports : nous chargeons, arrimons et convoyons votre bateau en toute sécurité grâce à des véhicules et remorques adaptés, avec assurance professionnelle." },
          {
            key: 'bref.facts', label: 'Faits clés', type: 'list', itemLabel: 'Fait',
            itemFields: [{ key: 'k', label: 'Intitulé', type: 'text' }, { key: 'v', label: 'Valeur', type: 'text' }],
            defaultList: [
              { k: 'Couverture', v: 'France entière & Europe' }, { k: 'Assurance', v: 'Pro, du chargement à la livraison' },
              { k: 'Matériel', v: 'Remorques adaptées à chaque bateau' }, { k: 'Convoyage', v: 'Arrimage soigné & contrôle' },
              { k: 'Bateaux', v: 'Toutes tailles & catégories' }, { k: 'Devis', v: 'Personnalisé sur demande' },
            ],
          },
        ],
      },
      {
        title: 'Section « Vos garanties »',
        fields: [
          { key: 'why.eyebrow', label: 'Sur-titre', type: 'text', default: 'Vos garanties' },
          { key: 'why.title', label: 'Titre (vide = version stylée)', type: 'text', default: 'Un transport sûr et sans souci' },
          { key: 'why.intro', label: 'Introduction', type: 'textarea', default: "Votre bateau est un bien précieux : nous le traitons comme tel, du chargement jusqu'à la remise en main, partout en France et en Europe." },
          {
            key: 'why.cards', label: 'Garanties', type: 'list', itemLabel: 'Garantie',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }],
            defaultList: [
              { t: 'Assurance professionnelle', d: 'Votre bateau est couvert durant le chargement, le convoyage et la livraison.' },
              { t: 'Remorques adaptées', d: 'Du semi-rigide au runabout, un matériel dimensionné pour chaque embarcation.' },
              { t: 'Partout en Europe', d: 'France, Suisse, Italie, Espagne, Allemagne… nous nous déplaçons sur demande.' },
              { t: 'Convoyage soigné', d: 'Arrimage minutieux et contrôle complet avant remise en main.' },
            ],
          },
        ],
      },
      {
        title: 'Section « Prestations »',
        fields: [
          { key: 'services.eyebrow', label: 'Sur-titre', type: 'text', default: 'Service clé en main' },
          { key: 'services.title', label: 'Titre', type: 'text', default: 'Quand faire appel à notre service de transport' },
          {
            key: 'services.items', label: 'Prestations', type: 'list', itemLabel: 'Prestation',
            itemFields: [{ key: 'name', label: 'Intitulé', type: 'text' }],
            defaultList: [
              { name: 'Transport après achat ou vente de bateau' }, { name: 'Déplacement vers un chantier naval ou un atelier de réparation' },
              { name: 'Livraison sur lac ou en mer' }, { name: 'Transfert entre ports ou lieux de stockage' },
              { name: 'Convoyage de bateaux de toutes tailles et catégories' },
            ],
          },
        ],
      },
      {
        title: 'Section « Déroulement »',
        fields: [
          { key: 'process.eyebrow', label: 'Sur-titre', type: 'text', default: 'Étape par étape' },
          { key: 'process.title', label: 'Titre', type: 'text', default: 'Comment se déroule le transport' },
          {
            key: 'process.steps', label: 'Étapes', type: 'list', itemLabel: 'Étape',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }],
            defaultList: [
              { t: 'Demande de devis', d: 'Vous remplissez notre formulaire pour obtenir un tarif personnalisé.' },
              { t: 'Planification du trajet', d: 'Nous organisons l’itinéraire selon vos disponibilités et vos besoins.' },
              { t: 'Chargement sécurisé', d: 'Votre bateau est arrimé et protégé avec le plus grand soin.' },
              { t: 'Transport & livraison', d: 'Nous acheminons votre navire dans les délais fixés ensemble.' },
              { t: 'Vérification & remise en main', d: 'Contrôle complet avant de vous restituer votre bateau en parfait état.' },
            ],
          },
        ],
      },
      {
        title: 'Section « Où nous intervenons »',
        fields: [
          { key: 'zones.eyebrow', label: 'Sur-titre', type: 'text', default: 'Où nous intervenons' },
          { key: 'zones.title', label: 'Titre', type: 'text', default: "De la Haute-Savoie à toute l'Europe" },
          { key: 'zones.intro', label: 'Introduction', type: 'textarea', default: "Basés près d'Annecy, nous convoyons votre bateau depuis les lacs alpins vers n'importe quelle destination en France et en Europe, et inversement." },
          {
            key: 'zones.items', label: 'Zones (badges)', type: 'list', itemLabel: 'Zone',
            itemFields: [{ key: 'name', label: 'Nom', type: 'text' }],
            defaultList: [
              { name: 'France entière' }, { name: 'Lacs alpins (Annecy, Léman, Bourget)' }, { name: 'Côtes méditerranéennes & atlantiques' },
              { name: 'Suisse' }, { name: 'Italie' }, { name: 'Espagne' }, { name: 'Allemagne' },
            ],
          },
        ],
      },
      {
        title: 'FAQ',
        fields: [
          {
            key: 'faq.items', label: 'Questions / réponses', type: 'list', itemLabel: 'Question',
            itemFields: [{ key: 'q', label: 'Question', type: 'text' }, { key: 'a', label: 'Réponse', type: 'textarea' }],
            defaultList: [
              { q: 'Quel est le prix pour transporter un bateau ?', a: 'Le prix dépend de la distance, de la taille et du poids de l’embarcation, de la zone (France ou Europe) et du type de service. Remplissez notre formulaire pour un devis précis.' },
              { q: 'Transportez-vous des bateaux partout en France ?', a: 'Oui, dans toute la France : des lacs alpins jusqu’aux côtes méditerranéennes et atlantiques. Nous intervenons aussi en Suisse, Italie, Espagne, Allemagne sur demande.' },
              { q: 'Quels types de bateaux pouvez-vous transporter ?', a: 'Wakeboard, wakesurf, ski nautique, semi-rigides, coques open, petits voiliers et jet-skis. Nos remorques adaptées garantissent un convoyage sécurisé.' },
              { q: 'Le transport est-il assuré ?', a: 'Oui, tous nos transports sont couverts par une assurance professionnelle protégeant votre bateau contre les dommages durant le chargement, le convoyage et la livraison.' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'sellerie',
    label: 'Service — Sellerie',
    path: '/sellerie',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: '/images/services/sellerie.webp' },
          { key: 'hero.title', label: 'Titre (vide = version stylée)', type: 'text', default: 'Sellerie de bateau sur mesure · confection & rénovation' },
          { key: 'hero.subtitle', label: 'Sous-titre (vide = version stylée)', type: 'textarea', default: "Rénover l'intérieur de votre bateau ou remplacer une sellerie usée ? De la conception à la pose, MotorBoat 74 et ses artisans partenaires redonnent confort, style et protection à votre bateau." },
          {
            key: 'hero.usps', label: 'Points forts (bannière)', type: 'list', itemLabel: 'Point fort',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'text' }],
            defaultList: [{ t: 'Sur mesure', d: 'Confection artisanale ajustée à votre bateau.' }, { t: 'Anti-UV & humidité', d: 'Matériaux marins traités pour durer.' }],
          },
        ],
      },
      {
        title: 'Section « En bref »',
        fields: [
          { key: 'bref.lead', label: 'Accroche (vide = version stylée)', type: 'textarea', default: 'MotorBoat 74 réalise la sellerie de bateau sur mesure à Annecy : confection, réparation et rénovation complète.' },
          { key: 'bref.desc', label: 'Description', type: 'textarea', default: "En partenariat avec des artisans spécialisés, nous fabriquons coussins et assises personnalisés, réparons la sellerie abîmée et rénovons l'intérieur de votre bateau, avec des matériaux marins résistants aux UV et à l'humidité. La pose est réalisée et ajustée directement à bord." },
          {
            key: 'bref.facts', label: 'Faits clés', type: 'list', itemLabel: 'Fait',
            itemFields: [{ key: 'k', label: 'Intitulé', type: 'text' }, { key: 'v', label: 'Valeur', type: 'text' }],
            defaultList: [
              { k: 'Confection', v: 'Sur mesure, coloris & matières au choix' }, { k: 'Réparation', v: 'Remplacement de sellerie abîmée' },
              { k: 'Rénovation', v: 'Remise à neuf complète de l’intérieur' }, { k: 'Matériaux', v: 'Marins, anti-UV et anti-humidité' },
              { k: 'Bateaux', v: 'Du loisir au yacht haut de gamme' }, { k: 'Zone', v: 'Annecy & Haute-Savoie' },
            ],
          },
        ],
      },
      {
        title: 'Section « Signes d\'usure »',
        fields: [
          { key: 'why.eyebrow', label: 'Sur-titre', type: 'text', default: "Signes d'usure" },
          { key: 'why.title', label: 'Titre (vide = version stylée)', type: 'text', default: 'Quand refaire la sellerie de son bateau ?' },
          { key: 'why.intro', label: 'Introduction', type: 'textarea', default: 'Soleil alpin, embruns et usage répété fatiguent la sellerie au fil des saisons. Voici les signes qui doivent vous alerter, et la solution que nous apportons.' },
          {
            key: 'why.cards', label: 'Signes', type: 'list', itemLabel: 'Signe',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }, { key: 'fix', label: 'Solution', type: 'text' }],
            defaultList: [
              { t: 'Mousses affaissées', d: 'Assises qui ne tiennent plus, perte de confort et de maintien au fil des saisons.', fix: 'Remplacement des mousses' },
              { t: 'Tissus abîmés', d: 'Skaï craquelé, coutures qui lâchent, fermetures défaillantes.', fix: 'Réfection sur mesure' },
              { t: 'Couleurs ternies par les UV', d: 'Le soleil alpin durcit et décolore les revêtements au fil du temps.', fix: 'Finitions anti-UV' },
              { t: 'Humidité & moisissures', d: 'Taches, odeurs et moisissures dues aux embruns et à la condensation.', fix: 'Matériaux traités anti-humidité' },
            ],
          },
        ],
      },
      {
        title: 'Section « Déroulement »',
        fields: [
          { key: 'process.eyebrow', label: 'Sur-titre', type: 'text', default: 'De la conception à la pose' },
          { key: 'process.title', label: 'Titre', type: 'text', default: 'Comment se déroule un projet de sellerie' },
          {
            key: 'process.steps', label: 'Étapes', type: 'list', itemLabel: 'Étape',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }],
            defaultList: [
              { t: 'Diagnostic & devis', d: 'On étudie votre sellerie existante, vos usages et vos envies, puis on établit un devis personnalisé et gratuit.' },
              { t: 'Choix des matières & coloris', d: 'Vous sélectionnez tissus marins, mousses et coloris parmi un large choix, avec nos conseils.' },
              { t: 'Confection sur mesure', d: 'Nos artisans partenaires fabriquent coussins et assises ajustés au millimètre à votre bateau.' },
              { t: 'Pose & ajustement à bord', d: 'Installation directe sur votre bateau, avec les ajustements esthétiques et fonctionnels nécessaires.' },
              { t: 'Contrôle & finitions', d: 'Vérification du rendu, des coutures et du confort avant la restitution de votre bateau.' },
            ],
          },
        ],
      },
      {
        title: 'Section « Nos services »',
        fields: [
          { key: 'services.eyebrow', label: 'Sur-titre', type: 'text', default: 'Savoir-faire artisanal' },
          { key: 'services.title', label: 'Titre', type: 'text', default: 'Nos services de sellerie' },
          {
            key: 'services.items', label: 'Services', type: 'list', itemLabel: 'Service',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }],
            defaultList: [
              { t: 'Confection sur mesure', d: 'Coussins et assises fabriqués pour votre bateau, entièrement personnalisables en coloris et matières.' },
              { t: 'Réparation & remplacement', d: 'Réparation ou remplacement de la sellerie abîmée, avec des ajustements précis pour un confort durable.' },
              { t: 'Rénovation complète', d: 'Remise à neuf de tout l’intérieur, en protégeant les matériaux contre l’humidité et les rayons UV.' },
            ],
          },
        ],
      },
      {
        title: 'Section « Bénéfices »',
        fields: [
          { key: 'benefits.eyebrow', label: 'Sur-titre', type: 'text', default: 'Pourquoi nous confier votre sellerie' },
          { key: 'benefits.title', label: 'Titre', type: 'text', default: 'Confort, style et durabilité' },
          {
            key: 'benefits.items', label: 'Bénéfices', type: 'list', itemLabel: 'Bénéfice',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }],
            defaultList: [
              { t: 'Confort retrouvé', d: 'Des assises refaites pour profiter pleinement de vos sorties.' },
              { t: 'Matériaux de qualité', d: 'Tissus marins et mousses sélectionnés pour durer dans le temps.' },
              { t: 'Protection UV & humidité', d: 'Des finitions qui résistent au soleil alpin et aux embruns.' },
              { t: 'Finition artisanale', d: 'Le souci du détail d’artisans spécialisés, pour un rendu impeccable.' },
            ],
          },
        ],
      },
      {
        title: 'Section « Zone d\'intervention »',
        fields: [
          { key: 'zones.eyebrow', label: 'Sur-titre', type: 'text', default: "Zone d'intervention" },
          { key: 'zones.title', label: 'Titre', type: 'text', default: 'Sellerie de bateau en Haute-Savoie et autour des lacs' },
          { key: 'zones.intro', label: 'Introduction', type: 'textarea', default: "Basés près d'Annecy, nous intervenons autour du lac d'Annecy, du Léman, du lac du Bourget et dans toute la Haute-Savoie." },
          {
            key: 'zones.items', label: 'Zones (badges)', type: 'list', itemLabel: 'Zone',
            itemFields: [{ key: 'name', label: 'Nom', type: 'text' }],
            defaultList: [{ name: 'Annecy' }, { name: 'Aix-les-Bains' }, { name: 'Thonon-les-Bains' }, { name: 'Évian-les-Bains' }, { name: 'Genève' }, { name: 'Lac de Serre-Ponçon' }],
          },
        ],
      },
      {
        title: 'FAQ',
        fields: [
          {
            key: 'faq.items', label: 'Questions / réponses', type: 'list', itemLabel: 'Question',
            itemFields: [{ key: 'q', label: 'Question', type: 'text' }, { key: 'a', label: 'Réponse', type: 'textarea' }],
            defaultList: [
              { q: 'Quel type de bateaux pouvez-vous équiper ?', a: 'Nous intervenons sur tous types de bateaux, des petites embarcations de loisir aux yachts haut de gamme, en adaptant la sellerie à chaque taille et configuration.' },
              { q: 'Combien de temps prend une rénovation de sellerie ?', a: 'Selon l’ampleur du projet, la rénovation complète peut durer de quelques jours à quelques semaines. Un devis précis vous est fourni après étude.' },
              { q: 'Installez-vous la sellerie directement sur le bateau ?', a: 'Oui, notre équipe effectue l’installation directement sur votre bateau et ajuste chaque élément pour garantir confort et rendu esthétique parfait.' },
              { q: 'Proposez-vous une protection contre l’humidité et les UV ?', a: 'Absolument. Nos matériaux et finitions sont sélectionnés pour résister à l’humidité, aux UV et aux conditions nautiques.' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'remorques',
    label: 'Service — Remorques',
    path: '/remorques',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: '/images/services/remorques.webp' },
          { key: 'hero.title', label: 'Titre (vide = version stylée)', type: 'text', default: 'Remorques de bateau sur mesure' },
          { key: 'hero.subtitle', label: 'Sous-titre (vide = version stylée)', type: 'textarea', default: 'Trouvez la remorque parfaite pour transporter votre bateau en toute sécurité. MotorBoat 74 sélectionne, règle et prépare une remorque homologuée CE, parfaitement adaptée à votre embarcation.' },
          {
            key: 'hero.usps', label: 'Points forts (bannière)', type: 'list', itemLabel: 'Point fort',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'text' }],
            defaultList: [{ t: 'Homologuées CE', d: 'Des remorques fiables et conformes.' }, { t: 'Sur mesure', d: 'Dimensionnée selon votre bateau.' }],
          },
        ],
      },
      {
        title: 'Section « En bref »',
        fields: [
          { key: 'bref.lead', label: 'Accroche (vide = version stylée)', type: 'textarea', default: 'MotorBoat 74 propose des remorques de bateau sur mesure à Annecy et en Haute-Savoie.' },
          { key: 'bref.desc', label: 'Description', type: 'textarea', default: "Remorques homologuées CE, simples ou doubles essieux freinées, adaptées au wake, à la pêche ou au ski nautique. Nous sélectionnons le modèle dimensionné à votre bateau parmi nos marques partenaires, et nous l'ajustons, prête à l'emploi." },
          {
            key: 'bref.facts', label: 'Faits clés', type: 'list', itemLabel: 'Fait',
            itemFields: [{ key: 'k', label: 'Intitulé', type: 'text' }, { key: 'v', label: 'Valeur', type: 'text' }],
            defaultList: [
              { k: 'Homologation', v: 'Norme CE' }, { k: 'Sur mesure', v: 'Selon taille & poids du bateau' },
              { k: 'Marques', v: 'Partenaires reconnues' }, { k: 'Prête à l’emploi', v: 'Réglage & mise à l’eau' },
              { k: 'Usages', v: 'Wake, pêche, ski nautique' }, { k: 'Zone', v: 'Annecy & Haute-Savoie' },
            ],
          },
        ],
      },
      {
        title: 'Section « Pourquoi choisir »',
        fields: [
          { key: 'why.eyebrow', label: 'Sur-titre', type: 'text', default: "Voyagez l'esprit tranquille" },
          { key: 'why.title', label: 'Titre (vide = version stylée)', type: 'text', default: 'Pourquoi choisir votre remorque chez nous' },
          { key: 'why.intro', label: 'Introduction', type: 'textarea', default: "Une remorque bien choisie et bien réglée, c'est la garantie d'un transport sûr, et d'un bateau qui reste en parfait état sur la route comme à la mise à l'eau." },
          {
            key: 'why.cards', label: 'Atouts', type: 'list', itemLabel: 'Atout',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }],
            defaultList: [
              { t: 'Sécurité avant tout', d: 'Des remorques fiables et homologuées CE pour transporter sereinement.' },
              { t: 'Parfaitement adaptée', d: 'Dimensionnée selon la taille et le poids exact de votre bateau.' },
              { t: 'Marques partenaires', d: 'Une sélection de fabricants reconnus pour leur durabilité.' },
              { t: 'Prête à l’emploi', d: 'Réglage, contrôle et conseils de mise à l’eau inclus.' },
            ],
          },
        ],
      },
      {
        title: 'Section « Caractéristiques »',
        fields: [
          { key: 'services.eyebrow', label: 'Sur-titre', type: 'text', default: 'La remorque qu’il vous faut' },
          { key: 'services.title', label: 'Titre', type: 'text', default: 'Des remorques adaptées à chaque bateau' },
          {
            key: 'services.items', label: 'Caractéristiques', type: 'list', itemLabel: 'Caractéristique',
            itemFields: [{ key: 'name', label: 'Intitulé', type: 'text' }],
            defaultList: [
              { name: 'Remorques simples ou doubles essieux, freinées' }, { name: 'Adaptées wake, pêche, ski nautique' },
              { name: 'Homologation CE' }, { name: 'Réglage et mise à l’eau inclus' },
            ],
          },
        ],
      },
      {
        title: 'Section « Déroulement »',
        fields: [
          { key: 'process.eyebrow', label: 'Sur-titre', type: 'text', default: 'Du conseil à la mise à l’eau' },
          { key: 'process.title', label: 'Titre', type: 'text', default: 'Comment on choisit votre remorque' },
          {
            key: 'process.steps', label: 'Étapes', type: 'list', itemLabel: 'Étape',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }],
            defaultList: [
              { t: 'Conseil personnalisé', d: 'On étudie votre bateau, vos trajets et votre fréquence d’utilisation pour cibler la bonne remorque.' },
              { t: 'Sélection de la remorque', d: 'Nous choisissons le modèle adapté parmi nos marques partenaires, dimensionné à votre embarcation.' },
              { t: 'Réglage & contrôle', d: 'Réglage des supports, vérification des feux, freins et organes de sécurité avant remise.' },
              { t: 'Retrait ou livraison', d: 'Vous récupérez votre remorque prête à l’emploi, avec nos conseils de mise à l’eau.' },
            ],
          },
        ],
      },
      {
        title: 'Section « Zone d\'intervention »',
        fields: [
          { key: 'zones.eyebrow', label: 'Sur-titre', type: 'text', default: "Zone d'intervention" },
          { key: 'zones.title', label: 'Titre', type: 'text', default: 'À Annecy et dans toute la Haute-Savoie' },
          { key: 'zones.intro', label: 'Introduction', type: 'textarea', default: 'Remorques disponibles pour retrait ou livraison à Annecy et autour des lacs alpins.' },
          {
            key: 'zones.items', label: 'Zones (badges)', type: 'list', itemLabel: 'Zone',
            itemFields: [{ key: 'name', label: 'Nom', type: 'text' }],
            defaultList: [{ name: 'Annecy' }, { name: 'Lac d’Annecy' }, { name: 'Lac du Bourget' }, { name: 'Léman' }, { name: 'Haute-Savoie' }],
          },
        ],
      },
      {
        title: 'FAQ',
        fields: [
          {
            key: 'faq.items', label: 'Questions / réponses', type: 'list', itemLabel: 'Question',
            itemFields: [{ key: 'q', label: 'Question', type: 'text' }, { key: 'a', label: 'Réponse', type: 'textarea' }],
            defaultList: [
              { q: 'Comment choisir la bonne remorque pour mon bateau ?', a: 'Notre équipe vous accompagne pour sélectionner une remorque selon la taille de votre bateau, sa fréquence d’utilisation et vos trajets, pour un transport sécurisé et durable.' },
              { q: 'Proposez-vous l’installation et la préparation à l’usage ?', a: 'Oui, nous préparons et ajustons chaque remorque pour qu’elle soit prête à l’emploi, avec un contrôle complet des équipements et des conseils.' },
              { q: 'Où obtenir une remorque sur mesure à Annecy ou en Haute-Savoie ?', a: 'MotorBoat 74 propose des remorques sur mesure, disponibles pour retrait ou livraison à Annecy et dans toute la Haute-Savoie.' },
              { q: 'Quels sont vos horaires ?', a: 'Nous intervenons 7j/7 en période estivale, de 8h00 à 20h00. En cas d’urgence, contactez-nous.' },
            ],
          },
        ],
      },
    ],
  },
  {
    key: 'bateaux',
    label: 'Bateaux — Accueil catalogue',
    path: '/bateaux',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.title', label: 'Titre', type: 'text', default: 'Nos bateaux' },
          { key: 'hero.subtitle', label: 'Sous-titre (vide = version stylée)', type: 'textarea', default: "Wakeboats et bateaux de ski nautique Nautique et MasterCraft, neufs et d'occasion, près du lac d'Annecy. Conseil personnalisé, essai sur l'eau, reprise et financement." },
        ],
      },
      {
        title: 'Section « Accompagnement »',
        fields: [
          { key: 'acc.eyebrow', label: 'Sur-titre', type: 'text', default: 'Acheter chez Motor Boat 74' },
          { key: 'acc.title', label: 'Titre', type: 'text', default: 'Un accompagnement de A à Z' },
          {
            key: 'acc.cards', label: 'Atouts', type: 'list', itemLabel: 'Atout',
            itemFields: [{ key: 't', label: 'Titre', type: 'text' }, { key: 'd', label: 'Description', type: 'textarea' }],
            defaultList: [
              { t: 'Concessionnaire officiel', d: 'Revendeur agréé Nautique et MasterCraft en Haute-Savoie.' },
              { t: 'Essai sur l’eau', d: 'Testez le modèle sur le lac d’Annecy avant de décider.' },
              { t: 'Reprise & financement', d: 'Des solutions sur mesure, neuf comme occasion.' },
              { t: 'Occasions révisées', d: 'Chaque bateau d’occasion est contrôlé et préparé par nos ateliers.' },
            ],
          },
        ],
      },
      {
        title: 'FAQ',
        fields: [
          { key: 'faq.title', label: 'Titre', type: 'text', default: 'Questions fréquentes' },
          {
            key: 'faq.items', label: 'Questions / réponses', type: 'list', itemLabel: 'Question',
            itemFields: [{ key: 'q', label: 'Question', type: 'text' }, { key: 'a', label: 'Réponse', type: 'textarea' }],
            defaultList: [
              { q: 'Vaut-il mieux acheter un bateau neuf ou d’occasion ?', a: "Le neuf offre la configuration exacte que vous souhaitez (motorisation, options, garantie constructeur) et la dernière technologie de vague. L’occasion permet d’accéder à un modèle haut de gamme à un budget maîtrisé. Chez Motor Boat 74, chaque occasion est révisée avant la vente." },
              { q: 'Où essayer un bateau près d’Annecy ?', a: "Nous organisons des essais sur l’eau sur le lac d’Annecy, depuis notre showroom en Haute-Savoie. C’est le meilleur moyen de comparer les modèles et de régler la vague selon votre pratique." },
              { q: 'Proposez-vous la reprise et le financement ?', a: "Oui. Nous reprenons votre bateau actuel et proposons des solutions de financement sur mesure, neuf comme d’occasion. Nous assurons aussi l’entretien et l’hivernage après l’achat." },
              { q: 'Quelles marques de bateaux proposez-vous ?', a: 'Motor Boat 74 est concessionnaire officiel Nautique et distribue MasterCraft : deux références mondiales du wakeboat, du wakesurf et du ski nautique.' },
            ],
          },
        ],
      },
    ],
  },
  titleHero('bateaux-neufs', 'Bateaux — Neufs', '/bateaux/neufs', 'Bateaux neufs',
    "La dernière génération de wakeboats et de bateaux de ski nautique Nautique et MasterCraft. Configurez votre bateau, essayez-le sur le lac d'Annecy et profitez de notre accompagnement complet."),
  titleHero('bateaux-vendus', 'Bateaux — Vendus', '/bateaux/vendu', 'Bateaux vendus',
    "Un aperçu des bateaux récemment vendus par Motor Boat 74. Un modèle similaire vous intéresse ? Nous lançons une recherche sur mesure et vous alertons dès qu'un bateau correspondant arrive."),
  {
    key: 'team',
    label: 'La Team',
    path: '/la-team',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: 'https://www.mastercraft.com/media/iujfrvnt/dt-background-image-1.webp' },
          { key: 'hero.title', label: 'Titre', type: 'text', default: 'La Team' },
          { key: 'hero.subtitle', label: 'Sous-titre (vide = version stylée par défaut)', type: 'textarea', default: 'Motor Boat 74, concessionnaire officiel de la marque Nautique et importateur de Connelly Ski en Haute-Savoie, est spécialisé dans la vente, l’hivernage et l’entretien de bateaux à moteur. Derrière l’atelier et le showroom, une équipe de passionnés à votre service.' },
        ],
      },
      {
        title: 'Section « Équipe » (les membres se gèrent dans l’onglet Équipe)',
        fields: [
          { key: 'team.eyebrow', label: 'Sur-titre', type: 'text', default: 'Nos passionnés' },
          { key: 'team.title', label: 'Titre', type: 'text', default: 'Une équipe à votre service' },
        ],
      },
      {
        title: 'Bloc « Venez nous rencontrer »',
        fields: [
          { key: 'cta.title', label: 'Titre', type: 'text', default: 'Venez nous rencontrer' },
          { key: 'cta.text', label: 'Texte', type: 'textarea', default: 'Poussez la porte de notre showroom au bord du lac d’Annecy : conseil, essai sur l’eau et accompagnement par une équipe qui partage votre passion.' },
        ],
      },
    ],
  },
  {
    key: 'blog',
    label: 'Blog — Page d’accueil',
    path: '/blog',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: 'https://www.mastercraft.com/media/iujfrvnt/dt-background-image-1.webp' },
          { key: 'hero.title', label: 'Titre', type: 'text', default: 'Le Blog' },
          { key: 'hero.subtitle', label: 'Sous-titre (vide = version stylée par défaut)', type: 'textarea', default: 'Bienvenue sur le blog de Motor Boat 74, la référence pour tous les passionnés de nautisme. Guides, conseils d’experts et actualités autour du wakeboard, du ski nautique et de l’entretien de votre bateau.' },
        ],
      },
    ],
  },
  {
    key: 'contact',
    label: 'Contact',
    path: '/contact',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: '/images/2026-p23-ext-09-11zon.webp' },
          { key: 'hero.title', label: 'Titre', type: 'text', default: 'Nous contacter' },
          { key: 'hero.subtitle', label: 'Sous-titre (vide = version par défaut avec téléphone)', type: 'textarea', default: 'Vous pouvez nous joindre via notre formulaire de contact ci-dessous ou par téléphone. Notre équipe reste à votre disposition pour vous renseigner ou vous établir un devis.' },
        ],
      },
    ],
  },
  {
    key: 'legal-mentions',
    label: "Légal — Mentions légales",
    path: '/mentions-legales',
    sections: [
      {
        title: 'Document',
        fields: [
          { key: 'title', label: 'Titre du document', type: 'text', default: "Mentions légales" },
          { key: 'updated', label: 'Date de dernière mise à jour', type: 'text', default: "24 juin 2026" },
        ],
      },
      {
        title: 'Contenu',
        fields: [
          {
            key: 'blocks', label: 'Sections du document', type: 'list', itemLabel: 'Section',
            itemFields: [
              { key: 'h', label: 'Titre de la section', type: 'text' },
              { key: 'body', label: 'Texte (laisser une ligne vide entre chaque paragraphe)', type: 'textarea' },
              { key: 'bullets', label: 'Liste à puces (séparées par | ) — optionnel', type: 'text' },
            ],
            defaultList: [{"h":"Éditeur du site","body":"Le présent site est édité par Motor Boat 74.\n\nSiège social : 179 Allée des Edelweiss, 74210 Saint-Ferréol, Haute-Savoie, France.\n\nSIRET : 920 936 713 00014, SIREN : 920 936 713, N° TVA intracommunautaire : FR85 920 936 713.\n\nTéléphone : 04 57 57 27 27, Email : contact@motorboat74.com.","bullets":""},{"h":"Directeur de la publication","body":"Monsieur Loïc Ricaud, en sa qualité de gérant de Motor Boat 74.","bullets":""},{"h":"Hébergement","body":"Le site est hébergé par la société OVH SAS, au capital de 50 000 000 €, immatriculée au RCS de Lille Métropole sous le numéro 424 761 419, dont le siège social est situé 2 rue Kellermann, 59100 Roubaix, France.\n\nSite : https://www.ovhcloud.com","bullets":""},{"h":"Propriété intellectuelle","body":"L'ensemble des contenus de ce site (textes, images, logos, éléments graphiques) est la propriété de Motor Boat 74 ou de ses partenaires, sauf mention contraire. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.\n\nLes marques et logos des constructeurs (Nautique, MasterCraft, Connelly, etc.) demeurent la propriété de leurs détenteurs respectifs.","bullets":""},{"h":"Données personnelles","body":"Les informations recueillies via les formulaires du site sont traitées par Motor Boat 74 pour répondre à vos demandes. Pour en savoir plus sur le traitement de vos données et l'exercice de vos droits, consultez notre Politique de confidentialité.","bullets":""},{"h":"Cookies","body":"Ce site peut utiliser des cookies à des fins de fonctionnement et de mesure d’audience. Vous pouvez configurer votre navigateur pour les refuser ou ajuster votre consentement à tout moment.","bullets":""}],
          },
        ],
      },
    ],
  },
  {
    key: 'legal-privacy',
    label: "Légal — Politique de confidentialité",
    path: '/politique-de-confidentialite',
    sections: [
      {
        title: 'Document',
        fields: [
          { key: 'title', label: 'Titre du document', type: 'text', default: "Politique de confidentialité" },
          { key: 'updated', label: 'Date de dernière mise à jour', type: 'text', default: "24 juin 2026" },
        ],
      },
      {
        title: 'Contenu',
        fields: [
          {
            key: 'blocks', label: 'Sections du document', type: 'list', itemLabel: 'Section',
            itemFields: [
              { key: 'h', label: 'Titre de la section', type: 'text' },
              { key: 'body', label: 'Texte (laisser une ligne vide entre chaque paragraphe)', type: 'textarea' },
              { key: 'bullets', label: 'Liste à puces (séparées par | ) — optionnel', type: 'text' },
            ],
            defaultList: [{"h":"Responsable du traitement","body":"Motor Boat 74, 179 Allée des Edelweiss, 74210 Saint-Ferréol, Haute-Savoie, France, est responsable du traitement des données personnelles collectées sur ce site, conformément au Règlement Général sur la Protection des Données (RGPD, UE 2016/679) et à la loi Informatique et Libertés.\n\nPour toute question relative à vos données : 04 57 57 27 27, contact@motorboat74.com.","bullets":""},{"h":"Données collectées","body":"Selon votre utilisation du site, nous sommes susceptibles de collecter :","bullets":"Nom et prénom|Adresse e-mail et numéro de téléphone|Adresse postale|Le contenu de vos demandes (message, service ou modèle concerné)|Votre historique d’achats et de prestations (pièces, équipements, réparations, hivernage, transport)|Données de navigation : adresse IP et identifiants de mesure d’audience (Google Analytics)"},{"h":"Finalités et base légale","body":"Vos données sont utilisées pour répondre à vos demandes, établir un devis, assurer le suivi de la relation commerciale et, le cas échéant, vous adresser nos communications.\n\nLes bases légales mobilisées sont : l’exécution du contrat ou de mesures précontractuelles, votre consentement (cookies non essentiels), l’intérêt légitime de l’entreprise et le respect de ses obligations légales.","bullets":""},{"h":"Destinataires","body":"Les données sont destinées aux seuls services de Motor Boat 74 et à ses sous-traitants techniques (hébergeur, outil de mesure d’audience). Elles ne sont jamais vendues ni cédées à des tiers à des fins commerciales.","bullets":""},{"h":"Durée de conservation","body":"Vos données sont conservées pour les durées suivantes :","bullets":"Clients : 5 ans à compter de la fin de la relation commerciale|Prospects : 2 ans à compter de la collecte ou du dernier contact|Cookies de mesure d’audience : 13 mois maximum"},{"h":"Cookies","body":"Ce site utilise des cookies de fonctionnement (strictement nécessaires), de mesure d’audience (Google Analytics) et, le cas échéant, de ciblage publicitaire ou de partage sur les réseaux sociaux.\n\nLes cookies de mesure d’audience et de publicité ne sont déposés qu’après recueil de votre consentement via le bandeau prévu à cet effet. Vous pouvez modifier votre choix à tout moment.","bullets":""},{"h":"Vos droits","body":"Conformément au RGPD, vous disposez des droits d’accès, de rectification, d’effacement, de limitation, d’opposition, de portabilité de vos données et du droit de retirer votre consentement à tout moment.","bullets":"Pour les exercer : contact@motorboat74.com|En cas de difficulté, vous pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr)."}],
          },
        ],
      },
    ],
  },
  {
    key: 'legal-cgv',
    label: "Légal — CGV (Pro)",
    path: '/cgv-pro',
    sections: [
      {
        title: 'Document',
        fields: [
          { key: 'title', label: 'Titre du document', type: 'text', default: "Conditions générales de vente (Pro)" },
          { key: 'updated', label: 'Date de dernière mise à jour', type: 'text', default: "24 juin 2026" },
        ],
      },
      {
        title: 'Contenu',
        fields: [
          {
            key: 'blocks', label: 'Sections du document', type: 'list', itemLabel: 'Section',
            itemFields: [
              { key: 'h', label: 'Titre de la section', type: 'text' },
              { key: 'body', label: 'Texte (laisser une ligne vide entre chaque paragraphe)', type: 'textarea' },
              { key: 'bullets', label: 'Liste à puces (séparées par | ) — optionnel', type: 'text' },
            ],
            defaultList: [{"h":"Objet et champ d’application","body":"Les présentes conditions générales de vente (CGV) régissent l’ensemble des ventes de produits et prestations conclues entre Motor Boat 74, SIRET 920 936 713 00014, dont le siège est situé 179 Allée des Edelweiss, 74210 Saint-Ferréol (le « Vendeur »), et tout acheteur agissant à des fins professionnelles (le « Client »).\n\nElles s’appliquent aux commandes passées en magasin, par téléphone, par e-mail ou à distance. Toute commande implique l’acceptation sans réserve des présentes CGV, qui prévalent sur les conditions d’achat du Client.","bullets":""},{"h":"Qualité du Client professionnel","body":"Le Client déclare être âgé d’au moins 18 ans, disposer de la pleine capacité juridique et agir dans le cadre de son activité professionnelle principale ou accessoire. Les présentes CGV ne s’appliquent pas aux ventes conclues avec des consommateurs.","bullets":""},{"h":"Prix et conditions de paiement","body":"Les prix sont exprimés en euros, hors taxes (HT) et toutes taxes comprises (TTC). Sauf accord particulier, le règlement intervient à 30 jours à compter de la date de facture, par carte bancaire, virement ou prélèvement.\n\nConformément aux articles L.441-10 et suivants du Code de commerce, tout retard de paiement entraîne de plein droit des pénalités calculées sur la base du taux de refinancement le plus récent de la BCE majoré de 10 points, ainsi qu’une indemnité forfaitaire pour frais de recouvrement de 40 €.","bullets":""},{"h":"Réserve de propriété et transfert des risques","body":"Le Vendeur conserve la propriété des produits vendus jusqu’au paiement intégral du prix. Le transfert des risques intervient quant à lui dès la livraison ou le retrait des produits par le Client.","bullets":""},{"h":"Livraison et retrait","body":"La livraison est assurée en France métropolitaine et dans les territoires d’outre-mer. Le retrait en magasin est gratuit et possible pendant 30 jours à compter de la confirmation de mise à disposition.\n\nLes délais de livraison sont communiqués à titre indicatif ; un retard ne saurait ouvrir droit à pénalité, indemnité, ni annulation de la commande.","bullets":""},{"h":"Garantie des vices cachés","body":"La garantie s’applique aux seuls produits régulièrement détenus et non périmés, à l’exclusion des conditions d’usage anormales. Les remèdes sont limités, au choix du Vendeur, au remplacement, à la réparation ou à l’émission d’un avoir, à l’exclusion de tout remboursement ou résolution du contrat.","bullets":""},{"h":"Limitation de responsabilité","body":"Le Vendeur ne saurait être tenu responsable des dommages indirects, pertes de profit ou préjudices commerciaux. En tout état de cause, sa responsabilité est plafonnée au montant effectivement réglé pour le produit ou la prestation concerné(e).","bullets":""},{"h":"Force majeure","body":"Les obligations des parties sont suspendues en cas de survenance d’un événement de force majeure échappant à leur contrôle raisonnable (grève, catastrophe naturelle, épidémie, etc.). Si l’empêchement se prolonge au-delà de 30 jours, le contrat est résolu de plein droit.","bullets":""},{"h":"Droit applicable et litiges","body":"Les présentes CGV sont soumises au droit français. Préalablement à toute action, les parties s’engagent à rechercher une solution amiable pendant 30 jours.\n\nÀ défaut d’accord, tout litige relève de la compétence exclusive du Tribunal de commerce d’Annecy.","bullets":""}],
          },
        ],
      },
    ],
  },
  {
    key: 'notfound',
    label: 'Page 404 (introuvable)',
    path: '/',
    sections: [
      {
        title: 'Contenu',
        fields: [
          { key: 'eyebrow', label: 'Sur-titre', type: 'text', default: 'Erreur 404' },
          { key: 'title', label: 'Titre', type: 'text', default: 'Cap perdu' },
          { key: 'text', label: 'Texte', type: 'textarea', default: "La page que vous cherchez n'existe pas ou a été déplacée. Revenons à bon port." },
          { key: 'cta', label: 'Bouton — texte', type: 'text', default: "Retour à l'accueil" },
        ],
      },
    ],
  },
];

/**
 * Défauts SEO (balise <title> + meta description) par page, repris tels quels des
 * fonctions `*Meta()`. Une section « Référencement (SEO) » est ajoutée automatiquement
 * à chaque page ci-dessous ; le hook `useSeo(pageKey)` applique la surcharge côté client.
 */
const SEO_DEFAULTS: Record<string, { title: string; description: string }> = {
  accueil: {
    title: "Motorboat 74 | Vente et entretien de bateaux sur le Lac d'Annecy",
    description: "Découvrez une sélection exclusive de bateaux (Nautique, MasterCraft, etc.) au bord du Lac d'Annecy. Hivernage, entretien et réparation.",
  },
  'services-hub': {
    title: 'Nos Services Nautiques | Motor Boat 74',
    description: 'Découvrez les services de MotorBoat74 à Annecy : vente de bateaux Nautique, hivernage sécurisé, entretien, dépannage, transport et sellerie en Haute-Savoie.',
  },
  hivernage: {
    title: 'Hivernage & Stockage Bateau Annecy, Hangar 3000 m² | MB74',
    description: "Hivernage et stockage de bateau à Annecy (Haute-Savoie) : hangar sécurisé 3 000 m², hivernage moteur certifié, antigel, remise à l'eau incluse. Devis personnalisé gratuit sous 24 h.",
  },
  entretien: {
    title: 'Réparation & Entretien Bateau Annecy | Motor Boat 74',
    description: 'Entretien et réparation de bateaux à Annecy : révision moteur, réparation, carrosserie, peinture et accastillage, en atelier ou sur place. Devis gratuit sous 24 h.',
  },
  depannage: {
    title: 'Dépannage Bateau Lac d’Annecy 7j/7 | Motor Boat 74',
    description: 'Dépannage de bateau sur le lac d’Annecy : intervention rapide 7j/7 (30-60 min) avec bateau-atelier équipé, réparation à flot, remorquage. Appelez Motor Boat 74.',
  },
  transport: {
    title: 'Transport de Bateau en France et Europe | Motor Boat 74',
    description: 'Transport de bateau partout en France et en Europe : convoyage sécurisé, assurance pro, remorques adaptées. Service clé en main. Devis personnalisé.',
  },
  sellerie: {
    title: 'Sellerie de Bateau Sur Mesure et Rénovation | Motor Boat 74',
    description: 'Sellerie de bateau à Annecy : confection sur mesure, réparation et rénovation complète. Matériaux marins anti-UV et anti-humidité, pose incluse. Devis gratuit.',
  },
  remorques: {
    title: 'Remorques de Bateau Sur Mesure Haute-Savoie | Motor Boat 74',
    description: "Remorques de bateau sur mesure à Annecy et en Haute-Savoie : homologuées CE, adaptées à votre bateau, réglage et mise à l'eau inclus. Demandez conseil.",
  },
  bateaux: {
    title: 'Bateaux neufs et d’occasion près d’Annecy | Motor Boat 74',
    description: 'Bateaux neufs et d’occasion près du lac d’Annecy : wakeboats et bateaux de ski Nautique et MasterCraft. Essai sur l’eau, reprise, financement et entretien chez Motor Boat 74.',
  },
  'bateaux-neufs': {
    title: 'Bateaux neufs Nautique & MasterCraft près d’Annecy | Motor Boat 74',
    description: 'Découvrez nos bateaux neufs Nautique et MasterCraft : wakeboats et bateaux de ski nautique dernière génération. Configuration, essai sur le lac d’Annecy et devis chez Motor Boat 74.',
  },
  'bateaux-vendus': {
    title: 'Bateaux vendus | Motor Boat 74',
    description: 'Les bateaux récemment vendus par Motor Boat 74, près du lac d’Annecy. Un modèle similaire vous intéresse ? Nous lançons une recherche sur mesure.',
  },
  team: {
    title: 'La Team | Motor Boat 74, concessionnaire Nautique près d’Annecy',
    description: 'Rencontrez l’équipe de Motor Boat 74, concessionnaire officiel Nautique et importateur Connelly Ski en Haute-Savoie : vente, hivernage et entretien de bateaux près du lac d’Annecy.',
  },
  blog: {
    title: 'Blog | Conseils & actualités nautiques | Motor Boat 74',
    description: 'Le blog de Motor Boat 74 : guides d’entretien et d’hivernage, comparatifs, actualités Nautique et MasterCraft, conseils d’achat et de revente, près du lac d’Annecy.',
  },
  contact: {
    title: 'Contactez-nous | Motor Boat 74',
    description: 'MotorBoat74 vous accompagne pour l’achat, la vente, l’entretien ou l’hivernage de votre bateau. Contactez-nous facilement dès aujourd’hui à Annecy / Saint-Ferréol.',
  },
};

// Ajoute la section SEO éditable à chaque page qui a des défauts définis ci-dessus.
for (const p of PAGES) {
  const s = SEO_DEFAULTS[p.key];
  if (!s) continue;
  p.sections.push({
    title: 'Référencement (SEO)',
    fields: [
      { key: 'seo.title', label: 'Titre SEO — balise <title> (vide = titre optimisé par défaut)', type: 'text', default: s.title },
      { key: 'seo.description', label: 'Meta description (vide = description par défaut)', type: 'textarea', default: s.description },
    ],
  });
}

/** Valeurs par défaut aplaties : { pageKey: { fieldKey: default (string | array) } }. */
export const PAGE_DEFAULTS: Record<string, Record<string, string | any[]>> = Object.fromEntries(
  PAGES.map((p) => [
    p.key,
    Object.fromEntries(p.sections.flatMap((s) => s.fields).map((f) => [f.key, f.type === 'list' ? (f.defaultList || []) : (f.default || '')])),
  ]),
);
