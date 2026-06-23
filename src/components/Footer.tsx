import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Linkedin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-ink-850 text-gray-400 pt-20">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-20 mb-20">
          
          {/* Column 1: Info & Image */}
          <div className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full border-2 border-white/10 flex items-center justify-center p-2">
                <img 
                  src="/images/logo-transprent.png" 
                  alt="MB74 Logo" 
                  className="w-full h-full object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h2 className="text-white text-2xl font-bold uppercase tracking-tight leading-none">
                MOTOR BOAT 74
              </h2>
            </div>
            
            <p className="text-sm leading-relaxed text-gray-300 font-medium">
              Motorboat74, concessionnaire officiel de la marque Nautique et importateur de Connelly Ski en Haute-Savoie, est spécialisé dans la vente, l'hivernage et l'entretien de bateaux à moteur. Nous vous accompagnons dans tous vos projets nautiques sur le Lac d'Annecy et ses environs.
            </p>

            <div className="rounded-2xl overflow-hidden shadow-2xl border border-white/5 grayscale-[30%] hover:grayscale-0 transition-all duration-700">
              <img 
                src="/images/2026-p25-ext-16.jpg" 
                alt="Bateau Motorboat" 
                className="w-full aspect-[16/9] object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

          {/* Column 2: Services & Zones */}
          <div className="space-y-12">
            <div>
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

            <div>
              <h3 className="text-white text-lg font-bold uppercase tracking-tight mb-8">Zones d'interventions</h3>
              <ul className="space-y-3">
                {['Annecy', 'Aix-les-Bains', 'Thonon-les-Bains', 'Évian-les-Bains', 'Genève', 'Lac de Serre-Ponçon'].map((item) => (
                  <li key={item}>
                    <span className="text-[14px] font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Column 3: Bateaux, Shop & Contact */}
          <div className="space-y-12">
            <div>
              <h3 className="text-white text-lg font-bold uppercase tracking-tight mb-8">Nos bateaux</h3>
              <ul className="space-y-3">
                {[
                  { name: 'Tous nos bateaux', path: '/bateaux' },
                  { name: 'Bateaux neufs', path: '/bateaux/neufs' },
                  { name: "Bateaux d'occasion", path: '/bateaux/occasion' },
                ].map((item) => (
                  <li key={item.name}>
                    <Link to={item.path} className="hover:text-brand-cyan transition-colors text-[14px] font-medium">{item.name}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white text-lg font-bold uppercase tracking-tight mb-8">Shop</h3>
              <ul className="space-y-3 mb-10">
                {['Wakeboard', 'Wakesurf', 'Ski Nautique', 'Kneeboard', 'Engins tractés', 'Paddle', 'Accessoires'].map((item) => (
                  <li key={item}>
                    <Link to="/shop" className="hover:text-brand-cyan transition-colors text-[14px] font-medium">{item}</Link>
                  </li>
                ))}
              </ul>
              
              <Link
                to="/contact"
                className="inline-block bg-brand-cyan text-brand-dark font-bold px-8 py-4 rounded-xl text-[13px] uppercase tracking-widest hover:scale-105 transition-all shadow-lg shadow-brand-cyan/20"
              >
                Contactez-nous
              </Link>
            </div>
          </div>

          {/* Column 4: Nautique & Social */}
          <div className="space-y-8">
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-red-600 w-10 h-10 rounded-lg flex items-center justify-center p-1.5 shadow-lg">
                <img 
                  src="/images/design-sans-titre-10-11zon-e1753865977660-photoroom.png" 
                  alt="Nautique" 
                  className="w-full h-full object-contain brightness-0 invert"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-white text-3xl font-bold tracking-tighter uppercase italic">NAUTIQUE</h3>
            </div>

            <ul className="space-y-2">
              {[
                'Super Air Nautique G25 Paragon',
                'Super Air Nautique G23 Paragon',
                'Super Air Nautique G25',
                'Super Air Nautique G23',
                'Super Air Nautique G21',
                'Super Air Nautique S25',
                'Super Air Nautique S23',
                'Super Air Nautique S21',
                'Super Air Nautique GS24',
                'Super Air Nautique GS22',
                'Super Air Nautique GS20',
                'Ski Nautique'
              ].map((model) => (
                <li key={model}>
                  <Link to={`/marque/nautique`} className="hover:text-brand-cyan transition-colors text-[13px] font-medium whitespace-nowrap">
                    {model}
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-6 pt-6 border-t border-white/5">
               {[Instagram, Facebook, Youtube, Linkedin].map((Icon, i) => {
                  const labels = ['Instagram', 'Facebook', 'Youtube', 'Linkedin'];
                  return (
                    <a key={i} href="#" aria-label={`Suivez-nous sur ${labels[i]}`} className="text-white/40 hover:text-brand-cyan transition-colors">
                      <Icon size={20} />
                    </a>
                  );
               })}
            </div>
          </div>

        </div>
        
        {/* Footer Bottom Bar */}
        <div className="py-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-wrap justify-center gap-6 md:gap-10">
            {[
              { name: 'Mentions légales', path: '/mentions-legales' },
              { name: 'Politique de confidentialité', path: '/politique-de-confidentialite' },
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
