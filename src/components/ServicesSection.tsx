import React from 'react';
import { Link } from 'react-router-dom';

interface ServiceItem {
  title: string;
  desc: string;
  img: string;
  buttons: string[];
  span: string;
  list?: string[];
  /** Cible de "EN SAVOIR PLUS" */
  link?: string;
  /** Cible par libellé de bouton (pour les cartes multi-boutons) */
  links?: Record<string, string>;
}

const servicesData: ServiceItem[] = [
  {
    title: "Vente de bateaux neufs et d'occasion",
    desc: "On vous accompagne pour trouver le bateau qui vous correspond vraiment, qu’il soit neuf ou d’occasion.\n\nOn a choisi de travailler avec des marques solides comme Nautique, MasterCraft et Tigé parce qu'on connaît leur fiabilité et ce qu'elles valent sur l'eau.\n\nOn prépare chaque unité avec soin dans nos ateliers pour qu'elle soit prête à naviguer. Notre objectif est simple : vous conseiller honnêtement pour que vous profitiez du lac sans vous soucier du reste.",
    img: "/images/vente-de-bateaux.jpg",
    buttons: ["OCCASION", "STOCK NEUF"],
    links: { OCCASION: '/bateaux-occasion', 'STOCK NEUF': '/bateaux-neufs' },
    span: "md:col-span-2"
  },
  {
    title: "Hivernage / Stockage",
    desc: "Protégez votre bateau pendant l'hiver grâce à notre service complet d'hivernage et de stockage sécurisé.",
    img: "/images/hivernage.jpg",
    list: [
      "Hangar de 3 000 m2",
      "Zone sécurisé",
      "Mise hors de l'eau",
      "Préparation pour la saison"
    ],
    buttons: ["EN SAVOIR PLUS"],
    link: "/hivernage-stockage-bateau",
    span: "md:col-span-1"
  },
  {
    title: "Entretien et réparation",
    desc: "Assurez performance, sécurité et longévité à votre bateau.\n\nNos services complets d'entretien, de réparation et de personnalisation sont réalisés par des spécialistes expérimentés.",
    img: "/images/imgi-5-img-1570-2-768x1024-1-11zon-11zon-r9wom29y8v9iir5nhw1v5emo845emka8lybu8yeirs.webp",
    buttons: ["EN SAVOIR PLUS"],
    link: "/services/entretien-reparation",
    span: "md:col-span-1"
  },
  {
    title: "Dépannage sur le lac",
    desc: "Intervention rapide 7j/7 pour toute panne mécanique ou électrique sur le lac d'Annecy.\n\nNous assurons une assistance sur place ou un remorquage sécurisé vers notre atelier.",
    img: "/images/de-pannage.jpg",
    buttons: ["EN SAVOIR PLUS"],
    link: "/services/depannage",
    span: "md:col-span-1"
  },
  {
    title: "Transport en Europe",
    desc: "Confiez le transport de votre bateau à nos équipes spécialisées.\n\nNous garantissons un déplacement sûr, rapide et réalisé dans le respect des normes, partout en France et en Europe.",
    img: "/images/transport.jpg",
    buttons: ["EN SAVOIR PLUS"],
    link: "/services/transport-de-bateau",
    span: "md:col-span-1"
  },
  {
    title: "Sellerie et personnalisation",
    desc: "Offrez confort, style et durabilité à votre bateau.\n\nNos services complets de confection, réparation et rénovation de sellerie nautique sur mesure sont réalisés avec savoir-faire et matériaux de qualité.",
    img: "/images/sellerie.webp",
    buttons: ["EN SAVOIR PLUS"],
    link: "/services/sellerie-de-bateau",
    span: "md:col-span-2"
  },
  {
    title: "Remorques de bateaux",
    desc: "Trouvez la remorque adaptée à votre bateau pour un transport sûr, durable et confortable.\n\nFacilitez vos déplacements en toute tranquillité quel que soit votre type d'embarcation.",
    img: "/images/remorques.webp",
    buttons: ["EN SAVOIR PLUS"],
    link: "/services/remorques-de-bateau",
    span: "md:col-span-1"
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 md:py-32 bg-transparent relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl -mr-48 -mt-48"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl -ml-48 -mb-48"></div>

      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10">
        <div className="mb-12 md:mb-20 text-center sm:text-left">
          <div className="flex items-center justify-center sm:justify-start space-x-3 text-brand-cyan mb-4">
              <div className="w-8 h-1 bg-brand-cyan rounded-full"></div>
              <span className="uppercase tracking-widest font-bold text-[15px] leading-[15px]">Un service à 360°</span>
          </div>
          <h2 className="text-[32px] md:text-[50px] font-bold text-brand-dark mb-6 tracking-tight">
            Nos <span className="text-brand-cyan lowercase">Services</span>
          </h2>
          <p className="text-gray-500 text-base max-w-2xl leading-relaxed">
            Une gamme complète de solutions nautiques sur-mesure pour vous accompagner tout au long de l'année.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicesData.map((service, index) => (
            <article 
              key={index} 
              className={`bg-white rounded-[2rem] shadow-xl shadow-brand-dark/5 overflow-hidden flex flex-col group transition-all duration-500 hover:translate-y-[-10px] hover:shadow-2xl hover:shadow-brand-cyan/10 border border-white relative ${service.span}`}
            >
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={service.img} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/60 via-transparent to-transparent opacity-60"></div>
              </div>
              
              <div className="p-5 sm:p-8 flex-1 flex flex-col relative">
                <div className="flex items-start gap-4 mb-4">
                    <span className="text-brand-cyan/20 text-[13px] font-bold leading-none" aria-hidden="true">0{index + 1}</span>
                    <h3 className="text-xl font-bold text-brand-dark group-hover:text-brand-cyan transition-colors uppercase tracking-tight leading-tight">
                        {service.title}
                    </h3>
                </div>
                <div className="text-gray-500 mb-6 flex-1 text-base leading-relaxed space-y-4">
                  {service.desc.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {service.list && (
                  <ul className="mb-6 space-y-2 text-sm text-brand-dark/80 font-medium">
                    {service.list.map((item, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-brand-cyan"></div>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
                
                <div className="flex flex-wrap gap-2 mt-auto">
                  {service.buttons.map((btn, i) => {
                    const target =
                      service.links?.[btn] ?? (btn === "EN SAVOIR PLUS" ? service.link : undefined);
                    const cls =
                      "inline-flex items-center bg-brand-dark text-white font-bold text-[10px] px-6 py-3 rounded-xl uppercase tracking-widest hover:bg-brand-cyan hover:text-brand-dark transition-all shadow-lg shadow-brand-dark/10";
                    return target ? (
                      <Link key={i} to={target} className={cls}>
                        {btn}
                      </Link>
                    ) : (
                      <a key={i} href="#" className={cls}>
                        {btn}
                      </a>
                    );
                  })}
                </div>
              </div>

              {/* Bottom accent */}
               <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-cyan opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
