import React from 'react';
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

  return (
    <div className={`relative h-full w-full rounded-[3rem] overflow-hidden ${light ? 'bg-gray-100' : 'bg-ink-900'}`}>
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
    </div>
  );
}
