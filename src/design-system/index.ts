// New design-system primitives (Lavender design). Built on the Tailwind
// tokens from PR 1 (bg-lav-*, text-h*, rounded-pill, max-w-frame, …).
// Consumed by pages as the design rolls out — see docs/design-migration.md.
export { DURATION, EASE, type EaseName } from './motion';
export { Section } from './Section';
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
