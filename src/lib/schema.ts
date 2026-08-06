/**
 * Constructeurs de schémas JSON-LD (schema.org) réutilisables par les `meta()` des routes.
 * Centralise ce qui était dupliqué dans chaque page (via react-helmet-async).
 */
import { SITE } from '../data/site';
import { SETTINGS_DEFAULTS } from './settings';

/**
 * Horaires d'ouverture. Ils n'apparaissaient nulle part sur le site, ni en JSON-LD
 * ni en clair : c'est le signal local que Google recoupe directement avec la fiche
 * Google Business. Toute modification ici doit être répercutée sur la fiche.
 */
export const OPENING_HOURS = [
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '09:00',
    closes: '12:00',
  },
  {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    opens: '14:00',
    closes: '18:00',
  },
];

/** Profils officiels — `sameAs` relie le site, la fiche Google et les réseaux. */
export const SAME_AS = [
  SETTINGS_DEFAULTS.instagram,
  SETTINGS_DEFAULTS.facebook,
  SETTINGS_DEFAULTS.youtube,
  SETTINGS_DEFAULTS.linkedin,
].filter(Boolean);

/**
 * Nœud LocalBusiness réutilisé comme `provider` dans les schémas Service, et
 * référencé par `@id` depuis les autres pages.
 *
 * Google consolide les entités par `@id` : une seule déclaration complète doit
 * exister, et toutes les pages doivent s'y rattacher. Le nom vient de SITE.name
 * pour qu'une seule graphie circule — le site en comptait six, dont deux sur ce
 * même `@id`, ce qui affaiblissait la correspondance avec la fiche Google.
 */
export const businessNode = {
  '@type': 'LocalBusiness',
  '@id': `${SITE.url}/#business`,
  name: SITE.name,
  telephone: SITE.phoneHref.replace('tel:', ''),
  email: SITE.email,
  url: SITE.url,
  address: {
    '@type': 'PostalAddress',
    streetAddress: SITE.addressStreet,
    postalCode: SITE.addressPostal,
    addressLocality: SITE.addressLocality,
    addressRegion: SITE.addressRegion,
    addressCountry: SITE.addressCountry,
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: SITE.geo.lat,
    longitude: SITE.geo.lng,
  },
  openingHoursSpecification: OPENING_HOURS,
  sameAs: SAME_AS,
};

const DEFAULT_AREA = [
  { '@type': 'Place', name: "Lac d'Annecy" },
  { '@type': 'AdministrativeArea', name: 'Haute-Savoie' },
];

export function serviceSchema(o: {
  name: string;
  serviceType: string;
  url: string;
  description: string;
  areaServed?: unknown[];
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: o.name,
    serviceType: o.serviceType,
    provider: businessNode,
    areaServed: o.areaServed ?? DEFAULT_AREA,
    url: o.url,
    description: o.description,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

/** `items` : du plus général au plus précis ; `url` omis sur le dernier (page courante). */
export function breadcrumbSchema(items: { name: string; url?: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      ...(it.url ? { item: it.url } : {}),
    })),
  };
}
