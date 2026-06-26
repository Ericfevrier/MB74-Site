import React, { useRef } from 'react';
import { Link } from 'react-router';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

export function BrandsSection() {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const categories = [
    { name: "Ski Nautique", img: "/images/26723-16656744.webp" },
    { name: "Wakeboard", img: "/images/wakeboard-connelly-groove.webp" },
    { name: "Wakesurf", img: "/images/habit-87.webp" },
    { name: "Kneeboard", img: "/images/2023-connelly-boost-kneeboard-fib.webp" },
    { name: "Foil", img: "/images/2026-connelly-pilot-first-roller-bottom-turn.jpg" },
    { name: "Paddle", img: "/images/paddle-header.webp" }
  ];

  return (
    <>
      {/* Nautique Section */}
      <section className="bg-ink-850 py-20 text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[100px] -mr-64 -mt-64"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
          
          <div className="text-center mb-12 lg:mb-20">
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <h2 className="text-[32px] md:text-[50px] font-bold uppercase tracking-tight leading-none">
                CONCESSIONNAIRE OFFICIEL
              </h2>
              <div className="w-12 h-12 md:w-16 md:h-16 lg:w-24 lg:h-24 flex-shrink-0 rounded-xl md:rounded-2xl lg:rounded-3xl overflow-hidden shadow-xl shadow-black/30">
                <img 
                  src="/images/event-listing-boat-shows.png" 
                  alt="Logo Nautique" 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <span className="text-[32px] md:text-[50px] font-bold uppercase tracking-tight leading-none">NAUTIQUE</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="space-y-12 order-2 lg:order-1">
              <div className="space-y-6 text-gray-300 text-base leading-relaxed max-w-xl">
                <p>
                  Nous sommes fiers d’être <span className="font-bold text-white">concessionnaire officiel de Nautique en Haute-Savoie, une marque de référence mondiale dans le domaine des sports nautiques.</span>
                </p>
                <p>
                  Reconnu pour ses bateaux d’exception, <span className="font-bold text-white">Nautique</span> incarne l’excellence et l’innovation dans la conception de modèles adaptés au wakesurf, wakeboard et ski nautique. En tant qu’<span className="font-bold text-white">experts</span>, nous vous accompagnons dans le choix du bateau idéal pour vivre des expériences inoubliables sur le <span className="font-bold text-white">Lac d’Annecy</span> et ses environs.
                </p>
                <p>
                  Venez découvrir notre sélection et profitez de <span className="font-bold text-white">conseils personnalisés</span> pour tous vos projets nautiques.
                </p>
              </div>
              
              <div className="pt-4">
                <Link 
                  to="/marque/nautique" 
                  className="inline-flex items-center bg-brand-cyan text-brand-dark font-bold text-sm lg:text-base px-8 py-5 rounded-lg uppercase tracking-tight hover:bg-white transition-all duration-300 shadow-xl shadow-black/40 group"
                >
                  DÉCOUVRIR LES MODÈLES NAUTIQUE 2026
                </Link>
              </div>
            </div>

            <div className="relative order-1 lg:order-2 aspect-[4/3] w-full max-w-[700px] mx-auto group/images">
              <div className="absolute top-0 left-0 w-[88%] z-10 transition-transform duration-700 ease-out group-hover/images:-translate-y-1">
                <img 
                  src="/images/2026-p23-ext-09-11zon.jpg" 
                  alt="Nautique Boat sunset" 
                  className="rounded-[2rem] shadow-2xl w-full aspect-video object-cover border border-white/10"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute bottom-0 right-0 w-[62%] z-20 transition-transform duration-700 ease-out group-hover/images:translate-y-1">
                <img 
                  src="/images/2026-p25-ext-16.jpg" 
                  alt="Nautique Boat action" 
                  className="rounded-[2rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] w-full aspect-video object-cover border-4 border-ink-850"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Connelly Section */}
      <section className="bg-brand-light py-20 text-brand-dark relative overflow-hidden">
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-brand-cyan/10 rounded-full blur-[80px] -ml-40 -mb-40"></div>
        
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 text-center relative z-10">
          <div className="flex flex-col items-center mb-12">
            <div className="flex items-center space-x-3 text-brand-cyan mb-4">
                <div className="w-8 h-1 bg-brand-cyan rounded-full"></div>
                <span className="uppercase tracking-widest font-bold text-[15px]">Exclusivité France</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
              <h2 className="text-[32px] md:text-[50px] font-bold uppercase tracking-tight leading-none">
                  IMPORTATEUR EXCLUSIF
              </h2>
              <img 
                src="/images/connelly-white-logo.webp"
                alt="Connelly Logo distributeur France"
                className="w-[280px] md:w-[339.758px] h-auto md:h-[52px] object-contain ml-0 sm:-ml-[30px] brightness-0"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            </div>
          </div>

          <div className="max-w-3xl mx-auto space-y-6 text-gray-600 text-base leading-relaxed mb-20">
            <p className="font-bold text-brand-dark text-2xl tracking-tight">
              L'essence du sport nautique américain à votre portée.
            </p>
            <p>
              Depuis 1965, Connelly repousse les limites de la glisse. Nous sommes fiers d'être l'importateur exclusif de cette marque iconique, offrant le meilleur du wakeboard, ski nautique et wakesurf.
            </p>
          </div>

          <div className="relative group mb-20">
            {/* Scroll Buttons */}
            <button 
              aria-label="Faire défiler à gauche"
              onClick={() => scroll('left')}
              className="absolute left-2 xl:-left-24 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white border border-gray-200 text-brand-dark flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-100 hover:scale-110 active:scale-95 invisible sm:visible"
            >
              <ChevronLeft size={24} />
            </button>
            <button 
              aria-label="Faire défiler à droite"
              onClick={() => scroll('right')}
              className="absolute right-2 xl:-right-24 top-1/2 -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white border border-gray-200 text-brand-dark flex items-center justify-center shadow-xl opacity-0 group-hover:opacity-100 transition-all hover:bg-gray-100 hover:scale-110 active:scale-95 invisible sm:visible"
            >
              <ChevronRight size={24} />
            </button>

            {/* Scrollable Container */}
            <div 
              ref={scrollRef}
              className="flex gap-6 md:gap-8 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-4 px-4 -mx-4"
            >
              {categories.map((sport, idx) => (
                <Link
                  key={idx}
                  to="/contact"
                  className="relative group/card overflow-hidden block aspect-[4/5] rounded-[2rem] shadow-2xl transition-all duration-500 hover:translate-y-[-10px] hover:shadow-brand-cyan/20 flex-shrink-0 w-[240px] md:w-[300px] snap-center lg:snap-start"
                >
                  <img 
                    src={sport.img} 
                    alt={`Équipement ${sport.name} Connelly`} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover/card:scale-110"
                    loading="lazy"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-brand-dark/20 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8 flex justify-between items-center text-white">
                    <div className="flex flex-col items-start translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
                      <span className="text-[10px] uppercase tracking-widest font-bold text-brand-cyan mb-1 opacity-0 group-hover/card:opacity-100 transition-opacity">Explorer</span>
                      <span className="font-bold uppercase tracking-tight text-lg md:text-xl">{sport.name}</span>
                    </div>
                    <div className="w-10 h-10 rounded-full border border-white/30 flex items-center justify-center opacity-0 group-hover/card:opacity-100 transition-all duration-500 scale-50 group-hover/card:scale-100">
                      <ArrowRight size={18} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <Link to="/contact" className="px-12 py-5 border-2 border-brand-cyan text-brand-cyan font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-brand-cyan hover:text-brand-dark transition-all duration-500 shadow-xl shadow-brand-cyan/10">
            DÉCOUVRIR LE CATALOGUE COMPLET
          </Link>
        </div>
      </section>
    </>
  );
}
