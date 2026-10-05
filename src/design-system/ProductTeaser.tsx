import { ArrowUpRight } from 'lucide-react';
import { cn } from '@/components/ui/utils';

export type ProductTeaserProps = {
  eyebrow: string;
  title: string;
  description: string;
  /** Image src; rendered as a real <img> so it is crawlable and has alt text. */
  image: string;
  imageAlt: string;
  href: string;
  /** CTA label, e.g. t('common.learnMore'). */
  ctaLabel: string;
  className?: string;
};

/** Dark product card: image on top, eyebrow / title / copy / CTA below. */
export function ProductTeaser({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  href,
  ctaLabel,
  className,
}: ProductTeaserProps) {
  return (
    <article
      data-ds="ProductTeaser"
      className={cn(
        'flex flex-1 flex-col overflow-hidden rounded-card bg-lav-navy',
        className,
      )}
    >
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        className="h-[200px] w-full bg-lav-lavender object-contain object-center lg:h-[280px]"
      />
      <div className="flex flex-col gap-6 p-6 lg:gap-8">
        <span className="lav-caption font-medium uppercase text-lav-white/70">
          {eyebrow}
        </span>
        <h3 className="lav-h3 text-lav-white">
          {title}
        </h3>
        <p className="lav-paragraph font-normal text-lav-white/70">
          {description}
        </p>
        <a
          href={href}
          className="inline-flex items-center gap-2 text-lav-white no-underline"
        >
          <span className="lav-body font-medium">{ctaLabel}</span>
          <ArrowUpRight size={16} strokeWidth={2} />
        </a>
      </div>
    </article>
  );
}
