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
                return 'vendor';
              },
            },
          },
        },
  };
});
