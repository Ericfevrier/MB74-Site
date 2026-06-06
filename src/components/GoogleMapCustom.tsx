import React from 'react';

export function GoogleMapCustom() {
  const address = "161 Allée des Edelweiss, 74210 SAINT FERREOL";
  const encodedAddress = encodeURIComponent(address);
  
  return (
    <div className="relative h-full w-full rounded-[3rem] overflow-hidden bg-[#1a1a1a]">
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2791.956743124584!2d6.293298115560649!3d45.76615757910547!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47895f36e4f16b23%3A0xc345f8f9c0e3e2b2!2s161%20All%C3%A9e%20des%20Edelweiss%2C%2074210%20Saint-Ferr%C3%A9ol%2C%20France!5e0!3m2!1sfr!2sfr!4v1683984000000!5m2!1sfr!2sfr" 
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

