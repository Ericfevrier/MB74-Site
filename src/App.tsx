/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
const NotFound = lazy(() => import('./components/NotFound').then((m) => ({ default: m.NotFound })));
const ComingSoon = lazy(() => import('./components/ComingSoon').then((m) => ({ default: m.ComingSoon })));

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
      <div className="min-h-screen flex flex-col bg-brand-light">
        <Header />
        <main className="flex-1">
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/marque/:id" element={<BrandPage />} />
              <Route path="/hivernage-stockage-bateau" element={<HivernageStockagePage />} />
              <Route path="/services" element={<ServicesHubPage />} />
              <Route path="/services/:slug" element={<ServicePage />} />
              <Route path="/bateaux-neufs" element={<ComingSoon title="Bateaux neufs" description="Notre sélection de bateaux neufs Nautique, MasterCraft et Tigé arrive très prochainement en ligne." />} />
              <Route path="/bateaux-occasion" element={<ComingSoon title="Bateaux d'occasion" description="Nos bateaux d'occasion certifiés et révisés seront bientôt présentés ici. Contactez-nous pour connaître les disponibilités actuelles." />} />
              <Route path="/shop" element={<ComingSoon title="Boutique" description="Notre boutique en ligne (wakeboard, ski nautique, accessoires Connelly…) ouvrira ses portes bientôt." />} />
              <Route path="/la-team" element={<ComingSoon title="La Team" description="Faites bientôt connaissance avec l'équipe passionnée de Motor Boat 74." />} />
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
