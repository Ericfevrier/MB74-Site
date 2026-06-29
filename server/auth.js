/**
 * Authentification admin — compte unique via variables d'environnement.
 *   ADMIN_USERNAME       : identifiant
 *   ADMIN_PASSWORD_HASH  : hash bcrypt du mot de passe (cf. scripts/hash-password.mjs)
 *   SESSION_SECRET       : clé de signature du cookie de session (recommandé en prod)
 *
 * Session sans état (stateless) : cookie httpOnly signé en HMAC-SHA256 → survit aux
 * redémarrages Passenger, pas de table ni de store mémoire. Tout est en pur JS (crypto natif + bcryptjs).
 */
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export const COOKIE_NAME = 'mb74_admin';
export const COOKIE_TTL_MS = 1000 * 60 * 60 * 12; // 12 h

function secret() {
  // Repli sur le hash du mot de passe : si le mdp change, les sessions sont invalidées (souhaitable).
  return process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD_HASH || 'mb74-dev-secret-change-me';
}

const b64url = (s) => Buffer.from(s).toString('base64url');
const sign = (payload) => crypto.createHmac('sha256', secret()).update(payload).digest('base64url');

export function createToken(username) {
  const payload = `${b64url(username)}.${Date.now() + COOKIE_TTL_MS}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token) {
  if (!token) return null;
  const i = token.lastIndexOf('.');
  if (i < 0) return null;
  const payload = token.slice(0, i);
  const sig = token.slice(i + 1);
  const expected = sign(payload);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  const [userB64, expStr] = payload.split('.');
  if (!expStr || Date.now() > Number(expStr)) return null;
  return Buffer.from(userB64, 'base64url').toString('utf8');
}

export const authConfigured = () => Boolean(process.env.ADMIN_USERNAME && process.env.ADMIN_PASSWORD_HASH);

/** Vérifie identifiant + mot de passe (comparaison bcrypt à temps ~constant). */
export async function checkCredentials(username, password) {
  if (!authConfigured()) return false;
  const okUser = username === process.env.ADMIN_USERNAME;
  // Toujours exécuter un compare bcrypt pour limiter l'oracle temporel sur l'existence du compte.
  const hash = okUser
    ? process.env.ADMIN_PASSWORD_HASH
    : '$2a$10$CwTycUXWue0Thq9StjUM0uJ8.7qXr8oQ7m0Q6m0Q6m0Q6m0Q6m0Qe';
  let okPass = false;
  try {
    okPass = await bcrypt.compare(String(password || ''), hash);
  } catch {
    okPass = false;
  }
  return okUser && okPass;
}

function readCookie(req, name) {
  const raw = req.headers.cookie || '';
  for (const part of raw.split(';')) {
    const idx = part.indexOf('=');
    if (idx < 0) continue;
    if (part.slice(0, idx).trim() === name) return decodeURIComponent(part.slice(idx + 1).trim());
  }
  return null;
}

export function currentAdmin(req) {
  return verifyToken(readCookie(req, COOKIE_NAME));
}

/** Middleware : 401 si pas de session admin valide. */
export function requireAuth(req, res, next) {
  const user = currentAdmin(req);
  if (!user) return res.status(401).json({ ok: false, error: 'Non authentifié.' });
  req.admin = user;
  next();
}
