/** Coordonnées NAP officielles. SOURCE : CMS si généré au build, sinon statique (repli). */
import { GENERATED_SITE } from './generated/site';

/**
 * TROIS adresses distinctes, à ne pas confondre.
 *
 * 1. `address*` — l'ÉTABLISSEMENT PRINCIPAL : le shop de Saint-Jorioz, où sont
 *    aussi les bureaux. C'est l'adresse mise en avant partout sur le site et
 *    dans les données structurées, celle que Google et les moteurs de réponse
 *    associent à l'entreprise. Saint-Jorioz est à ~8 km d'Annecy, contre ~25 km
 *    pour Saint-Ferréol : sur des recherches locales visant Annecy, la
 *    proximité compte, et c'est là que se trouve l'accueil client.
 *
 * 2. `workshop` — l'ATELIER et le hangar d'hivernage de Saint-Ferréol. Un lieu
 *    réel de l'entreprise, décrit comme tel (second lieu rattaché au principal),
 *    mais qui n'est ni le siège commercial ni le point d'accueil.
 *
 * 3. `legal` — le SIÈGE SOCIAL déclaré au RCS. C'est une donnée juridique, pas
 *    un choix éditorial : elle n'apparaît que dans les mentions légales, les CGV
 *    et la politique de confidentialité, et ne suit PAS l'adresse commerciale.
 *    Elle ne change que si le siège est effectivement transféré.
 */
const STATIC_SITE = {
  name: 'Motor Boat 74',
  url: 'https://motorboat74.com',
  phoneDisplay: '04 57 57 27 27',
  phoneHref: 'tel:+33457572727',
  email: 'contact@motorboat74.com',
  emailHref: 'mailto:contact@motorboat74.com',

  // --- 1. Établissement principal : le shop (accueil + bureaux) ---
  addressStreet: '1099 Impasse du Semnoz',
  addressLocality: 'Saint-Jorioz',
  addressPostal: '74410',
  addressRegion: 'Haute-Savoie',
  addressCountry: 'FR',
  // ⚠️ Coordonnées du bourg de Saint-Jorioz, PAS de l'adresse exacte : cette
  // adresse est absente d'OpenStreetMap et rien ne justifie d'inventer une
  // précision qu'on n'a pas. À remplacer par les coordonnées relevées sur
  // Google Maps (clic droit sur le point → les deux nombres affichés).
  geo: { lat: 45.836, lng: 6.171 },

  // --- 2. Atelier / hangar d'hivernage ---
  workshop: {
    name: 'Atelier & hangar d’hivernage',
    addressStreet: '179 Allée des Edelweiss',
    addressLocality: 'Saint-Ferréol',
    addressPostal: '74210',
    addressRegion: 'Haute-Savoie',
    addressCountry: 'FR',
    // ⚠️ Approximatives (secteur Faverges), à confirmer de la même façon.
    geo: { lat: 45.7466, lng: 6.3036 },
  },

  // --- 3. Siège social (RCS) — donnée légale, ne pas aligner sur le commercial ---
  legal: {
    addressStreet: '179 Allée des Edelweiss',
    addressLocality: 'Saint-Ferréol',
    addressPostal: '74210',
    addressRegion: 'Haute-Savoie',
    addressCountry: 'FR',
  },
} as const;

export const SITE: typeof STATIC_SITE = (GENERATED_SITE as typeof STATIC_SITE | null) ?? STATIC_SITE;
