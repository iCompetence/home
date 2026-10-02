'use client';

import { useEffect, useId, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAnchorTabsPresent, useAnchorTabsStuck } from './AnchorTabs';
import { NAV_TONE, NavSurfaceContext, useNavSurface, type NavSurface } from './nav-surface';
import { BurgerMenu } from './BurgerMenu';
import { useBreakpoint, isCompact, type Bp } from './useBreakpoint';
import { HOME_NAV_SECTIONS, smoothAnchor, type NavSection } from './nav-links';
import { siteHref } from './routes';
import { DURATION, EASE } from './motion';
import { cn } from '@/components/ui/utils';

export type TopNavProps = {
  /**
   * In-page section anchors (desktop only). Defaults to the homepage sections.
   * Pages with their own section navigation (AnchorTabs — every product page)
   * pass `[]`: the bar then carries logo, CTA and burger only, stays full until
   * the tabs stick, and then becomes the pill that docks into the navy tab row
   * on the right.
   */
  sections?: readonly NavSection[];
  /**
   * Where the logo leads. '#top' (default) scrolls the homepage back up; other
   * pages pass the home URL.
   */
  logoHref?: string;
  /**
   * When the sections live on another page (the homepage), their links lead
   * there: `${sectionsHref}#${id}`. Unset = in-page anchors.
   */
  sectionsHref?: string;
  /** Section shown as current in the scrolled pill when it is not on this page. */
  activeSection?: string;
  /**
   * 'light' = white pill, black logo, light burger panel — for dark pages
   * (the principles page), where the navy pill would vanish (2026-10-02).
   */
  surface?: NavSurface;
};

/** Sticky site header in the new design. Compact (mobile/tablet) vs desktop. */
export function TopNav({
  sections = HOME_NAV_SECTIONS,
  logoHref = '#top',
  sectionsHref,
  activeSection,
  surface = 'dark',
}: TopNavProps) {
  const bp = useBreakpoint();
  return (
    <NavSurfaceContext.Provider value={surface}>
      {isCompact(bp) ? (
        <CompactNav bp={bp} logoHref={logoHref} />
      ) : (
        <DesktopNav
          sections={sections}
          logoHref={logoHref}
          sectionsHref={sectionsHref}
          activeSection={activeSection}
        />
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
 * Mobile and tablet: logo, CTA, burger. Section links only exist on desktop —
 * at 768px four of them wrap onto two lines (decided 2026-09-30).
 *
 * On a product page, once the AnchorTabs stick, the pill gives way to just
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

function DesktopNav({
  sections,
  logoHref,
  sectionsHref,
  activeSection,
}: {
  sections: readonly NavSection[];
  logoHref: string;
  sectionsHref?: string;
  activeSection?: string;
}) {
  const { t } = useLanguage();
  const surface = useNavSurface();
  const tone = NAV_TONE[surface];
  const [scrolled, setScrolled] = useState(false);
  const tabsStuck = useAnchorTabsStuck();
  const tabsPresent = useAnchorTabsPresent();
  const [activeId, setActiveId] = useState<string>(activeSection ?? sections[0]?.id ?? '');
  const sectionHref = (id: string) => (sectionsHref ? `${sectionsHref}#${id}` : `#${id}`);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownId = useId();
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const hasSections = sections.length > 0;
  // Home (section links): compact after 80 px, centred. Product pages
  // (AnchorTabs): compact once the tabs stick, docked into them. Other
  // subpages: compact after 80 px, on the right (2026-10-02).
  const docksIntoTabs = !hasSections && tabsPresent;
  const compact = docksIntoTabs ? tabsStuck : scrolled;
  const { ref, width } = usePillWidth([compact]);

  const { scrollY } = useScroll();
  const fullItemsOpacity = useTransform(scrollY, [40, 70], [1, 0]);
  const compactItemsOpacity = useTransform(scrollY, [70, 80], [0, 1]);

  // Shrink into a centred pill after scrolling past the hero.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Highlight the section currently in view.
  useEffect(() => {
    if (sections.length === 0) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        const top = visible.reduce((a, b) =>
          a.boundingClientRect.top < b.boundingClientRect.top ? a : b,
        );
        setActiveId(top.target.id);
      },
      { rootMargin: '-30% 0px -55% 0px', threshold: 0 },
    );
    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  useEffect(() => {
    if (!dropdownOpen) return;
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      if (target.closest('[data-nav-popover]') || target.closest('[data-nav-trigger]')) return;
      setDropdownOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      setDropdownOpen(false);
      triggerRef.current?.focus();
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [dropdownOpen]);

  const otherSections = sections.filter((s) => s.id !== activeId);
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
          compact && (hasSections ? 'justify-center pt-4' : docksIntoTabs ? 'justify-end pt-2' : 'justify-end pt-4'),
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
                style={{ opacity: docksIntoTabs ? 1 : fullItemsOpacity }}
                className="inline-flex items-center no-underline"
              >
                <img src={tone.logo} alt="iCompetence" className="block h-12 w-auto" />
              </motion.a>

              <motion.div
                style={{ opacity: fullItemsOpacity }}
                className="flex items-center gap-14"
              >
                {sections.map(({ id, labelKey }) => (
                  <a
                    key={id}
                    href={sectionHref(id)}
                    onClick={smoothAnchor}
                    className="font-brand text-body font-medium text-lav-white no-underline"
                  >
                    {t(labelKey)}
                  </a>
                ))}
              </motion.div>

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
              className={cn(
                'pointer-events-auto flex items-center gap-4 rounded-pill py-2 pr-4',
                // Starting with the CTA pill: 8px left like top/bottom, so it
                // sits concentric in the nav pill; with the section menu (text)
                // first, 16px.
                hasSections ? 'pl-4' : 'pl-2',
                tone.pill,
              )}
            >
              {sections.length > 0 && (
                <motion.div
                  style={{ opacity: compactItemsOpacity }}
                  className="relative inline-flex items-center"
                >
                  <button
                    ref={triggerRef}
                    type="button"
                    data-nav-trigger
                    aria-expanded={dropdownOpen}
                    aria-controls={dropdownId}
                    onClick={() => setDropdownOpen((p) => !p)}
                    className="inline-flex cursor-pointer items-center gap-1.5 border-0 bg-transparent px-1.5 py-1 font-brand text-[15px] font-medium text-lav-white"
                  >
                    {/* All labels stacked in one grid cell keeps the pill width stable. */}
                    <span className="grid">
                      {sections.map(({ id, labelKey }) => (
                        <span
                          key={id}
                          className="[grid-area:1/1]"
                          style={{ visibility: id === activeId ? 'visible' : 'hidden' }}
                        >
                          {t(labelKey)}
                        </span>
                      ))}
                    </span>
                    <ChevronDown
                      size={16}
                      strokeWidth={2}
                      className="transition-transform duration-[var(--duration-fast)]"
                      style={{ transform: dropdownOpen ? 'rotate(180deg)' : 'none' }}
                    />
                  </button>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        id={dropdownId}
                        data-nav-popover
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: DURATION.fast, ease: EASE.out }}
                        className="absolute left-0 top-[calc(100%+12px)] flex min-w-[180px] flex-col rounded-card-sm bg-lav-navy px-1.5 py-2.5 shadow-[0_10px_30px_rgba(11,34,49,0.18)]"
                      >
                        <a
                          href={sectionsHref ?? '#top'}
                          onClick={(e) => {
                            smoothAnchor(e);
                            setDropdownOpen(false);
                          }}
                          className="rounded-[10px] px-3 py-2 font-brand text-[15px] font-medium text-lav-white no-underline"
                        >
                          {t('burgerMenu.home')}
                        </a>
                        {otherSections.map(({ id, labelKey }) => (
                          <a
                            key={id}
                            href={sectionHref(id)}
                            onClick={(e) => {
                              smoothAnchor(e);
                              setDropdownOpen(false);
                            }}
                            className="rounded-[10px] px-3 py-2 font-brand text-[15px] font-medium text-lav-white no-underline"
                          >
                            {t(labelKey)}
                          </a>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

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
