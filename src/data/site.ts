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
  // Coordonnées relevées sur Google Maps, sur le point exact du shop.
  geo: { lat: 45.831543, lng: 6.177957 },
  /** Lien court Google Maps vers la fiche du lieu. */
  mapsUrl: 'https://maps.app.goo.gl/LFW7MZ6bhFz8YFP49',
  /**
   * Carte intégrée, ancrée sur l'établissement lui-même.
   *
   * Ce format (`/maps/embed?pb=…`) porte l'identifiant du lieu et ne demande
   * aucune clé d'API. L'ancien code appelait l'Embed API avec
   * `process.env.GOOGLE_MAPS_PLATFORM_KEY`, une variable serveur qui n'existe
   * pas dans le navigateur : la clé partait vide, la carte échouait, et une
   * seconde iframe de repli se chargeait par-dessus. Deux cartes par page.
   * Cette URL pointe le lieu par son identifiant, pas par une recherche
   * textuelle qui peut tomber à côté.
   */
  mapsEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3062.333921962156!2d6.175403776589482!3d45.831460871082385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x478b914222776873%3A0x319712d38fa97bc9!2s1099%20Imp.%20du%20Semnoz%2C%2074410%20Saint-Jorioz!5e1!3m2!1sfr!2sfr!4v1786088021235!5m2!1sfr!2sfr',

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
