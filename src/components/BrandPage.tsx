import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'motion/react';
import { ArrowRight, ChevronRight, ShieldCheck, Waves, Wallet, Wrench } from 'lucide-react';
import { brandsData } from '../data/brands';
import { getBrandModels } from '../data/boatBrands';
import { ModelComparison } from './ModelComparison';
import { UsedBoatsSection } from './UsedBoatsSection';
import { FAQSection } from './FAQSection';
import { ShowroomSection } from './ShowroomSection';

/** Diaporama « la marque » : bateaux sous différents angles, sur fond clair (bateau entier, non rogné). */
function AngleSlider({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    if (images.length < 2) return;
    const t = setInterval(() => setIdx((i) => (i + 1) % images.length), 2600);
    return () => clearInterval(t);
  }, [images.length]);
  return (
    <div className="relative rounded-[2.5rem] border border-white/10 shadow-2xl overflow-hidden w-full aspect-[4/3] bg-gradient-to-b from-white to-gray-100">
      {images.map((src, i) => (
        <img
          key={i}
          src={src}
          alt={`${alt} — vue ${i + 1}`}
          className={`absolute inset-0 w-full h-full object-contain p-6 transition-opacity duration-700 ${i === idx ? 'opacity-100' : 'opacity-0'}`}
          loading={i === 0 ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
        />
      ))}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2">
        {images.map((_, i) => (
          <button
            key={i}
            type="button"
            aria-label={`Voir l'angle ${i + 1}`}
            onClick={() => setIdx(i)}
            className={`h-2 rounded-full transition-all duration-300 ${i === idx ? 'w-7 bg-brand-cyan' : 'w-2 bg-brand-dark/30 hover:bg-brand-dark/60'}`}
          />
        ))}
      </div>
    </div>
  );
}

export function BrandPage() {
  const { id } = useParams<{ id: string }>();
  const brand = id ? brandsData[id.toLowerCase()] : null;
  const catalogStudio = getBrandModels(id)?.catalogStudio;

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
            src={brand.heroImage}
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
              <h1 className="sr-only">{brand.fullName}, Concessionnaire officiel chez Motor Boat 74</h1>
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

        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-brand-dark to-transparent"></div>
      </section>

      {/* Brand Intro */}
      <article className="py-24 bg-brand-dark text-white">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-5">
                <span className="w-8 h-1 bg-brand-cyan rounded-full" />
                <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">La marque</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold uppercase tracking-tight mb-8 leading-[1.1]">
                {brand.name} par Motor Boat 74
              </h2>
              <p className="text-gray-300 text-base md:text-lg leading-relaxed mb-10 whitespace-pre-line">
                {brand.description}
              </p>
              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { Icon: ShieldCheck, t: 'Concessionnaire officiel', d: `Revendeur agréé ${brand.name} en Haute-Savoie.` },
                  { Icon: Waves, t: 'Essai sur l’eau', d: 'Testez le modèle sur le Lac d’Annecy ou le Léman.' },
                  { Icon: Wallet, t: 'Reprise & financement', d: 'Des solutions sur mesure pour votre achat.' },
                  { Icon: Wrench, t: 'Hivernage & entretien', d: 'Stockage et SAV assurés par nos experts.' },
                ].map(({ Icon, t, d }, i) => (
                  <div key={i} className="flex gap-4 p-5 bg-ink-900 border border-white/10 rounded-2xl">
                    <span className="w-11 h-11 shrink-0 rounded-xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center">
                      <Icon size={20} />
                    </span>
                    <div>
                      <h3 className="font-bold uppercase tracking-tight text-sm mb-1">{t}</h3>
                      <p className="text-gray-400 text-sm leading-snug">{d}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-brand-cyan/10 rounded-[3rem] blur-2xl" />
              {brand.introImages && brand.introImages.length > 0 ? (
                <AngleSlider images={brand.introImages} alt={`${brand.name}, vues sous différents angles`} />
              ) : (
                <img
                  src={brand.heroImage}
                  alt={`${brand.name}, style de vie sur l'eau`}
                  className="relative rounded-[2.5rem] border border-white/10 shadow-2xl w-full aspect-[4/5] object-cover"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
              )}
              {brand.models.length > 0 && (
                <div className="absolute -bottom-6 -left-6 bg-brand-cyan text-brand-dark px-8 py-6 rounded-[1.5rem] shadow-2xl hidden md:block">
                  <p className="text-4xl font-bold mb-1 tracking-tighter leading-none">{brand.models.length}</p>
                  <p className="text-[11px] font-bold uppercase tracking-widest">
                    {brand.models.length > 1 ? 'modèles au catalogue' : 'modèle au catalogue'}
                  </p>
                </div>
              )}
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
              const gamme = getBrandModels(id)?.models[slug]?.gamme;
              return (
                <motion.article
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
                  className="group relative bg-ink-900 border border-white/10 rounded-3xl overflow-hidden hover:border-brand-cyan hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
                >
                  <div className={`aspect-[4/3] overflow-hidden relative ${catalogStudio ? 'bg-gradient-to-b from-white to-gray-100' : ''}`}>
                    <img
                      src={model.image}
                      alt={`Bateau ${model.name} vendu chez Motorboat 74`}
                      className={`w-full h-full transition-transform duration-700 group-hover:scale-105 ${catalogStudio ? 'object-contain p-3' : 'object-cover'}`}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    {!catalogStudio && <div className="absolute inset-0 bg-gradient-to-t from-ink-900/70 via-transparent to-transparent" />}
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
