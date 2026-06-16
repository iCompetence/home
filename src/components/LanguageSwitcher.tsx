'use client'

import { usePathname, useRouter } from 'next/navigation';
import { useLanguage } from '../contexts/LanguageContext';

interface LanguageSwitcherProps {
  className?: string;
  style?: React.CSSProperties;
}

export const LanguageSwitcher = ({ className = '', style = {} }: LanguageSwitcherProps) => {
  const { language, setLanguage } = useLanguage();
  const pathname = usePathname();
  const router = useRouter();

  const toggleLanguage = () => {
    const target = language === 'en' ? 'de' : 'en';
    // The language lives in the URL (/de/… or /en/…) — navigate to the same
    // page under the other locale so the URL, the <html lang> and the indexed
    // content stay in sync. Keep the state update as a fallback.
    setLanguage(target);
    if (pathname && /^\/(en|de)(\/|$)/.test(pathname)) {
      router.push(pathname.replace(/^\/(en|de)/, `/${target}`));
    } else {
      router.push(`/${target}/`);
    }
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
