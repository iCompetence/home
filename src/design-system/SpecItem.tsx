/** Numbered item under a hairline: number, title, description. */
export function SpecItem({
  number,
  title,
  description,
  as: Tag = 'div',
}: {
  number: string;
  title: string;
  description: string;
  /** 'li' when the items form an ordered sequence. */
  as?: 'div' | 'li';
}) {
  // Five in a row (EmpCo steps) leaves ~190px per item at 1250px, too narrow
  // for „Bestandsaufnahme“: hyphenate words of 14+ letters, like the headings.
  return (
    <Tag data-ds="SpecItem" className="flex flex-col gap-6 border-t border-lav-navy/20 pt-6">
      <span className="lav-small font-medium text-lav-navy/70">{number}</span>
      <h4 className="lav-lead lav-hyphenate font-medium text-lav-navy">{title}</h4>
      <p className="lav-body lav-hyphenate whitespace-pre-line font-normal text-lav-navy/80">{description}</p>
    </Tag>
  );
}
