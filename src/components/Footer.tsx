import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Instagram, Twitter, Youtube, Facebook, ShieldCheck, RefreshCw, Truck } from 'lucide-react';
import { FoxLogo } from './FoxLogo';
import { useCart } from '../context/CartContext';

interface FooterProps {
  onNavigate: (page: string, params?: Record<string, any>) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const { openSizeGuide, addToast } = useCart();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail || !newsletterEmail.includes('@')) {
      addToast('Please enter a valid email address', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: newsletterEmail }),
      });
      if (res.ok) {
        setSubscribed(true);
        addToast('Subscribed! Use code REDFOX15 for 15% off.', 'success');
      } else {
        // Fallback
        setSubscribed(true);
        addToast('Subscribed to RED FOX Pack!', 'success');
      }
    } catch {
      setSubscribed(true);
      addToast('Subscribed to RED FOX Pack!', 'success');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <footer className="bg-neutral-950 text-neutral-300 border-t border-neutral-900 pt-16 pb-12">
      {/* Brand Value Pillars */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-neutral-800">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-[#C8102E] shrink-0 border border-neutral-800">
              <Truck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">Free Global Tracked Delivery</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Complimentary express shipping on all orders over BDT 100.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-[#C8102E] shrink-0 border border-neutral-800">
              <RefreshCw className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">30-Day Road Trial Guarantee</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Take them for a run. Love them or return hassle-free.</p>
            </div>
          </div>
          <div className="flex items-center gap-4 justify-center md:justify-start">
            <div className="w-12 h-12 rounded-xl bg-neutral-900 flex items-center justify-center text-[#C8102E] shrink-0 border border-neutral-800">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-white font-bold text-base">2-Year Craftsmanship Warranty</h4>
              <p className="text-xs text-neutral-400 mt-0.5">Engineered to endure over 600 miles of rigorous training.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <FoxLogo variant="light" size="lg" showTagline={true} />
            <p className="text-sm text-neutral-400 leading-relaxed max-w-sm">
              RED FOX builds high-performance running and lifestyle footwear engineered with bio-mechanic precision, relentless traction, and uncompromised athletic spirit.
            </p>

            {/* Newsletter In-column */}
            <div className="pt-2">
              <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-2">
                Join the RED FOX Pack (Get 15% Off)
              </h5>
              {subscribed ? (
                <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 px-4 py-3 rounded-lg text-emerald-400 text-sm">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <span>You're in! Use code <strong className="text-white font-mono">REDFOX15</strong> at checkout.</span>
                </div>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
                    <input
                      type="email"
                      id="newsletter-footer-email"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      placeholder="Enter your email address"
                      className="w-full bg-neutral-900 text-white pl-9 pr-3 py-2.5 text-sm rounded-lg border border-neutral-800 focus:outline-none focus:border-[#C8102E] placeholder:text-neutral-500"
                      required
                    />
                  </div>
                  <button
                    type="submit"
                    id="newsletter-footer-submit"
                    disabled={submitting}
                    className="bg-[#C8102E] hover:bg-red-700 text-white px-4 py-2.5 rounded-lg text-sm font-bold flex items-center gap-1 transition-colors shrink-0"
                  >
                    <span>{submitting ? '...' : 'Join'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-3">
              <a
                href="#instagram"
                className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#C8102E] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="#twitter"
                className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#C8102E] transition-colors"
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#youtube"
                className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#C8102E] transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a
                href="#facebook"
                className="w-9 h-9 rounded-lg bg-neutral-900 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-[#C8102E] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Shop</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Men' })}
                  className="hover:text-white transition-colors"
                >
                  Men's Running & Gym
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Women' })}
                  className="hover:text-white transition-colors"
                >
                  Women's Athletic
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Sports' })}
                  className="hover:text-white transition-colors"
                >
                  Trail & Race Day
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Casual' })}
                  className="hover:text-white transition-colors"
                >
                  Metro Craft Leather
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Kids' })}
                  className="hover:text-white transition-colors"
                >
                  Junior Speed Cub
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('shop', { category: 'Sale' })}
                  className="text-[#C8102E] font-semibold hover:text-red-400 transition-colors"
                >
                  Sale & Outlet
                </button>
              </li>
            </ul>
          </div>

          {/* Brand Links */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">About RED FOX</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Our Brand Story
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  FoxGrip™ Technology
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Sustainability & Ocean Yarns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Athletic Ambassador Program
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-white transition-colors"
                >
                  Careers & Labs
                </button>
              </li>
            </ul>
          </div>

          {/* Help & Support */}
          <div>
            <h5 className="text-white text-xs font-bold uppercase tracking-wider mb-4">Customer Care</h5>
            <ul className="space-y-2.5 text-sm">
              <li>
                <button
                  type="button"
                  id="footer-size-guide-btn"
                  onClick={openSizeGuide}
                  className="hover:text-white transition-colors text-left"
                >
                  Footwear Size Guide
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Contact Support
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Shipping & 30-Day Returns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Track Your Order
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('contact')}
                  className="hover:text-white transition-colors"
                >
                  Store Locations & Hours
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 gap-4">
          <p>© {new Date().getFullYear()} RED FOX Footwear International Ltd. All rights reserved.</p>
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5 text-neutral-400 font-mono text-[11px]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              <span>Currency: <strong className="text-white">BDT only</strong></span>
            </span>
            <span className="hover:text-neutral-400 cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-400 cursor-pointer">Terms of Service</span>
            <span className="hover:text-neutral-400 cursor-pointer">Accessibility</span>
            <span className="text-neutral-400 font-mono text-[11px]">Engineered for Velocity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
