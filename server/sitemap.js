/**
 * Sitemap dynamique servi par Express.
 *
 * Principe : on part du sitemap STATIQUE généré au build (public/sitemap.xml → base
 * fiable qui contient toutes les pages du site au moment du build), puis on le
 * réconcilie avec l'état LIVE de la base :
 *   - on AJOUTE les contenus publiés créés depuis le build (occasions, modèles,
 *     articles, villes) qui n'y figurent pas encore ;
 *   - on RETIRE ceux qui ne doivent plus être indexés (occasion vendue, contenu
 *     repassé en brouillon).
 * Sans base configurée, on renvoie simplement le sitemap statique.
 */
import { readFileSync, existsSync } from 'fs';
import path from 'path';
import { query, dbConfigured } from './db.js';

const SITE = (process.env.SITE_URL || 'https://motorboat74.com').replace(/\/+$/, '');

function baseLocs(clientDir) {
  const f = path.join(clientDir, 'sitemap.xml');
  if (!existsSync(f)) return [];
  try {
    const xml = readFileSync(f, 'utf8');
    return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  } catch {
    return [];
  }
}

/** Reconstruit le sitemap XML en réconciliant statique + base. */
export async function buildSitemap(clientDir) {
  const set = new Map(); // loc absolue -> lastmod (YYYY-MM-DD) | null
  for (const loc of baseLocs(clientDir)) set.set(loc, null);

  if (dbConfigured()) {
    const apply = (loc, indexable, lastmod) => {
      if (indexable) set.set(loc, lastmod || set.get(loc) || null);
      else set.delete(loc);
    };
    try {
      const boats = await query('SELECT slug, sold, status FROM used_boats');
      for (const b of boats) apply(`${SITE}/bateaux/occasion/${b.slug}`, b.status === 'published' && !b.sold);

      const arts = await query('SELECT slug, status, date FROM blog_articles');
      for (const a of arts) {
        const lm = a.date ? new Date(a.date).toISOString().slice(0, 10) : null;
        apply(`${SITE}/blog/${a.slug}`, a.status === 'published', lm);
      }

      const models = await query('SELECT brand, slug, status FROM boat_models');
      for (const m of models) apply(`${SITE}/${m.brand}/${m.slug}`, m.status === 'published');

      const cities = await query('SELECT slug, status FROM hivernage_cities');
      for (const c of cities) apply(`${SITE}/services/hivernage-bateaux/${c.slug}`, c.status === 'published');
    } catch (e) {
      console.error('sitemap DB:', e.message); // on garde au moins la base statique
    }
  }

  const today = new Date().toISOString().slice(0, 10);
  const body = [...set.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([loc, lm]) => `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${lm || today}</lastmod>\n  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}
