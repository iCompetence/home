'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BurgerMenu } from './BurgerMenu';
import { useBreakpoint, isCompact, type Bp } from './useBreakpoint';
import { HOME_NAV_SECTIONS, smoothAnchor, type NavSection } from './nav-links';
import { DURATION, EASE } from './motion';

export type TopNavProps = {
  /**
   * In-page section anchors. Defaults to the homepage sections; pass your own
   * (or `[]`) on pages that don't have them.
   */
  sections?: readonly NavSection[];
};

/** Sticky site header in the new design. Compact (mobile/tablet) vs desktop. */
export function TopNav({ sections = HOME_NAV_SECTIONS }: TopNavProps) {
  const bp = useBreakpoint();
  return isCompact(bp) ? (
    <CompactNav bp={bp} sections={sections} />
  ) : (
    <DesktopNav sections={sections} />
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
      href={`/${language}/contact/`}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-1.5 rounded-pill bg-lav-blue font-brand font-medium text-lav-white no-underline ${
        compact ? 'px-3.5 py-2 text-[14px] md:px-4' : 'gap-2 px-6 py-3 text-body'
      }`}
    >
      {t('topNav.letsTalk')}
      <ArrowUpRight size={compact ? 16 : 20} strokeWidth={2} />
    </a>
  );
}

function CompactNav({ bp, sections }: { bp: Bp; sections: readonly NavSection[] }) {
  const { t } = useLanguage();
  const isMobile = bp === 'mobile';
  const { ref, width } = usePillWidth();

  return (
    <div className="pointer-events-none sticky top-0 z-50 w-full">
      <div className="mx-auto w-full max-w-frame px-4 pt-3 md:px-6 md:pt-3.5">
        <nav data-ds="TopNav"
          ref={ref as React.Ref<HTMLElement>}
          className="pointer-events-auto flex w-full items-center justify-between gap-3 rounded-pill bg-lav-navy px-4 py-2.5 text-lav-white md:gap-5 md:px-6 md:py-3"
        >
          <a href="#top" onClick={smoothAnchor} className="inline-flex items-center">
            <img
              src="/iCompetence_white.svg"
              alt="iCompetence"
              className="block h-8 w-auto md:h-10"
            />
          </a>

          {!isMobile && sections.length > 0 && (
            <div className="flex items-center gap-5">
              {sections.map(({ id, labelKey }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={smoothAnchor}
                  className="font-brand text-[14px] font-medium text-lav-white no-underline"
                >
                  {t(labelKey)}
                </a>
              ))}
            </div>
          )}

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
    </div>
  );
}

function DesktopNav({ sections }: { sections: readonly NavSection[] }) {
  const { t } = useLanguage();
  const [compact, setCompact] = useState(false);
  const [activeId, setActiveId] = useState<string>(sections[0]?.id ?? '');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { ref, width } = usePillWidth([compact]);

  const { scrollY } = useScroll();
  const fullItemsOpacity = useTransform(scrollY, [40, 70], [1, 0]);
  const compactItemsOpacity = useTransform(scrollY, [70, 80], [0, 1]);

  // Shrink into a centred pill after scrolling past the hero.
  useEffect(() => {
    const onScroll = () => setCompact(window.scrollY > 80);
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
    document.addEventListener('mousedown', onDocClick);
    return () => document.removeEventListener('mousedown', onDocClick);
  }, [dropdownOpen]);

  const otherSections = sections.filter((s) => s.id !== activeId);
  const morphTransition = {
    layout: { duration: DURATION.slow, ease: EASE.settle as unknown as [number, number, number, number] },
    opacity: { duration: DURATION.base, ease: EASE.out },
  };

  return (
    <div className="pointer-events-none sticky top-0 z-50 w-full bg-transparent">
      <div
        className={`pointer-events-none relative mx-auto flex min-h-24 w-full max-w-frame items-start px-10 pt-4 ${
          compact ? 'justify-center' : 'justify-stretch'
        }`}
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
              className="pointer-events-auto flex w-full items-center justify-between gap-12 rounded-pill bg-lav-navy px-8 py-4 text-lav-white"
            >
              <motion.a
                href="#top"
                onClick={smoothAnchor}
                style={{ opacity: fullItemsOpacity }}
                className="inline-flex items-center no-underline"
              >
                <img src="/iCompetence_white.svg" alt="iCompetence" className="block h-12 w-auto" />
              </motion.a>

              <motion.div
                style={{ opacity: fullItemsOpacity }}
                className="flex items-center gap-14"
              >
                {sections.map(({ id, labelKey }) => (
                  <a
                    key={id}
                    href={`#${id}`}
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
              className="pointer-events-auto flex items-center gap-4 rounded-pill bg-lav-navy px-4 py-2 text-lav-white"
            >
              {sections.length > 0 && (
                <motion.div
                  style={{ opacity: compactItemsOpacity }}
                  className="relative inline-flex items-center"
                >
                  <button
                    type="button"
                    data-nav-trigger
                    aria-haspopup="menu"
                    aria-expanded={dropdownOpen}
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
                        data-nav-popover
                        role="menu"
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: DURATION.fast, ease: EASE.out }}
                        className="absolute left-0 top-[calc(100%+12px)] flex min-w-[180px] flex-col rounded-card-sm bg-lav-navy px-1.5 py-2.5 shadow-[0_10px_30px_rgba(11,34,49,0.18)]"
                      >
                        <a
                          href="#top"
                          role="menuitem"
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
                            href={`#${id}`}
                            role="menuitem"
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
    </div>
  );
}
