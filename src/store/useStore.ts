import { create } from 'zustand';
import { Product } from '../data/products';

interface StoreState {
  cartItems: { product: Product; quantity: number; selectedSize?: string }[];
  addToCart: (product: Product, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cartItems: [],
  
  addToCart: (product, selectedSize) => {
    const { cartItems } = get();
    // Create a unique key based on product id and size
    const itemKey = selectedSize ? `${product.id}-${selectedSize}` : product.id;
    const existingItemIndex = cartItems.findIndex(
      (item) => (selectedSize ? `${item.product.id}-${item.selectedSize}` : item.product.id) === itemKey
    );
    
    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      set({
        cartItems: cartItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      // Add new item
      set({ cartItems: [...cartItems, { product, quantity: 1, selectedSize }] });
    }
  },
  
  removeFromCart: (productId) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => item.product.id !== productId),
    })),
  
  updateQuantity: (productId, quantity) => {
    if (quantity <= 0) {
      get().removeFromCart(productId);
    } else {
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          item.product.id === productId ? { ...item, quantity } : item
        ),
      }));
    }
  },
  
  clearCart: () => set({ cartItems: [] }),
  
  cartTotal: () => {
    const { cartItems } = get();
    return cartItems.reduce((total, item) => total + item.product.price * item.quantity, 0);
  },
}));