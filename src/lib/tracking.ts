// Lightweight client-side tracking helpers that push key events to the
// GTM dataLayer (container GTM-WMTT46J, loaded in app/layout.tsx).
//
// Conventions:
// - event: 'cta_click' for call-to-action button clicks
// - cta_id: stable, unique identifier per CTA (e.g. 'footer_mail')
// - cta_label: human-readable label / value shown to the user
// - page_path: auto-captured so the same cta_id (e.g. footer mail/phone,
//   which is duplicated across pages) stays distinguishable per page in GA4.

interface DataLayerObject {
  [key: string]: unknown;
}

declare global {
  interface Window {
    dataLayer?: DataLayerObject[];
  }
}

/** Push a CTA click key event to the dataLayer. Safe to call on the server (no-op). */
export function trackCtaClick(ctaId: string, ctaLabel?: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'cta_click',
    cta_id: ctaId,
    cta_label: ctaLabel,
    page_path: window.location.pathname,
  });
}
