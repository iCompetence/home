/** Link data for the shared nav (BurgerMenu). Labels are i18n keys (project useLanguage). */

export type ProductLink = {
  labelKey: string;
  /** Un-prefixed route; rendered through siteHref (language + preview base). */
  href: string;
};

/** Products & tools shown in the burger menu (sorted alphabetically at render). */
export const PRODUCT_LINKS: readonly ProductLink[] = [
  { labelKey: 'burgerMenu.empcoAudit', href: '/empco-audit/' },
  { labelKey: 'burgerMenu.analyticsAgent', href: '/analytics-agent/' },
  { labelKey: 'burgerMenu.iknow', href: '/iknow/' },
  { labelKey: 'burgerMenu.intelligenticSearch', href: '/intelligentic-search/' },
  { labelKey: 'burgerMenu.aiWorkshop', href: '/ai-workshop/' },
  { labelKey: 'burgerMenu.campaignTool', href: '/campaign-parameter-tool/' },
  { labelKey: 'burgerMenu.userJourney', href: '/icu-user-journey-explorer/' },
];

/** The burger menu's own group below the products (Dennis, 2026-10-02). */
export const PRINCIPLE_LINKS: readonly ProductLink[] = [
  { labelKey: 'burgerMenu.privacyLedAi', href: '/privacy-led-ai/' },
];

/** Sits next to Home in the burger menu's first row, on the right. */
export const NEWS_LINK: ProductLink = { labelKey: 'burgerMenu.whatsNew', href: '/whats-new/' };

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
