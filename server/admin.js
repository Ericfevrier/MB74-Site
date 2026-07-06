/**
 * API admin Motor Boat 74 : authentification + CRUD occasions + messages de contact.
 * Montée sur l'app Express existante via `mountAdmin(app)`.
 *
 * - Lecture publique : GET /api/used-boats (consommée par les clientLoader du site).
 * - Admin (cookie de session requis) : /api/admin/*.
 * Sans base configurée, les écritures renvoient 503 ; la lecture publique renvoie 503
 * aussi → les loaders du site retombent alors sur les données statiques.
 */
import { promises as fsp, existsSync, mkdirSync, readdirSync, statSync, readFileSync } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';
import { query, dbConfigured } from './db.js';
import { refreshRedirects, normalizePath } from './redirects.js';
import {
  COOKIE_NAME,
  COOKIE_TTL_MS,
  createToken,
  checkCredentials,
  requireAuth,
  requireSuperAdmin,
  currentAdmin,
  authConfigured,
  csrfToken,
  csrfForReq,
  loginBlockedSeconds,
  recordLoginFailure,
  recordLoginSuccess,
} from './auth.js';

const BOAT_FIELDS = [
  'slug', 'model_slug', 'brand', 'title', 'year', 'capacity', 'power', 'hours',
  'length', 'location', 'price', 'price_value', 'image', 'gallery', 'description',
  'highlights', 'sold', 'status', 'sort_order', 'seo', 'publish_at', 'unpublish_at',
];

const parseArr = (v) => {
  if (!v) return undefined;
  if (Array.isArray(v)) return v.length ? v : undefined;
  try {
    const a = JSON.parse(v);
    return Array.isArray(a) && a.length ? a : undefined;
  } catch {
    return undefined;
  }
};

/** Ligne DB → forme `UsedBoat` du site (camelCase). `admin` ajoute id/status/sortOrder. */
function rowToBoat(r, admin = false) {
  const boat = {
    slug: r.slug,
    modelSlug: r.model_slug || '',
    brandId: r.brand || '',
    title: r.title,
    year: String(r.year ?? ''),
    capacity: r.capacity || undefined,
    power: r.power || undefined,
    hours: r.hours || undefined,
    length: r.length || undefined,
    location: r.location || undefined,
    price: r.price,
    priceValue: r.price_value ?? undefined,
    image: r.image,
    gallery: parseArr(r.gallery),
    description: r.description || undefined,
    highlights: parseArr(r.highlights),
    sold: !!r.sold,
    seo: parseJson(r.seo, undefined),
  };
  if (admin) {
    boat.id = r.id;
    boat.status = r.status;
    boat.sortOrder = r.sort_order;
    boat.publishAt = toInputDT(r.publish_at);
    boat.unpublishAt = toInputDT(r.unpublish_at);
  }
  return boat;
}

/** Corps admin (camelCase) → valeurs de colonnes (snake_case) prêtes pour SQL. */
function boatToRow(b) {
  const arr = (v) => (Array.isArray(v) && v.length ? JSON.stringify(v) : null);
  const s = (v) => (v === undefined || v === null || v === '' ? null : String(v));
  return {
    slug: String(b.slug || '').trim(),
    model_slug: b.modelSlug ? String(b.modelSlug) : '',
    brand: b.brandId ? String(b.brandId) : '',
    title: String(b.title || '').trim(),
    year: b.year != null ? String(b.year) : '',
    capacity: s(b.capacity),
    power: s(b.power),
    hours: s(b.hours),
    length: s(b.length),
    location: s(b.location),
    price: b.price != null ? String(b.price) : '',
    price_value: b.priceValue === '' || b.priceValue == null ? null : Number(b.priceValue),
    image: b.image ? String(b.image) : '',
    gallery: arr(b.gallery),
    description: s(b.description),
    highlights: arr(b.highlights),
    sold: b.sold ? 1 : 0,
    status: b.status === 'draft' ? 'draft' : 'published',
    sort_order: Number.isFinite(Number(b.sortOrder)) ? Number(b.sortOrder) : 0,
    seo: b.seo && Object.keys(b.seo).length ? JSON.stringify(b.seo) : null,
    publish_at: toDbDT(b.publishAt),
    unpublish_at: toDbDT(b.unpublishAt),
  };
}

const ISO_DATE = (v) => {
  if (!v) return '';
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v).slice(0, 10);
};

// Planification : conversions entre DATETIME base et valeur d'input <input type="datetime-local">.
const toInputDT = (v) => {
  if (!v) return undefined;
  if (v instanceof Date) return new Date(v.getTime() - v.getTimezoneOffset() * 60000).toISOString().slice(0, 16);
  return String(v).replace(' ', 'T').slice(0, 16);
};
const toDbDT = (v) => (v ? String(v).replace('T', ' ').slice(0, 19) : null);
// Fenêtre « en ligne » : publié ET (pas de date de pub future) ET (pas de date de retrait passée).
const LIVE_WINDOW =
  "status = 'published' AND (publish_at IS NULL OR publish_at <= NOW()) AND (unpublish_at IS NULL OR unpublish_at > NOW())";

const BLOG_FIELDS = ['slug', 'title', 'excerpt', 'category', 'date', 'image', 'reading_time', 'content', 'status', 'seo', 'publish_at', 'unpublish_at'];

/** Ligne DB → forme `BlogArticle` du site. `opts.full` ajoute le contenu ; `opts.admin` ajoute id/status. */
function rowToArticle(r, opts = {}) {
  const a = {
    slug: r.slug,
    path: `/blog/${r.slug}`,
    title: r.title,
    excerpt: r.excerpt || '',
    category: r.category || '',
    date: ISO_DATE(r.date),
    image: r.image || '',
    readingTime: r.reading_time || undefined,
    seo: parseJson(r.seo, undefined),
  };
  if (opts.full || opts.admin) a.content = r.content || '';
  if (opts.admin) {
    a.id = r.id;
    a.status = r.status;
    a.publishAt = toInputDT(r.publish_at);
    a.unpublishAt = toInputDT(r.unpublish_at);
  }
  return a;
}

function articleToRow(a) {
  const s = (v) => (v === undefined || v === null || v === '' ? null : String(v));
  return {
    slug: String(a.slug || '').trim(),
    title: String(a.title || '').trim(),
    excerpt: s(a.excerpt),
    category: a.category ? String(a.category) : '',
    date: a.date ? String(a.date).slice(0, 10) : null,
    image: s(a.image),
    reading_time: s(a.readingTime),
    content: a.content != null ? String(a.content) : null,
    status: a.status === 'draft' ? 'draft' : 'published',
    seo: a.seo && Object.keys(a.seo).length ? JSON.stringify(a.seo) : null,
    publish_at: toDbDT(a.publishAt),
    unpublish_at: toDbDT(a.unpublishAt),
  };
}

const TEAM_FIELDS = ['name', 'role', 'bio', 'image', 'position', 'sort_order', 'status'];

function rowToMember(r, admin = false) {
  const m = { name: r.name, role: r.role || '', bio: r.bio || '', image: r.image || '', position: r.position || '' };
  if (admin) {
    m.id = r.id;
    m.status = r.status;
    m.sortOrder = r.sort_order;
  }
  return m;
}

function memberToRow(a) {
  const s = (v) => (v === undefined || v === null || v === '' ? null : String(v));
  return {
    name: String(a.name || '').trim(),
    role: s(a.role),
    bio: s(a.bio),
    image: s(a.image),
    position: s(a.position),
    sort_order: Number.isFinite(Number(a.sortOrder)) ? Number(a.sortOrder) : 0,
    status: a.status === 'draft' ? 'draft' : 'published',
  };
}

const parseJson = (v, fallback) => {
  if (v == null) return fallback;
  if (typeof v === 'object') return v;
  try {
    return JSON.parse(v);
  } catch {
    return fallback;
  }
};

const CITY_FIELDS = [
  'slug', 'city', 'h1', 'meta_title', 'meta_description', 'hero', 'intro', 'lake',
  'zones_intro', 'ports', 'local_expertise', 'seo', 'sort_order', 'status',
];

function rowToCity(r, admin = false) {
  const c = {
    slug: r.slug,
    city: r.city,
    h1: r.h1 || '',
    metaTitle: r.meta_title || '',
    metaDescription: r.meta_description || '',
    hero: r.hero || '',
    intro: r.intro || '',
    lake: r.lake || '',
    zonesIntro: r.zones_intro || '',
    ports: parseJson(r.ports, []),
    localExpertise: parseJson(r.local_expertise, undefined),
    seo: parseJson(r.seo, undefined),
  };
  if (admin) {
    c.id = r.id;
    c.status = r.status;
    c.sortOrder = r.sort_order;
  }
  return c;
}

function cityToRow(c) {
  const s = (v) => (v === undefined || v === null ? '' : String(v));
  const arr = Array.isArray(c.ports) ? c.ports.filter((p) => p && (p.title || p.desc)) : [];
  let le = null;
  if (c.localExpertise && (c.localExpertise.intro || (c.localExpertise.facts || []).length)) {
    le = { intro: s(c.localExpertise.intro), facts: (c.localExpertise.facts || []).filter((f) => f && (f.title || f.text)) };
  }
  return {
    slug: String(c.slug || '').trim(),
    city: String(c.city || '').trim(),
    h1: s(c.h1),
    meta_title: s(c.metaTitle),
    meta_description: s(c.metaDescription),
    hero: s(c.hero),
    intro: s(c.intro),
    lake: s(c.lake),
    zones_intro: s(c.zonesIntro),
    ports: JSON.stringify(arr),
    local_expertise: le ? JSON.stringify(le) : null,
    seo: c.seo && Object.keys(c.seo).length ? JSON.stringify(c.seo) : null,
    sort_order: Number.isFinite(Number(c.sortOrder)) ? Number(c.sortOrder) : 0,
    status: c.status === 'draft' ? 'draft' : 'published',
  };
}

const needDb = (res) =>
  res.status(503).json({ ok: false, error: 'Base de données non configurée.' });

// Validation partagée : slug (minuscules/chiffres/tirets) et longueur de champ.
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const badSlug = (res) =>
  res.status(400).json({ ok: false, error: 'Slug invalide : minuscules, chiffres et tirets uniquement (ex. mon-contenu).' });
const tooLong = (res, field, max) =>
  res.status(400).json({ ok: false, error: `Champ « ${field} » trop long (max ${max} caractères).` });

// Historique : enregistre un snapshot (garde les 20 derniers par contenu).
async function snapshot(entityType, entityId, dataObj, username) {
  try {
    await query('INSERT INTO content_versions (entity_type, entity_id, data, username) VALUES (?, ?, ?, ?)', [
      entityType, entityId, JSON.stringify(dataObj), username || '',
    ]);
    await query(
      `DELETE FROM content_versions WHERE entity_type = ? AND entity_id = ? AND id NOT IN
       (SELECT id FROM (SELECT id FROM content_versions WHERE entity_type = ? AND entity_id = ? ORDER BY id DESC LIMIT 20) t)`,
      [entityType, entityId, entityType, entityId],
    );
  } catch (e) {
    console.error('snapshot', e.message);
  }
}
// Lit la ligne courante et l'archive AVANT une modification (mapper → objet admin).
async function snapshotCurrent(entityType, table, id, mapper, username) {
  try {
    const cur = await query(`SELECT * FROM ${table} WHERE id = ?`, [id]);
    if (cur.length) await snapshot(entityType, id, mapper(cur[0]), username);
  } catch (e) {
    console.error('snapshotCurrent', e.message);
  }
}

/* ------------------------------ Médiathèque ----------------------------- */
const ADMIN_DIR = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(ADMIN_DIR, '..');
// Dossier d'uploads PERSISTANT (hors build → survit à `git reset --hard`).
const UPLOADS_DIR = path.join(ROOT_DIR, 'uploads');
// Images embarquées dans le build (lecture seule, pour retrouver les visuels existants).
const SITE_IMAGES_DIR = path.join(ROOT_DIR, 'build', 'client', 'images');
const MEDIA_EXT = /\.(webp|jpe?g|png|gif|avif|svg|pdf|mp4|webm|mov)$/i;
const META_FILE = path.join(UPLOADS_DIR, '.mediameta.json');

/** Type de média à partir de l'extension (pour l'affichage côté admin). */
const mediaType = (name) => {
  const e = name.split('.').pop().toLowerCase();
  if (['webp', 'jpg', 'jpeg', 'png', 'gif', 'avif', 'svg'].includes(e)) return 'image';
  if (e === 'pdf') return 'pdf';
  if (['mp4', 'webm', 'mov'].includes(e)) return 'video';
  return 'file';
};

// Métadonnées (alt / légende) stockées dans un fichier sidecar JSON du dossier uploads.
function readMediaMeta() {
  try {
    if (existsSync(META_FILE)) return JSON.parse(readFileSync(META_FILE, 'utf8')) || {};
  } catch { /* ignore */ }
  return {};
}
async function writeMediaMeta(meta) {
  if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true });
  await fsp.writeFile(META_FILE, JSON.stringify(meta, null, 2));
}

/** Liste récursive des médias d'un dossier, avec URL, taille, date, type et méta. */
function listImages(dir, baseUrl, meta = {}) {
  if (!existsSync(dir)) return [];
  const out = [];
  const walk = (d) => {
    for (const ent of readdirSync(d, { withFileTypes: true })) {
      if (ent.name.startsWith('.')) continue; // ignore .mediameta.json et fichiers cachés
      const fp = path.join(d, ent.name);
      if (ent.isDirectory()) walk(fp);
      else if (MEDIA_EXT.test(ent.name)) {
        try {
          const st = statSync(fp);
          const rel = path.relative(dir, fp).split(path.sep).join('/');
          const m = meta[rel] || {};
          out.push({ name: rel, url: `${baseUrl}/${rel}`, size: st.size, mtime: st.mtimeMs, type: mediaType(rel), alt: m.alt || '', caption: m.caption || '' });
        } catch { /* ignore */ }
      }
    }
  };
  walk(dir);
  return out;
}

export function mountAdmin(app) {
  /* --------------------- Journal d'activité (auto) ---------------- */
  // Enregistre chaque mutation admin réussie (qui/quoi/quand), sans code par route.
  app.use('/api/admin', (req, res, next) => {
    if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) return next();
    const p = req.originalUrl.split('?')[0].replace(/^\/api\/admin\/?/, '');
    const seg = p.split('/').filter(Boolean);
    const entity = seg[0] || '';
    if (['login', 'logout', 'me', 'activity'].includes(entity)) return next();
    res.on('finish', () => {
      if (res.statusCode >= 400 || !dbConfigured()) return;
      const username = (req.admin && req.admin.username) || 'inconnu';
      const entityId = seg.find((s, i) => i > 0 && /^\d+$/.test(s)) || null;
      query(
        'INSERT INTO activity_log (username, action, entity, entity_id, detail) VALUES (?, ?, ?, ?, ?)',
        [username, req.method, entity, entityId, `${req.method} /${p}`.slice(0, 255)],
      ).catch(() => {});
    });
    next();
  });

  app.get('/api/admin/activity', requireAuth, async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query('SELECT * FROM activity_log ORDER BY created_at DESC, id DESC LIMIT 200');
      res.json({ activity: rows });
    } catch (e) {
      console.error('GET /api/admin/activity', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* ----------------------------- Auth ----------------------------- */

  app.post('/api/admin/login', async (req, res) => {
    if (!authConfigured()) {
      return res.status(503).json({ ok: false, error: 'Compte admin non configuré (ADMIN_USERNAME / ADMIN_PASSWORD_HASH).' });
    }
    const ip = req.ip || req.headers['x-forwarded-for'] || 'unknown';
    const wait = loginBlockedSeconds(ip);
    if (wait) {
      return res.status(429).set('Retry-After', String(wait)).json({
        ok: false,
        error: `Trop de tentatives. Réessayez dans ${Math.ceil(wait / 60)} min.`,
      });
    }
    const { username, password } = req.body || {};
    // 1) Compte des variables d'env → super-admin (bootstrap, toujours disponible).
    let role = null;
    if (await checkCredentials(username, password)) {
      role = 'super-admin';
    } else if (dbConfigured()) {
      // 2) Comptes additionnels en base (rôle admin/super-admin).
      try {
        const rows = await query('SELECT password_hash, role FROM admin_users WHERE username = ? LIMIT 1', [String(username || '')]);
        if (rows.length && (await bcrypt.compare(String(password || ''), rows[0].password_hash))) {
          role = rows[0].role === 'super-admin' ? 'super-admin' : 'admin';
        }
      } catch (e) {
        console.error('login DB users', e.message);
      }
    }
    if (!role) {
      recordLoginFailure(ip);
      return res.status(401).json({ ok: false, error: 'Identifiants invalides.' });
    }
    recordLoginSuccess(ip);
    const token = createToken(username, role);
    res.cookie(COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: 'lax',
      secure: req.secure,
      path: '/',
      maxAge: COOKIE_TTL_MS,
    });
    res.json({ ok: true, username, role, csrf: csrfToken(token) });
  });

  app.post('/api/admin/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME, { path: '/' });
    res.json({ ok: true });
  });

  app.get('/api/admin/me', (req, res) => {
    const user = currentAdmin(req);
    if (!user) return res.status(401).json({ ok: false });
    res.json({ ok: true, username: user.username, role: user.role, csrf: csrfForReq(req) });
  });

  /* ------------------- Utilisateurs (super-admin) ----------------- */

  app.get('/api/admin/users', requireSuperAdmin, async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query('SELECT id, username, role, created_at FROM admin_users ORDER BY username ASC');
      res.json({ users: rows, superAdmin: process.env.ADMIN_USERNAME || null });
    } catch (e) {
      console.error('GET /api/admin/users', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.post('/api/admin/users', requireSuperAdmin, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const username = String((req.body && req.body.username) || '').trim();
    const password = String((req.body && req.body.password) || '');
    const role = (req.body && req.body.role) === 'super-admin' ? 'super-admin' : 'admin';
    if (!/^[a-zA-Z0-9._-]{3,64}$/.test(username)) return res.status(400).json({ ok: false, error: 'Identifiant invalide (3–64 car. : lettres, chiffres, . _ -).' });
    if (password.length < 8) return res.status(400).json({ ok: false, error: 'Mot de passe trop court (min 8 caractères).' });
    if (username === process.env.ADMIN_USERNAME) return res.status(409).json({ ok: false, error: 'Cet identifiant est déjà celui du super-admin principal.' });
    try {
      const hash = await bcrypt.hash(password, 10);
      await query('INSERT INTO admin_users (username, password_hash, role) VALUES (?, ?, ?)', [username, hash, role]);
      res.json({ ok: true });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'Cet identifiant existe déjà.' });
      console.error('POST /api/admin/users', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.delete('/api/admin/users/:id', requireSuperAdmin, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    try {
      const r = await query('DELETE FROM admin_users WHERE id = ?', [id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      console.error('DELETE /api/admin/users', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* ----------------------- Occasions (public) --------------------- */

  // Lecture live pour les pages publiques (clientLoader). Repli statique côté site si 503/erreur.
  app.get('/api/used-boats', async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query(
        `SELECT * FROM used_boats WHERE ${LIVE_WINDOW} ORDER BY sold ASC, sort_order ASC, id DESC`,
      );
      res.json({ boats: rows.map((r) => rowToBoat(r)) });
    } catch (e) {
      console.error('GET /api/used-boats', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  // Fiche occasion unique (avec aperçu brouillon ?preview=1 pour un admin connecté).
  app.get('/api/used-boats/:slug', async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const preview = req.query.preview && currentAdmin(req);
    try {
      const where = preview ? 'slug = ?' : `slug = ? AND ${LIVE_WINDOW}`;
      const rows = await query(`SELECT * FROM used_boats WHERE ${where} LIMIT 1`, [req.params.slug]);
      if (!rows.length) return res.status(404).json({ ok: false, error: 'Occasion introuvable.' });
      res.json({ boat: rowToBoat(rows[0]) });
    } catch (e) {
      console.error('GET /api/used-boats/:slug', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* ----------------------- Occasions (admin) ---------------------- */

  app.get('/api/admin/used-boats', requireAuth, async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query('SELECT * FROM used_boats ORDER BY sort_order ASC, id DESC');
      res.json({ boats: rows.map((r) => rowToBoat(r, true)) });
    } catch (e) {
      console.error('GET /api/admin/used-boats', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.post('/api/admin/used-boats', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const row = boatToRow(req.body || {});
    if (!row.slug || !row.title) return res.status(400).json({ ok: false, error: 'Slug et titre requis.' });
    if (!SLUG_RE.test(row.slug)) return badSlug(res);
    if (row.title.length > 255) return tooLong(res, 'titre', 255);
    try {
      const cols = BOAT_FIELDS.join(', ');
      const placeholders = BOAT_FIELDS.map(() => '?').join(', ');
      const values = BOAT_FIELDS.map((c) => row[c]);
      const r = await query(`INSERT INTO used_boats (${cols}) VALUES (${placeholders})`, values);
      res.json({ ok: true, id: r.insertId });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'Ce slug existe déjà.' });
      console.error('POST /api/admin/used-boats', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.put('/api/admin/used-boats/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    const row = boatToRow(req.body || {});
    if (!row.slug || !row.title) return res.status(400).json({ ok: false, error: 'Slug et titre requis.' });
    if (!SLUG_RE.test(row.slug)) return badSlug(res);
    if (row.title.length > 255) return tooLong(res, 'titre', 255);
    try {
      await snapshotCurrent('used-boats', 'used_boats', id, (r) => rowToBoat(r, true), req.admin.username);
      const set = BOAT_FIELDS.map((c) => `${c} = ?`).join(', ');
      const values = [...BOAT_FIELDS.map((c) => row[c]), id];
      const r = await query(`UPDATE used_boats SET ${set} WHERE id = ?`, values);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'Ce slug existe déjà.' });
      console.error('PUT /api/admin/used-boats', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  // Import en masse (seed depuis le catalogue statique envoyé par le client).
  // N'écrase PAS une fiche déjà présente (INSERT IGNORE sur le slug).
  app.post('/api/admin/used-boats/import', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const list = Array.isArray(req.body && req.body.boats) ? req.body.boats : [];
    if (!list.length) return res.status(400).json({ ok: false, error: 'Aucune occasion fournie.' });
    let imported = 0;
    try {
      const cols = BOAT_FIELDS.join(', ');
      const ph = BOAT_FIELDS.map(() => '?').join(', ');
      for (let i = 0; i < list.length; i++) {
        const row = boatToRow({ sortOrder: i, ...list[i] });
        if (!row.slug || !row.title) continue;
        const r = await query(`INSERT IGNORE INTO used_boats (${cols}) VALUES (${ph})`, BOAT_FIELDS.map((c) => row[c]));
        if (r.affectedRows) imported++;
      }
      res.json({ ok: true, imported });
    } catch (e) {
      console.error('POST /api/admin/used-boats/import', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.delete('/api/admin/used-boats/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    try {
      const r = await query('DELETE FROM used_boats WHERE id = ?', [id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      console.error('DELETE /api/admin/used-boats', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* ------------------------- Blog (public) ------------------------ */

  app.get('/api/blog', async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query(`SELECT * FROM blog_articles WHERE ${LIVE_WINDOW} ORDER BY date DESC, id DESC`);
      res.json({ articles: rows.map((r) => rowToArticle(r)) });
    } catch (e) {
      console.error('GET /api/blog', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.get('/api/blog/:slug', async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    // Aperçu brouillon : réservé à un admin connecté (?preview=1).
    const preview = req.query.preview && currentAdmin(req);
    try {
      const where = preview ? 'slug = ?' : `slug = ? AND ${LIVE_WINDOW}`;
      const rows = await query(`SELECT * FROM blog_articles WHERE ${where} LIMIT 1`, [req.params.slug]);
      if (!rows.length) return res.status(404).json({ ok: false, error: 'Article introuvable.' });
      res.json({ article: rowToArticle(rows[0], { full: true }) });
    } catch (e) {
      console.error('GET /api/blog/:slug', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* ------------------------- Blog (admin) ------------------------- */

  app.get('/api/admin/blog', requireAuth, async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query('SELECT * FROM blog_articles ORDER BY date DESC, id DESC');
      res.json({ articles: rows.map((r) => rowToArticle(r, { admin: true })) });
    } catch (e) {
      console.error('GET /api/admin/blog', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.post('/api/admin/blog', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const row = articleToRow(req.body || {});
    if (!row.slug || !row.title) return res.status(400).json({ ok: false, error: 'Slug et titre requis.' });
    if (!SLUG_RE.test(row.slug)) return badSlug(res);
    if (row.title.length > 255) return tooLong(res, 'titre', 255);
    try {
      const cols = BLOG_FIELDS.join(', ');
      const placeholders = BLOG_FIELDS.map(() => '?').join(', ');
      const r = await query(`INSERT INTO blog_articles (${cols}) VALUES (${placeholders})`, BLOG_FIELDS.map((c) => row[c]));
      res.json({ ok: true, id: r.insertId });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'Ce slug existe déjà.' });
      console.error('POST /api/admin/blog', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.put('/api/admin/blog/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    const row = articleToRow(req.body || {});
    if (!row.slug || !row.title) return res.status(400).json({ ok: false, error: 'Slug et titre requis.' });
    if (!SLUG_RE.test(row.slug)) return badSlug(res);
    if (row.title.length > 255) return tooLong(res, 'titre', 255);
    try {
      await snapshotCurrent('blog', 'blog_articles', id, (r) => rowToArticle(r, { admin: true }), req.admin.username);
      const set = BLOG_FIELDS.map((c) => `${c} = ?`).join(', ');
      const r = await query(`UPDATE blog_articles SET ${set} WHERE id = ?`, [...BLOG_FIELDS.map((c) => row[c]), id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'Ce slug existe déjà.' });
      console.error('PUT /api/admin/blog', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.delete('/api/admin/blog/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    try {
      const r = await query('DELETE FROM blog_articles WHERE id = ?', [id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      console.error('DELETE /api/admin/blog', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* --------------------------- Équipe ----------------------------- */

  app.get('/api/team', async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query("SELECT * FROM team_members WHERE status = 'published' ORDER BY sort_order ASC, id ASC");
      res.json({ members: rows.map((r) => rowToMember(r)) });
    } catch (e) {
      console.error('GET /api/team', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.get('/api/admin/team', requireAuth, async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query('SELECT * FROM team_members ORDER BY sort_order ASC, id ASC');
      res.json({ members: rows.map((r) => rowToMember(r, true)) });
    } catch (e) {
      console.error('GET /api/admin/team', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.post('/api/admin/team', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const row = memberToRow(req.body || {});
    if (!row.name) return res.status(400).json({ ok: false, error: 'Nom requis.' });
    try {
      const cols = TEAM_FIELDS.join(', ');
      const ph = TEAM_FIELDS.map(() => '?').join(', ');
      const r = await query(`INSERT INTO team_members (${cols}) VALUES (${ph})`, TEAM_FIELDS.map((c) => row[c]));
      res.json({ ok: true, id: r.insertId });
    } catch (e) {
      console.error('POST /api/admin/team', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.put('/api/admin/team/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    const row = memberToRow(req.body || {});
    if (!row.name) return res.status(400).json({ ok: false, error: 'Nom requis.' });
    try {
      const set = TEAM_FIELDS.map((c) => `${c} = ?`).join(', ');
      const r = await query(`UPDATE team_members SET ${set} WHERE id = ?`, [...TEAM_FIELDS.map((c) => row[c]), id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      console.error('PUT /api/admin/team', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.delete('/api/admin/team/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    try {
      const r = await query('DELETE FROM team_members WHERE id = ?', [id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      console.error('DELETE /api/admin/team', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* --------------------------- Marques ---------------------------- */

  // La page marque complète (BrandData : identité, hero, description, introImages,
  // models « vitrine », comparatifs) est stockée en JSON dans `data`. Les colonnes
  // (name, logo…) sont dupliquées pour le listing rapide et la compat ascendante.
  const BRAND_FIELDS = ['brand_id', 'name', 'full_name', 'role', 'logo', 'hero_image', 'tagline', 'description', 'hero_wordmark', 'data'];

  const rowToBrand = (r) => {
    const data = parseJson(r.data, null);
    if (data && typeof data === 'object') {
      return { brand_id: r.brand_id, ...data, id: r.brand_id };
    }
    // Repli colonnes (marque pas encore enregistrée en données complètes).
    return {
      brand_id: r.brand_id,
      id: r.brand_id,
      name: r.name || '',
      fullName: r.full_name || '',
      role: r.role || '',
      logo: r.logo || '',
      heroImage: r.hero_image || '',
      tagline: r.tagline || '',
      description: r.description || '',
      heroWordmark: !!r.hero_wordmark,
      models: [],
      comparisons: [],
      introImages: [],
    };
  };

  const brandToRow = (brandId, b) => {
    const s = (v) => (v === undefined || v === null ? '' : String(v));
    const data = { ...b, id: brandId };
    delete data.brand_id;
    return {
      brand_id: brandId,
      name: s(b.name),
      full_name: s(b.fullName),
      role: s(b.role),
      logo: s(b.logo),
      hero_image: s(b.heroImage),
      tagline: s(b.tagline),
      description: s(b.description),
      hero_wordmark: b.heroWordmark ? 1 : 0,
      data: JSON.stringify(data),
    };
  };

  const slugifyId = (v) =>
    String(v || '')
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');

  app.get('/api/brands', async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query('SELECT * FROM brands');
      res.json({ brands: rows.map(rowToBrand) });
    } catch (e) {
      console.error('GET /api/brands', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.get('/api/admin/brands', requireAuth, async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query('SELECT * FROM brands ORDER BY brand_id ASC');
      res.json({ brands: rows.map(rowToBrand) });
    } catch (e) {
      console.error('GET /api/admin/brands', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  // Création d'une nouvelle marque (échoue si l'identifiant existe déjà).
  app.post('/api/admin/brands', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const b = req.body || {};
    const brandId = slugifyId(b.brand_id || b.id || b.name);
    if (!brandId) return res.status(400).json({ ok: false, error: 'Identifiant de marque requis.' });
    const row = brandToRow(brandId, b);
    try {
      const cols = BRAND_FIELDS.join(', ');
      const ph = BRAND_FIELDS.map(() => '?').join(', ');
      await query(`INSERT INTO brands (${cols}) VALUES (${ph})`, BRAND_FIELDS.map((c) => row[c]));
      res.json({ ok: true, brand_id: brandId });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'Cette marque existe déjà.' });
      console.error('POST /api/admin/brands', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.put('/api/admin/brands/:brandId', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const brandId = String(req.params.brandId || '').trim().toLowerCase();
    if (!brandId) return res.status(400).json({ ok: false, error: 'brand_id requis.' });
    const row = brandToRow(brandId, req.body || {});
    try {
      const cols = BRAND_FIELDS.join(', ');
      const ph = BRAND_FIELDS.map(() => '?').join(', ');
      const upd = BRAND_FIELDS.filter((c) => c !== 'brand_id').map((c) => `${c} = VALUES(${c})`).join(', ');
      await query(`INSERT INTO brands (${cols}) VALUES (${ph}) ON DUPLICATE KEY UPDATE ${upd}`, BRAND_FIELDS.map((c) => row[c]));
      res.json({ ok: true });
    } catch (e) {
      console.error('PUT /api/admin/brands', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.delete('/api/admin/brands/:brandId', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const brandId = String(req.params.brandId || '').trim().toLowerCase();
    try {
      // Garde-fou : une marque contenant des modèles ne peut pas être supprimée (orphelins).
      const [{ n } = { n: 0 }] = await query('SELECT COUNT(*) AS n FROM boat_models WHERE brand = ?', [brandId]);
      if (Number(n) > 0) {
        return res.status(409).json({ ok: false, error: `Impossible : cette marque contient ${n} modèle(s). Supprime ou déplace-les d'abord.` });
      }
      const r = await query('DELETE FROM brands WHERE brand_id = ?', [brandId]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      console.error('DELETE /api/admin/brands', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* --------------------------- Modèles ---------------------------- */

  // Le modèle complet (NautiqueModel) est stocké en JSON dans la colonne `data`.
  // slug/name/brand sont dupliqués en colonnes pour le tri et l'unicité.
  const rowToModel = (r, admin = false) => {
    const data = parseJson(r.data, {}) || {};
    const model = { ...data, slug: r.slug, name: data.name || r.name || '' };
    const out = { brand: r.brand || '', ...model };
    if (admin) {
      out.id = r.id;
      out.status = r.status;
      out.sortOrder = r.sort_order;
    }
    return out;
  };

  // Corps admin (modèle complet + brand/status/sortOrder) → colonnes.
  const modelToRow = (m) => {
    const brand = String(m.brand || '').trim().toLowerCase();
    const slug = String(m.slug || '').trim();
    // On retire les champs « enveloppe » du blob de données.
    const { id, status, sortOrder, brand: _b, ...data } = m || {};
    data.slug = slug;
    return {
      brand,
      slug,
      name: String(data.name || '').trim(),
      data: JSON.stringify(data),
      status: m.status === 'draft' ? 'draft' : 'published',
      sort_order: Number.isFinite(Number(m.sortOrder)) ? Number(m.sortOrder) : 0,
    };
  };

  const MODEL_FIELDS = ['brand', 'slug', 'name', 'data', 'status', 'sort_order'];

  // Lecture publique : tous les modèles publiés (fusionnés en live côté site).
  app.get('/api/models', async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query("SELECT * FROM boat_models WHERE status = 'published' ORDER BY sort_order ASC, id ASC");
      res.json({ models: rows.map((r) => rowToModel(r)) });
    } catch (e) {
      console.error('GET /api/models', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.get('/api/admin/models', requireAuth, async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query('SELECT * FROM boat_models ORDER BY brand ASC, sort_order ASC, id ASC');
      res.json({ models: rows.map((r) => rowToModel(r, true)) });
    } catch (e) {
      console.error('GET /api/admin/models', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.post('/api/admin/models', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const row = modelToRow(req.body || {});
    if (!row.slug || !row.brand) return res.status(400).json({ ok: false, error: 'Marque et slug requis.' });
    if (!SLUG_RE.test(row.slug)) return badSlug(res);
    try {
      const cols = MODEL_FIELDS.join(', ');
      const ph = MODEL_FIELDS.map(() => '?').join(', ');
      const r = await query(`INSERT INTO boat_models (${cols}) VALUES (${ph})`, MODEL_FIELDS.map((c) => row[c]));
      res.json({ ok: true, id: r.insertId });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'Ce modèle (marque + slug) existe déjà.' });
      console.error('POST /api/admin/models', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.put('/api/admin/models/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    const row = modelToRow(req.body || {});
    if (!row.slug || !row.brand) return res.status(400).json({ ok: false, error: 'Marque et slug requis.' });
    if (!SLUG_RE.test(row.slug)) return badSlug(res);
    try {
      await snapshotCurrent('models', 'boat_models', id, (r) => rowToModel(r, true), req.admin.username);
      const set = MODEL_FIELDS.map((c) => `${c} = ?`).join(', ');
      const r = await query(`UPDATE boat_models SET ${set} WHERE id = ?`, [...MODEL_FIELDS.map((c) => row[c]), id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'Ce modèle (marque + slug) existe déjà.' });
      console.error('PUT /api/admin/models', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.delete('/api/admin/models/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    try {
      const r = await query('DELETE FROM boat_models WHERE id = ?', [id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      console.error('DELETE /api/admin/models', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  // Import en masse (seed depuis les données statiques envoyées par le client).
  // N'écrase PAS un modèle déjà présent (INSERT IGNORE sur brand+slug).
  app.post('/api/admin/models/import', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const list = Array.isArray(req.body && req.body.models) ? req.body.models : [];
    if (!list.length) return res.status(400).json({ ok: false, error: 'Aucun modèle fourni.' });
    let imported = 0;
    try {
      for (let i = 0; i < list.length; i++) {
        const row = modelToRow({ ...list[i], sortOrder: i });
        if (!row.slug || !row.brand) continue;
        const cols = MODEL_FIELDS.join(', ');
        const ph = MODEL_FIELDS.map(() => '?').join(', ');
        const r = await query(`INSERT IGNORE INTO boat_models (${cols}) VALUES (${ph})`, MODEL_FIELDS.map((c) => row[c]));
        if (r.affectedRows) imported++;
      }
      res.json({ ok: true, imported });
    } catch (e) {
      console.error('POST /api/admin/models/import', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* -------------------- Villes (hivernage) ------------------------ */

  app.get('/api/cities', async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query("SELECT * FROM hivernage_cities WHERE status = 'published' ORDER BY sort_order ASC, id ASC");
      res.json({ cities: rows.map((r) => rowToCity(r)) });
    } catch (e) {
      console.error('GET /api/cities', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.get('/api/cities/:slug', async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query("SELECT * FROM hivernage_cities WHERE slug = ? AND status = 'published' LIMIT 1", [req.params.slug]);
      if (!rows.length) return res.status(404).json({ ok: false, error: 'Ville introuvable.' });
      res.json({ city: rowToCity(rows[0]) });
    } catch (e) {
      console.error('GET /api/cities/:slug', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.get('/api/admin/cities', requireAuth, async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query('SELECT * FROM hivernage_cities ORDER BY sort_order ASC, id ASC');
      res.json({ cities: rows.map((r) => rowToCity(r, true)) });
    } catch (e) {
      console.error('GET /api/admin/cities', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.post('/api/admin/cities', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const row = cityToRow(req.body || {});
    if (!row.slug || !row.city) return res.status(400).json({ ok: false, error: 'Slug et ville requis.' });
    if (!SLUG_RE.test(row.slug)) return badSlug(res);
    try {
      const cols = CITY_FIELDS.join(', ');
      const ph = CITY_FIELDS.map(() => '?').join(', ');
      const r = await query(`INSERT INTO hivernage_cities (${cols}) VALUES (${ph})`, CITY_FIELDS.map((c) => row[c]));
      res.json({ ok: true, id: r.insertId });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'Ce slug existe déjà.' });
      console.error('POST /api/admin/cities', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.put('/api/admin/cities/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    const row = cityToRow(req.body || {});
    if (!row.slug || !row.city) return res.status(400).json({ ok: false, error: 'Slug et ville requis.' });
    if (!SLUG_RE.test(row.slug)) return badSlug(res);
    try {
      await snapshotCurrent('cities', 'hivernage_cities', id, (r) => rowToCity(r, true), req.admin.username);
      const set = CITY_FIELDS.map((c) => `${c} = ?`).join(', ');
      const r = await query(`UPDATE hivernage_cities SET ${set} WHERE id = ?`, [...CITY_FIELDS.map((c) => row[c]), id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'Ce slug existe déjà.' });
      console.error('PUT /api/admin/cities', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.delete('/api/admin/cities/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    try {
      const r = await query('DELETE FROM hivernage_cities WHERE id = ?', [id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      console.error('DELETE /api/admin/cities', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* --------------------- Historique de versions ------------------- */

  // Config par type de contenu versionné (id numérique requis).
  const VERSIONED = {
    'used-boats': { table: 'used_boats', fields: BOAT_FIELDS, toRow: boatToRow },
    blog: { table: 'blog_articles', fields: BLOG_FIELDS, toRow: articleToRow },
    cities: { table: 'hivernage_cities', fields: CITY_FIELDS, toRow: cityToRow },
    models: { table: 'boat_models', fields: MODEL_FIELDS, toRow: modelToRow },
  };

  app.get('/api/admin/versions/:type/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const { type, id } = req.params;
    if (!VERSIONED[type]) return res.status(400).json({ ok: false, error: 'Type non versionné.' });
    try {
      const rows = await query(
        'SELECT id, username, created_at FROM content_versions WHERE entity_type = ? AND entity_id = ? ORDER BY id DESC',
        [type, Number(id)],
      );
      res.json({ versions: rows });
    } catch (e) {
      console.error('GET /api/admin/versions', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.post('/api/admin/versions/:versionId/restore', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const vid = Number(req.params.versionId);
    try {
      const rows = await query('SELECT * FROM content_versions WHERE id = ? LIMIT 1', [vid]);
      if (!rows.length) return res.status(404).json({ ok: false, error: 'Version introuvable.' });
      const v = rows[0];
      const cfg = VERSIONED[v.entity_type];
      const data = parseJson(v.data, null);
      if (!cfg || !data) return res.status(400).json({ ok: false, error: 'Version non restaurable.' });
      // Archive l'état courant avant d'écraser (la restauration reste réversible).
      const mappers = {
        'used-boats': (r) => rowToBoat(r, true), blog: (r) => rowToArticle(r, { admin: true }),
        cities: (r) => rowToCity(r, true), models: (r) => rowToModel(r, true),
      };
      await snapshotCurrent(v.entity_type, cfg.table, v.entity_id, mappers[v.entity_type], req.admin.username);
      const row = cfg.toRow(data);
      const set = cfg.fields.map((c) => `${c} = ?`).join(', ');
      const r = await query(`UPDATE ${cfg.table} SET ${set} WHERE id = ?`, [...cfg.fields.map((c) => row[c]), v.entity_id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Contenu introuvable (peut-être supprimé).' });
      res.json({ ok: true });
    } catch (e) {
      console.error('POST /api/admin/versions/restore', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* ----------------------- Redirections 301 ----------------------- */

  app.get('/api/admin/redirects', requireAuth, async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query('SELECT * FROM redirects ORDER BY source_path ASC');
      res.json({ redirects: rows });
    } catch (e) {
      console.error('GET /api/admin/redirects', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  const saveRedirect = async (req, res, id) => {
    if (!dbConfigured()) return needDb(res);
    const source = normalizePath((req.body && req.body.source_path) || '');
    const target = String((req.body && req.body.target) || '').trim();
    const code = Number(req.body && req.body.code) === 302 ? 302 : 301;
    if (!source || source === '/' || !target) return res.status(400).json({ ok: false, error: 'Source et cible requises.' });
    if (normalizePath(target) === source) return res.status(400).json({ ok: false, error: 'La source et la cible sont identiques (boucle).' });
    try {
      if (id) {
        const r = await query('UPDATE redirects SET source_path = ?, target = ?, code = ? WHERE id = ?', [source, target, code, id]);
        if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      } else {
        await query('INSERT INTO redirects (source_path, target, code) VALUES (?, ?, ?)', [source, target, code]);
      }
      await refreshRedirects();
      res.json({ ok: true });
    } catch (e) {
      if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ ok: false, error: 'Une redirection existe déjà pour cette source.' });
      console.error('save redirect', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  };
  app.post('/api/admin/redirects', requireAuth, (req, res) => saveRedirect(req, res, null));
  app.put('/api/admin/redirects/:id', requireAuth, (req, res) => saveRedirect(req, res, Number(req.params.id)));

  app.delete('/api/admin/redirects/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const r = await query('DELETE FROM redirects WHERE id = ?', [Number(req.params.id)]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      await refreshRedirects();
      res.json({ ok: true });
    } catch (e) {
      console.error('DELETE /api/admin/redirects', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* ------------------------- Réglages ----------------------------- */

  // Clés autorisées (on ignore toute autre clé envoyée).
  const SETTING_KEYS = [
    'phone', 'email', 'address_street', 'address_locality', 'address_postal', 'address_region',
    'hours', 'instagram', 'facebook', 'youtube', 'linkedin',
  ];

  async function readSettings() {
    const rows = await query('SELECT name, value FROM settings');
    const out = {};
    for (const r of rows) out[r.name] = r.value;
    return out;
  }

  // Lecture publique (affichage live du site).
  app.get('/api/settings', async (_req, res) => {
    if (!dbConfigured()) return res.json({ settings: {} });
    try {
      res.json({ settings: await readSettings() });
    } catch (e) {
      console.error('GET /api/settings', e.message);
      res.json({ settings: {} });
    }
  });

  app.get('/api/admin/settings', requireAuth, async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      res.json({ settings: await readSettings() });
    } catch (e) {
      console.error('GET /api/admin/settings', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.put('/api/admin/settings', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const body = (req.body && req.body.settings) || req.body || {};
    try {
      for (const key of SETTING_KEYS) {
        if (!(key in body)) continue;
        const value = body[key] == null ? '' : String(body[key]);
        await query('INSERT INTO settings (name, value) VALUES (?, ?) ON DUPLICATE KEY UPDATE value = VALUES(value)', [key, value]);
      }
      res.json({ ok: true, settings: await readSettings() });
    } catch (e) {
      console.error('PUT /api/admin/settings', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  /* ----------------------- Réordonnancement ----------------------- */

  // Enregistre un nouvel ordre : sort_order = position dans le tableau `ids`.
  const registerReorder = (routePath, table) => {
    app.post(routePath, requireAuth, async (req, res) => {
      if (!dbConfigured()) return needDb(res);
      const ids = Array.isArray(req.body && req.body.ids) ? req.body.ids : [];
      if (!ids.length) return res.status(400).json({ ok: false, error: 'Liste d’identifiants requise.' });
      try {
        for (let i = 0; i < ids.length; i++) {
          const id = Number(ids[i]);
          if (Number.isInteger(id)) await query(`UPDATE ${table} SET sort_order = ? WHERE id = ?`, [i, id]);
        }
        res.json({ ok: true });
      } catch (e) {
        console.error(`POST ${routePath}`, e.message);
        res.status(500).json({ ok: false, error: 'Erreur base de données.' });
      }
    });
  };
  registerReorder('/api/admin/used-boats/reorder', 'used_boats');
  registerReorder('/api/admin/team/reorder', 'team_members');
  registerReorder('/api/admin/cities/reorder', 'hivernage_cities');

  /* ----------------------- Médiathèque (admin) -------------------- */

  // Liste : uploads (gérables, avec alt/légende) + images du site embarquées (lecture seule).
  app.get('/api/admin/media', requireAuth, (_req, res) => {
    try {
      const meta = readMediaMeta();
      const uploads = listImages(UPLOADS_DIR, '/uploads', meta).sort((a, b) => b.mtime - a.mtime);
      const site = listImages(SITE_IMAGES_DIR, '/images').sort((a, b) => a.name.localeCompare(b.name));
      res.json({ uploads, site });
    } catch (e) {
      console.error('GET /api/admin/media', e.message);
      res.status(500).json({ ok: false, error: 'Lecture de la médiathèque impossible.' });
    }
  });

  // Upload : images (déjà converties en WebP côté navigateur) OU fichiers PDF/vidéo bruts.
  app.post('/api/admin/media', requireAuth, async (req, res) => {
    const { filename, dataUrl } = req.body || {};
    if (!dataUrl || typeof dataUrl !== 'string') return res.status(400).json({ ok: false, error: 'Fichier manquant.' });
    const m = /^data:(image\/(?:webp|png|jpe?g|avif|gif)|application\/pdf|video\/(?:mp4|webm|quicktime));base64,(.+)$/i.exec(dataUrl);
    if (!m) return res.status(400).json({ ok: false, error: 'Format non supporté (image, PDF ou vidéo mp4/webm).' });
    const mime = m[1].toLowerCase();
    const extMap = { 'image/jpeg': 'jpg', 'image/jpg': 'jpg', 'application/pdf': 'pdf', 'video/quicktime': 'mov' };
    const ext = extMap[mime] || mime.split('/')[1];
    const buf = Buffer.from(m[2], 'base64');
    if (!buf.length) return res.status(400).json({ ok: false, error: 'Fichier vide.' });
    if (buf.length > 30 * 1024 * 1024) return res.status(413).json({ ok: false, error: 'Fichier trop volumineux (max 30 Mo).' });
    const base =
      String(filename || 'fichier')
        .toLowerCase()
        .replace(/\.[a-z0-9]+$/i, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
        .slice(0, 60) || 'fichier';
    const name = `${base}-${Date.now().toString(36)}.${ext}`;
    try {
      if (!existsSync(UPLOADS_DIR)) mkdirSync(UPLOADS_DIR, { recursive: true });
      await fsp.writeFile(path.join(UPLOADS_DIR, name), buf);
      res.json({ ok: true, name, url: `/uploads/${name}`, size: buf.length, type: mediaType(name) });
    } catch (e) {
      console.error('POST /api/admin/media', e.message);
      res.status(500).json({ ok: false, error: "Échec de l'enregistrement du fichier." });
    }
  });

  // Métadonnées (texte alternatif + légende) d'un média uploadé.
  app.put('/api/admin/media/meta', requireAuth, async (req, res) => {
    const { name, alt, caption } = req.body || {};
    const key = path.basename(String(name || ''));
    if (!key || !existsSync(path.join(UPLOADS_DIR, key))) return res.status(404).json({ ok: false, error: 'Média introuvable.' });
    try {
      const meta = readMediaMeta();
      meta[key] = { alt: String(alt || '').slice(0, 300), caption: String(caption || '').slice(0, 500) };
      await writeMediaMeta(meta);
      res.json({ ok: true });
    } catch (e) {
      console.error('PUT /api/admin/media/meta', e.message);
      res.status(500).json({ ok: false, error: 'Enregistrement impossible.' });
    }
  });

  // Suppression : uniquement dans le dossier uploads (les images du site sont protégées).
  app.delete('/api/admin/media/:name', requireAuth, async (req, res) => {
    const name = path.basename(String(req.params.name || '')); // anti-traversal
    const fp = path.join(UPLOADS_DIR, name);
    if (!fp.startsWith(UPLOADS_DIR) || !existsSync(fp)) return res.status(404).json({ ok: false, error: 'Introuvable.' });
    try {
      await fsp.unlink(fp);
      const meta = readMediaMeta();
      if (meta[name]) {
        delete meta[name];
        await writeMediaMeta(meta);
      }
      res.json({ ok: true });
    } catch (e) {
      console.error('DELETE /api/admin/media', e.message);
      res.status(500).json({ ok: false, error: 'Suppression impossible.' });
    }
  });

  /* ----------------------- Messages (admin) ----------------------- */

  app.get('/api/admin/messages', requireAuth, async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query('SELECT * FROM contact_submissions ORDER BY created_at DESC, id DESC');
      res.json({ messages: rows });
    } catch (e) {
      console.error('GET /api/admin/messages', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.patch('/api/admin/messages/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    const isRead = req.body && req.body.read ? 1 : 0;
    try {
      const r = await query('UPDATE contact_submissions SET is_read = ? WHERE id = ?', [isRead, id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      console.error('PATCH /api/admin/messages', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.delete('/api/admin/messages/:id', requireAuth, async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    const id = Number(req.params.id);
    if (!Number.isInteger(id)) return res.status(400).json({ ok: false, error: 'ID invalide.' });
    try {
      const r = await query('DELETE FROM contact_submissions WHERE id = ?', [id]);
      if (!r.affectedRows) return res.status(404).json({ ok: false, error: 'Introuvable.' });
      res.json({ ok: true });
    } catch (e) {
      console.error('DELETE /api/admin/messages', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });
}

/** Insère une soumission de formulaire en base. Renvoie {stored:true} ou lève. */
export async function saveSubmissionDb(record) {
  if (!dbConfigured()) return { stored: false, reason: 'no-db' };
  await query(
    'INSERT INTO contact_submissions (nom, email, tel, subject, message, source_page) VALUES (?, ?, ?, ?, ?, ?)',
    [
      record.nom || '',
      record.email || '',
      record.tel || null,
      record.subject || null,
      record.message || null,
      record.source_page || null,
    ],
  );
  return { stored: true };
}
