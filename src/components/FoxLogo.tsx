import React from 'react';

interface FoxLogoProps {
  variant?: 'light' | 'dark' | 'mono';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showTagline?: boolean;
}

export const FoxLogo: React.FC<FoxLogoProps> = ({
  variant = 'dark',
  size = 'md',
  showTagline = false
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-2xl',
    lg: 'text-3xl',
    xl: 'text-4xl'
  };

  const isLight = variant === 'light';

  return (
    <div className="inline-flex items-center gap-2.5 select-none group cursor-pointer">
      {/* Minimal Geometric Fox Icon */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full transform transition-transform duration-300 group-hover:scale-105"
        >
          {/* Outer Ear & Crown Geometry */}
          <polygon
            points="50,15 86,10 74,48 50,34 26,48 14,10"
            fill="#C8102E"
          />
          {/* Inner Ear Contrast */}
          <polygon
            points="28,16 38,36 21,38"
            fill={isLight ? '#FFFFFF' : '#111827'}
            opacity="0.9"
          />
          <polygon
            points="72,16 79,38 62,36"
            fill={isLight ? '#FFFFFF' : '#111827'}
            opacity="0.9"
          />
          {/* Mid Face Cheeks */}
          <polygon
            points="50,34 74,48 82,72 50,62"
            fill="#B00D27"
          />
          <polygon
            points="50,34 26,48 18,72 50,62"
            fill="#C8102E"
          />
          {/* White Snout & Cheek Tufts */}
          <polygon
            points="50,62 82,72 68,88 50,78"
            fill={isLight ? '#F3F4F6' : '#FFFFFF'}
          />
          <polygon
            points="50,62 18,72 32,88 50,78"
            fill={isLight ? '#E5E7EB' : '#F9FAFB'}
          />
          {/* Sharp Nose Muzzle */}
          <polygon
            points="50,78 60,86 50,94 40,86"
            fill="#111827"
          />
          {/* Sleek Minimal Eyes */}
          <polygon
            points="38,50 45,54 36,56"
            fill={isLight ? '#030712' : '#111827'}
          />
          <polygon
            points="62,50 64,56 55,54"
            fill={isLight ? '#030712' : '#111827'}
          />
        </svg>
      </div>

      {/* Brand Text Wordmark */}
      <div className="flex flex-col leading-none">
        <div className="flex items-center tracking-tight">
          <span className={`font-black uppercase tracking-tighter ${textSizes[size]} ${isLight ? 'text-white' : 'text-neutral-950'}`}>
            RED
          </span>
          <span className={`font-black uppercase tracking-tighter text-[#C8102E] ml-1.5 ${textSizes[size]}`}>
            FOX
          </span>
        </div>
        {showTagline && (
          <span className={`text-[10px] tracking-[0.25em] uppercase font-semibold mt-0.5 ${isLight ? 'text-neutral-300' : 'text-neutral-500'}`}>
            FOOTWEAR
          </span>
        )}
      </div>
    </div>
  );
};
