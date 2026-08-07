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
