import { useEffect, useRef } from 'react';

/**
 * Chargement différé qui marche VRAIMENT dans un carrousel horizontal.
 *
 * Le problème d'origine : dans un conteneur à défilement horizontal, les
 * vignettes au-delà des deux premières attendent hors écran à DROITE. Le
 * `loading="lazy"` natif ne les réclamait jamais — mesuré au navigateur, quatre
 * des six catégories Connelly restaient indéfiniment en attente et la carte
 * s'affichait vide.
 *
 * Le contournement retenu alors — retirer `lazy` au-delà de la deuxième — a
 * corrigé l'affichage mais fait partir toutes ces images DÈS LE CHARGEMENT de
 * la page, quelle que soit leur position. Mesuré sur l'accueil : 1 077 Ko
 * d'images téléchargées avant le moindre défilement, pour un LCP (le hero) qui
 * n'en pèse que 48. Ces images se battaient contre lui pour la bande passante.
 *
 * Ce hook garde les deux propriétés :
 *  - les images restent `loading="lazy"`, donc rien ne part au chargement ;
 *  - quand le carrousel approche de l'écran, on bascule ses images en `eager`,
 *    ce qui déclenche leur téléchargement immédiat. Elles sont donc prêtes
 *    avant que l'utilisateur ne fasse défiler horizontalement, et aucune carte
 *    ne s'affiche vide.
 *
 * `rootMargin` de 600 px : le déclenchement a lieu environ un écran avant que
 * la section ne soit visible, ce qui laisse le temps du téléchargement.
 */
export function useLazyCarousel<T extends HTMLElement>(externe?: React.RefObject<T | null>) {
  const interne = useRef<T | null>(null);
  // Les carrousels qui pilotent déjà leurs flèches possèdent une ref : on
  // s'y greffe au lieu d'en imposer une seconde sur le même élément.
  const ref = externe ?? interne;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const charger = () => {
      for (const img of el.querySelectorAll<HTMLImageElement>('img[loading="lazy"]')) {
        // Passer de `lazy` à `eager` sur une image pas encore chargée déclenche
        // sa requête immédiatement.
        img.loading = 'eager';
      }
    };

    // Sans IntersectionObserver (navigateur ancien), on charge tout de suite :
    // mieux vaut une page plus lourde qu'une carte vide.
    if (typeof IntersectionObserver === 'undefined') {
      charger();
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        charger();
        obs.disconnect();
      },
      { rootMargin: '600px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [ref]);

  return ref;
}
