/** Coordonnées NAP officielles, source : motorboat74.com. */
export const SITE = {
  name: 'Motor Boat 74',
  url: 'https://motorboat74.com',
  phoneDisplay: '04 57 57 27 27',
  phoneHref: 'tel:+33457572727',
  email: 'contact@motorboat74.com',
  emailHref: 'mailto:contact@motorboat74.com',
  addressStreet: '315 Rue de la Glière de Thermesay',
  addressLocality: 'Val de Chaise',
  addressPostal: '74210',
  addressRegion: 'Haute-Savoie',
  addressCountry: 'FR',
  // ⚠️ Coordonnées approximatives (secteur Marlens / Val de Chaise), à confirmer via Google Maps.
  geo: { lat: 45.7365, lng: 6.2772 },
} as const;
