import React, { useMemo, useState } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, CalendarDays, Clock } from 'lucide-react';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { BLOG_CATEGORIES, BLOG_ARTICLES, categoryName, type BlogArticle, type BlogCategory } from '../data/blog';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';

const HERO = 'https://www.mastercraft.com/media/iujfrvnt/dt-background-image-1.webp';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

export function BlogHubPage({ articles: articlesProp, categories: categoriesProp }: { articles?: BlogArticle[]; categories?: BlogCategory[] } = {}) {
  const canonical = `${SITE.url}/blog/`;
  const [active, setActive] = useState<string | null>(null);
  const allArticles = articlesProp ?? BLOG_ARTICLES;
  const categories = categoriesProp ?? BLOG_CATEGORIES;

  const articles = useMemo(
    () => (active ? allArticles.filter((a) => a.category === active) : allArticles),
    [active, allArticles],
  );

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: `Blog ${SITE.name}`,
      url: canonical,
      description: 'Conseils, guides et actualités nautiques par Motor Boat 74, près du lac d’Annecy.',
      blogPost: allArticles.map((a) => ({
        '@type': 'BlogPosting',
        headline: a.title,
        url: `${SITE.url}${a.path}/`,
        datePublished: a.date,
        articleSection: categoryName(a.category),
      })),
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Accueil', item: `${SITE.url}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: canonical },
      ],
    },
  ];

  return (
    <div className="bg-brand-light">
      <Helmet>
        <title>{`Blog | Conseils & actualités nautiques | ${SITE.name}`}</title>
        <meta
          name="description"
          content="Le blog de Motor Boat 74 : guides d’entretien et d’hivernage, comparatifs, actualités Nautique et MasterCraft, conseils d’achat et de revente, près du lac d’Annecy."
        />
        <link rel="canonical" href={canonical} />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={`Blog | ${SITE.name}`} />
        <meta property="og:url" content={canonical} />
        <meta property="og:image" content={HERO} />
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="Le blog Motor Boat 74" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          <Breadcrumb className="mb-6 inline-flex" items={[{ label: 'Accueil', to: '/' }, { label: 'Blog' }]} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6">Le Blog</h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Bienvenue sur le blog de <strong>Motor Boat 74</strong>, la référence pour tous les passionnés de nautisme.
            Guides, conseils d’experts et actualités autour du wakeboard, du ski nautique et de l’entretien de votre bateau.
          </p>
        </div>
      </header>

      {/* Filtres catégories */}
      <section className="bg-white border-b border-gray-100 sticky top-[64px] lg:top-[80px] z-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-5 flex flex-wrap gap-2.5 justify-center">
          <button
            onClick={() => setActive(null)}
            className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition ${
              active === null ? 'bg-brand-dark text-white' : 'bg-brand-light text-gray-500 hover:text-brand-dark'
            }`}
          >
            Tous les articles
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              onClick={() => setActive(c.slug)}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest transition ${
                active === c.slug ? 'bg-brand-cyan text-brand-dark' : 'bg-brand-light text-gray-500 hover:text-brand-dark'
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </section>

      {/* Liste des articles */}
      <section className="py-16 lg:py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {articles.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {articles.map((a) => (
                <article
                  key={a.slug}
                  className="group bg-white border border-gray-200/70 rounded-[1.75rem] overflow-hidden shadow-[0_12px_40px_-18px_rgba(15,23,42,0.35)] hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  <Link to={a.path} className="block relative aspect-[16/10] overflow-hidden bg-ink-900">
                    <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    <span className="absolute top-4 left-4 bg-brand-cyan text-brand-dark text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                      {categoryName(a.category)}
                    </span>
                  </Link>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex items-center gap-4 text-gray-400 text-xs font-medium mb-3">
                      <span className="inline-flex items-center gap-1.5"><CalendarDays size={13} /> {fmtDate(a.date)}</span>
                      {a.readingTime && <span className="inline-flex items-center gap-1.5"><Clock size={13} /> {a.readingTime}</span>}
                    </div>
                    <h2 className="text-lg font-bold text-brand-dark leading-snug mb-3">
                      <Link to={a.path} className="hover:text-brand-cyan transition-colors">{a.title}</Link>
                    </h2>
                    <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{a.excerpt}</p>
                    <Link to={a.path} className="inline-flex items-center gap-2 text-brand-dark font-bold uppercase tracking-widest text-xs hover:text-brand-cyan transition mt-auto">
                      Lire l’article <ArrowRight size={15} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-[2rem] p-10 md:p-16 text-center max-w-3xl mx-auto">
              <p className="text-brand-dark text-xl font-bold mb-3">Aucun article dans cette catégorie pour le moment</p>
              <p className="text-gray-500 leading-relaxed mb-8">
                De nouveaux contenus arrivent régulièrement. Revenez bientôt ou explorez les autres catégories.
              </p>
              <button onClick={() => setActive(null)} className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-brand-cyan hover:text-brand-dark transition">
                Voir tous les articles <ArrowRight size={16} />
              </button>
            </div>
          )}
        </div>
      </section>

      <ServiceContactBlock subject="Question nautique" title="Une question sur votre bateau ?" showMap />
    </div>
  );
}
