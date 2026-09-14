import React, { useState, useMemo } from 'react';
import { SlidersHorizontal, ArrowUpDown, X, RotateCcw, Search, ChevronRight, Check } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product, Category } from '../types';
import { formatBDT } from '../utils/currency';

interface ShopPageProps {
  initialCategory?: string;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: string, params?: Record<string, any>) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({
  initialCategory = 'All',
  onSelectProduct,
  onNavigate,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    (initialCategory as Category) || 'All'
  );
  const [selectedSizes, setSelectedSizes] = useState<number[]>([]);
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(250);
  const [onlySale, setOnlySale] = useState<boolean>(initialCategory === 'Sale');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest'>('featured');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const allCategories: Category[] = ['All', 'Men', 'Women', 'Sports', 'Casual', 'Kids', 'Sale'];
  const allSizes = [6, 7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];
  const colorOptions = [
    { name: 'Red', hex: '#C8102E' },
    { name: 'Black', hex: '#111827' },
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Charcoal', hex: '#4B5563' },
    { name: 'Blue', hex: '#1E3A8A' },
  ];

  // Filtering logic
  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((prod) => {
      // Category filter
      if (selectedCategory !== 'All') {
        if (selectedCategory === 'Sale') {
          if (!prod.isSale) return false;
        } else if (prod.category !== selectedCategory && prod.gender !== selectedCategory) {
          return false;
        }
      }

      // Sale only toggle
      if (onlySale && !prod.isSale) return false;

      // Price filter
      if (prod.price > maxPrice) return false;

      // Size filter (if any size selected, shoe must support at least one)
      if (selectedSizes.length > 0) {
        const hasSize = selectedSizes.some((s) => prod.sizes.includes(s));
        if (!hasSize) return false;
      }

      // Color filter
      if (selectedColors.length > 0) {
        const hasColor = prod.colors.some((c) =>
          selectedColors.some((sc) => c.name.toLowerCase().includes(sc.toLowerCase()))
        );
        if (!hasColor) return false;
      }

      // Search Query
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const match =
          prod.name.toLowerCase().includes(q) ||
          prod.tagline.toLowerCase().includes(q) ||
          prod.category.toLowerCase().includes(q) ||
          prod.description.toLowerCase().includes(q);
        if (!match) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [selectedCategory, onlySale, maxPrice, selectedSizes, selectedColors, searchQuery, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage) || 1;
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedSizes([]);
    setSelectedColors([]);
    setMaxPrice(250);
    setOnlySale(false);
    setSearchQuery('');
    setSortBy('featured');
    setCurrentPage(1);
  };

  const toggleSize = (size: number) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
    setCurrentPage(1);
  };

  const toggleColor = (colorName: string) => {
    setSelectedColors((prev) =>
      prev.includes(colorName) ? prev.filter((c) => c !== colorName) : [...prev, colorName]
    );
    setCurrentPage(1);
  };

  const hasActiveFilters =
    selectedCategory !== 'All' ||
    selectedSizes.length > 0 ||
    selectedColors.length > 0 ||
    maxPrice < 250 ||
    onlySale ||
    searchQuery !== '';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs & Header */}
      <div>
        <div className="flex items-center gap-2 text-xs text-neutral-500 mb-2">
          <button onClick={() => onNavigate('home')} className="hover:text-neutral-900">
            Home
          </button>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-neutral-900">Footwear Catalog</span>
          {selectedCategory !== 'All' && (
            <>
              <ChevronRight className="w-3.5 h-3.5" />
              <span className="text-[#C8102E] font-bold">{selectedCategory}</span>
            </>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-neutral-200 pb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950 font-heading">
              {selectedCategory === 'All' ? 'All Footwear' : `${selectedCategory} Collection`}
            </h1>
            <p className="text-sm text-neutral-500 mt-1">
              Engineered for velocity, stability, and enduring daily miles.
            </p>
          </div>

          {/* Quick Search inside Shop */}
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
            <input
              type="text"
              id="shop-search-input"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search shoe names or specs..."
              className="w-full bg-white border border-neutral-200 rounded-xl pl-9 pr-8 py-2 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#C8102E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Top Filter & Sort Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="mobile-filter-toggle-btn"
            onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
            className="lg:hidden flex items-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-xl text-xs font-bold"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters ({hasActiveFilters ? 'Active' : 'All'})</span>
          </button>

          <span className="text-xs font-semibold text-neutral-600 hidden sm:inline">
            Showing <strong className="text-neutral-950 font-mono">{filteredProducts.length}</strong> styles
          </span>

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="text-xs text-[#C8102E] hover:underline font-bold flex items-center gap-1"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Sort selector */}
        <div className="flex items-center gap-2 ml-auto">
          <span className="text-xs text-neutral-500 font-medium flex items-center gap-1">
            <ArrowUpDown className="w-3.5 h-3.5" />
            Sort by:
          </span>
          <select
            id="shop-sort-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-neutral-50 border border-neutral-200 text-xs font-semibold text-neutral-800 rounded-xl px-3 py-2 focus:outline-none focus:border-[#C8102E] cursor-pointer"
          >
            <option value="featured">Featured & Best Selling</option>
            <option value="newest">New Releases First</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
            <option value="rating">Highest Customer Rating</option>
          </select>
        </div>
      </div>

      {/* Main Content Layout (Sidebar Filters + Products Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">
        {/* Sidebar Filters Desktop */}
        <div
          className={`lg:block ${
            mobileFiltersOpen
              ? 'fixed inset-0 z-50 bg-white p-6 overflow-y-auto'
              : 'hidden'
          } lg:relative lg:p-0 lg:bg-transparent lg:overflow-visible`}
        >
          {mobileFiltersOpen && (
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-neutral-200 lg:hidden">
              <h3 className="font-bold text-lg text-neutral-950">Filter Footwear</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="p-2 text-neutral-500 hover:text-neutral-900"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="bg-white rounded-2xl border border-neutral-200 p-5 space-y-6 shadow-sm">
            {/* Category Filter */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900 mb-3">
                Category
              </h4>
              <div className="space-y-1.5">
                {allCategories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => {
                      setSelectedCategory(cat);
                      setCurrentPage(1);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs font-semibold flex items-center justify-between transition-colors ${
                      selectedCategory === cat
                        ? 'bg-[#C8102E] text-white shadow-sm'
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    <span>{cat === 'All' ? 'All Categories' : cat}</span>
                    {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Range Slider */}
            <div className="border-t border-neutral-100 pt-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-1.5">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                    Max Price
                  </h4>
                  <span className="text-[10px] font-mono text-neutral-400 bg-neutral-100 px-1 rounded">BDT</span>
                </div>
                <span className="text-xs font-mono font-bold text-[#C8102E]">
                  {formatBDT(maxPrice)}
                </span>
              </div>
              <input
                type="range"
                min="50"
                max="250"
                step="5"
                value={maxPrice}
                onChange={(e) => {
                  setMaxPrice(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="w-full accent-[#C8102E] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-neutral-400 mt-1 font-mono">
                <span>BDT 50</span>
                <span>BDT 150</span>
                <span>BDT 250</span>
              </div>
            </div>

            {/* Size Selector */}
            <div className="border-t border-neutral-100 pt-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  US Shoe Size
                </h4>
                {selectedSizes.length > 0 && (
                  <button
                    onClick={() => setSelectedSizes([])}
                    className="text-[11px] text-neutral-400 hover:text-[#C8102E]"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="grid grid-cols-4 gap-1.5">
                {allSizes.map((s) => {
                  const active = selectedSizes.includes(s);
                  return (
                    <button
                      key={s}
                      onClick={() => toggleSize(s)}
                      className={`py-1.5 text-xs font-mono font-bold rounded-lg border transition-all ${
                        active
                          ? 'bg-neutral-900 text-white border-neutral-900 shadow-sm'
                          : 'bg-white border-neutral-200 text-neutral-700 hover:border-neutral-400'
                      }`}
                    >
                      {s}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Color Swatch Filter */}
            <div className="border-t border-neutral-100 pt-5">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-neutral-900">
                  Color Shade
                </h4>
                {selectedColors.length > 0 && (
                  <button
                    onClick={() => setSelectedColors([])}
                    className="text-[11px] text-neutral-400 hover:text-[#C8102E]"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {colorOptions.map((c) => {
                  const active = selectedColors.includes(c.name);
                  return (
                    <button
                      key={c.name}
                      onClick={() => toggleColor(c.name)}
                      className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border transition-all ${
                        active
                          ? 'border-[#C8102E] bg-red-50 text-[#C8102E] font-bold'
                          : 'border-neutral-200 text-neutral-700 hover:border-neutral-300'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-neutral-300"
                        style={{ backgroundColor: c.hex }}
                      />
                      <span>{c.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Sale Only Toggle */}
            <div className="border-t border-neutral-100 pt-5">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-xs font-bold text-neutral-900">
                  Discounted / On Sale Only
                </span>
                <input
                  type="checkbox"
                  checked={onlySale}
                  onChange={(e) => {
                    setOnlySale(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 text-[#C8102E] accent-[#C8102E] rounded cursor-pointer"
                />
              </label>
            </div>

            {mobileFiltersOpen && (
              <div className="pt-4 border-t border-neutral-200">
                <button
                  onClick={() => setMobileFiltersOpen(false)}
                  className="w-full bg-[#C8102E] text-white py-3 rounded-xl font-bold text-sm shadow-md"
                >
                  View {filteredProducts.length} Results
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Products Grid */}
        <div className="lg:col-span-3 space-y-8">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl border border-neutral-200 p-12 text-center">
              <div className="w-16 h-16 rounded-2xl bg-neutral-100 flex items-center justify-center text-neutral-400 mx-auto mb-4">
                <Search className="w-8 h-8" />
              </div>
              <h3 className="text-lg font-bold text-neutral-900 mb-1">
                No matching footwear found
              </h3>
              <p className="text-sm text-neutral-500 max-w-sm mx-auto mb-6">
                Try widening your price range, choosing different size options, or resetting your active search filters.
              </p>
              <button
                onClick={resetFilters}
                className="bg-[#C8102E] hover:bg-red-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {paginatedProducts.map((prod) => (
                  <ProductCard
                    key={prod.id}
                    product={prod}
                    onSelect={onSelectProduct}
                  />
                ))}
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2 pt-6 border-t border-neutral-200">
                  <button
                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="px-4 py-2 text-xs font-bold rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    Previous
                  </button>

                  <div className="flex items-center gap-1 font-mono text-xs">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`w-8 h-8 rounded-lg font-bold transition-all ${
                          currentPage === pageNum
                            ? 'bg-[#C8102E] text-white'
                            : 'bg-white text-neutral-700 hover:bg-neutral-100 border border-neutral-200'
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}
                  </div>

                  <button
                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 text-xs font-bold rounded-xl border border-neutral-200 bg-white text-neutral-700 hover:bg-neutral-50 disabled:opacity-40 disabled:pointer-events-none transition-colors"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
