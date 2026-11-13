import { FaqList, type FaqEntry } from './FaqList';
import { Section } from './Section';

/**
 * FAQ block of a page, built like the process accordion of the night home:
 * the title on top across the full width, the questions below it, answers in
 * the reading width. (Was: the title in a side column of 31.4 % from desktop
 * up; at 54 px it broke words such as "Produktsuche" or "Frequently" in the
 * middle between 1024 and 1279 px.)
 */
export function FaqSection({
  id = 'faq',
  title,
  items,
  className,
}: {
  id?: string;
  title: string;
  items: readonly FaqEntry[];
  className?: string;
}) {
  return (
    <Section
      id={id}
      className={className}
      dsName="FaqSection"
      innerClassName="flex flex-col gap-8 md:gap-10 lg:gap-12"
    >
      <h2 className="lav-h1 w-full text-lav-ink">{title}</h2>
      <FaqList items={items} />
    </Section>
  );
}
