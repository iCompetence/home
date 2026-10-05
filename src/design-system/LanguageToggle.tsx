'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { NAV_TONE, useNavSurface } from './nav-surface';

/**
 * EN / DE toggle. Switches the project-wide language and keeps the URL in sync
 * (/de/… ↔ /en/…) without a reload, so a refresh renders the same language.
 */
export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const tone = NAV_TONE[useNavSurface()];
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
      className={`cursor-pointer border-0 bg-transparent p-0 font-brand text-body font-medium ${tone.text}`}
    >
      <span className={language === 'en' ? tone.text : tone.muted}>EN</span>
      <span className={tone.muted}> / </span>
      <span className={language === 'de' ? tone.text : tone.muted}>DE</span>
    </button>
  );
}
