/**
 * Motion tokens for the Lavender design system.
 *
 * Everything else (colour, type, radii, spacing) is tokenised in globals.css;
 * motion was not, so durations and easings had drifted apart across the
 * components — six different durations and three easings, all inline.
 *
 * These are the single source of truth. Values are in **seconds**, matching
 * framer-motion, which drives most of the motion here. The CSS-driven parts
 * (Tailwind `duration-*` / `ease-*` utilities) read the mirrored custom
 * properties in globals.css; keep the two in sync when changing a value.
 */

export const DURATION = {
  /** Menus, dropdowns, small fades — barely perceptible. */
  fast: 0.16,
  /** Default: hovers, crossfades. */
  base: 0.3,
  /** Content changing place: cards, panels. */
  slow: 0.45,
  /** Large travel across the viewport: the desktop carousel slide. */
  slower: 0.55,
} as const;

/** Cubic-bezier control points, in framer-motion's array form. */
export const EASE = {
  /** Decelerating — the default for things entering or fading. */
  out: 'easeOut',
  /** Strong deceleration for content that travels a long way (carousel). */
  emphasized: [0.32, 0.72, 0, 1],
  /** Overshoot-free settle, used by the nav's morph between states. */
  settle: [0.22, 1, 0.36, 1],
} as const;

export type EaseName = keyof typeof EASE;
