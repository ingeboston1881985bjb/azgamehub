
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingCart, Gamepad2, Award, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import GameCard from '../components/GameCard';
import { ps4Games, ps5Games, pcGames, bannerImages } from '../lib/gameData';

const Index: React.FC = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // Get 4 games from each platform for the featured section
  const featuredPS4Games = ps4Games.slice(0, 4);
  const featuredPS5Games = ps5Games.slice(0, 4);
  const featuredPCGames = pcGames.slice(0, 4);

  return (
    <div className="min-h-screen bg-gradient-to-b from-azgaming-black to-azgaming-gray/95 text-white">
      <Navbar />
      
      {/* Hero Section with Animation */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row items-center">
            <div className="w-full md:w-1/2 mb-8 md:mb-0">
              <span className="inline-block px-4 py-1 bg-azgaming-orange/10 text-azgaming-orange rounded-full text-sm font-medium mb-4 animate-fade-in">
                Ultimate Gaming Experience
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight animate-fade-in" style={{animationDelay: '0.1s'}}>
                Level Up Your <span className="hero-text-gradient">Gaming</span> Experience
              </h1>
              <p className="text-lg text-gray-300 mb-8 max-w-xl animate-fade-in" style={{animationDelay: '0.2s'}}>
                Discover the latest games and accessories for PS4, PS5, and PC. Take your gaming to the next level with our premium selection.
              </p>
              <div className="flex flex-wrap gap-4 animate-fade-in" style={{animationDelay: '0.3s'}}>
                <Link 
                  to="/ps5" 
                  className="inline-flex items-center px-6 py-3 bg-azgaming-orange text-white font-medium rounded-lg hover:bg-azgaming-orange/90 transition-all duration-300 transform hover:translate-x-1 group"
                >
                  <ShoppingCart className="mr-2" size={20} />
                  Shop Now
                  <ChevronRight className="ml-1 transition-transform duration-300 group-hover:translate-x-1" size={18} />
                </Link>
                <Link 
                  to="/pc" 
                  className="inline-flex items-center px-6 py-3 bg-transparent border-2 border-azgaming-orange/50 text-white font-medium rounded-lg hover:border-azgaming-orange transition-all duration-300"
                >
                  Explore PC Games
                </Link>
              </div>
            </div>
            <div className="w-full md:w-1/2 relative">
              <div className="relative w-full h-[300px] md:h-[400px] rounded-xl overflow-hidden animate-float">
                <img 
                  src="https://images.unsplash.com/photo-1542751371-adc38448a05e?w=600&h=400&fit=crop" 
                  alt="Gaming Experience" 
                  className="w-full h-full object-cover rounded-xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-azgaming-black to-transparent"></div>
              </div>
              
              {/* Floating Elements */}
              <div className="absolute -bottom-5 -left-5 bg-azgaming-black/80 backdrop-blur-md p-4 rounded-lg border border-azgaming-gray/20 shadow-xl animate-float" style={{animationDelay: '0.5s'}}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-azgaming-orange/20 rounded-full">
                    <Gamepad2 className="text-azgaming-orange" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Premium Games</h3>
                    <p className="text-xs text-gray-400">Latest releases</p>
                  </div>
                </div>
              </div>
              
              <div className="absolute -top-5 -right-5 bg-azgaming-black/80 backdrop-blur-md p-4 rounded-lg border border-azgaming-gray/20 shadow-xl animate-float" style={{animationDelay: '0.7s'}}>
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-azgaming-green/20 rounded-full">
                    <Award className="text-azgaming-green" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">Top Quality</h3>
                    <p className="text-xs text-gray-400">Authentic products</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Banner Section - Trending Games */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Banner 
            title="New & Trending Games"
            subtitle="Check out the hottest and most popular games right now."
            imageUrl={bannerImages.featuredGames}
            buttonText="Browse All Games"
            buttonLink="/ps5"
            size="large"
          />
        </div>
      </section>

      {/* Featured PS5 Games */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured PS5 Games</h2>
            <Link to="/ps5" className="text-azgaming-orange hover:text-azgaming-orange/80 inline-flex items-center transition-colors duration-300">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredPS5Games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Anti-Lag Software Banner */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Banner 
            title="Boost Your PC Gaming Performance"
            subtitle="Say goodbye to lag with our premium anti-lag software. Play smoother and faster!"
            imageUrl={bannerImages.antiLagSoftware}
            buttonText="Download Now"
            buttonLink="/pc"
            gradient="from-azgaming-black/90 via-azgaming-black/70 to-transparent"
            align="right"
          />
        </div>
      </section>
      
      {/* Featured PS4 Games */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured PS4 Games</h2>
            <Link to="/ps4" className="text-azgaming-orange hover:text-azgaming-orange/80 inline-flex items-center transition-colors duration-300">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredPS4Games.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Hot Products Banner */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <Banner 
            title="Hot Deals This Week"
            subtitle="Limited time offers on the most popular games. Don't miss out!"
            imageUrl={bannerImages.hotProducts}
            buttonText="View Deals"
            buttonLink="/ps4"
            size="medium"
          />
        </div>
      </section>

      {/* Featured PC Games */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Featured PC Games</h2>
            <Link to="/pc" className="text-azgaming-orange hover:text-azgaming-orange/80 inline-flex items-center transition-colors duration-300">
              View all <ArrowRight size={16} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredPCGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-12 md:py-16 bg-azgaming-black/50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Choose AZgaming</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">We provide the best gaming experience with quality products and excellent service.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-azgaming-gray/20 backdrop-blur-sm p-6 rounded-xl border border-azgaming-gray/10 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-azgaming-orange/20 rounded-full flex items-center justify-center mb-4">
                <ShoppingCart className="text-azgaming-orange" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Authentic Products</h3>
              <p className="text-gray-300">We only sell genuine games and accessories from authorized distributors.</p>
            </div>
            
            <div className="bg-azgaming-gray/20 backdrop-blur-sm p-6 rounded-xl border border-azgaming-gray/10 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-azgaming-green/20 rounded-full flex items-center justify-center mb-4">
                <Award className="text-azgaming-green" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Quality Guaranteed</h3>
              <p className="text-gray-300">Every product is tested and guaranteed to meet our high quality standards.</p>
            </div>
            
            <div className="bg-azgaming-gray/20 backdrop-blur-sm p-6 rounded-xl border border-azgaming-gray/10 transition-transform duration-300 hover:-translate-y-2">
              <div className="w-14 h-14 bg-azgaming-orange/20 rounded-full flex items-center justify-center mb-4">
                <Gamepad2 className="text-azgaming-orange" size={28} />
              </div>
              <h3 className="text-xl font-bold mb-2">Expert Support</h3>
              <p className="text-gray-300">Our team of gaming enthusiasts is always ready to help with expert advice.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
