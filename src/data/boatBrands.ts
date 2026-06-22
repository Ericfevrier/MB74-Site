import { NautiqueModel, nautiqueModels, MODEL_ORDER as NAUTIQUE_ORDER } from './nautiqueModels';
import { mastercraftModels, MASTERCRAFT_ORDER } from './mastercraftModels';

export interface BrandModels {
  id: string;
  name: string;
  models: Record<string, NautiqueModel>;
  order: string[];
  /** Affiche le badge « Concessionnaire officiel » + logo (concessionnaire agréé uniquement). */
  officialBadge?: boolean;
  /** Images produit sur fond neutre (studio) → hero « bateau à droite » avec vue rotative, plutôt qu'image plein cadre. */
  studioImages?: boolean;
}

export const BRAND_MODELS: Record<string, BrandModels> = {
  nautique: { id: 'nautique', name: 'Nautique', models: nautiqueModels, order: NAUTIQUE_ORDER, officialBadge: true },
  mastercraft: { id: 'mastercraft', name: 'MasterCraft', models: mastercraftModels, order: MASTERCRAFT_ORDER },
};

export function getBrandModels(brandId?: string): BrandModels | undefined {
  return brandId ? BRAND_MODELS[brandId.toLowerCase()] : undefined;
}
