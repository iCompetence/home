import { type ReactNode } from 'react';

/**
 * Pins absolutely-positioned decorative children (star visuals, gradients) to
 * the 1440px design frame, so coordinates taken from the design file stay
 * accurate regardless of viewport width. Purely decorative — aria-hidden and
 * non-interactive.
 */
export function DesignFrameOverlay({ children }: { children: ReactNode }) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-1/2 top-0 h-full w-full max-w-frame -translate-x-1/2"
    >
      {children}
    </div>
  );
}
