/** Nav data for the shared TopNav. Labels are i18n keys (project useLanguage). */

export type NavSection = {
  /** Element id of the section on the page (anchor target). */
  id: string;
  /** Translation key for the label. */
  labelKey: string;
};

export type ProductLink = {
  labelKey: string;
  /** Un-prefixed path; Netlify redirects to the language version. */
  href: string;
};

/**
 * Section anchors of the new homepage. Pages without these sections should pass
 * their own `sections` (or an empty array) to <TopNav>.
 */
export const HOME_NAV_SECTIONS: readonly NavSection[] = [
  { id: 'services', labelKey: 'topNav.services' },
  { id: 'products', labelKey: 'topNav.products' },
  { id: 'process', labelKey: 'topNav.process' },
  { id: 'privacy-led', labelKey: 'topNav.privacyLed' },
];

/** Products & tools shown in the burger menu (sorted alphabetically at render). */
export const PRODUCT_LINKS: readonly ProductLink[] = [
  { labelKey: 'burgerMenu.empcoAudit', href: '/empco-audit/' },
  { labelKey: 'burgerMenu.analyticsAgent', href: '/analytics-agent/' },
  { labelKey: 'burgerMenu.iknow', href: '/iknow/' },
  { labelKey: 'burgerMenu.intelligenticSearch', href: '/intelligentic-search/' },
  { labelKey: 'burgerMenu.privacyLedAi', href: '/privacy-led-ai/' },
  { labelKey: 'burgerMenu.aiWorkshop', href: '/ai-workshop/' },
  { labelKey: 'burgerMenu.campaignTool', href: '/campaign-parameter-tool/' },
  { labelKey: 'burgerMenu.userJourney', href: '/icu-user-journey-explorer/' },
  { labelKey: 'burgerMenu.whatsNew', href: '/whats-new/' },
];

export const LINKEDIN_URL = 'https://www.linkedin.com/company/icompetence/';

/** Smooth-scroll for in-page `#anchor` links. */
/** Smooth scrolling is a common vestibular trigger — jump instead when asked. */
const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export function smoothAnchor(e: React.MouseEvent<HTMLAnchorElement>) {
  const href = e.currentTarget.getAttribute('href') || '';
  if (!href.startsWith('#')) return;
  e.preventDefault();
  const id = href.slice(1);
  if (!id || id === 'top') {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
    return;
  }
  document
    .getElementById(id)
    ?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
}
