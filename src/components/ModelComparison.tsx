import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lightbulb, ArrowDown } from 'lucide-react';
import { ComparisonCategory } from '../data/brands';

interface ModelComparisonProps {
  comparisons: ComparisonCategory[];
}

export function ModelComparison({ comparisons }: ModelComparisonProps) {
  const [activeCategory, setActiveCategory] = useState(0);

  const current = comparisons[activeCategory];

  return (
    <section className="py-24 bg-white text-brand-dark overflow-hidden border-t border-gray-200">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight mb-12">
            COMPARATIF DES <span className="text-brand-cyan">MODÈLES</span>
          </h2>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-3">
            {comparisons.map((cat, idx) => (
              <button
                key={idx}
                onClick={() => setActiveCategory(idx)}
                className={`px-8 py-3 rounded-xl font-bold uppercase tracking-widest text-[11px] transition-all duration-300 border-2 ${
                  activeCategory === idx
                    ? 'bg-brand-cyan border-brand-cyan text-brand-dark'
                    : 'bg-transparent border-gray-300 text-brand-dark hover:border-brand-cyan hover:text-brand-cyan'
                }`}
              >
                {cat.title}
              </button>
            ))}
          </div>
        </div>

        {/* Sous-titre de la série comparée (structure Hn) */}
        <motion.h3
          key={`cat-title-${activeCategory}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="text-2xl md:text-3xl font-bold uppercase tracking-tight text-brand-dark text-center mb-8"
        >
          {current.title}
        </motion.h3>

        {/* Résumé lecture rapide */}
        {current.summary && (
          <motion.div
            key={`summary-${activeCategory}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-5xl mx-auto mb-12"
          >
            <div className="relative rounded-2xl border border-brand-cyan/25 border-l-[5px] border-l-brand-cyan bg-brand-cyan/[0.06] px-7 py-6 md:px-9 md:py-7 text-left shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb size={16} className="text-brand-cyan" />
                <span className="text-brand-cyan font-bold uppercase tracking-widest text-[11px]">L'essentiel à retenir</span>
              </div>
              <p className="text-gray-700 text-base md:text-[17px] leading-relaxed">
                {current.summary}
              </p>
              <p className="mt-4 flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-widest text-gray-400">
                Comparatif chiffré ci-dessous
                <ArrowDown size={13} className="text-brand-cyan" />
              </p>
            </div>
          </motion.div>
        )}

        {/* Comparison Table */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="rounded-[1.5rem] overflow-hidden shadow-xl shadow-brand-dark/5 border border-gray-200"
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-brand-cyan text-brand-dark">
                      <th className="py-8 px-10 font-bold uppercase tracking-widest text-[13px] min-w-[300px]">
                        Caractéristiques
                      </th>
                      {current.models.map((model, idx) => (
                        <th key={idx} className="py-8 px-10 font-bold uppercase tracking-widest text-[14px] text-center">
                          {model}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {current.specs.map((spec, idx) => (
                      <tr 
                        key={idx} 
                        className={`border-b border-gray-200 transition-colors ${
                          idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                        }`}
                      >
                        <td className="py-6 px-10 text-[14px] font-medium text-brand-dark">
                          {spec.label}
                        </td>
                        {spec.values.map((val, vIdx) => (
                          <td key={vIdx} className="py-6 px-10 text-[14px] text-center text-gray-600 font-medium whitespace-nowrap">
                            {val}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
