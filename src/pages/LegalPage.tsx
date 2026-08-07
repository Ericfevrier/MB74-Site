import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { pageMeta } from '../lib/meta';
import { breadcrumbSchema } from '../lib/schema';
import { usePageContent } from '../lib/pageContent';

type Block = { h?: string; p?: string[]; ul?: string[] };

/**
 * Siège social déclaré au RCS — et NON l'adresse commerciale mise en avant
 * ailleurs sur le site. Les deux ont divergé le jour où le shop de Saint-Jorioz
 * est devenu l'établissement principal ; le siège, lui, ne bouge qu'avec un
 * transfert effectif. Cette page lisait `SITE.address*` : elle aurait donc suivi
 * le changement commercial et déclaré un siège social inexact.
 */
const FULL_ADDRESS = `${SITE.legal.addressStreet}, ${SITE.legal.addressPostal} ${SITE.legal.addressLocality}`;

const MENTIONS: { title: string; updated: string; blocks: Block[] } = {
  title: 'Mentions légales',
  updated: '24 juin 2026',
  blocks: [
    {
      h: 'Éditeur du site',
      p: [
        `Le présent site est édité par ${SITE.name}.`,
        `Siège social : ${FULL_ADDRESS}, ${SITE.addressRegion}, France.`,
        `SIRET : 920 936 713 00014, SIREN : 920 936 713, N° TVA intracommunautaire : FR85 920 936 713.`,
        `Téléphone : ${SITE.phoneDisplay}, Email : ${SITE.email}.`,
      ],
    },
    {
      h: 'Directeur de la publication',
      p: ['Monsieur Loïc Ricaud, en sa qualité de gérant de Motor Boat 74.'],
    },
    {
      h: 'Hébergement',
      p: [
        // L'ancienne mention désignait OVH, qui n'héberge pas ce site : la loi
        // pour la confiance dans l'économie numérique impose l'identité réelle
        // de l'hébergeur.
        'Le site est hébergé par la société o2switch SAS, immatriculée au RCS de Clermont-Ferrand sous le numéro 510 909 807, dont le siège social est situé 222-224 boulevard Gustave Flaubert, 63000 Clermont-Ferrand, France.',
        'Site : https://www.o2switch.fr',
      ],
    },
    {
      h: 'Propriété intellectuelle',
      p: [
        `L'ensemble des contenus de ce site (textes, images, logos, éléments graphiques) est la propriété de ${SITE.name} ou de ses partenaires, sauf mention contraire. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.`,
        'Les marques et logos des constructeurs (Nautique, MasterCraft, Connelly, etc.) demeurent la propriété de leurs détenteurs respectifs.',
      ],
    },
    {
      h: 'Données personnelles',
      p: [
        `Les informations recueillies via les formulaires du site sont traitées par ${SITE.name} pour répondre à vos demandes. Pour en savoir plus sur le traitement de vos données et l'exercice de vos droits, consultez notre Politique de confidentialité.`,
      ],
    },
    {
      h: 'Cookies',
      p: [
        'Ce site peut utiliser des cookies à des fins de fonctionnement et de mesure d’audience. Vous pouvez configurer votre navigateur pour les refuser ou ajuster votre consentement à tout moment.',
      ],
    },
  ],
};

const PRIVACY: { title: string; updated: string; blocks: Block[] } = {
  title: 'Politique de confidentialité',
  updated: '24 juin 2026',
  blocks: [
    {
      h: 'Responsable du traitement',
      p: [
        `${SITE.name}, ${FULL_ADDRESS}, ${SITE.addressRegion}, France, est responsable du traitement des données personnelles collectées sur ce site, conformément au Règlement Général sur la Protection des Données (RGPD, UE 2016/679) et à la loi Informatique et Libertés.`,
        `Pour toute question relative à vos données : ${SITE.phoneDisplay}, ${SITE.email}.`,
      ],
    },
    {
      h: 'Données collectées',
      p: ['Selon votre utilisation du site, nous sommes susceptibles de collecter :'],
      ul: [
        'Nom et prénom',
        'Adresse e-mail et numéro de téléphone',
        'Adresse postale',
        'Le contenu de vos demandes (message, service ou modèle concerné)',
        'Votre historique d’achats et de prestations (pièces, équipements, réparations, hivernage, transport)',
        'Données de navigation : adresse IP et identifiants de mesure d’audience (Google Analytics)',
      ],
    },
    {
      h: 'Finalités et base légale',
      p: [
        'Vos données sont utilisées pour répondre à vos demandes, établir un devis, assurer le suivi de la relation commerciale et, le cas échéant, vous adresser nos communications.',
        'Les bases légales mobilisées sont : l’exécution du contrat ou de mesures précontractuelles, votre consentement (cookies non essentiels), l’intérêt légitime de l’entreprise et le respect de ses obligations légales.',
      ],
    },
    {
      h: 'Destinataires',
      p: [
        `Les données sont destinées aux seuls services de ${SITE.name} et à ses sous-traitants techniques (hébergeur, outil de mesure d’audience). Elles ne sont jamais vendues ni cédées à des tiers à des fins commerciales.`,
      ],
    },
    {
      h: 'Durée de conservation',
      p: ['Vos données sont conservées pour les durées suivantes :'],
      ul: [
        'Clients : 5 ans à compter de la fin de la relation commerciale',
        'Prospects : 2 ans à compter de la collecte ou du dernier contact',
        'Cookies de mesure d’audience : 13 mois maximum',
      ],
    },
    {
      h: 'Cookies',
      p: [
        'Ce site utilise des cookies de fonctionnement (strictement nécessaires), de mesure d’audience (Google Analytics) et, le cas échéant, de ciblage publicitaire ou de partage sur les réseaux sociaux.',
        'Les cookies de mesure d’audience et de publicité ne sont déposés qu’après recueil de votre consentement via le bandeau prévu à cet effet. Vous pouvez modifier votre choix à tout moment.',
      ],
    },
    {
      h: 'Vos droits',
      p: ['Conformément au RGPD, vous disposez des droits d’accès, de rectification, d’effacement, de limitation, d’opposition, de portabilité de vos données et du droit de retirer votre consentement à tout moment.'],
      ul: [`Pour les exercer : ${SITE.email}`, 'En cas de difficulté, vous pouvez introduire une réclamation auprès de la CNIL (www.cnil.fr).'],
    },
  ],
};

const CGV: { title: string; updated: string; blocks: Block[] } = {
  title: 'Conditions générales de vente (Pro)',
  updated: '24 juin 2026',
  blocks: [
    {
      h: 'Objet et champ d’application',
      p: [
        `Les présentes conditions générales de vente (CGV) régissent l’ensemble des ventes de produits et prestations conclues entre ${SITE.name}, SIRET 920 936 713 00014, dont le siège est situé ${FULL_ADDRESS} (le « Vendeur »), et tout acheteur agissant à des fins professionnelles (le « Client »).`,
        'Elles s’appliquent aux commandes passées en magasin, par téléphone, par e-mail ou à distance. Toute commande implique l’acceptation sans réserve des présentes CGV, qui prévalent sur les conditions d’achat du Client.',
      ],
    },
    {
      h: 'Qualité du Client professionnel',
      p: [
        'Le Client déclare être âgé d’au moins 18 ans, disposer de la pleine capacité juridique et agir dans le cadre de son activité professionnelle principale ou accessoire. Les présentes CGV ne s’appliquent pas aux ventes conclues avec des consommateurs.',
      ],
    },
    {
      h: 'Prix et conditions de paiement',
      p: [
        'Les prix sont exprimés en euros, hors taxes (HT) et toutes taxes comprises (TTC). Sauf accord particulier, le règlement intervient à 30 jours à compter de la date de facture, par carte bancaire, virement ou prélèvement.',
        'Conformément aux articles L.441-10 et suivants du Code de commerce, tout retard de paiement entraîne de plein droit des pénalités calculées sur la base du taux de refinancement le plus récent de la BCE majoré de 10 points, ainsi qu’une indemnité forfaitaire pour frais de recouvrement de 40 €.',
      ],
    },
    {
      h: 'Réserve de propriété et transfert des risques',
      p: [
        'Le Vendeur conserve la propriété des produits vendus jusqu’au paiement intégral du prix. Le transfert des risques intervient quant à lui dès la livraison ou le retrait des produits par le Client.',
      ],
    },
    {
      h: 'Livraison et retrait',
      p: [
        'La livraison est assurée en France métropolitaine et dans les territoires d’outre-mer. Le retrait en magasin est gratuit et possible pendant 30 jours à compter de la confirmation de mise à disposition.',
        'Les délais de livraison sont communiqués à titre indicatif ; un retard ne saurait ouvrir droit à pénalité, indemnité, ni annulation de la commande.',
      ],
    },
    {
      h: 'Garantie des vices cachés',
      p: [
        'La garantie s’applique aux seuls produits régulièrement détenus et non périmés, à l’exclusion des conditions d’usage anormales. Les remèdes sont limités, au choix du Vendeur, au remplacement, à la réparation ou à l’émission d’un avoir, à l’exclusion de tout remboursement ou résolution du contrat.',
      ],
    },
    {
      h: 'Limitation de responsabilité',
      p: [
        'Le Vendeur ne saurait être tenu responsable des dommages indirects, pertes de profit ou préjudices commerciaux. En tout état de cause, sa responsabilité est plafonnée au montant effectivement réglé pour le produit ou la prestation concerné(e).',
      ],
    },
    {
      h: 'Force majeure',
      p: [
        'Les obligations des parties sont suspendues en cas de survenance d’un événement de force majeure échappant à leur contrôle raisonnable (grève, catastrophe naturelle, épidémie, etc.). Si l’empêchement se prolonge au-delà de 30 jours, le contrat est résolu de plein droit.',
      ],
    },
    {
      h: 'Droit applicable et litiges',
      p: [
        'Les présentes CGV sont soumises au droit français. Préalablement à toute action, les parties s’engagent à rechercher une solution amiable pendant 30 jours.',
        'À défaut d’accord, tout litige relève de la compétence exclusive du Tribunal de commerce d’Annecy.',
      ],
    },
  ],
};

const DOCS = { mentions: MENTIONS, privacy: PRIVACY, cgv: CGV } as const;
const PAGE_KEYS = { mentions: 'legal-mentions', privacy: 'legal-privacy', cgv: 'legal-cgv' } as const;
const SLUGS = {
  mentions: 'mentions-legales',
  privacy: 'politique-de-confidentialite',
  cgv: 'cgv-pro',
} as const;

export function legalMeta(doc: 'mentions' | 'privacy' | 'cgv') {
  const data = DOCS[doc];
  const slug = SLUGS[doc];
  const canonical = `${SITE.url}/${slug}`;
  return pageMeta({
    title: `${data.title} | ${SITE.name}`,
    description: `${data.title} de ${SITE.name}.`,
    canonical,
    robots: 'index, follow',
    // Un fil d'Ariane, rien de plus : sur des pages légales, tout autre schéma
    // serait du balisage sans contrepartie dans les résultats de recherche.
    jsonLd: [
      breadcrumbSchema([
        { name: 'Accueil', url: `${SITE.url}/` },
        { name: data.title, url: canonical },
      ]),
    ],
  });
}

export function LegalPage({ doc }: { doc: 'mentions' | 'privacy' | 'cgv' }) {
  const t = usePageContent(PAGE_KEYS[doc]);
  const title = t('title');
  const updated = t('updated');
  const blocks = t.list<{ h: string; body: string; bullets: string }>('blocks');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [doc]);

  return (
    <div className="bg-white">

      <header className="bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
          <Breadcrumb size="sm" items={[{ label: 'Accueil', to: '/' }, { label: title }]} />
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight">{title}</h1>
          {updated && <p className="text-gray-400 text-sm mt-3">Dernière mise à jour : {updated}</p>}
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        {blocks.map((b, i) => {
          const paras = String(b.body || '').split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
          const bullets = String(b.bullets || '').split('|').map((s) => s.trim()).filter(Boolean);
          return (
            <section key={i} className="mb-10">
              {b.h && <h2 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-4">{b.h}</h2>}
              {paras.map((para, j) => (
                <p key={j} className="text-gray-600 leading-relaxed mb-3">{para}</p>
              ))}
              {bullets.length > 0 && (
                <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                  {bullets.map((li, j) => (
                    <li key={j}>{li}</li>
                  ))}
                </ul>
              )}
            </section>
          );
        })}
      </article>
    </div>
  );
}
