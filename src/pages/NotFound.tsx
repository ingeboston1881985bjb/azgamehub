
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-azgaming-black to-azgaming-gray/95 text-white">
      <Navbar />
      
      <div className="container mx-auto px-4 py-32 md:py-40 flex flex-col items-center justify-center text-center">
        <h1 className="text-9xl font-bold text-azgaming-orange mb-6">404</h1>
        <h2 className="text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-xl text-gray-300 max-w-md mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center px-6 py-3 bg-azgaming-orange text-white font-medium rounded-lg hover:bg-azgaming-orange/90 transition-all duration-300"
        >
          <ArrowLeft className="mr-2" size={18} />
          Back to Home
        </Link>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
