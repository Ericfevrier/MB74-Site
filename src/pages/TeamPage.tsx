import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, MapPin, Phone } from 'lucide-react';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { GoogleMapCustom } from '../components/GoogleMapCustom';
import { pageMeta } from '../lib/meta';
import { breadcrumbSchema } from '../lib/schema';

const HERO = 'https://www.mastercraft.com/media/iujfrvnt/dt-background-image-1.webp';

interface Member {
  name: string;
  role: string;
  bio: string;
  image: string;
  /** Point de cadrage (object-position) pour garder le sujet dans le format portrait. */
  pos?: string;
}

const team: Member[] = [
  {
    name: 'Loïc',
    role: 'Dirigeant',
    bio: "Bordelais de naissance, je suis né dans le monde du bateau. Mon grand-père pêcheur sur le bassin d'Arcachon, mon père mécanicien aujourd'hui retraité m'ont transmis la passion de la mécanique, du bateau et du ski nautique, que j'ai pratiqué à haut niveau : multiple champion de France et d'Europe jusqu'à la catégorie Open. Vice-président du Club de Ski Nautique d'Annecy Sévrier, j'ai créé Motor Boat 74 en 2023.",
    image: 'https://motorboat74.com/wp-content/uploads/elementor/thumbs/Wave-Studio-X-Motor-Boat-74-85-sur-121-scaled-rfkk9r4vuvsamtdqi8msbc4op5d73c9ewy0r2i859s.png',
    pos: 'object-[72%_35%]',
  },
  {
    name: 'Marine',
    role: 'Assistante de direction & communication',
    bio: "Amoureuse des sports aquatiques, je baigne dans le monde du nautisme depuis l'enfance. Après un début de carrière en tant qu'hôtesse de l'air, je me suis formée au marketing digital et à la communication. J'ai rejoint Motor Boat 74 pour mettre mon expérience à votre service.",
    image: 'https://motorboat74.com/wp-content/uploads/2025/12/44-KIM_4220-scaled.jpg',
    pos: 'object-[50%_30%]',
  },
  {
    name: 'Pierre-Louis',
    role: 'Responsable mécanique',
    bio: "Passionné de mécanique, et surtout de grosses cylindrées, depuis mon plus jeune âge, cela fait bientôt 10 ans que je travaille chez les professionnels du nautisme autour du lac d'Annecy, en Haute-Savoie.",
    image: 'https://motorboat74.com/wp-content/uploads/2025/12/Wave-Studio-X-Motor-Boat-74-89-sur-121-scaled.png',
    pos: 'object-[50%_30%]',
  },
  {
    name: 'Jean-Baptiste',
    role: 'Responsable carrosserie',
    bio: "Natif de la région, je fais partie de l'équipe atelier de Motor Boat 74. J'assure la préparation des bateaux : nettoyage approfondi, préparation avant livraison, contrôle des équipements et finitions impeccables. Je suis aussi spécialisé dans les réparations et la carrosserie des bateaux.",
    image: 'https://motorboat74.com/wp-content/uploads/2025/12/Wave-Studio-X-Motor-Boat-74-42-sur-121-scaled.png',
    pos: 'object-center',
  },
];

export function teamMeta() {
  const canonical = `${SITE.url}/la-team/`;
  return pageMeta({
    title: 'La Team | Motor Boat 74, concessionnaire Nautique près d’Annecy',
    description:
      'Rencontrez l’équipe de Motor Boat 74, concessionnaire officiel Nautique et importateur Connelly Ski en Haute-Savoie : vente, hivernage et entretien de bateaux près du lac d’Annecy.',
    canonical,
    image: HERO,
    ogTitle: 'La Team | Motor Boat 74',
    jsonLd: [
      {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: SITE.name,
        url: `${SITE.url}/`,
        telephone: SITE.phoneDisplay,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE.addressStreet,
          postalCode: SITE.addressPostal,
          addressLocality: SITE.addressLocality,
          addressRegion: SITE.addressRegion,
          addressCountry: SITE.addressCountry,
        },
        employee: team.map((m) => ({ '@type': 'Person', name: m.name, jobTitle: m.role, image: m.image })),
      },
      breadcrumbSchema([
        { name: 'Accueil', url: `${SITE.url}/` },
        { name: 'La Team', url: canonical },
      ]),
    ],
  });
}

export function TeamPage() {
  return (
    <div className="bg-brand-light">

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="L’équipe Motor Boat 74 sur le lac" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          <Breadcrumb className="mb-6 inline-flex" items={[{ label: 'Accueil', to: '/' }, { label: 'La Team' }]} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6">La Team</h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Motor Boat 74, concessionnaire officiel de la marque <strong>Nautique</strong> et importateur de <strong>Connelly Ski</strong> en
            Haute-Savoie, est spécialisé dans la vente, l’hivernage et l’entretien de bateaux à moteur. Derrière l’atelier et le showroom, une
            équipe de passionnés à votre service.
          </p>
        </div>
      </header>

      {/* Équipe */}
      <section className="py-20 lg:py-24">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-14">
            <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">Nos passionnés</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mt-2">Une équipe à votre service</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-7">
            {team.map((m) => (
              <article
                key={m.name}
                className="group flex flex-col sm:flex-row bg-white border border-gray-200/70 rounded-[1.75rem] overflow-hidden shadow-[0_12px_40px_-18px_rgba(15,23,42,0.35)] ring-1 ring-black/[0.02] hover:-translate-y-1 transition-all duration-300"
              >
                {/* Photo portrait, format uniforme pour toute l'équipe */}
                <div className="sm:w-56 flex-shrink-0 aspect-[4/5] sm:aspect-auto overflow-hidden bg-ink-900">
                  <img
                    src={m.image}
                    alt={`${m.name}, ${m.role.toLowerCase()} chez Motor Boat 74`}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover ${m.pos || 'object-center'} group-hover:scale-105 transition-transform duration-700`}
                  />
                </div>
                <div className="p-7 flex flex-col justify-center">
                  <h3 className="text-2xl font-bold uppercase tracking-tight text-brand-dark leading-none">{m.name}</h3>
                  <span className="inline-block text-brand-cyan font-bold uppercase tracking-widest text-[11px] mt-2 mb-4">{m.role}</span>
                  <p className="text-gray-600 leading-relaxed text-[15px]">{m.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Venez nous rencontrer */}
      <section className="bg-brand-dark text-white py-20 overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] -mr-64 -mt-64" />
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6">Venez nous rencontrer</h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Poussez la porte de notre showroom au bord du lac d’Annecy : conseil, essai sur l’eau et accompagnement par une équipe qui partage votre passion.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition shadow-xl shadow-brand-cyan/20">
              <MapPin size={16} /> Nous rendre visite
            </Link>
            <a href={SITE.phoneHref} className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
              <Phone size={16} /> {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Où nous trouver : map + showroom (sans le bloc de texte « Visitez notre showroom ») */}
      <section className="bg-brand-dark pb-24">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <GoogleMapCustom />
            </div>
            <div className="h-[400px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="/images/img-20230924-wa0017-1-11zon-11zon-e1727707593371-11zon.webp"
                alt="Showroom Motor Boat 74 au bord du lac d’Annecy"
                className="w-full h-full object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
