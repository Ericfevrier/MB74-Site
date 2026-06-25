/**
 * Crée les collections Directus du site MB74 (idempotent : ignore l'existant).
 * Usage : DIRECTUS_URL=... ADMIN_EMAIL=... ADMIN_PASSWORD=... node bootstrap-schema.mjs
 * Défauts = instance locale docker-compose.
 *
 * Phase 1 : champs simples (URLs d'images en string, galeries/specs en json,
 * marque en string id) — on enrichira (fichiers, relations M2O) en Phase 2.
 */
const URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const EMAIL = process.env.ADMIN_EMAIL || 'admin@motorboat74.com';
const PASSWORD = process.env.ADMIN_PASSWORD || 'sMIiYvYVW7n0';

const login = async () => {
  const r = await fetch(`${URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: EMAIL, password: PASSWORD }),
  });
  if (!r.ok) throw new Error(`login ${r.status} ${await r.text()}`);
  return (await r.json()).data.access_token;
};

let TOKEN;
const api = async (path, method = 'GET', body) => {
  const r = await fetch(`${URL}${path}`, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const t = await r.text();
  if (!r.ok) throw new Error(`${method} ${path} -> ${r.status} ${t}`);
  return t ? JSON.parse(t) : {};
};

// --- helpers champs ---
const pk = () => ({ field: 'id', type: 'integer', meta: { hidden: true, readonly: true }, schema: { is_primary_key: true, has_auto_increment: true } });
const f = (field, type, meta = {}, schema = {}) => ({ field, type, meta, schema });
const str = (field, opts = {}) => f(field, 'string', { interface: 'input', ...opts.meta }, { is_unique: !!opts.unique, ...opts.schema });
const text = (field) => f(field, 'text', { interface: 'input-multiline' });
const int = (field) => f(field, 'integer', { interface: 'input' });
const float = (field) => f(field, 'float', { interface: 'input' });
const bool = (field, def = false) => f(field, 'boolean', { interface: 'boolean' }, { default_value: def });
const json = (field) => f(field, 'json', { interface: 'input-code', options: { language: 'json' } });
const date = (field) => f(field, 'date', { interface: 'datetime' });
const status = () => f('status', 'string', { interface: 'select-dropdown', options: { choices: [{ text: 'Brouillon', value: 'draft' }, { text: 'Publié', value: 'published' }] } }, { default_value: 'draft' });

// Groupe SEO réutilisé sur les collections indexables
const seo = () => [
  str('seo_title'),
  text('seo_description'),
  str('seo_canonical'),
  bool('seo_noindex', false),
  str('og_image'),
];

// --- définitions des collections ---
const collections = [
  {
    collection: 'settings', meta: { icon: 'settings', singleton: true, note: 'Réglages globaux (NAP, réseaux, geo, OG)' },
    fields: [pk(), str('site_name'), str('url'), str('phone_display'), str('phone_href'), str('email'),
      str('address_street'), str('address_locality'), str('address_postal'), str('address_region'), str('address_country'),
      float('geo_lat'), float('geo_lng'),
      str('social_instagram'), str('social_facebook'), str('social_youtube'), str('social_linkedin'),
      str('og_default_image'), text('analytics_head')],
  },
  {
    collection: 'brands', meta: { icon: 'sailing', note: 'Marques (Nautique, MasterCraft…)' },
    fields: [pk(), str('brand_id', { unique: true }), str('name'), str('role'), str('logo'), str('hero_image'),
      str('tagline'), text('description'), bool('hero_wordmark', false), int('sort')],
  },
  {
    collection: 'boat_models', meta: { icon: 'directions_boat', note: 'Modèles neufs' },
    fields: [pk(), str('brand'), str('slug'), str('name'), str('short'), str('gamme'), str('year'),
      text('tagline'), json('intro'), json('gallery'), json('specs'), json('highlights'), json('faqs'), int('sort'),
      ...seo(), status()],
  },
  {
    collection: 'used_boats', meta: { icon: 'sell', note: "Occasions + vendus (sold=true => page vendus)" },
    fields: [pk(), str('slug', { unique: true }), str('brand'), str('model_slug'), str('title'), str('year'),
      str('price'), int('price_value'), str('capacity'), str('power'), str('hours'), str('length'), str('location'),
      text('description'), json('highlights'), str('image'), json('gallery'), bool('sold', false), ...seo(), status()],
  },
  {
    collection: 'hivernage_cities', meta: { icon: 'place', note: 'Pages locales hivernage par ville' },
    fields: [pk(), str('slug', { unique: true }), str('city'), str('lake'), str('h1'), text('intro'),
      text('zones_intro'), json('ports'), json('local_expertise'), json('zones'), ...seo(), status()],
  },
  {
    collection: 'blog_categories', meta: { icon: 'label', note: 'Catégories de blog' },
    fields: [pk(), str('slug', { unique: true }), str('name')],
  },
  {
    collection: 'blog_articles', meta: { icon: 'article', note: 'Articles de blog' },
    fields: [pk(), str('slug', { unique: true }), str('path'), str('title'), text('excerpt'), str('category'),
      date('date'), str('image'), str('reading_time'), text('body'), ...seo(), status()],
  },
  {
    collection: 'services', meta: { icon: 'build', note: 'Services (hivernage, entretien…)' },
    fields: [pk(), str('slug', { unique: true }), str('title'), text('desc'), str('image'), int('sort'), ...seo(), status()],
  },
  {
    collection: 'pages', meta: { icon: 'web', note: 'Pages éditoriales' },
    fields: [pk(), str('slug', { unique: true }), str('title'), json('sections'), ...seo(), status()],
  },
  {
    collection: 'contact_submissions', meta: { icon: 'mail', note: 'Soumissions de formulaires (lecture)' },
    fields: [pk(), str('nom'), str('email'), str('tel'), str('subject'), text('message'), str('source_page'),
      f('status', 'string', { interface: 'select-dropdown', options: { choices: [{ text: 'Nouveau', value: 'nouveau' }, { text: 'Traité', value: 'traite' }] } }, { default_value: 'nouveau' }),
      f('date_created', 'timestamp', { interface: 'datetime', readonly: true, special: ['date-created'] })],
  },
];

const run = async () => {
  TOKEN = await login();
  const existing = (await api('/collections')).data.map((c) => c.collection);
  for (const def of collections) {
    if (existing.includes(def.collection)) { console.log(`= ${def.collection} (déjà présent, ignoré)`); continue; }
    await api('/collections', 'POST', def);
    console.log(`+ ${def.collection} créée (${def.fields.length} champs)`);
  }
  console.log('\nSchéma prêt. Admin : ' + URL);
};
run().catch((e) => { console.error('ERREUR:', e.message); process.exit(1); });
