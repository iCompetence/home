'use client';

import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { consumePendingFormSuccess, trackThankYouView } from '@/lib/tracking';
import { Button, Footer, Hero, PageShell, PREVIEW_BASE, TopNav, siteHref } from '@/design-system';

/** True while the redesign lives under /lavender (widened from the literal type). */
const IN_PREVIEW = (PREVIEW_BASE as string) !== '';

/** Hero with one "back to home" button, then the footer (thank-you, 404). */
function HeroPage({ title, message, back }: { title: string; message: string; back: string }) {
  const { language } = useLanguage();
  const home = siteHref(language, '/');
  return (
    <PageShell
      nav={<TopNav logoHref={home} sectionsHref={home} />}
      footer={<Footer />}
    >
      <Hero
        title={title}
        subline={message}
        actions={
          <Button asChild>
            <a href={home}>
              {back}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
        }
      />
    </PageShell>
  );
}

/**
 * Thank-you page. Live it only renders after a real form submission (the
 * one-time flag from submitNetlifyForm) and sends direct visits home, so the
 * thank_you_view event cannot be faked. In the preview it always renders so
 * it can be reviewed; the gate comes back by itself at go-live
 * (PREVIEW_BASE = '').
 */
export function ThankYouLavender() {
  const { t, language } = useLanguage();
  const [verified, setVerified] = useState(IN_PREVIEW);

  useEffect(() => {
    const submission = consumePendingFormSuccess();
    if (submission) {
      trackThankYouView(submission.formId, submission.language ?? language);
      setVerified(true);
    } else if (!IN_PREVIEW) {
      window.location.replace(siteHref(language, '/'));
    }
  }, [language]);

  if (!verified) return null;
  return (
    <HeroPage title={t('thankYou.title')} message={t('thankYou.message')} back={t('thankYou.backToHome')} />
  );
}

/** 404 in the new design (preview at /lavender/404/; live: app/[lang]/not-found.tsx). */
export function NotFoundLavender() {
  const { t } = useLanguage();
  return (
    <HeroPage title={t('notFound.title')} message={t('notFound.message')} back={t('notFound.backToHome')} />
  );
}
