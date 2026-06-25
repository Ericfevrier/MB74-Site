import { NautiqueModel, nautiqueModels, MODEL_ORDER as NAUTIQUE_ORDER } from './nautiqueModels';
import { mastercraftModels, MASTERCRAFT_ORDER } from './mastercraftModels';
import { GENERATED_MODELS } from './generated/boat-models';

/**
 * Fusion CMS : surcharge le sous-ensemble éditorial d'un modèle (nom, intro, galerie,
 * specs, points forts, FAQ, SEO) en gardant tout le structurel du code (hero, jalons, options…).
 */
function mergeModels(brandId: string, base: Record<string, NautiqueModel>): Record<string, NautiqueModel> {
  if (!Array.isArray(GENERATED_MODELS) || !GENERATED_MODELS.length) return base;
  const ne = (v: unknown) =>
    v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0);
  const out: Record<string, NautiqueModel> = { ...base };
  for (const e of GENERATED_MODELS as any[]) {
    if (e.brand !== brandId || !out[e.slug]) continue;
    out[e.slug] = {
      ...out[e.slug],
      ...(ne(e.name) ? { name: e.name } : {}),
      ...(ne(e.short) ? { short: e.short } : {}),
      ...(ne(e.tagline) ? { tagline: e.tagline } : {}),
      ...(ne(e.intro) ? { intro: e.intro } : {}),
      ...(ne(e.gallery) ? { gallery: e.gallery } : {}),
      ...(ne(e.specs) ? { specs: e.specs } : {}),
      ...(ne(e.highlights) ? { highlights: e.highlights } : {}),
      ...(ne(e.faqs) ? { faqs: e.faqs } : {}),
      ...(ne(e.seo_title) ? { metaTitle: e.seo_title } : {}),
      ...(ne(e.seo_description) ? { metaDescription: e.seo_description } : {}),
    } as NautiqueModel;
  }
  return out;
}

export interface BrandModels {
  id: string;
  name: string;
  models: Record<string, NautiqueModel>;
  order: string[];
  /** Affiche le badge « Concessionnaire officiel » + logo (concessionnaire agréé uniquement). */
  officialBadge?: boolean;
  /** Images produit sur fond neutre (studio) → hero « bateau à droite » avec vue rotative, plutôt qu'image plein cadre. */
  studioImages?: boolean;
  /** Catalogue (page marque) : visuels produit sur fond neutre → cartes « gamme » avec bateau entier non rogné (object-contain). */
  catalogStudio?: boolean;
}

export const BRAND_MODELS: Record<string, BrandModels> = {
  nautique: { id: 'nautique', name: 'Nautique', models: mergeModels('nautique', nautiqueModels), order: NAUTIQUE_ORDER, officialBadge: true },
  mastercraft: { id: 'mastercraft', name: 'MasterCraft', models: mergeModels('mastercraft', mastercraftModels), order: MASTERCRAFT_ORDER },
};

export function getBrandModels(brandId?: string): BrandModels | undefined {
  return brandId ? BRAND_MODELS[brandId.toLowerCase()] : undefined;
}
