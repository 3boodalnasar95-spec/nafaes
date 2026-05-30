// Admin User Types
export interface AdminUser {
  id: string;
  username: string;
  name: string;
  email?: string;
  role: 'admin' | 'manager' | 'staff';
  permissions: string[];
  lastLogin?: string;
  createdAt: string;
}

// Auth Types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  loading: boolean;
}

export interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<AdminUser>) => void;
}

// Admin credentials (hardcoded for simplicity - in production, use a database)
export const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'nafaes2024!@#'
};

// Permission definitions
export const PERMISSIONS = {
  VIEW_DASHBOARD: 'view_dashboard',
  MANAGE_PRODUCTS: 'manage_products',
  MANAGE_ORDERS: 'manage_orders',
  MANAGE_CUSTOMERS: 'manage_customers',
  MANAGE_INVENTORY: 'manage_inventory',
  MANAGE_INVOICES: 'manage_invoices',
  MANAGE_ACCOUNTING: 'manage_accounting',
  VIEW_REPORTS: 'view_reports',
  MANAGE_SETTINGS: 'manage_settings',
} as const;

// Default admin user
export const DEFAULT_ADMIN_USER: AdminUser = {
  id: '1',
  username: 'admin',
  name: 'مدير النظام',
  role: 'admin',
  permissions: Object.values(PERMISSIONS),
  createdAt: new Date().toISOString(),
};