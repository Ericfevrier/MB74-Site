import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '../components/Breadcrumb';
import { OtherServices } from '../components/OtherServices';
import { SITE } from '../data/site';
import {
  Caravan,
  ShieldCheck,
  Ruler,
  Award,
  Wrench,
  Anchor,
  MapPin,
  Phone,
  Send,
  Loader2,
  CheckCircle,
  ChevronDown,
  Star,
  Lock,
  Clock,
  MessageCircle,
} from 'lucide-react';

const ZONES = ['Annecy', 'Lac d’Annecy', 'Lac du Bourget', 'Léman', 'Haute-Savoie'];

const WHY = [
  { Icon: ShieldCheck, t: 'Sécurité avant tout', d: 'Des remorques fiables et homologuées CE pour transporter sereinement.' },
  { Icon: Ruler, t: 'Parfaitement adaptée', d: 'Dimensionnée selon la taille et le poids exact de votre bateau.' },
  { Icon: Award, t: 'Marques partenaires', d: 'Une sélection de fabricants reconnus pour leur durabilité.' },
  { Icon: Wrench, t: 'Prête à l’emploi', d: 'Réglage, contrôle et conseils de mise à l’eau inclus.' },
];

const CARACT = [
  'Remorques simples ou doubles essieux, freinées',
  'Adaptées wake, pêche, ski nautique',
  'Homologation CE',
  'Réglage et mise à l’eau inclus',
];

const STEPS = [
  { t: 'Conseil personnalisé', d: 'On étudie votre bateau, vos trajets et votre fréquence d’utilisation pour cibler la bonne remorque.' },
  { t: 'Sélection de la remorque', d: 'Nous choisissons le modèle adapté parmi nos marques partenaires, dimensionné à votre embarcation.' },
  { t: 'Réglage & contrôle', d: 'Réglage des supports, vérification des feux, freins et organes de sécurité avant remise.' },
  { t: 'Retrait ou livraison', d: 'Vous récupérez votre remorque prête à l’emploi, avec nos conseils de mise à l’eau.' },
];

const FAQS = [
  {
    q: 'Comment choisir la bonne remorque pour mon bateau ?',
    a: 'Notre équipe vous accompagne pour sélectionner une remorque selon la taille de votre bateau, sa fréquence d’utilisation et vos trajets, pour un transport sécurisé et durable.',
  },
  {
    q: 'Proposez-vous l’installation et la préparation à l’usage ?',
    a: 'Oui, nous préparons et ajustons chaque remorque pour qu’elle soit prête à l’emploi, avec un contrôle complet des équipements et des conseils pour un transport optimal.',
  },
  {
    q: 'Où obtenir une remorque sur mesure à Annecy ou en Haute-Savoie ?',
    a: 'MotorBoat 74 propose des remorques sur mesure, adaptées à vos besoins, disponibles pour retrait ou livraison à Annecy et dans toute la Haute-Savoie.',
  },
  {
    q: 'Quels sont vos horaires ?',
    a: 'Nous intervenons 7j/7 en période estivale, de 8h00 à 20h00. En cas d’urgence, contactez-nous : nous faisons notre maximum pour vous assister rapidement.',
  },
];

export function RemorquesPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ nom: '', tel: '', email: '', bateau: '', message: '' });

  const formRef = useRef<HTMLDivElement>(null);
  const scrollToForm = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormLoading(true);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, sujet: 'Remorque de bateau' }),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || (json && json.ok === false)) throw new Error('send_failed');
      setFormSubmitted(true);
    } catch {
      setFormError(`L'envoi a échoué. Appelez-nous au ${SITE.phoneDisplay}.`);
    } finally {
      setFormLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const canonical = `${SITE.url}/remorques`;
  const business = {
    '@type': 'LocalBusiness',
    '@id': `${SITE.url}/#business`,
    name: SITE.name,
    telephone: SITE.phoneHref.replace('tel:', ''),
    email: SITE.email,
    url: SITE.url,
    address: {
      '@type': 'PostalAddress',
      streetAddress: SITE.addressStreet,
      postalCode: SITE.addressPostal,
      addressLocality: SITE.addressLocality,
      addressRegion: SITE.addressRegion,
      addressCountry: SITE.addressCountry,
    },
  };
  const schemaService = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Remorques de bateau sur mesure à Annecy',
    serviceType: 'Vente et préparation de remorques de bateau',
    provider: business,
    areaServed: [{ '@type': 'City', name: 'Annecy' }, { '@type': 'AdministrativeArea', name: 'Haute-Savoie' }],
    url: canonical,
    description:
      "Remorques de bateau sur mesure à Annecy et en Haute-Savoie : remorques homologuées CE, simples ou doubles essieux freinées, adaptées à chaque bateau, réglage et mise à l'eau inclus.",
  };
  const schemaFAQ = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQS.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
  };
  const schemaBreadcrumb = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/` },
      { '@type': 'ListItem', position: 2, name: 'Services', item: `${SITE.url}/services` },
      { '@type': 'ListItem', position: 3, name: 'Remorques' },
    ],
  };

  const inputCls =
    'w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-brand-dark focus:bg-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/20 placeholder:text-gray-400 transition font-medium';
  const labelCls = 'block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2';

  return (
    <div className="bg-brand-light min-h-screen text-gray-700 selection:bg-brand-cyan selection:text-brand-dark">
      <Helmet>
        <title>Remorques de Bateau Sur Mesure Haute-Savoie | Motor Boat 74</title>
        <meta name="description" content="Remorques de bateau sur mesure à Annecy et en Haute-Savoie : homologuées CE, adaptées à votre bateau, réglage et mise à l'eau inclus. Demandez conseil." />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta name="geo.region" content="FR-74" />
        <meta name="geo.placename" content="Annecy, Haute-Savoie" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Remorques de bateau sur mesure en Haute-Savoie | Motor Boat 74" />
        <meta property="og:description" content="Remorques homologuées CE, adaptées à chaque bateau, réglage et mise à l'eau inclus. À Annecy et en Haute-Savoie." />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE.url}/images/services/remorques.webp`} />
        <script type="application/ld+json">{JSON.stringify(schemaService)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      <div className="lg:hidden fixed bottom-6 inset-x-0 mx-auto px-6 z-50 pointer-events-none">
        <button onClick={scrollToForm} className="w-full bg-brand-cyan text-brand-dark font-extrabold py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider active:scale-95 transition-all pointer-events-auto border border-white/20">
          <Send className="w-5 h-5" /> Demander conseil
        </button>
      </div>

      {/* Hero */}
      <section className="relative min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-120px)] flex items-center justify-center pt-8 pb-10 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img src="/images/services/remorques.webp" alt="Remorques de bateau sur mesure par Motor Boat 74 en Haute-Savoie" className="w-full h-full object-cover opacity-60 scale-105" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-brand-dark/30"></div>
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-brand-cyan/10 rounded-full blur-[150px] -mr-40 -mt-40"></div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10 text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <Breadcrumb className="mb-4" items={[{ label: 'Accueil', to: '/' }, { label: 'Services', to: '/services' }, { label: 'Remorques' }]} />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold uppercase text-white tracking-tight leading-tight mb-4">
              Remorques de bateau <span className="text-brand-cyan">sur mesure</span>
            </h1>
            <p className="text-base md:text-lg text-gray-300 font-medium mb-6 max-w-2xl leading-relaxed">
              Trouvez la remorque parfaite pour transporter votre bateau en toute sécurité. MotorBoat 74 sélectionne, règle et prépare une remorque <strong className="text-brand-cyan">homologuée CE</strong>, <strong className="text-white">parfaitement adaptée</strong> à votre embarcation.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left max-w-3xl">
              {[
                { Icon: ShieldCheck, t: 'Homologuées CE', d: 'Des remorques fiables et conformes.' },
                { Icon: Ruler, t: 'Sur mesure', d: 'Dimensionnée selon votre bateau.' },
              ].map(({ Icon, t, d }, i) => (
                <div key={i} className="flex items-start gap-4 bg-white/5 border border-white/10 p-4 rounded-2xl backdrop-blur-sm transition-colors hover:bg-white/10 group">
                  <Icon className="text-brand-cyan w-8 h-8 flex-shrink-0 group-hover:scale-110 transition-transform" />
                  <div>
                    <p className="font-bold text-white text-base uppercase tracking-tight">{t}</p>
                    <p className="text-xs text-gray-400 mt-1 font-medium">{d}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <button onClick={scrollToForm} className="bg-brand-cyan text-brand-dark px-10 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white transition-all duration-300 shadow-xl shadow-brand-cyan/20 active:translate-y-1 flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Demander conseil
              </button>
              <a href={SITE.phoneHref} className="bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white/5 hover:border-brand-cyan transition-all duration-300 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-brand-cyan" /> Nous appeler
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 pt-5 border-t border-white/10 text-xs font-semibold text-gray-400">
              <span className="flex items-center gap-1.5 text-white"><Star className="w-4 h-4 fill-brand-cyan text-brand-cyan" /> Marques partenaires reconnues</span>
              <span className="text-white">● Réglage & mise à l’eau inclus</span>
              <span className="text-white">● Conseil personnalisé</span>
            </div>
          </div>
        </div>
      </section>

      {/* En bref */}
      <section aria-label="L'essentiel en bref" className="py-20 bg-brand-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-brand-cyan/10 rounded-full blur-[120px] -mr-40 -mt-40 -z-0"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
          <h2 className="sr-only">Remorques de bateau sur mesure en Haute-Savoie : l'essentiel</h2>
          <div className="rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-brand-dark/5 overflow-hidden">
            <div className="flex items-center gap-3 px-6 sm:px-10 py-4 border-b border-gray-200 bg-gray-50">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-cyan">En bref, Remorques bateau Annecy</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 p-6 sm:p-10">
              <div>
                <p className="text-lg md:text-xl text-brand-dark leading-relaxed font-medium">
                  <strong className="text-brand-cyan">MotorBoat&nbsp;74</strong> propose des <strong>remorques de bateau sur mesure</strong> à Annecy et en Haute-Savoie.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4 text-sm md:text-base">
                  Remorques homologuées CE, simples ou doubles essieux freinées, adaptées au wake, à la pêche ou au ski nautique. Nous sélectionnons le modèle dimensionné à votre bateau parmi nos marques partenaires, et nous l'ajustons, prête à l'emploi.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <button onClick={scrollToForm} className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-brand-dark hover:text-white transition-colors">
                    <Send className="w-4 h-4" /> Demander conseil
                  </button>
                  <a href={SITE.phoneHref} className="inline-flex items-center gap-2 border border-gray-300 text-brand-dark font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition-colors">
                    <Phone className="w-4 h-4 text-brand-cyan" /> {SITE.phoneDisplay}
                  </a>
                </div>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 content-start">
                {[
                  { Icon: ShieldCheck, k: 'Homologation', v: 'Norme CE' },
                  { Icon: Ruler, k: 'Sur mesure', v: 'Selon taille & poids du bateau' },
                  { Icon: Award, k: 'Marques', v: 'Partenaires reconnues' },
                  { Icon: Wrench, k: 'Prête à l’emploi', v: 'Réglage & mise à l’eau' },
                  { Icon: Anchor, k: 'Usages', v: 'Wake, pêche, ski nautique' },
                  { Icon: MapPin, k: 'Zone', v: 'Annecy & Haute-Savoie' },
                ].map(({ Icon, k, v }) => (
                  <div key={k} className="flex items-start gap-3 border-l-2 border-brand-cyan/40 pl-4">
                    <Icon className="w-4 h-4 text-brand-cyan mt-1 flex-shrink-0" />
                    <div>
                      <dt className="text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">{k}</dt>
                      <dd className="text-sm font-semibold text-brand-dark leading-snug mt-0.5">{v}</dd>
                    </div>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Pourquoi */}
      <section className="py-24 bg-ink-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl -z-10"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-3">Voyagez l'esprit tranquille</span>
            <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight leading-tight mb-6">
              Pourquoi choisir votre remorque <span className="text-brand-cyan">chez nous</span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed">
              Une remorque bien choisie et bien réglée, c'est la garantie d'un transport sûr, et d'un bateau qui reste en parfait état sur la route comme à la mise à l'eau.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WHY.map(({ Icon, t, d }) => (
              <div key={t} className="bg-ink-900 border border-white/5 hover:border-brand-cyan/30 p-8 rounded-3xl transition-all hover:-translate-y-2 duration-300">
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-6"><Icon className="w-6 h-6" /></div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-3">{t}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Workspace */}
      <section className="py-24 bg-transparent border-t border-gray-200 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-24">
              {/* Caractéristiques */}
              <div>
                <div className="mb-10">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">La remorque qu’il vous faut</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">
                    Des remorques adaptées à chaque bateau
                  </h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {CARACT.map((c) => (
                    <li key={c} className="flex items-start gap-3 bg-white border border-gray-200 rounded-2xl p-5 text-sm text-gray-700">
                      <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" /> {c}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div>
                <div className="mb-12">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Du conseil à la mise à l’eau</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight">
                    Comment on choisit votre remorque
                  </h2>
                </div>
                <div className="relative border-l border-gray-200 ml-4 md:ml-6 space-y-12 pl-8 pb-4">
                  {STEPS.map((s, i) => (
                    <div key={i} className="relative">
                      <span className="absolute -left-[44px] top-0.5 w-8 h-8 rounded-full bg-white text-brand-cyan border border-brand-cyan/40 ring-4 ring-brand-light flex items-center justify-center font-bold text-[13px] tabular-nums shadow-sm">{i + 1}</span>
                      <h3 className="text-lg font-bold uppercase text-brand-dark">{s.t}</h3>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zones */}
              <div>
                <div className="mb-8">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Zone d'intervention</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">
                    À Annecy et dans toute la Haute-Savoie
                  </h2>
                  <p className="text-gray-600 leading-relaxed mt-4 text-sm md:text-base max-w-3xl">
                    Remorques disponibles pour retrait ou livraison à Annecy et autour des lacs alpins.
                  </p>
                </div>
                <ul role="list" className="flex flex-wrap gap-2.5">
                  {ZONES.map((z) => (
                    <li key={z} className="inline-flex items-center gap-1.5 bg-white border border-gray-200 text-brand-dark text-xs font-semibold px-4 py-2 rounded-full">
                      <MapPin className="w-3.5 h-3.5 text-brand-cyan" /> {z}
                    </li>
                  ))}
                </ul>
              </div>

              {/* FAQ */}
              <div>
                <div className="mb-10">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Questions fréquentes</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight">On répond à vos questions</h2>
                </div>
                <div className="space-y-4">
                  {FAQS.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                      <h3 className="m-0">
                        <button onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} className="w-full text-left p-6 flex items-center justify-between gap-4 font-medium text-base text-brand-dark hover:bg-gray-50 transition-colors" aria-expanded={activeFaq === idx}>
                          {faq.q}
                          <ChevronDown className={`flex-shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-brand-cyan' : ''}`} />
                        </button>
                      </h3>
                      {activeFaq === idx && <div className="px-6 pb-6 text-gray-600 leading-relaxed text-sm">{faq.a}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulaire */}
            <aside ref={formRef} className="lg:col-span-1 lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto hide-scrollbar bg-white border border-gray-200 ring-1 ring-black/[0.03] rounded-3xl p-8 shadow-xl shadow-gray-400/10">
              <div className="relative">
                <div className="absolute top-0 left-0 w-2 h-16 bg-brand-cyan"></div>
                <div className="pl-4">
                  <h2 className="text-xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">Besoin d’une remorque&nbsp;?</h2>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    Dites-nous quel bateau vous voulez transporter, on vous conseille la bonne remorque. Ou appelez le{' '}
                    <a href={SITE.phoneHref} className="text-brand-cyan font-bold">{SITE.phoneDisplay}</a>.
                  </p>
                </div>
              </div>
              {formSubmitted ? (
                <div className="mt-8 bg-brand-cyan/10 border border-brand-cyan/20 p-6 rounded-2xl text-center">
                  <CheckCircle className="w-12 h-12 text-brand-cyan mx-auto mb-4" />
                  <h3 className="text-brand-dark font-extrabold uppercase text-sm mb-2">Demande envoyée !</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Merci. Nous revenons vers vous rapidement pour vous conseiller la remorque adaptée à votre bateau.</p>
                  <button onClick={() => setFormSubmitted(false)} className="mt-6 text-xs text-brand-cyan font-bold uppercase hover:underline">Envoyer une autre demande</button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-5">
                  <div><label htmlFor="r-nom" className={labelCls}>Nom complet *</label><input id="r-nom" name="nom" required value={formData.nom} onChange={onChange} placeholder="Ex : Éric Dupont" className={inputCls} /></div>
                  <div><label htmlFor="r-tel" className={labelCls}>Téléphone *</label><input id="r-tel" name="tel" type="tel" required value={formData.tel} onChange={onChange} placeholder="Ex : 06 12 34 56 78" className={inputCls} /></div>
                  <div><label htmlFor="r-email" className={labelCls}>Adresse e-mail *</label><input id="r-email" name="email" type="email" required value={formData.email} onChange={onChange} placeholder="jean@email.com" className={inputCls} /></div>
                  <div><label htmlFor="r-bateau" className={labelCls}>Bateau à transporter</label><input id="r-bateau" name="bateau" value={formData.bateau} onChange={onChange} placeholder="Ex : runabout 7 m, ~1 800 kg" className={inputCls} /></div>
                  <div><label htmlFor="r-msg" className={labelCls}>Votre besoin *</label><textarea id="r-msg" name="message" required rows={3} value={formData.message} onChange={onChange} placeholder="Ex : remorque double essieu freinée pour wakeboat…" className={`${inputCls} resize-none`} /></div>
                  {formError && <p className="text-red-500 text-xs font-bold text-center" role="alert">{formError}</p>}
                  <button type="submit" disabled={formLoading} className="w-full bg-brand-cyan text-brand-dark font-bold uppercase py-4 rounded-xl text-xs tracking-widest hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                    {formLoading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Envoi…</>) : (<><Send className="w-4 h-4" /> Demander conseil</>)}
                  </button>
                  <div className="pt-4 border-t border-gray-200 text-[10px] text-gray-500 font-bold flex flex-wrap justify-between gap-y-2 uppercase">
                    <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> Données confidentielles</span>
                    <span className="flex items-center gap-1.5"><Clock className="w-3 h-3" /> Réponse rapide</span>
                    <span className="flex items-center gap-1.5"><MessageCircle className="w-3 h-3" /> Sans engagement</span>
                  </div>
                </form>
              )}
            </aside>
          </div>
        </div>
      </section>

      <OtherServices currentSlug="remorques-de-bateau" />
    </div>
  );
}
