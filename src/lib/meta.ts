/**
 * Helper pour construire les balises <head> via le `meta()` natif de React Router v7.
 *
 * Remplace react-helmet-async : les descripteurs renvoyés ici sont rendus par le
 * <Meta /> de root.tsx, donc présents DANS le HTML prérendu (SEO) sans dépendre du
 * navigateur. Le JSON-LD passe par la clé spéciale `script:ld+json` de RR7.
 */
import type { MetaDescriptor } from 'react-router';

export interface PageMetaInput {
  title: string;
  description?: string;
  /** URL canonique absolue. */
  canonical?: string;
  /** Image OpenGraph absolue. */
  image?: string;
  ogType?: string;
  /** Contenu de la balise robots (ex. 'noindex, follow'). */
  robots?: string;
  /** Titre OpenGraph si différent de `title`. */
  ogTitle?: string;
  /** Description OpenGraph si différente de `description`. */
  ogDescription?: string;
  twitterCard?: boolean;
  ogLocale?: string;
  ogSiteName?: string;
  geo?: { region?: string; placename?: string; position?: string; icbm?: string };
  /** Objets JSON-LD (chacun devient un <script type="application/ld+json">). */
  jsonLd?: unknown[];
  /** Descripteurs bruts supplémentaires, ajoutés tels quels. */
  extra?: MetaDescriptor[];
}

export function pageMeta(i: PageMetaInput): MetaDescriptor[] {
  const m: MetaDescriptor[] = [{ title: i.title }];

  if (i.description) m.push({ name: 'description', content: i.description });
  if (i.canonical) m.push({ tagName: 'link', rel: 'canonical', href: i.canonical });
  if (i.robots) m.push({ name: 'robots', content: i.robots });

  m.push({ property: 'og:type', content: i.ogType ?? 'website' });
  m.push({ property: 'og:title', content: i.ogTitle ?? i.title });
  const ogDesc = i.ogDescription ?? i.description;
  if (ogDesc) m.push({ property: 'og:description', content: ogDesc });
  if (i.canonical) m.push({ property: 'og:url', content: i.canonical });
  if (i.image) m.push({ property: 'og:image', content: i.image });
  if (i.ogSiteName) m.push({ property: 'og:site_name', content: i.ogSiteName });
  if (i.ogLocale) m.push({ property: 'og:locale', content: i.ogLocale });

  if (i.twitterCard) m.push({ name: 'twitter:card', content: 'summary_large_image' });

  if (i.geo?.region) m.push({ name: 'geo.region', content: i.geo.region });
  if (i.geo?.placename) m.push({ name: 'geo.placename', content: i.geo.placename });
  if (i.geo?.position) m.push({ name: 'geo.position', content: i.geo.position });
  if (i.geo?.icbm) m.push({ name: 'ICBM', content: i.geo.icbm });

  for (const obj of i.jsonLd ?? []) m.push({ 'script:ld+json': obj });
  if (i.extra) m.push(...i.extra);

  return m;
}
