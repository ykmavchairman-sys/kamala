import React from 'react';
import {
  Sparkles,
  ShieldCheck,
  PhoneCall,
  Award,
  Compass,
  Gem,
  Coins,
  TrendingUp,
  MapPin,
  Home,
  MessageSquare
} from 'lucide-react';
import { LIVE_GOLD_RATES } from '../data/goldCatalog';
import { bellPlayer } from '../utils/audioBell';

export type AppTab =
  | 'home'
  | 'rates'
  | 'gold'
  | 'calculator'
  | 'dossier'
  | 'customizer'
  | 'ritual'
  | 'catalog'
  | 'chat'
  | 'contact'
  | 'admin';

interface Props {
  activeTab: AppTab;
  setActiveTab: (tab: AppTab) => void;
  hasReport: boolean;
  onOpenBooking: () => void;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  hasReport,
  onOpenBooking,
}) => {
  const handleTabClick = (tab: AppTab) => {
    bellPlayer.playBell(587);
    setActiveTab(tab);
  };

  return (
    <>
      <header className="sticky top-0 z-50 bg-[#F7F2EB]/95 backdrop-blur-xl border-b border-amber-300/60 shadow-[0_4px_30px_rgba(212,175,55,0.08)] transition-all">
        {/* Top Auspicious Announcement Bar with Ballari Benchmark & Live Rate */}
        <div className="bg-gradient-to-r from-[#FAF5E8] via-[#F4E9CD] to-[#FAF5E8] border-b border-amber-300/40 px-3 sm:px-6 py-1.5 text-[11px] text-[#5A4521] flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 mx-auto sm:mx-0 font-medium">
            <span className="flex items-center gap-1.5 text-[#8B0000] font-black tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> SRI KAMALA JEWELLERS • BALLARI • ESTD. 1974
            </span>
            <span className="hidden md:inline text-amber-400">|</span>
            <span className="hidden md:inline text-amber-950/80 font-medium">
              Sanjay Gandhi Nagar Flagship • BIS Hallmark 916 Pure Gold
            </span>
          </div>

          <div className="flex items-center gap-3 mx-auto sm:mx-0 text-xs font-semibold">
            {/* Live Ticker Mini Button */}
            <button
              onClick={() => handleTabClick('rates')}
              className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/90 border border-amber-300 text-stone-900 hover:bg-amber-100 transition shadow-2xs cursor-pointer"
            >
              <TrendingUp className="w-3 h-3 text-emerald-600" />
              <span>IBJA 22K: <strong className="text-[#8B0000]">₹{LIVE_GOLD_RATES.rate22KPerGram.toLocaleString('en-IN')}/g</strong></span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse ml-0.5" />
            </button>

            <button
              onClick={() => handleTabClick('admin')}
              className="flex items-center gap-1 text-amber-950 hover:text-[#8B0000] font-bold text-xs bg-amber-200/70 hover:bg-amber-300 px-2.5 py-0.5 rounded-full border border-amber-300 transition cursor-pointer shadow-2xs"
            >
              <Award className="w-3 h-3 text-[#8B0000]" /> Astrologer Desk
            </button>

            <button
              onClick={onOpenBooking}
              className="hidden sm:flex items-center gap-1 text-amber-900 hover:text-[#8B0000] font-bold underline underline-offset-2 transition cursor-pointer"
            >
              <PhoneCall className="w-3 h-3" /> Book Call
            </button>
          </div>
        </div>

        {/* Main Luxury Brand Bar */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-3">
          {/* Brand Identity with User Uploaded Logo (1:1 Small Size) */}
          <div
            onClick={() => handleTabClick('home')}
            className="flex items-center gap-3 cursor-pointer group select-none"
          >
            {/* 1:1 Small Square SKJ Lotus Logo Emblem */}
            <div className="relative w-11 h-11 aspect-square rounded-2xl bg-gradient-to-br from-[#F5E29D] via-[#D4AF37] to-[#A37B1E] p-[1.5px] shadow-[0_3px_12px_rgba(212,175,55,0.25)] group-hover:scale-105 transition-transform duration-300 shrink-0">
              <div className="w-full h-full aspect-square bg-white rounded-[14px] overflow-hidden flex items-center justify-center p-1 border border-amber-200">
                <img
                  src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                  alt="Sri Kamala Jewellers (SKJ) Logo"
                  className="w-full h-full aspect-square object-contain"
                />
              </div>
              <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-amber-400 border border-white animate-pulse" />
            </div>

            <div>
              <div className="flex items-center gap-1">
                <span className="font-serif-royal text-lg sm:text-2xl font-black tracking-wider text-gold-gradient leading-none">
                  SRI KAMALA JEWELLERS
                </span>
              </div>
              <p className="text-[10px] sm:text-xs tracking-wider uppercase font-bold text-amber-900/80 mt-0.5">
                LUCKY STONE GURU & FINE JEWELLERY • BALLARI
              </p>
            </div>
          </div>

          {/* Desktop/Laptop Primary Navigation (Full Viewport) */}
          <nav className="hidden 2xl:flex items-center gap-1 text-xs font-semibold">
            <button
              onClick={() => handleTabClick('home')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'home'
                  ? 'bg-[#8B0000] text-amber-100 font-bold shadow-sm'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50/70'
              }`}
            >
              <Home className="w-3.5 h-3.5" />
              Home
            </button>

            <button
              onClick={() => handleTabClick('rates')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'rates'
                  ? 'bg-[#8B0000] text-amber-100 font-bold shadow-sm'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50/70 font-semibold'
              }`}
            >
              <TrendingUp className="w-3.5 h-3.5 text-amber-600" />
              Live Gold Rates
            </button>

            <button
              onClick={() => handleTabClick('gold')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'gold'
                  ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 font-black shadow-sm ring-1 ring-amber-300'
                  : 'text-amber-950 bg-amber-50/90 border border-amber-300/80 hover:bg-amber-100 font-bold'
              }`}
            >
              <Coins className="w-3.5 h-3.5 text-amber-700" />
              Gold Jewellery
            </button>

            <button
              onClick={() => handleTabClick('calculator')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'calculator'
                  ? 'bg-amber-100/90 text-amber-950 border border-amber-300 shadow-sm font-bold'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50/70'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-amber-600" />
              Birth Chart
            </button>

            <button
              onClick={() => handleTabClick('dossier')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 relative cursor-pointer ${
                activeTab === 'dossier'
                  ? 'bg-amber-100/90 text-amber-950 border border-amber-300 shadow-sm font-bold'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50/70'
              }`}
            >
              <Gem className="w-3.5 h-3.5 text-amber-600" />
              Lucky Stones
              {hasReport && (
                <span className="w-2 h-2 rounded-full bg-emerald-500 absolute top-1.5 right-1.5 animate-ping" />
              )}
            </button>

            <button
              onClick={() => handleTabClick('customizer')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'customizer'
                  ? 'bg-amber-100/90 text-amber-950 border border-amber-300 shadow-sm font-bold'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50/70'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              Atelier
            </button>

            <button
              onClick={() => handleTabClick('ritual')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'ritual'
                  ? 'bg-amber-100/90 text-amber-950 border border-amber-300 shadow-sm font-bold'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50/70'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-amber-600" />
              Prana Pratishtha
            </button>

            <button
              onClick={() => handleTabClick('chat')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'chat'
                  ? 'bg-amber-100/90 text-amber-950 border border-amber-300 shadow-sm font-bold'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50/70'
              }`}
            >
              Ask Nukala Srinivasrao
            </button>

            <button
              onClick={() => handleTabClick('contact')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'contact'
                  ? 'bg-amber-100/90 text-amber-950 border border-amber-300 shadow-sm font-bold'
                  : 'text-stone-700 hover:text-amber-900 hover:bg-amber-50/70'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-amber-600" />
              Ballari Showroom
            </button>

            <button
              onClick={() => handleTabClick('admin')}
              className={`px-3 py-2 rounded-xl transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'admin'
                  ? 'bg-[#8B0000] text-amber-100 font-bold shadow-sm'
                  : 'text-amber-950 bg-amber-200/50 hover:bg-amber-200 font-bold border border-amber-300/80'
              }`}
            >
              <Award className="w-3.5 h-3.5 text-[#8B0000]" />
              Astrologer Portal
            </button>
          </nav>

          {/* Action Trigger */}
          <div className="flex items-center gap-2">
            <button
              onClick={onOpenBooking}
              className="inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-[#8B0000] via-[#A01020] to-[#700512] text-white font-bold text-xs uppercase tracking-wider hover:brightness-110 active:scale-98 shadow-[0_4px_16px_rgba(139,0,0,0.3)] transition-all cursor-pointer border border-amber-300/40"
            >
              <PhoneCall className="w-3.5 h-3.5 text-amber-300" />
              <span className="hidden sm:inline">Book Consultation</span>
              <span className="sm:hidden">Consult</span>
            </button>
          </div>
        </div>

        {/* Responsive Horizontal Scrollable Subnav for Tabs, Laptops, and Mobiles */}
        <div className="flex 2xl:hidden overflow-x-auto py-2 px-3 border-t border-amber-200/60 gap-1.5 text-xs no-scrollbar bg-white/95 backdrop-blur-md shadow-inner">
          <button
            onClick={() => handleTabClick('home')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold cursor-pointer shrink-0 ${
              activeTab === 'home'
                ? 'bg-[#8B0000] text-amber-100 shadow-xs'
                : 'text-stone-700 bg-amber-50/80 border border-amber-200/50'
            }`}
          >
            <Home className="w-3 h-3" /> Home
          </button>

          <button
            onClick={() => handleTabClick('rates')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full flex items-center gap-1 font-bold cursor-pointer shrink-0 ${
              activeTab === 'rates'
                ? 'bg-[#8B0000] text-amber-100 shadow-xs'
                : 'text-amber-900 bg-amber-100/90 border border-amber-300'
            }`}
          >
            <TrendingUp className="w-3 h-3 text-amber-600" /> Live Gold Rates
          </button>

          <button
            onClick={() => handleTabClick('gold')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full flex items-center gap-1 font-bold cursor-pointer shrink-0 ${
              activeTab === 'gold'
                ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-stone-950 shadow-xs ring-1 ring-amber-300'
                : 'text-amber-950 bg-amber-50/90 border border-amber-300'
            }`}
          >
            <Coins className="w-3 h-3 text-amber-700" /> Gold Jewellery
          </button>

          <button
            onClick={() => handleTabClick('calculator')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold cursor-pointer shrink-0 ${
              activeTab === 'calculator'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-700 bg-amber-50/80 border border-amber-200/50'
            }`}
          >
            <Compass className="w-3 h-3" /> Birth Chart
          </button>

          <button
            onClick={() => handleTabClick('dossier')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold cursor-pointer shrink-0 ${
              activeTab === 'dossier'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-700 bg-amber-50/80 border border-amber-200/50'
            }`}
          >
            <Gem className="w-3 h-3" /> Lucky Stones {hasReport && '•'}
          </button>

          <button
            onClick={() => handleTabClick('customizer')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold cursor-pointer shrink-0 ${
              activeTab === 'customizer'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-700 bg-amber-50/80 border border-amber-200/50'
            }`}
          >
            <Sparkles className="w-3 h-3" /> Atelier
          </button>

          <button
            onClick={() => handleTabClick('ritual')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold cursor-pointer shrink-0 ${
              activeTab === 'ritual'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-700 bg-amber-50/80 border border-amber-200/50'
            }`}
          >
            <Award className="w-3 h-3" /> Rituals
          </button>

          <button
            onClick={() => handleTabClick('catalog')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold cursor-pointer shrink-0 ${
              activeTab === 'catalog'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-700 bg-amber-50/80 border border-amber-200/50'
            }`}
          >
            Gems
          </button>

          <button
            onClick={() => handleTabClick('chat')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold cursor-pointer shrink-0 ${
              activeTab === 'chat'
                ? 'bg-amber-500 text-stone-950 shadow-xs'
                : 'text-stone-700 bg-amber-50/80 border border-amber-200/50'
            }`}
          >
            Astrologer Nukala
          </button>

          <button
            onClick={() => handleTabClick('contact')}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full flex items-center gap-1 font-semibold cursor-pointer shrink-0 ${
              activeTab === 'contact'
                ? 'bg-[#8B0000] text-white shadow-xs'
                : 'text-stone-700 bg-amber-50/80 border border-amber-200/50'
            }`}
          >
            <MapPin className="w-3 h-3 text-amber-600" /> Ballari Showroom
          </button>
        </div>
      </header>

      {/* Floating Mobile Bottom Navigation Bar (Convenient One-Thumb Navigation for Smartphones) */}
      <nav className="fixed bottom-0 left-0 right-0 z-40 sm:hidden bg-[#F7F2EB]/95 backdrop-blur-xl border-t border-amber-300/60 shadow-[0_-4px_20px_rgba(0,0,0,0.06)] px-2 py-1.5 flex items-center justify-around print:hidden">
        <button
          onClick={() => handleTabClick('home')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            activeTab === 'home' ? 'text-[#8B0000] font-black' : 'text-stone-600'
          }`}
        >
          <Home className="w-4 h-4" />
          <span className="text-[10px] mt-0.5">Home</span>
        </button>

        <button
          onClick={() => handleTabClick('rates')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            activeTab === 'rates' ? 'text-[#8B0000] font-black' : 'text-stone-600'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-amber-600" />
          <span className="text-[10px] mt-0.5">Rates</span>
        </button>

        <button
          onClick={() => handleTabClick('gold')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            activeTab === 'gold' ? 'text-[#8B0000] font-black' : 'text-stone-600'
          }`}
        >
          <Coins className="w-4 h-4 text-amber-600" />
          <span className="text-[10px] mt-0.5">Jewellery</span>
        </button>

        <button
          onClick={() => handleTabClick('calculator')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            activeTab === 'calculator' || activeTab === 'dossier' ? 'text-[#8B0000] font-black' : 'text-stone-600'
          }`}
        >
          <Gem className="w-4 h-4 text-amber-600" />
          <span className="text-[10px] mt-0.5">Kundali</span>
        </button>

        <button
          onClick={() => handleTabClick('contact')}
          className={`flex flex-col items-center justify-center py-1 px-2 rounded-xl transition ${
            activeTab === 'contact' ? 'text-[#8B0000] font-black' : 'text-stone-600'
          }`}
        >
          <MapPin className="w-4 h-4 text-amber-600" />
          <span className="text-[10px] mt-0.5">Ballari</span>
        </button>
      </nav>
    </>
  );
};
