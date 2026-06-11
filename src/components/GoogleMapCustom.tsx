import React from 'react';
import { SITE } from '../data/site';

interface GoogleMapCustomProps {
  /** Adresse à afficher (défaut : NAP officiel du site). */
  address?: string;
}

export function GoogleMapCustom({ address }: GoogleMapCustomProps = {}) {
  const resolved = address || `${SITE.name}, ${SITE.addressStreet}, ${SITE.addressPostal} ${SITE.addressLocality}`;
  const encodedAddress = encodeURIComponent(resolved);
  
  return (
    <div className="relative h-full w-full rounded-[3rem] overflow-hidden bg-ink-900">
      <iframe 
        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_PLATFORM_KEY || ''}&q=${encodedAddress}&zoom=15&language=fr`}
        width="100%" 
        height="100%" 
        style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)' }} 
        allowFullScreen={true} 
        loading="lazy" 
        referrerPolicy="no-referrer-when-downgrade"
        title="Localisation Motorboat 74"
        className="grayscale-[20%]"
      ></iframe>
      
      {/* Fallback for when API_KEY is missing in the embed URL (Google sometimes allows basic embed without key, but if not, we use the share link format) */}
      {!process.env.GOOGLE_MAPS_PLATFORM_KEY && (
        <iframe 
          src={`https://maps.google.com/maps?q=${encodedAddress}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) brightness(0.9) contrast(0.9)' }} 
          allowFullScreen={true} 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          title="Localisation Motorboat 74"
          className="absolute inset-0 grayscale-[20%]"
        ></iframe>
      )}
    </div>
  );
}

