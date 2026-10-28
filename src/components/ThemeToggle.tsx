import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { bellPlayer } from '../utils/audioBell';
import { useAppFormat } from '../context/FormatContext';

interface Props {
  className?: string;
  showLabel?: boolean;
  variant?: 'compact' | 'pill' | 'icon';
}

export const ThemeToggle: React.FC<Props> = ({
  className = '',
  showLabel = false,
  variant = 'pill',
}) => {
  const { theme, toggleTheme, isDark } = useTheme();
  const { isGuru } = useAppFormat();

  const brandColor = isGuru ? '#B38048' : '#6B1D52';

  const handleToggle = () => {
    bellPlayer.playBell(isDark ? 528 : 784);
    toggleTheme();
  };

  if (variant === 'compact') {
    return (
      <button
        onClick={handleToggle}
        aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
        title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
        className={`p-1.5 rounded-xl transition-all duration-300 flex items-center justify-center cursor-pointer border ${
          isDark
            ? (isGuru
                ? 'bg-stone-900 border-[#B38048]/40 text-[#B38048] hover:bg-stone-800'
                : 'bg-stone-900 border-[#6B1D52]/40 text-[#6B1D52] hover:bg-stone-800')
            : (isGuru
                ? 'bg-white/90 border-[#B38048]/35 text-[#B38048] hover:bg-[#B38048]/10'
                : 'bg-white/90 border-[#6B1D52]/30 text-[#6B1D52] hover:bg-[#6B1D52]/10')
        } ${className}`}
      >
        {isDark ? (
          <Sun className={`w-3.5 h-3.5 ${isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'}`} />
        ) : (
          <Moon className={`w-3.5 h-3.5 ${isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'}`} />
        )}
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      aria-label={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
      title={isDark ? 'Switch to Light mode' : 'Switch to Dark mode'}
      className={`group relative inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border transition-all duration-300 cursor-pointer ${
        isDark
          ? (isGuru
              ? 'bg-stone-900/95 border-[#B38048]/50 text-[#D4A373]'
              : 'bg-stone-900/95 border-[#6B1D52]/50 text-purple-200')
          : (isGuru
              ? 'bg-white/95 border-[#B38048]/40 text-stone-900'
              : 'bg-white/95 border-[#6B1D52]/30 text-stone-900')
      } ${className}`}
    >
      <div className="relative w-4 h-4 flex items-center justify-center">
        {isDark ? (
          <Sun className={`w-4 h-4 ${isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'}`} />
        ) : (
          <Moon className={`w-4 h-4 ${isGuru ? 'text-[#B38048]' : 'text-[#6B1D52]'}`} />
        )}
      </div>

      <span className="text-xs font-bold uppercase tracking-wider">
        {isDark ? 'Dark' : 'Light'}
      </span>
    </button>
  );
};
