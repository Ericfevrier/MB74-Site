/**
 * Accès au contenu éditorial des pages (surcharges admin) côté site.
 * Un seul chargement partagé (`/api/page-content`) ; chaque composant appelle
 * `const t = usePageContent('accueil')` puis `t('hero.title1')` — repli automatique
 * sur la valeur par défaut du schéma (donc SEO/prerender intacts hors ligne).
 */
import { useEffect, useReducer } from 'react';
import { PAGE_DEFAULTS } from './pageSchema';

type Data = Record<string, Record<string, string>>;
const store: { data: Data | null; loading: boolean; loaded: boolean; subs: Set<() => void> } = {
  data: null,
  loading: false,
  loaded: false,
  subs: new Set(),
};

function ensureLoad() {
  if (store.loaded || store.loading || typeof window === 'undefined') return;
  store.loading = true;
  fetch('/api/page-content')
    .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
    .then((j) => { store.data = j.pages || {}; })
    .catch(() => { store.data = {}; })
    .finally(() => {
      store.loaded = true;
      store.loading = false;
      store.subs.forEach((f) => f());
    });
}

/** `t(key)` : surcharge admin sinon défaut du schéma. `t.raw(key)` : surcharge seule (''
 *  si absente) — utile pour préserver un rendu par défaut « riche » (titres bi-colores). */
export type PageT = ((key: string) => string) & {
  raw: (key: string) => string;
  list: <T = any>(key: string) => T[];
};

export function usePageContent(pageKey: string): PageT {
  const [, force] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    store.subs.add(force);
    ensureLoad();
    return () => { store.subs.delete(force); };
  }, []);
  const overrides = store.data?.[pageKey] || {};
  const defaults = PAGE_DEFAULTS[pageKey] || {};
  const t = ((key: string) => {
    const v = overrides[key];
    if (v !== undefined && v !== null && v !== '') return v;
    const d = defaults[key];
    return typeof d === 'string' ? d : '';
  }) as PageT;
  t.raw = (key: string) => {
    const v = overrides[key];
    return v == null ? '' : v;
  };
  t.list = <T = any>(key: string): T[] => {
    const v = overrides[key];
    if (v != null && v !== '') {
      try {
        const a = JSON.parse(v);
        if (Array.isArray(a)) return a as T[];
      } catch { /* ignore */ }
    }
    const d = defaults[key];
    return Array.isArray(d) ? (d as T[]) : [];
  };
  return t;
}

function setMetaTag(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

/**
 * Applique la surcharge SEO (balise <title> + meta description) définie dans l'admin.
 * Le HTML prérendu garde toujours les défauts optimisés (bons pour les crawlers) ;
 * ce hook ne remplace que si l'admin a saisi une valeur, côté client (Google exécute le JS).
 */
export function useSeo(pageKey: string): void {
  const t = usePageContent(pageKey);
  const title = t.raw('seo.title');
  const description = t.raw('seo.description');
  useEffect(() => {
    if (typeof document === 'undefined') return;
    if (title) {
      document.title = title;
      setMetaTag('property', 'og:title', title);
    }
    if (description) {
      setMetaTag('name', 'description', description);
      setMetaTag('property', 'og:description', description);
    }
  }, [title, description]);
}
