import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { Toaster } from "sonner";
import Index from "./pages/Index";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminAccounting from "./pages/admin/AdminAccounting";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminReports from "./pages/admin/AdminReports";
import AdminSeedProducts from "./pages/admin/AdminSeedProducts";
import AdminLogin from "./pages/admin/AdminLogin";
import { useAuth } from "./contexts/AuthContext";
import { Navigate } from "react-router-dom";

// Protected Route Component
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-[#C9A96E]">جاري التحميل...</div>
      </div>
    );
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }
  
  return <>{children}</>;
}

// Admin Layout with Routes
function AdminRoutes() {
  return (
    <ProtectedRoute>
      <Routes>
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrders />} />
        <Route path="/admin/products" element={<AdminProducts />} />
        <Route path="/admin/products/new" element={<AdminProductForm />} />
        <Route path="/admin/products/:id" element={<AdminProductForm />} />
        <Route path="/admin/customers" element={<AdminCustomers />} />
        <Route path="/admin/inventory" element={<AdminInventory />} />
        <Route path="/admin/invoices" element={<AdminInvoices />} />
        <Route path="/admin/accounting" element={<AdminAccounting />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route path="/admin/reports" element={<AdminReports />} />
        <Route path="/admin/seed" element={<AdminSeedProducts />} />
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </ProtectedRoute>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <BrowserRouter>
          <Toaster 
            position="top-center"
            toastOptions={{
              style: {
                fontFamily: 'Tajawal, sans-serif',
              },
            }}
          />
          <Routes>
            {/* Main Site */}
            <Route path="/" element={<Index />} />
            <Route path="/products" element={<Products />} />
            <Route path="/product/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/contact" element={<Contact />} />
            
            {/* Admin Panel */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;