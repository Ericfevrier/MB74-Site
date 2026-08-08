/**
 * Injection des overrides SEO de l'admin dans le HTML prérendu.
 *
 * POURQUOI
 * Les champs SEO saisis dans l'admin (titre, description, canonical, noindex…)
 * n'étaient appliqués que par `useSeoOverride`, dans un `useEffect` — donc
 * uniquement côté navigateur. Le HTML prérendu, celui que Google lit au premier
 * passage, conservait les valeurs statiques du build. Les réglages SEO de
 * l'admin étaient donc, en pratique, invisibles des moteurs.
 *
 * COMMENT
 * Le serveur, lui, a accès à la base. Avant d'envoyer une page prérendue, il
 * lit l'enregistrement correspondant et réécrit les balises concernées dans le
 * <head>. Ce qui est publié correspond alors à ce qui est saisi dans l'admin,
 * sans dépendre de l'exécution du JavaScript.
 *
 * Le rendu client applique ensuite les mêmes valeurs : aucune divergence.
 */
import { query, dbConfigured } from './db.js';

/** Échappe le contenu d'un attribut HTML. */
const attr = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Échappe le contenu textuel d'une balise. */
const text = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function parseSeo(v) {
  if (!v) return {};
  if (typeof v === 'object') return v;
  try {
    return JSON.parse(v) || {};
  } catch {
    return {};
  }
}

/**
 * Table des routes pilotées par la base. Chaque entrée sait reconnaître un
 * chemin et en extraire les valeurs SEO.
 *
 * `status = 'published'` : une page dépubliée depuis l'admin ne doit pas voir
 * ses métas injectées.
 */
const RESOLVERS = [
  {
    match: (p) => {
      const m = p.match(/^\/services\/hivernage-bateaux\/([^/]+)$/);
      return m && m[1];
    },
    load: async (slug) => {
      const rows = await query(
        'SELECT meta_title, meta_description, seo FROM hivernage_cities WHERE slug = ? AND status = ? LIMIT 1',
        [slug, 'published'],
      );
      return rows[0];
    },
  },
  {
    match: (p) => {
      const m = p.match(/^\/bateaux\/occasion\/([^/]+)$/);
      return m && m[1];
    },
    load: async (slug) => {
      const rows = await query(
        'SELECT meta_title, meta_description, seo FROM used_boats WHERE slug = ? AND status = ? LIMIT 1',
        [slug, 'published'],
      );
      return rows[0];
    },
  },
  {
    match: (p) => {
      const m = p.match(/^\/blog\/([^/]+)$/);
      return m && m[1];
    },
    load: async (slug) => {
      const rows = await query(
        'SELECT meta_title, meta_description, seo FROM blog_articles WHERE slug = ? AND status = ? LIMIT 1',
        [slug, 'published'],
      );
      return rows[0];
    },
  },
];

/** Renvoie les overrides SEO applicables à ce chemin, ou null. */
export async function seoForPath(pathname) {
  if (!dbConfigured()) return null;
  for (const r of RESOLVERS) {
    const key = r.match(pathname);
    if (!key) continue;
    try {
      const row = await r.load(key);
      if (!row) return null;
      const seo = parseSeo(row.seo);
      return {
        title: seo.title || row.meta_title || '',
        description: seo.description || row.meta_description || '',
        canonical: seo.canonical || '',
        ogTitle: seo.ogTitle || seo.title || row.meta_title || '',
        ogDescription: seo.ogDescription || seo.description || row.meta_description || '',
        ogImage: seo.ogImage || '',
        noindex: !!seo.noindex,
        nofollow: !!seo.nofollow,
      };
    } catch (e) {
      // Une base indisponible ne doit jamais empêcher de servir la page :
      // on retombe simplement sur les métas du build.
      console.error('seoForPath', pathname, e.message);
      return null;
    }
  }
  return null;
}

/** Remplace le contenu d'une balise meta existante, ou l'ajoute avant </head>. */
function upsertMeta(html, kind, key, value) {
  if (!value) return html;
  const re = new RegExp(`(<meta[^>]*\\s${kind}="${key}"[^>]*\\scontent=")[^"]*(")`, 'i');
  if (re.test(html)) return html.replace(re, `$1${attr(value)}$2`);
  return html.replace('</head>', `<meta ${kind}="${key}" content="${attr(value)}"></head>`);
}

/** Applique les overrides au HTML prérendu. */
export function applySeo(html, seo) {
  if (!seo) return html;
  let out = html;

  if (seo.title) {
    out = /<title>[\s\S]*?<\/title>/i.test(out)
      ? out.replace(/<title>[\s\S]*?<\/title>/i, `<title>${text(seo.title)}</title>`)
      : out.replace('</head>', `<title>${text(seo.title)}</title></head>`);
  }

  out = upsertMeta(out, 'name', 'description', seo.description);
  out = upsertMeta(out, 'property', 'og:title', seo.ogTitle);
  out = upsertMeta(out, 'property', 'og:description', seo.ogDescription);
  out = upsertMeta(out, 'property', 'og:image', seo.ogImage);

  if (seo.canonical) {
    const re = /(<link[^>]*\srel="canonical"[^>]*\shref=")[^"]*(")/i;
    out = re.test(out)
      ? out.replace(re, `$1${attr(seo.canonical)}$2`)
      : out.replace('</head>', `<link rel="canonical" href="${attr(seo.canonical)}"></head>`);
  }

  if (seo.noindex || seo.nofollow) {
    const v = `${seo.noindex ? 'noindex' : 'index'}, ${seo.nofollow ? 'nofollow' : 'follow'}`;
    out = upsertMeta(out, 'name', 'robots', v);
  }

  return out;
}
