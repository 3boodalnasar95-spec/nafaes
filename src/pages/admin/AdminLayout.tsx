import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Package, Users, ShoppingCart, Receipt, 
  DollarSign, Warehouse, Settings, LogOut, Menu, X,
  Bell, TrendingUp, AlertTriangle, Clock
} from 'lucide-react';
import { useState, useEffect } from 'react';
import { cn } from '@/lib/utils';
import { isSupabaseConfigured } from '@/lib/supabase';
import { getDashboardStats } from '@/lib/db-operations';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<{type: string; message: string; time: string}[]>([]);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'لوحة التحكم', exact: true },
    { path: '/admin/products', icon: Package, label: 'المنتجات' },
    { path: '/admin/inventory', icon: Warehouse, label: 'المخزون' },
    { path: '/admin/orders', icon: ShoppingCart, label: 'الطلبات' },
    { path: '/admin/invoices', icon: Receipt, label: 'الفواتير' },
    { path: '/admin/customers', icon: Users, label: 'العملاء' },
    { path: '/admin/reports', icon: TrendingUp, label: 'التقارير' },
    { path: '/admin/accounting', icon: DollarSign, label: 'المحاسبة' },
    { path: '/admin/settings', icon: Settings, label: 'الإعدادات' },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
    navigate('/');
  };

  useEffect(() => {
    // Load notifications
    const loadNotifications = async () => {
      if (isSupabaseConfigured) {
        const stats = await getDashboardStats();
        const notifs = [];
        
        if (stats.pending_orders > 0) {
          notifs.push({
            type: 'warning',
            message: `لديك ${stats.pending_orders} طلب معلقة`,
            time: 'الآن'
          });
        }
        if (stats.low_stock_products > 0) {
          notifs.push({
            type: 'danger',
            message: `${stats.low_stock_products} منتجات منخفضة المخزون`,
            time: 'الآن'
          });
        }
        if (stats.today_orders > 0) {
          notifs.push({
            type: 'success',
            message: `${stats.today_orders} طلبات جديدة اليوم`,
            time: 'اليوم'
          });
        }
        
        setNotifications(notifs);
      }
    };
    
    loadNotifications();
  }, []);

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
        </nav>

        {/* Logout */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#333]">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-lg text-[#888] hover:bg-[#333] hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5" />
            <span>العودة للموقع</span>
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
          
          <div className="flex items-center gap-4">
            {/* Notifications */}
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-[#6B6B6B] hover:text-[#C9A96E] transition-colors"
              >
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
                )}
              </button>
              
              {showNotifications && (
                <div className="absolute left-0 top-full mt-2 w-80 bg-white rounded-xl border border-[#E8E0D5] shadow-lg z-50">
                  <div className="p-4 border-b border-[#E8E0D5]">
                    <h3 className="font-bold text-[#1A1A1A]">الإشعارات</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {notifications.length === 0 ? (
                      <div className="p-4 text-center text-[#6B6B6B]">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p>لا توجد إشعارات جديدة</p>
                      </div>
                    ) : (
                      notifications.map((notif, i) => (
                        <div key={i} className="p-4 border-b border-[#E8E0D5] last:border-0 hover:bg-[#FAF8F5]">
                          <div className="flex items-start gap-3">
                            <div className={`p-2 rounded-full ${
                              notif.type === 'warning' ? 'bg-orange-100 text-orange-500' :
                              notif.type === 'danger' ? 'bg-red-100 text-red-500' :
                              'bg-green-100 text-green-500'
                            }`}>
                              {notif.type === 'danger' ? <AlertTriangle className="w-4 h-4" /> :
                               notif.type === 'warning' ? <Clock className="w-4 h-4" /> :
                               <TrendingUp className="w-4 h-4" />}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm text-[#1A1A1A]">{notif.message}</p>
                              <p className="text-xs text-[#6B6B6B] mt-1">{notif.time}</p>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#C9A96E] rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-bold">أ</span>
              </div>
              <span className="hidden sm:block text-sm text-[#1A1A1A]">المدير</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 lg:p-6">
          {!isSupabaseConfigured && (
            <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl text-yellow-800">
              <p className="font-medium">⚠️ لم يتم إعداد قاعدة البيانات</p>
              <p className="text-sm mt-1">يرجى إضافة Supabase للمتابعة</p>
            </div>
          )}
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