import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Zone } from '../data/hivernageZones';

/**
 * Carte des zones d'intervention (Leaflet + tuiles sombres CartoDB, sans clé API).
 * - 1 pin cyan par zone, nom de la zone affiché au survol (tooltip)
 * - auto-zoom (fitBounds) pour voir tous les points au chargement
 */
export function ZonesMap({ zones, ariaLabel }: { zones: Zone[]; ariaLabel?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current || zones.length === 0) return;

    const map = L.map(ref.current, {
      scrollWheelZoom: false,
      attributionControl: true,
      zoomControl: true,
    });

    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; OpenStreetMap, &copy; CARTO',
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

    const latlngs: L.LatLngExpression[] = [];
    zones.forEach((z) => {
      const m = L.marker([z.lat, z.lng], { icon }).addTo(map);
      m.bindTooltip(z.name, { className: 'mb-tip', direction: 'top', offset: [0, -2] });
      latlngs.push([z.lat, z.lng]);
    });

    map.fitBounds(L.latLngBounds(latlngs), { padding: [44, 44], maxZoom: 13 });

    return () => {
      map.remove();
    };
  }, [zones]);

  return <div ref={ref} className="h-full w-full" role="application" aria-label={ariaLabel || "Carte des zones d'intervention"} />;
}
