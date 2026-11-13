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

const CARD_VIDEOS = [
  '/assets/iknow/videos/connectors.mov',
  '/assets/iknow/videos/cluster.mov',
  '/assets/iknow/videos/transcribe.mov',
  '/assets/iknow/videos/network.mov',
  '/assets/iknow/videos/local-ai.mov',
  '/assets/iknow/videos/agents.mov',
] as const;

// Screens of the tool, in the order of the live page's carousel; the alt
// texts say what each one shows (lavender.alt.iknow.*).
const SCREENS = [
  { src: '/assets/iknow/chat.png', alt: 'chat' },
  { src: '/assets/iknow/connectoren.png', alt: 'connectors' },
  { src: '/assets/iknow/visualization.png', alt: 'visualization' },
  { src: '/assets/iknow/audio-meeting.png', alt: 'meeting' },
  { src: '/assets/iknow/Interview-erstellen.png', alt: 'interviewCreate' },
  { src: '/assets/iknow/Interview-durchführen.png', alt: 'interviewRun' },
] as const;

/**
 * iKnow product page in the new design (preview under /lavender/). Same copy
 * as the live page; wording that changed with the redesign comes from
 * lavender-overrides.ts.
 */
export default function IKnowLavender() {
  const { t, language } = useLanguage();
  const screens = SCREENS.map((s) => ({ src: s.src, alt: t(`lavender.alt.iknow.${s.alt}`) }));

  const tabs = [
    { id: 'status-quo', label: t('iknow.anchor.statusQuo') },
    { id: 'what', label: t('iknow.anchor.whatIs') },
    { id: 'benefits', label: t('iknow.anchor.benefits') },
    { id: 'tool', label: t('iknow.anchor.intoTool') },
    { id: 'contact', label: t('iknow.anchor.contact') },
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
            <ConsultButton variant="solid" topic={t('burgerMenu.iknow')} />
          }
        />
      }
    >
      <ProductHead
        breadcrumbLabel={t('lavender.common.breadcrumb')}
        breadcrumb={[
          { label: t('topNav.products'), href: siteHref(language, '/#products') },
          { label: 'iKnow' },
        ]}
        images={screens.slice(0, 2)}
        thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        title="iKnow"
        subline={t('iknow.hero.subtitle')}
      >
        <ButtonStack>
          <ConsultButton className="w-full" topic={t('burgerMenu.iknow')} />
          <Button asChild variant="soft" className="w-full">
            <a href="#tool" onClick={smoothAnchor}>
              {t('iknow.anchor.intoTool')}
              <ArrowDown size={20} strokeWidth={2} />
            </a>
          </Button>
        </ButtonStack>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <CheckItem key={n}>{t(`iknow.card${n}.title`)}</CheckItem>
          ))}
        </ul>
      </ProductHead>

      <QuoteIntro
        id="status-quo"
        className={ANCHOR_SCROLL_MARGIN}
        quote={t('iknow.intro.quote')}
        author={t('iknow.intro.quoteAuthor').trim()}
        paragraphs={[t('iknow.intro.p1'), t('iknow.intro.p2')]}
        conclusion={t('iknow.intro.p3')}
      />
      <About />
      <Benefits />

      <Section id="tool" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
        <SectionHeader
          title={t('iknow.howItWorks.title')}
          leadIn={t('iknow.howItWorks.p1')}
          intro={[t('iknow.howItWorks.p2')]}
        />
        <MediaGallery
          images={screens}
          aspectClassName="aspect-[2940/1844]"
          thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        />
      </Section>

      {/* The general topic after the product (orientation sheet: SEO & LLM content). */}
      <TopicSection prefix="lavender.seo.iknow" route="iknow" blockCount={3} faqCount={5} />
      <MoreProducts products={['analyticsAgent', 'empco']} />
    </NightPage>
  );
}

/* ---------------- What is iKnow ---------------- */

function About() {
  const { t } = useLanguage();
  const body = 'lav-body font-normal text-lav-navy/80';
  return (
    <Section id="what" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-8">
      <SectionHeader title={t('iknow.what.title')} />
      <div className="flex max-w-measure-lead flex-col gap-6">
        <p className={body}>{t('iknow.what.p1')}</p>
        <p className={body}>{t('iknow.what.p2')}</p>
        <p className={body}>{t('iknow.what.p3')}</p>
        {/* Closing line: the paragraphs' size, set apart by weight (K-2). */}
        <p className="lav-body font-semibold text-lav-navy">{t('iknow.what.p4')}</p>
      </div>
    </Section>
  );
}

/* ---------------- Benefits ---------------- */

function Benefits() {
  const { t } = useLanguage();
  return (
    <Section id="benefits" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
      <SectionHeader title={t('iknow.guidance.title')} />
      <div className="flex flex-col gap-14 lg:gap-24">
        {CARD_VIDEOS.map((video, i) => (
          <ImageText
            key={video}
            title={t(`iknow.card${i + 1}.title`)}
            description={t(`iknow.card${i + 1}.description`)}
            video={video}
            layout={i % 2 === 0 ? 'image-left' : 'image-right'}
          />
        ))}
      </div>
    </Section>
  );
}

