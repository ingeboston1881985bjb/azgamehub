
import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

interface BannerProps {
  title: string;
  subtitle: string;
  imageUrl: string;
  buttonText?: string;
  buttonLink?: string;
  gradient?: string;
  align?: 'left' | 'right' | 'center';
  size?: 'large' | 'medium' | 'small';
}

const Banner: React.FC<BannerProps> = ({
  title,
  subtitle,
  imageUrl,
  buttonText = 'Explore Now',
  buttonLink = '#',
  gradient = 'from-azgaming-black/80 to-transparent',
  align = 'left',
  size = 'medium'
}) => {
  // Determine banner height based on size
  const heightClass = 
    size === 'large' ? 'h-[500px] md:h-[600px]' : 
    size === 'medium' ? 'h-[300px] md:h-[400px]' : 
    'h-[200px] md:h-[250px]';

  // Determine text alignment
  const alignClass = 
    align === 'left' ? 'text-left items-start' : 
    align === 'right' ? 'text-right items-end' : 
    'text-center items-center';

  // Determine gradient direction
  const gradientDirection = 
    align === 'left' ? 'bg-gradient-to-r' : 
    align === 'right' ? 'bg-gradient-to-l' : 
    'bg-gradient-to-t';

  return (
    <div className={`banner ${heightClass} relative overflow-hidden rounded-xl`}>
      {/* Background Image with loading effect */}
      <div className="absolute inset-0 bg-azgaming-gray animate-pulse">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-opacity duration-500 opacity-0 onload:opacity-100"
          onLoad={(e) => {
            const target = e.target as HTMLImageElement;
            target.classList.remove('opacity-0');
            target.classList.add('opacity-100');
          }}
        />
      </div>

      {/* Gradient Overlay */}
      <div className={`absolute inset-0 ${gradientDirection} ${gradient}`}></div>

      {/* Content */}
      <div className={`banner-content ${alignClass} w-full md:w-3/4 lg:w-1/2 z-10`}>
        <div className="space-y-4 max-w-xl">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">{title}</h2>
          <p className="text-lg text-gray-200">{subtitle}</p>
          
          {buttonText && buttonLink && (
            <Link 
              to={buttonLink} 
              className="inline-flex items-center px-6 py-3 bg-azgaming-orange text-white font-medium rounded-lg hover:bg-azgaming-orange/90 transition-all duration-300 transform hover:translate-x-1 group"
            >
              {buttonText}
              <ArrowRight className="ml-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Banner;
