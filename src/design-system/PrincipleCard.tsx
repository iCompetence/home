import { cn } from '@/components/ui/utils';

/**
 * One principle as a highlight on a dark page: number, the principle set
 * large, its explanation. The surface (lavender or blue) comes from the
 * caller, which lays the cards out as a checkerboard (Figma: PrincipleCard).
 */
export function PrincipleCard({
  number,
  title,
  description,
  className,
}: {
  number: string;
  title: string;
  description: string;
  /** Surface, e.g. 'bg-lav-lavender' or 'bg-lav-blue' (navy text on both). */
  className?: string;
}) {
  return (
    <article
      data-ds="PrincipleCard"
      className={cn('flex flex-col gap-8 rounded-card p-8 text-lav-navy md:p-12', className)}
    >
      <span className="lav-small font-medium text-lav-navy/80">{number}</span>
      <h3 className="lav-h1 text-lav-navy">{title}</h3>
      <p className="lav-paragraph font-normal text-lav-navy/80">{description}</p>
    </article>
  );
}
