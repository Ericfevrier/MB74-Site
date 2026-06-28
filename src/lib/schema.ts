/**
 * Constructeurs de schémas JSON-LD (schema.org) réutilisables par les `meta()` des routes.
 * Centralise ce qui était dupliqué dans chaque page (via react-helmet-async).
 */
import { SITE } from '../data/site';

/** Nœud LocalBusiness réutilisé comme `provider` dans les schémas Service. */
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
