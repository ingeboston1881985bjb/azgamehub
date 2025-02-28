
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { GameItem, useCart } from '../context/CartContext';

interface GameCardProps {
  game: GameItem;
}

const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const { addToCart } = useCart();
  
  // Format price for display
  const formattedPrice = game.price === 0 
    ? 'Free to Play' 
    : `$${game.price.toFixed(2)}`;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(game);
  };

  return (
    <div className="game-card group animate-fade-in">
      {/* Game image with overlay */}
      <div className="game-card-img-container">
        <div className="absolute inset-0 bg-azgaming-gray animate-pulse"></div>
        <img 
          src={game.image} 
          alt={game.title} 
          className="game-card-img opacity-0 transition-opacity duration-500"
          onLoad={(e) => {
            const target = e.target as HTMLImageElement;
            target.classList.remove('opacity-0');
            target.classList.add('opacity-100');
          }}
        />
        
        {/* Price tag */}
        <div className="price-tag transform translate-y-0 group-hover:translate-y-1 transition-transform duration-300">
          {formattedPrice}
        </div>
        
        {/* Gradient overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-azgaming-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      
      {/* Game details */}
      <div className="game-card-content">
        <h3 className="text-lg font-bold text-white truncate">{game.title}</h3>
        <div className="flex justify-between items-center mt-2">
          <span className="text-sm text-gray-300">{game.platform}</span>
          
          {/* Add to cart button */}
          <button 
            className="btn-add-to-cart opacity-90 group-hover:opacity-100 transform translate-y-0 group-hover:translate-y-0 transition-all duration-300"
            onClick={handleAddToCart}
            aria-label={`Add ${game.title} to cart`}
          >
            <ShoppingCart size={16} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameCard;
