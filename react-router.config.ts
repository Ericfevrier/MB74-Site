import type { Config } from '@react-router/dev/config';

// SPA (rendu côté client) — comme Ilico, qui tourne sans souci sur o2switch.
// Le SSR (rendu lourd à chaque requête) saturait l'app Node mono-thread sous les flux
// HTTP/2 concurrents d'o2switch → 421. En SPA, le document est un shell léger statique.
export default {
  ssr: false,
  appDirectory: 'src',
} satisfies Config;
