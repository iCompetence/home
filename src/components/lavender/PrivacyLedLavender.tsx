'use client';

import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ConsultButton } from './ConsultModal';
import {
  BrandStar,
  Button,
  ClosingBlock,
  Eyebrow,
  PageShell,
  PrincipleCard,
  Section,
  TopNav,
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
    <PageShell
      surface="inverse"
      nav={<TopNav sections={[]} logoHref={home} surface="light" />}
      footer={
        <ClosingBlock
          id="contact"
          heading={t('cta.headline')}
          action={<ConsultButton variant="dark" topic={t('burgerMenu.privacyLedAi')} />}
        />
      }
    >
      {/* Hero. The padding sits on the positioned box (as in the FactsBand),
          so the star's offsets count from the hero's top edge. The star may
          reach up behind the nav, hence only horizontal clipping. */}
      <section id="top" data-ds="Section" className="relative w-full overflow-x-clip">
        <div className="relative mx-auto w-full max-w-frame px-[var(--section-pad-h)] py-[var(--section-pad-v)]">
          <BrandStar variant="principles" />
          <div className="relative flex flex-col gap-8">
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
          <p className="lav-lead font-normal text-lav-white/70">{t('privacy.intro.text')}</p>
          <p className="lav-lead font-medium text-lav-blue">{t('privacy.intro.solution')}</p>
        </div>
      </Section>

      <Section id="principles" className="pt-0" innerClassName="flex flex-col gap-12">
        <div className="flex flex-col gap-6">
          <h2 className="lav-h2 text-lav-white">{t('privacy.guidance.title')}</h2>
          <p className="lav-paragraph font-normal text-lav-white/70">{t('privacy.guidance.subline')}</p>
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
    </PageShell>
  );
}
