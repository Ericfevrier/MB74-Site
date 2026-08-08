import { reactRouter } from '@react-router/dev/vite';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import { defineConfig, loadEnv } from 'vite';

export default defineConfig(({ mode, isSsrBuild }) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [reactRouter(), tailwindcss()],
    define: {
      'process.env.GOOGLE_MAPS_PLATFORM_KEY': JSON.stringify(env.GOOGLE_MAPS_PLATFORM_KEY || ''),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    /*
     * Les bannières de licence sortent du JavaScript, sans disparaître.
     *
     * lucide-react en émet une par icône : 119 blocs `@license` conservés tels
     * quels dans le bundle minifié, que PageSpeed compte comme 3,9 Kio de
     * minification manquante. Elles ne peuvent pas être simplement supprimées —
     * la licence ISC impose que la mention de copyright accompagne le code.
     *
     * `external` les déplace dans un fichier `.js.LEGAL.txt` livré à côté du
     * bundle : la mention reste distribuée, les octets quittent le chemin
     * critique.
     */
    esbuild: { legalComments: 'external' },
    // Build CLIENT uniquement : on regroupe les dépendances en quelques gros chunks.
    // Sinon Vite produit des dizaines de petits fichiers (1 par icône lucide, par route…)
    // que le navigateur réclame en rafale → o2switch répond 429 (limite de requêtes/IP)
    // → assets abandonnés → hydratation cassée (méga-menu, animations invisibles).
    // (Le bundle SERVEUR reste un seul fichier : on n'y touche pas.)
    build: isSsrBuild
      ? undefined
      : {
          rollupOptions: {
            output: {
              manualChunks(id) {
                if (!id.includes('node_modules')) return undefined;
                if (id.includes('lucide-react')) return 'icons';
                if (/[\\/]node_modules[\\/](react|react-dom|react-router|react-helmet-async|@react-router)[\\/]/.test(id))
                  return 'react-vendor';
                if (id.includes('motion') || id.includes('framer-motion')) return 'motion';
                /*
                 * Bibliothèques propres à UNE FAMILLE DE PAGES.
                 *
                 * Sans ces trois lignes elles tombaient dans le fourre-tout
                 * « vendor », un fichier que presque toutes les routes importent
                 * statiquement : l'accueil téléchargeait donc 54 Kio contenant
                 * Leaflet et Marked, dont elle ne se sert jamais. Pire, cela
                 * ANNULAIT le `import('leaflet')` dynamique de ZonesMap : une
                 * affectation manuelle de chunk l'emporte sur le découpage
                 * automatique de Rollup, si bien que la carte, écrite pour être
                 * paresseuse, partait sur toutes les pages du site.
                 *
                 * Nommées à part, elles restent des fichiers distincts que seules
                 * les routes concernées réclament — sans augmenter le nombre de
                 * requêtes ailleurs, ce qui reste la contrainte à respecter.
                 */
                if (id.includes('leaflet')) return 'leaflet';
                if (id.includes('/marked')) return 'markdown';
                if (id.includes('@vis.gl') || id.includes('google-maps')) return 'maps';
                return 'vendor';
              },
            },
          },
        },
  };
});
