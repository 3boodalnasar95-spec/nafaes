import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

// Types
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

// Get credentials from environment variables (injected at build time)
const ADMIN_USERNAME = import.meta.env.VITE_ADMIN_USERNAME || 'admin';
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD || '';

// Default admin user
const DEFAULT_ADMIN_USER: AdminUser = {
  id: '1',
  username: 'admin',
  name: 'مدير النظام',
  role: 'admin',
  permissions: ['view_dashboard', 'manage_products', 'manage_orders', 'manage_customers', 'manage_inventory', 'manage_invoices', 'manage_accounting', 'view_reports', 'manage_settings'],
  createdAt: new Date().toISOString(),
};

// Storage keys
const TOKEN_KEY = 'nafaes_admin_token';
const USER_KEY = 'nafaes_admin_user';
const SESSION_EXPIRY_KEY = 'nafaes_session_expiry';
const FAILED_ATTEMPTS_KEY = 'nafaes_failed_attempts';
const LOCKOUT_UNTIL_KEY = 'nafaes_lockout_until';

// Session timeout: 30 minutes
const SESSION_TIMEOUT_MS = 30 * 60 * 1000;
// Lockout duration: 15 minutes after 5 failed attempts
const LOCKOUT_DURATION_MS = 15 * 60 * 1000;
const MAX_FAILED_ATTEMPTS = 5;

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const sessionCheckRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Clear all auth data
  const clearAuthData = useCallback(() => {
    sessionStorage.removeItem(TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    sessionStorage.removeItem(SESSION_EXPIRY_KEY);
    setToken(null);
    setUser(null);
  }, []);

  // Check if session is locked due to failed attempts
  const isLockedOut = useCallback((): boolean => {
    const lockoutUntil = sessionStorage.getItem(LOCKOUT_UNTIL_KEY);
    if (!lockoutUntil) return false;
    
    const lockoutTime = parseInt(lockoutUntil, 10);
    if (Date.now() < lockoutTime) {
      return true;
    }
    
    // Lockout expired, clear it
    sessionStorage.removeItem(LOCKOUT_UNTIL_KEY);
    sessionStorage.removeItem(FAILED_ATTEMPTS_KEY);
    return false;
  }, []);

  // Get remaining lockout time in minutes
  const getRemainingLockoutTime = useCallback((): number => {
    const lockoutUntil = sessionStorage.getItem(LOCKOUT_UNTIL_KEY);
    if (!lockoutUntil) return 0;
    
    const lockoutTime = parseInt(lockoutUntil, 10);
    const remaining = lockoutTime - Date.now();
    
    if (remaining <= 0) {
      sessionStorage.removeItem(LOCKOUT_UNTIL_KEY);
      return 0;
    }
    
    return Math.ceil(remaining / 60000);
  }, []);

  // Record failed login attempt
  const recordFailedAttempt = useCallback(() => {
    let attempts = parseInt(sessionStorage.getItem(FAILED_ATTEMPTS_KEY) || '0', 10);
    attempts += 1;
    sessionStorage.setItem(FAILED_ATTEMPTS_KEY, attempts.toString());
    
    // If max attempts reached, lockout
    if (attempts >= MAX_FAILED_ATTEMPTS) {
      const lockoutUntil = Date.now() + LOCKOUT_DURATION_MS;
      sessionStorage.setItem(LOCKOUT_UNTIL_KEY, lockoutUntil.toString());
      return true; // Lockout triggered
    }
    return false;
  }, []);

  // Clear failed attempts on successful login
  const clearFailedAttempts = useCallback(() => {
    sessionStorage.removeItem(FAILED_ATTEMPTS_KEY);
    sessionStorage.removeItem(LOCKOUT_UNTIL_KEY);
  }, []);

  // Check session expiration
  const checkSessionExpiry = useCallback(() => {
    const expiry = sessionStorage.getItem(SESSION_EXPIRY_KEY);
    if (!expiry) {
      clearAuthData();
      return false;
    }
    
    const expiryTime = parseInt(expiry, 10);
    if (Date.now() >= expiryTime) {
      clearAuthData();
      return false;
    }
    
    // Extend session on activity
    sessionStorage.setItem(SESSION_EXPIRY_KEY, (Date.now() + SESSION_TIMEOUT_MS).toString());
    return true;
  }, [clearAuthData]);

  // Initialize auth state from session storage
  useEffect(() => {
    const storedToken = sessionStorage.getItem(TOKEN_KEY);
    const storedUser = sessionStorage.getItem(USER_KEY);
    const expiry = sessionStorage.getItem(SESSION_EXPIRY_KEY);

    // Check if session is still valid
    if (storedToken && storedUser && expiry) {
      const expiryTime = parseInt(expiry, 10);
      if (Date.now() < expiryTime) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);
        } catch {
          clearAuthData();
        }
      } else {
        clearAuthData();
      }
    }
    setLoading(false);

    // Set up periodic session check (every minute)
    sessionCheckRef.current = setInterval(() => {
      checkSessionExpiry();
    }, 60000);

    // Activity listener to extend session
    const handleActivity = () => {
      if (token) {
        sessionStorage.setItem(SESSION_EXPIRY_KEY, (Date.now() + SESSION_TIMEOUT_MS).toString());
      }
    };

    window.addEventListener('click', handleActivity);
    window.addEventListener('keypress', handleActivity);

    return () => {
      if (sessionCheckRef.current) {
        clearInterval(sessionCheckRef.current);
      }
      window.removeEventListener('click', handleActivity);
      window.removeEventListener('keypress', handleActivity);
    };
  }, [clearAuthData, checkSessionExpiry, token]);

  const login = useCallback(async (credentials: LoginCredentials): Promise<boolean> => {
    // Check for lockout
    if (isLockedOut()) {
      const remainingMinutes = getRemainingLockoutTime();
      throw new Error(`تم القفل مؤقتاً. حاول مرة أخرى خلال ${remainingMinutes} دقيقة.`);
    }

    // Validate credentials from environment variables
    if (credentials.username === ADMIN_USERNAME && credentials.password === ADMIN_PASSWORD) {
      // Generate secure token with timestamp component
      const tokenExpiry = Date.now() + SESSION_TIMEOUT_MS;
      const newToken = `nafaes_${Date.now()}_${Math.random().toString(36).substring(2)}_${tokenExpiry}`;

      const adminUser: AdminUser = { 
        ...DEFAULT_ADMIN_USER, 
        lastLogin: new Date().toISOString() 
      };

      // Store in session storage (cleared on tab close)
      sessionStorage.setItem(TOKEN_KEY, newToken);
      sessionStorage.setItem(USER_KEY, JSON.stringify(adminUser));
      sessionStorage.setItem(SESSION_EXPIRY_KEY, tokenExpiry.toString());

      setToken(newToken);
      setUser(adminUser);
      
      // Clear failed attempts
      clearFailedAttempts();
      
      return true;
    }

    // Record failed attempt
    const lockoutTriggered = recordFailedAttempt();
    
    if (lockoutTriggered) {
      throw new Error('تم تجاوز عدد المحاولات. تم القفل لمدة 15 دقيقة.');
    }

    const attemptsLeft = MAX_FAILED_ATTEMPTS - parseInt(sessionStorage.getItem(FAILED_ATTEMPTS_KEY) || '0', 10);
    throw new Error(`اسم المستخدم أو كلمة المرور غير صحيحة. ${attemptsLeft} محاولات متبقية.`);

  }, [isLockedOut, getRemainingLockoutTime, clearFailedAttempts, recordFailedAttempt]);

  const logout = useCallback(() => {
    clearAuthData();
  }, [clearAuthData]);

  const updateUser = useCallback((updates: Partial<AdminUser>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      sessionStorage.setItem(USER_KEY, JSON.stringify(updatedUser));
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ 
      isAuthenticated: !!token && !!user, 
      user, 
      token, 
      loading, 
      login, 
      logout, 
      updateUser 
    }}>
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