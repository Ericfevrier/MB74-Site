import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { BrandPage } from '../components/BrandPage';
import { STATIC_BRANDS_DATA, mergeBrands } from '../data/brands';
import { serverCms, fetchBrands } from '../lib/cms';

/** Loader SSR : marque lue en live depuis le CMS (éditorial fusionné sur le structurel). */
export async function loader({ params }: LoaderFunctionArgs) {
  const id = (params.id || '').toLowerCase();
  const cfg = await serverCms();
  if (cfg) {
    try {
      const editorial = await fetchBrands(cfg);
      const merged = mergeBrands(STATIC_BRANDS_DATA, editorial);
      if (merged[id]) return { brand: merged[id] };
    } catch {
      /* repli statique */
    }
  }
  return null; // la page calcule depuis les données statiques via useParams
}

export default function Marque() {
  const data = useLoaderData<typeof loader>();
  if (!data) return <BrandPage />;
  return <BrandPage brand={data.brand} />;
}
