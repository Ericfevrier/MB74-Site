import React, { useEffect, useRef } from 'react';
import 'leaflet/dist/leaflet.css';
import { Zone } from '../data/hivernageZones';

/**
 * Carte des zones d'intervention (Leaflet + tuiles CartoDB, sans clé API).
 * Leaflet accède à `window` au chargement → import DYNAMIQUE dans l'effet (client only),
 * sinon le SSR plante. Le composant rend juste un conteneur côté serveur.
 */
export function ZonesMap({ zones, ariaLabel }: { zones: Zone[]; ariaLabel?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || zones.length === 0) return;
    let map: import('leaflet').Map | undefined;
    let cancelled = false;

    import('leaflet').then(({ default: L }) => {
      if (cancelled || !ref.current) return;

      map = L.map(ref.current, { scrollWheelZoom: false, attributionControl: false, zoomControl: true });

      L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        subdomains: 'abcd',
        maxZoom: 19,
      }).addTo(map);

      const icon = L.divIcon({
        className: 'mb-pin-wrap',
        html: '<span class="mb-pin"></span>',
        iconSize: [18, 18],
        iconAnchor: [9, 9],
        tooltipAnchor: [0, -11],
      });

      const latlngs: import('leaflet').LatLngExpression[] = [];
      zones.forEach((z) => {
        const m = L.marker([z.lat, z.lng], { icon }).addTo(map!);
        m.bindTooltip(z.name, { className: 'mb-tip', direction: 'top', offset: [0, -2] });
        latlngs.push([z.lat, z.lng]);
      });

      map.fitBounds(L.latLngBounds(latlngs), { padding: [44, 44], maxZoom: 13 });
    });

    return () => {
      cancelled = true;
      if (map) map.remove();
    };
  }, [zones]);

  return <div ref={ref} className="h-full w-full" role="application" aria-label={ariaLabel || "Carte des zones d'intervention"} />;
}
