/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';

// Pages secondaires chargées à la demande (code-splitting → bundle initial allégé).
const BrandPage = lazy(() => import('./components/BrandPage').then((m) => ({ default: m.BrandPage })));
const ModelPage = lazy(() => import('./components/ModelPage').then((m) => ({ default: m.ModelPage })));
const HivernageStockagePage = lazy(() =>
  import('./pages/HivernageStockagePage').then((m) => ({ default: m.HivernageStockagePage })),
);
const ServicesHubPage = lazy(() => import('./pages/ServicesHubPage').then((m) => ({ default: m.ServicesHubPage })));
const ServicePage = lazy(() => import('./pages/ServicePage').then((m) => ({ default: m.ServicePage })));
const DepannagePage = lazy(() => import('./pages/DepannagePage').then((m) => ({ default: m.DepannagePage })));
const SelleriePage = lazy(() => import('./pages/SelleriePage').then((m) => ({ default: m.SelleriePage })));
const EntretienReparationPage = lazy(() => import('./pages/EntretienReparationPage').then((m) => ({ default: m.EntretienReparationPage })));
const TransportPage = lazy(() => import('./pages/TransportPage').then((m) => ({ default: m.TransportPage })));
const RemorquesPage = lazy(() => import('./pages/RemorquesPage').then((m) => ({ default: m.RemorquesPage })));
const HivernageCityPage = lazy(() => import('./pages/HivernageCityPage').then((m) => ({ default: m.HivernageCityPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));
const BlogHivernagePage = lazy(() => import('./pages/BlogHivernagePage').then((m) => ({ default: m.BlogHivernagePage })));
const LegalPage = lazy(() => import('./pages/LegalPage').then((m) => ({ default: m.LegalPage })));
const NotFound = lazy(() => import('./components/NotFound').then((m) => ({ default: m.NotFound })));
const ComingSoon = lazy(() => import('./components/ComingSoon').then((m) => ({ default: m.ComingSoon })));
const BateauxHubPage = lazy(() => import('./pages/BateauxHubPage').then((m) => ({ default: m.BateauxHubPage })));
const BateauxNeufsPage = lazy(() => import('./pages/BateauxNeufsPage').then((m) => ({ default: m.BateauxNeufsPage })));
const BateauxOccasionPage = lazy(() => import('./pages/BateauxOccasionPage').then((m) => ({ default: m.BateauxOccasionPage })));
const BateauxVenduPage = lazy(() => import('./pages/BateauxVenduPage').then((m) => ({ default: m.BateauxVenduPage })));
const OccasionDetailPage = lazy(() => import('./pages/OccasionDetailPage').then((m) => ({ default: m.OccasionDetailPage })));

// Remet la vue en haut à chaque changement d'URL (sinon on conserve le scroll de la page précédente).
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' as ScrollBehavior });
  }, [pathname]);
  return null;
}

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-brand-light">
      <div className="w-10 h-10 rounded-full border-4 border-brand-cyan/20 border-t-brand-cyan animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-brand-light">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marque/:id" element={<BrandPage />} />
              <Route path="/hivernage-stockage-bateau" element={<HivernageStockagePage />} />
              <Route path="/services" element={<ServicesHubPage />} />
              <Route path="/depannage" element={<DepannagePage />} />
              <Route path="/sellerie" element={<SelleriePage />} />
              <Route path="/entretien-reparation" element={<EntretienReparationPage />} />
              <Route path="/transport" element={<TransportPage />} />
              <Route path="/remorques" element={<RemorquesPage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/services/hivernage-bateaux/:slug" element={<HivernageCityPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/blog/hivernage/hivernage-bateau-guide-complet" element={<BlogHivernagePage />} />
              <Route path="/bateaux" element={<BateauxHubPage />} />
              <Route path="/bateaux/neufs" element={<BateauxNeufsPage />} />
              <Route path="/bateaux/occasion" element={<BateauxOccasionPage />} />
              <Route path="/bateaux/occasion/:slug" element={<OccasionDetailPage />} />
              <Route path="/bateaux/vendu" element={<BateauxVenduPage />} />
              {/* Anciennes URLs plates → redirection vers la nouvelle arborescence (301 à doubler côté serveur) */}
              <Route path="/bateaux-neufs" element={<Navigate to="/bateaux/neufs" replace />} />
              <Route path="/bateaux-occasion" element={<Navigate to="/bateaux/occasion" replace />} />
              <Route path="/shop" element={<ComingSoon title="Boutique" description="Notre boutique en ligne (wakeboard, ski nautique, accessoires Connelly…) ouvrira ses portes bientôt." />} />
              <Route path="/la-team" element={<ComingSoon title="La Team" description="Faites bientôt connaissance avec l'équipe passionnée de Motor Boat 74." />} />
              <Route path="/mentions-legales" element={<LegalPage doc="mentions" />} />
              <Route path="/politique-de-confidentialite" element={<LegalPage doc="privacy" />} />
              <Route path="/:brandId/:modelId" element={<ModelPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
