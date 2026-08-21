import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';
import { DesignFrameOverlay } from './DesignFrameOverlay';
import { isCompact, useBreakpoint } from './useBreakpoint';

export type HeroProps = {
  /**
   * Headline. A `\n` marks the desktop line break; compact viewports collapse
   * it to a space, so callers can keep one string per language.
   */
  title: string;
  subline?: string;
  /** CTAs — composed by the page so each one picks its own buttons. */
  actions?: ReactNode;
  /**
   * Decorative visual (a brand star, a gradient). Pinned to the 1440 design
   * frame on desktop; rendered plainly on compact, where the frame does not
   * apply.
   */
  decoration?: ReactNode;
  id?: string;
  className?: string;
};

/**
 * Page hero in the new design: oversized headline, supporting subline, CTAs.
 * Extracted from LavenderHome so every migrated page composes the same one
 * rather than re-implementing the type scale.
 */
export function Hero({
  title,
  subline,
  actions,
  decoration,
  id = 'top',
  className,
}: HeroProps) {
  const bp = useBreakpoint();
  const compact = isCompact(bp);

  return (
    <section id={id} className={cn('relative w-full bg-lav-lavender/10', className)}>
      {decoration &&
        (compact ? decoration : <DesignFrameOverlay>{decoration}</DesignFrameOverlay>)}

      <div className="relative z-[2] mx-auto flex w-full max-w-frame flex-col gap-6 px-6 py-12 md:gap-8 md:px-12 md:py-14 lg:gap-10 lg:px-24 lg:py-16">
        <h1 className="m-0 whitespace-normal font-brand text-[40px] font-medium leading-[1.05] tracking-[-1px] text-lav-navy md:text-[56px] md:tracking-[-1.5px] lg:whitespace-pre-line lg:text-h1 lg:tracking-[-2px]">
          {compact ? title.replace('\n', ' ') : title}
        </h1>

        {subline && (
          <p className="m-0 w-full max-w-full font-brand text-body font-normal leading-[1.5] text-lav-navy/80 md:w-[600px] md:text-sub lg:w-[820px] lg:text-sub">
            {subline}
          </p>
        )}

        {actions && (
          <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-4">
            {actions}
          </div>
        )}
      </div>
    </section>
  );
}
