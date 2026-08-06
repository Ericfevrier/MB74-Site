import { useParams } from 'react-router';
import { BrandPage } from '../components/BrandPage';
import { NotFound } from '../components/NotFound';
import { STATIC_BRANDS_DATA, mergeFullBrands, isActiveBrand } from '../data/brands';
import { useLiveBrands } from '../lib/publicApi';
export { brandPageMeta as meta } from '../components/BrandPage';

// Pas de clientLoader ici : sous `ssr: false`, une route qui en déclare un ne peut
// pas être prérendue (le chargeur est côté navigateur par définition) et son HTML
// sort vide. La page se calcule via useParams, puis useLiveBrands fusionne la base
// côté navigateur — aucun chargeur n'est nécessaire.
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
