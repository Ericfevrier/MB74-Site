/**
 * Client de l'API admin (même origine). Cookie de session envoyé automatiquement.
 */
import type { UsedBoat } from '../data/usedBoats';
import type { BlogArticle } from '../data/blog';

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

  listArticles: () => req<{ articles: AdminArticle[] }>('GET', '/api/admin/blog'),
  createArticle: (a: Partial<AdminArticle>) => req<{ ok: boolean; id: number }>('POST', '/api/admin/blog', a),
  updateArticle: (id: number, a: Partial<AdminArticle>) => req('PUT', `/api/admin/blog/${id}`, a),
  deleteArticle: (id: number) => req('DELETE', `/api/admin/blog/${id}`),

  listMessages: () => req<{ messages: ContactMessage[] }>('GET', '/api/admin/messages'),
  markMessage: (id: number, read: boolean) => req('PATCH', `/api/admin/messages/${id}`, { read }),
  deleteMessage: (id: number) => req('DELETE', `/api/admin/messages/${id}`),
};
