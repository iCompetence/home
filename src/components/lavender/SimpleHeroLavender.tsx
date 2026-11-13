'use client';

import { NightFooter } from './NightFooter';
import { NightNav } from './NightNav';
import { NightPage } from './NightPage';
import { type ReactNode, useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { consumePendingFormSuccess, trackThankYouView } from '@/lib/tracking';
import { Button, Hero, PREVIEW_BASE, siteHref } from '@/design-system';

/** True while the redesign lives under /lavender (widened from the literal type). */
const IN_PREVIEW = (PREVIEW_BASE as string) !== '';

/** Hero with its buttons, then the footer (thank-you, 404). */
function HeroPage({
  eyebrow,
  title,
  message,
  actions,
}: {
  eyebrow?: string;
  title: string;
  message: string;
  actions: ReactNode;
}) {
  const { language } = useLanguage();
  return (
    <NightPage
      nav={<NightNav logoHref={siteHref(language, '/')} bar="always" />}
      footer={<NightFooter />}
    >
      <Hero eyebrow={eyebrow} title={title} subline={message} actions={actions} />
    </NightPage>
  );
}

function LinkButton({ href, label, variant }: { href: string; label: string; variant?: 'soft' }) {
  return (
    <Button asChild variant={variant}>
      <a href={href}>
        {label}
        <ArrowUpRight size={20} strokeWidth={2} />
      </a>
    </Button>
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
    <HeroPage
      title={t('thankYou.title')}
      message={t('thankYou.message')}
      actions={<LinkButton href={siteHref(language, '/')} label={t('lavender.thankYou.home')} />}
    />
  );
}

/** 404 in the new design (preview at /lavender/404/; live: app/[lang]/not-found.tsx). */
export function NotFoundLavender() {
  const { t, language } = useLanguage();
  // Sends visitors on to the products or to contact (content team 11/2026, F-1).
  return (
    <HeroPage
      eyebrow="404"
      title={t('notFound.title')}
      message={t('notFound.message')}
      actions={
        <>
          <LinkButton href={siteHref(language, '/#products')} label={t('notFound.products')} />
          <LinkButton href={siteHref(language, 'contact')} label={t('topNav.letsTalk')} variant="soft" />
        </>
      }
    />
  );
}
