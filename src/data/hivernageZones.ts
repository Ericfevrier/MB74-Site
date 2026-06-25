/**
 * Coordonnées des zones d'intervention par plan d'eau (pins de la carte Leaflet).
 * Niveau "commune / port" — vue d'ensemble de la couverture, pas un emplacement de ponton précis.
 */
export interface Zone {
  name: string;
  lat: number;
  lng: number;
}

export const HIVERNAGE_ZONES: Record<string, Zone[]> = {
  annecy: [
    { name: "Annecy – Port d'Albigny", lat: 45.8992, lng: 6.1462 },
    { name: 'Annecy-le-Vieux', lat: 45.9168, lng: 6.1561 },
    { name: 'Veyrier-du-Lac', lat: 45.8806, lng: 6.1762 },
    { name: 'Menthon-Saint-Bernard', lat: 45.865, lng: 6.1958 },
    { name: 'Talloires-Montmin', lat: 45.842, lng: 6.213 },
    { name: 'Duingt', lat: 45.827, lng: 6.201 },
    { name: 'Saint-Jorioz', lat: 45.836, lng: 6.171 },
    { name: 'Sevrier', lat: 45.8576, lng: 6.1426 },
    { name: 'Doussard – Bout-du-lac', lat: 45.787, lng: 6.219 },
  ],
  'aix-les-bains': [
    { name: 'Aix-les-Bains – Grand Port', lat: 45.6915, lng: 5.879 },
    { name: 'Brison-Saint-Innocent', lat: 45.727, lng: 5.876 },
    { name: 'Le Bourget-du-Lac', lat: 45.647, lng: 5.86 },
    { name: 'Chindrieux', lat: 45.79, lng: 5.823 },
    { name: 'Conjux', lat: 45.778, lng: 5.815 },
    { name: 'Chanaz – Canal de Savières', lat: 45.795, lng: 5.793 },
  ],
  'thonon-les-bains': [
    { name: 'Thonon-les-Bains – Port de Rives', lat: 46.371, lng: 6.476 },
    { name: 'Anthy-sur-Léman', lat: 46.357, lng: 6.443 },
    { name: 'Sciez – Port de Sciez', lat: 46.331, lng: 6.388 },
    { name: 'Excenevex', lat: 46.353, lng: 6.353 },
    { name: 'Yvoire', lat: 46.382, lng: 6.325 },
    { name: 'Publier – Amphion', lat: 46.392, lng: 6.535 },
    { name: 'Évian-les-Bains', lat: 46.401, lng: 6.589 },
  ],
  'evian-les-bains': [
    { name: 'Évian-les-Bains – Port', lat: 46.4015, lng: 6.587 },
    { name: 'Publier – Amphion', lat: 46.392, lng: 6.535 },
    { name: 'Lugrin', lat: 46.405, lng: 6.64 },
    { name: 'Meillerie', lat: 46.413, lng: 6.718 },
    { name: 'Saint-Gingolph', lat: 46.393, lng: 6.803 },
    { name: 'Thonon-les-Bains', lat: 46.371, lng: 6.476 },
  ],
  geneve: [
    { name: 'Genève – Pâquis', lat: 46.21, lng: 6.152 },
    { name: 'Genève – Eaux-Vives', lat: 46.207, lng: 6.166 },
    { name: 'Versoix', lat: 46.284, lng: 6.162 },
    { name: 'Coppet', lat: 46.317, lng: 6.19 },
    { name: 'Nyon', lat: 46.383, lng: 6.236 },
    { name: 'Anières', lat: 46.278, lng: 6.22 },
    { name: 'Hermance', lat: 46.302, lng: 6.243 },
  ],
  'lac-de-serre-poncon': [
    { name: 'Savines-le-Lac', lat: 44.52, lng: 6.402 },
    { name: 'Le Sauze-du-Lac', lat: 44.47, lng: 6.347 },
    { name: 'Chorges – Baie Saint-Michel', lat: 44.547, lng: 6.282 },
    { name: 'Prunières', lat: 44.527, lng: 6.346 },
    { name: "Crots – Plan d'eau d'Embrun", lat: 44.541, lng: 6.438 },
    { name: 'Embrun', lat: 44.564, lng: 6.495 },
  ],
};

export const getZones = (slug: string): Zone[] => HIVERNAGE_ZONES[slug] || [];
