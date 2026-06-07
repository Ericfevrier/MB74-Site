import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  Shield,
  Wrench,
  Anchor,
  Calendar,
  MapPin,
  Clock,
  ArrowRight,
  Warehouse,
  ChevronDown,
  Star,
  CheckCircle,
  AlertTriangle,
  Info,
  Phone,
  FileCheck,
  Send,
  Loader2,
  Snowflake,
  Droplets,
  Sun,
  BatteryWarning,
  X,
  Lock,
  MessageCircle,
  Truck,
  LifeBuoy,
  Scissors
} from 'lucide-react';

export function HivernageStockagePage() {
  // States of interactive UI
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    nom: '',
    tel: '',
    email: '',
    modele: '',
    formule: 'Hivernage complet'
  });

  const formulationFormRef = useRef<HTMLDivElement>(null);

  // Scroll handler to form
  const scrollToForm = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    formulationFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormLoading(true);
    try {
      const res = await fetch('/api/hivernage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (!res.ok) throw new Error('send_failed');
      setFormSubmitted(true);
    } catch {
      setFormError("L'envoi a échoué. Réessayez ou appelez-nous au 04 57 57 27 27.");
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // JSON-LD Schemas definitions
  const schemaService = {
    "@context": "https://schema.org",
    "@type": "Service",
    "name": "Hivernage et Stockage de bateaux",
    "serviceType": "Boat Winterization and Storage",
    "provider": {
      "@type": "LocalBusiness",
      "name": "MotorBoat 74",
      "image": "/images/logo-transprent.png",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "161 Allée des Edelweiss",
        "addressLocality": "Lathuile",
        "postalCode": "74210",
        "addressRegion": "Haute-Savoie",
        "addressCountry": "FR"
      },
      "telephone": "+33450512030"
    },
    "areaServed": [
      { "@type": "AdministrativeArea", "name": "Annecy" },
      { "@type": "AdministrativeArea", "name": "Haute-Savoie" },
      { "@type": "AdministrativeArea", "name": "Lac d'Annecy" },
      { "@type": "AdministrativeArea", "name": "Lac du Bourget" },
      { "@type": "AdministrativeArea", "name": "Lac Léman" }
    ],
    "description": "Hivernez votre bateau à Annecy et Haute-Savoie dans notre hangar sécurisé de 3000 m². Mise hors d'eau, entretien moteur certifié Nautique, remise en service et livraison printanière incluses."
  };

  const schemaFAQ = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "Quand faut-il effectuer l'hivernage de son bateau ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L'hivernage doit démarrer dès la fin de saison d'été (septembre à novembre) avant les premières gelées alpines en Haute-Savoie. Attendre décembre augmente fortement les risques d'infiltration d’eau gelée et de casse thermique du bloc moteur."
        }
      },
      {
        "@type": "Question",
        "name": "Quel est le prix moyen d'un hivernage de bateau à Annecy ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nos forfaits débutent à 690 € HT pour l’hivernage moteur complet et à partir de 120 € HT par mois pour le stockage sécurisé sous hangar isolé. Le tarif varie selon la longueur de la coque et la motorisation (In-board / Hors-bord)."
        }
      },
      {
        "@type": "Question",
        "name": "Quels types de bateaux pouvez-vous hiverner ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Nous stockons et entretenons tous types d'embarcations : bateaux de wakeboard / wakesurf (Nautique, MasterCraft, Tigé, Malibu), motorboats, yachts de cabine, runabouts et barques de pêche. Notre grue à portique prend en charge les bateaux jusqu'à 10 tonnes."
        }
      },
      {
        "@type": "Question",
        "name": "Comment préparez-vous le moteur pour l'hiver ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Notre protocole hivernage inclut : vidange moteur complète, remplacement des filtres à huile/carburant, stabilisation de l'essence, injection d'antigel de grade marine biodégradable dans le circuit thermique, déconnexion avec charge d’entretien de la batterie et pulvérisation de graisse anti-corrosion."
        }
      },
      {
        "@type": "Question",
        "name": "Vaut-il mieux stocker son bateau en intérieur ou en extérieur ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "En Haute-Savoie, l'intérieur en hangar isolé est hautement recommandé en raison du gel tenace et des fortes chutes de neige alpines. Un stockage intérieur élimine l'usure prématurée liée aux UV, à l'accumulation de glace et prévient la condensation destructrice."
        }
      },
      {
        "@type": "Question",
        "name": "Comment se déroule la remise à l'eau au printemps ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Comprise dans notre pack Hivernage Complet, nous rechargeons les batteries, démarrons le moteur en bac avec contrôle des fluides, inspectons les pompes de cale et d'eau, et effectuons la mise à l'eau au port de votre choix (Annecy, Sevrier, Veyrier, etc.) à la date convenue."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la durée minimale d'un contrat de stockage ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Notre contrat de stockage hivernal standard couvre la saison d'octobre à avril (7 mois). Des options de stockage à l'année (remisage annuel sous hangar) sont aussi disponibles pour les propriétaires réguliers."
        }
      },
      {
        "@type": "Question",
        "name": "Mon bateau est-il assuré pendant son séjour dans votre hangar ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Notre infrastructure de 3 000 m² à Lathuile bénéficie d'une couverture d'assurance responsabilité civile professionnelle de stockage robuste. Votre bateau doit néanmoins conserver sa propre police d'assurance tous risques contre le vol et l'incendie (condition standard marine)."
        }
      },
      {
        "@type": "Question",
        "name": "Puis-je accéder à mon bateau pendant la période d'hivernage ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui, l'accès est possible sur rendez-vous préalable d'au moins 48 heures ouvrées pour des raisons d'organisation et de sécurité optimale de l'enceinte sous clé."
        }
      },
      {
        "@type": "Question",
        "name": "Prenez-vous en charge toutes les marques de bateaux ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. Bien que nous soyons concessionnaire officiel Nautique, nos mécaniciens possèdent une expertise élargie de plus de 15 ans permettant d'intervenir sur Malibu, Mastercraft, Tigé, Supra, Moomba, Sea Ray, Beneteau, Jeanneau, Monterey, Quicksilver, Yamaha, etc."
        }
      },
      {
        "@type": "Question",
        "name": "Quelle est la différence entre un hivernage actif et passif ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "L’hivernage passif (le nôtre, privilégiant l'arrêt total) consiste à purger en totalité les systèmes de fluides et remiser le bateau au sec. L’hivernage actif maintient le bateau à flot ou sous surveillance dynamique hebdomadaire, déconseillé sur le Lac d'Annecy à cause des températures négatives durables."
        }
      },
      {
        "@type": "Question",
        "name": "Gerez-vous la récupération de mon bateau directement au port ?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Oui. Notre équipe assure le service complet de transport : nous venons gruter ou sortir votre bateau de l'eau sur sa remorque au ponton d’Annecy, Sevrier, Saint-Jorioz, Talloires, Veyrier, Thonon ou Genève pour le convoyer directement à notre dépôt sécurisé."
        }
      }
    ]
  };

  const schemaBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://motorboat74.com/" },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": "https://motorboat74.com/#services" },
      { "@type": "ListItem", "position": 3, "name": "Hivernage & Stockage" }
    ]
  };

  // 12 High-quality FAQS mapped to a structured UI list
  const faqs = [
    {
      q: "Quand faut-il effectuer l'hivernage de son bateau ?",
      a: "L’hivernage doit idéalement débuter dès la fin de la saison estivale, entre septembre et novembre, avant les premières vagues de froid alpins. Attendre décembre augmente de 75 % le risque d'infiltration d'eau gelée dans la coque ou dans le bloc moteur, provoquant des fissures irréparables."
    },
    {
      q: "Quel est le prix moyen d'un hivernage de bateau à Annecy ?",
      a: "Nos forfaits de maintenance et hivernage technique démarrent à partir de 690 € HT. Le remisage seul sous hangar sécurisé commence à 120 € HT / mois. Le prix total dépend de la taille de votre bateau, de son équipement (ex: ballasts de wakeboard) et de son type de motorisation (Hors-Bord vs In-Board)."
    },
    {
      q: "Quels types de bateaux pouvez-vous hiverner ?",
      a: "Notre hangar de 3 000 m² à Lathuile accueille tout type d’unité : bateaux de wakesurf et wakeboard (Nautique, MasterCraft, Tigé, Malibu), bateaux de ski, day-cruisers, hors_bords légers, et semi-rigides de plaisance. Notre pont roulant de levage gère les unités lourdes de manière chirurgicale."
    },
    {
      q: "Comment préparez-vous le moteur pour l'hiver / gel ?",
      a: "Notre protocole d'hivernage mécanique certifié concessionnaire comprend : la vidange d’huile moteur complète avec remplacement des filtres, la stabilisation chimique du carburant de votre réservoir, l’injection forcée d'antigel marine de haute qualité dans tous les collecteurs, et la déconnexion avec charge cyclique de vos batteries de démarrage et accessoires."
    },
    {
      q: "Vaut-il mieux stocker son bateau en intérieur ou en extérieur ?",
      a: "En Haute-Savoie, les rigueurs de l’hiver rendent le stockage intérieur isolé indispensable. Un stockage extérieur (même sous bâche thermo-rétractable) expose le bateau aux écarts de température extrêmes, à la condensation constante sous bâche et aux surcharges de neige qui déforment les armatures."
    },
    {
      q: "Comment se déroule la remise à l'eau au printemps ?",
      a: "Comprise dans notre formule tout-inclus, la mise en service printanière comprend le nettoyage de sortie de stockage, le contrôle des batteries rechargées, le redémarrage des moteurs en bac d'essai de diagnostic, le resserrage des vannes, et la livraison de votre équipement mise à l'eau et prête à naviguer au port convenu."
    },
    {
      q: "Quelle est la durée minimale d'un contrat de stockage ?",
      a: "Nos contrats hivernaux couvrent généralement une période de 6 à 7 mois (par exemple, d'octobre à avril). Cependant, nous proposons également des contrats de stockage à l'année ou sur-mesure pour vous laisser naviguer l'esprit totalement tranquille."
    },
    {
      q: "Mon bateau est-il assuré de façon sécurisée chez vous ?",
      a: "Oui, notre centre technique dispose d'un contrat d'assurance multirisque civile professionnelle 'stockage et garde' couvrant notre hangar de 3000 m². Conformément à la législation maritime standard, vous devez maintenir votre propre assurance tous risques en cours de validité (incendie/responsabilité civile plaisance)."
    },
    {
      q: "Puis-je accéder à mon bateau pendant la période d'hivernage ?",
      a: "Afin de garantir une sécurité ultime 7j/7 sans intrusion extérieure, les accès de notre hangar sont hautement contrôlés. Vous pouvez néanmoins planifier une visite technique ou retirer des effets personnels à bord sur simple rendez-vous fixé 48h à l'avance."
    },
    {
      q: "Prenez-vous en charge toutes les marques de bateaux ?",
      a: "Absolument. MotorBoat 74 est expert toutes marques. Si nous sommes les techniciens officiels de la prestigieuse marque Nautique en Haute-Savoie, nos mécaniciens possèdent plus de 15 ans d'expérience sur Malibu, MasterCraft, Regal, Sea Ray, Tigé, Chaparral, Jeanneau, Beneteau ou Moomba."
    },
    {
      q: "Quelle est la différence entre un hivernage actif et passif ?",
      a: "L'hivernage passif est la méthode d'arrêt total que nous appliquons sous hangar, idéale pour les hivers rudes d'Annecy : vidanges complètes, mise au sec et préservation complète. L'hivernage actif consiste à faire tourner régulièrement le moteur à quai ou l'entretenir à flot, ce qui est risqué face aux hivers glacials de Haute-Savoie."
    },
    {
      q: "Gérez-vous la récupération de mon bateau directement au port ?",
      a: "Oui. C'est l'un de nos services majeurs. Nous nous déplaçons directement à votre place de port ou chenal de mise à l'eau (Annecy, Sevrier, Saint-Jorioz, Talloires, Veyrier, Thonon ou Évian) avec nos remorques adaptées ou notre camion de grutage pour un convoyage sécurisé sans effort de votre part."
    }
  ];

  return (
    <div className="bg-brand-dark min-h-screen text-gray-200 selection:bg-brand-cyan selection:text-brand-dark">
      <Helmet>
        <title>Hivernage & Stockage Bateau Annecy — Hangar 3000 m² | MB74</title>
        <meta name="description" content="Hivernez votre bateau à Annecy et en Haute-Savoie dans notre hangar sécurisé de 3000 m². Mise hors d'eau, hivernage moteur, remise à l'eau. Devis 24 h." />
        <link rel="canonical" href="https://motorboat74.com/hivernage-stockage-bateau" />
        <script type="application/ld+json">{JSON.stringify(schemaService)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      {/* 🟢 Mobile Sticky bottom CTA floating - scrolls to form */}
      <div className="lg:hidden fixed bottom-6 inset-x-0 mx-auto px-6 z-50 pointer-events-none">
        <button 
          onClick={scrollToForm}
          className="w-full bg-brand-cyan text-brand-dark font-extrabold py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider active:scale-95 transition-all pointer-events-auto border border-white/20 animate-pulse"
        >
          <FileCheck className="w-5 h-5" /> Devis Hivernage 24 h
        </button>
      </div>

      {/* 1. Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-brand-dark">
        {/* Background photo of mountain lake setting */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/placeholder-boat.jpg" 
            alt="MotorBoat 74 hangar de stockage et hivernage de bateau en Haute-Savoie" 
            className="w-full h-full object-cover opacity-35 scale-100"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/80 to-transparent"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10 text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            {/* SEO Breadcrumb indicator */}
            <div className="inline-flex items-center gap-2 bg-brand-cyan/10 border border-brand-cyan/20 rounded-full px-4 py-1.5 mb-8 text-[12px] font-bold text-brand-cyan uppercase tracking-wider">
              <span>Accueil</span>
              <span className="opacity-40">/</span>
              <span>Services</span>
              <span className="opacity-40">/</span>
              <span className="text-white">Hivernage & Stockage</span>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-sans font-bold uppercase text-white tracking-tight leading-tight mb-6">
              Hivernage et stockage de bateau à <span className="text-brand-cyan">Annecy</span> <span className="block mt-2 lg:inline text-white/90">— Hangar sécurisé 3 000 m²</span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 font-medium mb-10 max-w-2xl leading-relaxed">
              Concessionnaire Nautique en Haute-Savoie, MotorBoat 74 hiverne, stocke et remet à l'eau votre bateau sur le <strong className="text-brand-cyan">Lac d'Annecy</strong>, le <strong className="text-white">Léman</strong> et toute la région. Profitez de notre hangar haut de gamme isolé contre le gel ainsi que de notre protocole mécanique minutieux.
            </p>

            {/* 3 USP as requested */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left max-w-3xl">
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm transition-colors hover:bg-white/10 group">
                <Warehouse className="text-brand-cyan w-8 h-8 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-bold text-white text-base uppercase tracking-tight">Hangar 3 000 m²</h3>
                  <p className="text-xs text-gray-400 mt-1 font-medium">Bâtiment industriel sécurisé & surveillé par alarme 24h/7j.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm transition-colors hover:bg-white/10 group">
                <Wrench className="text-brand-cyan w-8 h-8 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-bold text-white text-base uppercase tracking-tight">Moteur Certifié</h3>
                  <p className="text-xs text-gray-400 mt-1 font-medium">Hivernage moteur de pointe par un concessionnaire officiel.</p>
                </div>
              </div>
              <div className="flex items-start gap-4 bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-sm transition-colors hover:bg-white/10 group">
                <Anchor className="text-brand-cyan w-8 h-8 flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="font-bold text-white text-base uppercase tracking-tight">Prêt au Printemps</h3>
                  <p className="text-xs text-gray-400 mt-1 font-medium">Notre package inclut la mise à l’eau garantie à date planifiée.</p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button 
                onClick={scrollToForm}
                className="bg-brand-cyan text-brand-dark px-10 py-5 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300 shadow-xl shadow-brand-cyan/20 active:translate-y-1"
              >
                Obtenir mon devis 24 h
              </button>
              <a 
                href="#tarifs" 
                className="bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white/5 hover:border-brand-cyan transition-all duration-300 flex items-center justify-center gap-2"
              >
                Voir les tarifs <ArrowRight className="w-4 h-4 text-brand-cyan" />
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-12 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 pt-8 border-t border-white/10 text-xs font-semibold text-gray-400">
              <span className="flex items-center gap-1.5 text-white">
                <Star className="w-4 h-4 fill-brand-cyan text-brand-cyan" /> 4,9/5 sur Google
              </span>
              <span className="text-white">● 600+ bateaux hivernés par an</span>
              <span className="text-white">● Concessionnaire Expert depuis plus de 10 ans</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Barre de preuve sociale (Bandeau horizontal) */}
      <section className="bg-brand-cyan text-brand-dark py-6 relative z-10 shadow-lg font-bold overflow-hidden select-none">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="flex flex-wrap items-center justify-around gap-y-4 gap-x-8 text-center uppercase tracking-widest text-xs md:text-sm">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 fill-brand-dark text-brand-dark" />
              <span>Google 4,9/5</span>
            </div>
            <div className="hidden sm:block text-brand-dark/40 font-bold">|</div>
            <div>
              <span>600+ Bateaux entretenus par an</span>
            </div>
            <div className="hidden md:block text-brand-dark/40 font-bold">|</div>
            <div>
              <span>Plus de 10 ans d'expertise</span>
            </div>
            <div className="hidden sm:block text-brand-dark/40 font-bold">|</div>
            <div>
              <span>Concessionnaire Nautique officiel</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Pourquoi hiverner */}
      <section className="py-24 bg-ink-950 relative overflow-hidden">
        {/* Subtle decorative background water elements */}
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl -z-10"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight leading-tight mb-6">
              Pourquoi l'hivernage de votre bateau est indispensable en <span className="text-brand-cyan">Haute-Savoie</span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed">
              Le climat alpin de notre belle Haute-Savoie est d'une grande rigueur. Durant l’hiver, les températures chutent de manière durable sous la barre des 0 °C. L’humidité nocturne persistante et le gel soudain provoquent des contraintes thermiques extrêmes sur les coques et la mécanique. Sans une purge rigoureuse des moteurs et des vannes, <strong>les réparations d’un bloc moteur fissuré coûtent 5 à 10 fois plus cher</strong> qu'un protocole d’hivernage professionnel préventif.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Risk Card 1 */}
            <div className="bg-ink-900 border border-white/5 hover:border-brand-cyan/30 p-8 rounded-3xl transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-6">
                <Snowflake className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-3">Gel du bloc moteur</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                L’eau résiduelle piégée dans les échangeurs ou le carter gèle et augmente de volume, provoquant la fissure définitive du métal du moteur in-board.
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-brand-cyan font-bold tracking-wider uppercase">
                Résolution : Purge et injection d'antigel
              </div>
            </div>

            {/* Risk Card 2 */}
            <div className="bg-ink-900 border border-white/5 hover:border-brand-cyan/30 p-8 rounded-3xl transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-6">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-3">Humidité & moisissures</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Le confinement prolongé favorise la condensation, altérant les cuirs de sellerie, les plastiques et générant des taches tenaces de moisissure.
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-brand-cyan font-bold tracking-wider uppercase">
                Résolution : Hangar ventilé anti-condensation
              </div>
            </div>

            {/* Risk Card 3 */}
            <div className="bg-ink-900 border border-white/5 hover:border-brand-cyan/30 p-8 rounded-3xl transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-6">
                <Sun className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-3">Rayons UV et intempéries</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                La lune, le soleil alpin hivernal et la neige directe altèrent le gelcoat de la coque, ternissent les teintes d'origine et craquellent les joints d'étanchéité.
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-brand-cyan font-bold tracking-wider uppercase">
                Résolution : Abri 100% couvert
              </div>
            </div>

            {/* Risk Card 4 */}
            <div className="bg-ink-900 border border-white/5 hover:border-brand-cyan/30 p-8 rounded-3xl transition-all hover:-translate-y-2 duration-300">
              <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-6">
                <BatteryWarning className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-3">Décharge de batterie</h3>
              <p className="text-sm text-gray-400 leading-relaxed font-light">
                Par grand froid, une batterie débranchée non maintenue subit une décharge profonde irréversible, rendant le système de démarrage inopérant au printemps.
              </p>
              <div className="mt-4 pt-4 border-t border-white/5 text-xs text-brand-cyan font-bold tracking-wider uppercase">
                Résolution : Dépose & Cycles de charge
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 📦 COMBINED WORKSPACE FOR BLOCKS 4 TO 12 + STICKY SIDEBAR FORM ON DESKTOP */}
      <section className="py-24 bg-transparent border-t border-white/5 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* LEFT COLUMN: Blocks 4 to 12 (occupies 2/3 space recursively) */}
            <div className="lg:col-span-2 space-y-32">
              
              {/* Bloc 4 — Les 2 formules */}
              <div id="formules" className="scroll-mt-36">
                <div className="mb-10 text-left">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Offres hivernage de bateaux</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight leading-tight">
                    Hivernage complet ou stockage seul — deux formules adaptées
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Formule 1 */}
                  <div className="bg-ink-950 border-2 border-brand-cyan rounded-3xl p-8 relative flex flex-col justify-between hover:shadow-2xl hover:shadow-brand-cyan/5 transition-all">
                    <span className="absolute -top-4 right-6 bg-brand-cyan text-brand-dark text-[10px] font-bold uppercase px-4 py-1.5 rounded-full tracking-widest">
                      Formule Recommandée
                    </span>
                    <div>
                      <div className="mb-4 text-brand-cyan font-bold text-2xl">01</div>
                      <h3 className="text-xl font-bold uppercase text-white mb-2">Hivernage complet</h3>
                      <p className="text-xs text-gray-400 mb-6">La prestation clé en main pour préserver à 100% votre capital nautique.</p>
                      
                      <ul className="space-y-3 mb-8 text-sm text-gray-300">
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" /> Prise en charge & Mise hors d'eau</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" /> Nettoyage haute pression coque</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" /> Vidange moteur & traitement carburant</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" /> Traitement antigel du circuit marin</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" /> Dépose charge et cycles batterie</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" /> Stockage sous hangar couvert 3 000m²</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0" /> Remise en service & Mise à l'eau</li>
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <div className="text-gray-400 text-xs mb-1">Prix de la tranquillité complète :</div>
                      <div className="text-3xl font-bold text-white">À partir de <span className="text-brand-cyan">690 €</span> <span className="text-xs font-semibold text-gray-500">HT</span></div>
                      <button 
                        onClick={() => {
                          setFormData(prev => ({ ...prev, formule: 'Hivernage complet' }));
                          scrollToForm();
                        }}
                        className="mt-6 w-full bg-brand-cyan text-brand-dark font-bold text-xs uppercase py-4 rounded-xl tracking-wider hover:bg-white hover:text-brand-dark transition-colors"
                      >
                        Devis Hivernage complet
                      </button>
                    </div>
                  </div>

                  {/* Formule 2 */}
                  <div className="bg-ink-950 border border-white/10 rounded-3xl p-8 relative flex flex-col justify-between hover:shadow-2xl transition-all">
                    <div>
                      <div className="mb-4 text-brand-cyan/50 font-bold text-2xl">02</div>
                      <h3 className="text-xl font-bold uppercase text-white mb-2">Stockage seul</h3>
                      <p className="text-xs text-gray-400 mb-6">Une place au sec et sécurisée pour garer votre remorque avec son bateau.</p>
                      
                      <ul className="space-y-3 mb-8 text-sm text-gray-300">
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan/60 flex-shrink-0" /> Emplacement sous hangar sec couvert</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan/60 flex-shrink-0" /> Zone entièrement climatisée & hors gel</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan/60 flex-shrink-0" /> Surveillance vidéo en continu 24h/24</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan/60 flex-shrink-0" /> Alarme intrusions branchée gendarmerie</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan/60 flex-shrink-0" /> Remisage sur votre remorque ou plots</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-brand-cyan/60 flex-shrink-0" /> Options de contrats annuels adaptatifs</li>
                      </ul>
                    </div>

                    <div className="pt-6 border-t border-white/5">
                      <div className="text-gray-400 text-xs mb-1">Tarif stockage mensuel direct :</div>
                      <div className="text-3xl font-bold text-white">À partir de <span className="text-brand-cyan">120 €</span><span className="text-base text-gray-400 font-light">/mois</span> <span className="text-xs font-semibold text-gray-500">HT</span></div>
                      <button 
                        onClick={() => {
                          setFormData(prev => ({ ...prev, formule: 'Stockage seul' }));
                          scrollToForm();
                        }}
                        className="mt-6 w-full bg-white/10 text-white font-bold text-xs uppercase py-4 rounded-xl tracking-wider hover:bg-white hover:text-brand-dark transition-colors border border-white/10"
                      >
                        Devis Stockage seul
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloc 5 — Process en 6 étapes (timeline visuelle) */}
              <div className="scroll-mt-36">
                <div className="mb-12">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Protocole certifié</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight">
                    Comment se déroule l'hivernage chez MotorBoat 74
                  </h2>
                </div>

                {/* Timeline responsive */}
                <div className="relative border-l border-white/10 ml-4 md:ml-6 space-y-12 pl-8 pb-4">
                  {/* Step 1 */}
                  <div className="relative">
                    <span className="absolute -left-[45px] top-1 bg-brand-cyan text-brand-dark w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-brand-dark">
                      1
                    </span>
                    <h3 className="text-lg font-bold uppercase text-white">Devis gratuit 24 h</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      Remplissez notre court formulaire d'estimation. Notre pôle administratif édite pour vous une fiche tarifaire fixe et détaillée selon la dimension réelle de la coque de votre bateau.
                    </p>
                  </div>

                  {/* Step 2 */}
                  <div className="relative">
                    <span className="absolute -left-[45px] top-1 bg-brand-cyan text-brand-dark w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-brand-dark">
                      2
                    </span>
                    <h3 className="text-lg font-bold uppercase text-white">Prise en charge personnalisée (Sept - Nov)</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      Nous récupérons votre bateau à flot directement dans les communes du Lac d'Annecy (Veyrier, Sevrier, Talloires, Annecy-le-Vieux...) ou vous le déposez directement en concession.
                    </p>
                  </div>

                  {/* Step 3 */}
                  <div className="relative">
                    <span className="absolute -left-[45px] top-1 bg-brand-cyan text-brand-dark w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-brand-dark">
                      3
                    </span>
                    <h3 className="text-lg font-bold uppercase text-white">Mise hors d'eau & Nettoyage de coque</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      Grutage soigné au moyen de nos sangles larges. Nettoyage haute pression hydro-gommant pour retirer tous les résidus d’algues, de coquillages et de sel calcaire sur la carène.
                    </p>
                  </div>

                  {/* Step 4 */}
                  <div className="relative">
                    <span className="absolute -left-[45px] top-1 bg-brand-cyan text-brand-dark w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-brand-dark">
                      4
                    </span>
                    <h3 className="text-lg font-bold uppercase text-white">Hivernage moteur & électronique</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      Vidange complète d’huile, remplacement des pièces d'usure immédiates, purge du thermostat d’eau douce de refroidissement et traitement chimique de passivation des composants sensibles.
                    </p>
                  </div>

                  {/* Step 5 */}
                  <div className="relative">
                    <span className="absolute -left-[45px] top-1 bg-brand-cyan text-brand-dark w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-brand-dark">
                      5
                    </span>
                    <h3 className="text-lg font-bold uppercase text-white">Stockage sécurisé sous Hangar (Déc - Mars)</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      Placement de votre unité sous notre hangar de garde de 3 000 m² à atmosphère maîtrisée, ventilé en permanence pour éviter l’humidité stagnante et la condensation de cale.
                    </p>
                  </div>

                  {/* Step 6 */}
                  <div className="relative">
                    <span className="absolute -left-[45px] top-1 bg-brand-cyan text-brand-dark w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-4 border-brand-dark">
                      6
                    </span>
                    <h3 className="text-lg font-bold uppercase text-white">Remise en service & Livraison (Avr - Mai)</h3>
                    <p className="text-sm text-gray-400 mt-2 leading-relaxed">
                      Recharge finale, remise en fluide et essai moteur dynamique en bac. Nous convoyons votre bateau pour sa livraison directe à flot au port convenu pour démarrer la saison sereinement.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bloc 6 — Le hangar 3 000 m² */}
              <div className="scroll-mt-36">
                <div className="mb-10 text-left">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Visite guidée</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight">
                    Un hangar sécurisé de 3 000 m² au cœur de la Haute-Savoie
                  </h2>
                  <p className="text-sm text-gray-400 mt-4 leading-relaxed max-w-2xl">
                    Notre centre technique indoor situé à Saint-Ferréol / Lathuile (à seulement 20 minutes d'Annecy) est pensé pour accueillir les bateaux haut de gamme. Contrairement à de simples hangars agricoles poussiéreux, ce complexe moderne est totalement isolé thermiquement et ventilé.
                  </p>
                </div>

                {/* Grid 6 pictos / aspects */}
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <Warehouse className="w-8 h-8 text-brand-cyan mx-auto mb-2" />
                    <span className="block text-xs font-bold text-white uppercase tracking-wider">3 000 m² isolés</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <Shield className="w-8 h-8 text-brand-cyan mx-auto mb-2" />
                    <span className="block text-xs font-bold text-white uppercase tracking-wider">Alarme 24/7 Gendarmerie</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <Clock className="w-8 h-8 text-brand-cyan mx-auto mb-2" />
                    <span className="block text-xs font-bold text-white uppercase tracking-wider">Atmosphère ventilée</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <Calendar className="w-8 h-8 text-brand-cyan mx-auto mb-2" />
                    <span className="block text-xs font-bold text-white uppercase tracking-wider">Stockage hors gel</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <CheckCircle className="w-8 h-8 text-brand-cyan mx-auto mb-2" />
                    <span className="block text-xs font-bold text-white uppercase tracking-wider">Caméras HD IR</span>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                    <Phone className="w-8 h-8 text-brand-cyan mx-auto mb-2" />
                    <span className="block text-xs font-bold text-white uppercase tracking-wider">Accès Contrôlé</span>
                  </div>
                </div>

                {/* Galerie de 4 photos du hangar */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative group">
                    <img 
                      src="/images/placeholder-boat.jpg" 
                      alt="hangar de stockage de bateaux à Annecy avec MotorBoat 74" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative group">
                    <img 
                      src="/images/stock-1581092160607-ee22621dd758-600.jpg" 
                      alt="bateaux neufs et d'occasion en hangar sécurisé à Annecy" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative group">
                    <img 
                      src="/images/stock-1621905251189-08b45d6a269e-600.jpg" 
                      alt="maintenance mécanique de moteur hors-bord en Haute-Savoie" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 relative group">
                    <img 
                      src="/images/placeholder-boat.jpg" 
                      alt="remisage technique sécurisé de bateaux" 
                      className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" 
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-brand-dark/20 group-hover:bg-transparent transition-colors"></div>
                  </div>
                </div>
              </div>

              {/* Bloc 7 — Comparatif intérieur vs extérieur */}
              <div className="scroll-mt-36">
                <div className="mb-10 text-left">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Guide de choix</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight">
                    Stockage intérieur ou extérieur : quelle solution choisir ?
                  </h2>
                </div>

                {/* Table converting to cards on mobile */}
                <div className="overflow-hidden border border-white/10 rounded-2xl bg-ink-950">
                  {/* Desktop version (hidden on mobile) */}
                  <div className="hidden md:block">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-ink-900 text-white font-extrabold uppercase tracking-widest text-[11px] border-b border-white/10">
                        <tr>
                          <th className="py-4 px-6 text-brand-cyan">Critère d'analyse</th>
                          <th className="py-4 px-6">Hangar Intérieur (Conseillé)</th>
                          <th className="py-4 px-6">Stockage Extérieur</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-medium">
                        <tr>
                          <td className="py-4 px-6 text-white font-bold bg-white/5 mb-2">Risque de gel alpine</td>
                          <td className="py-4 px-6 text-brand-cyan"><CheckCircle className="inline w-4 h-4 mr-1.5 -mt-0.5" />Risque NUL (Hangar tempéré)</td>
                          <td className="py-4 px-6 text-gray-400"><AlertTriangle className="inline w-4 h-4 mr-1.5 -mt-0.5" />Risque FORT (Écarts thermiques)</td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 text-white font-bold bg-white/5">Condensation & Cuir</td>
                          <td className="py-4 px-6 text-brand-cyan"><CheckCircle className="inline w-4 h-4 mr-1.5 -mt-0.5" />NULLE (Flux d'air continu)</td>
                          <td className="py-4 px-6 text-gray-400"><X className="inline w-4 h-4 mr-1.5 -mt-0.5" />OUI (Moisi tenace sous bâche)</td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 text-white font-bold bg-white/5">Rayonnement UV & Lune</td>
                          <td className="py-4 px-6 text-brand-cyan"><CheckCircle className="inline w-4 h-4 mr-1.5 -mt-0.5" />Protection à 100% (Gelcoat intact)</td>
                          <td className="py-4 px-6 text-gray-400"><X className="inline w-4 h-4 mr-1.5 -mt-0.5" />Ternes prématurés obligatoires</td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 text-white font-bold bg-white/5">Surveillance & Vol</td>
                          <td className="py-4 px-6 text-brand-cyan"><CheckCircle className="inline w-4 h-4 mr-1.5 -mt-0.5" />Alarme, caméras, local clos</td>
                          <td className="py-4 px-6 text-gray-400"><AlertTriangle className="inline w-4 h-4 mr-1.5 -mt-0.5" />Barrières simples de parking</td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 text-white font-bold bg-white/5">Budget mensuel</td>
                          <td className="py-4 px-6 text-brand-cyan">Moyen à élevé selon coque</td>
                          <td className="py-4 px-6 text-brand-cyan">Économique</td>
                        </tr>
                        <tr>
                          <td className="py-4 px-6 text-white font-bold bg-white/5 rounded-bl-2xl">Recommandé pour :</td>
                          <td className="py-4 px-6 text-brand-cyan font-bold bg-brand-cyan/5">Bateaux de glisse récents (Nautique...), runabouts luxueux</td>
                          <td className="py-4 px-6 text-gray-400 rounded-br-2xl">Bateaux utilitaires anciens, semi-rigides de travail</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile version (cards stacked, hidden on desktop) */}
                  <div className="block md:hidden divide-y divide-white/5">
                    <div className="p-6">
                      <h4 className="font-bold text-brand-cyan uppercase text-xs tracking-wider mb-4">Option : Hangar Intérieur</h4>
                      <ul className="space-y-3 font-medium text-sm text-gray-300">
                        <li className="flex justify-between"><span>Risque Gel :</span> <span className="text-brand-cyan font-bold">Négligeable</span></li>
                        <li className="flex justify-between"><span>Condensation :</span> <span className="text-brand-cyan font-bold">Absente (ventilé)</span></li>
                        <li className="flex justify-between"><span>Rayonnement :</span> <span className="text-brand-cyan font-bold">Protection totale</span></li>
                        <li className="flex justify-between"><span>Sécurisation :</span> <span className="text-brand-cyan font-bold">Vidéo, alarme, sous clé</span></li>
                        <li className="flex justify-between"><span>Recommandation :</span> <span className="text-white font-bold">Bateaux récents, Nautique</span></li>
                      </ul>
                    </div>
                    <div className="p-6 bg-brand-dark/30">
                      <h4 className="font-bold text-gray-400 uppercase text-xs tracking-wider mb-4">Option : Stockage Extérieur</h4>
                      <ul className="space-y-3 font-medium text-sm text-gray-400">
                        <li className="flex justify-between"><span>Risque Gel :</span> <span className="text-gray-400 font-bold">Substantiel</span></li>
                        <li className="flex justify-between"><span>Condensation :</span> <span className="text-gray-400 font-bold">Infiltration possible</span></li>
                        <li className="flex justify-between"><span>Rayonnement :</span> <span className="text-gray-400">Exposition directe</span></li>
                        <li className="flex justify-between"><span>Sécurisation :</span> <span className="text-gray-400">Simple grille extérieure</span></li>
                        <li className="flex justify-between"><span>Recommandation :</span> <span className="text-gray-300 font-bold">Barques et remorques vides</span></li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex items-center justify-between bg-brand-cyan/5 border border-brand-cyan/10 p-5 rounded-2xl">
                  <div className="flex items-center gap-3">
                    <Info className="text-brand-cyan w-6 h-6 flex-shrink-0" />
                    <p className="text-xs text-gray-300 font-medium">Vous hésitez entre l'intérieur et l'extérieur ? Notre consultant est disponible.</p>
                  </div>
                  <button onClick={scrollToForm} className="text-xs text-brand-cyan font-bold uppercase tracking-wider hover:underline flex items-center gap-1">
                    Nous joindre <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Bloc 8 — Tarifs (id="tarifs") */}
              <div id="tarifs" className="scroll-mt-36">
                <div className="mb-10 text-left">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Transparence de prix</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight leading-tight">
                    Tarifs hivernage & stockage de bateau — fourchettes 2025/2026
                  </h2>
                </div>

                {/* Rates Table converting to list on mobile */}
                <div className="overflow-hidden border border-white/10 rounded-2xl bg-ink-950">
                  {/* Desktop version */}
                  <div className="hidden md:block">
                    <table className="w-full text-left text-sm">
                      <thead className="bg-ink-900 text-white font-extrabold uppercase tracking-widest text-[11px] border-b border-white/10">
                        <tr>
                          <th className="py-4 px-6 text-brand-cyan">Longueur du bateau</th>
                          <th className="py-4 px-6">Hivernage Complet (Hangar Sec Inclus)</th>
                          <th className="py-4 px-6">Stockage Seul Hangar (Mensuel)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5 font-medium text-gray-300">
                        <tr className="hover:bg-white/5">
                          <td className="py-4 px-6 text-white font-bold">&lt; 5,00 Mètres</td>
                          <td className="py-4 px-6 font-bold text-brand-cyan">Dès 690 € HT</td>
                          <td className="py-4 px-6 font-bold">120 € HT / mois</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="py-4 px-6 text-white font-bold">5,00 M À 6,50 M</td>
                          <td className="py-4 px-6 font-bold text-brand-cyan">Dès 890 € HT</td>
                          <td className="py-4 px-6 font-bold">160 € HT / mois</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="py-4 px-6 text-white font-bold">6,50 M À 8,00 M</td>
                          <td className="py-4 px-6 font-bold text-brand-cyan">Dès 1 190 € HT</td>
                          <td className="py-4 px-6 font-bold">210 € HT / mois</td>
                        </tr>
                        <tr className="hover:bg-white/5">
                          <td className="py-4 px-6 text-white font-bold">&gt; 8,00 Mètres</td>
                          <td className="py-4 px-6 font-bold text-brand-cyan">Sur Devis Personnalisé</td>
                          <td className="py-4 px-6 font-bold">Sur devis individuel</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Mobile version */}
                  <div className="block md:hidden divide-y divide-white/5">
                    <div className="p-5">
                      <h4 className="font-bold text-white text-base mb-2">Bateau &lt; 5,00 m</h4>
                      <div className="flex justify-between text-xs font-semibold py-1">
                        <span className="text-gray-400">Hivernage complet :</span>
                        <span className="text-brand-cyan">Dès 690 € HT</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold py-1">
                        <span className="text-gray-400">Stockage seul :</span>
                        <span className="text-white">120 € HT / mois</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-white text-base mb-2">Bateau 5,00 m - 6,50 m</h4>
                      <div className="flex justify-between text-xs font-semibold py-1">
                        <span className="text-gray-400">Hivernage complet :</span>
                        <span className="text-brand-cyan">Dès 890 € HT</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold py-1">
                        <span className="text-gray-400">Stockage seul :</span>
                        <span className="text-white">160 € HT / mois</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-white text-base mb-2">Bateau 6,50 m - 8,00 m</h4>
                      <div className="flex justify-between text-xs font-semibold py-1">
                        <span className="text-gray-400">Hivernage complet :</span>
                        <span className="text-brand-cyan">Dès 1 190 € HT</span>
                      </div>
                      <div className="flex justify-between text-xs font-semibold py-1">
                        <span className="text-gray-400">Stockage seul :</span>
                        <span className="text-white">210 € HT / mois</span>
                      </div>
                    </div>
                    <div className="p-5">
                      <h4 className="font-bold text-white text-base mb-2">Bateau &gt; 8,00 m</h4>
                      <div className="text-xs font-bold text-brand-cyan text-center py-2 uppercase tracking-wider">
                        Tarif sur devis gratuit sous 24h
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-brand-cyan text-brand-dark p-6 rounded-2xl shadow-xl">
                  <div>
                    <h4 className="font-extrabold text-base uppercase tracking-tight flex items-center gap-2"><Star className="w-4 h-4 fill-brand-dark" /> Privilège d'Achat Nautique</h4>
                    <p className="text-xs font-semibold text-brand-dark/85 mt-1">Vous êtes propriétaire d'un bateau de marque Nautique ? Vous bénéficiez d'une réduction de -5% automatique sur l'hivernage complet.</p>
                  </div>
                  <button onClick={scrollToForm} className="bg-brand-dark hover:bg-ink-850 text-white px-6 py-3 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors whitespace-nowrap">
                    En bénéficier
                  </button>
                </div>
              </div>

              {/* Bloc 9 — Zones d'intervention (MAILLAGE INTERNE) */}
              <div className="scroll-mt-36">
                <div className="mb-10 text-left">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Réseau Local de lacs</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight leading-tight">
                    Hivernage de bateau partout en Haute-Savoie et autour des lacs alpins
                  </h2>
                  <p className="text-sm text-gray-400 mt-4 leading-relaxed">
                    Chez MotorBoat 74, nous couvrons la totalité des grands bassins nautiques de Haute-Savoie, Savoie et de l'arc lémanique. Pour assurer un maillage optimal, notre équipe assure le transport, la dépose et la récupération sur les principaux ports.
                  </p>
                </div>

                {/* Cities Grid - STRICT SEO RULES */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Satellites clickable with Link */}
                  <Link to="/hivernage-thonon-les-bains" className="bg-white/5 border border-white/10 hover:border-brand-cyan/40 p-6 rounded-2xl group transition-all">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-white uppercase text-sm group-hover:text-brand-cyan transition-colors">Thonon-les-Bains</h4>
                        <p className="text-xs text-gray-400 mt-1">Bassin du Lac Léman (74 & Suisse)</p>
                      </div>
                      <ArrowRight className="text-brand-cyan w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all" />
                    </div>
                  </Link>

                  <Link to="/hivernage-evian-les-bains" className="bg-white/5 border border-white/10 hover:border-brand-cyan/40 p-6 rounded-2xl group transition-all">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-white uppercase text-sm group-hover:text-brand-cyan transition-colors">Évian-les-Bains</h4>
                        <p className="text-xs text-gray-400 mt-1">Secteur Lémanique Est & Rive française</p>
                      </div>
                      <ArrowRight className="text-brand-cyan w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all" />
                    </div>
                  </Link>

                  <Link to="/hivernage-aix-les-bains" className="bg-white/5 border border-white/10 hover:border-brand-cyan/40 p-6 rounded-2xl group transition-all">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-white uppercase text-sm group-hover:text-brand-cyan transition-colors">Aix-les-Bains</h4>
                        <p className="text-xs text-gray-400 mt-1">Secteur Savoie & Lac du Bourget</p>
                      </div>
                      <ArrowRight className="text-brand-cyan w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all" />
                    </div>
                  </Link>

                  <Link to="/hivernage-geneve" className="bg-white/5 border border-white/10 hover:border-brand-cyan/40 p-6 rounded-2xl group transition-all">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-bold text-white uppercase text-sm group-hover:text-brand-cyan transition-colors">Genève</h4>
                        <p className="text-xs text-gray-400 mt-1">Confédération Suisse & Port de Genève (Leman)</p>
                      </div>
                      <ArrowRight className="text-brand-cyan w-5 h-5 opacity-40 group-hover:opacity-100 group-hover:translate-x-1.5 transition-all" />
                    </div>
                  </Link>

                  {/* STRICT DIRECTIVE: Annecy is text, no Link because this page is the Annecy Page itself! */}
                  <div className="col-span-1 sm:col-span-2 bg-ink-900 border border-brand-cyan/20 p-6 rounded-3xl">
                    <h3 className="font-bold text-base uppercase text-brand-cyan flex items-center gap-2 mb-2">
                      <MapPin className="w-4 h-4" /> Pôle Central d'Annecy (Lac d'Annecy)
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed font-medium">
                      Cette présente page est le pôle de référence principal pour toutes les municipalités et ports d'Annecy. Nous intervenons quotidiennement sans frais d'acheminement de grutage additionnels sur les communes de <strong>Annecy</strong>, <strong>Sevrier</strong>, <strong>Saint-Jorioz</strong>, <strong>Lathuile</strong>, <strong>Doussard</strong>, <strong>Talloires</strong>, <strong>Menthon-Saint-Bernard</strong> et <strong>Veyrier-du-lac</strong>.
                    </p>
                  </div>
                </div>
              </div>

              {/* Bloc 10 — Avis clients */}
              <div className="scroll-mt-36">
                <div className="mb-10 text-left">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Retours d'expérience</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight">
                    Ce que disent les propriétaires qui nous confient leur bateau
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Review 1 */}
                  <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                    <div className="flex text-brand-cyan mb-3">
                      {"★★★★★".split('').map((star, i) => <Star key={i} className="w-4 h-4 fill-brand-cyan text-brand-cyan" />)}
                    </div>
                    <p className="text-gray-300 text-xs italic leading-relaxed mb-4">
                      "C'est la troisième année que je confie mon Super Air Nautique G23 pour l'hivernage chez MotorBoat 74. Le moteur est vidangé avec un soin exceptionnel et j'aime retrouver mon intérieur absolument sec et dépoussiéré chaque printemps. Recommandation totale !"
                    </p>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      — Marc D. · Annecy, Nautique G23
                    </div>
                  </div>

                  {/* Review 2 */}
                  <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                    <div className="flex text-brand-cyan mb-3">
                      {"★★★★★".split('').map((star, i) => <Star key={i} className="w-4 h-4 fill-brand-cyan text-brand-cyan" />)}
                    </div>
                    <p className="text-gray-300 text-xs italic leading-relaxed mb-4">
                      "Un service premium très appréciable. Ils viennent récupérer mon MasterCraft directement à la place de port de Veyrier en octobre et me le remettent à l’eau nettoyé en mai. Aucun souci de remorque à gérer."
                    </p>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      — Édouard P. · Veyrier-du-lac, MasterCraft XStar
                    </div>
                  </div>

                  {/* Review 3 */}
                  <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                    <div className="flex text-brand-cyan mb-3">
                      {"★★★★★".split('').map((star, i) => <Star key={i} className="w-4 h-4 fill-brand-cyan text-brand-cyan" />)}
                    </div>
                    <p className="text-gray-300 text-xs italic leading-relaxed mb-4">
                      "Leur hangar de 3000 m² à Lathuile est gigantesque et d'une propreté exemplaire. On y stocke notre bateau en toute sécurité. Le service mécanicien officiel donne une grande valeur lors de la revente de l'unité."
                    </p>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      — Sophie B. · Sevrier, Tigé Z3
                    </div>
                  </div>

                  {/* Review 4 */}
                  <div className="bg-white/5 border border-white/5 p-6 rounded-2xl">
                    <div className="flex text-brand-cyan mb-3">
                      {"★★★★★".split('').map((star, i) => <Star key={i} className="w-4 h-4 fill-brand-cyan text-brand-cyan" />)}
                    </div>
                    <p className="text-gray-300 text-xs italic leading-relaxed mb-4">
                      "Hivernage moteur in-board fait dans les règles de l'art par un concessionnaire Nautique officiel. C'est l'atout revente indéniable qui me donne confiance."
                    </p>
                    <div className="text-xs font-bold text-white uppercase tracking-wider">
                      — Jean-Marc L. · Saint-Jorioz, Correct Craft
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloc 11 — Calendrier saisonnier (urgence) */}
              <div className="scroll-mt-36">
                <div className="mb-10 text-left">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Planification de votre saison</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight leading-tight">
                    Quand réserver votre hivernage bateau ?
                  </h2>
                </div>

                {/* Season Timeline Grid */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
                  <div className="bg-ink-900 border border-white/10 p-5 rounded-2xl text-center">
                    <div className="text-brand-cyan font-bold text-xs uppercase tracking-wider mb-2">Septembre</div>
                    <span className="block font-bold text-sm text-white uppercase leading-tight">Réservation Prioritaire</span>
                    <p className="text-[10px] text-gray-500 mt-2">Places choisies, idéal pour fixer la date de grutage idéale.</p>
                  </div>
                  <div className="bg-brand-cyan/10 border-2 border-brand-cyan p-5 rounded-2xl text-center relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-cyan text-brand-dark text-[8px] font-bold uppercase px-2 py-0.5 rounded-full tracking-widest">
                      Crucial
                    </span>
                    <div className="text-brand-cyan font-bold text-xs uppercase tracking-wider mb-2">Octobre</div>
                    <span className="block font-bold text-sm text-brand-cyan uppercase leading-tight">Dernières Places</span>
                    <p className="text-[10px] text-brand-cyan/80 mt-2">Le pic des demandes pour les retours au sec.</p>
                  </div>
                  <div className="bg-ink-900 border border-white/10 p-5 rounded-2xl text-center">
                    <div className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-2">Novembre</div>
                    <span className="block font-bold text-sm text-white uppercase leading-tight">Souvent Complet</span>
                    <p className="text-[10px] text-gray-500 mt-2">Interventions d'urgence avant le gel alpins.</p>
                  </div>
                  <div className="bg-ink-900 border border-white/10 p-5 rounded-2xl text-center">
                    <div className="text-gray-400 font-bold text-xs uppercase tracking-wider mb-2">Déc - Mars</div>
                    <span className="block font-bold text-sm text-white uppercase leading-tight">Stockage Stable</span>
                    <p className="text-[10px] text-gray-500 mt-2">Surveillance automatisée sous hangar hors-gel.</p>
                  </div>
                  <div className="bg-ink-900 border border-white/10 p-5 rounded-2xl text-center">
                    <div className="text-brand-cyan font-bold text-xs uppercase tracking-wider mb-2">Avr - Mai</div>
                    <span className="block font-bold text-sm text-white uppercase leading-tight">Mise à l'eau</span>
                    <p className="text-[10px] text-gray-500 mt-2">Remise en état et convoyage direct au ponton.</p>
                  </div>
                </div>

                <div className="mt-8 bg-ink-900 border border-brand-cyan/20 p-6 rounded-3xl text-left">
                  <div className="flex items-start gap-4">
                    <AlertTriangle className="text-brand-cyan w-8 h-8 flex-shrink-0" />
                    <div>
                      <h4 className="font-extrabold text-base uppercase text-white tracking-tight">Alerte d'échéance : Hangar en forte demande</h4>
                      <p className="text-sm text-gray-300 mt-1 leading-relaxed">
                        Pour garantir un emplacement sous notre hangar isolé de 3 000 m², nous vous conseillons vivement de <strong className="text-white">réserver votre place avant le 15 octobre</strong>. Passé ce jalon, la Haute-Savoie enregistre d'importantes chutes de température et notre hangar atteint régulièrement sa capacité d'accueil maximale.
                      </p>
                      <button
                        onClick={scrollToForm}
                        className="mt-4 bg-brand-cyan hover:bg-white text-brand-dark font-extrabold text-[10px] uppercase tracking-widest px-6 py-3 rounded-xl transition-colors"
                      >
                        Réserver ma place 2025/2026
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bloc 12 — FAQ (Schema FAQPage) */}
              <div className="scroll-mt-36">
                <div className="mb-12">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Réponses d'experts</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight">
                    Hivernage et stockage de bateau : vos questions, nos réponses
                  </h2>
                </div>

                {/* 12 Custom accordions */}
                <div className="space-y-4">
                  {faqs.map((faq, index) => {
                    const isOpen = activeFaq === index;
                    return (
                      <div 
                        key={index} 
                        className="border border-white/10 rounded-2xl overflow-hidden bg-ink-950 transition-colors"
                      >
                        <button
                          onClick={() => setActiveFaq(isOpen ? null : index)}
                          className="w-full flex items-center justify-between p-6 text-left hover:bg-white/5 transition-colors group cursor-pointer"
                        >
                          <span className="text-base font-extrabold text-white group-hover:text-brand-cyan transition-colors uppercase tracking-tight">
                            {faq.q}
                          </span>
                          <ChevronDown 
                            className={`w-5 h-5 text-brand-cyan transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`} 
                          />
                        </button>
                        <AnimatePresence initial={false}>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden bg-ink-950 border-t border-white/5"
                            >
                              <div className="p-6 text-sm text-gray-400 leading-relaxed font-light">
                                {faq.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>


            {/* RIGHT COLUMN: Sticky Form (Block 13 - CTA final) */}
            <aside 
              ref={formulationFormRef}
              className="lg:col-span-1 lg:sticky lg:top-36 bg-ink-950 border-2 border-brand-cyan/30 rounded-3xl p-8 shadow-3xl overflow-hidden"
            >
              <div className="relative">
                {/* Decorative border accent */}
                <div className="absolute top-0 left-0 w-2 h-16 bg-brand-cyan"></div>
                <div className="pl-4">
                  <h2 className="text-xl font-sans font-bold uppercase text-white tracking-tight leading-tight">
                    Réservez votre hivernage 2025/2026 dès aujourd'hui
                  </h2>
                  <p className="text-xs text-gray-400 mt-2 font-medium">
                    Complétez notre formulaire allégé en 24h. Un technicien qualifié MotorBoat 74 chiffre votre proposition sur-mesure.
                  </p>
                </div>
              </div>

              {formSubmitted ? (
                <div className="mt-8 bg-brand-cyan/10 border border-brand-cyan/20 p-6 rounded-2xl text-center">
                  <CheckCircle className="w-12 h-12 text-brand-cyan mx-auto mb-4 animate-bounce" />
                  <h3 className="text-white font-extrabold uppercase text-sm mb-2">Demande enregistrée avec succès !</h3>
                  <p className="text-xs text-gray-400 leading-relaxed">
                    Merci pour votre confiance. Notre coordinatrice technique traite vos données d’emplacement et vous adresse un devis détaillé sous 24 heures maximum de façon personnalisée.
                  </p>
                  <button 
                    onClick={() => setFormSubmitted(false)}
                    className="mt-6 text-xs text-brand-cyan font-bold uppercase hover:underline"
                  >
                    Faire une nouvelle estimation
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFormSubmit} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="nom" className="block text-[10px] font-bold uppercase tracking-widest text-mute mb-2">
                      Nom complet *
                    </label>
                    <input 
                      type="text" 
                      id="nom" 
                      name="nom" 
                      required 
                      value={formData.nom}
                      onChange={handleInputChange}
                      placeholder="Ex : Éric Dupont"
                      className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-cyan placeholder:text-gray-600 font-bold"
                    />
                  </div>

                  <div>
                    <label htmlFor="tel" className="block text-[10px] font-bold uppercase tracking-widest text-mute mb-2">
                      Numéro de téléphone *
                    </label>
                    <input 
                      type="tel" 
                      id="tel" 
                      name="tel" 
                      required 
                      value={formData.tel}
                      onChange={handleInputChange}
                      placeholder="Ex : 06 12 34 56 78"
                      className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-cyan placeholder:text-gray-600 font-bold"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-[10px] font-bold uppercase tracking-widest text-mute mb-2">
                      Adresse e-mail *
                    </label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email" 
                      required 
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Dupont@gmail.com"
                      className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-cyan placeholder:text-gray-600 font-bold"
                    />
                  </div>

                  <div>
                    <label htmlFor="modele" className="block text-[10px] font-bold uppercase tracking-widest text-mute mb-2">
                      Modèle & Longueur du bateau
                    </label>
                    <input 
                      type="text" 
                      id="modele" 
                      name="modele" 
                      value={formData.modele}
                      onChange={handleInputChange}
                      placeholder="Ex: Nautique G25 / 7,77 m"
                      className="w-full bg-ink-900 border border-white/10 rounded-xl px-4 py-3.5 text-sm text-white focus:outline-none focus:border-brand-cyan placeholder:text-gray-600 font-bold"
                    />
                  </div>

                  {/* Radio selectors for formulas */}
                  <div>
                    <span className="block text-[10px] font-bold uppercase tracking-widest text-mute mb-3">
                      Formule choisie *
                    </span>
                    <div className="space-y-2 font-bold text-sm">
                      <label className="flex items-center gap-3 bg-ink-900 border border-white/5 hover:border-brand-cyan/20 p-3 rounded-xl cursor-pointer">
                        <input 
                          type="radio" 
                          name="formule" 
                          value="Hivernage complet" 
                          checked={formData.formule === 'Hivernage complet'}
                          onChange={handleInputChange}
                          className="accent-brand-cyan h-4 w-4"
                        />
                        <span className="text-white text-xs">Hivernage Complet Tout-inclus</span>
                      </label>
                      <label className="flex items-center gap-3 bg-ink-900 border border-white/5 hover:border-brand-cyan/20 p-3 rounded-xl cursor-pointer">
                        <input 
                          type="radio" 
                          name="formule" 
                          value="Stockage seul" 
                          checked={formData.formule === 'Stockage seul'}
                          onChange={handleInputChange}
                          className="accent-brand-cyan h-4 w-4"
                        />
                        <span className="text-white text-xs">Stockage Seul Hangar Sec</span>
                      </label>
                      <label className="flex items-center gap-3 bg-ink-900 border border-white/5 hover:border-brand-cyan/20 p-3 rounded-xl cursor-pointer">
                        <input 
                          type="radio" 
                          name="formule" 
                          value="Je ne sais pas" 
                          checked={formData.formule === 'Je ne sais pas'}
                          onChange={handleInputChange}
                          className="accent-brand-cyan h-4 w-4"
                        />
                        <span className="text-white text-xs">Je ne sais pas / Besoin d'assistance</span>
                      </label>
                    </div>
                  </div>

                  {formError && (
                    <p className="text-red-400 text-xs font-bold text-center" role="alert">{formError}</p>
                  )}

                  {/* Submission Button */}
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-brand-cyan text-brand-dark font-bold uppercase py-4 rounded-xl text-xs tracking-widest hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" /> Chiffrage en cours...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Recevoir mon devis 24 h
                      </>
                    )}
                  </button>

                  {/* Form trust cues */}
                  <div className="pt-4 border-t border-white/5 text-[10px] text-gray-500 font-bold flex flex-wrap justify-between gap-y-2 uppercase">
                    <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> Données confidentielles</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Réponse sous 24 h</span>
                    <span className="flex items-center gap-1.5"><MessageCircle className="w-3 h-3" /> Devis 100% gratuit</span>
                  </div>
                </form>
              )}
            </aside>

          </div>
        </div>
      </section>

      {/* 🛠 Bloc 14 — Services complémentaires */}
      <section className="bg-ink-950 py-16 text-gray-400 text-xs font-semibold border-t border-white/5 border-b border-white/5">
        <div className="container mx-auto px-4 lg:px-8 max-w-7xl text-center">
          <p className="uppercase text-brand-cyan/50 tracking-widest text-[10px] mb-6 font-bold grid">Découvrez également nos autres services</p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-14">
            <Link to="/entretien-reparation" className="flex items-center gap-2 hover:text-brand-cyan transition-colors uppercase tracking-wider">
              <Wrench className="w-4 h-4" /> Entretien & Réparation
            </Link>
            <Link to="/depannage" className="flex items-center gap-2 hover:text-brand-cyan transition-colors uppercase tracking-wider">
              <LifeBuoy className="w-4 h-4" /> Dépannage Lac d'Annecy
            </Link>
            <Link to="/transport" className="flex items-center gap-2 hover:text-brand-cyan transition-colors uppercase tracking-wider">
              <Truck className="w-4 h-4" /> Transport Bateau Europe
            </Link>
            <Link to="/sellerie" className="flex items-center gap-2 hover:text-brand-cyan transition-colors uppercase tracking-wider">
              <Scissors className="w-4 h-4" /> Sellerie Nautique Sur-Mesure
            </Link>
            <Link to="/remorque" className="flex items-center gap-2 hover:text-brand-cyan transition-colors uppercase tracking-wider">
              <Anchor className="w-4 h-4" /> Vente de Remorques
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
