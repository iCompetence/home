import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';

type SectionProps = {
  children: ReactNode;
  id?: string;
  /** Outer element tag. */
  as?: 'section' | 'footer' | 'div';
  /** Extra classes on the full-bleed outer element (e.g. a background). */
  className?: string;
  /** Extra classes on the centred inner container. */
  innerClassName?: string;
  /** Component name exposed as data-ds (used by the dev dial panel's picker). */
  dsName?: string;
};

/**
 * Full-bleed section with a centred, `max-w-frame` (1440px) inner container.
 * Padding comes from the --section-pad-v / --section-pad-h custom properties
 * (defined per breakpoint in globals.css: 48/24 · 56/48 · 64/96), so the dev
 * dial panel can tune section rhythm live.
 */
export function Section({
  children,
  id,
  as: Tag = 'section',
  className,
  innerClassName,
  dsName = 'Section',
}: SectionProps) {
  return (
    <Tag
      id={id}
      data-ds={dsName}
      className={cn('w-full py-[var(--section-pad-v)]', className)}
    >
      <div
        className={cn(
          'mx-auto w-full max-w-frame px-[var(--section-pad-h)]',
          innerClassName,
        )}
      >
        {children}
      </div>
    </Tag>
  );
}
