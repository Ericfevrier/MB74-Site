/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { BrandPage } from './components/BrandPage';
import { ModelPage } from './components/ModelPage';
import { HivernageStockagePage } from './pages/HivernageStockagePage';

export default function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-[#F4F4F4]">
        <Header />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/marque/:id" element={<BrandPage />} />
            <Route path="/hivernage-stockage-bateau" element={<HivernageStockagePage />} />
            <Route path="/:brandId/:modelId" element={<ModelPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
