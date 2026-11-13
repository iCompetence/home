/**
 * Last change to the content of each redesigned page (ISO date), keyed by
 * its final route ('' = home). Drives `dateModified` in the page's JSON-LD
 * and the visible "Zuletzt aktualisiert" line (UpdatedNote), so both always
 * say the same.
 *
 * Update the date with every change to a page's text or facts, not for
 * layout or styling. At go-live, check every date once more.
 */
export const PAGE_UPDATED = {
  '': '2026-11-13',
  'empco-audit': '2026-11-13',
  iknow: '2026-11-13',
  'analytics-agent': '2026-11-13',
  'icu-user-journey-explorer': '2026-11-13',
  'intelligentic-search': '2026-11-13',
  'campaign-parameter-tool': '2026-11-13',
  'ai-workshop': '2026-11-13',
  'privacy-led-ai': '2026-11-13',
  contact: '2026-10-02',
  imprint: '2026-11-13',
  'privacy-policy': '2026-10-02',
  'whats-new': '2026-10-02',
} as const satisfies Record<string, string>;

export type DatedRoute = keyof typeof PAGE_UPDATED;

/** "13.11.2026" / "13 November 2026" for the visible line. */
export function formatPageDate(iso: string, lang: 'de' | 'en'): string {
  const [y, m, d] = iso.split('-').map(Number);
  // Fixed formats, not toLocaleDateString: server and browser must render
  // the same string (hydration), whatever the visitor's locale.
  if (lang === 'de') return `${String(d).padStart(2, '0')}.${String(m).padStart(2, '0')}.${y}`;
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  return `${d} ${months[m - 1]} ${y}`;
}
