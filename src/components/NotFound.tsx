import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Compass, ArrowLeft } from 'lucide-react';

export function NotFound() {
  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-brand-dark text-white px-4 py-24 relative overflow-hidden">
      <Helmet>
        <title>Page introuvable | Motorboat 74</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>

      <div className="relative z-10 text-center max-w-xl">
        <div className="w-20 h-20 rounded-3xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mx-auto mb-8">
          <Compass size={40} />
        </div>
        <p className="text-brand-cyan font-bold uppercase tracking-[0.3em] text-sm mb-4">Erreur 404</p>
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6 leading-tight">
          Cap perdu
        </h1>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          La page que vous cherchez n'existe pas ou a été déplacée. Revenons à bon port.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark font-bold px-10 py-4 rounded-2xl uppercase text-sm tracking-widest hover:bg-white transition-all duration-300 shadow-xl shadow-brand-cyan/20"
        >
          <ArrowLeft size={18} /> Retour à l'accueil
        </Link>
      </div>
    </section>
  );
}
