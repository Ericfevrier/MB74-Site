/**
 * Données du blog Motor Boat 74.
 * Les catégories reprennent celles du site actuel (motorboat74.com/blog).
 * Les articles publiés sont reliés à leur page dédiée.
 *
 * SOURCE : contenu CMS généré au build s'il existe, sinon le statique (repli).
 */
import { GENERATED_BLOG_ARTICLES, GENERATED_BLOG_CATEGORIES } from './generated/blog';

export interface BlogCategory {
  slug: string;
  name: string;
}

export interface BlogArticle {
  slug: string;
  /** Chemin complet vers la page de l'article. */
  path: string;
  title: string;
  excerpt: string;
  category: string; // slug de catégorie
  date: string; // ISO
  image: string;
  readingTime?: string;
}

const STATIC_BLOG_CATEGORIES: BlogCategory[] = [
  { slug: 'achat-vente', name: 'Achat / Vente' },
  { slug: 'actualite-nautique', name: 'Actualité nautique' },
  { slug: 'comparatifs', name: 'Comparatifs' },
  { slug: 'entretien-reparation', name: 'Entretien et réparation' },
  { slug: 'hivernage', name: 'Hivernage' },
  { slug: 'marques', name: 'Marques' },
  { slug: 'mastercraft', name: 'MasterCraft' },
  { slug: 'nautique', name: 'Nautique' },
];

const STATIC_BLOG_ARTICLES: BlogArticle[] = [
  {
    slug: 'hivernage-bateau-guide-complet',
    path: '/blog/hivernage/hivernage-bateau-guide-complet',
    title: 'Hivernage bateau : le guide complet pour bien préparer votre bateau',
    excerpt:
      'Découvrez toutes les étapes essentielles pour protéger votre embarcation pendant la période hivernale et assurer sa longévité : coque, moteur, stockage et entretien.',
    category: 'hivernage',
    date: '2025-10-06',
    image: '/images/hivernage/annecy.jpg',
    readingTime: '12 min',
  },
];

// Source effective : CMS si généré, sinon statique.
export const BLOG_CATEGORIES: BlogCategory[] = GENERATED_BLOG_CATEGORIES.length
  ? (GENERATED_BLOG_CATEGORIES as unknown as BlogCategory[])
  : STATIC_BLOG_CATEGORIES;

export const BLOG_ARTICLES: BlogArticle[] = GENERATED_BLOG_ARTICLES.length
  ? (GENERATED_BLOG_ARTICLES as unknown as BlogArticle[])
  : STATIC_BLOG_ARTICLES;

export const categoryName = (slug: string): string =>
  BLOG_CATEGORIES.find((c) => c.slug === slug)?.name ?? slug;

export const articlesByCategory = (slug: string): BlogArticle[] =>
  BLOG_ARTICLES.filter((a) => a.category === slug);
