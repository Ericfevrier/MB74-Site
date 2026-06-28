import { useLoaderData, redirect, type LoaderFunctionArgs } from 'react-router';
import { HivernageCityPage } from '../pages/HivernageCityPage';
import { getHivernageCity } from '../data/hivernageCities';
import { serverCms, fetchCities } from '../lib/cms';

/** Loader SSR : page ville lue en live depuis le CMS (repli statique côté page). */
export async function clientLoader({ params }: LoaderFunctionArgs) {
  const slug = params.slug!;
  const cfg = await serverCms();
  if (cfg) {
    try {
      const cities = await fetchCities(cfg);
      const city = cities.find((c) => c.slug === slug);
      if (city) return { city };
    } catch {
      /* repli statique ci-dessous */
    }
  }
  if (!getHivernageCity(slug)) throw redirect('/hivernage-stockage-bateau');
  return null; // présent en statique : la page calcule via useParams
}

export default function City() {
  const data = useLoaderData<typeof clientLoader>();
  if (!data) return <HivernageCityPage />;
  return <HivernageCityPage city={data.city} />;
}
