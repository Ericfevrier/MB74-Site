import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Check } from 'lucide-react';

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
              className={`bg-white rounded-[2rem] overflow-hidden flex flex-col group border border-gray-200/70 ring-1 ring-black/[0.02] shadow-[0_18px_50px_-26px_rgba(15,23,42,0.4)] hover:shadow-[0_34px_70px_-30px_rgba(6,190,252,0.4)] hover:-translate-y-2 transition-all duration-500 relative ${service.span}`}
            >
              <div className="relative h-52 sm:h-64 overflow-hidden">
                <img
                  src={service.img}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-[1200ms] group-hover:scale-[1.08]"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-brand-dark/15 to-transparent"></div>
                {/* Badge numéro */}
                <span className="absolute top-4 left-4 w-11 h-11 rounded-2xl bg-brand-dark/60 backdrop-blur-md border border-white/20 text-white font-bold text-sm flex items-center justify-center shadow-lg" aria-hidden="true">
                  0{index + 1}
                </span>
                {/* Titre en surimpression */}
                <h3 className="absolute bottom-4 left-5 right-5 text-white text-lg sm:text-xl font-bold uppercase tracking-tight leading-tight drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                  {service.title}
                </h3>
              </div>

              <div className="p-6 sm:p-8 flex-1 flex flex-col">
                <div className="text-gray-500 mb-6 flex-1 text-[15px] leading-relaxed space-y-3">
                  {service.desc.split('\n').map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {service.list && (
                  <ul className="mb-7 grid gap-2.5 text-sm text-brand-dark/80 font-medium">
                    {service.list.map((item, i) => (
                      <li key={i} className="flex items-center gap-2.5">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-brand-cyan/15 text-brand-cyan flex items-center justify-center">
                          <Check size={12} strokeWidth={3} />
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="flex flex-wrap gap-2.5 mt-auto pt-2">
                  {service.buttons.map((btn, i) => {
                    const target =
                      service.links?.[btn] ?? (btn === "EN SAVOIR PLUS" ? service.link : undefined);
                    const primary = i === 0;
                    const cls = `group/btn inline-flex items-center gap-2 font-bold text-[11px] px-6 py-3.5 rounded-xl uppercase tracking-widest transition-all ${
                      primary
                        ? "bg-brand-cyan text-brand-dark hover:bg-brand-dark hover:text-white shadow-lg shadow-brand-cyan/25"
                        : "bg-brand-dark text-white hover:bg-brand-cyan hover:text-brand-dark shadow-lg shadow-brand-dark/10"
                    }`;
                    const content = (
                      <>
                        {btn}
                        <ArrowRight size={14} className="group-hover/btn:translate-x-0.5 transition-transform" />
                      </>
                    );
                    return target ? (
                      <Link key={i} to={target} className={cls}>{content}</Link>
                    ) : (
                      <a key={i} href="#" className={cls}>{content}</a>
                    );
                  })}
                </div>
              </div>

              {/* Bottom accent animé */}
              <div className="absolute bottom-0 left-0 w-full h-1 bg-brand-cyan origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500"></div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
