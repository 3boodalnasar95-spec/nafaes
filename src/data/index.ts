// Types
export * from './types';

// Sizes (import first to avoid circular reference)
import { flavorSizes } from './sizes';

// Categories
export { categories, getCategoryBySlug, getCategoryInfo, categoryIcons } from './categories';

// Products by category
export { devices } from './devices';
export { oils } from './oils';
export { reedDiffusers, giftSets } from './other-products';

// Sizes
export { flavorSizes, deviceSizes, getSizePrice } from './sizes';

// Kuwait Areas
export { 
  kuwaitGovernorates, 
  kuwaitAreas, 
  getAreasByGovernorate, 
  getAreaById, 
  searchAreas 
} from './kuwait-areas';

// Utils
export { formatPrice, generateOrderNumber, generateWhatsAppMessage, slugify, truncate } from './utils';

// Config
export const deliveryFee = 2;
export const whatsappNumber = '96566377312';
export const whatsappLink = `https://wa.me/${whatsappNumber}`;

// All products combined
import { devices } from './devices';
import { oils } from './oils';
import { reedDiffusers, giftSets } from './other-products';
import { Product } from './types';

export const products: Product[] = [
  ...devices,
  ...oils,
  ...reedDiffusers,
  ...giftSets,
];

// Helper functions for products
export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.categorySlug === categorySlug);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(p => 
    p.name_ar.includes(lowerQuery) || 
    p.name_en.toLowerCase().includes(lowerQuery) ||
    p.shortDescription.includes(lowerQuery)
  );
}

// Flavor options for devices
export const deviceFlavors = oils.map(flavor => ({
  id: flavor.id,
  name_ar: flavor.name_ar,
  name_en: flavor.name_en,
  basePrice: flavor.basePrice || flavor.price,
  image: flavor.image,
  description: flavor.shortDescription,
  sizes: flavorSizes,
}));