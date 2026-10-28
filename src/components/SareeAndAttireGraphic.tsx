import React from 'react';

interface Props {
  type: string;
  className?: string;
  primaryColor?: string;
  secondaryColor?: string;
}

export const SareeAndAttireGraphic: React.FC<Props> = ({
  type,
  className = '',
  primaryColor = '#8B0000',
  secondaryColor = '#D4AF37',
}) => {
  return (
    <div className={`relative flex items-center justify-center aspect-square w-full overflow-hidden rounded-2xl bg-gradient-to-br from-[#FAF5EE] to-[#F3EAD8] p-3 border border-amber-200/80 shadow-inner group ${className}`}>
      {/* Ambient Silk Sheen Background */}
      <div
        className="absolute inset-0 opacity-15 mix-blend-multiply pointer-events-none transition-transform duration-700 group-hover:scale-105"
        style={{
          backgroundImage: `radial-gradient(circle at 50% 30%, ${secondaryColor} 0%, transparent 70%)`,
        }}
      />

      <svg viewBox="0 0 320 320" className="w-full h-full relative z-10 drop-shadow-[0_8px_20px_rgba(100,50,20,0.18)]">
        <defs>
          {/* Gold Zari Shimmer Gradient */}
          <linearGradient id={`goldZari-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFF7D6" />
            <stop offset="25%" stopColor="#E5C158" />
            <stop offset="50%" stopColor="#D4AF37" />
            <stop offset="75%" stopColor="#B38A22" />
            <stop offset="100%" stopColor="#8A6310" />
          </linearGradient>

          {/* Pure Silver Zari Gradient */}
          <linearGradient id={`silverZari-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E0E6ED" />
            <stop offset="100%" stopColor="#A8B2C0" />
          </linearGradient>

          {/* Primary Silk Body Gradient */}
          <linearGradient id={`silkBody-${type}`} x1="0%" y1="0%" x2="100%" y2="80%">
            <stop offset="0%" stopColor={primaryColor} stopOpacity="0.9" />
            <stop offset="40%" stopColor={primaryColor} />
            <stop offset="100%" stopColor={primaryColor} stopOpacity="0.82" />
          </linearGradient>

          {/* Secondary Contrast Silk Gradient */}
          <linearGradient id={`silkContrast-${type}`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={secondaryColor} />
            <stop offset="100%" stopColor={secondaryColor} stopOpacity="0.85" />
          </linearGradient>

          {/* Silk Pleat Sheen Overlay */}
          <linearGradient id={`pleatSheen-${type}`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.25" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.15" />
          </linearGradient>
        </defs>

        {/* ------------------------------------------------------------- */}
        {/* 1. KANJEEVARAM SILK SAREE (Grand Temple Korvai Drape) */}
        {/* ------------------------------------------------------------- */}
        {(type.startsWith('saree-kanjeevaram') || type.startsWith('saree-banarasi') || type.startsWith('saree-mysore') || type.startsWith('saree-paithani')) && (
          <g transform="translate(10, 10)">
            {/* Main Folded Saree Body (Royal S-Curve Pleated Drape) */}
            <path
              d="M 50 40 C 90 20, 210 20, 250 40 C 270 90, 260 210, 240 260 C 190 280, 110 280, 60 260 C 40 210, 30 90, 50 40 Z"
              fill={`url(#silkBody-${type})`}
              stroke={`url(#goldZari-${type})`}
              strokeWidth="2.5"
            />

            {/* Silk Texture Waves & Pleats */}
            <path d="M 70 50 Q 150 70, 230 50" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <path d="M 65 95 Q 150 120, 235 95" fill="none" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5" />
            <path d="M 60 145 Q 150 170, 240 145" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
            <path d="M 60 195 Q 150 220, 240 195" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />

            {/* Buttis (Traditional Rudraksha / Mayil / Star Motifs) */}
            {[
              { cx: 95, cy: 75 }, { cx: 150, cy: 70 }, { cx: 205, cy: 75 },
              { cx: 120, cy: 110 }, { cx: 180, cy: 110 },
              { cx: 95, cy: 155 }, { cx: 150, cy: 150 }, { cx: 205, cy: 155 },
              { cx: 120, cy: 190 }, { cx: 180, cy: 190 },
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.cx} cy={pt.cy} r="4" fill={`url(#goldZari-${type})`} />
                <circle cx={pt.cx} cy={pt.cy} r="6" fill="none" stroke={`url(#goldZari-${type})`} strokeWidth="0.8" strokeDasharray="1,1" />
                <path d={`M ${pt.cx - 2} ${pt.cy} L ${pt.cx + 2} ${pt.cy} M ${pt.cx} ${pt.cy - 2} L ${pt.cx} ${pt.cy + 2}`} stroke="#704A05" strokeWidth="0.8" />
              </g>
            ))}

            {/* Bottom Korvai Temple Gopuram Zari Border */}
            <path
              d="M 58 230 C 105 250, 195 250, 242 230 L 240 260 C 190 280, 110 280, 60 260 Z"
              fill={`url(#silkContrast-${type})`}
              stroke={`url(#goldZari-${type})`}
              strokeWidth="2"
            />

            {/* Temple Gopuram Peaks along the border */}
            {[75, 100, 125, 150, 175, 200, 225].map((x, i) => (
              <polygon
                key={i}
                points={`${x - 9},235 ${x},220 ${x + 9},235`}
                fill={`url(#goldZari-${type})`}
                stroke="#694300"
                strokeWidth="0.5"
              />
            ))}

            {/* Grand Diagonally Draped Pallu (Shoulder & Chest Drape) */}
            <path
              d="M 40 70 C 60 30, 140 20, 190 40 L 260 160 C 270 200, 240 230, 210 210 L 110 110 Z"
              fill={`url(#goldZari-${type})`}
              stroke="#8A6310"
              strokeWidth="2.5"
              opacity="0.96"
            />

            {/* Pallu Intricate Zari Carvings (Peacock / Lotus Motif) */}
            <ellipse cx="180" cy="120" rx="22" ry="32" fill="none" stroke="#7A520B" strokeWidth="1.5" strokeDasharray="3,2" />
            <circle cx="180" cy="105" r="8" fill="#FFFBE6" stroke="#7A520B" strokeWidth="1" />
            <path d="M 175 115 Q 180 135, 185 115" fill="none" stroke="#7A520B" strokeWidth="2" />
            <path d="M 165 130 C 170 145, 190 145, 195 130" fill="none" stroke="#7A520B" strokeWidth="1.5" />

            {/* Pure Silk Mark Seal / Emblem on bottom right corner */}
            <g transform="translate(205, 200)">
              <circle cx="20" cy="20" r="18" fill="#FFFDF8" stroke={`url(#goldZari-${type})`} strokeWidth="1.8" />
              <path d="M 14 16 Q 20 10, 26 16 Q 28 24, 20 28 Q 12 24, 14 16 Z" fill={`url(#goldZari-${type})`} />
              <text x="20" y="34" textAnchor="middle" fontSize="5.5" fontWeight="900" fill="#8B0000" letterSpacing="0.5">
                SILK MARK
              </text>
            </g>
          </g>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 2. BRIDAL LEHENGA (Regal 16-Kali Kalidar Flared Skirt & Choli) */}
        {/* ------------------------------------------------------------- */}
        {type.startsWith('lehenga') && (
          <g transform="translate(15, 10)">
            {/* Blouse / Choli Top */}
            <path
              d="M 100 30 L 190 30 L 205 75 L 180 85 L 145 92 L 110 85 L 85 75 Z"
              fill={`url(#silkBody-${type})`}
              stroke={`url(#goldZari-${type})`}
              strokeWidth="2"
            />
            {/* Neckline Sweetheart cutout */}
            <path d="M 125 30 Q 145 55, 165 30" fill="none" stroke={`url(#goldZari-${type})`} strokeWidth="2.5" />
            <circle cx="145" cy="60" r="6" fill={`url(#goldZari-${type})`} />

            {/* Skirt (Flared Kali Skirt) */}
            <path
              d="M 115 100 L 175 100 L 265 260 C 215 285, 75 285, 25 260 Z"
              fill={`url(#silkBody-${type})`}
              stroke={`url(#goldZari-${type})`}
              strokeWidth="2.5"
            />

            {/* Kalis (Flared Vertical Seams with Gold Piping) */}
            {[65, 100, 130, 160, 190, 225].map((x, i) => (
              <line
                key={i}
                x1={120 + i * 8}
                y1="102"
                x2={x}
                y2="265"
                stroke={`url(#goldZari-${type})`}
                strokeWidth="1.2"
                strokeDasharray="4,2"
              />
            ))}

            {/* Architectural Fort Arch Embroidered Ghera Border */}
            <path
              d="M 35 235 C 95 260, 195 260, 255 235 L 265 260 C 215 285, 75 285, 25 260 Z"
              fill={`url(#silkContrast-${type})`}
              stroke={`url(#goldZari-${type})`}
              strokeWidth="2"
            />

            {/* Scalloped Arch Embroidery */}
            {[50, 85, 120, 155, 190, 225, 245].map((x, i) => (
              <path
                key={i}
                d={`M ${x - 12} 248 Q ${x} 234, ${x + 12} 248`}
                fill="none"
                stroke={`url(#goldZari-${type})`}
                strokeWidth="1.8"
              />
            ))}

            {/* Sheer Organza Dupatta Draped Diagonally Across */}
            <path
              d="M 90 35 C 130 50, 210 110, 230 180 C 240 220, 210 240, 185 220 C 170 160, 110 80, 85 45 Z"
              fill="rgba(255, 248, 230, 0.55)"
              stroke={`url(#goldZari-${type})`}
              strokeWidth="1.8"
            />

            {/* Latkan Tassels on Waistband */}
            <circle cx="108" cy="115" r="4.5" fill={`url(#goldZari-${type})`} />
            <line x1="108" y1="115" x2="104" y2="140" stroke="#7A520B" strokeWidth="1.5" />
            <polygon points="100,140 108,140 104,152" fill={`url(#goldZari-${type})`} />
          </g>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 3. GROOMS PATTU PANCHE & ANGAVASTRAM (Traditional Silk Dhoti) */}
        {/* ------------------------------------------------------------- */}
        {type === 'groom-pattu-panche' && (
          <g transform="translate(20, 15)">
            {/* Folded Silk Dhoti (Pattu Panche) */}
            <rect
              x="45"
              y="60"
              width="190"
              height="180"
              rx="12"
              fill="#FFFDF6"
              stroke={`url(#goldZari-${type})`}
              strokeWidth="2.5"
            />

            {/* Traditional Dhoti Pleat Folds */}
            <line x1="90" y1="60" x2="90" y2="240" stroke="#E5DECE" strokeWidth="2" />
            <line x1="140" y1="60" x2="140" y2="240" stroke="#E5DECE" strokeWidth="2" />
            <line x1="190" y1="60" x2="190" y2="240" stroke="#E5DECE" strokeWidth="2" />

            {/* 4-Inch Solid Gold Zari Border at Bottom */}
            <rect
              x="45"
              y="200"
              width="190"
              height="40"
              rx="4"
              fill={`url(#goldZari-${type})`}
              stroke="#8A6310"
              strokeWidth="1.5"
            />

            {/* Mayil & Rudraksha Embossed Icons on Dhoti Border */}
            {[70, 110, 140, 170, 205].map((x, i) => (
              <g key={i}>
                <ellipse cx={x} cy="220" rx="8" ry="10" fill="#FFFBE6" stroke="#7A520B" strokeWidth="1" />
                <circle cx={x} cy="216" r="3" fill="#8B0000" />
                <path d={`M ${x - 5} 226 Q ${x} 228, ${x + 5} 226`} stroke="#7A520B" strokeWidth="1" fill="none" />
              </g>
            ))}

            {/* Angavastram (Stole) Draped in Dignified Diagonal Wrap */}
            <path
              d="M 30 35 L 250 85 L 240 120 L 20 70 Z"
              fill="#FFFDF4"
              stroke={`url(#goldZari-${type})`}
              strokeWidth="2"
            />
            {/* Angavastram Gold Border */}
            <path
              d="M 230 81 L 250 85 L 240 120 L 220 116 Z"
              fill={`url(#goldZari-${type})`}
            />

            {/* Sacred Pooja Coconut & Betel Leaves Motif Accent */}
            <g transform="translate(110, 100)">
              <ellipse cx="25" cy="20" rx="16" ry="14" fill="#693A14" stroke={`url(#goldZari-${type})`} strokeWidth="1.5" />
              <path d="M 12 14 Q 25 2, 38 14" fill="#0C6E4E" />
              <circle cx="25" cy="18" r="3.5" fill="#8B0000" />
            </g>
          </g>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 4. MAHARAJA RAW SILK SHERWANI */}
        {/* ------------------------------------------------------------- */}
        {type === 'groom-sherwani-ivory' && (
          <g transform="translate(20, 10)">
            {/* Sherwani Body Silhouette */}
            <path
              d="M 90 40 L 190 40 L 220 90 L 205 240 L 75 240 L 60 90 Z"
              fill="#FCF9F2"
              stroke={`url(#goldZari-${type})`}
              strokeWidth="2.5"
            />

            {/* Mandarin Royal Collar */}
            <path
              d="M 115 30 C 115 25, 165 25, 165 30 L 165 42 L 115 42 Z"
              fill={`url(#goldZari-${type})`}
              stroke="#7A520B"
              strokeWidth="1.5"
            />

            {/* Center Button Placket with Antique Gold Buttons */}
            <line x1="140" y1="42" x2="140" y2="240" stroke={`url(#goldZari-${type})`} strokeWidth="3" />
            {[65, 95, 125, 155, 185, 215].map((y, i) => (
              <g key={i}>
                <circle cx="140" cy={y} r="5" fill={`url(#goldZari-${type})`} stroke="#634105" strokeWidth="1" />
                <circle cx="140" cy={y} r="2" fill="#FFFDF8" />
              </g>
            ))}

            {/* Breast Pocket with Crimson Silk Pocket Square */}
            <line x1="160" y1="80" x2="185" y2="80" stroke={`url(#goldZari-${type})`} strokeWidth="2" />
            <polygon points="166,80 172,68 180,80" fill="#8B0000" />

            {/* Royal Safa / Turban atop */}
            <g transform="translate(100, 2)">
              <ellipse cx="40" cy="15" rx="35" ry="12" fill="#8B0000" stroke={`url(#goldZari-${type})`} strokeWidth="1.5" />
              <path d="M 40 3 Q 50 15, 75 12" fill="none" stroke={`url(#goldZari-${type})`} strokeWidth="2" />
              {/* Kalgi / Brooch */}
              <circle cx="38" cy="14" r="4.5" fill={`url(#goldZari-${type})`} />
              <path d="M 38 10 Q 36 2, 38 -4" stroke="#0E5C48" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        )}

        {/* ------------------------------------------------------------- */}
        {/* 5. ACCESSORIES: SACRED SHALU OR POTLI */}
        {/* ------------------------------------------------------------- */}
        {(type.startsWith('accessory')) && (
          <g transform="translate(25, 20)">
            {/* Ornate Velvet Potli Bag */}
            <path
              d="M 80 80 C 60 120, 50 200, 135 220 C 220 200, 210 120, 190 80 C 170 70, 100 70, 80 80 Z"
              fill={`url(#silkBody-${type})`}
              stroke={`url(#goldZari-${type})`}
              strokeWidth="2.5"
            />

            {/* Drawstring Top Gathered Neck */}
            <path
              d="M 85 80 Q 135 95, 185 80 L 195 50 Q 135 40, 75 50 Z"
              fill={`url(#silkContrast-${type})`}
              stroke={`url(#goldZari-${type})`}
              strokeWidth="1.8"
            />

            {/* Intricate Zardozi Jaal Motif on Body */}
            <circle cx="135" cy="150" r="32" fill="none" stroke={`url(#goldZari-${type})`} strokeWidth="1.8" strokeDasharray="3,2" />
            <circle cx="135" cy="150" r="18" fill="none" stroke={`url(#goldZari-${type})`} strokeWidth="1.5" />
            <circle cx="135" cy="150" r="6" fill={`url(#goldZari-${type})`} />

            {/* Beaded Hanging Latkan Tassels */}
            <path d="M 190 85 Q 210 130, 205 170" fill="none" stroke={`url(#goldZari-${type})`} strokeWidth="2" />
            <circle cx="205" cy="170" r="6" fill="#FFFDF8" stroke="#7A520B" strokeWidth="1" />
            <polygon points="200,174 210,174 205,190" fill={`url(#goldZari-${type})`} />
          </g>
        )}
      </svg>
    </div>
  );
};
