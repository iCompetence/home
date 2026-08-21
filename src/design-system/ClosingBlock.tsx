import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';
import { Footer } from './Footer';
import { Section } from './Section';

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
      <Section
        dsName="CTABand"
        className={cn('overflow-hidden bg-[#bde3f4]', bandClassName)}
        innerClassName="relative z-[2] flex flex-col items-center gap-6 md:gap-8 lg:gap-10"
      >
        <h2 className="m-0 w-full text-center font-brand text-[40px] font-medium leading-[1.05] tracking-[-1px] text-lav-navy md:text-[56px] md:tracking-[-1.5px] lg:text-h1 lg:tracking-[-2px]">
          {heading}
        </h2>
        {action}
      </Section>

      <Footer />

      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 z-[1] h-full w-full max-w-frame -translate-x-1/2"
      >
        <div className="absolute -left-[120px] top-1/2 h-[420px] w-[420px] -translate-y-1/2 bg-[url('/images/icompetence_visual_01.png')] bg-contain bg-center bg-no-repeat md:-left-[140px] md:h-[560px] md:w-[560px] lg:h-[820px] lg:w-[820px]" />
      </div>
    </div>
  );
}
