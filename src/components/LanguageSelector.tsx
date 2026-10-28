import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check, ChevronDown } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Language, SUPPORTED_LANGUAGES } from '../i18n/translations';
import { bellPlayer } from '../utils/audioBell';
import { useAppFormat } from '../context/FormatContext';

interface Props {
  variant?: 'pill' | 'segmented' | 'compact';
  className?: string;
}

export const LanguageSelector: React.FC<Props> = ({ variant = 'pill', className = '' }) => {
  const { language, setLanguage } = useLanguage();
  const { isGuru } = useAppFormat();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const brandColor = isGuru ? '#B38048' : '#6B1D52';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (lang: Language) => {
    bellPlayer.playBell(587);
    setLanguage(lang);
    setIsOpen(false);
  };

  const currentOption = SUPPORTED_LANGUAGES.find((l) => l.code === language) || SUPPORTED_LANGUAGES[0];

  if (variant === 'segmented') {
    return (
      <div
        className={`inline-flex items-center p-1 rounded-2xl bg-white/90 dark:bg-stone-900 border shadow-xs ${
          isGuru ? 'border-[#B38048]/35' : 'border-[#6B1D52]/30'
        } ${className}`}
      >
        {SUPPORTED_LANGUAGES.map((l) => {
          const isActive = l.code === language;
          return (
            <button
              key={l.code}
              type="button"
              onClick={() => handleSelect(l.code)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? (isGuru
                      ? 'bg-gradient-to-r from-[#C59359] to-[#B38048] text-white shadow-xs scale-102'
                      : 'bg-gradient-to-r from-[#6B1D52] to-[#3B0E2C] text-white shadow-xs scale-102')
                  : 'text-stone-700 dark:text-stone-300 hover:opacity-80'
              }`}
            >
              {l.nativeName}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-bold whitespace-nowrap select-none transition-all cursor-pointer shadow-xs ${
          isOpen
            ? (isGuru
                ? 'bg-[#B38048]/10 border-[#B38048] text-[#B38048] ring-2 ring-[#B38048]/30 shadow-sm'
                : 'bg-[#6B1D52]/10 border-[#6B1D52] text-[#6B1D52] ring-2 ring-[#6B1D52]/30 shadow-sm')
            : (isGuru
                ? 'bg-white/90 dark:bg-stone-900/90 border-[#B38048]/35 text-stone-800 dark:text-stone-100 hover:border-[#B38048]'
                : 'bg-white/90 dark:bg-stone-900/90 border-[#6B1D52]/30 text-stone-800 dark:text-stone-100 hover:border-[#6B1D52]')
        }`}
        title="Change Language / ಭಾಷೆಯನ್ನು ಬದಲಾಯಿಸಿ / భాషను మార్చండి / भाषा बदलें"
      >
        <Globe
          className={`w-3.5 h-3.5 shrink-0 ${isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'}`}
        />
        <span
          className={`font-serif-royal font-black ${
            isGuru ? 'text-[#B38048] dark:text-[#D4A373]' : 'text-[#6B1D52] dark:text-purple-300'
          }`}
        >
          {currentOption.nativeName}
        </span>
        <ChevronDown
          className={`w-3 h-3 text-stone-500 dark:text-stone-400 transition-transform duration-200 ${
            isOpen ? `rotate-180 ${isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'}` : ''
          }`}
        />
      </button>

      {/* Dropdown Menu - Explicitly layered in front of floating dock with z-[100] */}
      {isOpen && (
        <div
          className={`absolute right-0 mt-2 w-52 rounded-2xl bg-white/98 dark:bg-stone-900/98 backdrop-blur-2xl border-2 shadow-[0_20px_50px_rgba(0,0,0,0.18)] py-1.5 z-[100] animate-in fade-in slide-in-from-top-2 duration-150 divide-y divide-stone-100 dark:divide-stone-800 ${
            isGuru ? 'border-[#B38048]/50' : 'border-[#6B1D52]/50'
          }`}
        >
          {/* Subtle upward triangle pointer anchor */}
          <div
            className={`absolute -top-1.5 right-4 w-3 h-3 rotate-45 bg-white dark:bg-stone-900 border-t-2 border-l-2 pointer-events-none ${
              isGuru ? 'border-[#B38048]/50' : 'border-[#6B1D52]/50'
            }`}
          />

          <div
            className={`px-3.5 py-1.5 text-[10px] font-black uppercase tracking-wider flex items-center justify-between ${
              isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'
            }`}
          >
            <span>Select Language</span>
            <span className="text-[9px] font-bold text-stone-400">4 Languages</span>
          </div>

          <div className="py-1">
            {SUPPORTED_LANGUAGES.map((l) => {
              const isActive = l.code === language;
              return (
                <button
                  key={l.code}
                  type="button"
                  onClick={() => handleSelect(l.code)}
                  className={`w-full px-3.5 py-2 text-left text-xs font-bold transition flex items-center justify-between cursor-pointer ${
                    isActive
                      ? (isGuru
                          ? 'bg-[#B38048]/15 text-[#B38048] font-black'
                          : 'bg-[#6B1D52]/10 text-[#6B1D52] font-black')
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-100/60 dark:hover:bg-stone-800/60'
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-serif-royal">{l.nativeName}</span>
                    <span className="text-[10px] text-stone-500 dark:text-stone-400 font-medium">
                      {l.label}
                    </span>
                  </div>

                  {isActive && (
                    <span
                      className={`w-5 h-5 rounded-full text-white flex items-center justify-center shadow-xs shrink-0 ${
                        isGuru ? 'bg-[#B38048]' : 'bg-[#6B1D52]'
                      }`}
                    >
                      <Check className="w-3 h-3" />
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
