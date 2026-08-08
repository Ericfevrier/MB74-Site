import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation, useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { Compass, RotateCcw, ArrowLeft } from 'lucide-react';
import { MotionConfig } from 'motion/react';
import './index.css';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CookieConsent } from './components/CookieConsent';
import { SettingsProvider } from './lib/settings';

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <meta charSet="utf-8" />
        <meta name="referrer" content="no-referrer" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0, viewport-fit=cover" />
        <meta name="theme-color" content="#2F2D2D" />
        <link rel="icon" type="image/png" sizes="64x64" href="/favicon-64.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" />
        <Meta />
        <Links />
        {/*
         * Filet sans JavaScript.
         *
         * Les révélations au défilement (`motion/react`) sont prérendues avec
         * leur état de DÉPART inline : le HTML livré contient
         * `style="opacity:0;transform:translateY(30px)"` sur, entre autres,
         * les 15 cartes modèle des pages de marque et les héros. Le contenu est
         * bien là — c'est tout l'intérêt du prérendu — mais invisible tant que
         * le script n'a pas pris la main.
         *
         * Ces trois règles rendent la page lisible telle quelle. Elles ne
         * s'appliquent que si JavaScript est absent ; dès qu'il tourne,
         * `<noscript>` est ignoré et l'animation reprend normalement.
         *
         * `height:0px` vise les accordéons FAQ : sans script on ne peut pas les
         * ouvrir, donc on affiche les réponses dépliées.
         */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}[style*="height:0px"]{height:auto!important}`}</style>
        </noscript>
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

/**
 * Filet de sécurité : capture toute erreur non gérée (crash de rendu, échec de chargement,
 * route inexistante côté framework) et affiche une page brandée au lieu d'un écran blanc.
 * React Router enveloppe automatiquement ce composant dans <Layout>.
 */
export function ErrorBoundary() {
  const error = useRouteError();
  const is404 = isRouteErrorResponse(error) && error.status === 404;
  const title = is404 ? 'Page introuvable' : 'Une erreur est survenue';
  const message = is404
    ? "La page que vous cherchez n'existe pas ou a été déplacée. Revenons à bon port."
    : "Un problème inattendu est survenu de notre côté. Réessayez dans un instant — si cela persiste, contactez-nous.";
  const isDev = Boolean((import.meta as unknown as { env?: { DEV?: boolean } }).env?.DEV);
  const detail = isDev && error instanceof Error ? error.stack || error.message : null;

  return (
    <section className="min-h-dvh flex items-center justify-center bg-brand-dark text-white px-4 py-14 sm:py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] -mr-64 -mt-64" />
      <div className="relative z-10 text-center max-w-xl">
        <div className="w-20 h-20 rounded-3xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mx-auto mb-8">
          <Compass size={40} />
        </div>
        <p className="text-brand-cyan font-bold uppercase tracking-[0.3em] text-sm mb-4">{is404 ? 'Erreur 404' : 'Oups'}</p>
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6 leading-tight">{title}</h1>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">{message}</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/" className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark font-bold px-8 py-4 rounded-2xl uppercase text-sm tracking-widest hover:bg-white transition">
            <ArrowLeft size={18} /> Retour à l'accueil
          </Link>
          {!is404 && (
            <button onClick={() => { if (typeof window !== 'undefined') window.location.reload(); }} className="inline-flex items-center gap-2 border border-white/20 text-white font-bold px-8 py-4 rounded-2xl uppercase text-sm tracking-widest hover:border-brand-cyan hover:text-brand-cyan transition">
              <RotateCcw size={16} /> Recharger la page
            </button>
          )}
        </div>
        {detail && (
          <pre className="mt-10 text-left text-xs text-red-300/80 bg-black/30 rounded-xl p-4 overflow-auto max-h-64 whitespace-pre-wrap">{detail}</pre>
        )}
      </div>
    </section>
  );
}

export default function App() {
  // Le back-office /admin s'affiche en plein écran, sans l'en-tête ni le pied du site.
  const isAdmin = useLocation().pathname.startsWith('/admin');
  if (isAdmin) {
    return (
      <main className="min-h-dvh bg-brand-light">
        <Outlet />
      </main>
    );
  }
  return (
    /*
     * `reducedMotion="user"` fait respecter le réglage système à TOUTES les
     * animations `motion/react` du site, sans avoir à les reprendre une par une.
     * Elles sont pilotées en JavaScript et échappent donc à la règle CSS
     * `prefers-reduced-motion` d'index.css — il faut bien les deux.
     *
     * Il ne reste que des animations déclenchées par un clic : ouverture
     * d'accordéon, lightbox. Les révélations au défilement ont toutes été
     * retirées — elles donnaient l'impression que la page se chargeait encore.
     */
    <MotionConfig reducedMotion="user">
      <SettingsProvider>
        {/* `min-h-dvh` et non `min-h-screen` : sur iOS, `100vh` vaut le viewport
            barre d'adresse masquée, soit ~60 px de plus que la hauteur réellement
            visible au chargement. L'unité dynamique suit la barre. */}
        <div className="min-h-dvh flex flex-col bg-brand-light">
          <Header />
          <main className="flex-1">
            <Outlet />
          </main>
          <Footer />
          <CookieConsent />
        </div>
      </SettingsProvider>
    </MotionConfig>
  );
}
