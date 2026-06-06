import React from 'react';
import { Info } from 'lucide-react';

export function IntroSection() {
  return (
    <section className="pt-24 pb-12 bg-transparent overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-10">
          
          {/* Left Column - Text */}
          <div className="flex flex-col gap-8 relative">
            <div className="absolute -top-12 -left-8 w-24 h-24 bg-brand-cyan/10 rounded-full blur-3xl"></div>
            
            <h2 className="text-[32px] md:text-[40px] font-bold text-brand-dark leading-tight tracking-tight">
              Votre partenaire nautique <br/>
              <span className="text-brand-cyan font-bold" style={{ fontStyle: 'normal' }}>sur le Lac d'Annecy</span>
            </h2>
            
            <div className="text-gray-600 space-y-6 text-base leading-relaxed">
              <p>
                Bienvenue chez <strong className="text-brand-dark font-bold">Motor Boat 74</strong>, votre spécialiste nautique sur le Lac d’Annecy.
              </p>
              <p>
                Nous vous proposons un service complet pour votre bateau : hivernage et stockage sécurisés, entretien régulier, réparations toutes marques, ainsi que la vente de bateaux neufs et d’occasion. Passionnés de nautisme, nous mettons notre savoir-faire au service des propriétaires qui souhaitent profiter de leur bateau en toute sérénité, avec une prise en charge professionnelle et personnalisée tout au long de l’année.
              </p>
              <p>
                Faites confiance à Motor Boat 74 pour prendre soin de votre bateau et pour vous fournir des services de qualité tout au long de l’année.
              </p>
            </div>
          </div>

          {/* Right Column - Single Image */}
          <div className="relative group">
              <div className="absolute -inset-4 bg-brand-cyan/10 rounded-[3rem] blur-2xl group-hover:bg-brand-cyan/20 transition-colors duration-500"></div>
              <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                  <img 
                      src="https://i.postimg.cc/qR618nHx/IMG-20230924-WA0017-1-11zon-11zon-e1727707593371-11zon.webp" 
                      alt="Motor Boat 74 - Entretien de bateaux" 
                      className="w-full h-full object-cover aspect-[4/3] transition-transform duration-1000 group-hover:scale-110"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                  />
              </div>
          </div>
        </div>

        {/* Full width - Waterski Distribution Column */}
        <article className="bg-white border border-white/40 p-8 rounded-[2rem] shadow-xl shadow-brand-dark/5 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-cyan/5 rounded-full -mr-16 -mt-16 transition-transform group-hover:scale-150 duration-700"></div>
          <div className="flex items-center gap-6 text-brand-dark relative z-10 flex-col md:flex-row text-center md:text-left">
            <div className="flex-shrink-0">
                <div className="w-16 h-16 rounded-2xl bg-white border border-brand-cyan/20 flex items-center justify-center shadow-lg shadow-brand-cyan/20">
                    <img src="https://i.postimg.cc/hv42zYsH/Capture-d-e-cran-2026-05-11-a-19-38-17-Photoroom.png" alt="Connelly Logo distributeur" className="w-10 h-10 object-contain" loading="lazy" referrerPolicy="no-referrer" />
                </div>
            </div>
            <div className="flex-1">
              <h3 className="mb-1 font-bold text-brand-dark uppercase tracking-widest text-[16px]">Waterski Distribution</h3>
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4 mb-2">
                <p className="font-bold text-gray-900">Importateur Exclusif <span className="font-bold">CONNELLY</span> France</p>
                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-brand-cyan/40"></div>
                <p className="text-gray-500 text-base leading-relaxed">Équipez-vous pour la pratique de toutes vos activités nautiques.</p>
              </div>
              <p className="text-gray-400 text-xs uppercase tracking-tighter">(Wakeboard, Wakesurf, Ski Nautique, Paddle, Engins tractés,…)</p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
