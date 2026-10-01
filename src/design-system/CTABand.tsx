import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';
import { Section } from './Section';

export type CTABandProps = {
  /** Closing headline, e.g. "Bereit, Anspruch in Ergebnisse zu verwandeln?" */
  heading: string;
  /** The CTA button, composed by the page. */
  action?: ReactNode;
  /** Band background; the brand light blue by default. */
  className?: string;
};

/**
 * The centred closing CTA band. Its own component because it is used both
 * inside ClosingBlock (band + footer + shared star) and on its own mid-page.
 */
export function CTABand({ heading, action, className }: CTABandProps) {
  return (
    <Section
      dsName="CTABand"
      className={cn('overflow-hidden bg-[#bde3f4]', className)}
      innerClassName="relative z-[2] flex flex-col items-center gap-8 md:gap-10 lg:gap-14"
    >
      <h2 className="lav-display w-full text-center text-lav-navy">
        {heading}
      </h2>
      {action}
    </Section>
  );
}
