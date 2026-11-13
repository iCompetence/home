'use client';

import { useRef, type MouseEvent, type ReactNode } from 'react';
import { ArrowUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/components/ui/utils';
import { LINKEDIN_URL, siteHref } from '@/design-system';
import { fromKeyboard, glideTo } from './glide';
import { HamburgGlass } from './HamburgGlass';
import { useTextHaze } from './textHaze';

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
    'lav-body inline-flex min-h-11 items-center font-medium text-lav-white/70 no-underline hover:opacity-100! max-[359px]:text-[14px]';
  // The same glide as every in-page link (glide.ts), not the browser's own smooth scrolling.
  const toTop = (e: MouseEvent) => glideTo(null, undefined, fromKeyboard(e));
  const press = 'transition-[scale]! duration-[var(--duration-fast)] ease-out active:scale-[0.96]';
  return (
    <div
      className={cn(
        'mx-auto flex h-[84px] w-full max-w-frame items-center justify-between gap-4 px-[var(--section-pad-h)]',
        className,
      )}
    >
      {/* Where the trip ends: under the skyline. Left out on phones, where the row has no room. */}
      <p className="lav-body font-medium text-lav-white max-sm:hidden">{t('lavender.footer.basedIn')}</p>
      {/* On phones the four share the row evenly; on the narrowest in a smaller size. */}
      <div className="flex items-center gap-4 max-sm:w-full max-sm:justify-between max-sm:gap-0 md:gap-8">
        <a href={siteHref(language, 'imprint')} className={legal}>
          <span className="lav-star-text">{t('footer.imprint')}</span>
        </a>
        <a href={siteHref(language, 'privacy-policy')} className={legal}>
          <span className="lav-star-text">{t('footer.privacy')}</span>
        </a>
        <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className={legal}>
          <span className="lav-star-text">LinkedIn</span>
        </a>
        <button
          type="button"
          onClick={toTop}
          aria-label={t('footer.backToTop')}
          className={`inline-flex min-h-11 min-w-11 shrink-0 cursor-pointer items-center justify-center gap-2 whitespace-nowrap border-0 bg-transparent text-lav-white/70 hover:opacity-100! ${press}`}
        >
          {/* On phones the arrow alone: the row has no room for the words. */}
          <span className="lav-star-text lav-body font-medium max-sm:hidden">{t('footer.backToTop')}</span>
          {/* The same arrow family as in the buttons. */}
          <ArrowUp size={20} strokeWidth={2} />
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

/**
 * The closing line and its action, centred in the upper part of the last
 * screen. Shared by the home page's stage and the subpages' footer, so both
 * end in the same picture. Marked for useTextHaze: the city stands back behind it.
 */
export function ClosingText({ heading, children }: { heading: string; children?: ReactNode }) {
  return (
    <div className="relative z-[1] mx-auto w-full max-w-frame px-[var(--section-pad-h)] pt-[108px] lg:pt-[140px]">
      <div className="pointer-events-auto mx-auto flex max-w-measure-lead flex-col items-center gap-8 text-center lg:gap-10">
        <h2 data-haze className="lav-h1 text-lav-white [text-wrap:balance]">
          {heading}
        </h2>
        {children && (
          <div data-haze="box" className="inline-flex">
            {children}
          </div>
        )}
      </div>
    </div>
  );
}

export function NightClosing({ heading, action, id, className }: NightClosingProps) {
  const root = useRef<HTMLElement>(null);
  useTextHaze(
    () => ({
      glass: root.current?.querySelector<HTMLElement>('.lav-hamburg-glass'),
      texts: root.current?.querySelectorAll<HTMLElement>('[data-haze]') ?? [],
    }),
    [heading],
  );
  return (
    <footer
      ref={root}
      id={id}
      data-ds="FooterNight"
      data-surface="inverse"
      className={cn(
        'lav-night-stars relative flex flex-col overflow-hidden bg-lav-navy text-lav-white',
        // With a closing line the footer is one screen, laid out like the home page's last
        // screen: the line at the top, the city along the lower edge, the strip below it.
        heading ? 'h-[max(100svh,540px)]' : 'pt-[var(--section-pad-v)]',
        className,
      )}
    >
      {heading && <ClosingText heading={heading}>{action}</ClosingText>}
      {/* On phones the middle of the skyline, larger; from tablets up the whole of it. */}
      <HamburgGlass
        className={cn('left-[-36%] w-[160%] md:left-0 md:w-full', heading && 'absolute! bottom-[84px]')}
      />
      <LegalStrip className="relative z-[1] mt-auto" />
    </footer>
  );
}

export function NightFooter() {
  return <NightClosing />;
}
