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
export type PageT = ((key: string) => string) & { raw: (key: string) => string };

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
    return defaults[key] ?? '';
  }) as PageT;
  t.raw = (key: string) => {
    const v = overrides[key];
    return v == null ? '' : v;
  };
  return t;
}
