'use client';

import { type ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { marked } from './QuotePanel';
import { Section } from './Section';

/**
 * Opening section of a product page: a quote in the statement step on the
 * left, the problem it frames on the right (side by side from tablet up),
 * ending in one emphasised line that leads into the product.
 *
 * The quote is marked and signed as in QuotePanel (the night home's
 * testimonials): typographic quotation marks in the page's language, then
 * the name and below it a second, quieter line (year, "attributed", source).
 */
export function QuoteIntro({
  id,
  quote,
  name,
  note,
  paragraphs,
  conclusion,
  conclusionWide = false,
  className,
}: {
  id?: string;
  /** The quote; quotation marks come from here, not from the text. */
  quote: string;
  /** Who said it, e.g. "Jensen Huang" (may be a link to the source). */
  name: ReactNode;
  /** Second line of the signature, e.g. "2024" or "Attributed". */
  note?: string;
  paragraphs: readonly string[];
  /** Last line, in the paragraphs' size but semibold and in full ink. */
  conclusion?: string;
  /** Set the last line below both columns, full width, in the statement step. */
  conclusionWide?: boolean;
  className?: string;
}) {
  const { language } = useLanguage();
  return (
    <Section id={id} className={className} dsName="QuoteIntro">
      <div className="flex flex-col gap-12 lg:gap-16">
        <div className="flex flex-col gap-8 md:flex-row lg:gap-16">
          <figure className="m-0 flex flex-col gap-8 md:flex-1">
            <blockquote className="m-0">
              <p className="lav-statement text-lav-ink">{marked(quote, language)}</p>
            </blockquote>
            <figcaption className="flex flex-col gap-2">
              <span className="lav-body font-medium text-lav-ink">{name}</span>
              {note && <span className="lav-small font-normal text-lav-ink/70">{note}</span>}
            </figcaption>
          </figure>
          <div className="flex flex-col gap-6 md:flex-1">
            {paragraphs.map((paragraph) => (
              <p key={paragraph} className="lav-body whitespace-pre-line font-normal text-lav-ink/80">
                {paragraph}
              </p>
            ))}
            {conclusion && !conclusionWide && (
              <p className="lav-body font-semibold text-lav-ink">{conclusion}</p>
            )}
          </div>
        </div>
        {conclusion && conclusionWide && <p className="lav-statement text-lav-ink">{conclusion}</p>}
      </div>
    </Section>
  );
}
