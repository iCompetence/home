'use client';

import type { ReactNode } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/components/ui/utils';
import { Button } from './Button';
import { Eyebrow } from './Eyebrow';
import { ProductGlimpse } from './ProductGlimpse';
import { SectionHeader } from './SectionHeader';
import { Section } from './Section';
import { siteHref } from './routes';

/**
 * What stands beside the text: a picture, or a finished visual such as a
 * product's UI pieces (ProductGlimpse), which brings its own field and corner.
 */
type RowMedia =
  | {
      image: string;
      imageAlt: string;
      /** Aspect ratio and crop of the picture (default: the wide product pictures, centred). */
      imageClassName?: string;
      visual?: never;
    }
  | { visual: ReactNode; image?: never; imageAlt?: never; imageClassName?: never };

export type ProductRowProps = RowMedia & {
  /** Which side the picture stands on from desktop up (below, it follows the text). */
  media: 'left' | 'right';
  /** Label above the title; left out where it would only repeat the title. */
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  /** Opens in a new tab. */
  external?: boolean;
  /** h2 where the row is a section of its own (home page), h3 under a section title (subpages). */
  headingLevel?: 'h2' | 'h3';
  className?: string;
};

/**
 * A product (or topic) beside its picture, as on the night home: text column
 * (eyebrow, title, text, a soft button) next to a large picture with the
 * big corner radius that reaches the frame edge. Sides alternate down a page.
 * The whole row is one link to the product; the button names it.
 * Products show their UI pieces on the navy field (`visual` with
 * ProductGlimpse); topics such as Privacy-led keep a picture. Renders the row
 * only; the caller wraps it in a Section (the home page) or lists several
 * under one title (MoreProducts).
 */
export function ProductRow({
  media,
  image,
  imageAlt,
  imageClassName = 'aspect-[2416/1120] object-center',
  visual,
  eyebrow,
  title,
  description,
  href,
  cta,
  external,
  headingLevel = 'h2',
  className,
}: ProductRowProps) {
  const Heading = headingLevel;
  return (
    // isolate: the row link's layer (z-10, below) stays inside the row and never covers the page's fixed bars.
    <div data-ds="ProductRow" className={cn('relative isolate grid items-center gap-10 lg:grid-cols-12 lg:gap-10', className)}>
      {/* Tight inside the group, wider towards the action: label 16, heading 24, text 32 to the button. */}
      <div
        className={cn(
          'flex flex-col items-start gap-6 lg:col-span-5 lg:row-start-1',
          media === 'right' ? 'lg:col-start-1' : 'lg:col-start-8',
        )}
      >
        {eyebrow && <Eyebrow className="-mb-2 text-lav-ink/70">{eyebrow}</Eyebrow>}
        <Heading
          className={cn(
            'text-lav-ink',
            headingLevel === 'h2'
              ? // One step smaller on small laptops, so two-word names stay on one line.
                'lav-h1 lg:max-xl:text-[40px] lg:max-xl:leading-[44px]'
              : 'lav-h2',
          )}
        >
          {title}
        </Heading>
        <p className="lav-body font-normal text-lav-ink/80">{description}</p>
        {/* The whole row is the link (content team 11/2026, C-10): the link's
            ::after covers the row and reaches as far as the picture bleeds, so
            a click anywhere on text or picture goes there. Still one link for
            screen readers and the keyboard, with its name and focus ring on the
            button. The button is drawn in a span and takes the link's hover,
            focus and press (globals.css, "A button drawn inside a link"). */}
        <a
          href={href}
          {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
          className={cn(
            'mt-2 inline-flex rounded-pill',
            'after:absolute after:top-0 after:bottom-0 after:z-10 after:-left-4 after:-right-4 md:after:-left-8 md:after:-right-8',
            media === 'right' ? 'lg:after:left-0 lg:after:-right-10' : 'lg:after:-left-10 lg:after:right-0',
          )}
        >
          <Button asChild variant="soft">
            <span>
              {cta}
              <ArrowUpRight size={20} strokeWidth={2} />
            </span>
          </Button>
        </a>
      </div>
      {/* The picture reaches the frame edge; on phones and tablets it is wider than the text.
          A visual sets its own bleed (ProductGlimpse does the same). */}
      <div
        className={cn(
          'lg:col-span-7 lg:row-start-1',
          !visual && '-mx-4 md:-mx-8 lg:mx-0',
          media === 'right' ? 'lg:col-start-6 lg:-mr-10' : 'lg:col-start-1 lg:-ml-10',
        )}
      >
        {visual ?? (
          <img
            src={image}
            alt={imageAlt}
            // Not lazy, as on the home page: lazy pictures showed up late while scrolling.
            decoding="async"
            className={cn('block w-full rounded-card object-cover lg:rounded-frame', imageClassName)}
          />
        )}
      </div>
    </div>
  );
}

/** The products a subpage can point to; each shows its UI pieces (ProductGlimpse) as on the home page. */
const CATALOG = {
  empco: { title: 'EmpCo Audit', descKey: 'lavender.products.empco.desc', route: 'empco-audit' },
  iknow: { title: 'iKnow', descKey: 'lavender.products.iknow.desc', route: 'iknow' },
  analyticsAgent: { title: 'Analytics Agent', descKey: 'lavender.products.analyticsAgent.desc', route: 'analytics-agent' },
  intelligenticSearch: { title: 'Intelligentic Search', descKey: 'is.hero.subline', route: 'intelligentic-search' },
} as const;

export type ProductKey = keyof typeof CATALOG;

/**
 * "More products" at the end of a product page: the section title, then the
 * products as rows like on the night home (was: two dark cards side by side).
 */
export function MoreProducts({ products, id = 'more' }: { products: readonly ProductKey[]; id?: string }) {
  const { t, language } = useLanguage();
  return (
    <Section id={id} dsName="MoreProducts" innerClassName="flex flex-col gap-12 lg:gap-16">
      <SectionHeader title={t('lavender.products.moreTitle')} />
      {/* As close as the home page's product rows: one group, not sections of their own. */}
      <div className="flex flex-col gap-24 md:gap-28 lg:gap-24">
        {products.map((key, i) => {
          const product = CATALOG[key];
          return (
            <ProductRow
              key={key}
              media={i % 2 === 0 ? 'left' : 'right'}
              visual={<ProductGlimpse product={key} />}
              eyebrow={t('lavender.products.eyebrow')}
              title={product.title}
              description={t(product.descKey)}
              href={siteHref(language, product.route)}
              cta={t('lavender.products.learnMore')}
              headingLevel="h3"
            />
          );
        })}
      </div>
    </Section>
  );
}
