/**
 * Génère public/sitemap.xml à partir des données du site.
 * Lancé automatiquement avant `vite build` (script "prebuild").
 * N'inclut PAS les pages noindex : /bateaux/vendu, fiches occasion vendues, /shop (redirigée).
 */
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { BRAND_MODELS } from '../src/data/boatBrands';
import { HIVERNAGE_CITY_ORDER } from '../src/data/hivernageCities';
import { availableUsedBoats } from '../src/data/usedBoats';
import { BLOG_ARTICLES } from '../src/data/blog';

const SITE = 'https://motorboat74.com';
const today = new Date().toISOString().slice(0, 10);

type Url = { loc: string; lastmod?: string; priority?: string };

const staticRoutes: Url[] = [
  { loc: '/', priority: '1.0' },
  { loc: '/bateaux', priority: '0.9' },
  { loc: '/bateaux/neufs', priority: '0.9' },
  { loc: '/bateaux/occasion', priority: '0.9' },
  { loc: '/services', priority: '0.8' },
  { loc: '/hivernage-stockage-bateau', priority: '0.8' },
  { loc: '/entretien-reparation', priority: '0.7' },
  { loc: '/depannage', priority: '0.7' },
  { loc: '/transport', priority: '0.7' },
  { loc: '/sellerie', priority: '0.7' },
  { loc: '/remorques', priority: '0.7' },
  { loc: '/contact', priority: '0.6' },
  { loc: '/la-team', priority: '0.6' },
  { loc: '/blog', priority: '0.6' },
  { loc: '/mentions-legales', priority: '0.2' },
  { loc: '/politique-de-confidentialite', priority: '0.2' },
  { loc: '/cgv-pro', priority: '0.2' },
];

const urls: Url[] = [...staticRoutes];

// Pages de marque + modèles (seules les marques affichées : nautique, mastercraft)
for (const brandId of ['nautique', 'mastercraft']) {
  const brand = BRAND_MODELS[brandId];
  if (!brand) continue;
  urls.push({ loc: `/marque/${brandId}`, priority: '0.8' });
  for (const slug of brand.order) {
    urls.push({ loc: `/${brandId}/${slug}`, priority: '0.7' });
  }
}

// Pages "hivernage par ville"
for (const slug of HIVERNAGE_CITY_ORDER) {
  urls.push({ loc: `/services/hivernage-bateaux/${slug}`, priority: '0.7' });
}

// Articles de blog
for (const a of BLOG_ARTICLES) {
  urls.push({ loc: a.path, lastmod: a.date, priority: '0.6' });
}

// Fiches occasion DISPONIBLES uniquement (les vendues sont en noindex)
for (const b of availableUsedBoats()) {
  urls.push({ loc: `/bateaux/occasion/${b.slug}`, priority: '0.7' });
}

const body = urls
  .map((u) => {
    const loc = `${SITE}${u.loc}`;
    const lastmod = u.lastmod || today;
    const priority = u.priority || '0.5';
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <priority>${priority}</priority>\n  </url>`;
  })
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;

const out = resolve(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sitemap.xml');
writeFileSync(out, xml, 'utf8');
console.log(`sitemap.xml généré : ${urls.length} URLs -> ${out}`);
