import React, { useState, useEffect } from 'react';
import { Search, ShoppingBag, Heart, Menu, X, ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import { FoxLogo } from './FoxLogo';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string, params?: Record<string, any>) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPage, onNavigate }) => {
  const { cartCount, wishlist, openCartDrawer, openSearch } = useCart();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', page: 'home' },
    { label: 'Shop All', page: 'shop' },
    { label: 'Men', page: 'shop', params: { category: 'Men' } },
    { label: 'Women', page: 'shop', params: { category: 'Women' } },
    { label: 'Sports', page: 'shop', params: { category: 'Sports' } },
    { label: 'Kids', page: 'shop', params: { category: 'Kids' } },
    { label: 'Sale', page: 'shop', params: { category: 'Sale' }, badge: 'Sale' },
    { label: 'About', page: 'about' },
    { label: 'Contact', page: 'contact' },
  ];

  const handleNavClick = (page: string, params?: Record<string, any>) => {
    onNavigate(page, params);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* Top Banner */}
      <div className="bg-neutral-950 text-white text-xs py-2 px-4 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-neutral-300">
          <div className="flex items-center gap-3 hidden sm:flex">
            <div className="flex items-center gap-2">
              <Truck className="w-3.5 h-3.5 text-[#C8102E]" />
              <span>Free express shipping on orders over BDT 100</span>
            </div>
            <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-neutral-900 border border-neutral-700 text-[10px] text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-bold text-white font-mono">BDT (৳)</span>
              <span className="text-neutral-400">Only</span>
            </div>
          </div>
          <div className="mx-auto sm:mx-0 flex items-center gap-2 font-medium">
            <span className="text-[#C8102E] font-bold">15% OFF YOUR FIRST PAIR</span>
            <span className="text-neutral-500">•</span>
            <span className="text-neutral-200">Use Code:</span>
            <code className="bg-neutral-900 border border-neutral-700 px-1.5 py-0.5 rounded text-white font-mono text-[11px]">
              REDFOX15
            </code>
          </div>
          <div className="hidden lg:flex items-center gap-4 text-[11px] text-neutral-400">
            <div className="flex items-center gap-1.5 font-medium text-neutral-300">
              <span className="text-neutral-400">Currency:</span>
              <span className="font-mono font-bold text-white bg-neutral-900 border border-neutral-800 px-1.5 py-0.5 rounded text-[10px]">
                BDT
              </span>
            </div>
            <span>|</span>
            <button
              onClick={() => onNavigate('contact')}
              className="hover:text-white transition-colors"
            >
              Support: 1-800-RED-FOX
            </button>
            <span>|</span>
            <div className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>30-Day Free Trial</span>
            </div>
          </div>
        </div>
      </div>

      {/* Sticky Main Navigation */}
      <header
        className={`sticky top-0 z-40 transition-all duration-200 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200'
            : 'bg-white border-b border-neutral-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Mobile menu button */}
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                id="mobile-menu-toggle-btn"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 -ml-2 text-neutral-800 hover:text-[#C8102E] transition-colors"
                aria-label="Toggle Navigation Menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

            {/* Brand Logo */}
            <div
              className="cursor-pointer"
              onClick={() => handleNavClick('home')}
            >
              <FoxLogo size="md" showTagline={true} />
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive =
                  currentPage === link.page &&
                  (!link.params || link.params.category === undefined);

                return (
                  <button
                    key={`${link.label}-${link.page}`}
                    onClick={() => handleNavClick(link.page, link.params)}
                    className={`relative py-2 text-sm font-semibold tracking-wide transition-colors flex items-center gap-1.5 ${
                      isActive
                        ? 'text-[#C8102E]'
                        : link.badge
                        ? 'text-[#C8102E] hover:text-red-700'
                        : 'text-neutral-800 hover:text-[#C8102E]'
                    }`}
                  >
                    {link.label}
                    {link.badge && (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-red-100 text-[#C8102E]">
                        {link.badge}
                      </span>
                    )}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#C8102E] rounded-full" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Action Icons */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Search Trigger */}
              <button
                type="button"
                id="search-open-btn"
                onClick={openSearch}
                className="p-2 text-neutral-700 hover:text-[#C8102E] hover:bg-neutral-100 rounded-full transition-colors"
                aria-label="Search footwear catalog"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <button
                type="button"
                id="wishlist-nav-btn"
                onClick={() => handleNavClick('shop')}
                className="relative p-2 text-neutral-700 hover:text-[#C8102E] hover:bg-neutral-100 rounded-full transition-colors hidden sm:flex"
                title="View Favorites"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 bg-neutral-900 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Trigger */}
              <button
                type="button"
                id="cart-drawer-toggle-btn"
                onClick={openCartDrawer}
                className="relative p-2.5 bg-neutral-900 text-white hover:bg-[#C8102E] rounded-xl transition-all duration-200 flex items-center gap-2 group shadow-sm"
                aria-label="Open Cart"
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
                <span className="text-xs font-bold font-mono px-1">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 shadow-xl animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 pb-4 mb-4 border-b border-neutral-100">
              <button
                onClick={() => handleNavClick('shop', { category: 'Men' })}
                className="text-left px-3 py-2.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 font-semibold text-sm text-neutral-800"
              >
                Men's Footwear
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'Women' })}
                className="text-left px-3 py-2.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 font-semibold text-sm text-neutral-800"
              >
                Women's Footwear
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'Sports' })}
                className="text-left px-3 py-2.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 font-semibold text-sm text-neutral-800"
              >
                Sports & Speed
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'Kids' })}
                className="text-left px-3 py-2.5 rounded-lg bg-neutral-50 hover:bg-neutral-100 font-semibold text-sm text-neutral-800"
              >
                Junior & Kids
              </button>
            </div>

            <div className="flex flex-col space-y-2">
              <button
                onClick={() => handleNavClick('shop')}
                className="flex items-center justify-between text-left px-3 py-2 rounded-lg font-bold text-neutral-900 hover:text-[#C8102E]"
              >
                <span>Shop All Shoes</span>
                <ArrowRight className="w-4 h-4 text-neutral-400" />
              </button>
              <button
                onClick={() => handleNavClick('shop', { category: 'Sale' })}
                className="flex items-center justify-between text-left px-3 py-2 rounded-lg font-bold text-[#C8102E] hover:bg-red-50"
              >
                <span>Special Sale & Offers</span>
                <span className="text-xs bg-[#C8102E] text-white px-2 py-0.5 rounded font-bold">UP TO 30% OFF</span>
              </button>
              <button
                onClick={() => handleNavClick('about')}
                className="flex items-center justify-between text-left px-3 py-2 rounded-lg text-sm font-semibold text-neutral-700 hover:text-neutral-950"
              >
                <span>Brand Story & Technology</span>
              </button>
              <button
                onClick={() => handleNavClick('contact')}
                className="flex items-center justify-between text-left px-3 py-2 rounded-lg text-sm font-semibold text-neutral-700 hover:text-neutral-950"
              >
                <span>Contact & Flagship Stores</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
