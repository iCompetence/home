'use client';

import { cn } from '@/components/ui/utils';
import type { DatedRoute } from '@/lib/page-dates';
import { RichBody, useInline } from './RichText';
import { Section } from './Section';
import { SplitBlock } from './SplitBlock';
import { UpdatedNote } from './UpdatedNote';

export type ExplainerBlock = { title: string; body: string };

/**
 * The explanatory part of a page (the "SEO & LLM content" of the orientation
 * sheet), after the product content: the general topic, not the tool.
 *
 * - h2 as the question the page answers
 * - first paragraph answer-first: the core answer in bold, then context
 * - h3 blocks (rule on top, heading left from desktop up) with paragraphs,
 *   lists and tables in the RichText format
 * - the visible last-updated date (same as dateModified in the JSON-LD)
 */
export function Explainer({
  id,
  title,
  answer,
  lead,
  blocks,
  updated,
  className,
}: {
  id: string;
  title: string;
  /** The direct answer, set in bold. */
  answer: string;
  /** The rest of the first paragraph. */
  lead?: string;
  blocks: readonly ExplainerBlock[];
  updated: DatedRoute;
  className?: string;
}) {
  const inline = useInline();
  return (
    <Section id={id} dsName="Explainer" className={className} innerClassName="flex flex-col gap-12 md:gap-14">
      <div className="flex flex-col gap-8">
        <h2 className="lav-h1 max-w-[var(--container-measure-wide)] text-lav-navy">{title}</h2>
        <p className="lav-lead max-w-[var(--container-measure-lead)] font-normal break-words text-lav-navy/80">
          <strong className="font-medium text-lav-navy">{inline(answer)}</strong>
          {lead && <> {inline(lead)}</>}
        </p>
      </div>
      <div className="flex flex-col">
        {blocks.map((block) => (
          <SplitBlock key={block.title} title={block.title} headingLevel={3}>
            <RichBody text={block.body} className="max-w-[var(--container-measure-lead)]" />
          </SplitBlock>
        ))}
        <UpdatedNote route={updated} className={cn('border-t border-lav-navy/20 pt-6')} />
      </div>
    </Section>
  );
}
