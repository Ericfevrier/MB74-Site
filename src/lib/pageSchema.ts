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
  {
    key: 'hivernage',
    label: 'Service — Hivernage & stockage',
    path: '/hivernage-stockage-bateau',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: '/images/2026-g23-perf-18.jpg' },
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
  titleHero('bateaux', 'Bateaux — Accueil catalogue', '/bateaux', 'Nos bateaux',
    "Wakeboats et bateaux de ski nautique Nautique et MasterCraft, neufs et d'occasion, près du lac d'Annecy. Conseil personnalisé, essai sur l'eau, reprise et financement."),
  titleHero('bateaux-neufs', 'Bateaux — Neufs', '/bateaux/neufs', 'Bateaux neufs',
    "La dernière génération de wakeboats et de bateaux de ski nautique Nautique et MasterCraft. Configurez votre bateau, essayez-le sur le lac d'Annecy et profitez de notre accompagnement complet."),
  titleHero('bateaux-vendus', 'Bateaux — Vendus', '/bateaux/vendu', 'Bateaux vendus',
    "Un aperçu des bateaux récemment vendus par Motor Boat 74. Un modèle similaire vous intéresse ? Nous lançons une recherche sur mesure et vous alertons dès qu'un bateau correspondant arrive."),
  {
    key: 'contact',
    label: 'Contact',
    path: '/contact',
    sections: [
      {
        title: 'Bannière',
        fields: [
          { key: 'hero.image', label: 'Image de fond', type: 'image', default: '/images/2026-p23-ext-09-11zon.jpg' },
          { key: 'hero.title', label: 'Titre', type: 'text', default: 'Nous contacter' },
          { key: 'hero.subtitle', label: 'Sous-titre (vide = version par défaut avec téléphone)', type: 'textarea', default: 'Vous pouvez nous joindre via notre formulaire de contact ci-dessous ou par téléphone. Notre équipe reste à votre disposition pour vous renseigner ou vous établir un devis.' },
        ],
      },
    ],
  },
];

/** Valeurs par défaut aplaties : { pageKey: { fieldKey: default (string | array) } }. */
export const PAGE_DEFAULTS: Record<string, Record<string, string | any[]>> = Object.fromEntries(
  PAGES.map((p) => [
    p.key,
    Object.fromEntries(p.sections.flatMap((s) => s.fields).map((f) => [f.key, f.type === 'list' ? (f.defaultList || []) : (f.default || '')])),
  ]),
);
