'use client';

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ANCHOR_SCROLL_MARGIN,
  AnchorTabs,
  Button,
  CheckItem,
  ClosingBlock,
  ComparisonTable,
  ImageText,
  LoopVideo,
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

/** Verbatim from Amazon; stays English on both language versions. */
const AMAZON_QUOTE =
  '"Customers who use [Rufus] while shopping are over 60% more likely to make a purchase during that shopping trip."';
const AMAZON_SOURCE =
  'https://www.aboutamazon.com/news/retail/amazon-rufus-ai-assistant-personalized-shopping-features';

/** Clips of the four features, as on the live page. */
const FEATURE_VIDEOS = [
  '/videos/Praezision_final.mp4',
  '/videos/ICS_Image_Search.mp4',
  '/videos/ICS_Echte_KI.mp4',
  '/videos/ICS_Millisekunden.mov',
] as const;

const lead = 'lav-lead font-normal text-lav-navy/80';

/**
 * Intelligentic Search product page in the new design (preview under
 * /lavender/). Same copy as the live page; wording that changed with the
 * redesign comes from lavender-overrides.ts.
 */
export default function IntelligenticSearchLavender() {
  const { t, language } = useLanguage();
  const contactHref = siteHref(language, 'contact');

  const tabs = [
    { id: 'intro', label: t('is.anchor.statusQuo') },
    { id: 'features', label: t('is.anchor.features') },
    { id: 'how-it-works', label: t('is.anchor.howItWorks') },
    { id: 'benefits', label: t('is.anchor.benefits') },
    { id: 'contact', label: t('is.anchor.contact') },
  ];

  return (
    <PageShell>
      <TopNav sections={[]} logoHref={siteHref(language, '/')} />

      <ProductHead
        breadcrumbLabel={t('lavender.common.breadcrumb')}
        breadcrumb={[
          { label: t('topNav.products'), href: siteHref(language, '/#products') },
          { label: t('is.hero.title') },
        ]}
        images={[
          // Alt text as on the live page.
          { src: '/images/ICS_Travel_Club.png', alt: 'Intelligentic Search Demo' },
          // A still of /videos/ICS_Image_Search.mp4 — the gallery shows images only.
          { src: '/images/is-image-search.jpg', alt: t('is.features.step2.label') },
        ]}
        thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        eyebrow={t('lavender.products.eyebrow')}
        title={t('is.hero.title')}
        subline={t('is.hero.subline')}
      >
        <Button asChild className="w-full">
          <a href={contactHref} target="_blank" rel="noopener noreferrer">
            {t('cta.button')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <a href="#how-it-works" onClick={smoothAnchor}>
            {t('is.anchor.howItWorks')}
            <ArrowDown size={20} strokeWidth={2} />
          </a>
        </Button>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {[1, 2, 3, 4].map((n) => (
            <CheckItem key={n}>{t(`is.features.step${n}.label`)}</CheckItem>
          ))}
        </ul>
      </ProductHead>

      <AnchorTabs items={tabs} label={t('lavender.common.onThisPage')} />

      <QuoteIntro
        id="intro"
        className={ANCHOR_SCROLL_MARGIN}
        quote={AMAZON_QUOTE}
        author={
          <>
            (
            <a href={AMAZON_SOURCE} target="_blank" rel="noopener noreferrer">
              Amazon
            </a>
            , 2025)
          </>
        }
        paragraphs={t('is.quote.text').split('\n\n')}
        conclusion={t('is.quote.conclusion')}
      />
      <Features />
      <Modular />

      <Section id="how-it-works" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
        <SectionHeader title={t('is.howItWorks.title')} intro={[t('is.howItWorks.description')]} />
        <LoopVideo
          src="/videos/Architecture.mp4"
          className="aspect-video w-full rounded-card bg-lav-lavender object-contain object-center"
        />
      </Section>

      <Benefits />
      <MoreProducts />

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
    </PageShell>
  );
}

/* ---------------- Features ---------------- */

function Features() {
  const { t } = useLanguage();
  // The three sublines hold two paragraphs each, separated by a blank line.
  const intro = [1, 2, 3].flatMap((n) => t(`is.features.subline${n}`).split('\n\n'));
  return (
    <Section id="features" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
      <div className="flex flex-col gap-8">
        <h2 className="lav-h1 text-lav-navy">{t('is.features.title')}</h2>
        <div className="flex max-w-[820px] flex-col gap-8 md:gap-10">
          {intro.map((p) => (
            <p key={p} className={lead}>
              {p}
            </p>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-14 lg:gap-24">
        {FEATURE_VIDEOS.map((video, i) => (
          <ImageText
            key={video}
            title={t(`is.features.step${i + 1}.label`)}
            description={t(`is.features.step${i + 1}.description`)}
            video={video}
            layout={i % 2 === 0 ? 'image-left' : 'image-right'}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Modular and dynamic ---------------- */

function Modular() {
  const { t } = useLanguage();
  return (
    <Section id="modular" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-14">
      <SectionHeader title={t('is.modular.title')} />
      <div className="flex max-w-[820px] flex-col gap-8 md:gap-10">
        <p className={lead}>{t('is.modular.text1')}</p>
        <p className={lead}>{t('is.modular.text2')}</p>
      </div>
    </Section>
  );
}

/* ---------------- Benefits ---------------- */

function Benefits() {
  const { t } = useLanguage();
  return (
    <Section id="benefits" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12 lg:gap-14">
      <SectionHeader title={t('is.comparison.title')} />
      <ComparisonTable
        icons
        caption={t('is.comparison.title')}
        primaryHead={t('is.comparison.primaryHeader')}
        secondaryHead={t('is.comparison.secondaryHeader')}
        rows={[1, 2, 3].map((n) => ({
          aspect: t(`is.comparison.row${n}.feature`),
          primary: t(`is.comparison.row${n}.primary`),
          secondary: t(`is.comparison.row${n}.secondary`),
        }))}
      />
      <h2 className="lav-h1 text-lav-navy">{t('is.benefits.title')}</h2>
      <div className="flex max-w-[820px] flex-col gap-8 md:gap-10">
        <p className={lead}>{t('is.benefits.text1')}</p>
        <p className={lead}>{t('is.benefits.text2')}</p>
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
