'use client';

import { NightClosing } from './NightFooter';
import { NightNav } from './NightNav';
import { NightPage } from './NightPage';
import { TopicSection, useSeoFaq } from './TopicSection';
import { useState } from 'react';
import Script from 'next/script';
import { ArrowUpRight, BarChart3, Clock, Link2, Users } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { previewRoute } from '@/lib/i18n-meta';
import { faqPage, JsonLd } from '@/lib/structured-data';
import { ConsultButton } from './ConsultModal';
import {
  ANCHOR_SCROLL_MARGIN,
  Badge,
  Button,
  ButtonStack,
  CheckItem,
  ComparisonTable,
  FaqSection,
  IconCard,
  InfoTip,
  PriceTag,
  ProductHead,
  MoreProducts,
  QuotePanel,
  Section,
  SectionHeader,
  SegmentedControl,
  SpecItem,
  siteHref,
} from '@/design-system';
import { TrialModal, type TrialMode } from './TrialModal';

type TierId = 'tier1' | 'tier2' | 'tier3';

/** Prices are hard-coded on the live page too (CTPricing.tsx). */
const TIERS: readonly { id: TierId; price: string; yearly: string; trialBadge: boolean }[] = [
  { id: 'tier1', price: '35', yearly: '420', trialBadge: true },
  { id: 'tier2', price: '30', yearly: '360', trialBadge: false },
  { id: 'tier3', price: '25', yearly: '300', trialBadge: false },
];

const VALUE_ICONS = [Link2, Users, Clock, BarChart3] as const;

/** Logos as in the live testimonials, in the brand colours of /logos. */
const CLIENTS = [
  { logo: '/logos/freudenberg.svg', name: 'Freudenberg' },
  { logo: '/logos/eventim.svg', name: 'Eventim' },
  { logo: '/logos/pepxpress.png', name: 'pepXpress' },
] as const;

/**
 * Campaign Parameter Tool product page in the new design (preview under
 * /lavender/). Same copy as the live page; wording that changed with the
 * redesign comes from lavender-overrides.ts. The buy box carries the tier
 * switch and price; the live page's pricing section is gone, its text now
 * explains "parameter space" behind the info icon (as designed in Figma).
 */
export default function CampaignParameterToolLavender() {
  const { t, language } = useLanguage();
  const faq = [1, 2, 3, 4, 5].map((n) => ({
    question: t(`ct.faq.item${n}.question`),
    answer: t(`ct.faq.item${n}.answer`),
  }));
  const topicFaq = useSeoFaq('lavender.seo.cpt', 3);
  const [tier, setTier] = useState<TierId>('tier1');
  const [modal, setModal] = useState<{ open: boolean; mode: TrialMode }>({
    open: false,
    mode: 'trial',
  });
  const openModal = (mode: TrialMode) => setModal({ open: true, mode });
  const current = TIERS.find((x) => x.id === tier) ?? TIERS[0];

  const price = (x: (typeof TIERS)[number]) => ({
    amount: `${x.price}€`,
    period: `/${t('ct.pricing.perMonth')}`,
    yearly: `${t('ct.pricing.yearly')} ${x.yearly}€`,
  });

  const tabs = [
    { id: 'values', label: t('ct.anchor.values') },
    { id: 'how', label: t('ct.anchor.howItWorks') },
    { id: 'features', label: t('ct.anchor.features') },
    { id: 'faq', label: t('ct.anchor.faq') },
  ];

  return (
    <NightPage
      nav={<NightNav logoHref={siteHref(language, '/')} bar="always" sections={tabs} />}
      footer={
        <NightClosing
          id="contact"
          heading={t('lavender.cta.heading')}
          action={
            <ConsultButton variant="solid" topic={'Campaign Parameter Tool'} />
          }
        />
      }
    >
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
      />

      <ProductHead
        breadcrumbLabel={t('lavender.common.breadcrumb')}
        breadcrumb={[
          { label: t('topNav.products'), href: siteHref(language, '/#products') },
          { label: 'Campaign Parameter Tool' },
        ]}
        images={[
          // Alt texts as on the live page.
          { src: '/assets/hero.png', alt: 'Campaign Parameter Tool' },
          { src: '/assets/how-it-works.png', alt: 'How it works' },
        ]}
        thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        title="Campaign Parameter Tool"
        subline={t('ct.hero.headline')}
      >
        <div className="flex flex-col gap-4">
          <p className="lav-small font-medium text-lav-navy/70">{t('ct.testimonials.title')}</p>
          <ul className="m-0 flex list-none items-center gap-6 p-0">
            {CLIENTS.map((client) => (
              <li key={client.name}>
                <img src={client.logo} alt={client.name} className="h-6 w-auto" />
              </li>
            ))}
          </ul>
        </div>
        <hr className="m-0 h-px w-full border-0 bg-lav-navy/20" />
        <SegmentedControl
          label={t('ct.pricing.title')}
          value={tier}
          onChange={setTier}
          options={TIERS.map((x) => ({ value: x.id, label: t(`ct.pricing.${x.id}.name`) }))}
        />
        <InfoTip live text={t('ct.pricing.description')} label={t('lavender.common.moreInfo')}>
          {t(`ct.pricing.${tier}.rooms`)}
        </InfoTip>
        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between md:gap-4">
          <PriceTag {...price(current)} />
          {current.trialBadge && <Badge>{t('ct.pricing.trialBadge')}</Badge>}
        </div>
        <ButtonStack>
          <Button variant="primary" className="w-full" onClick={() => openModal('trial')}>
            {t('ct.hero.cta1')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </Button>
          <Button variant="soft" className="w-full" onClick={() => openModal('demo')}>
            {t('ct.cta.button')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </Button>
        </ButtonStack>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {[1, 2, 3, 4].map((n) => (
            <CheckItem key={n}>{t(`ct.hero.bullet${n}`)}</CheckItem>
          ))}
        </ul>
      </ProductHead>

      <Section id="values" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
        <SectionHeader title={t('ct.values.title')} />
        {/* Four in a row only from 1200px (75rem, sorts after md): below,
            „Maintenance“ is wider than a card's text column. */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 min-[75rem]:grid-cols-4">
          {VALUE_ICONS.map((icon, i) => (
            <IconCard
              key={i}
              icon={icon}
              title={t(`ct.values.card${i + 1}.title`)}
              description={t(`ct.values.card${i + 1}.description`)}
            />
          ))}
        </div>
      </Section>

      <Section id="how" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
        <SectionHeader title={t('ct.demo.title')} intro={[t('ct.demo.description')]} />
        <img
          src="/assets/how-it-works.png"
          alt="How it works"
          loading="lazy"
          className="aspect-[1948/1014] w-full rounded-card bg-lav-lavender object-contain object-center lg:rounded-frame"
        />
      </Section>

      <Section id="features" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
        <SectionHeader title={t('ct.features.title')} />
        <div className="grid grid-cols-1 items-start gap-6 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <SpecItem
              key={n}
              number={`0${n}`}
              headingLevel={3}
              title={t(`ct.features.item${n}.title`)}
              description={t(`ct.features.item${n}.description`)}
            />
          ))}
        </div>
      </Section>

      <Section id="why" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
        <SectionHeader title={t('ct.why.title')} intro={[t('ct.why.description')]} />
        <ComparisonTable
          firstColumn="number"
          icons
          caption={t('ct.why.title')}
          primaryHead={t('ct.why.solution.title')}
          secondaryHead={t('ct.why.problem.title')}
          rows={[1, 2, 3, 4].map((n) => ({
            aspect: `(0${n})`,
            primary: t(`ct.why.solution.item${n}`),
            secondary: t(`ct.why.problem.item${n}`),
          }))}
        />
      </Section>

      {/* The home page's quote panel (was: three cards). No names are known, so role and company sign. */}
      <QuotePanel
        id="reviews"
        title={t('ct.testimonials.title')}
        quotes={[1, 2, 3].map((n) => ({
          quote: t(`ct.testimonials.item${n}.quote`),
          role: t(`ct.testimonials.item${n}.role`),
          company: t(`ct.testimonials.item${n}.company`),
        }))}
      />

      {/* The general topic after the product (orientation sheet: SEO & LLM
          content); its questions join the page's FAQ below. */}
      <TopicSection prefix="lavender.seo.cpt" route="campaign-parameter-tool" blockCount={3} />
      <FaqSection className={ANCHOR_SCROLL_MARGIN} title={t('ct.faq.title')} items={[...faq, ...topicFaq.items]} />
      {/* FAQPage from the same strings as the visible answers. */}
      <JsonLd
        data={faqPage({
          lang: language,
          path: previewRoute('campaign-parameter-tool'),
          items: [...faq, ...topicFaq.schema],
        })}
      />
      <MoreProducts products={['iknow', 'analyticsAgent']} />

      <TrialModal
        open={modal.open}
        mode={modal.mode}
        onOpenChange={(open) => setModal((m) => ({ ...m, open }))}
      />
    </NightPage>
  );
}

