import { useParams } from 'react-router';
import { BrandPage } from '../components/BrandPage';
import { NotFound } from '../components/NotFound';
import { STATIC_BRANDS_DATA, mergeFullBrands, isActiveBrand } from '../data/brands';
import { useLiveBrands } from '../lib/publicApi';
export { brandPageMeta as meta } from '../components/BrandPage';

/** Statique au prerender (SEO) ; la page marque live (base) est fusionnée côté navigateur. */
export function clientLoader() {
  return null;
}

export default function Marque() {
  const { id } = useParams<{ id: string }>();
  const live = useLiveBrands();

  // Seules les marques affichées (Nautique, MasterCraft) sont accessibles ; les autres → 404.
  if (!isActiveBrand(id)) return <NotFound />;

  if (live.brands && live.brands.length) {
    const merged = mergeFullBrands(STATIC_BRANDS_DATA, live.brands);
    const brand = merged[(id || '').toLowerCase()];
    if (brand) return <BrandPage brand={brand} />;
  }
  return <BrandPage />; // repli statique via useParams
}
