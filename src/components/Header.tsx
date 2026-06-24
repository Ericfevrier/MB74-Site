import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ChevronDown, 
  Phone, 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin, 
  Menu, 
  X,
  Anchor,
  Settings,
  Shield,
  LifeBuoy,
  History,
  Users,
  Compass,
  ArrowRight,
  Package,
  Wrench,
  Gauge
} from 'lucide-react';

const megaMenuServices = [
  { name: "Hivernage / Stockage", desc: "Stockage sécurisé, au sec", icon: Shield, path: "/hivernage-stockage-bateau" },
  { name: "Entretien / Réparation", desc: "Expertise technique complète", icon: Wrench, path: "/services/entretien-reparation" },
  { name: "Dépannage", desc: "7j/7 durant la saison sur le Lac", icon: LifeBuoy, path: "/services/depannage" },
  { name: "Transport", desc: "En France et en Europe", icon: Package, path: "/services/transport-de-bateau" },
  { name: "Sellerie", desc: "Rénovation sur-mesure", icon: Anchor, path: "/services/sellerie-de-bateau" },
  { name: "Remorque", desc: "Pour tout type de bateau", icon: Settings, path: "/services/remorques-de-bateau" },
];

const megaMenuBateaux = [
  { name: "Bateaux neufs", desc: "Les dernières nouveautés", icon: Compass, path: "/bateaux/neufs" },
  { name: "Bateau occasion", desc: "Certifiés et révisés", icon: Gauge, path: "/bateaux/occasion" },
];

// Marques affichées dans le menu (réduit à Nautique + Mastercraft pour le moment).
const megaMenuMarques = [
  { name: "Nautique", logo: "/images/design-sans-titre-10-11zon-e1753865977660-photoroom.png" },
  { name: "Mastercraft", logo: "/images/mcft-70e1d427.png" },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  return (
    <header className="bg-brand-dark/95 backdrop-blur-md text-white sticky top-0 z-[100] h-20 lg:h-[120px] flex items-center shadow-2xl border-b border-white/5">
      <div className="w-full px-4 lg:pl-6 lg:pr-12">
        <div className="flex items-center justify-between">
          
          {/* Logo Area */}
          <Link to="/" className="flex items-center space-x-3 sm:space-x-4 flex-shrink-0 cursor-pointer group ml-0 lg:ml-[-15px]">            <img
              src="/images/logo-transprent.png"
              alt="Motorboat 74"
              className="h-16 w-16 lg:h-[100px] lg:w-[100px] object-contain transition-transform group-hover:scale-105 duration-300"
              referrerPolicy="no-referrer"
            />
            <div className="text-white hidden sm:block">
              <span className="text-xl font-bold leading-none tracking-tight group-hover:text-brand-cyan transition-colors block">MOTORBOAT <span className="text-brand-cyan group-hover:text-white">74</span></span>
              <p className="text-[10px] tracking-widest font-bold opacity-30 uppercase mt-1">Services Nautiques</p>
            </div>
          </Link>

          {/* Main Navigation with Mega Menus */}
          <nav className="hidden lg:flex flex-1 justify-center relative">
            <ul className="flex items-center space-x-10 text-white text-[15px] font-bold tracking-widest">
              <li 
                className="relative cursor-pointer flex items-center h-[120px] group"
                onMouseEnter={() => setActiveMenu('services')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link to="/services" className={`group-hover:text-brand-cyan transition-colors py-2 flex items-center gap-1.5 ${activeMenu === 'services' ? 'text-brand-cyan' : ''}`}>
                  NOS SERVICES
                  <ChevronDown size={14} className={`opacity-50 transition-transform duration-300 ${activeMenu === 'services' ? 'rotate-180 opacity-100' : ''}`} />
                </Link>
              </li>
              <li 
                className="relative cursor-pointer flex items-center h-[120px] group"
                onMouseEnter={() => setActiveMenu('bateaux')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <Link to="/bateaux" className={`group-hover:text-brand-cyan transition-colors py-2 flex items-center gap-1.5 ${activeMenu === 'bateaux' ? 'text-brand-cyan' : ''}`}>
                  BATEAUX
                  <ChevronDown size={14} className={`opacity-50 transition-transform duration-300 ${activeMenu === 'bateaux' ? 'rotate-180 opacity-100' : ''}`} />
                </Link>
              </li>
              <li 
                className="relative cursor-pointer flex items-center h-[120px] group"
                onMouseEnter={() => setActiveMenu('marques')}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <span className={`group-hover:text-brand-cyan transition-colors py-2 flex items-center gap-1.5 ${activeMenu === 'marques' ? 'text-brand-cyan' : ''}`}>
                  MARQUES
                  <ChevronDown size={14} className={`opacity-50 transition-transform duration-300 ${activeMenu === 'marques' ? 'rotate-180 opacity-100' : ''}`} />
                </span>
              </li>
              {[{ name: "Blog", path: "/blog" }, { name: "La Team", path: "/la-team" }].map((item) => (
                <li key={item.name} className="h-[120px] flex items-center">
                  <Link to={item.path} className="hover:text-brand-cyan transition-colors uppercase py-2">
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Mega Menu Dropdown Wrapper */}
          <div 
            className={`absolute top-[120px] left-0 right-0 z-50 flex justify-center transition-all duration-500 overflow-hidden ${activeMenu ? 'opacity-100 visible translate-y-0' : 'opacity-0 invisible translate-y-4'}`}
            onMouseEnter={() => activeMenu && setActiveMenu(activeMenu)}
            onMouseLeave={() => setActiveMenu(null)}
          >
            <div className={`bg-brand-dark/98 backdrop-blur-2xl border border-white/10 rounded-b-[2.5rem] shadow-3xl p-10 relative overflow-hidden transition-all duration-500 ${activeMenu === 'marques' ? 'w-full px-12' : 'w-[850px] rounded-[2.5rem] mt-2'}`}>
              <div className="absolute top-0 inset-x-0 h-1 bg-brand-cyan"></div>
              
              {activeMenu === 'marques' && (
                <div className="max-w-xl mx-auto grid grid-cols-2 gap-6 justify-center">
                  {megaMenuMarques.map((item, i) => (
                    <Link 
                      key={i} 
                      to={`/marque/${item.name.toLowerCase()}`} 
                      onClick={() => setActiveMenu(null)}
                      className="flex flex-col items-center justify-center gap-6 group/item hover:bg-white/5 px-2 py-6 rounded-3xl transition-all border border-transparent hover:border-white/10"
                    >
                      <div className="h-16 flex items-center justify-center w-full px-4">
                        <img 
                          src={item.logo} 
                          alt={`Logo bateau ${item.name}`} 
                          className="max-h-full max-w-full object-contain opacity-80 group-hover/item:opacity-100 group-hover/item:scale-105 transition-all duration-300"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <span className="font-sans font-bold text-base tracking-widest uppercase text-gray-400 group-hover/item:text-white transition-colors">{item.name}</span>
                    </Link>
                  ))}
                </div>
              )}
              
				{activeMenu === 'services' && (
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                  {megaMenuServices.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <Link 
                        key={i} 
                        to={item.path} 
                        onClick={() => setActiveMenu(null)}
                        className="flex items-center gap-3 group/item hover:bg-white/5 p-3 rounded-2xl transition-all border border-transparent hover:border-white/10"
                      >
                        <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-brand-cyan group-hover/item:bg-brand-cyan group-hover/item:text-brand-dark transition-all">
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-base group-hover/item:text-brand-cyan transition-colors">{item.name}</p>
                          {item.desc && <p className="text-xs text-gray-500 font-medium">{item.desc}</p>}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
              
              {activeMenu === 'bateaux' && (
                <div className="grid grid-cols-2 gap-x-12 gap-y-4">
                  {megaMenuBateaux.map((item, i) => {
                    const Icon = item.icon;
                    return (
                      <Link key={i} to={item.path} onClick={() => setActiveMenu(null)} className="flex items-center gap-3 group/item hover:bg-white/5 p-3 rounded-2xl transition-all border border-transparent hover:border-white/10">
                        <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-brand-cyan group-hover/item:bg-brand-cyan group-hover/item:text-brand-dark transition-all">
                          <Icon size={16} />
                        </div>
                        <div>
                          <p className="font-bold text-base group-hover/item:text-brand-cyan transition-colors">{item.name}</p>
                          {item.desc && <p className="text-xs text-gray-500 font-medium">{item.desc}</p>}
                        </div>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>
          </div>


          {/* Contact Actions */}
          <div className="hidden lg:flex items-center space-x-10 -mr-[25px]">
            <div className="text-right mr-[25px]">
              <p className="text-brand-cyan text-[10px] font-bold tracking-widest mb-1 leading-none">NOUS APPELER</p>
              <a href="tel:+33457572727" className="block text-white font-bold text-xl leading-none hover:text-brand-cyan transition-colors cursor-pointer tracking-tight">04 57 57 27 27</a>
            </div>
            <Link to="/contact" className="bg-brand-cyan text-brand-dark font-bold py-4 px-8 rounded-2xl uppercase text-[11px] tracking-widest hover:translate-y-[-4px] hover:shadow-2xl hover:shadow-brand-cyan/40 transition-all duration-300">
              Contactez-nous
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden flex items-center gap-4">
             <a href="tel:+33457572727" className="bg-brand-cyan text-brand-dark px-5 py-2.5 rounded-xl font-bold uppercase text-[10px] tracking-widest hover:brightness-110 active:scale-95 transition-all">
              Appeler
            </a>
            <button aria-label={isMobileMenuOpen ? "Fermer le menu" : "Ouvrir le menu"} aria-expanded={isMobileMenuOpen} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className={`p-3 rounded-xl border transition-all active:scale-95 ${isMobileMenuOpen ? 'bg-brand-cyan text-brand-dark border-brand-cyan' : 'text-white bg-white/10 border-white/15 hover:bg-brand-cyan hover:text-brand-dark hover:border-brand-cyan'}`}>
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-ink-950 border-t-2 border-brand-cyan/40 absolute top-full left-0 w-full shadow-2xl h-[calc(100vh-80px)] overflow-y-auto overscroll-contain z-50">
          <nav aria-label="Menu principal mobile" className="flex flex-col py-8 px-6 gap-10">
            <a href="tel:+33457572727" className="flex items-center gap-3 font-bold text-brand-cyan justify-center pb-8 border-b border-white/5">
              <div className="bg-brand-cyan/10 p-3 rounded-xl">
                <Phone size={20} />
              </div>
              <span className="text-2xl tracking-tight">04 57 57 27 27</span>
            </a>
            
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 px-2">
                <span className="w-6 h-0.5 bg-brand-cyan rounded-full" />
                <span className="uppercase text-sm tracking-widest font-bold text-brand-cyan">Services</span>
              </div>
              <div className="grid grid-cols-1 gap-3">
                {megaMenuServices.map((item, idx) => (
                  <Link 
                    key={idx} 
                    to={item.path} 
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-4 px-4 py-4 hover:bg-white/5 transition-all rounded-2xl text-gray-200"
                  >
                    <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-brand-cyan">
                      <item.icon size={18} />
                    </div>
                    <span className="text-base font-bold">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-white/5">
              <div className="flex items-center gap-2.5 px-2">
                <span className="w-6 h-0.5 bg-brand-cyan rounded-full" />
                <span className="uppercase text-sm tracking-widest font-bold text-brand-cyan">Marques</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {megaMenuMarques.map((item, idx) => (
                  <Link 
                    key={idx} 
                    to={`/marque/${item.name.toLowerCase()}`}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex flex-col items-center justify-center gap-3 p-4 hover:bg-white/5 transition-all rounded-2xl border border-white/5"
                  >
                    <div className="h-8 flex items-center justify-center w-full">
                      <img 
                        src={item.logo} 
                        alt={`Logo bateau ${item.name}`} 
                        className={`max-h-full max-w-full object-contain opacity-80`}
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest text-gray-300 font-bold">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="space-y-6 pt-4 border-t border-white/5">
              <Link to="/bateaux" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2.5 px-2 group">
                <span className="w-6 h-0.5 bg-brand-cyan rounded-full" />
                <span className="uppercase text-sm tracking-widest font-bold text-brand-cyan group-hover:text-white transition-colors">Tous nos bateaux</span>
              </Link>
              <div className="grid grid-cols-1 gap-3">
                {megaMenuBateaux.map((item, idx) => (
                  <Link key={idx} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-3 px-6 py-4 hover:bg-white/5 transition-all rounded-2xl border border-white/5 text-gray-200">
                    <item.icon size={16} className="text-brand-cyan" />
                    <span className="text-base font-bold">{item.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-4 border-t border-white/5">
              {[{ name: "La Team", path: "/la-team" }, { name: "Blog", path: "/blog" }].map((item) => (
                <Link key={item.name} to={item.path} onClick={() => setIsMobileMenuOpen(false)} className="uppercase tracking-widest font-bold hover:text-brand-cyan text-xl py-4 px-4 transition-all">
                  {item.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center justify-around gap-4 mt-4 pt-12 border-t border-white/5 text-gray-400">
              {[Instagram, Facebook, Youtube, Linkedin].map((Icon, i) => {
                  const labels = ['Instagram', 'Facebook', 'Youtube', 'Linkedin'];
                  return (
                    <a key={i} href="#" aria-label={`Nous suivre sur ${labels[i]}`} className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center hover:text-brand-cyan transition-all hover:scale-110">
                      <Icon size={24} />
                    </a>
                  );
              })}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

