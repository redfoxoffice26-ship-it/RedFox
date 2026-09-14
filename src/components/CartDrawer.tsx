import React, { useState } from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, ShieldCheck, Tag, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatBDT } from '../utils/currency';

interface CartDrawerProps {
  onNavigateToCart: () => void;
  onNavigateToCheckout: () => void;
  onNavigateToShop: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  onNavigateToCart,
  onNavigateToCheckout,
  onNavigateToShop,
}) => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    cartTotal,
    discountCode,
    discountAmount,
    shippingCost,
    freeShippingThreshold,
    updateQuantity,
    removeFromCart,
    applyDiscount,
    removeDiscount,
    isCartDrawerOpen,
    closeCartDrawer,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState('');

  if (!isCartDrawerOpen) return null;

  const freeShippingLeft = Math.max(0, freeShippingThreshold - cartSubtotal);
  const freeShippingProgress = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError('');
    if (!couponInput) return;
    const res = applyDiscount(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300"
        onClick={closeCartDrawer}
      />

      {/* Slide-over panel */}
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col">
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#C8102E]" />
              <h3 className="text-lg font-bold text-neutral-900 font-heading">
                Your Shopping Bag
              </h3>
              <span className="text-xs font-mono font-bold bg-neutral-100 text-neutral-800 px-2 py-0.5 rounded-full">
                {cartCount} {cartCount === 1 ? 'item' : 'items'}
              </span>
            </div>
            <button
              onClick={closeCartDrawer}
              className="p-2 text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-neutral-50 px-6 py-3 border-b border-neutral-200 text-xs">
            <div className="flex justify-between items-center mb-1.5 font-medium">
              {freeShippingLeft > 0 ? (
                <span className="text-neutral-700">
                  Add <strong className="text-[#C8102E] font-mono">{formatBDT(freeShippingLeft, true)}</strong> more for <strong>FREE Express Shipping</strong>
                </span>
              ) : (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <Check className="w-4 h-4 text-emerald-600" />
                  You've unlocked FREE Express Shipping!
                </span>
              )}
              <span className="text-neutral-500 font-mono">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-neutral-200 h-1.5 rounded-full overflow-hidden">
              <div
                className="bg-[#C8102E] h-full transition-all duration-300 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Items Container */}
          <div className="flex-1 overflow-y-auto p-6 divide-y divide-neutral-100">
            {cart.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-16">
                <div className="w-16 h-16 rounded-2xl bg-red-50 flex items-center justify-center text-[#C8102E] mb-4">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-neutral-900 text-lg mb-1">Your bag is empty</h4>
                <p className="text-sm text-neutral-500 max-w-xs mb-6">
                  Ready to upgrade your run? Explore our latest collection of performance footwear.
                </p>
                <button
                  onClick={() => {
                    closeCartDrawer();
                    onNavigateToShop();
                  }}
                  className="bg-[#C8102E] hover:bg-red-700 text-white font-bold text-sm px-6 py-3 rounded-xl transition-all shadow-sm"
                >
                  Explore RED FOX Shoes
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div key={item.id} className="py-4 first:pt-0 last:pb-0 flex gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl bg-neutral-100 border border-neutral-200 shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-sm font-bold text-neutral-900 truncate pr-2">
                          {item.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="text-neutral-400 hover:text-red-600 transition-colors p-1"
                          title="Remove item"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="flex items-center gap-2 mt-1 text-xs text-neutral-500">
                        <span>Size: <strong className="text-neutral-800 font-mono">US {item.size}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <span
                            className="w-2.5 h-2.5 rounded-full border border-neutral-300 inline-block"
                            style={{ backgroundColor: item.color.hex }}
                          />
                          <span className="truncate max-w-[100px]">{item.color.name}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-3">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-neutral-200 rounded-lg bg-neutral-50">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1.5 text-neutral-600 hover:text-neutral-950 transition-colors"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-xs font-mono font-bold px-2.5 text-neutral-900">
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

                      {/* Price */}
                      <div className="text-right">
                        <span className="text-sm font-bold text-neutral-950 font-mono">
                          {formatBDT(item.price * item.quantity, true)}
                        </span>
                        {item.originalPrice && (
                          <span className="block text-[11px] text-neutral-400 line-through font-mono">
                            {formatBDT(item.originalPrice * item.quantity, true)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Summary & Checkout (if items exist) */}
          {cart.length > 0 && (
            <div className="border-t border-neutral-200 bg-neutral-50 p-6 space-y-4">
              {/* Promo Code Input */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Promo code (e.g. REDFOX15)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="w-full bg-white border border-neutral-200 rounded-lg pl-9 pr-3 py-2 text-xs uppercase font-mono font-medium focus:outline-none focus:border-[#C8102E]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-neutral-900 text-white rounded-lg text-xs font-bold hover:bg-neutral-800 transition-colors shrink-0"
                >
                  Apply
                </button>
              </form>

              {couponError && (
                <p className="text-xs text-red-600 font-medium">{couponError}</p>
              )}

              {discountCode && (
                <div className="flex items-center justify-between text-xs bg-red-50 text-[#C8102E] px-3 py-1.5 rounded-lg border border-red-200">
                  <span className="font-semibold">Code {discountCode} Applied (-{formatBDT(discountAmount, true)})</span>
                  <button onClick={removeDiscount} className="text-xs underline hover:text-red-800">
                    Remove
                  </button>
                </div>
              )}

              {/* Subtotal & Totals */}
              <div className="space-y-1.5 text-xs text-neutral-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono font-semibold text-neutral-900">{formatBDT(cartSubtotal, true)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#C8102E]">
                    <span>Discount</span>
                    <span className="font-mono font-semibold">-{formatBDT(discountAmount, true)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-mono font-semibold text-neutral-900">
                    {shippingCost === 0 ? <span className="text-emerald-600 uppercase font-bold">Free</span> : formatBDT(shippingCost, true)}
                  </span>
                </div>
                <div className="flex justify-between text-base font-bold text-neutral-950 pt-2 border-t border-neutral-200">
                  <span>Total</span>
                  <span className="font-mono text-[#C8102E]">{formatBDT(cartTotal, true)}</span>
                </div>
                <div className="text-[10px] text-right text-neutral-400 font-mono">Currency: BDT only</div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-2">
                <button
                  type="button"
                  id="drawer-proceed-checkout-btn"
                  onClick={() => {
                    closeCartDrawer();
                    onNavigateToCheckout();
                  }}
                  className="w-full bg-[#C8102E] hover:bg-red-700 text-white py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md group"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <button
                  type="button"
                  id="drawer-view-cart-btn"
                  onClick={() => {
                    closeCartDrawer();
                    onNavigateToCart();
                  }}
                  className="w-full bg-white hover:bg-neutral-100 text-neutral-900 border border-neutral-300 py-2.5 rounded-xl font-semibold text-xs transition-colors"
                >
                  View Full Cart & Bag Details
                </button>
              </div>

              <div className="flex items-center justify-center gap-2 text-[11px] text-neutral-400 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>30-day trial • Free returns • Secure SSL checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
