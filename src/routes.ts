import { type RouteConfig, index, route } from '@react-router/dev/routes';

// PILOTE de migration SSR : on valide l'accueil + les occasions (loader live Directus).
// Les autres routes seront migrées ensuite (chacune en module avec loader + meta).
export default [
  index('routes/home.tsx'),
  route('bateaux/occasion', 'routes/occasion.tsx'),
] satisfies RouteConfig;
