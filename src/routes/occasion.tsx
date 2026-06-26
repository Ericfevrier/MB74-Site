import { Link, useLoaderData } from 'react-router';
import { ArrowRight, ShieldCheck, Wallet, Wrench } from 'lucide-react';
import { SITE } from '../data/site';
import { Breadcrumb } from '../components/Breadcrumb';
import { UsedBoatCard } from '../components/UsedBoatCard';
import { ShowroomSection } from '../components/ShowroomSection';
import { ServiceContactBlock } from '../components/services/ServiceContactBlock';
import { availableUsedBoats, soldUsedBoats } from '../data/usedBoats';
import { cmsLogin, fetchUsedBoats } from '../lib/cms';

const HERO = 'https://www.mastercraft.com/media/0zadabm5/mb-1-3.jpg';

/**
 * Loader SSR : lit le CMS Directus À CHAQUE REQUÊTE (mise à jour instantanée, sans rebuild).
 * Repli sur les données statiques si le CMS est absent/injoignable.
 */
export async function loader() {
  const url = process.env.CMS_URL;
  if (url) {
    try {
      let token = process.env.CMS_TOKEN;
      if (!token && process.env.ADMIN_EMAIL && process.env.ADMIN_PASSWORD) {
        token = await cmsLogin(url, process.env.ADMIN_EMAIL, process.env.ADMIN_PASSWORD);
      }
      const all = await fetchUsedBoats({ url, token });
      return { boats: all.filter((b) => !b.sold), soldCount: all.filter((b) => b.sold).length, source: 'cms' };
    } catch {
      /* repli statique ci-dessous */
    }
  }
  return { boats: availableUsedBoats(), soldCount: soldUsedBoats().length, source: 'static' };
}

export function meta() {
  const canonical = `${SITE.url}/bateaux/occasion/`;
  return [
    { title: 'Bateaux d’occasion Nautique & MasterCraft près d’Annecy | Motor Boat 74' },
    { name: 'description', content: 'Wakeboats et bateaux de ski nautique d’occasion révisés et garantis, près du lac d’Annecy. Nautique, MasterCraft : prix, année, heures moteur.' },
    { tagName: 'link', rel: 'canonical', href: canonical },
    { property: 'og:title', content: 'Bateaux d’occasion Nautique & MasterCraft | Motor Boat 74' },
    { property: 'og:url', content: canonical },
    { property: 'og:image', content: HERO },
  ];
}

export default function Occasion() {
  const { boats, soldCount } = useLoaderData<typeof loader>();

  return (
    <div className="bg-brand-light">
      <header className="relative bg-brand-dark text-white overflow-hidden">
        <div className="absolute inset-0">
          <img src={HERO} alt="Wakeboat d’occasion sur le lac" className="w-full h-full object-cover opacity-30" referrerPolicy="no-referrer" fetchPriority="high" />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/80 via-brand-dark/85 to-brand-dark" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-4 lg:px-8 py-20 lg:py-24 text-center">
          <Breadcrumb className="mb-6 inline-flex" items={[{ label: 'Accueil', to: '/' }, { label: 'Bateaux', to: '/bateaux' }, { label: 'Occasion' }]} />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight mb-6">Bateaux d’occasion</h1>
          <p className="text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto">
            Des wakeboats et bateaux de ski nautique <strong>révisés et garantis</strong>, suivis par nos ateliers.
            Accédez à un modèle haut de gamme à budget maîtrisé, près du lac d’Annecy.
          </p>
        </div>
      </header>

      <section className="bg-brand-light py-20">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          {boats.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {boats.map((b) => (
                <UsedBoatCard key={b.slug} boat={b} variant="available" />
              ))}
            </div>
          ) : (
            <div className="bg-white border-2 border-dashed border-gray-300 rounded-[2rem] p-10 md:p-16 text-center max-w-3xl mx-auto">
              <p className="text-brand-dark text-xl font-bold mb-3">Aucun bateau d’occasion disponible actuellement</p>
              <p className="text-gray-500 leading-relaxed mb-8">Confiez-nous vos critères : nous vous alertons dès qu’un bateau correspondant arrive.</p>
              <a href="#contact" className="inline-flex items-center gap-2 bg-brand-dark text-white font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-xl hover:bg-brand-cyan hover:text-brand-dark transition">Demander une recherche <ArrowRight size={16} /></a>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-20 border-t border-gray-100">
        <div className="max-w-[1400px] mx-auto px-4 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-cyan font-bold uppercase tracking-widest text-xs">Acheter d’occasion en confiance</span>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-tight text-brand-dark mt-2">Des bateaux préparés par nos ateliers</h2>
          </div>
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { Icon: Wrench, t: 'Révisés avant la vente', d: 'Contrôle mécanique, coque et sellerie par nos techniciens avant la mise en vente.' },
              { Icon: ShieldCheck, t: 'Historique transparent', d: 'Millésime, heures moteur et entretien communiqués sans détour.' },
              { Icon: Wallet, t: 'Reprise & financement', d: 'Nous reprenons votre bateau actuel et proposons un financement adapté.' },
            ].map(({ Icon, t, d }, i) => (
              <div key={i} className="bg-brand-light border border-gray-200 rounded-3xl p-7">
                <span className="w-12 h-12 rounded-2xl bg-brand-cyan/10 text-brand-cyan flex items-center justify-center mb-5"><Icon size={22} /></span>
                <h3 className="font-bold uppercase tracking-tight text-brand-dark text-sm mb-2">{t}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {soldCount > 0 && (
        <section className="bg-brand-dark py-14">
          <div className="max-w-[1400px] mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-tight text-white mb-2">Nos bateaux déjà vendus</h2>
              <p className="text-gray-400 max-w-2xl">Un modèle similaire vous intéresse ? Nous lançons une recherche pour vous.</p>
            </div>
            <Link to="/bateaux/vendu" className="flex-shrink-0 inline-flex items-center gap-2 border border-white/20 text-white font-bold uppercase tracking-widest text-xs px-7 py-4 rounded-xl hover:border-brand-cyan hover:text-brand-cyan transition">
              Voir les bateaux vendus <ArrowRight size={15} />
            </Link>
          </div>
        </section>
      )}

      <ShowroomSection />
      <ServiceContactBlock subject="Bateau d’occasion" title="Une occasion en vue ?" showMap />
    </div>
  );
}
