import { SITE } from '../data/site';
import { BlogArticlePage } from '../pages/BlogArticlePage';

// Article de blog dynamique (contenu en base, géré dans /admin).
// Non prérendu : servi via le fallback SPA, rendu côté client depuis /api/blog/:slug.
export function meta() {
  return [
    { title: `Blog | ${SITE.name}` },
    { tagName: 'link', rel: 'canonical', href: `${SITE.url}/blog/` },
  ];
}

export default function BlogArticle() {
  return <BlogArticlePage />;
}
