/**
 * Catalogue Nautique — données reproduites depuis motorboat74.com.
 * G23 & G21 : données issues de nautique.com (overview) car le site MB74
 * n'expose que des annonces d'occasion pour ces 2 slugs.
 * NE PAS éditer à la main : régénéré via /tmp/gen-models.mjs si besoin.
 */

export interface SpecItem { label: string; value: string; }
export interface SpecGroup { group: string; items: SpecItem[]; }
export interface Highlight { title: string; text: string; }
export interface ModelFAQ { q: string; a: string; }

export interface NautiqueModel {
  slug: string;
  name: string;
  short: string;
  gamme: string;
  year: string;
  metaTitle: string;
  metaDescription: string;
  intro: string[];
  hero: string;
  gallery: string[];
  specs: SpecGroup[];
  highlights: Highlight[];
  faqs: ModelFAQ[];
}

export const MODEL_ORDER: string[] = ["g25-paragon","g23-paragon","super-air-nautique-g25","super-air-nautique-g23","super-air-nautique-g21","super-air-nautique-s25","super-air-nautique-s23","super-air-nautique-s21","super-air-nautique-gs24","super-air-nautique-gs22","super-air-nautique-gs20","ski-nautique"];

export const nautiqueModels: Record<string, NautiqueModel> = {
  "super-air-nautique-s21": {
    "slug": "super-air-nautique-s21",
    "name": "Super Air Nautique S21",
    "short": "S21",
    "gamme": "Série S",
    "year": "2026",
    "metaTitle": "Super Air Nautique S21 2026 - Fiche Technique Et Prix",
    "metaDescription": "Découvrez le Super Air Nautique S21 2026 chez MotorBoat74, concessionnaire officiel à Annecy. Découvrez le bateau dans notre showroom !",
    "intro": [
      "Le Super Air Nautique S21 est un bateau pensé pour ceux qui veulent profiter pleinement de l’eau, que ce soit pour le wakesurf, le wakeboard ou simplement naviguer avec confort et style. Avec ses 6,55 m de longueur et sa technologie Next Gen Surf System, il génère des vagues parfaitement calibrées pour tous les niveaux, des débutants aux riders confirmés. Son moteur puissant et silencieux assure des départs nets et une navigation stable, même avec plusieurs passagers à bord.",
      "À l’intérieur, le S21 mise sur le confort et la praticité : des assises ergonomiques, de l’espace pour tous les passagers, des rangements bien pensés et des finitions solides qui résistent à l’usage quotidien. La conduite est précise et intuitive, ce qui permet de se concentrer sur la glisse ou le plaisir de la balade sans se préoccuper du bateau."
    ],
    "hero": "/images/nautique/super-air-nautique-s21-1.jpg",
    "gallery": [
      "/images/nautique/super-air-nautique-s21-1.jpg",
      "/images/nautique/super-air-nautique-s21-2.jpg",
      "/images/nautique/super-air-nautique-s21-3.jpg",
      "/images/nautique/super-air-nautique-s21-4.jpg",
      "/images/nautique/super-air-nautique-s21-5.jpg"
    ],
    "specs": [
      {
        "group": "Dimensions",
        "items": [
          {
            "label": "Longueur totale",
            "value": "21′ 5″ / 6,52 m"
          },
          {
            "label": "Longueur avec plateforme",
            "value": "23′ 7″ / 7,19 m"
          },
          {
            "label": "Faisceau",
            "value": "100″ / 2,54 m"
          },
          {
            "label": "Brouillon",
            "value": "32″ / 0,81 m"
          }
        ]
      },
      {
        "group": "Capacité",
        "items": [
          {
            "label": "Capacité maximale",
            "value": "14 personnes / 2 100 lb / 953 kg"
          },
          {
            "label": "Ballast max (avec supplément)",
            "value": "2 650 lb / 1 202 kg"
          },
          {
            "label": "Poids sec approximatif",
            "value": "5 200 lb / 2 359 kg"
          },
          {
            "label": "Capacité de carburant",
            "value": "65,1 gal / 246,4 L"
          }
        ]
      },
      {
        "group": "Performance",
        "items": [
          {
            "label": "Puissance",
            "value": "ZZ5 – 355 CV / ZZ6 – 450 CV / ZZ8R – 570 CV / 8LV 370 – 370 CV (diesel)"
          },
          {
            "label": "Couple",
            "value": "405 pi-lb / 465 pi-lb / 600 pi-lb / 595 pi-lb (diesel)"
          },
          {
            "label": "Rapport de réduction de vitesse",
            "value": "1,7:1 (ZZ6) / 1,5:1 (diesel et ZZ8R)"
          }
        ]
      }
    ],
    "highlights": [
      {
        "title": "PERFORMANCES",
        "text": "Le Super Air Nautique S21 associe une coque primée au Nautique Surf System (WAVEPLATE®) pour générer des vagues modulables pour wakeboard et wakesurf. Sa Surface de course configurable (NCRS) ajuste automatiquement le sillage et l’assiette du bateau, tandis que l’assistance à la direction facilite les manœuvres à basse vitesse et l’accostage. Plusieurs options moteur sont disponibles, du PCM ZZ5 au PCM ZZ8R ou diesel Yanmar, et la connectivité MyNautique™ ainsi que l’intégration avec les montres Garmin® permettent de contrôler vitesse, vagues et ballast à distance."
      },
      {
        "title": "ARRIÈRE",
        "text": "À l’arrière du Super Air Nautique S21, le siège arrière réversible (option) se rabat et coulisse pour suivre l’action ou compléter le salon, avec marche antidérapante Nauteak. Le pylône de ski intégré se déploie facilement pour tous les sports nautiques. Les hayons arrière offrent un grand rangement pour le matériel, tandis que le passage arrière antidérapant facilite l’accès à la plateforme de bain. Enfin, les sièges orientés vers l’arrière et la télécommande stéréo optionnelle permettent de se détendre et de contrôler la musique depuis l’arrière du bateau."
      },
      {
        "title": "MILIEU",
        "text": "Au milieu du Super Air Nautique S21, tout est pensé pour le confort et la praticité. La tour de contrôle de vol se replie manuellement ou motorisée, avec option télescopique, et peut accueillir des enceintes JL Audio M6 pour un son optimal. Le bateau propose des porte-planches et foils Nautique modulables, un bimini avec poches de surf, des pare-soleil extensibles, un pare-brise moderne et le système Phender Pro pour protéger le bateau à l’accostage. L’éclairage de courtoisie est personnalisable via l’écran tactile LINC Panoray, le chargement sans fil permet de recharger facilement vos appareils, et le pack stéréo JL Audio M3 est inclus de série, avec options pour caisson et amplificateur supplémentaires. Une pompe à air intégrée facilite le gonflage et dégonflage des équipements nautiques."
      },
      {
        "title": "BARRE",
        "text": "Au poste de pilotage du Super Air Nautique S21, tout est conçu pour faciliter la navigation et le contrôle. L’écran tactile panoramique LINC de 12,4 pouces centralise les réglages de vagues, sillage, éclairage et musique, tandis que l’encodeur rotatif Helm Command permet de naviguer facilement dans les menus depuis l’accoudoir. Le siège conducteur offre confort et soutien, et le tableau de bord propose des rangements pratiques et une disposition ergonomique. La caméra de surveillance grand angle améliore la vigilance derrière le bateau, et la direction électrique réduit l’effort au volant pour une conduite fluide et précise."
      },
      {
        "title": "COQUE ET PROUE",
        "text": "À la proue du Super Air Nautique S21, le design allie performance et praticité. Le réseau lumineux d’amarrage à LED assure visibilité et style, tandis que la coque inspirée de modèles primés optimise le sillage et les vagues pour le wakeboard. La proue spacieuse offre des sièges confortables avec porte-gobelets, rangements intégrés et options son JL Audio ou coussin de proue pour se détendre. Une poubelle amovible dans la zone de passage avant facilite le maintien de l’espace propre à bord."
      }
    ],
    "faqs": [
      {
        "q": "Quel est le prix du Super Air Nautique S21 ?",
        "a": "Les modèles d’occasion du Super Air Nautique S21 (2018–2021) se négocient généralement entre 110 000 € et 125 000 €, selon l’état et les options choisies. Pour un modèle neuf 2025, le prix se situe autour de 130 000 €, pouvant varier en fonction des équipements et du lieu d’achat. Pour connaître les tarifs des modèles plus récents ou des configurations spécifiques, il est conseillé de contacter directement un concessionnaire Nautique ."
      },
      {
        "q": "Où acheter un Super Air Nautique S21 ?",
        "a": "En France, vous pouvez acheter le Super Air Nautique S21 directement chez Motor Boat 74, concessionnaire officiel de la marque. Nous proposons à la fois des modèles neufs et d’occasion, avec toutes les options disponibles et un accompagnement complet pour l’achat, l’entretien et l’hivernage."
      },
      {
        "q": "À qui confier l'entretien de mon Super Air Nautique S21 ?",
        "a": "Pour l’entretien de votre Super Air Nautique S21, vous pouvez le confier directement à Motor Boat 74, concessionnaire officiel Nautique. Nous assurons toutes les interventions, du moteur PCM ZZ8 aux systèmes électroniques, en passant par l’entretien de la coque, la sellerie ou l’hivernage."
      },
      {
        "q": "Quelle est la différence entre le S21 et le S23 ?",
        "a": "La principale différence entre le S21 et le S23 réside dans la taille, la capacité et le confort. Le S23, plus grand (7 m) et pouvant accueillir jusqu’à 16 passagers, offre des vagues plus généreuses, un intérieur modulable et des finitions premium, idéal pour les groupes ou familles nombreuses. Le S21, plus compact (6,5 m) et limité à 14 passagers, reste maniable et performant, avec des options moteur variées et le Nautique Surf System, parfait pour les petits groupes ou les utilisateurs cherchant un bateau plus facile à manœuvrer et à stocker."
      }
    ]
  },
  "super-air-nautique-s23": {
    "slug": "super-air-nautique-s23",
    "name": "Super Air Nautique S23",
    "short": "S23",
    "gamme": "Série S",
    "year": "2026",
    "metaTitle": "Super Air Nautique S23 2026 - Fiche Technique Et Prix",
    "metaDescription": "Découvrez le Super Air Nautique S23 2026 chez MotorBoat74, concessionnaire officiel à Annecy. Découvrez le bateau dans notre showroom !",
    "intro": [
      "Le Super Air Nautique S23 s’inscrit dans la série S de Nautique, pensée pour que chaque sortie sur l’eau soit simple et agréable, que vous soyez en wakeboard, en wakesurf ou en balade avec vos proches. Sa coque, conçue pour produire des vagues nettes et modulables, et le Nautique Surf System permettent d’adapter la forme et la taille des vagues à vos envies, sans effort.",
      "À bord, tout est pensé pour le confort et la praticité : sièges modulables, rangements intelligents, passages sécurisés et tour de contrôle facile à déployer. Le poste de pilotage centralise les commandes avec l’écran tactile LINC, la direction électrique et la caméra de surveillance, pour que piloter reste naturel et fluide.",
      "Le S23 combine performance et confort de manière intuitive, pour que chaque moment sur l’eau se vive sans complication et en toute convivialité."
    ],
    "hero": "/images/nautique/super-air-nautique-s23-1.jpg",
    "gallery": [
      "/images/nautique/super-air-nautique-s23-1.jpg",
      "/images/nautique/super-air-nautique-s23-2.jpg",
      "/images/nautique/super-air-nautique-s23-3.jpg",
      "/images/nautique/super-air-nautique-s23-4.jpg",
      "/images/nautique/super-air-nautique-s23-5.jpg"
    ],
    "specs": [
      {
        "group": "Dimensions",
        "items": [
          {
            "label": "Longueur totale",
            "value": "23’ / 7.01 m"
          },
          {
            "label": "Longueur avec plateforme",
            "value": "25′ 2″ / 7.67 m"
          },
          {
            "label": "Faisceau",
            "value": "100″ / 2.54 m"
          },
          {
            "label": "Brouillon",
            "value": "31.25″ / .79 m"
          }
        ]
      },
      {
        "group": "Capacité",
        "items": [
          {
            "label": "Capacité maximale",
            "value": "16 personnes / 2 300 lb / 1 043 kg."
          },
          {
            "label": "Ballast max (avec supplément)",
            "value": "3 150 lb / 1 429 kg"
          },
          {
            "label": "Poids sec approximatif",
            "value": "5,500 lbs. / 2,540 kg"
          },
          {
            "label": "Capacité de carburant",
            "value": "65.1 gal / 246.4 L"
          }
        ]
      },
      {
        "group": "Performance",
        "items": [
          {
            "label": "Puissance",
            "value": "ZZ5 – 355 CV / ZZ6 – 450 CV / ZZ8R – 570 CV / 8LV 370 – 370 CV (diesel)"
          },
          {
            "label": "Couple",
            "value": "405 pi-lb / 465 pi-lb / 600 pi-lb / 595 pi-lb (diesel)"
          },
          {
            "label": "Rapport de réduction de vitesse",
            "value": "1,7:1 (ZZ6) / 1,5:1 (diesel et ZZ8R)"
          }
        ]
      }
    ],
    "highlights": [
      {
        "title": "PERFORMANCES",
        "text": "Le Super Air Nautique S23 combine puissance et précision pour que chaque sortie sur l’eau soit simple et agréable. Sa coque primée et le Nautique Surf System permettent de créer des vagues modulables, adaptées à tous les passagers et ajustables à la volée via l’écran tactile LINC. Le Configurable Running Surface et l’option de ballast supplémentaire offrent une maniabilité fluide et des performances optimisées, même avec un équipage réduit. Avec l’assistance à la direction, les différentes motorisations disponibles et la connectivité MyNautique™ ou Garmin®, piloter le S23 reste naturel, précis et parfaitement intégré à l’expérience de surf et de wakeboard."
      },
      {
        "title": "ARRIÈRE",
        "text": "L’arrière du S23 combine confort et fonctionnalité. Le siège réversible, coulissant et relevable suit l’action ou libère l’espace pour le salon, tandis que le passage antidérapant facilite l’accès à la plateforme de bain. Les trois hayons offrent un rangement généreux, la trappe centrale protégeant le moteur et les côtés accueillant le matériel nautique. En option, le pylône de ski se déploie facilement, et la télécommande stéréo arrière permet de gérer la musique directement depuis le pont arrière."
      },
      {
        "title": "MILIEU",
        "text": "Le milieu du S23 regroupe les fonctionnalités qui facilitent la navigation et le confort à bord. La tour de contrôle de vol se décline en trois options (manuelle, motorisée ou télescopique) et peut accueillir le bimini avec poches de rangement pour planches de surf, tandis que les porte-planches Nautique Strapless sont adaptables aux foils grâce au kit de conversion. Le bateau est équipé d’enceintes JL Audio en options pour un son immersif et d’un pare-brise offrant une visibilité dégagée. Le Phender Pro protège efficacement lors de l’accostage, et le pack d’éclairage de courtoisie personnalisable ainsi que la recharge sans fil des appareils ajoutent confort et praticité. Une pompe à air intégrée permet de gonfler ou dégonfler rapidement les équipements gonflables, simplifiant la préparation des activités nautiques."
      },
      {
        "title": "BARRE",
        "text": "Le poste de pilotage du Super Air Nautique S23 centralise confort, contrôle et technologie. L’écran tactile panoramique LINC de 12,4 pouces permet de gérer facilement les réglages de vagues, le sillage, l’éclairage et la musique. L’encodeur rotatif Helm Command, placé de façon ergonomique sur l’accoudoir, facilite la navigation dans les menus. Le siège conducteur, conçu pour offrir soutien et confort, s’adapte à toutes les positions de conduite. Le tableau de bord, pensé pour la praticité, combine rangement et visibilité optimale, tandis que la caméra grand angle assure une surveillance complète derrière le bateau. Enfin, la direction électrique réduit l’effort au volant et garantit une conduite précise et fluide dans toutes les situations."
      },
      {
        "title": "COQUE ET PROUE",
        "text": "La proue du Super Air Nautique S23 allie confort et fonctionnalité. Les sièges avant offrent des rangements sous assise et des porte-gobelets intégrés, tandis que le coussin de proue et les enceintes JL Audio optionnelles créent un espace dédié à la détente. La coque, inspirée de designs primés, produit des sillages et des vagues optimisés pour le wakeboard et le wakesurf, avec une étrave marquée pour une allure distinctive. Le réseau de feux LED intégrés assure visibilité et sécurité lors des manœuvres, et la nouvelle poubelle amovible Bow Walk Through facilite le maintien de l’espace propre et organisé."
      }
    ],
    "faqs": [
      {
        "q": "Quel est le prix du Super Air Nautique S23 ?",
        "a": "Pour les modèles d’occasion du Super Air Nautique S23 (2018–2021), les prix se situent généralement entre 160 000 € et 180 000 €, selon l’état et les options installées. Le prix d’un modèle neuf 2025 est d’environ 188 000 €, pouvant varier selon la configuration et la localisation de la vente. Pour obtenir les tarifs des modèles plus récents ou des options spécifiques, il est recommandé de contacter directement un concessionnaire Nautique ."
      },
      {
        "q": "Où acheter un Super Air Nautique S23 ?",
        "a": "En France, vous pouvez acheter le Super Air Nautique S23 directement chez Motor Boat 74, concessionnaire officiel de la marque. Nous proposons à la fois des modèles neufs et d’occasion, avec toutes les options disponibles et un accompagnement complet pour l’achat, l’entretien et l’hivernage."
      },
      {
        "q": "À qui confier l'entretien de mon Super Air Nautique S23 ?",
        "a": "Pour l’entretien de votre Super Air Nautique S23, vous pouvez le confier directement à Motor Boat 74, concessionnaire officiel Nautique. Nous assurons toutes les interventions, du moteur PCM ZZ8 aux systèmes électroniques, en passant par l’entretien de la coque, la sellerie ou l’hivernage."
      },
      {
        "q": "Quelle est la différence entre le S23 et le S25 ?",
        "a": "La principale différence entre le S25 et le S23 réside dans la taille, la capacité et le confort. Le S25, plus grand (7,62 m), accueille plus de passagers, dispose d’un ballast plus important et d’un intérieur spacieux pour des sorties familiales ou en groupe, tout en offrant des vagues modulables optimisées pour le wakesurf. Le S23, plus compact (7,01 m), reste très performant avec un système de vague similaire, mais dans un format plus maniable et sportif, idéal pour ceux qui recherchent un excellent compromis entre performance et taille."
      }
    ]
  },
  "super-air-nautique-s25": {
    "slug": "super-air-nautique-s25",
    "name": "Super Air Nautique S25",
    "short": "S25",
    "gamme": "Série S",
    "year": "2026",
    "metaTitle": "Super Air Nautique S25 2026 - Fiche Technique Et Prix",
    "metaDescription": "Découvrez le Super Air Nautique S25 2026 chez MotorBoat74, concessionnaire officiel à Annecy. Découvrez le bateau dans notre showroom !",
    "intro": [
      "Le Super Air Nautique S25 fait partie de la série S de Nautique, conçue pour offrir une expérience complète sur l’eau, que ce soit pour le wakeboard, le wakesurf ou simplement profiter du bateau en famille et entre amis. Sa coque a été pensée pour créer des vagues modulables et un sillage adapté à chaque activité, tandis que les technologies embarquées, comme le Nautique Surf System et le Configurable Running Surface, permettent d’ajuster les performances en temps réel selon les envies de chacun.",
      "À bord, tout a été imaginé pour le confort et la praticité : des sièges avant et arrière modulables, des espaces de rangement intelligents, un passage arrière antidérapant et des fonctionnalités comme la pompe à air intégrée ou la recharge sans fil. La barre et le poste de pilotage mettent la navigation à portée de main grâce à l’écran tactile panoramique LINC, la direction électrique et la caméra de surveillance, pour que piloter reste simple et sûr.",
      "Que ce soit pour une sortie sportive, un moment de détente ou une journée complète sur le lac, le S25 cherche à rendre chaque instant sur l’eau agréable et accessible, en combinant maniabilité, organisation et sensations naturelles de navigation."
    ],
    "hero": "/images/nautique/super-air-nautique-s25-1.jpg",
    "gallery": [
      "/images/nautique/super-air-nautique-s25-1.jpg",
      "/images/nautique/super-air-nautique-s25-2.jpg",
      "/images/nautique/super-air-nautique-s25-3.jpg",
      "/images/nautique/super-air-nautique-s25-4.jpg",
      "/images/nautique/super-air-nautique-s25-5.jpg"
    ],
    "specs": [
      {
        "group": "Dimensions",
        "items": [
          {
            "label": "Longueur totale",
            "value": "25’ / 7.62 m"
          },
          {
            "label": "Longueur avec plateforme",
            "value": "27’ 2” / 8.28 m"
          },
          {
            "label": "Faisceau",
            "value": "100” / 2.54 m"
          },
          {
            "label": "Brouillon",
            "value": "32” / .81 m"
          }
        ]
      },
      {
        "group": "Capacité",
        "items": [
          {
            "label": "Capacité maximale",
            "value": "18 personnes / 2 700 lb / 1 225 kg"
          },
          {
            "label": "Ballast max (avec supplément)",
            "value": "2,800 lbs. / 1,270 kg"
          },
          {
            "label": "Poids sec approximatif",
            "value": "5,800 lbs. / 2,631 kg"
          },
          {
            "label": "Capacité de carburant",
            "value": "85.8 gal / 324.8 L"
          }
        ]
      },
      {
        "group": "Performance",
        "items": [
          {
            "label": "Puissance",
            "value": "ZZ6 – 450 HP / ZZ8R – 570 HP / 8LV 370 – 370 HP (diesel)"
          },
          {
            "label": "Couple",
            "value": "465 Ft-Lb / 600 Ft-Lb / 595 Ft-Lb (diesel)"
          },
          {
            "label": "Rapport de réduction de vitesse",
            "value": "1.7:1 (ZZ6) / 1.5:1 (diesel)"
          }
        ]
      }
    ],
    "highlights": [
      {
        "title": "PERFORMANCES",
        "text": "Le Super Air Nautique S25 transforme chaque sortie en une expérience unique. Sa coque primée, le Nautique Surf System et le Configurable Running Surface travaillent main dans la main pour créer des vagues parfaites, modulables à volonté. Avec l’assistance à la direction, des moteurs puissants et la connectivité MyNautique™ et Garmin®, tout est pensé pour que piloter et surfer devienne un vrai plaisir, fluide et naturel."
      },
      {
        "title": "ARRIÈRE",
        "text": "À l’arrière du S25, tout est pensé pour que l’équipage profite pleinement de l’eau et des moments partagés. Le siège réversible et confortable permet de suivre l’action comme dans un stade, le passage antidérapant facilite l’accès à la plateforme de bain, et les vastes rangements accueillent tous vos équipements. Avec le pylône de ski intégré et la télécommande stéréo à portée de main, se détendre, piloter et partager devient simple et naturel."
      },
      {
        "title": "MILIEU",
        "text": "Au cœur du S25, tout est pensé pour que chaque moment à bord soit fluide et agréable. La tour de contrôle modulable, les enceintes JL Audio et le pare-brise offrent confort, visibilité et son immersif, tandis que le bimini, les pare-soleil et les rangements pour planches protègent et organisent votre équipement. Avec la pompe à air intégrée, la recharge sans fil et l’éclairage personnalisable, tout est là pour que profiter de l’eau devienne simple, pratique et vraiment plaisant."
      },
      {
        "title": "BARRE",
        "text": "À la barre du S25, tout est pensé pour que piloter devienne naturel et agréable. L’écran tactile panoramique LINC et l’encodeur Helm Command mettent le contrôle du bateau à portée de main, tandis que le siège conducteur offre confort et soutien même lors des sessions les plus intenses. Avec le tableau de bord ergonomique, la caméra de surveillance et la direction électrique, chaque virage, chaque manœuvre et chaque instant sur l’eau se vivent en toute fluidité et sécurité."
      },
      {
        "title": "COQUE ET PROUE",
        "text": "La proue du S25 allie style, confort et performance. Sa coque primée assure des sillages parfaits et des vagues idéales pour le wakeboard, tandis que les sièges avant spacieux et les rangements astucieux créent un espace convivial pour profiter de l’eau. Les feux d’accostage intégrés et la poubelle amovible ajoutent praticité et sécurité, pour que chaque sortie soit agréable et sans souci."
      }
    ],
    "faqs": [
      {
        "q": "Quel est le prix du Super Air Nautique S25 ?",
        "a": "Les modèles d’occasion du Super Air Nautique S25 (2018–2021) se vendent généralement entre 180 000 € et 200 000 €, selon l’état et les options choisies. Pour un modèle neuf 2025, le prix se situe autour de 215 000 €, variant en fonction de la configuration et des équipements. Pour connaître les tarifs des modèles plus récents ou des versions spécifiques, il est recommandé de contacter directement un concessionnaire Nautique ."
      },
      {
        "q": "Où acheter un Super Air Nautique S25 ?",
        "a": "En France, vous pouvez acheter le Super Air Nautique S25 directement chez Motor Boat 74, concessionnaire officiel de la marque. Nous proposons à la fois des modèles neufs et d’occasion, avec toutes les options disponibles et un accompagnement complet pour l’achat, l’entretien et l’hivernage."
      },
      {
        "q": "À qui confier l'entretien de mon Super Air Nautique S25 ?",
        "a": "Pour l’entretien de votre Super Air Nautique S25, vous pouvez le confier directement à Motor Boat 74, concessionnaire officiel Nautique. Nous assurons toutes les interventions, du moteur PCM ZZ8 aux systèmes électroniques, en passant par l’entretien de la coque, la sellerie ou l’hivernage."
      },
      {
        "q": "Quelle est la différence entre le S25 et le S21 ?",
        "a": "La principale différence entre le S25 et le S21 réside dans la taille, la capacité et la puissance. Le S25, plus grand (7,62 m) et spacieux, accueille jusqu’à 16 passagers, dispose de moteurs plus puissants, d’un ballast avancé pour des vagues plus importantes, et d’équipements haut de gamme comme l’audio JL Audio et l’éclairage RGB, idéal pour les sorties en famille ou en groupe. Le S21, plus compact (6,4 m), reste performant pour le wakesurf et le wakeboard avec un ballast et des moteurs adaptés à sa taille, offrant maniabilité, économie et une excellente expérience nautique pour des groupes plus restreints."
      }
    ]
  },
  "super-air-nautique-gs20": {
    "slug": "super-air-nautique-gs20",
    "name": "Super Air Nautique GS20",
    "short": "GS20",
    "gamme": "Série GS",
    "year": "2026",
    "metaTitle": "Super Air Nautique GS20 2026 - Fiche Technique Et Prix",
    "metaDescription": "Découvrez le Super Air Nautique GS20 2026 chez MotorBoat74, concessionnaire officiel à Annecy. Découvrez le bateau dans notre showroom !",
    "intro": [
      "Le Air Nautique GS20 se positionne comme un bateau de traction polyvalent, conçu pour le wakesurf, le wakeboard et le ski nautique. Sa coque mono-hull associe l’ADN du Ski Nautique à la conception avancée de la série G, générant des vagues et un sillage modulable selon le niveau et le type de pratique. Le ballast intégré et le système de réglage des plaques permettent d’adapter la forme des vagues et la hauteur du sillage. Doté de technologies embarquées pour la gestion de la propulsion et de l’électronique, et d’un aménagement intérieur étudié pour le confort à bord, le GS20 offre une expérience de navigation complète pour les sports tractés."
    ],
    "hero": "/images/nautique/super-air-nautique-gs20-1.jpg",
    "gallery": [
      "/images/nautique/super-air-nautique-gs20-1.jpg",
      "/images/nautique/super-air-nautique-gs20-2.jpg",
      "/images/nautique/super-air-nautique-gs20-3.jpg",
      "/images/nautique/super-air-nautique-gs20-4.jpg",
      "/images/nautique/super-air-nautique-gs20-5.jpg"
    ],
    "specs": [
      {
        "group": "Dimensions",
        "items": [
          {
            "label": "Longueur totale",
            "value": "20’ / 6.1 m"
          },
          {
            "label": "Longueur avec plateforme",
            "value": "22’ 7” / 6.88 m"
          },
          {
            "label": "Faisceau",
            "value": "100” / 2.54 m"
          },
          {
            "label": "Brouillon",
            "value": "30” / .76 m"
          }
        ]
      },
      {
        "group": "Capacité",
        "items": [
          {
            "label": "Capacité maximale",
            "value": "12 personnes / 1,850 lbs. / 839 kg"
          },
          {
            "label": "Ballast max (avec supplément)",
            "value": "1,700 lbs. / 771 kg"
          },
          {
            "label": "Poids sec approximatif",
            "value": "4,700 lbs. / 2,132 kg"
          },
          {
            "label": "Capacité de carburant",
            "value": "39 gal / 147.6 L"
          }
        ]
      },
      {
        "group": "Performance",
        "items": [
          {
            "label": "Puissance",
            "value": "ZZ5 – 355 HP / ZZ6 – 450 HP"
          },
          {
            "label": "Couple",
            "value": "405 Ft-Lb / 465 Ft-Lb"
          },
          {
            "label": "Rapport de réduction de vitesse",
            "value": "1.5:1"
          }
        ]
      }
    ],
    "highlights": [
      {
        "title": "PERFORMANCES",
        "text": "Le Super Air Nautique GS20 offre des performances optimales sur ski, wakeboard, wakesurf et foil. Sa coque, inspirée du Ski Nautique et du Super Air Série G, assure stabilité et polyvalence. La Surface de Course Configurable (NCRS) et le système Nautique Surf avec WAVEPLATES® permettent des trajectoires précises et des vagues parfaites. L’assistance à la direction facilite les manœuvres, et les moteurs PCM® ZZ5 ou ZZ6 garantissent puissance et couple. MyNautique™ et la compatibilité avec les montres Garmin® offrent un contrôle à distance des réglages et des performances."
      },
      {
        "title": "ARRIÈRE",
        "text": "L’arrière du GS20 combine confort, accessibilité et praticité. Le pylône de ski optionnel se déploie facilement pour tracter tous les sports nautiques. Le passage arrière antidérapant Nauteak facilite l’accès à la plateforme de bain, tandis que les sièges arrière inclinés offrent un espace convivial pour se détendre. Les hayons à trois trappes optimisent le rangement, avec un accès aux compartiments pour wakeboards et équipements. Une télécommande stéréo optionnelle permet de gérer la musique directement depuis l’arrière."
      },
      {
        "title": "MILIEU",
        "text": "Le milieu du GS20 combine praticité, confort et technologie. La tour de contrôle de vol, manuelle ou électrique, facilite le remorquage pour wakeboard et wakesurf. Les porte-planches strapless et le kit de conversion pour foils optimisent le rangement et l’usage des planches. Le bimini et le pare-soleil offrent ombre et protection, tandis que le pare-brise assure une visibilité parfaite. La pompe à air intégrée, le Phender Pro et l’éclairage de courtoisie amélioré garantissent confort et sécurité. Enfin, le système audio JL Audio et le chargement sans fil complètent l’expérience connectée et conviviale à bord."
      },
      {
        "title": "BARRE",
        "text": "La barre du GS20 combine contrôle, confort et sécurité. L’écran tactile panoramique LINC de 12,4 pouces centralise tous les réglages, tandis que le tableau de bord asymétrique garde tout à portée de main. L’encodeur Helm Command facilite la navigation dans les menus, et le siège pilote offre confort et soutien pour toutes les situations. La direction électrique rend la conduite fluide et légère, et la caméra de surveillance grand angle améliore la vigilance derrière le bateau."
      },
      {
        "title": "COQUE ET PROUE",
        "text": "La coque et la proue du GS20 allient confort, sécurité et praticité. Le réseau lumineux d’amarrage à LED offre visibilité et style, même par faible luminosité. Les sièges avant larges avec porte-gobelets et rangement intégré assurent confort et organisation, avec la possibilité d’ajouter des enceintes JL Audio® ou un coussin de remplissage. Une poubelle amovible dans la zone de passage facilite la gestion des déchets à bord."
      }
    ],
    "faqs": [
      {
        "q": "Quel est le prix du Super Air Nautique GS20 ?",
        "a": "Les modèles d’occasion (2018–2021) se situent généralement entre 70 000 € et 90 000 €, selon l’état et le lieu de vente. Les modèles neufs (2025) sont annoncés entre 73 000 € et 165 000 €. Pour obtenir les tarifs des modèles plus récents ou des configurations spécifiques, il est recommandé de contacter directement un concessionnaire Nautique ."
      },
      {
        "q": "Où acheter un Super Air Nautique GS20 ?",
        "a": "En France, vous pouvez acheter le Super Air Nautique GS20 directement chez Motor Boat 74, concessionnaire officiel de la marque. Nous proposons à la fois des modèles neufs et d’occasion, avec toutes les options disponibles et un accompagnement complet pour l’achat, l’entretien et l’hivernage."
      },
      {
        "q": "À qui confier l'entretien de mon Super Air Nautique GS20 ?",
        "a": "Pour l’entretien de votre Super Air Nautique GS20, vous pouvez le confier directement à Motor Boat 74, concessionnaire officiel Nautique. Nous assurons toutes les interventions, du moteur PCM ZZ8 aux systèmes électroniques, en passant par l’entretien de la coque, la sellerie ou l’hivernage."
      },
      {
        "q": "Quelle est la différence entre le GS20 et le GS22 ?",
        "a": "Le GS20 mesure 6,1 m, avec moteur jusqu’à 450 ch, ballast de 1 700 lb (771 kg) et poids à vide d’environ 2 132 kg, idéal pour wakesurf, wakeboard et ski nautique, avec système Nautique Surf, surface de course configurable et MyNautique, pour 12 personnes. Le GS22, plus grand (6,7 m), propose un ballast interne de 2 400 lb, moteurs de 355 à 570 ch, plus de confort et des options supplémentaires comme siège pilote polyvalent et éclairage LED, pour une performance multi-sport étendue."
      }
    ]
  },
  "super-air-nautique-gs22": {
    "slug": "super-air-nautique-gs22",
    "name": "Super Air Nautique GS22",
    "short": "GS22",
    "gamme": "Série GS",
    "year": "2026",
    "metaTitle": "Super Air Nautique GS22 2026 - Fiche Technique Et Prix",
    "metaDescription": "Découvrez le Super Air Nautique GS22 2026 chez MotorBoat74, concessionnaire officiel à Annecy. Découvrez le bateau dans notre showroom !",
    "intro": [
      "Le Super Air Nautique GS22 est un bateau multisports de 6,70 m pensé pour les vrais passionnés de sports nautiques. Conçu pour exceller en wakesurf, wakeboard et ski nautique, sa coque hybride, issue des séries Ski Nautique et G-Series, permet de créer des vagues précises et modulables, parfaitement adaptées à chaque discipline et à chaque niveau de pratique.",
      "Avec une puissance moteur pouvant atteindre 570 chevaux et une capacité d’accueil jusqu’à 15 personnes, le GS22 allie performance brute et polyvalence. Son système de ballast intégré et réglable offre un contrôle total du sillage, permettant de sculpter la vague idéale pour chaque activité, tandis que le design du cockpit et les finitions premium garantissent un confort et une ergonomie optimisés pour l’utilisateur exigeant."
    ],
    "hero": "/images/nautique/super-air-nautique-gs22-1.jpg",
    "gallery": [
      "/images/nautique/super-air-nautique-gs22-1.jpg",
      "/images/nautique/super-air-nautique-gs22-2.jpg",
      "/images/nautique/super-air-nautique-gs22-3.jpg",
      "/images/nautique/super-air-nautique-gs22-4.jpg",
      "/images/nautique/super-air-nautique-gs22-5.jpg"
    ],
    "specs": [
      {
        "group": "Dimensions",
        "items": [
          {
            "label": "Longueur totale",
            "value": "22’ / 6.70 m"
          },
          {
            "label": "Longueur avec plateforme",
            "value": "24’ 7” / 7.49 m"
          },
          {
            "label": "Faisceau",
            "value": "100” / 2.54 m"
          },
          {
            "label": "Brouillon",
            "value": "32” / .81 m"
          }
        ]
      },
      {
        "group": "Capacité",
        "items": [
          {
            "label": "Capacité maximale",
            "value": "15 personnes / 2 200 lb / 998 kg"
          },
          {
            "label": "Ballast max (avec supplément)",
            "value": "2 900 lb / 1 315 kg"
          },
          {
            "label": "Poids sec approximatif",
            "value": "4 900 livres / 2 223 kg"
          },
          {
            "label": "Capacité de carburant",
            "value": "59 gal / 223.3 L"
          }
        ]
      },
      {
        "group": "Performance",
        "items": [
          {
            "label": "Puissance",
            "value": "ZZ5 – 355 CV / ZZ6 – 450 CV / ZZ8R – 570 CV (diesel)"
          },
          {
            "label": "Couple",
            "value": "405 pi-lb / 465 pi-lb / 600 pi-lb (diesel)"
          },
          {
            "label": "Rapport de réduction de vitesse",
            "value": "1,5:1"
          }
        ]
      }
    ],
    "highlights": [
      {
        "title": "PERFORMANCES",
        "text": "Le Super Air Nautique GS22 combine une coque inspirée des modèles de ski nautique et de wake pour s’adapter à diverses pratiques comme le ski, le wakeboard, le wakesurf ou le foil. Le système NCRS ajuste automatiquement la surface de course selon l’activité, tandis que le système Nautique Surf permet de configurer les vagues en temps réel via l’écran tactile. L’assistance à la direction facilite les manœuvres à basse vitesse, et un ballast additionnel compense l’absence d’équipage. Le moteur PCM est proposé en plusieurs versions jusqu’à 450 ch. Enfin, les intégrations MyNautique et Garmin permettent de surveiller et de contrôler certaines fonctions à distance."
      },
      {
        "title": "ARRIÈRE",
        "text": "L’arrière du GS22 est pensé pour la détente, l’accès à l’eau et le rangement. Le siège arrière réversible (en option) coulisse pour permettre une vue sur les riders, puis se replie pour compléter le salon avec une marche antidérapante. Le passage arrière Nauteak facilite l’accès à la plateforme sans marcher sur les coussins. Un mât de ski escamotable offre un point de remorquage supplémentaire. Trois trappes arrière optimisent le rangement, avec un large accès aux équipements grâce à l’intégration du ballast sous plancher. Des sièges fixes à l’arrière permettent de profiter de la plateforme à l’arrêt, tandis qu’une télécommande (en option) donne accès aux réglages audio depuis le tableau arrière."
      },
      {
        "title": "MILIEU",
        "text": "Le milieu du GS22 combine fonctionnalité, rangement et confort pour l’équipage. Deux types de tours de contrôle de vol sont proposés : manuelle ou à commande électrique, toutes deux compatibles avec des porte-planches sans bretelles et adaptables aux foils grâce à un kit de conversion. Le bimini large, avec poches pour planches de surf, peut être complété par un pare-soleil extensible à l’arrière pour plus d’ombre. Côté audio, le système JL Audio M3 est configurable avec des haut-parleurs colonnes M6 et un éclairage intégré. Le pare-brise profilé, la pompe à air intégrée, le système Phender Pro et le socle de chargement sans fil complètent les équipements pensés pour une utilisation fluide et confortable."
      },
      {
        "title": "BARRE",
        "text": "La barre du GS22 est conçue pour une navigation intuitive et un contrôle centralisé. L’écran tactile panoramique LINC de 12,4 pouces permet de gérer les réglages du bateau, de l’éclairage à la musique, avec fluidité. Le tableau de bord asymétrique conserve une excellente visibilité et propose des espaces de rangement pratiques. L’encodeur Helm Command, situé sur l’accoudoir, facilite la navigation dans les menus sans lâcher le volant. Le siège pilote, pensé pour le confort et la polyvalence, s’adapte à toutes les situations. Une caméra grand angle offre une vue arrière claire pour surveiller l'activité derrière le bateau, tandis que la direction électrique assure une conduite souple avec un minimum d'effort."
      },
      {
        "title": "COQUE ET PROUE",
        "text": "Le Super Air Nautique GS22 combine confort, praticité et sécurité à l'avant du bateau : sa proue large et spacieuse offre des sièges avant équipés de porte-gobelets et d’espaces de rangement sous les coussins, tandis que les enceintes JL Audio® en option créent un espace dédié au son et un coussin de remplissage peut compléter la zone détente. Le GS22 peut être personnalisé avec un système de feux d’accostage à LED intégré à la proue, assurant visibilité et sécurité lors des manœuvres par faible luminosité et servant également de feux de jour. Une poubelle amovible supplémentaire dans la zone de passage avant facilite l’élimination des déchets à bord, ajoutant commodité et organisation au quotidien."
      }
    ],
    "faqs": [
      {
        "q": "Quel est le prix du Super Air Nautique GS22 ?",
        "a": "Les modèles d’occasion du Super Air Nautique GS22 (2018–2021) se vendent généralement entre 160 000 € et 175 000 €, selon l’état et les options choisies. Pour un modèle neuf 2025, le prix se situe autour de 185 000 €, pouvant varier selon la motorisation et les équipements sélectionnés. Pour obtenir les tarifs des modèles plus récents ou des configurations spécifiques, il est recommandé de contacter directement un concessionnaire Nautique ."
      },
      {
        "q": "Où acheter un Super Air Nautique GS22 ?",
        "a": "En France, vous pouvez acheter le Super Air Nautique GS22 directement chez Motor Boat 74, concessionnaire officiel de la marque. Nous proposons à la fois des modèles neufs et d’occasion, avec toutes les options disponibles et un accompagnement complet pour l’achat, l’entretien et l’hivernage."
      },
      {
        "q": "À qui confier l'entretien de mon Super Air Nautique GS22 ?",
        "a": "Pour l’entretien de votre Super Air Nautique GS22, vous pouvez le confier directement à Motor Boat 74, concessionnaire officiel Nautique. Nous assurons toutes les interventions, du moteur PCM ZZ8 aux systèmes électroniques, en passant par l’entretien de la coque, la sellerie ou l’hivernage."
      },
      {
        "q": "Quelle est la différence entre le GS22 et le GS24 ?",
        "a": "La principale différence entre le GS22 et le GS24 réside dans la taille, le ballast et le confort. Le GS24, plus grand (7,32 m) avec un ballast plus important, offre un intérieur spacieux et modulable, idéal pour les familles ou groupes plus nombreux, tout en générant des vagues plus grosses et personnalisables. Le GS22, plus compact (6,7 m), reste très polyvalent et maniable, avec un ballast suffisant pour de belles vagues, offrant un excellent compromis entre performance, confort et facilité d’usage pour les sorties multi-sports nautiques."
      }
    ]
  },
  "super-air-nautique-gs24": {
    "slug": "super-air-nautique-gs24",
    "name": "Super Air Nautique GS24",
    "short": "GS24",
    "gamme": "Série GS",
    "year": "2026",
    "metaTitle": "Super Air Nautique GS24 2026 - Fiche Technique Et Prix",
    "metaDescription": "Découvrez le Super Air Nautique GS24 2026 chez MotorBoat74, concessionnaire officiel à Annecy. Découvrez le bateau dans notre showroom !",
    "intro": [
      "Le Super Air Nautique GS24 est un bateau de plus de 7 mètres qui mise sur la polyvalence. Sa coque inspirée des Ski Nautique et de la série G lui permet d’exceller aussi bien en wakesurf qu’en wakeboard ou en ski nautique. Avec une capacité d’accueil jusqu’à 17 personnes, il offre un intérieur spacieux et confortable, idéal pour profiter de longues journées en famille ou entre amis.",
      "Côté technologie, il embarque le Nautique Surf System avec WAVEPLATE® pour créer des vagues personnalisées, ainsi que le système NCRS qui adapte automatiquement la coque à l’activité choisie. La motorisation PCM, de 355 à 570 chevaux, assure puissance et fiabilité, tandis que le Nautique Steering Assist facilite les manœuvres à basse vitesse. Enfin, la connectivité MyNautique permet de garder un œil sur le bateau à distance pour plus de simplicité au quotidien."
    ],
    "hero": "/images/nautique/super-air-nautique-gs24-1.jpg",
    "gallery": [
      "/images/nautique/super-air-nautique-gs24-1.jpg",
      "/images/nautique/super-air-nautique-gs24-2.jpg",
      "/images/nautique/super-air-nautique-gs24-3.jpg",
      "/images/nautique/super-air-nautique-gs24-4.jpg",
      "/images/nautique/super-air-nautique-gs24-5.jpg"
    ],
    "specs": [
      {
        "group": "Dimensions",
        "items": [
          {
            "label": "Longueur totale",
            "value": "24′ / 7,32 m"
          },
          {
            "label": "Longueur avec plateforme",
            "value": "26′ 7” / 8,10 m"
          },
          {
            "label": "Faisceau",
            "value": "100” / 2,54 m"
          },
          {
            "label": "Brouillon",
            "value": "30 po / 0,76 m"
          }
        ]
      },
      {
        "group": "Capacité",
        "items": [
          {
            "label": "Capacité maximale",
            "value": "17 personnes / 2 650 lb / 1 202 kg"
          },
          {
            "label": "Ballast max (avec supplément)",
            "value": "3 450 lb / 1 565 kg"
          },
          {
            "label": "Poids sec approximatif",
            "value": "5 250 lb / 2 381 kg"
          },
          {
            "label": "Capacité de carburant",
            "value": "76,7 gal / 290,3 L"
          }
        ]
      },
      {
        "group": "Performance",
        "items": [
          {
            "label": "Puissance",
            "value": "ZZ5 – 355 CH / ZZ6 – 450 CH / ZZ8R – 570 CH"
          },
          {
            "label": "Couple",
            "value": "405 pi-lb / 465 pi-lb / 600 pi-lb"
          },
          {
            "label": "Rapport de réduction de vitesse",
            "value": "1.7:1"
          }
        ]
      }
    ],
    "highlights": [
      {
        "title": "PERFORMANCES",
        "text": "Le Super Air Nautique GS24 combine la coque du Ski Nautique et les innovations de la série Super Air G pour une polyvalence optimale sur ski, wakeboard, wakesurf ou foil. Il offre une direction assistée, un ballast automatisé, une Surface de Course Configurable (NCRS) et des moteurs PCM® puissants. Le système Nautique Surf avec WAVEPLATES® crée des vagues précises et modulables, tandis que MyNautique™ et l’application Garmin® permettent de contrôler vitesse, vagues et ballast à distance."
      },
      {
        "title": "ARRIÈRE",
        "text": "Le Super Air Nautique GS24 offre à l’arrière un confort et une praticité optimisés avec un siège arrière réversible coulissant et relevable, transformable en salon avec marche antidérapante Nauteak. Un pylône de ski optionnel, parfaitement intégré au tableau arrière, facilite le remorquage pour tous les sports nautiques. Le passage arrière antidérapant assure un accès facile à la plateforme de bain, tandis que les hayons à trois trappes offrent un rangement spacieux et sécurisé pour le moteur et l’équipement. Une télécommande stéréo optionnelle permet de contrôler la musique depuis l’arrière, et les sièges orientés vers l’arrière, légèrement inclinés, offrent un espace idéal pour se détendre et profiter du moment."
      },
      {
        "title": "MILIEU",
        "text": "Le Super Air Nautique GS24 allie confort et équipement haut de gamme avec tour de contrôle manuelle ou motorisée, système audio JL Audio® M3 ou M6, bimini et pare-soleil pour ombre et rangement, pare-brise moderne, Phender Pro pour sécuriser les accostages, pompe à air intégrée et éclairage personnalisable. La boîte à gants avec chargement sans fil complète l’expérience, offrant praticité, connectivité et confort pour tous les passagers."
      },
      {
        "title": "BARRE",
        "text": "Le Super Air Nautique GS24 place le confort et le contrôle au cœur de l’expérience pilote avec l’écran tactile panoramique LINC de 12,4 pouces pour gérer vagues, sillage, éclairage et musique. Le tableau de bord asymétrique offre rangement et visibilité optimaux, tandis que l’encodeur Helm Command permet de naviguer facilement dans les menus depuis l’accoudoir. Le siège pilote allie confort et polyvalence, la caméra de surveillance grand angle améliore la sécurité, et la direction électrique assure un pilotage fluide et sans effort."
      },
      {
        "title": "COQUE ET PROUE",
        "text": "La proue et la coque du Super Air Nautique GS24 allient confort, praticité et style avec un réseau lumineux d’amarrage LED pour une visibilité optimale de jour comme de nuit. Les sièges avant spacieux offrent porte-gobelets, rangement sous les coussins et options audio JL Audio® ou coussin de remplissage pour un espace détente complet. Une poubelle amovible Bow Walk Through facilite le maintien de la propreté à bord."
      }
    ],
    "faqs": [
      {
        "q": "Quel est le prix du Super Air Nautique GS24 ?",
        "a": "Les modèles d’occasion du Super Air Nautique GS24 (versions 2018–2021) se négocient généralement entre 180 000 € et 200 000 €, selon l’état et les options installées. Pour un modèle neuf 2025, le prix se situe autour de 215 000 €, variant selon les équipements et la configuration choisie. Pour obtenir les tarifs des modèles plus récents ou des options spécifiques, il est conseillé de contacter directement un concessionnaire Nautique ."
      },
      {
        "q": "Où acheter un Super Air Nautique GS24 ?",
        "a": "En France, vous pouvez acheter le Super Air Nautique GS24 directement chez Motor Boat 74, concessionnaire officiel de la marque. Nous proposons à la fois des modèles neufs et d’occasion, avec toutes les options disponibles et un accompagnement complet pour l’achat, l’entretien et l’hivernage."
      },
      {
        "q": "À qui confier l'entretien de mon Super Air Nautique GS24 ?",
        "a": "Pour l’entretien de votre Super Air Nautique GS24, vous pouvez le confier directement à Motor Boat 74, concessionnaire officiel Nautique. Nous assurons toutes les interventions, du moteur PCM ZZ8 aux systèmes électroniques, en passant par l’entretien de la coque, la sellerie ou l’hivernage."
      },
      {
        "q": "Quelle est la différence entre le GS24 et le GS20 ?",
        "a": "La principale différence entre le GS24 et le GS20 réside dans la taille, la capacité et le confort. Le GS24, plus grand (7,32 m), dispose d’un ballast plus important, d’un moteur plus puissant et d’un intérieur spacieux avec des sièges polyvalents, idéal pour les familles ou groupes souhaitant un bateau multi-activités performant et confortable. Le GS20, plus compact (6,1 m), reste maniable et polyvalent, avec un ballast et une motorisation adaptés à sa taille, parfait pour les sorties en groupe plus restreint tout en conservant les performances Nautique."
      }
    ]
  },
  "super-air-nautique-g25": {
    "slug": "super-air-nautique-g25",
    "name": "Super Air Nautique G25",
    "short": "G25",
    "gamme": "Série G",
    "year": "2026",
    "metaTitle": "Super Air Nautique G25 2026 - Fiche Technique Et Prix",
    "metaDescription": "Découvrez le Super Air Nautique G25 2026 chez MotorBoat74, concessionnaire officiel à Annecy. Découvrez le bateau dans notre showroom !",
    "intro": [
      "Le Super Air Nautique G25 2026 a été conçu pour ceux qui veulent partager la glisse en groupe sans compromettre le confort ni la performance. Avec sa capacité de 19 personnes, il permet de profiter de la vague avec famille ou amis, tout en conservant maniabilité et stabilité.",
      "Sa coque intègre la technologie Nautique Configurable Running Surface® (NCRS), qui ajuste la forme de la vague selon que vous pratiquez le wakesurf ou le wakeboard. Chaque run peut ainsi être parfaitement modulé pour répondre aux besoins des riders, qu’ils soient débutants ou confirmés.",
      "À bord, l’aménagement est pensé pour rendre l’expérience fluide et agréable : sièges modulables pour s’adapter aux groupes, système audio JL Audio® M Series Studio Elite, et connectivité MyNautique™, qui permet de suivre l’état du bateau depuis votre téléphone. Les différentes motorisations disponibles, associées à l’Integrated Steering Assist, offrent une maniabilité précise et un contrôle sûr, même à pleine charge."
    ],
    "hero": "/images/nautique/super-air-nautique-g25-1.jpg",
    "gallery": [
      "/images/nautique/super-air-nautique-g25-1.jpg",
      "/images/nautique/super-air-nautique-g25-2.jpg",
      "/images/nautique/super-air-nautique-g25-3.jpg",
      "/images/nautique/super-air-nautique-g25-4.jpg",
      "/images/nautique/super-air-nautique-g25-5.jpg"
    ],
    "specs": [
      {
        "group": "Dimensions",
        "items": [
          {
            "label": "Longueur totale",
            "value": "25’ 3” / 7.7 m"
          },
          {
            "label": "Longueur avec plateforme",
            "value": "27’ 5” / 8.61 m"
          },
          {
            "label": "Faisceau",
            "value": "102” / 2.59 m"
          },
          {
            "label": "Brouillon",
            "value": "31.25” / .79 m"
          }
        ]
      },
      {
        "group": "Capacité",
        "items": [
          {
            "label": "Capacité maximale",
            "value": "19 personnes / 2 800 lb / 1 270 kg"
          },
          {
            "label": "Ballast max (avec supplément)",
            "value": "3 600 lb / 1 633 kg"
          },
          {
            "label": "Poids sec approximatif",
            "value": "6 600 lb / 2 994 kg"
          },
          {
            "label": "Capacité de carburant",
            "value": "88 gal / 333,1 L"
          }
        ]
      },
      {
        "group": "Performance",
        "items": [
          {
            "label": "Puissance",
            "value": "ZZ6 – 450 ch / ZZ8S – 630 ch / 8LV 370 – 370 ch"
          },
          {
            "label": "Couple",
            "value": "465 pi-lb / 665 pi-lb / 595 pi-lb (diesel)"
          },
          {
            "label": "Rapport de réduction de vitesse",
            "value": "2.0:1 (ZZ6) / 1.7:1 (ZZ8S et diesel)"
          }
        ]
      }
    ],
    "highlights": [
      {
        "title": "PERFORMANCES",
        "text": "Le G25 2026 repousse les limites de la série G avec une coque optimisée pour des vagues de wakeboard et wakesurf modulables grâce au Nautique Configurable Running Surface® (NCRS). Le Nautique Surf System avec WavePlate® et le Surf Pipe assurent un sillage précis et personnalisable, tandis que l’Integrated Steering Assist facilite les manœuvres et l’accostage."
      },
      {
        "title": "ARRIÈRE",
        "text": "Le siège arrière réversible coulissant et rabattable se transforme en salon avec marche antidérapante Nauteak pour accéder facilement au tableau arrière. Le passage arrière antidérapant relie le salon à la plateforme de bain, tandis que les hayons arrière à trois trappes offrent un rangement optimisé pour wakeboards et équipements. Les sièges arrière inclinés créent un espace convivial et la télécommande stéréo arrière permet de gérer la musique directement depuis la plateforme."
      },
      {
        "title": "MILIEU",
        "text": "Le G25 2026 combine performance et praticité au milieu du navire. Les enceintes JL Audio M6 avec éclairage ambiant, les tours de contrôle télescopiques, et les porte-planches Strapless avec kit foils offrent son, rangement et flexibilité. Le bimini avec poches, les pare-soleil extensibles, le pare-brise sans cadre et l’option Phender Pro protègent et facilitent la navigation. À bord, coussins modulables, chargeurs sans fil et pompe à air intégrée assurent confort et commodité, tandis que le système audio JL Audio M6 Series Elite complète l’expérience."
      },
      {
        "title": "BARRE",
        "text": "Le G25 2026 centralise tous les réglages sur l’écran tactile LINC 15″, du ballast à la forme des vagues. Le volant cuir à branches tandem et le siège de barre motorisé assurent confort et précision. Le centre de commande Helm facilite l’accès aux réglages et à la musique, avec support magnétique pour téléphone et recharge sans fil. La caméra grand angle offre une visibilité optimale derrière le bateau pour plus de sécurité."
      },
      {
        "title": "COQUE ET PROUE",
        "text": "Le G25 2026 affiche une coque facettée et une proue anguleuse emblématique. Les feux d’accostage LED garantissent visibilité et sécurité, tandis que les sièges lounge avant avec rangement et enceintes JL Audio offrent confort et fonctionnalité. Le coussin de remplissage de proue facilite la circulation de l’avant vers l’arrière."
      }
    ],
    "faqs": [
      {
        "q": "Quel est le prix du Super Air Nautique G25 ?",
        "a": "Les modèles d’occasion du Super Air Nautique G25 (versions 2018–2021) se négocient en général entre 200 000 € et 260 000 €, selon l’état, les options et le lieu de vente. Pour les modèles neufs 2025, le prix varie habituellement de 250 000 € à 285 000 €, en fonction de la motorisation et des équipements choisis. Pour des modèles plus récents ou des options spécifiques, il est recommandé de contacter directement un concessionnaire Nautique ."
      },
      {
        "q": "Où acheter un Super Air Nautique G25 ?",
        "a": "En France, vous pouvez acheter le Super Air Nautique G25 directement chez Motor Boat 74, concessionnaire officiel de la marque. Nous proposons à la fois des modèles neufs et d’occasion, avec toutes les options disponibles et un accompagnement complet pour l’achat, l’entretien et l’hivernage."
      },
      {
        "q": "À qui confier l'entretien de mon Super Air Nautique G25 ?",
        "a": "Pour l’entretien de votre Super Air Nautique G25, vous pouvez le confier directement à Motor Boat 74, concessionnaire officiel Nautique. Nous assurons toutes les interventions, du moteur PCM ZZ8 aux systèmes électroniques, en passant par l’entretien de la coque, la sellerie ou l’hivernage."
      },
      {
        "q": "Quelle est la différence entre le G25 et le G21 ?",
        "a": "La principale différence entre le G25 et le G21 réside dans la taille, la puissance et les options. Le G25 mesure 7,62 m et accueille jusqu’à 19 passagers avec des moteurs plus puissants, un ballast supplémentaire et des fonctionnalités avancées comme l’Integrated Steering Assist et des enceintes JL Audio M6 de 12 pouces, tandis que le G21, plus compact (6,4 m), est plus maniable et abordable, avec moins d’options de ballast et un équipement audio plus simple, offrant ainsi une expérience haut de gamme mais plus compacte pour le wakesurf et wakeboard."
      }
    ]
  },
  "g23-paragon": {
    "slug": "g23-paragon",
    "name": "G23 Paragon",
    "short": "G23 Paragon",
    "gamme": "Paragon Series",
    "year": "2026",
    "metaTitle": "Nautique G23 Paragon 2026 - Fiche Technique Et Prix",
    "metaDescription": "Découvrez le Nautique G23 Paragon 2026 chez MotorBoat74, concessionnaire officiel à Annecy. Découvrez le bateau dans notre showroom !",
    "intro": [
      "Le Super Air Nautique G23 Paragon est un bateau de wake haut de gamme qui incarne à la fois luxe, performance et innovation. Conçu pour les passionnés de wakeboard et de wakesurf, il se distingue par un design angulaire affirmé et des coques multidimensionnelles capables de générer des vagues puissantes et parfaitement modulables. À bord, chaque détail a été pensé pour offrir un confort optimal, dans un cadre élégant et moderne, établissant de nouveaux standards dans l’univers des sports nautiques.",
      "Pour marquer le centenaire de la marque, Nautique dévoile une édition spéciale Centennial du G23. Cette version anniversaire se pare d’éléments exclusifs, comme un logo centenaire finement gravé sur le volant et une teinte de coque inédite baptisée « Centennial Black Metal Flake ». Ce coloris unique marie l’intensité d’un noir onyx profond à des paillettes dorées, offrant un rendu visuel spectaculaire et raffiné, à la hauteur de l’événement."
    ],
    "hero": "/images/nautique/g23-paragon-1.jpg",
    "gallery": [
      "/images/nautique/g23-paragon-1.jpg",
      "/images/nautique/g23-paragon-2.jpg",
      "/images/nautique/g23-paragon-3.jpg",
      "/images/nautique/g23-paragon-4.jpg",
      "/images/nautique/g23-paragon-5.jpg"
    ],
    "specs": [
      {
        "group": "Dimensions",
        "items": [
          {
            "label": "Longueur totale",
            "value": "23′ 3” / 7,09 m"
          },
          {
            "label": "Longueur avec plateforme",
            "value": "25′ 5″ / 7,75 m"
          },
          {
            "label": "Faisceau",
            "value": "102” / 2,59 m"
          },
          {
            "label": "Brouillon",
            "value": "34 po / 0,86 m"
          }
        ]
      },
      {
        "group": "Capacité",
        "items": [
          {
            "label": "Capacité maximale",
            "value": "16 personnes / 2 500 LB / 1 134 KG"
          },
          {
            "label": "Ballast max (avec supplément)",
            "value": "3 700 LB / 1 678 KG"
          },
          {
            "label": "Poids sec approximatif",
            "value": "7 750 LB / 3 515 KG"
          },
          {
            "label": "Capacité de carburant",
            "value": "65,6 GAL / 248,2 L"
          }
        ]
      },
      {
        "group": "Performance",
        "items": [
          {
            "label": "Puissance",
            "value": "ZZ8S – 630 CH / 8LV 370 – 370 CH"
          },
          {
            "label": "Couple",
            "value": "665 PI-LB / 595 PI-LB (DIESEL)"
          },
          {
            "label": "Rapport de réduction de vitesse",
            "value": "1.7:1"
          }
        ]
      }
    ],
    "highlights": [
      {
        "title": "PERFORMANCES",
        "text": "Le G23 Paragon combine une coque modulable avec ballast ajustable, une assistance à la direction, et des moteurs PCM ou Yanmar pour adapter sillage et vagues. Le système NCRS et le Nautique Surf System avec WAVEPLATE® permettent de personnaliser l’assiette et la forme des vagues, tandis que le Surf Pipe optimise le flux moteur. La connectivité MyNautique™ et l’intégration Garmin offrent un contrôle à distance des paramètres clés, incluant vitesse, ballast et réglages de vague."
      },
      {
        "title": "ARRIÈRE",
        "text": "Le G23 Paragon arrière offre un confort modulable et un accès facilité : le siège arrière réversible et les sièges convertibles s’ajustent pour créer une banquette pleine largeur ou une position dos à la route, avec tablettes intégrées pour plus de praticité. La trappe moteur électrique donne un accès simple au moteur et aux rangements, complétés par un espace dédié aux planches et accessoires. Le passage arrière intègre des marches multi-niveaux avec revêtements antidérapants, tandis que la télécommande stéréo et le système JL Audio WakeSub™ assurent un contrôle de la musique et une immersion sonore optimale."
      },
      {
        "title": "MILIEU",
        "text": "Le milieu du G23 Paragon combine confort, praticité et connectivité : la tour de contrôle télescopique s’ajuste facilement, le bimini et les pare-soleil offrent ombre et rangement, et le pare-brise assure visibilité et personnalisation. Un tiroir à objets de valeur, une pompe à air intégrée, des coussins et des supports de charge sans fil facilitent l’usage quotidien. Le système sonore JL Audio diffuse un son immersif, et l’éclairage de courtoisie est personnalisable depuis l’écran tactile."
      },
      {
        "title": "BARRE",
        "text": "La barre du G23 Paragon combine contrôle, confort et sécurité : les écrans panoramiques doubles LINC de 15 pouces offrent une gestion intuitive des paramètres et un accès rapide aux données essentielles, tandis que le centre de commande Helm avec encodeur rotatif et touches de raccourci facilite la navigation et le contrôle de l’autoradio. Le siège de pilotage motorisé se règle dans toutes les directions pour un confort optimal, et la caméra grand angle Nautique assure une surveillance claire des surfeurs et passagers depuis l’écran LINC. Le tableau de bord ergonomique intègre des rangements pratiques et un accès facile aux commandes essentielles."
      },
      {
        "title": "COQUE ET PROUE",
        "text": "L’avant du G23 Paragon est un espace à la fois confortable et pratique, pensé pour accueillir jusqu’à quatre personnes avec rangements et porte-gobelets intégrés. L’éclairage LED à la proue assure une visibilité optimale et un style unique, de jour comme de nuit. Les badges lumineux ajoutent une touche élégante pour sublimer le bateau dans l’obscurité."
      }
    ],
    "faqs": [
      {
        "q": "Quel est le prix du G23 Paragon ?",
        "a": "Pour les modèles d’occasion (2018–2021) du Super Air Nautique G23 Paragon, les prix se situent généralement entre 330 000 € et 410 000 €, selon l’état, le niveau d’options et le lieu d’achat. Les modèles neufs (2025) sont proposés dans une fourchette allant de 420 000 € à 465 000 €. Pour des modèles plus récents ou des options spécifiques, il est recommandé de contacter directement un concessionnaire Nautique ."
      },
      {
        "q": "Où acheter un G23 Paragon ?",
        "a": "En France, vous pouvez acheter le G23 Paragon directement chez Motor Boat 74, concessionnaire officiel de la marque. Nous proposons à la fois des modèles neufs et d’occasion, avec toutes les options disponibles et un accompagnement complet pour l’achat, l’entretien et l’hivernage."
      },
      {
        "q": "À qui confier l'entretien de mon G23 Paragon ?",
        "a": "Pour l’entretien de votre G23 Paragon, vous pouvez le confier directement à Motor Boat 74, concessionnaire officiel Nautique. Nous assurons toutes les interventions, du moteur PCM ZZ8 aux systèmes électroniques, en passant par l’entretien de la coque, la sellerie ou l’hivernage."
      },
      {
        "q": "Quelle est la différence entre le G23 Paragon et le G25 Paragon ?",
        "a": "Le Super Air Nautique G23 Paragon et le G25 Paragon partagent une conception haut de gamme axée sur la performance, mais diffèrent principalement par leur taille, leur capacité et leurs caractéristiques spécifiques. Le G23 Paragon, long de 7,01 mètres, offre une capacité de 16 passagers et est équipé d'un moteur PCM ZZ8 de 630 ch. Il est conçu pour les passionnés recherchant une performance exceptionnelle dans un format plus compact. En revanche, le G25 Paragon, mesurant 7,62 mètres, peut accueillir jusqu'à 19 passagers et dispose également d'un moteur PCM ZZ8 de 630 ch. Sa taille accrue permet une plus grande capacité de ballast et une stabilité améliorée, idéale pour les groupes plus importants ou ceux recherchant une expérience encore plus luxueuse."
      }
    ]
  },
  "g25-paragon": {
    "slug": "g25-paragon",
    "name": "G25 Paragon",
    "short": "G25 Paragon",
    "gamme": "Paragon Series",
    "year": "2026",
    "metaTitle": "Nautique G25 Paragon 2026 - Fiche Technique Et Prix",
    "metaDescription": "Découvrez le Nautique G25 Paragon 2026 chez MotorBoat74, concessionnaire officiel à Annecy. Découvrez le bateau dans notre showroom !",
    "intro": [
      "Le Super Air Nautique G25 Paragon est un bateau de wake conçu pour le wakesurf et le wakeboard. Sa coque et sa conception permettent de créer des vagues modulables adaptées à différents niveaux et styles de navigation. L’aménagement intérieur privilégie le confort et la fonctionnalité, avec des matériaux de qualité et un agencement pensé pour faciliter les déplacements à bord.",
      "Pour le centenaire de Nautique, le G25 propose une édition spéciale Centennial. Cette version se distingue par des détails spécifiques, comme un logo centenaire gravé sur le tableau de bord et une couleur de coque nommée « Centennial Deep Slate », un gris métallisé avec des reflets subtils, apportant une touche d’originalité tout en restant sobre."
    ],
    "hero": "/images/nautique/g25-paragon-1.jpg",
    "gallery": [
      "/images/nautique/g25-paragon-1.jpg",
      "/images/nautique/g25-paragon-2.jpg",
      "/images/nautique/g25-paragon-3.jpg",
      "/images/nautique/g25-paragon-4.jpg",
      "/images/nautique/g25-paragon-5.jpg"
    ],
    "specs": [
      {
        "group": "Dimensions",
        "items": [
          {
            "label": "Longueur totale",
            "value": "25’ 3” / 7.7 m"
          },
          {
            "label": "Longueur avec plateforme",
            "value": "27’ 5” / 8.61 m"
          },
          {
            "label": "Faisceau",
            "value": "102” / 2.59 m"
          },
          {
            "label": "Brouillon",
            "value": "34.5” / .88 m"
          }
        ]
      },
      {
        "group": "Capacité",
        "items": [
          {
            "label": "Capacité maximale",
            "value": "19 personnes / 2 800 lb / 1 270 kg"
          },
          {
            "label": "Ballast max (avec supplément)",
            "value": "3 400 lb / 1 542 kg"
          },
          {
            "label": "Poids sec approximatif",
            "value": "8 400 lb / 3 810 kg"
          },
          {
            "label": "Capacité de carburant",
            "value": "88 gal / 333,1 L"
          }
        ]
      },
      {
        "group": "Performance",
        "items": [
          {
            "label": "Puissance",
            "value": "ZZ8S – 630 ch / 8LV 370 – 370 ch"
          },
          {
            "label": "Couple",
            "value": "665 pi-lb / 595 pi-lb (diesel)"
          },
          {
            "label": "Rapport de réduction de vitesse",
            "value": "1.7:1"
          }
        ]
      }
    ],
    "highlights": [
      {
        "title": "PERFORMANCES",
        "text": "Le G25 Paragon a été pensé pour ceux qui veulent profiter à fond de leurs sorties sur l’eau. Sa coque primée crée des vagues parfaites, que vous soyez débutant ou pro, et ses systèmes avancés rendent le pilotage précis et facile. Avec le ballast, le contrôle des vagues et la connectivité à distance, vous pouvez vraiment adapter chaque sortie à votre style et à votre niveau."
      },
      {
        "title": "ARRIÈRE",
        "text": "À l’arrière du G25 Paragon, tout est pensé pour votre confort et votre plaisir. Les sièges se transforment facilement en banquette ou en espace lounge, le passage arrière et la plateforme rendent l’accès à l’eau simple et sûr, et les rangements gardent vos planches et accessoires organisés. Le son immersif du WakeSub complète l’expérience pour des sorties nautiques inoubliables."
      },
      {
        "title": "MILIEU",
        "text": "Profitez d’une expérience sonore immersive avec les enceintes JL Audio, d’un pare-soleil et d’un bimini généreux pour vous protéger du soleil, et de rangements ingénieux pour vos planches et accessoires. Chaque détail, du pare-brise au tiroir à objets de valeur, est conçu pour rendre vos sorties sur l’eau à la fois pratiques et agréables."
      },
      {
        "title": "BARRE",
        "text": "Au poste de pilotage du G25 Paragon, tout est conçu pour que vous gardiez le contrôle en confort et en sécurité. Les écrans LINC, le siège motorisé et le centre de commande Helm rendent la conduite intuitive, tandis que la caméra arrière et le tableau de bord ergonomique assurent une visibilité parfaite."
      },
      {
        "title": "COQUE ET PROUE",
        "text": "La proue du G25 Paragon combine confort et praticité. Elle accueille jusqu’à quatre passagers avec des sièges spacieux, des porte-gobelets et des rangements astucieux. Le coussin rabattable dévoile un revêtement antidérapant pour circuler facilement, tandis que les feux LED et les badges éclairés assurent visibilité et style, de jour comme de nuit."
      }
    ],
    "faqs": [
      {
        "q": "Quel est le prix du G25 Paragon ?",
        "a": "Les modèles d’occasion (2018–2021) du Super Air Nautique G25 Paragon se situent généralement entre 350 000 € et 430 000 €, selon l’état, les options et le lieu de vente. Les modèles neufs (2025) sont annoncés entre 445 000 € et 510 000 €, avec certains concessionnaires premium proposant le prix sur demande."
      },
      {
        "q": "Où acheter un G25 Paragon ?",
        "a": "En France, vous pouvez acheter le G25 Paragon directement chez Motor Boat 74, concessionnaire officiel de la marque. Nous proposons à la fois des modèles neufs et d’occasion, avec toutes les options disponibles et un accompagnement complet pour l’achat, l’entretien et l’hivernage."
      },
      {
        "q": "À qui confier l'entretien de mon G25 Paragon ?",
        "a": "Pour l’entretien de votre G25 Paragon, vous pouvez le confier directement à Motor Boat 74, concessionnaire officiel Nautique. Nous assurons toutes les interventions, du moteur PCM ZZ8 aux systèmes électroniques, en passant par l’entretien de la coque, la sellerie ou l’hivernage."
      },
      {
        "q": "Quelle est la différence entre le G25 Paragon et le reste de la gamme Paragon ?",
        "a": "Le Super Air Nautique G25 Paragon se distingue comme le modèle le plus haut de gamme de la série Paragon, offrant un moteur PCM ZZ8 de 630 ch, un ballast de grande capacité et le système Nautique Surf System pour des vagues de niveau professionnel, tout en combinant luxe, confort et équipements exclusifs tels que tour télescopique motorisée et audio JL Audio WakeSub. Comparé aux autres modèles Paragon comme le G23, il se caractérise par sa taille plus grande, sa capacité supérieure et ses innovations uniques, s’adressant à ceux qui recherchent la performance maximale et l’expérience Nautique la plus complète."
      }
    ]
  },
  "ski-nautique": {
    "slug": "ski-nautique",
    "name": "Ski Nautique",
    "short": "Ski Nautique",
    "gamme": "Ski Nautique",
    "year": "2026",
    "metaTitle": "Ski Nautique 2026 - Fiche Technique Et Prix",
    "metaDescription": "Découvrez la gamme Ski Nautique. Le Ski Nautique 2026, bateau de référence pour le ski slalom, à découvrir chez Motorboat74 à Annecy",
    "intro": [
      "Nautique a relevé le défi de créer un bateau de ski nautique alliant performance, maniabilité et confort pour slalom, figures et saut.",
      "Le Ski Nautique combine une coque légère et robuste à des technologies de pointe comme MicroTuner®, Automated HydroGate® et Zero Off®, offrant des wakes stables, précis et adaptés à tous les niveaux. Le poste de pilotage intuitif, la sellerie modulable et la plage arrière optimisée garantissent un confort et une fonctionnalité optimale pour skieurs et coachs.",
      "Le résultat : un bateau performant, précis et élégant, véritable référence pour le ski nautique en compétition comme en loisir."
    ],
    "hero": "/images/nautique/ski-nautique-1.jpg",
    "gallery": [
      "/images/nautique/ski-nautique-1.jpg",
      "/images/nautique/ski-nautique-2.jpg",
      "/images/nautique/ski-nautique-3.jpg",
      "/images/nautique/ski-nautique-4.jpg",
      "/images/nautique/ski-nautique-5.jpg"
    ],
    "specs": [
      {
        "group": "Dimensions",
        "items": [
          {
            "label": "Longueur totale",
            "value": "20′ / 6.10 m"
          },
          {
            "label": "Longueur avec plateforme",
            "value": "21′ 11″ / 6.68 m"
          },
          {
            "label": "Faisceau",
            "value": "94″ / 2.39 m"
          },
          {
            "label": "Brouillon",
            "value": "21″ / 0.53 m"
          }
        ]
      },
      {
        "group": "Capacité",
        "items": [
          {
            "label": "Capacité maximale",
            "value": "6 personnes / 1 350 lb / 612 kg"
          },
          {
            "label": "Ballast max (avec supplément)",
            "value": "400 lbs. / 181.4 kg"
          },
          {
            "label": "Poids sec approximatif",
            "value": "2,800 lbs. / 1,270 kg"
          },
          {
            "label": "Capacité de carburant",
            "value": "28 gal / 106 L"
          }
        ]
      },
      {
        "group": "Performance",
        "items": [
          {
            "label": "Puissance",
            "value": "ZZ6 – 450 HP / ZZ5 – 355 HP"
          },
          {
            "label": "Couple",
            "value": "ZZ6 – 465 Ft-Lb / ZZ5 – 405 Ft-Lb"
          },
          {
            "label": "Rapport de réduction de vitesse",
            "value": "1.23:1"
          }
        ]
      }
    ],
    "highlights": [
      {
        "title": "PERFORMANCES",
        "text": "Le Ski Nautique 2026 repousse les limites du ski nautique en trois épreuves grâce à sa coque allégée en fibre de carbone et de verre, associée aux technologies MicroTuner® et HydroGate® automatisé pour des sillages plats, homogènes et ajustables. Le Zero Off® GPS assure une vitesse constante, les ailerons de suivi garantissent une trajectoire précise, et les actionneurs intelligents optimisent en temps réel la glisse. Propulsé par les moteurs PCM® ZZ5 ou ZZ6, il délivre puissance, réactivité et contrôle pour une expérience fluide et performante à tous les niveaux."
      },
      {
        "title": "ARRIÈRE",
        "text": "Conçu pour allier confort et praticité, l’arrière du Ski Nautique offre des équipements pensés pour les skieurs comme pour les moments de détente. Les supports à skis avec revêtement antidérapant protègent et maintiennent vos skis en toute sécurité, tout en libérant l’espace sur la plateforme. La banquette arrière modulable se transforme en assise, en marche d’accès ou en plateforme d’entraînement selon vos besoins. Une télécommande stéréo optionnelle permet de gérer facilement la musique depuis la plateforme, tandis que la poignée intégrée facilite la remontée à bord, le tout dans un design discret et raffiné."
      },
      {
        "title": "MILIEU",
        "text": "L’arrière du Ski Nautique combine confort, praticité et design épuré. Les supports à skis antidérapants protègent et maintiennent vos skis tout en libérant de l’espace sur la plateforme, tandis que la banquette arrière modulable se transforme facilement en marche d’accès ou en plateforme d’entraînement. Une télécommande stéréo optionnelle permet de gérer la musique depuis l’arrière, et la poignée intégrée facilite la remontée à bord depuis l’eau, offrant ainsi une expérience à la fois fonctionnelle et agréable pour les skieurs et les passagers."
      },
      {
        "title": "BARRE",
        "text": "La barre du Ski Nautique 2026 combine contrôle, confort et praticité. Le rétroviseur 360° offre une vue complète sur le skieur, tandis que l’écran tactile LINC optimise HydroGate® et MicroTuners® et permet de régler traction, lest et parcours. Le tableau de bord repensé intègre rangement et prises électriques, et le centre de commandement Helm facilite l’accès aux fonctions clés. Le siège de pilotage ergonomique assure visibilité et maintien, tandis que le chargeur sans fil garde vos appareils opérationnels pour une navigation fluide et performante."
      },
      {
        "title": "COQUE ET PROUE",
        "text": "La proue du Ski Nautique 2026 allie sécurité et praticité. La passerelle avant en NauTeak antidérapant permet un accès facile au quai et au remorquage, tandis que le rangement de la proue offre un espace spacieux et sécurisé pour votre équipement, accessible depuis le siège passager et doté d’éclairage et de surfaces antidérapantes pour protéger vos affaires."
      }
    ],
    "faqs": [
      {
        "q": "Quel est le prix du Ski Nautique ?",
        "a": "Les modèles d’occasion (2018–2021) du Ski Nautique se situent généralement entre 80 000 € et 130 000 €, selon l’état, la motorisation et le lieu de vente. Les modèles neufs (2025) sont annoncés entre 118 000 € et 176 000 €, avec certains concessionnaires premium proposant le prix sur demande."
      },
      {
        "q": "Où acheter un Ski Nautique ?",
        "a": "En France, vous pouvez acheter le Ski Nautique directement chez Motor Boat 74, concessionnaire officiel de la marque. Nous proposons à la fois des modèles neufs et d’occasion, avec toutes les options disponibles et un accompagnement complet pour l’achat, l’entretien et l’hivernage."
      },
      {
        "q": "À qui confier l'entretien de mon Ski Nautique ?",
        "a": "Pour l’entretien de votre Ski Nautique, vous pouvez le confier directement à Motor Boat 74, concessionnaire officiel Nautique. Nous assurons toutes les interventions, du moteur PCM ZZ8 aux systèmes électroniques, en passant par l’entretien de la coque, la sellerie ou l’hivernage."
      },
      {
        "q": "Qu'est-ce qui rend le modèle Ski Nautique unique ?",
        "a": "Le Ski Nautique est reconnu comme la référence mondiale du ski nautique de compétition. Conçu exclusivement pour la performance, il offre une vague stable, fine et parfaitement symétrique, idéale pour le slalom, les figures et le saut. Sa coque T-Drive™ minimise la traînée et garantit une trajectoire ultra-précise, tandis que le moteur PCM ZZ6 6.2L V8 (450 ch), associé au système Zero-Off GPS, assure une vitesse constante au centième de km/h. Le poste de pilotage LINC Panoray permet de contrôler tous les paramètres de traction avec une précision professionnelle. Finitions haut de gamme, sellerie sur mesure et technologies embarquées en font un modèle à la fois sportif, élégant et exclusif, choisi par les clubs et athlètes de niveau tournoi dans le monde entier."
      }
    ]
  },
  "super-air-nautique-g23": {
    "slug": "super-air-nautique-g23",
    "name": "Super Air Nautique G23",
    "short": "G23",
    "gamme": "Série G",
    "year": "2026",
    "metaTitle": "Super Air Nautique G23 — Fiche Technique & Prix | MotorBoat74",
    "metaDescription": "Découvrez le Super Air Nautique G23 chez MotorBoat74, concessionnaire officiel Nautique à Annecy. Fiche technique, performances wakeboard/wakesurf et essai sur le lac d'Annecy.",
    "intro": [
      "Depuis plus de dix ans, le G23 est le wakeboat le plus recherché de l'industrie, avec le palmarès pour le prouver. Ce modèle primé est la référence absolue des riders professionnels qui veulent repousser les limites du possible sur l'eau, tout en s'adaptant aux débutants grâce à des vagues et sillages modulables selon le niveau de chacun.",
      "Le design orienté performance du G23 a été méticuleusement affiné pour incarner le sommet de l'excellence sur l'eau, avec une profusion d'équipements luxueux pour une finition inégalée."
    ],
    "hero": "/images/nautique/g23-paragon-2.jpg",
    "gallery": [
      "/images/nautique/g23-paragon-2.jpg",
      "/images/nautique/g23-paragon-3.jpg",
      "/images/nautique/g23-paragon-4.jpg"
    ],
    "specs": [
      {
        "group": "Dimensions",
        "items": [
          {
            "label": "Longueur totale",
            "value": "23′ / 7,01 m"
          },
          {
            "label": "Faisceau",
            "value": "100″ / 2,54 m"
          }
        ]
      },
      {
        "group": "Capacité",
        "items": [
          {
            "label": "Capacité maximale",
            "value": "16 personnes"
          },
          {
            "label": "Poids sec approximatif",
            "value": "6 300 lb / 2 858 kg"
          }
        ]
      },
      {
        "group": "Performance",
        "items": [
          {
            "label": "Puissance maximale",
            "value": "PCM ZZ8 — 630 CV"
          }
        ]
      }
    ],
    "highlights": [
      {
        "title": "LE CHOIX INCONTESTÉ",
        "text": "Pendant plus d'une décennie, le G23 s'est imposé comme le bateau de choix des riders professionnels, avec un palmarès de récompenses inégalé dans l'industrie du wake."
      },
      {
        "title": "VAGUES MODULABLES",
        "text": "Grâce au Nautique Surf System, le G23 produit des vagues et sillages parfaitement calibrés, ajustables au niveau de chaque rider, du débutant au compétiteur."
      }
    ],
    "faqs": [
      {
        "q": "Quel est le prix du Super Air Nautique G23 ?",
        "a": "Le prix du G23 dépend de la configuration et des options. MotorBoat74, concessionnaire officiel Nautique à Annecy, établit un devis personnalisé et propose neuf comme occasion. Contactez-nous pour connaître les disponibilités."
      },
      {
        "q": "Où acheter un Super Air Nautique G23 en France ?",
        "a": "En France, vous pouvez acheter le G23 directement chez MotorBoat74, concessionnaire officiel Nautique, avec accompagnement complet pour l'achat, l'entretien et l'hivernage."
      },
      {
        "q": "Peut-on essayer le G23 sur le lac d'Annecy ?",
        "a": "Oui, MotorBoat74 organise des essais du G23 sur le lac d'Annecy. Réservez votre créneau en nous contactant."
      }
    ]
  },
  "super-air-nautique-g21": {
    "slug": "super-air-nautique-g21",
    "name": "Super Air Nautique G21",
    "short": "G21",
    "gamme": "Série G",
    "year": "2026",
    "metaTitle": "Super Air Nautique G21 — Fiche Technique & Prix | MotorBoat74",
    "metaDescription": "Découvrez le Super Air Nautique G21 chez MotorBoat74, concessionnaire officiel Nautique à Annecy. Fiche technique, performances et essai sur le lac d'Annecy.",
    "intro": [
      "Le G21 confirme sa réputation de bateau de 21 pieds le plus innovant du marché. Doté de la meilleure coque de l'industrie, ce performeur primé délivre des vagues et sillages de niveau professionnel, modulables pour accueillir tous les passagers à bord.",
      "Ce performeur légendaire affiche une esthétique moderne incomparable et un intérieur iconique typiquement Série G, avec une profusion d'équipements de série premium et d'options pour configurer votre G21 selon vos préférences exactes."
    ],
    "hero": "/images/nautique/super-air-nautique-g25-2.jpg",
    "gallery": [
      "/images/nautique/super-air-nautique-g25-2.jpg",
      "/images/nautique/super-air-nautique-g25-3.jpg",
      "/images/nautique/super-air-nautique-g25-4.jpg"
    ],
    "specs": [
      {
        "group": "Dimensions",
        "items": [
          {
            "label": "Longueur totale",
            "value": "21′ / 6,45 m"
          },
          {
            "label": "Faisceau",
            "value": "100″ / 2,54 m"
          }
        ]
      },
      {
        "group": "Capacité",
        "items": [
          {
            "label": "Capacité maximale",
            "value": "14 personnes"
          },
          {
            "label": "Poids sec approximatif",
            "value": "5 900 lb / 2 676 kg"
          }
        ]
      },
      {
        "group": "Performance",
        "items": [
          {
            "label": "Puissance maximale",
            "value": "PCM ZZ8 — 630 CV"
          }
        ]
      }
    ],
    "highlights": [
      {
        "title": "PERFORMANCE PRIMÉE",
        "text": "Avec la meilleure coque de l'industrie, le G21 délivre des vagues et sillages de niveau professionnel, modulables pour s'adapter à tous les riders à bord."
      },
      {
        "title": "ADN SÉRIE G",
        "text": "Esthétique moderne, intérieur iconique et équipements premium : le G21 condense tout l'ADN de la Série G dans un format de 21 pieds plus compact et maniable."
      }
    ],
    "faqs": [
      {
        "q": "Quel est le prix du Super Air Nautique G21 ?",
        "a": "Le prix du G21 dépend de la configuration et des options. MotorBoat74, concessionnaire officiel Nautique à Annecy, établit un devis personnalisé. Contactez-nous pour les disponibilités neuf et occasion."
      },
      {
        "q": "Où acheter un Super Air Nautique G21 en France ?",
        "a": "En France, vous pouvez acheter le G21 directement chez MotorBoat74, concessionnaire officiel Nautique, avec un accompagnement complet."
      },
      {
        "q": "Peut-on essayer le G21 sur le lac d'Annecy ?",
        "a": "Oui, MotorBoat74 organise des essais du G21 sur le lac d'Annecy. Contactez-nous pour réserver."
      }
    ]
  }
};

export function getModel(slug: string): NautiqueModel | undefined {
  return nautiqueModels[slug];
}
