
import React from 'react';
import { useLocation } from 'react-router-dom';

const AntiLagBanner: React.FC = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  // Don't show banner on admin pages
  if (isAdminPage) {
    return null;
  }

  return (
    <div className="fixed-anti-lag-banner">
      <strong>Anti-Lag Software:</strong> Boost your PC gaming performance with our anti-lag software. 
      <a href="/download/anti-lag" className="underline ml-2 font-semibold hover:text-azgaming-black transition-colors">Download Now</a>
    </div>
  );
};

export default AntiLagBanner;
