import React, { useEffect, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router';
import { ArrowLeft, CalendarDays, Clock, Loader2 } from 'lucide-react';
import { marked } from 'marked';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { categoryName } from '../data/blog';
import { fetchPublicArticle, type PublicArticle } from '../lib/publicApi';

const fmtDate = (iso?: string) =>
  iso ? new Date(iso).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : '';

export function BlogArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [article, setArticle] = useState<PublicArticle | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'notfound'>('loading');

  useEffect(() => {
    window.scrollTo(0, 0);
    let alive = true;
    if (!slug) return;
    fetchPublicArticle(slug)
      .then((a) => alive && (setArticle(a), setStatus('ok')))
      .catch(() => alive && setStatus('notfound'));
    return () => {
      alive = false;
    };
  }, [slug]);

  if (status === 'loading') {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-brand-light">
        <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
      </div>
    );
  }
  // Slug inconnu en base → retour au blog (la page guide hand-codée a sa propre route).
  if (status === 'notfound' || !article) return <Navigate to="/blog" replace />;

  const html = marked.parse(article.content || '') as string;

  return (
    <article className="bg-white">
      <header className="relative bg-brand-dark text-white overflow-hidden">
        {article.image && (
          <div className="absolute inset-0">
            <img src={article.image} alt="" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" />
            <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/85 to-brand-dark" />
          </div>
        )}
        <div className="relative max-w-3xl mx-auto px-4 lg:px-8 py-16 lg:py-20">
          <Breadcrumb
            className="mb-6"
            items={[{ label: 'Accueil', to: '/' }, { label: 'Blog', to: '/blog' }, { label: article.title }]}
          />
          {article.category && (
            <span className="inline-block text-brand-cyan font-bold uppercase tracking-widest text-xs mb-4">
              {categoryName(article.category)}
            </span>
          )}
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight leading-tight mb-6">{article.title}</h1>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-300">
            {article.date && (
              <span className="inline-flex items-center gap-2"><CalendarDays size={15} className="text-brand-cyan" /> {fmtDate(article.date)}</span>
            )}
            {article.readingTime && (
              <span className="inline-flex items-center gap-2"><Clock size={15} className="text-brand-cyan" /> {article.readingTime}</span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 lg:px-8 py-14">
        {article.excerpt && <p className="text-lg text-gray-600 leading-relaxed mb-10 font-medium">{article.excerpt}</p>}
        <div className="prose-mb74" dangerouslySetInnerHTML={{ __html: html }} />

        <div className="mt-14 pt-8 border-t border-gray-200">
          <Link to="/blog" className="inline-flex items-center gap-2 text-brand-cyan font-bold uppercase tracking-widest text-sm hover:underline">
            <ArrowLeft size={16} /> Retour au blog
          </Link>
        </div>
      </div>
    </article>
  );
}
