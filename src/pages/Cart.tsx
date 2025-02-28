
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowLeft, Plus, Minus } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { toast } from "sonner";

const Cart: React.FC = () => {
  const { 
    cartItems, 
    removeFromCart, 
    increaseQuantity, 
    decreaseQuantity, 
    getCartTotal,
    clearCart
  } = useCart();

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleClearCart = () => {
    if (cartItems.length > 0) {
      clearCart();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-azgaming-black to-azgaming-gray/95 text-white">
      <Navbar />
      
      {/* Cart Section */}
      <section className="pt-28 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Your Cart</h1>
            <p className="text-gray-400">
              {cartItems.length === 0 
                ? "Your cart is empty." 
                : `You have ${cartItems.length} item${cartItems.length !== 1 ? 's' : ''} in your cart.`}
            </p>
          </div>
          
          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 overflow-hidden">
                  {/* Header */}
                  <div className="grid grid-cols-12 gap-4 p-4 border-b border-azgaming-gray/30 bg-azgaming-black/30 hidden md:grid">
                    <div className="col-span-7 text-gray-400 font-medium">Product</div>
                    <div className="col-span-2 text-gray-400 font-medium text-center">Quantity</div>
                    <div className="col-span-3 text-gray-400 font-medium text-right">Total</div>
                  </div>
                  
                  {/* Items */}
                  <div className="divide-y divide-azgaming-gray/30">
                    {cartItems.map((item) => (
                      <div key={item.id} className="p-4 animate-fade-in">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                          {/* Product Info (mobile and desktop) */}
                          <div className="col-span-1 md:col-span-7">
                            <div className="flex items-center space-x-4">
                              <img 
                                src={item.image} 
                                alt={item.title} 
                                className="w-20 h-20 object-cover rounded-lg"
                              />
                              <div className="flex-1">
                                <h3 className="font-bold mb-1 md:text-lg">{item.title}</h3>
                                <p className="text-gray-400 text-sm mb-1">Platform: {item.platform}</p>
                                <p className="text-azgaming-orange font-medium md:hidden">
                                  ${item.price.toFixed(2)}
                                </p>
                                
                                {/* Mobile Only Controls */}
                                <div className="flex items-center space-x-4 mt-2 md:hidden">
                                  <div className="flex items-center space-x-2">
                                    <button
                                      onClick={() => decreaseQuantity(item.id)}
                                      className="bg-azgaming-gray/50 hover:bg-azgaming-gray p-1 rounded-md transition-colors duration-300"
                                    >
                                      <Minus size={14} />
                                    </button>
                                    <span className="w-8 text-center">{item.quantity}</span>
                                    <button
                                      onClick={() => increaseQuantity(item.id)}
                                      className="bg-azgaming-gray/50 hover:bg-azgaming-gray p-1 rounded-md transition-colors duration-300"
                                    >
                                      <Plus size={14} />
                                    </button>
                                  </div>
                                  
                                  <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-500 hover:text-red-400 transition-colors duration-300"
                                  >
                                    <Trash2 size={18} />
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                          
                          {/* Quantity Controls (desktop only) */}
                          <div className="col-span-2 hidden md:flex justify-center items-center space-x-2">
                            <button
                              onClick={() => decreaseQuantity(item.id)}
                              className="bg-azgaming-gray/50 hover:bg-azgaming-gray p-1 rounded-md transition-colors duration-300"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <button
                              onClick={() => increaseQuantity(item.id)}
                              className="bg-azgaming-gray/50 hover:bg-azgaming-gray p-1 rounded-md transition-colors duration-300"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                          
                          {/* Price and Remove (desktop only) */}
                          <div className="col-span-3 hidden md:flex justify-between items-center">
                            <span className="font-bold text-lg">
                              ${(item.price * item.quantity).toFixed(2)}
                            </span>
                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-red-500 hover:text-red-400 transition-colors duration-300"
                              aria-label="Remove item"
                            >
                              <Trash2 size={20} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Cart Actions */}
                  <div className="p-4 flex justify-between border-t border-azgaming-gray/30 bg-azgaming-black/30">
                    <button
                      onClick={handleClearCart}
                      className="text-red-500 hover:text-red-400 transition-colors duration-300 flex items-center gap-2"
                    >
                      <Trash2 size={16} />
                      <span>Clear Cart</span>
                    </button>
                    
                    <Link 
                      to="/" 
                      className="text-azgaming-orange hover:text-azgaming-orange/80 transition-colors duration-300 flex items-center gap-2"
                    >
                      <ArrowLeft size={16} />
                      <span>Continue Shopping</span>
                    </Link>
                  </div>
                </div>
              </div>
              
              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6">
                  <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Subtotal</span>
                      <span className="font-medium">${getCartTotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Shipping</span>
                      <span className="font-medium">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tax</span>
                      <span className="font-medium">${(getCartTotal() * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="border-t border-azgaming-gray/30 pt-4 flex justify-between">
                      <span className="font-bold">Total</span>
                      <span className="font-bold text-xl text-azgaming-orange">
                        ${(getCartTotal() * 1.1).toFixed(2)}
                      </span>
                    </div>
                  </div>
                  
                  <Link
                    to="/checkout"
                    className="btn-checkout w-full justify-center"
                  >
                    <ShoppingCart size={18} />
                    Proceed to Checkout
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-8 text-center">
              <div className="flex justify-center mb-4">
                <ShoppingCart size={64} className="text-azgaming-gray/80" />
              </div>
              <h2 className="text-2xl font-bold mb-3">Your cart is empty</h2>
              <p className="text-gray-400 mb-6">
                Looks like you haven't added any games to your cart yet.
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-azgaming-orange text-white font-medium rounded-lg hover:bg-azgaming-orange/90 transition-all duration-300"
              >
                <ArrowLeft className="mr-2" size={18} />
                Start Shopping
              </Link>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Cart;
