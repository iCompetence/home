'use client';

import { NightFooter } from './NightFooter';
import { NightNav } from './NightNav';
import { NightPage } from './NightPage';
import { Fragment, type ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Hero, RichBody, Section, SplitBlock, UpdatedNote, siteHref } from '@/design-system';
import { ConsentServices, consentServices } from './ConsentServices';
import { ConsentSettingsButton } from './ConsentSettingsButton';

const body = 'lav-body font-normal text-lav-navy/80';
/** Inline links in running text (same colour as the text, hence underlined; the star gradient on hover). */
const inlineLink = 'lav-star-text text-inherit underline underline-offset-2';

/** Hero (title, optionally a line above it) and footer around the legal text blocks. */
export function LegalPage({ title, eyebrow, children }: { title: string; eyebrow?: string; children: ReactNode }) {
  const { language } = useLanguage();
  const home = siteHref(language, '/');
  return (
    <NightPage
      nav={<NightNav logoHref={home} bar="always" />}
      footer={<NightFooter />}
    >
      <Hero title={title} eyebrow={eyebrow} />
      <Section dsName="LegalText">{children}</Section>
    </NightPage>
  );
}

/* ---------------- Imprint ---------------- */

/**
 * Imprint in the new design (preview under /lavender/). Same content as the
 * live page up to the disclaimer; the privacy part moved to its own page
 * (PrivacyPolicyLavender). Wording that changed with the redesign (DDG
 * instead of TMG, "du") comes from lavender-overrides.ts.
 */
export function ImprintLavender() {
  const { t } = useLanguage();
  return (
    <LegalPage title={t('imprint.hero.title')}>
      <SplitBlock title={t('imprint.section1.title')}>
        <p className={body}>
          <strong className="font-medium">{t('imprint.section1.company')}</strong>
          <br />
          Weidenallee 10c
          <br />
          20357 Hamburg
        </p>
        <p className={body}>
          <strong className="font-medium">{t('imprint.section1.director')}</strong> Matthias Postel
        </p>
        <p className={body}>
          {t('footer.phone')}:{' '}
          <a href="tel:+494022636380" className={inlineLink}>
            +49 40 22636380
          </a>
        </p>
        <p className={body}>
          {t('lavender.common.email')}:{' '}
          <a href="mailto:info@icompetence.de" className={inlineLink}>
            info@icompetence.de
          </a>
        </p>
      </SplitBlock>

      <SplitBlock title={t('imprint.section2.title')}>
        <p className={body}>
          {t('imprint.section2.content')}
          <br />
          {t('imprint.section2.court')}
          <br />
          {t('imprint.section2.number')}
          <br />
          {/* Without the tax number (Dennis, 26.11.2026): the VAT ID is what the law asks for. */}
          {t('imprint.section2.vatId')}
        </p>
      </SplitBlock>

      <SplitBlock title={t('imprint.section3.title')}>
        <p className={body}>
          KREMS
          <br />
          Das Gute Bild
        </p>
        <p className={body}>
          Hamburg.Berlin.
          <br />
          <a href="http://www.FrankKrems.de" className={inlineLink}>
            www.FrankKrems.de
          </a>
          <br />
          +49 172 851 15 20
        </p>
      </SplitBlock>

      <SplitBlock title={t('imprint.section4.title')} contentClassName="gap-8">
        {(['content', 'links', 'copyright'] as const).map((part) => (
          <Fragment key={part}>
            <h3 className="lav-h3 text-lav-navy">{t(`imprint.section4.${part}.title`)}</h3>
            <p className={body}>{t(`imprint.section4.${part}.text`)}</p>
          </Fragment>
        ))}
      </SplitBlock>
    </LegalPage>
  );
}

/* ---------------- Privacy policy ---------------- */

/** Processors of the EmpCo audit, as in the live table. */
const PROCESSORS = [
  { provider: 'Anthropic PBC', location: 'USA', key: 'anthropic' },
  { provider: 'Cloudflare Inc.', location: 'USA', key: 'cloudflare' },
  { provider: 'Netlify Inc.', location: 'USA', key: 'netlify' },
  { provider: null, location: null, key: 'google' },
] as const;

/** EmpCo paragraphs that open with a label in medium weight. */
const labelled = (keys: readonly string[], t: (k: string) => string) =>
  keys.map((k) => (
    <p key={k} className={body}>
      <strong className="font-medium">{t(`imprint.empco.${k}.label`)}</strong>{' '}
      {t(`imprint.empco.${k}.value`)}
    </p>
  ));

/**
 * Privacy policy in the new design. New as a page: live, this text sat at the
 * end of the imprint. Since 26.11.2026 a full policy (lavender-legal.ts):
 * controller, the general notes of the old text, hosting, forms, the EmpCo
 * audit, consent, the services read live from Usercentrics (ConsentServices)
 * and the visitor's rights. German in "du", except the services' texts.
 */
export function PrivacyPolicyLavender() {
  const { t, language } = useLanguage();
  const section = (key: string) => (
    <SplitBlock title={t(`privacyPolicy.${key}.title`)}>
      <RichBody text={t(`privacyPolicy.${key}.body`)} />
    </SplitBlock>
  );
  // The services that load only after consent, by name, from the snapshot of
  // Usercentrics taken at build time (the same data as the list below).
  const names = consentServices(language)
    .filter((service) => service.needsConsent)
    .map((service) => service.name);
  const needConsent =
    names.length > 1
      ? `${names.slice(0, -1).join(', ')} ${language === 'de' ? 'und' : 'and'} ${names[names.length - 1]}`
      : (names[0] ?? '');
  return (
    <LegalPage title={t('privacyPolicy.title')}>
      {section('controller')}

      <SplitBlock title={t('privacyPolicy.general.title')}>
        {[1, 2, 3].map((n) => (
          <p key={n} className={body}>
            {t(`imprint.section4.privacy.text${n}`)}
          </p>
        ))}
      </SplitBlock>

      {section('hosting')}
      {section('forms')}

      <SplitBlock title={t('imprint.empco.title')}>
        <p className={body}>{t('imprint.empco.intro')}</p>
        {labelled(['dataCollected', 'purpose', 'legalBasis', 'retention'], t)}
        <p className={`${body} font-medium`}>{t('imprint.empco.recipients.label')}</p>
        <ProcessorTable />
        <p className={body}>{t('imprint.empco.dpa')}</p>
        {labelled(['thirdCountry', 'pseudonymization', 'noAutomatedDecision'], t)}
        <p className="lav-small font-normal text-lav-navy/70">{t('imprint.source')}</p>
      </SplitBlock>

      <SplitBlock title={t('privacyPolicy.consent.title')}>
        <RichBody text={t('privacyPolicy.consent.body').replace('{services}', needConsent)} />
        <ConsentSettingsButton />
      </SplitBlock>

      <SplitBlock title={t('privacyPolicy.services.title')} contentClassName="gap-0">
        <ConsentServices />
      </SplitBlock>

      {section('rights')}

      <UpdatedNote route="privacy-policy" className="border-t border-lav-navy/20 pt-6" />
    </LegalPage>
  );
}

/**
 * Processor table. A real table from tablet up; on phones each row stacks
 * its cells (as in Figma), with the ARIA roles keeping the table semantics
 * that `display: block/flex` would drop.
 */
function ProcessorTable() {
  const { t } = useLanguage();
  const cols = ['provider', 'location', 'purpose', 'transfer'] as const;
  const row = 'flex flex-col gap-3 border-b border-lav-navy/20 py-3 md:table-row md:py-0';
  // Hyphenated: „Standardvertragsklauseln“ is wider than a column below 1250px.
  const cell = 'lav-hyphenate block p-0 text-left align-top md:table-cell md:py-3 md:pr-4 md:last:pr-0';
  return (
    <table role="table" className="block w-full border-collapse md:table md:table-fixed">
      <colgroup>
        <col className="md:w-[24.7%] lg:w-[29.41%]" />
        <col className="md:w-[14.43%] lg:w-[13.73%]" />
        <col className="md:w-[31.25%] lg:w-[29.41%]" />
        <col />
      </colgroup>
      {/* Phones show the values only (Figma hides the head row there); the
          headers stay for screen readers. */}
      <thead role="rowgroup" className="sr-only md:not-sr-only md:table-header-group">
        <tr role="row" className={row}>
          {cols.map((c) => (
            <th key={c} role="columnheader" scope="col" className={`lav-small font-medium text-lav-navy ${cell}`}>
              {t(`imprint.empco.recipients.col.${c}`)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody role="rowgroup" className="block md:table-row-group">
        {PROCESSORS.map((p) => (
          <tr key={p.key} role="row" className={row}>
            {[
              p.provider ?? t('imprint.empco.recipients.google.provider'),
              p.location ?? t('imprint.empco.recipients.google.location'),
              t(`imprint.empco.recipients.${p.key}.purpose`),
              t(`imprint.empco.recipients.${p.key}.transfer`),
            ].map((value, i) => (
              <td key={i} role="cell" className={`lav-small font-normal text-lav-navy/80 ${cell}`}>
                {value}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
