import React, { createContext, useContext, useState, useEffect } from 'react';
import { bellPlayer } from '../utils/audioBell';

export type AppFormat = 'jewellers' | 'guru';

interface FormatContextType {
  format: AppFormat;
  setFormat: (format: AppFormat) => void;
  toggleFormat: () => void;
  isJewellers: boolean;
  isGuru: boolean;
}

const FormatContext = createContext<FormatContextType | undefined>(undefined);

export const FormatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [format, setFormatState] = useState<AppFormat>(() => {
    try {
      const saved = localStorage.getItem('skj_app_format');
      if (saved === 'jewellers' || saved === 'guru') {
        return saved;
      }
    } catch {}
    return 'jewellers';
  });

  useEffect(() => {
    try {
      localStorage.setItem('skj_app_format', format);
    } catch {}
  }, [format]);

  const setFormat = (newFormat: AppFormat) => {
    if (newFormat !== format) {
      bellPlayer.playBell(587);
      setFormatState(newFormat);
    }
  };

  const toggleFormat = () => {
    const nextFormat: AppFormat = format === 'jewellers' ? 'guru' : 'jewellers';
    setFormat(nextFormat);
  };

  return (
    <FormatContext.Provider
      value={{
        format,
        setFormat,
        toggleFormat,
        isJewellers: format === 'jewellers',
        isGuru: format === 'guru',
      }}
    >
      {children}
    </FormatContext.Provider>
  );
};

export const useAppFormat = (): FormatContextType => {
  const context = useContext(FormatContext);
  if (!context) {
    throw new Error('useAppFormat must be used within a FormatProvider');
  }
  return context;
};
