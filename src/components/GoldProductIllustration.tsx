import React from 'react';

interface Props {
  type: string;
  className?: string;
}

export const GoldProductIllustration: React.FC<Props> = ({ type, className = '' }) => {
  return (
    <div className={`relative flex items-center justify-center aspect-square w-full ${className}`}>
      {/* Ambient Gold Glow */}
      <div className="absolute inset-4 rounded-full bg-amber-300/25 blur-2xl pointer-events-none" />

      <svg viewBox="0 0 240 240" className="w-full h-full relative z-10 drop-shadow-[0_10px_20px_rgba(180,130,30,0.25)]">
        <defs>
          <linearGradient id="gold22kGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF9E0" />
            <stop offset="25%" stopColor="#F5D77F" />
            <stop offset="50%" stopColor="#DFB743" />
            <stop offset="75%" stopColor="#C49626" />
            <stop offset="100%" stopColor="#8A6010" />
          </linearGradient>

          <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#E2C264" stopOpacity="0.2" />
          </linearGradient>

          <radialGradient id="goldCoinGleam" cx="35%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#FFFBE6" />
            <stop offset="50%" stopColor="#E5BE4A" />
            <stop offset="100%" stopColor="#9E7015" />
          </radialGradient>
        </defs>

        {/* Necklace - Kasu Mala */}
        {type === 'necklace-kasu' && (
          <g>
            {/* Main Arch Band */}
            <path d="M 40 50 C 40 160, 200 160, 200 50" fill="none" stroke="url(#gold22kGrad)" strokeWidth="6" strokeLinecap="round" />
            <path d="M 50 65 C 50 150, 190 150, 190 65" fill="none" stroke="#D4AF37" strokeWidth="2" strokeDasharray="3,3" />

            {/* Kasu Lakshmi Gold Coins along the curve */}
            {[
              { cx: 55, cy: 95 },
              { cx: 70, cy: 125 },
              { cx: 90, cy: 148 },
              { cx: 120, cy: 160 },
              { cx: 150, cy: 148 },
              { cx: 170, cy: 125 },
              { cx: 185, cy: 95 },
            ].map((coin, i) => (
              <g key={i}>
                <circle cx={coin.cx} cy={coin.cy} r="14" fill="url(#goldCoinGleam)" stroke="#7A520B" strokeWidth="1" />
                <circle cx={coin.cx} cy={coin.cy} r="11" fill="none" stroke="#FFEBA5" strokeWidth="0.8" strokeDasharray="2,2" />
                {/* Micro Lakshmi silhouette */}
                <ellipse cx={coin.cx} cy={coin.cy - 1} rx="4" ry="5" fill="#B38018" />
                <circle cx={coin.cx} cy={coin.cy - 6} r="2.5" fill="#B38018" />
                <path d={`M ${coin.cx - 2} ${coin.cy + 13} L ${coin.cx} ${coin.cy + 18} L ${coin.cx + 2} ${coin.cy + 13} Z`} fill="url(#gold22kGrad)" />
              </g>
            ))}

            {/* Central Grand Pendant Padak */}
            <g>
              <ellipse cx="120" cy="180" rx="16" ry="14" fill="url(#goldCoinGleam)" stroke="#7A520B" strokeWidth="1.2" />
              <path d="M 120 195 L 120 205" stroke="#D4AF37" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="120" cy="208" r="4" fill="url(#gold22kGrad)" />
            </g>
          </g>
        )}

        {/* Necklace - Bridal Choker */}
        {type === 'necklace-choker' && (
          <g>
            {/* Choker Neck Collar */}
            <path d="M 45 70 C 45 130, 195 130, 195 70" fill="none" stroke="url(#gold22kGrad)" strokeWidth="18" strokeLinecap="round" />
            <path d="M 45 70 C 45 130, 195 130, 195 70" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.6" strokeDasharray="6,4" />

            {/* Intricate Filigree Lace lower border */}
            {[60, 80, 100, 120, 140, 160, 180].map((x, i) => (
              <g key={i}>
                <path
                  d={`M ${x - 8} 115 C ${x - 8} 135, ${x + 8} 135, ${x + 8} 115 Z`}
                  fill="url(#goldCoinGleam)"
                  stroke="#8A6010"
                  strokeWidth="1"
                />
                <circle cx={x} cy={140} r="3.5" fill="url(#gold22kGrad)" />
                <circle cx={x} cy={148} r="2" fill="#D4AF37" />
              </g>
            ))}

            {/* Central Royal Crest */}
            <polygon points="120,60 135,90 120,115 105,90" fill="url(#gold22kGrad)" stroke="#5A3A05" strokeWidth="1.5" />
            <circle cx="120" cy="90" r="4" fill="#FFFFFF" opacity="0.8" />
          </g>
        )}

        {/* Chain - Rudraksha 22K Gold */}
        {type === 'chain-rudraksha' && (
          <g>
            <path d="M 50 40 C 30 180, 210 180, 190 40" fill="none" stroke="url(#gold22kGrad)" strokeWidth="3" />
            {[
              { cx: 65, cy: 80 },
              { cx: 75, cy: 120 },
              { cx: 100, cy: 155 },
              { cx: 120, cy: 165 },
              { cx: 140, cy: 155 },
              { cx: 165, cy: 120 },
              { cx: 175, cy: 80 },
            ].map((pos, idx) => (
              <g key={idx}>
                {/* Gold Top Cap */}
                <ellipse cx={pos.cx} cy={pos.cy - 7} rx="6" ry="3" fill="url(#gold22kGrad)" stroke="#664405" strokeWidth="0.8" />
                {/* Natural Rudraksha bead */}
                <circle cx={pos.cx} cy={pos.cy} r="8" fill="#5C2D16" stroke="#38190B" strokeWidth="1" />
                <path d={`M ${pos.cx - 6} ${pos.cy} Q ${pos.cx} ${pos.cy + 3} ${pos.cx + 6} ${pos.cy}`} stroke="#38190B" strokeWidth="1" fill="none" />
                {/* Gold Bottom Cap */}
                <ellipse cx={pos.cx} cy={pos.cy + 7} rx="6" ry="3" fill="url(#gold22kGrad)" stroke="#664405" strokeWidth="0.8" />
              </g>
            ))}
          </g>
        )}

        {/* Chain - Gopuram Curb Chain */}
        {type === 'chain-gopuram' && (
          <g>
            {/* Heavy Interlinked Double Chain Loop */}
            <path d="M 50 50 C 40 190, 200 190, 190 50" fill="none" stroke="url(#gold22kGrad)" strokeWidth="12" strokeLinecap="round" />
            <path d="M 50 50 C 40 190, 200 190, 190 50" fill="none" stroke="#FFFFFF" strokeWidth="2.5" strokeDasharray="8,6" strokeOpacity="0.75" />
            {/* Clasp */}
            <rect x="110" y="38" width="20" height="10" rx="3" fill="url(#gold22kGrad)" stroke="#664405" strokeWidth="1" />
          </g>
        )}

        {/* Bangles - Peacock Kada */}
        {type === 'bangles-kada' && (
          <g>
            {/* Heavy Gold Cuff */}
            <circle cx="120" cy="120" r="75" fill="none" stroke="url(#gold22kGrad)" strokeWidth="24" strokeDasharray="390" strokeDashoffset="75" />
            <circle cx="120" cy="120" r="75" fill="none" stroke="#FFFFFF" strokeWidth="2" strokeDasharray="4,6" strokeOpacity="0.6" strokeDashoffset="75" />

            {/* Left Peacock Terminal Head */}
            <g transform="translate(68, 62)">
              <circle cx="0" cy="0" r="14" fill="url(#goldCoinGleam)" stroke="#5A3A05" strokeWidth="1" />
              <path d="M -6 0 C -6 -10, 8 -10, 8 0 Z" fill="url(#gold22kGrad)" />
              <circle cx="2" cy="-3" r="2.5" fill="#8B0000" />
            </g>

            {/* Right Peacock Terminal Head */}
            <g transform="translate(172, 62)">
              <circle cx="0" cy="0" r="14" fill="url(#goldCoinGleam)" stroke="#5A3A05" strokeWidth="1" />
              <path d="M -8 0 C -8 -10, 6 -10, 6 0 Z" fill="url(#gold22kGrad)" />
              <circle cx="-2" cy="-3" r="2.5" fill="#8B0000" />
            </g>
          </g>
        )}

        {/* Bangles - 4 Piece Set */}
        {type === 'bangles-set' && (
          <g>
            {[45, 60, 75, 90].map((radius, i) => (
              <ellipse
                key={i}
                cx="120"
                cy={105 + i * 10}
                rx={radius}
                ry={radius * 0.45}
                fill="none"
                stroke="url(#gold22kGrad)"
                strokeWidth="7"
                className="drop-shadow-sm"
              />
            ))}
          </g>
        )}

        {/* Earrings - Jhumkas */}
        {type === 'earrings-jhumka' && (
          <g>
            {/* Left Jhumka */}
            <g transform="translate(75, 50)">
              {/* Stud Top */}
              <circle cx="0" cy="0" r="14" fill="url(#goldCoinGleam)" stroke="#7A520B" strokeWidth="1" />
              <circle cx="0" cy="0" r="6" fill="#D4AF37" stroke="#FFECA0" strokeWidth="1" />
              {/* Stem */}
              <line x1="0" y1="14" x2="0" y2="28" stroke="url(#gold22kGrad)" strokeWidth="3" />
              {/* Bell Dome */}
              <path d="M -24 55 C -24 25, 24 25, 24 55 Z" fill="url(#goldCoinGleam)" stroke="#7A520B" strokeWidth="1.2" />
              <line x1="-24" y1="55" x2="24" y2="55" stroke="url(#gold22kGrad)" strokeWidth="3" />
              {/* Ghungroo beads hanging */}
              {[-18, -9, 0, 9, 18].map((x, k) => (
                <circle key={k} cx={x} cy="63" r="3" fill="url(#gold22kGrad)" />
              ))}
            </g>

            {/* Right Jhumka */}
            <g transform="translate(165, 50)">
              <circle cx="0" cy="0" r="14" fill="url(#goldCoinGleam)" stroke="#7A520B" strokeWidth="1" />
              <circle cx="0" cy="0" r="6" fill="#D4AF37" stroke="#FFECA0" strokeWidth="1" />
              <line x1="0" y1="14" x2="0" y2="28" stroke="url(#gold22kGrad)" strokeWidth="3" />
              <path d="M -24 55 C -24 25, 24 25, 24 55 Z" fill="url(#goldCoinGleam)" stroke="#7A520B" strokeWidth="1.2" />
              <line x1="-24" y1="55" x2="24" y2="55" stroke="url(#gold22kGrad)" strokeWidth="3" />
              {[-18, -9, 0, 9, 18].map((x, k) => (
                <circle key={k} cx={x} cy="63" r="3" fill="url(#gold22kGrad)" />
              ))}
            </g>
          </g>
        )}

        {/* Earrings - Chandbali */}
        {type === 'earrings-chandbali' && (
          <g>
            <g transform="translate(80, 50)">
              <circle cx="0" cy="0" r="12" fill="url(#goldCoinGleam)" />
              {/* Crescent Moon */}
              <path d="M -22 35 C -22 65, 22 65, 22 35 C 16 55, -16 55, -22 35 Z" fill="url(#gold22kGrad)" stroke="#664405" strokeWidth="1" />
              <circle cx="-15" cy="65" r="3" fill="url(#gold22kGrad)" />
              <circle cx="0" cy="70" r="4" fill="url(#gold22kGrad)" />
              <circle cx="15" cy="65" r="3" fill="url(#gold22kGrad)" />
            </g>

            <g transform="translate(160, 50)">
              <circle cx="0" cy="0" r="12" fill="url(#goldCoinGleam)" />
              <path d="M -22 35 C -22 65, 22 65, 22 35 C 16 55, -16 55, -22 35 Z" fill="url(#gold22kGrad)" stroke="#664405" strokeWidth="1" />
              <circle cx="-15" cy="65" r="3" fill="url(#gold22kGrad)" />
              <circle cx="0" cy="70" r="4" fill="url(#gold22kGrad)" />
              <circle cx="15" cy="65" r="3" fill="url(#gold22kGrad)" />
            </g>
          </g>
        )}

        {/* Mangalsutra - Double Vati */}
        {type === 'mangalsutra-vati' && (
          <g>
            {/* Dual Black & Gold strand chain */}
            <path d="M 40 40 C 40 160, 200 160, 200 40" fill="none" stroke="#1A1A1A" strokeWidth="3" />
            <path d="M 45 40 C 45 155, 195 155, 195 40" fill="none" stroke="url(#gold22kGrad)" strokeWidth="2" strokeDasharray="4,6" />

            {/* Left Vati Cup */}
            <g transform="translate(108, 160)">
              <path d="M -12 0 C -12 16, 12 16, 12 0 Z" fill="url(#goldCoinGleam)" stroke="#7A520B" strokeWidth="1" />
              <circle cx="0" cy="20" r="3" fill="url(#gold22kGrad)" />
            </g>

            {/* Right Vati Cup */}
            <g transform="translate(132, 160)">
              <path d="M -12 0 C -12 16, 12 16, 12 0 Z" fill="url(#goldCoinGleam)" stroke="#7A520B" strokeWidth="1" />
              <circle cx="0" cy="20" r="3" fill="url(#gold22kGrad)" />
            </g>
          </g>
        )}

        {/* Ring - Lion Signet */}
        {type === 'ring-signet' && (
          <g>
            {/* Band */}
            <path d="M 50 140 C 50 220, 190 220, 190 140 C 170 140, 170 190, 120 190 C 70 190, 70 140, 50 140 Z" fill="url(#gold22kGrad)" stroke="#523906" strokeWidth="1.5" />
            {/* Heavy Shield Bezel */}
            <rect x="80" y="80" width="80" height="75" rx="20" fill="url(#goldCoinGleam)" stroke="#523906" strokeWidth="2" />
            {/* Solar Lion Emblazoned Crest */}
            <circle cx="120" cy="118" r="22" fill="#FFEBA5" stroke="#7A520B" strokeWidth="1.2" />
            {/* Simha Mane */}
            <path d="M 120 102 L 126 112 L 120 116 L 114 112 Z" fill="#8A6010" />
            <circle cx="120" cy="115" r="8" fill="url(#gold22kGrad)" />
          </g>
        )}
      </svg>
    </div>
  );
};
