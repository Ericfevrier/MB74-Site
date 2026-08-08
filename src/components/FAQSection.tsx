import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
}

/**
 * FAQ par marque.
 *
 * Il n'existait qu'un seul jeu de questions, écrit pour Nautique, affiché tel
 * quel sur les deux pages de marque : les quatre questions parlaient de
 * « Nautique » jusque sur la page MasterCraft. Les réponses passaient bien par
 * un `.replace("Nautique", brandName)`, mais il ne remplaçait que la PREMIÈRE
 * occurrence et laissait le reste intact — la page MasterCraft annonçait ainsi
 * des moteurs PCM, alors que sa propre description cite Ilmor vingt fois.
 * Deux pages, un texte identique : c'était aussi du contenu dupliqué.
 *
 * Les réponses ci-dessous ne reprennent que des faits déjà présents dans
 * src/data/brands.ts (motorisations, séries, statut commercial).
 */
export const FAQS_BY_BRAND: Record<string, FAQItem[]> = {
  nautique: [
    {
      question: "Comment choisir le modèle Nautique adapté à mes besoins ?",
      answer: "Nos experts vous accompagnent pour définir le modèle idéal selon votre pratique (ski, wakeboard, wakesurf, balade) et la taille de votre équipage. La série S convient aux sorties polyvalentes, la série G aux riders exigeants, et le Ski Nautique au ski de compétition.",
    },
    {
      question: "Quels moteurs équipent les bateaux Nautique ?",
      answer: "Les bateaux Nautique sont équipés de moteurs PCM (Pleasurecraft Marine), réputés pour leur fiabilité et leurs performances.",
    },
    {
      question: "Où acheter un bateau Nautique en Haute-Savoie ?",
      answer: "Motor Boat 74 est concessionnaire officiel Nautique en Haute-Savoie. Notre shop est à Saint-Jorioz, sur la rive ouest du lac d'Annecy, où nous vous accueillons pour un essai sur l'eau.",
    },
    {
      question: "Où trouver des pièces détachées et des accessoires Nautique ?",
      answer: "Nous disposons d'un stock de pièces d'origine et d'accessoires. Contactez notre service après-vente pour toute commande spécifique.",
    },
  ],
  mastercraft: [
    {
      question: "Comment choisir le modèle MasterCraft adapté à mes besoins ?",
      answer: "Nos experts vous aident à choisir selon votre pratique et la taille de votre équipage : la série NXT pour un premier wakeboat polyvalent, les séries XT et X pour plus d'espace et de puissance de vague, le XStar comme fleuron, et le ProStar pour le ski nautique.",
    },
    {
      question: "Quels moteurs équipent les bateaux MasterCraft ?",
      answer: "Les MasterCraft sont animés par des moteurs Ilmor, jusqu'au 6.2 L suralimenté de 630 ch, le plus puissant des towboats. Le système de vague SurfStar permet de calibrer la vague au rider près.",
    },
    {
      question: "Où acheter un bateau MasterCraft en Haute-Savoie ?",
      answer: "Motor Boat 74 est importateur officiel MasterCraft. Notre shop est à Saint-Jorioz, sur la rive ouest du lac d'Annecy : essai sur le lac, financement et reprise de votre bateau actuel.",
    },
    {
      question: "Où trouver des pièces détachées et des accessoires MasterCraft ?",
      answer: "Nous disposons d'un stock de pièces d'origine et d'accessoires. Contactez notre service après-vente pour toute commande spécifique.",
    },
  ],
};

export function FAQSection({ brandName }: { brandName: string }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(0);
  const faqs = FAQS_BY_BRAND[brandName.toLowerCase()] ?? FAQS_BY_BRAND.nautique;

  return (
    <section className="py-14 sm:py-24 bg-brand-light text-brand-dark">
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
              {/*
                Réponse TOUJOURS montée, repliée par une transition CSS.

                Deux exigences se cumulent ici. D'abord l'indexation : le montage
                était autrefois conditionné à `activeIndex === idx`, si bien
                qu'une seule des quatre réponses figurait dans le HTML prérendu —
                les trois autres étaient invisibles des moteurs comme des
                lecteurs d'écran. Un contenu replié reste indexé dès lors qu'il
                est dans le DOM : il suffit de ne pas le démonter.

                Ensuite le poids. On ne peut pas animer `height` de 0 à `auto` :
                le navigateur ne sait pas interpoler vers une valeur qu'il ignore
                encore. C'était la seule raison d'être de `motion` sur cette
                page. Mais une grille sait le faire — `grid-template-rows` passe
                de `0fr` à `1fr`, et la fraction, elle, s'interpole. L'accordéon
                s'ouvre à la hauteur exacte de son contenu, sans les 40 Ko de
                bibliothèque.

                `min-h-0` sur l'enfant est indispensable : un élément de grille
                vaut `min-height: auto` par défaut et refuse de descendre sous la
                hauteur de son contenu — la ligne resterait ouverte.

                Bénéfice second : cette transition CSS obéit d'elle-même à la
                règle `prefers-reduced-motion` d'index.css, ce qu'une animation
                pilotée en JavaScript ne fait pas.
              */}
              <div
                className="grid overflow-hidden"
                style={{
                  gridTemplateRows: activeIndex === idx ? '1fr' : '0fr',
                  opacity: activeIndex === idx ? 1 : 0,
                  transition: 'grid-template-rows 300ms ease-out, opacity 300ms ease-out',
                }}
                aria-hidden={activeIndex !== idx}
              >
                <div className="min-h-0">
                  <div className="px-6 pb-6 text-gray-600 font-medium leading-relaxed">{faq.answer}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
