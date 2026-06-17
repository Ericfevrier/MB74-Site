import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';

type Block = { h?: string; p?: string[]; ul?: string[] };

const FULL_ADDRESS = `${SITE.addressStreet}, ${SITE.addressPostal} ${SITE.addressLocality}`;

const MENTIONS: { title: string; updated: string; blocks: Block[] } = {
  title: 'Mentions légales',
  updated: '2026',
  blocks: [
    {
      h: 'Éditeur du site',
      p: [
        `Le présent site est édité par ${SITE.name}.`,
        `Forme juridique et capital social : [À COMPLÉTER].`,
        `Siège social : ${FULL_ADDRESS}, ${SITE.addressRegion}, France.`,
        `Téléphone : ${SITE.phoneDisplay} — Email : ${SITE.email}.`,
        `SIRET : [À COMPLÉTER] — RCS : [À COMPLÉTER] — N° TVA intracommunautaire : [À COMPLÉTER].`,
      ],
    },
    {
      h: 'Directeur de la publication',
      p: ['[À COMPLÉTER — nom du représentant légal].'],
    },
    {
      h: 'Hébergement',
      p: [
        'Le site est hébergé par la société o2switch — SAS au capital de 100 000 € — 222-224 Boulevard Gustave Flaubert, 63000 Clermont-Ferrand, France.',
        'Téléphone : 04 44 44 60 40 — Site : https://www.o2switch.fr',
      ],
    },
    {
      h: 'Propriété intellectuelle',
      p: [
        `L'ensemble des contenus de ce site (textes, images, logos, éléments graphiques) est la propriété de ${SITE.name} ou de ses partenaires, sauf mention contraire. Toute reproduction, représentation ou diffusion, totale ou partielle, sans autorisation écrite préalable est interdite.`,
        'Les marques et logos des constructeurs (Nautique, Connelly, etc.) demeurent la propriété de leurs détenteurs respectifs.',
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
        'Ce site peut utiliser des cookies à des fins de fonctionnement et de mesure d’audience. Vous pouvez configurer votre navigateur pour les refuser.',
      ],
    },
  ],
};

const PRIVACY: { title: string; updated: string; blocks: Block[] } = {
  title: 'Politique de confidentialité',
  updated: '2026',
  blocks: [
    {
      h: 'Responsable du traitement',
      p: [
        `${SITE.name}, ${FULL_ADDRESS}, ${SITE.addressRegion}, est responsable du traitement des données collectées sur ce site.`,
        `Contact : ${SITE.phoneDisplay} — ${SITE.email}.`,
      ],
    },
    {
      h: 'Données collectées',
      p: ['Lorsque vous utilisez nos formulaires de contact ou de devis, nous collectons les informations suivantes :'],
      ul: ['Nom et prénom', 'Adresse e-mail', 'Numéro de téléphone', 'Le contenu de votre message', 'Le service ou modèle concerné'],
    },
    {
      h: 'Finalités et base légale',
      p: [
        'Vos données sont utilisées exclusivement pour répondre à vos demandes, établir un devis et assurer le suivi de la relation commerciale.',
        'La base légale du traitement est votre consentement (formulaire) et l’intérêt légitime de l’entreprise à répondre à ses prospects et clients.',
      ],
    },
    {
      h: 'Destinataires',
      p: [
        `Les données sont destinées aux seuls services de ${SITE.name} et, le cas échéant, à son hébergeur technique (o2switch). Elles ne sont jamais vendues ni cédées à des tiers à des fins commerciales.`,
      ],
    },
    {
      h: 'Durée de conservation',
      p: ['Vos données sont conservées le temps nécessaire au traitement de votre demande, puis archivées conformément aux durées légales (par défaut 3 ans à compter du dernier contact). [À ajuster selon votre politique interne.]'],
    },
    {
      h: 'Vos droits',
      p: ['Conformément au RGPD, vous disposez des droits d’accès, de rectification, d’effacement, de limitation, d’opposition et de portabilité de vos données.'],
      ul: [`Pour les exercer : ${SITE.email}`, 'En cas de litige, vous pouvez saisir la CNIL (www.cnil.fr).'],
    },
    {
      h: 'Cookies',
      p: ['Ce site limite l’usage des cookies au strict nécessaire au fonctionnement et à la mesure d’audience. Vous pouvez les refuser via les paramètres de votre navigateur.'],
    },
  ],
};

export function LegalPage({ doc }: { doc: 'mentions' | 'privacy' }) {
  const data = doc === 'mentions' ? MENTIONS : PRIVACY;
  const slug = doc === 'mentions' ? 'mentions-legales' : 'politique-de-confidentialite';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [doc]);

  return (
    <div className="bg-white">
      <Helmet>
        <title>{data.title} | {SITE.name}</title>
        <meta name="description" content={`${data.title} de ${SITE.name}.`} />
        <link rel="canonical" href={`${SITE.url}/${slug}/`} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <header className="bg-brand-dark text-white">
        <div className="max-w-4xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
          <Breadcrumb size="sm" items={[{ label: 'Accueil', to: '/' }, { label: data.title }]} />
          <h1 className="text-3xl md:text-4xl font-bold uppercase tracking-tight leading-tight">{data.title}</h1>
          <p className="text-gray-400 text-sm mt-3">Dernière mise à jour : {data.updated}</p>
        </div>
      </header>

      <article className="max-w-4xl mx-auto px-4 lg:px-8 py-16">
        {data.blocks.map((b, i) => (
          <section key={i} className="mb-10">
            {b.h && <h2 className="text-xl font-bold uppercase tracking-tight text-brand-dark mb-4">{b.h}</h2>}
            {b.p?.map((para, j) => (
              <p key={j} className="text-gray-600 leading-relaxed mb-3">{para}</p>
            ))}
            {b.ul && (
              <ul className="list-disc pl-6 space-y-1.5 text-gray-600">
                {b.ul.map((li, j) => (
                  <li key={j}>{li}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>
    </div>
  );
}
