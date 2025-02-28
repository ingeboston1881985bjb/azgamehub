
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
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

function App() {
  useEffect(() => {
    // Scroll to top on initial render
    window.scrollTo(0, 0);
  }, []);

  return (
    <AdminProvider>
      <CartProvider>
        <Router>
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
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/products" element={<ProductList />} />
            <Route path="/admin/products/new" element={<ProductForm />} />
            <Route path="/admin/products/edit/:id" element={<ProductForm />} />
            <Route path="/admin/pages" element={<PageList />} />
            <Route path="/admin/pages/new" element={<PageForm />} />
            <Route path="/admin/pages/edit/:id" element={<PageForm />} />
            <Route path="/admin/posts" element={<PostList />} />
            <Route path="/admin/posts/new" element={<PostForm />} />
            <Route path="/admin/posts/edit/:id" element={<PostForm />} />
            <Route path="/admin/banners" element={<BannerList />} />
            <Route path="/admin/banners/new" element={<BannerForm />} />
            <Route path="/admin/banners/edit/:id" element={<BannerForm />} />
            <Route path="/admin/homepage" element={<HomepageCustomization />} />
            <Route path="/admin/settings" element={<Settings />} />
            
            {/* Catch all and redirect */}
            <Route path="/404" element={<NotFound />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
        <Toaster position="top-right" richColors />
      </CartProvider>
    </AdminProvider>
  );
}

export default App;
