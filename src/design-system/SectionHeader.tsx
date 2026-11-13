import { cn } from '@/components/ui/utils';

/**
 * Title of a page section with an optional lead-in sentence and intro
 * paragraphs. The title is an h2 in the h1 type step — the page's one real h1
 * lives in the hero/product head.
 *
 * Paragraphs are running text in the body step, like all running text on the
 * page (content team 11/2026: one size for running text). The lead step is
 * left to single sentences that introduce: the lead-in here, the subline in
 * the page head.
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
  /** Intro paragraphs below the title (running text, body step). */
  intro?: readonly string[];
  className?: string;
}) {
  return (
    <div data-ds="SectionHeader" className={cn('flex w-full flex-col gap-8', className)}>
      <h2 className="lav-h1 text-lav-navy">{title}</h2>
      {leadIn && <p className="lav-lead max-w-[820px] font-medium text-lav-navy">{leadIn}</p>}
      {intro && intro.length > 0 && (
        <div className="flex max-w-measure-lead flex-col gap-6">
          {intro.map((paragraph) => (
            <p key={paragraph} className="lav-body font-normal text-lav-navy/80">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}
