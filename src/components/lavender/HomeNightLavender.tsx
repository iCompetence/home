'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/components/ui/utils';
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
 * Same content and i18n keys as LavenderHome, different components where the
 * content asked for it:
 * - services: three tabs with all four services open, instead of a carousel
 *   of cards with collapsed rows (11 of 12 descriptions were hidden);
 * - testimonials: one quote plus all seven names to pick from, instead of a
 *   slider that shows one name at a time;
 * - process: three open rows, instead of an accordion that hides two of three.
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
function NightSky() {
  const canvas = useRef<HTMLCanvasElement>(null);
  useEffect(() => (canvas.current ? startNightSky(canvas.current) : undefined), []);
  return <canvas ref={canvas} aria-hidden className="pointer-events-none fixed inset-0 z-0 h-full w-full" />;
}

/**
 * Milk-glass frame. It reaches past the text column by exactly its own
 * padding (16 / 32 / 40 px), so text inside a frame and text outside of one
 * start on the same vertical line.
 */
function Glass({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      data-ds="Glass"
      className={cn(
        'lav-glass relative -mx-4 rounded-card p-4 md:-mx-8 md:p-8 lg:-mx-10 lg:rounded-frame lg:p-10',
        className,
      )}
    >
      {children}
    </div>
  );
}

const outlineOnNight = 'border-lav-white text-lav-white';

export default function HomeNightLavender() {
  return (
    <PageShell surface="inverse" nav={<TopNav />} footer={<Closing />}>
      <NightSky />
      <div className="relative">
        <Hero />
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

/* ---------------- Services: three tabs, everything open ---------------- */

const SERVICE_FIELDS = [
  { id: 'data', star: 'blue', items: ['strategy', 'engineering', 'analytics', 'visualization'] },
  { id: 'ai', star: 'violet', items: ['strategy', 'genai', 'agentic', 'llm'] },
  { id: 'workshops', star: 'mint', items: ['ai', 'enablement', 'briefings', 'trainings'] },
] as const;

type ServiceFieldId = (typeof SERVICE_FIELDS)[number]['id'];

function Services() {
  const { t } = useLanguage();
  const [field, setField] = useState<ServiceFieldId>('data');

  return (
    <Section id="services" className={cn('relative', ANCHOR_SCROLL_MARGIN)} innerClassName="relative">
      <h2 className="lav-h1 text-lav-white">{t('lavender.services.title')}</h2>

      {/* The section's star takes the colour of the open field. */}
      <NightStar kind={SERVICE_FIELDS.find((f) => f.id === field)?.star ?? 'blue'} />

      <Tabs
        value={field}
        onValueChange={(v) => setField(v as ServiceFieldId)}
        orientation="vertical"
        className="mt-10 block gap-0 lg:mt-14"
      >
        <Glass className="grid gap-10 lg:grid-cols-12 lg:gap-10 lg:py-14">
          <TabsList className="flex h-auto w-full flex-col items-start justify-start gap-5 rounded-none bg-transparent p-0 text-lav-white lg:col-span-5 lg:gap-8">
            {SERVICE_FIELDS.map((f) => (
              <TabsTrigger
                key={f.id}
                value={f.id}
                className="h-auto flex-none justify-start whitespace-normal rounded-none border-0 p-0 text-left font-brand text-[40px] font-medium leading-[1] tracking-[-1.5px] text-lav-white opacity-45 transition-opacity duration-[var(--duration-fast)] data-[state=active]:bg-transparent data-[state=active]:opacity-100 md:text-[56px] lg:text-[80px] lg:tracking-[-3px]"
              >
                {t(`lavender.services.${f.id}.title`)}
              </TabsTrigger>
            ))}
          </TabsList>

          {SERVICE_FIELDS.map((f) => (
            <TabsContent key={f.id} value={f.id} forceMount className="data-[state=inactive]:hidden lg:col-span-7">
              <ul className="m-0 list-none p-0">
                {f.items.map((item, i) => (
                  <li
                    key={item}
                    className={cn(
                      'grid gap-3 py-6 md:grid-cols-5 md:gap-8',
                      i > 0 && 'border-t border-lav-white/20',
                      i === 0 && 'pt-0',
                      i === f.items.length - 1 && 'pb-0',
                    )}
                  >
                    <h3 className="lav-h3 text-lav-white md:col-span-2">
                      {t(`lavender.services.${f.id}.${item}.label`)}
                    </h3>
                    <p className="lav-paragraph text-lav-white/80 md:col-span-3">
                      {t(`lavender.services.${f.id}.${item}.desc`)}
                    </p>
                  </li>
                ))}
              </ul>
            </TabsContent>
          ))}
        </Glass>
      </Tabs>
    </Section>
  );
}

/* ---------------- Statement ---------------- */

function Statement() {
  const { t, language } = useLanguage();
  return (
    <Section>
      <NightStar kind="violet" side="right" soft />
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

/* ---------------- Products ---------------- */

function ProductTile({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  href,
  featured = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  image: string;
  imageAlt: string;
  href: string;
  featured?: boolean;
}) {
  return (
    <a
      href={href}
      data-ds="ProductTile"
      // Image 12 px from the frame edge with radius 28: concentric with the 40 px frame.
      className={cn(
        'lav-glass grid gap-6 rounded-card p-3 text-lav-white lg:rounded-frame',
        featured ? 'lg:col-span-2 lg:grid-cols-12' : 'lg:grid-cols-2',
      )}
    >
      <div
        className={cn(
          'flex flex-col justify-between gap-10 p-3 md:p-5 lg:p-7',
          featured && 'lg:col-span-5',
        )}
      >
        <Eyebrow tone="white">{eyebrow}</Eyebrow>
        <div className="flex flex-col gap-5">
          <h3 className="lav-h2 text-lav-white">{title}</h3>
          <p className="lav-paragraph text-lav-white/80">{description}</p>
        </div>
      </div>
      <img
        src={image}
        alt={imageAlt}
        loading="lazy"
        className={cn(
          'h-full min-h-[200px] w-full rounded-card-sm object-cover object-left-top outline outline-1 -outline-offset-1 outline-white/10 lg:rounded-[28px]',
          featured ? 'max-h-[440px] lg:col-span-7' : 'max-h-[320px]',
        )}
      />
    </a>
  );
}

function Products() {
  const { t, language } = useLanguage();
  return (
    <Section id="products" className={cn('relative', ANCHOR_SCROLL_MARGIN)} innerClassName="relative">
      <h2 className="lav-h1 text-lav-white">{t('topNav.products')}</h2>
      <NightStar kind="blue" side="left" soft />
      <div className="relative -mx-4 mt-10 grid gap-4 md:-mx-8 lg:-mx-10 lg:mt-14 lg:grid-cols-2">
        <ProductTile
          featured
          eyebrow={t('lavender.products.featuredEyebrow')}
          title={t('lavender.products.empco.title')}
          description={t('lavender.products.empco.desc')}
          image="/images/nacht-empco.webp"
          imageAlt={t('lavender.products.empco.imageAlt')}
          href={siteHref(language, 'empco-audit')}
        />
        <ProductTile
          eyebrow={t('lavender.products.eyebrow')}
          title="iKnow"
          description={t('lavender.products.iknow.desc')}
          image="/images/nacht-iknow.webp"
          imageAlt={t('lavender.products.iknow.imageAlt')}
          href={siteHref(language, 'iknow')}
        />
        <ProductTile
          eyebrow={t('lavender.products.eyebrow')}
          title="Analytics Agent"
          description={t('lavender.products.analyticsAgent.desc')}
          image="/images/nacht-analytics-agent.webp"
          imageAlt={t('lavender.products.analyticsAgent.imageAlt')}
          href={siteHref(language, 'analytics-agent')}
        />
      </div>
    </Section>
  );
}

/* ---------------- Testimonials: one quote, all seven names ---------------- */

const TESTIMONIALS = [
  { key: 'kosyrev', name: 'Sergej Kosyrev' },
  { key: 'schneider', name: 'Michael Schneider' },
  { key: 'leparoux', name: 'Miriam Leparoux' },
  { key: 'devries', name: 'Jomique de Vries' },
  { key: 'loewe', name: 'Mario Löwe' },
  { key: 'kroesser', name: 'Alexander Krösser' },
  { key: 'buettner', name: 'Till Büttner' },
] as const;

function Testimonials() {
  const { t } = useLanguage();
  return (
    <Section className="relative" innerClassName="relative">
      <NightStar kind="violet" side="right" />
      <Tabs defaultValue={TESTIMONIALS[0].key} orientation="vertical" className="block gap-0">
        <Glass className="grid gap-10 lg:grid-cols-12 lg:py-14">
          <div className="flex flex-col gap-8 lg:col-span-7 lg:gap-10">
            <Eyebrow tone="white">{t('lavender.testimonials.title')}</Eyebrow>
            {TESTIMONIALS.map((item) => (
              <TabsContent key={item.key} value={item.key} forceMount className="flex-none data-[state=inactive]:hidden">
                <blockquote className="m-0">
                  <p className="lav-h2 text-lav-white">{t(`lavender.testimonials.${item.key}.quote`)}</p>
                </blockquote>
              </TabsContent>
            ))}
          </div>
          <TabsList className="flex h-auto w-full flex-col items-stretch justify-start gap-0 rounded-none bg-transparent p-0 text-lav-white lg:col-span-4 lg:col-start-9">
            {TESTIMONIALS.map((item, i) => (
              <TabsTrigger
                key={item.key}
                value={item.key}
                className={cn(
                  'h-auto flex-none flex-col items-start justify-start gap-1 whitespace-normal rounded-none border-0 px-0 py-4 text-left font-brand text-lav-white opacity-60 transition-opacity duration-[var(--duration-fast)] data-[state=active]:bg-transparent data-[state=active]:opacity-100',
                  i > 0 && 'border-t border-lav-white/20',
                )}
              >
                <span className="text-body font-medium leading-[1.4]">{item.name}</span>
                <span className="text-[13px] font-normal leading-[1.4] text-lav-white/80">
                  {t(`lavender.testimonials.${item.key}.role`)}
                </span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Glass>
      </Tabs>
    </Section>
  );
}

/* ---------------- Process: three open rows ---------------- */

const PROCESS_STEPS = [
  { number: '01', key: 'ideation' },
  { number: '02', key: 'poc' },
  { number: '03', key: 'rollout' },
] as const;

function Process() {
  const { t } = useLanguage();
  return (
    <Section id="process" className={ANCHOR_SCROLL_MARGIN}>
      <h2 className="lav-h1 text-lav-white">{t('lavender.process.title')}</h2>
      <ol className="m-0 mt-10 list-none border-b border-lav-white/20 p-0 lg:mt-14">
        {PROCESS_STEPS.map((step) => (
          <li
            key={step.key}
            className="grid gap-4 border-t border-lav-white/20 py-8 lg:grid-cols-12 lg:gap-10 lg:py-10"
          >
            <span className="lav-small text-lav-white/70 lg:col-span-1 lg:pt-2">{step.number}</span>
            <h3 className="lav-h2 text-lav-white lg:col-span-4">{t(`lavender.process.${step.key}.title`)}</h3>
            <p className="lav-body text-lav-white/80 lg:col-span-6 lg:col-start-7">
              {t(`lavender.process.${step.key}.desc`)}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}

/* ---------------- Privacy-Led ---------------- */

function PrivacyLed() {
  const { t, language } = useLanguage();
  return (
    <Section id="privacy-led" className={cn('relative', ANCHOR_SCROLL_MARGIN)} innerClassName="relative">
      <NightStar kind="mint" side="left" />
      <Glass className="grid gap-10 lg:grid-cols-12 lg:items-end lg:py-14">
        <h2 className="lav-h1 text-lav-white lg:col-span-6">{t('lavender.privacyLed.title')}</h2>
        <div className="flex flex-col items-start gap-8 lg:col-span-5 lg:col-start-8">
          <p className="lav-body text-lav-white/80">{t('lavender.privacyLed.desc')}</p>
          <Button asChild variant="outline" className={outlineOnNight}>
            <a href={siteHref(language, 'privacy-led-ai')} target="_blank" rel="noopener noreferrer">
              {t('lavender.privacyLed.cta')}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
        </div>
      </Glass>
    </Section>
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
function Closing() {
  const { t, language } = useLanguage();
  return (
    <Section
      as="footer"
      dsName="FooterNight"
      className="relative overflow-hidden pb-0"
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

      {/* Decorative: the skyline says "Hamburg"; the address is on the imprint page. */}
      <img
        src="/images/hamburg-skyline.webp"
        alt=""
        aria-hidden
        loading="lazy"
        className="relative mt-6 block w-[calc(100%+2*var(--section-pad-h))] max-w-none -translate-x-[var(--section-pad-h)] lg:-mt-10"
      />
    </Section>
  );
}
