import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
