import { useLoaderData, redirect, type LoaderFunctionArgs } from 'react-router';
import { ModelPage } from '../components/ModelPage';
import { getModelLive, getBrandModels } from '../data/boatBrands';
import { serverCms, fetchModels } from '../lib/cms';

/** Loader SSR : modèle lu en live depuis le CMS (éditorial fusionné sur le structurel). */
export async function clientLoader({ params }: LoaderFunctionArgs) {
  const cfg = await serverCms();
  if (cfg) {
    try {
      const editorial = await fetchModels(cfg);
      const model = getModelLive(params.brandId, params.modelId, editorial);
      if (model) return { model };
    } catch {
      /* repli statique ci-dessous */
    }
  }
  // Introuvable côté CMS : si absent aussi du statique, redirection 302 propre.
  const brand = getBrandModels(params.brandId);
  if (!brand || !params.modelId || !brand.models[params.modelId]) {
    throw redirect(brand ? `/marque/${brand.id}` : '/');
  }
  return null; // présent en statique : la page calcule via useParams
}

export default function Model() {
  const data = useLoaderData<typeof clientLoader>();
  if (!data) return <ModelPage />;
  return <ModelPage model={data.model} />;
}
