import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Zap, Shield, Award, Sparkles, CheckCircle2 } from 'lucide-react';
import { SAMPLE_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Product } from '../types';
import { useCart } from '../context/CartContext';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  onNavigate: (page: string, params?: Record<string, any>) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectProduct, onNavigate }) => {
  const { addToast } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const heroSlides = [
    {
      title: 'FEEL THE VELOCITY. DOMINATE THE GROUND.',
      subtitle: 'RED FOX Velocity X-1',
      tagline: 'Supercritical nitrogen foam meets carbon propulsion. Built for record-breakers.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1600&q=85',
      accent: '#C8102E',
      productId: 'rf-velocity-x1',
      ctaPrimary: 'Shop Velocity X-1',
      ctaSecondary: 'Explore Running'
    },
    {
      title: 'UNLEASH YOUR WILD INSTINCT.',
      subtitle: 'RED FOX Wild Trail Terra',
      tagline: 'Ballistic rock protection and 5.5mm deep-bite traction for mountain ascents.',
      image: 'https://images.unsplash.com/photo-1582588678413-dbf45f4823e9?auto=format&fit=crop&w=1600&q=85',
      accent: '#C8102E',
      productId: 'rf-wild-trail-gtx',
      ctaPrimary: 'Discover Trail',
      ctaSecondary: 'Shop Outdoor'
    },
    {
      title: 'CRAFTED IN TUSCANY. CUSHIONED FOR THE CITY.',
      subtitle: 'RED FOX Metro Craft Leather',
      tagline: 'Supple hand-burnished leather paired with responsive FoxLite athletic cupsoles.',
      image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=1600&q=85',
      accent: '#C8102E',
      productId: 'rf-metro-craft-leather',
      ctaPrimary: 'Shop Metro Craft',
      ctaSecondary: 'View Casual Styles'
    }
  ];

  // Auto-rotate hero every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const categories = [
    {
      name: 'Men',
      label: "Men's Collection",
      count: '8 Styles',
      image: 'https://images.unsplash.com/photo-1608231387042-66d1773070a5?auto=format&fit=crop&w=600&q=80',
      category: 'Men'
    },
    {
      name: 'Women',
      label: "Women's Footwear",
      count: '7 Styles',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80',
      category: 'Women'
    },
    {
      name: 'Sports',
      label: 'Performance & Race',
      count: '6 Styles',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
      category: 'Sports'
    },
    {
      name: 'Casual',
      label: 'Urban & Lifestyle',
      count: '5 Styles',
      image: 'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?auto=format&fit=crop&w=600&q=80',
      category: 'Casual'
    },
    {
      name: 'Kids',
      label: 'Junior & Cub',
      count: '3 Styles',
      image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?auto=format&fit=crop&w=600&q=80',
      category: 'Kids'
    },
    {
      name: 'Sale',
      label: 'Special Sale',
      count: 'Up to 30% Off',
      image: 'https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?auto=format&fit=crop&w=600&q=80',
      category: 'Sale',
      isHot: true
    }
  ];

  // Best-selling 8 products
  const featuredProducts = SAMPLE_PRODUCTS.slice(0, 8);

  const handleNewsletter = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }
    try {
      await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail })
      });
    } catch {
      // Fallback
    }
    setNewsletterSuccess(true);
    addToast('15% discount code applied! Code: REDFOX15', 'success');
  };

  const activeHero = heroSlides[currentSlide];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. Full-Width Hero Carousel */}
      <section className="relative w-full bg-neutral-950 text-white overflow-hidden min-h-[550px] lg:min-h-[640px] flex items-center">
        {/* Background Image with Dramatic Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src={activeHero.image}
            alt={activeHero.title}
            className="w-full h-full object-cover object-center opacity-40 transition-all duration-1000 scale-105"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#C8102E]/20 border border-[#C8102E]/40 text-[#C8102E] text-xs font-bold uppercase tracking-wider mb-5 backdrop-blur-sm animate-fadeIn">
              <Sparkles className="w-3.5 h-3.5" />
              <span>{activeHero.subtitle}</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-white font-heading leading-tight mb-5">
              {activeHero.title}
            </h1>

            <p className="text-base sm:text-lg text-neutral-300 font-normal leading-relaxed mb-8 max-w-xl">
              {activeHero.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                id="hero-shop-primary-btn"
                onClick={() => {
                  const targetProd = SAMPLE_PRODUCTS.find((p) => p.id === activeHero.productId);
                  if (targetProd) onSelectProduct(targetProd);
                  else onNavigate('shop');
                }}
                className="bg-[#C8102E] hover:bg-red-700 text-white text-sm sm:text-base font-bold px-8 py-4 rounded-xl shadow-lg hover:shadow-red-600/30 transition-all flex items-center gap-2 group"
              >
                <span>{activeHero.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                type="button"
                id="hero-shop-secondary-btn"
                onClick={() => onNavigate('shop')}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm sm:text-base font-bold px-7 py-4 rounded-xl backdrop-blur-md transition-all"
              >
                {activeHero.ctaSecondary}
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Navigation Arrows & Indicators */}
        <div className="absolute bottom-6 right-6 z-20 flex items-center gap-3">
          <div className="flex items-center gap-1.5 mr-4">
            {heroSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === idx ? 'w-8 bg-[#C8102E]' : 'w-2 bg-white/40 hover:bg-white/70'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 text-white flex items-center justify-center backdrop-blur-md border border-white/10 transition-colors"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* 2. Shop By Category Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E] block mb-1">
              Engineered Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 font-heading">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => onNavigate('shop')}
            className="text-sm font-bold text-[#C8102E] hover:text-red-700 flex items-center gap-1.5 group self-start sm:self-auto"
          >
            <span>View All Footwear</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {categories.map((cat) => (
            <div
              key={cat.name}
              onClick={() => onNavigate('shop', { category: cat.name })}
              className="group relative rounded-2xl overflow-hidden aspect-[4/5] bg-neutral-900 cursor-pointer shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <img
                src={cat.image}
                alt={cat.label}
                className="w-full h-full object-cover object-center opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

              <div className="absolute inset-x-3 bottom-3 sm:inset-x-4 sm:bottom-4 flex flex-col">
                {cat.isHot && (
                  <span className="bg-[#C8102E] text-white text-[9px] font-black uppercase px-2 py-0.5 rounded w-fit mb-1">
                    Special Offer
                  </span>
                )}
                <h3 className="text-white font-bold text-base sm:text-lg leading-tight font-heading group-hover:text-red-300 transition-colors">
                  {cat.label}
                </h3>
                <span className="text-[11px] text-neutral-300 font-medium mt-0.5">
                  {cat.count}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Featured / Best-Selling Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E] block mb-1">
              High Performance
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 font-heading">
              Best-Selling Footwear
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('shop')}
              className="text-xs sm:text-sm font-bold bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-4 py-2 rounded-xl transition-colors"
            >
              View Full Catalog (12+ Shoes)
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard
              key={prod.id}
              product={prod}
              onSelect={onSelectProduct}
            />
          ))}
        </div>
      </section>

      {/* 4. Brand Story Teaser ("Why RED FOX") */}
      <section className="bg-neutral-900 text-white py-16 sm:py-24 rounded-3xl mx-4 sm:mx-6 lg:mx-8 overflow-hidden relative border border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-[#C8102E]">
                <Zap className="w-4 h-4" />
                <span>The RED FOX Standard</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight font-heading leading-tight">
                Why Athletes Choose <span className="text-[#C8102E]">RED FOX</span>
              </h2>

              <p className="text-base text-neutral-300 leading-relaxed font-normal">
                Inspired by the agile predator that outpaces rugged terrains, RED FOX was founded on a singular conviction: athletic shoes shouldn't force you to choose between blistering race-day responsiveness and long-haul durability.
              </p>

              <p className="text-sm text-neutral-400 leading-relaxed">
                Every silhouette is sculpted around biomechanical pressure data, infused with proprietary supercritical nitrogen foams, and tested on grueling mountain ridges and city marathons worldwide.
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  id="why-red-fox-learn-more-btn"
                  onClick={() => onNavigate('about')}
                  className="bg-white hover:bg-neutral-100 text-neutral-950 font-bold px-7 py-3.5 rounded-xl text-sm transition-all inline-flex items-center gap-2 group shadow-md"
                >
                  <span>Learn Our Brand Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            {/* Right Tech Pillars Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-neutral-950/80 p-6 rounded-2xl border border-neutral-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#C8102E]/20 text-[#C8102E] flex items-center justify-center">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white font-heading">FoxNitro™ Core</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Supercritical nitrogen-infused midsole offering 82% energy return without bottoming out under high load.
                </p>
              </div>

              <div className="bg-neutral-950/80 p-6 rounded-2xl border border-neutral-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#C8102E]/20 text-[#C8102E] flex items-center justify-center">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white font-heading">FoxGrip™ Compound</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  High-abrasion sticky rubber matrix that adheres to wet asphalt, slick boardwalks, and muddy trail rocks.
                </p>
              </div>

              <div className="bg-neutral-950/80 p-6 rounded-2xl border border-neutral-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#C8102E]/20 text-[#C8102E] flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white font-heading">Anatomical Last</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Engineered footbed with natural toe splay, zero-blister heel anchors, and calibrated arch support.
                </p>
              </div>

              <div className="bg-neutral-950/80 p-6 rounded-2xl border border-neutral-800 space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#C8102E]/20 text-[#C8102E] flex items-center justify-center">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-lg text-white font-heading">Ocean BioKnit</h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Over 65% of upper yarn fibers are retrieved from intercepted marine plastics, spun into breathable seamless mesh.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Campaign Highlight Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-neutral-900 border border-neutral-800">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">
            <div className="p-8 sm:p-12 lg:p-16 space-y-6">
              <span className="bg-[#C8102E] text-white text-xs font-black uppercase tracking-wider px-3 py-1 rounded-md inline-block">
                Flagship Innovation
              </span>
              <h2 className="text-3xl sm:text-4xl font-black uppercase text-white font-heading leading-tight">
                Velocity X-1: The Carbon Sensation
              </h2>
              <p className="text-sm sm:text-base text-neutral-300 leading-relaxed">
                Lightweight at just 215 grams. Snappy carbon composite shank. Built specifically for athletes chasing personal bests on the road.
              </p>
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  id="campaign-shop-now-btn"
                  onClick={() => {
                    const shoe = SAMPLE_PRODUCTS.find((p) => p.id === 'rf-velocity-x1');
                    if (shoe) onSelectProduct(shoe);
                    else onNavigate('shop');
                  }}
                  className="bg-[#C8102E] hover:bg-red-700 text-white font-bold px-7 py-3.5 rounded-xl text-sm transition-all flex items-center gap-2 shadow-lg"
                >
                  <span>Experience Velocity X-1 (BDT 185)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => onNavigate('shop', { category: 'Sports' })}
                  className="text-white hover:text-neutral-200 text-sm font-semibold underline underline-offset-4"
                >
                  Browse all race day models
                </button>
              </div>
            </div>

            <div className="relative h-64 sm:h-80 lg:h-full min-h-[350px] bg-neutral-950 overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=1200&q=80"
                alt="Velocity X-1 Road Racer"
                className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Newsletter Signup Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="bg-red-50 border border-red-200/80 rounded-3xl p-8 sm:p-12 space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-[#C8102E] text-white flex items-center justify-center mx-auto shadow-md">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-neutral-950 font-heading">
            Unlock 15% Off Your Next Pair
          </h2>

          <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
            Subscribe to the RED FOX dispatch for early access to limited edition drops, marathon training guides, and members-only deals.
          </p>

          {newsletterSuccess ? (
            <div className="bg-white border border-emerald-300 rounded-xl p-4 max-w-md mx-auto text-emerald-800 text-sm flex items-center justify-center gap-2 font-medium">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>You're in! Use code <strong className="font-mono text-[#C8102E]">REDFOX15</strong> at checkout.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletter} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto pt-2">
              <input
                type="email"
                id="homepage-newsletter-email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 bg-white border border-neutral-300 px-4 py-3.5 rounded-xl text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-[#C8102E] shadow-sm"
                required
              />
              <button
                type="submit"
                id="homepage-newsletter-submit"
                className="bg-[#C8102E] hover:bg-red-700 text-white font-bold px-6 py-3.5 rounded-xl text-sm transition-all shadow-md shrink-0 flex items-center justify-center gap-1.5"
              >
                <span>Get 15% Off</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <p className="text-[11px] text-neutral-400">
            No spam, ever. Unsubscribe with one click anytime.
          </p>
        </div>
      </section>
    </div>
  );
};
