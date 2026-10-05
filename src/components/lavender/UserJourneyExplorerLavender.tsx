'use client';

import { ArrowDown } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ConsultButton } from './ConsultModal';
import {
  ANCHOR_SCROLL_MARGIN,
  AnchorTabs,
  Button,
  ButtonStack,
  CheckItem,
  ClosingBlock,
  FaqSection,
  ImageText,
  PageShell,
  ProductHead,
  ProductTeaser,
  Section,
  SectionHeader,
  SpecItem,
  Statement,
  TopNav,
  siteHref,
  smoothAnchor,
} from '@/design-system';

/** Media of the five "how it works" blocks, as on the live page. */
const CARD_MEDIA = [
  { video: '/ic_layers.mov' },
  { video: '/ic_komplexitaet.mov' },
  { video: '/ic_all_journeys.mov' },
  { image: '/icu_agent.png' },
  { video: '/ic_exploration.mov' },
] as const;

const FAQ_COUNT = 6;

/**
 * ICU – User Journey Explorer product page in the new design (preview under
 * /lavender/). Same copy as the live page; wording that changed with the
 * redesign comes from lavender-overrides.ts, the anchor labels (hard-coded
 * English on the live page) from lavender.icu.*.
 */
export default function UserJourneyExplorerLavender() {
  const { t, language } = useLanguage();

  const tabs = [
    { id: 'offer', label: t('lavender.icu.anchor.statusQuo') },
    { id: 'services', label: t('lavender.icu.anchor.benefits') },
    { id: 'guidance', label: t('lavender.icu.anchor.more') },
    { id: 'faq', label: t('lavender.icu.anchor.faq') },
    { id: 'contact', label: t('lavender.icu.anchor.contact') },
  ];

  return (
    <PageShell
      nav={<TopNav logoHref={siteHref(language, '/')} />}
      footer={
        <ClosingBlock
          id="contact"
          className={ANCHOR_SCROLL_MARGIN}
          heading={t('cta.headline')}
          action={
            <ConsultButton variant="dark" topic={t('burgerMenu.userJourney')} />
          }
        />
      }
    >
      <ProductHead
        breadcrumbLabel={t('lavender.common.breadcrumb')}
        breadcrumb={[
          { label: t('topNav.products'), href: siteHref(language, '/#products') },
          { label: t('icu.hero.title') },
        ]}
        images={[
          { src: '/icu_agent.png', alt: t('lavender.icu.agentAlt') },
          // A still of /ic_layers.mov — the gallery shows images only.
          { src: '/images/icu-layers.jpg', alt: t('lavender.icu.layersAlt') },
        ]}
        thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        title={t('icu.hero.title')}
        subline={t('icu.hero.subline')}
      >
        <ButtonStack>
          <ConsultButton className="w-full" topic={t('burgerMenu.userJourney')} />
          <Button asChild variant="outline" className="w-full">
            <a href="#guidance" onClick={smoothAnchor}>
              {t('lavender.icu.anchor.more')}
              <ArrowDown size={20} strokeWidth={2} />
            </a>
          </Button>
        </ButtonStack>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {[1, 2, 3].map((n) => (
            <CheckItem key={n}>{t(`icu.carousel.item${n}.title`)}</CheckItem>
          ))}
        </ul>
      </ProductHead>

      <AnchorTabs items={tabs} label={t('lavender.common.onThisPage')} />

      <div id="offer" className={ANCHOR_SCROLL_MARGIN}>
        <Statement text={t('icu.intro.text')} />
      </div>
      <Benefits />
      <Guidance />
      <FaqSection
        className={ANCHOR_SCROLL_MARGIN}
        title={t('icu.faq.title')}
        items={Array.from({ length: FAQ_COUNT }, (_, i) => ({
          question: t(`icu.faq.q${i + 1}.title`),
          answer: t(`icu.faq.q${i + 1}.content`),
        }))}
      />
      <MoreProducts />
    </PageShell>
  );
}

/* ---------------- Benefits ---------------- */

function Benefits() {
  const { t } = useLanguage();
  return (
    <Section id="services" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
      <SectionHeader title={t('icu.carousel.title')} intro={[t('icu.carousel.subline')]} />
      <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
        {[1, 2, 3].map((n) => (
          <SpecItem
            key={n}
            number={`(0${n})`}
            title={t(`icu.carousel.item${n}.title`)}
            description={t(`icu.carousel.item${n}.description`)}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- How ICU turns complexity into clarity ---------------- */

function Guidance() {
  const { t } = useLanguage();
  return (
    <Section id="guidance" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
      <SectionHeader title={t('icu.guidance.title')} intro={[t('icu.guidance.subline')]} />
      <div className="flex flex-col gap-14 lg:gap-24">
        {CARD_MEDIA.map((media, i) => (
          <ImageText
            key={i}
            title={t(`icu.card${i + 1}.title`)}
            description={t(`icu.card${i + 1}.description`)}
            {...('video' in media
              ? { video: media.video }
              : { image: media.image, imageAlt: t('lavender.icu.agentAlt') })}
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
          title="Analytics Agent"
          description={t('lavender.products.analyticsAgent.desc')}
          image="/images/lavender-analytics-agent.png"
          imageAlt={t('lavender.products.analyticsAgent.imageAlt')}
          href={siteHref(language, 'analytics-agent')}
          ctaLabel={t('lavender.products.learnMore')}
        />
      </div>
    </Section>
  );
}
