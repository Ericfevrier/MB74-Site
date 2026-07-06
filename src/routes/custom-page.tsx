import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Loader2 } from 'lucide-react';
import { NotFound } from '../components/NotFound';
import { Breadcrumb } from '../components/Breadcrumb';
import { BlockRenderer } from '../components/blocks/BlockRenderer';
import { useSeoOverride } from '../lib/seo';
import type { CustomPage } from '../lib/blocks';

/** SPA : les pages libres sont en base (non prérendues). */
export function clientLoader() {
  return null;
}

export default function CustomPageRoute() {
  const { slug } = useParams<{ slug: string }>();
  const [page, setPage] = useState<CustomPage | null>(null);
  const [status, setStatus] = useState<'loading' | 'ok' | 'notfound'>('loading');
  useSeoOverride(page?.seo);

  useEffect(() => {
    window.scrollTo(0, 0);
    let alive = true;
    if (!slug) return;
    const preview = new URLSearchParams(window.location.search).has('preview');
    fetch(`/api/custom-pages/${encodeURIComponent(slug)}${preview ? '?preview=1' : ''}`)
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((j) => {
        if (!alive) return;
        setPage(j.page);
        setStatus('ok');
        if (j.page?.title) document.title = `${j.page.title} | Motor Boat 74`;
      })
      .catch(() => alive && setStatus('notfound'));
    return () => { alive = false; };
  }, [slug]);

  if (status === 'loading') {
    return <div className="min-h-[60vh] flex items-center justify-center bg-brand-light"><Loader2 className="w-8 h-8 animate-spin text-brand-cyan" /></div>;
  }
  if (status === 'notfound' || !page) return <NotFound />;

  return (
    <div className="bg-brand-light min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8 pt-28 pb-4">
        <Breadcrumb items={[{ label: 'Accueil', to: '/' }, { label: page.title }]} />
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase tracking-tight text-brand-dark mt-4">{page.title}</h1>
      </div>
      <div className="pb-16">
        <BlockRenderer blocks={page.blocks || []} />
      </div>
    </div>
  );
}
