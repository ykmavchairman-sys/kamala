import React from 'react';
import { Crown, Gem } from 'lucide-react';
import { useAppFormat, AppFormat } from '../context/FormatContext';
import { useLanguage } from '../context/LanguageContext';

interface Props {
  variant?: 'header' | 'banner' | 'pill';
  className?: string;
  onFormatChange?: (format: AppFormat) => void;
}

export const FormatSwitcher: React.FC<Props> = ({ variant = 'header', className = '', onFormatChange }) => {
  const { format, setFormat, isJewellers, isGuru } = useAppFormat();
  const { t } = useLanguage();

  const handleSwitch = (newFormat: AppFormat) => {
    setFormat(newFormat);
    if (onFormatChange) {
      onFormatChange(newFormat);
    }
  };

  if (variant === 'banner') {
    return (
      <div
        className={`w-full border-b py-2 px-3 sm:px-6 transition-all ${
          isGuru
            ? 'bg-gradient-to-r from-[#FAF8F5] via-white to-[#FAF8F5] dark:from-[#1E1712] dark:via-[#16120E] dark:to-[#1E1712] border-[#B38048]/30'
            : 'bg-gradient-to-r from-[#FDF8FB] via-white to-[#FDF8FB] dark:from-[#1D111A] dark:via-[#140C12] dark:to-[#1D111A] border-[#6B1D52]/25'
        } ${className}`}
      >
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2.5">
          <div className="flex items-center gap-2 text-xs font-medium text-stone-800 dark:text-stone-200 text-center sm:text-left">
            <span
              className={`w-2 h-2 rounded-full animate-ping ${
                isGuru ? 'bg-[#B38048]' : 'bg-[#6B1D52]'
              }`}
            />
            <span>
              {isJewellers
                ? t('format_jewellers_banner', 'Kamala Jewellers — Bridal Gold, 22K/24K Bullion Rates & Monthly Passbook Schemes')
                : t('format_guru_banner', 'Lucky Stone Guru — Parashara Kundali, 9th House Gems, Atelier & Vedic Rituals')}
            </span>
          </div>

          <div
            className={`flex items-center p-1 rounded-2xl bg-white/95 dark:bg-stone-900/95 border shadow-sm shrink-0 ${
              isGuru ? 'border-[#B38048]/40' : 'border-[#6B1D52]/30'
            }`}
          >
            <button
              onClick={() => handleSwitch('jewellers')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isJewellers
                  ? 'bg-gradient-to-r from-[#6B1D52] to-[#3B0E2C] text-white shadow-md font-black scale-102'
                  : 'text-stone-600 dark:text-stone-400 hover:text-[#6B1D52]'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-white" />
              <span>{t('format_jewellers_title', 'Kamala Jewellers')}</span>
            </button>

            <button
              onClick={() => handleSwitch('guru')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                isGuru
                  ? 'bg-gradient-to-r from-[#C59359] via-[#B38048] to-[#8F5E29] text-white shadow-md font-black scale-102'
                  : 'text-stone-600 dark:text-stone-400 hover:text-[#B38048]'
              }`}
            >
              <Gem className="w-3.5 h-3.5 text-white" />
              <span>{t('format_guru_title', 'Lucky Stone Guru')}</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Header compact pill switcher
  return (
    <div
      className={`inline-flex items-center p-0.5 sm:p-1 rounded-xl sm:rounded-2xl bg-white/95 dark:bg-stone-900/95 border shadow-xs backdrop-blur-md transition-colors ${
        isGuru ? 'border-[#B38048]/40' : 'border-[#6B1D52]/30'
      } ${className}`}
    >
      {/* Option 1: Kamala Jewellers (Dark Purple) */}
      <button
        onClick={() => handleSwitch('jewellers')}
        className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all duration-200 cursor-pointer whitespace-nowrap ${
          isJewellers
            ? 'bg-gradient-to-r from-[#6B1D52] via-[#52153E] to-[#3B0E2C] text-white shadow-sm scale-102 border border-[#6B1D52]/50'
            : 'text-stone-700 dark:text-stone-300 hover:text-[#6B1D52] dark:hover:text-white font-bold'
        }`}
        title="Switch to Kamala Jewellers: Gold, Jewels, Live Rates & Monthly Schemes"
      >
        <Crown className={`w-3.5 h-3.5 ${isJewellers ? 'text-white' : 'text-[#6B1D52]'}`} />
        <span>{t('format_jewellers_title', 'Kamala Jewellers')}</span>
      </button>

      {/* Option 2: Lucky Stone Guru (Tan Color) */}
      <button
        onClick={() => handleSwitch('guru')}
        className={`flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg sm:rounded-xl text-[11px] sm:text-xs font-black transition-all duration-200 cursor-pointer whitespace-nowrap ${
          isGuru
            ? 'bg-gradient-to-r from-[#C59359] via-[#B38048] to-[#8F5E29] text-white shadow-sm scale-102 border border-[#B38048]/50'
            : 'text-stone-700 dark:text-stone-300 hover:text-[#B38048] dark:hover:text-white font-bold'
        }`}
        title="Switch to Lucky Stone Guru: Birth Chart, Lucky Stones, Atelier & Astrologer Desk"
      >
        <Gem className={`w-3.5 h-3.5 ${isGuru ? 'text-white' : 'text-[#B38048]'}`} />
        <span>{t('format_guru_title', 'Lucky Stone Guru')}</span>
      </button>
    </div>
  );
};
