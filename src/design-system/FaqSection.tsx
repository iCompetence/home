import { FaqList, type FaqEntry } from './FaqList';
import { Section } from './Section';

/** FAQ block of a page: title on the left (desktop), accordion beside it. */
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
      innerClassName="flex flex-col gap-8 md:gap-10 lg:flex-row"
    >
      <h2 className="lav-h1 text-lav-navy lg:w-[31.4%]">{title}</h2>
      <div className="lg:flex-1">
        <FaqList items={items} />
      </div>
    </Section>
  );
}
