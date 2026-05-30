import { create } from 'zustand';
import { Product, CartItem } from '../data/products';

interface StoreState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cartItems: [],
  
  addToCart: (product) => {
    const { cartItems } = get();
    const existingItem = cartItems.find((item) => item.product.id === product.id);
    
    if (existingItem) {
      set({
        cartItems: cartItems.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      });
    } else {
      set({ cartItems: [...cartItems, { product, quantity: 1 }] });
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