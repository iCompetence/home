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
};

/**
 * Full-bleed section with a centred, `max-w-frame` (1440px) inner container.
 * Responsive padding mirrors LavenderHome's SECTION_PAD:
 *   vertical   mobile 48 / tablet 56 / desktop 64  → py-12 md:py-14 lg:py-16
 *   horizontal mobile 24 / tablet 48 / desktop 96  → px-6  md:px-12 lg:px-24
 */
export function Section({
  children,
  id,
  as: Tag = 'section',
  className,
  innerClassName,
}: SectionProps) {
  return (
    <Tag id={id} className={cn('w-full py-12 md:py-14 lg:py-16', className)}>
      <div className={cn('mx-auto w-full max-w-frame px-6 md:px-12 lg:px-24', innerClassName)}>
        {children}
      </div>
    </Tag>
  );
}
