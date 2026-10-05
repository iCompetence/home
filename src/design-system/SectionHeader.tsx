import { cn } from '@/components/ui/utils';

/**
 * Title of a page section with an optional lead-in sentence and intro
 * paragraphs. The title is an h2 in the h1 type step — the page's one real h1
 * lives in the hero/product head.
 */
export function SectionHeader({
  title,
  leadIn,
  intro,
  className,
}: {
  title: string;
  /** One emphasised sentence between title and intro (lead, medium). */
  leadIn?: string;
  /** Intro paragraphs below the title. */
  intro?: readonly string[];
  className?: string;
}) {
  return (
    <div data-ds="SectionHeader" className={cn('flex w-full flex-col gap-8', className)}>
      <h2 className="lav-h1 text-lav-navy">{title}</h2>
      {leadIn && <p className="lav-lead max-w-[820px] font-medium text-lav-navy">{leadIn}</p>}
      {intro && intro.length > 0 && (
        <div className="flex max-w-[820px] flex-col gap-8">
          {intro.map((paragraph) => (
            <p key={paragraph} className="lav-lead font-normal text-lav-navy/80">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
