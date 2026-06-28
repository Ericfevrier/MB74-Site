import React, { useState, useEffect, useRef } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { OtherServices } from '../components/OtherServices';
import { SITE } from '../data/site';
import { pageMeta } from '../lib/meta';
import { serviceSchema, faqSchema, breadcrumbSchema } from '../lib/schema';
import {
  Wrench,
  Zap,
  Ship,
  Clock,
  MapPin,
  Phone,
  Send,
  Loader2,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  PackageCheck,
  LifeBuoy,
  ShieldCheck,
  Anchor,
  BatteryWarning,
  Star,
  Lock,
  MessageCircle,
} from 'lucide-react';

const ZONES: { name: string; desc: string }[] = [
  { name: 'Annecy', desc: 'Au cœur de la ville, port de l’Évêché, Marquisats et canal du Vassé : nous rejoignons votre bateau en quelques minutes pour le dépanner ou le remorquer.' },
  { name: 'Annecy-le-Vieux', desc: 'Plage et port d’Albigny : prise en charge rapide d’une panne sur toute la rive nord-est du lac.' },
  { name: 'Veyrier-du-Lac', desc: 'Port de Veyrier et rive est, au pied du Mont Veyrier : un secteur passant que nous connaissons parfaitement pour intervenir vite.' },
  { name: 'Menthon-Saint-Bernard', desc: 'Petit port sous le château de Menthon, à l’accès délicat : nous y intervenons en sécurité, à flot ou par remorquage.' },
  { name: 'Talloires-Montmin', desc: 'Baie de Talloires et ses roselières, peu profonde par endroits : nous adaptons l’approche pour vous récupérer sans risque.' },
  { name: 'Duingt', desc: 'Défilé de Duingt, passage étroit entre grand et petit lac : un secteur que nous maîtrisons pour remorquer en toute sécurité.' },
  { name: 'Saint-Jorioz', desc: 'Grande plage et roselières de la rive ouest : dépannage et assistance sur tout le secteur jusqu’à la base nautique.' },
  { name: 'Sevrier', desc: 'Port de Sevrier, rive ouest : à quelques minutes de notre base, l’un de nos délais d’intervention les plus courts.' },
  { name: 'Doussard', desc: 'Bout du lac et réserve naturelle, près de l’embouchure de l’Eau Morte : zone sud peu profonde où nous intervenons avec précaution.' },
];

const STEPS = [
  { t: 'Votre appel d’urgence', d: 'Vous nous appelez ou remplissez le formulaire. On identifie immédiatement le type de panne et votre position sur le lac.' },
  { t: 'Localisation & départ', d: 'Notre technicien localise votre embarcation et part vers vous avec le bateau-atelier équipé.' },
  { t: 'Intervention sur l’eau', d: 'Diagnostic et réparation directement à flot quand c’est possible : moteur, batterie, circuit électrique, hélice.' },
  { t: 'Remorquage si besoin', d: 'Pour une panne majeure, nous sécurisons et remorquons votre bateau jusqu’à notre atelier ou au port le plus proche.' },
  { t: 'Remise en route', d: 'Contrôle final, vérification de sécurité et reprise de la navigation, ou prise en charge atelier pour les réparations lourdes.' },
];

const BREAKDOWNS = [
  { Icon: Wrench, t: 'Panne moteur', d: 'Refus de démarrage, surchauffe, perte de puissance hors-bord ou in-board.', fix: 'Diagnostic & réparation à flot' },
  { Icon: BatteryWarning, t: 'Panne électrique', d: 'Batterie déchargée, alternateur HS, coupure d’allumage ou d’électronique.', fix: 'Contrôle batterie / alternateur' },
  { Icon: Anchor, t: 'Hélice & propulsion', d: 'Hélice endommagée, transmission bloquée, prise dans un obstacle.', fix: 'Dégagement & remise en état' },
  { Icon: LifeBuoy, t: 'Bateau immobilisé', d: 'Échouement, dérive ou impossibilité de rejoindre le port par vos moyens.', fix: 'Sécurisation & remorquage' },
];

const FAQS = [
  {
    q: 'Combien de temps faut-il pour qu’un technicien arrive sur le lac d’Annecy ?',
    a: 'Notre équipe intervient généralement sous 30 à 60 minutes selon votre localisation sur le lac et la période. En haute saison, nous sommes mobilisés 7j/7 pour réduire au maximum le délai.',
  },
  {
    q: 'Quels types de bateaux pouvez-vous dépanner ?',
    a: 'Tous types d’embarcations : moteurs hors-bord et in-board, runabouts, wakeboats, pneumatiques et semi-rigides. Nos techniciens interviennent sur la plupart des marques du marché.',
  },
  {
    q: 'Proposez-vous le remorquage ?',
    a: 'Oui. Lorsque la panne ne peut pas être résolue à flot, nous sécurisons votre bateau et le remorquons jusqu’à notre atelier ou au port le plus proche pour une prise en charge complète.',
  },
  {
    q: 'Quels sont vos horaires d’intervention ?',
    a: 'Nous intervenons 7j/7 en période estivale, de 8h00 à 20h00. En cas d’urgence en dehors de ces horaires, contactez-nous : nous faisons notre maximum pour vous assister rapidement.',
  },
];

export function depannageMeta() {
  const canonical = `${SITE.url}/depannage`;
  return pageMeta({
    title: 'Dépannage Bateau Lac d’Annecy 7j/7 | Motor Boat 74',
    description:
      'Dépannage de bateau sur le lac d’Annecy : intervention rapide 7j/7 (30-60 min) avec bateau-atelier équipé, réparation à flot, remorquage. Appelez Motor Boat 74.',
    canonical,
    image: `${SITE.url}/images/services/depannage.webp`,
    robots: 'index, follow, max-image-preview:large',
    ogDescription:
      'Intervention rapide 7j/7 sur le lac d’Annecy : panne moteur, batterie, électrique, remorquage. Bateau-atelier équipé.',
    geo: { region: 'FR-74', placename: "Lac d'Annecy, Haute-Savoie" },
    jsonLd: [
      serviceSchema({
        name: 'Dépannage de bateau sur le Lac d’Annecy',
        serviceType: 'Dépannage, assistance et remorquage de bateau',
        url: canonical,
        description:
          "Dépannage de bateau 7j/7 sur le lac d'Annecy : intervention rapide à flot grâce à un bateau-atelier équipé (panne moteur, batterie, électrique), remorquage et assistance.",
      }),
      faqSchema(FAQS),
      breadcrumbSchema([
        { name: 'Accueil', url: `${SITE.url}/` },
        { name: 'Services', url: `${SITE.url}/services` },
        { name: 'Dépannage' },
      ]),
    ],
  });
}

export function DepannagePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [formData, setFormData] = useState({ nom: '', tel: '', email: '', localisation: '', message: '' });

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
        body: JSON.stringify({ ...formData, sujet: 'Dépannage bateau, Lac d’Annecy' }),
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
      {/* Mobile sticky CTA, appel d'urgence */}
      <div className="lg:hidden fixed bottom-6 inset-x-0 mx-auto px-6 z-50 pointer-events-none">
        <a
          href={SITE.phoneHref}
          className="w-full bg-brand-cyan text-brand-dark font-extrabold py-4 px-6 rounded-2xl shadow-2xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider active:scale-95 transition-all pointer-events-auto border border-white/20"
        >
          <Phone className="w-5 h-5" /> Appel d’urgence
        </a>
      </div>

      {/* 1. Hero */}
      <section className="relative min-h-[calc(100svh-80px)] lg:min-h-[calc(100svh-120px)] flex items-center justify-center pt-8 pb-10 overflow-hidden bg-brand-dark">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/services/depannage.webp"
            alt="Dépannage de bateau sur le lac d'Annecy par Motor Boat 74"
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
              items={[{ label: 'Accueil', to: '/' }, { label: 'Services', to: '/services' }, { label: 'Dépannage' }]}
            />

            <h1 className="text-2xl md:text-3xl lg:text-4xl font-sans font-bold uppercase text-white tracking-tight leading-tight mb-4">
              Dépannage de bateau sur le <span className="text-brand-cyan">Lac d'Annecy</span> <span className="text-white/90">· 7j/7 en saison</span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 font-medium mb-6 max-w-2xl leading-relaxed">
              Une panne sur l'eau&nbsp;? Chaque minute compte. En Haute-Savoie, MotorBoat 74 intervient rapidement avec un <strong className="text-brand-cyan">bateau-atelier équipé</strong> pour vous remettre en sécurité et reprendre la navigation.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6 text-left max-w-3xl">
              {[
                { Icon: LifeBuoy, t: '7j/7', d: 'Équipe mobilisée en haute saison (8h–20h).' },
                { Icon: MapPin, t: "Lac d'Annecy", d: 'Expertise locale du plan d’eau et de ses ports.' },
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
              <a
                href={SITE.phoneHref}
                className="bg-brand-cyan text-brand-dark px-10 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white transition-all duration-300 shadow-xl shadow-brand-cyan/20 active:translate-y-1 flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" /> Appel d’urgence
              </a>
              <button
                onClick={scrollToForm}
                className="bg-transparent border-2 border-white/20 text-white px-10 py-4 rounded-2xl font-bold uppercase text-xs tracking-widest hover:bg-white/5 hover:border-brand-cyan transition-all duration-300 flex items-center justify-center gap-2"
              >
                Décrire ma panne <ArrowRight className="w-4 h-4 text-brand-cyan" />
              </button>
            </div>

            <div className="mt-6 flex flex-wrap items-center justify-center lg:justify-start gap-x-8 gap-y-3 pt-5 border-t border-white/10 text-xs font-semibold text-gray-400">
              <span className="flex items-center gap-1.5 text-white"><Star className="w-4 h-4 fill-brand-cyan text-brand-cyan" /> Techniciens expérimentés</span>
              <span className="text-white">● Réparation à flot ou remorquage</span>
              <span className="text-white">● Toutes marques de bateaux</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. En bref (citable / AEO) */}
      <section aria-label="L'essentiel en bref" className="py-20 bg-brand-light relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[480px] h-[480px] bg-brand-cyan/10 rounded-full blur-[120px] -mr-40 -mt-40 -z-0"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
          <h2 className="sr-only">Dépannage de bateau sur le lac d'Annecy : l'essentiel</h2>
          <div className="rounded-[2rem] border border-gray-200 bg-white shadow-xl shadow-brand-dark/5 overflow-hidden">
            <div className="flex items-center gap-3 px-6 sm:px-10 py-4 border-b border-gray-200 bg-gray-50">
              <span className="w-2 h-2 rounded-full bg-brand-cyan animate-pulse"></span>
              <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-brand-cyan">En bref, Dépannage bateau Annecy</span>
            </div>
            <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 p-6 sm:p-10">
              <div>
                <p className="text-lg md:text-xl text-brand-dark leading-relaxed font-medium">
                  <strong className="text-brand-cyan">MotorBoat&nbsp;74</strong> assure le <strong>dépannage de bateau sur le lac d'Annecy</strong>, 7j/7 en saison, avec un bateau-atelier équipé.
                </p>
                <p className="text-gray-600 leading-relaxed mt-4 text-sm md:text-base">
                  En cas de panne moteur, électrique ou d'immobilisation sur l'eau, nous intervenons généralement sous 30 à 60&nbsp;minutes pour réparer directement à flot. Si nécessaire, nous sécurisons et remorquons votre bateau jusqu'à notre atelier ou au port le plus proche.
                </p>
                <div className="flex flex-wrap gap-3 mt-6">
                  <a href={SITE.phoneHref} className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:bg-brand-dark hover:text-white transition-colors">
                    <Phone className="w-4 h-4" /> {SITE.phoneDisplay}
                  </a>
                  <button onClick={scrollToForm} className="inline-flex items-center gap-2 border border-gray-300 text-brand-dark font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition-colors">
                    <Send className="w-4 h-4 text-brand-cyan" /> Décrire ma panne
                  </button>
                </div>
              </div>
              <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-5 content-start">
                {[
                  { Icon: Clock, k: 'Délai', v: '30 à 60 min sur le lac d’Annecy' },
                  { Icon: LifeBuoy, k: 'Disponibilité', v: '7j/7 en haute saison (8h–20h)' },
                  { Icon: PackageCheck, k: 'Sur l’eau', v: 'Réparation à flot (bateau-atelier)' },
                  { Icon: Ship, k: 'Si besoin', v: 'Remorquage atelier / port' },
                  { Icon: ShieldCheck, k: 'Marques', v: 'Toutes marques de bateaux' },
                  { Icon: MapPin, k: 'Zone', v: 'Lac d’Annecy et communes riveraines' },
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

      {/* 3. Pannes fréquentes */}
      <section className="py-24 bg-ink-950 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 w-96 h-96 bg-brand-cyan/5 rounded-full blur-3xl -z-10"></div>
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px] relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-3">Pannes fréquentes</span>
            <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-white tracking-tight leading-tight mb-6">
              Les pannes que nous traitons en urgence sur le <span className="text-brand-cyan">lac</span>
            </h2>
            <p className="text-base md:text-lg text-gray-400 font-medium leading-relaxed">
              Une immobilisation sur l'eau est toujours stressante, parfois dangereuse. Notre rôle&nbsp;: vous remettre en sécurité au plus vite, puis réparer, sur place quand c'est possible, à l'atelier pour les pannes lourdes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BREAKDOWNS.map(({ Icon, t, d, fix }) => (
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

      {/* 4. Workspace : process + services + zones + FAQ + formulaire sticky */}
      <section className="py-24 bg-transparent border-t border-gray-200 relative z-10">
        <div className="container mx-auto px-4 lg:px-8 max-w-[1400px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            {/* Colonne gauche */}
            <div className="lg:col-span-2 space-y-24">
              {/* Process */}
              <div>
                <div className="mb-12">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Comment ça marche</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight">
                    Comment se déroule un dépannage
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

              {/* Services de dépannage */}
              <div>
                <div className="mb-10">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Intervention sur l’eau</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">
                    Nos services de dépannage
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {[
                    { Icon: Wrench, t: 'Mécanique', items: ['Moteurs hors-bord & in-board', 'Propulsion & transmission', 'Diagnostic électronique'] },
                    { Icon: Zap, t: 'Électrique', items: ['Batteries & alternateurs', 'Diagnostic des circuits', 'Remplacement de composants'] },
                    { Icon: Ship, t: 'Remorquage', items: ['Vers l’atelier ou un port', 'Aide mise à l’eau / sortie', 'Sécurisation panne majeure'] },
                  ].map(({ Icon, t, items }) => (
                    <div key={t} className="bg-white border border-gray-200 rounded-3xl p-6">
                      <span className="w-11 h-11 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-4"><Icon className="w-5 h-5" /></span>
                      <h3 className="font-bold text-brand-dark uppercase tracking-tight text-sm mb-3">{t}</h3>
                      <ul className="space-y-2">
                        {items.map((it) => (
                          <li key={it} className="flex items-start gap-2 text-gray-600 text-sm">
                            <CheckCircle className="w-4 h-4 text-brand-cyan flex-shrink-0 mt-0.5" /> {it}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>

              {/* Zones d'intervention */}
              <div>
                <div className="mb-8">
                  <span className="text-brand-cyan uppercase tracking-widest font-bold text-xs block mb-2">Zone d'intervention</span>
                  <h2 className="text-2xl md:text-3xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">
                    Nous intervenons sur tout le lac d'Annecy
                  </h2>
                  <p className="text-gray-600 leading-relaxed mt-4 text-sm md:text-base max-w-3xl">
                    Notre bateau-atelier dépanne les bateaux sur l'ensemble du lac d'Annecy : d'<strong>Annecy</strong> à <strong>Doussard</strong>, en passant par <strong>Annecy-le-Vieux</strong>, <strong>Veyrier-du-Lac</strong>, <strong>Menthon-Saint-Bernard</strong>, <strong>Talloires-Montmin</strong>, <strong>Duingt</strong>, <strong>Saint-Jorioz</strong> et <strong>Sevrier</strong>. Sur le Léman ou le lac du Bourget, contactez-nous : nous étudions chaque demande.
                  </p>
                </div>
                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ZONES.map((z) => (
                    <div key={z.name} className="bg-white border border-gray-200 rounded-2xl p-5 flex gap-3">
                      <MapPin className="w-4 h-4 text-brand-cyan mt-0.5 shrink-0" />
                      <div>
                        <dt className="font-bold text-brand-dark uppercase tracking-tight text-sm">{z.name}</dt>
                        <dd className="text-gray-600 text-sm leading-snug mt-1">{z.desc}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
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

            {/* Colonne droite : formulaire sticky (clair) */}
            <aside
              ref={formRef}
              className="lg:col-span-1 lg:sticky lg:top-32 lg:max-h-[calc(100vh-9rem)] lg:overflow-y-auto hide-scrollbar bg-white border border-gray-200 ring-1 ring-black/[0.03] rounded-3xl p-8 shadow-xl shadow-gray-400/10"
            >
              <div className="relative">
                <div className="absolute top-0 left-0 w-2 h-16 bg-brand-cyan"></div>
                <div className="pl-4">
                  <h2 className="text-xl font-sans font-bold uppercase text-brand-dark tracking-tight leading-tight">
                    Une panne sur le lac&nbsp;? Décrivez-la
                  </h2>
                  <p className="text-xs text-gray-500 mt-2 font-medium">
                    Pour une urgence, appelez-nous directement au{' '}
                    <a href={SITE.phoneHref} className="text-brand-cyan font-bold">{SITE.phoneDisplay}</a>. Sinon, ce formulaire nous permet de préparer l'intervention.
                  </p>
                </div>
              </div>

              {formSubmitted ? (
                <div className="mt-8 bg-brand-cyan/10 border border-brand-cyan/20 p-6 rounded-2xl text-center">
                  <CheckCircle className="w-12 h-12 text-brand-cyan mx-auto mb-4" />
                  <h3 className="text-brand-dark font-extrabold uppercase text-sm mb-2">Demande envoyée !</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Pour une panne en cours sur l'eau, appelez-nous sans attendre au {SITE.phoneDisplay}, nous réagissons au plus vite.
                  </p>
                  <button onClick={() => setFormSubmitted(false)} className="mt-6 text-xs text-brand-cyan font-bold uppercase hover:underline">
                    Envoyer une autre demande
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="mt-8 space-y-5">
                  <div>
                    <label htmlFor="d-nom" className={labelCls}>Nom complet *</label>
                    <input id="d-nom" name="nom" required value={formData.nom} onChange={onChange} placeholder="Ex : Éric Dupont" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="d-tel" className={labelCls}>Téléphone *</label>
                    <input id="d-tel" name="tel" type="tel" required value={formData.tel} onChange={onChange} placeholder="Ex : 06 12 34 56 78" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="d-email" className={labelCls}>Adresse e-mail</label>
                    <input id="d-email" name="email" type="email" value={formData.email} onChange={onChange} placeholder="jean@email.com" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="d-loc" className={labelCls}>Où êtes-vous sur le lac ?</label>
                    <input id="d-loc" name="localisation" value={formData.localisation} onChange={onChange} placeholder="Ex : au large de Sevrier" className={inputCls} />
                  </div>
                  <div>
                    <label htmlFor="d-msg" className={labelCls}>Décrivez la panne *</label>
                    <textarea id="d-msg" name="message" required rows={3} value={formData.message} onChange={onChange} placeholder="Ex : le moteur ne démarre plus…" className={`${inputCls} resize-none`} />
                  </div>

                  {formError && <p className="text-red-500 text-xs font-bold text-center" role="alert">{formError}</p>}

                  <button
                    type="submit"
                    disabled={formLoading}
                    className="w-full bg-brand-cyan text-brand-dark font-bold uppercase py-4 rounded-xl text-xs tracking-widest hover:brightness-110 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                  >
                    {formLoading ? (<><Loader2 className="w-4 h-4 animate-spin" /> Envoi…</>) : (<><Send className="w-4 h-4" /> Envoyer ma demande</>)}
                  </button>

                  <a href={SITE.phoneHref} className="w-full border border-gray-200 text-brand-dark font-bold uppercase py-3.5 rounded-xl text-xs tracking-widest hover:border-brand-cyan hover:text-brand-cyan transition-colors flex items-center justify-center gap-2">
                    <Phone className="w-4 h-4 text-brand-cyan" /> Ou appelez le {SITE.phoneDisplay}
                  </a>

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

      {/* Nos autres services */}
      <OtherServices currentSlug="depannage" />
    </div>
  );
}
