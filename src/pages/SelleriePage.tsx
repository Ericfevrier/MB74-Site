import React, { useState, useEffect, useRef } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { OtherServices } from '../components/OtherServices';
import { SITE } from '../data/site';
import { pageMeta } from '../lib/meta';
import { serviceSchema, faqSchema, breadcrumbSchema } from '../lib/schema';
import {
  Sofa,
  Scissors,
  Wrench,
  Sparkles,
  Award,
  Sun,
  Droplets,
  Ruler,
  ShieldCheck,
  MapPin,
  Phone,
  Send,
  Loader2,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  Star,
  Lock,
  Clock,
  MessageCircle,
  Anchor,
} from 'lucide-react';

const ZONES = ['Annecy', 'Aix-les-Bains', 'Thonon-les-Bains', 'Évian-les-Bains', 'Genève', 'Lac de Serre-Ponçon'];

const SIGNES = [
  { Icon: Sofa, t: 'Mousses affaissées', d: 'Assises qui ne tiennent plus, perte de confort et de maintien au fil des saisons.', fix: 'Remplacement des mousses' },
  { Icon: Scissors, t: 'Tissus abîmés', d: 'Skaï craquelé, coutures qui lâchent, fermetures défaillantes.', fix: 'Réfection sur mesure' },
  { Icon: Sun, t: 'Couleurs ternies par les UV', d: 'Le soleil alpin durcit et décolore les revêtements au fil du temps.', fix: 'Finitions anti-UV' },
  { Icon: Droplets, t: 'Humidité & moisissures', d: 'Taches, odeurs et moisissures dues aux embruns et à la condensation.', fix: 'Matériaux traités anti-humidité' },
];

const STEPS = [
  { t: 'Diagnostic & devis', d: 'On étudie votre sellerie existante, vos usages et vos envies, puis on établit un devis personnalisé et gratuit.' },
  { t: 'Choix des matières & coloris', d: 'Vous sélectionnez tissus marins, mousses et coloris parmi un large choix, avec nos conseils.' },
  { t: 'Confection sur mesure', d: 'Nos artisans partenaires fabriquent coussins et assises ajustés au millimètre à votre bateau.' },
  { t: 'Pose & ajustement à bord', d: 'Installation directe sur votre bateau, avec les ajustements esthétiques et fonctionnels nécessaires.' },
  { t: 'Contrôle & finitions', d: 'Vérification du rendu, des coutures et du confort avant la restitution de votre bateau.' },
];

const SERVICES = [
  { Icon: Scissors, t: 'Confection sur mesure', d: 'Coussins et assises fabriqués pour votre bateau, entièrement personnalisables en coloris et matières.' },
  { Icon: Wrench, t: 'Réparation & remplacement', d: 'Réparation ou remplacement de la sellerie abîmée, avec des ajustements précis pour un confort durable.' },
  { Icon: Sparkles, t: 'Rénovation complète', d: 'Remise à neuf de tout l’intérieur, en protégeant les matériaux contre l’humidité et les rayons UV.' },
];

const BENEFITS = [
  { Icon: Sofa, t: 'Confort retrouvé', d: 'Des assises refaites pour profiter pleinement de vos sorties.' },
  { Icon: Award, t: 'Matériaux de qualité', d: 'Tissus marins et mousses sélectionnés pour durer dans le temps.' },
  { Icon: ShieldCheck, t: 'Protection UV & humidité', d: 'Des finitions qui résistent au soleil alpin et aux embruns.' },
  { Icon: Sparkles, t: 'Finition artisanale', d: 'Le souci du détail d’artisans spécialisés, pour un rendu impeccable.' },
];

const FAQS = [
  {
    q: 'Quel type de bateaux pouvez-vous équiper ?',
    a: 'Nous intervenons sur tous types de bateaux, des petites embarcations de loisir aux yachts haut de gamme, en adaptant la sellerie à chaque taille et configuration.',
  },
  {
    q: 'Combien de temps prend une rénovation de sellerie ?',
    a: 'Selon l’ampleur du projet, la rénovation complète peut durer de quelques jours à quelques semaines. Un devis précis vous est fourni après étude de votre bateau et de vos besoins.',
  },
  {
    q: 'Installez-vous la sellerie directement sur le bateau ?',
    a: 'Oui, notre équipe effectue l’installation directement sur votre bateau et ajuste chaque élément pour garantir un confort optimal et un rendu esthétique parfait.',
  },
  {
    q: 'Proposez-vous une protection contre l’humidité et les UV ?',
    a: 'Absolument. Nos matériaux et finitions sont sélectionnés pour résister à l’humidité, aux UV et aux conditions nautiques, assurant la durabilité et la beauté de votre sellerie.',
  },
];

export function sellerieMeta() {
  const canonical = `${SITE.url}/sellerie`;
  return pageMeta({
    title: 'Sellerie de Bateau Sur Mesure et Rénovation | Motor Boat 74',
    description:
      "Sellerie de bateau à Annecy : confection sur mesure, réparation et rénovation complète. Matériaux marins anti-UV et anti-humidité, pose incluse. Devis gratuit.",
    canonical,
    image: `${SITE.url}/images/services/sellerie.webp`,
    robots: 'index, follow, max-image-preview:large',
    ogDescription:
      'Confection sur mesure, réparation et rénovation de sellerie nautique à Annecy. Matériaux anti-UV et anti-humidité, pose incluse.',
    geo: { region: 'FR-74', placename: 'Annecy, Haute-Savoie' },
    jsonLd: [
      serviceSchema({
        name: 'Sellerie de bateau sur mesure et rénovation',
        serviceType: 'Sellerie nautique : confection, réparation et rénovation',
        url: canonical,
        description:
          "Sellerie de bateau à Annecy : confection sur mesure, réparation, remplacement et rénovation complète de la sellerie nautique, avec des matériaux marins résistants aux UV et à l'humidité.",
        areaServed: [
          { '@type': 'City', name: 'Annecy' },
          { '@type': 'AdministrativeArea', name: 'Haute-Savoie' },
        ],
      }),
      faqSchema(FAQS),
      breadcrumbSchema([
        { name: 'Accueil', url: `${SITE.url}/` },
        { name: 'Services', url: `${SITE.url}/services` },
        { name: 'Sellerie' },
      ]),
    ],
  });
}

export function SelleriePage() {
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
        body: JSON.stringify({ ...formData, sujet: 'Sellerie de bateau' }),
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

  const inputCls =
    'w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 text-sm text-brand-dark focus:bg-white focus:outline-none focus:border-brand-cyan focus:ring-1 focus:ring-brand-cyan/20 placeholder:text-gray-400 transition font-medium';
  const labelCls = 'block text-[10px] font-bold uppercase tracking-widest text-gray-500 mb-2';

  return (
    <div className="bg-brand-light min-h-screen text-gray-700 selection:bg-brand-cyan selection:text-brand-dark">
      {/* Mobile sticky CTA */}
      <div className="lg:hidden fixed bottom-6 inset-x-0 mx-auto px-6 z-50 pointer-events-none">
        <button
          onClick={scrollToForm}
          className="w-full bg-brand-cyan text-brand-dark font-extrabold py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider active:scale-95 transition-all pointer-events-auto border border-white/20"
        >
          <Send className="w-5 h-5" /> Devis sellerie gratuit
        </button>
      </div>

      {/* 1. Hero */}
      <section className="relative min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-120px)] flex items-center justify-center pt-8 pb-10 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/services/sellerie.webp"
            alt="Sellerie de bateau sur mesure par Motor Boat 74 à Annecy"
            className="w-full h-full object-cover opacity-60 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-dark via-brand-dark/70 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/90 via-transparent to-brand-dark/30"></div>
          <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-brand-cyan/10 rounded-full blur-[150px] -mr-40 -mt-40"></div>
        </div>

        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10 text-center lg:text-left">
          <div className="max-w-4xl mx-auto lg:mx-0">
            <Breadcrumb
              className="mb-4"
              items={[{ label: 'Accueil', to: '/' }, { label: 'Services', to: '/services' }, { label: 'Sellerie' }]}
            />

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold uppercase text-white tracking-tight leading-tight mb-4">
              Sellerie de bateau <span className="text-brand-cyan">sur mesure</span> <span className="text-white/90">· confection & rénovation</span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 font-medium mb-6 max-w-2xl leading-relaxed">
              Rénover l'intérieur de votre bateau ou remplacer une sellerie usée&nbsp;? De la <strong className="text-brand-cyan">conception à la pose</strong>, MotorBoat 74 et ses artisans partenaires redonnent confort, style et protection à votre bateau.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left max-w-3xl">
              {[
                { Icon: Ruler, t: 'Sur mesure', d: 'Confection artisanale ajustée à votre bateau.' },
                { Icon: ShieldCheck, t: 'Anti-UV & humidité', d: 'Matériaux marins traités pour durer.' },
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
              <button
                onClick={scrollToForm}
                className="bg-brand-cyan text-brand-dark px-10 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white transition-all duration-300 shadow-xl shadow-brand-cyan/20 active:translate-y-1 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Devis gratuit
              </button>
              <a
                href={SITE.phoneHref}
                className="bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white/5 hover:border-brand-cyan transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4 text-brand-cyan" /> Prendre rendez-vous
              </a>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 pt-5 border-t border-white/10 text-xs font-semibold text-gray-400">
              <span className="flex items-center gap-1.5 text-white"><Star className="w-4 h-4 fill-brand-cyan text-brand-cyan" /> Artisans spécialisés</span>
              <span className="text-white">● Matériaux marins de qualité</span>
              <span className="text-white">● Tous types de bateaux</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. En bref */}
      <section aria-label="L'essentiel en bref" className="py-20 bg-brand-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-brand-cyan/10 rounded-full blur-[120px] -mr-40 -mt-40 -z-0"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
          <h2 className="sr-only">Sellerie de bateau à Annecy : l'essentiel</h2>
          <div className="rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-brand-dark/5 overflow-hidden">
            <div className="flex items-center gap-3 px-6 sm:px-10 py-4 border-b border-gray-200 bg-gray-50">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-cyan">En bref, Sellerie bateau Annecy</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 p-6 sm:p-10">
              <div>
                <p className="text-lg md:text-xl text-brand-dark leading-relaxed font-medium">
                  <strong className="text-brand-cyan">MotorBoat&nbsp;74</strong> réalise la <strong>sellerie de bateau sur mesure</strong> à Annecy : confection, réparation et rénovation complète.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4 text-sm md:text-base">
                  En partenariat avec des artisans spécialisés, nous fabriquons coussins et assises personnalisés, réparons la sellerie abîmée et rénovons l'intérieur de votre bateau, avec des matériaux marins résistants aux UV et à l'humidité. La pose est réalisée et ajustée directement à bord.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <button onClick={scrollToForm} className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-brand-dark hover:text-white transition-colors">
                    <Send className="w-4 h-4" /> Devis gratuit
                  </button>
                  <a href={SITE.phoneHref} className="inline-flex items-center gap-2 border border-gray-300 text-brand-dark font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition-colors">
                    <Phone className="w-4 h-4 text-brand-cyan" /> {SITE.phoneDisplay}
                  </a>
                </div>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 content-start">
                {[
                  { Icon: Ruler, k: 'Confection', v: 'Sur mesure, coloris & matières au choix' },
                  { Icon: Wrench, k: 'Réparation', v: 'Remplacement de sellerie abîmée' },
                  { Icon: Sparkles, k: 'Rénovation', v: 'Remise à neuf complète de l’intérieur' },
                  { Icon: ShieldCheck, k: 'Matériaux', v: 'Marins, anti-UV et anti-humidité' },
                  { Icon: Anchor, k: 'Bateaux', v: 'Du loisir au yacht haut de gamme' },
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

      {/* 3. Quand refaire sa sellerie */}
      <section className="py-24 bg-ink-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl -z-10"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-3">Signes d'usure</span>
            <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight leading-tight mb-6">
              Quand refaire la <span className="text-brand-cyan">sellerie</span> de son bateau&nbsp;?
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed">
              Soleil alpin, embruns et usage répété fatiguent la sellerie au fil des saisons. Voici les signes qui doivent vous alerter, et la solution que nous apportons.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SIGNES.map(({ Icon, t, d, fix }) => (
              <div key={t} className="bg-ink-900 border border-white/5 hover:border-brand-cyan/30 p-8 rounded-3xl transition-all hover:-translate-y-2 duration-300">
                <div className="w-14 h-14 rounded-2xl bg-brand-cyan/10 border border-brand-cyan/20 flex items-center justify-center text-brand-cyan mb-6">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-3">{t}</h3>
                <p className="text-sm text-gray-400 leading-relaxed font-light">{d}</p>
                <div className="mt-4 pt-4 border-t border-white/5 text-xs text-brand-cyan font-bold tracking-wider uppercase">
                  {fix}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Workspace : process + services + bénéfices + zones + FAQ + formulaire */}
      <section className="py-24 bg-transparent border-t border-gray-200 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            <div className="lg:col-span-2 space-y-24">
              {/* Process */}
              <div>
                <div className="mb-12">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">De la conception à la pose</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight">
                    Comment se déroule un projet de sellerie
                  </h2>
                </div>
                <div className="relative border-l border-gray-200 ml-4 md:ml-6 space-y-12 pl-8 pb-4">
                  {STEPS.map((s, i) => (
                    <div key={i} className="relative">
                      <span className="absolute -left-[44px] top-0.5 w-8 h-8 rounded-full bg-white text-brand-cyan border border-brand-cyan/40 ring-4 ring-brand-light flex items-center justify-center font-bold text-[13px] tabular-nums shadow-sm">
                        {i + 1}
                      </span>
                      <h3 className="text-lg font-bold uppercase text-brand-dark">{s.t}</h3>
                      <p className="text-sm text-gray-600 mt-2 leading-relaxed">{s.d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Services de sellerie */}
              <div>
                <div className="mb-10">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Savoir-faire artisanal</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">
                    Nos services de sellerie
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {SERVICES.map(({ Icon, t, d }) => (
                    <div key={t} className="bg-white border border-gray-200 rounded-3xl p-6">
                      <span className="w-11 h-11 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-4"><Icon className="w-5 h-5" /></span>
                      <h3 className="font-bold text-brand-dark uppercase tracking-tight text-sm mb-3">{t}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{d}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bénéfices */}
              <div>
                <div className="mb-10">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Pourquoi nous confier votre sellerie</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">
                    Confort, style et durabilité
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {BENEFITS.map(({ Icon, t, d }) => (
                    <div key={t} className="flex items-start gap-4 bg-white border border-gray-200 rounded-2xl p-5">
                      <span className="w-11 h-11 shrink-0 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center"><Icon className="w-5 h-5" /></span>
                      <div>
                        <h3 className="font-bold text-brand-dark uppercase tracking-tight text-sm mb-1">{t}</h3>
                        <p className="text-gray-600 text-sm leading-snug">{d}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zones */}
              <div>
                <div className="mb-8">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Zone d'intervention</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">
                    Sellerie de bateau en Haute-Savoie et autour des lacs
                  </h2>
                  <p className="text-gray-600 leading-relaxed mt-4 text-sm md:text-base max-w-3xl">
                    Basés près d'Annecy, nous intervenons autour du lac d'Annecy, du Léman, du lac du Bourget et dans toute la Haute-Savoie.
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
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight">
                    On répond à vos questions
                  </h2>
                </div>
                <div className="space-y-4">
                  {FAQS.map((faq, idx) => (
                    <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
                      <h3 className="m-0">
                        <button
                          onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                          className="w-full text-left p-6 flex items-center justify-between gap-4 font-medium text-base text-brand-dark hover:bg-gray-50 transition-colors"
                          aria-expanded={activeFaq === idx}
                        >
                          {faq.q}
                          <ChevronDown className={`flex-shrink-0 transition-transform duration-300 ${activeFaq === idx ? 'rotate-180 text-brand-cyan' : ''}`} />
                        </button>
                      </h3>
                      {activeFaq === idx && (
                        <div className="px-6 pb-6 text-gray-600 leading-relaxed text-sm">{faq.a}</div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Formulaire sticky (clair) */}
            <aside
              ref={formRef}
              className="lg:col-span-1 lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto hide-scrollbar bg-white border border-gray-200 ring-1 ring-black/[0.03] rounded-3xl p-8 shadow-xl shadow-gray-400/10"
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-2 h-16 bg-brand-cyan"></div>
                <div className="pl-4">
                  <h2 className="text-xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">
                    Votre projet de sellerie&nbsp;? Décrivez-le
                  </h2>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    Un devis personnalisé et gratuit, sous 24 h. Vous pouvez aussi nous appeler au{' '}
                    <a href={SITE.phoneHref} className="text-brand-cyan font-bold">{SITE.phoneDisplay}</a>.
                  </p>
                </div>
              </div>

              {formSubmitted ? (
                <div className="mt-8 bg-brand-cyan/10 border border-brand-cyan/20 p-6 rounded-2xl text-center">
                  <CheckCircle className="w-12 h-12 text-brand-cyan mx-auto mb-4" />
                  <h3 className="text-brand-dark font-extrabold uppercase text-sm mb-2">Demande envoyée !</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Merci. Nous revenons vers vous sous 24 h avec un devis personnalisé pour votre projet de sellerie.
                  </p>
                  <button onClick={() => setFormSubmitted(false)} className="mt-6 text-xs text-brand-cyan font-bold uppercase hover:underline">
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="s-nom" className={labelCls}>Nom complet *</label>
                    <input id="s-nom" name="nom" required value={formData.nom} onChange={onChange} placeholder="Ex : Éric Dupont" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="s-tel" className={labelCls}>Téléphone *</label>
                    <input id="s-tel" name="tel" type="tel" required value={formData.tel} onChange={onChange} placeholder="Ex : 06 12 34 56 78" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="s-email" className={labelCls}>Adresse e-mail *</label>
                    <input id="s-email" name="email" type="email" required value={formData.email} onChange={onChange} placeholder="jean@email.com" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="s-bateau" className={labelCls}>Modèle de bateau</label>
                    <input id="s-bateau" name="bateau" value={formData.bateau} onChange={onChange} placeholder="Ex : Nautique G23 / 7 m" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="s-msg" className={labelCls}>Votre projet *</label>
                    <textarea id="s-msg" name="message" required rows={3} value={formData.message} onChange={onChange} placeholder="Ex : refaire la banquette arrière et les coussins de proue…" className={`${inputCls} resize-none`} />
                  </div>

                  {formError && <p className="text-red-500 text-xs font-bold text-center" role="alert">{formError}</p>}

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-brand-cyan text-brand-dark font-bold uppercase py-4 rounded-xl text-xs tracking-widest hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {formLoading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Envoi…</>) : (<><Send className="w-4 h-4" /> Recevoir mon devis</>)}
                  </button>

                  <div className="pt-4 border-t border-gray-200 text-[10px] text-gray-500 font-bold flex flex-wrap justify-between gap-y-2 uppercase">
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

      {/* Nos autres services */}
      <OtherServices currentSlug="sellerie-de-bateau" />
    </div>
  );
}
