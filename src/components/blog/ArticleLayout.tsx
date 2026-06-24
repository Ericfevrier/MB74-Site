import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Clock,
  User,
  ArrowLeft,
  ArrowUpRight,
  List,
  Link2,
  ChevronRight,
  Phone,
  BookOpen,
  Share2,
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

/** Pourcentage de progression de lecture (partagé entre la barre et le sommaire). */
function useReadingProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const el = document.documentElement;
      const height = el.scrollHeight - el.clientHeight;
      setProgress(height > 0 ? Math.min(100, Math.max(0, (el.scrollTop / height) * 100)) : 0);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);
  return progress;
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

const SectionLabel = ({ icon: Icon, children }: { icon: React.ElementType; children: React.ReactNode }) => (
  <p className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-dark mb-4">
    <Icon size={14} className="text-brand-cyan" />
    {children}
  </p>
);

function Toc({ items, active }: { items: TocItem[]; active: string }) {
  const go = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    history.replaceState(null, '', `#${id}`);
  };
  return (
    <nav aria-label="Sommaire">
      <ol className="space-y-0.5">
        {items.map((it, i) => {
          const on = active === it.id;
          return (
            <li key={it.id}>
              <a
                href={`#${it.id}`}
                onClick={(e) => go(e, it.id)}
                className={`group flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors ${
                  on ? 'bg-brand-cyan/10' : 'hover:bg-gray-50'
                }`}
              >
                <span
                  className={`flex-shrink-0 w-6 h-6 rounded-lg grid place-items-center text-[10px] font-bold tabular-nums transition-colors ${
                    on ? 'bg-brand-cyan text-brand-dark' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span
                  className={`text-[13px] leading-snug transition-colors ${
                    on ? 'text-brand-dark font-semibold' : 'text-gray-500 group-hover:text-brand-dark'
                  }`}
                >
                  {it.label}
                </span>
              </a>
            </li>
          );
        })}
      </ol>
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
  const progress = useReadingProgress();
  const related = BLOG_ARTICLES.filter((a) => a.slug !== slug).slice(0, 3);
  const canonical = `${SITE.url}${path}/`;

  const cardClass =
    'rounded-2xl border border-gray-200/80 bg-white shadow-[0_8px_30px_-18px_rgba(15,23,42,0.25)]';

  const SommaireCard = () => (
    <div className={`${cardClass} overflow-hidden`}>
      <div className="flex items-center justify-between px-5 py-3.5 border-b border-gray-100">
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.15em] text-brand-dark">
          <List size={14} className="text-brand-cyan" /> Sommaire
        </span>
        <span className="text-[11px] font-bold text-brand-cyan tabular-nums">{Math.round(progress)}%</span>
      </div>
      <div className="h-1 bg-gray-100">
        <div className="h-full bg-brand-cyan transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>
      <div className="p-2.5">
        <Toc items={toc} active={active} />
      </div>
    </div>
  );

  const LinksCard = () =>
    internalLinks.length ? (
      <div className={`${cardClass} p-5`}>
        <SectionLabel icon={Link2}>Liens utiles</SectionLabel>
        <ul className="space-y-1">
          {internalLinks.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="group flex items-center gap-3 rounded-xl px-2 py-2 -mx-2 hover:bg-gray-50 transition-colors">
                <span className="flex-shrink-0 w-9 h-9 rounded-xl bg-brand-cyan/10 text-brand-cyan grid place-items-center group-hover:bg-brand-cyan group-hover:text-brand-dark transition-colors">
                  <ArrowUpRight size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-semibold text-brand-dark leading-tight">{l.label}</span>
                  {l.hint && <span className="block text-[11px] text-gray-400 leading-tight mt-0.5">{l.hint}</span>}
                </span>
                <ChevronRight size={15} className="text-gray-300 group-hover:text-brand-cyan group-hover:translate-x-0.5 transition-all flex-shrink-0" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  const RelatedCard = () =>
    related.length ? (
      <div className={`${cardClass} p-5`}>
        <SectionLabel icon={BookOpen}>À lire aussi</SectionLabel>
        <ul className="space-y-4">
          {related.map((a) => (
            <li key={a.slug}>
              <Link to={a.path} className="group flex gap-3 items-start">
                <span className="flex-shrink-0 w-16 h-16 rounded-xl overflow-hidden bg-ink-900">
                  <img src={a.image} alt={a.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </span>
                <span className="min-w-0">
                  <span className="block text-[10px] font-bold uppercase tracking-widest text-brand-cyan mb-1">{categoryName(a.category)}</span>
                  <span className="block text-[13px] font-semibold text-brand-dark leading-snug group-hover:text-brand-cyan transition-colors line-clamp-3">{a.title}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    ) : null;

  const CtaCard = () => (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-dark to-ink-900 text-white p-6">
      <div className="absolute -top-12 -right-12 w-36 h-36 bg-brand-cyan/15 rounded-full blur-2xl" />
      <div className="relative">
        <p className="font-bold uppercase tracking-tight text-sm mb-2">Un projet, une question ?</p>
        <p className="text-gray-400 text-xs leading-relaxed mb-5">Nos experts vous répondent et établissent un devis gratuit sous 24 h.</p>
        <a href={SITE.phoneHref} className="flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-xs px-4 py-3 rounded-xl hover:bg-white transition">
          <Phone size={14} /> {SITE.phoneDisplay}
        </a>
        <Link to="/contact" className="mt-2 flex items-center justify-center gap-2 border border-white/15 text-white/80 font-bold uppercase tracking-widest text-[11px] px-4 py-2.5 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
          Formulaire de contact
        </Link>
      </div>
    </div>
  );

  return (
    <div className="bg-brand-light">
      {/* Barre de progression de lecture */}
      <div className="fixed top-0 inset-x-0 h-1 z-[60] pointer-events-none">
        <div className="h-full bg-brand-cyan transition-[width] duration-150 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* Hero */}
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt={title} className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-[1480px] mx-auto px-5 sm:px-7 lg:px-10 xl:px-14 py-20 lg:py-24">
          <div className="max-w-3xl">
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
        </div>
      </header>

      {/* Corps : sidebar gauche + article */}
      <div className="max-w-[1480px] mx-auto px-5 sm:px-7 lg:px-10 xl:px-14 py-12 lg:py-16">
        <div className="lg:grid lg:grid-cols-[18rem_minmax(0,1fr)] lg:gap-10 xl:gap-14">
          {/* Sidebar (desktop) — sticky avec scroll interne pour ne jamais être coupée */}
          <aside className="hidden lg:block">
            <div className="sticky top-28 max-h-[calc(100vh-8rem)] overflow-y-auto overscroll-contain space-y-5 pr-2 pb-4 [scrollbar-width:thin] [scrollbar-color:rgb(203_213_225)_transparent]">
              {toc.length > 0 && <SommaireCard />}
              <LinksCard />
              <RelatedCard />
              <CtaCard />
              <Link to="/blog" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-brand-dark transition px-1">
                <ArrowLeft size={14} /> Tous les articles
              </Link>
            </div>
          </aside>

          {/* Article */}
          <div className="min-w-0">
            {/* Sommaire repliable (mobile) */}
            {toc.length > 0 && (
              <details className="lg:hidden mb-8 rounded-2xl border border-gray-200/80 bg-white shadow-sm overflow-hidden group">
                <summary className="flex items-center justify-between gap-2 px-5 py-4 cursor-pointer list-none font-bold uppercase tracking-widest text-xs text-brand-dark">
                  <span className="flex items-center gap-2"><List size={15} className="text-brand-cyan" /> Sommaire</span>
                  <ChevronRight size={16} className="text-gray-400 group-open:rotate-90 transition-transform" />
                </summary>
                <div className="px-3 pb-3">
                  <Toc items={toc} active={active} />
                </div>
              </details>
            )}

            <article className="bg-white rounded-[1.75rem] border border-gray-200/70 shadow-[0_12px_50px_-28px_rgba(15,23,42,0.3)] p-6 sm:p-10 lg:p-12 xl:px-16">
              {children}
            </article>

            {/* Maillage interne + autres lectures (mobile) */}
            <div className="lg:hidden mt-8 space-y-6">
              <LinksCard />
              <RelatedCard />
              <CtaCard />
            </div>

            {/* Pied d'article : retour + partage */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 px-1">
              <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-dark transition">
                <ArrowLeft size={15} /> Retour au blog
              </Link>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(canonical)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-brand-cyan transition"
              >
                <Share2 size={14} /> Partager
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
