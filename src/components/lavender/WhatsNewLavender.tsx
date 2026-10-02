'use client';

import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Button,
  ClosingBlock,
  Hero,
  NewsEntry,
  PageShell,
  Section,
  SplitBlock,
  TopNav,
  siteHref,
} from '@/design-system';

type Entry = { key: string; route: string; image?: string; imageAlt?: string };

/**
 * Months and entries as on the live page (WhatsNewPage.tsx). The links now
 * carry the language prefix — live they point to /analytics-agent/ etc. and
 * end up on the English page.
 */
const MONTHS: readonly { id: string; key: string; entries: readonly Entry[] }[] = [
  {
    id: 'march-2026',
    key: 'whatsNew.march2026',
    entries: [
      {
        key: 'item1',
        route: 'analytics-agent',
        image: '/assets/analytics-agent/dashboard.png',
        imageAlt: 'Analytics Agent Dashboard',
      },
      { key: 'item2', route: 'ai-workshop' },
    ],
  },
  {
    id: 'february-2026',
    key: 'whatsNew.february2026',
    entries: [
      { key: 'item1', route: 'iknow' },
      { key: 'item2', route: 'privacy-led-ai' },
    ],
  },
  {
    id: 'january-2026',
    key: 'whatsNew.january2026',
    entries: [
      { key: 'item1', route: 'intelligentic-search' },
      { key: 'item2', route: 'campaign-parameter-tool' },
    ],
  },
];

/**
 * News page in the new design (preview under /lavender/). Same entries as
 * the live page; wording that changed with the redesign (du, the reworded
 * Privacy-led AI entry) comes from lavender-overrides.ts.
 */
export default function WhatsNewLavender() {
  const { t, language } = useLanguage();
  const home = siteHref(language, '/');

  return (
    <PageShell
      nav={<TopNav sections={[]} logoHref={home} />}
      footer={
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
      }
    >
      <Hero title={t('whatsNew.hero.title')} subline={t('whatsNew.hero.subtitle')} />

      <Section dsName="NewsMonths">
        {MONTHS.map((month) => (
          <SplitBlock
            key={month.id}
            id={month.id}
            title={t(`${month.key}.title`)}
            contentClassName="gap-14 md:gap-16"
          >
            {month.entries.map((entry) => (
              <NewsEntry
                key={entry.key}
                title={t(`${month.key}.${entry.key}.title`)}
                teaser={t(`${month.key}.${entry.key}.description`)}
                href={siteHref(language, entry.route)}
                linkLabel={t(`${month.key}.${entry.key}.link`)}
                image={entry.image}
                imageAlt={entry.imageAlt}
              />
            ))}
          </SplitBlock>
        ))}
      </Section>
    </PageShell>
  );
}
