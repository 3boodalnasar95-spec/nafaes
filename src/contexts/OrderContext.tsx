import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { generateOrderNumber, getFormattedDate } from '@/utils/orderUtils';

export interface OrderItem {
  productId: string;
  productNameAr: string;
  productNameEn: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  governorate: string;
  area: string;
  areaId: string;
  address: string;
  notes: string;
  paymentMethod: 'cash' | 'link';
  items: OrderItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed' | 'preparing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  sentToWhatsApp: boolean;
}

export interface Notification {
  id: string;
  type: 'order' | 'alert' | 'system';
  title: string;
  message: string;
  orderId?: string;
  read: boolean;
  createdAt: string;
}

interface OrderContextType {
  orders: Order[];
  notifications: Notification[];
  unreadCount: number;
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'status' | 'createdAt' | 'sentToWhatsApp'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrder: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  clearAllOrders: () => void;
  getOrderStats: () => {
    totalOrders: number;
    pendingOrders: number;
    todayOrders: number;
    totalRevenue: number;
  };
  stats: {
    totalOrders: number;
    pendingOrders: number;
    todayOrders: number;
    totalRevenue: number;
  };
}

const ORDERS_KEY = 'nafaes_orders';
const ORDERS_LOCAL_KEY = 'nafaes_orders_local';
const NOTIFICATIONS_KEY = 'nafaes_notifications';
const NOTIFICATIONS_LOCAL_KEY = 'nafaes_notifications_local';

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

function generateId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function generateNotificationId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function saveToStorage<T>(key: string, data: T): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving to sessionStorage:', e);
  }
}

function saveToLocalStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Error saving to localStorage:', e);
  }
}

function loadFromStorage<T>(key: string): T | null {
  try {
    const data = sessionStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error loading from sessionStorage:', e);
    return null;
  }
}

function loadFromLocalStorage<T>(key: string): T | null {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error loading from localStorage:', e);
    return null;
  }
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load from sessionStorage and localStorage on mount
  useEffect(() => {
    const sessionOrders = loadFromStorage<Order[]>(ORDERS_KEY);
    const localOrders = loadFromLocalStorage<Order[]>(ORDERS_LOCAL_KEY);
    const sessionNotifications = loadFromStorage<Notification[]>(NOTIFICATIONS_KEY);
    const localNotifications = loadFromLocalStorage<Notification[]>(NOTIFICATIONS_LOCAL_KEY);

    const mergedOrders = localOrders && localOrders.length > 0
      ? localOrders
      : sessionOrders;
    const mergedNotifications = localNotifications && localNotifications.length > 0
      ? localNotifications
      : sessionNotifications;

    if (mergedOrders) {
      setOrders(mergedOrders);
    }

    if (mergedNotifications) {
      setNotifications(mergedNotifications);
    }
  }, []);

  // Save to sessionStorage and localStorage when orders change
  useEffect(() => {
    saveToStorage(ORDERS_KEY, orders);
    saveToLocalStorage(ORDERS_LOCAL_KEY, orders);
  }, [orders]);

  // Save to sessionStorage and localStorage when notifications change
  useEffect(() => {
    saveToStorage(NOTIFICATIONS_KEY, notifications);
    saveToLocalStorage(NOTIFICATIONS_LOCAL_KEY, notifications);
  }, [notifications]);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'orderNumber' | 'status' | 'createdAt' | 'sentToWhatsApp'>): Order => {
    const orderId = generateId();
    const orderNumber = generateOrderNumber();
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderNumber,
      status: 'pending',
      createdAt: now,
      sentToWhatsApp: false,
    };

    setOrders(prev => {
      const updated = [newOrder, ...prev];
      return updated;
    });

    // Create notification
    const notification: Notification = {
      id: generateNotificationId(),
      type: 'order',
      title: '🛒 طلب جديد!',
      message: `طلب من: ${orderData.customerName}\nالهاتف: +965 ${orderData.customerPhone}\nالمنطقة: ${orderData.area}\nالإجمالي: ${orderData.total.toFixed(3)} د.ك\nالمنتجات: ${orderData.items.length}`,
      orderId: orderId,
      read: false,
      createdAt: now,
    };

    setNotifications(prev => [notification, ...prev]);

    // Also store current order for PDF generation
    saveToStorage('current_order_for_pdf', newOrder);

    console.log('✅ Order saved:', newOrder);
    console.log('📋 Order number:', orderNumber);

    return newOrder;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  }, []);

  const getOrder = useCallback((orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  }, [orders]);

  const getOrderByNumber = useCallback((orderNumber: string): Order | undefined => {
    return orders.find(order => order.orderNumber === orderNumber);
  }, [orders]);

  const markNotificationRead = useCallback((notificationId: string) => {
    setNotifications(prev => prev.map(notif =>
      notif.id === notificationId ? { ...notif, read: true } : notif
    ));
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifications(prev => prev.map(notif => ({ ...notif, read: true })));
  }, []);

  const clearNotifications = useCallback(() => {
    setNotifications([]);
  }, []);

  const clearAllOrders = useCallback(() => {
    setOrders([]);
    sessionStorage.removeItem(ORDERS_KEY);
    localStorage.removeItem(ORDERS_LOCAL_KEY);
  }, []);

  const calculateStats = useCallback(() => ({
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    todayOrders: orders.filter(o => {
      const today = new Date().toDateString();
      return new Date(o.createdAt).toDateString() === today;
    }).length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
  }), [orders]);

  const getOrderStats = useCallback(() => calculateStats(), [calculateStats]);

  const stats = calculateStats();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <OrderContext.Provider value={{
      orders,
      notifications,
      unreadCount,
      addOrder,
      updateOrderStatus,
      getOrder,
      getOrderByNumber,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
      clearAllOrders,
      getOrderStats,
      stats,
    }}>
      {children}
    </OrderContext.Provider>
  );
}

export function useOrders() {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
}