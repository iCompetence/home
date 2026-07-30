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
      <div className="flex flex-col gap-4 p-6 lg:gap-5">
        <span className="font-brand text-[13px] font-medium uppercase tracking-[0.5px] text-lav-white/70 lg:text-[14px]">
          {eyebrow}
        </span>
        <h3 className="font-brand text-[22px] font-medium leading-[1.15] text-lav-white lg:text-[24px]">
          {title}
        </h3>
        <p className="font-brand text-[15px] font-normal leading-[1.5] text-lav-white/70 lg:text-body">
          {description}
        </p>
        <a
          href={href}
          className="inline-flex items-center gap-1.5 font-brand text-body font-medium text-lav-white no-underline"
        >
          {ctaLabel}
          <ArrowUpRight size={16} strokeWidth={2} />
        </a>
      </div>
    </article>
  );
}
