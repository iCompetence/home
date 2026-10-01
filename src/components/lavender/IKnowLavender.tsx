'use client';

import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  ANCHOR_SCROLL_MARGIN,
  AnchorTabs,
  Button,
  CheckItem,
  ClosingBlock,
  ImageText,
  MediaGallery,
  PageShell,
  ProductHead,
  ProductTeaser,
  Section,
  SectionHeader,
  TopNav,
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

// Screens of the tool, in the order of the live page's carousel (alt texts
// as there).
const SCREENS = [
  { src: '/assets/iknow/chat.png', alt: 'iKnow Chat' },
  { src: '/assets/iknow/connectoren.png', alt: 'iKnow Connectors' },
  { src: '/assets/iknow/visualization.png', alt: 'iKnow Visualization' },
  { src: '/assets/iknow/audio-meeting.png', alt: 'iKnow Audio Meeting' },
  { src: '/assets/iknow/Interview-erstellen.png', alt: 'iKnow Interview erstellen' },
  { src: '/assets/iknow/Interview-durchführen.png', alt: 'iKnow Interview durchführen' },
] as const;

/**
 * iKnow product page in the new design (preview under /lavender/). Same copy
 * as the live page; wording that changed with the redesign comes from
 * lavender-overrides.ts.
 */
export default function IKnowLavender() {
  const { t, language } = useLanguage();
  const contactHref = siteHref(language, 'contact');

  const tabs = [
    { id: 'status-quo', label: t('iknow.anchor.statusQuo') },
    { id: 'what', label: t('iknow.anchor.whatIs') },
    { id: 'benefits', label: t('iknow.anchor.benefits') },
    { id: 'tool', label: t('iknow.anchor.intoTool') },
    { id: 'contact', label: t('iknow.anchor.contact') },
  ];

  return (
    <PageShell>
      <TopNav sections={[]} logoHref={siteHref(language, '/')} />

      <ProductHead
        breadcrumbLabel={t('lavender.common.breadcrumb')}
        breadcrumb={[
          { label: t('topNav.products'), href: siteHref(language, '/#products') },
          { label: 'iKnow' },
        ]}
        images={SCREENS.slice(0, 2)}
        thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        eyebrow={t('lavender.products.eyebrow')}
        title="iKnow"
        subline={t('iknow.hero.subtitle')}
      >
        <Button asChild className="w-full">
          <a href={contactHref} target="_blank" rel="noopener noreferrer">
            {t('cta.button')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <a href="#tool" onClick={smoothAnchor}>
            {t('iknow.anchor.intoTool')}
            <ArrowDown size={20} strokeWidth={2} />
          </a>
        </Button>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <CheckItem key={n}>{t(`iknow.card${n}.title`)}</CheckItem>
          ))}
        </ul>
      </ProductHead>

      <AnchorTabs items={tabs} label={t('lavender.common.onThisPage')} />

      <StatusQuo />
      <About />
      <Benefits />

      <Section id="tool" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
        <SectionHeader
          title={t('iknow.howItWorks.title')}
          leadIn={t('iknow.howItWorks.p1')}
          intro={[t('iknow.howItWorks.p2')]}
        />
        <MediaGallery
          images={SCREENS}
          aspectClassName="aspect-[2940/1844]"
          thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        />
      </Section>

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

/* ---------------- Status quo: quote + why it matters ---------------- */

function StatusQuo() {
  const { t } = useLanguage();
  const lead = 'lav-lead font-normal text-lav-navy/80';
  return (
    <Section id="status-quo" className={ANCHOR_SCROLL_MARGIN}>
      <div className="flex flex-col gap-8 md:flex-row lg:gap-16">
        <figure className="m-0 flex flex-col gap-8 md:flex-1">
          <blockquote className="m-0">
            <p className="lav-statement text-lav-navy">{t('iknow.intro.quote')}</p>
          </blockquote>
          <figcaption className="lav-body font-normal text-lav-navy/70">
            {t('iknow.intro.quoteAuthor').trim()}
          </figcaption>
        </figure>
        <div className="flex flex-col gap-8 md:flex-1 md:gap-10">
          <p className={lead}>{t('iknow.intro.p1')}</p>
          <p className={lead}>{t('iknow.intro.p2')}</p>
          <p className="lav-lead font-medium text-lav-navy">{t('iknow.intro.p3')}</p>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- What is iKnow ---------------- */

function About() {
  const { t } = useLanguage();
  const lead = 'lav-lead font-normal text-lav-navy/80';
  return (
    <Section id="what" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-14">
      <SectionHeader title={t('iknow.what.title')} />
      <div className="flex max-w-[820px] flex-col gap-8 md:gap-10">
        <p className={lead}>{t('iknow.what.p1')}</p>
        <p className={lead}>{t('iknow.what.p2')}</p>
        <p className={lead}>{t('iknow.what.p3')}</p>
        <p className="lav-lead font-medium text-lav-navy">{t('iknow.what.p4')}</p>
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

/* ---------------- Other products ---------------- */

function MoreProducts() {
  const { t, language } = useLanguage();
  return (
    <Section id="more" innerClassName="flex flex-col gap-12">
      <SectionHeader title={t('lavender.products.moreTitle')} />
      <div className="flex w-full flex-col gap-6 md:flex-row lg:gap-10">
        <ProductTeaser
          eyebrow={t('lavender.products.eyebrow')}
          title="Analytics Agent"
          description={t('lavender.products.analyticsAgent.desc')}
          image="/images/lavender-analytics-agent.png"
          imageAlt={t('lavender.products.analyticsAgent.imageAlt')}
          href={siteHref(language, 'analytics-agent')}
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
