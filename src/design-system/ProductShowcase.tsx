import { Section } from './Section';
import { FeatureBlock, type FeatureBlockProps } from './FeatureBlock';
import { ProductTeaser, type ProductTeaserProps } from './ProductTeaser';

export type ProductShowcaseProps = {
  /** The headline product, given the full-width feature treatment. */
  featured?: Omit<FeatureBlockProps, 'layout'>;
  /** The remaining products as a row of equal cards. */
  teasers?: readonly ProductTeaserProps[];
  id?: string;
};

/**
 * A featured product above a row of teaser cards. One section, so the feature
 * and the cards share a single vertical rhythm instead of stacking two
 * sections' padding on top of each other.
 */
export function ProductShowcase({ featured, teasers = [], id = 'products' }: ProductShowcaseProps) {
  return (
    <Section dsName="ProductShowcase" id={id} innerClassName="flex flex-col gap-6 lg:gap-10">
      {featured && <FeatureBlock {...featured} layout="side" />}
      {teasers.length > 0 && (
        <div className="flex w-full flex-col gap-6 md:flex-row lg:gap-10">
          {teasers.map((teaser, i) => (
            <ProductTeaser key={i} {...teaser} />
          ))}
        </div>
      )}
    </Section>
  );
}
