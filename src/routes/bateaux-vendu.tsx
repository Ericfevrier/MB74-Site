import { useLoaderData } from 'react-router';
import { BateauxVenduPage } from '../pages/BateauxVenduPage';
import { soldUsedBoats } from '../data/usedBoats';
import { useLiveUsedBoats } from '../lib/publicApi';
export { bateauxVenduMeta as meta } from '../pages/BateauxVenduPage';

/** Statique au prerender (SEO) ; le composant rafraîchit en live depuis /api. */
export function clientLoader() {
  return { boats: soldUsedBoats() };
}

export default function BateauxVendu() {
  const initial = useLoaderData<typeof clientLoader>();
  const live = useLiveUsedBoats();
  const boats = live.boats && live.boats.length ? live.boats.filter((b) => b.sold) : initial.boats;
  return <BateauxVenduPage boats={boats} />;
}
