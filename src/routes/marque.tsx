import { useParams } from 'react-router';
import { BrandPage } from '../components/BrandPage';
import { STATIC_BRANDS_DATA, mergeFullBrands } from '../data/brands';
import { useLiveBrands } from '../lib/publicApi';
export { brandPageMeta as meta } from '../components/BrandPage';

/** Statique au prerender (SEO) ; la page marque live (base) est fusionnée côté navigateur. */
export function clientLoader() {
  return null;
}

export default function Marque() {
  const { id } = useParams<{ id: string }>();
  const live = useLiveBrands();

  if (live.brands && live.brands.length) {
    const merged = mergeFullBrands(STATIC_BRANDS_DATA, live.brands);
    const brand = merged[(id || '').toLowerCase()];
    if (brand) return <BrandPage brand={brand} />;
  }
  return <BrandPage />; // repli statique via useParams
}
