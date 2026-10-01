'use client';

import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Button,
  ClosingBlock,
  Hero,
  PageShell,
  ProcessAccordion,
  Statement,
  TopNav,
  siteHref,
} from '@/design-system';

/**
 * Privacy-led AI in the new design (preview under /lavender/). A principle,
 * not a product: hero, the problem as a statement, the guidance steps. The
 * live page is hard-coded English; the copy comes from the privacy.* keys.
 * The nav keeps the homepage sections and links back to them.
 */
export default function PrivacyLedLavender() {
  const { t, language } = useLanguage();
  const home = siteHref(language, '/');
  const contact = (
    <Button asChild>
      <a href={siteHref(language, 'contact')} target="_blank" rel="noopener noreferrer">
        {t('topNav.letsTalk')}
        <ArrowUpRight size={20} strokeWidth={2} />
      </a>
    </Button>
  );

  return (
    <PageShell>
      <TopNav logoHref={home} sectionsHref={home} activeSection="privacy-led" />

      <Hero title={t('privacy.hero.title')} subline={t('privacy.hero.subline')} actions={contact} />

      <Statement
        id="intro"
        text={[t('privacy.intro.line1'), t('privacy.intro.text'), t('privacy.intro.solution')].join(' ')}
      />

      <ProcessAccordion
        id="guidance"
        title={t('privacy.guidance.title')}
        subline={t('privacy.guidance.subline')}
        steps={[1, 2, 3, 4].map((n) => ({
          number: `0${n}`,
          title: t(`privacy.guidance.step${n}.label`),
          description: t(`privacy.guidance.step${n}.desc`),
        }))}
      />

      <ClosingBlock
        id="contact"
        heading={t('cta.headline')}
        action={
          <Button asChild variant="dark">
            <a href={siteHref(language, 'contact')} target="_blank" rel="noopener noreferrer">
              {t('cta.button')}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
        }
      />
    </PageShell>
  );
}
