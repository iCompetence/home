'use client';

import { useEffect, useState } from 'react';
import Script from 'next/script';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { submitNetlifyForm } from '@/lib/tracking';
import {
  ANCHOR_SCROLL_MARGIN,
  AnchorTabs,
  Badge,
  Button,
  ClosingBlock,
  ConsentCheckbox,
  FormError,
  FormField,
  PageShell,
  ProductHead,
  ProductTeaser,
  Section,
  SectionHeader,
  TopNav,
  ValidatedForm,
  siteHref,
  smoothAnchor,
} from '@/design-system';

const RECAPTCHA_SITE_KEY = '6LdI1S8sAAAAANG9NRRpioS8kVfZgn3wE5tRRY61';

/** Names, roles (job titles stay English) and photos as on the live page. */
const EXPERTS = [
  { name: 'Dennis Breuer', role: 'Head of Experience Orchestration', photo: '/images/experts/Dennis_4x.png' },
  { name: 'Matthias Postel', role: 'CEO iCompetence GmbH', photo: '/images/experts/Matthias_4x.png', credit: true },
  { name: 'Marc-André Lampe', role: 'Senior Data Architect', photo: '/images/experts/Marc_4x.png' },
  { name: 'Lionel Schulz', role: 'Lead Experience Lab', photo: '/images/experts/Lionel_4x.png' },
] as const;

/**
 * Submitted value of the only date option, kept identical to the live form
 * so the Netlify submissions stay comparable (the dated options are
 * commented out on the live page).
 */
const DATE_CUSTOM_VALUE = 'Individuellen Termin buchen';

/**
 * AI Workshop page in the new design (preview under /lavender/). The live
 * page is German only and hard-coded; the copy here comes from the
 * workshop.* keys (DE in "du", EN as drafted in docs/i18n-luecken.md §2).
 */
export default function AIWorkshopLavender() {
  const { t, language } = useLanguage();

  const tabs = [
    { id: 'intro', label: t('workshop.anchor.about') },
    { id: 'experts', label: t('workshop.anchor.experts') },
    { id: 'form', label: t('workshop.anchor.apply') },
    { id: 'contact', label: t('workshop.anchor.contact') },
  ];

  return (
    <PageShell
      nav={<TopNav sections={[]} logoHref={siteHref(language, '/')} />}
      footer={
        <ClosingBlock
          id="contact"
          className={ANCHOR_SCROLL_MARGIN}
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
      <Script
        src="https://www.google.com/recaptcha/api.js?render=explicit"
        strategy="afterInteractive"
      />

      <ProductHead
        breadcrumbLabel={t('lavender.common.breadcrumb')}
        breadcrumb={[
          { label: t('topNav.products'), href: siteHref(language, '/#products') },
          { label: t('workshop.hero.title') },
        ]}
        media={<Experts />}
        eyebrow={t('lavender.products.eyebrow')}
        title={t('workshop.hero.title')}
        subline={t('workshop.hero.subline')}
      >
        <Badge>{t('workshop.intro.run4')}</Badge>
        <Button asChild className="w-full">
          <a href="#form" onClick={smoothAnchor}>
            {t('workshop.anchor.apply')}
            <ArrowUpRight size={20} strokeWidth={2} />
          </a>
        </Button>
        <Button asChild variant="outline" className="w-full">
          <a href="#intro" onClick={smoothAnchor}>
            {t('workshop.anchor.about')}
            <ArrowDown size={20} strokeWidth={2} />
          </a>
        </Button>
      </ProductHead>

      <AnchorTabs items={tabs} label={t('lavender.common.onThisPage')} />

      <Section id="intro" className={ANCHOR_SCROLL_MARGIN}>
        <div className="flex max-w-[820px] flex-col gap-8 md:gap-10">
          <p className="lav-lead font-normal italic text-lav-navy">{t('workshop.intro.run1')}</p>
          <p className="lav-lead font-normal text-lav-navy/80">{t('workshop.intro.run2')}</p>
          <p className="lav-lead font-medium text-lav-navy">{t('workshop.intro.run3')}</p>
          <p className="lav-lead font-medium text-lav-navy">{t('workshop.intro.run4')}</p>
        </div>
      </Section>

      <ApplicationForm />
      <MoreProducts />
    </PageShell>
  );
}

/* ---------------- Experts (in place of the gallery) ---------------- */

function Experts() {
  const { t } = useLanguage();
  return (
    <div
      id="experts"
      className={`flex flex-col gap-10 rounded-card bg-lav-lavender p-6 md:p-8 lg:p-12 ${ANCHOR_SCROLL_MARGIN}`}
    >
      <h2 className="lav-h2 text-lav-navy">{t('workshop.experts.title')}</h2>
      <ul className="m-0 grid list-none grid-cols-1 gap-8 p-0 md:grid-cols-2 md:gap-y-10">
        {EXPERTS.map((expert) => (
          <li key={expert.name} className="flex flex-col items-center gap-3 text-center">
            <img
              src={expert.photo}
              alt={expert.name}
              title={'credit' in expert ? t('workshop.experts.photoCredit') : undefined}
              className="mb-5 h-[140px] w-[140px] rounded-full object-cover"
            />
            <h3 className="lav-h3 text-lav-navy">{expert.name}</h3>
            <p className="lav-body font-normal text-lav-navy/70">{expert.role}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------------- Application form ---------------- */

function ApplicationForm() {
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
      formId: 'ai-workshop',
      language,
      recaptchaErrorMessage: t('form.recaptchaError'),
      submitErrorMessage: t('form.submitError'),
      onError: setFormError,
    });

  return (
    <Section
      id="form"
      className={ANCHOR_SCROLL_MARGIN}
      innerClassName="flex flex-col gap-8 md:gap-10 lg:flex-row lg:gap-16"
    >
      <div className="flex flex-col gap-10 lg:w-[44.2%]">
        <SectionHeader title={t('workshop.form.title')} />
        <p className="lav-lead font-normal text-lav-navy/80">{t('workshop.form.intro')}</p>
      </div>

      <ValidatedForm
        name="ai-workshop"
        id="ai-workshop"
        method="POST"
        data-netlify="true"
        onValidSubmit={onValidSubmit}
        className="flex flex-1 flex-col gap-6 rounded-card bg-lav-lavender p-4 md:p-8 lg:p-10"
      >
        <input type="hidden" name="form-name" value="ai-workshop" />
        <FormField id="workshop-name" name="name" type="text" autoComplete="name" required label={t('workshop.form.name')} />
        <FormField id="workshop-email" name="email" type="email" autoComplete="email" required label={t('workshop.form.email')} />
        <FormField id="workshop-phone" name="phone" type="tel" autoComplete="tel" label={t('workshop.form.phone')} />
        <FormField
          id="workshop-position"
          name="position"
          type="text"
          autoComplete="organization-title"
          required
          label={t('workshop.form.position')}
        />
        <FormField
          id="workshop-company"
          name="company"
          type="text"
          autoComplete="organization"
          required
          label={t('workshop.form.company')}
        />
        <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
          <legend className="lav-small mb-3 p-0 font-medium text-lav-navy">
            {t('workshop.form.dates')}
            <span aria-hidden> *</span>
          </legend>
          <ConsentCheckbox id="workshop-date-custom" name="date" value={DATE_CUSTOM_VALUE}>
            {t('workshop.form.dateCustom')}
          </ConsentCheckbox>
        </fieldset>

        {/* Rendered after mount only, so it is absent from the exported HTML:
            Netlify's deploy-time processing would otherwise inject the widget
            here and break hydration (React #418). */}
        {mounted && <div data-netlify-recaptcha="true" />}

        <FormError />
        <Button type="submit" className="w-full">
          {t('workshop.form.submit')}
          <ArrowUpRight size={20} strokeWidth={2} />
        </Button>
      </ValidatedForm>
    </Section>
  );
}

/* ---------------- Other products ---------------- */

function MoreProducts() {
  const { t, language } = useLanguage();
  return (
    <Section id="more" innerClassName="flex flex-col gap-12">
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
          title="Intelligentic Search"
          description={t('is.hero.subline')}
          image="/images/ICS_Travel_Club.png"
          imageAlt="Intelligentic Search Demo"
          href={siteHref(language, 'intelligentic-search')}
          ctaLabel={t('lavender.products.learnMore')}
        />
      </div>
    </Section>
  );
}
