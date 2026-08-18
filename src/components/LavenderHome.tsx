'use client';

import { useEffect } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Button,
  DesignFrameOverlay,
  DevDials,
  Eyebrow,
  Footer,
  LogoCarousel,
  ProcessAccordion,
  ProductTeaser,
  Section,
  ServicesCarousel,
  TestimonialSlider,
  TopNav,
  isCompact,
  useBreakpoint,
} from '@/design-system';

const PAGE_BG = '#fdfafe';

/**
 * The new site design ("Lavender"). Composes the shared design system
 * (src/design-system) and takes all copy from the project i18n.
 * See docs/design-migration.md for the rollout plan.
 */
export default function LavenderHome() {
  useEffect(() => {
    const prevBody = document.body.style.backgroundColor;
    const prevHtml = document.documentElement.style.backgroundColor;
    document.body.style.backgroundColor = PAGE_BG;
    document.documentElement.style.backgroundColor = PAGE_BG;
    return () => {
      document.body.style.backgroundColor = prevBody;
      document.documentElement.style.backgroundColor = prevHtml;
    };
  }, []);

  return (
    <div className="lavender-page w-full bg-lav-page font-brand font-medium text-lav-navy">
      <style
        dangerouslySetInnerHTML={{
          __html: `
.lavender-page a { text-decoration: none; }
.lavender-page * { box-sizing: border-box; }
html:has(.lavender-page), html:has(.lavender-page) body { overflow-x: clip; }
.lavender-page a, .lavender-page button { transition: opacity 0.15s ease; cursor: pointer; }
.lavender-page a:hover, .lavender-page button:hover { opacity: 0.75; }
`,
        }}
      />

      {/* Soft-launch demo marker — remove before the real public launch. */}
      <div
        aria-hidden
        className="pointer-events-none fixed bottom-3 left-3 z-[1000] rounded-pill bg-lav-navy/85 px-3 py-1.5 font-brand text-[12px] font-medium tracking-[0.3px] text-lav-white shadow-[0_4px_14px_rgba(11,34,49,0.25)]"
      >
        Demo · placeholder content
      </div>

      {/* Dev-only design token dials — compiled out of production builds. */}
      <DevDials />

      <TopNav />
      <Hero />
      <LogoCarousel />
      <Services />
      <Statement />
      <StatementCTA />
      <Products />
      <Testimonials />
      <Process />
      <PrivacyLed />

      <div className="relative isolate overflow-hidden">
        <CTABand />
        <Footer />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 z-[1] h-full w-full max-w-frame -translate-x-1/2"
        >
          <div className="absolute top-1/2 h-[420px] w-[420px] -translate-y-1/2 bg-[url('/images/icompetence_visual_01.png')] bg-contain bg-center bg-no-repeat -left-[120px] md:h-[560px] md:w-[560px] md:-left-[140px] lg:h-[820px] lg:w-[820px]" />
        </div>
      </div>
    </div>
  );
}

/* ---------------- Hero ---------------- */

function Hero() {
  const { t, language } = useLanguage();
  const bp = useBreakpoint();
  const compact = isCompact(bp);

  const star = (
    <div
      aria-hidden
      className="pointer-events-none absolute bg-[url('/images/icompetence_visual_gelb.png')] bg-contain bg-center bg-no-repeat"
      style={
        compact
          ? {
              top: bp === 'mobile' ? -40 : -120,
              right: bp === 'mobile' ? -110 : -100,
              width: bp === 'mobile' ? 380 : 720,
              height: bp === 'mobile' ? 380 : 720,
            }
          : { left: 560, top: -200, width: 1200, height: 1200 }
      }
    />
  );

  return (
    <section id="top" className="relative w-full bg-lav-lavender/10">
      {compact ? star : <DesignFrameOverlay>{star}</DesignFrameOverlay>}

      <div className="relative z-[2] mx-auto flex w-full max-w-frame flex-col gap-6 px-6 py-12 md:gap-8 md:px-12 md:py-14 lg:gap-10 lg:px-24 lg:py-16">
        {/* Brand headline — intentionally identical in both languages. */}
        <h1 className="m-0 whitespace-normal font-brand text-[40px] font-medium leading-[1.05] tracking-[-1px] text-lav-navy md:text-[56px] md:tracking-[-1.5px] lg:whitespace-pre-line lg:text-h1 lg:tracking-[-2px]">
          {compact
            ? t('lavender.hero.headline').replace('\n', ' ')
            : t('lavender.hero.headline')}
        </h1>

        <p className="m-0 w-full max-w-full font-brand text-body font-normal leading-[1.5] text-lav-navy/80 md:w-[600px] md:text-sub lg:w-[820px] lg:text-sub">
          {t('lavender.hero.subline')}
        </p>

        <div className="flex flex-col items-stretch gap-3 md:flex-row md:items-center md:gap-4">
          <Button asChild variant="primary">
            <a href={`/${language}/contact/`} target="_blank" rel="noopener noreferrer">
              {t('topNav.letsTalk')}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
          <Button asChild variant="outline">
            <a href="#services">
              {t('lavender.hero.seeServices')}
              <ArrowDown size={20} strokeWidth={2} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Services ---------------- */

function Services() {
  const { t } = useLanguage();
  const cards = [
    {
      title: t('lavender.services.data.title'),
      image: '/images/iC_Stern_Blau.png',
      pills: [
        { label: t('lavender.services.data.strategy.label'), description: t('lavender.services.data.strategy.desc') },
        { label: t('lavender.services.data.engineering.label'), description: t('lavender.services.data.engineering.desc') },
        { label: t('lavender.services.data.analytics.label'), description: t('lavender.services.data.analytics.desc') },
        { label: t('lavender.services.data.visualization.label'), description: t('lavender.services.data.visualization.desc') },
      ],
    },
    {
      title: t('lavender.services.ai.title'),
      image: '/images/iC_Stern_Gelb.png',
      pills: [
        { label: t('lavender.services.ai.strategy.label'), description: t('lavender.services.ai.strategy.desc') },
        { label: t('lavender.services.ai.genai.label'), description: t('lavender.services.ai.genai.desc') },
        { label: t('lavender.services.ai.agentic.label'), description: t('lavender.services.ai.agentic.desc') },
        { label: t('lavender.services.ai.llm.label'), description: t('lavender.services.ai.llm.desc') },
      ],
    },
    {
      title: t('lavender.services.workshops.title'),
      image: '/images/iC_Stern_Gruen.png',
      pills: [
        { label: t('lavender.services.workshops.ai.label'), description: t('lavender.services.workshops.ai.desc') },
        { label: t('lavender.services.workshops.enablement.label'), description: t('lavender.services.workshops.enablement.desc') },
        { label: t('lavender.services.workshops.briefings.label'), description: t('lavender.services.workshops.briefings.desc') },
        { label: t('lavender.services.workshops.trainings.label'), description: t('lavender.services.workshops.trainings.desc') },
      ],
    },
  ];

  return <ServicesCarousel cards={cards} title={t('lavender.services.title')} />;
}

/* ---------------- Statement ---------------- */

function Statement() {
  const { t } = useLanguage();
  const bp = useBreakpoint();
  const compact = isCompact(bp);

  const star = (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 -translate-y-1/2 bg-[url('/images/icompetence_visual_blau_01.png')] bg-contain bg-center bg-no-repeat"
      style={{
        left: bp === 'mobile' ? -130 : bp === 'tablet' ? -220 : -300,
        width: bp === 'mobile' ? 340 : bp === 'tablet' ? 600 : 900,
        height: bp === 'mobile' ? 340 : bp === 'tablet' ? 600 : 900,
      }}
    />
  );

  return (
    <Section className="relative" innerClassName="relative z-[2]">
      {compact ? star : <DesignFrameOverlay>{star}</DesignFrameOverlay>}
      <p className="m-0 w-full text-center font-brand text-[28px] font-medium leading-[1.15] text-lav-navy md:text-[40px] lg:text-h2 lg:leading-[1.1]">
        {t('lavender.statement')}
      </p>
    </Section>
  );
}

function StatementCTA() {
  const { t, language } = useLanguage();
  return (
    <section id="cta" className="w-full pb-12 md:pb-14 lg:pb-16">
      <div className="mx-auto flex w-full max-w-frame justify-center px-6 md:px-12 lg:px-24">
        <Button asChild variant="primary">
          <a href={`/${language}/contact/`} target="_blank" rel="noopener noreferrer">
            {t('topNav.letsTalk')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </Button>
      </div>
    </section>
  );
}

/* ---------------- Products (featured + teasers) ---------------- */

function Products() {
  const { t, language } = useLanguage();
  return (
    <Section id="products" innerClassName="flex flex-col gap-6 lg:gap-10">
      {/* Featured product — image first on mobile, text-left on larger screens. */}
      <div className="flex w-full flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-8 lg:gap-10">
        <img
          src="/images/lavender-empco.png"
          alt={t('lavender.products.empco.imageAlt')}
          loading="lazy"
          className="order-first h-[280px] w-full min-w-0 rounded-card bg-lav-lavender object-cover object-center md:order-last md:h-[420px] md:flex-1 lg:h-[640px]"
        />
        <div className="flex flex-col gap-4 md:flex-1 md:gap-6">
          <Eyebrow>{t('lavender.products.featuredEyebrow')}</Eyebrow>
          <h2 className="m-0 font-brand text-[40px] font-medium leading-[1.1] text-lav-navy md:text-[44px] lg:text-h2">
            {t('lavender.products.empco.title')}
          </h2>
          <p className="m-0 font-brand text-body font-normal leading-[1.5] text-lav-navy/80 md:text-sub">
            {t('lavender.products.empco.desc')}
          </p>
          <Button asChild variant="dark" className="self-start">
            <a href={`/${language}/empco-audit/`}>
              {t('lavender.products.empco.cta')}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
        </div>
      </div>

      <div className="flex w-full flex-col gap-6 md:flex-row lg:gap-10">
        <ProductTeaser
          eyebrow={t('lavender.products.eyebrow')}
          title="iKnow"
          description={t('lavender.products.iknow.desc')}
          image="/images/lavender-iknow.png"
          imageAlt={t('lavender.products.iknow.imageAlt')}
          href={`/${language}/iknow/`}
          ctaLabel={t('lavender.products.learnMore')}
        />
        <ProductTeaser
          eyebrow={t('lavender.products.eyebrow')}
          title="Analytics Agent"
          description={t('lavender.products.analyticsAgent.desc')}
          image="/images/lavender-analytics-agent.png"
          imageAlt={t('lavender.products.analyticsAgent.imageAlt')}
          href={`/${language}/analytics-agent/`}
          ctaLabel={t('lavender.products.learnMore')}
        />
      </div>
    </Section>
  );
}

/* ---------------- Testimonials ---------------- */

const TESTIMONIAL_KEYS = [
  'kosyrev',
  'schneider',
  'leparoux',
  'devries',
  'loewe',
  'kroesser',
  'buettner',
] as const;

const TESTIMONIAL_NAMES: Record<(typeof TESTIMONIAL_KEYS)[number], string> = {
  kosyrev: 'Sergej Kosyrev',
  schneider: 'Michael Schneider',
  leparoux: 'Miriam Leparoux',
  devries: 'Jomique de Vries',
  loewe: 'Mario Löwe',
  kroesser: 'Alexander Krösser',
  buettner: 'Till Büttner',
};

function Testimonials() {
  const { t } = useLanguage();
  const bp = useBreakpoint();
  const compact = isCompact(bp);

  const items = TESTIMONIAL_KEYS.map((k) => ({
    quote: t(`lavender.testimonials.${k}.quote`),
    name: TESTIMONIAL_NAMES[k],
    role: t(`lavender.testimonials.${k}.role`),
  }));

  const star = (
    <div
      aria-hidden
      className="pointer-events-none absolute top-1/2 -translate-y-1/2 bg-[url('/images/icompetence_visual_rot_01.png')] bg-contain bg-center bg-no-repeat"
      style={{
        right: bp === 'mobile' ? -120 : bp === 'tablet' ? -150 : -300,
        width: bp === 'mobile' ? 360 : bp === 'tablet' ? 700 : 900,
        height: bp === 'mobile' ? 360 : bp === 'tablet' ? 700 : 900,
      }}
    />
  );

  return (
    <TestimonialSlider
      items={items}
      title={t('lavender.testimonials.title')}
      prevLabel={t('lavender.testimonials.prev')}
      nextLabel={t('lavender.testimonials.next')}
      decoration={compact ? star : <DesignFrameOverlay>{star}</DesignFrameOverlay>}
    />
  );
}

/* ---------------- Process ---------------- */

function Process() {
  const { t } = useLanguage();
  const steps = [
    {
      number: '01',
      title: t('lavender.process.ideation.title'),
      description: t('lavender.process.ideation.desc'),
    },
    {
      number: '02',
      title: t('lavender.process.poc.title'),
      description: t('lavender.process.poc.desc'),
    },
    {
      number: '03',
      title: t('lavender.process.rollout.title'),
      description: t('lavender.process.rollout.desc'),
    },
  ];
  return <ProcessAccordion steps={steps} title={t('lavender.process.title')} />;
}

/* ---------------- Privacy-Led ---------------- */

function PrivacyLed() {
  const { t, language } = useLanguage();
  return (
    <Section id="privacy-led" innerClassName="flex flex-col items-center gap-6 md:gap-8 lg:gap-10">
      <div className="h-[240px] w-full rounded-card bg-[url('/images/privacy-led.jpg')] bg-cover bg-center md:h-[360px] lg:h-[400px]" />
      <div className="flex w-full flex-col gap-4 md:gap-5 lg:gap-6">
        <h2 className="m-0 font-brand text-[28px] font-medium leading-[1.1] text-lav-navy md:text-[32px] lg:text-h3">
          {t('lavender.privacyLed.title')}
        </h2>
        <p className="m-0 font-brand text-body font-normal leading-[1.5] text-lav-navy/80 md:text-sub">
          {t('lavender.privacyLed.desc')}
        </p>
        <Button asChild variant="dark" className="self-start">
          <a href={`/${language}/privacy-led-ai/`} target="_blank" rel="noopener noreferrer">
            {t('lavender.privacyLed.cta')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </Button>
      </div>
    </Section>
  );
}

/* ---------------- Closing CTA band ---------------- */

function CTABand() {
  const { t, language } = useLanguage();
  return (
    <Section
      className="overflow-hidden bg-[#bde3f4]"
      innerClassName="relative z-[2] flex flex-col items-center gap-6 md:gap-8 lg:gap-10"
    >
      <h2 className="m-0 w-full text-center font-brand text-[40px] font-medium leading-[1.05] tracking-[-1px] text-lav-navy md:text-[56px] md:tracking-[-1.5px] lg:text-h1 lg:tracking-[-2px]">
        {t('lavender.cta.heading')}
      </h2>
      <Button asChild variant="dark">
        <a href={`/${language}/contact/`} target="_blank" rel="noopener noreferrer">
          {t('topNav.letsTalk')}
          <ArrowUpRight size={20} strokeWidth={2} />
        </a>
      </Button>
    </Section>
  );
}
