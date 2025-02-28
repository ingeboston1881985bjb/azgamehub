
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-azgaming-black text-gray-300 py-12 border-t border-azgaming-gray/30">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company & Address */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center">
              <span className="text-2xl font-bold text-azgaming-orange">AZ</span>
              <span className="text-2xl font-bold text-white">gaming</span>
            </Link>
            <p className="text-sm leading-relaxed">
              The ultimate destination for all your gaming needs. Quality games, accessories, and more.
            </p>
            <div className="flex items-start space-x-2 text-sm">
              <MapPin size={18} className="text-azgaming-orange flex-shrink-0 mt-1" />
              <p>112 Wellington Parade, East Melbourne VIC 3002, Australia</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Phone size={18} className="text-azgaming-orange" />
              <p>+61 3 9412 5678</p>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <Mail size={18} className="text-azgaming-orange" />
              <p>contact@azgaming.com</p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-400 hover:text-azgaming-orange transition-colors duration-300">Home</Link>
              </li>
              <li>
                <Link to="/ps4" className="text-gray-400 hover:text-azgaming-orange transition-colors duration-300">PS4 Games</Link>
              </li>
              <li>
                <Link to="/ps5" className="text-gray-400 hover:text-azgaming-orange transition-colors duration-300">PS5 Games</Link>
              </li>
              <li>
                <Link to="/pc" className="text-gray-400 hover:text-azgaming-orange transition-colors duration-300">PC Games</Link>
              </li>
              <li>
                <Link to="/cart" className="text-gray-400 hover:text-azgaming-orange transition-colors duration-300">My Cart</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <a href="#" className="text-gray-400 hover:text-azgaming-orange transition-colors duration-300">Help Center</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-azgaming-orange transition-colors duration-300">Shipping Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-azgaming-orange transition-colors duration-300">Returns & Refunds</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-azgaming-orange transition-colors duration-300">Privacy Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-azgaming-orange transition-colors duration-300">Terms & Conditions</a>
              </li>
            </ul>
          </div>

          {/* Social & Newsletter */}
          <div>
            <h3 className="text-lg font-bold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4 mb-6">
              <a href="#" className="bg-azgaming-gray/50 hover:bg-azgaming-orange/90 p-2 rounded-full transition-colors duration-300">
                <Facebook size={20} className="text-white" />
              </a>
              <a href="#" className="bg-azgaming-gray/50 hover:bg-azgaming-orange/90 p-2 rounded-full transition-colors duration-300">
                <Twitter size={20} className="text-white" />
              </a>
              <a href="#" className="bg-azgaming-gray/50 hover:bg-azgaming-orange/90 p-2 rounded-full transition-colors duration-300">
                <Instagram size={20} className="text-white" />
              </a>
              <a href="#" className="bg-azgaming-gray/50 hover:bg-azgaming-orange/90 p-2 rounded-full transition-colors duration-300">
                <Youtube size={20} className="text-white" />
              </a>
            </div>
            
            <h3 className="text-lg font-bold text-white mb-4">Newsletter</h3>
            <form className="space-y-3">
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full bg-azgaming-gray/30 border border-azgaming-gray/50 rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange"
                />
                <button 
                  type="submit" 
                  className="absolute right-1 top-1 bg-azgaming-orange text-white px-4 py-2 rounded-lg hover:bg-azgaming-orange/90 transition-colors duration-300"
                >
                  Subscribe
                </button>
              </div>
              <p className="text-xs text-gray-500">Subscribe to get information about products and offers.</p>
            </form>
          </div>
        </div>

        <div className="border-t border-azgaming-gray/30 mt-12 pt-6 text-center text-sm text-gray-500">
          <p>© {new Date().getFullYear()} AZgaming. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
