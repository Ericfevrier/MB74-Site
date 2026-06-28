import { useLoaderData, redirect, type LoaderFunctionArgs } from 'react-router';
import { OccasionDetailPage } from '../pages/OccasionDetailPage';
import { getUsedBoatBySlug } from '../data/usedBoats';
import { serverCms, fetchUsedBoats } from '../lib/cms';
export { occasionDetailMeta as meta } from '../pages/OccasionDetailPage';

/** Loader SSR : fiche occasion lue en live depuis le CMS (repli statique côté page). */
export async function clientLoader({ params }: LoaderFunctionArgs) {
  const slug = params.slug!;
  const cfg = await serverCms();
  if (cfg) {
    try {
      const all = await fetchUsedBoats(cfg);
      const boat = all.find((b) => b.slug === slug);
      if (boat) {
        let related = all.filter((b) => b.slug !== boat.slug && b.brandId === boat.brandId);
        if (related.length === 0) related = all.filter((b) => b.slug !== boat.slug && !b.sold);
        return { boat, related: related.slice(0, 3) };
      }
    } catch {
      /* repli statique ci-dessous */
    }
  }
  // Introuvable côté CMS : si absent aussi du statique, redirection 302 propre (pas de <Navigate> en SSR).
  if (!getUsedBoatBySlug(slug)) throw redirect('/bateaux/occasion');
  return null; // présent en statique : la page calcule via useParams
}

export default function OccasionDetail() {
  const data = useLoaderData<typeof clientLoader>();
  if (!data) return <OccasionDetailPage />;
  return <OccasionDetailPage boat={data.boat} related={data.related} />;
}
