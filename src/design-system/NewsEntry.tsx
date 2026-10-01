/**
 * One entry of the news page (Figma: NewsEntry): optional image, title,
 * teaser and a "learn more" link.
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
    <article data-ds="NewsEntry" className="flex flex-col gap-6 md:gap-8">
      {image && (
        <img
          src={image}
          alt={imageAlt}
          loading="lazy"
          className="aspect-[12/7] w-full rounded-card bg-lav-lavender object-contain object-center"
        />
      )}
      <h3 className="lav-lead font-medium text-lav-navy">{title}</h3>
      <p className="lav-body font-normal text-lav-navy/80">{teaser}</p>
      <a href={href} className="lav-body self-start font-medium text-lav-navy no-underline">
        {linkLabel} →
      </a>
    </article>
  );
}
