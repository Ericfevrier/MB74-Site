/**
 * Client CMS Directus — réutilisable côté build (Node) et runtime (navigateur).
 * Ne lit PAS l'environnement directement : le caller fournit l'URL/token
 * (build → process.env.CMS_URL ; navigateur → import.meta.env.VITE_CMS_URL).
 */
import type { UsedBoat } from '../data/usedBoats';

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

/** Récupère les occasions publiées depuis le CMS, mappées. */
export async function fetchUsedBoats(cfg: CmsConfig): Promise<UsedBoat[]> {
  const rows = await cmsFetch<Record<string, any>[]>(
    cfg,
    "/items/used_boats?limit=-1&filter[status][_eq]=published&fields=slug,model_slug,brand,title,year,capacity,power,hours,length,location,price,price_value,image,gallery,description,highlights,sold",
  );
  return rows.map(mapUsedBoat);
}
