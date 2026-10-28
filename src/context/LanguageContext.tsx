import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  Language,
  SUPPORTED_LANGUAGES,
  TRANSLATIONS,
  PLANET_TRANSLATIONS,
  RASHI_TRANSLATIONS,
  GEMSTONE_TRANSLATIONS,
  FINGER_TRANSLATIONS,
  METAL_TRANSLATIONS,
} from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  getPlanetName: (planet: string) => string;
  getRashiName: (rashi: string) => string;
  getGemstoneName: (stoneKey: string, fallback?: string) => string;
  getFingerName: (fingerText: string) => string;
  getMetalName: (metalText: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('skj_language');
      if (stored === 'kn' || stored === 'te' || stored === 'en' || stored === 'hi') {
        return stored;
      }
    }
    // Default to Kannada (flagship home state of Ballari, Karnataka)
    return 'kn';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('skj_language', language);
      document.documentElement.lang = language;
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  const t = (key: string, fallback?: string): string => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (langDict && langDict[key]) {
      return langDict[key];
    }
    const enDict = TRANSLATIONS.en;
    if (enDict && enDict[key]) {
      return enDict[key];
    }
    return fallback || key;
  };

  const getPlanetName = (planet: string): string => {
    const match = Object.keys(PLANET_TRANSLATIONS).find(
      (k) => planet.toLowerCase().includes(k.toLowerCase())
    );
    if (match && PLANET_TRANSLATIONS[match][language]) {
      return PLANET_TRANSLATIONS[match][language];
    }
    return planet;
  };

  const getRashiName = (rashi: string): string => {
    const match = Object.keys(RASHI_TRANSLATIONS).find(
      (k) => rashi.toLowerCase().includes(k.toLowerCase())
    );
    if (match && RASHI_TRANSLATIONS[match][language]) {
      return RASHI_TRANSLATIONS[match][language];
    }
    return rashi;
  };

  const getGemstoneName = (stoneKey: string, fallback?: string): string => {
    const match = Object.keys(GEMSTONE_TRANSLATIONS).find(
      (k) => stoneKey.toLowerCase().includes(k.toLowerCase())
    );
    if (match && GEMSTONE_TRANSLATIONS[match][language]) {
      return GEMSTONE_TRANSLATIONS[match][language];
    }
    return fallback || stoneKey;
  };

  const getFingerName = (fingerText: string): string => {
    const lower = fingerText.toLowerCase();
    if (lower.includes('index') || lower.includes('tarjani')) return FINGER_TRANSLATIONS.Index[language];
    if (lower.includes('middle') || lower.includes('madhyama')) return FINGER_TRANSLATIONS.Middle[language];
    if (lower.includes('ring') || lower.includes('anamika')) return FINGER_TRANSLATIONS.Ring[language];
    if (lower.includes('little') || lower.includes('kanishtha')) return FINGER_TRANSLATIONS.Little[language];
    return fingerText;
  };

  const getMetalName = (metalText: string): string => {
    const lower = metalText.toLowerCase();
    if (lower.includes('22k') || lower.includes('gold')) return METAL_TRANSLATIONS.Gold22K[language];
    if (lower.includes('panchdhatu')) return METAL_TRANSLATIONS.Panchdhatu[language];
    if (lower.includes('silver') || lower.includes('925')) return METAL_TRANSLATIONS.Silver925[language];
    if (lower.includes('platinum')) return METAL_TRANSLATIONS.Platinum[language];
    return metalText;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        getPlanetName,
        getRashiName,
        getGemstoneName,
        getFingerName,
        getMetalName,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
