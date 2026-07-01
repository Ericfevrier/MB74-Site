/** Équipe Motor Boat 74 — repli statique (la source live vient de /api/team, gérée dans /admin). */
export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
  /** Cadrage de la photo (valeur CSS object-position), ex. '72% 35%' ou 'center'. */
  position?: string;
}

export const TEAM: TeamMember[] = [
  {
    name: 'Loïc',
    role: 'Dirigeant',
    bio: "Bordelais de naissance, je suis né dans le monde du bateau. Mon grand-père pêcheur sur le bassin d'Arcachon, mon père mécanicien aujourd'hui retraité m'ont transmis la passion de la mécanique, du bateau et du ski nautique, que j'ai pratiqué à haut niveau : multiple champion de France et d'Europe jusqu'à la catégorie Open. Vice-président du Club de Ski Nautique d'Annecy Sévrier, j'ai créé Motor Boat 74 en 2023.",
    image: 'https://motorboat74.com/wp-content/uploads/elementor/thumbs/Wave-Studio-X-Motor-Boat-74-85-sur-121-scaled-rfkk9r4vuvsamtdqi8msbc4op5d73c9ewy0r2i859s.png',
    position: '72% 35%',
  },
  {
    name: 'Marine',
    role: 'Assistante de direction & communication',
    bio: "Amoureuse des sports aquatiques, je baigne dans le monde du nautisme depuis l'enfance. Après un début de carrière en tant qu'hôtesse de l'air, je me suis formée au marketing digital et à la communication. J'ai rejoint Motor Boat 74 pour mettre mon expérience à votre service.",
    image: 'https://motorboat74.com/wp-content/uploads/2025/12/44-KIM_4220-scaled.jpg',
    position: '50% 30%',
  },
  {
    name: 'Pierre-Louis',
    role: 'Responsable mécanique',
    bio: "Passionné de mécanique, et surtout de grosses cylindrées, depuis mon plus jeune âge, cela fait bientôt 10 ans que je travaille chez les professionnels du nautisme autour du lac d'Annecy, en Haute-Savoie.",
    image: 'https://motorboat74.com/wp-content/uploads/2025/12/Wave-Studio-X-Motor-Boat-74-89-sur-121-scaled.png',
    position: '50% 30%',
  },
  {
    name: 'Jean-Baptiste',
    role: 'Responsable carrosserie',
    bio: "Natif de la région, je fais partie de l'équipe atelier de Motor Boat 74. J'assure la préparation des bateaux : nettoyage approfondi, préparation avant livraison, contrôle des équipements et finitions impeccables. Je suis aussi spécialisé dans les réparations et la carrosserie des bateaux.",
    image: 'https://motorboat74.com/wp-content/uploads/2025/12/Wave-Studio-X-Motor-Boat-74-42-sur-121-scaled.png',
    position: 'center',
  },
];
