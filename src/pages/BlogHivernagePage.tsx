import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { SITE } from '../data/site';
import { ArticleLayout, TocItem, InternalLink } from '../components/blog/ArticleLayout';

const FAQS = [
  {
    q: "Quand commencer l'hivernage ?",
    a: "Il est conseillé de préparer votre bateau dès la fin de la saison estivale, avant que les températures ne deviennent trop basses. En pratique, la plupart des propriétaires commencent fin septembre ou début octobre, selon la région. Commencer trop tard expose le bateau au gel, à l'humidité et aux intempéries, ce qui peut provoquer des dommages sur la coque, le moteur et les systèmes électroniques.",
  },
  {
    q: 'Hivernage à flot ou à sec ?',
    a: "Le choix dépend de votre type de bateau et de la protection recherchée. L'hivernage à flot est pratique si le bateau reste dans un port sécurisé, mais nécessite des protections supplémentaires contre le gel et un suivi régulier. Le stockage à sec, calé sur plots ou remorque, limite le contact avec l'eau, protège mieux la coque et facilite l'entretien. En général, le stockage à sec est préféré pour les bateaux de petite à moyenne taille.",
  },
  {
    q: 'Comment protéger le moteur contre le gel ?',
    a: "Vidangez le circuit de refroidissement et remplissez-le avec un antigel adapté (hors-bord ou inboard), drainez et stabilisez le carburant pour éviter oxydation et dépôts, graissez les pièces mobiles, vérifiez les anodes, et stockez le bateau dans un lieu tempéré ou bâché pour limiter les variations de température.",
  },
  {
    q: "Combien coûte l'hivernage ?",
    a: "Le budget dépend de la méthode et de la taille du bateau. Le hangar couvert offre une protection maximale pour un coût plus élevé ; l'hivernage extérieur est plus économique mais demande de la vigilance ; le stockage à sec a un coût intermédiaire. En moyenne, pour un bateau de loisir de taille standard, le prix varie entre 500 € et 2 000 € pour l'hiver, selon la région et les services inclus.",
  },
  {
    q: 'Peut-on le faire soi-même ?',
    a: "Oui, l'hivernage peut être réalisé par le propriétaire, mais il exige un minimum de savoir-faire : calage correct, vidange et protection moteur avec antigel, retrait ou charge des batteries, nettoyage complet de la coque. Si certaines étapes semblent complexes ou si vous cherchez la tranquillité, il est recommandé de confier l'hivernage à un professionnel comme Motor Boat 74.",
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
const Tip = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="bg-brand-cyan/10 border border-brand-cyan/30 rounded-2xl p-5 mb-4">
    <span className="font-bold text-brand-dark">{label} : </span>
    <span className="text-gray-600">{children}</span>
  </div>
);

export function BlogHivernagePage() {
  const path = '/blog/hivernage/hivernage-bateau-guide-complet';
  const canonical = `${SITE.url}${path}/`;
  const title = 'Hivernage bateau : le guide complet pour bien préparer votre bateau';
  const hero = '/images/hivernage/annecy.jpg';
  const author = "L'équipe Motor Boat 74";

  const toc: TocItem[] = [
    { id: 'preparer', label: 'Préparer le bateau avant l’hivernage' },
    { id: 'methode', label: 'Choisir la méthode d’hivernage' },
    { id: 'entretien-hiver', label: 'Entretien pendant l’hiver' },
    { id: 'par-type', label: 'Conseils selon le type de bateau' },
    { id: 'faq', label: 'FAQ – Questions fréquentes' },
    { id: 'conclusion', label: 'L’essentiel à retenir' },
  ];

  const internalLinks: InternalLink[] = [
    { label: 'Hivernage & stockage', to: '/hivernage-stockage-bateau', hint: 'Notre service clé en main' },
    { label: 'Entretien & réparation', to: '/entretien-reparation', hint: 'Révision moteur et coque' },
    { label: 'Sellerie marine', to: '/sellerie', hint: 'Réfection des assises' },
    { label: 'Transport de bateau', to: '/transport' },
    { label: 'Bateaux d’occasion', to: '/bateaux/occasion' },
  ];

  const schemaArticle = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    image: `${SITE.url}${hero}`,
    datePublished: '2025-10-06',
    dateModified: '2025-10-06',
    author: { '@type': 'Organization', name: author },
    publisher: {
      '@type': 'Organization',
      name: SITE.name,
      logo: { '@type': 'ImageObject', url: `${SITE.url}/images/logo-transprent.png` },
    },
    mainEntityOfPage: canonical,
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
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE.url}/blog/` },
      { '@type': 'ListItem', position: 3, name: 'Hivernage bateau : le guide complet', item: canonical },
    ],
  };

  return (
    <>
      <Helmet>
        <title>Hivernage bateau : le guide complet | Motor Boat 74</title>
        <meta name="description" content="Le guide complet de l'hivernage de bateau : préparation de la coque et du moteur, méthodes de stockage, entretien hivernal et conseils par type de bateau." />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={`${SITE.url}${hero}`} />
        <script type="application/ld+json">{JSON.stringify(schemaArticle)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaFAQ)}</script>
        <script type="application/ld+json">{JSON.stringify(schemaBreadcrumb)}</script>
      </Helmet>

      <ArticleLayout
        slug="hivernage-bateau-guide-complet"
        path={path}
        title={title}
        category="hivernage"
        date="2025-10-06"
        author={author}
        readingTime="12 min"
        hero={hero}
        toc={toc}
        internalLinks={internalLinks}
      >
        <P>L'hiver arrive, et il est essentiel de préparer correctement votre bateau pour éviter les dommages causés par le gel, l'humidité ou l'usure. Un hivernage bien réalisé permet de protéger la coque, le moteur et les équipements, et de retrouver votre embarcation en parfait état au printemps.</P>
        <P>Que vous ayez un hors-bord, un voilier ou un semi-rigide, certaines étapes sont indispensables : nettoyage, vidange du moteur, protection des batteries et des systèmes électroniques, et choix d'un stockage adapté. Chaque action compte pour prolonger la durée de vie de votre bateau et éviter des réparations coûteuses.</P>
        <P>Dans ce guide complet, vous trouverez toutes les étapes pour hiverner votre bateau en toute sécurité, des conseils pratiques adaptés à chaque type d'embarcation, ainsi que des astuces pour préparer sa remise à l'eau au printemps.</P>

        <H2 id="preparer">Préparer le bateau avant l'hivernage</H2>
        <P>Avant de stocker votre embarcation pour l'hiver, il est essentiel de la préparer correctement. Cette étape garantit que la coque, le moteur et tous les équipements restent en parfait état, tout en facilitant la remise à l'eau au printemps. Voici les points clés à respecter.</P>
        <H3>1. Nettoyage de la coque et du pont</H3>
        <P>Un nettoyage complet est indispensable pour protéger votre navire de la corrosion et des dépôts. Rincez soigneusement la coque et le pont à l'eau douce pour éliminer sel, algues et dépôts calcaires. Utilisez un savon spécifique, adapté aux coques en polyester, aluminium ou bois, afin de ne pas abîmer le gelcoat ou la peinture.</P>
        <P>Profitez de cette étape pour inspecter la surface : fissures, éclats ou signes d'osmose doivent être réparés avant l'hiver. Si votre navire est équipé d'un traitement antifouling, vérifiez son état et renouvelez la couche si nécessaire.</P>
        <P>N'oubliez pas l'intérieur : sièges, bains de soleil et moquettes se nettoient à l'eau douce avant d'appliquer un protecteur adapté, qui évite moisissures et craquelures pendant les mois humides. Si une assise est fatiguée ou décolorée, l'hiver est le bon moment pour la confier à notre atelier de <Link to="/sellerie" className="text-brand-cyan font-semibold hover:underline">sellerie marine</Link>, la remise à neuf étant plus rapide hors saison.</P>
        <H3>2. Entretien et vidange du moteur</H3>
        <P>Le moteur est la partie la plus sensible aux dommages liés à l'hiver. Commencez par vidanger l'huile et remplacer les filtres pour éviter que l'huile usagée ne dégrade les composants internes. Protégez ensuite le circuit de refroidissement avec un antigel adapté à votre type de moteur : hors-bord ou inboard.</P>
        <P>Il est également recommandé d'ajouter un stabilisateur de carburant pour éviter l'oxydation et la formation de dépôts dans le réservoir. Vérifiez les bougies, l'hélice, les anodes et les visseries. Graissez les axes et pièces mobiles pour éviter corrosion et grippage.</P>
        <P>L'arrêt hivernal est aussi le moment idéal pour traiter ce qui a été remis à plus tard pendant la saison. Un bruit suspect, une surchauffe ou une vibration repérés à l'automne se règlent au calme : planifier une <Link to="/entretien-reparation" className="text-brand-cyan font-semibold hover:underline">révision moteur et coque</Link> avant le remisage vous évite l'attente et l'indisponibilité au plus fort du printemps, quand les ateliers sont saturés.</P>
        <Tip label="Petit rappel technique">Les anodes sacrificielles sont des pièces métalliques qui se corrodent à la place des composants sensibles, protégeant ainsi la structure du bateau contre l'oxydation.</Tip>
        <H3>3. Batteries et systèmes électroniques</H3>
        <P>Les batteries et équipements électroniques sont particulièrement vulnérables à l'humidité et aux températures basses. Retirez les batteries et stockez-les dans un endroit sec et tempéré, idéalement sur un chargeur flottant pour maintenir leur charge. Débranchez tous les instruments électroniques et systèmes de navigation pour les protéger de l'humidité.</P>
        <P>Profitez-en pour vérifier les câbles et connectiques : nettoyez la corrosion éventuelle et appliquez un spray protecteur pour contacts électriques si nécessaire.</P>
        <H3>4. Lubrification et vérifications complémentaires</H3>
        <P>Enfin, assurez-vous que toutes les pièces mobiles et systèmes annexes fonctionnent correctement. Graissez charnières, poulies et axes, et vérifiez le bon fonctionnement des pompes de cale et des circuits d'eau. Inspectez également les tuyaux et durites pour détecter fissures ou usure. Noter toute anomalie à ce stade permet de planifier les réparations avant la remise à l'eau.</P>

        <H3>Tableau récapitulatif</H3>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-4">
          <table className="w-full text-sm text-left border-collapse">
            <thead><tr className="bg-brand-cyan text-brand-dark">
              <th className="py-3 px-4 font-bold">Étape</th><th className="py-3 px-4 font-bold">Actions</th><th className="py-3 px-4 font-bold">Conseils techniques</th>
            </tr></thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100 bg-gray-50"><td className="py-3 px-4 font-semibold text-brand-dark">Nettoyage coque & pont</td><td className="py-3 px-4">Rincer à l'eau douce, laver au savon adapté</td><td className="py-3 px-4">Vérifier gelcoat/peinture, réparer fissures, renouveler antifouling</td></tr>
              <tr className="border-b border-gray-100"><td className="py-3 px-4 font-semibold text-brand-dark">Entretien moteur</td><td className="py-3 px-4">Vidange huile, filtres, protection du refroidissement</td><td className="py-3 px-4">Antigel adapté, stabilisateur, vérifier hélice, bougies, anodes</td></tr>
              <tr className="border-b border-gray-100 bg-gray-50"><td className="py-3 px-4 font-semibold text-brand-dark">Batteries & électronique</td><td className="py-3 px-4">Retirer/charger sur chargeur flottant, débrancher</td><td className="py-3 px-4">Stocker au sec, protéger câbles (spray anti-corrosion)</td></tr>
              <tr><td className="py-3 px-4 font-semibold text-brand-dark">Lubrification</td><td className="py-3 px-4">Graisser charnières, poulies, axes ; vérifier pompes de cale</td><td className="py-3 px-4">Inspecter tuyaux et durites, noter les anomalies</td></tr>
            </tbody>
          </table>
        </div>

        <H2 id="methode">Choisir la méthode d'hivernage</H2>
        <P>Le choix de la méthode dépend de la taille de votre bateau, de votre budget et du niveau de protection souhaité. Chaque solution présente des avantages et des contraintes qu'il est important de connaître.</P>
        <H3>Hivernage en hangar couvert</H3>
        <P>L'hivernage en hangar couvert offre la protection maximale contre les intempéries, le gel et l'humidité. C'est la solution la plus sûre, particulièrement pour les embarcations de grande taille ou coûteuses. C'est précisément la formule de notre <Link to="/hivernage-stockage-bateau" className="text-brand-cyan font-semibold hover:underline">service d'hivernage et de stockage</Link> : hangar sécurisé, préparation moteur et coque, et si besoin <Link to="/transport" className="text-brand-cyan font-semibold hover:underline">transport du bateau</Link> depuis votre ponton jusqu'à l'atelier.</P>
        <UL items={[
          'Avantages : bateau à l\'abri de la neige, du vent et du gel ; entretien facilité à sec ; sécurité renforcée (accès contrôlé, vidéosurveillance).',
          'Points à surveiller : budget plus élevé que l\'extérieur ; disponibilité parfois limitée selon la région.',
        ]} />
        <H3>Hivernage à l'extérieur</H3>
        <P>Pour les volumes plus petits ou lorsque le hangar n'est pas disponible, l'hivernage à l'extérieur reste une solution efficace si elle est bien préparée.</P>
        <UL items={[
          'Conseils : bâche respirante bien fixée ; caler le bateau sur plots ou remorque adaptée ; protéger moteur et équipements sensibles.',
          'Points à surveiller : suivi régulier nécessaire ; l\'humidité et les variations de température accélèrent l\'usure si la bâche est mal posée.',
        ]} />
        <H3>Hivernage à sec / sur remorque</H3>
        <P>Le stockage à sec, sur remorque ou sur plots, est particulièrement adapté aux petites embarcations. Il offre un accès facile pour l'entretien et limite le contact avec l'eau.</P>
        <UL items={[
          'Avantages : prévention efficace contre le gel et l\'humidité ; maintenance simplifiée ; calage précis possible.',
          'Points à surveiller : nécessite un emplacement sécurisé et plat ; protections contre pluie et neige toujours nécessaires.',
        ]} />

        <H3>Comparatif des méthodes</H3>
        <div className="overflow-x-auto rounded-2xl border border-gray-200 shadow-sm mb-4">
          <table className="w-full text-sm text-left border-collapse">
            <thead><tr className="bg-brand-cyan text-brand-dark">
              <th className="py-3 px-4 font-bold">Méthode</th><th className="py-3 px-4 font-bold">Protection</th><th className="py-3 px-4 font-bold">Budget</th><th className="py-3 px-4 font-bold">Points forts</th>
            </tr></thead>
            <tbody className="text-gray-600">
              <tr className="border-b border-gray-100 bg-gray-50"><td className="py-3 px-4 font-semibold text-brand-dark">Hangar couvert</td><td className="py-3 px-4">Maximale</td><td className="py-3 px-4">Élevé</td><td className="py-3 px-4">Sécurité, abri complet</td></tr>
              <tr className="border-b border-gray-100"><td className="py-3 px-4 font-semibold text-brand-dark">Extérieur</td><td className="py-3 px-4">Moyenne</td><td className="py-3 px-4">Moyen</td><td className="py-3 px-4">Économique, flexible</td></tr>
              <tr><td className="py-3 px-4 font-semibold text-brand-dark">Stockage à sec</td><td className="py-3 px-4">Bonne</td><td className="py-3 px-4">Moyen</td><td className="py-3 px-4">Limite le contact avec l'eau, entretien simplifié</td></tr>
            </tbody>
          </table>
        </div>

        <H2 id="entretien-hiver">Entretien pendant l'hiver</H2>
        <P>Même après avoir préparé votre bateau et choisi la méthode d'hivernage, un suivi régulier pendant l'hiver est essentiel pour prévenir l'apparition de problèmes et garantir que le bateau sera prêt dès le printemps.</P>
        <H3>Vérification de la coque et du pont</H3>
        <UL items={[
          'État du gelcoat ou de la peinture (fissures, éclats).',
          'Adhérence de la bâche pour éviter stagnation d\'eau et moisissures.',
          'Fixations et attaches pour garantir un bon calage.',
        ]} />
        <H3>Batteries et systèmes électroniques</H3>
        <UL items={[
          'Tension des batteries (si sur chargeur flottant).',
          'Absence de corrosion sur câbles et connectiques.',
          'État des appareils électroniques (l\'humidité peut provoquer des courts-circuits).',
        ]} />
        <H3>Moteur et équipements</H3>
        <UL items={[
          'Absence de fuite d\'antigel et bon calage des protections moteur.',
          'Inspection de l\'hélice, des anodes et des visseries.',
          'Graissage des pièces mobiles pour éviter grippage.',
        ]} />

        <H2 id="par-type">Nos conseils selon le type de bateau</H2>
        <P>Chaque type de bateau présente des besoins particuliers. Hors-bord, inboard, voilier ou semi-rigide, la préparation doit être adaptée pour éviter les dommages liés au gel, à l'humidité ou à l'usure.</P>
        <H3>Bateaux hors-bord</H3>
        <UL items={[
          'Vidange complète et remplissage du circuit de refroidissement avec antigel marin.',
          'Retrait ou chargement des batteries.',
          'Protection de l\'hélice et des parties métalliques (graissage, housse).',
          'Stockage vertical ou bien calé sur plots.',
        ]} />
        <Tip label="Astuce">Utiliser une bâche respirante pour réduire la condensation autour du moteur.</Tip>
        <H3>Bateaux inboard</H3>
        <UL items={[
          'Vidange huile et filtres obligatoire.',
          'Antigel dans le circuit de refroidissement.',
          'Protection des pompes de cale, durites et circuits de carburant.',
          'Contrôle des anodes et graissage des pièces mobiles.',
        ]} />
        <H3>Voiliers</H3>
        <UL items={[
          'Protection du gréement et des voiles (retirer et stocker à l\'abri).',
          'Entretien du moteur et de l\'électronique comme un inboard.',
          'Traitement des boiseries et surfaces composites contre l\'humidité.',
        ]} />
        <H3>Semi-rigides et petits bateaux</H3>
        <UL items={[
          'Calage précis sur remorque ou plots.',
          'Protection moteur avec housse ou bâche.',
          'Nettoyage complet de la coque, du pont et des flotteurs ; vérification des valves.',
        ]} />

        <H2 id="faq">FAQ – Questions fréquentes</H2>
        <div className="space-y-5 mt-6">
          {FAQS.map((f, i) => (
            <div key={i} className="bg-brand-light border border-gray-200 rounded-2xl p-6">
              <h3 className="font-bold text-brand-dark mb-2">{f.q}</h3>
              <p className="text-gray-600 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        <H2 id="conclusion">Maintenant vous savez tout !</H2>
        <P>Hiverner correctement son bateau implique plusieurs étapes essentielles : préparer la coque et le pont, entretenir le moteur, protéger les batteries et l'électronique, choisir la méthode d'hivernage adaptée et assurer un suivi régulier pendant l'hiver. Chaque geste contribue à préserver la longévité de votre bateau et à éviter des réparations coûteuses au printemps.</P>
        <P>Un hivernage bien réalisé, qu'il soit à sec, en hangar ou à flot, vous garantit de retrouver votre embarcation en parfait état dès le retour des beaux jours. Et si la trêve hivernale vous donne envie de changer d'embarcation, c'est aussi la meilleure période pour parcourir nos <Link to="/bateaux/occasion" className="text-brand-cyan font-semibold hover:underline">bateaux d'occasion</Link>, révisés et garantis par nos ateliers, et préparer la saison prochaine sereinement.</P>

        {/* CTA */}
        <div className="bg-brand-dark text-white rounded-[2rem] p-8 mt-12 text-center">
          <h2 className="text-2xl font-bold uppercase tracking-tight mb-3">Confiez l'hivernage à Motor Boat 74</h2>
          <p className="text-gray-300 mb-6 max-w-xl mx-auto">Hangar sécurisé de 3000 m², préparation moteur et coque, suivi complet. Devis gratuit sous 24 h.</p>
          <Link to="/hivernage-stockage-bateau" className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition">
            Découvrir notre service d'hivernage <ArrowRight size={16} />
          </Link>
        </div>
      </ArticleLayout>
    </>
  );
}
