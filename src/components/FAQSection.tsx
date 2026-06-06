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
    answer: "Motorboat 74 est concessionnaire officiel Nautique en Haute-Savoie. Nous vous accueillons au Val de Chaise près du Lac d'Annecy."
  },
  {
    question: "Où puis-je trouver des pièces détachées et des accessoires ?",
    answer: "Nous disposons d'un stock de pièces d'origine et d'accessoires. Contactez notre service après-vente pour toute commande spécifique."
  }
];

export function FAQSection({ brandName }: { brandName: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);

  return (
    <section className="py-24 bg-ink-850 text-white">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tight text-center mb-16">
          ON RÉPOND À VOS <span className="text-brand-cyan">QUESTIONS</span>
        </h2>
        
        <div className="space-y-4">
          {faqs.map((faq, idx) => (
            <div key={idx} className="bg-ink-800 rounded-2xl overflow-hidden border border-white/5">
              <button
                onClick={() => setActiveIndex(activeIndex === idx ? null : idx)}
                className="w-full text-left p-6 flex items-center justify-between font-bold text-lg uppercase tracking-tight hover:bg-white/5 transition-colors"
                aria-expanded={activeIndex === idx}
              >
                {faq.question}
                <ChevronDown className={`transition-transform duration-300 ${activeIndex === idx ? 'rotate-180' : ''}`} />
              </button>
              <AnimatePresence>
                {activeIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="px-6 pb-6 text-gray-400 font-medium leading-relaxed"
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
