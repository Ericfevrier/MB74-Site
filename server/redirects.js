/**
 * Redirections 301/302 gérées depuis l'admin.
 * Chargées en base et mises en cache mémoire (TTL 60 s) pour éviter un accès DB
 * à chaque requête. Le middleware applique la redirection avant de servir la page.
 */
import { query, dbConfigured } from './db.js';

let cache = { map: new Map(), at: 0 };

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
    const hit = cache.map.get(normalizePath(req.path));
    if (hit && hit.target) return res.redirect(hit.code, hit.target);
    next();
  };
}
