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
      innerClassName="relative z-[2] flex flex-col items-center gap-6 md:gap-8 lg:gap-10"
    >
      <h2 className="m-0 w-full text-center font-brand text-[40px] font-medium leading-[1.05] tracking-[-1px] text-lav-navy md:text-[56px] md:tracking-[-1.5px] lg:text-h1 lg:tracking-[-2px]">
        {heading}
      </h2>
      {action}
    </Section>
  );
}
