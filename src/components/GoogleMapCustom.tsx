import React, { useEffect, useRef, useState } from 'react';
import { SITE } from '../data/site';

interface GoogleMapCustomProps {
  /** Adresse à afficher, si elle diffère de l'établissement principal. */
  address?: string;
  /** Affiche la carte en clair (sans inversion sombre), pour les sections claires. */
  light?: boolean;
}

/**
 * Carte de l'établissement.
 *
 * Une SEULE iframe. Le composant en rendait deux : la première appelait l'Embed
 * API avec `process.env.GOOGLE_MAPS_PLATFORM_KEY`, une variable serveur absente
 * du navigateur — la clé partait donc vide et Google refusait la requête — et
 * une seconde iframe de repli se chargeait par-dessus. Chaque page portant une
 * carte payait ainsi deux chargements, dont un voué à échouer.
 *
 * Par défaut on utilise `SITE.mapsEmbed`, ancré sur l'identifiant du lieu :
 * pas de clé nécessaire, et pas de recherche textuelle qui pourrait pointer à
 * côté. Une adresse explicite retombe sur la recherche, sans clé non plus.
 */
export function GoogleMapCustom({ address, light }: GoogleMapCustomProps = {}) {
  const src = address
    ? `https://maps.google.com/maps?q=${encodeURIComponent(address)}&t=&z=15&ie=UTF8&iwloc=&output=embed`
    : SITE.mapsEmbed;

  // `!5e1` = vue satellite. Une photo aérienne ne se teinte pas : l'inversion,
  // conçue pour une carte routière, en produirait le négatif.
  const isSatellite = /!5e1/.test(src);

  // Traitement colorimétrique accordé à la charte : le cyan de la marque est
  // proche du bleu des plans d'eau, on décale donc la teinte vers lui plutôt
  // que de désaturer complètement — le lac reste lisible et cohérent.
  const filter = isSatellite
    ? 'brightness(0.85) contrast(1.05)'
    : light
      ? 'grayscale(55%) saturate(1.25) hue-rotate(-8deg) contrast(1.04) brightness(1.02)'
      : 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)';

  /*
   * L'iframe n'est montée qu'à l'approche de l'écran.
   *
   * `loading="lazy"` y était déjà, mais le seuil natif des iframes est
   * généreux : mesuré sur /bateaux/occasion, la carte partait dès le
   * chargement et déclenchait 13 requêtes vers maps.googleapis.com, alors
   * qu'elle se trouve tout en bas de la page.
   *
   * L'enjeu n'est pas seulement le poids. Cette page émettait une quarantaine
   * de requêtes simultanées vers motorboat74.com, et o2switch en refuse une
   * partie au-delà d'un certain débit (429) : ce sont les images des annonces
   * qui perdaient l'arbitrage et restaient noires. Retarder ce qui n'est pas
   * visible, c'est laisser passer ce qui l'est.
   *
   * Le conteneur garde ses dimensions dans les deux états : rien ne bouge à
   * l'arrivée de la carte, le décalage cumulé reste nul.
   */
  const conteneur = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = conteneur.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') { setVisible(true); return; }
    const obs = new IntersectionObserver(
      (entrees) => {
        if (!entrees.some((e) => e.isIntersecting)) return;
        setVisible(true);
        obs.disconnect();
      },
      { rootMargin: '400px 0px' },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={conteneur}
      className={`relative h-full w-full rounded-[3rem] overflow-hidden ${light ? 'bg-gray-100' : 'bg-ink-900'}`}
    >
      {visible && (
        <iframe
          src={src}
          width="100%"
          height="100%"
          style={{ border: 0, filter }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          title={`${SITE.name} — ${SITE.addressStreet}, ${SITE.addressPostal} ${SITE.addressLocality}`}
        ></iframe>
      )}
    </div>
  );
}
