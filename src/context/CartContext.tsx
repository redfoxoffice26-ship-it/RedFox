import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product, CartItem, ProductColor } from '../types';

export interface ToastItem {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'error';
  image?: string;
}

interface CartContextType {
  cart: CartItem[];
  cartCount: number;
  cartSubtotal: number;
  discountCode: string | null;
  discountPercent: number;
  discountAmount: number;
  shippingCost: number;
  taxAmount: number;
  cartTotal: number;
  freeShippingThreshold: number;
  addToCart: (product: Product, size: number, color: ProductColor, quantity?: number) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  applyDiscount: (code: string) => { success: boolean; message: string };
  removeDiscount: () => void;
  // Drawer
  isCartDrawerOpen: boolean;
  openCartDrawer: () => void;
  closeCartDrawer: () => void;
  toggleCartDrawer: () => void;
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  // Size Guide
  isSizeGuideOpen: boolean;
  openSizeGuide: () => void;
  closeSizeGuide: () => void;
  // Search Modal
  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
  // Toasts
  toasts: ToastItem[];
  addToast: (message: string, type?: 'success' | 'info' | 'error', image?: string) => void;
  removeToast: (id: string) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const FREE_SHIPPING_THRESHOLD = 100;
const STANDARD_SHIPPING_RATE = 9.99;
const TAX_RATE = 0.08;

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Load persistent cart
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('redfox_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Load wishlist
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('redfox_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Cart Drawer
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // Discount
  const [discountCode, setDiscountCode] = useState<string | null>(() => {
    try {
      return localStorage.getItem('redfox_discount') || null;
    } catch {
      return null;
    }
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  // Persist cart
  useEffect(() => {
    try {
      localStorage.setItem('redfox_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to persist cart:', e);
    }
  }, [cart]);

  // Persist wishlist
  useEffect(() => {
    try {
      localStorage.setItem('redfox_wishlist', JSON.stringify(wishlist));
    } catch (e) {
      console.error('Failed to persist wishlist:', e);
    }
  }, [wishlist]);

  // Persist discount
  useEffect(() => {
    try {
      if (discountCode) {
        localStorage.setItem('redfox_discount', discountCode);
      } else {
        localStorage.removeItem('redfox_discount');
      }
    } catch (e) {
      console.error('Failed to persist discount:', e);
    }
  }, [discountCode]);

  const addToast = (message: string, type: 'success' | 'info' | 'error' = 'success', image?: string) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    setToasts((prev) => [...prev, { id, message, type, image }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const addToCart = (product: Product, size: number, color: ProductColor, quantity = 1) => {
    const itemId = `${product.id}-${size}-${color.hex.replace('#', '')}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.id === itemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            id: itemId,
            productId: product.id,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            color,
            size,
            image: product.images[0],
            quantity,
          },
        ];
      }
    });

    addToast(`Added ${product.name} (US ${size}) to cart`, 'success', product.images[0]);
    setIsCartDrawerOpen(true);
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    addToast('Item removed from cart', 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        addToast('Removed from favorites', 'info');
        return prev.filter((id) => id !== productId);
      } else {
        addToast('Saved to favorites!', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  const applyDiscount = (code: string) => {
    const clean = code.trim().toUpperCase();
    if (clean === 'REDFOX15' || clean === 'FOX15') {
      setDiscountCode('REDFOX15');
      addToast('Promo code REDFOX15 applied (15% OFF)', 'success');
      return { success: true, message: '15% discount applied successfully!' };
    }
    if (clean === 'SPEED20' || clean === 'FOX20') {
      setDiscountCode('SPEED20');
      addToast('Promo code SPEED20 applied (20% OFF)', 'success');
      return { success: true, message: '20% discount applied successfully!' };
    }
    return { success: false, message: 'Invalid or expired code. Try REDFOX15' };
  };

  const removeDiscount = () => {
    setDiscountCode(null);
    addToast('Discount code removed', 'info');
  };

  // Calculations
  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  let discountPercent = 0;
  if (discountCode === 'REDFOX15') discountPercent = 0.15;
  if (discountCode === 'SPEED20') discountPercent = 0.20;

  const discountAmount = Number((cartSubtotal * discountPercent).toFixed(2));
  const postDiscountSubtotal = Math.max(0, cartSubtotal - discountAmount);

  const shippingCost =
    cartSubtotal === 0 || postDiscountSubtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : STANDARD_SHIPPING_RATE;

  const taxAmount = Number((postDiscountSubtotal * TAX_RATE).toFixed(2));
  const cartTotal = Number((postDiscountSubtotal + shippingCost + taxAmount).toFixed(2));

  return (
    <CartContext.Provider
      value={{
        cart,
        cartCount,
        cartSubtotal,
        discountCode,
        discountPercent,
        discountAmount,
        shippingCost,
        taxAmount,
        cartTotal,
        freeShippingThreshold: FREE_SHIPPING_THRESHOLD,
        addToCart,
        updateQuantity,
        removeFromCart,
        clearCart,
        applyDiscount,
        removeDiscount,
        isCartDrawerOpen,
        openCartDrawer: () => setIsCartDrawerOpen(true),
        closeCartDrawer: () => setIsCartDrawerOpen(false),
        toggleCartDrawer: () => setIsCartDrawerOpen((prev) => !prev),
        wishlist,
        toggleWishlist,
        isWishlisted,
        isSizeGuideOpen,
        openSizeGuide: () => setIsSizeGuideOpen(true),
        closeSizeGuide: () => setIsSizeGuideOpen(false),
        isSearchOpen,
        openSearch: () => setIsSearchOpen(true),
        closeSearch: () => setIsSearchOpen(false),
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
