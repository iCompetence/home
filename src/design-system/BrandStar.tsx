/**
 * The brand star that gives the new design its large-format feel.
 *
 * Placement is per-slot, not per-page: the hero star bleeds off the right
 * edge, the statement star sits behind the sentence on the left, and the
 * closing star spans the CTA band and the footer. Keeping the three presets
 * here is what stops each migrated page from re-deriving the offsets — the
 * scale is a design-system decision, not page copy.
 *
 * Purely class-driven on purpose: useBreakpoint reports `desktop` during SSR,
 * so a JS-positioned star would paint at desktop size on a phone before
 * hydration corrects it.
 *
 * Renders only the positioned layer; callers place it (Hero and Statement pin
 * it to the 1440 design frame on desktop via DesignFrameOverlay).
 */
export type BrandStarVariant = 'hero' | 'statement' | 'testimonials' | 'closing';

const PLACEMENT: Record<BrandStarVariant, string> = {
  hero:
    "bg-[url('/images/icompetence_visual_gelb.png')] " +
    'top-[-40px] right-[-110px] h-[380px] w-[380px] ' +
    'md:top-[-120px] md:right-[-100px] md:h-[720px] md:w-[720px] ' +
    'lg:top-[-200px] lg:right-auto lg:left-[560px] lg:h-[1200px] lg:w-[1200px]',
  statement:
    "bg-[url('/images/icompetence_visual_blau_01.png')] " +
    'top-1/2 -translate-y-1/2 left-[-130px] h-[340px] w-[340px] ' +
    'md:left-[-220px] md:h-[600px] md:w-[600px] ' +
    'lg:left-[-300px] lg:h-[900px] lg:w-[900px]',
  testimonials:
    "bg-[url('/images/icompetence_visual_rot_01.png')] " +
    'top-1/2 -translate-y-1/2 right-[-120px] h-[360px] w-[360px] ' +
    'md:right-[-150px] md:h-[700px] md:w-[700px] ' +
    'lg:right-[-300px] lg:h-[900px] lg:w-[900px]',
  closing:
    "bg-[url('/images/icompetence_visual_01.png')] " +
    'top-1/2 -translate-y-1/2 left-[-120px] h-[420px] w-[420px] ' +
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
