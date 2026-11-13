import type { Language } from './LanguageContext';

/**
 * New copy of the redesigned pages for search and AI answers (SEO/GEO):
 * the explanatory sections, their FAQs and small labels such as "Zuletzt
 * aktualisiert". Kept apart from lavender-overrides.ts (changed wording of
 * existing keys) so both can be edited in parallel without conflicts.
 *
 * Only consulted inside <LanguageProvider variant="lavender">, after the
 * overrides. Every key needs both languages.
 *
 * Go-live: fold these values into `translations` and delete this file.
 */
export const lavenderSeo: Record<string, Record<Language, string>> = {
  // --- Shared ---
  'lavender.common.updated': { de: 'Zuletzt aktualisiert', en: 'Last updated' },
};
