import { Section } from './Section';

/**
 * Opening section of a product page: a quote in the statement step on the
 * left, the problem it frames on the right (side by side from tablet up),
 * ending in one emphasised line that leads into the product.
 */
export function QuoteIntro({
  id,
  quote,
  author,
  paragraphs,
  conclusion,
  className,
}: {
  id?: string;
  quote: string;
  /** Attribution, e.g. "– Jensen Huang, 2024". */
  author: string;
  paragraphs: readonly string[];
  /** Last line, set in medium. */
  conclusion?: string;
  className?: string;
}) {
  return (
    <Section id={id} className={className} dsName="QuoteIntro">
      <div className="flex flex-col gap-8 md:flex-row lg:gap-16">
        <figure className="m-0 flex flex-col gap-8 md:flex-1">
          <blockquote className="m-0">
            <p className="lav-statement text-lav-navy">{quote}</p>
          </blockquote>
          <figcaption className="lav-body font-normal text-lav-navy/70">{author}</figcaption>
        </figure>
        <div className="flex flex-col gap-8 md:flex-1 md:gap-10">
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="lav-lead font-normal text-lav-navy/80">
              {paragraph}
            </p>
          ))}
          {conclusion && <p className="lav-lead font-medium text-lav-navy">{conclusion}</p>}
        </div>
      </div>
    </Section>
  );
}
