import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Product {
  id: string;
  name_ar: string;
  name_en: string;
  type: string;
  price: number;
  shortDescription?: string;
  fullDescription?: string;
  specs?: Record<string, string>;
  features?: string[];
  image?: string;
}

interface CartItem {
  product: Product;
  quantity: number;
}

interface StoreState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
}

// Custom sessionStorage implementation for Zustand persist
const sessionStorageAdapter = {
  getItem: (name: string): string | null => {
    try {
      return sessionStorage.getItem(name);
    } catch {
      return null;
    }
  },
  setItem: (name: string, value: string): void => {
    try {
      sessionStorage.setItem(name, value);
    } catch {
      // Ignore storage errors
    }
  },
  removeItem: (name: string): void => {
    try {
      sessionStorage.removeItem(name);
    } catch {
      // Ignore storage errors
    }
  },
};

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
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
    }),
    {
      name: 'nafaes_cart', // storage key
      storage: createJSONStorage(() => sessionStorageAdapter),
      // Only persist cart items, not other state
      partialize: (state) => ({ cartItems: state.cartItems }),
    }
  )
);