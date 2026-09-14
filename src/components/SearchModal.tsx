import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { SAMPLE_PRODUCTS } from '../data/products';
import { Product } from '../types';
import { formatBDT } from '../utils/currency';

interface SearchModalProps {
  onSelectProduct: (product: Product) => void;
  onNavigateToShop: (category?: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  onSelectProduct,
  onNavigateToShop,
}) => {
  const { isSearchOpen, closeSearch } = useCart();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    } else {
      setQuery('');
    }
  }, [isSearchOpen]);

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return SAMPLE_PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.gender && p.gender.toLowerCase().includes(q))
    ).slice(0, 6);
  }, [query]);

  if (!isSearchOpen) return null;

  const quickTags = ['Velocity X-1', 'Running', 'Men', 'Women', 'Leather', 'Kids', 'Sale'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-16 sm:pt-24 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl border border-neutral-200 overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-neutral-200">
          <Search className="w-5 h-5 text-neutral-400 shrink-0 mr-3" />
          <input
            ref={inputRef}
            type="text"
            id="global-search-input"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search RED FOX shoes, models, running gear..."
            className="w-full text-base sm:text-lg font-medium text-neutral-900 placeholder:text-neutral-400 focus:outline-none bg-transparent"
          />
          {query ? (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-neutral-400 hover:text-neutral-700 transition-colors mr-2"
            >
              <X className="w-4 h-4" />
            </button>
          ) : null}
          <button
            onClick={closeSearch}
            className="text-xs font-bold uppercase tracking-wider text-neutral-500 hover:text-neutral-900 px-2 py-1 bg-neutral-100 hover:bg-neutral-200 rounded transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-5 py-3 bg-neutral-50 border-b border-neutral-200 flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold text-neutral-500 flex items-center gap-1 shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-[#C8102E]" />
            Trending:
          </span>
          {quickTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="text-xs font-semibold px-2.5 py-1 rounded-full bg-white border border-neutral-200 hover:border-[#C8102E] hover:text-[#C8102E] transition-colors shrink-0 text-neutral-700"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          {query.trim() === '' ? (
            <div className="py-10 text-center text-neutral-400">
              <p className="text-sm font-medium">Type any footwear name, category, or style to begin searching.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => {
                    closeSearch();
                    onNavigateToShop();
                  }}
                  className="text-xs font-bold text-[#C8102E] hover:underline"
                >
                  Browse all 12+ shoes in catalog →
                </button>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm font-semibold text-neutral-800">No footwear found matching "{query}"</p>
              <p className="text-xs text-neutral-500 mt-1">Try searching for "Velocity", "Trail", "Men", or "Casual"</p>
            </div>
          ) : (
            <div className="divide-y divide-neutral-100">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  onClick={() => {
                    closeSearch();
                    onSelectProduct(prod);
                  }}
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-neutral-50 transition-colors cursor-pointer group"
                >
                  <img
                    src={prod.images[0]}
                    alt={prod.name}
                    className="w-16 h-16 object-cover rounded-lg bg-neutral-100 border border-neutral-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#C8102E]">
                        {prod.category}
                      </span>
                      {prod.isSale && (
                        <span className="text-[10px] font-bold uppercase bg-red-100 text-[#C8102E] px-1.5 py-0.2 rounded">
                          Sale
                        </span>
                      )}
                    </div>
                    <h4 className="font-bold text-sm text-neutral-900 truncate group-hover:text-[#C8102E] transition-colors">
                      {prod.name}
                    </h4>
                    <p className="text-xs text-neutral-500 truncate">{prod.tagline}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-bold text-sm text-neutral-950 font-mono">
                      {formatBDT(prod.price)}
                    </span>
                    {prod.originalPrice && (
                      <span className="block text-xs text-neutral-400 line-through font-mono">
                        {formatBDT(prod.originalPrice)}
                      </span>
                    )}
                  </div>
                  <ArrowRight className="w-4 h-4 text-neutral-300 group-hover:text-[#C8102E] group-hover:translate-x-0.5 transition-all shrink-0" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer info */}
        {filteredProducts.length > 0 && (
          <div className="px-5 py-3 bg-neutral-50 border-t border-neutral-200 flex items-center justify-between">
            <span className="text-xs text-neutral-500">
              Showing {filteredProducts.length} matching footwear styles
            </span>
            <button
              onClick={() => {
                closeSearch();
                onNavigateToShop();
              }}
              className="text-xs font-bold text-[#C8102E] hover:underline flex items-center gap-1"
            >
              <span>View full catalog</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
