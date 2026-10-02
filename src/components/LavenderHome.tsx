'use client';

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ANCHOR_SCROLL_MARGIN,
  AnchorTabs,
  Button,
  ClosingBlock,
  FeatureBlock,
  Hero as HeroSection,
  LogoCarousel,
  PageShell,
  ProcessAccordion,
  ProductShowcase,
  Section,
  ServicesCarousel,
  Statement as StatementSection,
  TestimonialSlider,
  TopNav,
  siteHref,
} from '@/design-system';

/**
 * The new site design ("Lavender"). Composes the shared design system
 * (src/design-system) and takes all copy from the project i18n.
 * See docs/design-migration.md for the rollout plan.
 */
export default function LavenderHome() {
  return (
    <PageShell
      nav={<TopNav />}
      footer={<Closing />}
    >
      <Hero />
      <LogoCarousel />
      <HomeTabs />
      <Services />
      <Statement />
      <Products />
      <Testimonials />
      <Process />
      <PrivacyLed />
    </PageShell>
  );
}

/* ---------------- Anchor tabs ---------------- */

/**
 * Section navigation after the client logos (2026-10-02): the homepage works
 * like the product pages now — once the logos have scrolled past, the tab row
 * slides in at the top and the nav docks into it, instead of section links in
 * the nav. Labels as the former nav links.
 */
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

  return (
    <HeroSection
      /* Brand headline — intentionally identical in both languages. */
      title={t('lavender.hero.headline')}
      subline={t('lavender.hero.subline')}
      actions={
        <>
          <Button asChild variant="primary">
            <a href={siteHref(language, 'contact')} target="_blank" rel="noopener noreferrer">
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
        </>
      }
    />
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

  return (
    <ServicesCarousel
      cards={cards}
      title={t('lavender.services.title')}
      className={ANCHOR_SCROLL_MARGIN}
    />
  );
}

/* ---------------- Statement ---------------- */

function Statement() {
  const { t, language } = useLanguage();

  return (
    <StatementSection
      text={t('lavender.statement')}
      action={
        <Button asChild variant="primary">
          <a href={siteHref(language, 'contact')} target="_blank" rel="noopener noreferrer">
            {t('topNav.letsTalk')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </Button>
      }
    />
  );
}

/* ---------------- Products (featured + teasers) ---------------- */

function Products() {
  const { t, language } = useLanguage();
  return (
    <ProductShowcase
      className={ANCHOR_SCROLL_MARGIN}
      featured={{
        eyebrow: t('lavender.products.featuredEyebrow'),
        title: t('lavender.products.empco.title'),
        description: t('lavender.products.empco.desc'),
        image: '/images/lavender-empco.png',
        imageAlt: t('lavender.products.empco.imageAlt'),
        action: (
          <Button asChild variant="dark" className="self-start">
            <a href={siteHref(language, 'empco-audit')}>
              {t('lavender.products.empco.cta')}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
        ),
      }}
      teasers={[
        {
          eyebrow: t('lavender.products.eyebrow'),
          title: 'iKnow',
          description: t('lavender.products.iknow.desc'),
          image: '/images/lavender-iknow.png',
          imageAlt: t('lavender.products.iknow.imageAlt'),
          href: siteHref(language, 'iknow'),
          ctaLabel: t('lavender.products.learnMore'),
        },
        {
          eyebrow: t('lavender.products.eyebrow'),
          title: 'Analytics Agent',
          description: t('lavender.products.analyticsAgent.desc'),
          image: '/images/lavender-analytics-agent.png',
          imageAlt: t('lavender.products.analyticsAgent.imageAlt'),
          href: siteHref(language, 'analytics-agent'),
          ctaLabel: t('lavender.products.learnMore'),
        },
      ]}
    />
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

  const items = TESTIMONIAL_KEYS.map((k) => ({
    quote: t(`lavender.testimonials.${k}.quote`),
    name: TESTIMONIAL_NAMES[k],
    role: t(`lavender.testimonials.${k}.role`),
  }));

  return (
    <TestimonialSlider
      items={items}
      title={t('lavender.testimonials.title')}
      prevLabel={t('lavender.testimonials.prev')}
      nextLabel={t('lavender.testimonials.next')}
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
  return (
    <ProcessAccordion
      steps={steps}
      title={t('lavender.process.title')}
      className={ANCHOR_SCROLL_MARGIN}
    />
  );
}

/* ---------------- Privacy-Led ---------------- */

function PrivacyLed() {
  const { t, language } = useLanguage();
  return (
    <Section id="privacy-led" className={ANCHOR_SCROLL_MARGIN}>
      <FeatureBlock
        layout="stacked"
        title={t('lavender.privacyLed.title')}
        description={t('lavender.privacyLed.desc')}
        image="/images/privacy-led.jpg"
        imageAlt={t('lavender.privacyLed.title')}
        action={
          <Button asChild variant="dark" className="self-start">
            <a
              href={siteHref(language, 'privacy-led-ai')}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t('lavender.privacyLed.cta')}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
        }
      />
    </Section>
  );
}

/* ---------------- Closing CTA band ---------------- */

function Closing() {
  const { t, language } = useLanguage();
  return (
    <ClosingBlock
      heading={t('lavender.cta.heading')}
      action={
        <Button asChild variant="dark">
          <a href={siteHref(language, 'contact')} target="_blank" rel="noopener noreferrer">
            {t('topNav.letsTalk')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </Button>
      }
    />
  );
}
