import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Loader2 } from 'lucide-react';
import { OccasionDetailPage } from '../pages/OccasionDetailPage';
import { getUsedBoatBySlug, type UsedBoat } from '../data/usedBoats';
import { useLiveUsedBoats, fetchPublicBoat } from '../lib/publicApi';
export { occasionDetailMeta as meta } from '../pages/OccasionDetailPage';

// Pas de clientLoader : voir marque.tsx — il empêchait le prerender et vidait le HTML.
export default function OccasionDetail() {
  const { slug } = useParams<{ slug: string }>();
  const live = useLiveUsedBoats();
  const staticBoat = slug ? getUsedBoatBySlug(slug) : undefined;

  // Aperçu brouillon (?preview=1) : on récupère la fiche unique (inclut les non publiées).
  const preview = typeof window !== 'undefined' && new URLSearchParams(window.location.search).has('preview');
  const [previewBoat, setPreviewBoat] = useState<UsedBoat | null | undefined>(undefined);
  useEffect(() => {
    if (!preview || !slug) return;
    let alive = true;
    fetchPublicBoat(slug, true)
      .then((b) => alive && setPreviewBoat(b))
      .catch(() => alive && setPreviewBoat(null));
    return () => { alive = false; };
  }, [preview, slug]);

  if (preview) {
    if (previewBoat === undefined) {
      return <div className="min-h-[60vh] flex items-center justify-center bg-brand-light"><Loader2 className="w-8 h-8 animate-spin text-brand-cyan" /></div>;
    }
    if (previewBoat) return <OccasionDetailPage boat={previewBoat} />;
  }

  // Base peuplée : on privilégie la fiche live (inclut les bateaux ajoutés via /admin).
  if (live.boats && live.boats.length) {
    const boat = live.boats.find((b) => b.slug === slug);
    if (boat) {
      // Bateaux similaires : jamais de vendu (même marque d'abord, puis toute occasion dispo).
      let related = live.boats.filter((b) => b.slug !== boat.slug && b.brandId === boat.brandId && !b.sold);
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
