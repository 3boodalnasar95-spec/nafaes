import { create } from 'zustand';
import { Product } from '@/data/products';

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

interface StoreState {
  cartItems: CartItem[];
  addToCart: (product: Product, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize?: string) => void;
  updateQuantity: (productId: string, quantity: number, selectedSize?: string) => void;
  clearCart: () => void;
  cartTotal: () => number;
}

export const useStore = create<StoreState>((set, get) => ({
  cartItems: [],
  
  addToCart: (product, selectedSize) => {
    const { cartItems } = get();
    const itemKey = selectedSize ? `${product.id}-${selectedSize}` : product.id;
    const existingItemIndex = cartItems.findIndex(
      (item) => (selectedSize ? `${item.product.id}-${item.selectedSize}` : item.product.id) === itemKey
    );
    
    if (existingItemIndex >= 0) {
      set({
        cartItems: cartItems.map((item, index) =>
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      set({ cartItems: [...cartItems, { product, quantity: 1, selectedSize }] });
    }
  },
  
  removeFromCart: (productId, selectedSize) =>
    set((state) => ({
      cartItems: state.cartItems.filter((item) => 
        item.product.id !== productId || item.selectedSize !== selectedSize
      ),
    })),
  
  updateQuantity: (productId, quantity, selectedSize) => {
    if (quantity <= 0) {
      get().removeFromCart(productId, selectedSize);
    } else {
      set((state) => ({
        cartItems: state.cartItems.map((item) =>
          (item.product.id === productId && item.selectedSize === selectedSize)
            ? { ...item, quantity }
            : item
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