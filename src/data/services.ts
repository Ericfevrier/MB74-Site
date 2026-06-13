/**
 * Contenu des pages services — fidèle à motorboat74.com.
 * Architecture data-driven : ServicePage lit ce fichier via le slug d'URL.
 */

export interface ServiceCard {
  title: string;
  desc?: string;
  bullets?: string[];
  /** Clé d'icône lucide (mappée dans ServicePage) — optionnelle */
  icon?: string;
}

export interface ServiceSection {
  /** Petit sur-titre cyan au-dessus du H2 — optionnel */
  eyebrow?: string;
  heading: string;
  intro?: string;
  layout: 'cards' | 'steps' | 'why' | 'list';
  items: ServiceCard[];
  cta?: { label: string; href: string };
}

/** Indicateur de confiance affiché sous le héro */
export interface ServiceStat {
  value: string;
  label: string;
}

export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceCTA {
  label: string;
  href: string;
  primary?: boolean;
}

export interface ServiceDef {
  slug: string;
  /** Nom court (nav, fil d'ariane, services complémentaires) */
  nav: string;
  /** Libellé du cross-sell ("Hivernage et stockage", etc.) */
  crossTitle: string;
  crossDesc: string;
  /** Clé d'icône lucide (mappée dans ServicePage) */
  icon: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  heroIntro: string;
  heroImage: string;
  heroCtas: ServiceCTA[];
  /** Bandeau d'indicateurs sous le héro — optionnel */
  stats?: ServiceStat[];
  sections: ServiceSection[];
  faqs: ServiceFAQ[];
}

const TEL = '+33457572727';
const MAIL = 'mailto:contact@motorboat74.com';

export const services: ServiceDef[] = [
  /* ----------------------------- ENTRETIEN ----------------------------- */
  {
    slug: 'entretien-reparation',
    nav: 'Entretien / Réparation',
    crossTitle: 'Entretien et réparation',
    crossDesc: 'Maintenance, entretien et réparation sécurisée de votre bateau toute l’année',
    icon: 'wrench',
    metaTitle: 'Réparation & Entretien Bateau Annecy | Motor Boat 74',
    metaDescription:
      'Entretien et réparation de bateaux à Annecy et Haute-Savoie. Nous assurons la révision moteur, coque, circuits électriques et maintenance totale.',
    h1: 'Entretien et réparation de bateaux',
    heroIntro:
      'Confiez l’entretien et la réparation de votre bateau à MotorBoat74, spécialiste à Annecy et en Haute-Savoie. De la révision moteur aux travaux de carénage, en passant par la réparation d’équipements et la préparation à la saison, nous garantissons performance, sécurité et longévité à votre embarcation. Interventions rapides et soignées, sur place ou en atelier.',
    heroImage: '/images/services/entretien.webp',
    heroCtas: [
      { label: 'Demander un devis gratuit', href: '#contact', primary: true },
      { label: 'Nous appeler', href: `tel:${TEL}` },
    ],
    stats: [
      { value: '4,9/5', label: 'Avis Google' },
      { value: '600+', label: 'Bateaux suivis / an' },
      { value: 'Toutes', label: 'Marques de moteurs' },
      { value: '10 ans+', label: "D'expertise nautique" },
    ],
    sections: [
      {
        eyebrow: 'Préserver votre bateau',
        heading: 'Pourquoi un entretien régulier est essentiel',
        intro:
          'Un bateau entretenu, c’est une navigation sereine et un investissement protégé. Un suivi régulier évite les pannes coûteuses et préserve la valeur de votre embarcation saison après saison.',
        layout: 'why',
        items: [
          {
            title: 'Sécurité à bord',
            desc: 'Moteur, circuits et équipements contrôlés pour naviguer en toute confiance sur le lac.',
            icon: 'shieldcheck',
          },
          {
            title: 'Performance optimale',
            desc: 'Un entretien suivi garantit puissance, fiabilité et consommation maîtrisée.',
            icon: 'gauge',
          },
          {
            title: 'Longévité du bateau',
            desc: 'Prévenir l’usure prolonge la durée de vie de votre moteur et de votre coque.',
            icon: 'calendarcheck',
          },
          {
            title: 'Valeur de revente',
            desc: 'Un carnet d’entretien à jour rassure les acheteurs et valorise votre bateau.',
            icon: 'badgeeuro',
          },
        ],
      },
      {
        eyebrow: 'Mécanique nautique',
        heading: 'Nos services d’entretien mécanique',
        intro:
          'Professionnels de la mécanique nautique, nous possédons toutes les connaissances et le matériel nécessaire à l’entretien de votre bateau. Qu’il s’agisse d’un moteur hors-bord 2 temps ou 4 temps, ou d’un moteur in-bord Z-Drive, V-Drive ou ligne d’arbre, MotorBoat74 assure un suivi complet pour une navigation en toute sécurité.',
        layout: 'cards',
        items: [
          {
            title: 'Révision moteur et entretien',
            icon: 'wrench',
            bullets: ['Vidange et huile', 'Contrôle des systèmes', 'Diagnostic électronique'],
          },
          {
            title: 'Réparation',
            icon: 'settings',
            bullets: ['Remplacement de pièces', 'Réparation rapide', 'Préparation à la saison'],
          },
        ],
        cta: { label: 'Planifier mon entretien', href: '#contact' },
      },
      {
        eyebrow: 'Atelier carrosserie',
        heading: 'Carrosserie et embellissement du bateau',
        intro:
          'Équipé d’un atelier carrosserie complet, MotorBoat74 est votre partenaire pour la réfection et l’embellissement de votre bateau. Nous prenons soin de votre navire avec précision et professionnalisme.',
        layout: 'cards',
        items: [
          {
            title: 'Travaux de carrosserie et peinture',
            icon: 'paintbucket',
            bullets: ['Reprise gel-coat', 'Peinture et finitions esthétiques', 'Réparations structurelles'],
          },
          {
            title: 'Pose d’accastillage et personnalisation',
            icon: 'sparkles',
            bullets: ['Pose d’accessoires', 'Amélioration esthétique et fonctionnelle du bateau'],
          },
        ],
        cta: { label: 'Demander un devis gratuit', href: '#contact' },
      },
      {
        eyebrow: 'Simple et transparent',
        heading: 'Comment se déroule votre entretien',
        layout: 'steps',
        items: [
          { title: 'Prise de contact', desc: 'Vous nous décrivez votre bateau et votre besoin par téléphone ou via le formulaire.' },
          { title: 'Diagnostic', desc: 'Nos techniciens inspectent le moteur, la coque et les équipements.' },
          { title: 'Devis gratuit', desc: 'Vous recevez un devis clair et détaillé, sans engagement.' },
          { title: 'Intervention', desc: 'Travaux réalisés en atelier ou sur place, avec des pièces de qualité.' },
          { title: 'Restitution', desc: 'Contrôle final et bateau prêt à naviguer, en toute sérénité.' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Quels services propose MotorBoat74 pour l’entretien des bateaux ?',
        answer:
          'Nous proposons vidange moteur, contrôle des circuits d’eau et de carburant, révision des équipements électriques, nettoyage intérieur/extérieur, polissage de la coque, et maintenance des accessoires.',
      },
      {
        question: 'Comment savoir si mon moteur a besoin d’une révision ?',
        answer:
          'Signes d’alerte : bruit anormal, perte de puissance, fumée excessive, surconsommation de carburant. Nous effectuons un diagnostic complet pour identifier tout problème.',
      },
      {
        question: 'Proposez-vous la réparation de coques et carènes endommagées ?',
        answer:
          'Oui. Nous réalisons la réparation de fissures, rayures, éclats de gelcoat et tout dommage sur la coque pour garantir l’étanchéité et la sécurité.',
      },
      {
        question: 'Proposez-vous un entretien hivernal complet ?',
        answer:
          'Oui. Nous préparons le bateau pour l’hiver : vidange, protection moteur, nettoyage, et stockage sécurisé pour éviter toute dégradation. Découvrez notre service d’hivernage dédié.',
      },
      {
        question: 'Combien coûte une révision ou une réparation de bateau ?',
        answer:
          'Le coût dépend du type de prestation, de la taille du bateau et des pièces nécessaires. Nous établissons un devis gratuit et personnalisé pour chaque intervention.',
      },
      {
        question: 'Sur quels types de bateaux travaillez-vous ?',
        answer:
          'MotorBoat74 intervient sur tous types de bateaux de plaisance, ski nautique, wakeboard, voiliers et hors-bords, avec ou sans remorque.',
      },
    ],
  },

  /* ----------------------------- DÉPANNAGE ----------------------------- */
  {
    slug: 'depannage',
    nav: 'Dépannage',
    crossTitle: 'Dépannage',
    crossDesc: 'Nous intervenons rapidement sur le Lac d’Annecy',
    icon: 'lifebuoy',
    metaTitle: 'Dépannage Bateau Lac d’Annecy 7j/7 | Motor Boat 74',
    metaDescription:
      'Besoin d’un dépannage sur le lac d’Annecy ? MotorBoat74 intervient 7j/7 avec un bateau-atelier pour réparer votre bateau rapidement.',
    h1: 'Dépannage de votre bateau sur le Lac d’Annecy',
    heroIntro:
      'Lorsque votre bateau tombe en panne sur le lac d’Annecy, chaque minute compte. MotorBoat74 comprend l’urgence de la situation et s’engage à intervenir rapidement pour vous remettre en sécurité et vous permettre de reprendre vos activités nautiques.',
    heroImage: '/images/services/depannage.webp',
    heroCtas: [{ label: 'Appel d’urgence', href: `tel:${TEL}`, primary: true }],
    sections: [
      {
        heading: 'Nos services de dépannage sur le Lac d’Annecy',
        intro:
          'Grâce à notre bateau-atelier entièrement équipé, nous réalisons la plupart des réparations mécaniques et électriques directement sur le lac d’Annecy. Pour les pannes plus complexes, nous assurons le remorquage vers notre atelier ou le port le plus proche, afin de remettre votre embarcation en état rapidement et en toute sécurité.',
        layout: 'cards',
        items: [
          {
            title: 'Diagnostic et réparation mécanique',
            bullets: [
              'Moteurs hors-bord et in-bord',
              'Systèmes de propulsion et transmission',
              'Circuits électriques et électroniques',
            ],
          },
          {
            title: 'Assistance en cas de panne électrique',
            bullets: [
              'Vérification des batteries et alternateurs',
              'Diagnostic des systèmes électriques',
              'Remplacement de composants défectueux',
            ],
          },
          {
            title: 'Remorquage et assistance sur site',
            bullets: [
              'Remorquage jusqu’à notre atelier ou port',
              'Assistance pour mise à l’eau et sortie',
              'Sécurisation en cas de panne majeure',
            ],
          },
        ],
        cta: { label: 'Contactez-nous', href: '#contact' },
      },
      {
        heading: 'Pourquoi choisir MotorBoat74 pour votre dépannage sur le Lac d’Annecy ?',
        layout: 'why',
        items: [
          {
            title: 'Intervention rapide 7j/7 en saison',
            desc: 'Notre équipe se déplace rapidement pour toute panne sur le lac.',
          },
          {
            title: 'Équipement complet',
            desc: 'Bateau-atelier équipé pour toutes les réparations nécessaires.',
          },
          {
            title: 'Expertise locale',
            desc: 'Connaissance approfondie du lac d’Annecy et de ses spécificités.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Combien de temps faut-il pour qu’un technicien arrive sur le lac d’Annecy ?',
        answer:
          'Notre équipe intervient généralement dans un délai de 30 à 60 minutes en fonction de votre localisation sur le lac.',
      },
      {
        question: 'Quels types de bateaux pouvez-vous dépanner ?',
        answer:
          'Nous intervenons sur tous types de bateaux, qu’ils soient à moteur hors-bord, in-bord, pneumatiques ou semi-rigides.',
      },
      {
        question: 'Est-ce que vous proposez des services de remorquage ?',
        answer:
          'Oui, nous proposons des services de remorquage pour amener votre bateau à notre atelier ou à un port sécurisé.',
      },
      {
        question: 'Quels sont vos horaires d’intervention ?',
        answer:
          'Nous intervenons 7j/7 en période estivale, de 8h00 à 20h00. En cas d’urgence, contactez-nous, nous ferons de notre mieux pour vous assister rapidement.',
      },
    ],
  },

  /* ----------------------------- TRANSPORT ----------------------------- */
  {
    slug: 'transport-de-bateau',
    nav: 'Transport',
    crossTitle: 'Transport de bateaux',
    crossDesc: 'Nous assurons le transport de votre bateau partout en France et en Europe',
    icon: 'truck',
    metaTitle: 'Transport de Bateau en France et Europe | Motor Boat 74',
    metaDescription:
      'Motor Boat 74 assure le transport de bateau partout en France et en Europe. Service clé en main avec véhicule et remorque adaptés.',
    h1: 'Transport de bateau en Europe',
    heroIntro:
      'Motor Boat 74 assure le transport sécurisé de votre bateau partout en France et en Europe. Équipés de véhicules spécialisés et de remorques adaptées, nous prenons en charge votre navire pour un achat, une vente ou un déplacement en toute tranquillité.',
    heroImage: '/images/services/transport.webp',
    heroCtas: [
      { label: 'Contactez-nous', href: '#contact', primary: true },
      { label: 'Obtenir un devis', href: '#contact' },
    ],
    sections: [
      {
        heading: 'Notre service de transport de bateau',
        intro:
          'Notre équipe propose un service clé en main pour tous vos besoins de transport nautique. Que ce soit pour un achat, une vente, une mise à l’eau ou un transfert entre ports, nous assurons un convoyage rapide, sécurisé et conforme aux normes. Grâce à nos remorques adaptées et à notre expérience du milieu nautique, votre bateau voyage dans les meilleures conditions, en France comme partout en Europe.',
        layout: 'list',
        items: [
          { title: 'Transport après achat ou vente de bateau' },
          { title: 'Déplacement vers un chantier naval ou un atelier de réparation' },
          { title: 'Livraison sur lac ou en mer' },
          { title: 'Transfert entre ports ou lieux de stockage' },
          { title: 'Convoyage de bateaux de toutes tailles et catégories' },
        ],
      },
      {
        heading: 'Comment se déroule le transport ?',
        layout: 'steps',
        items: [
          { title: 'Demande de devis', desc: 'Remplissez notre formulaire pour obtenir un tarif personnalisé.' },
          { title: 'Planification du trajet', desc: 'Nous organisons l’itinéraire selon vos disponibilités et besoins.' },
          { title: 'Chargement sécurisé', desc: 'Votre bateau est arrimé et protégé avec le plus grand soin.' },
          { title: 'Transport et livraison', desc: 'Nous acheminons votre navire dans les délais fixés ensemble.' },
          { title: 'Vérification et remise en main', desc: 'Contrôle complet avant de vous restituer votre bateau en parfait état.' },
        ],
      },
    ],
    faqs: [
      {
        question: 'Quel est le prix pour transporter un bateau ?',
        answer:
          'Le prix d’un transport de bateau dépend de plusieurs facteurs : distance à parcourir, taille et poids de l’embarcation, zone géographique (France ou Europe) et type de service (standard ou express). Pour obtenir un tarif précis, remplissez notre formulaire de devis en ligne.',
      },
      {
        question: 'Motor Boat 74 transporte-t-il des bateaux partout en France ?',
        answer:
          'Oui, nous assurons le transport de bateau dans toute la France : des lacs alpins comme Annecy ou Léman, aux côtes méditerranéennes et atlantiques. Nous intervenons aussi en Suisse, Italie, Espagne, Allemagne et dans le reste de l’Europe sur demande.',
      },
      {
        question: 'Quels types de bateaux pouvez-vous transporter ?',
        answer:
          'Nous transportons différents types d’embarcations : wakeboard, wakesurf, ski nautique, semi-rigides, coques open, petits voiliers et jet-skis. Nos remorques adaptées et notre expertise garantissent un convoyage sécurisé, quelle que soit la configuration du bateau.',
      },
      {
        question: 'Le transport de bateau est-il assuré ?',
        answer:
          'Oui, tous nos transports sont couverts par une assurance professionnelle qui protège votre bateau contre les éventuels dommages durant le chargement, le convoyage et la livraison.',
      },
    ],
  },

  /* ----------------------------- SELLERIE ----------------------------- */
  {
    slug: 'sellerie-de-bateau',
    nav: 'Sellerie',
    crossTitle: 'Sellerie',
    crossDesc: 'On s’occupe de la confection, réparation et rénovation de votre sellerie nautique',
    icon: 'sofa',
    metaTitle: 'Sellerie de Bateau Sur Mesure et Rénovation | Motor Boat 74',
    metaDescription:
      'Rénovation, réparation et confection sur mesure de votre sellerie de bateau à Annecy. Motor Boat 74 redonne confort et élégance à votre navire.',
    h1: 'Sellerie de bateau',
    heroIntro:
      'Que vous souhaitiez rénover l’intérieur de votre bateau ou remplacer une sellerie usée, notre équipe d’experts vous accompagne de la conception à la pose. En partenariat avec plusieurs artisans spécialisés, Motor Boat 74 réalise la confection sur mesure, la réparation et la modification de tous types de sellerie nautique.',
    heroImage: '/images/services/sellerie.webp',
    heroCtas: [
      { label: 'Prendre rendez-vous', href: '#contact', primary: true },
      { label: 'Devis personnalisé gratuit', href: '#contact' },
    ],
    sections: [
      {
        heading: 'Nos services de sellerie de bateau',
        intro:
          'Motor Boat 74 s’occupe de la confection, réparation et rénovation de votre sellerie nautique. Nous redonnons confort, style et protection à votre bateau grâce à des matériaux de qualité et un savoir-faire artisanal.',
        layout: 'cards',
        items: [
          {
            title: 'Confection sur mesure',
            desc: 'Nous fabriquons des coussins et assises adaptés à votre bateau, entièrement personnalisables selon vos goûts en termes de coloris et de matières.',
          },
          {
            title: 'Réparation et remplacement',
            desc: 'Notre équipe répare ou remplace la sellerie abîmée, en effectuant des ajustements précis pour garantir un confort optimal et une durabilité maximale.',
          },
          {
            title: 'Rénovation complète',
            desc: 'Nous remettons à neuf l’intérieur de votre bateau, en rénovant tous les éléments de sellerie tout en protégeant les matériaux contre l’humidité et les rayons UV.',
          },
        ],
      },
    ],
    faqs: [
      {
        question: 'Quel type de bateaux pouvez-vous équiper ?',
        answer:
          'Nous intervenons sur tous types de bateaux, des petites embarcations de loisir aux yachts haut de gamme, en adaptant la sellerie à chaque taille et configuration.',
      },
      {
        question: 'Combien de temps prend une rénovation de sellerie ?',
        answer:
          'Selon l’ampleur du projet, la rénovation complète peut durer de quelques jours à quelques semaines. Un devis précis vous sera fourni après étude de votre bateau et de vos besoins.',
      },
      {
        question: 'Est-ce que vous installez la sellerie directement sur le bateau ?',
        answer:
          'Oui, notre équipe effectue l’installation directement sur votre bateau et ajuste chaque élément pour garantir un confort optimal et un rendu esthétique parfait.',
      },
      {
        question: 'Offrez-vous des services de protection contre l’humidité et les UV ?',
        answer:
          'Absolument. Nos matériaux et finitions sont sélectionnés pour résister à l’humidité, aux UV et aux conditions nautiques, assurant la durabilité et la beauté de votre sellerie.',
      },
    ],
  },

  /* ----------------------------- REMORQUES ----------------------------- */
  {
    slug: 'remorques-de-bateau',
    nav: 'Remorques',
    crossTitle: 'Ventes de remorques',
    crossDesc: 'Nous proposons des remorques adaptées à tous types de bateaux',
    icon: 'caravan',
    metaTitle: 'Remorques de Bateau Sur Mesure Haute-Savoie | Motor Boat 74',
    metaDescription:
      'Achetez vos remorques de bateau sur mesure à Annecy et Haute-Savoie. Motor Boat 74 garantit sécurité, qualité et transport de votre embarcation.',
    h1: 'Remorques de bateau sur mesure',
    heroIntro:
      'Trouvez la remorque parfaite pour transporter votre bateau en toute sécurité et sérénité.',
    heroImage: '/images/services/remorques.webp',
    heroCtas: [
      { label: 'Appelez-nous', href: `tel:${TEL}`, primary: true },
      { label: 'Envoyer un mail', href: MAIL },
    ],
    sections: [
      {
        heading: 'Trouvez la remorque idéale pour votre bateau',
        intro:
          'Motor Boat 74 vous propose des remorques adaptées à tous types de bateaux, qu’il s’agisse de plaisance, de sport ou de modèles spécifiques. Grâce à notre réseau de marques partenaires, chaque remorque est choisie pour garantir sécurité, durabilité et confort lors du transport. Nous prenons en compte la taille de votre bateau, sa fréquence d’utilisation et vos besoins spécifiques afin de vous fournir une solution parfaitement adaptée. Notre expertise vous permet de bénéficier d’un accompagnement personnalisé pour choisir la remorque qui correspond à votre embarcation et voyager l’esprit tranquille.',
        layout: 'list',
        items: [
          { title: 'Remorques simples ou doubles essieux, freinées' },
          { title: 'Adaptées wake, pêche, ski nautique' },
          { title: 'Homologation CE' },
          { title: 'Réglage et mise à l’eau' },
        ],
        cta: { label: 'Une question ? Contactez-nous', href: '#contact' },
      },
    ],
    faqs: [
      {
        question: 'Comment choisir la bonne remorque pour mon bateau ?',
        answer:
          'Notre équipe vous accompagne pour sélectionner une remorque en fonction de la taille de votre bateau, de sa fréquence d’utilisation et de vos trajets. Nous garantissons un transport sécurisé et durable.',
      },
      {
        question: 'Proposez-vous un service d’installation ou de préparation à l’usage ?',
        answer:
          'Oui, nous préparons et ajustons chaque remorque pour qu’elle soit prête à l’emploi, avec contrôle complet des équipements et conseils pour un transport optimal.',
      },
      {
        question: 'Où obtenir une remorque de bateau sur mesure à Annecy ou en Haute-Savoie ?',
        answer:
          'Motor Boat 74 propose des remorques sur mesure, parfaitement adaptées à vos besoins et disponibles pour livraison ou retrait à Annecy et dans toute la Haute-Savoie.',
      },
      {
        question: 'Quels sont vos horaires d’intervention ?',
        answer:
          'Nous intervenons 7j/7 en période estivale, de 8h00 à 20h00. En cas d’urgence, contactez-nous, nous ferons de notre mieux pour vous assister rapidement.',
      },
    ],
  },
];

/** Service hivernage : page dédiée existante, listé pour le cross-sell. */
export const hivernageCross = {
  slug: 'hivernage-stockage-bateau',
  nav: 'Hivernage / Stockage',
  crossTitle: 'Hivernage et stockage',
  crossDesc: 'Hivernage, stockage et protection complète de votre bateau toute l’année',
  icon: 'shield',
  path: '/hivernage-stockage-bateau',
};

export function getService(slug: string): ServiceDef | undefined {
  return services.find((s) => s.slug === slug);
}
