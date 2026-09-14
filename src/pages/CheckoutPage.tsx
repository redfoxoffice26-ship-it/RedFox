import React, { useState } from 'react';
import {
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  ShoppingBag,
  Clock,
  Sparkles
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Order, OrderShipping } from '../types';
import { formatBDT } from '../utils/currency';

interface CheckoutPageProps {
  onNavigate: (page: string, params?: Record<string, any>) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ onNavigate }) => {
  const { cart, cartSubtotal, discountAmount, discountCode, shippingCost, taxAmount, cartTotal, clearCart, addToast } = useCart();

  // Shipping Form State
  const [formData, setFormData] = useState<OrderShipping>({
    fullName: 'Arif Hasan',
    email: 'arif.hasan@example.com',
    phone: '+880 1712-345678',
    address: 'House 14, Road 7, Dhanmondi',
    apartment: 'Apartment 4B',
    city: 'Dhaka',
    state: 'Dhaka Division',
    postalCode: '1205',
    country: 'Bangladesh',
  });

  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'bkash' | 'nagad' | 'cod' | 'paypal' | 'applepay'>('card');

  // Payment method inputs
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvv, setCardCvv] = useState('892');
  const [bkashNumber, setBkashNumber] = useState('01712345678');
  const [nagadNumber, setNagadNumber] = useState('01812345678');
  const [trxId, setTrxId] = useState('TXN9842A7');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Express shipping surcharge if selected
  const shippingMultiplier = shippingMethod === 'express' ? (shippingCost === 0 ? 12 : 18) : shippingCost;
  const finalTotal = Number((cartSubtotal - discountAmount + shippingMultiplier + taxAmount).toFixed(2));

  const handleInputChange = (field: keyof OrderShipping, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      addToast('Your bag is empty', 'error');
      return;
    }

    if (!formData.fullName || !formData.email || !formData.address || !formData.city) {
      addToast('Please complete all required shipping fields', 'error');
      return;
    }

    setIsProcessing(true);

    const orderPayload: Partial<Order> = {
      items: [...cart],
      shipping: formData,
      shippingMethod,
      shippingCost: shippingMultiplier,
      subtotal: cartSubtotal,
      discount: discountAmount,
      tax: taxAmount,
      total: finalTotal,
      currency: 'BDT',
      paymentMethod,
    };

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      if (res.ok) {
        const data = await res.json();
        setCompletedOrder(data.order);
        clearCart();
        addToast('Order placed successfully!', 'success');
      } else {
        // Fallback local mock order
        const fallbackOrder: Order = {
          id: `RF-${Math.floor(100000 + Math.random() * 900000)}`,
          items: [...cart],
          shipping: formData,
          shippingMethod,
          shippingCost: shippingMultiplier,
          subtotal: cartSubtotal,
          discount: discountAmount,
          tax: taxAmount,
          total: finalTotal,
          currency: 'BDT',
          paymentMethod,
          createdAt: new Date().toISOString(),
          status: 'confirmed',
          estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
          }),
        };
        setCompletedOrder(fallbackOrder);
        clearCart();
        addToast('Order confirmed!', 'success');
      }
    } catch {
      const fallbackOrder: Order = {
        id: `RF-${Math.floor(100000 + Math.random() * 900000)}`,
        items: [...cart],
        shipping: formData,
        shippingMethod,
        shippingCost: shippingMultiplier,
        subtotal: cartSubtotal,
        discount: discountAmount,
        tax: taxAmount,
        total: finalTotal,
        currency: 'BDT',
        paymentMethod,
        createdAt: new Date().toISOString(),
        status: 'confirmed',
        estimatedDelivery: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', {
          weekday: 'short',
          month: 'short',
          day: 'numeric',
        }),
      };
      setCompletedOrder(fallbackOrder);
      clearCart();
      addToast('Order confirmed!', 'success');
    } finally {
      setIsProcessing(false);
    }
  };

  // Order Confirmed State
  if (completedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center mx-auto border-2 border-emerald-500/30">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-[#C8102E]">
            Order Confirmed
          </span>
          <h1 className="text-3xl sm:text-4xl font-black uppercase text-neutral-950 font-heading">
            Welcome to the Pack, {completedOrder.shipping.fullName.split(' ')[0]}!
          </h1>
          <p className="text-sm text-neutral-600 max-w-lg mx-auto leading-relaxed">
            Your footwear order has been secured. Our fulfillment team is assembling your pair with care at our central distribution hub.
          </p>
        </div>

        <div className="bg-white border border-neutral-200 rounded-2xl p-6 text-left shadow-sm space-y-4">
          <div className="flex flex-wrap justify-between items-center pb-4 border-b border-neutral-100 gap-2">
            <div>
              <span className="text-xs text-neutral-400 block">Order Number</span>
              <span className="text-base font-bold font-mono text-neutral-950">
                {completedOrder.id}
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs text-neutral-400 block">Estimated Delivery</span>
              <span className="text-sm font-bold text-emerald-700 flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {completedOrder.estimatedDelivery}
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-neutral-400">Items in this shipment:</h4>
            {completedOrder.items.map((item) => (
              <div key={item.id} className="flex items-center justify-between text-xs py-1">
                <div className="flex items-center gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="w-10 h-10 object-contain rounded-lg bg-neutral-100 border p-1"
                  />
                  <div>
                    <strong className="text-neutral-900 block">{item.name}</strong>
                    <span className="text-neutral-500">
                      US {item.size} • {item.color.name} • Qty: {item.quantity}
                    </span>
                  </div>
                </div>
                <span className="font-mono font-bold text-neutral-900">
                  {formatBDT(item.price * item.quantity, true)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-neutral-100 flex justify-between items-center text-sm font-bold text-neutral-950">
            <span>Total Paid (BDT only)</span>
            <span className="font-mono text-lg text-[#C8102E]">{formatBDT(completedOrder.total, true)}</span>
          </div>

          <div className="bg-neutral-50 rounded-xl p-3.5 text-xs text-neutral-600">
            <span>Confirmation receipt and tracking numbers sent to: <strong>{completedOrder.shipping.email}</strong></span>
          </div>
        </div>

        <div className="pt-4 flex justify-center gap-4">
          <button
            type="button"
            onClick={() => onNavigate('shop')}
            className="bg-[#C8102E] hover:bg-red-700 text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-all shadow-md inline-flex items-center gap-2"
          >
            <span>Continue Shopping</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  // If cart is empty and no order
  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center space-y-4">
        <ShoppingBag className="w-12 h-12 text-[#C8102E] mx-auto" />
        <h2 className="text-2xl font-bold text-neutral-900">Your bag is empty</h2>
        <p className="text-xs text-neutral-500">Please add items to your cart before proceeding to checkout.</p>
        <button
          onClick={() => onNavigate('shop')}
          className="bg-neutral-900 text-white font-bold text-xs px-6 py-3 rounded-xl"
        >
          Browse Footwear
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
        <button onClick={() => onNavigate('cart')} className="hover:text-neutral-900">
          Bag
        </button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="font-semibold text-neutral-900">Secure Checkout</span>
      </div>

      <div className="border-b border-neutral-200 pb-4">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-neutral-950 font-heading">
          Checkout
        </h1>
        <p className="text-sm text-neutral-500 mt-1">
          Complete your delivery and payment details to finalize your RED FOX order.
        </p>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Delivery & Payment Details Form */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Shipping Details */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
              <span className="w-6 h-6 rounded-full bg-[#C8102E] text-white text-xs font-bold flex items-center justify-center">
                1
              </span>
              <h2 className="font-bold text-lg text-neutral-950 font-heading">
                Shipping Destination
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Street Address *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder="Street and number"
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Apartment, Suite, Unit
                </label>
                <input
                  type="text"
                  value={formData.apartment}
                  onChange={(e) => handleInputChange('apartment', e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => handleInputChange('city', e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  State / Province *
                </label>
                <input
                  type="text"
                  required
                  value={formData.state}
                  onChange={(e) => handleInputChange('state', e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">
                  Postal / ZIP Code *
                </label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => handleInputChange('postalCode', e.target.value)}
                  className="w-full bg-neutral-50 border border-neutral-200 rounded-xl px-4 py-2.5 text-xs text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                />
              </div>
            </div>
          </div>

          {/* Step 2: Delivery Speed */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-neutral-100">
              <span className="w-6 h-6 rounded-full bg-[#C8102E] text-white text-xs font-bold flex items-center justify-center">
                2
              </span>
              <h2 className="font-bold text-lg text-neutral-950 font-heading">
                Shipping Speed
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                className={`p-4 rounded-xl border-2 flex items-start justify-between cursor-pointer transition-all ${
                  shippingMethod === 'standard'
                    ? 'border-[#C8102E] bg-red-50/40'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'standard'}
                    onChange={() => setShippingMethod('standard')}
                    className="mt-0.5 accent-[#C8102E]"
                  />
                  <div>
                    <strong className="block text-xs text-neutral-950">Standard Delivery</strong>
                    <span className="text-[11px] text-neutral-500">3-5 business days</span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-neutral-900">
                  {shippingCost === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatBDT(shippingCost, true)}
                </span>
              </label>

              <label
                className={`p-4 rounded-xl border-2 flex items-start justify-between cursor-pointer transition-all ${
                  shippingMethod === 'express'
                    ? 'border-[#C8102E] bg-red-50/40'
                    : 'border-neutral-200 hover:border-neutral-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="radio"
                    name="shippingMethod"
                    checked={shippingMethod === 'express'}
                    onChange={() => setShippingMethod('express')}
                    className="mt-0.5 accent-[#C8102E]"
                  />
                  <div>
                    <strong className="block text-xs text-neutral-950 flex items-center gap-1">
                      <span>Express Air Priority</span>
                      <Sparkles className="w-3 h-3 text-[#C8102E]" />
                    </strong>
                    <span className="text-[11px] text-neutral-500">1-2 business days</span>
                  </div>
                </div>
                <span className="font-mono text-xs font-bold text-neutral-900">
                  {shippingCost === 0 ? formatBDT(12, true) : formatBDT(18, true)}
                </span>
              </label>
            </div>
          </div>

          {/* Step 3: Payment Method */}
          <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#C8102E] text-white text-xs font-bold flex items-center justify-center">
                  3
                </span>
                <h2 className="font-bold text-lg text-neutral-950 font-heading">
                  Payment Method
                </h2>
              </div>
              <span className="text-[11px] font-mono font-bold bg-neutral-100 text-neutral-700 px-2 py-0.5 rounded border border-neutral-200">
                BDT Only
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'card'
                    ? 'border-[#C8102E] bg-red-50/50 text-[#C8102E] ring-1 ring-[#C8102E]'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <CreditCard className="w-5 h-5" />
                <span>Card (BDT)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('bkash')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'bkash'
                    ? 'border-[#E2136E] bg-pink-50 text-[#E2136E] ring-1 ring-[#E2136E]'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#E2136E] text-white font-black text-[10px] flex items-center justify-center">৳</span>
                <span>bKash</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('nagad')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'nagad'
                    ? 'border-[#F7931E] bg-orange-50 text-[#F7931E] ring-1 ring-[#F7931E]'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <span className="w-5 h-5 rounded-full bg-[#F7931E] text-white font-black text-[10px] flex items-center justify-center">ন</span>
                <span>Nagad</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('cod')}
                className={`p-3 rounded-xl border text-xs font-bold flex flex-col items-center justify-center gap-1.5 transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#C8102E] bg-red-50/50 text-[#C8102E] ring-1 ring-[#C8102E]'
                    : 'border-neutral-200 text-neutral-700 hover:bg-neutral-50'
                }`}
              >
                <Truck className="w-5 h-5" />
                <span>Cash on Delivery</span>
              </button>
            </div>

            {/* Credit Card Form Fields */}
            {paymentMethod === 'card' && (
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 space-y-3 animate-fadeIn">
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    Debit / Credit Card Number (BDT Billed)
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4000 1234 5678 9010"
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                      Expiry Date (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="MM/YY"
                      className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                      CVV / Security Code
                    </label>
                    <input
                      type="password"
                      value={cardCvv}
                      maxLength={4}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="123"
                      className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#C8102E]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* bKash Payment Box */}
            {paymentMethod === 'bkash' && (
              <div className="p-4 bg-pink-50/50 rounded-xl border border-pink-200 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between text-xs text-[#E2136E] font-bold">
                  <span>bKash Payment Gateway</span>
                  <span className="font-mono">BDT {finalTotal.toFixed(2)}</span>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    bKash Account Number
                  </label>
                  <input
                    type="text"
                    value={bkashNumber}
                    onChange={(e) => setBkashNumber(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#E2136E]"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    Transaction ID (Optional for pre-authorized demo)
                  </label>
                  <input
                    type="text"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="e.g. 9J29AKD92"
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#E2136E]"
                  />
                </div>
              </div>
            )}

            {/* Nagad Payment Box */}
            {paymentMethod === 'nagad' && (
              <div className="p-4 bg-orange-50/50 rounded-xl border border-orange-200 space-y-3 animate-fadeIn">
                <div className="flex items-center justify-between text-xs text-[#F7931E] font-bold">
                  <span>Nagad Payment Gateway</span>
                  <span className="font-mono">BDT {finalTotal.toFixed(2)}</span>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-neutral-700 mb-1">
                    Nagad Account Number
                  </label>
                  <input
                    type="text"
                    value={nagadNumber}
                    onChange={(e) => setNagadNumber(e.target.value)}
                    placeholder="01XXXXXXXXX"
                    className="w-full bg-white border border-neutral-300 rounded-lg px-3 py-2 text-xs font-mono text-neutral-900 focus:outline-none focus:border-[#F7931E]"
                  />
                </div>
              </div>
            )}

            {/* COD Message */}
            {paymentMethod === 'cod' && (
              <div className="p-4 bg-neutral-50 rounded-xl border border-neutral-200 text-xs text-neutral-600 space-y-1 animate-fadeIn">
                <p className="font-bold text-neutral-900">Cash on Delivery (BDT)</p>
                <p>Please keep the exact amount in BDT ({formatBDT(finalTotal, true)}) ready for the courier agent upon shoe delivery.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Order Review Panel */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm space-y-6 sticky top-28">
          <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
            <h2 className="font-bold text-lg text-neutral-950 font-heading">
              Order Review ({cart.length})
            </h2>
            <button
              type="button"
              onClick={() => onNavigate('cart')}
              className="text-xs font-bold text-[#C8102E] hover:underline"
            >
              Edit Bag
            </button>
          </div>

          {/* Item Mini Thumbnails */}
          <div className="divide-y divide-neutral-100 max-h-60 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-3 first:pt-0 last:pb-0 flex items-center gap-3">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-contain rounded-lg bg-neutral-100 border p-1 shrink-0 mix-blend-multiply"
                />
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-xs text-neutral-900 truncate">{item.name}</h4>
                  <p className="text-[11px] text-neutral-500">
                    US {item.size} • {item.color.name} • Qty: {item.quantity}
                  </p>
                </div>
                <span className="font-mono text-xs font-bold text-neutral-900">
                  {formatBDT(item.price * item.quantity, true)}
                </span>
              </div>
            ))}
          </div>

          {/* Calculations Summary */}
          <div className="space-y-2 text-xs text-neutral-600 border-t border-neutral-100 pt-4">
            <div className="flex justify-between">
              <span>Items Subtotal</span>
              <span className="font-mono font-semibold text-neutral-900">{formatBDT(cartSubtotal, true)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between text-[#C8102E]">
                <span>Coupon ({discountCode})</span>
                <span className="font-mono font-semibold">-{formatBDT(discountAmount, true)}</span>
              </div>
            )}

            <div className="flex justify-between">
              <span>Shipping ({shippingMethod === 'express' ? 'Express' : 'Standard'})</span>
              <span className="font-mono font-semibold text-neutral-900">
                {shippingMultiplier === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : formatBDT(shippingMultiplier, true)}
              </span>
            </div>

            <div className="flex justify-between">
              <span>Estimated Tax (8%)</span>
              <span className="font-mono font-semibold text-neutral-900">{formatBDT(taxAmount, true)}</span>
            </div>

            <div className="flex justify-between text-base font-bold text-neutral-950 pt-3 border-t border-neutral-200">
              <span>Total Due</span>
              <span className="font-mono text-xl text-[#C8102E]">{formatBDT(finalTotal, true)}</span>
            </div>

            <div className="text-[11px] text-center font-mono text-neutral-500 bg-neutral-100/80 py-1.5 px-3 rounded-lg border border-neutral-200">
              Payment processed strictly in <strong>BDT (৳) only</strong>
            </div>
          </div>

          {/* Place Order CTA */}
          <button
            type="submit"
            id="place-order-submit-btn"
            disabled={isProcessing}
            className="w-full bg-[#C8102E] hover:bg-red-700 text-white font-bold py-4 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg transition-all disabled:opacity-50 group"
          >
            {isProcessing ? (
              <span>Authorizing & Placing Order...</span>
            ) : (
              <>
                <ShieldCheck className="w-4 h-4" />
                <span>Authorize & Place Order ({formatBDT(finalTotal, true)})</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>

          <p className="text-[11px] text-center text-neutral-400">
            By clicking "Place Order", you agree to RED FOX Terms of Sale and Privacy Policy.
          </p>
        </div>
      </form>
    </div>
  );
};
