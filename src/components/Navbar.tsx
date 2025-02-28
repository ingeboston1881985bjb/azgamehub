
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartIcon from './CartIcon';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { getCartCount } = useCart();
  
  // Check if the current path matches the given path
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  // Listen for scroll events to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-azgaming-black/95 backdrop-blur-md shadow-lg py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center"
          >
            <span className="text-2xl font-bold text-azgaming-orange">AZ</span>
            <span className="text-2xl font-bold text-white">gaming</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`nav-link ${isActive('/') ? 'active-nav-link' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/ps4" 
              className={`nav-link ${isActive('/ps4') ? 'active-nav-link' : ''}`}
            >
              PS4
            </Link>
            <Link 
              to="/ps5" 
              className={`nav-link ${isActive('/ps5') ? 'active-nav-link' : ''}`}
            >
              PS5
            </Link>
            <Link 
              to="/pc" 
              className={`nav-link ${isActive('/pc') ? 'active-nav-link' : ''}`}
            >
              PC Game
            </Link>
          </nav>

          {/* Cart Icon */}
          <Link to="/cart" className="ml-4 relative">
            <CartIcon count={getCartCount()} />
          </Link>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden ml-4 text-white focus:outline-none"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? (
              <X size={24} className="transition-transform duration-300 transform rotate-90" />
            ) : (
              <Menu size={24} className="transition-transform duration-300" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-azgaming-black/95 backdrop-blur-md animate-slide-up">
          <nav className="flex flex-col py-4 px-6 space-y-4">
            <Link 
              to="/" 
              className={`nav-link text-lg ${isActive('/') ? 'active-nav-link' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/ps4" 
              className={`nav-link text-lg ${isActive('/ps4') ? 'active-nav-link' : ''}`}
            >
              PS4
            </Link>
            <Link 
              to="/ps5" 
              className={`nav-link text-lg ${isActive('/ps5') ? 'active-nav-link' : ''}`}
            >
              PS5
            </Link>
            <Link 
              to="/pc" 
              className={`nav-link text-lg ${isActive('/pc') ? 'active-nav-link' : ''}`}
            >
              PC Game
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
