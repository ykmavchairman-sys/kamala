import React from 'react';
import { LanguageSelector } from './LanguageSelector';

interface Props {
  variant?: 'compact' | 'expanded';
  className?: string;
}

export const LanguageToggle: React.FC<Props> = ({ className = '' }) => {
  return <LanguageSelector variant="pill" className={className} />;
};

