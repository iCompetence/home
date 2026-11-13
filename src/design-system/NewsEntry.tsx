import { ArrowUpRight } from 'lucide-react';
import { Button } from './Button';

/**
 * One entry of the news page (Figma: NewsEntry): optional image, title,
 * teaser and a soft button; the whole entry is the link.
 */
export function NewsEntry({
  title,
  teaser,
  href,
  linkLabel,
  image,
  imageAlt = '',
}: {
  title: string;
  teaser: string;
  href: string;
  linkLabel: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <article data-ds="NewsEntry" className="relative isolate flex flex-col gap-6 md:gap-8">
      {image && (
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="aspect-[12/7] w-full rounded-card bg-lav-lavender object-contain object-center lg:rounded-frame"
        />
      )}
      <h3 className="lav-lead font-medium text-lav-navy">{title}</h3>
      <p className="lav-body font-normal text-lav-navy/80">{teaser}</p>
      {/* As the home page's product rows: a soft button, and the whole entry
          is its link (the link's ::after covers the entry). One link for
          screen readers and the keyboard; the button takes its hover and focus. */}
      <a href={href} className="inline-flex self-start rounded-pill after:absolute after:inset-0 after:z-10">
        <Button asChild variant="soft">
          <span>
            {linkLabel}
            <ArrowUpRight size={20} strokeWidth={2} />
          </span>
        </Button>
      </a>
    </article>
  );
}
