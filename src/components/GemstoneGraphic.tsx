import React from 'react';

interface Props {
  hexColor: string;
  glowColor?: string;
  size?: number;
  cut?: 'oval' | 'cushion' | 'emerald' | 'round' | 'cabochon';
  className?: string;
}

export const GemstoneGraphic: React.FC<Props> = ({
  hexColor,
  glowColor = 'rgba(212, 175, 55, 0.4)',
  size = 120,
  cut = 'oval',
  className = '',
}) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Ambient Radial Aura Glow */}
      <div
        className="absolute inset-0 rounded-full blur-xl opacity-75 pointer-events-none transform scale-125"
        style={{ background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)` }}
      />

      <svg
        viewBox="0 0 200 200"
        className="w-full h-full relative z-10 drop-shadow-[0_10px_20px_rgba(0,0,0,0.6)]"
      >
        <defs>
          {/* Main gem gradient */}
          <linearGradient id={`gemGrad-${cut}-${hexColor.replace('#', '')}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="25%" stopColor={hexColor} />
            <stop offset="80%" stopColor={hexColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.8" />
          </linearGradient>

          {/* Facet Light Gradient */}
          <linearGradient id={`facetLight-${cut}`} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#ffffff" stopOpacity="0.05" />
          </linearGradient>

          {/* Table facet specular reflection */}
          <radialGradient id="tableGleam" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#ffffff" stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {cut === 'oval' && (
          <g>
            {/* Outer Girdle */}
            <ellipse cx="100" cy="100" rx="76" ry="92" fill={`url(#gemGrad-${cut}-${hexColor.replace('#', '')})`} stroke="#d4af37" strokeWidth="2.5" />

            {/* Pavilion Facets Star Lattice */}
            <polygon points="100,20 150,55 170,100 150,145 100,180 50,145 30,100 50,55" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.4" />
            
            {/* Inner Crown Cross Facets */}
            <polygon points="100,38 140,68 152,100 140,132 100,162 60,132 48,100 60,68" fill="rgba(255,255,255,0.12)" stroke="#ffffff" strokeWidth="1" strokeOpacity="0.5" />

            {/* Main Flat Table */}
            <ellipse cx="100" cy="100" rx="42" ry="54" fill="url(#tableGleam)" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.75" />

            {/* Radiant Star Specular Glints */}
            <polygon points="85,65 90,62 88,58 92,60 96,56 94,62 99,65 94,68 96,74 92,70 88,72 90,68" fill="#ffffff" opacity="0.9" />
            <polygon points="125,135 128,133 127,130 130,131 133,128 131,133 135,135 131,137 133,142 130,139 127,140 128,137" fill="#ffffff" opacity="0.8" />
          </g>
        )}

        {cut === 'cushion' && (
          <g>
            {/* Outer Girdle (Rounded Rect Cushion) */}
            <rect x="25" y="25" width="150" height="150" rx="42" fill={`url(#gemGrad-${cut}-${hexColor.replace('#', '')})`} stroke="#d4af37" strokeWidth="2.5" />

            {/* Corner kites and break facets */}
            <polygon points="25,67 67,25 100,45 100,75 55,75" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.45" />
            <polygon points="175,67 133,25 100,45 100,75 145,75" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.45" />
            <polygon points="25,133 67,175 100,155 100,125 55,125" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.45" />
            <polygon points="175,133 133,175 100,155 100,125 145,125" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.45" />

            {/* Central Cushion Table */}
            <rect x="58" y="58" width="84" height="84" rx="20" fill="url(#tableGleam)" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.8" />
            
            {/* Specular sparkle */}
            <circle cx="85" cy="85" r="4" fill="#ffffff" opacity="0.9" />
          </g>
        )}

        {cut === 'emerald' && (
          <g>
            {/* Emerald Cut Octagonal Step Cut */}
            <polygon points="50,20 150,20 180,50 180,150 150,180 50,180 20,150 20,50" fill={`url(#gemGrad-${cut}-${hexColor.replace('#', '')})`} stroke="#d4af37" strokeWidth="2.5" />

            {/* Outer Step Lines */}
            <polygon points="60,35 140,35 165,60 165,140 140,165 60,165 35,140 35,60" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
            
            {/* Inner Step Lines */}
            <polygon points="70,50 130,50 150,70 150,130 130,150 70,150 50,130 50,70" fill="rgba(255,255,255,0.08)" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.6" />

            {/* Central Table */}
            <polygon points="78,65 122,65 135,78 135,122 122,135 78,135 65,122 65,78" fill="url(#tableGleam)" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.85" />
          </g>
        )}

        {cut === 'round' && (
          <g>
            {/* Round Brilliant */}
            <circle cx="100" cy="100" r="80" fill={`url(#gemGrad-${cut}-${hexColor.replace('#', '')})`} stroke="#d4af37" strokeWidth="2.5" />

            {/* 8 Crown Triangles */}
            <polygon points="100,20 125,50 100,60 75,50" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
            <polygon points="180,100 150,125 140,100 150,75" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
            <polygon points="100,180 75,150 100,140 125,150" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />
            <polygon points="20,100 50,75 60,100 50,125" fill="none" stroke="#ffffff" strokeWidth="1.2" strokeOpacity="0.5" />

            {/* Central Octagonal Table */}
            <polygon points="85,60 115,60 140,85 140,115 115,140 85,140 60,115 60,85" fill="url(#tableGleam)" stroke="#ffffff" strokeWidth="1.5" strokeOpacity="0.85" />
          </g>
        )}

        {cut === 'cabochon' && (
          <g>
            {/* Smooth Dome Cabochon (for Pearl or Coral) */}
            <ellipse cx="100" cy="100" rx="82" ry="76" fill={`url(#gemGrad-${cut}-${hexColor.replace('#', '')})`} stroke="#d4af37" strokeWidth="2" />
            <ellipse cx="85" cy="80" rx="48" ry="36" fill="url(#tableGleam)" opacity="0.85" />
            <circle cx="75" cy="70" r="10" fill="#ffffff" opacity="0.9" />
          </g>
        )}
      </svg>
    </div>
  );
};
