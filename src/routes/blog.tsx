import { useLoaderData } from 'react-router';
import { BlogHubPage } from '../pages/BlogHubPage';
import { BLOG_ARTICLES, BLOG_CATEGORIES } from '../data/blog';
import { serverCms, fetchBlogArticles, fetchBlogCategories } from '../lib/cms';

/** Loader SSR : articles + catégories lus en live depuis le CMS (repli statique). */
export async function clientLoader() {
  const cfg = await serverCms();
  if (cfg) {
    try {
      const [articles, categories] = await Promise.all([
        fetchBlogArticles(cfg),
        fetchBlogCategories(cfg),
      ]);
      if (articles.length) return { articles, categories };
    } catch {
      /* repli statique */
    }
  }
  return { articles: BLOG_ARTICLES, categories: BLOG_CATEGORIES };
}

export default function Blog() {
  const { articles, categories } = useLoaderData<typeof clientLoader>();
  return <BlogHubPage articles={articles} categories={categories} />;
}
