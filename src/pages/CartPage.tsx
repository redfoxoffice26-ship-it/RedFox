import React, { useState } from 'react';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag, ShieldCheck, Tag, Check, ChevronRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatBDT } from '../utils/currency';

interface CartPageProps {
  onNavigate: (page: string, params?: Record<string, any>) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    discountCode,
    discountAmount,
    shippingCost,
    taxAmount,
    cartTotal,
    freeShippingThreshold,
    updateQuantity,
    removeFromCart,
    applyDiscount,
    removeDiscount,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  const freeShippingLeft = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput.trim()) return;
    const res = applyDiscount(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <div className="w-20 h-20 rounded-3xl bg-red-50 text-[#C8102E] flex items-center justify-center mx-auto mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="text-3xl font-black uppercase text-neutral-950 font-heading mb-2">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-sm text-neutral-500 max-w-md mx-auto mb-8 leading-relaxed">
          Looks like you haven't added any RED FOX performance footwear yet. Browse our cutting-edge racing, trail, and urban casual collections.
        </p>
        <button
          type="button"
          id="cart-empty-shop-btn"
          onClick={() => onNavigate('shop')}
          className="bg-[#C8102E] hover:bg-red-700 text-white font-bold px-8 py-4 rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2"
        >
          <span>Explore All Footwear</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs text-neutral-500">
        <button onClick={() => onNavigate('home')} className="hover:text-neutral-900">
          Home
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-neutral-900">Shopping Bag ({cartCount})</span>
      </div>

      <div className="border-b border-neutral-200 pb-4">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950 font-heading">
          Your Shopping Bag
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Review your footwear selections and proceed to secure checkout.
        </p>
      </div>

      {/* Free Shipping Alert Box */}
      <div className="bg-white border border-neutral-200 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex justify-between items-center text-xs font-semibold mb-2">
          {freeShippingLeft > 0 ? (
            <span className="text-neutral-800">
              Add <strong className="text-[#C8102E] font-mono">{formatBDT(freeShippingLeft, true)}</strong> more to your bag to unlock <strong>FREE Express Shipping</strong>!
            </span>
          ) : (
            <span className="text-emerald-700 font-bold flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-600" />
              You qualify for FREE Express Shipping!
            </span>
          )}
          <span className="text-neutral-400 font-mono">{Math.round(freeShippingProgress)}%</span>
        </div>
        <div className="w-full bg-neutral-100 h-2 rounded-full overflow-hidden">
          <div
            className="bg-[#C8102E] h-full transition-all duration-300 rounded-full"
            style={{ width: `${freeShippingProgress}%` }}
          />
        </div>
      </div>

      {/* Grid: Cart Items List + Order Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Items List */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-neutral-200 shadow-sm divide-y divide-neutral-100 overflow-hidden">
          {cart.map((item) => (
            <div key={item.id} className="p-5 sm:p-6 flex flex-col sm:flex-row gap-5">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 sm:w-28 sm:h-28 object-contain rounded-xl bg-neutral-100 border border-neutral-200 p-2 shrink-0 mix-blend-multiply"
                referrerPolicy="no-referrer"
              />

              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2">
                    <h3 className="font-bold text-base text-neutral-950 font-heading">
                      {item.name}
                    </h3>
                    <span className="font-bold text-base text-neutral-950 font-mono">
                      {formatBDT(item.price * item.quantity, true)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-neutral-500">
                    <span>Size: <strong className="text-neutral-900 font-mono">US {item.size}</strong></span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <span
                        className="w-3 h-3 rounded-full border border-neutral-300"
                        style={{ backgroundColor: item.color.hex }}
                      />
                      <span>{item.color.name}</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
                  {/* Quantity controls */}
                  <div className="flex items-center border border-neutral-300 rounded-xl bg-neutral-50 p-1">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="p-1.5 text-neutral-600 hover:text-neutral-950 transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-mono font-bold px-3 text-neutral-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="p-1.5 text-neutral-600 hover:text-neutral-950 transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Remove action */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-xs text-neutral-400 hover:text-red-600 font-semibold flex items-center gap-1 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            </div>
          ))}

          <div className="p-4 bg-neutral-50 flex items-center justify-between text-xs text-neutral-600">
            <button
              onClick={() => onNavigate('shop')}
              className="font-bold text-[#C8102E] hover:underline"
            >
              ← Continue Shopping
            </button>
            <span>Prices are in USD and include standard manufacturer warranty</span>
          </div>
        </div>

        {/* Order Summary Card */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-6">
          <h2 className="text-lg font-black uppercase tracking-tight text-neutral-950 font-heading">
            Order Summary
          </h2>

          {/* Promo code input */}
          <form onSubmit={handleApplyCoupon} className="space-y-2">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Promo Code (REDFOX15)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl pl-9 pr-3 py-2.5 text-xs uppercase font-mono font-medium focus:outline-none focus:border-[#C8102E]"
                />
              </div>
              <button
                type="submit"
                className="bg-neutral-900 hover:bg-neutral-800 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-colors shrink-0"
              >
                Apply
              </button>
            </div>
            {couponError && <p className="text-xs text-red-600">{couponError}</p>}
            {discountCode && (
              <div className="flex items-center justify-between text-xs bg-red-50 text-[#C8102E] px-3 py-2 rounded-xl border border-red-200 font-semibold">
                <span>Code {discountCode} Applied</span>
                <button onClick={removeDiscount} className="underline hover:text-red-800">
                  Remove
                </button>
              </div>
            )}
          </form>

          {/* Calculations list */}
          <div className="space-y-2.5 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-mono font-semibold text-neutral-950">{formatBDT(cartSubtotal, true)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#C8102E]">
                <span>Promotional Discount</span>
                <span className="font-mono font-semibold">-{formatBDT(discountAmount, true)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Estimated Shipping</span>
              <span className="font-mono font-semibold text-neutral-950">
                {shippingCost === 0 ? (
                  <span className="text-emerald-600 uppercase font-bold">Free</span>
                ) : (
                  formatBDT(shippingCost, true)
                )}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Sales Tax (8%)</span>
              <span className="font-mono font-semibold text-neutral-950">{formatBDT(taxAmount, true)}</span>
            </div>

            <div className="flex justify-between text-base font-bold text-neutral-950 pt-3 border-t border-neutral-200">
              <span>Estimated Total</span>
              <span className="font-mono text-xl text-[#C8102E]">{formatBDT(cartTotal, true)}</span>
            </div>

            <div className="text-[11px] text-right font-mono text-neutral-400">Currency: BDT only</div>
          </div>

          {/* Checkout CTA */}
          <button
            type="button"
            id="cart-proceed-checkout-btn"
            onClick={() => onNavigate('checkout')}
            className="w-full bg-[#C8102E] hover:bg-red-700 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all group"
          >
            <span>Proceed to Checkout</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Trust badges */}
          <div className="pt-2 border-t border-neutral-100 space-y-2 text-[11px] text-neutral-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>256-bit encrypted checkout with buyer protection</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>30-day wear-and-tear return policy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
