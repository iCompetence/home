'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnchorTabsPresent, useAnchorTabsStuck } from './AnchorTabs';
import { NAV_TONE, NavSurfaceContext, useNavSurface, type NavSurface } from './nav-surface';
import { BurgerMenu } from './BurgerMenu';
import { useBreakpoint, isCompact, type Bp } from './useBreakpoint';
import { smoothAnchor } from './nav-links';
import { siteHref } from './routes';
import { DURATION, EASE } from './motion';
import { cn } from '@/components/ui/utils';

export type TopNavProps = {
  /**
   * Where the logo leads. '#top' (default) scrolls the homepage back up; other
   * pages pass the home URL.
   */
  logoHref?: string;
  /**
   * 'light' = white pill, black logo, light burger panel — for dark pages
   * (the principles page), where the navy pill would vanish (2026-10-02).
   */
  surface?: NavSurface;
};

/**
 * Sticky site header in the new design: logo, CTA and burger. Section
 * navigation lives in the page's AnchorTabs (homepage, product pages), never
 * in the nav (2026-10-02). Compact (mobile/tablet) vs desktop.
 */
export function TopNav({ logoHref = '#top', surface = 'dark' }: TopNavProps) {
  const bp = useBreakpoint();
  return (
    <NavSurfaceContext.Provider value={surface}>
      {isCompact(bp) ? (
        <CompactNav bp={bp} logoHref={logoHref} />
      ) : (
        <DesktopNav logoHref={logoHref} />
      )}
    </NavSurfaceContext.Provider>
  );
}

/** Measures the nav pill so the burger panel can match its width. */
function usePillWidth(deps: unknown[] = []) {
  const ref = useRef<HTMLElement | null>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const measure = () => {
      if (ref.current) setWidth(ref.current.getBoundingClientRect().width);
    };
    measure();
    let ro: ResizeObserver | null = null;
    if (ref.current && typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(ref.current);
    }
    window.addEventListener('resize', measure);
    return () => {
      ro?.disconnect();
      window.removeEventListener('resize', measure);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
  return { ref, width };
}

function CtaButton({ compact }: { compact?: boolean }) {
  const { t, language } = useLanguage();
  return (
    <a
      href={siteHref(language, 'contact')}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-pill bg-lav-blue font-brand font-medium text-lav-navy no-underline ${
        compact ? 'px-3.5 py-2 text-[14px] md:px-4' : 'gap-2 px-6 py-3 text-body'
      }`}
    >
      {t('topNav.letsTalk')}
      <ArrowUpRight size={compact ? 16 : 20} strokeWidth={2} />
    </a>
  );
}

/**
 * Mobile and tablet: logo, CTA, burger in one pill.
 *
 * On a page with AnchorTabs, once they stick, the pill gives way to just
 * CTA + burger (tablet) or the burger (mobile) inside the navy tab row — one
 * 56px row instead of pill plus tabs (decided 2026-10-02). Both sit exactly
 * where they sat in the pill, so the burger panel opens in the same place.
 * The pill stays in the layout, hidden, so the header keeps its height and
 * nothing below moves.
 */
function CompactNav({ bp, logoHref }: { bp: Bp; logoHref: string }) {
  const isMobile = bp === 'mobile';
  const surface = useNavSurface();
  const tone = NAV_TONE[surface];
  const { ref, width } = usePillWidth();
  const docked = useAnchorTabsStuck();

  return (
    // Docked, the nav leaves with the tab row at the footer (--anchor-push).
    <header className="pointer-events-none sticky top-0 z-50 w-full translate-y-[var(--anchor-push,0px)]">
      {docked && (
        <div className="absolute inset-x-0 top-0 mx-auto flex h-14 w-full max-w-frame items-center justify-end px-8 md:px-12">
          <div className="pointer-events-auto flex items-center gap-3.5 text-lav-white md:gap-[18px]">
            {!isMobile && <CtaButton compact />}
            <BurgerMenu
              trigger="tap"
              columns={isMobile ? 1 : 2}
              iconSize={isMobile ? 22 : 24}
              pillWidth={width}
              pillPaddingX={isMobile ? 16 : 24}
              // Panel 16px below the 56px row, as below the pill.
              pillPaddingY={isMobile ? 9 : 8}
            />
          </div>
        </div>
      )}
      <div
        className={cn('mx-auto w-full max-w-frame px-4 pt-3 md:px-6 md:pt-3.5', docked && 'invisible')}
      >
        <nav data-ds="TopNav"
          ref={ref as React.Ref<HTMLElement>}
          data-surface={surface}
          className={cn('pointer-events-auto flex w-full items-center justify-between gap-3 rounded-pill px-4 py-2.5 md:gap-5 md:px-6 md:py-3', tone.pill)}
        >
          <a href={logoHref} onClick={smoothAnchor} className="inline-flex items-center">
            <img
              src={tone.logo}
              alt="iCompetence"
              className="block h-8 w-auto md:h-10"
            />
          </a>

          <div className="flex items-center gap-3.5 md:gap-[18px]">
            <CtaButton compact />
            <BurgerMenu
              trigger="tap"
              columns={isMobile ? 1 : 2}
              iconSize={isMobile ? 22 : 24}
              pillWidth={width}
              pillPaddingX={isMobile ? 16 : 24}
              pillPaddingY={isMobile ? 10 : 12}
            />
          </div>
        </nav>
      </div>
    </header>
  );
}

/**
 * Desktop: a full-width bar that turns into a compact pill (CTA + burger) on
 * the right. On pages with AnchorTabs it stays full until the tabs stick and
 * then docks into their navy row; on all other pages it turns after 80 px
 * (2026-10-02).
 */
function DesktopNav({ logoHref }: { logoHref: string }) {
  const surface = useNavSurface();
  const tone = NAV_TONE[surface];
  const [scrolled, setScrolled] = useState(false);
  const tabsStuck = useAnchorTabsStuck();
  const docksIntoTabs = useAnchorTabsPresent();
  const compact = docksIntoTabs ? tabsStuck : scrolled;
  const { ref, width } = usePillWidth([compact]);

  // Without tabs the logo fades out on the way to the 80 px switch.
  const { scrollY } = useScroll();
  const logoOpacity = useTransform(scrollY, [40, 70], [1, 0]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const morphTransition = {
    layout: { duration: DURATION.slow, ease: EASE.settle as unknown as [number, number, number, number] },
    opacity: { duration: DURATION.base, ease: EASE.out },
  };

  return (
    // Docked, the nav leaves with the tab row at the footer (--anchor-push).
    <header className="pointer-events-none sticky top-0 z-50 w-full translate-y-[var(--anchor-push,0px)] bg-transparent">
      <div
        className={cn(
          'pointer-events-none relative mx-auto flex min-h-24 w-full max-w-frame items-start px-10',
          !compact && 'justify-stretch pt-4',
          compact && (docksIntoTabs ? 'justify-end pt-2' : 'justify-end pt-4'),
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {!compact ? (
            <motion.nav
              key="full"
              ref={ref as React.Ref<HTMLElement>}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={morphTransition}
              data-surface={surface}
              className={cn('pointer-events-auto flex w-full items-center justify-between gap-12 rounded-pill px-8 py-4', tone.pill)}
            >
              <motion.a
                href={logoHref}
                onClick={smoothAnchor}
                style={{ opacity: docksIntoTabs ? 1 : logoOpacity }}
                className="inline-flex items-center no-underline"
              >
                <img src={tone.logo} alt="iCompetence" className="block h-12 w-auto" />
              </motion.a>

              <div className="flex items-center gap-8">
                <motion.div transition={morphTransition}>
                  <CtaButton />
                </motion.div>
                <BurgerMenu iconSize={28} wide pillWidth={width} pillPaddingX={32} pillPaddingY={16} />
              </div>
            </motion.nav>
          ) : (
            <motion.nav
              key="compact"
              ref={ref as React.Ref<HTMLElement>}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={morphTransition}
              data-surface={surface}
              // Starts with the CTA pill: 8px left like top/bottom, so it sits
              // concentric in the nav pill.
              className={cn('pointer-events-auto flex items-center gap-4 rounded-pill py-2 pl-2 pr-4', tone.pill)}
            >
              <motion.div transition={morphTransition}>
                <CtaButton />
              </motion.div>
              <BurgerMenu iconSize={22} pillWidth={width} pillPaddingX={16} pillPaddingY={8} />
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
