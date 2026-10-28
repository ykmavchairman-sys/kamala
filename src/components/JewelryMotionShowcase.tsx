import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Play,
  Pause,
  RotateCw,
  Eye,
  ArrowRight,
  X,
  ShieldCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  MessageSquare
} from 'lucide-react';
import { bellPlayer } from '../utils/audioBell';
import { useAppFormat } from '../context/FormatContext';
import { useLanguage } from '../context/LanguageContext';
import { AppTab } from './Navbar';

export interface MotionJewelItem {
  id: string;
  name: string;
  category: string;
  purity: string;
  approxWeight: string;
  imageUrl: string;
  fallbackSvg: string;
  description: string;
  accent: string;
}

const MOTION_JEWELLERY_ITEMS: MotionJewelItem[] = [
  {
    id: 'motion-kasu-mala',
    name: 'Sri Lakshmi Kasu Mala',
    category: 'Temple Necklace',
    purity: '22K BIS 916',
    approxWeight: '36.5g',
    imageUrl: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80',
    fallbackSvg: 'necklace-kasu',
    description: 'Heritage South Indian Kasu Mala embossed with sacred Lakshmi coins and auspicious lotus motifs, crafted with zero cadmium solder.',
    accent: 'Bestseller'
  },
  {
    id: 'motion-padmavati-choker',
    name: 'Padmavati Bridal Choker',
    category: 'Antique Choker',
    purity: '22K BIS 916',
    approxWeight: '48.2g',
    imageUrl: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80',
    fallbackSvg: 'necklace-choker',
    description: 'Opulent antique finish wedding choker featuring hand-carved peacocks, micro-filigree lace, and royal emerald accents.',
    accent: 'Bridal Grandeur'
  },
  {
    id: 'motion-maharaja-kada',
    name: 'Imperial Gaja Kada',
    category: 'Royal Bangles',
    purity: '22K BIS 916',
    approxWeight: '42.0g',
    imageUrl: 'https://images.unsplash.com/photo-1611591475152-47e0a1682c44?auto=format&fit=crop&w=500&q=80',
    fallbackSvg: 'bangles-kada',
    description: 'Solid 22-karat carved gold kada with twin elephant terminals and inner comfort-fit bevel, worn by South Indian royalty.',
    accent: 'Hand Nakshi'
  },
  {
    id: 'motion-navaratna-ring',
    name: 'Vedic Navaratna Solitaire',
    category: 'Skin-Touch Ring',
    purity: '22K BIS 916',
    approxWeight: '8.5g',
    imageUrl: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80',
    fallbackSvg: 'ring-solitaire',
    description: 'Open-back bezel setting allowing the unheated astrological gemstone to touch the skin meridian for full planetary reception.',
    accent: 'Astrological'
  },
  {
    id: 'motion-kundan-jhumka',
    name: 'Kundan Lotus Jhumkas',
    category: 'Bridal Earrings',
    purity: '22K BIS 916',
    approxWeight: '22.8g',
    imageUrl: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=500&q=80',
    fallbackSvg: 'earrings-jhumka',
    description: 'Delicate tiered jhumkas featuring micro pearl cluster drops and hand-enameled meenakari detailing on pure 22K yellow gold.',
    accent: 'Heirloom Finish'
  },
  {
    id: 'motion-diamond-kasu',
    name: 'Polki Diamond Haar',
    category: 'Diamond Haute',
    purity: '18K VVS-EF',
    approxWeight: '55.0g',
    imageUrl: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=500&q=80',
    fallbackSvg: 'diamond-necklace',
    description: 'Spectacular natural uncut diamonds set in 18K gold casing with brilliant Russian cut emerald cabochon drops.',
    accent: 'VVS Certified'
  },
  {
    id: 'motion-gold-coin',
    name: '24K Lakshmi Bullion',
    category: 'Investment Bullion',
    purity: '24K (999 Pure)',
    approxWeight: '10.0g / 50g',
    imageUrl: 'https://images.unsplash.com/photo-1610375461246-83df859d849d?auto=format&fit=crop&w=500&q=80',
    fallbackSvg: 'bullion-coin',
    description: 'Government assay certified 999 pure gold bullion coin with tamper-proof blister pack and Goddess Lakshmi blessing engraving.',
    accent: 'Zero Making Loss'
  },
  {
    id: 'motion-peacock-vanki',
    name: 'Antique Peacock Vanki',
    category: 'Bridal Armlet',
    purity: '22K BIS 916',
    approxWeight: '32.4g',
    imageUrl: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=500&q=80',
    fallbackSvg: 'bridal-vanki',
    description: 'Traditional Karnataka V-shaped bridal armlet featuring dancing peacocks and ruby flower rosettes, crafted for wedding heritage.',
    accent: 'Karnataka Craft'
  }
];

interface Props {
  onNavigateToJewels: () => void;
}

export const JewelryMotionShowcase: React.FC<Props> = ({ onNavigateToJewels }) => {
  const { isGuru } = useAppFormat();
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedItem, setSelectedItem] = useState<MotionJewelItem | null>(null);
  const [isRotating, setIsRotating] = useState<boolean>(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll loop when isPlaying is true
  useEffect(() => {
    let animId: number;
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollSpeed = 0.75; // pixels per frame

    const step = () => {
      if (isPlaying && container) {
        container.scrollLeft += scrollSpeed;
        // Infinite scroll wrap
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
          container.scrollLeft = 0;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 240;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
      bellPlayer.playBell(587);
    }
  };

  const handleOpenDetail = (item: MotionJewelItem) => {
    bellPlayer.playBell(659);
    setSelectedItem(item);
    setIsRotating(true);
  };

  const handleWhatsAppInquiry = (item: MotionJewelItem) => {
    const text = encodeURIComponent(
      `Namaste Sri Kamala Jewellers! I am inquiring about "${item.name}" (${item.purity}, ${item.category}). Please share showroom availability and live video showcase.`
    );
    window.open(`https://wa.me/919876543210?text=${text}`, '_blank');
  };

  return (
    <section className="relative w-full py-2 sm:py-3 transition-colors duration-300">
      {/* Motion Showcase Card Container */}
      <div
        className={`glass-card rounded-3xl p-4 sm:p-6 border shadow-[0_8px_30px_rgba(0,0,0,0.04)] relative overflow-hidden transition-all duration-300 ${
          isGuru ? 'border-[#B38048]/30' : 'border-[#6B1D52]/20'
        }`}
      >
        {/* Subtle Ambient Radial Lighting */}
        <div
          className={`absolute -top-12 -left-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40 ${
            isGuru ? 'bg-[#B38048]/20' : 'bg-[#6B1D52]/15'
          }`}
        />
        <div
          className={`absolute -bottom-12 -right-12 w-48 h-48 rounded-full blur-3xl pointer-events-none opacity-40 ${
            isGuru ? 'bg-[#C59359]/20' : 'bg-[#801358]/15'
          }`}
        />

        {/* Section Bar: Title + Motion Indicator + Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-4 sm:mb-5 relative z-10">
          <div className="flex items-center gap-2.5">
            <span
              className={`p-1.5 rounded-full border shadow-2xs flex items-center justify-center ${
                isGuru
                  ? 'bg-[#B38048]/10 border-[#B38048]/30 text-[#B38048]'
                  : 'bg-[#6B1D52]/10 border-[#6B1D52]/25 text-[#6B1D52]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 animate-spin" style={{ animationDuration: '8s' }} />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif-royal font-black text-sm sm:text-base tracking-wide text-stone-900 dark:text-stone-100 uppercase">
                  {t('motion_showcase_title', 'Bridal & Heritage Jewellery in Motion')}
                </h3>
                <span
                  className={`hidden md:inline-flex items-center gap-1 text-[10px] font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                    isGuru
                      ? 'bg-[#B38048]/15 text-[#B38048] border border-[#B38048]/30'
                      : 'bg-[#6B1D52]/10 text-[#6B1D52] border border-[#6B1D52]/20'
                  }`}
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  360° Live Showcase
                </span>
              </div>
              <p className="text-[11px] text-stone-500 dark:text-stone-400 font-medium">
                Tap any rotating circle to inspect 100% BIS 916 Hallmark carvings and macro details
              </p>
            </div>
          </div>

          {/* Controls: Play/Pause, Left/Right arrows, View All button */}
          <div className="flex items-center gap-2 self-end sm:self-auto shrink-0">
            {/* Play/Pause Motion */}
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              title={isPlaying ? 'Pause Motion Carousel' : 'Play Motion Carousel'}
              className={`p-2 rounded-xl border text-xs font-bold transition flex items-center gap-1 cursor-pointer shadow-xs ${
                isGuru
                  ? 'bg-white/90 dark:bg-stone-900 border-[#B38048]/30 text-[#B38048] hover:bg-[#B38048]/10'
                  : 'bg-white/90 dark:bg-stone-900 border-[#6B1D52]/25 text-[#6B1D52] hover:bg-[#6B1D52]/10'
              }`}
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline font-bold">Pause</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" />
                  <span className="text-[10px] hidden sm:inline font-bold">Play</span>
                </>
              )}
            </button>

            {/* Scroll Left */}
            <button
              onClick={() => handleManualScroll('left')}
              className={`p-2 rounded-xl border transition cursor-pointer shadow-xs ${
                isGuru
                  ? 'bg-white/90 dark:bg-stone-900 border-[#B38048]/30 text-[#B38048] hover:bg-[#B38048]/10'
                  : 'bg-white/90 dark:bg-stone-900 border-[#6B1D52]/25 text-[#6B1D52] hover:bg-[#6B1D52]/10'
              }`}
              title="Previous Jewels"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
            </button>

            {/* Scroll Right */}
            <button
              onClick={() => handleManualScroll('right')}
              className={`p-2 rounded-xl border transition cursor-pointer shadow-xs ${
                isGuru
                  ? 'bg-white/90 dark:bg-stone-900 border-[#B38048]/30 text-[#B38048] hover:bg-[#B38048]/10'
                  : 'bg-white/90 dark:bg-stone-900 border-[#6B1D52]/25 text-[#6B1D52] hover:bg-[#6B1D52]/10'
              }`}
              title="Next Jewels"
            >
              <ChevronRight className="w-3.5 h-3.5" />
            </button>

            {/* View Full Catalog */}
            <button
              onClick={() => {
                bellPlayer.playBell(587);
                onNavigateToJewels();
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
                isGuru
                  ? 'btn-brand text-white'
                  : 'btn-magenta text-white'
              }`}
            >
              <span>{t('view_all_jewels', 'All Jewels')}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

        {/* 2. Interactive Animated Circular Reels (Motion in Circle Format) */}
        <div
          ref={scrollContainerRef}
          onMouseEnter={() => setIsPlaying(false)}
          onMouseLeave={() => setIsPlaying(true)}
          className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-3 px-1 scroll-smooth select-none"
        >
          {MOTION_JEWELLERY_ITEMS.map((item, index) => {
            // Alternating subtle vertical float animation delays
            const floatDelay = `${(index * 0.28).toFixed(2)}s`;

            return (
              <div
                key={item.id}
                onClick={() => handleOpenDetail(item)}
                className="group flex flex-col items-center shrink-0 cursor-pointer transition-transform duration-300 hover:scale-105"
                style={{
                  animation: `jewelFloat 4.5s ease-in-out infinite`,
                  animationDelay: floatDelay
                }}
              >
                {/* Circular Animated Motion Container */}
                <div className="relative w-22 h-22 sm:w-26 sm:h-26 aspect-square p-1 flex items-center justify-center">
                  {/* Rotating Conic Gradient Outer Halo Ring */}
                  <div
                    className={`absolute inset-0 rounded-full transition-transform duration-700 p-[2px] shadow-sm ${
                      isGuru
                        ? 'bg-gradient-to-tr from-[#B38048] via-[#FAF8F5] to-[#8F5E29] group-hover:rotate-180'
                        : 'bg-gradient-to-tr from-[#6B1D52] via-[#FAF9F6] to-[#3B0E2C] group-hover:rotate-180'
                    }`}
                  >
                    <div className="w-full h-full rounded-full bg-white dark:bg-stone-900" />
                  </div>

                  {/* Inner Circular Frame with High-Fidelity Jewellery Image */}
                  <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-white dark:border-stone-800 shadow-md bg-stone-100 dark:bg-stone-900 group-hover:shadow-lg transition-shadow">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      loading="lazy"
                      className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-120 group-hover:rotate-6"
                      onError={(e) => {
                        // Fallback to graceful logo representation
                        (e.target as HTMLImageElement).src =
                          '/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png';
                      }}
                    />

                    {/* Shimmer Light Reflection Sweep Animation */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out pointer-events-none" />

                    {/* Center Overlay Hover Lens Icon */}
                    <div className="absolute inset-0 bg-stone-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="p-1.5 rounded-full bg-white/90 text-stone-900 shadow-md">
                        <Eye className="w-3.5 h-3.5" />
                      </span>
                    </div>
                  </div>

                  {/* Top-Right Micro Sparkling Star Badge */}
                  <span
                    className={`absolute -top-0.5 -right-0.5 w-4.5 h-4.5 rounded-full flex items-center justify-center text-white text-[8px] font-black shadow-xs ${
                      isGuru ? 'bg-[#B38048]' : 'bg-[#6B1D52]'
                    }`}
                  >
                    ★
                  </span>
                </div>

                {/* Typography Labels Below Circle */}
                <div className="text-center mt-2 max-w-[105px]">
                  <h4 className="font-serif-royal font-bold text-xs text-stone-900 dark:text-stone-100 truncate group-hover:underline">
                    {item.name}
                  </h4>
                  <span
                    className={`text-[10px] font-black block truncate tracking-wide ${
                      isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'
                    }`}
                  >
                    {item.category}
                  </span>
                  <span className="text-[9px] text-stone-500 font-medium block">
                    {item.purity} • {item.approxWeight}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Interactive Detail & 360° Inspection Modal */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/60 backdrop-blur-md animate-fade-in">
          <div
            className={`glass-card rounded-3xl max-w-lg w-full p-6 sm:p-8 border shadow-2xl relative overflow-hidden transition-all duration-300 ${
              isGuru ? 'border-[#B38048]/40' : 'border-[#6B1D52]/30'
            }`}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/90 dark:bg-stone-900 border border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 hover:text-stone-950 transition cursor-pointer shadow-xs z-10"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Content */}
            <div className="space-y-6">
              {/* Central Large Rotating Circular Showcase */}
              <div className="relative w-44 h-44 sm:w-52 sm:h-52 mx-auto aspect-square flex items-center justify-center my-2">
                {/* Rotating Conic Ring */}
                <div
                  className={`absolute inset-0 rounded-full p-1 shadow-md transition-all ${
                    isRotating ? 'animate-spin' : ''
                  } ${
                    isGuru
                      ? 'bg-gradient-to-tr from-[#B38048] via-[#FAF8F5] to-[#8F5E29]'
                      : 'bg-gradient-to-tr from-[#6B1D52] via-[#FAF9F6] to-[#3B0E2C]'
                  }`}
                  style={{ animationDuration: '14s' }}
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-stone-900" />
                </div>

                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-white dark:border-stone-800 shadow-xl bg-stone-100">
                  <img
                    src={selectedItem.imageUrl}
                    alt={selectedItem.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <button
                  onClick={() => setIsRotating(!isRotating)}
                  className="absolute bottom-1 right-1 p-2 rounded-full bg-white text-stone-900 shadow-md border border-stone-200 cursor-pointer hover:bg-stone-50"
                  title="Toggle 360 Rotation"
                >
                  <RotateCw className={`w-4 h-4 ${isRotating ? 'animate-spin' : ''}`} />
                </button>
              </div>

              {/* Information */}
              <div className="text-center space-y-1.5">
                <div className="flex items-center justify-center gap-2">
                  <span
                    className={`text-[10px] font-black uppercase px-2.5 py-0.5 rounded-full border ${
                      isGuru
                        ? 'bg-[#B38048]/10 text-[#B38048] border-[#B38048]/30'
                        : 'bg-[#6B1D52]/10 text-[#6B1D52] border-[#6B1D52]/20'
                    }`}
                  >
                    {selectedItem.accent}
                  </span>
                  <span className="text-xs font-bold text-stone-500">
                    {selectedItem.purity}
                  </span>
                </div>

                <h3 className="font-serif-royal font-black text-xl sm:text-2xl text-stone-950 dark:text-stone-50">
                  {selectedItem.name}
                </h3>
                <p className="text-xs text-stone-600 dark:text-stone-300 max-w-sm mx-auto leading-relaxed font-medium">
                  {selectedItem.description}
                </p>
              </div>

              {/* Hallmark Guarantees */}
              <div className="p-3.5 rounded-2xl bg-white/80 dark:bg-stone-900/80 border border-stone-200 dark:border-stone-800 text-xs space-y-1.5">
                <div className="flex items-center justify-between text-stone-700 dark:text-stone-300">
                  <span className="font-bold">Standard Weight:</span>
                  <strong className="text-stone-900 dark:text-white">{selectedItem.approxWeight}</strong>
                </div>
                <div className="flex items-center justify-between text-stone-700 dark:text-stone-300">
                  <span className="font-bold">Purity Standard:</span>
                  <strong className="text-stone-900 dark:text-white">100% BIS 916 HUID Hallmarked</strong>
                </div>
                <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 font-bold">
                  <span>Cadmium-Free Soldering:</span>
                  <span>Certified 100%</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
                <button
                  onClick={() => handleWhatsAppInquiry(selectedItem)}
                  className="flex-1 py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
                >
                  <MessageSquare className="w-4 h-4" />
                  Inquire on WhatsApp
                </button>

                <button
                  onClick={() => {
                    setSelectedItem(null);
                    onNavigateToJewels();
                  }}
                  className={`flex-1 py-3 px-4 rounded-xl text-white font-bold text-xs uppercase tracking-wider transition flex items-center justify-center gap-1.5 shadow-md cursor-pointer ${
                    isGuru ? 'btn-brand' : 'btn-magenta'
                  }`}
                >
                  <span>Explore Full Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
