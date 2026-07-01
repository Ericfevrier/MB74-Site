/**
 * Réglages du site en LIVE : chargés depuis /api/settings au runtime et fournis via un
 * contexte. Valeurs par défaut = constantes statiques (SITE + réseaux), utilisées au
 * prerender et tant que l'API n'a pas répondu. Les composants d'affichage lisent
 * `useSiteSettings()` ; les métas/JSON-LD restent sur SITE (valeurs de build).
 */
import React, { createContext, useContext, useEffect, useState } from 'react';
import { SITE } from '../data/site';

export interface SiteSettings {
  phoneDisplay: string;
  phoneHref: string;
  email: string;
  addressStreet: string;
  addressLocality: string;
  addressPostal: string;
  addressRegion: string;
  hours: string;
  instagram: string;
  facebook: string;
  youtube: string;
  linkedin: string;
}

export const SETTINGS_DEFAULTS: SiteSettings = {
  phoneDisplay: SITE.phoneDisplay,
  phoneHref: SITE.phoneHref,
  email: SITE.email,
  addressStreet: SITE.addressStreet,
  addressLocality: SITE.addressLocality,
  addressPostal: SITE.addressPostal,
  addressRegion: SITE.addressRegion,
  hours: '',
  instagram: 'https://www.instagram.com/motorboat_74/',
  facebook: 'https://www.facebook.com/motorboat74/',
  youtube: 'https://www.youtube.com/@MotorBoat74',
  linkedin: 'https://www.linkedin.com/company/motor-boat-74/',
};

const phoneToHref = (p: string) => `tel:+${p.replace(/\D/g, '').replace(/^0/, '33')}`;

/** Fusionne les valeurs brutes (clés DB) sur les défauts (on ignore le vide). */
export function mergeSettings(raw: Record<string, string>): SiteSettings {
  const o: SiteSettings = { ...SETTINGS_DEFAULTS };
  const v = (k: string) => (raw[k] && String(raw[k]).trim() ? String(raw[k]).trim() : '');
  if (v('phone')) {
    o.phoneDisplay = v('phone');
    o.phoneHref = phoneToHref(v('phone'));
  }
  if (v('email')) o.email = v('email');
  if (v('address_street')) o.addressStreet = v('address_street');
  if (v('address_locality')) o.addressLocality = v('address_locality');
  if (v('address_postal')) o.addressPostal = v('address_postal');
  if (v('address_region')) o.addressRegion = v('address_region');
  if (v('hours')) o.hours = v('hours');
  for (const k of ['instagram', 'facebook', 'youtube', 'linkedin'] as const) {
    if (v(k)) o[k] = v(k);
  }
  return o;
}

export const fullAddress = (s: SiteSettings) => `${s.addressStreet}, ${s.addressPostal} ${s.addressLocality}`;

const SettingsContext = createContext<SiteSettings>(SETTINGS_DEFAULTS);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<SiteSettings>(SETTINGS_DEFAULTS);
  useEffect(() => {
    let alive = true;
    fetch('/api/settings')
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (alive && j && j.settings) setSettings(mergeSettings(j.settings));
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);
  return <SettingsContext.Provider value={settings}>{children}</SettingsContext.Provider>;
}

export const useSiteSettings = () => useContext(SettingsContext);
