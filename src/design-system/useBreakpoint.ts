'use client';

import { useEffect, useState } from 'react';

export type Bp = 'mobile' | 'tablet' | 'desktop';

/**
 * Mobile < 768 ≤ Tablet (portrait) < 1024 ≤ Desktop.
 * Matches the design artboards (390 / 768 / 1440) and Tailwind's md/lg.
 * Only for behaviour that CSS can't express (which nav variant to mount);
 * prefer Tailwind responsive classes for pure styling.
 */
export function useBreakpoint(): Bp {
  const [bp, setBp] = useState<Bp>('desktop');
  useEffect(() => {
    const compute = () => {
      const w = window.innerWidth;
      setBp(w < 768 ? 'mobile' : w < 1024 ? 'tablet' : 'desktop');
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, []);
  return bp;
}

export const isCompact = (bp: Bp) => bp !== 'desktop';
