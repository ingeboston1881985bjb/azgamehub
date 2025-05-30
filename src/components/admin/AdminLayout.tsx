
import React, { ReactNode } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '../../context/AdminContext';
import { LayoutGrid, Package, FileText, Image, Home, LogOut, Settings, Menu, X } from 'lucide-react';
import { useState, useEffect } from 'react';

interface AdminLayoutProps {
  children: ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const { isAuthenticated, logout } = useAdmin();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile screen
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth < 768) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => {
      window.removeEventListener('resize', checkIfMobile);
    };
  }, []);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (!isAuthenticated) {
    return null;
  }

  // Get current path to highlight active link
  const currentPath = window.location.pathname;

  return (
    <div className="min-h-screen bg-azgaming-black text-white flex overflow-hidden">
      {/* Sidebar */}
      <div 
        className={`${isSidebarOpen ? 'w-64' : 'w-0 md:w-16'} bg-azgaming-gray transition-all duration-300 fixed inset-y-0 left-0 z-30`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-4 border-b border-azgaming-gray/50 flex items-center justify-between">
            {isSidebarOpen && (
              <div className="flex items-center">
                <span className="text-xl font-bold text-azgaming-orange">AZ</span>
                <span className="text-xl font-bold text-white">admin</span>
              </div>
            )}
            <button 
              onClick={toggleSidebar}
              className="text-white hover:text-azgaming-orange transition-colors p-1"
            >
              {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 py-4 overflow-y-auto">
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/admin" 
                  className={`flex items-center px-4 py-3 text-gray-300 hover:bg-azgaming-black/50 hover:text-azgaming-orange transition-colors ${currentPath === '/admin' ? 'bg-azgaming-black/30 text-azgaming-orange' : ''}`}
                >
                  <LayoutGrid size={20} className="flex-shrink-0" />
                  {isSidebarOpen && <span className="ml-3">Dashboard</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/products" 
                  className={`flex items-center px-4 py-3 text-gray-300 hover:bg-azgaming-black/50 hover:text-azgaming-orange transition-colors ${currentPath.includes('/admin/products') ? 'bg-azgaming-black/30 text-azgaming-orange' : ''}`}
                >
                  <Package size={20} className="flex-shrink-0" />
                  {isSidebarOpen && <span className="ml-3">Products</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/pages" 
                  className={`flex items-center px-4 py-3 text-gray-300 hover:bg-azgaming-black/50 hover:text-azgaming-orange transition-colors ${currentPath.includes('/admin/pages') ? 'bg-azgaming-black/30 text-azgaming-orange' : ''}`}
                >
                  <FileText size={20} className="flex-shrink-0" />
                  {isSidebarOpen && <span className="ml-3">Pages</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/banners" 
                  className={`flex items-center px-4 py-3 text-gray-300 hover:bg-azgaming-black/50 hover:text-azgaming-orange transition-colors ${currentPath.includes('/admin/banners') ? 'bg-azgaming-black/30 text-azgaming-orange' : ''}`}
                >
                  <Image size={20} className="flex-shrink-0" />
                  {isSidebarOpen && <span className="ml-3">Banners</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/homepage" 
                  className={`flex items-center px-4 py-3 text-gray-300 hover:bg-azgaming-black/50 hover:text-azgaming-orange transition-colors ${currentPath.includes('/admin/homepage') ? 'bg-azgaming-black/30 text-azgaming-orange' : ''}`}
                >
                  <Home size={20} className="flex-shrink-0" />
                  {isSidebarOpen && <span className="ml-3">Homepage</span>}
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/settings" 
                  className={`flex items-center px-4 py-3 text-gray-300 hover:bg-azgaming-black/50 hover:text-azgaming-orange transition-colors ${currentPath.includes('/admin/settings') ? 'bg-azgaming-black/30 text-azgaming-orange' : ''}`}
                >
                  <Settings size={20} className="flex-shrink-0" />
                  {isSidebarOpen && <span className="ml-3">Settings</span>}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Logout button */}
          <div className="p-4 border-t border-azgaming-gray/50">
            <button 
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-gray-300 hover:bg-azgaming-black/50 hover:text-azgaming-orange transition-colors rounded-lg"
            >
              <LogOut size={20} />
              {isSidebarOpen && <span className="ml-3">Logout</span>}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className={`${isSidebarOpen ? 'md:ml-64' : 'md:ml-16'} flex-1 transition-all duration-300 w-full`}>
        {/* Header */}
        <header className="bg-azgaming-black border-b border-azgaming-gray/50 py-3 px-4 md:px-6 flex items-center justify-between sticky top-0 z-20 mt-10">
          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white hover:text-azgaming-orange transition-colors"
            onClick={toggleSidebar}
          >
            <Menu size={24} />
          </button>

          <h1 className="text-xl font-bold text-white">{title}</h1>

          <div className="flex items-center gap-3">
            <Link 
              to="/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-sm text-gray-300 hover:text-azgaming-orange transition-colors"
            >
              View website
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
