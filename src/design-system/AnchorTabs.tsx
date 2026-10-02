'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { cn } from '@/components/ui/utils';
import { useMotionPrefs } from './motion';

export type AnchorTab = {
  /** id of the section this tab jumps to. */
  id: string;
  label: string;
};

/**
 * Jump targets need the height of the stuck tab row as scroll margin (the nav
 * shares that row). AnchorTabs publishes it as --anchor-offset; put this class
 * on every section a tab points to.
 */
export const ANCHOR_SCROLL_MARGIN = 'scroll-mt-[var(--anchor-offset,112px)]';

/** Height of the stuck tab row: tablet/mobile and desktop. */
const ROW = { compact: 56, desktop: 80 } as const;

/*
 * Whether the tabs currently stick. The TopNav of a product page reads it: it
 * stays as it is until this moment and then docks into the navy tab row —
 * desktop as the pill, tablet/mobile as CTA + burger / burger (2026-10-02).
 */
let stuckNow = false;
const stuckListeners = new Set<() => void>();
function publishStuck(value: boolean) {
  if (value === stuckNow) return;
  stuckNow = value;
  stuckListeners.forEach((listener) => listener());
}
export function useAnchorTabsStuck(): boolean {
  return useSyncExternalStore(
    (listener) => {
      stuckListeners.add(listener);
      return () => stuckListeners.delete(listener);
    },
    () => stuckNow,
    () => false,
  );
}

/**
 * The section navigation of a product page — the only one there (the TopNav
 * carries no section links on such pages).
 *
 * Static it sits under the product head on the page colour. Scrolled past, it
 * sticks to the top and turns navy, and the nav docks into it on the right, so
 * the navigation is one dark row: 80px on desktop, 56px (as tall as the static
 * row) on tablet and mobile. A click scrolls to the section; the active tab
 * follows the scroll position. The tabs scroll horizontally where they do not
 * fit and end before the docked nav; the active one is kept in view.
 */
export function AnchorTabs({ items, label }: { items: readonly AnchorTab[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const prefs = useMotionPrefs();

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const desktop = window.innerWidth >= 1024;
      const sentinel = sentinelRef.current;
      if (sentinel) {
        const isStuck = sentinel.getBoundingClientRect().top <= 0;
        setStuck(isStuck);
        publishStuck(isStuck);
      }

      const offset = desktop ? ROW.desktop : ROW.compact;
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
      publishStuck(false);
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
        className={cn(
          'sticky top-0 z-40 w-full border-b lg:border-b-0',
          stuck
            ? // Navy, no visible hairline (the transparent one keeps the height).
              'border-transparent bg-lav-navy'
            : // Tablet/mobile: full-bleed hairline; desktop: under the tabs only.
              'border-lav-navy/20 bg-lav-page',
        )}
      >
        <div
          className={cn(
            'mx-auto w-full max-w-frame lg:px-[var(--section-pad-h)]',
            // Stuck: the tabs end before the docked nav (burger · CTA + burger · pill).
            stuck && 'pr-[70px] md:pr-[291px] lg:pr-[368px]',
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
                    stuck
                      ? current
                        ? 'text-lav-white'
                        : 'text-lav-white/70'
                      : current
                        ? 'text-lav-navy'
                        : 'text-lav-navy/70',
                    // Rows as in Figma: 56 px, desktop stuck 80 px (the 2px underline
                    // sits in the padding).
                    'pb-5 pt-6',
                    stuck && 'lg:pb-[34px] lg:pt-[34px]',
                  )}
                >
                  {text}
                  {current && (
                    <span
                      aria-hidden
                      className={cn(
                        'absolute inset-x-0 bottom-0 h-0.5',
                        stuck ? 'bg-lav-white' : 'bg-lav-navy',
                      )}
                    />
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
