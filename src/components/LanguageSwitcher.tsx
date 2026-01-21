'use client'

import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  style?: React.CSSProperties;
}

export const LanguageSwitcher = ({ className = '', style = {} }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'de' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className={`px-4 py-2.5 rounded-full border-2 transition-all duration-300 cursor-pointer ${className}`}
      style={{
        color: 'var(--gray-white)',
        fontSize: '14px',
        fontWeight: '500',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        background: 'transparent',
        ...style
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = '#0B99CC';
        e.currentTarget.style.color = '#0B99CC';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
        e.currentTarget.style.color = 'var(--gray-white)';
      }}
    >
      {language.toUpperCase() === 'EN' ? 'EN' : 'DE'} / {language.toUpperCase() === 'EN' ? 'DE' : 'EN'}
    </button>
  );
};
