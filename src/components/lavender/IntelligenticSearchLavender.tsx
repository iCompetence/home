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
  ComparisonTable,
  ImageText,
  LoopVideo,
  ProductHead,
  MoreProducts,
  QuoteIntro,
  Section,
  SectionHeader,
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

// Running text, one size on every page (content team 11/2026, I-6).
const body = 'lav-body font-normal text-lav-navy/80';

/**
 * Intelligentic Search product page in the new design (preview under
 * /lavender/). Same copy as the live page; wording that changed with the
 * redesign comes from lavender-overrides.ts.
 */
export default function IntelligenticSearchLavender() {
  const { t, language } = useLanguage();

  const tabs = [
    { id: 'intro', label: t('is.anchor.statusQuo') },
    { id: 'features', label: t('is.anchor.features') },
    { id: 'how-it-works', label: t('is.anchor.howItWorks') },
    { id: 'benefits', label: t('is.anchor.benefits') },
    { id: 'contact', label: t('is.anchor.contact') },
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
            <ConsultButton variant="solid" topic={t('burgerMenu.intelligenticSearch')} />
          }
        />
      }
    >
      <ProductHead
        breadcrumbLabel={t('lavender.common.breadcrumb')}
        breadcrumb={[
          { label: t('topNav.products'), href: siteHref(language, '/#products') },
          { label: t('is.hero.title') },
        ]}
        images={[
          { src: '/images/ICS_Travel_Club.png', alt: t('lavender.alt.is.demo') },
          // A still of /videos/ICS_Image_Search.mp4 — the gallery shows images only.
          { src: '/images/is-image-search.jpg', alt: t('is.features.step2.label') },
        ]}
        thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        title={t('is.hero.title')}
        subline={t('is.hero.subline')}
      >
        <ButtonStack>
          <ConsultButton topic={t('burgerMenu.intelligenticSearch')} />
          <Button asChild variant="soft">
            <a href="#how-it-works" onClick={smoothAnchor}>
              {t('is.anchor.howItWorks')}
              <ArrowDown size={20} strokeWidth={2} />
            </a>
          </Button>
        </ButtonStack>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {[1, 2, 3, 4].map((n) => (
            <CheckItem key={n}>{t(`is.features.step${n}.label`)}</CheckItem>
          ))}
        </ul>
      </ProductHead>

      <QuoteIntro
        id="intro"
        className={ANCHOR_SCROLL_MARGIN}
        quote={AMAZON_QUOTE}
        // The name links to the source (Amazon's press release).
        name={
          <a href={AMAZON_SOURCE} target="_blank" rel="noopener noreferrer" className="lav-star-text underline underline-offset-2">
            Amazon
          </a>
        }
        note="2025"
        paragraphs={t('is.quote.text').split('\n\n')}
        conclusion={t('is.quote.conclusion')}
        // Full width and large, as the content team asked (11/2026, I-9).
        conclusionWide
      />
      <Features />
      <Modular />

      <Section id="how-it-works" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
        <SectionHeader title={t('is.howItWorks.title')} intro={[t('is.howItWorks.description')]} />
        <LoopVideo
          src="/videos/Architecture.mp4"
          className="aspect-video w-full rounded-card bg-lav-stage object-contain object-center lg:rounded-frame"
        />
      </Section>

      <Benefits />
      {/* The general topic after the product (orientation sheet: SEO & LLM content). */}
      <TopicSection prefix="lavender.seo.search" route="intelligentic-search" blockCount={3} faqCount={5} />
      <MoreProducts products={['iknow', 'analyticsAgent']} />
    </NightPage>
  );
}

/* ---------------- Features ---------------- */

function Features() {
  const { t } = useLanguage();
  // The three sublines hold two paragraphs each, separated by a blank line.
  const intro = [1, 2, 3].flatMap((n) => t(`is.features.subline${n}`).split('\n\n'));
  return (
    // Title to the first block as far apart as the blocks are, so the title heads all of them (U-5).
    <Section id="features" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-14 lg:gap-24">
      <div className="flex flex-col gap-8">
        <h2 className="lav-h1 text-lav-navy">{t('is.features.title')}</h2>
        <div className="flex max-w-measure-lead flex-col gap-6">
          {intro.map((p) => (
            <p key={p} className={body}>
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
    <Section id="modular" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-8">
      <SectionHeader title={t('is.modular.title')} />
      <div className="flex max-w-measure-lead flex-col gap-6">
        <p className={body}>{t('is.modular.text1')}</p>
        <p className={body}>{t('is.modular.text2')}</p>
      </div>
    </Section>
  );
}

/* ---------------- Benefits ---------------- */

function Benefits() {
  const { t } = useLanguage();
  return (
    <>
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
      </Section>
      {/* A section of its own: it has its own title, so it keeps the distance
          every section has (was 56 px below the table instead of 160). */}
      <Section id="benefits-summary" innerClassName="flex flex-col gap-8">
        <SectionHeader title={t('is.benefits.title')} />
        <div className="flex max-w-measure-lead flex-col gap-6">
          <p className={body}>{t('is.benefits.text1')}</p>
          <p className={body}>{t('is.benefits.text2')}</p>
        </div>
      </Section>
    </>
  );
}

