import { useParams } from 'react-router';
import { ModelPage } from '../components/ModelPage';
import { NotFound } from '../components/NotFound';
import { resolveLiveModel } from '../data/boatBrands';
import { isActiveBrand } from '../data/brands';
import { useLiveModels } from '../lib/publicApi';
export { modelPageMeta as meta } from '../components/ModelPage';

/** Statique au prerender (SEO) ; la fiche live (base) est fusionnée côté navigateur. */
export function clientLoader() {
  return null;
}

export default function Model() {
  const { brandId, modelId } = useParams<{ brandId: string; modelId: string }>();
  const { models, loaded } = useLiveModels();

  // Modèles limités aux marques affichées (Nautique, MasterCraft) ; sinon 404.
  if (!isActiveBrand(brandId)) return <NotFound />;

  // Avant chargement live : rendu statique (correspond au prérendu SEO).
  if (!loaded) return <ModelPage />;

  // Une fois le live chargé : fusion sur le statique (ou fiche live seule si nouveau modèle).
  const model = resolveLiveModel(brandId, modelId, models);
  return <ModelPage model={model ?? null} />;
}
