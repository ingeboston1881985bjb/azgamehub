
import React, { useState, useEffect } from 'react';
import { ShoppingCart } from 'lucide-react';

interface CartIconProps {
  count: number;
}

const CartIcon: React.FC<CartIconProps> = ({ count }) => {
  const [isPulsing, setIsPulsing] = useState(false);

  // Add pulse animation whenever count changes
  useEffect(() => {
    if (count > 0) {
      setIsPulsing(true);
      const timer = setTimeout(() => setIsPulsing(false), 500);
      return () => clearTimeout(timer);
    }
  }, [count]);

  return (
    <div className="relative">
      <ShoppingCart 
        size={24} 
        className="text-white hover:text-azgaming-orange transition-colors duration-300" 
      />
      {count > 0 && (
        <div 
          className={`absolute -top-2 -right-2 flex items-center justify-center 
                    w-5 h-5 bg-azgaming-orange text-white text-xs font-bold
                    rounded-full shadow-lg ${isPulsing ? 'cart-badge-pulse' : ''}`}
        >
          {count}
        </div>
      )}
    </div>
  );
};

export default CartIcon;
