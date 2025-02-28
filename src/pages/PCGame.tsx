
import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import GameCard from '../components/GameCard';
import Banner from '../components/Banner';
import { pcGames, bannerImages } from '../lib/gameData';
import { Search } from 'lucide-react';

const PCGame: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredGames, setFilteredGames] = useState(pcGames);
  const [sortOption, setSortOption] = useState('featured');

  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Filter and sort games when search query or sort option changes
  useEffect(() => {
    let result = [...pcGames];
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(game => 
        game.title.toLowerCase().includes(query)
      );
    }
    
    // Apply sorting
    switch (sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
        // Default is featured, which is the original order
        break;
    }
    
    setFilteredGames(result);
  }, [searchQuery, sortOption]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-azgaming-black to-azgaming-gray/95 text-white">
      <Navbar />
      
      {/* Banner */}
      <section className="pt-24 md:pt-32 pb-8">
        <div className="container mx-auto px-4 md:px-6">
          <Banner 
            title="PC Games"
            subtitle="Elevate your gaming with our premium collection of PC games."
            imageUrl={bannerImages.antiLagSoftware}
            size="medium"
          />
        </div>
      </section>
      
      {/* Filters and Search */}
      <section className="py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="bg-azgaming-gray/20 backdrop-blur-md rounded-xl p-4 md:p-6 border border-azgaming-gray/10">
            <div className="flex flex-col md:flex-row gap-4 justify-between">
              {/* Search */}
              <div className="relative w-full md:w-1/3">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50"
                />
              </div>
              
              {/* Sort Options */}
              <div className="w-full md:w-1/4">
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full py-3 px-4 bg-azgaming-black/50 border border-azgaming-gray/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-azgaming-orange/50 appearance-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name-asc">Name: A to Z</option>
                  <option value="name-desc">Name: Z to A</option>
                </select>
              </div>
            </div>
            
            {/* Results count */}
            <div className="mt-4 text-sm text-gray-400">
              Showing {filteredGames.length} of {pcGames.length} games
            </div>
          </div>
        </div>
      </section>
      
      {/* Games Grid */}
      <section className="py-8 md:py-12">
        <div className="container mx-auto px-4 md:px-6">
          {filteredGames.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredGames.map((game) => (
                <GameCard key={game.id} game={game} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-medium mb-2">No games found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default PCGame;
