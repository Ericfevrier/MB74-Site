import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Breadcrumb } from '../components/Breadcrumb';
import { OtherServices } from '../components/OtherServices';
import { SITE } from '../data/site';
import {
  Truck,
  Globe,
  ShieldCheck,
  PackageCheck,
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

const ZONES = [
  'France entière',
  'Lacs alpins (Annecy, Léman, Bourget)',
  'Côtes méditerranéennes & atlantiques',
  'Suisse',
  'Italie',
  'Espagne',
  'Allemagne',
];

const WHY = [
  { Icon: ShieldCheck, t: 'Assurance professionnelle', d: 'Votre bateau est couvert durant le chargement, le convoyage et la livraison.' },
  { Icon: Truck, t: 'Remorques adaptées', d: 'Du semi-rigide au runabout, un matériel dimensionné pour chaque embarcation.' },
  { Icon: Globe, t: 'Partout en Europe', d: 'France, Suisse, Italie, Espagne, Allemagne… nous nous déplaçons sur demande.' },
  { Icon: PackageCheck, t: 'Convoyage soigné', d: 'Arrimage minutieux et contrôle complet avant remise en main.' },
];

const PRESTATIONS = [
  'Transport après achat ou vente de bateau',
  'Déplacement vers un chantier naval ou un atelier de réparation',
  'Livraison sur lac ou en mer',
  'Transfert entre ports ou lieux de stockage',
  'Convoyage de bateaux de toutes tailles et catégories',
];

const STEPS = [
  { t: 'Demande de devis', d: 'Vous remplissez notre formulaire pour obtenir un tarif personnalisé.' },
  { t: 'Planification du trajet', d: 'Nous organisons l’itinéraire selon vos disponibilités et vos besoins.' },
  { t: 'Chargement sécurisé', d: 'Votre bateau est arrimé et protégé avec le plus grand soin.' },
  { t: 'Transport & livraison', d: 'Nous acheminons votre navire dans les délais fixés ensemble.' },
  { t: 'Vérification & remise en main', d: 'Contrôle complet avant de vous restituer votre bateau en parfait état.' },
];

const FAQS = [
  {
    q: 'Quel est le prix pour transporter un bateau ?',
    a: 'Le prix dépend de la distance, de la taille et du poids de l’embarcation, de la zone (France ou Europe) et du type de service. Remplissez notre formulaire pour obtenir un devis précis et personnalisé.',
  },
  {
    q: 'Transportez-vous des bateaux partout en France ?',
    a: 'Oui, dans toute la France : des lacs alpins comme Annecy ou le Léman jusqu’aux côtes méditerranéennes et atlantiques. Nous intervenons aussi en Suisse, Italie, Espagne, Allemagne et dans le reste de l’Europe sur demande.',
  },
  {
    q: 'Quels types de bateaux pouvez-vous transporter ?',
    a: 'Wakeboard, wakesurf, ski nautique, semi-rigides, coques open, petits voiliers et jet-skis. Nos remorques adaptées garantissent un convoyage sécurisé quelle que soit la configuration du bateau.',
  },
  {
    q: 'Le transport est-il assuré ?',
    a: 'Oui, tous nos transports sont couverts par une assurance professionnelle qui protège votre bateau contre les éventuels dommages durant le chargement, le convoyage et la livraison.',
  },
];

export function TransportPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ nom: '', tel: '', email: '', trajet: '', message: '' });

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
        body: JSON.stringify({ ...formData, sujet: 'Transport de bateau' }),
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

  const canonical = `${SITE.url}/transport`;
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
    name: 'Transport de bateau en France et en Europe',
    serviceType: 'Transport et convoyage de bateau',
    provider: business,
    areaServed: [{ '@type': 'Country', name: 'France' }, { '@type': 'Place', name: 'Europe' }],
    url: canonical,
    description:
      "Transport de bateau partout en France et en Europe : convoyage sécurisé après achat ou vente, transfert entre ports, livraison sur lac ou en mer, avec véhicules et remorques adaptés.",
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
      { '@type': 'ListItem', position: 3, name: 'Transport' },
    ],
  };

  const inputCls =
    'w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-brand-dark focus:bg-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/20 placeholder:text-gray-400 transition font-medium';
  const labelCls = 'block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2';

  return (
    <div className="bg-brand-light min-h-screen text-gray-700 selection:bg-brand-cyan selection:text-brand-dark">
      <Helmet>
        <title>Transport de Bateau en France et Europe | Motor Boat 74</title>
        <meta name="description" content="Transport de bateau partout en France et en Europe : convoyage sécurisé, assurance pro, remorques adaptées. Service clé en main. Devis personnalisé." />
        <link rel="canonical" href={canonical} />
        <meta name="robots" content="index, follow, max-image-preview:large" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Transport de bateau en France et en Europe | Motor Boat 74" />
        <meta property="og:description" content="Convoyage sécurisé de bateau, assurance pro, remorques adaptées, partout en France et en Europe." />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE.url}/images/services/transport.webp`} />
        <script type="application/ld+json">{JSON.stringify(schemaService)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      <div className="lg:hidden fixed bottom-6 inset-x-0 mx-auto px-6 z-50 pointer-events-none">
        <button onClick={scrollToForm} className="w-full bg-brand-cyan text-brand-dark font-extrabold py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider active:scale-95 transition-all pointer-events-auto border border-white/20">
          <Send className="w-5 h-5" /> Devis transport
        </button>
      </div>

      {/* Hero */}
      <section className="relative min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-120px)] flex items-center justify-center pt-8 pb-10 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img src="/images/services/transport.webp" alt="Transport de bateau en France et en Europe par Motor Boat 74" className="w-full h-full object-cover opacity-60 scale-105" referrerPolicy="no-referrer" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-brand-dark/30"></div>
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-brand-cyan/10 rounded-full blur-[150px] -mr-40 -mt-40"></div>
        </div>
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10 text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <Breadcrumb className="mb-4" items={[{ label: 'Accueil', to: '/' }, { label: 'Services', to: '/services' }, { label: 'Transport' }]} />
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold uppercase text-white tracking-tight leading-tight mb-4">
              Transport de bateau en <span className="text-brand-cyan">France</span> et en Europe
            </h1>
            <p className="text-base md:text-lg text-gray-300 font-medium mb-6 max-w-2xl leading-relaxed">
              Achat, vente ou simple déplacement&nbsp;? MotorBoat 74 assure le <strong className="text-brand-cyan">convoyage sécurisé</strong> de votre bateau, avec véhicules et remorques adaptés, <strong className="text-white">partout en France et en Europe</strong>.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left max-w-3xl">
              {[
                { Icon: Globe, t: 'France & Europe', d: 'Convoyage partout en France et en Europe.' },
                { Icon: ShieldCheck, t: 'Assurance pro', d: 'Bateau couvert du chargement à la livraison.' },
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
                <Send className="w-4 h-4" /> Obtenir un devis
              </button>
              <a href={SITE.phoneHref} className="bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white/5 hover:border-brand-cyan transition-all duration-300 flex items-center justify-center gap-2">
                <Phone className="w-4 h-4 text-brand-cyan" /> Nous appeler
              </a>
            </div>
            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 pt-5 border-t border-white/10 text-xs font-semibold text-gray-400">
              <span className="flex items-center gap-1.5 text-white"><Star className="w-4 h-4 fill-brand-cyan text-brand-cyan" /> Service clé en main</span>
              <span className="text-white">● Remorques adaptées à chaque bateau</span>
              <span className="text-white">● Toutes tailles & catégories</span>
            </div>
          </div>
        </div>
      </section>

      {/* En bref */}
      <section aria-label="L'essentiel en bref" className="py-20 bg-brand-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-brand-cyan/10 rounded-full blur-[120px] -mr-40 -mt-40 -z-0"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
          <h2 className="sr-only">Transport de bateau en France et en Europe : l'essentiel</h2>
          <div className="rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-brand-dark/5 overflow-hidden">
            <div className="flex items-center gap-3 px-6 sm:px-10 py-4 border-b border-gray-200 bg-gray-50">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-cyan">En bref, Transport de bateau</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 p-6 sm:p-10">
              <div>
                <p className="text-lg md:text-xl text-brand-dark leading-relaxed font-medium">
                  <strong className="text-brand-cyan">MotorBoat&nbsp;74</strong> assure le <strong>transport de bateau partout en France et en Europe</strong>.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4 text-sm md:text-base">
                  Service clé en main pour un achat, une vente, une mise à l'eau ou un transfert entre ports : nous chargeons, arrimons et convoyons votre bateau en toute sécurité grâce à des véhicules et remorques adaptés, avec assurance professionnelle.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <button onClick={scrollToForm} className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-brand-dark hover:text-white transition-colors">
                    <Send className="w-4 h-4" /> Obtenir un devis
                  </button>
                  <a href={SITE.phoneHref} className="inline-flex items-center gap-2 border border-gray-300 text-brand-dark font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition-colors">
                    <Phone className="w-4 h-4 text-brand-cyan" /> {SITE.phoneDisplay}
                  </a>
                </div>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 content-start">
                {[
                  { Icon: Globe, k: 'Couverture', v: 'France entière & Europe' },
                  { Icon: ShieldCheck, k: 'Assurance', v: 'Pro, du chargement à la livraison' },
                  { Icon: Truck, k: 'Matériel', v: 'Remorques adaptées à chaque bateau' },
                  { Icon: PackageCheck, k: 'Convoyage', v: 'Arrimage soigné & contrôle' },
                  { Icon: Anchor, k: 'Bateaux', v: 'Toutes tailles & catégories' },
                  { Icon: Clock, k: 'Devis', v: 'Personnalisé sur demande' },
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

      {/* Garanties */}
      <section className="py-24 bg-ink-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl -z-10"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-3">Vos garanties</span>
            <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight leading-tight mb-6">
              Un transport <span className="text-brand-cyan">sûr</span> et sans souci
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed">
              Votre bateau est un bien précieux : nous le traitons comme tel, du chargement jusqu'à la remise en main, partout en France et en Europe.
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
              {/* Prestations */}
              <div>
                <div className="mb-10">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Service clé en main</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">
                    Quand faire appel à notre service de transport
                  </h2>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {PRESTATIONS.map((p) => (
                    <li key={p} className="flex items-start gap-3 bg-white border border-gray-200 rounded-2xl p-5 text-sm text-gray-700">
                      <CheckCircle className="w-5 h-5 text-brand-cyan flex-shrink-0 mt-0.5" /> {p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Process */}
              <div>
                <div className="mb-12">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Étape par étape</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight">
                    Comment se déroule le transport
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
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Où nous intervenons</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">
                    De la Haute-Savoie à toute l'Europe
                  </h2>
                  <p className="text-gray-600 leading-relaxed mt-4 text-sm md:text-base max-w-3xl">
                    Basés près d'Annecy, nous convoyons votre bateau depuis les lacs alpins vers n'importe quelle destination en France et en Europe, et inversement.
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
                  <h2 className="text-xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">Un transport à organiser&nbsp;?</h2>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    Devis personnalisé selon le trajet et le bateau. Vous pouvez aussi nous appeler au{' '}
                    <a href={SITE.phoneHref} className="text-brand-cyan font-bold">{SITE.phoneDisplay}</a>.
                  </p>
                </div>
              </div>
              {formSubmitted ? (
                <div className="mt-8 bg-brand-cyan/10 border border-brand-cyan/20 p-6 rounded-2xl text-center">
                  <CheckCircle className="w-12 h-12 text-brand-cyan mx-auto mb-4" />
                  <h3 className="text-brand-dark font-extrabold uppercase text-sm mb-2">Demande envoyée !</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">Merci. Nous revenons vers vous rapidement avec un devis personnalisé pour votre transport.</p>
                  <button onClick={() => setFormSubmitted(false)} className="mt-6 text-xs text-brand-cyan font-bold uppercase hover:underline">Envoyer une autre demande</button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-5">
                  <div><label htmlFor="t-nom" className={labelCls}>Nom complet *</label><input id="t-nom" name="nom" required value={formData.nom} onChange={onChange} placeholder="Ex : Éric Dupont" className={inputCls} /></div>
                  <div><label htmlFor="t-tel" className={labelCls}>Téléphone *</label><input id="t-tel" name="tel" type="tel" required value={formData.tel} onChange={onChange} placeholder="Ex : 06 12 34 56 78" className={inputCls} /></div>
                  <div><label htmlFor="t-email" className={labelCls}>Adresse e-mail *</label><input id="t-email" name="email" type="email" required value={formData.email} onChange={onChange} placeholder="jean@email.com" className={inputCls} /></div>
                  <div><label htmlFor="t-trajet" className={labelCls}>Départ → arrivée</label><input id="t-trajet" name="trajet" value={formData.trajet} onChange={onChange} placeholder="Ex : Annecy → La Rochelle" className={inputCls} /></div>
                  <div><label htmlFor="t-msg" className={labelCls}>Votre bateau & besoin *</label><textarea id="t-msg" name="message" required rows={3} value={formData.message} onChange={onChange} placeholder="Ex : runabout 7 m sur remorque, à convoyer fin juin…" className={`${inputCls} resize-none`} /></div>
                  {formError && <p className="text-red-500 text-xs font-bold text-center" role="alert">{formError}</p>}
                  <button type="submit" disabled={formLoading} className="w-full bg-brand-cyan text-brand-dark font-bold uppercase py-4 rounded-xl text-xs tracking-widest hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2">
                    {formLoading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Envoi…</>) : (<><Send className="w-4 h-4" /> Recevoir mon devis</>)}
                  </button>
                  <div className="pt-4 border-t border-gray-200 text-[10px] text-gray-500 font-bold flex flex-wrap justify-between gap-y-2 uppercase">
                    <span className="flex items-center gap-1.5"><Lock className="w-3 h-3" /> Données confidentielles</span>
                    <span className="flex items-center gap-1.5"><ShieldCheck className="w-3 h-3" /> Transport assuré</span>
                    <span className="flex items-center gap-1.5"><MessageCircle className="w-3 h-3" /> Devis gratuit</span>
                  </div>
                </form>
              )}
            </aside>
          </div>
        </div>
      </section>

      <OtherServices currentSlug="transport-de-bateau" />
    </div>
  );
}
