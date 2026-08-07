/**
 * Redirections 301/302 gérées depuis l'admin.
 * Chargées en base et mises en cache mémoire (TTL 60 s) pour éviter un accès DB
 * à chaque requête. Le middleware applique la redirection avant de servir la page.
 */
import { query, dbConfigured } from './db.js';

let cache = { map: new Map(), at: 0 };

/**
 * Redirections permanentes définies dans le code : toujours actives, y compris
 * sans base de données, et non supprimables par erreur depuis l'admin.
 *
 * Chaque service existe sous deux URL : la route générique `/services/<slug>`
 * (non prérendue) et la page dédiée (prérendue, indexable). Le header et le pied
 * de page pointaient vers la première sur les 69 pages du site — 350 liens
 * internes n'atteignaient donc aucune page indexable, et `/depannage` ne recevait
 * que 6 liens au lieu de 75. Les liens sont corrigés ; ces 301 rattrapent les
 * liens externes et les favoris déjà émis vers les anciennes adresses.
 */
const STATIC_REDIRECTS = new Map([
  ['/services/entretien-reparation', '/entretien-reparation'],
  ['/services/depannage', '/depannage'],
  ['/services/transport-de-bateau', '/transport'],
  ['/services/sellerie-de-bateau', '/sellerie'],
  ['/services/remorques-de-bateau', '/remorques'],
  ['/bateaux-neufs', '/bateaux/neufs'],
  ['/bateaux-occasion', '/bateaux/occasion'],
  ['/shop', '/blog'],
  // Page retirée : Serre-Ponçon (Hautes-Alpes) est hors du territoire réel de
  // l'entreprise. On redirige plutôt que de laisser un 404, pour conserver les
  // liens et l'historique d'indexation vers la page d'hivernage générale.
  ['/services/hivernage-bateaux/lac-de-serre-poncon', '/hivernage-stockage-bateau'],

  // ---------------------------------------------------------------------
  // MIGRATION WORDPRESS -> REACT
  //
  // Relevé sur le sitemap de motorboat74.com : 43 URL indexées, dont 14
  // tombaient en 404 sur le nouveau site. Chacune porte un historique
  // d'indexation et des liens entrants ; une 404 les perd définitivement.
  //
  // Les fiches d'occasion étaient des produits WooCommerce, rangés par
  // catégorie de marque (/bateaux/occasion/<marque>/<slug>). Le nouveau site
  // range par slug seul, avec le millésime dedans. La correspondance a été
  // établie en lisant le champ « Année » de chaque fiche WordPress, pas en
  // devinant d'après le nom — deux G23 et deux G21 portent le même modèle.
  // ---------------------------------------------------------------------

  // Catégories produit (marques d'occasion) -> catalogue
  ['/bateaux/occasion/heyday', '/bateaux/occasion'],
  ['/bateaux/occasion/nautique', '/bateaux/occasion'],

  // Fiches d'occasion, appariées par millésime
  ['/bateaux/occasion/heyday/heyday-wt-surf', '/bateaux/occasion/heyday-wt-surf-2020'],
  ['/bateaux/occasion/nautique/super-air-nautique-210-2', '/bateaux/occasion/super-air-nautique-210-2021'],
  ['/bateaux/occasion/nautique/super-air-nautique-220', '/bateaux/occasion/super-air-nautique-220-2008'],
  ['/bateaux/occasion/nautique/super-air-nautique-g23', '/bateaux/occasion/super-air-nautique-g23-2023'],
  ['/bateaux/occasion/nautique/super-air-nautique-g23-2', '/bateaux/occasion/super-air-nautique-g23-2019'],
  ['/bateaux/vendu/super-air-nautique-g21', '/bateaux/occasion/super-air-nautique-g21-2024'],
  ['/bateaux/vendu/super-air-nautique-g21-2', '/bateaux/occasion/super-air-nautique-g21-2014'],

  // Marque : WordPress exposait /marques/<id> ET /<id> ; le site n'a que
  // /marque/<id>. Attention, /nautique/<modele> reste servi normalement :
  // la correspondance est exacte, elle ne capture que la racine.
  ['/marques/nautique', '/marque/nautique'],
  ['/nautique', '/marque/nautique'],
  ['/mastercraft', '/marque/mastercraft'],

  // Hub d'hivernage
  ['/services/hivernage-bateaux', '/hivernage-stockage-bateau'],

  // Catégories de blog : le nouveau blog n'a pas de pages de catégorie. On
  // envoie vers la page de service correspondante, plus utile au visiteur
  // qu'un index vide. L'article /blog/hivernage/hivernage-bateau-guide-complet
  // n'est pas affecté : la correspondance est exacte.
  ['/blog/hivernage', '/hivernage-stockage-bateau'],
  ['/blog/entretien-et-reparation', '/entretien-reparation'],
  ['/blog/bateau-en-panne-lac-annecy', '/depannage'],
]);

export function normalizePath(p) {
  let s = String(p || '').split('?')[0].trim();
  if (!s.startsWith('/') && !/^https?:\/\//i.test(s)) s = `/${s}`;
  if (s.startsWith('/') && s.length > 1) s = s.replace(/\/+$/, '');
  return s;
}

export async function refreshRedirects() {
  if (!dbConfigured()) {
    cache = { map: new Map(), at: Date.now() };
    return;
  }
  try {
    const rows = await query('SELECT source_path, target, code FROM redirects');
    const map = new Map();
    for (const r of rows) map.set(normalizePath(r.source_path), { target: r.target, code: Number(r.code) || 301 });
    cache = { map, at: Date.now() };
  } catch (e) {
    console.error('refreshRedirects', e.message);
    cache.at = Date.now(); // évite de marteler la base en cas d'erreur
  }
}

/** Middleware Express : redirige les requêtes GET/HEAD dont le chemin correspond. */
export function redirectMiddleware() {
  return async (req, res, next) => {
    if (req.method !== 'GET' && req.method !== 'HEAD') return next();
    if (req.path.startsWith('/api/')) return next();
    if (Date.now() - cache.at > 60000) await refreshRedirects();
    const from = normalizePath(req.path);
    // La base d'abord : une redirection saisie dans l'admin doit pouvoir
    // surcharger celle du code.
    const hit = cache.map.get(from);
    if (hit && hit.target) return res.redirect(hit.code, hit.target);
    const staticTarget = STATIC_REDIRECTS.get(from);
    if (staticTarget) return res.redirect(301, staticTarget);
    next();
  };
}
