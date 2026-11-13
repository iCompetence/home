'use client';

import type { ReactNode } from 'react';
import { FileText, Link2 } from 'lucide-react';
import { cn } from '@/components/ui/utils';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * A product shown by a few of its own UI pieces, large and legible, on the
 * navy field of the services (night inside the day) with the product's brand
 * star behind them. Replaces the whole-screen screenshots on coloured
 * gradients (2026-11-13, after the serus.ai analysis): one field colour for
 * every product, the colour comes from the pieces themselves.
 *
 * The pieces are HTML, not a picture: sharp at every size and readable by
 * crawlers. Their content is taken from the real product screens. The field
 * is one image to assistive technology (role="img" with the product's alt
 * text), so the pieces are not read out one by one.
 */

const STAR = {
  blue: '/images/nacht-stern-blau.webp',
  violet: '/images/nacht-stern-violett.webp',
  mint: '/images/nacht-stern-mint.webp',
} as const;

function GlimpseField({ label, star, children }: { label: string; star: keyof typeof STAR; children: ReactNode }) {
  return (
    <div
      role="img"
      aria-label={label}
      data-ds="ProductGlimpse"
      // Reaches the frame edge like the pictures did; on phones and tablets it
      // is wider than the text and as tall as its pieces. From lg up the wide
      // picture's ratio is only the minimum height: on small laptops the
      // pieces make the field taller instead of being cut off. So no
      // overflow-hidden here (it would let the ratio clip the content); the
      // star clips itself in its own layer.
      className="relative isolate -mx-4 flex items-center justify-center rounded-card bg-lav-navy px-5 py-10 md:-mx-8 md:px-10 lg:mx-0 lg:aspect-[2416/1120] lg:rounded-frame lg:py-8"
    >
      {/* The star stands in the corner, behind the pieces (own layer), never over their text. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-[inherit]">
        <img src={STAR[star]} alt="" className="absolute -right-[12%] -top-[30%] w-[62%] select-none opacity-90" />
      </div>
      {children}
    </div>
  );
}

const card = 'rounded-card-sm bg-lav-white px-4 py-3 text-lav-navy';
const meta = 'font-brand text-[12px] leading-4 text-lav-navy/60';
const code = 'rounded-md bg-lav-navy/5 px-1.5 py-0.5 font-mono text-[11px] leading-4 text-lav-navy/70';
const bubble = 'rounded-card-sm rounded-br-md px-4 py-3 font-brand text-[14px] font-medium leading-5 text-lav-navy';

// Status colours of the products' own screens (the audit's stages, the
// agent's confidence). Only inside the pieces; the page keeps its five colours.
type Tone = 'red' | 'orange' | 'amber' | 'green';
const TONE: Record<Tone, { pill: string; dot: string }> = {
  red: { pill: 'bg-[#fbe4e2] text-[#a3362f]', dot: 'bg-[#e0483e]' },
  orange: { pill: 'bg-[#fdebd8] text-[#9a4d0b]', dot: 'bg-[#ea7a1f]' },
  amber: { pill: 'bg-[#fbf0d2] text-[#80600a]', dot: 'bg-[#d7a520]' },
  green: { pill: 'bg-[#e2f3e7] text-[#1d6b37]', dot: 'bg-[#2f9e57]' },
};

function StatusPill({ tone, children }: { tone: Tone; children: ReactNode }) {
  return (
    <span className={cn('inline-flex shrink-0 items-center rounded-pill px-2.5 py-1 font-brand text-[12px] font-medium leading-4', TONE[tone].pill)}>
      {children}
    </span>
  );
}

/** EmpCo Audit: findings per stage, two findings, the critic's second opinion. */
function EmpCoGlimpse() {
  const { t } = useLanguage();
  const level = t('lavender.glimpse.empco.level');
  const counts: [Tone, number, number][] = [
    ['red', 5, 5],
    ['orange', 4, 2],
    ['amber', 3, 2],
    ['green', 2, 6],
  ];
  const finding = (tone: Tone, stage: number, tag: string, claim: string, strong: boolean, className?: string) => (
    <div className={cn(card, 'flex flex-col gap-2', className)}>
      <div className="flex items-center gap-2">
        <StatusPill tone={tone}>{`${level} ${stage}`}</StatusPill>
        <span className={code}>{tag}</span>
        <span className={cn(meta, 'ml-auto hidden items-center gap-1 sm:inline-flex')}>
          <Link2 size={12} strokeWidth={2} />
          /nachhaltigkeit/
        </span>
      </div>
      <p className={cn('font-brand text-[15px] leading-[22px]', strong ? 'font-medium' : 'text-lav-navy/80')}>{claim}</p>
    </div>
  );
  return (
    <GlimpseField star="violet" label={t('lavender.products.empco.imageAlt')}>
      <div className="flex w-full max-w-[520px] flex-col gap-3">
        <div className="mb-1 flex flex-wrap gap-2">
          {counts.map(([tone, stage, n]) => (
            <span key={stage} className="inline-flex items-center gap-2 rounded-pill bg-lav-white/10 px-3 py-1 font-brand text-[12px] leading-4 text-lav-white">
              <span className={cn('size-1.5 rounded-full', TONE[tone].dot)} />
              {`${level} ${stage}`}
              <span className="text-lav-white/60">{n}</span>
            </span>
          ))}
        </div>
        {finding('red', 5, 'forbidden_term', t('lavender.glimpse.empco.claim5'), true)}
        {finding('green', 2, 'general_claim', t('lavender.glimpse.empco.claim2'), false, 'lg:ml-10')}
        <span className="hidden self-start rounded-pill bg-lav-lavender px-3 py-1.5 font-brand text-[12px] font-medium leading-4 text-lav-navy sm:inline-flex">
          {t('lavender.glimpse.empco.critic')}
        </span>
      </div>
    </GlimpseField>
  );
}

/** iKnow: a question, the answer, and the source it came from. */
function IKnowGlimpse() {
  const { t } = useLanguage();
  return (
    <GlimpseField star="mint" label={t('lavender.products.iknow.imageAlt')}>
      <div className="grid w-full max-w-[640px] grid-cols-1 items-start gap-4 sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
        <div className="flex flex-col gap-3">
          <p className={cn(bubble, 'self-end bg-lav-blue')}>{t('lavender.glimpse.iknow.question')}</p>
          <div className={cn(card, 'flex flex-col gap-3')}>
            <p className="font-brand text-[14px] leading-[21px]">
              {t('lavender.glimpse.iknow.answerLead')} <span className="font-medium">Privacy Led AI</span>
              {t('lavender.glimpse.iknow.answerRest')}
            </p>
            <span className={meta}>{t('lavender.glimpse.iknow.answerMeta')}</span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="font-brand text-[12px] font-medium leading-4 text-lav-white/70">{t('lavender.glimpse.iknow.sources')}</span>
          <div className={cn(card, 'flex flex-col gap-1.5 py-2.5')}>
            <span className="inline-flex items-center gap-1.5 self-start rounded-pill bg-lav-lavender px-2 py-0.5 font-brand text-[11px] font-medium leading-4">
              <FileText size={12} strokeWidth={2} />
              Google Docs
            </span>
            <span className="font-brand text-[13px] font-medium leading-[18px]">Privacy Led AI</span>
            <span className="font-brand text-[12px] leading-4 text-lav-navy/80">{t('lavender.glimpse.iknow.sourceText')}</span>
            <span className={meta}>{t('lavender.glimpse.iknow.page')}</span>
          </div>
        </div>
      </div>
    </GlimpseField>
  );
}

/** Analytics Agent: a question in plain language and the chart it answers with (GA4, February). */
function AnalyticsGlimpse() {
  const { t } = useLanguage();
  const bars: [string, number][] = [
    ['/', 44],
    ['/icu-user-journey-explorer', 5],
    ['/blog/safari_local-storage_3rd-party-cookies', 2],
    ['/intelligentic-search', 1],
    ['/privacy-led-ai', 1],
  ];
  const max = bars[0][1];
  return (
    <GlimpseField star="blue" label={t('lavender.products.analyticsAgent.imageAlt')}>
      <div className="flex w-full max-w-[560px] flex-col gap-3">
        <p className={cn(bubble, 'max-w-[420px] self-end bg-lav-lavender')}>{t('lavender.glimpse.analytics.question')}</p>
        <div className={cn(card, 'flex flex-col gap-3 px-5 py-4')}>
          <div className="flex items-baseline justify-between gap-3">
            <span className="font-brand text-[14px] font-medium leading-5">{t('lavender.glimpse.analytics.chartTitle')}</span>
            <span className={meta}>Top 5</span>
          </div>
          <ul className="m-0 flex list-none flex-col gap-1.5 p-0">
            {bars.map(([path, n]) => (
              <li
                key={path}
                className="grid grid-cols-[minmax(0,8rem)_minmax(0,1fr)_1.5rem] items-center gap-3 sm:grid-cols-[minmax(0,11rem)_minmax(0,1fr)_1.5rem]"
              >
                <span className="truncate font-mono text-[11px] leading-4 text-lav-navy/70">{path}</span>
                <span className="h-2 rounded-pill bg-lav-navy/5">
                  <span className="block h-full rounded-pill bg-lav-blue" style={{ width: `${Math.max(3, (n / max) * 100)}%` }} />
                </span>
                <span className="text-right font-brand text-[12px] leading-4 tabular-nums text-lav-navy/70">{n}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap items-center gap-2 border-t border-lav-navy/10 pt-3">
            <span className={code}>GA4</span>
            <span className={meta}>{t('lavender.glimpse.analytics.period')}</span>
            <StatusPill tone="green">{t('lavender.glimpse.analytics.confidence')}</StatusPill>
          </div>
        </div>
      </div>
    </GlimpseField>
  );
}

/** Intelligentic Search: the travel advisor's chat and two offers that match it. */
function IntelligenticSearchGlimpse() {
  const { t } = useLanguage();
  const offers = [
    { name: 'Amara Bangkok Hotel', features: 'a', match: 'matchA', price: 'priceA' },
    { name: 'Eastin Grand Hotel Sathorn', features: 'b', match: 'matchB', price: 'priceB' },
  ] as const;
  return (
    <GlimpseField star="violet" label={t('lavender.glimpse.is.label')}>
      <div className="grid w-full max-w-[640px] grid-cols-1 items-center gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <div className="flex flex-col gap-3">
          <p className={cn(bubble, 'self-end bg-lav-blue')}>{t('lavender.glimpse.is.user')}</p>
          <p className={cn(card, 'self-start rounded-bl-md font-brand text-[14px] leading-5')}>{t('lavender.glimpse.is.agent')}</p>
        </div>
        <div className="flex flex-col gap-2">
          {offers.map((offer, i) => (
            <div key={offer.name} className={cn(card, 'flex flex-col gap-1.5', i === 1 && 'hidden sm:flex')}>
              <span className="font-brand text-[14px] font-medium leading-5">{offer.name}</span>
              <span className={meta}>{t(`lavender.glimpse.is.features.${offer.features}`)}</span>
              <div className="mt-1 flex items-center justify-between gap-3">
                <span className="rounded-md bg-lav-navy px-2 py-1 font-brand text-[12px] font-medium leading-4 text-lav-white">
                  {t(`lavender.glimpse.is.${offer.match}`)}
                </span>
                <span className="font-brand text-[14px] font-medium leading-5 tabular-nums">{t(`lavender.glimpse.is.${offer.price}`)}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </GlimpseField>
  );
}

const GLIMPSES = {
  empco: EmpCoGlimpse,
  iknow: IKnowGlimpse,
  analyticsAgent: AnalyticsGlimpse,
  intelligenticSearch: IntelligenticSearchGlimpse,
} as const;

export type GlimpseProduct = keyof typeof GLIMPSES;

/** The product's UI pieces on the navy field; the visual of its ProductRow. */
export function ProductGlimpse({ product }: { product: GlimpseProduct }) {
  const Glimpse = GLIMPSES[product];
  return <Glimpse />;
}
