import React, { useState, useRef } from 'react';
import { Sparkles, ShieldCheck, Award, ArrowRight, Eye, RotateCw } from 'lucide-react';
import { bellPlayer } from '../utils/audioBell';

interface Props {
  onNavigateToGold?: () => void;
  onNavigateToCustomizer?: () => void;
}

export const AnimatedJewelleryShowcase: React.FC<Props> = ({
  onNavigateToGold,
  onNavigateToCustomizer,
}) => {
  const [activePiece, setActivePiece] = useState<'kasu_mala' | 'navaratna_ring' | 'kundan_choker'>('kasu_mala');
  const [rotateAngle, setRotateAngle] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Mild tilt calculation
    setTilt({
      x: -(y / (rect.height / 2)) * 6,
      y: (x / (rect.width / 2)) * 8,
    });
  };

  const handleMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
  };

  const spinPiece = () => {
    bellPlayer.playBell(587);
    setIsRotating(true);
    setRotateAngle((prev) => prev + 180);
    setTimeout(() => setIsRotating(false), 800);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="glass-card-gold rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-[0_18px_50px_rgba(212,175,55,0.2)] space-y-6 relative overflow-hidden transition-transform duration-200 ease-out"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
      }}
    >
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-tr from-amber-200/40 via-amber-300/30 to-amber-100/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Header with SKJ Logo and Piece Selector */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-amber-200/80 pb-4">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 aspect-square rounded-2xl bg-gradient-to-br from-[#F5E29D] via-[#D4AF37] to-[#A37B1E] p-[1.5px] shadow-sm shrink-0">
            <div className="w-full h-full aspect-square bg-white rounded-[14px] overflow-hidden flex items-center justify-center p-1 border border-amber-200">
              <img
                src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                alt="SKJ Logo"
                className="w-full h-full aspect-square object-contain"
              />
            </div>
          </div>
          <div>
            <span className="text-[10px] uppercase font-black tracking-widest text-amber-900 block">
              ATELIER SHOWPIECE • BALLARI
            </span>
            <h3 className="font-serif-royal text-lg font-black text-stone-900 leading-tight">
              {activePiece === 'kasu_mala' && 'Sri Lakshmi Kasu Mala Haram'}
              {activePiece === 'navaratna_ring' && 'Maharaja Navaratna Royal Ring'}
              {activePiece === 'kundan_choker' && 'Royal Kundan & Emerald Choker'}
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={spinPiece}
            title="Inspect from another angle"
            className="p-2 rounded-xl bg-amber-100/80 hover:bg-amber-200 text-amber-900 border border-amber-300/70 transition cursor-pointer shadow-2xs"
          >
            <RotateCw className={`w-3.5 h-3.5 ${isRotating ? 'animate-spin' : ''}`} />
          </button>
          <span className="px-2.5 py-1 rounded-full bg-[#8B0000] text-amber-100 text-[10px] font-black uppercase shadow-xs border border-amber-400/40">
            22K BIS 916
          </span>
        </div>
      </div>

      {/* Interactive 3D Canvas / Animated Vector Illustration Stage */}
      <div className="relative h-64 sm:h-72 rounded-2xl bg-gradient-to-b from-[#FFFDF8] via-[#FAF4E5] to-[#F3E7CA] border border-amber-200/90 shadow-inner flex items-center justify-center overflow-hidden">
        {/* Subtle geometric mandala background grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#D4AF37_1.2px,transparent_1.2px)] [background-size:16px_16px] opacity-25" />

        {/* Ambient Sparkle Glints */}
        <div className="absolute top-6 left-8 pointer-events-none animate-sparkle" style={{ animationDelay: '0.2s' }}>
          <Sparkles className="w-5 h-5 text-amber-500 fill-amber-300 drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]" />
        </div>
        <div className="absolute bottom-8 right-10 pointer-events-none animate-sparkle" style={{ animationDelay: '1.2s' }}>
          <Sparkles className="w-4 h-4 text-amber-600 fill-amber-200 drop-shadow-[0_0_6px_rgba(212,175,55,0.6)]" />
        </div>
        <div className="absolute top-10 right-12 pointer-events-none animate-sparkle" style={{ animationDelay: '0.7s' }}>
          <Sparkles className="w-3.5 h-3.5 text-amber-400 fill-amber-100 drop-shadow-[0_0_5px_rgba(212,175,55,0.6)]" />
        </div>

        {/* Floating Jewellery Assembly */}
        <div
          className="relative z-10 transition-transform duration-700 ease-out animate-jewel-float"
          style={{ transform: `rotate(${rotateAngle}deg)` }}
        >
          {activePiece === 'kasu_mala' && (
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_12px_24px_rgba(180,140,50,0.35)]">
                <defs>
                  <linearGradient id="goldFiligree" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF4D0" />
                    <stop offset="30%" stopColor="#E6C65A" />
                    <stop offset="70%" stopColor="#C49A2D" />
                    <stop offset="100%" stopColor="#926B12" />
                  </linearGradient>
                  <linearGradient id="rubyGem" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF4D6D" />
                    <stop offset="60%" stopColor="#C9184A" />
                    <stop offset="100%" stopColor="#800F2F" />
                  </linearGradient>
                  <linearGradient id="emeraldDrop" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#52B788" />
                    <stop offset="60%" stopColor="#2D6A4F" />
                    <stop offset="100%" stopColor="#081C15" />
                  </linearGradient>
                </defs>

                {/* Outer Kasu Mala Chain Arc */}
                <path
                  d="M 30,50 Q 100,120 170,50"
                  fill="none"
                  stroke="url(#goldFiligree)"
                  strokeWidth="8"
                  strokeLinecap="round"
                />

                {/* Inner Denser Chain Arc */}
                <path
                  d="M 45,65 Q 100,135 155,65"
                  fill="none"
                  stroke="url(#goldFiligree)"
                  strokeWidth="5"
                  strokeDasharray="4,3"
                />

                {/* Kasu Coins along the necklace */}
                {[
                  { cx: 40, cy: 68 },
                  { cx: 55, cy: 88 },
                  { cx: 75, cy: 110 },
                  { cx: 100, cy: 122 },
                  { cx: 125, cy: 110 },
                  { cx: 145, cy: 88 },
                  { cx: 160, cy: 68 },
                ].map((coin, idx) => (
                  <g key={idx} className="transition-all hover:scale-110 origin-center cursor-pointer">
                    <circle
                      cx={coin.cx}
                      cy={coin.cy}
                      r="11"
                      fill="url(#goldFiligree)"
                      stroke="#8C6212"
                      strokeWidth="1.2"
                      filter="drop-shadow(0 2px 4px rgba(0,0,0,0.15))"
                    />
                    <circle cx={coin.cx} cy={coin.cy} r="8.5" fill="none" stroke="#FFF5D6" strokeWidth="0.8" />
                    {/* Coin Lakshmi figure silhouette */}
                    <circle cx={coin.cx} cy={coin.cy - 2} r="2.2" fill="#8C6212" />
                    <path
                      d={`M ${coin.cx - 3},${coin.cy + 3} Q ${coin.cx},${coin.cy} ${coin.cx + 3},${coin.cy + 3}`}
                      stroke="#8C6212"
                      strokeWidth="1"
                      fill="none"
                    />
                  </g>
                ))}

                {/* Central Regal Padakkam / Pendant */}
                <g filter="drop-shadow(0 4px 8px rgba(139,0,0,0.3))">
                  <path
                    d="M 85,122 L 115,122 L 122,145 L 100,165 L 78,145 Z"
                    fill="url(#goldFiligree)"
                    stroke="#8C6212"
                    strokeWidth="1.8"
                  />
                  {/* Central Radiant Burmese Ruby */}
                  <polygon
                    points="100,132 108,144 100,154 92,144"
                    fill="url(#rubyGem)"
                    stroke="#FFF"
                    strokeWidth="0.6"
                  />
                  {/* Dangling Emerald Beads */}
                  <circle cx="88" cy="158" r="3.5" fill="url(#emeraldDrop)" />
                  <circle cx="100" cy="172" r="4.5" fill="url(#emeraldDrop)" />
                  <circle cx="112" cy="158" r="3.5" fill="url(#emeraldDrop)" />
                </g>
              </svg>
            </div>
          )}

          {activePiece === 'navaratna_ring' && (
            <div className="relative w-44 h-44 sm:w-52 sm:h-52 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_12px_26px_rgba(180,140,50,0.4)]">
                <defs>
                  <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF2C6" />
                    <stop offset="50%" stopColor="#D4AF37" />
                    <stop offset="100%" stopColor="#8A6010" />
                  </linearGradient>
                </defs>

                {/* Circular Gold Band */}
                <ellipse cx="100" cy="135" rx="55" ry="38" fill="none" stroke="url(#ringGold)" strokeWidth="12" />
                <ellipse cx="100" cy="135" rx="46" ry="30" fill="none" stroke="#68470B" strokeWidth="1.5" />

                {/* Royal Octagonal Crown / Bezel Plate */}
                <polygon
                  points="75,55 125,55 145,75 145,115 125,135 75,135 55,115 55,75"
                  fill="url(#ringGold)"
                  stroke="#8C6212"
                  strokeWidth="2.5"
                  filter="drop-shadow(0 4px 10px rgba(0,0,0,0.25))"
                />

                {/* Center Sun Ruby */}
                <circle cx="100" cy="95" r="13" fill="#E0115F" stroke="#FFF" strokeWidth="1.2" />

                {/* 8 Outer Navaratna Gems */}
                {/* Diamond (Top) */}
                <circle cx="100" cy="67" r="6" fill="#F0F8FF" stroke="#333" strokeWidth="0.8" />
                {/* Blue Sapphire (Top Right) */}
                <circle cx="127" cy="76" r="6" fill="#0F52BA" stroke="#FFF" strokeWidth="0.6" />
                {/* Yellow Sapphire (Right) */}
                <circle cx="134" cy="95" r="6" fill="#FFD700" stroke="#FFF" strokeWidth="0.6" />
                {/* Emerald (Bottom Right) */}
                <circle cx="127" cy="116" r="6" fill="#00A86B" stroke="#FFF" strokeWidth="0.6" />
                {/* Coral (Bottom) */}
                <circle cx="100" cy="123" r="6" fill="#E2583E" stroke="#FFF" strokeWidth="0.6" />
                {/* Hessonite (Bottom Left) */}
                <circle cx="73" cy="116" r="6" fill="#9E2A2B" stroke="#FFF" strokeWidth="0.6" />
                {/* Cat's Eye (Left) */}
                <circle cx="66" cy="95" r="6" fill="#708238" stroke="#FFF" strokeWidth="0.6" />
                {/* Pearl (Top Left) */}
                <circle cx="73" cy="76" r="6" fill="#FAF0E6" stroke="#AAA" strokeWidth="0.8" />
              </svg>
            </div>
          )}

          {activePiece === 'kundan_choker' && (
            <div className="relative w-48 h-48 sm:w-56 sm:h-56 flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_12px_24px_rgba(180,140,50,0.35)]">
                <defs>
                  <linearGradient id="chokerGold" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FFF9E0" />
                    <stop offset="40%" stopColor="#E2C264" />
                    <stop offset="100%" stopColor="#9C7214" />
                  </linearGradient>
                </defs>

                {/* Triple Collar Band */}
                <path d="M 30,70 Q 100,105 170,70" fill="none" stroke="url(#chokerGold)" strokeWidth="6" />
                <path d="M 32,82 Q 100,117 168,82" fill="none" stroke="url(#chokerGold)" strokeWidth="6" />
                <path d="M 35,94 Q 100,129 165,94" fill="none" stroke="url(#chokerGold)" strokeWidth="6" />

                {/* Uncut Polki Diamonds / Kundan Settings */}
                {[
                  { x: 50, y: 76 },
                  { x: 75, y: 88 },
                  { x: 100, y: 94 },
                  { x: 125, y: 88 },
                  { x: 150, y: 76 },
                  { x: 62, y: 98 },
                  { x: 88, y: 108 },
                  { x: 112, y: 108 },
                  { x: 138, y: 98 },
                ].map((polki, idx) => (
                  <g key={idx}>
                    <rect
                      x={polki.x - 7}
                      y={polki.y - 7}
                      width="14"
                      height="14"
                      rx="3"
                      fill="#FFFDF5"
                      stroke="#A37B1E"
                      strokeWidth="1.5"
                    />
                    <polygon
                      points={`${polki.x - 4},${polki.y - 4} ${polki.x + 4},${polki.y - 4} ${polki.x},${polki.y + 4}`}
                      fill="#EAE6DA"
                    />
                  </g>
                ))}

                {/* Hanging Emerald drops */}
                {[55, 75, 90, 100, 110, 125, 145].map((x, idx) => (
                  <ellipse key={idx} cx={x} cy={125 + (x === 100 ? 10 : 0)} rx="3.5" ry="6.5" fill="#2D6A4F" stroke="#1B4332" strokeWidth="0.8" />
                ))}
              </svg>
            </div>
          )}
        </div>

        {/* Hover Hint */}
        <div className="absolute bottom-2.5 inset-x-0 text-center pointer-events-none">
          <span className="text-[10px] text-stone-500 font-bold bg-white/80 px-2.5 py-0.5 rounded-full border border-amber-200/60 shadow-2xs">
            Move mouse to tilt • 3D Handcrafted View
          </span>
        </div>
      </div>

      {/* Piece Switcher Tabs */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { key: 'kasu_mala' as const, label: 'Kasu Mala', purity: '36.5g • 22K' },
          { key: 'navaratna_ring' as const, label: 'Navaratna Ring', purity: '11.8g • Open-Back' },
          { key: 'kundan_choker' as const, label: 'Kundan Choker', purity: '42.0g • Bridal' },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => {
              bellPlayer.playBell(587);
              setActivePiece(tab.key);
            }}
            className={`p-2 rounded-xl text-center transition cursor-pointer ${
              activePiece === tab.key
                ? 'bg-amber-100 border border-amber-400 shadow-2xs font-bold text-stone-950'
                : 'bg-white/80 border border-amber-200/60 text-stone-600 hover:bg-white'
            }`}
          >
            <span className="text-xs block font-bold truncate">{tab.label}</span>
            <span className="text-[10px] text-amber-800 font-semibold block">{tab.purity}</span>
          </button>
        ))}
      </div>

      {/* Action CTA: Royal Crimson Red Button */}
      <div className="pt-1">
        <button
          onClick={() => {
            bellPlayer.playBell(587);
            if (activePiece === 'navaratna_ring' && onNavigateToCustomizer) {
              onNavigateToCustomizer();
            } else if (onNavigateToGold) {
              onNavigateToGold();
            }
          }}
          className="w-full py-3 px-4 rounded-2xl btn-royal-crimson font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>
            {activePiece === 'navaratna_ring' ? 'Customize Lucky Navaratna Ring' : 'Explore Bridal Collection'}
          </span>
          <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
        </button>
      </div>
    </div>
  );
};
