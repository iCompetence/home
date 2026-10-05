import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';

/**
 * Titled block of a text page (imprint, privacy policy, news months): a rule
 * on top, the H2 on the left from desktop up with the content beside it,
 * stacked below. Figma: the frames inside "Rechtstexte" and "Monate".
 */
export function SplitBlock({
  id,
  title,
  children,
  className,
  contentClassName,
}: {
  id?: string;
  title: string;
  children: ReactNode;
  /** Extra classes on the block, e.g. a different stacked gap. */
  className?: string;
  /** Extra classes on the content column, e.g. its gap (default 24). */
  contentClassName?: string;
}) {
  return (
    <div
      id={id}
      data-ds="SplitBlock"
      className={cn(
        'flex flex-col gap-8 border-t border-lav-navy/20 py-10 md:gap-12 lg:flex-row lg:gap-10',
        className,
      )}
    >
      <h2 className="lav-h2 text-lav-navy lg:w-[31.4%] lg:shrink-0">{title}</h2>
      <div className={cn('flex min-w-0 flex-col gap-6 lg:flex-1', contentClassName)}>
        {children}
      </div>
    </div>
  );
}
