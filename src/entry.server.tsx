import { renderToString } from 'react-dom/server';
import { ServerRouter, type EntryContext } from 'react-router';
import { HelmetProvider } from 'react-helmet-async';

/**
 * Entrée serveur custom : rendu non-streamé (renderToString) pour pouvoir collecter
 * les balises de react-helmet-async et les injecter dans <head>.
 * → Toutes les pages gardent leur <Helmet> ; le SEO est dans le HTML SSR.
 */
export default function handleRequest(
  request: Request,
  responseStatusCode: number,
  responseHeaders: Headers,
  routerContext: EntryContext,
) {
  const helmetContext: { helmet?: any } = {};

  const markup = renderToString(
    <HelmetProvider context={helmetContext}>
      <ServerRouter context={routerContext} url={request.url} />
    </HelmetProvider>,
  );

  const h = helmetContext.helmet;
  const headTags = h
    ? [h.title, h.priority, h.meta, h.link, h.script, h.noscript, h.style]
        .filter(Boolean)
        .map((t: any) => t.toString())
        .join('')
    : '';

  const html = '<!DOCTYPE html>' + markup.replace('</head>', `${headTags}</head>`);

  responseHeaders.set('Content-Type', 'text/html; charset=utf-8');
  return new Response(html, { status: responseStatusCode, headers: responseHeaders });
}
