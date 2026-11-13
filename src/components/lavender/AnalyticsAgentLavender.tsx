'use client';

import { NightClosing } from './NightFooter';
import { NightNav } from './NightNav';
import { NightPage } from './NightPage';
import { TopicSection } from './TopicSection';
import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ConsultButton } from './ConsultModal';
import {
  ANCHOR_SCROLL_MARGIN,
  Button,
  ButtonStack,
  CheckItem,
  ImageText,
  MediaGallery,
  ProductHead,
  MoreProducts,
  QuoteIntro,
  Section,
  SectionHeader,
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

// Screens of the tool, in the order of the live page's carousel; the alt
// texts say what each one shows (lavender.alt.aa.*).
const SCREENS = [
  { src: '/assets/analytics-agent/dashboard.png', alt: 'dashboard' },
  { src: '/assets/analytics-agent/chat.png', alt: 'chat' },
  { src: '/assets/analytics-agent/visualization.png', alt: 'visualization' },
  { src: '/assets/analytics-agent/connectors.png', alt: 'connectors' },
] as const;

/**
 * Analytics Agent product page in the new design (preview under /lavender/).
 * Same copy as the live page; wording that changed with the redesign comes
 * from lavender-overrides.ts.
 */
export default function AnalyticsAgentLavender() {
  const { t, language } = useLanguage();
  const screens = SCREENS.map((s) => ({ src: s.src, alt: t(`lavender.alt.aa.${s.alt}`) }));

  const tabs = [
    { id: 'challenge', label: t('analyticsAgent.anchor.challenge') },
    { id: 'what', label: t('analyticsAgent.anchor.whatIs') },
    { id: 'features', label: t('analyticsAgent.anchor.features') },
    { id: 'in-action', label: t('analyticsAgent.anchor.inAction') },
    { id: 'contact', label: t('analyticsAgent.anchor.contact') },
  ];

  return (
    <NightPage
      nav={<NightNav logoHref={siteHref(language, '/')} bar="always" sections={tabs} />}
      footer={
        <NightClosing
          id="contact"
          className={ANCHOR_SCROLL_MARGIN}
          heading={t('lavender.cta.heading')}
          action={
            <ConsultButton variant="solid" topic={t('burgerMenu.analyticsAgent')} />
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
        images={screens.slice(0, 2)}
        thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        title="Analytics Agent"
        subline={t('analyticsAgent.hero.subtitle')}
      >
        <ButtonStack>
          <ConsultButton topic={t('burgerMenu.analyticsAgent')} />
          <Button asChild variant="soft">
            <a href="#in-action" onClick={smoothAnchor}>
              {t('lavender.jump.analyticsAgent')}
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

      <QuoteIntro
        id="challenge"
        className={ANCHOR_SCROLL_MARGIN}
        quote={t('analyticsAgent.intro.quote')}
        name="W. Edwards Deming"
        note={t('lavender.quote.attributed')}
        paragraphs={[t('analyticsAgent.intro.p1'), t('analyticsAgent.intro.p2')]}
        conclusion={t('analyticsAgent.intro.p3')}
      />
      <About />
      <Features />

      <Section id="in-action" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
        {/* No lead-in here: the content team found "Die Frage ist nicht, ob du
            Daten hast …" confusing under this title (docs/korrekturen-2026-11.md A-6). */}
        <SectionHeader title={t('analyticsAgent.howItWorks.title')} intro={[t('analyticsAgent.howItWorks.p2')]} />
        <MediaGallery
          images={screens}
          aspectClassName="aspect-[12/7]"
          thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        />
      </Section>

      {/* The general topic after the product (orientation sheet: SEO & LLM content). */}
      <TopicSection prefix="lavender.seo.analytics" route="analytics-agent" blockCount={3} faqCount={5} />
      <MoreProducts products={['iknow', 'empco']} />
    </NightPage>
  );
}

/* ---------------- What is the Analytics Agent ---------------- */

function About() {
  const { t } = useLanguage();
  const body = 'lav-body font-normal text-lav-navy/80';
  return (
    <Section id="what" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-8">
      <SectionHeader title={t('analyticsAgent.what.title')} />
      <div className="flex max-w-measure-lead flex-col gap-6">
        <p className={body}>{t('analyticsAgent.what.p1')}</p>
        <p className={body}>{t('analyticsAgent.what.p2')}</p>
        <p className={body}>{t('analyticsAgent.what.p3')}</p>
        {/* Closing line: the paragraphs' size, set apart by weight (K-2). */}
        <p className="lav-body font-semibold text-lav-navy">{t('analyticsAgent.what.p4')}</p>
      </div>
    </Section>
  );
}

/* ---------------- Capabilities ---------------- */

function Features() {
  const { t } = useLanguage();
  return (
    // Title to the first block as far apart as the blocks are, so the title heads all of them (U-5).
    <Section id="features" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-14 lg:gap-24">
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

