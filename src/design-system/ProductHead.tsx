import { type ReactNode } from 'react';
import { BrandStar } from './BrandStar';
import { Breadcrumb, type Crumb } from './Breadcrumb';
import { Eyebrow } from './Eyebrow';
import { MediaGallery, type GalleryImage } from './MediaGallery';

export type ProductHeadProps = {
  breadcrumb: readonly Crumb[];
  breadcrumbLabel: string;
  images: readonly GalleryImage[];
  thumbLabel: (index: number) => string;
  eyebrow: string;
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
 * mobile. Opens the page with the yellow brand star behind the buy box.
 */
export function ProductHead({
  breadcrumb,
  breadcrumbLabel,
  images,
  thumbLabel,
  eyebrow,
  title,
  subline,
  description,
  children,
  id = 'top',
}: ProductHeadProps) {
  return (
    <section id={id} data-ds="ProductHead" className="relative w-full">
      <div className="mx-auto flex w-full max-w-frame flex-col gap-6 px-[var(--section-pad-h)] pb-12 pt-6 md:pb-14 md:pt-8 lg:pb-16">
        <Breadcrumb items={breadcrumb} label={breadcrumbLabel} />
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
          <div className="w-full lg:w-[56.4%]">
            <MediaGallery images={images} thumbLabel={thumbLabel} />
          </div>
          <div className="relative flex w-full flex-col gap-8 lg:flex-1">
            {/* Negative z keeps the star behind gallery and copy; the section's
                own stacking context stops it from sliding under the page. */}
            <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
              <BrandStar variant="product" />
            </div>
            <Eyebrow className="lav-caption text-lav-navy/70">{eyebrow}</Eyebrow>
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
