
import React, { useState } from 'react';
import { X } from 'lucide-react';

interface AntiLagBannerProps {
  position?: 'top' | 'bottom';
  dismissable?: boolean;
}

const AntiLagBanner: React.FC<AntiLagBannerProps> = ({ 
  position = 'top',
  dismissable = false
}) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) {
    return null;
  }

  return (
    <div 
      className={`fixed ${position === 'top' ? 'top-0' : 'bottom-0'} left-0 right-0 z-50 bg-gradient-to-r from-azgaming-orange to-azgaming-orange/90 text-white py-2 px-4 flex items-center justify-center shadow-md`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex-1 text-center text-sm">
          <strong>Anti-Lag Software:</strong> Boost your PC gaming performance with our anti-lag software. 
          <a href="/download/anti-lag" className="underline ml-2 font-semibold hover:text-azgaming-black transition-colors">
            Download Now
          </a>
        </div>
        
        {dismissable && (
          <button 
            onClick={() => setDismissed(true)}
            className="ml-4 text-white hover:text-azgaming-black transition-colors"
            aria-label="Dismiss banner"
          >
            <X size={18} />
          </button>
        )}
      </div>
    </div>
  );
};

export default AntiLagBanner;
