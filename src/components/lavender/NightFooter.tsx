'use client';

import { type ReactNode } from 'react';
import { ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/components/ui/utils';
import { LINKEDIN_URL, LinkedInGlyph, siteHref } from '@/design-system';
import { HamburgGlass } from './HamburgGlass';

/**
 * How the pages of the night design end: the closing line with its action on
 * the night ground, the glass skyline of Hamburg, and below it the legal strip.
 *
 * - NightClosing: for pages with a closing call to action (same props as the
 *   design system's ClosingBlock, which it replaces on the preview pages).
 * - NightFooter: the same without a closing line (contact, legal pages).
 * - LegalStrip: the strip alone; the home page puts it under its own stage.
 */

/** Look of a button on the night ground: white, the star gradient on hover and focus. Pair with variant="white". */
export const NIGHT_BUTTON =
  'lav-star-hover transition-[color,scale]! duration-[var(--duration-fast)] ease-out hover:text-lav-white hover:opacity-100! focus-visible:text-lav-white active:scale-[0.96]';

/** "Based in Hamburg." on the left; imprint, privacy, LinkedIn and "back to top" on the right. 84 px tall; every target is at least 44 px. */
export function LegalStrip({ className }: { className?: string }) {
  const { t, language } = useLanguage();
  const legal =
    'lav-body inline-flex min-h-11 items-center font-medium text-lav-white/70 no-underline hover:opacity-100!';
  const toTop = () =>
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    });
  return (
    <div
      className={cn(
        'mx-auto flex h-[84px] w-full max-w-frame items-center justify-between gap-4 px-[var(--section-pad-h)]',
        className,
      )}
    >
      {/* Where the trip ends: under the skyline. Left out on phones, where the row has no room. */}
      <p className="lav-body font-medium text-lav-white max-sm:hidden">{t('lavender.footer.basedIn')}</p>
      <div className="flex items-center gap-4 max-sm:w-full max-sm:justify-between md:gap-8">
        <a href={siteHref(language, 'imprint')} className={legal}>
          <span className="lav-star-text">{t('footer.imprint')}</span>
        </a>
        <a href={siteHref(language, 'privacy-policy')} className={legal}>
          <span className="lav-star-text">{t('footer.privacy')}</span>
        </a>
        <a
          href={LINKEDIN_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('lavender.common.linkedin')}
          className="lav-star-hover inline-flex size-11 items-center justify-center rounded-pill bg-lav-white/10 text-lav-white no-underline hover:opacity-100!"
        >
          <LinkedInGlyph size={18} />
        </a>
        <button
          type="button"
          onClick={toTop}
          aria-label={t('footer.backToTop')}
          className="inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap border-0 bg-transparent text-lav-white/70 hover:opacity-100!"
        >
          {/* On phones the arrow alone: the row has no room for the words. */}
          <span className="lav-star-text lav-body font-medium max-sm:hidden">{t('footer.backToTop')}</span>
          <ChevronUp size={16} strokeWidth={2} />
        </button>
      </div>
    </div>
  );
}

export type NightClosingProps = {
  /** Closing headline, e.g. "Bereit, Anspruch in Ergebnisse zu verwandeln?" Left out on pages without one. */
  heading?: string;
  /** The call to action, composed by the page (variant="white", className={NIGHT_BUTTON}). */
  action?: ReactNode;
  /** Anchor target, e.g. for a "Contact" entry in the page's sections. */
  id?: string;
  className?: string;
};

export function NightClosing({ heading, action, id, className }: NightClosingProps) {
  return (
    <footer
      id={id}
      data-ds="FooterNight"
      data-surface="inverse"
      className={cn(
        'lav-night-stars relative overflow-hidden bg-lav-navy pt-[var(--section-pad-v)] text-lav-white',
        className,
      )}
    >
      {heading && (
        <div className="relative z-[1] mx-auto flex w-full max-w-frame flex-col items-start gap-8 px-[var(--section-pad-h)] lg:gap-10">
          <h2 className="lav-h1 max-w-measure-lead text-lav-white [text-wrap:balance]">{heading}</h2>
          {action}
        </div>
      )}
      {/* On phones the middle of the skyline, larger; from tablets up the whole of it. */}
      <HamburgGlass
        className={cn('left-[-36%] w-[160%] md:left-0 md:w-full', heading ? 'mt-10 lg:-mt-[5vw]' : 'mt-0')}
      />
      <LegalStrip className="relative z-[1]" />
    </footer>
  );
}

export function NightFooter() {
  return <NightClosing />;
}
