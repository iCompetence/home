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
export type BrandStarVariant =
  | 'hero'
  | 'statement'
  | 'statementRight'
  | 'testimonials'
  | 'closing'
  | 'product'
  | 'facts';

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
  // Statement with the star on the right — the star alternates sides down a
  // page, so a statement that follows a left-hand star mirrors it.
  statementRight:
    "bg-[url('/images/icompetence_visual_blau_01.png')] " +
    'top-1/2 -translate-y-1/2 right-[-130px] h-[340px] w-[340px] ' +
    'md:right-[-220px] md:h-[600px] md:w-[600px] ' +
    'lg:right-[-300px] lg:h-[900px] lg:w-[900px]',
  // Opening star of a product page. Positioned relative to the buy box (its
  // offset parent): the core sits on the page's right edge level with the
  // product title — centre x = 24px (14 on mobile) left of the box's right
  // edge, centre y = 5% of the star below its top.
  product:
    "bg-[url('/images/icompetence_visual_gelb.png')] " +
    'top-[-171px] right-[-176px] h-[380px] w-[380px] ' +
    'md:top-[-324px] md:right-[-336px] md:h-[720px] md:w-[720px] ' +
    'lg:top-[-540px] lg:right-[-576px] lg:h-[1200px] lg:w-[1200px]',
  // Mint star for dark fact bands. Never behind text: on desktop it fills the
  // left third next to the content, on compact it sits in the top-left corner
  // above it (the band reserves that space).
  facts:
    "bg-[url('/images/icompetence_visual_mint.png')] " +
    'top-[-117px] left-[-99px] h-[260px] w-[260px] ' +
    'md:top-[-153px] md:left-[-129px] md:h-[340px] md:w-[340px] ' +
    'lg:top-1/2 lg:left-[-300px] lg:h-[900px] lg:w-[900px] lg:-translate-y-1/2',
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
