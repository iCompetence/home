// New design-system primitives (Lavender design). Built on the Tailwind
// tokens from PR 1 (bg-lav-*, text-h*, rounded-pill, max-w-frame, …).
// Consumed by pages as the design rolls out — see docs/design-migration.md.
export { Section } from './Section';
export { Button, buttonVariants } from './Button';
export { Eyebrow } from './Eyebrow';
export { Footer } from './Footer';
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
