'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/components/ui/utils';
import { LanguageToggle } from './LanguageToggle';
import { LinkedInGlyph } from './icons';
import { LINKEDIN_URL, PRODUCT_LINKS } from './nav-links';
import { DURATION, EASE, useMotionPrefs } from './motion';

/**
 * Burger menu with the "Products & Tools" grid.
 * `trigger="hover"` = desktop mega-menu, `trigger="tap"` = touch sheet.
 * Width/offsets are measured from the nav pill, so they stay inline styles.
 */
export function BurgerMenu({
  iconSize,
  wide = false,
  pillWidth = 0,
  pillPaddingX = 0,
  pillPaddingY = 0,
  trigger = 'hover',
  columns = 1,
}: {
  iconSize: number;
  wide?: boolean;
  pillWidth?: number;
  pillPaddingX?: number;
  pillPaddingY?: number;
  trigger?: 'hover' | 'tap';
  columns?: number;
}) {
  const { t, language } = useLanguage();
  const [open, setOpen] = useState(false);
  const prefs = useMotionPrefs();
  const rootRef = useRef<HTMLDivElement | null>(null);
  const tap = trigger === 'tap';
  const dropdownTopOffset = pillPaddingY + 24;
  const panelWidth = pillWidth || (wide ? 1100 : 264);
  const closeOnNav = tap ? () => setOpen(false) : undefined;

  // Alphabetical by the label in the active language (DE and EN order differ).
  const sortedLinks = [...PRODUCT_LINKS].sort((a, b) =>
    t(a.labelKey).localeCompare(t(b.labelKey), language),
  );

  // Tap mode closes on outside click / Escape (hover mode closes on mouse-leave).
  useEffect(() => {
    if (!tap || !open) return;
    const onDocClick = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('mousedown', onDocClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDocClick);
      document.removeEventListener('keydown', onKey);
    };
  }, [tap, open]);

  return (
    <div
      ref={rootRef}
      onMouseEnter={tap ? undefined : () => setOpen(true)}
      onMouseLeave={tap ? undefined : () => setOpen(false)}
      className="relative inline-flex items-center"
    >
      <button
        type="button"
        aria-label={t('topNav.menu')}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={tap ? () => setOpen((p) => !p) : undefined}
        className="inline-flex cursor-pointer items-center border-0 bg-transparent p-0 text-lav-white"
      >
        <Menu size={iconSize} strokeWidth={2} />
      </button>

      {/* Hover bridge so the menu doesn't close in the gap below the pill. */}
      {!tap && open && (
        <div
          aria-hidden
          className="absolute top-full bg-transparent"
          style={{ right: -pillPaddingX, width: panelWidth, height: dropdownTopOffset }}
        />
      )}

      <AnimatePresence>
        {open && (
          <motion.div
            role="menu"
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: prefs.d(DURATION.fast), ease: EASE.out }}
            className={cn(
              'absolute flex flex-col bg-lav-navy shadow-[0_10px_30px_rgba(11,34,49,0.18)]',
              wide ? 'gap-6 rounded-card px-12 py-10' : 'gap-3 rounded-card-sm px-6 py-5',
              tap && 'max-h-[calc(100vh-140px)] max-w-[100vw] overflow-y-auto',
            )}
            style={{
              top: `calc(100% + ${dropdownTopOffset}px)`,
              right: -pillPaddingX,
              width: panelWidth,
            }}
          >
            <a
              href={`/${language}/`}
              onClick={closeOnNav}
              className={cn(
                'font-brand font-medium text-lav-white no-underline',
                wide ? 'text-body' : 'py-1 text-[15px]',
              )}
            >
              {t('burgerMenu.home')}
            </a>

            <div className={cn('h-px bg-lav-white/20', !wide && 'my-1')} />

            <span
              className={cn(
                'font-brand font-medium uppercase tracking-[1px] text-lav-white/70',
                wide ? 'text-[12px]' : 'text-[11px]',
              )}
            >
              {t('burgerMenu.products')}
            </span>

            <div
              className={cn('grid', wide ? 'gap-x-8 gap-y-4' : 'gap-x-6')}
              style={{
                gridTemplateColumns: `repeat(${wide ? 4 : columns}, 1fr)`,
                rowGap: wide ? undefined : columns > 1 ? 14 : 10,
              }}
            >
              {sortedLinks.map(({ labelKey, href }) => (
                <a
                  key={href}
                  href={href}
                  onClick={closeOnNav}
                  className={cn(
                    'font-brand font-medium text-lav-white no-underline',
                    wide ? 'text-[18px]' : 'text-[15px]',
                  )}
                >
                  {t(labelKey)}
                </a>
              ))}
            </div>

            <div className={cn('h-px bg-lav-white/20', !wide && 'my-1')} />

            <div className={cn('flex items-center justify-between', wide ? 'gap-6' : 'gap-3')}>
              <LanguageToggle />
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="iCompetence on LinkedIn"
                className={cn(
                  'inline-flex items-center justify-center rounded-pill bg-lav-white/10 text-lav-white no-underline',
                  wide ? 'h-9 w-9' : 'h-8 w-8',
                )}
              >
                <LinkedInGlyph size={wide ? 18 : 16} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
