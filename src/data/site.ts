/** Coordonnées NAP officielles. SOURCE : CMS si généré au build, sinon statique (repli). */
import { GENERATED_SITE } from './generated/site';

const STATIC_SITE = {
  name: 'Motor Boat 74',
  url: 'https://motorboat74.com',
  phoneDisplay: '04 57 57 27 27',
  phoneHref: 'tel:+33457572727',
  email: 'contact@motorboat74.com',
  emailHref: 'mailto:contact@motorboat74.com',
  addressStreet: '179 Allée des Edelweiss',
  addressLocality: 'Saint-Ferréol',
  addressPostal: '74210',
  addressRegion: 'Haute-Savoie',
  addressCountry: 'FR',
  // ⚠️ Coordonnées approximatives (Saint-Ferréol, secteur Faverges), à confirmer via Google Maps.
  geo: { lat: 45.7466, lng: 6.3036 },
} as const;

export const SITE: typeof STATIC_SITE = (GENERATED_SITE as typeof STATIC_SITE | null) ?? STATIC_SITE;
