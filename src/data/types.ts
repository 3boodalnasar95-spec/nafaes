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
  categorySlug: string;
  isFlavor?: boolean;
  hasSizeOptions?: boolean;
  basePrice?: number;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

export interface Order {
  name: string;
  phone: string;
  governorate: string;
  area: string;
  areaId: string;
  block: string;
  street: string;
  avenue?: string;
  house: string;
  floor?: string;
  apartment?: string;
  fullAddress: string;
  notes: string;
  paymentMethod: 'cash' | 'link';
}

export interface SizeOption {
  size: string;
  ml: number;
  price: number;
}

export interface Category {
  slug: string;
  name_ar: string;
  name_en: string;
  description: string;
  icon: string;
  color: string;
}

export interface KuwaitArea {
  id: string;
  governorate: string;
  governorate_ar: string;
  name: string;
  deliveryFee: number;
  estimatedDays: number;
}

export interface Governorate {
  id: string;
  name: string;
  name_ar: string;
}

export interface FlavorOption {
  id: string;
  name_ar: string;
  name_en: string;
  basePrice: number;
  image: string;
  description: string;
  sizes: SizeOption[];
}