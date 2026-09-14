/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CartProvider } from './context/CartContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { SizeGuideModal } from './components/SizeGuideModal';
import { SearchModal } from './components/SearchModal';
import { ToastContainer } from './components/Toast';

import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import { Product } from './types';
import { SAMPLE_PRODUCTS } from './data/products';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(SAMPLE_PRODUCTS[0]);
  const [shopCategory, setShopCategory] = useState<string>('All');

  // Handle URL hash changes for easy bookmarking and back button support
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash.replace('#', '');
      if (!hash || hash === 'home') {
        setCurrentPage('home');
      } else if (hash.startsWith('product/')) {
        const prodId = hash.replace('product/', '');
        const found = SAMPLE_PRODUCTS.find((p) => p.id === prodId);
        if (found) {
          setSelectedProduct(found);
          setCurrentPage('product');
        } else {
          setCurrentPage('shop');
        }
      } else if (hash.startsWith('shop/')) {
        const cat = decodeURIComponent(hash.replace('shop/', ''));
        setShopCategory(cat);
        setCurrentPage('shop');
      } else if (hash === 'shop') {
        setShopCategory('All');
        setCurrentPage('shop');
      } else if (['cart', 'checkout', 'about', 'contact'].includes(hash)) {
        setCurrentPage(hash);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const navigateTo = (page: string, params?: Record<string, any>) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    if (page === 'home') {
      window.location.hash = 'home';
      setCurrentPage('home');
    } else if (page === 'shop') {
      const cat = params?.category || 'All';
      setShopCategory(cat);
      window.location.hash = cat !== 'All' ? `shop/${encodeURIComponent(cat)}` : 'shop';
      setCurrentPage('shop');
    } else if (page === 'product' && params?.product) {
      setSelectedProduct(params.product);
      window.location.hash = `product/${params.product.id}`;
      setCurrentPage('product');
    } else {
      window.location.hash = page;
      setCurrentPage(page);
    }
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    window.location.hash = `product/${product.id}`;
    setCurrentPage('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 text-neutral-900 selection:bg-[#C8102E] selection:text-white">
      {/* Sticky Header */}
      <Header
        activePage={currentPage}
        onNavigate={navigateTo}
      />

      {/* Main View Router */}
      <main className="flex-grow">
        {currentPage === 'home' && (
          <HomePage
            onSelectProduct={handleSelectProduct}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'shop' && (
          <ShopPage
            key={shopCategory}
            initialCategory={shopCategory}
            onSelectProduct={handleSelectProduct}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'product' && selectedProduct && (
          <ProductDetailPage
            key={selectedProduct.id}
            product={selectedProduct}
            onSelectProduct={handleSelectProduct}
            onNavigate={navigateTo}
          />
        )}

        {currentPage === 'cart' && (
          <CartPage onNavigate={navigateTo} />
        )}

        {currentPage === 'checkout' && (
          <CheckoutPage onNavigate={navigateTo} />
        )}

        {currentPage === 'about' && (
          <AboutPage onNavigate={navigateTo} />
        )}

        {currentPage === 'contact' && (
          <ContactPage onNavigate={navigateTo} />
        )}
      </main>

      {/* Persistent Global Footer */}
      <Footer onNavigate={navigateTo} />

      {/* Modals and Overlays */}
      <CartDrawer onNavigate={navigateTo} />
      <SizeGuideModal />
      <SearchModal onSelectProduct={handleSelectProduct} />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <AppContent />
    </CartProvider>
  );
}
