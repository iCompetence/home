/** Numbered item under a hairline: number, title, description. */
export function SpecItem({
  number,
  title,
  description,
  as: Tag = 'div',
  headingLevel = 4,
}: {
  number: string;
  title: string;
  description: string;
  /** 'li' when the items form an ordered sequence. */
  as?: 'div' | 'li';
  /** 3 when the items sit directly under the section's h2 (no h3 between). */
  headingLevel?: 3 | 4;
}) {
  const Heading = headingLevel === 3 ? 'h3' : 'h4';
  // Five in a row (EmpCo steps) leaves ~190px per item at 1250px, too narrow
  // for „Bestandsaufnahme“: hyphenate words of 14+ letters, like the headings.
  return (
    <Tag data-ds="SpecItem" className="flex flex-col gap-6 border-t border-lav-navy/20 pt-6">
      <span className="lav-small font-medium text-lav-navy/70">{number}</span>
      <Heading className="lav-lead lav-hyphenate font-medium text-lav-navy">{title}</Heading>
      <p className="lav-body lav-hyphenate whitespace-pre-line font-normal text-lav-navy/80">{description}</p>
    </Tag>
  );
}
