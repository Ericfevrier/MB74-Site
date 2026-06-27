/**
 * Client CMS Directus — réutilisable côté build (Node) et runtime (navigateur).
 * Ne lit PAS l'environnement directement : le caller fournit l'URL/token
 * (build → process.env.CMS_URL ; navigateur → import.meta.env.VITE_CMS_URL).
 */
import type { UsedBoat } from '../data/usedBoats';
import type { BlogArticle, BlogCategory } from '../data/blog';
import type { HivernageCity } from './../data/hivernageCities';

export interface CmsConfig {
  url: string;
  token?: string;
}

export async function cmsFetch<T = unknown>(cfg: CmsConfig, path: string): Promise<T> {
  const res = await fetch(`${cfg.url}${path}`, {
    headers: cfg.token ? { Authorization: `Bearer ${cfg.token}` } : {},
  });
  if (!res.ok) throw new Error(`CMS ${path} -> ${res.status}`);
  const json = await res.json();
  return json.data as T;
}

/** Authentifie un compte admin et renvoie un access_token (usage build/scripts). */
export async function cmsLogin(url: string, email: string, password: string): Promise<string> {
  const res = await fetch(`${url}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) throw new Error(`CMS login -> ${res.status}`);
  return (await res.json()).data.access_token as string;
}

/** Directus record `used_boats` -> forme `UsedBoat` du site. */
export function mapUsedBoat(r: Record<string, any>): UsedBoat {
  const arr = (v: unknown): string[] | undefined => (Array.isArray(v) && v.length ? (v as string[]) : undefined);
  return {
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
    gallery: arr(r.gallery),
    description: r.description || undefined,
    highlights: arr(r.highlights),
    sold: !!r.sold,
  };
}

/**
 * Config CMS côté SERVEUR (loaders), avec token mis en cache.
 * Prod : CMS_TOKEN (token lecture seule). Dev : login admin (cache ~10 min).
 * Renvoie null si CMS_URL absent → le loader retombe sur les données statiques.
 */
let _cache: { token?: string; at: number } | null = null;
export async function serverCms(): Promise<CmsConfig | null> {
  const url = process.env.CMS_URL;
  if (!url) return null;
  if (process.env.CMS_TOKEN) return { url, token: process.env.CMS_TOKEN };
  if (process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    if (!_cache || Date.now() - _cache.at > 10 * 60 * 1000) {
      _cache = { token: await cmsLogin(url, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD), at: Date.now() };
    }
    return { url, token: _cache.token };
  }
  return { url };
}

/** Récupère les occasions publiées depuis le CMS, mappées. */
export async function fetchUsedBoats(cfg: CmsConfig): Promise<UsedBoat[]> {
  const rows = await cmsFetch<Record<string, any>[]>(
    cfg,
    "/items/used_boats?limit=-1&filter[status][_eq]=published&fields=slug,model_slug,brand,title,year,capacity,power,hours,length,location,price,price_value,image,gallery,description,highlights,sold",
  );
  return rows.map(mapUsedBoat);
}

// ---------- Blog ----------
export function mapBlogArticle(r: Record<string, any>): BlogArticle {
  return { slug: r.slug, path: r.path, title: r.title, excerpt: r.excerpt, category: r.category,
    date: r.date, image: r.image, readingTime: r.reading_time || undefined };
}
export function mapBlogCategory(r: Record<string, any>): BlogCategory {
  return { slug: r.slug, name: r.name };
}
export async function fetchBlogArticles(cfg: CmsConfig): Promise<BlogArticle[]> {
  const rows = await cmsFetch<Record<string, any>[]>(cfg,
    "/items/blog_articles?limit=-1&filter[status][_eq]=published&sort=-date&fields=slug,path,title,excerpt,category,date,image,reading_time");
  return rows.map(mapBlogArticle);
}
export async function fetchBlogCategories(cfg: CmsConfig): Promise<BlogCategory[]> {
  const rows = await cmsFetch<Record<string, any>[]>(cfg, "/items/blog_categories?limit=-1&fields=slug,name");
  return rows.map(mapBlogCategory);
}

// ---------- Settings (NAP / SEO globaux) ----------
export function mapSettings(r: Record<string, any>) {
  return {
    name: r.site_name, url: r.url, phoneDisplay: r.phone_display, phoneHref: r.phone_href,
    email: r.email, emailHref: `mailto:${r.email}`,
    addressStreet: r.address_street, addressLocality: r.address_locality, addressPostal: r.address_postal,
    addressRegion: r.address_region, addressCountry: r.address_country,
    geo: { lat: r.geo_lat, lng: r.geo_lng },
  };
}
export async function fetchSettings(cfg: CmsConfig) {
  const r = await cmsFetch<Record<string, any>>(cfg, "/items/settings");
  return mapSettings(r);
}

// ---------- Marques (champs éditoriaux uniquement — le code garde le structurel) ----------
export interface BrandEditorial {
  brand_id: string; name: string; full_name: string; role: string; logo: string;
  hero_image: string; tagline: string; description: string; hero_wordmark: boolean;
}
export async function fetchBrands(cfg: CmsConfig): Promise<BrandEditorial[]> {
  return cmsFetch<BrandEditorial[]>(cfg,
    "/items/brands?limit=-1&fields=brand_id,name,full_name,role,logo,hero_image,tagline,description,hero_wordmark");
}

// ---------- Pages villes (override complet -> HivernageCity) ----------
export function mapCity(r: Record<string, any>): HivernageCity {
  return {
    slug: r.slug, city: r.city, lake: r.lake, h1: r.h1, hero: r.hero,
    metaTitle: r.seo_title, metaDescription: r.seo_description,
    intro: r.intro, zonesIntro: r.zones_intro,
    ports: r.ports || [], localExpertise: r.local_expertise || undefined,
  };
}
export async function fetchCities(cfg: CmsConfig): Promise<HivernageCity[]> {
  const rows = await cmsFetch<Record<string, any>[]>(cfg,
    "/items/hivernage_cities?limit=-1&filter[status][_eq]=published&fields=slug,city,lake,h1,hero,intro,zones_intro,ports,local_expertise,seo_title,seo_description");
  return rows.map(mapCity);
}

// ---------- Modèles (sous-ensemble éditorial ; le code garde specs profondes/hero/etc.) ----------
export interface ModelEditorial {
  brand: string; slug: string; name: string; short: string; tagline: string;
  intro: unknown; gallery: unknown; specs: unknown; highlights: unknown; faqs: unknown;
  seo_title: string; seo_description: string;
}
export async function fetchModels(cfg: CmsConfig): Promise<ModelEditorial[]> {
  return cmsFetch<ModelEditorial[]>(cfg,
    "/items/boat_models?limit=-1&filter[status][_eq]=published&fields=brand,slug,name,short,tagline,intro,gallery,specs,highlights,faqs,seo_title,seo_description");
}
