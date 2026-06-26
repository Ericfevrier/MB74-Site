import type { Config } from '@react-router/dev/config';

// SSR activé (rendu à la requête) ; le code de l'app reste dans src/.
export default {
  ssr: true,
  appDirectory: 'src',
} satisfies Config;
