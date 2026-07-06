/**
 * Client de l'API admin (même origine). Cookie de session envoyé automatiquement.
 */
import type { UsedBoat } from '../data/usedBoats';
import type { BlogArticle } from '../data/blog';
import type { TeamMember } from '../data/team';
import type { HivernageCity } from '../data/hivernageCities';
import type { NautiqueModel } from '../data/nautiqueModels';
import type { BrandData } from '../data/brands';
import type { Seo } from './seo';

export interface AdminBoat extends UsedBoat {
  id: number;
  status: 'published' | 'draft';
  sortOrder: number;
  seo?: Seo;
  /** Planification (format datetime-local "YYYY-MM-DDTHH:MM"). */
  publishAt?: string;
  unpublishAt?: string;
}

export interface AdminArticle extends BlogArticle {
  id: number;
  status: 'published' | 'draft';
  content: string;
  seo?: Seo;
  publishAt?: string;
  unpublishAt?: string;
}

export interface AdminMember extends TeamMember {
  id: number;
  status: 'published' | 'draft';
  sortOrder: number;
}

export interface AdminCity extends HivernageCity {
  id: number;
  status: 'published' | 'draft';
  sortOrder: number;
}

export interface AdminModel extends NautiqueModel {
  id: number;
  brand: string;
  status: 'published' | 'draft';
  sortOrder: number;
}

/** Marque complète éditable (page marque entière). */
export interface AdminBrand extends BrandData {
  brand_id: string;
}

export interface MediaFile {
  name: string;
  url: string;
  size: number;
  mtime: number;
  type?: 'image' | 'pdf' | 'video' | 'file';
  alt?: string;
  caption?: string;
}

export interface AdminUser {
  id: number;
  username: string;
  role: 'admin' | 'super-admin';
  created_at: string;
}

export interface ActivityEntry {
  id: number;
  username: string;
  action: string;
  entity: string;
  entity_id: string | null;
  detail: string | null;
  created_at: string;
}

export interface ContactMessage {
  id: number;
  nom: string;
  email: string;
  tel: string | null;
  subject: string | null;
  message: string | null;
  source_page: string | null;
  is_read: 0 | 1;
  created_at: string;
}

// Jeton CSRF courant (fourni par /login et /me), renvoyé dans l'en-tête des mutations.
let CSRF = '';
export function setCsrf(t?: string) {
  CSRF = t || '';
}

async function req<T = any>(method: string, url: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = {};
  if (body !== undefined) headers['Content-Type'] = 'application/json';
  if (method !== 'GET' && method !== 'HEAD' && CSRF) headers['X-CSRF-Token'] = CSRF;
  const res = await fetch(url, {
    method,
    headers: Object.keys(headers).length ? headers : undefined,
    body: body !== undefined ? JSON.stringify(body) : undefined,
    credentials: 'same-origin',
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const err = new Error((data && data.error) || `Erreur ${res.status}`);
    (err as any).status = res.status;
    throw err;
  }
  return data as T;
}

export const adminApi = {
  me: () =>
    req<{ ok: boolean; username?: string; role?: string; csrf?: string }>('GET', '/api/admin/me').then((r) => {
      setCsrf(r.csrf);
      return r;
    }),
  login: (username: string, password: string) =>
    req<{ ok: boolean; username: string; role?: string; csrf?: string }>('POST', '/api/admin/login', { username, password }).then((r) => {
      setCsrf(r.csrf);
      return r;
    }),
  logout: () => req('POST', '/api/admin/logout').then((r) => { setCsrf(''); return r; }),

  listUsers: () => req<{ users: AdminUser[]; superAdmin: string | null }>('GET', '/api/admin/users'),
  createUser: (username: string, password: string, role: string) => req('POST', '/api/admin/users', { username, password, role }),
  deleteUser: (id: number) => req('DELETE', `/api/admin/users/${id}`),

  listActivity: () => req<{ activity: ActivityEntry[] }>('GET', '/api/admin/activity'),

  listBoats: () => req<{ boats: AdminBoat[] }>('GET', '/api/admin/used-boats'),
  createBoat: (b: Partial<AdminBoat>) => req<{ ok: boolean; id: number }>('POST', '/api/admin/used-boats', b),
  updateBoat: (id: number, b: Partial<AdminBoat>) => req('PUT', `/api/admin/used-boats/${id}`, b),
  deleteBoat: (id: number) => req('DELETE', `/api/admin/used-boats/${id}`),
  importBoats: (boats: Partial<AdminBoat>[]) =>
    req<{ ok: boolean; imported: number }>('POST', '/api/admin/used-boats/import', { boats }),
  reorderBoats: (ids: number[]) => req('POST', '/api/admin/used-boats/reorder', { ids }),
  reorderTeam: (ids: number[]) => req('POST', '/api/admin/team/reorder', { ids }),
  reorderCities: (ids: number[]) => req('POST', '/api/admin/cities/reorder', { ids }),

  listArticles: () => req<{ articles: AdminArticle[] }>('GET', '/api/admin/blog'),
  createArticle: (a: Partial<AdminArticle>) => req<{ ok: boolean; id: number }>('POST', '/api/admin/blog', a),
  updateArticle: (id: number, a: Partial<AdminArticle>) => req('PUT', `/api/admin/blog/${id}`, a),
  deleteArticle: (id: number) => req('DELETE', `/api/admin/blog/${id}`),

  listTeam: () => req<{ members: AdminMember[] }>('GET', '/api/admin/team'),
  createMember: (m: Partial<AdminMember>) => req<{ ok: boolean; id: number }>('POST', '/api/admin/team', m),
  updateMember: (id: number, m: Partial<AdminMember>) => req('PUT', `/api/admin/team/${id}`, m),
  deleteMember: (id: number) => req('DELETE', `/api/admin/team/${id}`),

  listCities: () => req<{ cities: AdminCity[] }>('GET', '/api/admin/cities'),
  createCity: (c: Partial<AdminCity>) => req<{ ok: boolean; id: number }>('POST', '/api/admin/cities', c),
  updateCity: (id: number, c: Partial<AdminCity>) => req('PUT', `/api/admin/cities/${id}`, c),
  deleteCity: (id: number) => req('DELETE', `/api/admin/cities/${id}`),

  listModels: () => req<{ models: AdminModel[] }>('GET', '/api/admin/models'),
  createModel: (m: Partial<AdminModel>) => req<{ ok: boolean; id: number }>('POST', '/api/admin/models', m),
  updateModel: (id: number, m: Partial<AdminModel>) => req('PUT', `/api/admin/models/${id}`, m),
  deleteModel: (id: number) => req('DELETE', `/api/admin/models/${id}`),
  importModels: (models: Partial<AdminModel>[]) =>
    req<{ ok: boolean; imported: number }>('POST', '/api/admin/models/import', { models }),

  listBrands: () => req<{ brands: AdminBrand[] }>('GET', '/api/admin/brands'),
  saveBrand: (brandId: string, b: Partial<AdminBrand>) => req('PUT', `/api/admin/brands/${brandId}`, b),
  createBrand: (b: Partial<AdminBrand>) => req<{ ok: boolean; brand_id: string }>('POST', '/api/admin/brands', b),
  deleteBrand: (brandId: string) => req('DELETE', `/api/admin/brands/${brandId}`),

  getSettings: () => req<{ settings: Record<string, string> }>('GET', '/api/admin/settings'),
  saveSettings: (settings: Record<string, string>) =>
    req<{ ok: boolean; settings: Record<string, string> }>('PUT', '/api/admin/settings', { settings }),

  listMedia: () => req<{ uploads: MediaFile[]; site: MediaFile[] }>('GET', '/api/admin/media'),
  uploadMedia: (filename: string, dataUrl: string) =>
    req<{ ok: boolean; name: string; url: string; size: number }>('POST', '/api/admin/media', { filename, dataUrl }),
  setMediaMeta: (name: string, alt: string, caption: string) =>
    req('PUT', '/api/admin/media/meta', { name, alt, caption }),
  deleteMedia: (name: string) => req('DELETE', `/api/admin/media/${encodeURIComponent(name)}`),

  listMessages: () => req<{ messages: ContactMessage[] }>('GET', '/api/admin/messages'),
  markMessage: (id: number, read: boolean) => req('PATCH', `/api/admin/messages/${id}`, { read }),
  deleteMessage: (id: number) => req('DELETE', `/api/admin/messages/${id}`),
};
