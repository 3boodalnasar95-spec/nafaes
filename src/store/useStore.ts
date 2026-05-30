import { create } from 'zustand';
import { Product, CartItem, Order, User, BlogPost, initialProducts, initialOrders, initialUsers, initialBlogPosts } from '../data/products';

interface StoreState {
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: string, product: Partial<Product>) => void;
  deleteProduct: (id: string) => void;

  // Cart
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  cartTotal: () => number;

  // Orders
  orders: Order[];
  addOrder: (order: Order) => void;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;

  // Users
  users: User[];
  addUser: (user: User) => void;
  updateUser: (id: string, user: Partial<User>) => void;
  deleteUser: (id: string) => void;

  // Blog
  blogPosts: BlogPost[];
  addBlogPost: (post: BlogPost) => void;
  updateBlogPost: (id: string, post: Partial<BlogPost>) => void;
  deleteBlogPost: (id: string) => void;

  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Category Filter
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

export const useStore = create<StoreState>((set, get) => ({
  // Products
  products: initialProducts,
  addProduct: (product) => set((state) => ({ products: [...state.products, product] })),
  updateProduct: (id, updatedProduct) =>
    set((state) => ({
      products: state.products.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p)),
    })),
  deleteProduct: (id) => set((state) => ({ products: state.products.filter((p) => p.id !== id) })),

  // Cart
  cartItems: [],
  addToCart: (product) => {
    const { cartItems } = get();
    const existingItem = cartItems.find((item) => item.product.id === product.id);
    if (existingItem) {
      set({
        cartItems: cartItems.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
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

  // Orders
  orders: initialOrders,
  addOrder: (order) => set((state) => ({ orders: [...state.orders, order] })),
  updateOrderStatus: (orderId, status) =>
    set((state) => ({
      orders: state.orders.map((o) => (o.id === orderId ? { ...o, status } : o)),
    })),

  // Users
  users: initialUsers,
  addUser: (user) => set((state) => ({ users: [...state.users, user] })),
  updateUser: (id, updatedUser) =>
    set((state) => ({
      users: state.users.map((u) => (u.id === id ? { ...u, ...updatedUser } : u)),
    })),
  deleteUser: (id) => set((state) => ({ users: state.users.filter((u) => u.id !== id) })),

  // Blog
  blogPosts: initialBlogPosts,
  addBlogPost: (post) => set((state) => ({ blogPosts: [...state.blogPosts, post] })),
  updateBlogPost: (id, updatedPost) =>
    set((state) => ({
      blogPosts: state.blogPosts.map((p) => (p.id === id ? { ...p, ...updatedPost } : p)),
    })),
  deleteBlogPost: (id) => set((state) => ({ blogPosts: state.blogPosts.filter((p) => p.id !== id) })),

  // Search & Filter
  searchQuery: '',
  setSearchQuery: (query) => set({ searchQuery: query }),
  selectedCategory: 'all',
  setSelectedCategory: (category) => set({ selectedCategory: category }),
}));