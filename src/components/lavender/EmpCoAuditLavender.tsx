'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import {
  ArrowDown,
  ArrowUpRight,
  Ban,
  CopyCheck,
  Eye,
  History,
  Network,
  Quote,
  Scale,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { submitNetlifyForm, trackCtaClick } from '@/lib/tracking';
import {
  ANCHOR_SCROLL_MARGIN,
  AnchorTabs,
  Button,
  ButtonStack,
  CheckItem,
  ClosingBlock,
  ComparisonTable,
  ConsentCheckbox,
  FactsBand,
  FaqSection,
  FormError,
  FormField,
  IconCard,
  PageShell,
  ProcessAccordion,
  ProductHead,
  ProductTeaser,
  Section,
  SectionHeader,
  SpecItem,
  Statement,
  TopNav,
  ValidatedForm,
  siteHref,
  smoothAnchor,
} from '@/design-system';
import { cn } from '@/components/ui/utils';

const RECAPTCHA_SITE_KEY = '6LdI1S8sAAAAANG9NRRpioS8kVfZgn3wE5tRRY61';
const FEATURE_ICONS = [Eye, CopyCheck, Quote, Scale, Network, History] as const;
const FAQ_COUNT = 19;

/**
 * EmpCo Audit product page in the new design (preview under /lavender/).
 * Same copy and the same Netlify form as the live page — only the wording
 * that changed with the redesign comes from lavender-overrides.ts.
 */
export default function EmpCoAuditLavender() {
  const { t, language } = useLanguage();

  const tabs = [
    { id: 'why', label: t('empco.anchor.why') },
    { id: 'about', label: t('empco.anchor.what') },
    { id: 'features', label: t('empco.anchor.features') },
    { id: 'test', label: t('empco.anchor.test') },
    { id: 'faq', label: t('empco.anchor.faq') },
  ];

  // Structured data from the very strings the page shows (Google: JSON-LD
  // must match the visible content). German only, as on the live page —
  // German is the SEO target of this URL. Client components are rendered into
  // the static export, so this is part of the crawlable HTML.
  const jsonLd =
    language === 'de'
      ? [
          {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            inLanguage: 'de',
            mainEntity: Array.from({ length: FAQ_COUNT }, (_, i) => ({
              '@type': 'Question',
              name: t(`empco.seo.faq.q${i + 1}`),
              acceptedAnswer: { '@type': 'Answer', text: t(`empco.seo.faq.a${i + 1}`) },
            })),
          },
          {
            '@context': 'https://schema.org',
            '@type': 'HowTo',
            inLanguage: 'de',
            name: t('empco.seo.steps.title'),
            description:
              'Vorgehen, um die Nachhaltigkeitskommunikation bis zum Geltungsbeginn der EmpCo-Richtlinie am 27. September 2026 rechtskonform zu machen.',
            step: [1, 2, 3, 4, 5].map((n) => ({
              '@type': 'HowToStep',
              position: n,
              name: t(`empco.seo.step${n}.label`),
              text: t(`empco.seo.step${n}.desc`),
            })),
          },
        ]
      : [];

  return (
    <PageShell
      nav={<TopNav sections={[]} logoHref={siteHref(language, '/')} />}
      footer={
        <ClosingBlock
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
      {jsonLd.map((entry) => (
        <script
          key={entry['@type']}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
        />
      ))}
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
      />

      <ProductHead
        breadcrumbLabel={t('lavender.common.breadcrumb')}
        breadcrumb={[
          { label: t('topNav.products'), href: siteHref(language, '/#products') },
          { label: 'EmpCo Audit' },
        ]}
        images={[
          { src: '/assets/empco/EmpCo-Tool-UI.png', alt: t('lavender.products.empco.imageAlt') },
        ]}
        thumbLabel={(n) => `${t('lavender.common.showImage')} ${n}`}
        title="EmpCo Audit"
        subline={t('empco.hero.headline')}
        description={t('empco.hero.subtitle')}
      >
        <ButtonStack>
          <Button asChild className="w-full">
            <a
              href="#form"
              onClick={(e) => {
                trackCtaClick('empco_hero_probeseite', t('empco.hero.ctaPrimary'));
                smoothAnchor(e);
              }}
            >
              {t('empco.hero.ctaPrimary')}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
          <Button asChild variant="outline" className="w-full">
            <a href="#about" onClick={smoothAnchor}>
              {t('empco.hero.ctaSecondary')}
              <ArrowDown size={20} strokeWidth={2} />
            </a>
          </Button>
        </ButtonStack>
        <ul className="m-0 flex list-none flex-col gap-3 p-0">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <CheckItem key={n}>{t(`empco.feature${n}.title`)}</CheckItem>
          ))}
        </ul>
      </ProductHead>

      <AnchorTabs items={tabs} label={t('lavender.common.onThisPage')} />

      <Why />
      <FactsBand
        title={t('empco.seo.explainer.title')}
        lead={t('empco.seo.explainer.lead')}
        facts={[1, 2, 3, 4, 5, 6].map((n) => ({
          label: t(`empco.seo.fact${n}.label`),
          value: t(`empco.seo.fact${n}.value`),
        }))}
      />
      <About />
      <Features />

      <div id="test" className={ANCHOR_SCROLL_MARGIN}>
        <ProcessAccordion
          id="test-steps"
          title={t('empco.test.title')}
          steps={[1, 2, 3].map((n) => ({
            number: `0${n}`,
            title: t(`empco.test.step${n}.title`),
            description: t(`empco.test.step${n}.desc`),
          }))}
        />
      </div>

      <Statement
        layout="feature"
        text={t('empco.test.closing')}
        action={
          <Button asChild>
            <a
              href="#form"
              onClick={(e) => {
                trackCtaClick('empco_form_probeseite', t('empco.test.cta'));
                smoothAnchor(e);
              }}
            >
              {t('empco.test.cta')}
              <ArrowUpRight size={20} strokeWidth={2} />
            </a>
          </Button>
        }
      />

      <SampleForm />
      <Directive />
      <Faq />
      <MoreProducts />
    </PageShell>
  );
}

/* ---------------- Why now ---------------- */

function Why() {
  const { t } = useLanguage();
  const lead = 'lav-lead font-normal text-lav-navy/80';
  return (
    <Section id="why" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-14">
      <SectionHeader title={t('empco.why.title')} />
      <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
        <div className="flex flex-1 flex-col gap-10">
          <p className={lead}>{t('empco.why.p1')}</p>
          <p className={lead}>{t('empco.why.p2')}</p>
        </div>
        <div className="flex flex-1 flex-col gap-10">
          <p className={lead}>{t('empco.why.p3')}</p>
          <p className="lav-lead font-medium text-lav-navy">{t('empco.why.p4')}</p>
        </div>
      </div>
    </Section>
  );
}

/* ---------------- About the audit ---------------- */

function About() {
  const { t } = useLanguage();
  const paragraph = 'lav-paragraph font-normal text-lav-navy/80';
  return (
    <Section
      id="about"
      className={ANCHOR_SCROLL_MARGIN}
      innerClassName="flex flex-col gap-14 lg:flex-row lg:items-center lg:gap-16"
    >
      <div className="flex flex-1 flex-col gap-12">
        <SectionHeader title={t('empco.what.title')} />
        <div className="flex flex-col gap-6">
          <p className={paragraph}>{t('empco.what.p1')}</p>
          <p className={paragraph}>{t('empco.what.p2')}</p>
        </div>
      </div>
      <img
        src="/assets/empco/EmpCo-Tool-UI.png"
        alt={t('lavender.products.empco.imageAlt')}
        loading="lazy"
        className="aspect-[4/3] w-full rounded-card bg-lav-lavender object-contain object-center lg:w-[47.4%]"
      />
    </Section>
  );
}

/* ---------------- What sets it apart ---------------- */

function Features() {
  const { t } = useLanguage();
  const intro = t('empco.features.lead').split('\n\n');
  return (
    <Section id="features" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12">
      <div className="flex flex-col gap-8 lg:flex-row lg:gap-16">
        <SectionHeader title={t('empco.features.title')} className="lg:flex-1" />
        <div className="flex flex-col gap-6 lg:flex-1">
          {intro.map((p) => (
            <p key={p} className="lav-paragraph font-normal text-lav-navy/80">
              {p}
            </p>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
        {FEATURE_ICONS.map((icon, i) => (
          <IconCard
            key={i}
            icon={icon}
            title={t(`empco.feature${i + 1}.title`)}
            description={t(`empco.feature${i + 1}.desc`)}
          />
        ))}
      </div>
    </Section>
  );
}

/* ---------------- Sample-page form ---------------- */

function SampleForm() {
  const { t, language } = useLanguage();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // The widget is rendered client-side only (see the note on the container).
  useEffect(() => {
    if (!mounted) return;
    const timer = setTimeout(() => {
      const g = (window as unknown as { grecaptcha?: { render?: (el: Element, o: object) => void } })
        .grecaptcha;
      const container = document.querySelector('[data-netlify-recaptcha="true"]');
      if (g?.render && container && container.innerHTML === '') {
        g.render(container, { sitekey: RECAPTCHA_SITE_KEY, theme: 'light' });
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [mounted]);

  const onValidSubmit = (form: HTMLFormElement, setFormError: (message: string) => void) =>
    submitNetlifyForm(form, {
      formId: 'empco-audit',
      language,
      recaptchaErrorMessage: t('form.recaptchaError'),
      submitErrorMessage: t('form.submitError'),
      onError: setFormError,
    });

  return (
    <Section
      id="form"
      className={ANCHOR_SCROLL_MARGIN}
      innerClassName="flex flex-col gap-10 lg:flex-row lg:gap-16"
    >
      <div className="flex flex-col gap-10 lg:w-[44.2%]">
        <SectionHeader title={t('empco.form.title')} intro={[t('empco.form.intro')]} />
        <p className="lav-small border-l border-lav-navy/20 pl-4 font-normal italic text-lav-navy/70">
          {t('empco.form.disclaimer')}
        </p>
      </div>

      <ValidatedForm
        name="empco-audit"
        method="POST"
        data-netlify="true"
        onValidSubmit={onValidSubmit}
        className="flex flex-1 flex-col gap-8 rounded-card bg-lav-lavender p-4 md:p-10"
      >
        <input type="hidden" name="form-name" value="empco-audit" />
        <FormField id="empco-name" name="name" type="text" autoComplete="name" label={t('empco.form.name')} />
        <FormField
          id="empco-company"
          name="company"
          type="text"
          autoComplete="organization"
          label={t('empco.form.company')}
        />
        <FormField
          id="empco-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          label={t('empco.form.email')}
        />
        <FormField
          id="empco-url"
          name="url"
          type="url"
          required
          placeholder="https://"
          label={t('empco.form.url')}
          hint={t('empco.form.urlHint')}
        />
        <ConsentCheckbox id="empco-consent" name="consent" required>
          {t('empco.form.consent')}
        </ConsentCheckbox>

        {/* Rendered after mount only, so it is absent from the exported HTML:
            Netlify's deploy-time processing would otherwise inject the widget
            here and break hydration (React #418). */}
        {mounted && <div data-netlify-recaptcha="true" />}

        <FormError />
        <Button type="submit" className="w-full">
          {t('empco.form.submit')}
          <ArrowUpRight size={20} strokeWidth={2} />
        </Button>

        <p className="lav-small font-normal text-lav-navy/70">{t('empco.form.privacyNotice')}</p>
        <a href={siteHref(language, 'privacy-policy')} className="lav-small font-medium text-lav-navy">
          → {t('empco.form.privacyLink')}
        </a>
      </ValidatedForm>
    </Section>
  );
}

/* ---------------- EmpCo explained ---------------- */

function Directive() {
  const { t } = useLanguage();
  const block = 'flex flex-col gap-8';
  return (
    <Section id="directive" className={ANCHOR_SCROLL_MARGIN} innerClassName="flex flex-col gap-12 md:gap-14 lg:gap-16">
      <h2 className="lav-h1 text-lav-navy">{t('empco.anchor.directive')}</h2>

      <div className={block}>
        <h3 className="lav-h2 text-lav-navy">{t('empco.seo.banned.title')}</h3>
        <ul className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
          {[1, 2, 3, 4].map((n) => (
            <li key={n} className="flex flex-col gap-6 rounded-card bg-lav-lavender p-8">
              <span
                aria-hidden
                className="inline-flex h-12 w-12 items-center justify-center rounded-pill bg-lav-navy text-lav-white"
              >
                <Ban size={24} strokeWidth={2} />
              </span>
              <p className="lav-body lav-hyphenate font-normal text-lav-navy">{t(`empco.seo.banned.item${n}`)}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className={block}>
        <h3 className="lav-h2 text-lav-navy">{t('empco.seo.steps.title')}</h3>
        {/* Five in a row only from 1200px (75rem — in rem so it sorts after
            lg): below, „Klimaaussagen“ (too short to hyphenate) is wider than
            a column. */}
        <ol className="m-0 grid list-none grid-cols-1 gap-6 p-0 md:grid-cols-2 lg:grid-cols-3 lg:gap-8 min-[75rem]:grid-cols-5">
          {[1, 2, 3, 4, 5].map((n) => (
            <SpecItem
              key={n}
              as="li"
              number={`0${n}`}
              title={t(`empco.seo.step${n}.label`)}
              description={t(`empco.seo.step${n}.desc`)}
            />
          ))}
        </ol>
      </div>

      <div className={block}>
        <h3 className="lav-h2 text-lav-navy">{t('empco.seo.compare.title')}</h3>
        <ComparisonTable
          caption={t('empco.seo.compare.title')}
          primaryHead={t('empco.seo.compare.colEmpco')}
          secondaryHead={t('empco.seo.compare.colGcd')}
          rows={[1, 2, 3].map((n) => ({
            aspect: t(`empco.seo.compare.r${n}.aspect`),
            primary: t(`empco.seo.compare.r${n}.empco`),
            secondary: t(`empco.seo.compare.r${n}.gcd`),
          }))}
        />
      </div>
    </Section>
  );
}

/* ---------------- FAQ ---------------- */

function Faq() {
  const { t } = useLanguage();
  const items = Array.from({ length: FAQ_COUNT }, (_, i) => ({
    question: t(`empco.seo.faq.q${i + 1}`),
    answer: t(`empco.seo.faq.a${i + 1}`),
  }));
  return (
    <FaqSection className={ANCHOR_SCROLL_MARGIN} title={t('empco.seo.faq.title')} items={items} />
  );
}

/* ---------------- More products ---------------- */

function MoreProducts() {
  const { t, language } = useLanguage();
  return (
    <Section id="more" innerClassName={cn('flex flex-col gap-12')}>
      <SectionHeader title={t('lavender.products.moreTitle')} />
      <div className="flex w-full flex-col gap-6 md:flex-row lg:gap-10">
        <ProductTeaser
          eyebrow={t('lavender.products.eyebrow')}
          title="iKnow"
          description={t('lavender.products.iknow.desc')}
          image="/images/lavender-iknow.png"
          imageAlt={t('lavender.products.iknow.imageAlt')}
          href={siteHref(language, 'iknow')}
          ctaLabel={t('lavender.products.learnMore')}
        />
        <ProductTeaser
          eyebrow={t('lavender.products.eyebrow')}
          title="Analytics Agent"
          description={t('lavender.products.analyticsAgent.desc')}
          image="/images/lavender-analytics-agent.png"
          imageAlt={t('lavender.products.analyticsAgent.imageAlt')}
          href={siteHref(language, 'analytics-agent')}
          ctaLabel={t('lavender.products.learnMore')}
        />
      </div>
    </Section>
  );
}
