import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';
import { Eyebrow } from './Eyebrow';

export type HeroProps = {
  /** Headline. A `\n` is a line break on every breakpoint, as in Figma. */
  title: string;
  /** Small line above the headline, e.g. "404". */
  eyebrow?: string;
  subline?: string;
  /** CTAs — composed by the page so each one picks its own buttons. */
  actions?: ReactNode;
  id?: string;
  className?: string;
};

/**
 * Page hero in the new design: oversized headline, supporting subline, CTAs.
 * Extracted from LavenderHome so every migrated page composes the same one
 * rather than re-implementing the type scale. No star of its own (was: the
 * yellow brand star by default): on the night pages the sky's guide star is
 * the one star.
 */
export function Hero({ title, eyebrow, subline, actions, id = 'top', className }: HeroProps) {
  return (
    <section
      id={id}
      data-ds="Hero"
      className={cn('w-full bg-lav-lavender/10', className)}
    >
      <div className="mx-auto flex w-full max-w-frame flex-col gap-8 px-6 py-[var(--section-pad-v)] md:gap-12 md:px-12 lg:gap-14 lg:px-24">
        {eyebrow ? (
          <div className="flex flex-col gap-4">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className="lav-display whitespace-pre-line text-lav-navy">{title}</h1>
          </div>
        ) : (
          <h1 className="lav-display whitespace-pre-line text-lav-navy">{title}</h1>
        )}

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
