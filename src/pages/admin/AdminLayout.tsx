import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingCart, Package, Users,
  DollarSign, Settings, LogOut, Menu, X,
  Bell, Warehouse, Receipt, BarChart3, Database
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import { getNotifications } from '@/lib/db-operations';
import { useEffect, useState as useStateReact } from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useStateReact<any[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'لوحة التحكم', exact: true },
    { path: '/admin/orders', icon: ShoppingCart, label: 'الطلبات' },
    { path: '/admin/products', icon: Package, label: 'المنتجات' },
    { path: '/admin/inventory', icon: Warehouse, label: 'المخزون' },
    { path: '/admin/customers', icon: Users, label: 'العملاء' },
    { path: '/admin/invoices', icon: Receipt, label: 'الفواتير' },
    { path: '/admin/accounting', icon: DollarSign, label: 'المحاسبة' },
    { path: '/admin/reports', icon: BarChart3, label: 'التقارير' },
    { path: '/admin/settings', icon: Settings, label: 'الإعدادات' },
  ];

  // Load notifications
  useEffect(() => {
    const loadNotifications = async () => {
      const data = await getNotifications();
      setNotifications(data.slice(0, 10));
    };
    loadNotifications();
    
    // Refresh every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, []);

  const unreadCount = notifications.filter(n => !n.read).length;

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] flex">
      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 right-0 z-50 w-64 bg-[#1A1A1A] text-white transform transition-transform duration-300 lg:translate-x-0",
        sidebarOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-[#333]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#C9A96E] to-[#D4AF37] flex items-center justify-center">
              <span className="text-white font-bold">ن</span>
            </div>
            <div>
              <span className="font-bold">NAFAES</span>
              <span className="block text-[10px] text-[#888]">لوحة التحكم</span>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Menu */}
        <nav className="p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive(item.path, item.exact)
                    ? "bg-[#C9A96E] text-white"
                    : "text-[#888] hover:bg-[#333] hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          
          {/* Seed Products - Dev Tool */}
          <Link
            to="/admin/seed"
            onClick={() => setSidebarOpen(false)}
            className={cn(
              "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors border border-dashed border-[#C9A96E]/50",
              isActive('/admin/seed')
                ? "bg-[#C9A96E] text-white border-transparent"
                : "text-[#C9A96E] hover:bg-[#C9A96E]/10 border-[#C9A96E]/30"
            )}
          >
            <Database className="w-5 h-5" />
            <span>إضافة المنتجات</span>
          </Link>
        </nav>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#333] space-y-1">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-[#888] hover:bg-[#333] hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>تسجيل الخروج</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:mr-64">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#E8E0D5] flex items-center justify-between px-4 lg:px-6 sticky top-0 z-40">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[#1A1A1A]"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-[#1A1A1A]">لوحة تحكم نفائس</h1>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Notifications Bell */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-3 bg-[#FAF8F5] border border-[#E8E0D5] rounded-xl hover:bg-[#F5F0E8] transition-colors"
              >
                <Bell className="w-5 h-5 text-[#6B6B6B]" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-xl border border-[#E8E0D5] shadow-2xl z-50 max-h-96 overflow-y-auto">
                  <div className="p-4 border-b border-[#E8E0D5] sticky top-0 bg-white">
                    <h3 className="font-bold text-[#1A1A1A]">الإشعارات</h3>
                  </div>
                  <div>
                    {notifications.length === 0 ? (
                      <div className="p-8 text-center text-[#6B6B6B]">
                        <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>لا توجد إشعارات</p>
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div 
                          key={notif.id} 
                          className={`p-4 border-b border-[#E8E0D5] last:border-0 hover:bg-[#FAF8F5] cursor-pointer ${
                            !notif.read ? 'bg-[#C9A96E]/5' : ''
                          }`}
                        >
                          <p className="font-medium text-[#1A1A1A] text-sm">{notif.title}</p>
                          <p className="text-sm text-[#6B6B6B] mt-1 whitespace-pre-line">{notif.message}</p>
                          <p className="text-xs text-[#C9A96E] mt-2">
                            {new Date(notif.created_at).toLocaleDateString('ar-SA', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <a
              href="https://wa.me/96566377312"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 bg-[#25D366] text-white rounded-full hover:bg-[#20BD5A] transition-colors text-sm font-medium"
            >
              <span>واتساب</span>
            </a>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {children}
        </main>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
}