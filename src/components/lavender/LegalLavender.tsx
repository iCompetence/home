'use client';

import { Fragment, type ReactNode } from 'react';
import { useLanguage, type Language } from '@/contexts/LanguageContext';
import { labels, servicesData, type ServiceData } from '@/components/ServiceAccordion';
import { FaqList, Footer, Hero, PageShell, Section, SplitBlock, TopNav, siteHref } from '@/design-system';

const body = 'lav-body font-normal text-lav-navy/80';
/** Inline links in running text (same colour as the text, hence underlined). */
const inlineLink = 'text-inherit underline underline-offset-2';

/** Hero (title only) and footer around the legal text blocks. */
function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  const { language } = useLanguage();
  const home = siteHref(language, '/');
  return (
    <PageShell
      nav={<TopNav logoHref={home} sectionsHref={home} />}
      footer={<Footer />}
    >
      <Hero title={title} />
      <Section dsName="LegalText">{children}</Section>
    </PageShell>
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
        <p className={body}>{t('footer.phone')}: +49 40 22636380</p>
        <p className={body}>
          Email:{' '}
          <a href="mailto:info@iCompetence.de" className={inlineLink}>
            info@iCompetence.de
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
          {t('imprint.section2.taxNumber')}
          <br />
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
 * Privacy policy in the new design (preview under /lavender/). New as a page:
 * live, this text sits at the end of the imprint. Same content — data
 * protection, the EmpCo audit and the six services from ServiceAccordion —
 * with the German wording in "du" as in Figma.
 */
export function PrivacyPolicyLavender() {
  const { t, language } = useLanguage();
  return (
    <LegalPage title={t('privacyPolicy.title')}>
      <SplitBlock title={t('imprint.section4.privacy.title')}>
        {[1, 2, 3].map((n) => (
          <p key={n} className={body}>
            {t(`imprint.section4.privacy.text${n}`)}
          </p>
        ))}
      </SplitBlock>

      <SplitBlock title={t('imprint.empco.title')}>
        <p className={body}>{t('imprint.empco.intro')}</p>
        {labelled(['dataCollected', 'purpose', 'legalBasis', 'retention'], t)}
        <p className={`${body} font-medium`}>{t('imprint.empco.recipients.label')}</p>
        <ProcessorTable />
        <p className={body}>{t('imprint.empco.dpa')}</p>
        {labelled(['thirdCountry', 'pseudonymization', 'noAutomatedDecision'], t)}
        <p className="lav-small font-normal text-lav-navy/70">{t('imprint.source')}</p>
      </SplitBlock>

      <SplitBlock title={labels.services[language]} contentClassName="gap-0">
        <FaqList
          defaultOpen={null}
          items={servicesData.map((service) => ({
            question: service.name[language],
            answer: serviceAnswer(service, language),
          }))}
        />
      </SplitBlock>
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

/**
 * "du" for the German service texts (the live accordion says "Sie"; Figma
 * has the du wording). EN stays as in the code.
 */
const DU: readonly [string, string][] = [
  ['Nachfolgend finden Sie', 'Nachfolgend findest du'],
  ['werden Sie gesondert informiert', 'wirst du gesondert informiert'],
  ['Bitte beachten Sie', 'Bitte beachte'],
  ['Nachstehend finden Sie', 'Nachstehend findest du'],
  ['entnehmen Sie bitte', 'entnimm bitte'],
  ['wenden Sie sich', 'wende dich'],
  ['Klicken Sie hier', 'Klicke hier'],
  ['Unten sehen Sie', 'Unten siehst du'],
];

/**
 * One service as the FAQ answer in Figma: blocks of heading, explanation
 * and values, separated by a blank line; lists joined with commas.
 */
function serviceAnswer(s: ServiceData, lang: Language): ReactNode {
  const du = (text: string) =>
    lang === 'de' ? DU.reduce((acc, [from, to]) => acc.replace(from, to), text) : text;
  const label = (key: keyof typeof labels) => du(labels[key][lang]);
  const text = (value: { en: string; de: string }) => du(value[lang]);
  const list = (value: { en: string[]; de: string[] }) => value[lang].join(', ');
  const link = (href: string, children: string) => (
    <a href={href} target="_blank" rel="noopener noreferrer" className={inlineLink}>
      {children}
    </a>
  );

  const blocks: ReactNode[][] = [
    [label('description'), text(s.description)],
    [label('processingCompany'), s.company, s.companyAddress],
    [
      label('dataProtectionOfficer'),
      text(s.dataProtectionOfficer),
      link(s.dataProtectionOfficerLink, s.dataProtectionOfficerLink),
    ],
    [label('purposes'), label('purposesDescription'), list(s.purposes)],
    [label('technologies'), label('technologiesDescription'), list(s.technologies)],
    [label('dataCollected'), label('dataCollectedDescription'), list(s.dataCollected)],
    [label('legalBasis'), label('legalBasisDescription'), s.legalBasis],
    [label('processingLocation'), label('processingLocationDescription'), text(s.processingLocation)],
    [label('retentionPeriod'), label('retentionPeriodDescription'), text(s.retentionPeriod)],
  ];
  if (s.thirdCountryTransfers) {
    blocks.push([
      label('thirdCountryTransfers'),
      label('thirdCountryTransfersDescription'),
      list(s.thirdCountryTransfers),
    ]);
  }
  blocks.push([
    label('dataRecipients'),
    label('dataRecipientsDescription'),
    s.dataRecipients,
    link(s.privacyPolicyLink, label('privacyPolicy')),
    ...(s.cookiePolicyLink ? [link(s.cookiePolicyLink, label('cookiePolicy'))] : []),
    ...(s.optOutLink ? [link(s.optOutLink, label('optOut'))] : []),
  ]);
  if (s.maxCookieStorage) {
    blocks.push(
      [label('storedInformation'), label('storageDescription')],
      [label('maxCookieStorage'), text(s.maxCookieStorage)],
    );
  }

  return blocks.map((lines, i) => (
    <Fragment key={i}>
      {i > 0 && '\n\n'}
      {lines.map((line, j) => (
        <Fragment key={j}>
          {j > 0 && '\n'}
          {line}
        </Fragment>
      ))}
    </Fragment>
  ));
}
