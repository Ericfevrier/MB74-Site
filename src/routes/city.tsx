import { useParams } from 'react-router';
import { Loader2 } from 'lucide-react';
import { HivernageCityPage } from '../pages/HivernageCityPage';
import { getHivernageCity } from '../data/hivernageCities';
import { useLiveCity } from '../lib/publicApi';
export { cityPageMeta as meta } from '../pages/HivernageCityPage';

/** Statique au prerender (SEO) : la page calcule via useParams ; refresh live dans le composant. */
export function clientLoader() {
  return null;
}

export default function City() {
  const { slug } = useParams<{ slug: string }>();
  const live = useLiveCity(slug);
  const staticCity = slug ? getHivernageCity(slug) : undefined;

  if (live.city) return <HivernageCityPage city={live.city} />;
  if (!live.loaded && !staticCity) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-white">
        <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
      </div>
    );
  }
  return <HivernageCityPage />;
}
