import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowRight,
  List,
  Link2,
  ChevronRight,
  Phone,
} from 'lucide-react';
import { SITE } from '../../data/site';
import { Breadcrumb } from '../Breadcrumb';
import { BLOG_ARTICLES, categoryName } from '../../data/blog';

export interface TocItem {
  id: string;
  label: string;
}
export interface InternalLink {
  label: string;
  to: string;
  hint?: string;
}

interface Props {
  slug: string;
  path: string;
  title: string;
  category: string; // slug de catégorie
  date: string; // ISO
  hero: string;
  author?: string;
  readingTime?: string;
  toc: TocItem[];
  internalLinks?: InternalLink[];
  children: React.ReactNode;
}

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });

/** Barre de progression de lecture, fixée tout en haut de la fenêtre. */
function ReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? Math.min(100, (el.scrollTop / height) * 100) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return (
    <div className="fixed top-0 inset-x-0 h-1 z-[60] pointer-events-none">
      <div className="h-full bg-brand-cyan transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
}

/** Suit la section visible pour surligner l'entrée correspondante du sommaire. */
function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState(ids[0] ?? '');
  const key = ids.join('|');
  useEffect(() => {
    if (!ids.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: '-120px 0px -65% 0px', threshold: 0 },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  return active;
}

function Toc({ items, active }: { items: TocItem[]; active: string }) {
  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  };
  return (
    <nav aria-label="Sommaire">
      <ul className="space-y-1 border-l border-gray-200">
        {items.map((it) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => go(e, it.id)}
                className={`block -ml-px border-l-2 pl-4 py-1.5 text-sm leading-snug transition-colors ${
                  on
                    ? 'border-brand-cyan text-brand-dark font-semibold'
                    : 'border-transparent text-gray-500 hover:text-brand-dark hover:border-gray-300'
                }`}
              >
                {it.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function ArticleLayout({
  slug,
  path,
  title,
  category,
  date,
  hero,
  author = "L'équipe Motor Boat 74",
  readingTime,
  toc,
  internalLinks = [],
  children,
}: Props) {
  const active = useActiveHeading(toc.map((t) => t.id));
  const related = BLOG_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);
  const canonical = `${SITE.url}${path}/`;

  const RelatedList = () => (
    <ul className="space-y-4">
      {related.map((a) => (
        <li key={a.slug}>
          <Link to={a.path} className="group flex gap-3 items-start">
            <span className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-ink-900">
              <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </span>
            <span>
              <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-cyan mb-1">{categoryName(a.category)}</span>
              <span className="block text-sm font-semibold text-brand-dark leading-snug group-hover:text-brand-cyan transition-colors line-clamp-3">{a.title}</span>
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );

  const InternalLinks = () =>
    internalLinks.length ? (
      <ul className="space-y-1.5">
        {internalLinks.map((l) => (
          <li key={l.to}>
            <Link to={l.to} className="group flex items-center justify-between gap-2 py-2 text-sm text-gray-600 hover:text-brand-dark transition-colors">
              <span>
                <span className="font-medium">{l.label}</span>
                {l.hint && <span className="block text-xs text-gray-400">{l.hint}</span>}
              </span>
              <ChevronRight size={15} className="text-gray-300 group-hover:text-brand-cyan group-hover:translate-x-0.5 transition-all flex-shrink-0" />
            </Link>
          </li>
        ))}
      </ul>
    ) : null;

  return (
    <div className="bg-white">
      <ReadingProgress />

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt={title} className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-3xl mx-auto px-4 lg:px-8 py-20 lg:py-24">
          <Breadcrumb size="sm" items={[{ label: 'Accueil', to: '/' }, { label: 'Blog', to: '/blog' }, { label: categoryName(category) }]} />
          <span className="inline-block bg-brand-cyan text-brand-dark text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full mt-4 mb-5">
            {categoryName(category)}
          </span>
          <h1 className="text-3xl md:text-4xl lg:text-[2.75rem] font-bold uppercase tracking-tight leading-tight mb-6">{title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-300">
            <span className="flex items-center gap-2"><Calendar size={15} className="text-brand-cyan" /> {fmtDate(date)}</span>
            <span className="flex items-center gap-2"><User size={15} className="text-brand-cyan" /> {author}</span>
            {readingTime && <span className="flex items-center gap-2"><Clock size={15} className="text-brand-cyan" /> {readingTime} de lecture</span>}
          </div>
        </div>
      </header>

      {/* Corps : sidebar gauche + article */}
      <div className="max-w-[1180px] mx-auto px-4 lg:px-8 py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-12 xl:gap-16">
          {/* Sidebar (desktop) */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-10">
              {toc.length > 0 && (
                <div>
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-dark mb-4">
                    <List size={14} className="text-brand-cyan" /> Sommaire
                  </p>
                  <Toc items={toc} active={active} />
                </div>
              )}

              {internalLinks.length > 0 && (
                <div>
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-dark mb-3">
                    <Link2 size={14} className="text-brand-cyan" /> Liens utiles
                  </p>
                  <InternalLinks />
                </div>
              )}

              {related.length > 0 && (
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brand-dark mb-4">À lire aussi</p>
                  <RelatedList />
                </div>
              )}

              {/* Mini-CTA */}
              <div className="bg-brand-dark text-white rounded-2xl p-6">
                <p className="font-bold uppercase tracking-tight text-sm mb-2">Un projet, une question ?</p>
                <p className="text-gray-400 text-xs leading-relaxed mb-4">Nos experts vous répondent et établissent un devis gratuit sous 24 h.</p>
                <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-xs px-4 py-3 rounded-xl hover:bg-white transition">
                  <Phone size={14} /> {SITE.phoneDisplay}
                </a>
              </div>

              <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-brand-dark transition">
                <ArrowLeft size={14} /> Tous les articles
              </Link>
            </div>
          </aside>

          {/* Article */}
          <div className="min-w-0">
            {/* Sommaire repliable (mobile) */}
            {toc.length > 0 && (
              <details className="lg:hidden mb-8 bg-brand-light border border-gray-200 rounded-2xl overflow-hidden group">
                <summary className="flex items-center justify-between gap-2 px-5 py-4 cursor-pointer list-none font-bold uppercase tracking-widest text-xs text-brand-dark">
                  <span className="flex items-center gap-2"><List size={15} className="text-brand-cyan" /> Sommaire</span>
                  <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-5 pb-5">
                  <Toc items={toc} active={active} />
                </div>
              </details>
            )}

            <article className="max-w-3xl">{children}</article>

            {/* Maillage interne + autres lectures (mobile) */}
            <div className="lg:hidden mt-12 space-y-10">
              {internalLinks.length > 0 && (
                <div className="border-t border-gray-100 pt-8">
                  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-brand-dark mb-3">
                    <Link2 size={14} className="text-brand-cyan" /> Liens utiles
                  </p>
                  <InternalLinks />
                </div>
              )}
              {related.length > 0 && (
                <div className="border-t border-gray-100 pt-8">
                  <p className="text-[11px] font-bold uppercase tracking-widest text-brand-dark mb-4">À lire aussi</p>
                  <RelatedList />
                </div>
              )}
            </div>

            {/* Pied d'article : retour + partage */}
            <div className="max-w-3xl mt-14 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-between gap-4">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-dark transition">
                <ArrowLeft size={15} /> Retour au blog
              </Link>
              <div className="flex items-center gap-3">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-brand-cyan transition"
                >
                  Partager <ArrowRight size={14} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
