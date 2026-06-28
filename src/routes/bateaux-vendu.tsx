import { useLoaderData } from 'react-router';
import { BateauxVenduPage } from '../pages/BateauxVenduPage';
import { soldUsedBoats } from '../data/usedBoats';
import { serverCms, fetchUsedBoats } from '../lib/cms';
export { bateauxVenduMeta as meta } from '../pages/BateauxVenduPage';

/** Loader SSR : vendus lus en live depuis le CMS (repli statique). */
export async function clientLoader() {
  const cfg = await serverCms();
  if (cfg) {
    try {
      const all = await fetchUsedBoats(cfg);
      return { boats: all.filter((b) => b.sold) };
    } catch {
      /* repli statique */
    }
  }
  return { boats: soldUsedBoats() };
}

export default function BateauxVendu() {
  const { boats } = useLoaderData<typeof clientLoader>();
  return <BateauxVenduPage boats={boats} />;
}
