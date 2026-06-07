import React from 'react';
import { GoogleMapCustom } from './GoogleMapCustom';

export function ShowroomSection() {
  return (
    <section className="py-24 bg-brand-dark text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-8">
            VISITEZ NOTRE <span className="text-brand-cyan">SHOWROOM</span>
          </h2>
          <p className="max-w-3xl mx-auto text-gray-400 font-medium leading-relaxed">
            Venez explorer nos modèles conçus pour le ski nautique, le wakeboard et le wakesurf. 
            Notre équipe passionnée se fera un plaisir de vous offrir des conseils personnalisés pour vous 
            aider à trouver le bateau parfait pour vos aventures sur l'eau.
          </p>
          <p className="max-w-3xl mx-auto text-gray-400 font-medium leading-relaxed mt-4">
            Profitez de cette occasion pour poser vos questions, tester nos équipements et discuter 
            de vos besoins avec des experts. Nous avons hâte de vous accueillir !
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <GoogleMapCustom />
          </div>
          <div className="h-[400px] rounded-3xl overflow-hidden shadow-2xl">
            <img 
               src="/images/img-20230924-wa0017-1-11zon-11zon-e1727707593371-11zon.webp" 
               alt="Showroom Motorboat 74" 
               className="w-full h-full object-cover"
               loading="lazy"
               referrerPolicy="no-referrer"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
