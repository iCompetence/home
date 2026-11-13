'use client';

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/components/ui/utils';
import { glideOnClick } from './glide';
import { HamburgGlass } from './HamburgGlass';
import { ClosingText, LegalStrip } from './NightFooter';
import { useTextHaze } from './textHaze';
import { NightNav } from './NightNav';
import { startNightSky } from './nightSky';
import {
  ANCHOR_SCROLL_MARGIN,
  Button,
  Eyebrow,
  LINKEDIN_URL,
  LinkedInGlyph,
  PageShell,
  ProcessAccordion,
  Section,
  siteHref,
} from '@/design-system';

/**
 * Design study: the home page as a night sky ("Licht und Linie").
 *
 * Same content and i18n keys as LavenderHome. The sections are built from one
 * block, a text column beside a large glass field (FeatureRow), instead of a
 * different component per section:
 * - services: one row per field; the four services are a list, the picked one
 *   shows its description in the field (was: carousel with collapsed rows);
 * - products: the same row with the screenshot in the field (was: tiles);
 * - testimonials: the companies as a bar that moves on by itself, one quote
 *   below (was: slider);
 * - process: three tall glass fields side by side (was: accordion).
 *
 * Tabs come from src/components/ui/tabs (shadcn/Radix) for the behaviour;
 * every visual class is ours.
 */

// The brand stars at the size they are shown here (1200 px; the original PNGs
// are about 3000 px and take some 36 MB each once decoded), and a small
// pre-blurred copy of each for the glass fields on the day layer.
const STAR = {
  blue: '/images/nacht-stern-blau.webp',
  violet: '/images/nacht-stern-violett.webp',
  mint: '/images/nacht-stern-mint.webp',
} as const;
const STAR_SOFT = {
  blue: '/images/nacht-stern-blau-weich.webp',
  violet: '/images/nacht-stern-violett-weich.webp',
  mint: '/images/nacht-stern-mint-weich.webp',
} as const;
type StarKind = keyof typeof STAR;

/**
 * A glass field with its star: the star is part of the page and stands still
 * behind the glass. It is a little larger than the field, so its tips show
 * sharp past the edges while the glass turns the rest into a glow. The outer
 * element takes the grid placement, `children` float inside the glass.
 */
function StarField({ star, className, children }: { star: StarKind; className?: string; children: ReactNode }) {
  return (
    // --lav-field-star-soft: on the day layer the field shows a pre-blurred
    // copy of the star instead of blurring its backdrop (.lav-glass-clear::before).
    <div
      className={cn('relative', className)}
      style={{ '--lav-field-star-soft': `url(${STAR_SOFT[star]})` } as CSSProperties}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-[9%] bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${STAR[star]})` }}
      />
      <div className="lav-glass-clear relative h-full min-h-[320px] overflow-hidden rounded-card md:min-h-[400px] lg:min-h-[500px] lg:rounded-frame">
        {children}
      </div>
    </div>
  );
}

/** The sky: one fixed canvas behind the whole page (small stars and the guide star). On the day layer the guide star continues on that layer's own canvas. */
function NightSky({ city, hidden = false }: { city: CityPlace; hidden?: boolean }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => (canvas.current ? startNightSky(canvas.current) : undefined), []);
  return (
    <canvas
      ref={canvas}
      aria-hidden
      data-city={city}
      className={cn('pointer-events-none fixed inset-0 z-0 h-full w-full', hidden && 'invisible')}
    />
  );
}

/** Small sharp four-pointed star: the brand mark as a line-art glyph. */
function Spark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={cn('shrink-0 -rotate-[17deg]', className)}>
      <path fill="currentColor" d="M12 0Q14.5 9.5 24 12Q14.5 14.5 12 24Q9.5 14.5 0 12Q9.5 9.5 12 0Z" />
    </svg>
  );
}

/*
 * The page's one building block (after orchid.ai's feature rows): a short
 * text column next to a large glass field (StarField), sides alternating. The
 * section's star stands behind the field, and a piece of real content floats
 * in front (a description card, a screenshot).
 * The field reaches the frame edge; the text stays on the text column.
 */
type Side = 'left' | 'right';
const ROW = 'relative grid items-center gap-10 lg:grid-cols-12 lg:gap-10';
const textCol = (media: Side) =>
  cn('flex flex-col items-start gap-8 lg:col-span-5 lg:row-start-1', media === 'right' ? 'lg:col-start-1' : 'lg:col-start-8');
const mediaCol = (media: Side) =>
  cn(
    '-mx-4 md:-mx-8 lg:col-span-7 lg:row-start-1 lg:mx-0',
    media === 'right' ? 'lg:col-start-6 lg:-mr-10' : 'lg:col-start-1 lg:-ml-10',
  );

function FeatureRow({
  id,
  media,
  star,
  className,
  children,
  field,
}: {
  id?: string;
  /** Side of the glass field; the text takes the other one. */
  media: Side;
  star: StarKind;
  className?: string;
  /** The text column. */
  children: ReactNode;
  /** What floats in the glass field. */
  field: ReactNode;
}) {
  return (
    <Section id={id} className={cn('relative', className)} innerClassName={ROW}>
      <div className={textCol(media)}>{children}</div>
      <StarField star={star} className={mediaCol(media)}>
        {field}
      </StarField>
    </Section>
  );
}

/*
 * Button states. The design system's buttons (and PageShell's page-wide rule)
 * only dim to 75 % on hover, which reads as "disabled". Here the hovered
 * button takes the double star's colours (a blue-to-violet gradient,
 * .lav-star-hover in globals.css) while the guide star itself goes out (see
 * nightSky): the light moves into the button. A press gives a short squeeze.
 * `hover:opacity-100!` switches the page-wide dimming off. Resting colours
 * come from ink and ground, so the same button is white on the night sky and
 * navy on the day layer.
 */
const pressable =
  'lav-star-hover transition-[color,border-color,scale]! duration-[var(--duration-fast)] ease-out hover:text-lav-white hover:opacity-100! focus-visible:text-lav-white active:scale-[0.96]';
/** Filled button in the ink colour. Pair with variant="white". */
const solidOnNight = `${pressable} bg-lav-ink text-lav-ground`;
/** Outlined button. Pair with variant="outline". */
const outlineOnNight = `${pressable} border-lav-ink text-lav-ink hover:border-transparent focus-visible:border-transparent`;

/**
 * Where the glass city of Hamburg stands: at the end of the page (the trip
 * lands there) or in the hero (the trip starts there). Two variants to compare.
 */
type CityPlace = 'end' | 'hero';

export default function HomeNightLavender({ city = 'end' }: { city?: CityPlace }) {
  // Hamburg hero variant: which text stands on the stage. It changes while the
  // day layer covers the whole screen (half a screen after it has closed over
  // the hero), so nobody sees the swap.
  const [closing, setClosing] = useState(false);
  // While the layer covers the screen with room to spare, the stage behind it
  // is taken out of drawing: the browser then has only the layer to paint.
  const [covered, setCovered] = useState(false);
  useEffect(() => {
    const layer = document.querySelector('[data-ds="DayLayer"]');
    if (!layer) return;
    const onScroll = () => {
      const box = layer.getBoundingClientRect();
      const h = window.innerHeight;
      setClosing(box.top < -h * 0.5);
      setCovered(box.top < -h * 0.25 && box.bottom > h * 1.25);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [city]);

  if (city === 'hero') {
    return (
      <PageShell surface="inverse" nav={<NightNav />} footer={<ClosingStage shown={closing && !covered} />}>
        <NightSky city={city} hidden={covered} />
        {/* Pulled up under the nav (76 / 92 px tall), so the stage fills the
            whole first screen. id="top" sits here: the stage itself is sticky
            and would not be a scroll target. */}
        <div id="top" className="relative -mt-[76px] lg:-mt-[92px]">
          <HeroHamburg hidden={closing} covered={covered} />
          {/* On the day layer: the process accordion is the component of today's
              Lavender home (design system); services (tabs), statement, products,
              testimonials and Privacy-Led are this study's. */}
          <DayLayer>
            <DayServices />
            <Statement />
            {/* Client logos follow the statement ("… echte Geschäftsergebnisse"):
                the proof right after the claim. */}
            <LogoStream />
            <DayProducts />
            <DayTestimonials />
            <DayProcess />
            <DayPrivacyLed />
          </DayLayer>
          {/* The last screen: the day layer scrolls out completely and the
              stage is back. The footer text (ClosingStage) lies over this space. */}
          <div aria-hidden className={STAGE_HEIGHT} />
        </div>
      </PageShell>
    );
  }

  // All-night variant (Hamburg at the end of the page): the earlier state of
  // this study, kept for comparison.
  return (
    <PageShell surface="inverse" nav={<NightNav />} footer={<Closing withCity />}>
      <NightSky city={city} />
      <div className="relative">
        <Hero />
        {/* No client logos: the logo files are made for a light ground. No
            AnchorTabs: their navy bar slid in under the nav while scrolling. */}
        <Services />
        <Statement />
        <Products />
        <Testimonials />
        <Process />
        <PrivacyLed />
      </div>
    </PageShell>
  );
}

/**
 * The day layer: a light sheet that scrolls up over the hero, which stays
 * where it is. Everything on it reads `ink` and `ground` (see globals.css), so
 * the sections are the same components as on the night sky. Its own canvas
 * (fixed, inside the sheet's stacking context) is where the sky draws the guide
 * star on the sheet: above the white, behind the content.
 *
 * No `overflow` on the sheet: clipping a sheet this tall to its rounded
 * corners makes the browser mask every glass field inside against it, which
 * is slow and breaks on some graphics cards. The sky clips the star itself.
 */
function DayLayer({ children }: { children: ReactNode }) {
  return (
    <div
      data-ds="DayLayer"
      data-surface="light"
      // The Lavender components' own buttons get the study's hover (globals.css).
      data-star-hover
      className="relative z-10 rounded-card bg-lav-page text-lav-navy lg:rounded-frame"
    >
      <canvas aria-hidden data-sky="day" className="pointer-events-none fixed inset-0 h-full w-full" />
      {children}
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const { t } = useLanguage();
  // No glass here: the first view is the sky itself, with the double star as
  // the one sharp thing in it. Glass starts with the content below.
  return (
    <Section
      id="top"
      className="relative"
      innerClassName="relative flex min-h-[calc(100svh-200px)] flex-col justify-end lg:min-h-[calc(100svh-240px)]"
    >
      <div className="relative flex flex-col gap-10 lg:gap-14">
        <h1 className="lav-mega max-w-measure-wide text-lav-ink">{t('lavender.hero.headline')}</h1>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="lav-lead max-w-measure-lead text-lav-ink/80">{t('lavender.hero.subline')}</p>
          <div className="flex flex-wrap gap-4">
            {/* One action here; "Kontakt aufnehmen" is the nav's button right above. */}
            <Button asChild variant="white" className={solidOnNight}>
              <a href="#services" onClick={(e) => glideOnClick(e, 1100)}>
                {t('lavender.hero.seeServices')}
                <ArrowDown size={20} strokeWidth={2} />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </Section>
  );
}

/*
 * Variant: the trip starts and ends in Hamburg. One stage (the sky and the
 * glass city along the bottom edge) is exactly one screen and stays put for
 * the whole page. The day layer scrolls up over it and, at the end of the
 * page, out of it again. On the stage stands the hero text at first and the
 * closing call to action at the end; the two are swapped while the layer
 * covers the screen. The city's upper third is empty sky, so the text block
 * may reach into it.
 */
const STAGE_HEIGHT = 'h-[max(100svh,540px)]';
const STAGE_TEXT =
  'relative z-[1] mx-auto flex w-full max-w-measure-wide flex-1 flex-col items-center justify-center gap-8 px-[var(--section-pad-h)] pb-[min(24vw,34svh)] pt-24 text-center lg:gap-10 lg:pt-28';

function HeroHamburg({ hidden, covered }: { hidden: boolean; covered: boolean }) {
  const { t, language } = useLanguage();
  // The city stands back behind the hero's text and, at the page's end, behind the closing line.
  useTextHaze(
    () => ({
      glass: document.querySelector<HTMLElement>('[data-ds="HeroHamburg"] .lav-hamburg-glass'),
      texts: document.querySelectorAll<HTMLElement>('[data-stage] [data-haze]'),
    }),
    [hidden, covered, language],
  );
  return (
    <div
      data-ds="HeroHamburg"
      className={cn('sticky top-0 flex flex-col overflow-hidden', STAGE_HEIGHT, covered && 'invisible')}
    >
      <div data-stage="hero" className={cn(STAGE_TEXT, 'lav-enter', hidden && 'invisible')}>
        <h1 data-haze className="lav-display text-lav-ink [text-wrap:balance]">
          {t('lavender.hero.headline')}
        </h1>
        <p data-haze className="lav-lead max-w-measure-lead text-lav-ink/80">
          {t('lavender.hero.subline')}
        </p>
        {/* One action here; "Kontakt aufnehmen" is the nav's button right above. */}
        <Button asChild variant="white" className={solidOnNight}>
          <a data-haze href="#services" onClick={(e) => glideOnClick(e, 1100)}>
            {t('lavender.hero.seeServices')}
            <ArrowDown size={20} strokeWidth={2} />
          </a>
        </Button>
      </div>
      {/* On phones the full skyline would be a thin strip: show the middle of it
          larger (Landungsbrücken to Rathaus). From tablets up it spans the
          screen; behind the text it stands back (useTextHaze). */}
      <HamburgGlass className="absolute bottom-0 left-[-36%] w-[160%] md:left-0 md:w-full" />
    </div>
  );
}

/**
 * The footer of the Hamburg hero variant, in two parts:
 *
 * - the legal strip (LegalStrip in NightFooter.tsx) is an ordinary block at
 *   the very end of the page. Scrolling the last few pixels brings it
 *   in below the skyline, which moves up by the strip's height (the stage is
 *   sticky inside <main>, and <main> ends above the strip);
 * - the closing text is pinned to the screen (sticky bottom, pulled up over
 *   the last screen), so it stands still on the stage while the day layer
 *   scrolls out and while the skyline moves. It lets the pointer through to
 *   the strip beneath it. Hidden until the layer covers the hero.
 *
 * The <footer> itself has no box (`contents`), so both parts are laid out in
 * the page shell.
 */
function ClosingStage({ shown }: { shown: boolean }) {
  const { t, language } = useLanguage();
  return (
    <footer data-ds="FooterNight" className="contents">
      {/* First in the document (reading and tab order: closing line, then the
          legal links), yet it ends the strip's height (--lav-strip-h) above the page's end,
          where the strip follows: the margins pull it over the last screen and the strip under it. */}
      <div
        data-stage="closing"
        className={cn(
          'pointer-events-none sticky bottom-0 -mb-[var(--lav-strip-h)] -mt-[calc(max(100svh,540px)_-_var(--lav-strip-h))] flex flex-col',
          STAGE_HEIGHT,
          !shown && 'invisible',
        )}
      >
        {/* Contact details are on the contact page; here only the call to action. */}
        <ClosingText heading={t('lavender.cta.heading')}>
          <Button asChild variant="white" className={solidOnNight}>
            <a href={siteHref(language, 'contact')} target="_blank" rel="noopener noreferrer">
              {t('topNav.letsTalk')}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
        </ClosingText>
      </div>
      <LegalStrip className="relative z-[1]" />
    </footer>
  );
}

/* ---------------- Day layer: the Lavender home's components ---------------- */

/**
 * Services on the day layer: one field at a time (tabs), its four services
 * with their descriptions on the left, the field's star large on the right.
 * Chosen from ten variants on 2026-11-12 (was: the Lavender carousel). Tabs
 * come from shadcn/Radix; every panel is in the HTML (forceMount).
 */
function DayServices() {
  const { t } = useLanguage();
  return (
    <Section id="services" dsName="ServicesTabs" className={ANCHOR_SCROLL_MARGIN}>
      <Tabs defaultValue={SERVICE_FIELDS[0].id} className="gap-8 lg:gap-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <h2 className="lav-h1 text-lav-ink">{t('lavender.services.title')}</h2>
          <TabsList className="h-auto w-fit max-w-full gap-1 overflow-x-auto rounded-pill bg-lav-ink/[0.06] p-1">
            {SERVICE_FIELDS.map((field) => (
              <TabsTrigger
                key={field.id}
                value={field.id}
                className="lav-star-hover h-auto flex-none rounded-pill border-0 px-5 py-2.5 active:scale-[0.96] font-brand text-body font-medium text-lav-ink transition-[color,scale]! duration-[var(--duration-fast)] ease-out hover:text-lav-white data-[state=active]:bg-lav-ink data-[state=active]:text-lav-ground data-[state=active]:shadow-none"
              >
                {t(`lavender.services.${field.id}.title`)}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="grid">
          {SERVICE_FIELDS.map((field) => (
            <TabsContent
              key={field.id}
              value={field.id}
              forceMount
              // All three panels share one grid cell, so the section keeps its height when the tab changes.
              className="col-start-1 row-start-1 grid flex-none items-stretch gap-10 transition-opacity duration-[var(--duration-fast)] data-[state=inactive]:invisible data-[state=inactive]:opacity-0 lg:grid-cols-12 rounded-card ease-out focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-lav-navy focus-visible:outline-solid"
            >
              <ul className="m-0 flex list-none flex-col p-0 lg:col-span-6">
                {field.items.map((item) => (
                  <li key={item} className="flex flex-col gap-4 border-t border-lav-ink/15 py-6 last:border-b">
                    <h3 className="lav-h2 text-lav-ink">{t(`lavender.services.${field.id}.${item}.label`)}</h3>
                    <p className="lav-body max-w-measure font-normal text-lav-ink/80">
                      {t(`lavender.services.${field.id}.${item}.desc`)}
                    </p>
                  </li>
                ))}
              </ul>
              {/* Always a navy field with a white name, like the glass city: night inside the day. */}
              {/* Reaches the same outer edge as the pictures and the testimonial panel. */}
              <div className="relative -mx-4 min-h-[320px] overflow-hidden rounded-card bg-lav-navy md:-mx-8 lg:col-span-6 lg:mx-0 lg:-mr-10 lg:rounded-frame">
                <img
                  src={STAR[field.star]}
                  alt=""
                  aria-hidden
                  className="pointer-events-none absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 select-none"
                />
                <p className="lav-h1 absolute left-8 top-8 text-lav-white">{t(`lavender.services.${field.id}.title`)}</p>
              </div>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </Section>
  );
}

/**
 * A product or topic on the day layer: text beside the picture the Lavender
 * pages use for it (a finished composition with its own coloured ground, so no
 * glass field and no star behind it). Sides alternate like the other rows.
 */
function DayRow({
  id,
  media,
  image,
  imageAlt,
  imageClass,
  eyebrow,
  title,
  description,
  href,
  cta,
  external,
  primary,
  className,
}: {
  id?: string;
  media: Side;
  image: string;
  imageAlt: string;
  /** Aspect ratio and crop of the picture. */
  imageClass: string;
  /** Label above the title; left out where it would only repeat the title. */
  eyebrow?: string;
  title: string;
  description: string;
  href: string;
  cta: string;
  external?: boolean;
  className?: string;
  /** Filled button instead of the outlined one. */
  primary?: boolean;
}) {
  return (
    <Section id={id} className={cn('relative', id && ANCHOR_SCROLL_MARGIN, className)} innerClassName={ROW}>
      {/* Tight inside the group, wider towards the action: label 16, heading 24, text 32 to the button. */}
      <div className={cn(textCol(media), 'gap-6')}>
        {eyebrow && <Eyebrow className="-mb-2 text-lav-ink/70">{eyebrow}</Eyebrow>}
        {/* One step smaller on small laptops, so two-word names stay on one line. */}
        <h2 className="lav-h1 text-lav-ink lg:max-xl:text-[40px] lg:max-xl:leading-[44px]">{title}</h2>
        <p className="lav-body font-normal text-lav-ink/80">{description}</p>
        <Button asChild variant={primary ? 'white' : 'outline'} className={cn(primary ? solidOnNight : outlineOnNight, 'mt-2')}>
          <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
            {cta}
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </Button>
      </div>
      <div className={mediaCol(media)}>
        <img
          src={image}
          alt={imageAlt}
          decoding="async"
          className={cn('block w-full rounded-card object-cover lg:rounded-frame', imageClass)}
        />
      </div>
    </Section>
  );
}

function DayProducts() {
  const { t, language } = useLanguage();
  // The pictures of the Lavender home (ProductShowcase). Three products of
  // equal standing: the same size and the same label, none "featured".
  const products = [
    // The wide pictures show in full; the tall EmpCo picture is cropped to the same shape around its screenshot.
    { key: 'empco', title: t('lavender.products.empco.title'), image: '/images/lavender-empco.png', crop: 'object-[50%_34%]', route: 'empco-audit', cta: t('lavender.products.empco.cta') },
    { key: 'iknow', title: 'iKnow', image: '/images/lavender-iknow.png', crop: 'object-center', route: 'iknow', cta: t('lavender.products.iknow.cta') },
    { key: 'analyticsAgent', title: 'Analytics Agent', image: '/images/lavender-analytics-agent.png', crop: 'object-center', route: 'analytics-agent', cta: t('lavender.products.analyticsAgent.cta') },
  ] as const;
  return (
    <>
      {products.map((product, i) => (
        <DayRow
          key={product.key}
          id={i === 0 ? 'products' : undefined}
          media={i % 2 === 0 ? 'left' : 'right'}
          image={product.image}
          imageAlt={t(`lavender.products.${product.key}.imageAlt`)}
          imageClass={cn('aspect-[2416/1120]', product.crop)}
          // The three products read as one group: closer to each other than sections are.
          className={i > 0 ? 'lg:pt-4' : undefined}
          eyebrow={t('lavender.products.eyebrow')}
          title={product.title}
          description={t(`lavender.products.${product.key}.desc`)}
          href={siteHref(language, product.route)}
          cta={product.cta}
        />
      ))}
    </>
  );
}

function DayPrivacyLed() {
  const { t, language } = useLanguage();
  return (
    <DayRow
      id="privacy-led"
      media="left"
      image="/images/privacy-led.jpg"
      imageAlt={t('lavender.privacyLed.title')}
      imageClass="aspect-[2416/1120] object-center"
      title={t('lavender.privacyLed.title')}
      description={t('lavender.privacyLed.desc')}
      href={siteHref(language, 'privacy-led-ai')}
      cta={t('lavender.privacyLed.cta')}
      external
    />
  );
}

/**
 * Twelve clients in one row that moves with the page: scrolling down pushes
 * the row to the left, scrolling up brings it back; while the page rests, the
 * row rests (was: a still wall of two rows; before that five logos changing
 * at random). All in one colour, so the row reads as part of the page: each
 * logo is used as a mask over a navy field. The vector logos mask as they
 * are; five logos that are a lettering on a coloured block (DHL, REWE, Miele,
 * Klett, Lucky Bike) have a one-colour version in public/logos/mono/.
 */
const WALL = [
  ['DHL', '/logos/mono/dhl.png'],
  ['REWE', '/logos/mono/rewe.png'],
  ['Miele', '/logos/mono/miele.png'],
  ['Eventim', '/logos/eventim.svg'],
  ['TUI Cruises', '/logos/tui-cruises.svg'],
  ['TeamViewer', '/logos/teamviewer.svg'],
  ['CEWE', '/logos/cewe.svg'],
  ['DER Touristik', '/logos/dertouristik.svg'],
  ['Klett', '/logos/mono/klett.png'],
  ['Tagesspiegel', '/logos/tagesspiegel.svg'],
  ['Pentax', '/logos/pentax.svg'],
  ['Lucky Bike', '/logos/mono/luckybike.png'],
] as const;

/** Sideways travel of the logo row per pixel of page scroll. */
const STREAM_SPEED = 0.9;

function LogoStream() {
  const track = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = track.current;
    const strip = el?.parentElement;
    // With reduced motion the row does not move: the logos wrap into a still block instead (classes below).
    if (!el || !strip || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    let raf = 0;
    let seen = false;
    // The list holds the logos twice; one pass is half its width, so the row
    // can start over without a seam. Only the transform is written.
    const place = () => {
      raf = 0;
      const half = el.scrollWidth / 2;
      if (!half) return;
      const passed = window.innerHeight - strip.getBoundingClientRect().top;
      const x = (((passed * STREAM_SPEED) % half) + half) % half;
      el.style.transform = `translate3d(${-x}px,0,0)`;
    };
    const onScroll = () => {
      if (seen && !raf) raf = requestAnimationFrame(place);
    };
    const watch = new IntersectionObserver(
      ([entry]) => {
        seen = entry.isIntersecting;
        onScroll();
      },
      { rootMargin: '200px 0px' },
    );
    watch.observe(strip);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    place();
    return () => {
      cancelAnimationFrame(raf);
      watch.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const logo = (name: string, src: string, copy: boolean) => (
    <li
      key={copy ? `${name}-copy` : name}
      aria-hidden={copy || undefined}
      className={cn('mx-7 flex h-9 w-[112px] flex-none items-center justify-center lg:mx-11 lg:h-11 lg:w-[140px]', copy && 'motion-reduce:hidden')}
    >
      <span
        role="img"
        aria-label={copy ? undefined : name}
        className="block h-full w-full bg-lav-navy/85"
        style={{
          WebkitMask: `url(${src}) center / contain no-repeat`,
          mask: `url(${src}) center / contain no-repeat`,
        }}
      />
    </li>
  );

  return (
    // A band of its own between the statement and the products, with the same
    // padding as every section: 160 px to each neighbour on desktop, 112 on
    // tablets, 96 on phones.
    // It runs the full width of the day layer and fades out towards both edges.
    <section
      data-ds="LogoStream"
      className="w-full overflow-hidden py-[var(--section-pad-v)] [mask-image:linear-gradient(to_right,transparent,#000_10%,#000_90%,transparent)] motion-reduce:[mask-image:none]"
    >
      <ul
        ref={track}
        className="m-0 flex w-max list-none p-0 will-change-transform motion-reduce:mx-auto motion-reduce:w-full motion-reduce:max-w-frame motion-reduce:flex-wrap motion-reduce:justify-center motion-reduce:gap-y-10 motion-reduce:px-[var(--section-pad-h)]"
      >
        {WALL.map(([name, src]) => logo(name, src, false))}
        {WALL.map(([name, src]) => logo(name, src, true))}
      </ul>
    </section>
  );
}

/**
 * Testimonials on the day layer: one quote at a time on a lilac panel, set in
 * a reading size so even the longest quote (about 600 characters) fits one
 * screen together with its author and the arrows. (The Lavender slider sets
 * quotes in headline size on a navy band; long ones ran over two screens.)
 * All quotes share one grid cell, so the height does not jump, and all of
 * them are in the HTML.
 */
function DayTestimonials() {
  const { t } = useLanguage();
  const [index, setIndex] = useState(0);
  const count = TESTIMONIALS.length;
  const arrow =
    'lav-star-hover inline-flex size-11 cursor-pointer items-center justify-center rounded-pill border-0 bg-lav-navy text-lav-white transition-[scale]! duration-[var(--duration-fast)] ease-out active:scale-[0.96] lg:size-12';
  return (
    <Section dsName="Testimonials">
      {/* Side padding = the negative margin, so the text inside stands on the page's text edge. */}
      <div className="-mx-4 flex flex-col gap-8 rounded-card bg-lav-lavender px-4 py-6 md:-mx-8 md:px-8 md:py-10 lg:-mx-10 lg:gap-12 lg:rounded-frame lg:px-10 lg:py-14">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
          {/* May wrap on narrow panels; then into two even lines, not one word alone. */}
          <h2 className="lav-h1 text-lav-navy [text-wrap:balance]">{t('lavender.testimonials.title')}</h2>
          <div className="flex shrink-0 items-center gap-3">
            <span aria-hidden className="lav-small mr-1 text-lav-navy/70 [font-variant-numeric:tabular-nums]">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              aria-label={t('lavender.testimonials.prev')}
              onClick={() => setIndex((i) => (i - 1 + count) % count)}
              className={arrow}
            >
              <ArrowLeft size={20} strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label={t('lavender.testimonials.next')}
              onClick={() => setIndex((i) => (i + 1) % count)}
              className={arrow}
            >
              <ArrowRight size={20} strokeWidth={2} />
            </button>
          </div>
        </div>
        <div className="grid">
          {TESTIMONIALS.map((item, i) => (
            <figure
              key={item.key}
              aria-hidden={i !== index}
              className={cn(
                // Quote and author side by side wherever the panel has room for both
                // (quote 760 + gap + at least 220 for the author); otherwise the author wraps below.
                'col-start-1 row-start-1 m-0 flex flex-wrap items-start gap-x-14 gap-y-8 transition-opacity duration-[var(--duration-base)] ease-out',
                i === index ? 'opacity-100' : 'invisible opacity-0',
              )}
            >
              <blockquote className="m-0 min-w-0 flex-[0_1_760px]">
                <p className="lav-lead font-medium text-lav-navy">
                  {t(`lavender.testimonials.${item.key}.quote`)}
                </p>
              </blockquote>
              <figcaption className="flex flex-[1_0_220px] flex-col gap-2 pt-1.5">
                <span className="lav-body font-medium text-lav-navy">{item.name}</span>
                <span className="lav-small font-normal text-lav-navy/70">{t(`lavender.testimonials.${item.key}.role`)}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}

function DayProcess() {
  const { t } = useLanguage();
  return (
    <ProcessAccordion
      steps={PROCESS_STEPS.map((step) => ({
        number: step.number,
        title: t(`lavender.process.${step.key}.title`),
        description: t(`lavender.process.${step.key}.desc`),
      }))}
      title={t('lavender.process.title')}
      // The first step is open at the start.
      defaultExpanded={0}
      className={ANCHOR_SCROLL_MARGIN}
    />
  );
}

/* ---------------- Services: one row per field ---------------- */

const SERVICE_FIELDS = [
  { id: 'data', star: 'blue', media: 'right', items: ['strategy', 'engineering', 'analytics', 'visualization'] },
  { id: 'ai', star: 'violet', media: 'left', items: ['strategy', 'genai', 'agentic', 'llm'] },
  { id: 'workshops', star: 'mint', media: 'right', items: ['ai', 'enablement', 'briefings', 'trainings'] },
] as const;

/**
 * A field of services: its four services as a list on the text side; the one
 * that is picked shows its description on a card in the glass field. Tabs
 * (shadcn/Radix) give the list its keyboard behaviour; every description is in
 * the HTML (forceMount).
 */
function ServiceRow({ field, first }: { field: (typeof SERVICE_FIELDS)[number]; first: boolean }) {
  const { t } = useLanguage();
  return (
    <Section
      id={first ? 'services' : undefined}
      className={cn('relative', first && ANCHOR_SCROLL_MARGIN)}
      innerClassName="relative"
    >
      <Tabs defaultValue={field.items[0]} orientation="vertical" className={cn(ROW, 'gap-10')}>
        <div className={textCol(field.media)}>
          {first && <Eyebrow className="text-lav-ink/70">{t('lavender.services.title')}</Eyebrow>}
          <h2 className="lav-display text-lav-ink">{t(`lavender.services.${field.id}.title`)}</h2>
          <TabsList className="flex h-auto w-full flex-col items-stretch justify-start gap-0 rounded-none border-b border-lav-ink/20 bg-transparent p-0 text-lav-ink">
            {field.items.map((item) => (
              <TabsTrigger
                key={item}
                value={item}
                className="h-auto flex-none justify-between gap-4 whitespace-normal rounded-none border-0 border-t border-lav-ink/20 px-0 py-5 text-left font-brand text-[20px] font-medium leading-[1.2] text-lav-ink opacity-60 transition-opacity duration-[var(--duration-fast)] data-[state=active]:bg-transparent data-[state=active]:opacity-100 lg:text-[24px] [&>svg]:opacity-0 data-[state=active]:[&>svg]:opacity-100"
              >
                {t(`lavender.services.${field.id}.${item}.label`)}
                <Spark className="size-4 transition-opacity duration-[var(--duration-fast)]" />
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <StarField star={field.star} className={mediaCol(field.media)}>
          {field.items.map((item) => (
            <TabsContent
              key={item}
              value={item}
              forceMount
              // 12 px from the field's edge with radius 28: concentric with the 40 px field.
              // Always a navy card with white text, on the night sky and on the day layer.
              className="absolute inset-x-3 bottom-3 flex flex-none flex-col gap-5 rounded-card-sm bg-lav-navy/80 p-6 in-data-[surface=light]:bg-lav-navy data-[state=inactive]:hidden lg:right-auto lg:w-[64%] lg:rounded-frame-inner lg:p-8"
            >
              <h3 className="lav-h3 text-lav-white">{t(`lavender.services.${field.id}.${item}.label`)}</h3>
              <p className="lav-paragraph text-lav-white/80">{t(`lavender.services.${field.id}.${item}.desc`)}</p>
            </TabsContent>
          ))}
        </StarField>
      </Tabs>
    </Section>
  );
}

function Services() {
  return (
    <>
      {SERVICE_FIELDS.map((field, i) => (
        <ServiceRow key={field.id} field={field} first={i === 0} />
      ))}
    </>
  );
}

/* ---------------- Statement ---------------- */

function Statement() {
  const { t, language } = useLanguage();
  return (
    <Section>
      <div className="flex flex-col items-start gap-8 lg:gap-10">
        <p className="lav-statement max-w-measure-wide text-lav-ink [text-wrap:balance]">{t('lavender.statement')}</p>
        <Button asChild variant="white" className={solidOnNight}>
          <a href={siteHref(language, 'contact')} target="_blank" rel="noopener noreferrer">
            {t('topNav.letsTalk')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </Button>
      </div>
    </Section>
  );
}

/* ---------------- Products: the same row, a screenshot in the field ---------------- */

function ProductRow({
  id,
  media,
  star,
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  href,
  cta,
}: {
  id?: string;
  media: Side;
  star: StarKind;
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  cta: string;
}) {
  return (
    <FeatureRow
      id={id}
      media={media}
      star={star}
      className={id ? ANCHOR_SCROLL_MARGIN : undefined}
      field={
        // The screenshot starts inside the field and runs off its far corner,
        // so the glow of the star stays visible above and beside it.
        <img
          src={image}
          alt={imageAlt}
          className="absolute left-6 top-6 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] max-w-none rounded-tl-card-sm object-cover object-left-top outline outline-1 -outline-offset-1 outline-white/10 lg:left-12 lg:top-12 lg:h-[calc(100%-3rem)] lg:w-[calc(100%-3rem)] lg:rounded-tl-[28px]"
        />
      }
    >
      <Eyebrow className="text-lav-ink/70">{eyebrow}</Eyebrow>
      <h2 className="lav-h1 text-lav-ink">{title}</h2>
      <p className="lav-body text-lav-ink/80">{description}</p>
      <Button asChild variant="outline" className={outlineOnNight}>
        <a href={href}>
          {cta}
          <ArrowUpRight size={20} strokeWidth={2} />
        </a>
      </Button>
    </FeatureRow>
  );
}

function Products() {
  const { t, language } = useLanguage();
  return (
    <>
      <ProductRow
        id="products"
        media="left"
        star="blue"
        eyebrow={t('lavender.products.featuredEyebrow')}
        title={t('lavender.products.empco.title')}
        description={t('lavender.products.empco.desc')}
        image="/images/nacht-empco.webp"
        imageAlt={t('lavender.products.empco.imageAlt')}
        href={siteHref(language, 'empco-audit')}
        cta={t('lavender.products.empco.cta')}
      />
      <ProductRow
        media="right"
        star="violet"
        eyebrow={t('lavender.products.eyebrow')}
        title="iKnow"
        description={t('lavender.products.iknow.desc')}
        image="/images/nacht-iknow.webp"
        imageAlt={t('lavender.products.iknow.imageAlt')}
        href={siteHref(language, 'iknow')}
        cta={t('lavender.products.learnMore')}
      />
      <ProductRow
        media="left"
        star="mint"
        eyebrow={t('lavender.products.eyebrow')}
        title="Analytics Agent"
        description={t('lavender.products.analyticsAgent.desc')}
        image="/images/nacht-analytics-agent.webp"
        imageAlt={t('lavender.products.analyticsAgent.imageAlt')}
        href={siteHref(language, 'analytics-agent')}
        cta={t('lavender.products.learnMore')}
      />
    </>
  );
}

/* ---------------- Testimonials: companies as a bar, one quote below ---------------- */

const TESTIMONIALS = [
  { key: 'kosyrev', name: 'Sergej Kosyrev', company: 'Lucky Bike' },
  { key: 'schneider', name: 'Michael Schneider', company: 'CTS Eventim' },
  { key: 'leparoux', name: 'Miriam Leparoux', company: 'comdirect' },
  { key: 'devries', name: 'Jomique de Vries', company: 'pepXpress' },
  { key: 'loewe', name: 'Mario Löwe', company: 'Küche&Co' },
  { key: 'kroesser', name: 'Alexander Krösser', company: 'Career Partner' },
  { key: 'buettner', name: 'Till Büttner', company: 'DHL Group' },
] as const;

/** Keep in step with .lav-progress-run in globals.css. */
const ROTATE_MS = 8000;

/**
 * One quote at a time; the seven companies sit in a bar above it and the bar
 * moves on by itself. It waits while the pointer or the keyboard focus is on
 * the section, stops for good once someone picks a company, and never moves
 * with reduced motion. All quotes share one grid cell, so the height does not
 * jump, and all of them are in the HTML.
 */
function Testimonials() {
  const { t } = useLanguage();
  const [active, setActive] = useState<string>(TESTIMONIALS[0].key);
  const [auto, setAuto] = useState(false);
  const [waiting, setWaiting] = useState(false);

  useEffect(() => {
    setAuto(!window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }, []);
  useEffect(() => {
    if (!auto || waiting) return;
    const timer = window.setTimeout(() => {
      const i = TESTIMONIALS.findIndex((item) => item.key === active);
      setActive(TESTIMONIALS[(i + 1) % TESTIMONIALS.length].key);
    }, ROTATE_MS);
    return () => window.clearTimeout(timer);
  }, [active, auto, waiting]);

  return (
    <Section>
      <Tabs
        value={active}
        onValueChange={(value) => {
          setActive(value);
          setAuto(false);
        }}
        className="block gap-0"
        onPointerEnter={() => setWaiting(true)}
        onPointerLeave={() => setWaiting(false)}
        onFocusCapture={() => setWaiting(true)}
        onBlurCapture={() => setWaiting(false)}
      >
        <Eyebrow className="text-lav-ink/70">{t('lavender.testimonials.title')}</Eyebrow>
        <TabsList className="mt-8 flex h-auto w-full items-stretch justify-start gap-2 overflow-x-auto rounded-none bg-transparent p-0 text-lav-ink lg:mt-10">
          {TESTIMONIALS.map((item) => (
            <TabsTrigger
              key={item.key}
              value={item.key}
              className="relative h-auto min-w-[9.5rem] flex-none justify-start rounded-none border-0 border-t border-lav-ink/25 px-0 pb-2 pt-5 text-left font-brand text-body font-medium text-lav-ink opacity-55 transition-opacity duration-[var(--duration-fast)] data-[state=active]:bg-transparent data-[state=active]:opacity-100 lg:min-w-0 lg:flex-1"
            >
              {item.company}
              {active === item.key && (
                <span
                  key={`${auto}-${waiting}`}
                  aria-hidden
                  className={cn(
                    'absolute -top-px left-0 h-0.5 w-full origin-left bg-lav-ink',
                    auto && !waiting && 'lav-progress-run',
                  )}
                />
              )}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="mt-12 grid lg:mt-20">
          {TESTIMONIALS.map((item) => (
            <TabsContent
              key={item.key}
              value={item.key}
              forceMount
              className="col-start-1 row-start-1 flex max-w-measure-wide flex-none flex-col gap-10 transition-opacity duration-[var(--duration-base)] data-[state=inactive]:invisible data-[state=inactive]:opacity-0"
            >
              <blockquote className="m-0">
                {/* Between lav-h3 and lav-h2: the quotes run from 150 to 600 characters. */}
                <p className="m-0 font-brand text-[20px] font-medium leading-[1.3] text-lav-ink md:text-[24px] lg:text-[30px] lg:leading-[1.25] lg:tracking-[-0.3px]">
                  {t(`lavender.testimonials.${item.key}.quote`)}
                </p>
              </blockquote>
              <p className="m-0 flex flex-col gap-2">
                <span className="text-body font-medium leading-[1.4] text-lav-ink">{item.name}</span>
                <span className="text-[14px] font-normal leading-[1.4] text-lav-ink/70">
                  {t(`lavender.testimonials.${item.key}.role`)}
                </span>
              </p>
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </Section>
  );
}

/* ---------------- Process: three tall glass fields ---------------- */

const PROCESS_STEPS = [
  { number: '01', key: 'ideation' },
  { number: '02', key: 'poc' },
  { number: '03', key: 'rollout' },
] as const;

function Process() {
  const { t } = useLanguage();
  return (
    <Section id="process" className={cn('relative', ANCHOR_SCROLL_MARGIN)} innerClassName="relative">
      <Eyebrow className="text-lav-ink/70">{t('lavender.process.title')}</Eyebrow>
      <ol className="-mx-4 mt-8 grid list-none gap-4 p-0 md:-mx-8 lg:-mx-10 lg:mt-10 lg:grid-cols-3">
        {PROCESS_STEPS.map((step) => (
          <li
            key={step.key}
            className="lav-glass flex flex-col justify-between gap-16 rounded-card p-6 md:p-8 lg:min-h-[460px] lg:rounded-frame lg:p-10"
          >
            <div className="flex flex-col gap-6">
              <span className="lav-display text-lav-ink/35">{step.number}</span>
              <h3 className="lav-h1 text-lav-ink">{t(`lavender.process.${step.key}.title`)}</h3>
            </div>
            <p className="lav-paragraph text-lav-ink/80">{t(`lavender.process.${step.key}.desc`)}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ---------------- Privacy-Led: the same row ---------------- */

function PrivacyLed() {
  const { t, language } = useLanguage();
  return (
    <FeatureRow
      id="privacy-led"
      media="left"
      star="blue"
      className={ANCHOR_SCROLL_MARGIN}
      field={<Spark className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 text-lav-ink/90 lg:size-28" />}
    >
      <Eyebrow className="text-lav-ink/70">{t('topNav.privacyLed')}</Eyebrow>
      <h2 className="lav-h1 text-lav-ink">{t('lavender.privacyLed.title')}</h2>
      <p className="lav-body text-lav-ink/80">{t('lavender.privacyLed.desc')}</p>
      <Button asChild variant="outline" className={outlineOnNight}>
        <a href={siteHref(language, 'privacy-led-ai')} target="_blank" rel="noopener noreferrer">
          {t('lavender.privacyLed.cta')}
          <ArrowUpRight size={20} strokeWidth={2} />
        </a>
      </Button>
    </FeatureRow>
  );
}

/* ---------------- Closing: the landing in Hamburg ---------------- */

const EMAIL = 'info@icompetence.de';
const PHONE = '+49 40 22636380';

/**
 * Own footer instead of ClosingBlock + Footer: those end on a second big
 * headline ("Separate the signal …") right under the CTA line. Here the page
 * has one closing line, a compact row of contact and legal links, and the
 * Hamburg skyline as the very last thing.
 */
function Closing({ withCity }: { withCity: boolean }) {
  const { t, language } = useLanguage();
  return (
    <Section
      as="footer"
      dsName="FooterNight"
      className={cn('relative overflow-hidden', withCity && 'pb-0')}
      innerClassName="relative"
    >
      <div className="relative flex flex-col items-start gap-10 lg:gap-14">
        <h2 className="lav-mega max-w-measure-wide text-lav-ink">{t('lavender.cta.heading')}</h2>
        <Button asChild variant="white" className={solidOnNight}>
          <a href={siteHref(language, 'contact')} target="_blank" rel="noopener noreferrer">
            {t('topNav.letsTalk')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </Button>
      </div>

      <div className="relative mt-[var(--section-pad-v)] grid gap-8 border-t border-lav-ink/20 pt-8 md:grid-cols-12 md:gap-10">
        <div className="flex flex-col gap-3 md:col-span-4">
          <Eyebrow className="text-lav-ink/70">{t('footer.inquiries')}</Eyebrow>
          <a href={`mailto:${EMAIL}`} className="lav-body text-lav-ink">{EMAIL}</a>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4">
          <Eyebrow className="text-lav-ink/70">{t('footer.phone')}</Eyebrow>
          <span className="lav-body text-lav-ink">{PHONE}</span>
        </div>
        <div className="flex flex-wrap items-start gap-x-8 gap-y-3 md:col-span-4 md:justify-end">
          <a href={siteHref(language, 'imprint')} className="lav-body text-lav-ink/80">{t('footer.imprint')}</a>
          <a href={siteHref(language, 'privacy-policy')} className="lav-body text-lav-ink/80">{t('footer.privacy')}</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="lav-body text-lav-ink/80">LinkedIn</a>
        </div>
      </div>

      {/* Full bleed by negative margins, not by a transform: a transform would
          isolate the glass from the sky and its black would stop blending away. */}
      {withCity && <HamburgGlass className="-mx-[var(--section-pad-h)] mt-10 lg:mt-6" />}
    </Section>
  );
}
