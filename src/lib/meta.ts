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

/**
 * Normalise une URL canonique : jamais de barre finale, sauf sur la racine.
 *
 * Les canoniques étaient écrites à la main page par page, certaines avec barre
 * finale (`/services/`) et d'autres sans (`/depannage`), alors que le sitemap
 * n'en met jamais. Deux URL se trouvaient donc déclarées pour une même page.
 * On tranche ici, en un point de passage unique, plutôt qu'en seize endroits.
 * Le serveur redirige en 301 la forme avec barre (voir server/index.js).
 */
export function canonicalUrl(url: string): string {
  const m = url.match(/^(https?:\/\/[^/]+)(\/.*)?$/);
  if (!m) return url;
  const path = (m[2] ?? '/').replace(/\/+$/, '');
  return path === '' ? `${m[1]}/` : `${m[1]}${path}`;
}

/** Limites retenues : 60 signes pour un titre ou un H1, 155 pour une description. */
export const SEO_LIMITS = { title: 60, description: 155 } as const;

/**
 * Renvoie la première variante qui tient dans la limite.
 *
 * Sert à respecter les limites SANS jamais tronquer : une coupe brute produit
 * des libellés cassés en plein mot — c'est exactement ce que faisait la
 * description des pages de marque. On écrit plutôt plusieurs formulations, de
 * la plus riche à la plus courte, et on retient la première qui passe.
 *
 * Le dernier élément est le repli : à lui d'être court par construction.
 */
export function fitLength(limit: number, ...variants: string[]): string {
  return variants.find((v) => v && v.length <= limit) ?? variants[variants.length - 1] ?? '';
}

export function pageMeta(i: PageMetaInput): MetaDescriptor[] {
  const m: MetaDescriptor[] = [{ title: i.title }];
  const canonical = i.canonical ? canonicalUrl(i.canonical) : undefined;

  if (i.description) m.push({ name: 'description', content: i.description });
  if (canonical) m.push({ tagName: 'link', rel: 'canonical', href: canonical });
  if (i.robots) m.push({ name: 'robots', content: i.robots });

  m.push({ property: 'og:type', content: i.ogType ?? 'website' });
  m.push({ property: 'og:title', content: i.ogTitle ?? i.title });
  const ogDesc = i.ogDescription ?? i.description;
  if (ogDesc) m.push({ property: 'og:description', content: ogDesc });
  if (canonical) m.push({ property: 'og:url', content: canonical });
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
