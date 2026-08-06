import { BateauxVenduPage } from '../pages/BateauxVenduPage';
import { soldUsedBoats } from '../data/usedBoats';
import { useLiveUsedBoats } from '../lib/publicApi';
export { bateauxVenduMeta as meta } from '../pages/BateauxVenduPage';

// Pas de clientLoader : voir marque.tsx — il empêchait le prerender et vidait le HTML.
// soldUsedBoats() est synchrone et sans base : on l'appelle directement, ce qui rend
// les bateaux vendus dans le HTML statique. Le live prend le relais côté navigateur.
export default function BateauxVendu() {
  const live = useLiveUsedBoats();
  const boats = live.boats && live.boats.length ? live.boats.filter((b) => b.sold) : soldUsedBoats();
  return <BateauxVenduPage boats={boats} />;
}
