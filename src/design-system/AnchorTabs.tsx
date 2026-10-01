'use client';

import { useEffect, useRef, useState } from 'react';
import { cn } from '@/components/ui/utils';
import { useMotionPrefs } from './motion';

export type AnchorTab = {
  /** id of the section this tab jumps to. */
  id: string;
  label: string;
};

/**
 * Jump targets need the height of everything that sticks to the top as scroll
 * margin: on desktop the 80px tab row (the nav pill shares it), on tablet and
 * mobile the nav pill plus the tab row. AnchorTabs measures that at runtime
 * (the pill grows when its label wraps) and publishes it as --anchor-offset;
 * put this class on every section a tab points to.
 */
export const ANCHOR_SCROLL_MARGIN = 'scroll-mt-[var(--anchor-offset,112px)]';

/** Height of the stuck tab row: tablet/mobile and desktop. */
const ROW = { compact: 48, desktop: 80 } as const;

/**
 * The section navigation of a product page — the only one there (the TopNav
 * carries no section links on such pages).
 *
 * Static it sits under the product head. Scrolled past, it sticks: on desktop
 * as an 80px row that shares the line with the right-docked nav pill, on
 * tablet and mobile directly under the nav pill with an opaque page-coloured
 * backdrop. A click scrolls to the section; the active tab follows the
 * scroll position. Where the tabs do not fit they scroll horizontally and the
 * active one is kept in view.
 */
export function AnchorTabs({ items, label }: { items: readonly AnchorTab[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const [stuck, setStuck] = useState(false);
  // Sticky offset: 0 on desktop, the bottom edge of the nav pill otherwise.
  const [top, setTop] = useState(0);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const prefs = useMotionPrefs();

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const desktop = window.innerWidth >= 1024;
      const pill = document.querySelector('[data-ds="TopNav"]');
      const top = desktop || !pill ? 0 : Math.round(pill.getBoundingClientRect().bottom);
      setTop(top);
      const sentinel = sentinelRef.current;
      if (sentinel) setStuck(sentinel.getBoundingClientRect().top <= top);

      const offset = top + (desktop ? ROW.desktop : ROW.compact);
      document.documentElement.style.setProperty('--anchor-offset', `${offset}px`);

      // The active tab is the last section whose top has passed the sticky
      // header. Sections without a tab leave the previous one active.
      const line = offset + 24;
      let current = items[0]?.id ?? '';
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      setActive(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      document.documentElement.style.removeProperty('--anchor-offset');
    };
  }, [items]);

  // Keep the active tab visible when the row scrolls horizontally.
  useEffect(() => {
    const row = rowRef.current;
    const tab = row?.querySelector<HTMLElement>('[aria-current="true"]');
    if (!row || !tab || row.scrollWidth <= row.clientWidth) return;
    const left = tab.offsetLeft - (row.clientWidth - tab.offsetWidth) / 2;
    row.scrollTo({ left: Math.max(0, left), behavior: prefs.scrollBehavior });
  }, [active, prefs.scrollBehavior]);

  const jump = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: prefs.scrollBehavior, block: 'start' });
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <>
      <div ref={sentinelRef} aria-hidden className="h-0 w-full" />
      <nav
        aria-label={label}
        data-ds="AnchorTabs"
        data-stuck={stuck || undefined}
        style={{ top, ['--anchor-top' as string]: `${top}px` }}
        className={cn(
          'sticky z-40 w-full bg-lav-page',
          // Tablet/mobile: the hairline is full-bleed. Desktop: only when stuck.
          'border-b border-lav-navy/20 lg:border-b-0',
          stuck && 'lg:border-b',
          // Opaque backdrop behind the nav pill above the stuck row.
          stuck &&
            "before:absolute before:inset-x-0 before:bottom-full before:h-[var(--anchor-top)] before:bg-lav-page before:content-[''] lg:before:hidden",
        )}
      >
        <div
          className={cn(
            'mx-auto w-full max-w-frame lg:px-[var(--section-pad-h)]',
            // Desktop stuck: leave room for the right-docked nav pill.
            stuck && 'lg:pr-[368px]',
          )}
        >
          <div
            ref={rowRef}
            className={cn(
              'flex gap-10 overflow-x-auto px-[var(--section-pad-h)] [scrollbar-width:none] lg:px-0 [&::-webkit-scrollbar]:hidden',
              !stuck && 'lg:border-b lg:border-lav-navy/20',
            )}
          >
            {items.map(({ id, label: text }) => {
              const current = id === active;
              return (
                <a
                  key={id}
                  href={`#${id}`}
                  aria-current={current ? 'true' : undefined}
                  onClick={(e) => jump(e, id)}
                  className={cn(
                    'lav-body relative shrink-0 whitespace-nowrap font-medium',
                    current ? 'text-lav-navy' : 'text-lav-navy/70',
                    stuck ? 'pb-4 pt-4 lg:pb-8 lg:pt-[34px]' : 'pb-5 pt-6',
                  )}
                >
                  {text}
                  {current && (
                    <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-lav-navy" />
                  )}
                </a>
              );
            })}
          </div>
        </div>
      </nav>
    </>
  );
}
