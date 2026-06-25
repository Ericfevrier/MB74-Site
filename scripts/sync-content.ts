/**
 * Synchronise le contenu du CMS Directus vers des fichiers générés (build-time).
 * Lancé avant `vite build` (prebuild). Si CMS_URL absent ou CMS injoignable :
 * ne fait rien → le site garde ses données statiques (aucune régression).
 *
 * Auth : CMS_TOKEN (token lecture seule, recommandé en prod) OU ADMIN_EMAIL+ADMIN_PASSWORD.
 * Variables : CMS_URL, CMS_TOKEN | ADMIN_EMAIL+ADMIN_PASSWORD.
 */
import { writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import { cmsLogin, fetchUsedBoats, fetchBlogArticles, fetchBlogCategories, fetchSettings, type CmsConfig } from '../src/lib/cms';

const URL = process.env.CMS_URL;
const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const HEADER = `/* AUTO-GÉNÉRÉ par scripts/sync-content.ts — NE PAS ÉDITER À LA MAIN. */\n`;
const writeGenerated = (file: string, exportName: string, data: unknown) =>
  writeGeneratedMulti(file, { [exportName]: data });

const writeGeneratedMulti = (file: string, exports: Record<string, unknown>) => {
  const out = resolve(root, 'src/data/generated', file);
  const body = Object.entries(exports)
    .map(([name, data]) => `export const ${name} = ${JSON.stringify(data, null, 2)};`)
    .join('\n\n');
  writeFileSync(out, `${HEADER}${body}\n`, 'utf8');
};

const run = async () => {
  if (!URL) {
    console.log('sync-content : CMS_URL non défini → contenu statique conservé (skip).');
    return;
  }
  let token = process.env.CMS_TOKEN;
  if (!token && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
    token = await cmsLogin(URL, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
  }
  const cfg: CmsConfig = { url: URL, token };

  const usedBoats = await fetchUsedBoats(cfg);
  writeGenerated('used-boats.ts', 'GENERATED_USED_BOATS', usedBoats);

  const articles = await fetchBlogArticles(cfg);
  const categories = await fetchBlogCategories(cfg);
  writeGeneratedMulti('blog.ts', { GENERATED_BLOG_ARTICLES: articles, GENERATED_BLOG_CATEGORIES: categories });

  const settings = await fetchSettings(cfg);
  writeGeneratedMulti('site.ts', { GENERATED_SITE: settings });

  console.log(`sync-content : ${usedBoats.length} occasions, ${articles.length} articles, ${categories.length} catégories, réglages — importés du CMS.`);
};

run().catch((e) => {
  // Ne JAMAIS casser le build : on retombe sur le statique.
  console.warn(`sync-content : CMS injoignable (${e.message}) → contenu statique conservé.`);
  process.exit(0);
});
