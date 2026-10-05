import { type ReactNode } from 'react';
import { cn } from '@/components/ui/utils';
import { Eyebrow } from './Eyebrow';

export type FeatureBlockProps = {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  /** Optional label above the headline. */
  eyebrow?: string;
  /** The CTA, composed by the page so each one picks its own button. */
  action?: ReactNode;
  /**
   * `side` puts a tall visual next to the copy (image last from md up) — the
   * featured-product treatment. `stacked` puts a wide, shorter visual above
   * the copy — the treatment the privacy-led section uses.
   */
  layout?: 'side' | 'stacked';
  className?: string;
};

/**
 * Image + copy + CTA — the workhorse block of the new design, and the shape
 * most old-design sections actually are underneath. Rendered without its own
 * Section so several can share one section's rhythm (see ProductShowcase).
 */
export function FeatureBlock({
  title,
  description,
  image,
  imageAlt,
  eyebrow,
  action,
  layout = 'side',
  className,
}: FeatureBlockProps) {
  const side = layout === 'side';

  return (
    <div
      className={cn(
        'flex w-full flex-col',
        side
          ? 'items-stretch gap-6 md:flex-row md:items-center md:gap-8 lg:gap-10'
          : 'items-center gap-6 md:gap-8 lg:gap-10',
        className,
      )}
    >
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        className={cn(
          'w-full min-w-0 rounded-card bg-lav-lavender object-cover object-center',
          side
            ? 'order-first h-[280px] md:order-last md:h-[420px] md:flex-1 lg:h-[640px]'
            : 'h-[240px] md:h-[360px] lg:h-[400px]',
        )}
      />

      <div
        className={cn(
          'flex flex-col gap-4',
          side ? 'md:flex-1 md:gap-6' : 'w-full md:gap-5 lg:gap-6',
        )}
      >
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h2
          className={cn(
            'm-0 font-brand font-medium text-lav-navy',
            side
              ? 'text-[40px] md:text-[44px] lg:text-h2'
              : 'text-[28px] md:text-[32px] lg:text-h3',
            // Must come after the size: tailwind-merge treats text-* (font-size)
            // as conflicting with leading-*, so a leading listed first is dropped.
            'leading-[1.1]',
          )}
        >
          {title}
        </h2>
        <p className="m-0 font-brand font-normal text-lav-navy/80 text-body md:text-sub leading-[1.5]">
          {description}
        </p>
        {action}
      </div>
    </div>
  );
}
