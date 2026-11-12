'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/components/ui/utils';
import { HamburgGlass } from './HamburgGlass';
import { startNightSky } from './nightSky';
import {
  ANCHOR_SCROLL_MARGIN,
  AnchorTabs,
  Button,
  Eyebrow,
  LINKEDIN_URL,
  PageShell,
  Section,
  TopNav,
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

/**
 * Tells the sky (nightSky.ts) that this section has a brand star. The sky
 * finds the marker, measures the section around it and draws the star.
 */
function NightStar({ kind, side = 'right', soft = false }: { kind: 'blue' | 'violet' | 'mint'; side?: 'left' | 'right'; soft?: boolean }) {
  return <span hidden data-night-star={kind} data-night-side={side} data-night-soft={soft ? '' : undefined} />;
}

/** The moving sky: one fixed canvas behind the whole page. */
function NightSky({ city }: { city: CityPlace }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => (canvas.current ? startNightSky(canvas.current) : undefined), []);
  return (
    <canvas ref={canvas} aria-hidden data-city={city} className="pointer-events-none fixed inset-0 z-0 h-full w-full" />
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
 * text column next to a large glass field, sides alternating. The section's
 * star rests behind the field, so the glass turns it into a soft glow, and a
 * piece of real content floats in front (a description card, a screenshot).
 * The field reaches the frame edge; the text stays on the text column.
 */
type Side = 'left' | 'right';
const ROW = 'relative grid items-center gap-10 lg:grid-cols-12 lg:gap-10';
const textCol = (media: Side) =>
  cn('flex flex-col items-start gap-8 lg:col-span-5 lg:row-start-1', media === 'right' ? 'lg:col-start-1' : 'lg:col-start-8');
const mediaCol = (media: Side) =>
  cn(
    'lav-glass-clear relative -mx-4 min-h-[320px] overflow-hidden rounded-card md:-mx-8 md:min-h-[400px] lg:col-span-7 lg:row-start-1 lg:mx-0 lg:min-h-[500px] lg:rounded-frame',
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
  star: 'blue' | 'violet' | 'mint';
  className?: string;
  /** The text column. */
  children: ReactNode;
  /** What floats in the glass field. */
  field: ReactNode;
}) {
  return (
    <Section id={id} className={cn('relative', className)} innerClassName={ROW}>
      <NightStar kind={star} side={media} />
      <div className={textCol(media)}>{children}</div>
      <div className={mediaCol(media)}>{field}</div>
    </Section>
  );
}

const outlineOnNight = 'border-lav-white text-lav-white';

/**
 * Where the glass city of Hamburg stands: at the end of the page (the trip
 * lands there) or in the hero (the trip starts there). Two variants to compare.
 */
type CityPlace = 'end' | 'hero';

export default function HomeNightLavender({ city = 'end' }: { city?: CityPlace }) {
  return (
    <PageShell surface="inverse" nav={<TopNav />} footer={<Closing withCity={city === 'end'} />}>
      <NightSky city={city} />
      <div className="relative">
        {city === 'hero' ? <HeroHamburg /> : <Hero />}
        {/* No client logos yet: the logo files are made for a light ground
            (several have an opaque background) and need night versions first. */}
        <HomeTabs />
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

function HomeTabs() {
  const { t } = useLanguage();
  const tabs = [
    { id: 'services', label: t('topNav.services') },
    { id: 'products', label: t('topNav.products') },
    { id: 'process', label: t('topNav.process') },
    { id: 'privacy-led', label: t('topNav.privacyLed') },
  ];
  return <AnchorTabs items={tabs} label={t('lavender.common.onThisPage')} />;
}

/* ---------------- Hero ---------------- */

function Hero() {
  const { t, language } = useLanguage();
  // No glass here: the first view is the sky itself, with the double star as
  // the one sharp thing in it. Glass starts with the content below.
  return (
    <Section
      id="top"
      className="relative"
      innerClassName="relative flex min-h-[calc(100svh-200px)] flex-col justify-end lg:min-h-[calc(100svh-240px)]"
    >
      <div className="relative flex flex-col gap-10 lg:gap-14">
        <h1 className="lav-mega max-w-[1100px] text-lav-white">{t('lavender.hero.headline')}</h1>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <p className="lav-lead max-w-[560px] text-lav-white/80">{t('lavender.hero.subline')}</p>
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="white">
              <a href={siteHref(language, 'contact')} target="_blank" rel="noopener noreferrer">
                {t('topNav.letsTalk')}
                <ArrowUpRight size={20} strokeWidth={2} />
              </a>
            </Button>
            <Button asChild variant="outline" className={outlineOnNight}>
              <a href="#services">
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

/**
 * Variant: the trip starts in Hamburg. Headline and actions centred above,
 * the glass city along the bottom edge of the first view. The city's upper
 * part is empty sky, so it may reach up behind the text block.
 */
function HeroHamburg() {
  const { t, language } = useLanguage();
  return (
    // A div, not a <section>: sections get a transform in the base layer, which
    // would isolate the glass city and stop its black from blending into the sky.
    <Section as="div" id="top" className="relative overflow-hidden pb-0 pt-8 lg:pt-10" innerClassName="relative">
      <div className="relative z-[1] mx-auto flex max-w-[980px] flex-col items-center gap-8 text-center lg:gap-10">
        <h1 className="lav-display text-lav-white [text-wrap:balance]">{t('lavender.hero.headline')}</h1>
        <p className="lav-lead max-w-[620px] text-lav-white/80">{t('lavender.hero.subline')}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild variant="white">
            <a href={siteHref(language, 'contact')} target="_blank" rel="noopener noreferrer">
              {t('topNav.letsTalk')}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
          <Button asChild variant="outline" className={outlineOnNight}>
            <a href="#services">
              {t('lavender.hero.seeServices')}
              <ArrowDown size={20} strokeWidth={2} />
            </a>
          </Button>
        </div>
      </div>
      <HamburgGlass className="-mx-[var(--section-pad-h)] mt-6 lg:-mt-[11.5vw]" />
    </Section>
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
      <NightStar kind={field.star} side={field.media} />
      <Tabs defaultValue={field.items[0]} orientation="vertical" className={cn(ROW, 'gap-10')}>
        <div className={textCol(field.media)}>
          {first && <Eyebrow tone="white">{t('lavender.services.title')}</Eyebrow>}
          <h2 className="lav-display text-lav-white">{t(`lavender.services.${field.id}.title`)}</h2>
          <TabsList className="flex h-auto w-full flex-col items-stretch justify-start gap-0 rounded-none border-b border-lav-white/20 bg-transparent p-0 text-lav-white">
            {field.items.map((item) => (
              <TabsTrigger
                key={item}
                value={item}
                className="h-auto flex-none justify-between gap-4 whitespace-normal rounded-none border-0 border-t border-lav-white/20 px-0 py-5 text-left font-brand text-[20px] font-medium leading-[1.2] text-lav-white opacity-60 transition-opacity duration-[var(--duration-fast)] data-[state=active]:bg-transparent data-[state=active]:opacity-100 lg:text-[24px] [&>svg]:opacity-0 data-[state=active]:[&>svg]:opacity-100"
              >
                {t(`lavender.services.${field.id}.${item}.label`)}
                <Spark className="size-4 transition-opacity duration-[var(--duration-fast)]" />
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className={mediaCol(field.media)}>
          {field.items.map((item) => (
            <TabsContent
              key={item}
              value={item}
              forceMount
              // 12 px from the field's edge with radius 28: concentric with the 40 px field.
              className="absolute inset-x-3 bottom-3 flex flex-none flex-col gap-5 rounded-card-sm bg-lav-navy/80 p-6 data-[state=inactive]:hidden lg:right-auto lg:w-[64%] lg:rounded-[28px] lg:p-8"
            >
              <h3 className="lav-h3 text-lav-white">{t(`lavender.services.${field.id}.${item}.label`)}</h3>
              <p className="lav-paragraph text-lav-white/80">{t(`lavender.services.${field.id}.${item}.desc`)}</p>
            </TabsContent>
          ))}
        </div>
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
      <div className="flex flex-col items-start gap-10 lg:gap-14">
        <p className="lav-statement max-w-[1100px] text-lav-white">{t('lavender.statement')}</p>
        <Button asChild variant="white">
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
  star: 'blue' | 'violet' | 'mint';
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
          loading="lazy"
          className="absolute left-6 top-6 h-[calc(100%-1.5rem)] w-[calc(100%-1.5rem)] max-w-none rounded-tl-card-sm object-cover object-left-top outline outline-1 -outline-offset-1 outline-white/10 lg:left-12 lg:top-12 lg:h-[calc(100%-3rem)] lg:w-[calc(100%-3rem)] lg:rounded-tl-[28px]"
        />
      }
    >
      <Eyebrow tone="white">{eyebrow}</Eyebrow>
      <h2 className="lav-h1 text-lav-white">{title}</h2>
      <p className="lav-body text-lav-white/80">{description}</p>
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
        <Eyebrow tone="white">{t('lavender.testimonials.title')}</Eyebrow>
        <TabsList className="mt-8 flex h-auto w-full items-stretch justify-start gap-2 overflow-x-auto rounded-none bg-transparent p-0 text-lav-white lg:mt-10">
          {TESTIMONIALS.map((item) => (
            <TabsTrigger
              key={item.key}
              value={item.key}
              className="relative h-auto min-w-[9.5rem] flex-none justify-start rounded-none border-0 border-t border-lav-white/25 px-0 pb-2 pt-5 text-left font-brand text-body font-medium text-lav-white opacity-55 transition-opacity duration-[var(--duration-fast)] data-[state=active]:bg-transparent data-[state=active]:opacity-100 lg:min-w-0 lg:flex-1"
            >
              {item.company}
              {active === item.key && (
                <span
                  key={`${auto}-${waiting}`}
                  aria-hidden
                  className={cn(
                    'absolute -top-px left-0 h-0.5 w-full origin-left bg-lav-white',
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
              className="col-start-1 row-start-1 flex max-w-[1000px] flex-none flex-col gap-10 transition-opacity duration-[var(--duration-base)] data-[state=inactive]:invisible data-[state=inactive]:opacity-0"
            >
              <blockquote className="m-0">
                {/* Between lav-h3 and lav-h2: the quotes run from 150 to 600 characters. */}
                <p className="m-0 font-brand text-[20px] font-medium leading-[1.3] text-lav-white md:text-[24px] lg:text-[30px] lg:leading-[1.25] lg:tracking-[-0.3px]">
                  {t(`lavender.testimonials.${item.key}.quote`)}
                </p>
              </blockquote>
              <p className="m-0 flex flex-col gap-2">
                <span className="text-body font-medium leading-[1.4] text-lav-white">{item.name}</span>
                <span className="text-[14px] font-normal leading-[1.4] text-lav-white/70">
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
      <NightStar kind="violet" side="right" soft />
      <Eyebrow tone="white">{t('lavender.process.title')}</Eyebrow>
      <ol className="-mx-4 mt-8 grid list-none gap-4 p-0 md:-mx-8 lg:-mx-10 lg:mt-10 lg:grid-cols-3">
        {PROCESS_STEPS.map((step) => (
          <li
            key={step.key}
            className="lav-glass flex flex-col justify-between gap-16 rounded-card p-6 md:p-8 lg:min-h-[460px] lg:rounded-frame lg:p-10"
          >
            <div className="flex flex-col gap-6">
              <span className="lav-display text-lav-white/35">{step.number}</span>
              <h3 className="lav-h1 text-lav-white">{t(`lavender.process.${step.key}.title`)}</h3>
            </div>
            <p className="lav-paragraph text-lav-white/80">{t(`lavender.process.${step.key}.desc`)}</p>
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
      field={<Spark className="absolute left-1/2 top-1/2 size-20 -translate-x-1/2 -translate-y-1/2 text-lav-white/90 lg:size-28" />}
    >
      <Eyebrow tone="white">{t('topNav.privacyLed')}</Eyebrow>
      <h2 className="lav-h1 text-lav-white">{t('lavender.privacyLed.title')}</h2>
      <p className="lav-body text-lav-white/80">{t('lavender.privacyLed.desc')}</p>
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
        <h2 className="lav-mega max-w-[1100px] text-lav-white">{t('lavender.cta.heading')}</h2>
        <Button asChild variant="white">
          <a href={siteHref(language, 'contact')} target="_blank" rel="noopener noreferrer">
            {t('topNav.letsTalk')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </Button>
      </div>

      <div className="relative mt-[var(--section-pad-v)] grid gap-8 border-t border-lav-white/20 pt-8 md:grid-cols-12 md:gap-10">
        <div className="flex flex-col gap-3 md:col-span-4">
          <Eyebrow tone="white">{t('footer.inquiries')}</Eyebrow>
          <a href={`mailto:${EMAIL}`} className="lav-body text-lav-white">{EMAIL}</a>
        </div>
        <div className="flex flex-col gap-3 md:col-span-4">
          <Eyebrow tone="white">{t('footer.phone')}</Eyebrow>
          <span className="lav-body text-lav-white">{PHONE}</span>
        </div>
        <div className="flex flex-wrap items-start gap-x-8 gap-y-3 md:col-span-4 md:justify-end">
          <a href={siteHref(language, 'imprint')} className="lav-body text-lav-white/80">{t('footer.imprint')}</a>
          <a href={siteHref(language, 'privacy-policy')} className="lav-body text-lav-white/80">{t('footer.privacy')}</a>
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="lav-body text-lav-white/80">LinkedIn</a>
        </div>
      </div>

      {/* Full bleed by negative margins, not by a transform: a transform would
          isolate the glass from the sky and its black would stop blending away. */}
      {withCity && <HamburgGlass className="-mx-[var(--section-pad-h)] mt-10 lg:mt-6" />}
    </Section>
  );
}
