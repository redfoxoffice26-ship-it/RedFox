import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatBDT } from '../utils/currency';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  const { addToCart, isWishlisted, toggleWishlist } = useCart();
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quickSizeModalOpen, setQuickSizeModalOpen] = useState(false);
  const [selectedSize, setSelectedSize] = useState(product.sizes[2] || product.sizes[0]);
  const [isHovered, setIsHovered] = useState(false);
  const [imageIndex, setImageIndex] = useState(0);

  const favorited = isWishlisted(product.id);

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
    setQuickSizeModalOpen(false);
  };

  return (
    <div
      className="group relative bg-white rounded-2xl border border-neutral-200/80 hover:border-neutral-300 hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden cursor-pointer"
      onClick={() => onSelect(product)}
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setImageIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setImageIndex(0);
      }}
    >
      {/* Badges & Wishlist Overlay */}
      <div className="absolute top-3 left-3 right-3 z-10 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col gap-1">
          {product.isSale && (
            <span className="bg-[#C8102E] text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
              SALE
            </span>
          )}
          {product.isNew && !product.isSale && (
            <span className="bg-neutral-900 text-white text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-md shadow-sm">
              NEW
            </span>
          )}
          {product.isFeatured && !product.isSale && !product.isNew && (
            <span className="bg-neutral-100 text-neutral-800 border border-neutral-200 text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md">
              BESTSELLER
            </span>
          )}
        </div>

        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`pointer-events-auto p-2 rounded-full backdrop-blur-md transition-all ${
            favorited
              ? 'bg-[#C8102E] text-white shadow-md'
              : 'bg-white/80 text-neutral-700 hover:bg-white hover:text-[#C8102E] shadow-sm'
          }`}
          aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
        </button>
      </div>

      {/* Product Image Area */}
      <div className="relative aspect-square w-full bg-neutral-100/70 overflow-hidden flex items-center justify-center p-6">
        <img
          src={product.images[imageIndex] || product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain mix-blend-multiply transform transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
          loading="lazy"
        />

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-4 bottom-4 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 gap-2">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickSizeModalOpen(true);
            }}
            className="flex-1 bg-neutral-900/90 hover:bg-neutral-900 text-white text-xs font-bold py-2.5 px-3 rounded-xl backdrop-blur-sm shadow-lg flex items-center justify-center gap-1.5 transition-all"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Quick Add</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            className="bg-white/90 hover:bg-white text-neutral-800 p-2.5 rounded-xl backdrop-blur-sm shadow-lg transition-all"
            title="View Details"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-neutral-500 mb-1.5">
            <span className="font-semibold tracking-wider uppercase text-[11px] text-[#C8102E]">
              {product.category} {product.gender ? `• ${product.gender}` : ''}
            </span>
            <div className="flex items-center gap-1 text-amber-500 font-bold">
              <Star className="w-3.5 h-3.5 fill-current" />
              <span className="text-neutral-700">{product.rating}</span>
              <span className="text-neutral-400 font-normal">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Name */}
          <h3 className="font-bold text-base text-neutral-950 group-hover:text-[#C8102E] transition-colors line-clamp-1 font-heading">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-500 line-clamp-1 mt-1">
            {product.tagline}
          </p>

          {/* Color Swatches */}
          <div className="flex items-center gap-1.5 mt-3">
            {product.colors.map((c) => (
              <button
                key={c.name}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedColor(c);
                }}
                className={`w-4 h-4 rounded-full border transition-all ${
                  selectedColor.name === c.name
                    ? 'ring-2 ring-neutral-900 ring-offset-1 scale-110'
                    : 'border-neutral-300 hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
            <span className="text-[11px] text-neutral-400 ml-1">
              {product.colors.length} {product.colors.length === 1 ? 'color' : 'colors'}
            </span>
          </div>
        </div>

        {/* Price & Action */}
        <div className="flex items-center justify-between pt-4 mt-3 border-t border-neutral-100">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-lg font-bold font-mono text-neutral-950">
                {formatBDT(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-neutral-400 line-through font-mono">
                  {formatBDT(product.originalPrice)}
                </span>
              )}
            </div>
            {product.isSale && product.originalPrice && (
              <span className="text-[10px] font-bold text-emerald-600">
                Save {formatBDT(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickSizeModalOpen(true);
            }}
            className="p-2.5 rounded-xl bg-neutral-100 text-neutral-800 hover:bg-[#C8102E] hover:text-white transition-colors group-hover:bg-[#C8102E] group-hover:text-white"
            title="Add to cart"
          >
            <ShoppingBag className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Quick Size Select Modal Popover */}
      {quickSizeModalOpen && (
        <div
          className="absolute inset-0 z-20 bg-white/95 backdrop-blur-md p-5 flex flex-col justify-between animate-fadeIn"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <span className="font-bold text-xs uppercase tracking-wider text-neutral-700">
                Select Your Size (US)
              </span>
              <button
                onClick={() => setQuickSizeModalOpen(false)}
                className="text-neutral-400 hover:text-neutral-900 text-xs font-bold"
              >
                Cancel
              </button>
            </div>

            <div className="grid grid-cols-4 gap-1.5 mt-3 max-h-48 overflow-y-auto pr-1">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`py-2 text-xs font-mono font-bold rounded-lg border transition-all ${
                    selectedSize === s
                      ? 'bg-[#C8102E] text-white border-[#C8102E]'
                      : 'border-neutral-200 text-neutral-800 hover:border-neutral-400 bg-white'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-neutral-500">
              <span>Color: <strong>{selectedColor.name}</strong></span>
              <span className="text-emerald-600 font-medium">In Stock</span>
            </div>
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="w-full bg-[#C8102E] hover:bg-red-700 text-white font-bold py-3 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
          >
            <Check className="w-4 h-4" />
            <span>Confirm & Add to Bag (US {selectedSize})</span>
          </button>
        </div>
      )}
    </div>
  );
};
