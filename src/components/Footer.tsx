import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Linkedin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ink-850 text-gray-400 pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-10 mb-20">

          {/* Column 1: Info & Image */}
          <div className="col-span-2 lg:col-span-3 space-y-8">
            <div className="flex items-center gap-3">
              <img
                src="/images/logo-transprent.png"
                alt="Motor Boat 74"
                className="h-16 w-16 object-contain flex-shrink-0"
                referrerPolicy="no-referrer"
              />
              <h2 className="text-white text-2xl font-bold uppercase tracking-tight leading-none whitespace-nowrap">
                Motor Boat 74
              </h2>
            </div>

            <p className="text-sm leading-relaxed text-gray-300 font-medium">
              Motorboat74, concessionnaire officiel de la marque Nautique et importateur de Connelly Ski en Haute-Savoie, est spécialisé dans la vente, l'hivernage et l'entretien de bateaux à moteur. Nous vous accompagnons dans tous vos projets nautiques sur le Lac d'Annecy et ses environs.
            </p>

            <a href="tel:+33457572727" className="inline-flex items-center gap-3 text-white hover:text-brand-cyan transition-colors">
              <span className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-cyan flex-shrink-0">
                <Phone size={18} />
              </span>
              <span className="font-bold text-lg tracking-tight">04 57 57 27 27</span>
            </a>
          </div>

          {/* Column 2: Services */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-white text-lg font-bold uppercase tracking-tight mb-8">Nos services</h3>
            <ul className="space-y-3">
              {[
                { name: 'Hivernage / Stockage', path: '/hivernage-stockage-bateau' },
                { name: 'Entretien / Réparation', path: '/services/entretien-reparation' },
                { name: 'Dépannage', path: '/services/depannage' },
                { name: 'Transport', path: '/services/transport-de-bateau' },
                { name: 'Sellerie', path: '/services/sellerie-de-bateau' },
                { name: 'Remorque', path: '/services/remorques-de-bateau' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-brand-cyan transition-colors text-[14px] font-medium">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Bateaux */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-white text-lg font-bold uppercase tracking-tight mb-8">Nos bateaux</h3>
            <ul className="space-y-3">
              {[
                { name: 'Tous nos bateaux', path: '/bateaux' },
                { name: 'Bateaux neufs', path: '/bateaux/neufs' },
                { name: "Bateaux d'occasion", path: '/bateaux/occasion' },
                { name: 'Bateaux vendus', path: '/bateaux/vendu' },
              ].map((item) => (
                <li key={item.name}>
                  <Link to={item.path} className="hover:text-brand-cyan transition-colors text-[14px] font-medium">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Zones d'interventions */}
          <div className="col-span-1 lg:col-span-2">
            <h3 className="text-white text-lg font-bold uppercase tracking-tight mb-8">Zones d'interventions</h3>
            <ul className="space-y-3">
              {[
                { name: 'Annecy', slug: 'annecy' },
                { name: 'Aix-les-Bains', slug: 'aix-les-bains' },
                { name: 'Thonon-les-Bains', slug: 'thonon-les-bains' },
                { name: 'Évian-les-Bains', slug: 'evian-les-bains' },
                { name: 'Genève', slug: 'geneve' },
                { name: 'Lac de Serre-Ponçon', slug: 'lac-de-serre-poncon' },
              ].map((item) => (
                <li key={item.slug}>
                  <Link to={`/services/hivernage-bateaux/${item.slug}`} className="hover:text-brand-cyan transition-colors text-[14px] font-medium">{item.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Marques, réseaux & contact */}
          <div className="col-span-2 lg:col-span-3 space-y-8">
            <div>
              <h3 className="text-white text-lg font-bold uppercase tracking-tight mb-8">Marques</h3>
              <div className="space-y-5">
                {[
                  { name: 'Nautique', slug: 'nautique', logo: '/images/design-sans-titre-10-11zon-e1753865977660-photoroom.png', hideName: true, whiteBg: false },
                  { name: 'MasterCraft', slug: 'mastercraft', logo: '/images/mcft-70e1d427.png', hideName: false, whiteBg: true },
                ].map((b) => (
                  <Link
                    key={b.slug}
                    to={`/marque/${b.slug}`}
                    className="group flex items-center gap-4"
                  >
                    {b.whiteBg ? (
                      <span className="bg-white rounded-lg flex items-center justify-center px-3 py-2 h-12 flex-shrink-0">
                        <img src={b.logo} alt={`Logo ${b.name}`} className="h-8 w-auto max-w-[120px] object-contain" referrerPolicy="no-referrer" />
                      </span>
                    ) : (
                      <img src={b.logo} alt={`Logo ${b.name}`} className="h-12 w-auto max-w-[150px] object-contain opacity-90 group-hover:opacity-100 transition" referrerPolicy="no-referrer" />
                    )}
                    {!b.hideName && (
                      <span className="text-white font-bold uppercase tracking-tight group-hover:text-brand-cyan transition-colors">{b.name}</span>
                    )}
                  </Link>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-white text-sm font-bold uppercase tracking-widest mb-4">Suivez-nous</h3>
              <div className="flex items-center gap-3">
                {[
                  { Icon: Instagram, label: 'Instagram', href: 'https://www.instagram.com/motorboat_74/' },
                  { Icon: Facebook, label: 'Facebook', href: 'https://www.facebook.com/motorboat74/' },
                  { Icon: Youtube, label: 'YouTube', href: 'https://www.youtube.com/@MotorBoat74' },
                  { Icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/company/motor-boat-74/' },
                ].map(({ Icon, label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Suivez-nous sur ${label}`}
                    className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-brand-dark hover:bg-brand-cyan hover:border-brand-cyan transition-all"
                  >
                    <Icon size={18} />
                  </a>
                ))}
              </div>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-cyan text-brand-dark font-bold px-8 py-4 rounded-xl text-[13px] uppercase tracking-widest hover:bg-white transition-all shadow-lg shadow-brand-cyan/20"
            >
              <Phone size={15} /> Contactez-nous
            </Link>
          </div>

        </div>
        
        {/* Footer Bottom Bar */}
        <div className="pt-8 pb-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { name: 'Mentions légales', path: '/mentions-legales' },
              { name: 'Politique de confidentialité', path: '/politique-de-confidentialite' },
              { name: 'CGV Pro', path: '/cgv-pro' },
              { name: 'Contact', path: '/contact' },
            ].map((link) => (
              <Link key={link.name} to={link.path} className="text-[11px] font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                {link.name}
              </Link>
            ))}
          </div>
          <p className="text-[11px] font-bold uppercase tracking-widest text-white/20">
            © {new Date().getFullYear()} Tous droits réservés
          </p>
        </div>
      </div>
    </footer>
  );
}
