export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  featured: boolean;
  specs?: Record<string, string>;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: string;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  address: string;
  phone: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
}

export const categories = [
  { id: 'laptops', name: 'أجهزة laptops', icon: 'Laptop' },
  { id: 'phones', name: 'هواتف ذكية', icon: 'Smartphone' },
  { id: 'tablets', name: 'أجهزة لوحية', icon: 'Tablet' },
  { id: 'accessories', name: 'إكسسوارات', icon: 'Headphones' },
  { id: 'gaming', name: 'ألعاب', icon: 'Gamepad2' },
  { id: 'cameras', name: 'كاميرات', icon: 'Camera' },
];

export const initialProducts: Product[] = [
  {
    id: '1',
    name: 'MacBook Pro M3',
    description: 'لابتوب أبل的最新一代处理器،超强性能，适合专业创作。 мощный ноутбук для профессионалов',
    price: 12999,
    originalPrice: 14999,
    image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800',
    category: 'laptops',
    rating: 4.9,
    reviews: 234,
    stock: 15,
    featured: true,
    specs: {
      'المعالج': 'Apple M3 Pro',
      'الذاكرة': '18GB RAM',
      'التخزين': '512GB SSD',
      'الشاشة': '14.2 بوصة Liquid Retina XDR',
    },
  },
  {
    id: '2',
    name: 'iPhone 15 Pro Max',
    description: 'أحدث هاتف من أبل بكاميرا مذهلة وشاشة Always-On',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1592750475338-74f7f70a3c8d?w=800',
    category: 'phones',
    rating: 4.8,
    reviews: 567,
    stock: 30,
    featured: true,
    specs: {
      'المعالج': 'A17 Pro',
      'الشاشة': '6.7 بوصة Super Retina XDR',
      'الكاميرا': '48MP رئيسية',
      'البطارية': '4422mAh',
    },
  },
  {
    id: '3',
    name: 'Sony WH-1000XM5',
    description: 'سماعات لاسلكية بإلغاء ضوضاء متقدم وصوت فائق الوضوح',
    price: 1899,
    originalPrice: 2299,
    image: 'https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=800',
    category: 'accessories',
    rating: 4.7,
    reviews: 892,
    stock: 45,
    featured: true,
    specs: {
      'نوع الاتصال': 'Bluetooth 5.2',
      'عمر البطارية': '30 ساعة',
      'إلغاء الضوضاء': 'متقدم',
    },
  },
  {
    id: '4',
    name: 'iPad Pro 12.9',
    description: 'جهاز لوحي قوي مع شاشة Liquid Retina XDR وشريحة M2',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
    category: 'tablets',
    rating: 4.8,
    reviews: 345,
    stock: 20,
    featured: false,
    specs: {
      'المعالج': 'Apple M2',
      'الشاشة': '12.9 بوصة Liquid Retina XDR',
      'التخزين': '256GB',
    },
  },
  {
    id: '5',
    name: 'PlayStation 5',
    description: 'جهاز ألعاب الجيل التالي مع رسوميات 4K وسرعة استثنائية',
    price: 3499,
    image: 'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800',
    category: 'gaming',
    rating: 4.9,
    reviews: 1234,
    stock: 8,
    featured: true,
    specs: {
      'المعالج': 'AMD Ryzen Zen 2',
      'الرسوميات': 'RDNA 2 Custom GPU',
      'التخزين': '825GB SSD',
    },
  },
  {
    id: '6',
    name: 'Canon EOS R5',
    description: 'كاميرا احترافية بدقة 45MP مع تصوير 8K فيديو',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800',
    category: 'cameras',
    rating: 4.8,
    reviews: 156,
    stock: 5,
    featured: false,
    specs: {
      'الدقة': '45 ميجابكسل',
      'الفيديو': '8K RAW',
      'ISO': '100-51200',
    },
  },
  {
    id: '7',
    name: 'Samsung Galaxy S24 Ultra',
    description: 'هاتف سامسونج الرائد مع قلم S Pen وكاميرا 200MP',
    price: 7999,
    image: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800',
    category: 'phones',
    rating: 4.7,
    reviews: 423,
    stock: 25,
    featured: true,
    specs: {
      'المعالج': 'Snapdragon 8 Gen 3',
      'الشاشة': '6.8 بوصة Dynamic AMOLED 2X',
      'الكاميرا': '200MP رئيسية',
    },
  },
  {
    id: '8',
    name: 'Dell XPS 15',
    description: 'لابتوب ويندوز فاخر بشاشة 4K OLED وأداء عالي',
    price: 9999,
    originalPrice: 11999,
    image: 'https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=800',
    category: 'laptops',
    rating: 4.6,
    reviews: 287,
    stock: 12,
    featured: false,
    specs: {
      'المعالج': 'Intel Core i7-13700H',
      'الذاكرة': '32GB RAM',
      'التخزين': '1TB NVMe SSD',
      'الشاشة': '15.6 بوصة 4K OLED',
    },
  },
  {
    id: '9',
    name: 'AirPods Pro 2',
    description: 'سماعات أبل اللاسلكية مع إلغاء ضوضاء محسّن',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1600294037681-c80b4cb9b434?w=800',
    category: 'accessories',
    rating: 4.8,
    reviews: 1567,
    stock: 60,
    featured: true,
    specs: {
      'نوع الاتصال': 'Bluetooth 5.3',
      'عمر البطارية': '6 ساعات',
      'مقاومة الماء': 'IPX4',
    },
  },
  {
    id: '10',
    name: 'Nintendo Switch OLED',
    description: 'جهاز ألعاب محمول مع شاشة OLED 7 بوصة',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=800',
    category: 'gaming',
    rating: 4.7,
    reviews: 876,
    stock: 18,
    featured: false,
    specs: {
      'الشاشة': '7 بوصة OLED',
      'التخزين': '64GB',
      'البطارية': '4-9 ساعات',
    },
  },
  {
    id: '11',
    name: 'GoPro Hero 12',
    description: 'كاميرا رياضية بدقة 5.3K مع تثبيت فيديو متقدم',
    price: 2999,
    image: 'https://images.unsplash.com/photo-1564415315949-7a0c4c73aab4?w=800',
    category: 'cameras',
    rating: 4.6,
    reviews: 234,
    stock: 22,
    featured: false,
    specs: {
      'الدقة': '5.3K 60fps',
      'مقاومة الماء': '11 متر',
      'التثبيت': 'HyperSmooth 6.0',
    },
  },
  {
    id: '12',
    name: 'Samsung Galaxy Tab S9 Ultra',
    description: 'جهاز لوحي بشاشة 14.6 بوصة ومقاومة للماء',
    price: 6499,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=800',
    category: 'tablets',
    rating: 4.7,
    reviews: 189,
    stock: 15,
    featured: true,
    specs: {
      'المعالج': 'Snapdragon 8 Gen 2',
      'الشاشة': '14.6 بوصة Dynamic AMOLED 2X',
      'التخزين': '256GB',
    },
  },
];

export const initialOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [
      { product: initialProducts[0], quantity: 1 },
      { product: initialProducts[2], quantity: 2 },
    ],
    total: 14797,
    status: 'processing',
    createdAt: '2024-01-15',
    address: 'الرياض، حي النرجس',
    phone: '0501234567',
  },
  {
    id: 'ORD-002',
    userId: '2',
    items: [{ product: initialProducts[1], quantity: 1 }],
    total: 8999,
    status: 'shipped',
    createdAt: '2024-01-14',
    address: 'جدة، حي الشاطئ',
    phone: '0559876543',
  },
  {
    id: 'ORD-003',
    userId: '3',
    items: [
      { product: initialProducts[4], quantity: 1 },
      { product: initialProducts[8], quantity: 1 },
    ],
    total: 4798,
    status: 'delivered',
    createdAt: '2024-01-12',
    address: 'الدمام، حي العليا',
    phone: '0534567890',
  },
];

export const initialUsers: User[] = [
  {
    id: '1',
    name: 'أحمد محمد',
    email: 'ahmed@example.com',
    role: 'user',
    createdAt: '2024-01-01',
  },
  {
    id: '2',
    name: 'سارة أحمد',
    email: 'sara@example.com',
    role: 'user',
    createdAt: '2024-01-05',
  },
  {
    id: '3',
    name: 'محمد خالد',
    email: 'admin@techstore.com',
    role: 'admin',
    createdAt: '2023-12-15',
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'أفضل الهواتف الذكية في 2024',
    excerpt: 'مراجعة شاملة لأفضل الهواتف المتاحة في السوق الآن',
    content: 'نقدم لكم مقارنة تفصيلية لأفضل الهواتف الذكية...',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    author: 'أحمد محمد',
    date: '2024-01-15',
    category: 'مراجعات',
  },
  {
    id: '2',
    title: 'كيف تختار اللابتوب المناسب',
    excerpt: 'دليل شامل لاختيار اللابتوب حسب احتياجاتك',
    content: 'اختيار اللابتوب المناسب يعتمد على عدة عوامل...',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800',
    author: 'سارة خالد',
    date: '2024-01-12',
    category: 'شروحات',
  },
  {
    id: '3',
    title: 'مستقبل التقنية في 2024',
    excerpt: 'نظرة على أبرز التقنيات التي ستغير حياتنا',
    content: 'يتوقع الخبراء عدة تقنيات ستسيطر على السوق...',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800',
    author: 'خالد العلي',
    date: '2024-01-10',
    category: 'أخبار',
  },
];