import React from 'react';
import { Link } from 'react-router-dom';

export interface Crumb {
  label: string;
  /** Si présent, l'élément est cliquable (sauf s'il s'agit du dernier = page courante). */
  to?: string;
}

interface BreadcrumbProps {
  items: Crumb[];
  /** Taille adaptée au gabarit de la page : 'md' (défaut) ou 'sm' (pages compactes). */
  size?: 'sm' | 'md';
  /** Classes additionnelles sur le <nav> (ex. marges). */
  className?: string;
}

/**
 * Fil d'Ariane — design unifié « pastille cyan » (référence : page Hivernage & Stockage).
 * S'aligne automatiquement (gauche/centre) selon le text-align du conteneur parent.
 */
export function Breadcrumb({ items, size = 'md', className = 'mb-6' }: BreadcrumbProps) {
  const sizing =
    size === 'sm'
      ? 'text-[11px] px-3.5 py-1 gap-1.5'
      : 'text-[12px] px-4 py-1.5 gap-2';

  return (
    <nav aria-label="Fil d’ariane" className={className}>
      <ol
        className={`inline-flex flex-wrap items-center ${sizing} bg-brand-cyan/10 border border-brand-cyan/20 rounded-full font-bold text-brand-cyan uppercase tracking-wider`}
      >
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <React.Fragment key={i}>
              <li>
                {item.to && !isLast ? (
                  <Link to={item.to} className="hover:text-white transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <span className={isLast ? 'text-white' : ''} aria-current={isLast ? 'page' : undefined}>
                    {item.label}
                  </span>
                )}
              </li>
              {!isLast && (
                <li aria-hidden className="opacity-40">
                  /
                </li>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
