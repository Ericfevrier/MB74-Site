import { Links, Meta, Outlet, Scripts, ScrollRestoration, useLocation, useRouteError, isRouteErrorResponse, Link } from 'react-router';
import { Compass, RotateCcw, ArrowLeft } from 'lucide-react';
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
        {/*
          Police servie depuis notre domaine (voir le bloc @font-face
          d'index.css). Les deux `preconnect` vers Google et le `<link
          rel="stylesheet">` externe qui bloquait le rendu 780 ms sont
          supprimés — il n'y a plus d'origine tierce à joindre.

          `preload` : sans lui, le navigateur ne découvre la police qu'après
          avoir téléchargé ET analysé le CSS. Ici il la demande dès la lecture
          du `<head>`, en parallèle. Seul le sous-ensemble latin est préchargé :
          c'est celui dont une page française a besoin ; `latin-ext` reste
          disponible et ne part que si un caractère l'exige.
        */}
        <link rel="preload" href="/fonts/inter-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <Meta />
        <Links />
        {/*
         * Filet sans JavaScript.
         *
         * Les accordéons — FAQ des pages modèle, service et hivernage, options
         * d'équipement — sont prérendus repliés : le HTML livré porte
         * `style="grid-template-rows:0fr;opacity:0"` sur les panneaux fermés.
         * Le contenu est bien là, et c'est voulu : il reste ainsi indexable.
         * Mais sans script, aucun clic ne peut les ouvrir.
         *
         * Ces règles les déplient. Elles ne s'appliquent que si JavaScript est
         * absent ; dès qu'il tourne, `<noscript>` est ignoré et les accordéons
         * reprennent leur comportement normal.
         */}
        <noscript>
          <style>{`[style*="opacity:0"]{opacity:1!important;transform:none!important}[style*="0fr"]{grid-template-rows:1fr!important}[style*="height:0px"]{height:auto!important}`}</style>
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
     * `MotionConfig` — et avec lui l'import de `motion/react` — a été retiré
     * d'ici. Il n'existe plus une seule animation JavaScript sur le site :
     * accordéons et visionneuse d'images sont passés en CSS.
     *
     * L'enjeu n'était pas le composant mais l'import : `root.tsx` étant chargé
     * par toutes les routes, il tirait les 40 Ko de la bibliothèque sur les
     * 69 pages, y compris l'accueil qui n'a jamais eu la moindre animation.
     *
     * Le réglage système reste respecté : les transitions CSS obéissent à la
     * règle `prefers-reduced-motion` d'index.css, ce que `reducedMotion="user"`
     * assurait pour les animations JavaScript, qui, elles, y échappaient.
     */
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
  );
}
