'use client';

import { useEffect, useRef, type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';
import { PageShell } from '@/design-system';
import { startNightSky } from './nightSky';

/**
 * The sky of "Licht und Linie": one fixed canvas with the small stars and the
 * guide star (nightSky.ts). On the home page it lies behind the whole page;
 * on the subpages it is the night of the footer (NightClosing). While a day
 * sheet covers the screen it is not drawn (nightSky hides it by itself).
 */
export function NightSky({ hidden = false, className }: { hidden?: boolean; className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => (canvas.current ? startNightSky(canvas.current) : undefined), []);
  return (
    <canvas
      ref={canvas}
      aria-hidden
      className={cn('pointer-events-none fixed inset-0 h-full w-full', hidden && 'invisible', className)}
    />
  );
}

/**
 * The light sheet of a subpage, like the day layer of the night home: the
 * guide star follows the pointer across it as a large, soft glow behind the
 * content (drawn on the sheet's own canvas, which lies above the white and
 * below everything else: the negative z-index inside the sheet's stacking
 * context). The sheet starts under the nav, so the glow is not cut off
 * there, and ends in rounded corners over the night of the footer.
 *
 * No `overflow` and no `backdrop-filter` on the sheet (both together made the
 * night home stutter on real graphics cards); the sky clips the glow itself.
 */
function DaySheet({ children }: { children: ReactNode }) {
  return (
    // The night behind the sheet's lower corners: the wrapper's last 40 px
    // are navy, so the footer's sky shows in the corners as on the home page.
    <div className="bg-[linear-gradient(to_bottom,transparent_calc(100%_-_var(--radius-frame)),var(--color-lav-navy)_0)]">
      <div
        data-ds="DayLayer"
        data-surface="light"
        // Pulled up under the nav (76 / 92 px tall) and padded by as much: same layout, one surface.
        className="relative z-10 -mt-[76px] rounded-b-card bg-lav-page pt-[76px] lg:-mt-[92px] lg:rounded-b-frame lg:pt-[92px]"
      >
        <canvas aria-hidden data-sky="day" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
        {children}
      </div>
    </div>
  );
}

/**
 * Page frame of every subpage in "Licht und Linie": PageShell with the light
 * day sheet (or, on a dark page, a plain layer above the sky), the night
 * footer below it. The footer (NightClosing / NightFooter) brings the sky.
 */
export function NightPage({
  nav,
  footer,
  children,
  surface = 'page',
}: {
  nav: ReactNode;
  footer: ReactNode;
  children: ReactNode;
  /** 'inverse': a night page (Privacy-led AI); its content stands right on the sky. */
  surface?: 'page' | 'inverse';
}) {
  return (
    <PageShell surface={surface} nav={nav} footer={footer}>
      {surface === 'inverse' ? (
        // Above the footer's fixed sky, which shows through the whole page.
        <div className="relative z-10">{children}</div>
      ) : (
        <DaySheet>{children}</DaySheet>
      )}
    </PageShell>
  );
}
