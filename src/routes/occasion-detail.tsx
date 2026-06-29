import { useParams } from 'react-router';
import { Loader2 } from 'lucide-react';
import { OccasionDetailPage } from '../pages/OccasionDetailPage';
import { getUsedBoatBySlug } from '../data/usedBoats';
import { useLiveUsedBoats } from '../lib/publicApi';
export { occasionDetailMeta as meta } from '../pages/OccasionDetailPage';

/** Statique au prerender (SEO) : la fiche est calculée par la page via useParams. */
export function clientLoader() {
  return null;
}

export default function OccasionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const live = useLiveUsedBoats();
  const staticBoat = slug ? getUsedBoatBySlug(slug) : undefined;

  // Base peuplée : on privilégie la fiche live (inclut les bateaux ajoutés via /admin).
  if (live.boats && live.boats.length) {
    const boat = live.boats.find((b) => b.slug === slug);
    if (boat) {
      let related = live.boats.filter((b) => b.slug !== boat.slug && b.brandId === boat.brandId);
      if (related.length === 0) related = live.boats.filter((b) => b.slug !== boat.slug && !b.sold);
      return <OccasionDetailPage boat={boat} related={related.slice(0, 3)} />;
    }
    // Absent du live mais présent en statique → on affiche le statique ci-dessous.
  }

  // Fiche live en cours de chargement et aucune fiche statique → on patiente
  // (évite une redirection prématurée pour un bateau qui n'existe qu'en base).
  if (!live.loaded && !staticBoat) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-brand-light">
        <Loader2 className="w-8 h-8 animate-spin text-brand-cyan" />
      </div>
    );
  }

  // Repli statique (prerender, base vide, ou slug introuvable) — la page gère via useParams
  // (et redirige proprement si le bateau n'existe nulle part).
  return <OccasionDetailPage />;
}
