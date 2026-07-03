/**
 * Client de l'API admin (même origine). Cookie de session envoyé automatiquement.
 */
import type { UsedBoat } from '../data/usedBoats';
import type { BlogArticle } from '../data/blog';
import type { TeamMember } from '../data/team';
import type { HivernageCity } from '../data/hivernageCities';
import type { NautiqueModel } from '../data/nautiqueModels';

export interface AdminBoat extends UsedBoat {
  id: number;
  status: 'published' | 'draft';
  sortOrder: number;
}

export interface AdminArticle extends BlogArticle {
  id: number;
  status: 'published' | 'draft';
  content: string;
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

export interface BrandEditorial {
  brand_id: string;
  name: string;
  full_name: string;
  role: string;
  logo: string;
  hero_image: string;
  tagline: string;
  description: string;
  hero_wordmark: boolean;
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

async function req<T = any>(method: string, url: string, body?: unknown): Promise<T> {
  const res = await fetch(url, {
    method,
    headers: body !== undefined ? { 'Content-Type': 'application/json' } : undefined,
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
  me: () => req<{ ok: boolean; username?: string }>('GET', '/api/admin/me'),
  login: (username: string, password: string) =>
    req<{ ok: boolean; username: string }>('POST', '/api/admin/login', { username, password }),
  logout: () => req('POST', '/api/admin/logout'),

  listBoats: () => req<{ boats: AdminBoat[] }>('GET', '/api/admin/used-boats'),
  createBoat: (b: Partial<AdminBoat>) => req<{ ok: boolean; id: number }>('POST', '/api/admin/used-boats', b),
  updateBoat: (id: number, b: Partial<AdminBoat>) => req('PUT', `/api/admin/used-boats/${id}`, b),
  deleteBoat: (id: number) => req('DELETE', `/api/admin/used-boats/${id}`),
  importBoats: (boats: Partial<AdminBoat>[]) =>
    req<{ ok: boolean; imported: number }>('POST', '/api/admin/used-boats/import', { boats }),

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

  listBrands: () => req<{ brands: BrandEditorial[] }>('GET', '/api/admin/brands'),
  saveBrand: (brandId: string, b: Partial<BrandEditorial>) => req('PUT', `/api/admin/brands/${brandId}`, b),

  getSettings: () => req<{ settings: Record<string, string> }>('GET', '/api/admin/settings'),
  saveSettings: (settings: Record<string, string>) =>
    req<{ ok: boolean; settings: Record<string, string> }>('PUT', '/api/admin/settings', { settings }),

  listMessages: () => req<{ messages: ContactMessage[] }>('GET', '/api/admin/messages'),
  markMessage: (id: number, read: boolean) => req('PATCH', `/api/admin/messages/${id}`, { read }),
  deleteMessage: (id: number) => req('DELETE', `/api/admin/messages/${id}`),
};
