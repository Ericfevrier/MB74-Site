/**
 * Bandeau de consentement cookies (RGPD) + chargement de la mesure d'audience.
 *
 * - L'identifiant est éditable dans l'admin (Réglages → Mesure d'audience) et lu
 *   via useSiteSettings(). Deux formats : GA4 (`G-…`) ou Tag Manager (`GTM-…`).
 * - AUCUN cookie/analytics n'est chargé tant que le visiteur n'a pas cliqué « Accepter ».
 *   C'est pour ça qu'on ne colle pas l'extrait fourni par Google directement dans
 *   le HTML : il se déclencherait avant tout consentement.
 * - Le choix est mémorisé dans localStorage ; il est modifiable via le lien « Cookies » du pied de page
 *   (événement `mb74:open-cookies`).
 * - En SPA, chaque changement de page envoie un `page_view`.
 */
import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router';
import { Cookie } from 'lucide-react';
import { useSiteSettings } from '../lib/settings';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const KEY = 'mb74_cookie_consent';
const OPEN_EVENT = 'mb74:open-cookies';

/** Permet de rouvrir le bandeau depuis n'importe où (ex. pied de page). */
export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_EVENT));
}

/** Un conteneur Tag Manager (GTM-…) ne se charge pas comme une propriété GA4 (G-…). */
const isTagManager = (id: string) => /^GTM-/i.test(id.trim());

/**
 * Charge la mesure d'audience, UNIQUEMENT après consentement.
 *
 * Deux formats acceptés dans Réglages → Mesure d'audience :
 *   - `G-XXXXXXXXXX`  : propriété GA4, chargée via gtag.js
 *   - `GTM-XXXXXXX`   : conteneur Tag Manager, chargé via gtm.js
 *
 * Le `<noscript>` fourni par Google n'est pas repris : c'est un iframe de repli
 * pour les visiteurs sans JavaScript, or ce site est une application React qui
 * ne s'affiche pas du tout sans JavaScript. Il ne mesurerait personne.
 */
function loadAudience(id: string) {
  if (window.gtag || window.dataLayer?.length) return;
  window.dataLayer = window.dataLayer || [];

  if (isTagManager(id)) {
    window.dataLayer.push({ 'gtm.start': Date.now(), event: 'gtm.js' });
    const s = document.createElement('script');
    s.async = true;
    s.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(id)}`;
    document.head.appendChild(s);
    return;
  }

  const s = document.createElement('script');
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(id)}`;
  document.head.appendChild(s);
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag('js', new Date());
  // send_page_view:false → on gère les vues de page manuellement (navigation SPA).
  window.gtag('config', id, { anonymize_ip: true, send_page_view: false });
}

export function CookieConsent() {
  const { gaId } = useSiteSettings();
  const location = useLocation();
  const [choice, setChoice] = useState<'granted' | 'denied' | null>(null);
  const loaded = useRef(false);

  // Lecture du choix mémorisé (client uniquement).
  useEffect(() => {
    try {
      const v = localStorage.getItem(KEY);
      if (v === 'granted' || v === 'denied') setChoice(v);
    } catch { /* localStorage indisponible */ }
  }, []);

  // Chargement de GA une fois le consentement donné et l'ID disponible.
  useEffect(() => {
    if (choice === 'granted' && gaId && !loaded.current) {
      loadAudience(gaId);
      loaded.current = true;
    }
  }, [choice, gaId]);

  // Vue de page à chaque navigation. En SPA, seul le premier chargement est vu
  // par le navigateur : sans cet envoi manuel, toute la navigation interne est
  // invisible dans les statistiques.
  useEffect(() => {
    if (!loaded.current || !gaId) return;
    const payload = {
      page_path: location.pathname + location.search,
      page_location: typeof window !== 'undefined' ? window.location.href : undefined,
      page_title: typeof document !== 'undefined' ? document.title : undefined,
    };
    // Tag Manager n'expose pas gtag() : on pousse l'événement dans le dataLayer,
    // où un déclencheur « Événement personnalisé : page_view » le récupère.
    if (isTagManager(gaId)) window.dataLayer?.push({ event: 'page_view', ...payload });
    else if (window.gtag) window.gtag('event', 'page_view', payload);
  }, [location.pathname, location.search, gaId]);

  // Réouverture depuis le pied de page.
  useEffect(() => {
    const open = () => setChoice(null);
    window.addEventListener(OPEN_EVENT, open);
    return () => window.removeEventListener(OPEN_EVENT, open);
  }, []);

  const decide = (v: 'granted' | 'denied') => {
    try { localStorage.setItem(KEY, v); } catch { /* ignore */ }
    setChoice(v);
  };

  // Pas d'analytics configuré, ou choix déjà fait → pas de bandeau.
  if (!gaId || choice !== null) return null;

  // `mb-safe-bottom` : sans lui, le bandeau et ses boutons passent sous la
  // barre d'accueil de l'iPhone, `viewport-fit=cover` étant déclaré.
  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] p-4 sm:p-6 mb-safe-bottom">
      <div className="max-w-3xl mx-auto bg-brand-dark text-white rounded-2xl shadow-2xl ring-1 ring-white/10 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <span className="hidden sm:flex w-11 h-11 rounded-xl bg-brand-cyan/15 text-brand-cyan items-center justify-center flex-shrink-0">
            <Cookie size={22} />
          </span>
          <div className="flex-1">
            <p className="font-bold uppercase tracking-tight mb-1.5">Cookies &amp; mesure d’audience</p>
            <p className="text-gray-300 text-sm leading-relaxed">
              Nous utilisons des cookies de mesure d’audience (Google Analytics) pour améliorer votre expérience.
              Vous pouvez accepter ou refuser. En savoir plus dans notre{' '}
              <Link to="/politique-de-confidentialite" className="text-brand-cyan underline hover:no-underline">politique de confidentialité</Link>.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              <button
                onClick={() => decide('granted')}
                className="bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl hover:bg-white transition"
              >
                Accepter
              </button>
              <button
                onClick={() => decide('denied')}
                className="border border-white/25 text-white font-bold uppercase tracking-widest text-xs px-6 py-3 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition"
              >
                Refuser
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
