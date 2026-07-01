/**
 * Lecture publique des données live depuis l'API (même origine).
 *
 * Principe : les pages publiques sont **prérendues avec les données statiques** (SEO),
 * puis **rafraîchies en live** côté navigateur via le hook ci-dessous — uniquement si la
 * base contient des bateaux (sinon on garde le statique, ex. base encore vide). Au prerender
 * (build, pas de serveur) le fetch échoue silencieusement → on reste sur le statique.
 */
import { useEffect, useState } from 'react';
import type { UsedBoat } from '../data/usedBoats';
import type { BlogArticle } from '../data/blog';
import type { TeamMember } from '../data/team';

export async function fetchPublicUsedBoats(): Promise<UsedBoat[]> {
  const res = await fetch('/api/used-boats');
  if (!res.ok) throw new Error(`/api/used-boats -> ${res.status}`);
  const json = await res.json();
  return (json.boats ?? []) as UsedBoat[];
}

/**
 * Récupère la liste live des occasions au montage.
 * - `boats` : liste live (peut être vide), ou `null` si l'API a échoué.
 * - `loaded` : true une fois la requête terminée (succès ou échec).
 * Les composants n'utilisent le live que si `boats` est non vide (sinon repli statique).
 */
export function useLiveUsedBoats(): { boats: UsedBoat[] | null; loaded: boolean } {
  const [state, setState] = useState<{ boats: UsedBoat[] | null; loaded: boolean }>({ boats: null, loaded: false });
  useEffect(() => {
    let alive = true;
    fetchPublicUsedBoats()
      .then((all) => alive && setState({ boats: all, loaded: true }))
      .catch(() => alive && setState({ boats: null, loaded: true }));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}

/* ----------------------------- Blog ------------------------------ */

export interface PublicArticle extends BlogArticle {
  content?: string;
}

export async function fetchPublicBlog(): Promise<BlogArticle[]> {
  const res = await fetch('/api/blog');
  if (!res.ok) throw new Error(`/api/blog -> ${res.status}`);
  const json = await res.json();
  return (json.articles ?? []) as BlogArticle[];
}

export async function fetchPublicArticle(slug: string): Promise<PublicArticle> {
  const res = await fetch(`/api/blog/${encodeURIComponent(slug)}`);
  if (!res.ok) throw new Error(`/api/blog/${slug} -> ${res.status}`);
  const json = await res.json();
  return json.article as PublicArticle;
}

/** Articles de blog live (base) ; `articles` null si l'API échoue. */
export function useLiveBlog(): { articles: BlogArticle[] | null; loaded: boolean } {
  const [state, setState] = useState<{ articles: BlogArticle[] | null; loaded: boolean }>({ articles: null, loaded: false });
  useEffect(() => {
    let alive = true;
    fetchPublicBlog()
      .then((a) => alive && setState({ articles: a, loaded: true }))
      .catch(() => alive && setState({ articles: null, loaded: true }));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}

/* ----------------------------- Équipe ---------------------------- */

export async function fetchPublicTeam(): Promise<TeamMember[]> {
  const res = await fetch('/api/team');
  if (!res.ok) throw new Error(`/api/team -> ${res.status}`);
  const json = await res.json();
  return (json.members ?? []) as TeamMember[];
}

export function useLiveTeam(): { members: TeamMember[] | null; loaded: boolean } {
  const [state, setState] = useState<{ members: TeamMember[] | null; loaded: boolean }>({ members: null, loaded: false });
  useEffect(() => {
    let alive = true;
    fetchPublicTeam()
      .then((m) => alive && setState({ members: m, loaded: true }))
      .catch(() => alive && setState({ members: null, loaded: true }));
    return () => {
      alive = false;
    };
  }, []);
  return state;
}
