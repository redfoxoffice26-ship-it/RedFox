import React, { useState } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  Zap,
  Ruler,
  Truck,
  RotateCcw,
  ShieldCheck,
  ChevronRight,
  Plus,
  Minus,
  Check,
  MessageSquare,
  Sparkles,
  Share2
} from 'lucide-react';
import { Product, ProductColor } from '../types';
import { useCart } from '../context/CartContext';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { formatBDT } from '../utils/currency';

interface ProductDetailPageProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: string, params?: Record<string, any>) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  onSelectProduct,
  onNavigate,
}) => {
  const { addToCart, openSizeGuide, isWishlisted, toggleWishlist, addToast } = useCart();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState<number>(product.sizes[2] || product.sizes[0]);
  const [quantity, setQuantity] = useState(1);

  // Reviews state
  const [reviewsList, setReviewsList] = useState(product.reviews || []);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewTitle, setNewReviewTitle] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [submittingReview, setSubmittingReview] = useState(false);

  const favorited = isWishlisted(product.id);

  // Related products from same category or general
  const relatedProducts = SAMPLE_PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.gender === product.gender)
  ).slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    onNavigate('checkout');
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      addToast('Product link copied to clipboard!', 'info');
    }
  };

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor || !newReviewTitle || !newReviewComment) {
      addToast('Please fill all review fields', 'error');
      return;
    }

    setSubmittingReview(true);
    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          author: newReviewAuthor,
          rating: newReviewRating,
          title: newReviewTitle,
          comment: newReviewComment,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setReviewsList((prev) => [data.review, ...prev]);
        addToast('Review submitted successfully!', 'success');
      } else {
        // Fallback local update
        const localRev = {
          id: `rev-${Date.now()}`,
          author: newReviewAuthor,
          rating: newReviewRating,
          date: 'Just now',
          title: newReviewTitle,
          comment: newReviewComment,
          verified: true,
        };
        setReviewsList((prev) => [localRev, ...prev]);
        addToast('Review published!', 'success');
      }
      setShowReviewForm(false);
      setNewReviewAuthor('');
      setNewReviewTitle('');
      setNewReviewComment('');
    } catch {
      const localRev = {
        id: `rev-${Date.now()}`,
        author: newReviewAuthor,
        rating: newReviewRating,
        date: 'Just now',
        title: newReviewTitle,
        comment: newReviewComment,
        verified: true,
      };
      setReviewsList((prev) => [localRev, ...prev]);
      setShowReviewForm(false);
      addToast('Review published!', 'success');
    } finally {
      setSubmittingReview(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <button onClick={() => onNavigate('home')} className="hover:text-neutral-900">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => onNavigate('shop')} className="hover:text-neutral-900">
          Footwear
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button
          onClick={() => onNavigate('shop', { category: product.category })}
          className="hover:text-neutral-900 font-medium"
        >
          {product.category}
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-neutral-900 truncate max-w-[200px]">
          {product.name}
        </span>
      </div>

      {/* Main Product Presentation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-start">
        {/* Left Column: Multi-Angle Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Viewer */}
          <div className="relative aspect-square w-full bg-neutral-100 rounded-3xl overflow-hidden border border-neutral-200/80 shadow-sm flex items-center justify-center p-8">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain mix-blend-multiply transition-all duration-300 transform hover:scale-105"
              referrerPolicy="no-referrer"
            />

            {/* Badges */}
            <div className="absolute top-5 left-5 flex flex-col gap-1.5 pointer-events-none">
              {product.isSale && (
                <span className="bg-[#C8102E] text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                  SALE • 20% OFF
                </span>
              )}
              {product.isNew && !product.isSale && (
                <span className="bg-neutral-900 text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md shadow-md">
                  NEW ARRIVAL
                </span>
              )}
            </div>

            {/* Floating Quick Action Buttons */}
            <div className="absolute top-5 right-5 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2.5 rounded-full bg-white/90 hover:bg-white text-neutral-700 shadow-sm transition-all"
                title="Share link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-2.5 rounded-full backdrop-blur-md shadow-sm transition-all ${
                  favorited
                    ? 'bg-[#C8102E] text-white'
                    : 'bg-white/90 hover:bg-white text-neutral-700 hover:text-[#C8102E]'
                }`}
                title="Add to wishlist"
              >
                <Heart className={`w-4 h-4 ${favorited ? 'fill-current' : ''}`} />
              </button>
            </div>
          </div>

          {/* Thumbnail Gallery Strip */}
          <div className="grid grid-cols-4 gap-3 sm:gap-4">
            {product.images.map((imgUrl, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveImageIndex(idx)}
                className={`relative aspect-square rounded-2xl overflow-hidden bg-neutral-100 border-2 transition-all p-2 flex items-center justify-center ${
                  activeImageIndex === idx
                    ? 'border-[#C8102E] ring-2 ring-red-100 shadow-md scale-102'
                    : 'border-neutral-200 hover:border-neutral-400 opacity-75 hover:opacity-100'
                }`}
              >
                <img
                  src={imgUrl}
                  alt={`Angle ${idx + 1}`}
                  className="w-full h-full object-contain mix-blend-multiply"
                  referrerPolicy="no-referrer"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Right Column: Buying Controls & Details */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8102E] mb-2">
              <span>{product.category} Footwear</span>
              <span>•</span>
              <span>{product.gender || 'Unisex'}</span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-neutral-950 font-heading leading-tight">
              {product.name}
            </h1>

            <p className="text-sm text-neutral-500 mt-1">
              {product.tagline}
            </p>

            {/* Ratings Bar */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center text-amber-500">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-4 h-4 ${
                      star <= Math.round(product.rating) ? 'fill-current' : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-bold text-neutral-800 font-mono">
                {product.rating}
              </span>
              <span className="text-xs text-neutral-400">
                ({reviewsList.length} verified athlete reviews)
              </span>
            </div>

            {/* Price block */}
            <div className="flex flex-wrap items-baseline gap-3 mt-4 pt-4 border-t border-neutral-200">
              <span className="text-3xl font-black font-mono text-neutral-950">
                {formatBDT(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-neutral-400 line-through font-mono">
                  {formatBDT(product.originalPrice)}
                </span>
              )}
              {product.isSale && product.originalPrice && (
                <span className="bg-red-50 text-[#C8102E] border border-red-200 text-xs font-bold px-2 py-0.5 rounded-md">
                  Save {formatBDT(product.originalPrice - product.price)} (20% off)
                </span>
              )}
              <span className="text-[11px] font-mono font-medium text-neutral-500 bg-neutral-100 border border-neutral-200 px-2 py-0.5 rounded">
                BDT Only
              </span>
            </div>
          </div>

          {/* Color Picker */}
          <div className="border-t border-neutral-200 pt-5">
            <div className="flex items-center justify-between mb-3 text-xs">
              <span className="font-bold text-neutral-900 uppercase tracking-wider">
                Select Color: <strong className="text-neutral-950 font-semibold">{selectedColor.name}</strong>
              </span>
            </div>
            <div className="flex items-center gap-3">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all ${
                    selectedColor.name === c.name
                      ? 'border-[#C8102E] bg-red-50/50 shadow-sm ring-1 ring-[#C8102E]'
                      : 'border-neutral-200 hover:border-neutral-300 bg-white'
                  }`}
                >
                  <span
                    className="w-5 h-5 rounded-full border border-neutral-300 shrink-0"
                    style={{ backgroundColor: c.hex }}
                  />
                  <span className="text-xs font-medium text-neutral-800 pr-1">
                    {c.name.split('/')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Size Selector */}
          <div className="border-t border-neutral-200 pt-5">
            <div className="flex items-center justify-between mb-3">
              <span className="font-bold text-xs uppercase tracking-wider text-neutral-900">
                Select Shoe Size (US)
              </span>
              <button
                type="button"
                id="pdp-open-size-guide-btn"
                onClick={openSizeGuide}
                className="text-xs text-[#C8102E] hover:underline font-bold flex items-center gap-1"
              >
                <Ruler className="w-3.5 h-3.5" />
                <span>Size Guide & Chart</span>
              </button>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
              {product.sizes.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSize(s)}
                  className={`py-2.5 rounded-xl text-xs font-mono font-bold border transition-all ${
                    selectedSize === s
                      ? 'bg-[#C8102E] text-white border-[#C8102E] shadow-md scale-102'
                      : 'border-neutral-200 bg-white text-neutral-800 hover:border-neutral-400'
                  }`}
                >
                  US {s}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-neutral-400 mt-2 flex items-center gap-1.5">
              <Check className="w-3 h-3 text-emerald-500" />
              <span>In stock & ready to ship from our fulfillment center</span>
            </p>
          </div>

          {/* Quantity & CTA Buttons */}
          <div className="border-t border-neutral-200 pt-5 space-y-4">
            <div className="flex items-center gap-4">
              {/* Quantity Selector */}
              <div className="flex items-center border border-neutral-300 rounded-xl bg-white p-1">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-2 text-neutral-600 hover:text-neutral-950"
                  aria-label="Decrease quantity"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="font-mono font-bold text-sm px-4 text-neutral-900">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                  className="p-2 text-neutral-600 hover:text-neutral-950"
                  aria-label="Increase quantity"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                type="button"
                id="pdp-add-to-cart-btn"
                onClick={handleAddToCart}
                className="flex-1 bg-neutral-900 hover:bg-neutral-800 text-white font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-md transition-all group"
              >
                <ShoppingBag className="w-4 h-4 group-hover:scale-110 transition-transform" />
                <span>Add to Shopping Bag</span>
              </button>
            </div>

            {/* Buy Now Direct Button */}
            <button
              type="button"
              id="pdp-buy-now-btn"
              onClick={handleBuyNow}
              className="w-full bg-[#C8102E] hover:bg-red-700 text-white font-bold py-4 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all"
            >
              <Zap className="w-4 h-4 fill-current" />
              <span>Buy Now • Instant Express Checkout</span>
            </button>
          </div>

          {/* Guarantee Badges */}
          <div className="bg-neutral-50 rounded-2xl p-4 border border-neutral-200/80 grid grid-cols-3 gap-2 text-center text-xs text-neutral-600">
            <div className="space-y-1">
              <Truck className="w-5 h-5 mx-auto text-[#C8102E]" />
              <span className="font-bold text-neutral-900 block text-[11px]">Free Shipping</span>
              <span className="text-[10px] text-neutral-500">Over BDT 100</span>
            </div>
            <div className="space-y-1">
              <RotateCcw className="w-5 h-5 mx-auto text-[#C8102E]" />
              <span className="font-bold text-neutral-900 block text-[11px]">30-Day Trial</span>
              <span className="text-[10px] text-neutral-500">Risk-free run</span>
            </div>
            <div className="space-y-1">
              <ShieldCheck className="w-5 h-5 mx-auto text-[#C8102E]" />
              <span className="font-bold text-neutral-900 block text-[11px]">2-Yr Warranty</span>
              <span className="text-[10px] text-neutral-500">Guaranteed build</span>
            </div>
          </div>

          {/* Description & Technical Highlights */}
          <div className="border-t border-neutral-200 pt-5 space-y-3">
            <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider">
              Product Overview
            </h3>
            <p className="text-sm text-neutral-600 leading-relaxed">
              {product.description}
            </p>
            <ul className="space-y-2 pt-2 text-xs text-neutral-700">
              {product.details.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#C8102E] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Technical Specs Table */}
          <div className="border-t border-neutral-200 pt-5">
            <h3 className="font-bold text-sm text-neutral-900 uppercase tracking-wider mb-3">
              Athletic Specifications
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Weight</span>
                <span className="font-bold text-neutral-900 font-mono">{product.specs.weight}</span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Heel Drop</span>
                <span className="font-bold text-neutral-900 font-mono">{product.specs.drop}</span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Cushioning</span>
                <span className="font-bold text-neutral-900">{product.specs.cushioning}</span>
              </div>
              <div className="bg-neutral-50 p-2.5 rounded-xl border border-neutral-200">
                <span className="text-neutral-400 block text-[10px] uppercase font-bold">Terrain</span>
                <span className="font-bold text-neutral-900">{product.specs.surface}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Reviews & Ratings Section */}
      <section className="border-t border-neutral-200 pt-12 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E] block mb-1">
              Community Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 font-heading">
              Customer Reviews ({reviewsList.length})
            </h2>
          </div>

          <button
            type="button"
            id="open-review-form-btn"
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all self-start sm:self-auto flex items-center gap-2"
          >
            <MessageSquare className="w-4 h-4" />
            <span>{showReviewForm ? 'Cancel Review' : 'Write a Review'}</span>
          </button>
        </div>

        {/* Rating Breakdown Summary */}
        <div className="bg-white rounded-2xl border border-neutral-200 p-6 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          <div className="md:col-span-4 text-center md:border-r border-neutral-200 md:pr-6">
            <span className="text-5xl font-black font-mono text-neutral-950">
              {product.rating}
            </span>
            <div className="flex items-center justify-center gap-1 text-amber-500 my-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <Star
                  key={s}
                  className={`w-5 h-5 ${
                    s <= Math.round(product.rating) ? 'fill-current' : 'text-neutral-300'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-neutral-500">
              Based on {reviewsList.length} verified athlete experiences
            </p>
          </div>

          <div className="md:col-span-8 space-y-2 text-xs">
            {[5, 4, 3, 2, 1].map((stars) => {
              const count = reviewsList.filter((r) => r.rating === stars).length;
              const percent = reviewsList.length ? Math.round((count / reviewsList.length) * 100) : 0;
              return (
                <div key={stars} className="flex items-center gap-3">
                  <span className="w-12 font-bold text-neutral-700">{stars} stars</span>
                  <div className="flex-1 bg-neutral-100 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-amber-400 h-full rounded-full"
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                  <span className="w-8 text-neutral-400 font-mono text-right">{count}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Interactive Review Form */}
        {showReviewForm && (
          <form
            onSubmit={handleReviewSubmit}
            className="bg-neutral-50 border border-neutral-200 rounded-2xl p-6 space-y-4 animate-fadeIn"
          >
            <h3 className="font-bold text-base text-neutral-950 font-heading">
              Write Your Review for {product.name}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Your Full Name / Athlete Alias
                </label>
                <input
                  type="text"
                  required
                  value={newReviewAuthor}
                  onChange={(e) => setNewReviewAuthor(e.target.value)}
                  placeholder="e.g. Alex Henderson"
                  className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Your Rating
                </label>
                <div className="flex items-center gap-2 pt-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setNewReviewRating(s)}
                      className="p-1 text-amber-500 hover:scale-125 transition-transform"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          s <= newReviewRating ? 'fill-current' : 'text-neutral-300'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold font-mono text-neutral-700 ml-2">
                    {newReviewRating} / 5 Stars
                  </span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Headline / Review Title
              </label>
              <input
                type="text"
                required
                value={newReviewTitle}
                onChange={(e) => setNewReviewTitle(e.target.value)}
                placeholder="e.g. Blown away by the propulsion and road grip!"
                className="w-full bg-white border border-neutral-300 rounded-xl px-3.5 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-700 mb-1">
                Detailed Feedback (Fit, comfort, training performance)
              </label>
              <textarea
                rows={3}
                required
                value={newReviewComment}
                onChange={(e) => setNewReviewComment(e.target.value)}
                placeholder="Share how the shoe performed during your runs, workouts, or daily wear..."
                className="w-full bg-white border border-neutral-300 rounded-xl p-3 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
              />
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submittingReview}
                className="bg-[#C8102E] hover:bg-red-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl transition-all shadow-md"
              >
                {submittingReview ? 'Submitting...' : 'Post Review'}
              </button>
            </div>
          </form>
        )}

        {/* Reviews List */}
        <div className="space-y-4">
          {reviewsList.map((rev) => (
            <div
              key={rev.id}
              className="bg-white rounded-2xl border border-neutral-200/80 p-5 space-y-2 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-neutral-950">{rev.author}</span>
                  {rev.verified && (
                    <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[10px] font-bold px-2 py-0.5 rounded-md flex items-center gap-1">
                      <Check className="w-3 h-3" />
                      Verified Runner
                    </span>
                  )}
                </div>
                <span className="text-xs text-neutral-400">{rev.date}</span>
              </div>

              <div className="flex items-center gap-1 text-amber-500">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={`w-3.5 h-3.5 ${
                      s <= rev.rating ? 'fill-current' : 'text-neutral-300'
                    }`}
                  />
                ))}
              </div>

              <h4 className="font-bold text-sm text-neutral-900 pt-1">{rev.title}</h4>
              <p className="text-xs text-neutral-600 leading-relaxed">{rev.comment}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <section className="border-t border-neutral-200 pt-12 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E] block mb-1">
                You May Also Like
              </span>
              <h2 className="text-2xl font-black uppercase tracking-tight text-neutral-950 font-heading">
                Similar Footwear Styles
              </h2>
            </div>
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs font-bold text-[#C8102E] hover:underline"
            >
              View all →
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relProd) => (
              <ProductCard
                key={relProd.id}
                product={relProd}
                onSelect={(p) => {
                  onSelectProduct(p);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
