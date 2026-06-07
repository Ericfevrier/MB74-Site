import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export function UsedBoatsSection({ brandName }: { brandName: string }) {
  return (
    <section className="py-24 bg-brand-light">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-brand-dark mb-16 text-center">
          BATEAUX {brandName.toUpperCase()} OCCASION À VENDRE
        </h2>
        
        <div className="text-center py-20 bg-white rounded-[2rem] border-2 border-dashed border-gray-300">
          <p className="text-gray-500 font-medium mb-8">Aucun modèle d'occasion disponible pour le moment.</p>
          <Link to="/" className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold py-3 px-8 rounded-xl hover:bg-brand-cyan hover:text-brand-dark transition-all">
            Nous consulter pour une recherche <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </section>
  );
}
