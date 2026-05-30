import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, ShoppingCart, LogOut, Menu, X,
  Bell, Package, Users
} from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { useOrders } from '@/contexts/OrderContext';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { unreadCount } = useOrders();

  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: 'لوحة التحكم', exact: true },
    { path: '/admin/orders', icon: ShoppingCart, label: 'الطلبات' },
    { path: '/products', icon: Package, label: 'المتجر', external: true },
  ];

  const isActive = (path: string, exact?: boolean) => {
    if (exact) return location.pathname === path;
    return location.pathname.startsWith(path);
  };

  const handleLogout = () => {
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
            const content = (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => !item.external && setSidebarOpen(false)}
                target={item.external ? '_blank' : undefined}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors",
                  isActive(item.path, item.exact)
                    ? "bg-[#C9A96E] text-white"
                    : "text-[#888] hover:bg-[#333] hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
                {item.path === '/admin/orders' && unreadCount > 0 && (
                  <span className="mr-auto bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
                    {unreadCount}
                  </span>
                )}
              </Link>
            );
            return content;
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
            {unreadCount > 0 && (
              <div className="flex items-center gap-2 px-3 py-1 bg-[#C9A96E]/10 rounded-full">
                <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                <span className="text-sm text-[#C9A96E] font-medium">{unreadCount} طلب جديد</span>
              </div>
            )}
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