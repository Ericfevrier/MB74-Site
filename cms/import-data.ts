/**
 * Importe le contenu actuel (src/data/*.ts) dans Directus.
 * Usage : node --import tsx cms/import-data.ts   (ou: npx tsx cms/import-data.ts)
 * Variables : DIRECTUS_URL, ADMIN_EMAIL, ADMIN_PASSWORD (défauts = local).
 * Idempotent : vide chaque collection puis réinsère (migration rejouable).
 */
import { SITE } from '../src/data/site';
import { brandsData } from '../src/data/brands';
import { BRAND_MODELS } from '../src/data/boatBrands';
import { usedBoats } from '../src/data/usedBoats';
import { hivernageCities, HIVERNAGE_CITY_ORDER } from '../src/data/hivernageCities';
import { HIVERNAGE_ZONES } from '../src/data/hivernageZones';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from '../src/data/blog';

const URL = process.env.DIRECTUS_URL || 'http://localhost:8055';
const EMAIL = process.env.ADMIN_EMAIL || 'admin@motorboat74.com';
const PASSWORD = process.env.ADMIN_PASSWORD; // jamais en dur — charger cms/.env
if (!PASSWORD) { console.error('ADMIN_PASSWORD manquant. Lancer avec les variables de cms/.env (voir cms/README.md).'); process.exit(1); }

let TOKEN = '';
const api = async (path: string, method = 'GET', body?: unknown) => {
  const r = await fetch(`${URL}${path}`, {
    method,
    headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  const t = await r.text();
  if (!r.ok) throw new Error(`${method} ${path} -> ${r.status} ${t}`);
  return t ? JSON.parse(t) : {};
};

const clear = async (col: string) => {
  const res = await api(`/items/${col}?limit=-1&fields=id`);
  const ids = (res.data || []).map((x: any) => x.id);
  if (ids.length) await api(`/items/${col}`, 'DELETE', ids);
};

const insert = async (col: string, rows: any[]) => {
  for (let i = 0; i < rows.length; i += 50) {
    await api(`/items/${col}`, 'POST', rows.slice(i, i + 50));
  }
  console.log(`  ${col}: ${rows.length} éléments importés`);
};

const run = async () => {
  TOKEN = (await api('/auth/login', 'POST', { email: EMAIL, password: PASSWORD })).data.access_token;

  // settings (singleton)
  await api('/items/settings', 'PATCH', {
    site_name: SITE.name, url: SITE.url, phone_display: SITE.phoneDisplay, phone_href: SITE.phoneHref,
    email: SITE.email, address_street: SITE.addressStreet, address_locality: SITE.addressLocality,
    address_postal: SITE.addressPostal, address_region: SITE.addressRegion, address_country: SITE.addressCountry,
    geo_lat: SITE.geo.lat, geo_lng: SITE.geo.lng,
    social_instagram: 'https://www.instagram.com/motorboat_74/',
    social_facebook: 'https://www.facebook.com/motorboat74/',
    social_youtube: 'https://www.youtube.com/@MotorBoat74',
    social_linkedin: 'https://www.linkedin.com/company/motor-boat-74/',
    og_default_image: `${SITE.url}/images/2026-p25-ext-16.jpg`,
  });
  console.log('  settings: mis à jour');

  // brands
  await clear('brands');
  await insert('brands', ['nautique', 'mastercraft'].map((id, i) => {
    const b: any = brandsData[id];
    return { brand_id: id, name: b.name, full_name: b.fullName || b.name, role: b.role || '', logo: b.logo,
      hero_image: b.heroImage, tagline: b.tagline, description: b.description, hero_wordmark: !!b.heroWordmark, sort: i + 1 };
  }));

  // boat_models
  await clear('boat_models');
  const models: any[] = [];
  for (const brandId of ['nautique', 'mastercraft']) {
    const brand = BRAND_MODELS[brandId];
    if (!brand) continue;
    brand.order.forEach((slug, i) => {
      const m: any = brand.models[slug];
      if (!m) return;
      models.push({ brand: brandId, slug, name: m.name, short: m.short, gamme: m.gamme || '',
        year: String(m.year ?? ''), tagline: m.tagline || '', intro: m.intro || [], gallery: m.gallery || [],
        specs: m.specs || [], highlights: m.highlights || [], faqs: m.faqs || [], sort: i + 1,
        seo_title: m.metaTitle || '', seo_description: m.metaDescription || '', status: 'published' });
    });
  }
  await insert('boat_models', models);

  // used_boats
  await clear('used_boats');
  await insert('used_boats', usedBoats.map((b) => ({
    slug: b.slug, brand: b.brandId, model_slug: b.modelSlug, title: b.title, year: b.year, price: b.price,
    price_value: b.priceValue ?? null, capacity: b.capacity || '', power: b.power || '', hours: b.hours || '',
    length: b.length || '', location: b.location || '', description: b.description || '',
    highlights: b.highlights || [], image: b.image, gallery: b.gallery || [b.image], sold: !!b.sold,
    seo_noindex: !!b.sold, status: 'published',
  })));

  // hivernage_cities
  await clear('hivernage_cities');
  await insert('hivernage_cities', HIVERNAGE_CITY_ORDER.map((slug) => {
    const c: any = hivernageCities[slug];
    return { slug, city: c.city, lake: c.lake, h1: c.h1, hero: c.hero || '', intro: c.intro, zones_intro: c.zonesIntro,
      ports: c.ports || [], local_expertise: c.localExpertise || null, zones: HIVERNAGE_ZONES[slug] || [],
      seo_title: c.metaTitle || '', seo_description: c.metaDescription || '', status: 'published' };
  }));

  // blog
  await clear('blog_categories');
  await insert('blog_categories', BLOG_CATEGORIES.map((c) => ({ slug: c.slug, name: c.name })));
  await clear('blog_articles');
  await insert('blog_articles', BLOG_ARTICLES.map((a) => ({
    slug: a.slug, path: a.path, title: a.title, excerpt: a.excerpt, category: a.category, date: a.date,
    image: a.image, reading_time: a.readingTime || '', status: 'published',
  })));

  // services
  await clear('services');
  await insert('services', [
    { slug: 'hivernage-stockage-bateau', title: 'Hivernage / Stockage' },
    { slug: 'entretien-reparation', title: 'Entretien / Réparation' },
    { slug: 'depannage', title: 'Dépannage' },
    { slug: 'transport', title: 'Transport' },
    { slug: 'sellerie', title: 'Sellerie' },
    { slug: 'remorques', title: 'Remorques' },
  ].map((s, i) => ({ ...s, sort: i + 1, status: 'published' })));

  console.log('\nImport terminé.');
};
run().catch((e) => { console.error('ERREUR:', e.message); process.exit(1); });
