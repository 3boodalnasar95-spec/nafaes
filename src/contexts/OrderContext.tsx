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
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'status' | 'createdAt' | 'sentToWhatsApp'>) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  markOrderSent: (orderId: string) => void;
  getOrder: (orderId: string) => Order | undefined;
  getOrderByNumber: (orderNumber: string) => Order | undefined;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
  stats: {
    totalOrders: number;
    pendingOrders: number;
    todayOrders: number;
    totalRevenue: number;
  };
}

const ORDERS_KEY = 'nafaes_orders';
const NOTIFICATIONS_KEY = 'nafaes_notifications';

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

function generateId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function generateNotificationId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const storedOrders = localStorage.getItem(ORDERS_KEY);
    const storedNotifications = localStorage.getItem(NOTIFICATIONS_KEY);
    
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error('Error loading orders:', e);
      }
    }
    
    if (storedNotifications) {
      try {
        setNotifications(JSON.parse(storedNotifications));
      } catch (e) {
        console.error('Error loading notifications:', e);
      }
    }
  }, []);

  // Save to localStorage when orders change
  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  // Save to localStorage when notifications change
  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'orderNumber' | 'status' | 'createdAt' | 'sentToWhatsApp'>): string => {
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

    setOrders(prev => [newOrder, ...prev]);

    // Create notification
    const notification: Notification = {
      id: generateNotificationId(),
      type: 'order',
      title: 'طلب جديد! 🛒',
      message: `طلب جديد من ${orderData.customerName} - ${orderData.items.length} منتجات - الإجمالي: ${orderData.total.toFixed(3)} د.ك`,
      orderId: orderId,
      read: false,
      createdAt: now,
    };

    setNotifications(prev => [notification, ...prev]);

    // Also store current order for PDF generation
    localStorage.setItem('current_order_for_pdf', JSON.stringify(newOrder));

    return orderId;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  }, []);

  const markOrderSent = useCallback((orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, sentToWhatsApp: true } : order
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

  // Calculate stats
  const stats = {
    totalOrders: orders.length,
    pendingOrders: orders.filter(o => o.status === 'pending').length,
    todayOrders: orders.filter(o => {
      const today = new Date().toDateString();
      return new Date(o.createdAt).toDateString() === today;
    }).length,
    totalRevenue: orders.reduce((sum, o) => sum + o.total, 0),
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <OrderContext.Provider value={{
      orders,
      notifications,
      unreadCount,
      addOrder,
      updateOrderStatus,
      markOrderSent,
      getOrder,
      getOrderByNumber,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
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