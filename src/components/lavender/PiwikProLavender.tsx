'use client';

import { NightClosing } from './NightFooter';
import { NightNav } from './NightNav';
import { NightPage } from './NightPage';
import { useSeoFaq } from './TopicSection';
import {
  ArrowDown,
  ArrowLeftRight,
  ChartColumn,
  GraduationCap,
  Minus,
  Settings2,
  ShieldCheck,
  Tags,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ConsultButton } from './ConsultModal';
import {
  ANCHOR_SCROLL_MARGIN,
  Breadcrumb,
  Button,
  ButtonStack,
  CheckItem,
  ComparisonTable,
  FactsBand,
  FaqSection,
  IconCard,
  ProcessAccordion,
  RichBody,
  Section,
  SectionHeader,
  SplitBlock,
  Statement,
  UpdatedNote,
  siteHref,
  smoothAnchor,
  useInline,
} from '@/design-system';
import { previewRoute } from '@/lib/i18n-meta';
import { faqPage, JsonLd } from '@/lib/structured-data';

/** The product's name: always "Piwik PRO" ("Piwik" alone was Matomo's name until 2018). */
const PRODUCT = 'Piwik PRO';

const COMPARE_ROWS = 10;
const FAQ_COUNT = 8;
const SERVICE_ICONS = [Settings2, ArrowLeftRight, Tags, ShieldCheck, ChartColumn, GraduationCap] as const;

/**
 * Where the page's facts come from, in the order of the page (labels:
 * piwik.sources.<key>). Checked on the date in PAGE_UPDATED['piwik-pro'].
 * Google's help pages get the page's language appended (?hl=).
 */
const SOURCES = [
  {
    group: 'piwik',
    items: [
      { key: 'pricing', href: 'https://piwik.pro/pricing/' },
      { key: 'plans', href: 'https://piwik.pro/business-vs-enterprise/' },
      { key: 'about', href: 'https://piwik.pro/about/' },
      { key: 'contact', href: 'https://piwik.pro/contact/' },
      { key: 'core', href: 'https://developers.piwik.pro/changelog/18-58-0' },
      {
        key: 'anon',
        href: 'https://help.piwik.pro/support/questions/can-i-collect-any-data-from-visitors-who-dont-consent/',
      },
      {
        key: 'tdddg',
        href: 'https://help.piwik.pro/support/privacy/how-to-make-your-website-compliant-with-tdddg/',
      },
      { key: 'ads', href: 'https://help.piwik.pro/support/integrations/google-ads-integration/' },
      {
        key: 'import',
        href: 'https://help.piwik.pro/support/questions/can-i-import-data-from-google-analytics/',
      },
      { key: 'directory', href: 'https://piwik.pro/partner-directory/' },
    ],
  },
  {
    group: 'google',
    items: [
      { key: 'terms', href: 'https://marketingplatform.google.com/about/analytics/terms/de/' },
      { key: 'sampling', href: 'https://support.google.com/analytics/answer/13331292', hl: true },
      { key: 'retention', href: 'https://support.google.com/analytics/answer/7667196', hl: true },
      { key: 'bigquery', href: 'https://support.google.com/analytics/answer/9358801', hl: true },
      { key: 'eu', href: 'https://support.google.com/analytics/answer/12017362', hl: true },
      { key: 'processor', href: 'https://business.safety.google/adsprocessorterms/' },
      { key: 'transfers', href: 'https://business.safety.google/adsdatatransfers/' },
      { key: 'consentMode', href: 'https://support.google.com/analytics/answer/9976101', hl: true },
      { key: 'modeling', href: 'https://support.google.com/analytics/answer/11161109', hl: true },
      { key: 'adsLink', href: 'https://support.google.com/analytics/answer/9379420', hl: true },
      { key: 'support', href: 'https://support.google.com/analytics/answer/11828307', hl: true },
      { key: 'a360', href: 'https://support.google.com/marketingplatform/answer/9013858', hl: true },
      { key: 'predictive', href: 'https://support.google.com/analytics/answer/9846734', hl: true },
    ],
  },
  {
    group: 'law',
    items: [
      { key: 'tdddg25', href: 'https://www.gesetze-im-internet.de/ttdsg/__25.html' },
      { key: 'adequacy', href: 'https://eur-lex.europa.eu/eli/dec_impl/2023/1795/oj/deu' },
      { key: 'appeal', href: 'https://eur-lex.europa.eu/legal-content/DE/TXT/?uri=CELEX:62025CN0703' },
      { key: 'w3techs', href: 'https://w3techs.com/technologies/details/ta-googleanalytics' },
      { key: 'matomo', href: 'https://matomo.org/blog/2018/01/piwik-is-now-matomo/' },
    ],
  },
] as const;

/**
 * "Piwik PRO statt GA4": a service page (iCompetence sets up Piwik PRO and
 * moves the tracking over from Google Analytics 4), built from the blocks of
 * the product pages. Preview until released: noindex (page.tsx), not linked
 * from the nav, the footer or the sitemap.
 *
 * The comparison is the page's core and has to stay verifiable: every fact
 * has its source in SOURCES and its wording in lavender-seo.ts (piwik.*).
 * No logos, badges or screenshots of Piwik PRO or Google while their use is
 * not cleared.
 */
export default function PiwikProLavender() {
  const { t, language } = useLanguage();
  const faq = useSeoFaq('piwik', FAQ_COUNT);

  const tabs = [
    { id: 'compare', label: t('piwik.anchor.compare') },
    { id: 'fit', label: t('piwik.anchor.fit') },
    { id: 'services', label: t('piwik.anchor.services') },
    { id: 'process', label: t('piwik.anchor.process') },
    { id: 'faq', label: t('piwik.anchor.faq') },
  ];

  return (
    <NightPage
      nav={<NightNav logoHref={siteHref(language, '/')} bar="always" sections={tabs} />}
      footer={
        <NightClosing
          heading={t('lavender.cta.heading')}
          action={<ConsultButton variant="solid" topic={PRODUCT} />}
        />
      }
    >
      {/* Next to the visible questions, from the same strings (WebPage,
          breadcrumb and the service come from page.tsx). */}
      <JsonLd data={faqPage({ lang: language, path: previewRoute('piwik-pro'), items: faq.schema })} />

      <Head />

      <FactsBand
        id="about"
        title={t('piwik.facts.title')}
        lead={t('piwik.facts.lead')}
        facts={[1, 2, 3, 4, 5, 6].map((n) => ({
          label: t(`piwik.fact${n}.label`),
          value: t(`piwik.fact${n}.value`),
        }))}
      />

      <Comparison />
      <Fit />
      <Services />

      <ProcessAccordion
        id="process"
        className={ANCHOR_SCROLL_MARGIN}
        title={t('piwik.process.title')}
        defaultExpanded={0}
        steps={[1, 2, 3, 4].map((n) => ({
          number: `0${n}`,
          title: t(`piwik.process.step${n}.title`),
          description: t(`piwik.process.step${n}.desc`),
        }))}
      />

      <Statement
        text={t('piwik.statement')}
        // The page's main action again, as in the head.
        action={<ConsultButton topic={PRODUCT} />}
      />

      <FaqSection className={ANCHOR_SCROLL_MARGIN} title={t('piwik.faq.title')} items={faq.items} />
      <Sources />
    </NightPage>
  );
}

/* ---------------- Head ---------------- */

/**
 * A text head like the Hero (display headline, lead, actions) under the
 * breadcrumb of the product pages. No picture: a screenshot of someone
 * else's product would need its owner's consent and would read as if the
 * product were ours.
 */
function Head() {
  const { t, language } = useLanguage();
  const inline = useInline();
  return (
    <section id="top" data-ds="Hero" className="w-full">
      <div className="mx-auto flex w-full max-w-frame flex-col gap-8 px-[var(--section-pad-h)] pb-[var(--section-pad-v)] pt-6 md:gap-12 md:pt-8 lg:gap-14">
        <Breadcrumb
          label={t('lavender.common.breadcrumb')}
          items={[
            { label: t('topNav.services'), href: siteHref(language, '/#services') },
            { label: PRODUCT },
          ]}
        />
        <h1 className="lav-display text-lav-ink">{t('piwik.hero.title')}</h1>
        <p className="lav-lead max-w-measure-lead font-normal text-lav-ink/80">{t('piwik.hero.lead')}</p>
        <div className="flex flex-col gap-8">
          <ButtonStack>
            <ConsultButton topic={PRODUCT} />
            <Button asChild variant="soft">
              <a href="#compare" onClick={smoothAnchor}>
                {t('piwik.hero.jump')}
                <ArrowDown size={20} strokeWidth={2} />
              </a>
            </Button>
          </ButtonStack>
          {/* The partnership in words, with the directory as proof. Piwik PRO's
              partner badge would stand here; it is left out until its use is
              cleared with Piwik PRO (their terms grant no right to their marks
              without a written agreement). */}
          <p className="lav-small font-normal text-lav-ink/70">{inline(t('piwik.partner.line'))}</p>
        </div>
      </div>
    </section>
  );
}

/* ---------------- Comparison ---------------- */

function Comparison() {
  const { t } = useLanguage();
  return (
    <Section id="compare" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
      <SectionHeader title={t('piwik.compare.title')} intro={[t('piwik.compare.intro')]} />
      <ComparisonTable
        caption={t('piwik.compare.title')}
        primaryHead={PRODUCT}
        secondaryHead={t('piwik.compare.colGa4')}
        rows={Array.from({ length: COMPARE_ROWS }, (_, i) => ({
          aspect: t(`piwik.compare.r${i + 1}.aspect`),
          primary: t(`piwik.compare.r${i + 1}.piwik`),
          secondary: t(`piwik.compare.r${i + 1}.ga4`),
        }))}
      />
      {/* The honest other half: a comparison that only shows where we win
          would be neither fair nor believable. */}
      <SplitBlock title={t('piwik.compare.ga4.title')} headingLevel={3} headingStep="h3" className="pb-0">
        <RichBody text={t('piwik.compare.ga4.body')} className="max-w-measure-lead" />
      </SplitBlock>
    </Section>
  );
}

/* ---------------- Who it fits ---------------- */

function Fit() {
  const { t } = useLanguage();
  return (
    <Section id="fit" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
      <SectionHeader title={t('piwik.fit.title')} intro={[t('piwik.fit.intro')]} />
      <div className="flex flex-col">
        <SplitBlock title={t('piwik.fit.yes.title')} headingLevel={3} headingStep="h3">
          <ul className="m-0 flex max-w-measure-lead list-none flex-col gap-3 p-0">
            {[1, 2, 3, 4].map((n) => (
              <CheckItem key={n}>{t(`piwik.fit.yes.item${n}`)}</CheckItem>
            ))}
          </ul>
        </SplitBlock>
        <SplitBlock title={t('piwik.fit.no.title')} headingLevel={3} headingStep="h3" className="pb-0">
          <ul className="m-0 flex max-w-measure-lead list-none flex-col gap-3 p-0">
            {[1, 2, 3].map((n) => (
              <OtherItem key={n}>{t(`piwik.fit.no.item${n}`)}</OtherItem>
            ))}
          </ul>
        </SplitBlock>
      </div>
    </Section>
  );
}

/** A line of the other side's list: CheckItem's measures with the minus the comparison table sets before the other value. */
function OtherItem({ children }: { children: string }) {
  return (
    <li className="flex items-start gap-3">
      <span aria-hidden className="inline-flex h-6 w-6 shrink-0 items-center justify-center text-lav-navy/50">
        <Minus size={20} strokeWidth={2} />
      </span>
      <span className="lav-body py-[6px] font-normal text-lav-navy/80">{children}</span>
    </li>
  );
}

/* ---------------- What we do ---------------- */

function Services() {
  const { t } = useLanguage();
  const inline = useInline();
  return (
    <Section id="services" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <SectionHeader title={t('piwik.services.title')} className="lg:flex-1" />
        {/* With its link to the principle behind the offer (Privacy-led AI). */}
        <p className="lav-body font-normal text-lav-navy/80 lg:flex-1">{inline(t('piwik.services.intro'))}</p>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
        {SERVICE_ICONS.map((icon, i) => (
          <IconCard
            key={i}
            icon={icon}
            title={t(`piwik.service${i + 1}.title`)}
            description={t(`piwik.service${i + 1}.desc`)}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Sources & last update ---------------- */

/**
 * Every source behind the page's facts, grouped by whose statement it is,
 * with the date they were last checked (same date as dateModified in the
 * JSON-LD). A comparison with a competitor has to be verifiable.
 */
function Sources() {
  const { t, language } = useLanguage();
  // underline! — PageShell's unlayered `.lavender-page a { text-decoration: none }`
  // beats the plain utility; links in a list of sources must look like links.
  const link = 'lav-body font-normal text-lav-navy underline! underline-offset-2';
  return (
    <Section id="sources" dsName="Sources">
      <SplitBlock title={t('piwik.sources.title')} contentClassName="gap-10">
        <div className="flex flex-col gap-4">
          <p className="lav-body max-w-measure-lead font-normal text-lav-navy/80">{t('piwik.sources.intro')}</p>
          <UpdatedNote route="piwik-pro" />
        </div>
        {SOURCES.map((group) => (
          <div key={group.group} className="flex flex-col gap-4">
            <h3 className="lav-h3 text-lav-navy">{t(`piwik.sources.group.${group.group}`)}</h3>
            <ul className="m-0 flex list-none flex-col gap-3 p-0">
              {group.items.map((item) => (
                <li key={item.key}>
                  <a
                    href={'hl' in item ? `${item.href}?hl=${language}` : item.href}
                    target="_blank"
                    rel="noopener"
                    className={link}
                  >
                    {t(`piwik.sources.${item.key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <p className="lav-small max-w-measure-lead font-normal text-lav-navy/70">{t('piwik.sources.disclaimer')}</p>
      </SplitBlock>
    </Section>
  );
}
