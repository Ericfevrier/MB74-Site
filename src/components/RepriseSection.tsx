import React from 'react';
import { Link } from 'react-router';
import { ArrowRight, Repeat, Wrench, Wallet } from 'lucide-react';
import { SITE } from '../data/site';

/**
 * Reprise de bateau, toutes marques.
 *
 * POURQUOI CETTE SECTION
 * Le site distribue du neuf en Nautique et MasterCraft uniquement, et c'est très
 * bien ainsi. Mais le propriétaire d'un Malibu, d'un Tigé ou d'un Centurion qui
 * envisage de changer de bateau est exactement l'acheteur visé — et rien, nulle
 * part sur le site, ne lui disait que sa marque était reprise. Le mot « reprise »
 * apparaissait une douzaine de fois, « toutes marques » jamais.
 *
 * C'est la façon honnête d'exister sur les marques concurrentes : on ne prétend
 * pas les vendre neuves, on dit ce qu'on fait réellement de leurs bateaux.
 *
 * Les marques citées sont celles que l'atelier reçoit effectivement — l'inventaire
 * d'occasion a compté du Malibu et du Heyday. Ce n'est pas une liste de mots-clés,
 * c'est l'information dont a besoin quelqu'un qui se demande « et mon bateau ? ».
 */
const BRANDS = ['Malibu', 'Tigé', 'Centurion', 'Supra', 'Axis', 'Moomba', 'Heyday', 'Correct Craft'];

const STEPS = [
  {
    Icon: Repeat,
    t: 'Quelle que soit la marque',
    d: 'Nous reprenons votre bateau actuel, même s’il ne fait pas partie des marques que nous distribuons en neuf.',
  },
  {
    Icon: Wrench,
    t: 'Estimation par nos techniciens',
    d: 'Coque, moteur, heures et sellerie sont évalués par l’atelier qui prépare nos occasions, pas sur un barème.',
  },
  {
    Icon: Wallet,
    t: 'Déduite de votre achat',
    d: 'La reprise vient en déduction de votre bateau neuf ou d’occasion, avec un financement adapté si besoin.',
  },
];

export function RepriseSection() {
  return (
    <section className="bg-brand-dark text-white py-20 border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">Reprise</span>
          <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight mt-2 mb-5">
            Nous reprenons votre bateau, <span className="text-brand-cyan">quelle que soit la marque</span>
          </h2>
          <p className="text-gray-400 leading-relaxed max-w-2xl mx-auto">
            Vous naviguez sur une autre marque et souhaitez passer sur un Nautique ou un MasterCraft&nbsp;?
            Nous estimons votre bateau et le reprenons en déduction de votre achat.
          </p>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 mb-12">
          {STEPS.map(({ Icon, t, d }) => (
            <div key={t} className="bg-white/[0.04] border border-white/10 rounded-3xl p-7">
              <span className="w-12 h-12 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-5">
                <Icon size={22} />
              </span>
              <h3 className="font-bold uppercase tracking-tight text-sm mb-2">{t}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{d}</p>
            </div>
          ))}
        </div>

        <div className="bg-white/[0.04] border border-white/10 rounded-3xl p-7 md:p-9 flex flex-col lg:flex-row lg:items-center gap-7">
          <div className="flex-1 min-w-0">
            <p className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-3">
              Marques régulièrement reprises
            </p>
            <ul className="flex flex-wrap gap-2">
              {BRANDS.map((b) => (
                <li
                  key={b}
                  className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm font-semibold text-gray-200"
                >
                  {b}
                </li>
              ))}
            </ul>
            <p className="text-gray-500 text-sm mt-4 leading-relaxed">
              Votre marque n’est pas dans la liste&nbsp;? Elle est probablement reprise aussi&nbsp;: parlez-nous du bateau.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 flex-shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 bg-brand-cyan text-brand-dark font-bold uppercase tracking-widest text-[11px] px-7 py-4 rounded-xl hover:bg-white transition"
            >
              Faire estimer mon bateau <ArrowRight size={15} />
            </Link>
            <a
              href={SITE.phoneHref}
              className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-bold uppercase tracking-widest text-[11px] px-7 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition"
            >
              {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
