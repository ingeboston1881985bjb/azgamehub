
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Index from './pages/Index';
import PS4 from './pages/PS4';
import PS5 from './pages/PS5';
import PCGame from './pages/PCGame';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import NotFound from './pages/NotFound';
import { CartProvider } from './context/CartContext';
import { AdminProvider } from './context/AdminContext';
import { Toaster } from "sonner";
import AntiLagBanner from './components/AntiLagBanner';
import { useAdmin } from './context/AdminContext';

// Admin Routes
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import ProductList from './pages/admin/products/ProductList';
import ProductForm from './pages/admin/products/ProductForm';
import PageList from './pages/admin/pages/PageList';
import PageForm from './pages/admin/pages/PageForm';
import PostList from './pages/admin/posts/PostList';
import PostForm from './pages/admin/posts/PostForm';
import BannerList from './pages/admin/banners/BannerList';
import BannerForm from './pages/admin/banners/BannerForm';
import HomepageCustomization from './pages/admin/HomepageCustomization';
import Settings from './pages/admin/Settings';

import './App.css';

// Admin authentication guard
const RequireAuth = ({ children }) => {
  const { isAuthenticated } = useAdmin();
  const location = useLocation();

  if (!isAuthenticated && location.pathname.startsWith('/admin') && location.pathname !== '/admin/login') {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
};

function App() {
  useEffect(() => {
    // Scroll to top on initial render
    window.scrollTo(0, 0);
  }, []);

  return (
    <AdminProvider>
      <CartProvider>
        <Router>
          <AntiLagBanner />
          <Routes>
            {/* Customer-facing Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/ps4" element={<PS4 />} />
            <Route path="/ps5" element={<PS5 />} />
            <Route path="/pc" element={<PCGame />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            
            {/* Admin Routes */}
            <Route path="/admin/login" element={<AdminLogin />} />
            
            {/* Protected Admin Routes */}
            <Route path="/admin" element={
              <RequireAuth>
                <AdminDashboard />
              </RequireAuth>
            } />
            <Route path="/admin/products" element={
              <RequireAuth>
                <ProductList />
              </RequireAuth>
            } />
            <Route path="/admin/products/new" element={
              <RequireAuth>
                <ProductForm />
              </RequireAuth>
            } />
            <Route path="/admin/products/edit/:id" element={
              <RequireAuth>
                <ProductForm />
              </RequireAuth>
            } />
            <Route path="/admin/pages" element={
              <RequireAuth>
                <PageList />
              </RequireAuth>
            } />
            <Route path="/admin/pages/new" element={
              <RequireAuth>
                <PageForm />
              </RequireAuth>
            } />
            <Route path="/admin/pages/edit/:id" element={
              <RequireAuth>
                <PageForm />
              </RequireAuth>
            } />
            <Route path="/admin/posts" element={
              <RequireAuth>
                <PostList />
              </RequireAuth>
            } />
            <Route path="/admin/posts/new" element={
              <RequireAuth>
                <PostForm />
              </RequireAuth>
            } />
            <Route path="/admin/posts/edit/:id" element={
              <RequireAuth>
                <PostForm />
              </RequireAuth>
            } />
            <Route path="/admin/banners" element={
              <RequireAuth>
                <BannerList />
              </RequireAuth>
            } />
            <Route path="/admin/banners/new" element={
              <RequireAuth>
                <BannerForm />
              </RequireAuth>
            } />
            <Route path="/admin/banners/edit/:id" element={
              <RequireAuth>
                <BannerForm />
              </RequireAuth>
            } />
            <Route path="/admin/homepage" element={
              <RequireAuth>
                <HomepageCustomization />
              </RequireAuth>
            } />
            <Route path="/admin/settings" element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            } />
            
            {/* Catch all and redirect */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
          <Toaster position="top-right" richColors />
        </Router>
      </CartProvider>
    </AdminProvider>
  );
}

export default App;
