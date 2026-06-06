import React from 'react';

export function Hero() {
  return (
    <section className="relative flex-shrink-0 h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      <img
        src="/images/2026-g23-perf-18.jpg"
        alt="Bateau de sport en navigation sur le lac d'Annecy"
        className="absolute inset-0 z-0 w-full h-full object-cover transition-transform duration-1000 scale-105"
        fetchPriority="high"
        rel="preload"
        referrerPolicy="no-referrer"
      />
      <div className="absolute inset-0 z-0 bg-slate-900/20"></div>
      
      <div className="absolute inset-0 z-10 bg-gradient-to-r from-brand-dark/70 via-brand-dark/30 to-transparent flex items-center">
        <div className="w-full px-4 md:px-12">
          <div className="max-w-3xl" style={{ marginTop: '75px', paddingLeft: '5px' }}>
            <div className="flex items-center space-x-3 text-brand-cyan mb-3">
              <div className="w-12 h-0.5 bg-brand-cyan rounded-full"></div>
              <span className="uppercase tracking-[0.3em] font-bold text-[15px]">Expert Nautique Haute-Savoie</span>
            </div>
            
            <h1 className="text-white font-bold uppercase text-[32px] md:text-[54px] leading-tight mb-5 tracking-tight">
              <span className="block whitespace-nowrap">Concessionnaire nautique</span>
              <span className="text-brand-cyan block">haute-savoie</span>
            </h1>
            
            <p className="text-gray-300 text-[17px] max-w-xl leading-relaxed font-normal mb-[25px]">
              Vente, entretien et hivernage de bateaux d'exception sur le lac d'Annecy et en Haute-Savoie.
            </p>
            
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 pt-6">
              <button aria-label="Découvrir nos services" className="bg-brand-cyan text-brand-dark px-10 py-4 font-bold uppercase text-sm hover:translate-y-[-2px] hover:shadow-2xl hover:shadow-brand-cyan/40 transition-all duration-300 rounded-2xl min-h-[44px]">
                Découvrir nos services
              </button>
              <button aria-label="Bateaux en vente" className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-10 py-4 font-bold uppercase text-sm hover:bg-white/20 transition-all duration-300 rounded-2xl min-h-[44px]">
                Bateaux en vente
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative top badges */}
      <div className="absolute top-10 left-4 md:left-12 hidden lg:flex z-20">
         <div className="bg-white/10 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-white/20 flex items-center gap-3 shadow-2xl">
             <span className="text-white text-[16px] font-bold tracking-[0.12em] uppercase">Concessionnaire</span>
             <div className="flex items-center border-l border-white/20 pl-3">
               <img 
                 src="/images/design-sans-titre-10-11zon-e1753865977660-photoroom.png" 
                 alt="Nautique Boats concessionnaire officiel" 
                 className="h-10 object-contain" 
                 referrerPolicy="no-referrer"
               />
             </div>
          </div>
      </div>

      <div className="absolute top-10 right-4 md:right-12 hidden lg:flex z-20">
          <div className="bg-white/10 backdrop-blur-md px-6 py-3.5 rounded-2xl border border-white/20 flex items-center gap-3 shadow-2xl">
            <span className="text-white text-[16px] font-bold tracking-widest uppercase">Importateur Exclusif</span>
            <div className="flex items-center border-l border-white/20 pl-3">
              <img 
                src="/images/connelly-white-logo.webp" 
                alt="Connelly importateur exclusif" 
                className="h-8 object-contain" 
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
      </div>
    </section>
  );
}
