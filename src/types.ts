export type Category = 'All' | 'Men' | 'Women' | 'Kids' | 'Sports' | 'Casual' | 'Sale';

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'Men' | 'Women' | 'Kids' | 'Sports' | 'Casual';
  gender?: 'Men' | 'Women' | 'Unisex' | 'Kids';
  price: number;
  originalPrice?: number;
  isSale?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  rating: number;
  reviewCount: number;
  description: string;
  details: string[];
  specs: {
    weight: string;
    drop: string;
    cushioning: 'Responsive' | 'Max' | 'Balanced' | 'Minimal';
    surface: string;
    upper: string;
    outsole: string;
  };
  colors: ProductColor[];
  sizes: number[]; // e.g. [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 12]
  images: string[];
  stock: number;
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string; // product id + size + color
  productId: string;
  name: string;
  price: number;
  originalPrice?: number;
  color: ProductColor;
  size: number;
  image: string;
  quantity: number;
}

export interface FilterState {
  category: Category;
  sizes: number[];
  colors: string[];
  priceRange: [number, number];
  searchQuery: string;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
}

export interface OrderShipping {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  apartment?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  shipping: OrderShipping;
  shippingMethod: 'standard' | 'express';
  shippingCost: number;
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  currency?: string;
  paymentMethod: 'card' | 'paypal' | 'applepay' | 'cod' | 'bkash' | 'nagad';
  createdAt: string;
  estimatedDelivery: string;
  status: 'confirmed' | 'processing' | 'shipped';
}
