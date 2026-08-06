import { BlogHubPage } from '../pages/BlogHubPage';
export { blogHubMeta as meta } from '../pages/BlogHubPage';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from '../data/blog';
import { useLiveBlog } from '../lib/publicApi';

// Pas de clientLoader : voir marque.tsx — il empêchait le prerender et vidait le HTML.
// Les articles statiques sont rendus au build (indexables sans JavaScript) ; useLiveBlog
// rafraîchit ensuite depuis la base côté navigateur, comme les autres pages pilotées
// par l'admin. Les catégories restent statiques, l'API publique ne les expose pas.
export default function Blog() {
  const live = useLiveBlog();
  const articles = live.articles && live.articles.length ? live.articles : BLOG_ARTICLES;
  return <BlogHubPage articles={articles} categories={BLOG_CATEGORIES} />;
}
