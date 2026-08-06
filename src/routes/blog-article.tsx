import { SITE } from '../data/site';
import { BlogArticlePage } from '../pages/BlogArticlePage';

// Article de blog dynamique (contenu en base, géré dans /admin).
// Non prérendu : servi via le fallback SPA, rendu côté client depuis /api/blog/:slug.
//
// Le canonical pointait vers /blog/ : un canonical vers une AUTRE page déclare la
// page courante comme doublon, donc chaque article se dés-indexait lui-même. Il
// pointe désormais sur l'article, seule valeur correcte.
//
// LIMITE CONNUE : le titre et la description restent génériques, faute de connaître
// le contenu de l'article au moment du rendu du <head> (les données arrivent côté
// navigateur). Tant que ces articles ne sont pas prérendus ou que le serveur
// n'injecte pas leurs métas, ils resteront mal référencés. À traiter séparément.
export function meta({ params }: { params: { slug?: string } }) {
  const canonical = params.slug ? `${SITE.url}/blog/${params.slug}` : `${SITE.url}/blog`;
  return [
    { title: `Blog | ${SITE.name}` },
    { tagName: 'link', rel: 'canonical', href: canonical },
  ];
}

export default function BlogArticle() {
  return <BlogArticlePage />;
}
