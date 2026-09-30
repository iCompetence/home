'use client';

import { type ReactNode } from 'react';
import { BrandStar } from './BrandStar';
import { CTABand } from './CTABand';
import { Footer } from './Footer';

export type ClosingBlockProps = {
  /** Closing headline, e.g. "Bereit, Anspruch in Ergebnisse zu verwandeln?" */
  heading: string;
  /** The CTA button, composed by the page. */
  action?: ReactNode;
  /** Band background; the brand light blue by default. */
  bandClassName?: string;
};

/**
 * How every page in the new design ends: a closing CTA band directly above the
 * footer, with the brand visual bleeding across both.
 *
 * The two belong together — the wrapper is what clips the decorative star to
 * the band-plus-footer area, so composing them separately on each page would
 * mean re-deriving `relative isolate overflow-hidden` and the overlay every
 * time, and getting it subtly wrong.
 */
export function ClosingBlock({ heading, action, bandClassName }: ClosingBlockProps) {
  return (
    <div className="relative isolate overflow-hidden">
      <CTABand heading={heading} action={action} className={bandClassName} />

      <Footer />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-[1] h-full w-full max-w-frame -translate-x-1/2"
      >
        <BrandStar variant="closing" />
      </div>
    </div>
  );
}
