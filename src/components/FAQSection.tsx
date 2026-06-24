import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Comment choisir le modèle Nautique adapté à mes besoins ?",
    answer: "Nos experts vous accompagnent pour définir le modèle idéal selon votre pratique (ski, wakeboard, wakesurf, balade) et la taille de votre équipage."
  },
  {
    question: "Quels moteurs sont installés sur les bateaux Nautique ?",
    answer: "Les bateaux Nautique sont équipés des moteurs PCM (Pleasurecraft Marine), réputés pour leur fiabilité et leurs performances exceptionnelles."
  },
  {
    question: "Où puis-je acheter un bateau Nautique en France ?",
    answer: "Motorboat 74 est concessionnaire officiel Nautique en Haute-Savoie. Nous vous accueillons au Val de Chaise, près du Lac d'Annecy."
  },
  {
    question: "Où puis-je trouver des pièces détachées et des accessoires ?",
    answer: "Nous disposons d'un stock de pièces d'origine et d'accessoires. Contactez notre service après-vente pour toute commande spécifique."
  }
];

export function FAQSection({ brandName }: { brandName: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-brand-light text-brand-dark">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold uppercase tracking-tight text-center mb-16">
          ON RÉPOND À VOS <span className="text-brand-cyan">QUESTIONS</span>
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl overflow-hidden border border-gray-200 shadow-lg shadow-brand-dark/5">
              <h3 className="m-0">
                <button
                  onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-bold text-base sm:text-lg uppercase tracking-tight hover:bg-gray-50 transition-colors"
                  aria-expanded={activeIndex === idx}
                >
                  {faq.question}
                  <ChevronDown size={20} className={`flex-shrink-0 transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''}`} />
                </button>
              </h3>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-gray-600 font-medium leading-relaxed"
                  >
                    {faq.answer.replace("Nautique", brandName)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
