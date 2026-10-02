'use client';

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ANCHOR_SCROLL_MARGIN,
  AnchorTabs,
  Button,
  ButtonStack,
  CheckItem,
  ClosingBlock,
  ImageText,
  MediaGallery,
  PageShell,
  ProductHead,
  ProductTeaser,
  QuoteIntro,
  Section,
  SectionHeader,
  TopNav,
  siteHref,
  smoothAnchor,
} from '@/design-system';

const CARD_IMAGES = [
  '/assets/analytics-agent/connectors.png',
  '/assets/analytics-agent/chat.png',
  '/assets/analytics-agent/visualization.png',
  '/assets/analytics-agent/knowledge.png',
  '/assets/analytics-agent/ga4.png',
  '/assets/analytics-agent/enterprise.png',
] as const;

// Screens of the tool, in the order of the live page's carousel (alt texts
// as there).
const SCREENS = [
  { src: '/assets/analytics-agent/dashboard.png', alt: 'Analytics Agent Dashboard' },
  { src: '/assets/analytics-agent/chat.png', alt: 'Analytics Agent Chat' },
  { src: '/assets/analytics-agent/visualization.png', alt: 'Analytics Agent Visualization' },
  { src: '/assets/analytics-agent/connectors.png', alt: 'Analytics Agent Connectors' },
] as const;

/**
 * Analytics Agent product page in the new design (preview under /lavender/).
 * Same copy as the live page; wording that changed with the redesign comes
 * from lavender-overrides.ts.
 */
export default function AnalyticsAgentLavender() {
  const { t, language } = useLanguage();
  const contactHref = siteHref(language, 'contact');

  const tabs = [
    { id: 'challenge', label: t('analyticsAgent.anchor.challenge') },
    { id: 'what', label: t('analyticsAgent.anchor.whatIs') },
    { id: 'features', label: t('analyticsAgent.anchor.features') },
    { id: 'in-action', label: t('analyticsAgent.anchor.inAction') },
    { id: 'contact', label: t('analyticsAgent.anchor.contact') },
  ];

  return (
    <PageShell
      nav={<TopNav sections={[]} logoHref={siteHref(language, '/')} />}
      footer={
        <ClosingBlock
          id="contact"
          className={ANCHOR_SCROLL_MARGIN}
          heading={t('cta.headline')}
          action={
            <Button asChild variant="dark">
              <a href={contactHref} target="_blank" rel="noopener noreferrer">
                {t('cta.button')}
                <ArrowUpRight size={20} strokeWidth={2} />
              </a>
            </Button>
          }
        />
      }
    >
      <ProductHead
        breadcrumbLabel={t('lavender.common.breadcrumb')}
        breadcrumb={[
          { label: t('topNav.products'), href: siteHref(language, '/#products') },
          { label: 'Analytics Agent' },
        ]}
        images={SCREENS.slice(0, 2)}
        thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        eyebrow={t('lavender.products.eyebrow')}
        title="Analytics Agent"
        subline={t('analyticsAgent.hero.subtitle')}
      >
        <ButtonStack>
          <Button asChild className="w-full">
            <a href={contactHref} target="_blank" rel="noopener noreferrer">
              {t('cta.button')}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <a href="#in-action" onClick={smoothAnchor}>
              {t('analyticsAgent.anchor.inAction')}
              <ArrowDown size={20} strokeWidth={2} />
            </a>
          </Button>
        </ButtonStack>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <CheckItem key={n}>{t(`analyticsAgent.card${n}.title`)}</CheckItem>
          ))}
        </ul>
      </ProductHead>

      <AnchorTabs items={tabs} label={t('lavender.common.onThisPage')} />

      <QuoteIntro
        id="challenge"
        className={ANCHOR_SCROLL_MARGIN}
        quote={t('analyticsAgent.intro.quote')}
        author={t('analyticsAgent.intro.quoteAuthor').trim()}
        paragraphs={[t('analyticsAgent.intro.p1'), t('analyticsAgent.intro.p2')]}
        conclusion={t('analyticsAgent.intro.p3')}
      />
      <About />
      <Features />

      <Section id="in-action" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
        <SectionHeader
          title={t('analyticsAgent.howItWorks.title')}
          leadIn={t('analyticsAgent.howItWorks.p1')}
          intro={[t('analyticsAgent.howItWorks.p2')]}
        />
        <MediaGallery
          images={SCREENS}
          aspectClassName="aspect-[12/7]"
          thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        />
      </Section>

      <MoreProducts />
    </PageShell>
  );
}

/* ---------------- What is the Analytics Agent ---------------- */

function About() {
  const { t } = useLanguage();
  const lead = 'lav-lead font-normal text-lav-navy/80';
  return (
    <Section id="what" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-14">
      <SectionHeader title={t('analyticsAgent.what.title')} />
      <div className="flex max-w-[820px] flex-col gap-8 md:gap-10">
        <p className={lead}>{t('analyticsAgent.what.p1')}</p>
        <p className={lead}>{t('analyticsAgent.what.p2')}</p>
        <p className={lead}>{t('analyticsAgent.what.p3')}</p>
        <p className="lav-lead font-medium text-lav-navy">{t('analyticsAgent.what.p4')}</p>
      </div>
    </Section>
  );
}

/* ---------------- Capabilities ---------------- */

function Features() {
  const { t } = useLanguage();
  return (
    <Section id="features" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
      <SectionHeader title={t('analyticsAgent.features.title')} />
      <div className="flex flex-col gap-14 lg:gap-24">
        {CARD_IMAGES.map((image, i) => (
          <ImageText
            key={image}
            title={t(`analyticsAgent.card${i + 1}.title`)}
            description={t(`analyticsAgent.card${i + 1}.description`)}
            image={image}
            imageAlt={t(`analyticsAgent.card${i + 1}.title`)}
            layout={i % 2 === 0 ? 'image-left' : 'image-right'}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Other products ---------------- */

function MoreProducts() {
  const { t, language } = useLanguage();
  return (
    <Section id="more" innerClassName="flex flex-col gap-12">
      <SectionHeader title={t('lavender.products.moreTitle')} />
      <div className="flex w-full flex-col gap-6 md:flex-row lg:gap-10">
        <ProductTeaser
          eyebrow={t('lavender.products.eyebrow')}
          title="iKnow"
          description={t('lavender.products.iknow.desc')}
          image="/images/lavender-iknow.png"
          imageAlt={t('lavender.products.iknow.imageAlt')}
          href={siteHref(language, 'iknow')}
          ctaLabel={t('lavender.products.learnMore')}
        />
        <ProductTeaser
          eyebrow={t('lavender.products.eyebrow')}
          title="EmpCo Audit"
          description={t('lavender.products.empco.desc')}
          image="/images/lavender-empco.png"
          imageAlt={t('lavender.products.empco.imageAlt')}
          href={siteHref(language, 'empco-audit')}
          ctaLabel={t('lavender.products.learnMore')}
        />
      </div>
    </Section>
  );
}
