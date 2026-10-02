import { type LucideIcon } from 'lucide-react';

/** Lavender card: icon in a navy circle, title, description. */
export function IconCard({
  icon: Icon,
  title,
  description,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
}) {
  return (
    <article data-ds="IconCard" className="flex h-full flex-col gap-10 rounded-card bg-lav-lavender p-8">
      <span
        aria-hidden
        className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-pill bg-lav-navy text-lav-white"
      >
        <Icon size={24} strokeWidth={2} />
      </span>
      {/* Narrow cards cannot fit long German compounds such as
          „Kampagnenbezeichnungen“ or „Kontextverständnis“: hyphenate words of
          14+ letters, like the heading steps do. */}
      <h3 className="lav-lead lav-hyphenate font-medium text-lav-navy">{title}</h3>
      <p className="lav-body lav-hyphenate font-normal text-lav-navy/80">{description}</p>
    </article>
  );
}
