import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Outlet, useLocation } from "react-router-dom";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { OrderProvider } from "./contexts/OrderContext";
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
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import AdminProducts from "./pages/admin/AdminProducts";
import AdminProductForm from "./pages/admin/AdminProductForm";
import AdminCustomers from "./pages/admin/AdminCustomers";
import AdminInventory from "./pages/admin/AdminInventory";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminInvoiceForm from "./pages/admin/AdminInvoiceForm";
import AdminAccounting from "./pages/admin/AdminAccounting";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminReports from "./pages/admin/AdminReports";
import AdminSeedProducts from "./pages/admin/AdminSeedProducts";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminCoupons from "./pages/admin/AdminCoupons";
import AdminReviews from "./pages/admin/AdminReviews";

// Protected Route using React Router v6 Outlet pattern (correct way)
function ProtectedLayout() {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center">
        <div className="text-[#C9A96E]">جاري التحميل...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AdminLogin />;
  }

  return <Outlet />;
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
        <OrderProvider>
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

              {/* Admin Login - public route */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Admin Panel - all protected */}
              <Route element={<ProtectedLayout />}>
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/orders" element={<AdminOrders />} />
                <Route path="/admin/orders/:id" element={<AdminOrderDetails />} />
                <Route path="/admin/products" element={<AdminProducts />} />
                <Route path="/admin/products/new" element={<AdminProductForm />} />
                <Route path="/admin/products/:id" element={<AdminProductForm />} />
                <Route path="/admin/customers" element={<AdminCustomers />} />
                <Route path="/admin/inventory" element={<AdminInventory />} />
                <Route path="/admin/invoices" element={<AdminInvoices />} />
                <Route path="/admin/invoices/new" element={<AdminInvoiceForm />} />
                <Route path="/admin/orders/new" element={<AdminInvoiceForm />} />
                <Route path="/admin/accounting" element={<AdminAccounting />} />
                <Route path="/admin/settings" element={<AdminSettings />} />
                <Route path="/admin/reports" element={<AdminReports />} />
                <Route path="/admin/seed" element={<AdminSeedProducts />} />
                <Route path="/admin/coupons" element={<AdminCoupons />} />
                <Route path="/admin/reviews" element={<AdminReviews />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </OrderProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
