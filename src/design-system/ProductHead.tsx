import { type ReactNode } from 'react';
import { BrandStar } from './BrandStar';
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
  /** Longer supporting paragraph. */
  description?: string;
  /** Everything below the copy: price, buttons, benefit list … */
  children?: ReactNode;
  id?: string;
};

/**
 * Head of a product page (template A): gallery on the left, the "buy box"
 * with name, claim and calls to action on the right; stacked on tablet and
 * mobile. Opens the page with the yellow brand star behind the buy box. No
 * eyebrow above the name: the breadcrumb already says "Products" (2026-10-02).
 */
export function ProductHead({
  breadcrumb,
  breadcrumbLabel,
  images,
  thumbLabel,
  media,
  title,
  subline,
  description,
  children,
  id = 'top',
}: ProductHeadProps) {
  return (
    <section id={id} data-ds="ProductHead" className="relative w-full">
      <div className="mx-auto flex w-full max-w-frame flex-col gap-6 px-[var(--section-pad-h)] pb-[var(--section-pad-v)] pt-6 md:pt-8">
        <Breadcrumb items={breadcrumb} label={breadcrumbLabel} />
        <div className="flex flex-col gap-8 md:gap-10 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-[56.4%]">
            {media ??
              (images && thumbLabel && <MediaGallery images={images} thumbLabel={thumbLabel} />)}
          </div>
          <div className="relative flex w-full flex-col gap-8 lg:flex-1">
            {/* Negative z keeps the star behind gallery and copy; the section's
                own stacking context stops it from sliding under the page. */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <BrandStar variant="product" />
            </div>
            <h1 className="lav-h1 text-lav-navy">{title}</h1>
            {subline && <p className="lav-lead font-normal text-lav-navy/80">{subline}</p>}
            {description && <p className="lav-body font-normal text-lav-navy/80">{description}</p>}
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
