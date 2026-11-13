// New design-system primitives (Lavender design). Built on the Tailwind
// tokens from PR 1 (bg-lav-*, text-h*, rounded-pill, max-w-frame, …).
// Consumed by pages as the design rolls out — see docs/design-migration.md.
export { DURATION, EASE, type EaseName } from './motion';
export { Section } from './Section';
export { PageShell } from './PageShell';
export { siteHref, PREVIEW_BASE } from './routes';
export { Hero, type HeroProps } from './Hero';
export { Statement, type StatementProps } from './Statement';
export { Badge } from './Badge';
export { SegmentedControl, type SegmentOption } from './SegmentedControl';
export { PriceTag } from './PriceTag';
export { Breadcrumb, type Crumb } from './Breadcrumb';
export { MediaGallery, type GalleryImage } from './MediaGallery';
export { ZoomImage } from './ZoomImage';
export { CheckItem } from './CheckItem';
export { InfoTip } from './InfoTip';
export { ProductHead, type ProductHeadProps } from './ProductHead';
export { ANCHOR_SCROLL_MARGIN } from './anchor';
export { SectionHeader } from './SectionHeader';
export { IconCard } from './IconCard';
export { PrincipleCard } from './PrincipleCard';
export { ImageText, LoopVideo, type ImageTextProps } from './ImageText';
export { QuoteIntro } from './QuoteIntro';
export { QuotePanel, type Quote } from './QuotePanel';
export { SpecItem } from './SpecItem';
export { FaqList, type FaqEntry } from './FaqList';
export { FaqSection } from './FaqSection';
export { SplitBlock } from './SplitBlock';
export { UpdatedNote } from './UpdatedNote';
export { Explainer, type ExplainerBlock } from './Explainer';
export { DataTable } from './DataTable';
export { RichBody, plainText, useInline } from './RichText';
export { NewsEntry } from './NewsEntry';
export { FormField, TextAreaField, ConsentCheckbox, ValidatedForm, FormError } from './FormField';
export { ComparisonTable, type ComparisonRow } from './ComparisonTable';
export { FactsBand, type Fact } from './FactsBand';
export { Button, ButtonStack, buttonVariants, type ButtonVariant } from './Button';
export { Eyebrow } from './Eyebrow';
export { ProductRow, MoreProducts, type ProductRowProps, type ProductKey } from './ProductRow';
export { ProductGlimpse, type GlimpseProduct } from './ProductGlimpse';
export {
  ProcessAccordion,
  type ProcessStep,
  type ProcessAccordionProps,
} from './ProcessAccordion';
export { LanguageToggle } from './LanguageToggle';
export {
  PRODUCT_LINKS,
  PRINCIPLE_LINKS,
  NEWS_LINK,
  LINKEDIN_URL,
  smoothAnchor,
  type ProductLink,
} from './nav-links';

// Dev-only tooling (compiled out of production builds).
export { DevDials } from './dev/DevDials';
