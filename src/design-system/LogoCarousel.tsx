'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useBreakpoint } from './useBreakpoint';
import { DURATION, EASE } from './motion';

/**
 * Client logos. `slug` maps to /logos/<slug>.<ext> (official brand asset, shown
 * nominatively as a client reference). Set `wordmark: true` when no asset exists
 * yet — the brand name then renders as a styled text mark instead.
 */
export type LogoEntry = { name: string; slug: string; ext?: 'svg' | 'png'; wordmark?: boolean };

export const CLIENT_LOGOS: readonly LogoEntry[] = [
  { name: 'DHL', slug: 'dhl' },
  { name: 'pepXpress', slug: 'pepxpress', ext: 'png' },
  { name: 'Freudenberg', slug: 'freudenberg' },
  { name: 'Küche&Co', slug: 'kueche-co', ext: 'png' },
  { name: 'Lucky Bike', slug: 'luckybike' },
  { name: 'Pixum', slug: 'pixum' },
  { name: 'NORD', slug: 'nord' },
  { name: 'Eventim', slug: 'eventim' },
  { name: 'Robinson', slug: 'robinson' },
  { name: 'GC Gruppe', slug: 'gc-gruppe' },
  { name: 'VitalAire', slug: 'vitalaire' },
  { name: 'Bürkert', slug: 'buerkert' },
  { name: 'WCG', slug: 'wcg' },
  { name: 'headacy', slug: 'headacy' },
  { name: 'Klett', slug: 'klett' },
  { name: 'Pentax', slug: 'pentax' },
  { name: 'Rameder', slug: 'rameder' },
  { name: 'REWE', slug: 'rewe' },
  { name: 'TeamViewer', slug: 'teamviewer' },
  { name: 'DER Touristik', slug: 'dertouristik' },
  { name: 'CEWE', slug: 'cewe' },
  { name: 'Miele', slug: 'miele' },
  { name: 'Tagesspiegel', slug: 'tagesspiegel' },
  { name: 'TUI Cruises', slug: 'tui-cruises' },
];

/** Logo image with a styled text-wordmark fallback (missing/broken asset). */
function LogoMark({ logo }: { logo: LogoEntry }) {
  const [failed, setFailed] = useState(false);

  if (logo.wordmark || failed) {
    return (
      <span className="whitespace-nowrap font-brand text-[16px] font-semibold tracking-[0.4px] md:text-[18px] lg:text-[22px]">
        {logo.name}
      </span>
    );
  }
  return (
    <img
      src={`/logos/${logo.slug}.${logo.ext ?? 'svg'}`}
      alt={logo.name}
      loading="lazy"
      onError={() => setFailed(true)}
      className="h-auto max-h-7 w-auto max-w-[100px] object-contain md:max-h-9 md:max-w-[140px] lg:max-h-11 lg:max-w-[180px]"
    />
  );
}

/**
 * Row of client logos that randomly swaps one slot at a time (crossfade).
 * Slot count is responsive: 3 (mobile) / 4 (tablet) / 5 (desktop).
 */
export function LogoCarousel({ logos = CLIENT_LOGOS }: { logos?: readonly LogoEntry[] }) {
  const bp = useBreakpoint();
  const slots = bp === 'mobile' ? 3 : bp === 'tablet' ? 4 : 5;
  const [visible, setVisible] = useState<LogoEntry[]>(() => logos.slice(0, slots));

  useEffect(() => {
    setVisible(logos.slice(0, slots));
  }, [slots, logos]);

  useEffect(() => {
    let lastSlot = -1;
    const swapRandomSlot = () => {
      setVisible((current) => {
        const count = current.length;
        if (count === 0) return current;
        let slot = Math.floor(Math.random() * count);
        if (slot === lastSlot) slot = (slot + 1) % count;
        lastSlot = slot;
        const visibleSlugs = new Set(current.map((l) => l.slug));
        const pool = logos.filter((l) => !visibleSlugs.has(l.slug));
        if (pool.length === 0) return current;
        const next = [...current];
        next[slot] = pool[Math.floor(Math.random() * pool.length)];
        return next;
      });
    };

    let timer: ReturnType<typeof setTimeout> | null = null;
    const schedule = () => {
      timer = setTimeout(
        () => {
          swapRandomSlot();
          schedule();
        },
        800 + Math.random() * 2400,
      );
    };
    schedule();
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [logos]);

  return (
    <section data-ds="LogoCarousel" className="w-full overflow-hidden border-y border-lav-navy/20 py-12 md:py-14 lg:py-16">
      <div className="mx-auto flex w-full max-w-frame items-center justify-between gap-4 px-6 md:gap-6 md:px-12 lg:gap-24 lg:px-10">
        {visible.map((logo, i) => (
          <div
            key={i}
            className="relative flex h-14 w-[100px] items-center justify-center md:h-[72px] md:w-[140px] lg:h-20 lg:w-[180px]"
          >
            {/* mode="sync": entering + exiting logos overlap (crossfade) so the
                slot is never empty during a swap. */}
            <AnimatePresence mode="sync">
              <motion.div
                key={logo.slug}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: DURATION.base, ease: EASE.out }}
                className="absolute inset-0 flex items-center justify-center text-lav-navy"
              >
                <LogoMark logo={logo} />
              </motion.div>
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
