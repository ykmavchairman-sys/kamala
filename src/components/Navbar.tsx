import React from 'react';
import {
  Sparkles,
  PhoneCall,
  Award,
  Compass,
  Gem,
  Coins,
  TrendingUp,
  MapPin,
  Home,
  MessageSquare,
  Flame,
  Calendar
} from 'lucide-react';
import { bellPlayer } from '../utils/audioBell';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { LanguageSelector } from './LanguageSelector';
import { useAppFormat, AppFormat } from '../context/FormatContext';
import { FormatSwitcher } from './FormatSwitcher';

export type AppTab =
  | 'home'
  | 'rates'
  | 'gold'
  | 'schemes'
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
  const { isDark } = useTheme();
  const { t } = useLanguage();
  const { format, isJewellers, isGuru, setFormat } = useAppFormat();

  const handleTabClick = (tab: AppTab) => {
    bellPlayer.playBell(587);
    setActiveTab(tab);
  };

  const handleFormatChange = (newFormat: AppFormat) => {
    bellPlayer.playBell(659);
    if (newFormat === 'jewellers') {
      const guruTabs: AppTab[] = ['calculator', 'dossier', 'customizer', 'ritual', 'chat', 'admin'];
      if (guruTabs.includes(activeTab)) {
        setActiveTab('home');
      }
    } else {
      const jewellerTabs: AppTab[] = ['home', 'rates', 'gold', 'schemes', 'contact', 'catalog'];
      if (jewellerTabs.includes(activeTab)) {
        setActiveTab(hasReport ? 'dossier' : 'calculator');
      }
    }
  };

  interface NavDockItem {
    id: AppTab;
    label: string;
    sublabel: string;
    icon: React.ComponentType<{ className?: string }>;
    hasDot?: boolean;
  }

  // 5 Specific Pages for Sri Kamala Jewellers
  const JEWELLERS_DOCK: NavDockItem[] = [
    {
      id: 'home',
      label: t('nav_home', 'Home'),
      sublabel: t('nav_home_sub', 'Flagship Overview'),
      icon: Home,
    },
    {
      id: 'rates',
      label: t('nav_rates', 'Gold Rates'),
      sublabel: t('nav_rates_sub', 'IBJA 22K/24K Bullion'),
      icon: TrendingUp,
    },
    {
      id: 'gold',
      label: t('nav_gold', 'Jewels'),
      sublabel: t('nav_gold_sub', '100% BIS 916 HUID'),
      icon: Coins,
    },
    {
      id: 'schemes',
      label: t('nav_schemes', 'Monthly Schemes'),
      sublabel: t('nav_schemes_sub', 'Live Rate Gold Passbook'),
      icon: Calendar,
    },
    {
      id: 'contact',
      label: t('nav_showroom', 'Showroom & Contact'),
      sublabel: t('nav_showroom_sub', 'Ballari Arch & Phone'),
      icon: MapPin,
    },
  ];

  // 6 Specific Pages for Lucky Stone Guru
  const GURU_DOCK: NavDockItem[] = [
    {
      id: 'calculator',
      label: t('nav_chart', 'Birth Chart'),
      sublabel: t('nav_chart_sub', 'N.C. Lahiri D1/D9'),
      icon: Compass,
    },
    {
      id: 'dossier',
      label: t('nav_stones', 'Lucky Stones'),
      sublabel: t('nav_stones_sub', 'Vimshottari Gems'),
      icon: Gem,
      hasDot: hasReport,
    },
    {
      id: 'customizer',
      label: t('nav_atelier', 'Atelier'),
      sublabel: t('nav_atelier_sub', 'Skin-Touch Bezel'),
      icon: Sparkles,
    },
    {
      id: 'ritual',
      label: t('nav_ritual', 'Prana Pratishtha'),
      sublabel: t('nav_ritual_sub', '1008-Mantra Ritual'),
      icon: Flame,
    },
    {
      id: 'chat',
      label: t('nav_chat', 'Ask Astrologer'),
      sublabel: 'Acharya Nukala Srinivas Rao',
      icon: MessageSquare,
    },
    {
      id: 'admin',
      label: t('astrologer_desk', 'Astrologer Deck'),
      sublabel: t('astrologer_desk_sub', 'Kundali CRM & Audits'),
      icon: Award,
    },
  ];

  const currentDock = isJewellers ? JEWELLERS_DOCK : GURU_DOCK;

  return (
    <>
      <header
        className={`sticky top-0 z-50 backdrop-blur-xl border-b transition-colors duration-300 ${
          isGuru
            ? 'bg-[#FAF8F5]/95 dark:bg-[#16120E]/95 border-[#B38048]/25 shadow-[0_4px_24px_rgba(179,128,72,0.08)]'
            : 'bg-[#FAF9F6]/95 dark:bg-[#140C12]/95 border-[#6B1D52]/20 shadow-[0_4px_24px_rgba(107,29,82,0.06)]'
        }`}
      >
        {/* Section 1: Main Header Row */}
        <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-15 sm:h-18 flex items-center justify-between gap-3 sm:gap-4">
          {/* Left: Brand Identity with 1:1 Monogram & Full Leadership Names */}
          <div
            onClick={() => handleTabClick(isJewellers ? 'home' : (hasReport ? 'dossier' : 'calculator'))}
            className="flex items-center gap-2.5 sm:gap-3.5 cursor-pointer group select-none min-w-0 shrink"
          >
            {/* 1:1 SKJ Lotus Monogram Logo */}
            <div
              className={`relative w-9 h-9 sm:w-11 sm:h-11 aspect-square rounded-xl sm:rounded-2xl p-[1.5px] transition-transform duration-300 group-hover:scale-105 shrink-0 shadow-md ${
                isGuru
                  ? 'bg-gradient-to-br from-[#FAF8F5] via-[#C59359] to-[#8F5E29]'
                  : 'bg-gradient-to-br from-[#FDF2F8] via-[#6B1D52] to-[#3B0E2C]'
              }`}
            >
              <div
                className={`w-full h-full aspect-square bg-white dark:bg-stone-900 rounded-[10px] sm:rounded-[14px] overflow-hidden flex items-center justify-center p-0.5 border ${
                  isGuru ? 'border-[#B38048]/30' : 'border-[#6B1D52]/30'
                }`}
              >
                <img
                  src="/assets/aistudio/Golden_Lotus_Emblem_with_SKJ_Monogram_31db152a.png"
                  alt="Sri Kamala Jewellers Logo"
                  className="w-full h-full aspect-square object-contain"
                />
              </div>
              <span
                className={`absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border border-white dark:border-stone-900 animate-pulse shadow-xs ${
                  isGuru ? 'bg-[#B38048]' : 'bg-[#6B1D52]'
                }`}
              />
            </div>

            {/* In-Line Brand Name and Strict Leadership Attribution */}
            <div className="flex flex-col justify-center min-w-0">
              <div className="flex items-center gap-2 whitespace-nowrap min-w-0">
                <span className="text-sm sm:text-lg lg:text-xl font-black tracking-wide leading-none truncate text-[#21181E] dark:text-[#FAF9F6]">
                  {isJewellers
                    ? t('brand_name', 'SRI KAMALA JEWELLERS')
                    : t('format_guru_title', 'LUCKY STONE GURU')}
                </span>
                <span className={`hidden lg:inline font-bold ${isGuru ? 'text-[#B38048]/40' : 'text-[#6B1D52]/40'}`}>•</span>
                <span
                  className={`hidden lg:inline text-[11px] tracking-wider uppercase font-bold leading-none ${
                    isGuru ? 'text-[#B38048] dark:text-[#D4A373]' : 'text-[#6B1D52] dark:text-purple-300'
                  }`}
                >
                  {isJewellers
                    ? 'Nukala Srinivas Rao & Nukala Manoj • Ballari'
                    : 'Nukala Srinivas Rao • Vedic Jyotish & Gems'}
                </span>
              </div>
              <span
                className={`lg:hidden text-[9px] sm:text-[10px] tracking-wide font-black truncate leading-tight mt-0.5 ${
                  isGuru ? 'text-[#B38048] dark:text-[#D4A373]' : 'text-[#6B1D52] dark:text-purple-300'
                }`}
              >
                {isJewellers
                  ? 'Nukala Srinivas Rao & Nukala Manoj'
                  : 'Nukala Srinivas Rao'}
              </span>
            </div>
          </div>

          {/* Center: Format Switcher (Kamala Jewellers ⇄ Lucky Stone Guru) */}
          <div className="flex items-center justify-center shrink-0">
            <FormatSwitcher variant="pill" onFormatChange={handleFormatChange} />
          </div>

          {/* Right: In-Line Utilities & Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
            {/* 4-Language Selector (Kannada, Telugu, English, Hindi) */}
            <LanguageSelector variant="pill" />

            {/* Theme Toggle */}
            <ThemeToggle variant="compact" />

            {/* Book Consultation Button */}
            <button
              onClick={() => {
                bellPlayer.playBell(587);
                onOpenBooking();
              }}
              className="inline-flex items-center gap-1 sm:gap-1.5 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full font-black text-[11px] sm:text-xs uppercase tracking-wider hover:brightness-110 active:scale-98 transition-all cursor-pointer shadow-md whitespace-nowrap btn-magenta text-white"
              title="Book Video Consultation with Acharya Nukala Srinivas Rao"
            >
              <PhoneCall className="w-3.5 h-3.5 text-white shrink-0" />
              <span className="hidden sm:inline">{t('book_consultation', 'Book Consultation')}</span>
              <span className="sm:hidden">{t('consult_short', 'Consult')}</span>
            </button>
          </div>
        </div>

        {/* Section 2: Floating Apple macOS-Style Dock Header (Centered Directly Below Main Header) */}
        <div
          className={`w-full flex justify-center items-center py-2 sm:py-2.5 px-3 border-t bg-gradient-to-b from-white/60 via-white/40 to-transparent transition-colors duration-300 ${
            isGuru
              ? 'border-[#B38048]/20 dark:from-[#16120E]/60 dark:to-transparent'
              : 'border-[#6B1D52]/15 dark:from-[#140C12]/60 dark:to-transparent'
          }`}
        >
          <nav
            className={`apple-dock inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full backdrop-blur-2xl border max-w-full overflow-x-auto no-scrollbar transition-all duration-300 ${
              isGuru
                ? 'bg-white/95 dark:bg-[#1A140F]/95 border-[#B38048]/35 shadow-[0_8px_28px_rgba(179,128,72,0.15)]'
                : 'bg-white/95 dark:bg-[#1A1017]/95 border-[#6B1D52]/30 shadow-[0_8px_28px_rgba(107,29,82,0.14)]'
            }`}
          >
            {currentDock.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  title={`${item.label} - ${item.sublabel}`}
                  className={`dock-item group shrink-0 flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'dock-item-active text-white'
                      : 'dock-item-inactive'
                  }`}
                >
                  <Icon
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-200 group-hover:scale-115 ${
                      isActive ? 'text-white' : (isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]')
                    }`}
                  />
                  <span className="text-[11px] sm:text-xs font-bold tracking-tight whitespace-nowrap">
                    {item.label}
                  </span>

                  {/* Active Indicator Dot (Apple macOS Dock Style) */}
                  {isActive ? (
                    <span className="w-1.5 h-1.5 rounded-full bg-white shadow-xs ml-0.5" />
                  ) : item.hasDot ? (
                    <span
                      className={`w-1.5 h-1.5 rounded-full ml-0.5 animate-pulse ${
                        isGuru ? 'bg-[#B38048]' : 'bg-[#6B1D52]'
                      }`}
                    />
                  ) : null}
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* Floating Mobile Bottom Navigation Bar */}
      <nav
        className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden backdrop-blur-xl border-t px-2 py-2 flex items-center justify-around print:hidden transition-colors duration-300 ${
          isGuru
            ? 'border-[#B38048]/25 bg-[#FAF8F5]/98 dark:bg-[#16120E]/98 shadow-[0_-4px_20px_rgba(179,128,72,0.1)]'
            : 'border-[#6B1D52]/20 bg-[#FAF9F6]/98 dark:bg-[#140C12]/98 shadow-[0_-4px_20px_rgba(107,29,82,0.1)]'
        }`}
      >
        {isJewellers ? (
          <>
            <button
              onClick={() => handleTabClick('home')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                activeTab === 'home'
                  ? 'text-[#6B1D52] font-black scale-105'
                  : 'text-stone-600 dark:text-stone-400 font-bold'
              }`}
            >
              <Home className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{t('nav_home', 'Home')}</span>
            </button>

            <button
              onClick={() => handleTabClick('rates')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                activeTab === 'rates'
                  ? 'text-[#6B1D52] font-black scale-105'
                  : 'text-stone-600 dark:text-stone-400 font-bold'
              }`}
            >
              <TrendingUp className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{t('nav_rates', 'Rates')}</span>
            </button>

            <button
              onClick={() => handleTabClick('gold')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                activeTab === 'gold'
                  ? 'text-[#6B1D52] font-black scale-105'
                  : 'text-stone-600 dark:text-stone-400 font-bold'
              }`}
            >
              <Coins className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{t('nav_gold', 'Jewels')}</span>
            </button>

            <button
              onClick={() => handleTabClick('schemes')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                activeTab === 'schemes'
                  ? 'text-[#6B1D52] font-black scale-105'
                  : 'text-stone-600 dark:text-stone-400 font-bold'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{t('nav_schemes', 'Schemes')}</span>
            </button>

            <button
              onClick={() => handleTabClick('contact')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                activeTab === 'contact'
                  ? 'text-[#6B1D52] font-black scale-105'
                  : 'text-stone-600 dark:text-stone-400 font-bold'
              }`}
            >
              <MapPin className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{t('nav_showroom', 'Contact')}</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => handleTabClick('calculator')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                activeTab === 'calculator'
                  ? 'text-[#B38048] font-black scale-105'
                  : 'text-stone-600 dark:text-stone-400 font-bold'
              }`}
            >
              <Compass className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{t('nav_chart', 'Kundali')}</span>
            </button>

            <button
              onClick={() => handleTabClick('dossier')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                activeTab === 'dossier'
                  ? 'text-[#B38048] font-black scale-105'
                  : 'text-stone-600 dark:text-stone-400 font-bold'
              }`}
            >
              <Gem className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{t('nav_stones', 'Stones')}</span>
            </button>

            <button
              onClick={() => handleTabClick('customizer')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                activeTab === 'customizer'
                  ? 'text-[#B38048] font-black scale-105'
                  : 'text-stone-600 dark:text-stone-400 font-bold'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{t('nav_atelier', 'Atelier')}</span>
            </button>

            <button
              onClick={() => handleTabClick('ritual')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                activeTab === 'ritual'
                  ? 'text-[#B38048] font-black scale-105'
                  : 'text-stone-600 dark:text-stone-400 font-bold'
              }`}
            >
              <Flame className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{t('nav_ritual', 'Ritual')}</span>
            </button>

            <button
              onClick={() => handleTabClick('chat')}
              className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition ${
                activeTab === 'chat'
                  ? 'text-[#B38048] font-black scale-105'
                  : 'text-stone-600 dark:text-stone-400 font-bold'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span className="text-[10px] mt-0.5">{t('nav_chat', 'Astrologer')}</span>
            </button>
          </>
        )}
      </nav>
    </>
  );
};
