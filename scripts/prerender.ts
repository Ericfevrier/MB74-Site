/**
 * Prerender du site : rend chaque route dans Chromium (Puppeteer) et écrit un
 * HTML statique par page dans dist/<route>/index.html.
 * Le client garde createRoot (re-render par-dessus) → aucun mismatch d'hydratation.
 *
 * Usage : npm run build && tsx scripts/prerender.ts   (= npm run build:static)
 */
import { spawn } from 'child_process';
import { mkdirSync, writeFileSync, existsSync } from 'fs';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import { BRAND_MODELS } from '../src/data/boatBrands';
import { HIVERNAGE_CITY_ORDER } from '../src/data/hivernageCities';
import { allUsedBoats } from '../src/data/usedBoats';
import { BLOG_ARTICLES } from '../src/data/blog';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const dist = resolve(root, 'dist');
const PORT = 4174;
const BASE = `http://localhost:${PORT}`;

if (!existsSync(resolve(dist, 'index.html'))) {
  console.error('prerender : dist/ introuvable — lancer `npm run build` d’abord.');
  process.exit(1);
}

// Liste exhaustive des routes (y compris noindex : vendus, fiches vendues).
const routes = new Set<string>([
  '/', '/bateaux', '/bateaux/neufs', '/bateaux/occasion', '/bateaux/vendu',
  '/services', '/hivernage-stockage-bateau', '/entretien-reparation', '/depannage',
  '/transport', '/sellerie', '/remorques', '/contact', '/la-team', '/blog',
  '/mentions-legales', '/politique-de-confidentialite', '/cgv-pro',
]);
for (const b of ['nautique', 'mastercraft']) {
  routes.add(`/marque/${b}`);
  for (const s of BRAND_MODELS[b]?.order ?? []) routes.add(`/${b}/${s}`);
}
for (const c of HIVERNAGE_CITY_ORDER) routes.add(`/services/hivernage-bateaux/${c}`);
for (const a of BLOG_ARTICLES) routes.add(a.path);
for (const boat of allUsedBoats()) routes.add(`/bateaux/occasion/${boat.slug}`);

const outPath = (r: string) =>
  r === '/' ? resolve(dist, 'index.html') : resolve(dist, r.replace(/^\//, ''), 'index.html');

const waitServer = async () => {
  for (let i = 0; i < 80; i++) {
    try { if ((await fetch(BASE)).ok) return; } catch { /* not up yet */ }
    await new Promise((s) => setTimeout(s, 500));
  }
  throw new Error('vite preview ne répond pas');
};

const run = async () => {
  const server = spawn('npx', ['vite', 'preview', '--port', String(PORT), '--strictPort'], { cwd: root, stdio: 'ignore' });
  try {
    await waitServer();
    const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
    // IMPORTANT : prerendre '/' EN DERNIER. Sinon dist/index.html (servi en fallback SPA
    // par vite preview pour les autres routes) hériterait des meta de l'accueil.
    const list = [...routes].filter((r) => r !== '/').concat('/');
    let ok = 0;
    for (const r of list) {
      const page = await browser.newPage();
      try {
        await page.goto(`${BASE}${r}`, { waitUntil: 'domcontentloaded', timeout: 30000 });
        // 1) contenu rendu dans #root
        await page.waitForFunction(() => (document.querySelector('#root')?.childElementCount || 0) > 0, { timeout: 12000 }).catch(() => {});
        // 2) loader lazy disparu (le chunk de page est rendu) — sinon helmet n'a pas encore posé le head
        await page.waitForFunction(() => !document.querySelector('.animate-spin'), { timeout: 12000 }).catch(() => {});
        // 3) react-helmet a flush le <title> (et donc meta/canonical/JSON-LD du même lot)
        await page.waitForFunction(() => document.title.trim().length > 0, { timeout: 5000 }).catch(() => {});
        await new Promise((s) => setTimeout(s, 600)); // marge de sécurité
        const html = await page.content();
        const out = outPath(r);
        mkdirSync(dirname(out), { recursive: true });
        writeFileSync(out, html, 'utf8');
        ok++;
      } catch (e: any) {
        console.warn(`  ! ${r} : ${e.message}`);
      } finally {
        await page.close();
      }
    }
    await browser.close();
    console.log(`prerender : ${ok}/${list.length} pages générées dans dist/`);
    if (ok < list.length) process.exitCode = 1;
  } finally {
    server.kill('SIGTERM');
  }
};
run().catch((e) => { console.error('prerender ERROR', e); process.exit(1); });
