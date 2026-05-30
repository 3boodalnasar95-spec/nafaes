import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

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

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthContextType {
  isAuthenticated: boolean;
  user: AdminUser | null;
  token: string | null;
  loading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  logout: () => void;
  updateUser: (user: Partial<AdminUser>) => void;
}

const ADMIN_CREDENTIALS = { username: 'admin', password: 'nafaes2024!@#' };
const DEFAULT_ADMIN_USER: AdminUser = {
  id: '1', username: 'admin', name: 'مدير النظام', role: 'admin',
  permissions: ['view_dashboard', 'manage_products', 'manage_orders', 'manage_customers', 'manage_inventory', 'manage_invoices', 'manage_accounting', 'view_reports', 'manage_settings'],
  createdAt: new Date().toISOString(),
};
const TOKEN_KEY = 'nafaes_admin_token';
const USER_KEY = 'nafaes_admin_user';

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem(TOKEN_KEY);
    const storedUser = localStorage.getItem(USER_KEY);
    if (storedToken && storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setToken(storedToken);
        setUser(parsedUser);
      } catch {
        localStorage.removeItem(TOKEN_KEY);
        localStorage.removeItem(USER_KEY);
      }
    }
    setLoading(false);
  }, []);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    if (credentials.username === ADMIN_CREDENTIALS.username && credentials.password === ADMIN_CREDENTIALS.password) {
      const newToken = `token_${Date.now()}_${Math.random().toString(36).substring(2)}`;
      const adminUser: AdminUser = { ...DEFAULT_ADMIN_USER, lastLogin: new Date().toISOString() };
      setToken(newToken);
      setUser(adminUser);
      localStorage.setItem(TOKEN_KEY, newToken);
      localStorage.setItem(USER_KEY, JSON.stringify(adminUser));
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
  }, []);

  const updateUser = useCallback((updates: Partial<AdminUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ isAuthenticated: !!token && !!user, user, token, loading, login, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}