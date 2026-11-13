'use client';

import { NightClosing } from './NightFooter';
import { NightNav } from './NightNav';
import { NightPage } from './NightPage';
import { TopicSection } from './TopicSection';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ConsultButton } from './ConsultModal';
import {
  Button,
  Eyebrow,
  PrincipleCard,
  Section,
  siteHref,
} from '@/design-system';

/**
 * Privacy-led AI as the principles page of the new design (preview under
 * /lavender/, Figma „Entwurf B, dunkel“, decided 2026-10-02): a navy page
 * with a light nav, the problem as a two-column statement and the four
 * principles as highlight cards. Copy unchanged from the privacy.* keys.
 */
export default function PrivacyLedLavender() {
  const { t, language } = useLanguage();
  const home = siteHref(language, '/');

  return (
    <NightPage
      surface="inverse"
      nav={<NightNav logoHref={home} bar="always" />}
      footer={
        <NightClosing
          id="contact"
          heading={t('lavender.cta.heading')}
          action={<ConsultButton variant="solid" topic={t('burgerMenu.privacyLedAi')} />}
        />
      }
    >
      {/* Hero. No star of its own: the sky's guide star is the one star here. */}
      <section id="top" data-ds="Section" className="w-full">
        <div className="mx-auto w-full max-w-frame px-[var(--section-pad-h)] py-[var(--section-pad-v)]">
          <div className="flex flex-col gap-8">
            <Eyebrow tone="white">{t('burgerMenu.principles')}</Eyebrow>
            <h1 className="lav-display text-lav-white">{t('privacy.hero.title')}</h1>
            <p className="lav-lead font-normal text-lav-white/70">{t('privacy.hero.subline')}</p>
            <div>
              <Button asChild>
                <a href={siteHref(language, 'contact')} target="_blank" rel="noopener noreferrer">
                  {t('topNav.letsTalk')}
                  <ArrowUpRight size={20} strokeWidth={2} />
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* The problem, close under the hero. */}
      <Section
        id="intro"
        className="pt-0"
        innerClassName="flex flex-col gap-8 lg:flex-row lg:gap-12"
      >
        <h2 className="lav-h1 text-lav-white lg:flex-1">{t('privacy.intro.line1')}</h2>
        <div className="flex flex-col gap-6 lg:flex-1">
          <p className="lav-body font-normal text-lav-white/70">{t('privacy.intro.text')}</p>
          {/* In ink like every emphasised closing line; blue is the main action's colour only. */}
          <p className="lav-body font-semibold text-lav-ink">{t('privacy.intro.solution')}</p>
        </div>
      </Section>

      {/* A section of its own with a section title: the h1 step and the full
          distance to the intro above (was the h2 step, 80 px below it). */}
      <Section id="principles" innerClassName="flex flex-col gap-12">
        <div className="flex flex-col gap-8">
          <h2 className="lav-h1 max-w-measure-wide text-lav-ink">{t('privacy.guidance.title')}</h2>
          <p className="lav-body max-w-measure-lead font-normal text-lav-ink/70">{t('privacy.guidance.subline')}</p>
        </div>
        {/* Two in a row only from 1200px (75rem): below, „Verantwortung“ at
            H1 size is wider than half a row. Checkerboard in two columns,
            alternating in one. */}
        <div className="grid grid-cols-1 gap-6 min-[75rem]:grid-cols-2">
          {[1, 2, 3, 4].map((n) => (
            <PrincipleCard
              key={n}
              number={`0${n}`}
              title={t(`privacy.guidance.step${n}.label`)}
              description={t(`privacy.guidance.step${n}.desc`)}
              className={
                [
                  'bg-lav-lavender',
                  'bg-lav-blue',
                  'bg-lav-lavender min-[75rem]:bg-lav-blue',
                  'bg-lav-blue min-[75rem]:bg-lav-lavender',
                ][n - 1]
              }
            />
          ))}
        </div>
      </Section>
      {/* The general topic (orientation sheet: SEO & LLM content) on a light
          sheet, like the home's day layer: the explanatory blocks, tables and
          FAQ are made for a light ground. */}
      <div
        data-surface="light"
        className="mx-2 rounded-card bg-lav-page text-lav-navy md:mx-4 lg:mx-[calc(var(--section-pad-h)-40px)] lg:rounded-frame"
      >
        <TopicSection prefix="lavender.seo.privacy" route="privacy-led-ai" blockCount={3} faqCount={5} />
      </div>
    </NightPage>
  );
}
