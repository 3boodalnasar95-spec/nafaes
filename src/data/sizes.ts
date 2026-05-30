import { SizeOption } from './types';

export const flavorSizes: SizeOption[] = [
  { size: '20ml', ml: 20, price: 3.5 },
  { size: '120ml', ml: 120, price: 10.9 },
  { size: '500ml', ml: 500, price: 25 },
];

export const deviceSizes: SizeOption[] = [
  { size: '120ml', ml: 120, price: 0 },
  { size: '200ml', ml: 200, price: 10 },
  { size: '500ml', ml: 500, price: 25 },
];

export function getSizePrice(basePrice: number, size: string): number {
  const sizeOption = flavorSizes.find(s => s.size === size);
  if (!sizeOption) return basePrice;
  
  // Calculate proportional price
  const baseMl = 120;
  const ratio = sizeOption.ml / baseMl;
  return Math.round(basePrice * ratio * 100) / 100;
}