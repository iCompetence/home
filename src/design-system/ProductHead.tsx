import { type ReactNode } from 'react';
import { Breadcrumb, type Crumb } from './Breadcrumb';
import { MediaGallery, type GalleryImage } from './MediaGallery';

export type ProductHeadProps = {
  breadcrumb: readonly Crumb[];
  breadcrumbLabel: string;
  /** Gallery images (with `thumbLabel`) — or pass `media` instead. */
  images?: readonly GalleryImage[];
  thumbLabel?: (index: number) => string;
  /** Replaces the gallery, e.g. the experts of a workshop. */
  media?: ReactNode;
  /** Product name — the page's h1. */
  title: string;
  /** One-line claim below the name. */
  subline?: string;
  /**
   * Make the claim the second line of the h1 (same look): for pages whose
   * search phrase is the claim, e.g. EmpCo "Website auf Greenwashing prüfen."
   */
  sublineInHeading?: boolean;
  /** Longer supporting paragraph. */
  description?: string;
  /** Everything below the copy: price, buttons, benefit list … */
  children?: ReactNode;
  id?: string;
};

/**
 * Head of a product page (template A): gallery on the left, the "buy box"
 * with name, claim and calls to action on the right; stacked on tablet and
 * mobile. No star of its own (was: the yellow brand star behind the buy
 * box): the sky's guide star is the one star on the page. No eyebrow above
 * the name: the breadcrumb already says "Products" (2026-10-02).
 */
export function ProductHead({
  breadcrumb,
  breadcrumbLabel,
  images,
  thumbLabel,
  media,
  title,
  subline,
  sublineInHeading = false,
  description,
  children,
  id = 'top',
}: ProductHeadProps) {
  const sublineClass = 'lav-lead font-normal text-lav-navy/80';
  return (
    <section id={id} data-ds="ProductHead" className="relative w-full">
      <div className="mx-auto flex w-full max-w-frame flex-col gap-6 px-[var(--section-pad-h)] pb-[var(--section-pad-v)] pt-6 md:pt-8">
        <Breadcrumb items={breadcrumb} label={breadcrumbLabel} />
        <div className="flex flex-col gap-8 md:gap-10 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-[56.4%]">
            {media ??
              (images && thumbLabel && <MediaGallery images={images} thumbLabel={thumbLabel} />)}
          </div>
          <div className="flex w-full flex-col gap-8 lg:flex-1">
            {subline && sublineInHeading ? (
              // Two blocks with the gap of the column, so it looks exactly
              // like name + claim; the colon is for the heading's text only
              // (absolutely positioned, it takes no space in the flex column).
              <h1 className="m-0 flex flex-col gap-8 text-lav-navy">
                <span className="lav-h1 text-lav-navy">{title}</span>
                <span className="sr-only">: </span>
                <span className={sublineClass}>{subline}</span>
              </h1>
            ) : (
              <>
                <h1 className="lav-h1 text-lav-navy">{title}</h1>
                {subline && <p className={sublineClass}>{subline}</p>}
              </>
            )}
            {description && <p className="lav-body font-normal text-lav-navy/80">{description}</p>}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
