import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';
import { BrandStar } from './BrandStar';
import { DesignFrameOverlay } from './DesignFrameOverlay';
import { isCompact, useBreakpoint } from './useBreakpoint';

export type HeroProps = {
  /** Headline. A `\n` is a line break on every breakpoint, as in Figma. */
  title: string;
  subline?: string;
  /** CTAs — composed by the page so each one picks its own buttons. */
  actions?: ReactNode;
  /**
   * Decorative visual, pinned to the 1440 design frame on desktop and rendered
   * plainly on compact, where the frame does not apply. Defaults to the hero
   * brand star — the large-format visual is part of what a hero *is*, so a
   * page has to opt out (`decoration={null}`) rather than remember to opt in.
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
  decoration = <BrandStar variant="hero" />,
  id = 'top',
  className,
}: HeroProps) {
  const bp = useBreakpoint();
  const compact = isCompact(bp);

  return (
    <section
      id={id}
      data-ds="Hero"
      className={cn('relative w-full bg-lav-lavender/10', className)}
    >
      {decoration &&
        (compact ? decoration : <DesignFrameOverlay>{decoration}</DesignFrameOverlay>)}

      <div className="relative z-[2] mx-auto flex w-full max-w-frame flex-col gap-8 px-6 py-12 md:gap-12 md:px-12 md:py-14 lg:gap-14 lg:px-24 lg:py-16">
        <h1 className="lav-display whitespace-pre-line text-lav-navy">{title}</h1>

        {subline && (
          <p className="lav-lead w-full max-w-full font-normal text-lav-navy/80 md:w-[600px] lg:w-[820px]">
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
