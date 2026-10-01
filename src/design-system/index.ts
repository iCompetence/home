// New design-system primitives (Lavender design). Built on the Tailwind
// tokens from PR 1 (bg-lav-*, text-h*, rounded-pill, max-w-frame, …).
// Consumed by pages as the design rolls out — see docs/design-migration.md.
export { DURATION, EASE, type EaseName } from './motion';
export { Section } from './Section';
export { PageShell } from './PageShell';
export { siteHref, PREVIEW_BASE } from './routes';
export { Hero, type HeroProps } from './Hero';
export { BrandStar, type BrandStarVariant } from './BrandStar';
export { Statement, type StatementProps } from './Statement';
export { FeatureBlock, type FeatureBlockProps } from './FeatureBlock';
export { ProductShowcase, type ProductShowcaseProps } from './ProductShowcase';
export { CTABand, type CTABandProps } from './CTABand';
export { Badge } from './Badge';
export { Breadcrumb, type Crumb } from './Breadcrumb';
export { MediaGallery, type GalleryImage } from './MediaGallery';
export { CheckItem } from './CheckItem';
export { ProductHead, type ProductHeadProps } from './ProductHead';
export { AnchorTabs, ANCHOR_SCROLL_MARGIN, type AnchorTab } from './AnchorTabs';
export { SectionHeader } from './SectionHeader';
export { IconCard } from './IconCard';
export { ImageText, LoopVideo, type ImageTextProps } from './ImageText';
export { QuoteIntro } from './QuoteIntro';
export { SpecItem } from './SpecItem';
export { FaqList, type FaqEntry } from './FaqList';
export { FaqSection } from './FaqSection';
export { FormField, ConsentCheckbox } from './FormField';
export { ComparisonTable, type ComparisonRow } from './ComparisonTable';
export { FactsBand, type Fact } from './FactsBand';
export { ClosingBlock, type ClosingBlockProps } from './ClosingBlock';
export { Button, buttonVariants } from './Button';
export { Eyebrow } from './Eyebrow';
export { Footer } from './Footer';
export { ProductTeaser, type ProductTeaserProps } from './ProductTeaser';
export { DesignFrameOverlay } from './DesignFrameOverlay';
export {
  ServicesCarousel,
  type ServiceCard,
  type ServicePill,
  type ServicesCarouselProps,
} from './ServicesCarousel';
export {
  ProcessAccordion,
  type ProcessStep,
  type ProcessAccordionProps,
} from './ProcessAccordion';
export { LogoCarousel, CLIENT_LOGOS, type LogoEntry } from './LogoCarousel';
export {
  TestimonialSlider,
  type Testimonial,
  type TestimonialSliderProps,
} from './TestimonialSlider';
export { TopNav, type TopNavProps } from './TopNav';
export { BurgerMenu } from './BurgerMenu';
export { LanguageToggle } from './LanguageToggle';
export { LinkedInGlyph } from './icons';
export { useBreakpoint, isCompact, type Bp } from './useBreakpoint';
export {
  HOME_NAV_SECTIONS,
  PRODUCT_LINKS,
  LINKEDIN_URL,
  smoothAnchor,
  type NavSection,
  type ProductLink,
} from './nav-links';

// Dev-only tooling (compiled out of production builds).
export { DevDials } from './dev/DevDials';
