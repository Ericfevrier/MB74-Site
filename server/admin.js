/**
 * API admin Motor Boat 74 : authentification + CRUD occasions + messages de contact.
 * Montée sur l'app Express existante via `mountAdmin(app)`.
 *
 * - Lecture publique : GET /api/used-boats (consommée par les clientLoader du site).
 * - Admin (cookie de session requis) : /api/admin/*.
 * Sans base configurée, les écritures renvoient 503 ; la lecture publique renvoie 503
 * aussi → les loaders du site retombent alors sur les données statiques.
 */
import { query, dbConfigured } from './db.js';
import {
  COOKIE_NAME,
  COOKIE_TTL_MS,
  createToken,
  checkCredentials,
  requireAuth,
  currentAdmin,
  authConfigured,
} from './auth.js';

const BOAT_FIELDS = [
  'slug', 'model_slug', 'brand', 'title', 'year', 'capacity', 'power', 'hours',
  'length', 'location', 'price', 'price_value', 'image', 'gallery', 'description',
  'highlights', 'sold', 'status', 'sort_order',
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
  };
  if (admin) {
    boat.id = r.id;
    boat.status = r.status;
    boat.sortOrder = r.sort_order;
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
  };
}

const ISO_DATE = (v) => {
  if (!v) return '';
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  return String(v).slice(0, 10);
};

const BLOG_FIELDS = ['slug', 'title', 'excerpt', 'category', 'date', 'image', 'reading_time', 'content', 'status'];

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
  };
  if (opts.full || opts.admin) a.content = r.content || '';
  if (opts.admin) {
    a.id = r.id;
    a.status = r.status;
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
  };
}

const needDb = (res) =>
  res.status(503).json({ ok: false, error: 'Base de données non configurée.' });

export function mountAdmin(app) {
  /* ----------------------------- Auth ----------------------------- */

  app.post('/api/admin/login', async (req, res) => {
    if (!authConfigured()) {
      return res.status(503).json({ ok: false, error: 'Compte admin non configuré (ADMIN_USERNAME / ADMIN_PASSWORD_HASH).' });
    }
    const { username, password } = req.body || {};
    const ok = await checkCredentials(username, password);
    if (!ok) return res.status(401).json({ ok: false, error: 'Identifiants invalides.' });
    res.cookie(COOKIE_NAME, createToken(username), {
      httpOnly: true,
      sameSite: 'lax',
      secure: req.secure,
      path: '/',
      maxAge: COOKIE_TTL_MS,
    });
    res.json({ ok: true, username });
  });

  app.post('/api/admin/logout', (req, res) => {
    res.clearCookie(COOKIE_NAME, { path: '/' });
    res.json({ ok: true });
  });

  app.get('/api/admin/me', (req, res) => {
    const user = currentAdmin(req);
    if (!user) return res.status(401).json({ ok: false });
    res.json({ ok: true, username: user });
  });

  /* ----------------------- Occasions (public) --------------------- */

  // Lecture live pour les pages publiques (clientLoader). Repli statique côté site si 503/erreur.
  app.get('/api/used-boats', async (_req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query(
        "SELECT * FROM used_boats WHERE status = 'published' ORDER BY sold ASC, sort_order ASC, id DESC",
      );
      res.json({ boats: rows.map((r) => rowToBoat(r)) });
    } catch (e) {
      console.error('GET /api/used-boats', e.message);
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
    try {
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
      const rows = await query("SELECT * FROM blog_articles WHERE status = 'published' ORDER BY date DESC, id DESC");
      res.json({ articles: rows.map((r) => rowToArticle(r)) });
    } catch (e) {
      console.error('GET /api/blog', e.message);
      res.status(500).json({ ok: false, error: 'Erreur base de données.' });
    }
  });

  app.get('/api/blog/:slug', async (req, res) => {
    if (!dbConfigured()) return needDb(res);
    try {
      const rows = await query("SELECT * FROM blog_articles WHERE slug = ? AND status = 'published' LIMIT 1", [req.params.slug]);
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
    try {
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
