
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { useCart } from '../context/CartContext';
import { toast } from "sonner";

const Checkout: React.FC = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [orderPlaced, setOrderPlaced] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    zipCode: '',
    country: 'Australia',
    paymentMethod: 'credit-card'
  });

  // Form errors
  const [errors, setErrors] = useState({
    fullName: '',
    phoneNumber: '',
    address: '',
    city: '',
    zipCode: ''
  });

  // Redirect if cart is empty
  useEffect(() => {
    if (cartItems.length === 0 && !orderPlaced) {
      navigate('/cart');
      toast.error('Your cart is empty. Add some games first!');
    }
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [cartItems, navigate, orderPlaced]);

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    let valid = true;
    const newErrors = { ...errors };
    
    // Validate name
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required';
      valid = false;
    }
    
    // Validate phone
    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = 'Phone number is required';
      valid = false;
    } else if (!/^\d{10,}$/.test(formData.phoneNumber.replace(/[^0-9]/g, ''))) {
      newErrors.phoneNumber = 'Please enter a valid phone number';
      valid = false;
    }
    
    // Validate address
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
      valid = false;
    }
    
    // Validate city
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
      valid = false;
    }
    
    // Validate zip
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'Zip code is required';
      valid = false;
    } else if (!/^\d{4,6}$/.test(formData.zipCode.replace(/[^0-9]/g, ''))) {
      newErrors.zipCode = 'Please enter a valid zip/postal code';
      valid = false;
    }
    
    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Simulate order processing
      setTimeout(() => {
        setOrderPlaced(true);
        clearCart();
      }, 1500);
      
      toast.success('Processing your order...');
    } else {
      toast.error('Please fix the errors in the form');
    }
  };

  // Calculate order totals
  const subtotal = getCartTotal();
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  // Order success view
  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-azgaming-black to-azgaming-gray/95 text-white">
        <Navbar />
        
        <section className="pt-28 md:pt-32 pb-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-2xl mx-auto bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-3 bg-azgaming-green/20 rounded-full">
                  <CheckCircle size={64} className="text-azgaming-green" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
              <p className="text-xl text-gray-300 mb-6">
                Thank you for your purchase, {formData.fullName}!
              </p>
              <p className="mb-8 text-gray-400">
                We've sent a confirmation email with your order details.
                Your order will be shipped to your address soon.
              </p>
              
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-azgaming-orange text-white font-medium rounded-lg hover:bg-azgaming-orange/90 transition-all duration-300"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </section>
        
        <Footer />
      </div>
    );
  }

  // Checkout form view
  return (
    <div className="min-h-screen bg-gradient-to-b from-azgaming-black to-azgaming-gray/95 text-white">
      <Navbar />
      
      <section className="pt-28 md:pt-32 pb-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">Checkout</h1>
            <p className="text-gray-400">Complete your order by providing your details below.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2">
              <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6">
                <form onSubmit={handleSubmit}>
                  <h2 className="text-xl font-bold mb-6">Contact Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Full Name */}
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="fullName" className="block text-gray-300 mb-2">
                        Full Name<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`w-full bg-azgaming-black/50 border ${
                          errors.fullName ? 'border-red-500' : 'border-azgaming-gray/30'
                        } rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50`}
                        placeholder="John Doe"
                      />
                      {errors.fullName && (
                        <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>
                      )}
                    </div>
                    
                    {/* Phone Number */}
                    <div className="col-span-2 md:col-span-1">
                      <label htmlFor="phoneNumber" className="block text-gray-300 mb-2">
                        Phone Number<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className={`w-full bg-azgaming-black/50 border ${
                          errors.phoneNumber ? 'border-red-500' : 'border-azgaming-gray/30'
                        } rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50`}
                        placeholder="0412 345 678"
                      />
                      {errors.phoneNumber && (
                        <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>
                      )}
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-6">Shipping Information</h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {/* Address */}
                    <div className="col-span-2">
                      <label htmlFor="address" className="block text-gray-300 mb-2">
                        Address<span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        rows={3}
                        className={`w-full bg-azgaming-black/50 border ${
                          errors.address ? 'border-red-500' : 'border-azgaming-gray/30'
                        } rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50`}
                        placeholder="123 Main Street, Apartment 4B"
                      />
                      {errors.address && (
                        <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                      )}
                    </div>
                    
                    {/* City */}
                    <div>
                      <label htmlFor="city" className="block text-gray-300 mb-2">
                        City<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleChange}
                        className={`w-full bg-azgaming-black/50 border ${
                          errors.city ? 'border-red-500' : 'border-azgaming-gray/30'
                        } rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50`}
                        placeholder="Melbourne"
                      />
                      {errors.city && (
                        <p className="text-red-500 text-sm mt-1">{errors.city}</p>
                      )}
                    </div>
                    
                    {/* Zip Code */}
                    <div>
                      <label htmlFor="zipCode" className="block text-gray-300 mb-2">
                        Zip/Postal Code<span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="zipCode"
                        name="zipCode"
                        value={formData.zipCode}
                        onChange={handleChange}
                        className={`w-full bg-azgaming-black/50 border ${
                          errors.zipCode ? 'border-red-500' : 'border-azgaming-gray/30'
                        } rounded-lg py-3 px-4 text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50`}
                        placeholder="3002"
                      />
                      {errors.zipCode && (
                        <p className="text-red-500 text-sm mt-1">{errors.zipCode}</p>
                      )}
                    </div>
                    
                    {/* Country */}
                    <div className="col-span-2">
                      <label htmlFor="country" className="block text-gray-300 mb-2">
                        Country
                      </label>
                      <select
                        id="country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        className="w-full bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50 appearance-none cursor-pointer"
                      >
                        <option value="Australia">Australia</option>
                        <option value="New Zealand">New Zealand</option>
                        <option value="United States">United States</option>
                        <option value="United Kingdom">United Kingdom</option>
                      </select>
                    </div>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-6">Payment Method</h2>
                  
                  <div className="mb-8">
                    <div className="space-y-3">
                      {/* Credit Card */}
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="credit-card"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleChange}
                          className="mr-3 text-azgaming-orange"
                        />
                        <label htmlFor="credit-card" className="cursor-pointer">
                          Credit Card
                        </label>
                      </div>
                      
                      {/* PayPal */}
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          className="mr-3 text-azgaming-orange"
                        />
                        <label htmlFor="paypal" className="cursor-pointer">
                          PayPal
                        </label>
                      </div>
                      
                      {/* Bank Transfer */}
                      <div className="flex items-center">
                        <input
                          type="radio"
                          id="bank-transfer"
                          name="paymentMethod"
                          value="bank-transfer"
                          checked={formData.paymentMethod === 'bank-transfer'}
                          onChange={handleChange}
                          className="mr-3 text-azgaming-orange"
                        />
                        <label htmlFor="bank-transfer" className="cursor-pointer">
                          Bank Transfer
                        </label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between">
                    <Link 
                      to="/cart" 
                      className="btn-back"
                    >
                      <ArrowLeft size={18} />
                      Back to Cart
                    </Link>
                    
                    <button 
                      type="submit" 
                      className="btn-checkout"
                    >
                      Place Order
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl border border-azgaming-gray/10 p-6 sticky top-24">
                <h2 className="text-xl font-bold mb-6">Order Summary</h2>
                
                {/* Cart Items */}
                <div className="max-h-64 overflow-y-auto mb-6">
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center space-x-3">
                        <img 
                          src={item.image} 
                          alt={item.title} 
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium truncate">{item.title}</h4>
                          <div className="flex justify-between items-center text-sm text-gray-400">
                            <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                            <span>${(item.quantity * item.price).toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Totals */}
                <div className="space-y-4 mb-6 pb-6 border-b border-azgaming-gray/30">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Shipping</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Tax (10%)</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                </div>
                
                {/* Total */}
                <div className="flex justify-between items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-bold text-xl text-azgaming-orange">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Checkout;
