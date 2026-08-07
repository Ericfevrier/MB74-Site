/**
 * Article « Bateau en panne sur le lac d'Annecy : que faire ? »
 *
 * REPRIS DU WORDPRESS. Cette page existait sur motorboat74.com à l'URL
 * /blog/bateau-en-panne-lac-annecy/ — un vrai article (post 6420), pas une
 * catégorie. Elle avait été classée à tort parmi les archives de catégorie et
 * redirigée vers /depannage : 1 600 mots ciblant « bateau en panne lac Annecy »
 * auraient disparu. Le contenu est celui de l'article d'origine ; seuls les
 * liens internes ont été refaits vers les pages du nouveau site.
 *
 * L'URL doit rester identique à celle de WordPress : c'est elle qui porte
 * l'historique d'indexation.
 */
import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Phone } from 'lucide-react';
import { SITE } from '../data/site';
import { ArticleLayout, TocItem, InternalLink } from '../components/blog/ArticleLayout';
import { pageMeta } from '../lib/meta';
import { faqSchema, breadcrumbSchema } from '../lib/schema';

const PATH = '/blog/bateau-en-panne-lac-annecy';
const TITLE = "Bateau en panne sur le lac d'Annecy : que faire ?";
const HERO = '/images/de-pannage.webp';
const AUTHOR = 'Eric';
const DATE = '2026-07-27';

export function blogDepannageMeta() {
  const canonical = `${SITE.url}${PATH}`;
  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: TITLE,
    image: `${SITE.url}${HERO}`,
    datePublished: DATE,
    dateModified: DATE,
    author: { '@type': 'Person', name: AUTHOR },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/images/logo-transprent.webp` },
    },
    mainEntityOfPage: canonical,
  };
  return pageMeta({
    // 48 caractères : le nom du site ferait dépasser les 60 admis par Google.
    title: TITLE,
    description:
      "Bateau en panne sur le lac d'Annecy ? Les causes les plus fréquentes, les vérifications à faire et le moment où il faut appeler un professionnel.",
    canonical,
    image: `${SITE.url}${HERO}`,
    ogType: 'article',
    ogTitle: TITLE,
    jsonLd: [
      schemaArticle,
      faqSchema(FAQS),
      breadcrumbSchema([
        { name: 'Accueil', url: `${SITE.url}/` },
        { name: 'Blog', url: `${SITE.url}/blog` },
        { name: TITLE, url: canonical },
      ]),
    ],
  });
}

const FAQS = [
  {
    q: "Que faire si mon bateau tombe en panne au milieu du lac d'Annecy ?",
    a: "Commencez par sécuriser les passagers, coupez le moteur si une alarme apparaît ou s'il surchauffe, puis contactez un service de dépannage si le problème ne peut pas être résolu immédiatement.",
  },
  {
    q: 'Combien de temps met un technicien pour intervenir ?',
    a: "En saison, nous intervenons généralement entre 30 et 60 minutes, selon votre localisation sur le lac d'Annecy.",
  },
  {
    q: 'Intervenez-vous sur tous les types de bateaux ?',
    a: 'Oui. Nous dépannons les moteurs hors-bord, inboard, semi-rigides, pneumatiques et la plupart des marques de moteurs marins.',
  },
  {
    q: 'Proposez-vous le remorquage ?',
    a: "Oui. Lorsque la réparation n'est pas réalisable sur place, nous remorquons votre bateau vers notre atelier ou vers un port sécurisé.",
  },
  {
    q: 'Intervenez-vous le week-end ?',
    a: 'Oui. Notre service de dépannage fonctionne 7 jours sur 7 pendant la saison, de 8 h à 20 h.',
  },
  {
    q: 'Combien coûte un dépannage bateau ?',
    a: "Le tarif dépend de la nature de la panne, de votre position sur le lac et de l'intervention nécessaire. Contactez-nous pour obtenir une estimation rapide.",
  },
];

const H2 = ({ id, children }: { id?: string; children: React.ReactNode }) => (
  <h2 id={id} className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand-dark mt-14 mb-5 scroll-mt-[140px]">{children}</h2>
);
const H3 = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-xl font-bold text-brand-dark mt-8 mb-3">{children}</h3>
);
const P = ({ children }: { children: React.ReactNode }) => (
  <p className="text-gray-600 leading-relaxed mb-4">{children}</p>
);
const UL = ({ items }: { items: React.ReactNode[] }) => (
  <ul className="space-y-2 mb-4 list-disc pl-5 marker:text-brand-cyan">
    {items.map((it, i) => <li key={i} className="text-gray-600 leading-relaxed">{it}</li>)}
  </ul>
);
const Warn = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="bg-brand-cyan/10 border border-brand-cyan/30 rounded-2xl p-5 mb-4">
    <span className="font-bold text-brand-dark">{label} : </span>
    <span className="text-gray-600">{children}</span>
  </div>
);
const A = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link to={to} className="text-brand-cyan font-semibold hover:underline">{children}</Link>
);

export function BlogDepannagePage() {
  const toc: TocItem[] = [
    { id: 'pannes-frequentes', label: 'Les pannes les plus fréquentes' },
    { id: 'puissance', label: 'Perte de puissance ou vibrations' },
    { id: 'intervention', label: 'Comment se déroule une intervention' },
    { id: 'prevention', label: 'Comment éviter la panne' },
    { id: 'faq', label: 'Questions fréquentes' },
  ];

  const internalLinks: InternalLink[] = [
    { label: 'Dépannage sur le lac', to: '/depannage', hint: '7j/7 en saison' },
    { label: 'Entretien & réparation', to: '/entretien-reparation', hint: 'Révision moteur et coque' },
    { label: 'Hivernage & stockage', to: '/hivernage-stockage-bateau' },
    { label: 'Transport de bateau', to: '/transport' },
    { label: 'Nous contacter', to: '/contact' },
  ];

  return (
    <ArticleLayout
      slug="bateau-en-panne-lac-annecy"
      path={PATH}
      title={TITLE}
      category="entretien-reparation"
      date={DATE}
      author={AUTHOR}
      readingTime="7 min"
      hero={HERO}
      toc={toc}
      internalLinks={internalLinks}
    >
      <P>Votre bateau en panne sur le lac d'Annecy peut rapidement gâcher une journée de navigation. Le moteur refuse de démarrer, une alarme s'allume, le bateau perd de la puissance ou s'arrête brusquement : dans ces situations, il est essentiel d'identifier l'origine du problème avant d'insister sur le moteur.</P>
      <P>Certaines pannes peuvent être résolues directement sur l'eau, tandis que d'autres nécessitent un <A to="/depannage">dépannage bateau sur le lac d'Annecy</A> afin d'éviter des dommages mécaniques plus importants.</P>
      <P>Voici les réflexes à adopter pour diagnostiquer la panne, savoir s'il est possible de rentrer au port et comprendre à quel moment il faut appeler un professionnel.</P>

      <H2 id="pannes-frequentes">Les pannes de bateau les plus fréquentes sur le lac d'Annecy</H2>
      <P>La majorité des interventions que nous réalisons concernent quelques pannes récurrentes. Les premiers symptômes permettent souvent d'en identifier rapidement la cause.</P>

      <H3>Le moteur ne démarre pas</H3>
      <P>Si le démarreur ne tourne pas ou tourne très lentement, l'origine est généralement électrique. Les causes les plus fréquentes sont :</P>
      <UL items={[
        'batterie déchargée après plusieurs heures moteur arrêté ;',
        'cosses de batterie desserrées ou oxydées ;',
        'coupe-batterie mal positionné ;',
        'fusible principal défectueux.',
      ]} />
      <P>Si vous disposez d'un multimètre, contrôlez la tension de la batterie. En dessous de 12,2 volts, elle est souvent trop faible pour lancer un moteur de plaisance.</P>
      <P>Une batterie faible est souvent le symptôme d'un manque de suivi. Un <A to="/entretien-reparation">entretien régulier de votre bateau</A> permet de contrôler son état avant le début de la saison.</P>

      <H3>Le démarreur tourne mais le moteur ne part pas</H3>
      <P>Lorsque le démarreur fonctionne normalement mais que le moteur refuse de démarrer, le problème provient souvent de l'alimentation en carburant. Il peut s'agir :</P>
      <UL items={[
        "d'un réservoir presque vide malgré une jauge imprécise ;",
        "d'un carburant ancien ou dégradé après l'hivernage ;",
        "d'une poire d'amorçage désamorcée sur un hors-bord ;",
        "d'une pompe à essence défaillante ;",
        "d'un problème d'injection sur un moteur inboard.",
      ]} />
      <P>Avant de multiplier les tentatives de démarrage, vérifiez ces éléments afin d'éviter d'endommager le système.</P>
      <P>Ce problème est fréquent lorsque <A to="/hivernage-stockage-bateau">l'hivernage du bateau</A> n'a pas été réalisé dans de bonnes conditions.</P>

      <H3>Une alarme moteur ou une surchauffe apparaît</H3>
      <P>Une alarme de température ou de la vapeur au niveau de l'échappement indiquent généralement un défaut du circuit de refroidissement. Sur le lac d'Annecy, les causes les plus fréquentes sont :</P>
      <UL items={[
        "une prise d'eau obstruée par des algues ou un sac plastique ;",
        'une turbine de pompe à eau usée ;',
        "un manque de circulation d'eau.",
      ]} />
      <Warn label="Dans cette situation, coupez immédiatement le moteur">continuer à naviguer avec un moteur en surchauffe peut entraîner une casse importante, comme un joint de culasse ou une déformation de la culasse.</Warn>

      <H2 id="puissance">Le bateau perd de la puissance ou vibre fortement</H2>
      <P>Si vous avez heurté un objet immergé ou le fond, une hélice endommagée est souvent en cause. Une pale tordue ou une bague d'hélice détériorée provoquent :</P>
      <UL items={[
        'des vibrations importantes ;',
        'une perte de vitesse ;',
        'une consommation excessive ;',
        'une usure prématurée de la transmission.',
      ]} />
      <P>Dans ce cas, il est préférable de limiter l'utilisation du moteur et de rejoindre le port le plus proche à faible vitesse, si cela reste possible.</P>

      <H3>Le tableau de bord s'éteint complètement</H3>
      <P>Une coupure électrique soudaine peut provenir :</P>
      <UL items={[
        "d'un fusible grillé ;",
        "d'un problème de faisceau électrique ;",
        "d'une sécurité électronique déclenchée ;",
        "d'un défaut calculateur.",
      ]} />
      <P>Même si la panne paraît impressionnante, elle ne signifie pas forcément que le moteur est gravement endommagé. Un diagnostic électronique permettra d'identifier rapidement son origine.</P>

      <H3>Peut-on rentrer au port sans assistance ?</H3>
      <P>Dans certaines situations, il est possible de rejoindre le port le plus proche sans prendre de risque. Vous pouvez envisager de rentrer si :</P>
      <UL items={[
        "le moteur redémarre normalement après un simple problème de batterie ;",
        "aucune alarme moteur n'est présente ;",
        'le bateau navigue sans vibration importante ;',
        'la perte de puissance reste limitée.',
      ]} />
      <P>En revanche, il est fortement déconseillé de continuer à naviguer si :</P>
      <UL items={[
        'le moteur surchauffe ;',
        "une voie d'eau apparaît ;",
        'le moteur refuse de redémarrer après plusieurs essais ;',
        'une forte vibration est apparue après un choc ;',
        'une alarme moteur reste affichée.',
      ]} />
      <P>Insister dans ces situations peut transformer une panne mineure en réparation beaucoup plus coûteuse.</P>

      <H2 id="intervention">Dépannage bateau sur le lac d'Annecy : comment se déroule l'intervention ?</H2>
      <P>Chez Motor Boat 74, nous intervenons directement sur l'ensemble du lac d'Annecy afin de remettre votre bateau en état de navigation lorsque cela est possible. Notre bateau d'intervention est équipé pour effectuer de nombreux dépannages sur place :</P>
      <UL items={[
        'diagnostic mécanique et électrique ;',
        'remplacement de batterie ;',
        'recherche de panne électrique ;',
        "problème d'alimentation en carburant ;",
        "remplacement de certaines pièces d'usure ;",
        'remise en route du moteur.',
      ]} />
      <P>Lorsque la réparation ne peut pas être réalisée immédiatement, nous assurons également le <A to="/transport">remorquage de votre bateau</A> jusqu'à notre atelier ou vers le port le plus proche.</P>
      <P>En pleine saison, notre délai d'intervention est généralement compris entre 30 et 60 minutes, selon votre position sur le lac. Notre parfaite connaissance du lac d'Annecy nous permet d'intervenir rapidement avec le matériel adapté aux pannes les plus courantes.</P>

      <H2 id="prevention">Comment éviter que votre bateau tombe en panne ?</H2>
      <P>La majorité des pannes rencontrées en été trouvent leur origine plusieurs semaines auparavant. Une batterie insuffisamment chargée, une turbine usée, un carburant vieillissant ou un entretien négligé augmentent fortement le risque de panne en pleine navigation.</P>
      <P>Pour naviguer sereinement, il est recommandé d'effectuer chaque année :</P>
      <UL items={[
        'une révision moteur complète ;',
        'le contrôle de la batterie ;',
        'le remplacement de la turbine lorsque nécessaire ;',
        'la vérification des filtres ;',
        'la vidange moteur ;',
        <>un <A to="/hivernage-stockage-bateau">hivernage réalisé dans les règles</A>.</>,
      ]} />
      <P>Un entretien préventif coûte presque toujours moins cher qu'un dépannage sur l'eau.</P>

      <H3>Pourquoi choisir Motor Boat 74 ?</H3>
      <P>Faire appel à un professionnel local présente plusieurs avantages. Nous connaissons parfaitement le lac d'Annecy, ses ports et les secteurs les plus fréquentés. Cette expérience nous permet d'intervenir rapidement, avec les pièces et les outils adaptés aux pannes les plus courantes.</P>
      <P>Que vous naviguiez en hors-bord, en inboard, en semi-rigide ou en bateau de plaisance, notre objectif est simple : vous permettre de reprendre la navigation dans les meilleurs délais lorsque cela est possible.</P>

      <H2 id="faq">Questions fréquentes</H2>
      <div className="space-y-5 mt-6">
        {FAQS.map((f, i) => (
          <div key={i} className="bg-brand-light border border-gray-200 rounded-2xl p-6">
            <h3 className="font-bold text-brand-dark mb-2">{f.q}</h3>
            <p className="text-gray-600 leading-relaxed">{f.a}</p>
          </div>
        ))}
      </div>

      <div className="bg-brand-dark text-white rounded-[2rem] p-8 mt-12 text-center">
        <h2 className="text-2xl font-bold uppercase tracking-tight mb-3">Besoin d'un dépannage sur le lac d'Annecy ?</h2>
        <p className="text-gray-300 mb-6 max-w-xl mx-auto">
          N'insistez pas sur le moteur : une intervention rapide évite souvent une réparation beaucoup plus lourde.
          Motor Boat 74 intervient 7j/7 sur l'ensemble du lac, avec un délai moyen de 30 à 60 minutes en saison.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <a href={SITE.phoneHref} className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition">
            <Phone size={16} /> {SITE.phoneDisplay}
          </a>
          <Link to="/depannage" className="inline-flex items-center gap-2 border border-white/30 text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white/10 transition">
            Notre service de dépannage <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </ArticleLayout>
  );
}
