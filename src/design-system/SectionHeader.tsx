import { cn } from '@/components/ui/utils';

/**
 * Title of a page section with optional intro paragraphs. The title is an h2
 * in the h1 type step — the page's one real h1 lives in the hero/product head.
 */
export function SectionHeader({
  title,
  intro,
  className,
}: {
  title: string;
  /** Intro paragraphs below the title. */
  intro?: readonly string[];
  className?: string;
}) {
  return (
    <div data-ds="SectionHeader" className={cn('flex w-full flex-col gap-8', className)}>
      <h2 className="lav-h1 text-lav-navy">{title}</h2>
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
