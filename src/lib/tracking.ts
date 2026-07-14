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

/**
 * Push a successful-form-submission key event.
 *
 * Named `form_success` (not `form_submit`) on purpose: GA4 auto-collects a
 * `form_submit` event on every native submit. Using a distinct name keeps our
 * validated-submission key event separate and clean, so it never overrides or
 * mixes with the GA default. Safe to call on the server (no-op).
 */
export function trackFormSuccess(formId: string, formLanguage?: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'form_success',
    form_id: formId,
    form_language: formLanguage,
  });
}

interface NetlifyFormSubmitOptions {
  /** Matches the Netlify form name / form-name hidden input. */
  formId: string;
  /** 'en' redirects to /thank-you/, anything else to /danke/. */
  language?: string;
  /** Shown if the reCAPTCHA has not been solved. */
  recaptchaErrorMessage: string;
  /** Shown if the network request fails. */
  submitErrorMessage: string;
}

// sessionStorage handshake between submitNetlifyForm and the thank-you pages:
// the flag is set right before the redirect and consumed (removed) on first
// read, so /danke/ and /thank-you/ only render after a real submission and
// a reload or direct visit falls through to the homepage.
const FORM_SUCCESS_STORAGE_KEY = 'ic_form_success';

interface PendingFormSuccess {
  formId: string;
  language?: string;
}

/**
 * One-time read of the pending form-success flag. Returns the submission
 * details once and clears the flag, or null if there was no submission
 * (direct visit, reload, expired tab).
 */
export function consumePendingFormSuccess(): PendingFormSuccess | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.sessionStorage.getItem(FORM_SUCCESS_STORAGE_KEY);
    if (!raw) return null;
    window.sessionStorage.removeItem(FORM_SUCCESS_STORAGE_KEY);
    const parsed = JSON.parse(raw) as PendingFormSuccess;
    return typeof parsed.formId === 'string' ? parsed : null;
  } catch {
    return null;
  }
}

/**
 * Push the thank-you page view as its own dataLayer event. Unlike a plain
 * page_view on /danke/ (which GTM also fires for gated direct visitors just
 * before they are redirected away), this event only exists after a verified
 * submission — use it as the Ads conversion trigger.
 */
export function trackThankYouView(formId: string, formLanguage?: string): void {
  if (typeof window === 'undefined') return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({
    event: 'thank_you_view',
    form_id: formId,
    form_language: formLanguage,
    page_path: window.location.pathname,
  });
}

/**
 * Submit a JavaScript-rendered Netlify form via AJAX.
 *
 * Posts the url-encoded body (form-name + all fields + g-recaptcha-response,
 * which lives inside the form) to "/", fires `form_success` only on HTTP 200,
 * then redirects to the language-correct thank-you page. This is the documented
 * approach — a native submit that mutates form.action posts to a path Netlify
 * does not associate with the form, so the submission is not recorded.
 * https://docs.netlify.com/manage/forms/setup/#submit-javascript-rendered-forms-with-ajax
 *
 * The caller is responsible for calling e.preventDefault() before invoking this.
 */
export function submitNetlifyForm(
  form: HTMLFormElement,
  { formId, language, recaptchaErrorMessage, submitErrorMessage }: NetlifyFormSubmitOptions,
): void {
  let recaptchaSolved = true;
  try {
    const grecaptcha = (window as unknown as { grecaptcha?: { getResponse?: () => string } }).grecaptcha;
    if (grecaptcha && typeof grecaptcha.getResponse === 'function') {
      recaptchaSolved = grecaptcha.getResponse().length > 0;
    }
  } catch {
    // grecaptcha not ready — let Netlify validate server-side.
    recaptchaSolved = true;
  }
  if (!recaptchaSolved) {
    alert(recaptchaErrorMessage);
    return;
  }

  const params = new URLSearchParams();
  new FormData(form).forEach((value, key) => {
    params.append(key, typeof value === 'string' ? value : '');
  });

  const redirectTo = language === 'en' ? '/thank-you/' : '/danke/';

  fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
  })
    .then((res) => {
      if (!res.ok) throw new Error(`Netlify form submission failed: ${res.status}`);
      trackFormSuccess(formId, language);
      try {
        window.sessionStorage.setItem(
          FORM_SUCCESS_STORAGE_KEY,
          JSON.stringify({ formId, language } satisfies PendingFormSuccess),
        );
      } catch {
        // sessionStorage unavailable — the thank-you page will redirect home,
        // but the submission itself succeeded and form_success was tracked.
      }
      window.location.href = redirectTo;
    })
    .catch(() => {
      alert(submitErrorMessage);
    });
}
