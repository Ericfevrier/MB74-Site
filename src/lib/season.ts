/**
 * Libellé de la saison d'hivernage — calculé, jamais écrit en dur.
 *
 * La page affichait « Réservez votre hivernage 2025/2026 » en août 2026 : le
 * libellé avait été saisi une fois et n'avait pas suivi. Une date en dur dans
 * une page vieillit en silence, et un client qui lit une saison passée en
 * déduit que le site n'est plus tenu.
 *
 * Bascule au 1er avril : de janvier à mars la saison en cours est encore
 * (N-1)/N — les bateaux sont toujours au hangar et on accepte des retardataires.
 * À partir d'avril, la prochaine saison réservable devient N/(N+1).
 */
export function hivernageSeason(now: Date = new Date()): string {
  const y = now.getFullYear();
  const debut = now.getMonth() >= 3 ? y : y - 1; // getMonth() : 0 = janvier
  return `${debut}/${debut + 1}`;
}
