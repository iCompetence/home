'use client';

import { ChevronUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { trackCtaClick } from '@/lib/tracking';
import { Section } from './Section';
import { useMotionPrefs } from './motion';
import { LinkedInGlyph } from './icons';

const EMAIL = 'info@icompetence.de';
const PHONE = '+49 40 22636380';
const LINKEDIN = 'https://www.linkedin.com/company/icompetence/';

function ContactBlock({
  label,
  value,
  href,
}: {
  label: string;
  value: string;
  href?: string;
}) {
  const valueCls = 'font-brand text-body font-medium text-lav-white no-underline';
  return (
    <div className="flex flex-col items-start gap-1 md:items-end">
      <span className="font-brand text-[14px] font-medium tracking-[0.5px] text-lav-white/70">
        {label}
      </span>
      {href ? (
        <a
          href={href}
          className={valueCls}
          onClick={() =>
            trackCtaClick(
              href.startsWith('mailto:')
                ? 'footer_mail'
                : href.startsWith('tel:')
                  ? 'footer_phone'
                  : 'footer_link',
              value,
            )
          }
        >
          {value}
        </a>
      ) : (
        <span className={valueCls}>{value}</span>
      )}
    </div>
  );
}

/**
 * Shared site footer in the new design. Wired to the project i18n
 * (`useLanguage`) — reuses the existing footer.* keys. Legal links are
 * language-prefixed (/de/… ↔ /en/…).
 */
export function Footer() {
  const { t, language } = useLanguage();
  const prefs = useMotionPrefs();
  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: prefs.scrollBehavior });

  return (
    <Section
      dsName="Footer"
      as="footer"
      className="overflow-hidden bg-lav-navy text-lav-white"
      innerClassName="relative z-[2] flex flex-col gap-8 md:gap-10"
    >
      {/* Top row */}
      <div className="flex w-full flex-col justify-between gap-8 md:flex-row lg:gap-10">
        <div className="w-full md:w-[400px] lg:w-[720px]">
          {/* Brand headline — intentionally kept in English in both languages. */}
          <h2 className="font-brand text-h3 font-medium leading-[1.05] tracking-[-1px] text-lav-white md:text-[48px] md:tracking-[-1.5px] lg:text-h1 lg:tracking-[-2px]">
            {t('footer.tagline')}
          </h2>
        </div>

        <div className="flex flex-col items-start gap-7 md:items-end md:gap-8">
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="iCompetence on LinkedIn"
            className="inline-flex h-9 w-9 items-center justify-center rounded-pill bg-lav-white/10 text-lav-white no-underline"
          >
            <LinkedInGlyph size={18} />
          </a>
          <ContactBlock label={t('footer.inquiries')} value={EMAIL} href={`mailto:${EMAIL}`} />
          <ContactBlock label={t('footer.phone')} value={PHONE} />
        </div>
      </div>

      {/* Bottom strip */}
      <div className="flex w-full items-center justify-between border-t border-lav-white/[0.32] pt-6">
        <div className="flex items-center gap-8">
          {(['footer.imprint', 'footer.privacy'] as const).map((key) => (
            <a
              key={key}
              href={`/${language}/imprint/`}
              className="font-brand text-body font-medium text-lav-white/70 no-underline"
            >
              {t(key)}
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollTop}
          className="inline-flex cursor-pointer items-center gap-2 border-0 bg-transparent font-brand text-body font-medium text-lav-white/70"
        >
          {t('footer.backToTop')}
          <ChevronUp size={16} strokeWidth={2} />
        </button>
      </div>
    </Section>
  );
}
