import React, { useEffect } from 'react';
import { Link } from 'react-router';
import { Helmet } from 'react-helmet-async';
import { Anchor, ArrowLeft, Phone } from 'lucide-react';

interface ComingSoonProps {
  title: string;
  description?: string;
}

/**
 * Page « Bientôt disponible », placeholder propre et branché sur la marque,
 * en attendant le contenu réel (catalogue, boutique, équipe…).
 */
export function ComingSoon({ title, description }: ComingSoonProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center bg-brand-dark text-white px-4 py-24 relative overflow-hidden">
      <Helmet>
        <title>{`${title} | Motorboat 74`}</title>
        <meta name="robots" content="noindex" />
      </Helmet>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] -ml-64 -mb-64"></div>

      <div className="relative z-10 text-center max-w-xl">
        <div className="w-20 h-20 rounded-3xl bg-brand-cyan/10 flex items-center justify-center text-brand-cyan mx-auto mb-8">
          <Anchor size={40} />
        </div>
        <p className="text-brand-cyan font-bold uppercase tracking-[0.3em] text-sm mb-4">Bientôt disponible</p>
        <h1 className="text-3xl md:text-5xl font-bold uppercase tracking-tight mb-6 leading-tight">
          {title}
        </h1>
        <p className="text-gray-400 text-lg mb-10 leading-relaxed">
          {description ||
            "Cette section est en cours de préparation. Notre équipe la met en ligne très prochainement. En attendant, contactez-nous directement, nous serons ravis de vous renseigner."}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="tel:+33457572727"
            className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark font-bold px-10 py-4 rounded-2xl uppercase text-sm tracking-widest hover:bg-white transition-all duration-300 shadow-xl shadow-brand-cyan/20"
          >
            <Phone size={18} /> 04 57 57 27 27
          </a>
          <Link
            to="/"
            className="inline-flex items-center gap-2 border-2 border-white/20 text-white font-bold px-10 py-4 rounded-2xl uppercase text-sm tracking-widest hover:bg-white hover:text-brand-dark transition-all duration-300"
          >
            <ArrowLeft size={18} /> Accueil
          </Link>
        </div>
      </div>
    </section>
  );
}
