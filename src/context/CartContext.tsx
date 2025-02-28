import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { toast } from "sonner";

// Define types
export interface GameItem {
  id: string;
  title: string;
  price: number;
  image: string;
  platform: 'PS4' | 'PS5' | 'PC';
}

interface CartItem extends GameItem {
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: GameItem) => void;
  removeFromCart: (id: string) => void;
  increaseQuantity: (id: string) => void;
  decreaseQuantity: (id: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

// Create context
const CartContext = createContext<CartContextType | undefined>(undefined);

// Create provider component
export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('azgaming-cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to parse cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('azgaming-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Add item to cart
  const addToCart = (item: GameItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      
      if (existingItem) {
        // If item already in cart, increase quantity
        const updatedItems = prevItems.map(cartItem => 
          cartItem.id === item.id 
            ? { ...cartItem, quantity: cartItem.quantity + 1 } 
            : cartItem
        );
        toast.success(`Added another ${item.title} to cart`);
        return updatedItems;
      } else {
        // Add new item to cart
        toast.success(`${item.title} added to cart`);
        return [...prevItems, { ...item, quantity: 1 }];
      }
    });
  };

  // Remove item from cart
  const removeFromCart = (id: string) => {
    setCartItems(prevItems => {
      const item = prevItems.find(item => item.id === id);
      if (item) {
        toast.info(`${item.title} removed from cart`);
      }
      return prevItems.filter(item => item.id !== id);
    });
  };

  // Increase item quantity
  const increaseQuantity = (id: string) => {
    setCartItems(prevItems => 
      prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity + 1 } 
          : item
      )
    );
  };

  // Decrease item quantity
  const decreaseQuantity = (id: string) => {
    setCartItems(prevItems => {
      // If quantity is 1, remove the item
      if (prevItems.find(item => item.id === id)?.quantity === 1) {
        const item = prevItems.find(item => item.id === id);
        if (item) {
          toast.info(`${item.title} removed from cart`);
        }
        return prevItems.filter(item => item.id !== id);
      }
      
      // Otherwise, decrease quantity
      return prevItems.map(item => 
        item.id === id 
          ? { ...item, quantity: item.quantity - 1 } 
          : item
      );
    });
  };

  // Clear cart
  const clearCart = () => {
    setCartItems([]);
    toast.info("Cart cleared");
  };

  // Calculate total price
  const getCartTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity, 
      0
    );
  };

  // Get total number of items
  const getCartCount = () => {
    return cartItems.reduce(
      (count, item) => count + item.quantity, 
      0
    );
  };

  return (
    <CartContext.Provider value={{
      cartItems,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
      getCartTotal,
      getCartCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Create custom hook for using cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
