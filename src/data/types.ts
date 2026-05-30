export interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  type: string;
  price: number;
  shortDescription: string;
  fullDescription: string;
  specs: Record<string, string>;
  features: string[];
  image: string;
  images?: string[];
  categorySlug?: string;
  basePrice?: number;
  stock_quantity?: number;
  is_active?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Order {
  name: string;
  phone: string;
  area: string;
  address: string;
  notes: string;
  paymentMethod: 'cash' | 'link';
}

export interface SizeOption {
  size: string;
  ml: number;
  price: number;
}

export interface KuwaitArea {
  id: string;
  governorate: string;
  name: string;
  deliveryFee: number;
  estimatedDays: number;
}

export interface Governorate {
  id: string;
  name: string;
}

export interface Category {
  slug: string;
  name_ar: string;
  name_en: string;
  description?: string;
  icon: string;
  color: string;
}