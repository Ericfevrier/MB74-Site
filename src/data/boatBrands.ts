import { NautiqueModel, nautiqueModels, MODEL_ORDER as NAUTIQUE_ORDER } from './nautiqueModels';
import { mastercraftModels, MASTERCRAFT_ORDER } from './mastercraftModels';
import { GENERATED_MODELS } from './generated/boat-models';

/**
 * Fusion CMS : surcharge le sous-ensemble éditorial d'un modèle (nom, intro, galerie,
 * specs, points forts, FAQ, SEO) en gardant tout le structurel du code (hero, jalons, options…).
 */
function mergeModels(
  brandId: string,
  base: Record<string, NautiqueModel>,
  editorial: unknown[] = GENERATED_MODELS,
): Record<string, NautiqueModel> {
  if (!Array.isArray(editorial) || !editorial.length) return base;
  const ne = (v: unknown) =>
    v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0);
  const out: Record<string, NautiqueModel> = { ...base };
  for (const e of editorial as any[]) {
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

/** Bases éditables par marque (avant fusion), pour la fusion live côté loader SSR. */
const MODEL_BASES: Record<string, Record<string, NautiqueModel>> = {
  nautique: nautiqueModels,
  mastercraft: mastercraftModels,
};

/**
 * Fusion d'un modèle LIVE complet (éditeur admin) par-dessus le statique.
 * `live` est un NautiqueModel complet issu de /api/models : chaque champ non vide
 * surcharge le statique ; les champs absents/vides gardent la valeur du code (sécurité SEO).
 */
export function mergeFullModel(base: NautiqueModel | undefined, live: Partial<NautiqueModel> | undefined): NautiqueModel | undefined {
  if (!live) return base;
  if (!base) return live.slug ? (live as NautiqueModel) : undefined;
  const ne = (v: unknown) =>
    v !== undefined && v !== null && v !== '' && !(Array.isArray(v) && v.length === 0);
  const out: any = { ...base };
  for (const [k, v] of Object.entries(live)) {
    if (k === 'brand' || k === 'id' || k === 'status' || k === 'sortOrder') continue;
    if (ne(v)) out[k] = v;
  }
  return out as NautiqueModel;
}

/**
 * Résout un modèle depuis une liste live complète (/api/models), en fusionnant sur
 * le statique. `undefined` si ni la base live ni le statique ne le connaissent.
 */
export function resolveLiveModel(
  brandId: string | undefined,
  modelId: string | undefined,
  liveModels: Array<Partial<NautiqueModel> & { brand?: string }> | null,
): NautiqueModel | undefined {
  const id = brandId?.toLowerCase();
  if (!id || !modelId) return undefined;
  const base = MODEL_BASES[id]?.[modelId];
  const live = (liveModels || []).find((m) => (m.brand || '').toLowerCase() === id && m.slug === modelId);
  if (!live) return base ? mergeFullModel(base, undefined) : undefined;
  return mergeFullModel(base, live);
}

/** Modèle fusionné avec l'éditorial LIVE du CMS (loader SSR). `undefined` si introuvable. */
export function getModelLive(
  brandId: string | undefined,
  modelId: string | undefined,
  editorial: unknown[],
): NautiqueModel | undefined {
  const id = brandId?.toLowerCase();
  const base = id ? MODEL_BASES[id] : undefined;
  if (!base || !modelId) return undefined;
  return mergeModels(id!, base, editorial)[modelId];
}
