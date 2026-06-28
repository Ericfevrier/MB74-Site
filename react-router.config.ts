import type { Config } from '@react-router/dev/config';
import { BRAND_MODELS } from './src/data/boatBrands';
import { HIVERNAGE_CITY_ORDER } from './src/data/hivernageCities';
import { allUsedBoats } from './src/data/usedBoats';
import { BLOG_ARTICLES } from './src/data/blog';

// SPA (rendu côté client) — comme Ilico, qui tourne sans souci sur o2switch.
// Le SSR (rendu lourd à chaque requête) saturait l'app Node mono-thread sous les flux
// HTTP/2 concurrents d'o2switch → 421. En SPA, le document est un shell léger statique.
//
// `prerender` : pour le SEO, on génère EN PLUS un HTML statique par page au build
// (titres, métas, JSON-LD et contenu dans le HTML, sans dépendre du navigateur).
// Les loaders sont des clientLoader : sans CMS au build (serverCms() → null), ils
// retombent sur les données statiques. Le client réhydrate par-dessus.
function prerenderPaths(): string[] {
  const paths = new Set<string>([
    '/',
    '/bateaux',
    '/bateaux/neufs',
    '/bateaux/occasion',
    '/bateaux/vendu',
    '/services',
    '/hivernage-stockage-bateau',
    '/entretien-reparation',
    '/depannage',
    '/transport',
    '/sellerie',
    '/remorques',
    '/contact',
    '/la-team',
    '/blog',
    '/mentions-legales',
    '/politique-de-confidentialite',
    '/cgv-pro',
  ]);

  for (const brandId of ['nautique', 'mastercraft']) {
    paths.add(`/marque/${brandId}`);
    for (const slug of BRAND_MODELS[brandId]?.order ?? []) paths.add(`/${brandId}/${slug}`);
  }
  for (const slug of HIVERNAGE_CITY_ORDER) paths.add(`/services/hivernage-bateaux/${slug}`);
  for (const a of BLOG_ARTICLES) paths.add(a.path);
  for (const boat of allUsedBoats()) paths.add(`/bateaux/occasion/${boat.slug}`);

  return [...paths];
}

export default {
  ssr: false,
  appDirectory: 'src',
  prerender: prerenderPaths(),
} satisfies Config;
