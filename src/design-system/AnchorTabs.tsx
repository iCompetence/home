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
  return useSyncExternalStore(subscribe, () => stuckNow, () => false);
}

/*
 * Whether the page has tabs at all: subpages without them shrink the TopNav
 * after 80 px instead (2026-10-02).
 */
let mounted = 0;
function publishMounted(delta: 1 | -1) {
  mounted += delta;
  stuckListeners.forEach((listener) => listener());
}
export function useAnchorTabsPresent(): boolean {
  return useSyncExternalStore(subscribe, () => mounted > 0, () => false);
}

function subscribe(listener: () => void) {
  stuckListeners.add(listener);
  return () => {
    stuckListeners.delete(listener);
  };
}

/**
 * The section navigation of a page (homepage, product pages) — the only one
 * there; the TopNav carries no section links.
 *
 * It takes no room in the page (Dennis, 2026-10-02): where it is rendered it
 * leaves only a marker. Once the marker (the end of the hero or product head)
 * has scrolled past the top, a navy row slides in, fixed at the top, and the
 * nav docks into it on the right — one dark row, 80px on desktop, 56px on
 * tablet and mobile. A click scrolls to the section; the active tab follows
 * the scroll position. The tabs scroll horizontally where they do not fit and
 * end before the docked nav; the active one is kept in view. Where the
 * content ends (closing block, footer) the row is pushed away and takes the
 * docked nav with it. Tabbing into the hidden row scrolls to the marker, so
 * it shows with the docked nav.
 */
export function AnchorTabs({ items, label }: { items: readonly AnchorTab[]; label: string }) {
  const [active, setActive] = useState(items[0]?.id ?? '');
  const [stuck, setStuck] = useState(false);
  const sentinelRef = useRef<HTMLDivElement | null>(null);
  const rowRef = useRef<HTMLDivElement | null>(null);
  const prefs = useMotionPrefs();

  useEffect(() => {
    publishMounted(1);
    return () => publishMounted(-1);
  }, []);

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
        // At the end of <main> the content pushes the row up and out; row and
        // docked nav follow it pixel for pixel (--anchor-push, ≤ 0).
        const rowHeight = desktop ? ROW.desktop : ROW.compact;
        const mainBottom = sentinel.closest('main')?.getBoundingClientRect().bottom ?? Infinity;
        const push = isStuck ? Math.min(0, Math.round(mainBottom - rowHeight)) : 0;
        document.documentElement.style.setProperty('--anchor-push', `${push}px`);
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
      document.documentElement.style.removeProperty('--anchor-push');
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

  // Keyboard users reach the row before it shows: bring the page to the
  // marker, so the row appears with the docked nav around the focused tab.
  const revealOnFocus = (e: React.FocusEvent<HTMLElement>) => {
    const sentinel = sentinelRef.current;
    const nav = e.currentTarget;
    if (stuck || !sentinel) return;
    // After the browser's own scroll-into-view of the focused tab, which would
    // otherwise undo this — and only if the focus is still in the row.
    setTimeout(() => {
      if (!nav.contains(document.activeElement)) return;
      window.scrollTo({ top: window.scrollY + sentinel.getBoundingClientRect().top + 1, behavior: 'auto' });
    }, 0);
  };

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
      {/* Outer layer: the scroll-linked push at the footer (no transition);
          inner nav: slides in and out. */}
      <div className="fixed inset-x-0 top-0 z-40 translate-y-[var(--anchor-push,0px)]">
        <nav
          aria-label={label}
          data-ds="AnchorTabs"
          data-stuck={stuck || undefined}
          onFocus={revealOnFocus}
          className={cn(
            'w-full bg-lav-navy transition-transform duration-[var(--duration-base)] motion-reduce:transition-none',
            stuck ? 'translate-y-0' : 'pointer-events-none -translate-y-full',
          )}
        >
          {/* The tabs end before the docked nav (burger · CTA + burger · pill). */}
          <div className="mx-auto w-full max-w-frame pr-[70px] md:pr-[291px] lg:px-[var(--section-pad-h)] lg:pr-[368px]">
            <div
              ref={rowRef}
              className="flex gap-10 overflow-x-auto px-[var(--section-pad-h)] [scrollbar-width:none] lg:px-0 [&::-webkit-scrollbar]:hidden"
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
                      current ? 'text-lav-white' : 'text-lav-white/70',
                      // Rows as in Figma: 56 px, desktop 80 px (the 2px underline
                      // sits in the padding).
                      'pb-5 pt-6 lg:pb-[34px] lg:pt-[34px]',
                    )}
                  >
                    {text}
                    {current && (
                      <span aria-hidden className="absolute inset-x-0 bottom-0 h-0.5 bg-lav-white" />
                    )}
                  </a>
                );
              })}
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
