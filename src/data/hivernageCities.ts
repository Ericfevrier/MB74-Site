/**
 * Pages locales hivernage/stockage — contenu reproduit de motorboat74.com.
 * NE PAS éditer à la main : régénéré via /tmp/parse-cities.mjs + script de génération.
 */

export interface HivernagePort { title: string; desc: string; }
export interface HivernageCity {
  slug: string;
  city: string;
  h1: string;
  metaTitle: string;
  metaDescription: string;
  hero: string;
  intro: string;
  lake: string;
  zonesIntro: string;
  ports: HivernagePort[];
}

export const HIVERNAGE_CITY_ORDER: string[] = ["annecy","aix-les-bains","evian-les-bains","thonon-les-bains","geneve","lac-de-serre-poncon"];

export const hivernageCities: Record<string, HivernageCity> = {
  "annecy": {
    "slug": "annecy",
    "city": "Annecy",
    "h1": "Hivernage et stockage de bateaux à Annecy",
    "metaTitle": "Hivernage Et Stockage De Bateaux à Annecy",
    "metaDescription": "Protégez votre bateau à Annecy avec MotorBoat 74. Hivernage intérieur, stockage sécurisé et entretien complet, proche du lac d’Annecy.",
    "hero": "/images/hivernage/annecy.jpg",
    "intro": "Protégez votre bateau durant la saison hivernale avec notre service complet d'hivernage à Annecy. Chez MotorBoat 74, nous proposons des solutions de stockage sécurisées, intérieures ou extérieures, adaptées à tous types d'embarcations, à proximité immédiate du lac d'Annecy.",
    "lake": "lac d'Annecy",
    "zonesIntro": "Nous intervenons dans l’ensemble des principaux ports et zones d’amarrage du lac d’Annecy. Que votre bateau soit déjà amarré sur place ou nécessite un transport, nous prenons en charge l’intégralité de la logistique pour son hivernage. La mise à l’eau est adaptée au gabarit de chaque embarcation afin de garantir le respect des normes de sécurité et d’assurer une opération fluide et sans risque.",
    "ports": [
      {
        "title": "Port de plaisance d'Annecy (Albigny)",
        "desc": "Situé dans le prolongement de la plage d'Albigny, ce port offre 202 emplacements à l'année, dont 8 réservés aux bateaux électriques. Il dispose de 4 pontons adaptés à différentes tailles de bateaux et d'une rampe de mise à l'eau accessible à tous. L'accès est gratuit, mais le stationnement à proximité est limité."
      },
      {
        "title": "Port de Menthon-Saint-Bernard",
        "desc": "Ce port se trouve sur la promenade Philibert d'Orlye, une zone piétonne idéale pour flâner. Il propose 10 emplacements à l'année. Une partie du port est occupée par des pédalos et de petits bateaux à moteur, tandis que le reste est réservé à l'Association des pêcheurs de la commune."
      },
      {
        "title": "Port de Veyrier-du-Lac",
        "desc": "Situé sur la rive est du lac, ce port est idéal pour les plaisanciers recherchant un cadre paisible. Il offre des services adaptés aux besoins des navigateurs. Le port est accessible toute l'année et constitue un point de départ privilégié pour explorer le lac."
      },
      {
        "title": "Ports de Talloires-Montmin",
        "desc": "Ce site exceptionnel comprend 4 ports pour l'amarrage des bateaux, situés dans la baie de Talloires, face au Château de Duingt et au Massif des Bauges. Il propose 120 emplacements à l'année et 10 boucles temporaires. Le site est ouvert toute l'année, offrant ainsi une accessibilité continue aux plaisanciers."
      },
      {
        "title": "Port de Duingt",
        "desc": "Situé à proximité de la plage et du club de voile, ce port fait face au Roc de Chère et à la baie de Talloires. Il offre des services adaptés aux besoins des navigateurs et constitue un point de départ idéal pour explorer le lac."
      },
      {
        "title": "Port de Sevrier",
        "desc": "Ce port est situé à proximité de la plage, du club de voile et du club de canoë-kayak. Il offre des services adaptés aux besoins des navigateurs. Le port est accessible toute l'année et constitue un point de départ privilégié pour explorer le lac."
      },
      {
        "title": "Rampe de mise à l'eau des Marquisats (Annecy)",
        "desc": "Située près de la Société des Régates à Voiles d'Annecy (SRVA), cette rampe est gratuite. Cependant, le stationnement à proximité est payant. Elle est idéale pour les petites embarcations, mais il est important de noter que les véhicules ne peuvent pas stationner à proximité."
      },
      {
        "title": "Rampe de mise à l'eau d'Albigny (Annecy)",
        "desc": "Entre la plage et le port, cette rampe est gratuite. Cependant, le stationnement est limité. Elle est idéale pour les petites embarcations, mais il est important de noter que les véhicules ne peuvent pas stationner à proximité."
      },
      {
        "title": "Rampe de mise à l'eau de Veyrier-du-Lac",
        "desc": "Cette rampe est libre d'accès, mais elle est inaccessible aux bateaux de plus de 5 m. Le parking est payant. Elle est idéale pour les petites embarcations, mais il est important de noter que les véhicules ne peuvent pas stationner à proximité."
      },
      {
        "title": "Zone d'amarrage des Jardins de l'Europe (Annecy)",
        "desc": "Située entre l'Hôtel de Ville et l'Île des Cygnes, cette zone est utilisée pour l'amarrage temporaire ou le débarquement. Elle est idéale pour les petites embarcations, mais il est important de noter que les véhicules ne peuvent pas stationner à proximité."
      },
      {
        "title": "Zone d'amarrage du Quai de la Tournette (Annecy)",
        "desc": "Proche de l'embarcadère, cette zone est utilisée pour l'amarrage temporaire ou le débarquement. Elle est idéale pour les petites embarcations, mais il est important de noter que les véhicules ne peuvent pas stationner à proximité."
      },
      {
        "title": "Zone d'amarrage de Lamouille (Duingt)",
        "desc": "À proximité du château de Duingt, cette zone est utilisée pour l'amarrage temporaire ou le débarquement. Elle est idéale pour les petites embarcations, mais il est important de noter que les véhicules ne peuvent pas stationner à proximité."
      }
    ]
  },
  "aix-les-bains": {
    "slug": "aix-les-bains",
    "city": "Aix-les-Bains",
    "h1": "Hivernage et stockage de bateaux à Aix-les-Bains",
    "metaTitle": "Hivernage Et Stockage De Bateaux à Aix-les-Bains",
    "metaDescription": "Protégez votre bateau à Aix-les-Bains avec MotorBoat 74. Hivernage intérieur, stockage sécurisé et entretien complet, proche du Lac du Bourget.",
    "hero": "/images/hivernage/aix-les-bains.jpg",
    "intro": "Nous prenons en charge votre bateau sur le lac du Bourget pour l’hiver grâce à notre service complet d’hivernage. MotorBoat 74 assure le transport et le stockage sécurisé en intérieur, avec un entretien adapté à tous types d’embarcations, pour que votre bateau reste parfaitement protégé tout au long de la saison hivernale.",
    "lake": "lac du Bourget",
    "zonesIntro": "À Aix-les-Bains et sur l’ensemble des ports du lac du Bourget, nous intervenons pour prendre en charge votre bateau. Que votre embarcation soit déjà amarrée ou nécessite un transport, nous gérons toute la logistique de son hivernage. La mise à l’eau est adaptée au gabarit de chaque bateau, pour garantir sécurité et fluidité à chaque opération.",
    "ports": [
      {
        "title": "Grand Port d’Aix-les-Bains",
        "desc": "Situé au cœur d’Aix-les-Bains, le Grand Port offre plus de 920 places d’amarrage et des pontons adaptés à toutes tailles de bateaux. C’est un emplacement idéal pour la sortie de l’eau avant hivernage ou pour remettre votre bateau à l’eau au début de la saison."
      },
      {
        "title": "Petit Port d’Aix-les-Bains",
        "desc": "Ce port, entre l’esplanade du lac et la plage, dispose d’environ 560 places. Il constitue un point pratique pour mettre à l’eau votre embarcation ou la sortir avant hivernage , grâce à des pontons bien aménagés et un accès direct au lac."
      },
      {
        "title": "Port de Mémard",
        "desc": "Petit port calme avec 80 places, situé près du Jardin Vagabond. Il permet de sortir votre bateau pour l’hiver ou de le remettre à l’eau , dans un cadre paisible et facilement accessible."
      },
      {
        "title": "Port de Charpignat",
        "desc": "Port spacieux avec 177 places, situé sur le boulevard du lac. Il est parfaitement adapté pour la mise à l’eau et la sortie des bateaux , offrant un accès facile pour les opérations liées à l’hivernage ou au début de saison."
      },
      {
        "title": "Port des Grèbes",
        "desc": "Petit port de 49 places, apprécié pour sa tranquillité. Il constitue un point pratique pour mettre votre bateau à l’eau ou le sortir avant hivernage , avec des accès simples et sûrs pour toutes tailles d’embarcations."
      },
      {
        "title": "Port des Mirandelles",
        "desc": "Avec 148 places, ce port offre un cadre animé et pratique. Il est idéal pour la sortie de l’eau en vue d’un hivernage ou pour remettre un bateau à l’eau , avec des pontons bien situés le long du lac."
      },
      {
        "title": "Port des Mouettes",
        "desc": "Petit port de 56 places, connu pour son calme. Il permet de sortir votre bateau avant l’hiver ou de le remettre à l’eau , offrant un accès pratique et sécurisé pour les plaisanciers."
      }
    ]
  },
  "evian-les-bains": {
    "slug": "evian-les-bains",
    "city": "Évian-les-Bains",
    "h1": "Hivernage et stockage de bateaux à Évian-les-Bains",
    "metaTitle": "Hivernage Et Stockage De Bateaux à Évian-les-Bains",
    "metaDescription": "Protégez votre bateau à Évian-les-Bains avec MotorBoat 74. Hivernage intérieur, stockage sécurisé et entretien complet, proche du lac Léman.",
    "hero": "/images/hivernage/evian-les-bains.jpg",
    "intro": "Profitez de notre service complet d’hivernage pour votre bateau à Évian-les-Bains sur le lac Léman. MotorBoat 74 se charge du transport sécurisé et du stockage en intérieur, avec un entretien sur mesure pour tous types d’embarcations, afin de garantir à votre bateau une protection optimale tout au long de l’hiver.",
    "lake": "Lac Léman",
    "zonesIntro": "Nous intervenons dans l’ensemble des principaux ports et zones d’amarrage du lac Léman, y compris autour d'Évian-les-Bains. Que votre bateau soit déjà amarré sur place ou nécessite un transport, nous prenons en charge toute la logistique pour son hivernage. La mise à l’eau est réalisée en fonction du gabarit de chaque embarcation, afin de garantir le respect des normes de sécurité et d’assurer une opération fluide et sans risque.",
    "ports": [
      {
        "title": "Port des Mouettes",
        "desc": "Situé au cœur de la ville, le Port des Mouettes est le principal port de plaisance de la ville. Avec ses nombreuses places d’amarrage et ses services complets (eau, électricité, station carburant et grutage) il répond parfaitement aux besoins des plaisanciers. Grâce à son accès direct au lac et à ses installations modernes, il est idéal pour la mise à l’eau ou la sortie de l’eau avant l’hivernage."
      },
      {
        "title": "Port d’Amphion-les-Bains",
        "desc": "Entre Thonon et Évian, le port d’Amphion-les-Bains bénéficie d’un cadre paisible et d’un accès facile au lac Léman. Il dispose d’emplacements équipés pour les plaisanciers et offre les services essentiels à la navigation, comme l’eau et l’électricité sur ponton. Son accès dégagé et sa rampe en font un lieu pratique pour la mise à l’eau et le retrait des bateaux avant la période d’hivernage."
      },
      {
        "title": "Port d’Évian",
        "desc": "Situé en plein centre-ville, face à la place du Port, l’embarcadère d’Évian sert à la fois aux liaisons lacustres et aux plaisanciers de passage. Son accès direct au plan d’eau et ses pontons bien entretenus permettent de manœuvrer facilement lors de la mise à l’eau ou du retrait d’embarcations légères. C’est un point stratégique pour naviguer sur le Léman ou préparer son bateau à l’hivernage."
      }
    ]
  },
  "thonon-les-bains": {
    "slug": "thonon-les-bains",
    "city": "Thonon-les-Bains",
    "h1": "Hivernage et stockage de bateaux à Thonon-les-Bains",
    "metaTitle": "Hivernage Et Stockage De Bateaux à Thonon-les-Bains",
    "metaDescription": "Protégez votre bateau à Thonon-les-Bains avec MotorBoat 74. Hivernage intérieur, stockage sécurisé et entretien complet, proche du lac Léman.",
    "hero": "/images/hivernage/thonon-les-bains.jpg",
    "intro": "Profitez de notre service complet d’hivernage pour votre bateau à Thonon-les-Bains sur le lac Léman. MotorBoat 74 se charge du transport sécurisé et du stockage en intérieur, avec un entretien sur mesure pour tous types d’embarcations, afin de garantir à votre bateau une protection optimale tout au long de l’hiver.",
    "lake": "Lac Léman",
    "zonesIntro": "Nous intervenons dans l’ensemble des principaux ports et zones d’amarrage, notamment le port de Rives et le port Ripaille. Que votre bateau soit déjà sur place ou doive être transporté, nous prenons en charge toute la logistique liée à l’hivernage. La mise à l’eau est effectuée selon les dimensions et caractéristiques de chaque embarcation, afin d’assurer une opération sécurisée, fluide et conforme aux normes.",
    "ports": [
      {
        "title": "Port de Rives",
        "desc": "Au cœur de la ville, le port de Rives propose environ 740 emplacements et des places visiteurs. Il dispose de grutage, carénage, station-service et pompes pour eaux usées, facilitant la mise à l’eau, l’entretien et l’hivernage des bateaux. Son emplacement central offre un accès rapide aux services et au lac."
      },
      {
        "title": "Port Ripaille",
        "desc": "Situé entre Thonon et Évian, le port Ripaille offre des bouées d’amarrage dans un cadre calme et sécurisé. Les plaisanciers peuvent préparer et stocker leur bateau grâce aux services de grutage et d’entretien proposés par des prestataires locaux, tout en profitant d’un environnement naturel agréable."
      }
    ]
  },
  "geneve": {
    "slug": "geneve",
    "city": "Genève",
    "h1": "Hivernage et stockage de bateaux à Genève",
    "metaTitle": "Hivernage Et Stockage De Bateaux à Genève",
    "metaDescription": "Protégez votre bateau à Genève avec MotorBoat 74. Hivernage intérieur, stockage sécurisé et entretien complet, proche du lac Léman.",
    "hero": "/images/hivernage/geneve.jpg",
    "intro": "Profitez de notre service complet d’hivernage pour votre bateau à Genève sur le lac Léman. MotorBoat 74 se charge du transport sécurisé et du stockage en intérieur, avec un entretien sur mesure pour tous types d’embarcations, afin de garantir à votre bateau une protection optimale tout au long de l’hiver.",
    "lake": "Lac Léman",
    "zonesIntro": "Nous intervenons dans l’ensemble des principaux ports et zones d’amarrage du lac Léman, y compris autour de Genève. Que votre bateau soit déjà amarré sur place ou nécessite un transport, nous prenons en charge toute la logistique pour son hivernage. La mise à l’eau est réalisée en fonction du gabarit de chaque embarcation, afin de garantir le respect des normes de sécurité et d’assurer une opération fluide et sans risque.",
    "ports": [
      {
        "title": "Port des Eaux-Vives",
        "desc": "Situé au cœur de Genève, le Port des Eaux-Vives est un point d'ancrage central pour les plaisanciers genevois. Il offre un accès direct au lac et des services adaptés aux besoins des plaisanciers. Ce port est idéal pour la mise à l’eau ou la sortie de l’eau avant l’hivernage, grâce à des pontons bien aménagés et un accès direct au lac."
      },
      {
        "title": "Port des Pâquis",
        "desc": "Emplacement central avec des pontons bien aménagés, le Port des Pâquis est pratique pour les opérations liées à l’hivernage ou au début de saison. Il offre des services adaptés aux besoins des plaisanciers et un accès direct au lac."
      },
      {
        "title": "Port de la Nautique (Cologny)",
        "desc": "Situé dans la commune de Cologny, le Port de la Nautique est spacieux et offre des services complets. Il est adapté pour la mise à l’eau et la sortie des bateaux, offrant un accès facile pour les opérations liées à l’hivernage ou au début de saison."
      },
      {
        "title": "Port de Versoix",
        "desc": "Situé au nord de la ville, le Port de Versoix est un port bien desservi offrant des installations modernes. Il est idéal pour les activités nautiques et offre des services de qualité. Ce port est bien adapté pour la mise à l’eau ou la sortie de l’eau avant l’hivernage, grâce à des pontons bien aménagés et un accès direct au lac."
      },
      {
        "title": "Port de Tannay",
        "desc": "Situé à l'est, le Port de Tannay offre un accès direct au lac et des installations modernes. Il est bien desservi et offre des services adaptés aux besoins des plaisanciers. Ce port est idéal pour la mise à l’eau ou la sortie de l’eau avant l’hivernage, grâce à des pontons bien aménagés et un accès direct au lac."
      },
      {
        "title": "Port de Founex",
        "desc": "Situé à proximité de Nyon, le Port de Founex est bien desservi et offre des services adaptés aux besoins des plaisanciers. Il dispose de pontons bien aménagés, d'un accès direct au lac et de services tels que l'eau, l'électricité, les douches, les toilettes, le carburant et le Wi-Fi. Ce port est idéal pour la mise à l’eau ou la sortie de l’eau avant l’hivernage, offrant un accès pratique et sécurisé pour les plaisanciers."
      }
    ]
  },
  "lac-de-serre-poncon": {
    "slug": "lac-de-serre-poncon",
    "city": "Lac de Serre-Ponçon",
    "h1": "Hivernage et stockage de bateaux au Lac de Serre-Ponçon",
    "metaTitle": "Hivernage Et Stockage De Bateaux Au Lac De Serre-Ponçon",
    "metaDescription": "Hivernez votre bateau au Lac de Serre-Ponçon avec MotorBoat 74. Hivernage intérieur, stockage sécurisé et entretien complet.",
    "hero": "/images/hivernage/lac-de-serre-poncon.jpg",
    "intro": "Profitez de notre service complet d’hivernage pour votre bateau au Lac de Serre-Ponçon. MotorBoat 74 se charge du transport sécurisé et du stockage en intérieur, avec un entretien sur mesure pour tous types d’embarcations, afin de garantir à votre bateau une protection optimale tout au long de l’hiver.",
    "lake": "Lac de Serre-Ponçon",
    "zonesIntro": "Nous intervenons dans l’ensemble des principaux ports et zones d’amarrage du Lac de Serre-Ponçon. Que votre bateau soit déjà amarré sur place ou nécessite un transport, nous prenons en charge toute la logistique pour son hivernage. La mise à l’eau est réalisée en fonction du gabarit de chaque embarcation, afin de garantir le respect des normes de sécurité et d’assurer une opération fluide et sans risque.",
    "ports": [
      {
        "title": "Port de la Baie Saint-Michel (Chorges)",
        "desc": "Situé dans la commune de Chorges, face à la chapelle Saint-Michel, le Port de la Baie Saint-Michel est l’un des plus grands ports du lac de Serre-Ponçon. Il dispose de pontons, de bornes d'électricité et d’eau, ainsi que d’une aire de carénage, station de vidange pour eaux usées/noires et d’une cale de mise à l’eau aménagée. Grâce à ses installations complètes et son accès direct au lac, ce port est particulièrement adapté pour la mise à l’eau ou la sortie de l’embarcation avant l’hivernage."
      },
      {
        "title": "Port de Saint-Vincent-les-Forts (Ubaye-Serre-Ponçon)",
        "desc": "Dans la branche Ubaye du lac, le port de Saint-Vincent-les-Forts offre un point d’ancrage privilégié proche de la plage municipale Le Fein. Avec son ponton électrique, ses mouillages et une cale de mise à l’eau utilisable selon le tirant d’eau jusqu’à une variation de niveau du lac, il permet une grande flexibilité. Ce port est idéal pour sortir votre bateau ou l’y remettre avant l’hiver, sans compromis sur la sécurité."
      },
      {
        "title": "Port de Chanteloube",
        "desc": "Le Port de Chanteloube est niché au cœur de la baie de Chanteloube, commune de Chorges, dans un environnement naturel préservé. Il dispose de pontons (39 places) et de mouillages (25 places), adaptés à tous types d’embarcations, voile ou moteur. Bien que ce port ne possède pas sa propre cale de mise à l’eau, les usagers peuvent recourir à celles de la Baie Saint-Michel pour mettre à l’eau leur bateau et le rejoindre ensuite par navigation. Ce site offre une belle alternative pour l’hivernage ou les déplacements de bateaux dans un cadre calme."
      },
      {
        "title": "Capitainerie / Port de Savines-le-Lac",
        "desc": "Située à Savines-le-Lac, la capitainerie centrale du lac est un point de repère essentiel pour les plaisanciers. Elle gère un réseau de ports et près de 1 200 anneaux répartis sur tout le lac. Ses services comprennent un port à sec, une cale de mise à l’eau, une aire de carénage, ainsi que ravitaillement en carburant, vidange, eau, etc. Avec ces équipements, c’est une base idéale pour sortir, préparer puis hiverner votre bateau en toute sérénité."
      },
      {
        "title": "Port de Port Saint-Pierre (Le Sauze-du-Lac)",
        "desc": "Le Port Saint-Pierre, situé au Sauze-du-Lac, borde la plage et offre un cadre très touristique, avec ponton et environ 50 places. Adossé à la plage, il permet de profiter du lac et des activités liées, mais aussi de mettre à l’eau ou retirer votre embarcation pour l’hivernage, selon les conditions de niveau d’eau."
      }
    ]
  }
};

export function getHivernageCity(slug: string): HivernageCity | undefined {
  return hivernageCities[slug];
}
