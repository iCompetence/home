'use client';

import { useLanguage } from '@/contexts/LanguageContext';

/**
 * EN / DE toggle. Switches the project-wide language and keeps the URL in sync
 * (/de/… ↔ /en/…) without a reload, so a refresh renders the same language.
 */
export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const next = language === 'en' ? 'de' : 'en';

  const toggle = () => {
    setLanguage(next);
    if (typeof window !== 'undefined') {
      const path = window.location.pathname.replace(/^\/(de|en)(?=\/|$)/, `/${next}`);
      window.history.replaceState(null, '', path + window.location.search + window.location.hash);
    }
  };

  return (
    <button
      type="button"
      aria-label={t(next === 'de' ? 'topNav.switchToGerman' : 'topNav.switchToEnglish')}
      onClick={toggle}
      className="cursor-pointer border-0 bg-transparent p-0 font-brand text-body font-medium text-lav-white"
    >
      <span className={language === 'en' ? 'text-lav-white' : 'text-lav-white/70'}>EN</span>
      <span className="text-lav-white/70"> / </span>
      <span className={language === 'de' ? 'text-lav-white' : 'text-lav-white/70'}>DE</span>
    </button>
  );
}
