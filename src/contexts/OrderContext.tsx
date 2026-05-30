import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

export interface OrderItem {
  productId: string;
  productNameAr: string;
  productNameEn: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  image?: string;
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
  pdfGenerated: boolean;
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
  addOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'status' | 'createdAt' | 'pdfGenerated'>) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  getOrder: (orderId: string) => Order | undefined;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  clearNotifications: () => void;
}

const ORDERS_KEY = 'nafaes_orders';
const NOTIFICATIONS_KEY = 'nafaes_notifications';

export const OrderContext = createContext<OrderContextType | undefined>(undefined);

function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hours = now.getHours().toString().padStart(2, '0');
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  return `NAF-${year}${month}${day}-${hours}${minutes}-${random}`;
}

function generateId(): string {
  return `order_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

function generateNotificationId(): string {
  return `notif_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

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

  useEffect(() => {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }, [notifications]);

  const addOrder = useCallback((orderData: Omit<Order, 'id' | 'orderNumber' | 'status' | 'createdAt' | 'pdfGenerated'>): string => {
    const orderId = generateId();
    const orderNumber = generateOrderNumber();
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderNumber,
      status: 'pending',
      createdAt: now,
      pdfGenerated: false,
    };

    setOrders(prev => [newOrder, ...prev]);

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

    localStorage.setItem('current_order_for_pdf', JSON.stringify(newOrder));

    return orderId;
  }, []);

  const updateOrderStatus = useCallback((orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  }, []);

  const getOrder = useCallback((orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
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

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <OrderContext.Provider value={{
      orders,
      notifications,
      unreadCount,
      addOrder,
      updateOrderStatus,
      getOrder,
      markNotificationRead,
      markAllNotificationsRead,
      clearNotifications,
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