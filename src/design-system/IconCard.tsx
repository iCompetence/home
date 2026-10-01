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
      <h3 className="lav-lead font-medium text-lav-navy">{title}</h3>
      <p className="lav-body font-normal text-lav-navy/80">{description}</p>
    </article>
  );
}
