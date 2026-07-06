import React, { useState } from 'react';
import { Link } from 'react-router';
import { marked } from 'marked';
import { ChevronDown, ArrowRight } from 'lucide-react';
import type { Block } from '../../lib/blocks';

const md = (s: string) => marked.parse(s || '') as string;

function Btn({ label, url }: { label?: string; url?: string }) {
  if (!label || !url) return null;
  const cls = 'inline-flex items-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-white transition';
  return /^https?:\/\//i.test(url)
    ? <a href={url} target="_blank" rel="noreferrer" className={cls}>{label} <ArrowRight size={16} /></a>
    : <Link to={url} className={cls}>{label} <ArrowRight size={16} /></Link>;
}

function FaqBlock({ title, items }: { title?: string; items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="max-w-3xl mx-auto">
      {title && <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mb-8 text-center">{title}</h2>}
      <div className="space-y-4">
        {items.map((f, i) => (
          <div key={i} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-sm">
            <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left p-6 flex items-center justify-between gap-4 font-medium text-base text-brand-dark hover:bg-gray-50 transition">
              {f.q}
              <ChevronDown className={`flex-shrink-0 transition-transform ${open === i ? 'rotate-180 text-brand-cyan' : ''}`} />
            </button>
            {open === i && <div className="px-6 pb-6 text-gray-600 leading-relaxed text-sm prose-mb74" dangerouslySetInnerHTML={{ __html: md(f.a) }} />}
          </div>
        ))}
      </div>
    </div>
  );
}

function One({ block }: { block: Block }) {
  const d = block.data || {};
  switch (block.type) {
    case 'heading':
      return React.createElement(
        d.level === 'h3' ? 'h3' : 'h2',
        { className: `font-bold uppercase tracking-tight text-brand-dark ${d.level === 'h3' ? 'text-2xl md:text-3xl' : 'text-3xl md:text-4xl'} ${d.align === 'center' ? 'text-center' : ''}` },
        d.text,
      );
    case 'richtext':
      return <div className="prose-mb74 max-w-3xl mx-auto" dangerouslySetInnerHTML={{ __html: md(d.markdown) }} />;
    case 'image':
      return d.url ? (
        <figure className="max-w-4xl mx-auto">
          <img src={d.url} alt={d.alt || ''} className={`w-full object-cover ${d.rounded ? 'rounded-3xl' : ''}`} referrerPolicy="no-referrer" loading="lazy" />
          {d.caption && <figcaption className="text-center text-sm text-gray-500 mt-3">{d.caption}</figcaption>}
        </figure>
      ) : null;
    case 'imageText':
      return (
        <div className={`grid lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-[1200px] mx-auto ${d.position === 'right' ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          {d.image && <img src={d.image} alt={d.title || ''} className="w-full rounded-3xl object-cover aspect-[4/3]" referrerPolicy="no-referrer" loading="lazy" />}
          <div>
            {d.title && <h2 className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand-dark mb-4">{d.title}</h2>}
            <div className="prose-mb74 text-gray-600" dangerouslySetInnerHTML={{ __html: md(d.text) }} />
            {d.buttonLabel && <div className="mt-6"><Btn label={d.buttonLabel} url={d.buttonUrl} /></div>}
          </div>
        </div>
      );
    case 'cards':
      return (
        <div className="max-w-[1200px] mx-auto">
          {d.title && <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mb-10 text-center">{d.title}</h2>}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {(d.items || []).map((c: any, i: number) => {
              const inner = (
                <>
                  <h3 className="font-bold text-brand-dark uppercase tracking-tight text-lg mb-2">{c.title}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{c.text}</p>
                </>
              );
              return c.url ? (
                <Link key={i} to={c.url} className="block bg-white border border-gray-200 rounded-3xl p-7 hover:border-brand-cyan hover:-translate-y-1 transition">{inner}</Link>
              ) : (
                <div key={i} className="bg-white border border-gray-200 rounded-3xl p-7">{inner}</div>
              );
            })}
          </div>
        </div>
      );
    case 'cta':
      return (
        <div className={`max-w-[1000px] mx-auto rounded-[2rem] p-10 md:p-14 text-center ${d.style === 'dark' ? 'bg-brand-dark text-white' : 'bg-brand-cyan text-brand-dark'}`}>
          {d.title && <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mb-4">{d.title}</h2>}
          {d.text && <p className={`text-lg mb-8 max-w-2xl mx-auto ${d.style === 'dark' ? 'text-gray-300' : 'text-brand-dark/80'}`}>{d.text}</p>}
          <div className="flex justify-center"><Btn label={d.buttonLabel} url={d.buttonUrl} /></div>
        </div>
      );
    case 'faq':
      return <FaqBlock title={d.title} items={d.items || []} />;
    case 'gallery':
      return (
        <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {(d.images || []).map((im: any, i: number) => (
            <img key={i} src={typeof im === 'string' ? im : im.url} alt={(im && im.alt) || ''} className="w-full aspect-square object-cover rounded-2xl" referrerPolicy="no-referrer" loading="lazy" />
          ))}
        </div>
      );
    default:
      return null;
  }
}

/** Rend une liste de blocs, chacun dans une section espacée. */
export function BlockRenderer({ blocks }: { blocks: Block[] }) {
  return (
    <>
      {blocks.map((b) => (
        <section key={b.id} className="px-4 lg:px-8 py-8 md:py-12">
          <One block={b} />
        </section>
      ))}
    </>
  );
}
