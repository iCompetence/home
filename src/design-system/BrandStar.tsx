/**
 * The brand star of the first Lavender design, floating behind headlines.
 * "Licht und Linie" has one star instead, the sky's guide star (nightSky.ts);
 * coloured stars only stand inside fields there. What is left here serves the
 * first design's components (ClosingBlock, TestimonialSlider) and the
 * sections still on their way out.
 *
 * Placement is per-slot, not per-page: the testimonials star sits
 * behind the slider, and the closing star spans the CTA band and the footer. Keeping the presets
 * here is what stops each migrated page from re-deriving the offsets — the
 * scale is a design-system decision, not page copy.
 *
 * Purely class-driven on purpose: useBreakpoint reports `desktop` during SSR,
 * so a JS-positioned star would paint at desktop size on a phone before
 * hydration corrects it.
 *
 * Renders only the positioned layer; callers place it (TestimonialSlider pins
 * it to the 1440 design frame on desktop via DesignFrameOverlay).
 */
export type BrandStarVariant =
  | 'testimonials'
  | 'closing';

const PLACEMENT: Record<BrandStarVariant, string> = {
  testimonials:
    "bg-[url('/images/icompetence_visual_rot_01.png')] " +
    'top-1/2 -translate-y-1/2 right-[-120px] h-[360px] w-[360px] ' +
    'md:right-[-150px] md:h-[700px] md:w-[700px] ' +
    'lg:right-[-300px] lg:h-[900px] lg:w-[900px]',
  closing:
    "bg-[url('/images/icompetence_visual_01.png')] " +
    // 70 % so the white footer claim keeps 3:1 over the star's bright core.
    'opacity-70 top-1/2 -translate-y-1/2 left-[-120px] h-[420px] w-[420px] ' +
    'md:left-[-140px] md:h-[560px] md:w-[560px] ' +
    'lg:h-[820px] lg:w-[820px]',
};

export function BrandStar({ variant }: { variant: BrandStarVariant }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute bg-contain bg-center bg-no-repeat ${PLACEMENT[variant]}`}
    />
  );
}
