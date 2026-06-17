import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowRight, Users, ChevronRight, Anchor } from 'lucide-react';
import { brandsData } from '../data/brands';
import { nautiqueModels } from '../data/nautiqueModels';
import { ModelComparison } from './ModelComparison';
import { UsedBoatsSection } from './UsedBoatsSection';
import { FAQSection } from './FAQSection';
import { ShowroomSection } from './ShowroomSection';

export function BrandPage() {
  const { id } = useParams<{ id: string }>();
  const brand = id ? brandsData[id.toLowerCase()] : null;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!brand) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-dark text-white p-4">
        <Helmet>
          <title>Marque non trouvée | Motorboat 74</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Marque non trouvée</h1>
          <Link to="/" className="text-brand-cyan hover:underline flex items-center justify-center gap-2">
            Retour à l'accueil <ChevronRight size={16} />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-brand-light">
      <Helmet>
        <title>{brand.fullName} | Concessionnaire {brand.name} | Motorboat 74</title>
        <meta name="description" content={`Découvrez la gamme ${brand.name}. ${brand.description.substring(0, 100)}...`} />
        <link rel="canonical" href={`https://motorboat74.com/marque/${id}`} />
      </Helmet>
      {/* Brand Hero */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden bg-brand-dark cursor-default">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/2026-p23-ext-09-11zon.jpg" 
            alt={`Bateau de la gamme ${brand.name} en navigation`} 
            className="w-full h-full object-cover opacity-60 scale-105"
            fetchPriority="high"
            decoding="async"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/40 via-brand-dark/20 to-brand-dark"></div>
        </div>

        <div className="max-w-[1400px] mx-auto px-4 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex flex-col items-center justify-center gap-6 mb-8">
              <h1 className="sr-only">{brand.fullName} — Concessionnaire officiel chez Motor Boat 74</h1>
              <span className="bg-brand-cyan text-brand-dark px-6 py-2 rounded-full text-[12px] font-bold uppercase tracking-widest shadow-lg shadow-brand-cyan/20">
                Concessionnaire Officiel {brand.name}
              </span>
              <div className="h-20 md:h-28 flex items-center justify-center">
                <img 
                  src="/images/nautique-web-logo-white.png" 
                  alt={`Logo ${brand.name}, concessionnaire autorisé`} 
                  className="max-h-full max-w-[250px] md:max-w-[350px] object-contain"
                  fetchPriority="high"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <p className="text-brand-cyan text-sm md:text-base font-bold uppercase tracking-[0.3em] mb-4">
              {brand.tagline}
            </p>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-light to-transparent"></div>
      </section>

      {/* Brand Intro */}
      <article className="py-24 bg-brand-light">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-brand-dark uppercase tracking-tight mb-8 leading-[1.1]">
                NAUTIQUE PAR MOTOR BOAT 74
              </h2>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 whitespace-pre-line">
                {brand.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-6 bg-white rounded-3xl shadow-xl shadow-black/5 border border-white">
                  <div className="w-12 h-12 bg-brand-cyan/10 rounded-2xl flex items-center justify-center text-brand-cyan mb-4">
                    <Anchor size={24} />
                  </div>
                  <h3 className="font-bold text-brand-dark uppercase tracking-tight mb-2">Technologie</h3>
                  <p className="text-gray-500 text-sm">Systèmes de vagues brevetés de pointe.</p>
                </div>
                <div className="p-6 bg-white rounded-3xl shadow-xl shadow-black/5 border border-white">
                  <div className="w-12 h-12 bg-brand-cyan/10 rounded-2xl flex items-center justify-center text-brand-cyan mb-4">
                    <Users size={24} />
                  </div>
                  <h3 className="font-bold text-brand-dark uppercase tracking-tight mb-2">Confort</h3>
                  <p className="text-gray-500 text-sm">Intérieurs luxueux et ergonomiques.</p>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <img 
                src={brand.heroImage} 
                alt={`${brand.name} Lifestyle - Style de vie sur l'eau`} 
                className="rounded-[3rem] shadow-2xl w-full aspect-[4/5] object-cover"
                loading="lazy"
                referrerPolicy="no-referrer"
              />
              <div className="absolute -bottom-8 -left-8 bg-brand-cyan text-brand-dark p-12 rounded-[2rem] shadow-2xl hidden md:block">
                <p className="text-5xl font-bold mb-1 tracking-tighter">100%</p>
                <p className="text-xs font-bold uppercase tracking-widest">Performance</p>
              </div>
            </motion.div>
          </div>
        </div>
      </article>

      {/* Models Section */}
      <section className="py-24 bg-ink-950">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="w-8 h-1 bg-brand-cyan rounded-full" />
              <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">La gamme</span>
              <span className="w-8 h-1 bg-brand-cyan rounded-full" />
            </div>
            <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight">La Gamme {brand.name}</h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {brand.models.map((model, idx) => {
              const slug = model.name.toLowerCase().replace(/\s+/g, '-');
              const gamme = nautiqueModels[slug]?.gamme;
              return (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
                  className="group relative bg-ink-900 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-cyan hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  <div className="aspect-[4/3] overflow-hidden relative">
                    <img
                      src={model.image}
                      alt={`Bateau ${model.name} vendu chez Motorboat 74`}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />
                  </div>
                  <div className="p-6 flex-1 flex flex-col">
                    {gamme && (
                      <span className="text-[10px] uppercase tracking-widest font-bold text-brand-cyan mb-1.5">{gamme}</span>
                    )}
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight mb-2 leading-tight">
                      {model.name}
                    </h3>
                    <p className="text-gray-400 text-sm mb-6 leading-relaxed flex-1">
                      {model.description}
                    </p>
                    <Link
                      to={`/${id}/${slug}`}
                      className="mt-auto inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 text-white font-bold uppercase tracking-widest text-xs py-3.5 rounded-xl group-hover:bg-brand-cyan group-hover:text-brand-dark group-hover:border-brand-cyan transition-all duration-300 min-h-[44px]"
                    >
                      Découvrir le modèle <ArrowRight size={15} className="group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.article>
              );
            })}
          </div>

          {brand.models.length === 0 && (
            <div className="text-center py-20 bg-ink-900 rounded-3xl border border-dashed border-white/15">
              <p className="text-gray-400 italic">De nouveaux modèles {brand.name} arrivent bientôt…</p>
            </div>
          )}
        </div>
      </section>

      {/* Comparison Section */}
      {brand.comparisons && brand.comparisons.length > 0 && (
        <ModelComparison comparisons={brand.comparisons} />
      )}

      {/* Used Boats Section */}
      <UsedBoatsSection brandName={brand.name} />

      {/* FAQ Section */}
      <FAQSection brandName={brand.name} />

      {/* Showroom Section */}
      <ShowroomSection />

      {/* CTA Section */}
      <section className="py-24 bg-brand-dark overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] -mr-64 -mt-64"></div>
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tight mb-8">Prêt à naviguer en {brand.name} ?</h2>
          <p className="text-gray-400 text-xl max-w-2xl mx-auto mb-12">
            Contactez notre équipe d'experts pour configurer votre futur bateau ou découvrir les modèles disponibles en stock.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link to="/" className="px-12 py-5 bg-brand-cyan text-brand-dark font-bold text-sm uppercase tracking-widest rounded-2xl hover:scale-105 transition-all duration-500 shadow-xl shadow-brand-cyan/20">
              Contactez-nous
            </Link>
            <button className="px-12 py-5 border-2 border-white/20 text-white font-bold text-sm uppercase tracking-widest rounded-2xl hover:bg-white hover:text-brand-dark transition-all duration-500">
              Télécharger le catalogue
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
