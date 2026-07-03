/**
 * Overrides SEO éditables par contenu (title, description, OG, canonical, noindex).
 * Stockés en base (JSON) et appliqués côté navigateur par `useSeoOverride` — en
 * complément du meta statique prérendu (qui reste le socle SEO au chargement direct).
 */
import { useEffect } from 'react';

export interface Seo {
  title?: string;
  description?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonical?: string;
  noindex?: boolean;
  nofollow?: boolean;
}

export const EMPTY_SEO: Seo = {};

/** true si au moins un champ SEO est renseigné (sinon on garde les valeurs par défaut). */
export function hasSeo(s?: Seo | null): boolean {
  if (!s) return false;
  return Object.values(s).some((v) => v !== '' && v != null && v !== false);
}

/** Normalise un objet SEO reçu de l'API (peut être une chaîne JSON ou un objet). */
export function parseSeo(v: unknown): Seo {
  if (!v) return {};
  if (typeof v === 'string') {
    try {
      return JSON.parse(v) as Seo;
    } catch {
      return {};
    }
  }
  return typeof v === 'object' ? (v as Seo) : {};
}

function upsertMeta(attr: 'name' | 'property', key: string, content?: string) {
  if (typeof document === 'undefined') return;
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (content == null || content === '') {
    return; // on ne supprime pas le meta statique existant si l'override est vide
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href?: string) {
  if (typeof document === 'undefined' || !href) return;
  let el = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Applique des overrides SEO au <head> côté client (progressive enhancement).
 * N'écrase que les champs renseignés ; laisse le meta statique intact sinon.
 */
export function useSeoOverride(seo?: Seo | null) {
  useEffect(() => {
    if (!seo || !hasSeo(seo)) return;
    if (seo.title) document.title = seo.title;
    upsertMeta('name', 'description', seo.description);
    upsertMeta('property', 'og:title', seo.ogTitle || seo.title);
    upsertMeta('property', 'og:description', seo.ogDescription || seo.description);
    upsertMeta('property', 'og:image', seo.ogImage);
    upsertMeta('name', 'twitter:title', seo.ogTitle || seo.title);
    upsertMeta('name', 'twitter:description', seo.ogDescription || seo.description);
    upsertMeta('name', 'twitter:image', seo.ogImage);
    if (seo.noindex || seo.nofollow) {
      upsertMeta('name', 'robots', `${seo.noindex ? 'noindex' : 'index'},${seo.nofollow ? 'nofollow' : 'follow'}`);
    }
    upsertCanonical(seo.canonical);
  }, [seo]);
}
