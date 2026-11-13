/**
 * Scrolling to a place on the page, for the night design's nav and buttons.
 *
 * The browser's own smooth scrolling aims at where the target is when it
 * starts. On these pages the target often moves while the page scrolls
 * (pictures above it load and take their height, the menu closes and releases
 * its scroll lock), so the scroll ended short of the section. Here the goal is
 * read again on every frame, and for a moment after arriving the page is kept
 * on it. Any scrolling by the visitor ends it. With reduced motion, and when
 * the link was activated from the keyboard, it jumps.
 */

/** cubic-bezier(0.25, 0.1, 0.25, 1): moves from the first frame on, settles softly. */
function ease(t: number) {
  const x1 = 0.25;
  const y1 = 0.1;
  const x2 = 0.25;
  const y2 = 1;
  let s = t;
  for (let i = 0; i < 8; i++) {
    const x = 3 * (1 - s) * (1 - s) * s * x1 + 3 * (1 - s) * s * s * x2 + s * s * s - t;
    const d = 3 * (1 - s) * (1 - s) * x1 + 6 * (1 - s) * s * (x2 - x1) + 3 * s * s * (1 - x2);
    s -= x / (d || 1e-6);
  }
  return 3 * (1 - s) * (1 - s) * s * y1 + 3 * (1 - s) * s * s * y2 + s * s * s;
}

/**
 * Glide to an element (its top, minus its scroll-margin-top) or, with `null`,
 * to the top of the page. `duration` in ms; by default it grows with the
 * distance, between 0.7 and 1.4 s. `instant` jumps there (still holding the
 * goal afterwards).
 */
export function glideTo(target: Element | null, duration?: number, instant = false) {
  const margin = target ? parseFloat(getComputedStyle(target).scrollMarginTop) || 0 : 0;
  const goal = () => {
    if (!target) return 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    return Math.max(0, Math.min(max, target.getBoundingClientRect().top + window.scrollY - margin));
  };
  const jump = (top: number) => window.scrollTo({ top, behavior: 'instant' });

  let stopped = false;
  const stop = () => {
    stopped = true;
  };
  const inputs = ['wheel', 'touchstart', 'keydown', 'pointerdown'] as const;
  inputs.forEach((type) => window.addEventListener(type, stop, { once: true, passive: true }));
  const done = () => inputs.forEach((type) => window.removeEventListener(type, stop));

  // After arriving: hold the goal for a moment, in case the layout still shifts.
  const hold = (until: number) => {
    const step = (now: number) => {
      if (stopped || now > until) return done();
      const off = goal() - window.scrollY;
      if (Math.abs(off) > 1) jump(window.scrollY + off);
      requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  if (instant || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    jump(goal());
    hold(performance.now() + 1200);
    return;
  }

  const from = window.scrollY;
  const length = duration ?? Math.min(1400, Math.max(700, Math.abs(goal() - from) * 0.5));
  const start = performance.now();
  const step = (now: number) => {
    if (stopped) return done();
    const t = Math.min(1, (now - start) / length);
    jump(from + (goal() - from) * ease(t));
    if (t < 1) requestAnimationFrame(step);
    else hold(now + 1200);
  };
  requestAnimationFrame(step);
}

/** A click that came from the keyboard (Enter) or from assistive technology: no pointer, `detail` is 0. */
export const fromKeyboard = (e: { detail?: number }) => e.detail === 0;

/**
 * For `<a href="#id">`: glide to that element instead of jumping. Other links
 * are left alone. From the keyboard it jumps: someone who steers with keys
 * should not wait for a scroll.
 */
export function glideOnClick(
  e: { currentTarget: HTMLAnchorElement; preventDefault(): void; detail?: number },
  duration?: number,
) {
  const href = e.currentTarget.getAttribute('href') || '';
  if (!href.startsWith('#')) return;
  const id = href.slice(1);
  const target = id && id !== 'top' ? document.getElementById(id) : null;
  if (id && id !== 'top' && !target) return;
  e.preventDefault();
  glideTo(target, duration, fromKeyboard(e));
}
