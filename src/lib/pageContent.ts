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

/** Renvoie une fonction `t(key)` : surcharge admin si présente, sinon défaut du schéma. */
export function usePageContent(pageKey: string): (key: string) => string {
  const [, force] = useReducer((x) => x + 1, 0);
  useEffect(() => {
    store.subs.add(force);
    ensureLoad();
    return () => { store.subs.delete(force); };
  }, []);
  const overrides = store.data?.[pageKey] || {};
  const defaults = PAGE_DEFAULTS[pageKey] || {};
  return (key: string) => {
    const v = overrides[key];
    if (v !== undefined && v !== null && v !== '') return v;
    return defaults[key] ?? '';
  };
}
