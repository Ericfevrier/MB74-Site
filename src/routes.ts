import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
  index('routes/home.tsx'),

  // Marques + modèles
  route('marque/:id', 'routes/marque.tsx'),

  // Bateaux
  route('bateaux', 'routes/bateaux.tsx'),
  route('bateaux/neufs', 'routes/bateaux-neufs.tsx'),
  route('bateaux/occasion', 'routes/occasion.tsx'),
  route('bateaux/occasion/:slug', 'routes/occasion-detail.tsx'),
  route('bateaux/vendu', 'routes/bateaux-vendu.tsx'),

  // Services
  route('services', 'routes/services.tsx'),
  route('services/hivernage-bateaux/:slug', 'routes/city.tsx'),
  route('hivernage-stockage-bateau', 'routes/hivernage.tsx'),
  route('depannage', 'routes/depannage.tsx'),
  route('sellerie', 'routes/sellerie.tsx'),
  route('entretien-reparation', 'routes/entretien.tsx'),
  route('transport', 'routes/transport.tsx'),
  route('remorques', 'routes/remorques.tsx'),
  route('services/:slug', 'routes/service-slug.tsx'),

  // Contenu
  route('contact', 'routes/contact.tsx'),
  route('la-team', 'routes/team.tsx'),
  route('blog', 'routes/blog.tsx'),
  route('blog/hivernage/hivernage-bateau-guide-complet', 'routes/blog-hivernage.tsx'),

  // Admin (back-office, non indexé, non prérendu)
  route('admin', 'routes/admin.tsx'),

  // Légales
  route('mentions-legales', 'routes/mentions.tsx'),
  route('politique-de-confidentialite', 'routes/privacy.tsx'),
  route('cgv-pro', 'routes/cgv.tsx'),

  // Redirections d'anciennes URLs
  route('shop', 'routes/redirect-shop.tsx'),
  route('bateaux-neufs', 'routes/redirect-neufs.tsx'),
  route('bateaux-occasion', 'routes/redirect-occasion.tsx'),

  // Fiche modèle (dynamique, 2 segments) — RR7 priorise les routes statiques ci-dessus
  route(':brandId/:modelId', 'routes/model.tsx'),

  // 404
  route('*', 'routes/notfound.tsx'),
] satisfies RouteConfig;
