'use client';

import { useLanguage } from '@/contexts/LanguageContext';
import { PAGE_UPDATED, formatPageDate, type DatedRoute } from '@/lib/page-dates';
import { cn } from '@/components/ui/utils';

/**
 * "Zuletzt aktualisiert: 13.11.2026" — the visible date of a page's last
 * content change. Same date as `dateModified` in the page's JSON-LD (both
 * read PAGE_UPDATED), as a <time> element.
 */
export function UpdatedNote({ route, className }: { route: DatedRoute; className?: string }) {
  const { t, language } = useLanguage();
  const iso = PAGE_UPDATED[route];
  return (
    <p data-ds="UpdatedNote" className={cn('lav-small font-normal text-lav-navy/70', className)}>
      {t('lavender.common.updated')}: <time dateTime={iso}>{formatPageDate(iso, language)}</time>
    </p>
  );
}
